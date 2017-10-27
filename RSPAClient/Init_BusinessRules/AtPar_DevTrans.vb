#Region "Imports"
Imports System.Data
Imports System.Data.SqlClient
Imports System.Reflection
Imports Microsoft.ApplicationBlocks.Data
Imports AtPar_BusinessRules_RemotingProxy
Imports System.Diagnostics
Imports log4net
Imports System.Xml
Imports System.Text

#End Region

#Region "Bug Fix(s)"
'DK-0004320-09/18/2008
'SM-0004554-10/06/2008
'RT-0004894-10/24/2008
'DG-IT0001087-02/15/2009
'DG-IT0005903-02/25/2009
#End Region

Public Class AtPar_DevTrans
    Inherits AtPar_Application_Base
    Implements IAtpar_DevTrans
    Implements IDisposable

#Region "Variable Declaration(s)"
    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_DevTrans))
    Private Const accDisabled As Integer = 0
    Private Const Status As String = "STATUS_CODE"
    Private Const bunitAPPID As String = "APP_ID"
    Private Const bunit As String = "BUSINESS_UNIT"
    Private Const countflag As String = "COUNT_FLAG"
    Private Const IUTAccess As String = "PURCHASING"
    Private Const deptStatus As String = "I"
	Private Const AllSICConsignflag As String = "ALLOW_SIC_CONSIGN"
    ' For Storing Receive Stock Header Printing Details
    Public delivShipToIdAllocation As String = "N"
    Private Const PARTIALLY_RECEIVED As Integer = 25
    Private Const CLOSED As Integer = 30

    ' nice label variables
    Public _strLblFileName As String = String.Empty
    Dim PNE As PocketNiceEngine.IEngine
    Dim pneOutput As PocketNiceEngine.IOutput
    Dim pneLabel As PocketNiceEngine.ILabel
    Private Const LabelFileNameSuffix As String = ".lvx"
#End Region

    Sub New()

        log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.Init.ToString()

    End Sub

    ''' <summary>
    ''' To insert Client Error Log into DB
    ''' </summary>
    ''' <param name="pStrXML">XML Parameter</param>
    ''' <returns>ATPAR_OK on success else ERROR CODE on error</returns> 
    Public Function clientErrLogSynch(ByVal pStrXML As String, ByVal pDeviceTokenEntry() As String) As Long _
                                      Implements IAtPar_DevTrans.clientErrLogSynch

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim strErrDate As String = String.Empty
        Dim strErrCode As String = String.Empty
        Dim strErrMsg As String = String.Empty
        Dim _strSQL As String = String.Empty

        Dim xmldoc As New XmlDocument
        Dim xmlRoot As XmlNode
        Dim xmlItem As XmlNode
        Dim intXmlNodes As Integer
        Dim intXmlChildNodes As Integer
        Dim xmlItemChild As XmlNode

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            Try
                xmldoc.LoadXml(pStrXML)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to load the input xml " & vbCrLf & _
                                                            ex.ToString)
                Return E_SERVERERROR
            End Try

            xmlRoot = xmldoc.DocumentElement()

            For intXmlNodes = 0 To xmlRoot.ChildNodes.Count - 1

                xmlItem = xmlRoot.ChildNodes.Item(intXmlNodes)

                If (xmlItem.Name = "RECORD") Then

                    For intXmlChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlChildNodes)
                        Select Case xmlItemChild.Name
                            Case "ERROR_DT"
                                strErrDate = xmlItemChild.InnerText
                            Case "ERROR_CODE"
                                strErrCode = xmlItemChild.InnerText
                            Case "ERROR_MSG"
                                strErrMsg = xmlItemChild.InnerText
                        End Select
                    Next

                End If

                _strSQL = " INSERT INTO MT_ATPAR_ERROR_LOG(ERROR_DT, ERROR_CODE, ERROR_MESSAGE) " & _
                          " VALUES('" & strErrDate & "','" & strErrCode & "','" & strErrMsg & "')"


                Try
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & " Inserting the errors using the " & _
                                                            "following SQL ....." & vbCrLf & _strSQL)

                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL))

                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert into the " & _
                                                            "MT_ATPAR_ERROR_LOG table :" & vbCrLf & _
                                                            " With following SQL... " & _strSQL & vbCrLf & _
                                                            " Exception is : " & ex.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBINSERTFAIL
                End Try

            Next

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Insertion failed " & ex.ToString)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Called from client to fetch the parameter, business units, carrier, shipToId's info 
    ''' </summary>
    ''' <param name="InputParameters">Input dataset</param>
    ''' <param name="OutputParameters">output string containing the parameter, business units, carrier, shipToId's info</param>
    ''' <param name="DeviceTokenEntry">DeviceToken Info</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetUserDefaults(ByVal InputParameters As DataSet, _
                                    ByRef OutputParameters As String, _
                                    ByVal DeviceTokenEntry() As String) As Long _
                                    Implements IAtPar_DevTrans.GetUserDefaults

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = DeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = DeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _profilePermissions As New Collection
        Dim _statusCode As Long = -1

        Try
            CreateLocalDB(DeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _statusCode = BuildExecutingCalls(DeviceTokenEntry(TokenEntry_Enum.ProfileID), _
                                               _profilePermissions)

            If _statusCode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the calls info " & vbCrLf )
                Return E_SERVERERROR
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to invoke the " & _
                                                    "GetProductAccessForProfile function " & vbCrLf & ex.ToString)
            Return E_SERVERERROR
        End Try

        Try
            _statusCode = ExecutePopulate(InputParameters, _
                                          DeviceTokenEntry, _
                                          _profilePermissions, _
                                          OutputParameters)
            If _statusCode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to execute the calls " & vbCrLf )
                Return E_SERVERERROR
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to invoke the ExecutePopulate function " & _
                                                                  vbCrLf & ex.ToString)
            Return E_SERVERERROR
        End Try
        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' Gets the AppIds assigned to the profile
    ''' </summary>
    ''' <param name="pProfileId">profile ID</param>
    ''' <param name="pDsApps">Dataset containing the App Id's</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetProfileAppAcl(ByVal pProfileId As String, _
                                      ByRef pDsApps As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        _strSQL = "SELECT APP_ID FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='" & pProfileId & "'"

        Try
            If log.IsInfoEnabled Then log.Info(vbCrLf & methodBaseName & " : Getting the AppIds with " & _
                                                                           "the following SQL :" & vbCrLf & _
                                                                               _strSQL & vbCrLf)

            pDsApps = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to to get the appids for the profileID:" & _
                                                                    pProfileId & vbCrLf & " With following SQL... " & _strSQL & vbCrLf & _
                                                                  " Exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Gets the products assigned to the profile
    ''' </summary>
    ''' <param name="pProfileId">profile ID</param>
    ''' <param name="pAclPermissions">Collection containing the calls info</param>
    ''' <returns>Collection containing the calls info</returns>
    ''' <remarks></remarks>
    Private Function BuildExecutingCalls(ByVal pProfileId As String, _
                                         ByRef pAclPermissions As Collection) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String
        Dim _dsApps As DataSet = Nothing
        Dim _dependencyVal As Collection
        Dim _statusCode As Long = -1

        Try
            _statusCode = GetProfileAppAcl(pProfileId, _dsApps)
            If _statusCode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to get the AppID details : ")
                Return E_SERVERERROR
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to invoke GetProfileAppAcl function " & _
                                                                                 vbCrLf & ex.ToString)
            Return E_SERVERERROR
        End Try

        If _dsApps.Tables(0).Rows.Count > 0 Then

            pAclPermissions = New Collection
            _dependencyVal = New Collection

            pAclPermissions.Add(Enum_DEPENDENCIES.PARAMS.ToString)
            pAclPermissions.Add(Enum_DEPENDENCIES.LIST_VIEW.ToString)
            pAclPermissions.Add(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString)
            pAclPermissions.Add(Enum_DEPENDENCIES.UI_SETUP.ToString)

            For intCnt As Integer = 0 To _dsApps.Tables(0).Rows.Count - 1
                Select Case _dsApps.Tables(0).Rows(intCnt).Item("APP_ID")
                    Case EnumApps.CartCount
                        _dependencyVal.Add(Enum_DEPENDENCIES.USER_GROUPS.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.NOTES.ToString)
                    Case EnumApps.Receiving
                        _dependencyVal.Add(Enum_DEPENDENCIES.CARRIER.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.IUT_BU.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.SHIP_TO_ID.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.NOTES.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.ALL_BU.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString)
                    Case EnumApps.Deliver
                        _dependencyVal.Add(Enum_DEPENDENCIES.CARRIER.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.USER_GROUPS.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString)
                    Case EnumApps.PutAway
                        _dependencyVal.Add(Enum_DEPENDENCIES.IUT_BU.ToString)
                    Case EnumApps.StockIssue
                        _dependencyVal.Add(Enum_DEPENDENCIES.INV_BU.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString)
                    Case EnumApps.BinToBin
                        _dependencyVal.Add(Enum_DEPENDENCIES.INV_BU_BIN.ToString)
                    Case EnumApps.PointOfUse
                        _dependencyVal.Add(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.REASONS_DATA.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.POU_DEPTDATA.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString)
                    Case EnumApps.TrackIT
                        _dependencyVal.Add(Enum_DEPENDENCIES.TKIT_DEPT.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.TKIT_ITEM.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.TKIT_DATA.ToString)
                    Case EnumApps.Pharmacy
                        _dependencyVal.Add(Enum_DEPENDENCIES.REASONS_DATA.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.POU_DEPTDATA.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.RX_LOC_DATA.ToString)
                        _dependencyVal.Add(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString)
                    Case EnumApps.CycleCount
                        _dependencyVal.Add(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString)
                End Select

                Try
                    For intDependencyCount As Integer = 1 To _dependencyVal.Count
                        If Not pAclPermissions.Contains(_dependencyVal.Item(intDependencyCount)) Then
                            pAclPermissions.Add(_dependencyVal.Item(intDependencyCount), _dependencyVal.Item(intDependencyCount))
                        End If
                    Next
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error Building the _aclPermissions collection " & _
                                                                       vbCrLf & ex.ToString)
                    Return E_SERVERERROR
                End Try

            Next

        Else
            If log.IsWarnEnabled Then log.Warn(methodBaseName & " No Products Assigned to the user : ")
            Return E_SERVERERROR
        End If

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Executes the Do_GetParameters, functions based on product access
    ''' </summary>
    ''' <param name="pInputParams">Input dataset</param>
    ''' <param name="pDeviceTokenEntry">DeviceToken Info</param>
    ''' <param name="pAclPermission">Collection containing the calls info</param>
    ''' <param name="pOutPutParams">output paramters</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function ExecutePopulate(ByVal pInputParams As DataSet, _
                                     ByVal pDeviceTokenEntry() As String, _
                                     ByVal pAclPermission As Collection, _
                                     ByRef pOutPutParams As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)


        Dim _dsParams As DataSet = Nothing
        Dim _statusCode As Long = -1
        Dim _strOutput As String = String.Empty

        For intPermissionCnt As Integer = 1 To pAclPermission.Count
            Select Case pAclPermission.Item(intPermissionCnt)
                Case Enum_DEPENDENCIES.PARAMS.ToString

                    _statusCode = Do_GetParameters(pInputParams, pDeviceTokenEntry, _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the parameters " & _
                                                                    "info " & vbCrLf)
                        Return E_SERVERERROR
                    End If

                Case Enum_DEPENDENCIES.LIST_VIEW.ToString

                    _statusCode = Do_GetListView(pDeviceTokenEntry(TokenEntry_Enum.ProfileID), _
                                                 pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.PROFILE_LAST_SYNCH_DATE.ToString), _
                                                 _dsParams, pDeviceTokenEntry(TokenEntry_Enum.SystemId))

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the list view " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If

                Case Enum_DEPENDENCIES.USER_GROUPS.ToString

                    _statusCode = Do_GetGroupUsersInfo(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                                       pDeviceTokenEntry, _
                                                       _dsParams)
                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the User Group " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If

                Case Enum_DEPENDENCIES.CARRIER.ToString
                    _statusCode = Do_GetCarriers(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                                                      _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the carrier " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.LOCATION_GROUPS.ToString
                    _statusCode = Do_GetLocationGroups(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                                       pDeviceTokenEntry(TokenEntry_Enum.UserID), _
                                                       pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID), _
                                                       _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Location groups " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.IUT_BU.ToString
                    _statusCode = Do_GetIUTInvBUnits(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                                     _dsParams, _
                                                     pDeviceTokenEntry)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the IUT inventory bunits " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If

                Case Enum_DEPENDENCIES.INV_BU.ToString

                    _statusCode = Do_GetInvBUnits(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                                  pDeviceTokenEntry(TokenEntry_Enum.UserID), _
                                                  pDeviceTokenEntry(TokenEntry_Enum.ProfileID), _
                                                   _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the inventory bunits " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If

                Case Enum_DEPENDENCIES.ALL_BU.ToString

                    _statusCode = Do_GetBUnitsforParcel(pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID),
                                                        pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                                        _dsParams)
                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the all bunits  " & _
                                                                    "for ParcelCount  " & vbCrLf)
                        Return E_SERVERERROR
                    End If


                Case Enum_DEPENDENCIES.DISTRIB_TYPES.ToString
                    _statusCode = Do_GetDistTypes(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                                  pDeviceTokenEntry(TokenEntry_Enum.UserID), _
                                                  _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Distribution Types " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.SHIP_TO_ID.ToString
                    _statusCode = Do_GetShipToIDs(pDeviceTokenEntry(TokenEntry_Enum.UserID), _
                                                   pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                                    _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the ship to ids " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.NOTES.ToString
                    _statusCode = Do_GetNotes(pDeviceTokenEntry(TokenEntry_Enum.UserID), _
                                              pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                              pDeviceTokenEntry(TokenEntry_Enum.ProfileID), _
                                              _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Notes details " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString
                    _statusCode = Do_GetSymbologyTypes(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                                                  pDeviceTokenEntry(TokenEntry_Enum.ProfileID), _
                                                                  _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Symbology Type details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString
                    _statusCode = Do_GetPhysicianTable(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                                                  _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Physician Ids details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.REASONS_DATA.ToString
                    _statusCode = Do_GetReasonsTable(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                                                  _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Reason codes details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.PROCEDURE_DATA.ToString
                    _statusCode = Do_GetProcedureTable(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                                                  _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Procedure code details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.COSTCENTER_DATA.ToString
                    _statusCode = Do_GetCostCenterTable(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                                                  _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the CostCenter code details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.PREFERENCE_DATA.ToString
                    '_statusCode = Do_GetPreferenceTable(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                    '                                              _dsParams)

                    'If _statusCode <> ATPAR_OK Then
                    '    If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Preference Id details  " & vbCrLf)
                    '    Return E_SERVERERROR
                    'End If
                Case Enum_DEPENDENCIES.TKIT_DEPT.ToString
                    _statusCode = Do_GetDeparmentsSynch(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                                         _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Department details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.TKIT_ITEM.ToString
                    _statusCode = Do_GetItemTypesSynch(_dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Item type details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.UI_SETUP.ToString
                    _statusCode = Do_GetUISetupSynch(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                                      pDeviceTokenEntry, _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Ui Setup details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.POU_DEPTDATA.ToString
                    _statusCode = Do_GetWksAllocDepartments(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                                                  _dsParams, pDeviceTokenEntry)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the departments details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Case Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString
                    _statusCode = Do_GetManageCarriersTable(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                                                  _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the manage carriers details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If

                Case Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString
                    ''POU_LOCATIONDATA is not based on User,hence user last synchdate is not required to get the data so keeping empty
                    _statusCode = Do_GetAllocLocations(_dsParams, EnumApps.PointOfUse, Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString, "", pDeviceTokenEntry)
                    If _statusCode <> ATPAR_OK Then
                        If _statusCode = ATPAR_E_ASSIGN_ORGBUS Then
                            ' Skipping 
                            If log.IsWarnEnabled Then log.Warn(methodBaseName & "No Assigned Org Business Units." & vbCrLf)
                        Else
                            If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Allocated location details  " & vbCrLf)
                            Return E_SERVERERROR
                        End If
                    End If
                Case Enum_DEPENDENCIES.RX_LOC_DATA.ToString
                    ' For getting Pharmacy locations
                    ''RX_LOC_DATA is not based on User,hence user last synchdate is not required to get the data so keeping empty
                    _statusCode = Do_GetAllocLocations(_dsParams, EnumApps.Pharmacy, Enum_DEPENDENCIES.RX_LOC_DATA.ToString, "", pDeviceTokenEntry)
                    If _statusCode <> ATPAR_OK Then
                        If _statusCode = ATPAR_E_ASSIGN_ORGBUS Then
                            ' Skipping 
                            If log.IsWarnEnabled Then log.Warn(methodBaseName & "No Assigned Org Business Units." & vbCrLf)
                        Else
                            If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the Allocated location details  " & vbCrLf)
                            Return E_SERVERERROR
                        End If
                    End If
                Case Enum_DEPENDENCIES.INV_BU_BIN.ToString

                    _statusCode = Do_GetInvBUnitsForBintoBin(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring), _
                                                  pDeviceTokenEntry(TokenEntry_Enum.UserID), _
                                                  pDeviceTokenEntry(TokenEntry_Enum.ProfileID), _
                                                   _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the inventory bunits " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If

                Case Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString

                    _statusCode = Do_GetBunitsForCycleCount(pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.ToString), _
                                  pDeviceTokenEntry(TokenEntry_Enum.UserID), _
                                  pDeviceTokenEntry(TokenEntry_Enum.ProfileID), _
                                   _dsParams)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " failed to get the cyclecount inventory bunits " & _
                                                                    "details  " & vbCrLf)
                        Return E_SERVERERROR
                    End If

            End Select
        Next
        'Note :  ShipTo ID allocation for delivery of stock items  Records are Checked for the
        '        Purpose of Printing in Receive Status Screen POID Headers Printing  . If any Ship to Id is allocated for OrgGroup 
        '        in table MT_DELV_SHIPTO_ID_ALLOCATION Stock Header will be printed.

        _statusCode = Do_GetDelivShipToIDAllocation(pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID))

        'End of ShipTo ID allocation

        _strOutput = GenerateParametersStruc(_dsParams)

        pOutPutParams = _strOutput

        If log.IsDebugEnabled Then log.Debug(methodBaseName & " Output string : " & _strOutput)

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Builds the dataset conatining the parameters details
    ''' </summary>
    ''' <param name="pInputParams">Input dataset</param>
    ''' <param name="pDeviceTokenEntry">DeviceToken Info</param>
    ''' <param name="pOutPutParams">output dataset</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function Do_GetParameters(ByVal pInputParams As DataSet, _
                                      ByVal pDeviceTokenEntry() As String, _
                                      ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Long = -1
        Dim _strOrgID As String = String.Empty
        Dim _strProfileID As String = String.Empty
        Dim _strLoggedInUserID As String = String.Empty
        Dim _strLastSyncDate As String = String.Empty
        Dim _strProfLastSyncDate As String = String.Empty
        Dim _dsParams As New DataSet
        Dim _dtOrgParams As New DataTable
        Dim _dtProfParams As New DataTable
        Dim _dtUserParams As New DataTable
        Dim _sbOutXML As New StringBuilder
        Dim _strSystemID As String = String.Empty

        Try

            _strOrgID = pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID)
            _strProfileID = pDeviceTokenEntry(TokenEntry_Enum.ProfileID)
            _strLoggedInUserID = pDeviceTokenEntry(TokenEntry_Enum.UserID)
            _strLastSyncDate = pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.USER_LAST_SYNCH_DATE.tostring)
            _strProfLastSyncDate = pInputParams.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Enum_SyncTimes.PROFILE_LAST_SYNCH_DATE.ToString)
            _strSystemID = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

            Try
                _statusCode = Do_GetOrgParameters(_strOrgID, _
                                                  _strLastSyncDate, _
                                                 _dtOrgParams, _strSystemID)

                If _statusCode <> ATPAR_OK Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & ": Failed in the Org Parameter fetching " & _
                                                        "while getting the parameters :  statuscode : " & _
                                                            _statusCode & vbCrLf)
                    Return E_SERVERERROR
                End If
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to invoke Do_GetOrgParameters " & vbCrLf)
                Return E_SERVERERROR
            End Try

            Try
                _statusCode = Do_GetProfileParameters(_strProfileID, _
                                                      _strProfLastSyncDate, _
                                                      _dtProfParams, _
                                                      _strSystemID)
                If _statusCode <> ATPAR_OK Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & ": Failed in the Profile Parameter fetching " & _
                                                        "while getting the parameters : statuscode : " & _
                                                             _statusCode & vbCrLf)
                    Return E_SERVERERROR
                End If
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to invoke Do_GetProfileParameters " & vbCrLf)
                Return E_SERVERERROR
            End Try

            Try
                _statusCode = Do_GetUserAppParameters(_strLoggedInUserID, _
                                                      _strLastSyncDate, _
                                                      _dtUserParams, _strSystemID)
                If _statusCode <> ATPAR_OK Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & ": Failed in the User Parameter fetching " & _
                                                        "while getting the parameters : statuscode : " & _
                                                        _statusCode & vbCrLf)
                    Return E_SERVERERROR
                End If
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to invoke Do_GetUserAppParameters " & vbCrLf)
                Return E_SERVERERROR
            End Try

            Try

                _dsParams.Tables.Add(_dtOrgParams.Copy)
                _dsParams.Tables.Add(_dtProfParams.Copy)
                _dsParams.Tables.Add(_dtUserParams.Copy)

                pOutPutParams = _dsParams.Copy

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to build the parameters dataset " & _
                                                           vbCrLf & ex.ToString)
                Return E_SERVERERROR
            End Try

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Get the OrgParameters
    ''' </summary>
    ''' <param name="pOrgGroupId">Org ID</param>
    ''' <param name="pLastSyncDate">Last Sync Date</param>
    ''' <param name="pOutPutParams">OutPut Parameters as dataset</param>
    ''' <returns>Dataset containing Org Parameters</returns>
    ''' <remarks></remarks>
    Private Function Do_GetOrgParameters(ByVal pOrgGroupId As String, _
                                         ByVal pLastSyncDate As String, _
                                         ByRef pOutPutParams As DataTable, _
                                         ByVal pSystemId As String) As String

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sbParamsSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsParams As DataSet
        Dim _strEnterpriseSystem As String = String.Empty

        Try
            _strEnterpriseSystem = GetConfigData(pSystemId, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get the enterprise system name " _
                                                                & ex.ToString & ":" & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try

            With _sbParamsSQL

                .Append("SELECT A.APP_ID, A.PARAMETER_ID, A.PARAMETER_VALUE ")
                .Append("FROM MT_ATPAR_ORG_GROUP_PARAMETERS A, MT_ATPAR_PARAM_MASTER B WHERE ")
                .Append("A.APP_ID = B.APP_ID ")
                .Append("AND A.PARAMETER_ID = B.PARAMETER_ID ")
                .Append("AND B.ENTERPRISE_SYSTEM = '" & _strEnterpriseSystem & "' ")
                .Append("AND A.ORG_GROUP_ID ='" & pOrgGroupId & "' ")
                .Append("AND B.CLIENT_SYNC = '" & YesNo_Enum.Y.ToString & "' ")
                .Append("AND B.PARAMETER_LEVEL='" & Enum_ParameterLevel.ORG.ToString & "' ")

            End With

            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                With _sbLastSyncDateSQL
                    .Append(" AND A.LAST_UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End With

            End If

            'If last sync date given then append the last sync condition to the main query
            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                _strSQL = _sbParamsSQL.ToString & _sbLastSyncDateSQL.ToString

                If log.IsInfoEnabled Then log.Info(vbCrLf & methodBaseName & " : Checking if Orgparameters changed " & _
                                                                    "after last sync date " & _
                                                                            "the following SQL :" & vbCrLf & _
                                                                                _strSQL & vbCrLf)
            Else

                'If last sync date not given then do not append the last sync condition to the main query
                _strSQL = _sbParamsSQL.ToString

                If log.IsInfoEnabled Then log.Info(vbCrLf & methodBaseName & " : Getting the Org Parameters with " & _
                                                                            "the following SQL :" & vbCrLf & _
                                                                               _strSQL & vbCrLf)
            End If

            'Execute the main query to check if any of the parameters are changed
            Try

                _dsParams = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                _dsParams.Tables(0).TableName = Enum_DEPENDENCIES.ORGPARAMS.ToString

            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Org Parameters " & _
                                                                      " With the following SQL :" & vbCrLf & _
                                                                    _strSQL & vbCrLf & "Exception is :" & sqlEx.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            'If parameters changed after the last sync date then get all the Org parameters
            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                If _dsParams.Tables(0).Rows.Count > 0 Then

                    _dsParams = Nothing

                    Try

                        If log.IsInfoEnabled Then log.Info(vbCrLf & methodBaseName & " : Get the Org Parameters with " & _
                                                                                    "the following SQL if the parameters changed :" & vbCrLf & _
                                                                                        _sbParamsSQL.ToString & vbCrLf)


                        _dsParams = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbParamsSQL.ToString))
                        _dsParams.Tables(0).TableName = Enum_DEPENDENCIES.ORGPARAMS.ToString

                    Catch sqlEx As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Org Parameters " & _
                                                                     " With the following SQL :" & vbCrLf & _
                                                                   _strSQL & vbCrLf & "Exception is :" & sqlEx.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                End If

            End If

            pOutPutParams = _dsParams.Tables(Enum_DEPENDENCIES.ORGPARAMS.ToString)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbParamsSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsParams = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Gets the Profile ProfileParameters
    ''' </summary>
    ''' <param name="pProfileId">ProfileID</param>
    ''' <param name="pProfLastSyncDate">Last Sync Date</param>
    ''' <param name="pOutPutParams">OutPut Parameters as Dataset</param>
    ''' <returns>Dataset containing profile Parameters</returns>
    ''' <remarks></remarks>
    Private Function Do_GetProfileParameters(ByVal pProfileId As String, _
                                             ByVal pProfLastSyncDate As String, _
                                             ByRef pOutPutParams As DataTable, _
                                             ByVal pSystemId As String) As String

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sbParamsSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsParams As DataSet
        Dim _strEnterpriseSystem As String = String.Empty

        Try
            _strEnterpriseSystem = GetConfigData(pSystemId, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get the enterprise system name " _
                                                                & ex.ToString & ":" & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try

            With _sbParamsSQL

                .Append("SELECT A.APP_ID, A.PARAMETER_ID, A.PARAMETER_VALUE ")
                .Append("FROM MT_ATPAR_PROFILE_PARAMETERS A, MT_ATPAR_PARAM_MASTER B WHERE ")
                .Append("A.APP_ID = B.APP_ID ")
                .Append("AND A.PARAMETER_ID = B.PARAMETER_ID ")
                .Append("AND A.PROFILE_ID ='" & pProfileId & "' ")
                .Append("AND B.ENTERPRISE_SYSTEM ='" & _strEnterpriseSystem & "' ")
                .Append("AND B.CLIENT_SYNC = '" & YesNo_Enum.Y.ToString & "' ")
                .Append("AND B.PARAMETER_LEVEL='" & Enum_ParameterLevel.PROFILE.ToString & "' ")
                .Append("AND A.APP_ID IN ")
                .Append("(SELECT APP_ID ")
                .Append("FROM MT_ATPAR_PROFILE_APP_ACL C, MT_ATPAR_USER D ")
                .Append("WHERE C.PROFILE_ID = D.PROFILE_ID ")
                .Append("AND C.PROFILE_ID='" & pProfileId & "' ")
                .Append("AND CLIENT_USER='" & YesNo_Enum.Y.ToString & "')")

            End With

            If Not String.IsNullOrEmpty(pProfLastSyncDate) Then

                With _sbLastSyncDateSQL
                    .Append(" AND A.LAST_UPDATE_DATE > CONVERT(DATETIME, '" & pProfLastSyncDate & "', 101)")
                End With

            End If

            'If last sync date given then append the last sync condition to the main query
            If Not String.IsNullOrEmpty(pProfLastSyncDate) Then

                _strSQL = _sbParamsSQL.ToString & _sbLastSyncDateSQL.ToString

                If log.IsInfoEnabled Then log.Info(vbCrLf & methodBaseName & " : Checking if profileparameters changed " & _
                                                                             "after last sync date " & _
                                                                            "the following SQL :" & vbCrLf & _
                                                                                _strSQL & vbCrLf)
            Else

                'If last sync date not given then do not append the last sync condition to the main query
                _strSQL = _sbParamsSQL.ToString

                If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting the profile parameters with the " & _
                                                               "following SQL........" & vbCrLf & _strSQL)
            End If

            'Execute the main query to check if any of the parameters are changed
            Try

                _dsParams = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                _dsParams.Tables(0).TableName = Enum_DEPENDENCIES.PROFILEPARAMS.ToString

            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Profile Parameters " & _
                                                                      " With the following SQL :" & vbCrLf & _
                                                                    _strSQL & vbCrLf & "Exception is :" & sqlEx.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            'If parameters changed after the last sync date then get all the profile parameters
            If Not String.IsNullOrEmpty(pProfLastSyncDate) Then

                If _dsParams.Tables(0).Rows.Count > 0 Then

                    _dsParams = Nothing

                    Try

                        If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting the profile parameters with the " & _
                                                           "following SQL........" & vbCrLf & _sbParamsSQL.ToString)



                        _dsParams = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbParamsSQL.ToString))
                        _dsParams.Tables(0).TableName = Enum_DEPENDENCIES.PROFILEPARAMS.ToString

                    Catch sqlEx As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Profile Parameters " & _
                                                                     " With the following SQL :" & vbCrLf & _
                                                                   _sbParamsSQL.ToString & vbCrLf & "Exception is :" & sqlEx.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                End If

            End If

            pOutPutParams = _dsParams.Tables(Enum_DEPENDENCIES.PROFILEPARAMS.ToString)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString)
            Return E_SERVERERROR
        Finally
            _sbParamsSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsParams = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Gets the User parameters
    ''' </summary>
    ''' <param name="pStrUID">Logged in userID</param>
    ''' <param name="pLastSyncDate">Lastsynch date</param>
    ''' <param name="pDsOutputParams">OutPut Parameters as dataset</param>
    ''' <returns>Dataset containing User Parameters</returns>
    ''' <remarks></remarks>
    Private Function Do_GetUserAppParameters(ByVal pStrUID As String, _
                                             ByVal pLastSyncDate As String, _
                                             ByRef pOutPutParams As DataTable, _
                                             ByVal pSystemId As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sbParamsSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsParams As DataSet
        Dim _strEnterpriseSystem As String = String.Empty

        Try
            _strEnterpriseSystem = GetConfigData(pSystemId, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get the enterprise system name " _
                                                                & ex.ToString & ":" & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try

            With _sbParamsSQL

                .Append("SELECT A.APP_ID, A.PARAMETER_ID, A.PARAMETER_VALUE ")
                .Append("FROM MT_ATPAR_USER_APP_PARAMETERS A, MT_ATPAR_PARAM_MASTER B ")
                .Append("WHERE A.APP_ID= B.APP_ID ")
                .Append("AND A.PARAMETER_ID = B.PARAMETER_ID ")
                .Append("AND A.USER_ID ='" & pStrUID & "' ")
                .Append("AND B.ENTERPRISE_SYSTEM ='" & _strEnterpriseSystem & "' ")
                .Append("AND B.CLIENT_SYNC= '" & YesNo_Enum.Y.ToString & "' ")
                .Append("AND B.PARAMETER_LEVEL='" & Enum_ParameterLevel.USER.ToString & "' ")
                .Append("AND A.APP_ID IN ")
                .Append("(SELECT APP_ID FROM ")
                .Append("MT_ATPAR_PROFILE_APP_ACL C, MT_ATPAR_USER D ")
                .Append("WHERE C.PROFILE_ID = D.PROFILE_ID ")
                .Append("AND C.PROFILE_ID IN ")
                .Append("(SELECT PROFILE_ID ")
                .Append("FROM MT_ATPAR_USER ")
                .Append("WHERE USER_ID='" & pStrUID & "' ")
                .Append("AND CLIENT_USER='" & YesNo_Enum.Y.ToString & "'))")

            End With

            If Not String.IsNullOrEmpty(pLastSyncDate) Then
                With _sbLastSyncDateSQL
                    .Append(" AND A.LAST_UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End With
            End If

            'If last sync date given then append the last sync condition to the main query
            If Not String.IsNullOrEmpty(pLastSyncDate) Then
                _strSQL = _sbParamsSQL.ToString & _sbLastSyncDateSQL.ToString

                If log.IsInfoEnabled Then log.Info(vbCrLf & methodBaseName & " : Checking if Userparameters changed " & _
                                                                             "after last sync date " & _
                                                                            "the following SQL :" & vbCrLf & _
                                                                                _strSQL & vbCrLf)
            Else
                'If last sync date not given then do not append the last sync condition to the main query
                _strSQL = _sbParamsSQL.ToString
                If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting the UserParameters with the " & _
                                                                            "following SQL..... " & vbCrLf & _
                                                                                    _strSQL)
            End If

            'Execute the main query to check if any of the parameters are changed
            Try
                _dsParams = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                _dsParams.Tables(0).TableName = (Enum_DEPENDENCIES.USERPARAMS.ToString())
            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the User Parameters " & vbCrLf & _
                                                                      " with the following SQL :" & _strSQL & vbCrLf & _
                                                                      " Exception is:" & sqlEx.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            'If parameters changed after the last sync date then get all the UserParameters 
            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                If _dsParams.Tables(0).Rows.Count > 0 Then

                    _dsParams = Nothing

                    Try
                        If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting the UserParameters with the " & _
                                                                    "following SQL..... " & vbCrLf & _sbParamsSQL.ToString)

                        _dsParams = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbParamsSQL.ToString))
                        _dsParams.Tables(0).TableName = Enum_DEPENDENCIES.USERPARAMS.ToString
                    Catch sqlEx As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the User Parameters " & vbCrLf & _
                                                                     " with the following SQL :" & _sbParamsSQL.ToString & vbCrLf & _
                                                                     " Exception is:" & sqlEx.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                End If

            End If

            pOutPutParams = _dsParams.Tables(Enum_DEPENDENCIES.USERPARAMS.ToString)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString)
            Return E_SERVERERROR
        Finally
            _sbParamsSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsParams = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To get List View for the Profile
    ''' </summary>
    ''' <param name="pProfileId">Profile ID</param>
    ''' <param name="pLastSynchDate">Last Synchronisation Date</param>
    ''' <param name="pOutPutParams">List View as Dataset</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    Private Function Do_GetListView(ByVal pProfileId As String, _
                                    ByVal pLastSyncDate As String, _
                                    ByRef pOutPutParams As DataSet, _
                                    ByVal pSystemId As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sbListViewSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsListViewDetails As DataSet
        Dim _strEnterpriseSystem As String = String.Empty

        Try
            _strEnterpriseSystem = GetConfigData(pSystemId, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get the enterprise system name " _
                                                                & ex.ToString & ":" & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try

            With _sbListViewSQL

                .Append("SELECT A.APP_ID, A.SCREEN_NAME, A.FIELD_NAME, A.COLUMN_HEADER, ")
                .Append("A.COLUMN_ORDER, A.COLUMN_WIDTH, B.MANDATORY_FIELD, A.DISPLAY_FIELD, B.ORDER_BY, ")
                .Append("B.COLUMN_MAX_SIZE, A.TOGGLE_FIELD, A.DEFAULT_TOGGLE_TEXT, A.TOGGLE_ORDER ")
                .Append("FROM MT_ATPAR_PROFILE_LIST_VIEW A, MT_ATPAR_LIST_VIEW B ")
                .Append("WHERE A.APP_ID = B.APP_ID ")
                .Append("AND A.SCREEN_NAME = B.SCREEN_NAME ")
                .Append("AND A.FIELD_NAME = B.FIELD_NAME ")
                .Append("AND PROFILE_ID = '" & pProfileId & "' ")
                .Append("AND B.ENTERPRISE_SYSTEM = '" & _strEnterpriseSystem & "' ")
                .Append("AND A.APP_ID IN ")
                .Append("(SELECT APP_ID ")
                .Append("FROM MT_ATPAR_PROFILE_APP_ACL ")
                .Append("WHERE CLIENT_USER = '" & YesNo_Enum.Y.ToString & "' ")
                .Append("AND PROFILE_ID = '" & pProfileId & "' ) ")

            End With

            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                With _sbLastSyncDateSQL
                    .Append("AND LAST_UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End With

            End If

            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                _strSQL = _sbListViewSQL.ToString & _sbLastSyncDateSQL.ToString

                If log.IsInfoEnabled Then log.Info(methodBaseName & "Checking the List View Details " & _
                                                            "with the following SQL......" _
                                                                & vbCrLf & _strSQL.ToString)
            Else

                _strSQL = _sbListViewSQL.ToString

                If log.IsInfoEnabled Then log.Info(methodBaseName & "Getting the List View Details " & _
                                                                    "with the following SQL......" _
                                                                        & vbCrLf & _strSQL.ToString)
            End If

            Try
                _dsListViewDetails = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                _dsListViewDetails.Tables(0).TableName = Enum_DEPENDENCIES.LIST_VIEW.ToString
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the list view details " & vbCrLf & _
                                                                    " with the following SQL :" & _strSQL & vbCrLf & _
                                                                    " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                If _dsListViewDetails.Tables(0).Rows.Count > 0 Then

                    Try
                        If log.IsInfoEnabled Then log.Info(methodBaseName & "Getting the List View Details " & _
                                                                     "with the following SQL......" _
                                                                         & vbCrLf & _sbListViewSQL.ToString)
                        _dsListViewDetails = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbListViewSQL.ToString))
                        _dsListViewDetails.Tables(0).TableName = Enum_DEPENDENCIES.LIST_VIEW.ToString
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the list view details " & vbCrLf & _
                                                                  " with the following SQL :" & _sbListViewSQL.ToString & vbCrLf & _
                                                                  " Exception is:" & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                End If

            End If

            'Add the list view table to the output dataset
            pOutPutParams.Tables.Add(_dsListViewDetails.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Copy)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _sbListViewSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsListViewDetails = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To get Carriers info 
    ''' </summary>
    ''' <param name="pLastSyncDate">Last Synchronisation Date</param>
    ''' <param name="pOutPutParams">Carriers Data as Dataset</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    Private Function Do_GetCarriers(ByVal pLastSyncDate As String, _
                                    ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String
        Dim _sbCarrierSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsCarrierDetails As DataSet
        Dim _strStatusString As String = String.Empty
        Dim _dsCarrierDataChanged As DataSet
        Dim _dtCarrierDetails As New DataTable
        Dim _drCarrierDetails As DataRow

        Try

            _strStatusString = "'" & Enum_Recv_Carrier_Status.N.ToString & "','" & Enum_Recv_Carrier_Status.O.ToString & "'"

            With _sbCarrierSQL
                .Append("SELECT CARRIER_ID ")
                .Append("FROM MT_RECV_CARRIER ")
                .Append("WHERE STATUS IN ")
            End With

            Try
                'Get the data only for status 'O' and 'N'
                _strSQL = String.Empty
                _strSQL = _sbCarrierSQL.ToString & "(" & _strStatusString & ") "

                If log.IsInfoEnabled Then log.Info(methodBaseName _
                                                       & "Getting Carriers details with the following SQL......" _
                                                            & vbCrLf & _strSQL.ToString)

                _dsCarrierDetails = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL.ToString))

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Carrier details " & vbCrLf & _
                                                                " with the following SQL :" & _strSQL.ToString & vbCrLf & _
                                                                " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                'If last sync date given then check the data even for status 'D'
                _strStatusString = _strStatusString & ", '" & Enum_Recv_Carrier_Status.D.ToString & "'"

                With _sbLastSyncDateSQL
                    .Append("AND LAST_UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End With

            End If

            If _dsCarrierDetails.Tables(0).Rows.Count > 0 Then

                If Not String.IsNullOrEmpty(pLastSyncDate) Then

                    _strSQL = _sbCarrierSQL.ToString & "(" & _strStatusString & ") " & _sbLastSyncDateSQL.ToString

                    If log.IsInfoEnabled Then log.Info(methodBaseName _
                                           & "Checking the Carriers details with the following SQL......" _
                                           & vbCrLf & _strSQL.ToString)
                    Try
                        _dsCarrierDataChanged = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL.ToString))
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Carrier details " & vbCrLf & _
                                                                " with the following SQL :" & _strSQL.ToString & vbCrLf & _
                                                                " Exception is:" & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                    If _dsCarrierDataChanged.Tables(0).Rows.Count > 0 Then

                        _dsCarrierDetails.Tables(0).TableName = Enum_DEPENDENCIES.CARRIER.ToString
                        _dsCarrierDetails.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        _dsCarrierDetails.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                        'Add the carrier table to the output dataset
                        pOutPutParams.Tables.Add(_dsCarrierDetails.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Copy)
                    Else

                        _dtCarrierDetails.TableName = Enum_DEPENDENCIES.CARRIER.ToString
                        _dtCarrierDetails.Columns.Add(Status, Type.GetType("System.String"))

                        _drCarrierDetails = _dtCarrierDetails.NewRow
                        _drCarrierDetails.Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                        _dtCarrierDetails.Rows.Add(_drCarrierDetails)

                        'Add the carrier table to the output dataset
                        pOutPutParams.Tables.Add(_dtCarrierDetails)

                    End If

                Else
                    _dsCarrierDetails.Tables(0).TableName = Enum_DEPENDENCIES.CARRIER.ToString
                    _dsCarrierDetails.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsCarrierDetails.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                    'Add the carrier table to the output dataset
                    pOutPutParams.Tables.Add(_dsCarrierDetails.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Copy)

                End If

            Else

                _dtCarrierDetails.TableName = Enum_DEPENDENCIES.CARRIER.ToString
                _dtCarrierDetails.Columns.Add(Status, Type.GetType("System.String"))

                _drCarrierDetails = _dtCarrierDetails.NewRow
                _drCarrierDetails.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtCarrierDetails.Rows.Add(_drCarrierDetails)

                'Add the carrier table to the output dataset
                pOutPutParams.Tables.Add(_dtCarrierDetails)

            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _sbCarrierSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsCarrierDetails = Nothing
            _dtCarrierDetails = Nothing
            _dsCarrierDataChanged = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To get Location groups info 
    ''' </summary>
    ''' <param name="pLastSyncDate">Last Synchronisation Date</param>
    ''' <param name="pOutPutParams">Location Groups Data as Dataset</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns> 
    Private Function Do_GetLocationGroups(ByVal pLastSyncDate As String, ByVal pUserId As String, ByVal pOrgGroupId As String, _
                                     ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sbLocGrpSQL As New StringBuilder
        Dim _sbAllLocGrpSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsLocGrpDetails As DataSet
        Dim _strStatusString As String = String.Empty
        Dim _dsLocGrpDataChanged As DataSet
        Dim _dtLocGrpDetails As New DataTable
        Dim _drLocGrpDetails As DataRow

        Try


            'With _sbLocGrpSQL
            '    .Append(" SELECT   LOC_GROUP_ID,   LAST_UPDATE_DATE ")
            '    .Append(" FROM MT_ATPAR_LOC_GROUP_ALLOCATION WHERE ")
            '    .Append(" ORG_GROUP_ID='").Append(pOrgGroupId).Append("'")
            '    .Append(" AND USER_ID='").Append(pUserId).Append("' AND APP_ID=").Append(EnumApps.Deliver)
            'End With

            With _sbLocGrpSQL
                .Append(" SELECT DROP_OFF_LOCATION_ID, LAST_UPDATE_DATE ")
                .Append(" FROM MT_DELV_LOC_DETAILS WHERE ")
                .Append(" ORG_GROUP_ID='").Append(pOrgGroupId).Append("'")
                '.Append(" AND STATUS='True'")
            End With
            With _sbAllLocGrpSQL
                .Append(" AND STATUS='True'")
            End With
            Try

                If log.IsDebugEnabled Then log.Debug(methodBaseName _
                                                       & "Getting allocated Location Groups with the following SQL......" _
                                                            & vbCrLf & _sbLocGrpSQL.ToString & _sbAllLocGrpSQL.ToString)

                _dsLocGrpDetails = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbLocGrpSQL.ToString & _sbAllLocGrpSQL.ToString))

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the LocGrp details " & sqlex.ToString)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try
            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                With _sbLastSyncDateSQL
                    .Append("AND LAST_UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End With

            End If

            If _dsLocGrpDetails.Tables(0).Rows.Count > 0 Then
                '_dsLocGrpDetails.Tables(0).TableName = Enum_DEPENDENCIES.LOCATION_GROUPS.ToString
                '_dsLocGrpDetails.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                '_dsLocGrpDetails.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                ''Add the LocGrp table to the output dataset
                'pOutPutParams.Tables.Add(_dsLocGrpDetails.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Copy)

                If Not String.IsNullOrEmpty(pLastSyncDate) Then

                    _strSQL = _sbLocGrpSQL.ToString & _sbLastSyncDateSQL.ToString

                    If log.IsDebugEnabled Then log.Debug(methodBaseName _
                                           & "Checking the LocGrps details with the following SQL......" _
                                           & vbCrLf & _strSQL)
                    Try
                        _dsLocGrpDataChanged = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the LocGrp details " & sqlex.ToString)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                    If _dsLocGrpDataChanged.Tables(0).Rows.Count > 0 Then

                        _dsLocGrpDetails.Tables(0).TableName = Enum_DEPENDENCIES.LOCATION_GROUPS.ToString
                        _dsLocGrpDetails.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        _dsLocGrpDetails.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                        'Add the LocGrp table to the output dataset
                        pOutPutParams.Tables.Add(_dsLocGrpDetails.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Copy)
                    Else

                        _dtLocGrpDetails.TableName = Enum_DEPENDENCIES.LOCATION_GROUPS.ToString
                        _dtLocGrpDetails.Columns.Add(Status, Type.GetType("System.String"))

                        _drLocGrpDetails = _dtLocGrpDetails.NewRow
                        _drLocGrpDetails.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                        _dtLocGrpDetails.Rows.Add(_drLocGrpDetails)

                        'Add the LocGrp table to the output dataset
                        'pOutPutParams.Tables.Add(_dtLocGrpDetails)

                    End If

                Else
                    _dsLocGrpDetails.Tables(0).TableName = Enum_DEPENDENCIES.LOCATION_GROUPS.ToString
                    _dsLocGrpDetails.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsLocGrpDetails.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                    'Add the LocGrp table to the output dataset
                    pOutPutParams.Tables.Add(_dsLocGrpDetails.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Copy)

                End If

            Else

                _dtLocGrpDetails.TableName = Enum_DEPENDENCIES.LOCATION_GROUPS.ToString
                _dtLocGrpDetails.Columns.Add(Status, Type.GetType("System.String"))

                _drLocGrpDetails = _dtLocGrpDetails.NewRow
                _drLocGrpDetails.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtLocGrpDetails.Rows.Add(_drLocGrpDetails)

                'Add the LocGrp table to the output dataset
                pOutPutParams.Tables.Add(_dtLocGrpDetails)

            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _sbLocGrpSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsLocGrpDetails = Nothing
            _dtLocGrpDetails = Nothing
            _dsLocGrpDataChanged = Nothing
            _sbAllLocGrpSQL = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Get the User Grouped in the logged in user group
    ''' </summary>
    ''' <param name="pLastSyncDate">Last Sync Date</param>
    ''' <param name="pDeviceTokenEntry">DeviceToken Info</param>
    ''' <param name="pOutPutParams">Dataset containing the User group info</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function Do_GetGroupUsersInfo(ByVal pLastSyncDate As String, _
                                          ByVal pDeviceTokenEntry() As String, _
                                          ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String
        Dim _sbSvrUsrSQL As New StringBuilder
        Dim _sbUsrGroupSQL As New StringBuilder
        Dim _dsSvrUsrDetails As DataSet
        Dim _dsGroupUsr As DataSet
        Dim _dtGroupUser As DataTable
        Dim _drGroupUser As DataRow
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dtSvrUsrDetails As New DataTable
        Dim _drSvrUsrDetails As DataRow
        Dim _dsSvrUsrDataChanged As DataSet
        Dim _dSUserList As DataSet
        Try

            _dtGroupUser = New DataTable
            _dtGroupUser.TableName = Enum_DEPENDENCIES.USER_GROUPS.ToString
            _dtGroupUser.Columns.Add(Enum_UserGroups.APPID.ToString, Type.GetType("System.Int32"))
            _dtGroupUser.Columns.Add(Enum_UserGroups.SRUSR.ToString, Type.GetType("System.String"))
            _dtGroupUser.Columns.Add(Enum_UserGroups.CLUSR.ToString, Type.GetType("System.String"))
            _dtGroupUser.Columns.Add(Status, Type.GetType("System.String"))

            With _sbSvrUsrSQL

                .Append("SELECT APP_ID, SERVER_USER ")
                .Append("FROM MT_ATPAR_USER_GROUPS A , MT_ATPAR_USER_ACL B ")
                .Append("WHERE A.SERVER_USER = B.USER_ID ")
                .Append("AND A.CLIENT_USER = '" & UCase(pDeviceTokenEntry(TokenEntry_Enum.UserID)) & "' ")
                .Append("AND ORG_GROUP_ID ='" & pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID) & "' ")
                .Append("AND A.APP_ID IN ")
                .Append("(SELECT APP_ID ")
                .Append("FROM MT_ATPAR_PROFILE_APP_ACL ")
                .Append("WHERE PROFILE_ID='" & pDeviceTokenEntry(TokenEntry_Enum.ProfileID) & "' ")
                .Append("AND APP_ID IN ( " & EnumApps.CartCount & " , " & EnumApps.Deliver & " )) ")

            End With

            Try

                If log.IsInfoEnabled Then log.Info(methodBaseName & _
                                      " Getting the Server Users info with the following SQL......" _
                                      & vbCrLf & _sbSvrUsrSQL.ToString & vbCrLf)

                _dsSvrUsrDetails = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSvrUsrSQL.ToString))

            Catch sqlEx As sqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the server user details " & vbCrLf & _
                                                                " with the following SQL :" & _sbSvrUsrSQL.ToString & vbCrLf & _
                                                                " Exception is:" & sqlEx.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            With _sbLastSyncDateSQL

                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    .Append("AND LAST_UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End If

            End With

            If _dsSvrUsrDetails.Tables(0).Rows.Count > 0 Then

                If Not String.IsNullOrEmpty(pLastSyncDate) Then

                    _strSQL = _sbSvrUsrSQL.ToString & _sbLastSyncDateSQL.ToString

                    If log.IsInfoEnabled Then log.Info(methodBaseName & _
                                                   " checking the Server Users info with the following SQL......" _
                                                   & vbCrLf & _strSQL.ToString & vbCrLf)

                    Try

                        _dsSvrUsrDataChanged = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL.ToString))

                    Catch sqlEx As sqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the server user details " & vbCrLf & _
                                                             " with the following SQL :" & _strSQL.ToString & vbCrLf & _
                                                             " Exception is:" & sqlEx.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                    If _dsSvrUsrDataChanged.Tables(0).Rows.Count > 0 Then
                        _dsSvrUsrDetails.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        _dsSvrUsrDetails.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
                    Else

                        _dsSvrUsrDetails = Nothing

                        _drGroupUser = _dtGroupUser.NewRow
                        _drGroupUser.Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                        _dtGroupUser.Rows.Add(_drGroupUser)
                    End If


                Else
                    _dsSvrUsrDetails.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsSvrUsrDetails.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
                End If

            Else

                Dim _sbOrgGroupUsersSQL As New StringBuilder

                With _sbOrgGroupUsersSQL

                    .Append(" SELECT C.APP_ID,B.USER_ID FROM MT_ATPAR_USER A,MT_ATPAR_USER_ORG_GROUPS B,MT_ATPAR_PROFILE_APP_ACL C, MT_ATPAR_USER_ACL D")
                    .Append(" WHERE A.USER_ID = B.USER_ID AND A.USER_ID = D.USER_ID AND A.PROFILE_ID=C.PROFILE_ID")
                    .Append(" AND C.APP_ID IN ( " & EnumApps.CartCount & " , " & EnumApps.Deliver & " )")
                    .Append(" AND C.CLIENT_USER='Y'")
                    .Append(" AND B.ORG_GROUP_ID='" & pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID) & "' AND D.ACCOUNT_DISABLED = 0 ")

                    If log.IsInfoEnabled Then log.Info(_sbOrgGroupUsersSQL.ToString())

                    _dSUserList = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbOrgGroupUsersSQL.ToString()))

                End With

                For intCnt As Integer = 0 To _dSUserList.Tables(0).Rows.Count - 1

                    _drGroupUser = _dtGroupUser.NewRow
                    _drGroupUser.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE
                    _drGroupUser.Item(Enum_UserGroups.APPID.ToString) = _dSUserList.Tables(0).Rows(intCnt).Item("APP_ID")
                    _drGroupUser.Item(Enum_UserGroups.SRUSR.ToString) = pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID)
                    _drGroupUser.Item(Enum_UserGroups.CLUSR.ToString) = _dSUserList.Tables(0).Rows(intCnt).Item("USER_ID")
                    _dtGroupUser.Rows.Add(_drGroupUser)

                Next

            End If



            Try

                If Not IsNothing(_dsSvrUsrDetails) Then

                    For intCntExits As Integer = 0 To _dsSvrUsrDetails.Tables(0).Rows.Count - 1

                        _sbUsrGroupSQL = Nothing
                        _sbUsrGroupSQL = New StringBuilder

                        With _sbUsrGroupSQL

                            .Append("SELECT CLIENT_USER ")
                            .Append("FROM MT_ATPAR_USER_GROUPS A, MT_ATPAR_USER_ACL B ")
                            .Append("WHERE A.APP_ID = " & _dsSvrUsrDetails.Tables(0).Rows(intCntExits).Item("APP_ID") & " ")
                            .Append("AND A.SERVER_USER= '" & _dsSvrUsrDetails.Tables(0).Rows(intCntExits).Item("SERVER_USER") & "' ")
                            .Append("AND B.ACCOUNT_DISABLED = " & accDisabled & " ")
                            .Append("AND A.CLIENT_USER = B.USER_ID ")
                            .Append("AND A.CLIENT_USER IN ")
                            .Append("(SELECT B.USER_ID ")
                            .Append("FROM MT_ATPAR_PROFILE_APP_ACL A, MT_ATPAR_USER B, ")
                            .Append("MT_ATPAR_USER_ACL C, MT_ATPAR_USER_ORG_GROUPS D ")
                            .Append("WHERE A.PROFILE_ID = B.PROFILE_ID ")
                            .Append("AND B.USER_ID = C.USER_ID ")
                            .Append("AND B.USER_ID = D.USER_ID ")
                            .Append("AND A.CLIENT_USER = '" & YesNo_Enum.Y.ToString & "' ")
                            .Append("AND A.APP_ID =" & _dsSvrUsrDetails.Tables(0).Rows(intCntExits).Item("APP_ID") & " ")
                            .Append("AND C.ACCOUNT_DISABLED = " & accDisabled & " ")
                            .Append("AND D.ORG_GROUP_ID ='" & pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID) & "') ")

                        End With

                        Try
                            If log.IsInfoEnabled Then log.Info(methodBaseName & _
                                                       " Getting the Client Users info for " _
                                                       & _dsSvrUsrDetails.Tables(0).Rows(intCntExits).Item("SERVER_USER") _
                                                       & " user with the following SQL......" _
                                                       & vbCrLf & _sbUsrGroupSQL.ToString & vbCrLf)

                            _dsGroupUsr = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbUsrGroupSQL.ToString))

                        Catch sqlex As SqlException
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the group users for the server user " & vbCrLf & _
                                                                                  " with the following SQL :" & _sbUsrGroupSQL.ToString & vbCrLf & _
                                                                                  " Exception is:" & sqlex.ToString & vbCrLf)
                            Return ATPAR_E_LOCALDBSELECTFAIL
                        End Try

                        For intCnt As Integer = 0 To _dsGroupUsr.Tables(0).Rows.Count - 1

                            _drGroupUser = _dtGroupUser.NewRow
                            _drGroupUser.Item(Status) = _dsSvrUsrDetails.Tables(0).Rows(intCntExits).Item("STATUS_CODE")
                            _drGroupUser.Item(Enum_UserGroups.APPID.ToString) = _dsSvrUsrDetails.Tables(0).Rows(intCntExits).Item("APP_ID")
                            _drGroupUser.Item(Enum_UserGroups.SRUSR.ToString) = _dsSvrUsrDetails.Tables(0).Rows(intCntExits).Item("SERVER_USER")
                            _drGroupUser.Item(Enum_UserGroups.CLUSR.ToString) = _dsGroupUsr.Tables(0).Rows(intCnt).Item("CLIENT_USER")
                            _dtGroupUser.Rows.Add(_drGroupUser)

                        Next

                    Next

                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed in the group user getting " & ex.ToString)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            pOutPutParams.Tables.Add(_dtGroupUser)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _sbSvrUsrSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsSvrUsrDetails = Nothing
            _sbUsrGroupSQL = Nothing
            _dtGroupUser = Nothing
            _dsGroupUsr = Nothing
            _dsSvrUsrDataChanged = Nothing
            _dtSvrUsrDetails = Nothing
        End Try

        Return ATPAR_OK

    End Function


    Private Function Do_GetBunitsForCycleCount(ByVal pLastSyncDate As String, _
                                 ByVal pUId As String, _
                                 ByVal pProfileID As String, _
                                 ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sbInvBunitsSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsAllocBunits As DataSet
        Dim _dsAllocBunitsDataChanged As DataSet
        Dim _drBunit As DataRow
        Dim _dsApps As DataSet
        Dim _strAppAccess As String = String.Empty
        Dim _statusCode As Long = -1

        Try
            _statusCode = GetProfileAppAcl(pProfileID, _dsApps)
            If _statusCode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to get the AppID details : ")
                Return E_SERVERERROR
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to invoke GetProfileAppAcl function " & _
                                                                                 vbCrLf & ex.ToString)
            Return E_SERVERERROR
        End Try


        For intCnt As Integer = 0 To _dsApps.Tables(0).Rows.Count - 1

            If _dsApps.Tables(0).Rows(intCnt).Item("APP_ID") = EnumApps.CycleCount Then

                If Not String.IsNullOrEmpty(_strAppAccess) Then
                    _strAppAccess = _strAppAccess & "," & EnumApps.CycleCount
                Else
                    _strAppAccess = EnumApps.CycleCount
                End If

            End If

        Next

        With _sbInvBunitsSQL
            .Append("SELECT BUSINESS_UNIT, APP_ID ")
            .Append("FROM MT_ATPAR_IBU_ALLOCATION ")
            .Append("WHERE USER_ID='" & pUId & "' ")
            .Append("AND APP_ID IN (" & _strAppAccess & ") ")
        End With

        _strSQL = _sbInvBunitsSQL.ToString

        If log.IsInfoEnabled Then log.Info(methodBaseName _
                       & "Getting Inventory Busines Units with the following SQL......" _
                       & vbCrLf & _strSQL & vbCrLf)

        Try
            _dsAllocBunits = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
            _dsAllocBunits.Tables(0).TableName = Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString
        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the inventory bunits " & vbCrLf & _
                                                                  " with the following SQL :" & _strSQL & vbCrLf & _
                                                                  " Exception is:" & sqlex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

        pOutPutParams.Tables.Add(_dsAllocBunits.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Copy)

    End Function
    ''' <summary>
    ''' To get Inventory Business Units
    ''' </summary>
    ''' <param name="pLastSyncDate">Last Synchronisation Date</param>
    ''' <param name="pUId">User ID</param>
    ''' <param name="pProfileID">Profile ID</param>
    ''' <param name="pOutPutParams">Inventory Business Units as Dataset</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    Private Function Do_GetInvBUnits(ByVal pLastSyncDate As String, _
                                   ByVal pUId As String, _
                                   ByVal pProfileID As String, _
                                   ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sbInvBunitsSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsAllocBunits As DataSet
        Dim _dsAllocBunitsDataChanged As DataSet
        Dim _drBunit As DataRow
        Dim _dsApps As DataSet
        Dim _strAppAccess As String = String.Empty
        Dim _statusCode As Long = -1

        Try

            Try
                _statusCode = GetProfileAppAcl(pProfileID, _dsApps)
                If _statusCode <> ATPAR_OK Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to get the AppID details : ")
                    Return E_SERVERERROR
                End If
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to invoke GetProfileAppAcl function " & _
                                                                                     vbCrLf & ex.ToString)
                Return E_SERVERERROR
            End Try

            For intCnt As Integer = 0 To _dsApps.Tables(0).Rows.Count - 1

                If _dsApps.Tables(0).Rows(intCnt).Item("APP_ID") = EnumApps.StockIssue Then

                    If Not String.IsNullOrEmpty(_strAppAccess) Then
                        _strAppAccess = _strAppAccess & "," & EnumApps.StockIssue
                    Else
                        _strAppAccess = EnumApps.StockIssue
                    End If

                End If

                'If _dsApps.Tables(0).Rows(intCnt).Item("APP_ID") = EnumApps.BinToBin Then

                '    If Not String.IsNullOrEmpty(_strAppAccess) Then
                '        _strAppAccess = _strAppAccess & "," & EnumApps.BinToBin
                '    Else
                '        _strAppAccess = EnumApps.BinToBin
                '    End If

                'End If

            Next

            With _sbInvBunitsSQL

                .Append("SELECT BUSINESS_UNIT, APP_ID, CASE WHEN COUNT_FLAG IS NULL THEN '0' ELSE COUNT_FLAG END AS COUNT_FLAG, ")
                .Append("CASE WHEN ALLOW_SIC_CONSIGN IS NULL THEN 'N' ELSE ALLOW_SIC_CONSIGN END AS ALLOW_SIC_CONSIGN ")
                .Append("FROM MT_ATPAR_IBU_ALLOCATION ")
                .Append("WHERE USER_ID='" & pUId & "' ")
                .Append("AND APP_ID IN (" & _strAppAccess & ") ")

            End With

            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                With _sbLastSyncDateSQL
                    .Append("AND UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End With

            End If

            'TODO Need to decide on this 
            'If Not String.IsNullOrEmpty(pLastSyncDate) Then

            '    _strSQL = _sbInvBunitsSQL.ToString & _sbLastSyncDateSQL.ToString

            '    If log.IsDebugEnabled Then log.Debug(methodBaseName _
            '                           & "Checking Inventory Busines Units info with the following SQL......" _
            '                           & vbCrLf & _strSQL & vbCrLf)
            'Else

            _strSQL = _sbInvBunitsSQL.ToString

            If log.IsInfoEnabled Then log.Info(methodBaseName _
                                   & "Getting Inventory Busines Units with the following SQL......" _
                                   & vbCrLf & _strSQL & vbCrLf)

            'End If

            Try
                _dsAllocBunits = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                _dsAllocBunits.Tables(0).TableName = Enum_DEPENDENCIES.INV_BU.ToString
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the inventory bunits " & vbCrLf & _
                                                                      " with the following SQL :" & _strSQL & vbCrLf & _
                                                                      " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If _dsAllocBunits.Tables(0).Rows.Count > 0 Then

                'TODO Need to decide on this 
                'If Not String.IsNullOrEmpty(pLastSyncDate) Then

                '    _dsAllocBunits = Nothing

                '    Try

                '        If log.IsDebugEnabled Then log.Debug(methodBaseName _
                '                      & "Getting Inventory Busines Units with the following SQL......" _
                '                      & vbCrLf & _sbInvBunitsSQL.ToString & vbCrLf)

                '        _dsAllocBunits = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbInvBunitsSQL.ToString))
                '        _dsAllocBunits.Tables(0).TableName = Enum_DEPENDENCIES.INV_BU.ToString
                '    Catch sqlex As SqlException
                '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the inventory " & _
                '                                                    "bunits " & vbCrLf & sqlex.ToString)
                '        Return ATPAR_E_LOCALDBSELECTFAIL
                '    End Try

                'End If
                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    _strSQL = _sbInvBunitsSQL.ToString & _sbLastSyncDateSQL.ToString

                    If log.IsInfoEnabled Then log.Info(methodBaseName _
                                           & "Getting Inventory Busines Units with the following SQL......" _
                                           & vbCrLf & _strSQL & vbCrLf)
                    Try
                        _dsAllocBunitsDataChanged = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                        ' _dsAllocBunits.Tables(0).TableName = Enum_DEPENDENCIES.INV_BU.ToString
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the inventory bunits " & vbCrLf & _
                                                                              " with the following SQL :" & _strSQL & vbCrLf & _
                                                                              " Exception is:" & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                    If _dsAllocBunitsDataChanged.Tables(0).Rows.Count > 0 Then
                        _dsAllocBunits.Tables(0).TableName = Enum_DEPENDENCIES.INV_BU.ToString
                        _dsAllocBunits.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        '_dtAllocBunits.Columns.Add(bunitAPPID, Type.GetType("System.String"))
                        '_dtAllocBunits.Columns.Add(bunit, Type.GetType("System.String"))
                        '_dtAllocBunits.Columns.Add(countflag, Type.GetType("System.String"))

                        _dsAllocBunits.Tables(0).Rows(0).BeginEdit()
                        _dsAllocBunits.Tables(0).Rows(0).Item(Status) = S_DATAEXISTS_INTABLE
                        _dsAllocBunits.Tables(0).Rows(0).EndEdit()
                        pOutPutParams.Tables.Add(_dsAllocBunits.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Copy)

                    Else
                        _dsAllocBunits = Nothing

                        _dsAllocBunits = New DataSet
                        Dim _dtAllocBunits As New DataTable
                        _dtAllocBunits.TableName = Enum_DEPENDENCIES.INV_BU.ToString
                        _dtAllocBunits.Columns.Add(Status, Type.GetType("System.String"))
                        _drBunit = _dtAllocBunits.NewRow
                        _drBunit.Item(Status) = S_NO_DATAEXISTS_INTABLE
                        _dtAllocBunits.Rows.Add(_drBunit)
                        _dsAllocBunits.Tables.Add(_dtAllocBunits)
                    End If
                Else

                    _dsAllocBunits.Tables(0).TableName = Enum_DEPENDENCIES.INV_BU.ToString
                    _dsAllocBunits.Tables(0).Columns.Add(Status, Type.GetType("System.String"))

                    _dsAllocBunits.Tables(0).Rows(0).BeginEdit()
                    _dsAllocBunits.Tables(0).Rows(0).Item(Status) = S_DATAEXISTS_INTABLE
                    _dsAllocBunits.Tables(0).Rows(0).EndEdit()
                    pOutPutParams.Tables.Add(_dsAllocBunits.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Copy)

                End If
                '_dsAllocBunits.Tables(0).Columns.Add(Status, Type.GetType("System.String"))

                '_dsAllocBunits.Tables(0).Rows(0).BeginEdit()
                '_dsAllocBunits.Tables(0).Rows(0).Item(Status) = S_DATAEXISTS_INTABLE
                '_dsAllocBunits.Tables(0).Rows(0).EndEdit()


            Else

                _dsAllocBunits = Nothing

                _dsAllocBunits = New DataSet
                Dim _dtAllocBunits As New DataTable
                _dtAllocBunits.TableName = Enum_DEPENDENCIES.INV_BU.ToString
                _dtAllocBunits.Columns.Add(Status, Type.GetType("System.String"))
                '_dtAllocBunits.Columns.Add(bunitAPPID, Type.GetType("System.String"))
                '_dtAllocBunits.Columns.Add(bunit, Type.GetType("System.String"))
                '_dtAllocBunits.Columns.Add(countflag, Type.GetType("System.String"))
                _drBunit = _dtAllocBunits.NewRow

                'If String.IsNullOrEmpty(pLastSyncDate) Then
                _drBunit.Item(Status) = S_NO_DATAEXISTS_INTABLE
                '    Else
                '    _drBunit.Item(Status) = S_DATAEXISTS_INTABLE
                'End If

                _dtAllocBunits.Rows.Add(_drBunit)

                _dsAllocBunits.Tables.Add(_dtAllocBunits)
                pOutPutParams.Tables.Add(_dsAllocBunits.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Copy)
            End If

            'pOutPutParams.Tables.Add(_dsAllocBunits.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Copy)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString)
            Return E_SERVERERROR
        Finally
            _dsAllocBunits = Nothing
            _sbInvBunitsSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsAllocBunitsDataChanged = Nothing
        End Try

        Return ATPAR_OK

    End Function
    ''' <summary>
    ''' To get Business Units for ParcelCOunt
    ''' </summary>
    ''' <param name="pOrgGrpID">OrgGrpID</param>
    '''  <param name="pLastSyncDate">Last Synchronisation Date</param>
    ''' <param name="pOutPutParams">Inventory Business Units as Dataset</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>


    Private Function Do_GetBUnitsforParcel(ByVal pOrgGrpID As String, _
                                           ByVal plastSyncDate As String, _
                                           ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _dsAllocBunits As DataSet
        Dim _strSQL As String = String.Empty
        Dim _sbAllBunitsSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsBunits As DataSet
        Dim _dsBunitsDataChanged As DataSet
        Dim _drBunit As DataRow
        Dim _dtBunit As New DataTable
        Dim _dsApps As DataSet
        Dim _strAppAccess As String = String.Empty
        Dim _statusCode As Long = -1
        _dsAllocBunits = New DataSet
        Try


            With _sbAllBunitsSQL

                .Append("SELECT BUSINESS_UNIT,BU_TYPE ")
                .Append("FROM MT_ATPAR_ORG_GROUP_BUNITS ")
                .Append("WHERE ORG_GROUP_ID='" & pOrgGrpID & "'")

            End With

            _strSQL = _sbAllBunitsSQL.ToString

            If log.IsDebugEnabled Then log.Debug(methodBaseName _
                                   & "Getting Inventory Busines Units with the following SQL......" _
                                   & vbCrLf & _strSQL & vbCrLf)

            Try
                _dsBunits = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                ' _dsBunits.Tables(0).TableName = Enum_DEPENDENCIES.ALL_BU.ToString
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the inventory bunits " & _
                                                         vbCrLf & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try
            If Not String.IsNullOrEmpty(plastSyncDate) Then
                With _sbLastSyncDateSQL
                    .Append("AND LAST_UPDATE_DATE > CONVERT(DATETIME, '" & plastSyncDate & "', 101)")
                End With
            End If

            If _dsBunits.Tables(0).Rows.Count > 0 Then

                If Not String.IsNullOrEmpty(plastSyncDate) Then

                    _strSQL = _sbAllBunitsSQL.ToString & _sbLastSyncDateSQL.ToString
                    If log.IsDebugEnabled Then log.Debug(methodBaseName _
                                  & "Getting Inventory Busines Units with the following SQL......" _
                                  & vbCrLf & _strSQL & vbCrLf)

                    Try
                        _dsBunitsDataChanged = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                        '_dsBunitsDataChanged.Tables(0).TableName = Enum_DEPENDENCIES.ALL_BU.ToString
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the inventory bunits " & _
                                                                 vbCrLf & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try
                    If _dsBunitsDataChanged.Tables(0).Rows.Count > 0 Then
                        _dsBunits.Tables(0).TableName = Enum_DEPENDENCIES.ALL_BU.ToString
                        _dsBunits.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        _dsBunits.Tables(0).Rows(0).BeginEdit()
                        _dsBunits.Tables(0).Rows(0).Item(Status) = S_DATAEXISTS_INTABLE
                        _dsBunits.Tables(0).Rows(0).EndEdit()
                        pOutPutParams.Tables.Add(_dsBunits.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Copy)
                    Else
                        _dtBunit.TableName = Enum_DEPENDENCIES.ALL_BU.ToString
                        _dtBunit.Columns.Add(Status, Type.GetType("System.String"))
                        _drBunit = _dtBunit.NewRow
                        _drBunit.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE
                        _dtBunit.Rows.Add(_drBunit)
                        _dsBunits.Tables.Add(_dtBunit)
                    End If
                Else
                    _dsBunits.Tables(0).TableName = Enum_DEPENDENCIES.ALL_BU.ToString
                    _dsBunits.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsBunits.Tables(0).Rows(0).BeginEdit()
                    _dsBunits.Tables(0).Rows(0).Item(Status) = S_DATAEXISTS_INTABLE
                    _dsBunits.Tables(0).Rows(0).EndEdit()
                    pOutPutParams.Tables.Add(_dsBunits.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Copy)

                End If
            Else
                _dtBunit.TableName = Enum_DEPENDENCIES.ALL_BU.ToString
                _dtBunit.Columns.Add(Status, Type.GetType("System.String"))
                _drBunit = _dtBunit.NewRow
                _drBunit.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE
                _dtBunit.Rows.Add(_drBunit)
                _dsBunits.Tables.Add(_dtBunit)
                pOutPutParams.Tables.Add(_dsBunits.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Copy)
                '_dsBunits.Tables(0).Columns.Add(Status, Type.GetType("System.String"))

                '_dsBunits.Tables(0).Rows(0).BeginEdit()
                '_dsBunits.Tables(0).Rows(0).Item(Status) = S_DATAEXISTS_INTABLE
                '_dsBunits.Tables(0).Rows(0).EndEdit()

            End If
            ' pOutPutParams.Tables.Add(_dsBunits.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Copy)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString)
            Return E_SERVERERROR
        Finally
            _dsBunits = Nothing
            _sbAllBunitsSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsBunitsDataChanged = Nothing
        End Try

        Return ATPAR_OK

    End Function
    ''' <summary>
    ''' Checks, whether Symbology types are need to synch or not, if yes, gets the symbology types data and sends
    ''' </summary>
    ''' <param name="plastSyncDate">Last sync date</param>
    ''' <param name="pProfileId">profile ID</param>
    ''' <param name="pOutPutParams">Output dataset containing the Symbology Types data</param>
    ''' <returns>ATPAR_OK on Success, else ERROR_CODE</returns>
    ''' <remarks></remarks>
    Private Function Do_GetSymbologyTypes(ByVal pLastSyncDate As String, _
               ByVal pProfileID As String, _
               ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _blnCheck As Boolean
        Dim _Cmd As SqlCommand
        Dim _sbSQL As New StringBuilder
        Dim _dsSymbologyTypes As DataSet

        Try
            Dim sql_parm_ProfileID As SqlParameter = New SqlParameter("@pProfileID", SqlDbType.VarChar, 50)
            sql_parm_ProfileID.Value = pProfileID
            Dim sql_parm_Result As SqlParameter = New SqlParameter("@pResult", SqlDbType.Bit)
            sql_parm_Result.Direction = ParameterDirection.Output

            If log.IsInfoEnabled Then
                log.Info("Calling sp_CheckSymbologySync with the following syntax..")
                Dim _strSQL As String = "exec sp_CheckSymbologySync " & _
                                         "'" & sql_parm_ProfileID.Value & "', " & _
                                         "'" & sql_parm_Result.direction & "' "
                log.Info(_strSQL)
            End If

            _Cmd = New SqlCommand
            _Cmd.Connection = m_LocalDB.CreateConnection
            _Cmd.CommandType = CommandType.StoredProcedure
            _Cmd.CommandText = "sp_CheckSymbologySync"
            _Cmd.Parameters.Add(sql_parm_ProfileID)
            _Cmd.Parameters.Add(sql_parm_Result)

            m_LocalDB.ExecuteNonQuery(_Cmd)

            _blnCheck = sql_parm_Result.Value

            _Cmd.Parameters.Clear()

            If _blnCheck Then
                With _sbSQL
                    .Append("SELECT SYMBOLOGY_TYPE, BARCODE_LENGTH, ID_START_POSITION, LENGTH ")
                    .Append("FROM MT_ATPAR_BARCODE_SYMBOLOGY ")
                End With

                Try
                    If log.IsInfoEnabled Then log.Info("Before executing query: " & _sbSQL.ToString)

                    _dsSymbologyTypes = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))

                    _dsSymbologyTypes.Tables(0).TableName = Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString

                    If _dsSymbologyTypes.Tables(0).Rows.Count > 0 Then
                        If log.IsDebugEnabled Then log.Debug("Got the records, and adding the table to output dataset")

                        _dsSymbologyTypes.Tables(0).Columns.Add(Status, Type.GetType("System.String"))

                        _dsSymbologyTypes.Tables(0).Rows(0).BeginEdit()
                        _dsSymbologyTypes.Tables(0).Rows(0).Item(Status) = S_DATAEXISTS_INTABLE
                        _dsSymbologyTypes.Tables(0).Rows(0).EndEdit()
                    Else
                        If log.IsDebugEnabled Then log.Debug("No Data found for Symbology Types")
                        _dsSymbologyTypes = Nothing
                        _dsSymbologyTypes = New DataSet
                        Dim _dtSymbologyTypes As New DataTable
                        Dim _drSymbologyType As DataRow
                        _dtSymbologyTypes.TableName = Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString
                        _dtSymbologyTypes.Columns.Add(Status, Type.GetType("System.String"))
                        _drSymbologyType = _dtSymbologyTypes.NewRow
                        _drSymbologyType.Item(Status) = S_NO_DATAEXISTS_INTABLE
                        _dtSymbologyTypes.Rows.Add(_drSymbologyType)
                        _dsSymbologyTypes.Tables.Add(_dtSymbologyTypes)
                    End If

                    pOutPutParams.Tables.Add(_dsSymbologyTypes.Tables(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString).Copy)

                Catch sqlex As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Symbology Type Details " & vbCrLf & _
                                                                    " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                                    " Exception is:" & sqlex.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBSELECTFAIL
                End Try
            Else
                If log.IsDebugEnabled Then log.Debug("No parameters are assigned to get the Symbology Types")
            End If

            Do_GetSymbologyTypes = ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString)
            Return E_SERVERERROR
        Finally
            _Cmd.Dispose()
            _dsSymbologyTypes = Nothing
        End Try
    End Function
    ''' <summary>
    ''' Gets the notes data
    ''' </summary>
    ''' <param name="pStrUserName">Logged in user ID</param>
    ''' <param name="plastSyncDate">Last sync date</param>
    ''' <param name="pProfileId">profile ID</param>
    ''' <param name="pOutPutParams">Output dataset containing the notes data</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function Do_GetNotes(ByVal pStrUserName As String, _
                                 ByVal plastSyncDate As String, _
                                 ByVal pProfileId As String, _
                                 ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _intAppId As Integer
        Dim _dsNotes As DataSet
        Dim _dsCodes As DataSet
        Dim _strTableName As String = String.Empty
        Dim _strFieldName As String = String.Empty
        Dim _strScreenName As String = String.Empty
        Dim _strSQL As String = String.Empty
        Dim _dtCodes As New DataTable
        Dim _drCodes As DataRow

        Try

            _dtCodes.TableName = Enum_DEPENDENCIES.NOTESCODES.ToString
            _dtCodes.Columns.Add("APP_ID", Type.GetType("System.Int32"))
            _dtCodes.Columns.Add("SCREEN_NAME", Type.GetType("System.String"))
            _dtCodes.Columns.Add("CODE_ID", Type.GetType("System.String"))

            With _sbSQL

                .Append("SELECT APP_ID, SCREEN_NAME, NOTES_LABEL, NOTES_LIST_DISPLAY, ")
                .Append("NOTES_TABLE_NAME, NOTES_FIELD_NAME, ALLOW_EDIT_NOTES, ")
                .Append("CAPTURE_CODE, APPEND_SELECTED_TEXT ")
                .Append("FROM MT_ATPAR_NOTES_SETUP ")
                .Append("WHERE APP_ID IN (")
                .Append("SELECT APP_ID ")
                .Append("FROM MT_ATPAR_PROFILE_APP_ACL ")
                .Append("WHERE CLIENT_USER = '" & YesNo_Enum.Y.ToString & "' ")
                .Append("AND PROFILE_ID = '" & pProfileId & "') ")

            End With

            With _sbLastSyncDateSQL

                If Not String.IsNullOrEmpty(plastSyncDate) Then
                    .Append("AND UPDATE_DATE > '" & plastSyncDate & "'")
                End If

            End With

            If Not String.IsNullOrEmpty(plastSyncDate) Then

                _strSQL = _sbSQL.ToString & _sbLastSyncDateSQL.ToString

                If log.IsInfoEnabled Then log.Info(methodBaseName & _
                                              "Checking the Notes details with the following SQL......" _
                                              & vbCrLf & _strSQL)

            Else

                _strSQL = _sbSQL.ToString

                If log.IsInfoEnabled Then log.Info(methodBaseName & _
                              "Getting the Notes details with the following SQL......" _
                              & vbCrLf & _strSQL)


            End If

            Try

                _dsNotes = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_strSQL))

                _dsNotes.Tables(0).TableName = Enum_DEPENDENCIES.NOTES.ToString

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Notes Details " & vbCrLf & _
                                                                      " with the following SQL :" & _strSQL & vbCrLf & _
                                                                      " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If _dsNotes.Tables(0).Rows.Count > 0 Then

                If Not String.IsNullOrEmpty(plastSyncDate) Then

                    Try

                        If log.IsInfoEnabled Then log.Info(methodBaseName & _
                                       "Getting the Notes details with the following SQL......" _
                                       & vbCrLf & _sbSQL.ToString)

                        _dsNotes = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))

                        _dsNotes.Tables(0).TableName = Enum_DEPENDENCIES.NOTES.ToString

                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Notes Details " & vbCrLf & _
                                                                    " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                                    " Exception is:" & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                End If

            End If

            For intCntExits As Integer = 0 To _dsNotes.Tables(0).Rows.Count - 1

                _intAppId = -1
                _strScreenName = String.Empty
                _strTableName = String.Empty
                _strFieldName = String.Empty

                _intAppId = _dsNotes.Tables(0).Rows(intCntExits).Item("APP_ID")
                _strScreenName = _dsNotes.Tables(0).Rows(intCntExits).Item("SCREEN_NAME")

                If Not IsDBNull(_dsNotes.Tables(0).Rows(intCntExits).Item("NOTES_TABLE_NAME")) Then
                    _strTableName = _dsNotes.Tables(0).Rows(intCntExits).Item("NOTES_TABLE_NAME")
                End If

                If Not IsDBNull(_dsNotes.Tables(0).Rows(intCntExits).Item("NOTES_FIELD_NAME")) Then
                    _strFieldName = _dsNotes.Tables(0).Rows(intCntExits).Item("NOTES_FIELD_NAME")
                End If

                If (Not String.IsNullOrEmpty(_strTableName)) And (Not String.IsNullOrEmpty(_strFieldName)) Then

                    _strSQL = String.Empty

                    _strSQL = "SELECT " & _strFieldName & " FROM " & _strTableName

                    Try
                        If log.IsInfoEnabled Then log.Info(methodBaseName & " : Getting the Codes for " & _
                                                                "the screen with the following SQL..... " & _
                                                                    vbCrLf & _strSQL)
                        _dsCodes = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_strSQL))
                    Catch sqlex As sqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the codes " & vbCrLf & _
                                                                    " with the following SQL :" & _strSQL & vbCrLf & _
                                                                    " Exception is:" & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                    If _dsCodes.Tables(0).Rows.Count > 0 Then

                        For _intCnt As Integer = 0 To _dsCodes.Tables(0).Rows.Count - 1

                            _drCodes = _dtCodes.NewRow()
                            _drCodes.Item("APP_ID") = _intAppId
                            _drCodes.Item("SCREEN_NAME") = _strScreenName
                            _drCodes.Item("CODE_ID") = _dsCodes.Tables(0).Rows(_intCnt).Item(_strFieldName)

                            _dtCodes.Rows.Add(_drCodes)

                        Next

                    End If

                End If

            Next

            'If _dsNotes.Tables.Count > 0 Then
            pOutPutParams.Tables.Add(_dsNotes.Tables(Enum_DEPENDENCIES.NOTES.ToString).Copy)
            'End If
            pOutPutParams.Tables.Add(_dtCodes)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Called failed :" & ex.ToString)
            Return E_SERVERERROR
        Finally
            _dsNotes = Nothing
            _dtCodes = Nothing
            _dsNotes = Nothing
            _sbSQL = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Gets the Ship To Id details
    ''' </summary>
    ''' <param name="pUname">Logged in User ID</param>
    ''' <param name="pLastSyncDate">Last Synchronisation Date</param>
    ''' <param name="pOutPutParams">Output dataset containing the ship to ids</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function Do_GetShipToIDs(ByVal pUname As String, _
                                      ByVal plastSyncDate As String, _
                                      ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsShipToIds As DataSet
        Dim _dsShipToIdsDataChanged As DataSet
        Dim _dtShipToIds As New DataTable
        Dim _drShipToIds As DataRow
        Dim _strSQL As String = String.Empty

        Try

            With _sbSQL
                .Append("SELECT SETID, SHIPTO_ID, USER_ID ")
                .Append("FROM MT_RECV_SHIPTO_ID_ALLOCATION ")
                .Append("WHERE USER_ID ='" & pUname & "'")
            End With
            ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
            Try

                If log.IsInfoEnabled Then log.Info(methodBaseName _
                                                        & "Getting Ship To IDs with the following SQL......" _
                                                            & vbCrLf & _sbSQL.ToString & vbCrLf)

                _dsShipToIds = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Ship to ID's data " & vbCrLf & _
                                                                      " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                                      " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            With _sbLastSyncDateSQL

                If Not String.IsNullOrEmpty(plastSyncDate) Then
                    .Append("AND LAST_UPDATE_DATE >  CONVERT(DATETIME,'" & plastSyncDate & "',101)")
                End If

            End With

            If _dsShipToIds.Tables(0).Rows.Count > 0 Then

                If Not String.IsNullOrEmpty(plastSyncDate) Then
                    Try

                        If log.IsInfoEnabled Then log.Info(methodBaseName _
                                                                & "Getting Ship To IDs with the following SQL......" _
                                                                    & vbCrLf & _sbSQL.ToString & _sbLastSyncDateSQL.ToString & vbCrLf)

                        _dsShipToIdsDataChanged = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString & _sbLastSyncDateSQL.ToString))
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Ship to ID's data " & vbCrLf & _
                                                                              " with the following SQL :" & _sbSQL.ToString & _sbLastSyncDateSQL.ToString & vbCrLf & _
                                                                              " Exception is:" & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try
                    If _dsShipToIdsDataChanged.Tables(0).Rows.Count > 0 Then
                        _dsShipToIds.Tables(0).TableName = Enum_DEPENDENCIES.SHIP_TO_ID.ToString
                        _dsShipToIds.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        _dsShipToIds.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
                        pOutPutParams.Tables.Add(_dsShipToIds.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Copy)
                    Else
                        _dtShipToIds.TableName = Enum_DEPENDENCIES.SHIP_TO_ID.ToString
                        _dtShipToIds.Columns.Add(Status, Type.GetType("System.String"))

                        _drShipToIds = _dtShipToIds.NewRow
                        _drShipToIds.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                        _dtShipToIds.Rows.Add(_drShipToIds)

                        _dsShipToIds.Tables.Add(_dtShipToIds)
                    End If
                Else
                    _dsShipToIds.Tables(0).TableName = Enum_DEPENDENCIES.SHIP_TO_ID.ToString
                    _dsShipToIds.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsShipToIds.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
                    pOutPutParams.Tables.Add(_dsShipToIds.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Copy)
                End If



            Else
                _dtShipToIds.TableName = Enum_DEPENDENCIES.SHIP_TO_ID.ToString
                _dtShipToIds.Columns.Add(Status, Type.GetType("System.String"))

                _drShipToIds = _dtShipToIds.NewRow
                _drShipToIds.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtShipToIds.Rows.Add(_drShipToIds)

                _dsShipToIds.Tables.Add(_dtShipToIds)
                pOutPutParams.Tables.Add(_dsShipToIds.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Copy)
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dsShipToIds = Nothing
            _dtShipToIds = Nothing
            _dsShipToIdsDataChanged = Nothing
            _sbLastSyncDateSQL = Nothing
            _sbSQL = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To get Distribution Types
    ''' </summary>
    ''' <param name="pLastSynchDate">Last Synchronisation Date</param>
    ''' <param name="pUId">User ID</param>
    ''' <param name="pOutPutParams">Distribution Types as Dataset</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    Private Function Do_GetDistTypes(ByVal pLastSynchDate As String, _
                                     ByVal pUId As String, _
                                     ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbDistTypesSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _strSQL As String = String.Empty
        Dim _dsDistTypes As DataSet
        Dim _dtDistTypes As New DataTable
        Dim _drDistTypes As DataRow
        Dim _dsDistDataChanged As DataSet

        Try

            With _sbDistTypesSQL

                .Append("SELECT DISTINCT DISTRIB_TYPE ")
                .Append("FROM MT_STIS_DISTRIB_TYPE ")
                .Append("WHERE USER_ID='" & pUId & "' ")

            End With

            Try

                If log.IsInfoEnabled Then log.Info(methodBaseName & _
                    "Getting the Distribution Types info with the following SQL......" _
                   & vbCrLf & _sbDistTypesSQL.ToString)

                _dsDistTypes = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbDistTypesSQL.ToString))

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the distribution types info " & vbCrLf & _
                                                                     " with the following SQL :" & _sbDistTypesSQL.ToString & vbCrLf & _
                                                                     " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            With _sbLastSyncDateSQL

                If Not String.IsNullOrEmpty(pLastSynchDate) Then
                    .Append("AND UPDATE_DATE > CONVERT(DATETIME, '" & pLastSynchDate & "', 101)")
                End If

            End With

            'If data exists in the MT_STIS_DISTRIB_TYPE for the user then add the statuscode 
            ' S_DATAEXISTS_INTABLE to the dataset
            'If data exists in the table then check for updated data,
            'any updates occured, then append the first executed datatable which 
            'contains all the data to the output dataset
            If _dsDistTypes.Tables(0).Rows.Count > 0 Then

                If Not String.IsNullOrEmpty(pLastSynchDate) Then

                    _strSQL = _sbDistTypesSQL.ToString & _sbLastSyncDateSQL.ToString

                    If log.IsInfoEnabled Then log.Info(methodBaseName & _
                                                   "Checking the Distribution Types info with the following SQL......" _
                                                        & vbCrLf & _strSQL)

                    Try
                        _dsDistDataChanged = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_strSQL))

                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the distribution types info " & vbCrLf & _
                                                                              " with the following SQL :" & _strSQL & vbCrLf & _
                                                                              " Exception is:" & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                    If _dsDistDataChanged.Tables(0).Rows.Count > 0 Then

                        _dsDistTypes.Tables(0).TableName = Enum_DEPENDENCIES.DISTRIB_TYPES.ToString
                        _dsDistTypes.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        _dsDistTypes.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                        pOutPutParams.Tables.Add(_dsDistTypes.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Copy)

                    Else

                        _dtDistTypes.TableName = Enum_DEPENDENCIES.DISTRIB_TYPES.ToString
                        _dtDistTypes.Columns.Add(Status, Type.GetType("System.String"))

                        _drDistTypes = _dtDistTypes.NewRow
                        _drDistTypes.Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                        _dtDistTypes.Rows.Add(_drDistTypes)

                        pOutPutParams.Tables.Add(_dtDistTypes)

                    End If

                Else

                    _dsDistTypes.Tables(0).TableName = Enum_DEPENDENCIES.DISTRIB_TYPES.ToString
                    _dsDistTypes.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsDistTypes.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                    pOutPutParams.Tables.Add(_dsDistTypes.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Copy)

                End If


            Else

                _dtDistTypes.TableName = Enum_DEPENDENCIES.DISTRIB_TYPES.ToString
                _dtDistTypes.Columns.Add(Status, Type.GetType("System.String"))

                _drDistTypes = _dtDistTypes.NewRow
                _drDistTypes.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtDistTypes.Rows.Add(_drDistTypes)

                pOutPutParams.Tables.Add(_dtDistTypes)

            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _dsDistTypes = Nothing
            _dtDistTypes = Nothing
            _sbDistTypesSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsDistDataChanged = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To Get the Business Units allocated for Receive IUT or PutAway IUT
    ''' </summary>
    ''' <param name="pLastSyncDate">Last Sync Date</param>
    ''' <param name="pOutPutParams">OutPut dataset containing the IUT Bunits Info </param>
    ''' <param name="pDeviceTokenEntry">DeviceToken Info</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function Do_GetIUTInvBUnits(ByVal pLastSyncDate As String, _
                                        ByRef pOutPutParams As DataSet, _
                                        ByVal pDeviceTokenEntry() As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sbRecvIUTBunitsSQL As New StringBuilder
        Dim _sbPtwyIUTBunitsSQL As New StringBuilder
        Dim _StatusCode As Long = -1
        Dim _atparParameters As Atpar_Application_Parameters
        Dim _strRecvIUTAccess As String = String.Empty
        Dim _strPtwyIUTAccess As String = String.Empty
        Dim _dsIUTBunits As DataSet
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsIUTBunitsDataChanged As DataSet
        Dim _dtIUTBunits As New DataTable
        Dim _drIUTBunits As DataRow

        Try

            _atparParameters = Atpar_Application_Parameters.CreateInstance(pDeviceTokenEntry(TokenEntry_Enum.SystemId))

            Dim _profParams As SortedList
            _profParams = New SortedList
            _profParams(AppParameters_Enum.PO_IUT_RECEIVING.ToString) = String.Empty

            _atparParameters.ProfileId = pDeviceTokenEntry(TokenEntry_Enum.ProfileID).ToString

            'Fetch the IUTAccess parameter for receive
            Try
                _atparParameters.ApplicationId = EnumApps.Receiving

                _StatusCode = _atparParameters.GetProfileParamValues(_profParams)

                If _StatusCode <> ATPAR_OK Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to IUT Access profile " & _
                                                        "param for receive ")
                    Return _StatusCode
                End If

                _strRecvIUTAccess = _profParams(AppParameters_Enum.PO_IUT_RECEIVING.ToString)

            Catch ex As Exception
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to Get ProfileParam Values " & _
                                                        "for Receive ")
                Return _StatusCode
            End Try

            'Fetch the IUTAccess parameter for putaway
            Try
                _atparParameters.ApplicationId = EnumApps.PutAway

                _StatusCode = _atparParameters.GetProfileParamValues(_profParams)

                If _StatusCode <> ATPAR_OK Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to IUT Access profile " & _
                                                        "param for putaway ")
                    Return _StatusCode
                End If

                _strPtwyIUTAccess = _profParams(AppParameters_Enum.PO_IUT_RECEIVING.ToString)

            Catch ex As Exception
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to Get ProfileParam " & _
                                                        "Values for putaway ")
                Return _StatusCode
            End Try

            With _sbRecvIUTBunitsSQL

                .Append("SELECT BUSINESS_UNIT ")
                .Append("FROM MT_ATPAR_IBU_ALLOCATION ")
                .Append("WHERE USER_ID ='" & pDeviceTokenEntry(TokenEntry_Enum.UserID) & "' ")
                .Append("AND APP_ID = " & EnumApps.Receiving & "")

            End With

            With _sbPtwyIUTBunitsSQL

                .Append("SELECT BUSINESS_UNIT ")
                .Append("FROM MT_PTWY_BU_ALLOCATION ")
                .Append("WHERE USER_ID ='" & pDeviceTokenEntry(TokenEntry_Enum.UserID) & "'")

            End With

            With _sbLastSyncDateSQL

                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    .Append("AND UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End If

            End With

            If Not String.IsNullOrEmpty(_strRecvIUTAccess) Then

                If Not UCase(_strRecvIUTAccess) = IUTAccess Then
                    _strSQL = _sbRecvIUTBunitsSQL.ToString
                End If

            End If

            If Not String.IsNullOrEmpty(_strPtwyIUTAccess) Then

                If Not UCase(_strPtwyIUTAccess) = IUTAccess Then

                    'If IUT Access is given for both receive and putaway then 
                    'get the data for the union of both the queries
                    'if not get data for only putaway
                    If Not String.IsNullOrEmpty(_strSQL) Then
                        _strSQL = _strSQL & " UNION " & _sbPtwyIUTBunitsSQL.ToString
                    Else
                        _strSQL = _sbPtwyIUTBunitsSQL.ToString
                    End If

                End If

            End If

            If Not String.IsNullOrEmpty(_strSQL) Then

                Try

                    If log.IsInfoEnabled Then log.Info(methodBaseName & _
                                " : Getting the IUT Bunits info with the following SQL......" _
                                            & vbCrLf & _strSQL & vbCrLf)

                    _dsIUTBunits = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_strSQL))

                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the IUT Bunits info  " & vbCrLf & _
                                                                     " with the following SQL :" & _strSQL & vbCrLf & _
                                                                     " Exception is:" & sqlEx.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBSELECTFAIL
                End Try

            End If

            If Not _dsIUTBunits Is Nothing Then

                If _dsIUTBunits.Tables(0).Rows.Count > 0 Then

                    'TODO : Need to decide on this
                    'If Not String.IsNullOrEmpty(pLastSyncDate) Then

                    '    _strSQL = String.Empty

                    '    If Not _strRecvIUTAccess = IUTAccess Then
                    '        _strSQL = _sbRecvIUTBunitsSQL.ToString & _sbLastSyncDateSQL.ToString
                    '    End If

                    '    If Not _strPtwyIUTAccess = IUTAccess Then

                    '        If Not String.IsNullOrEmpty(_strSQL) Then
                    '            _strSQL = _strSQL & " UNION " & _sbPtwyIUTBunitsSQL.ToString & _sbLastSyncDateSQL.ToString
                    '        Else
                    '            _strSQL = _sbPtwyIUTBunitsSQL.ToString & _sbLastSyncDateSQL.ToString
                    '        End If

                    '    End If

                    '    Try

                    '        If log.IsDebugEnabled Then log.Debug(methodBaseName & _
                    '                    " : Checking the IUT Bunits info with the following SQL......" _
                    '                                & vbCrLf & _strSQL & vbCrLf)

                    '        _dsIUTBunitsDataChanged = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_strSQL))

                    '    Catch sqlEx As SqlException
                    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get " & _
                    '                                                 "the IUT Bunits info " & vbCrLf & sqlEx.ToString)
                    '        Return ATPAR_E_LOCALDBSELECTFAIL
                    '    End Try

                    '    'If data exists in the tables for the user then add the statuscode 
                    '    ' S_DATAEXISTS_INTABLE to the dataset
                    '    'If data exists in the table then check for updated data,
                    '    'any updates occured, then append the first executed datatable which 
                    '    'contains all the data to the output dataset
                    '    If _dsIUTBunitsDataChanged.Tables(0).Rows.Count > 0 Then

                    _dsIUTBunits.Tables(0).TableName = Enum_DEPENDENCIES.IUT_BU.ToString

                    _dsIUTBunits.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsIUTBunits.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                    pOutPutParams.Tables.Add(_dsIUTBunits.Tables(Enum_DEPENDENCIES.IUT_BU.ToString).copy)

                    'Else

                    '    _dtIUTBunits.TableName = Enum_DEPENDENCIES.IUT_BU.ToString
                    '    _dtIUTBunits.Columns.Add(Status, Type.GetType("System.String"))

                    '    _drIUTBunits = _dtIUTBunits.NewRow
                    '    _drIUTBunits.Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                    '    _dtIUTBunits.Rows.Add(_drIUTBunits)

                    '    pOutPutParams.Tables.Add(_dtIUTBunits)

                    'End If

                    'End If

                Else

                    _dtIUTBunits.TableName = Enum_DEPENDENCIES.IUT_BU.ToString
                    _dtIUTBunits.Columns.Add(Status, Type.GetType("System.String"))

                    _drIUTBunits = _dtIUTBunits.NewRow
                    _drIUTBunits.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                    _dtIUTBunits.Rows.Add(_drIUTBunits)

                    pOutPutParams.Tables.Add(_dtIUTBunits)

                End If

            Else

                _dtIUTBunits.TableName = Enum_DEPENDENCIES.IUT_BU.ToString
                _dtIUTBunits.Columns.Add(Status, Type.GetType("System.String"))

                _drIUTBunits = _dtIUTBunits.NewRow
                _drIUTBunits.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtIUTBunits.Rows.Add(_drIUTBunits)

                pOutPutParams.Tables.Add(_dtIUTBunits)
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbRecvIUTBunitsSQL = Nothing
            _sbPtwyIUTBunitsSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dtIUTBunits = Nothing
            _dsIUTBunits = Nothing
            _dsIUTBunitsDataChanged = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Generates a list of TrackIT departments
    ''' </summary>
    ''' <param name="pLastSyncDate">Last Synched Date</param>
    ''' <param name="pOutPutParams">Dataset containing list of departments</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function Do_GetDeparmentsSynch(ByVal pLastSyncDate As String, _
                                            ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbDeptTypesSQL As New StringBuilder
        Dim _dsDeptTypes As DataSet
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dtDeptTypes As New DataTable
        Dim _drDeptTypes As DataRow
        Dim _strSQL As String = String.Empty
        Dim _dsDeptTypesChanged As DataSet

        Try

            With _sbDeptTypesSQL

                .Append("SELECT DEPT_ID,DESCRIPTION,STATUS ")
                '.Append("FROM TKIT_DEPT WHERE STATUS <> '" & deptStatus & "'") 'Updated to get all the Departments(Active and Inactive)
                .Append("FROM TKIT_DEPT ")

            End With

            Try

                If log.IsDebugEnabled Then log.Debug(methodBaseName & _
                    "Getting the Department Types info with the following SQL......" _
                   & vbCrLf & _sbDeptTypesSQL.ToString)

                _dsDeptTypes = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbDeptTypesSQL.ToString))

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get " & _
                         "the Department types info " & vbCrLf & sqlex.ToString)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            With _sbLastSyncDateSQL

                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    'Updated to get all the Departments(Active and Inactive)
                    .Append("WHERE UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End If

            End With

            If _dsDeptTypes.Tables(0).Rows.Count > 0 Then

                If Not String.IsNullOrEmpty(pLastSyncDate) Then

                    _strSQL = _sbDeptTypesSQL.ToString & _sbLastSyncDateSQL.ToString

                    If log.IsDebugEnabled Then log.Debug(methodBaseName & _
                                                   "Checking the Department Types info with the following SQL......" _
                                                        & vbCrLf & _strSQL)

                    Try
                        _dsDeptTypesChanged = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_strSQL))

                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get " & _
                                                        "the department types info " & vbCrLf & sqlex.ToString)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                    If _dsDeptTypesChanged.Tables(0).Rows.Count > 0 Then

                        _dsDeptTypes.Tables(0).TableName = Enum_DEPENDENCIES.TKIT_DEPT.ToString
                        _dsDeptTypes.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        _dsDeptTypes.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                        pOutPutParams.Tables.Add(_dsDeptTypes.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Copy)

                    Else

                        _dtDeptTypes.TableName = Enum_DEPENDENCIES.TKIT_DEPT.ToString
                        _dtDeptTypes.Columns.Add(Status, Type.GetType("System.String"))

                        _drDeptTypes = _dtDeptTypes.NewRow
                        _drDeptTypes.Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                        _dtDeptTypes.Rows.Add(_drDeptTypes)

                        pOutPutParams.Tables.Add(_dtDeptTypes)

                    End If

                Else

                    _dsDeptTypes.Tables(0).TableName = Enum_DEPENDENCIES.TKIT_DEPT.ToString
                    _dsDeptTypes.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsDeptTypes.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                    pOutPutParams.Tables.Add(_dsDeptTypes.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Copy)

                End If


            Else

                _dtDeptTypes.TableName = Enum_DEPENDENCIES.TKIT_DEPT.ToString
                _dtDeptTypes.Columns.Add(Status, Type.GetType("System.String"))

                _drDeptTypes = _dtDeptTypes.NewRow
                _drDeptTypes.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtDeptTypes.Rows.Add(_drDeptTypes)

                pOutPutParams.Tables.Add(_dtDeptTypes)

            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _dsDeptTypes = Nothing
            _dtDeptTypes = Nothing
            _sbDeptTypesSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsDeptTypesChanged = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To Get the TrackIT Item Types details
    ''' </summary>
    ''' <param name="pOutPutParams">OutPut dataset containing the TrackIT Item Types Info </param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function Do_GetItemTypesSynch(ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbItemTypesSQL As New StringBuilder
        Dim _dsItemTypes As DataSet
        Dim _dtItemTypes As DataTable
        Dim _drItemTypes As DataRow

        Try

            With _sbItemTypesSQL

                .Append("SELECT ITEM_TYPE,ITEM_TYPE_INDICATOR,ITEM_TYPE_DESCR ")
                .Append("FROM TKIT_ITEM_TYPE ORDER BY ITEM_TYPE ")

            End With

            Try

                If log.IsDebugEnabled Then log.Debug(methodBaseName & _
                    "Getting the Item Types info with the following SQL......" _
                   & vbCrLf & _sbItemTypesSQL.ToString)

                _dsItemTypes = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbItemTypesSQL.ToString))

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get " & _
                         "the Item types info " & vbCrLf & sqlex.ToString)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If _dsItemTypes.Tables(0).Rows.Count > 0 Then

                _dsItemTypes.Tables(0).TableName = Enum_DEPENDENCIES.TKIT_ITEM.ToString
                _dsItemTypes.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                _dsItemTypes.Tables(Enum_DEPENDENCIES.TKIT_ITEM.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                pOutPutParams.Tables.Add(_dsItemTypes.Tables(Enum_DEPENDENCIES.TKIT_ITEM.ToString).Copy)

            Else
                _dtItemTypes = New DataTable
                _dtItemTypes.TableName = Enum_DEPENDENCIES.TKIT_ITEM.ToString
                _dtItemTypes.Columns.Add(Status, Type.GetType("System.String"))

                _drItemTypes = _dtItemTypes.NewRow
                _drItemTypes.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtItemTypes.Rows.Add(_drItemTypes)

                pOutPutParams.Tables.Add(_dtItemTypes)

            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _dsItemTypes = Nothing
            _dtItemTypes = Nothing
            _sbItemTypesSQL = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To Get all the UI Setup data
    ''' </summary>
    ''' <param name="pLastSyncDate">Last Synched Date</param>
    ''' <param name="pDeviceTokenEntry">Device Token Entry</param>
    ''' <param name="pOutPutParams">OutPut dataset containing the UI Setup Info </param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function Do_GetUISetupSynch(ByVal pLastSyncDate As String, _
                                       ByVal pDeviceTokenEntry() As String, _
                                       ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbUISetupSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _sbOrderbySQL As New StringBuilder
        Dim _dsUiSetup As DataSet
        Dim _dsUiSetupDataChanged As DataSet
        Dim _dtUISetup As DataTable
        Dim _drUiSetup As DataRow

        Try

            With _sbUISetupSQL
                .Append("SELECT APP_ID, SCREEN_NAME, USER_ID, FIELD_NAME, FIELD_DESCR, DISPLAY_FLAG, EDIT_FLAG, SCAN_ORDER, ")
                .Append("MANDATORY_FLAG, UPDATE_DATE FROM MT_ATPAR_UI_SETUP ")
                .Append("WHERE USER_ID = '" & UCase(pDeviceTokenEntry(TokenEntry_Enum.UserID)) & "' ")

            End With
            With _sbOrderbySQL
                .Append("ORDER BY APP_ID, SCREEN_NAME")
            End With
            With _sbLastSyncDateSQL
                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    .Append("AND UPDATE_DATE >  CONVERT(DATETIME,'" & pLastSyncDate & "',101)")
                End If
            End With

            Try
                If log.IsDebugEnabled Then log.Debug(methodBaseName & _
                    "Getting the Ui Setup info with the following SQL......" _
                   & vbCrLf & _sbUISetupSQL.ToString & _sbOrderbySQL.ToString)

                _dsUiSetup = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbUISetupSQL.ToString & _sbOrderbySQL.ToString))
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get " & _
                         "the Ui Setup info " & vbCrLf & sqlex.ToString)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try


            If _dsUiSetup.Tables(0).Rows.Count > 0 Then

                If Not String.IsNullOrEmpty(pLastSyncDate) Then

                    Try
                        If log.IsDebugEnabled Then log.Debug(methodBaseName & _
                            "Getting the Ui Setup info with the following SQL......" _
                           & vbCrLf & _sbUISetupSQL.ToString & _sbLastSyncDateSQL.ToString & _sbOrderbySQL.ToString)

                        _dsUiSetupDataChanged = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbUISetupSQL.ToString & _sbLastSyncDateSQL.ToString & _sbOrderbySQL.ToString))
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get " & _
                                 "the Ui Setup info " & vbCrLf & sqlex.ToString)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try


                    If _dsUiSetupDataChanged.Tables(0).Rows.Count > 0 Then
                        _dsUiSetup.Tables(0).TableName = Enum_DEPENDENCIES.UI_SETUP.ToString
                        _dsUiSetup.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        _dsUiSetup.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                        If log.isDebugEnabled Then log.Debug("After adding STATUS CODE")

                        If log.isDebugEnabled Then log.Debug("_dsUiSetup.Tables(0).Rows.Count")
                        If log.isDebugEnabled Then log.Debug(_dsUiSetup.Tables(0).Rows.Count)

                        pOutPutParams.Tables.Add(_dsUiSetup.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Copy)
                    Else

                        _dtUISetup = New DataTable
                        _dtUISetup.TableName = Enum_DEPENDENCIES.UI_SETUP.ToString
                        _dtUISetup.Columns.Add(Status, Type.GetType("System.String"))

                        _drUiSetup = _dtUISetup.NewRow
                        _drUiSetup.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                        _dtUISetup.Rows.Add(_drUiSetup)
                        _dsUiSetup.Tables.Add(_dtUISetup)
                    End If

                Else
                    _dsUiSetup.Tables(0).TableName = Enum_DEPENDENCIES.UI_SETUP.ToString
                    _dsUiSetup.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsUiSetup.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                    If log.isDebugEnabled Then log.Debug("After adding STATUS CODE")

                    If log.isDebugEnabled Then log.Debug("_dsUiSetup.Tables(0).Rows.Count")
                    If log.isDebugEnabled Then log.Debug(_dsUiSetup.Tables(0).Rows.Count)

                    pOutPutParams.Tables.Add(_dsUiSetup.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Copy)

                End If


                '_dsUiSetup.Tables(0).TableName = Enum_DEPENDENCIES.UI_SETUP.ToString
                '_dsUiSetup.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                '_dsUiSetup.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                'If log.isDebugEnabled Then log.Debug("After adding STATUS CODE")

                'If log.isDebugEnabled Then log.Debug("_dsUiSetup.Tables(0).Rows.Count")
                'If log.isDebugEnabled Then log.Debug(_dsUiSetup.Tables(0).Rows.Count)

                'pOutPutParams.Tables.Add(_dsUiSetup.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Copy)


            Else

                _dtUISetup = New DataTable
                _dtUISetup.TableName = Enum_DEPENDENCIES.UI_SETUP.ToString
                _dtUISetup.Columns.Add(Status, Type.GetType("System.String"))

                _drUiSetup = _dtUISetup.NewRow
                _drUiSetup.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtUISetup.Rows.Add(_drUiSetup)

                pOutPutParams.Tables.Add(_dtUISetup)

            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _dsUiSetup = Nothing
            _dtUISetup = Nothing
            _sbUISetupSQL = Nothing
            _sbLastSyncDateSQL = Nothing
            _dsUiSetupDataChanged = Nothing

        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Generates the Output string for the parameters
    ''' </summary>
    ''' <param name="pDsParams">Dataset containing the parameter info</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GenerateParametersStruc(ByVal pDsParams As DataSet) As String

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbOutXML As New StringBuilder

        Try

            With _sbOutXML

                .Append("<ROOT>")

                'Checking only for org table as user does not login without profile
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.ORGPARAMS.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.ORGPARAMS.ToString).Rows.Count > 0 Or _
                       pDsParams.Tables(Enum_DEPENDENCIES.PROFILEPARAMS.ToString).Rows.Count > 0 Or _
                       pDsParams.Tables(Enum_DEPENDENCIES.USERPARAMS.ToString).Rows.Count > 0 Then
                        .Append("<PARAMETERS>")
                    End If
                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.ORGPARAMS.ToString) Then

                    'If orgparameters exists append them to the output string
                    If pDsParams.Tables(Enum_DEPENDENCIES.ORGPARAMS.ToString).Rows.Count > 0 Then

                        .Append("<ORGPARAM>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.ORGPARAMS.ToString).Rows.Count - 1

                            .Append("<RECORD>")

                            .Append("<APP_ID>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.ORGPARAMS.ToString).Rows(intCnt).Item("APP_ID"))
                            .Append("</APP_ID>")

                            .Append("<PARAMETER_ID>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.ORGPARAMS.ToString).Rows(intCnt).Item("PARAMETER_ID"))
                            .Append("</PARAMETER_ID>")

                            .Append("<PARAMETER_VALUE>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.ORGPARAMS.ToString).Rows(intCnt).Item("PARAMETER_VALUE"))
                            .Append("</PARAMETER_VALUE>")

                            .Append("</RECORD>")

                        Next

                        .Append("</ORGPARAM>")

                    End If

                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.PROFILEPARAMS.ToString) Then

                    'If profileparameters exists append them to the output string
                    If pDsParams.Tables(Enum_DEPENDENCIES.PROFILEPARAMS.ToString).Rows.Count > 0 Then

                        .Append("<PROFILEPARAM>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.PROFILEPARAMS.ToString).Rows.Count - 1

                            .Append("<RECORD>")

                            .Append("<APP_ID>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.PROFILEPARAMS.ToString).Rows(intCnt).Item("APP_ID"))
                            .Append("</APP_ID>")

                            .Append("<PARAMETER_ID>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.PROFILEPARAMS.ToString).Rows(intCnt).Item("PARAMETER_ID"))
                            .Append("</PARAMETER_ID>")

                            .Append("<PARAMETER_VALUE>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.PROFILEPARAMS.ToString).Rows(intCnt).Item("PARAMETER_VALUE"))
                            .Append("</PARAMETER_VALUE>")

                            .Append("</RECORD>")

                        Next

                        .Append("</PROFILEPARAM>")

                    End If

                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.USERPARAMS.ToString) Then

                    'If userparameters exists append them to the output string
                    If pDsParams.Tables(Enum_DEPENDENCIES.USERPARAMS.ToString).Rows.Count > 0 Then

                        .Append("<USERPARAM>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.USERPARAMS.ToString).Rows.Count - 1

                            .Append("<RECORD>")

                            .Append("<APP_ID>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.USERPARAMS.ToString).Rows(intCnt).Item("APP_ID"))
                            .Append("</APP_ID>")

                            .Append("<PARAMETER_ID>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.USERPARAMS.ToString).Rows(intCnt).Item("PARAMETER_ID"))
                            .Append("</PARAMETER_ID>")

                            .Append("<PARAMETER_VALUE>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.USERPARAMS.ToString).Rows(intCnt).Item("PARAMETER_VALUE"))
                            .Append("</PARAMETER_VALUE>")

                            .Append("</RECORD>")

                        Next

                        .Append("</USERPARAM>")

                    End If

                End If

                'Checking only for org table as user does not login without profile
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.ORGPARAMS.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.ORGPARAMS.ToString).Rows.Count > 0 Or _
                       pDsParams.Tables(Enum_DEPENDENCIES.PROFILEPARAMS.ToString).Rows.Count > 0 Or _
                       pDsParams.Tables(Enum_DEPENDENCIES.USERPARAMS.ToString).Rows.Count > 0 Then
                        .Append("</PARAMETERS>")
                    End If
                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.LIST_VIEW.ToString) Then

                    'Append the list view details to the output string
                    If pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows.Count > 0 Then

                        .Append("<LIST_VIEW>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows.Count - 1

                            .Append("<RECORD>")

                            .Append("<APP_ID>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("APP_ID"))
                            .Append("</APP_ID>")

                            .Append("<SCREEN_NAME>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("SCREEN_NAME"))
                            .Append("</SCREEN_NAME>")

                            .Append("<FIELD_NAME>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("FIELD_NAME"))
                            .Append("</FIELD_NAME>")

                            .Append("<COLUMN_HEADER>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("COLUMN_HEADER"))
                            .Append("</COLUMN_HEADER>")

                            .Append("<COLUMN_ORDER>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("COLUMN_ORDER"))
                            .Append("</COLUMN_ORDER>")

                            .Append("<COLUMN_WIDTH>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("COLUMN_WIDTH"))
                            .Append("</COLUMN_WIDTH>")

                            .Append("<MANDATORY_FIELD>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("MANDATORY_FIELD"))
                            .Append("</MANDATORY_FIELD>")

                            .Append("<DISPLAY_FIELD>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("DISPLAY_FIELD"))
                            .Append("</DISPLAY_FIELD>")

                            .Append("<ORDER_BY>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("ORDER_BY"))
                            .Append("</ORDER_BY>")

                            .Append("<COLUMN_MAX_SIZE>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("COLUMN_MAX_SIZE"))
                            .Append("</COLUMN_MAX_SIZE>")

                            .Append("<TOGGLE_FIELD>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("TOGGLE_FIELD"))
                            .Append("</TOGGLE_FIELD>")

                            .Append("<DEFAULT_TOGGLE_TEXT>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("DEFAULT_TOGGLE_TEXT"))
                            .Append("</DEFAULT_TOGGLE_TEXT>")

                            .Append("<TOGGLE_ORDER>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.LIST_VIEW.ToString).Rows(intCnt).Item("TOGGLE_ORDER"))
                            .Append("</TOGGLE_ORDER>")

                            .Append("</RECORD>")

                        Next

                        .Append("</LIST_VIEW>")

                    End If

                End If

                'If carriers exists append them to the output string
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.CARRIER.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Rows.Count > 0 Then

                        .Append("<CARRIER>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Rows.Count - 1

                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            If pDsParams.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Columns.Count > 1 Then

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Rows(intCnt).Item("CARRIER_ID")) Then
                                    .Append("<RECORD>")
                                    .Append("<CARRIER_ID>")
                                    .Append(substituteString(CleanString((pDsParams.Tables(Enum_DEPENDENCIES.CARRIER.ToString).Rows(intCnt).Item("CARRIER_ID").ToString))))
                                    .Append("</CARRIER_ID>")
                                    .Append("</RECORD>")
                                End If

                            End If

                        Next

                        .Append("</CARRIER>")

                    End If

                End If
                'If LOCATION_GROUPS exists append them to the output string
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows.Count > 0 Then

                        .Append("<LOCATION_GROUPS>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows.Count - 1

                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            If pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Columns.Count > 1 Then
                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(intCnt).Item("LAST_UPDATE_DATE")) Or _
                                     Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(intCnt).Item("DROP_OFF_LOCATION_ID")) Then
                                    .Append("<RECORD>")
                                End If
                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(intCnt).Item("DROP_OFF_LOCATION_ID")) Then
                                    .Append("<DROP_OFF_LOCATION_ID>")
                                    .Append(substituteString(CleanString((pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(intCnt).Item("DROP_OFF_LOCATION_ID").ToString))))
                                    .Append("</DROP_OFF_LOCATION_ID>")
                                End If
                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(intCnt).Item("LAST_UPDATE_DATE")) Then
                                    .Append("<LAST_UPDATE_DATE>")
                                    .Append(substituteString(CleanString((pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(intCnt).Item("LAST_UPDATE_DATE").ToString))))
                                    .Append("</LAST_UPDATE_DATE>")
                                End If
                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(intCnt).Item("LAST_UPDATE_DATE")) Or _
                                  Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.LOCATION_GROUPS.ToString).Rows(intCnt).Item("DROP_OFF_LOCATION_ID")) Then
                                    .Append("</RECORD>")
                                End If
                            End If

                        Next

                        .Append("</LOCATION_GROUPS>")

                    End If

                End If

                'If the user grouped , append the data to the output string
                If pDsParams.Tables.Contains((Enum_DEPENDENCIES.USER_GROUPS.ToString)) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows.Count > 0 Then

                        .Append("<USER_GROUPS>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows.Count - 1

                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("APPID")) Or _
                               Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("SRUSR")) Or _
                               Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("CLUSR")) Then
                                .Append("<RECORD>")
                            End If

                            If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("APPID")) Then
                                .Append("<APPID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("APPID"))
                                .Append("</APPID>")
                            End If

                            If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("SRUSR")) Then
                                .Append("<SRUSR>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("SRUSR"))
                                .Append("</SRUSR>")
                            End If

                            If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("CLUSR")) Then
                                .Append("<CLUSR>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("CLUSR"))
                                .Append("</CLUSR>")
                            End If

                            If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("APPID")) Or _
                              Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("SRUSR")) Or _
                              Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.USER_GROUPS.ToString).Rows(intCnt).Item("CLUSR")) Then
                                .Append("</RECORD>")
                            End If

                        Next

                        .Append("</USER_GROUPS>")

                    End If

                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.INV_BU.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows.Count > 0 Then

                        .Append("<INV_BU>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows.Count - 1

                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Columns.count > 1 Then
                                If Not (IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("APP_ID")) Or _
                                        IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("BUSINESS_UNIT"))) Then
                                    .Append("<RECORD>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("APP_ID")) Then
                                    .Append("<APP_ID>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("APP_ID"))
                                    .Append("</APP_ID>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("BUSINESS_UNIT")) Then
                                    .Append("<BUNIT>")
                                    .Append(CleanString(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("BUSINESS_UNIT")))
                                    .Append("</BUNIT>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("COUNT_FLAG")) Then
                                    .Append("<COUNTFLAG>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("COUNT_FLAG"))
                                    .Append("</COUNTFLAG>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("ALLOW_SIC_CONSIGN")) Then
                                    .Append("<ALLOW_SIC_CONSIGN>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("ALLOW_SIC_CONSIGN"))
                                    .Append("</ALLOW_SIC_CONSIGN>")
                                End If


                                If Not (IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("APP_ID")) Or _
                                  IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("BUSINESS_UNIT")) Or _
                                  IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("COUNT_FLAG")) Or _
                                  IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU.ToString).Rows(intCnt).Item("ALLOW_SIC_CONSIGN"))) Then
                                    .Append("</RECORD>")
                                End If

                            End If
                        Next

                        .Append("</INV_BU>")

                    End If

                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.ALL_BU.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Rows.Count > 0 Then

                        .Append("<ALL_BU>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Rows.Count - 1
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Columns.Count > 1 Then
                                If Not (IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Rows(intCnt).Item("BUSINESS_UNIT"))) Then
                                    .Append("<RECORD>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Rows(intCnt).Item("BUSINESS_UNIT")) Then
                                    .Append("<BUNIT>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Rows(intCnt).Item("BUSINESS_UNIT"))
                                    .Append("</BUNIT>")
                                End If
                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Rows(intCnt).Item("BU_TYPE")) Then
                                    .Append("<TYPE>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Rows(intCnt).Item("BU_TYPE"))
                                    .Append("</TYPE>")
                                End If

                                If Not (IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.ALL_BU.ToString).Rows(intCnt).Item("BUSINESS_UNIT"))) Then
                                    .Append("</RECORD>")
                                End If
                            End If

                        Next

                        .Append("</ALL_BU>")

                    End If

                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.NOTES.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows.Count > 0 Then

                        .Append("<NOTES>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows.Count - 1

                            .Append("<APPS>")

                            .Append("<APP_ID>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows(intCnt).Item("APP_ID"))
                            .Append("</APP_ID>")

                            .Append("<SCREEN_NAME>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows(intCnt).Item("SCREEN_NAME"))
                            .Append("</SCREEN_NAME>")

                            .Append("<NOTES_LABEL>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows(intCnt).Item("NOTES_LABEL"))
                            .Append("</NOTES_LABEL>")

                            .Append("<NOTES_LIST_DISPLAY>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows(intCnt).Item("NOTES_LIST_DISPLAY"))
                            .Append("</NOTES_LIST_DISPLAY>")

                            .Append("<ALLOW_EDIT_NOTES>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows(intCnt).Item("ALLOW_EDIT_NOTES"))
                            .Append("</ALLOW_EDIT_NOTES>")

                            .Append("<CAPTURE_CODE>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows(intCnt).Item("CAPTURE_CODE"))
                            .Append("</CAPTURE_CODE>")

                            .Append("<APPEND_SELECTED_TEXT>")
                            .Append(pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows(intCnt).Item("APPEND_SELECTED_TEXT"))
                            .Append("</APPEND_SELECTED_TEXT>")

                            If pDsParams.Tables(Enum_DEPENDENCIES.NOTESCODES.ToString).Rows.Count > 0 Then

                                .Append("<CODES>")

                                For intRCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.NOTESCODES.ToString).Rows.Count - 1

                                    If pDsParams.Tables(Enum_DEPENDENCIES.NOTESCODES.ToString).Rows(intRCnt).Item("APP_ID") = _
                                        pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows(intCnt).Item("APP_ID") And _
                                        pDsParams.Tables(Enum_DEPENDENCIES.NOTESCODES.ToString).Rows(intRCnt).Item("SCREEN_NAME") = _
                                        pDsParams.Tables(Enum_DEPENDENCIES.NOTES.ToString).Rows(intCnt).Item("SCREEN_NAME") Then

                                        .Append("<CODEID>")
                                        .Append(pDsParams.Tables(Enum_DEPENDENCIES.NOTESCODES.ToString).Rows(intRCnt).Item("CODE_ID"))
                                        .Append("</CODEID>")

                                    End If

                                Next

                                .Append("</CODES>")

                            End If

                            .Append("</APPS>")

                        Next

                        .Append("</NOTES>")

                    End If

                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.SHIP_TO_ID.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows.Count > 0 Then

                        .Append("<SHIP_TO_ID>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows.Count - 1

                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            If pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Columns.Count > 1 Then


                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("SETID")) Or _
                                   Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("SHIPTO_ID")) Or _
                                   Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("USER_ID")) Then
                                    .Append("<RECORD>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("SETID")) Then
                                    .Append("<SETID>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("SETID"))
                                    .Append("</SETID>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("SHIPTO_ID")) Then
                                    .Append("<SHIPTO_ID>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("SHIPTO_ID"))
                                    .Append("</SHIPTO_ID>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("USER_ID")) Then
                                    .Append("<USER_ID>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("USER_ID"))
                                    .Append("</USER_ID>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("SETID")) Or _
                                   Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("SHIPTO_ID")) Or _
                                   Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.SHIP_TO_ID.ToString).Rows(intCnt).Item("USER_ID")) Then
                                    .Append("</RECORD>")
                                End If

                            End If

                        Next

                        .Append("</SHIP_TO_ID>")

                    End If

                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Rows.Count > 0 Then

                        .Append("<DISTRIB_TYPES>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Rows.Count - 1

                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            If pDsParams.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Columns.Count > 1 Then

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Rows(intCnt).Item("DISTRIB_TYPE")) Then

                                    .Append("<RECORD>")

                                    .Append("<DIST_TYPE>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.DISTRIB_TYPES.ToString).Rows(intCnt).Item("DISTRIB_TYPE"))
                                    .Append("</DIST_TYPE>")

                                    .Append("</RECORD>")

                                End If

                            End If

                        Next

                        .Append("</DISTRIB_TYPES>")

                    End If

                End If

                'If Receive or Putaway assigned then only Enum_DEPENDENCIES.IUT_BU table will be built
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.IUT_BU.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.IUT_BU.ToString).Rows.Count > 0 Then

                        .Append("<IUT_BU>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.IUT_BU.ToString).Rows.Count - 1

                            'Build the status code tag only once
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.IUT_BU.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            'If no data exists in the table or no data changed after last sync date the column count 
                            'in this case will be 1 , so check the column count before building the tag
                            'if not it throws an exception
                            If pDsParams.Tables(Enum_DEPENDENCIES.IUT_BU.ToString).Columns.Count > 1 Then

                                .Append("<RECORD>")
                                .Append("<BUNIT>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.IUT_BU.ToString).Rows(intCnt).Item("BUSINESS_UNIT"))
                                .Append("</BUNIT>")
                                .Append("</RECORD>")

                            End If

                        Next
                        .Append("</IUT_BU>")
                    End If
                End If
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString).Rows.Count > 0 Then
                        .Append("<SYMBOLOGY_TYPES>")
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString).Rows.Count - 1

                            'Build the status code tag only once
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            If pDsParams.Tables(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")

                                .Append("<SYMBOLOGY_TYPE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString).Rows(intCnt).Item("SYMBOLOGY_TYPE").ToString)
                                .Append("</SYMBOLOGY_TYPE>")

                                .Append("<BARCODE_LENGTH>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString).Rows(intCnt).Item("BARCODE_LENGTH").ToString)
                                .Append("</BARCODE_LENGTH>")

                                .Append("<ID_START_POSITION>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString).Rows(intCnt).Item("ID_START_POSITION").ToString)
                                .Append("</ID_START_POSITION>")

                                .Append("<LENGTH>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.SYMBOLOGY_TYPES.ToString).Rows(intCnt).Item("LENGTH").ToString)
                                .Append("</LENGTH>")

                                .Append("</RECORD>")
                            End If

                        Next
                        .Append("</SYMBOLOGY_TYPES>")
                    End If
                End If
                'POU Tables
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString).Rows.Count > 0 Then
                        .Append("<PHYSICIAN_DATA>") 'TODO : Ask about this????
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString).Rows.Count - 1
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")

                                .Append("<PHYSICIAN_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString).Rows(intCnt).Item("PHYSICIAN_ID").ToString)
                                .Append("</PHYSICIAN_ID>")

                                .Append("<FIRST_NAME>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString).Rows(intCnt).Item("FIRST_NAME").ToString)
                                .Append("</FIRST_NAME>")

                                .Append("<STATUS>")
                                If pDsParams.Tables(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString).Rows(intCnt).Item("STATUS") = True Then
                                    .Append("I")
                                Else
                                    .Append("A")
                                End If
                                .Append("</STATUS>")

                                .Append("</RECORD>")
                            End If

                        Next
                        .Append("</PHYSICIAN_DATA>")
                    End If
                End If
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.REASONS_DATA.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.REASONS_DATA.ToString).Rows.Count > 0 Then
                        Dim _strStatus As String = String.Empty
                        .Append("<REASONS_DATA>") 'TODO : Ask about this????
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.REASONS_DATA.ToString).Rows.Count - 1

                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.REASONS_DATA.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.REASONS_DATA.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")
                                .Append("<REASON_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.REASONS_DATA.ToString).Rows(intCnt).Item("REASON_CODE").ToString)
                                .Append("</REASON_CODE>")

                                .Append("<DESCRIPTION>")
                                .Append(SubstituteString(pDsParams.Tables(Enum_DEPENDENCIES.REASONS_DATA.ToString).Rows(intCnt).Item("DESCRIPTION").ToString))
                                .Append("</DESCRIPTION>")

                                If pDsParams.Tables(Enum_DEPENDENCIES.REASONS_DATA.ToString).Rows(intCnt).Item("STATUS") = True Then
                                    _strStatus = "I"
                                Else
                                    _strStatus = "A"
                                End If
                                .Append("<STATUS>")
                                .Append(_strStatus)
                                .Append("</STATUS>")

                                .Append("</RECORD>")
                            End If
                        Next
                        .Append("</REASONS_DATA>")
                    End If
                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString).Rows.Count > 0 Then
                        Dim _strStatus As String = String.Empty
                        .Append("<PROCEDURE_DATA>") 'TODO : Ask about this????
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString).Rows.Count - 1
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")
                                .Append("<PROCEDURE_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString).Rows(intCnt).Item("PROCEDURE_CODE").ToString)
                                .Append("</PROCEDURE_CODE>")

                                .Append("<DESCRIPTION>")
                                .Append(CleanString(pDsParams.Tables(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString).Rows(intCnt).Item("DESCRIPTION").ToString))
                                .Append("</DESCRIPTION>")

                                If pDsParams.Tables(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString).Rows(intCnt).Item("STATUS") = True Then
                                    _strStatus = "I"
                                Else
                                    _strStatus = "A"
                                End If
                                .Append("<STATUS>")
                                .Append(_strStatus)
                                .Append("</STATUS>")

                                .Append("</RECORD>")
                            End If

                        Next
                        .Append("</PROCEDURE_DATA>")
                    End If
                End If
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString).Rows.Count > 0 Then
                        Dim _strStatus As String = String.Empty
                        .Append("<COSTCENTER_DATA>") 'TODO : Ask about this????
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString).Rows.Count - 1
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")
                                .Append("<COST_CENTER_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString).Rows(intCnt).Item("COST_CENTER_CODE").ToString)
                                .Append("</COST_CENTER_CODE>")

                                .Append("<DESCRIPTION>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString).Rows(intCnt).Item("DESCRIPTION").ToString)
                                .Append("</DESCRIPTION>")

                                .Append("<CART_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString).Rows(intCnt).Item("CART_ID").ToString)
                                .Append("</CART_ID>")

                                If pDsParams.Tables(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString).Rows(intCnt).Item("STATUS") = True Then
                                    _strStatus = "I"
                                Else
                                    _strStatus = "A"
                                End If

                                .Append("<STATUS>")
                                .Append(_strStatus)
                                .Append("</STATUS>")

                                .Append("</RECORD>")
                            End If

                        Next
                        .Append("</COSTCENTER_DATA>")
                    End If
                End If
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows.Count > 0 Then
                        Dim _strStatus As String = String.Empty
                        .Append("<PREFERENCE_DATA>") 'TODO : Ask about this????
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows.Count - 1
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")
                                .Append("<PREF_LIST_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows(intCnt).Item("PREF_LIST_ID").ToString)
                                .Append("</PREF_LIST_ID>")

                                .Append("<PREF_LIST_DESCR>")
                                .Append(cleanstring(pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows(intCnt).Item("PREF_LIST_DESCR").ToString))
                                .Append("</PREF_LIST_DESCR>")

                                .Append("<ITEM_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows(intCnt).Item("ITEM_ID").ToString)
                                .Append("</ITEM_ID>")

                                .Append("<ITEM_DESCR>")
                                .Append(SubstituteString(pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows(intCnt).Item("ITEM_DESCR").ToString))
                                .Append("</ITEM_DESCR>")

                                .Append("<QUANTITY>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows(intCnt).Item("QUANTITY").ToString)
                                .Append("</QUANTITY>")

                                .Append("<PHYSICIAN_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows(intCnt).Item("PHYSICIAN_ID").ToString)
                                .Append("</PHYSICIAN_ID>")

                                .Append("<PROCEDURE_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows(intCnt).Item("PROCEDURE_ID").ToString)
                                .Append("</PROCEDURE_CODE>")

                                If pDsParams.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Rows(intCnt).Item("STATUS") = True Then
                                    _strStatus = "I"
                                Else
                                    _strStatus = "A"
                                End If

                                .Append("<STATUS>")
                                .Append(_strStatus)
                                .Append("</STATUS>")

                                .Append("</RECORD>")
                            End If
                        Next
                        .Append("</PREFERENCE_DATA>")
                    End If
                End If
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.POU_DEPTDATA.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.POU_DEPTDATA.ToString).Rows.Count > 0 Then
                        Dim _strStatus As String = String.Empty
                        .Append("<POU_DEPTDATA>")
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.POU_DEPTDATA.ToString).Rows.Count - 1
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.POU_DEPTDATA.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.POU_DEPTDATA.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")
                                .Append("<DEPT_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.POU_DEPTDATA.ToString).Rows(intCnt).Item("DEPT_ID").ToString)
                                .Append("</DEPT_ID>")

                                .Append("<DEPT_NAME>")
                                .Append(CleanString(pDsParams.Tables(Enum_DEPENDENCIES.POU_DEPTDATA.ToString).Rows(intCnt).Item("DEPT_NAME").ToString))
                                .Append("</DEPT_NAME>")

                                If pDsParams.Tables(Enum_DEPENDENCIES.POU_DEPTDATA.ToString).Rows(intCnt).Item("STATUS") = True Then
                                    _strStatus = "I"
                                Else
                                    _strStatus = "A"
                                End If
                                .Append("<STATUS>")
                                .Append(_strStatus)
                                .Append("</STATUS>")

                                .Append("</RECORD>")
                            End If

                        Next
                        .Append("</POU_DEPTDATA>")
                    End If
                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Rows.Count > 0 Then
                        Dim _strStatus As String = String.Empty
                        .Append("<POU_LOCATIONDATA>")
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Rows.Count - 1
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")

                                .Append("<APP_ID>")
                                .Append(EnumApps.PointOfUse)
                                .Append("</APP_ID>")

                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")
                                .Append("<BUSINESS_UNIT>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Rows(intCnt).Item("BUSINESS_UNIT").ToString)
                                .Append("</BUSINESS_UNIT>")

                                .Append("<CART_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Rows(intCnt).Item("CART_ID").ToString)
                                .Append("</CART_ID>")

                                .Append("<CART_DESCR>")
                                .Append(substituteString(cleanstring(pDsParams.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Rows(intCnt).Item("CART_DESCR").ToString)))
                                .Append("</CART_DESCR>")

                                .Append("<LOCATION_TYPE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Rows(intCnt).Item("LOCATION_TYPE").ToString)
                                .Append("</LOCATION_TYPE>")

                                .Append("<DEPARTMENT_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Rows(intCnt).Item("DEPARTMENT_ID").ToString)
                                .Append("</DEPARTMENT_ID>")

                                .Append("</RECORD>")
                            End If

                        Next
                        .Append("</POU_LOCATIONDATA>")
                    End If
                End If


                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.RX_LOC_DATA.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Rows.Count > 0 Then
                        Dim _strStatus As String = String.Empty
                        .Append("<RX_LOC_DATA>")
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Rows.Count - 1
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")

                                .Append("<APP_ID>")
                                .Append(EnumApps.Pharmacy)
                                .Append("</APP_ID>")

                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")
                                .Append("<BUSINESS_UNIT>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Rows(intCnt).Item("BUSINESS_UNIT").ToString)
                                .Append("</BUSINESS_UNIT>")

                                .Append("<CART_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Rows(intCnt).Item("CART_ID").ToString)
                                .Append("</CART_ID>")

                                .Append("<CART_DESCR>")
                                .Append(substituteString(cleanstring(pDsParams.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Rows(intCnt).Item("CART_DESCR").ToString)))
                                .Append("</CART_DESCR>")

                                .Append("<LOCATION_TYPE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Rows(intCnt).Item("LOCATION_TYPE").ToString)
                                .Append("</LOCATION_TYPE>")

                                .Append("<DEPARTMENT_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Rows(intCnt).Item("DEPARTMENT_ID").ToString)
                                .Append("</DEPARTMENT_ID>")

                                .Append("</RECORD>")
                            End If

                        Next
                        .Append("</RX_LOC_DATA>")
                    End If
                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.TKIT_DEPT.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Rows.Count > 0 Then

                        .Append("<DEPTS>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Rows.Count - 1

                            'Build the status code tag only once
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            'If no data exists in the table or no data changed after last sync date the column count 
                            'in this case will be 1 , so check the column count before building the tag
                            'if not it throws an exception
                            If pDsParams.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Columns.Count > 1 Then

                                .Append("<RECORD>")

                                .Append("<DEPT_ID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Rows(intCnt).Item("DEPT_ID"))
                                .Append("</DEPT_ID>")

                                .Append("<DEPT_NAME>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Rows(intCnt).Item("DESCRIPTION"))
                                .Append("</DEPT_NAME>")

                                .Append("<STATUS>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.TKIT_DEPT.ToString).Rows(intCnt).Item("STATUS"))
                                .Append("</STATUS>")

                                .Append("</RECORD>")

                            End If

                        Next

                        .Append("</DEPTS>")

                    End If
                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.TKIT_ITEM.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.TKIT_ITEM.ToString).Rows.Count > 0 Then

                        .Append("<ITMTYPS>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.TKIT_ITEM.ToString).Rows.Count - 1

                            'Build the status code tag only once
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.TKIT_ITEM.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            'If no data exists in the table or no data changed after last sync date the column count 
                            'in this case will be 1 , so check the column count before building the tag
                            'if not it throws an exception
                            If pDsParams.Tables(Enum_DEPENDENCIES.TKIT_ITEM.ToString).Columns.Count > 1 Then

                                .Append("<RECORD>")

                                .Append("<ITMTYP>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.TKIT_ITEM.ToString).Rows(intCnt).Item("ITEM_TYPE"))
                                .Append("</ITMTYP>")

                                .Append("<TYPIND>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.TKIT_ITEM.ToString).Rows(intCnt).Item("ITEM_TYPE_INDICATOR"))
                                .Append("</TYPIND>")

                                .Append("<TYPDES>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.TKIT_ITEM.ToString).Rows(intCnt).Item("ITEM_TYPE_DESCR"))
                                .Append("</TYPDES>")

                                .Append("</RECORD>")

                            End If

                        Next

                        .Append("</ITMTYPS>")

                    End If
                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.UI_SETUP.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows.Count > 0 Then

                        .Append("<UISTP>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows.Count - 1

                            'Build the status code tag only once
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If

                            'If no data exists in the table or no data changed after last sync date the column count 
                            'in this case will be 1 , so check the column count before building the tag
                            'if not it throws an exception
                            If pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Columns.Count > 1 Then

                                .Append("<RECORD>")

                                .Append("<APPID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("APP_ID"))
                                .Append("</APPID>")

                                .Append("<SCRNAME>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("SCREEN_NAME"))
                                .Append("</SCRNAME>")

                                .Append("<USRID>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("USER_ID"))
                                .Append("</USRID>")

                                .Append("<FNAME>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("FIELD_NAME"))
                                .Append("</FNAME>")

                                .Append("<FDESC>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("FIELD_DESCR"))
                                .Append("</FDESC>")

                                .Append("<DISPFLG>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("DISPLAY_FLAG"))
                                .Append("</DISPFLG>")

                                .Append("<EDITFLG>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("EDIT_FLAG"))
                                .Append("</EDITFLG>")

                                .Append("<SCNORD>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("SCAN_ORDER"))
                                .Append("</SCNORD>")

                                .Append("<MANDFLG>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.UI_SETUP.ToString).Rows(intCnt).Item("MANDATORY_FLAG"))
                                .Append("</MANDFLG>")

                                .Append("</RECORD>")

                            End If
                        Next

                        .Append("</UISTP>")

                    End If
                End If

                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString) Then
                    If pDsParams.Tables(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString).Rows.Count > 0 Then
                        Dim _strStatus As String = String.Empty
                        .Append("<MANAGE_CARRIERS>")
                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString).Rows.Count - 1
                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString).Columns.Count > 1 Then
                                .Append("<RECORD>")
                                .Append("<SEARCH_STRING>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString).Rows(intCnt).Item("SEARCH_STRING").ToString)
                                .Append("</SEARCH_STRING>")

                                .Append("<START_POSITION>")
                                .Append(cleanstring(pDsParams.Tables(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString).Rows(intCnt).Item("START_POSITION").ToString))
                                .Append("</START_POSITION>")

                                .Append("<CARRIER>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString).Rows(intCnt).Item("CARRIER").ToString)
                                .Append("</CARRIER>")

                                If pDsParams.Tables(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString).Rows(intCnt).Item("STATUS").ToString = True Then
                                    _strStatus = "A"
                                Else
                                    _strStatus = "I"
                                End If

                                .Append("<STATUS>")
                                .Append(_strStatus)
                                .Append("</STATUS>")

                                .Append("</RECORD>")
                            End If
                        Next
                        .Append("</MANAGE_CARRIERS>")
                    End If
                End If
                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.INV_BU_BIN.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows.Count > 0 Then

                        .Append("<INV_BU_BIN>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows.Count - 1

                            If intCnt = 0 Then
                                .Append("<STATUS_CODE>")
                                .Append(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("STATUS_CODE"))
                                .Append("</STATUS_CODE>")
                            End If
                            If pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Columns.count > 1 Then


                                If Not (IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("APP_ID")) Or _
                                        IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("BUSINESS_UNIT"))) Then
                                    .Append("<RECORD>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("APP_ID")) Then
                                    .Append("<APP_ID>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("APP_ID"))
                                    .Append("</APP_ID>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("BUSINESS_UNIT")) Then
                                    .Append("<BUNIT>")
                                    .Append(CleanString(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("BUSINESS_UNIT")))
                                    .Append("</BUNIT>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("COUNT_FLAG")) Then
                                    .Append("<COUNTFLAG>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("COUNT_FLAG"))
                                    .Append("</COUNTFLAG>")
                                End If


                                If Not (IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("APP_ID")) Or _
                                        IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("BUSINESS_UNIT")) Or _
                                        IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Rows(intCnt).Item("COUNT_FLAG"))) Then
                                    .Append("</RECORD>")
                                End If
                            End If

                        Next

                        .Append("</INV_BU_BIN>")

                    End If

                End If


                If pDsParams.Tables.Contains(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString) Then

                    If pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows.Count > 0 Then

                        .Append("<CYC_BU_ALLOC>")

                        For intCnt As Integer = 0 To pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows.Count - 1

                            If pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Columns.Count > 1 Then

                                If Not (IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows(intCnt).Item("APP_ID")) Or _
                                        IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows(intCnt).Item("BUSINESS_UNIT"))) Then
                                    .Append("<RECORD>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows(intCnt).Item("APP_ID")) Then
                                    .Append("<APP_ID>")
                                    .Append(pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows(intCnt).Item("APP_ID"))
                                    .Append("</APP_ID>")
                                End If

                                If Not IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows(intCnt).Item("BUSINESS_UNIT")) Then
                                    .Append("<BUNIT>")
                                    .Append(CleanString(pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows(intCnt).Item("BUSINESS_UNIT")))
                                    .Append("</BUNIT>")
                                End If

                                If Not (IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows(intCnt).Item("APP_ID")) Or _
                                        IsDBNull(pDsParams.Tables(Enum_DEPENDENCIES.CYC_BU_ALLOC.ToString).Rows(intCnt).Item("BUSINESS_UNIT"))) Then
                                    .Append("</RECORD>")
                                End If
                            End If

                        Next
                        .Append("</CYC_BU_ALLOC>")

                    End If

                End If





                'Appending Stock Header Printing Information it Can be Y or N 
                ' Y : Printing Stock Header
                ' N : Stock Header will not Be printed

                .Append("<DELIVSHIPTOIDALLOC>")
                .Append("<PRINTSTOCKITEM>")
                .Append(delivShipToIdAllocation)
                .Append("</PRINTSTOCKITEM>")
                .Append("</DELIVSHIPTOIDALLOC>")

                'End of Stock Header Printing Information '
                .Append("</ROOT>")

            End With

            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Output string : " & _sbOutXML.ToString)
            Return _sbOutXML.ToString

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString)
            Exit Function
        Finally
            _sbOutXML = Nothing
        End Try

    End Function


    ''' <summary>
    ''' Gets the Badge Details corresponding to Recipient Name
    ''' </summary>
    ''' <param name="pRecpName">Recipient Name</param>
    ''' <param name="pxmlStr">XML Parameter</param>
    ''' <returns>ATPAR_OK on success, else ERROR CODE on error</returns>
    Public Function GetBadgeDetails(ByVal pRecpName As String, ByRef pXmlOut As String, ByVal pDeviceTokenEntry() As String) As Long _
        Implements IAtPar_DevTrans.GetBadgeDetails

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Dim _strSQL As String
        Dim _dsReceipents As DataSet
        Dim intCntExits As Integer
        'DG-IT0005903

        _strSQL = "SELECT  TOP(200) ISNULL(FIRST_NAME,' ') + ' ' + ISNULL(MIDDLE_NAME,' ') + ' ' + ISNULL(LAST_NAME,' ')  AS RECIEPENTNAME , " & _
                   "EMPLOYEE_ID, PHONE_NO, ADDRESS_1, ADDRESS_2, ADDRESS_3, ADDRESS_4, LOCATION , BADGE_ID, SSN_NO, DEPT_ID, LOC_DESCR " & _
                  "FROM  RM_USER_LOCATIONS "

        If pRecpName <> String.Empty Then
            _strSQL = _strSQL & " WHERE FIRST_NAME LIKE '" & Replace(pRecpName, "'", "''") & "%' OR LAST_NAME LIKE '" & Replace(pRecpName, "'", "''") & "%' "
        End If

        _strSQL = _strSQL & " ORDER BY RECIEPENTNAME "

        If log.IsInfoEnabled Then log.Info("_strSQL:" & _strSQL)

        Try
            _dsReceipents = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
        Catch ex As SqlException
            pXmlOut = StatusXMLBuild(ATPAR_E_LOCALDBSELECTFAIL)
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get badge details " & vbCrLf & _
                                                             " with the following SQL :" & _strSQL & vbCrLf & _
                                                             " Exception is:" & ex.ToString & vbCrLf)
            Exit Function
        End Try

        If _dsReceipents.Tables(0).Rows.Count > 0 Then
            For intCntExits = 0 To _dsReceipents.Tables(0).Rows.Count - 1
                With _dsReceipents.Tables(0).Rows(intCntExits)
                    pXmlOut &= " <RECORD><RECPNAME>" & .Item("RECIEPENTNAME") & "</RECPNAME> " & _
                               " <LOCATION>" & .Item("LOCATION") & "</LOCATION>" & _
                               " <PHONE>" & .Item("PHONE_NO") & "</PHONE>" & _
                               " <ADDR>" & .Item("ADDRESS_1") & "</ADDR>" & _
                               " <DEPTID>" & .Item("DEPT_ID") & "</DEPTID>" & _
                               " <LOC_DESCR>" & .Item("LOC_DESCR") & "</LOC_DESCR>" & _
                               " </RECORD>"
                End With
            Next
        Else
            pXmlOut = StatusXMLBuild(E_NORECORDFOUND)
            Exit Function
        End If

        pXmlOut = "<ROOT>" & pXmlOut & "</ROOT>"

        GetBadgeDetails = ATPAR_OK


    End Function

    'DG-IT1087
    ''' <summary>
    ''' Saves the Notes data into DB
    ''' </summary>
    ''' <param name="pxmlStr">XML Parameter</param>
    ''' <returns>ATPAR_OK on success, else ERROR CODE on error</returns>
    Public Function SaveNotesData(ByVal pxmlStr As String, ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_DevTrans.SaveNotesData

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim xmlDoc As XmlDocument
        Dim xmlRoot As XmlNode
        Dim xmlItem As XmlNode
        Dim xmlItemSubChild As XmlNode

        Dim strKEY1 As String = String.Empty
        Dim strKEY2 As String = String.Empty
        Dim strKEY3 As String = String.Empty
        Dim strKEY4 As String = String.Empty
        Dim strKEY5 As String = String.Empty
        Dim strKey6 As String = String.Empty
        Dim strKey7 As String = String.Empty
        Dim strKey8 As String = String.Empty
        Dim strKey9 As String = String.Empty
        Dim strKey10 As String = String.Empty
        Dim strKey11 As String = String.Empty
        Dim strKey12 As String = String.Empty
        Dim strKey13 As String = String.Empty
        Dim strAppId As String = String.Empty
        Dim strScreenName As String = String.Empty
        Dim strTransId As String = String.Empty
        Dim strCode As String = String.Empty
        Dim strNote As String = String.Empty
        Dim strDtTm As String = String.Empty
        Dim _strSQL As String = String.Empty

        If log.IsInfoEnabled Then log.Info("Inxml" & pxmlStr)

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            xmlDoc = New XmlDocument

            If (pxmlStr.Length > 0) Then
                xmlDoc.LoadXml(pxmlStr)
                xmlRoot = xmlDoc.DocumentElement
                For intXmlCount As Integer = 0 To xmlRoot.ChildNodes.Count - 1

                    xmlItem = xmlRoot.ChildNodes.Item(intXmlCount)
                    If (xmlItem.Name = "RECORD") Then
                        strKEY1 = String.Empty
                        strKEY2 = String.Empty
                        strKEY3 = String.Empty
                        strKEY4 = String.Empty
                        strKEY5 = String.Empty
                        strKey6 = String.Empty
                        strKey7 = String.Empty
                        strKey8 = String.Empty
                        strKey9 = String.Empty
                        strKey10 = String.Empty
                        strKey11 = String.Empty
                        strKey12 = String.Empty
                        strKey13 = String.Empty
                        strAppId = String.Empty
                        strScreenName = String.Empty
                        strTransId = String.Empty
                        strCode = String.Empty
                        strNote = String.Empty
                        strDtTm = String.Empty

                        For intChildCount As Integer = 0 To xmlItem.ChildNodes.Count - 1
                            xmlItemSubChild = xmlItem.ChildNodes.Item(intChildCount)

                            Select Case xmlItemSubChild.Name
                                Case "KEY_1"
                                    strKEY1 = xmlItemSubChild.InnerText
                                Case "KEY_2"
                                    strKEY2 = xmlItemSubChild.InnerText
                                Case "KEY_3"
                                    strKEY3 = xmlItemSubChild.InnerText
                                Case "KEY_4"
                                    strKEY4 = xmlItemSubChild.InnerText
                                Case "KEY_5"
                                    strKEY5 = xmlItemSubChild.InnerText
                                Case "KEY_6"
                                    strKey6 = xmlItemSubChild.InnerText
                                Case "KEY_7"
                                    strKey7 = xmlItemSubChild.InnerText
                                Case "KEY_8"
                                    strKey8 = xmlItemSubChild.InnerText
                                Case "KEY_9"
                                    strKey9 = xmlItemSubChild.InnerText
                                Case "KEY_10"
                                    strKey10 = xmlItemSubChild.InnerText
                                Case "KEY_11"
                                    strKey11 = xmlItemSubChild.InnerText
                                Case "KEY_12"
                                    strKey12 = xmlItemSubChild.InnerText
                                Case "KEY_13"
                                    strKey13 = xmlItemSubChild.InnerText
                                Case "APP_ID"
                                    strAppId = xmlItemSubChild.InnerText
                                Case "SCREEN_NAME"
                                    strScreenName = xmlItemSubChild.InnerText
                                Case "TRANS_ID"
                                    strTransId = xmlItemSubChild.InnerText
                                Case "CODE"
                                    strCode = xmlItemSubChild.InnerText
                                Case "NOTE"
                                    strNote = xmlItemSubChild.InnerText
                                Case "DATE_TIME"
                                    strDtTm = xmlItemSubChild.InnerText
                            End Select
                        Next
                    End If


                    If log.IsDebugEnabled Then log.Debug("After Retrieving tht Data from XML String : ")

                    _strSQL = "INSERT INTO MT_ATPAR_NOTES (KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, KEY_6," & _
                    "KEY_7, KEY_8, KEY_9, KEY_10, KEY_11, KEY_12, KEY_13, APP_ID, SCREEN_NAME, TRANS_ID," & _
                    "CODE, NOTES, DATE_TIME) VALUES ('" & strKEY1 & "','" & strKEY2 & "','" & strKEY3 & "'," & _
                    "'" & strKEY4 & "','" & strKEY5 & "','" & strKey6 & "','" & strKey7 & "','" & strKey8 & "'," & _
                    "'" & strKey9 & "','" & strKey10 & "','" & strKey11 & "','" & strKey12 & "'," & _
                    "'" & strKey13 & "','" & strAppId & "','" & strScreenName & "'," & _
                    "'" & strTransId & "','" & strCode & "','" & strNote & "','" & strDtTm & "')"

                    If log.IsInfoEnabled Then log.Info("Notes XML" & _strSQL)

                    Try

                        m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL))

                    Catch ex As Exception
                        SaveNotesData = ATPAR_E_LOCALDBINSERTFAIL
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert the notes data " & vbCrLf & _
                                                                    " with the following SQL :" & _strSQL & vbCrLf & _
                                                                    " Exception is:" & ex.ToString & vbCrLf)
                        Exit Function
                    End Try

                Next

            Else
                SaveNotesData = E_XMLSTRINGNOTLOADED
                If log.IsWarnEnabled Then log.Warn("E_XMLSTRINGNOTLOADED: " & pxmlStr)
                Exit Function
            End If

        Catch ex As Exception
            SaveNotesData = E_SERVERERROR
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Exit Function
        End Try

        SaveNotesData = ATPAR_OK

    End Function
    'POU Tables Data
    Public Function Do_GetPhysicianTable(ByVal pLastSyncDate As String, _
                                    ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _dsPhyscianIds As DataSet = Nothing
        Dim _dtPhyscianIds As New DataTable
        Dim _drPhyscianIds As DataRow
        Dim _statusCode As Long = -1
        Try

            Try
                _strSQL = "SELECT PHYSICIAN_ID, FIRST_NAME, STATUS FROM  MT_POU_PHYSICIAN "
                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    _strSQL = _strSQL & " WHERE UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)"
                End If
                If log.IsInfoEnabled Then log.Info(methodBaseName _
                                                       & "Getting Physician IDs with the following SQL......" _
                                                           & vbCrLf & _strSQL & vbCrLf)
                _dsPhyscianIds = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Physician IDs " & vbCrLf & _
                                                                    " with the following SQL :" & _strSQL & vbCrLf & _
                                                                    " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If _dsPhyscianIds.Tables(0).Rows.Count > 0 Then
                _dsPhyscianIds.Tables(0).TableName = Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString
                _dsPhyscianIds.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                _dsPhyscianIds.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
            Else
                _dtPhyscianIds.TableName = Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString
                _dtPhyscianIds.Columns.Add(Status, Type.GetType("System.String"))

                _drPhyscianIds = _dtPhyscianIds.NewRow
                _drPhyscianIds.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtPhyscianIds.Rows.Add(_drPhyscianIds)

                _dsPhyscianIds.Tables.Add(_dtPhyscianIds)
            End If

            pOutPutParams.Tables.Add(_dsPhyscianIds.Tables(Enum_DEPENDENCIES.PHYSICIAN_DATA.ToString).Copy)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dsPhyscianIds = Nothing
        End Try

        Return ATPAR_OK


    End Function

    Public Function Do_GetReasonsTable(ByVal pLastSyncDate As String, _
                                    ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _dsReasonCodes As DataSet = Nothing
        Dim _dtReasonCodes As New DataTable
        Dim _drReasonCodes As DataRow
        Dim _statusCode As Long = -1
        Try

            Try
                _strSQL = " SELECT REASON_CODE, DESCRIPTION, STATUS FROM  MT_POU_REASON_CODE "
                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    _strSQL = _strSQL & " WHERE UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)"
                End If
                If log.IsInfoEnabled Then log.Info(methodBaseName _
                                                       & "Getting Reason codes with the following SQL......" _
                                                           & vbCrLf & _strSQL & vbCrLf)
                _dsReasonCodes = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Reason codes " & vbCrLf & _
                                                " with the following SQL :" & _strSQL & vbCrLf & _
                                                " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If _dsReasonCodes.Tables(0).Rows.Count > 0 Then
                _dsReasonCodes.Tables(0).TableName = Enum_DEPENDENCIES.REASONS_DATA.ToString
                _dsReasonCodes.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                _dsReasonCodes.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
            Else
                _dtReasonCodes.TableName = Enum_DEPENDENCIES.REASONS_DATA.ToString
                _dtReasonCodes.Columns.Add(Status, Type.GetType("System.String"))

                _drReasonCodes = _dtReasonCodes.NewRow
                _drReasonCodes.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtReasonCodes.Rows.Add(_drReasonCodes)

                _dsReasonCodes.Tables.Add(_dtReasonCodes)
            End If

            pOutPutParams.Tables.Add(_dsReasonCodes.Tables(Enum_DEPENDENCIES.REASONS_DATA.ToString).Copy)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dsReasonCodes = Nothing
        End Try

        Return ATPAR_OK
    End Function

    Public Function Do_GetProcedureTable(ByVal pLastSyncDate As String, _
                                    ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _dsProcedureCodes As DataSet = Nothing
        Dim _dtProcedureCodes As New DataTable
        Dim _drProcedureCodes As DataRow
        Dim _statusCode As Long = -1
        Try

            Try
                _strSQL = " SELECT PROCEDURE_CODE, DESCRIPTION, STATUS FROM MT_POU_PROCEDURE_CODE "
                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    _strSQL = _strSQL & " WHERE UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)"
                End If
                If log.IsInfoEnabled Then log.Info(methodBaseName _
                                       & "Getting Procedure codes with the following SQL......" _
                                           & vbCrLf & _strSQL & vbCrLf)
                _dsProcedureCodes = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Procedure codes " & vbCrLf & _
                                                                       " with the following SQL :" & _strSQL & vbCrLf & _
                                                                       " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If _dsProcedureCodes.Tables(0).Rows.Count > 0 Then
                _dsProcedureCodes.Tables(0).TableName = Enum_DEPENDENCIES.PROCEDURE_DATA.ToString
                _dsProcedureCodes.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                _dsProcedureCodes.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
            Else
                _dtProcedureCodes.TableName = Enum_DEPENDENCIES.PROCEDURE_DATA.ToString
                _dtProcedureCodes.Columns.Add(Status, Type.GetType("System.String"))

                _drProcedureCodes = _dtProcedureCodes.NewRow
                _drProcedureCodes.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtProcedureCodes.Rows.Add(_drProcedureCodes)

                _dsProcedureCodes.Tables.Add(_dtProcedureCodes)
            End If

            pOutPutParams.Tables.Add(_dsProcedureCodes.Tables(Enum_DEPENDENCIES.PROCEDURE_DATA.ToString).Copy)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dsProcedureCodes = Nothing
        End Try

        Return ATPAR_OK

    End Function

    Public Function Do_GetCostCenterTable(ByVal pLastSyncDate As String, _
                                    ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _dsCostCenters As DataSet = Nothing
        Dim _dtCostCenters As New DataTable
        Dim _drCostCenters As DataRow
        Dim _statusCode As Long = -1
        Try

            Try
                _strSQL = " SELECT A.COST_CENTER_CODE, DESCRIPTION, CART_ID, STATUS FROM "
                _strSQL = _strSQL & " MT_POU_COST_CENTER A, MT_POU_COST_CENTER_ALLOCATIONS B WHERE A.COST_CENTER_CODE=B.COST_CENTER_CODE "
                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    _strSQL = _strSQL & " AND UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)"
                End If
                If log.IsInfoEnabled Then log.Info(methodBaseName _
                                                       & "Getting Costcenter codes with the following SQL......" _
                                                           & vbCrLf & _strSQL & vbCrLf)
                _dsCostCenters = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Costcenter codes " & vbCrLf & _
                                                                      " with the following SQL :" & _strSQL & vbCrLf & _
                                                                      " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If _dsCostCenters.Tables(0).Rows.Count > 0 Then
                _dsCostCenters.Tables(0).TableName = Enum_DEPENDENCIES.COSTCENTER_DATA.ToString
                _dsCostCenters.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                _dsCostCenters.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
            Else
                _dtCostCenters.TableName = Enum_DEPENDENCIES.COSTCENTER_DATA.ToString
                _dtCostCenters.Columns.Add(Status, Type.GetType("System.String"))

                _drCostCenters = _dtCostCenters.NewRow
                _drCostCenters.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtCostCenters.Rows.Add(_drCostCenters)

                _dsCostCenters.Tables.Add(_dtCostCenters)
            End If

            pOutPutParams.Tables.Add(_dsCostCenters.Tables(Enum_DEPENDENCIES.COSTCENTER_DATA.ToString).Copy)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dsCostCenters = Nothing
        End Try

        Return ATPAR_OK
    End Function

    Public Function Do_GetPreferenceTable(ByVal pLastSyncDate As String, _
                                    ByRef pOutPutParams As DataSet) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _dsPref_List_Ids As DataSet = Nothing
        Dim _dtPref_List_Ids As New DataTable
        Dim _drPref_List_Ids As DataRow
        Dim _statusCode As Long = -1

        Try
            Dim sqlParms() As SqlParameter
            sqlParms = New SqlParameter(2) {}

            sqlParms(0) = New SqlParameter("@LastSyncDate", SqlDbType.NVarChar)
            sqlParms(0).Value = pLastSyncDate

            sqlParms(1) = New SqlParameter("@StatusCode", SqlDbType.Int)
            sqlParms(1).Direction = ParameterDirection.Output

            If log.IsInfoEnabled Then
                log.Info("Calling GetPreferenceLists with the following syntax..")
                Dim _strSQL As String = "exec GetPreferenceLists " & _
                                         "'" & sqlParms(0).Value & "'"
                log.Info(_strSQL)
            End If
            Dim _Cmd As SqlCommand
            Try
                _Cmd = New SqlCommand

                _Cmd.Connection = m_LocalDB.CreateConnection
                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "GetPreferenceLists"
                _Cmd.Parameters.Add(sqlParms(0))
                _Cmd.Parameters.Add(sqlParms(1))

                _dsPref_List_Ids = m_LocalDB.ExecuteDataSet(_Cmd)

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Preference List Ids " & vbCrLf & GetSQLExceptionMessageString(sqlex))
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal("E_SERVERERROR :" & ex.ToString)
                Return E_SERVERERROR
            Finally
                _Cmd.Dispose()
            End Try

            _statusCode = sqlParms(1).Value
            If log.IsDebugEnabled Then log.Debug(methodBaseName & "_StatusCode for GetPreferenceLists is : " & _statusCode)

            If _statusCode = S_DELETE_PREF_LIST Then
                _dtPref_List_Ids.TableName = Enum_DEPENDENCIES.PREFERENCE_DATA.ToString
                _dtPref_List_Ids.Columns.Add(Status, Type.GetType("System.String"))
                _drPref_List_Ids = _dtPref_List_Ids.NewRow

                _drPref_List_Ids.Item("STATUS_CODE") = S_DELETE_PREF_LIST

                _dtPref_List_Ids.Rows.Add(_drPref_List_Ids)
                _dsPref_List_Ids.Tables.Add(_dtPref_List_Ids)

            ElseIf _statusCode = S_NO_DATAEXISTS_INTABLE Then
                _dtPref_List_Ids.TableName = Enum_DEPENDENCIES.PREFERENCE_DATA.ToString
                _dtPref_List_Ids.Columns.Add(Status, Type.GetType("System.String"))

                _drPref_List_Ids = _dtPref_List_Ids.NewRow

                _drPref_List_Ids.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE


                _dtPref_List_Ids.Rows.Add(_drPref_List_Ids)
                _dsPref_List_Ids.Tables.Add(_dtPref_List_Ids)

            ElseIf _statusCode = S_DATAEXISTS_INTABLE Then
                _dsPref_List_Ids.Tables(0).TableName = Enum_DEPENDENCIES.PREFERENCE_DATA.ToString
                _dsPref_List_Ids.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                _drPref_List_Ids = _dtPref_List_Ids.NewRow

                _dsPref_List_Ids.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE

                _dtPref_List_Ids.Rows.Add(_drPref_List_Ids)
                _dsPref_List_Ids.Tables.Add(_dtPref_List_Ids)
            End If
            pOutPutParams.Tables.Add(_dsPref_List_Ids.Tables(Enum_DEPENDENCIES.PREFERENCE_DATA.ToString).Copy)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dsPref_List_Ids = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' Syncs the systems installed on server to device
    ''' </summary>
    ''' <param name="pDeviceID">Device ID of the HHT </param>
    ''' <param name="pDSSystems"></param>
    ''' <returns>ATPAR_OK on success, else ERROR CODE on error</returns>
    Public Function SyncSystems(ByVal pDeviceID As String, ByRef pDSSystems As DataSet) As Long _
                             Implements IAtPar_DevTrans.SyncSystems

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _dsSystems As New DataSet
        Dim _StatusCode As Long

        Try
            CreateMasterDB()
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create MasterDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try
        ' Gets all the systems
        If log.IsInfoEnabled Then
            log.Info(methodBaseName & "Calling usp_GetSystemDetails with the following syntax..")
            _strSQL = "exec usp_GetSystemDetails "
            log.Info(_strSQL)
        End If

        Dim _cmdGetAllSystems As System.Data.Common.DbCommand = Nothing
        Try
            _cmdGetAllSystems = New SqlCommand
            _cmdGetAllSystems.Connection = m_MasterDB.CreateConnection
            _cmdGetAllSystems.CommandType = CommandType.StoredProcedure
            _cmdGetAllSystems.CommandText = "usp_GetSystemDetails"

            _dsSystems = m_MasterDB.ExecuteDataSet(_cmdGetAllSystems)

            If _dsSystems.Tables.Count > 0 Then
                If _dsSystems.Tables(0).Rows.Count > 0 Then
                    Dim dt As New DataTable
                    dt.Columns.Add(New DataColumn("SYSTEM_ID"))
                    dt.Columns.Add(New DataColumn("SYSTEM_NAME"))
                    pDSSystems.Tables.Add(dt)
                    _StatusCode = ATPAR_OK
                Else
                    Return E_NORECORDFOUND
                End If
            Else
                Return E_NORECORDFOUND
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Systems " & vbCrLf & _
                                                                  " with the following SQL :" & _strSQL & vbCrLf & _
                                                                  " Exception is:" & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Finally
            _dsSystems.Dispose()
            _cmdGetAllSystems.Dispose()
        End Try
        ' this _Statuscode is after getting all the systems (if there is no system then this will not be executed)
        If _StatusCode = ATPAR_OK Then
            Dim _flgAddSystemID As Boolean = False
            Dim _cntDeviceReg As Integer = 0
            For i As Integer = 0 To _dsSystems.Tables(0).Rows.Count - 1
                'check whether the "Allow registered devices only " parameter is checked or not from the Security configuration
                Try
                    CreateLocalDB(_dsSystems.Tables(0).Rows(i)("SYSTEM_ID").ToString())
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
                    Return E_SERVERERROR
                End Try

                _strSQL = "SELECT CASE WHEN ALLOW_REG_DEVICES='Y' THEN 1 ELSE 0 END FROM MT_ATPAR_SECURITY_PARAMS"

                If log.IsInfoEnabled Then
                    log.Info(methodBaseName & " : Query to check whether the systemid matches with the middle tier : " & _strSQL)
                End If

                Try
                    Dim _flgAllowRegDevices As Integer = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL)).ToString()
                    If _flgAllowRegDevices = 0 Then  ' Security parameter is not checked
                        _flgAddSystemID = True
                        _cntDeviceReg = _cntDeviceReg + 1
                    Else
                        ' check whether the device is registered in the system devices table of master DB
                        Dim _sql_param_sysid As SqlParameter = New SqlParameter("@SystemId", SqlDbType.NVarChar, _
                                                                                          ATPAR_DBSIZE_SYSTEM_ID)
                        _sql_param_sysid.Value = _dsSystems.Tables(0).Rows(i)("SYSTEM_ID").ToString()

                        Dim _sql_param_deviceid As SqlParameter = New SqlParameter("@DeviceId", SqlDbType.NVarChar, _
                                                                                          ATPAR_DBSIZE_DEVICE_ID)
                        _sql_param_deviceid.Value = pDeviceID

                        If log.IsInfoEnabled Then
                            log.Info(methodBaseName & "Calling ATPAR_SP_VALIDATEDEVICE with the following syntax..")
                            _strSQL = "exec ATPAR_SP_VALIDATEDEVICE " & _
                                                         "'" & _sql_param_sysid.Value & "'" & ", " & _sql_param_deviceid.Value & "'"
                            log.Info(_strSQL)
                        End If
                        Dim _cmd As System.Data.Common.DbCommand = Nothing
                        Try
                            _cmd = New SqlCommand
                            _cmd.Connection = m_MasterDB.CreateConnection
                            _cmd.CommandType = CommandType.StoredProcedure
                            _cmd.CommandText = "ATPAR_SP_VALIDATEDEVICE"
                            _cmd.Parameters.Add(_sql_param_sysid)
                            _cmd.Parameters.Add(_sql_param_deviceid)

                            Dim cnt As Integer = m_MasterDB.ExecuteScalar(_cmd)
                            If cnt = 0 Then
                                _flgAddSystemID = False
                            Else
                                _flgAddSystemID = True
                                _cntDeviceReg = _cntDeviceReg + 1
                            End If
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to check for device registered with the exception : " & ex.ToString)
                            Return E_SERVERERROR
                        Finally
                            _cmd.Dispose()
                        End Try

                    End If
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to check the allow device register parameter with the exception : " & ex.ToString)
                    Return E_SERVERERROR
                End Try
                If _flgAddSystemID Then
                    CreateSystemDsForSync(pDSSystems, _dsSystems.Tables(0).Rows(i)("SYSTEM_ID").ToString(), _dsSystems.Tables(0).Rows(i)("SYSTEM_NAME").ToString())
                End If
            Next
            If _cntDeviceReg > 0 Then
                Return ATPAR_OK
            Else
                Return E_INVALIDDEVICE
            End If
        End If
        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' Creates the datatable containing the systems which match the requirement like if security parameter is not checked, if checked and if registered
    ''' </summary>
    ''' <param name="pDSSystems"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="pSystemName"></param>
    ''' <returns>ATPAR_OK on success, else ERROR CODE on error</returns>
    Private Function CreateSystemDsForSync(ByRef pDsSystems As DataSet, ByVal pSystemID As String, ByVal pSystemName As String) As Long
        Dim _dt As New DataTable
        _dt = pDsSystems.Tables(0)
        Dim _dr As DataRow = _dt.NewRow()
        _dr("SYSTEM_ID") = pSystemID
        _dr("SYSTEM_NAME") = pSystemName
        _dt.Rows.Add(_dr)
        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' Insert and Update patient records in to the data base
    ''' </summary>
    ''' <param name="pAdtDS"></param>
    ''' <returns>ATPAR_OK on success else ERROR CODE on error</returns> 
    Public Function Add_Edit_ADTPatientData(ByVal pAdtDS As DataSet, _
                                        ByVal pSystemId As String, _
                                        ByVal pTriggerEvent As String) As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pSystemId

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            CreateLocalDB(pSystemId)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Dim _strSQL As New System.Text.StringBuilder
        Dim _strSQLUpdate As New System.Text.StringBuilder
        Dim dtAdmit As DateTime
        Dim dtDischarge As DateTime
        Dim _statusCode As Long = -1
        Dim blnPatient As Boolean = False

        Try
            If pTriggerEvent = "A01" Or pTriggerEvent = "A04" Or pTriggerEvent = "A05" Then
                Try
                    _statusCode = GetPatientDetails(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"), pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"), pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"), blnPatient)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to check if " & _
                                                          "patient exists with statuscode " & _statusCode & vbCrLf)
                        Return E_SERVERERROR
                    End If

                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to check if " & _
                                            "patient exist or not " & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try


                If blnPatient Then
                    With _strSQL
                        .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET PATIENT_NAME = '")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_NAME"))
                        .Append("', ")
                        .Append("PATIENT_BEDNUMBER ='")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_BEDNUMBER"))
                        .Append("', ")
                        .Append("PATIENT_DEPARTMENT = '")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_DEPARTMENT"))
                        .Append("', ")
                        .Append("PATIENT_SEX = '")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_SEX"))
                        .Append("', ")
                        .Append("PATIENT_CLASS = '")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_CLASS"))
                        .Append("', ")
                        .Append("PATIENT_VISIT_NUMBER = '")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_VISIT_NUMBER").ToString)
                        .Append("', ")
                        .Append("MESSAGE_DATETIME = ")
                        If pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME").ToString = String.Empty Then
                            .Append("NULL")
                        Else
                            .Append("'" & pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME") & "'")
                        End If
                        .Append(", ")
                        .Append("PATIENT_ADMIT_DATE = ")
                        If pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString = String.Empty Then
                            .Append("NULL")
                        Else
                            dtAdmit = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                            .Append("'" & dtAdmit & "'")
                        End If
                        .Append(", ")
                        .Append("PATIENT_DISCHARGE_DATE = ")
                        If pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString = String.Empty Then
                            .Append("NULL")
                        Else
                            dtDischarge = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                            .Append("'" & dtDischarge & "'")
                        End If
                        .Append(",")
                        .Append("STATUS = '")
                        If pAdtDS.Tables(0).Rows(0).Item("STATUS").ToString = String.Empty Then
                            .Append("A")
                        End If
                        .Append("', ")
                        .Append("PATIENT_ROOM_NUMBER = '")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ROOM_NUMBER"))
                        .Append("'")

                        .Append(" WHERE ORG_ID = '")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                        .Append("'")
                        .Append(" AND")
                        .Append(" PATIENT_MRC = '")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                        .Append("'")
                        .Append(" AND")
                        .Append(" PATIENT_ACCNUMBER = '")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                        .Append("'")
                    End With
                Else
                    With _strSQL
                        .Append("INSERT INTO MT_ATPAR_PATIENT_CACHE(ORG_ID, PATIENT_MRC, PATIENT_NAME, PATIENT_BEDNUMBER, PATIENT_DEPARTMENT, ")
                        .Append("PATIENT_SEX, PATIENT_ACCNUMBER, PATIENT_CLASS,MESSAGE_DATETIME,PATIENT_ADMIT_DATE,PATIENT_DISCHARGE_DATE,")
                        .Append("PATIENT_VISIT_NUMBER, STATUS, PATIENT_ROOM_NUMBER) VALUES('")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                        .Append("','")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                        .Append("','")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_NAME"))
                        .Append("','")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_BEDNUMBER"))
                        .Append("','")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_DEPARTMENT"))
                        .Append("','")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_SEX"))
                        .Append("','")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                        'GP-IT0001245
                        .Append("','")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_CLASS"))
                        .Append("',")
                        If pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME").ToString = String.Empty Then
                            .Append("NULL")
                        Else
                            .Append("'" & pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME") & "'")
                        End If
                        .Append(",")
                        If pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString = String.Empty Then
                            .Append("NULL")
                        Else
                            dtAdmit = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                            'dtAdmit = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME"), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                            .Append("'" & dtAdmit & "'")
                        End If
                        .Append(",")
                        If pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString = String.Empty Then
                            .Append("NULL")
                        Else
                            'dtDischarge = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME"), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                            dtDischarge = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                            .Append("'" & dtDischarge & "'")
                        End If
                        .Append(",'")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_VISIT_NUMBER"))
                        .Append("','")
                        If pAdtDS.Tables(0).Rows(0).Item("STATUS").ToString = String.Empty Then
                            .Append("A")
                        End If
                        .Append("','")
                        .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ROOM_NUMBER"))
                        .Append("'")
                        .Append(")")
                    End With
                End If
            ElseIf pTriggerEvent = "A02" Or pTriggerEvent = "A12" Or pTriggerEvent = "A17" Then

                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET PATIENT_NAME = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_NAME"))
                    .Append("', ")
                    .Append("PATIENT_BEDNUMBER ='")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_BEDNUMBER"))
                    .Append("', ")
                    .Append("PATIENT_DEPARTMENT = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_DEPARTMENT"))
                    .Append("', ")
                    .Append("PATIENT_SEX = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_SEX"))
                    .Append("', ")
                    .Append("PATIENT_CLASS = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_CLASS"))
                    .Append("', ")
                    .Append("PATIENT_VISIT_NUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_VISIT_NUMBER").ToString)
                    .Append("', ")
                    .Append("MESSAGE_DATETIME = ")
                    If pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        .Append("'" & pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME") & "'")
                    End If
                    .Append(", ")
                    .Append("PATIENT_ADMIT_DATE = ")
                    If pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        dtAdmit = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                        .Append("'" & dtAdmit & "'")
                    End If
                    .Append(", ")
                    .Append("PATIENT_DISCHARGE_DATE = ")
                    If pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        dtDischarge = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                        .Append("'" & dtDischarge & "'")
                    End If
                    .Append(",")
                    .Append("STATUS = '")
                    If pAdtDS.Tables(0).Rows(0).Item("STATUS").ToString = String.Empty Then
                        .Append("A")
                    End If
                    .Append("'")

                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_ACCNUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                    .Append("'")
                End With

            ElseIf pTriggerEvent = "A08" Then

                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET PATIENT_NAME = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_NAME"))
                    .Append("', ")
                    .Append("PATIENT_BEDNUMBER ='")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_BEDNUMBER"))
                    .Append("', ")
                    .Append("PATIENT_DEPARTMENT = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_DEPARTMENT"))
                    .Append("', ")
                    .Append("PATIENT_SEX = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_SEX"))
                    .Append("', ")
                    .Append("PATIENT_CLASS = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_CLASS"))
                    .Append("', ")
                    .Append("PATIENT_VISIT_NUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_VISIT_NUMBER").ToString)
                    .Append("', ")
                    .Append("MESSAGE_DATETIME = ")
                    If pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        .Append("'" & pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME") & "'")
                    End If
                    .Append(", ")
                    .Append("PATIENT_ADMIT_DATE = ")
                    If pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        dtAdmit = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                        .Append("'" & dtAdmit & "'")
                    End If
                    .Append(", ")
                    .Append("PATIENT_DISCHARGE_DATE = ")
                    If pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        dtDischarge = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                        .Append("'" & dtDischarge & "'")
                    End If

                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_ACCNUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                    .Append("'")
                End With

                '' Changing change patient account number.
            ElseIf pTriggerEvent = "A35" Then

                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET PATIENT_ACCNUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                    .Append("', ")
                    .Append("STATUS = '")
                    If pAdtDS.Tables(0).Rows(0).Item("STATUS").ToString = String.Empty Then
                        .Append("A")
                    End If
                    .Append("'")

                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                End With

                '' Changing Patient medical record number.
            ElseIf pTriggerEvent = "A36" Then
                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("', ")
                    .Append("STATUS = '")
                    If pAdtDS.Tables(0).Rows(0).Item("STATUS").ToString = String.Empty Then
                        .Append("A")
                    End If
                    .Append("'")

                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_ACCNUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                    .Append("'")
                End With

            ElseIf pTriggerEvent = "A11" Then

                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET STATUS = '")
                    If pAdtDS.Tables(0).Rows(0).Item("STATUS").ToString = String.Empty Then
                        .Append("C")
                    End If
                    .Append("'")
                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_ACCNUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                    .Append("'")
                End With
            ElseIf pTriggerEvent = "A34" Then

                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET ")
                    .Append("OLD_PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("OLD_PATIENT_MRC"))
                    .Append("'")
                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append(" AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("OLD_PATIENT_MRC"))
                    .Append("'")
                    .Append(" AND")
                    .Append(" OLD_PATIENT_MRC IS NULL ")
                End With

            ElseIf pTriggerEvent = "A03" Then

                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET STATUS = '")
                    If pAdtDS.Tables(0).Rows(0).Item("STATUS").ToString = String.Empty Then
                        .Append("D")
                    End If
                    .Append("',")
                    .Append(" PATIENT_NAME = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_NAME"))
                    .Append("', ")
                    .Append("PATIENT_BEDNUMBER ='")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_BEDNUMBER"))
                    .Append("', ")
                    .Append("PATIENT_DEPARTMENT = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_DEPARTMENT"))
                    .Append("', ")
                    .Append("PATIENT_SEX = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_SEX"))
                    .Append("', ")
                    .Append("PATIENT_CLASS = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_CLASS"))
                    .Append("', ")
                    .Append("PATIENT_VISIT_NUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_VISIT_NUMBER").ToString)
                    .Append("', ")
                    .Append("MESSAGE_DATETIME = ")
                    If pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        .Append("'" & pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME") & "'")
                    End If
                    .Append(", ")
                    .Append("PATIENT_ADMIT_DATE = ")
                    If pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        dtAdmit = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                        .Append("'" & dtAdmit & "'")
                    End If
                    .Append(", ")
                    .Append("PATIENT_DISCHARGE_DATE = ")
                    If pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        dtDischarge = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                        .Append("'" & dtDischarge & "'")
                    End If
                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_ACCNUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                    .Append("'")
                End With
            ElseIf pTriggerEvent = "A13" Then

                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET STATUS = '")
                    If pAdtDS.Tables(0).Rows(0).Item("STATUS").ToString = String.Empty Then
                        .Append("A")
                    End If
                    .Append("',")
                    .Append(" PATIENT_NAME = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_NAME"))
                    .Append("', ")
                    .Append("PATIENT_BEDNUMBER ='")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_BEDNUMBER"))
                    .Append("', ")
                    .Append("PATIENT_DEPARTMENT = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_DEPARTMENT"))
                    .Append("', ")
                    .Append("PATIENT_SEX = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_SEX"))
                    .Append("', ")
                    .Append("PATIENT_CLASS = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_CLASS"))
                    .Append("', ")
                    .Append("PATIENT_VISIT_NUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_VISIT_NUMBER").ToString)
                    .Append("', ")
                    .Append("MESSAGE_DATETIME = ")
                    If pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        .Append("'" & pAdtDS.Tables(0).Rows(0).Item("MESSAGE_DATETIME") & "'")
                    End If
                    .Append(", ")
                    .Append("PATIENT_ADMIT_DATE = ")
                    If pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    Else
                        dtAdmit = DateTime.ParseExact(pAdtDS.Tables(0).Rows(0).Item("ADMIT_DATETIME").ToString.Substring(0, 12), "yyyyMMddHHmm", (New Globalization.DateTimeFormatInfo))
                        .Append("'" & dtAdmit & "'")
                    End If
                    .Append(", ")
                    .Append("PATIENT_DISCHARGE_DATE = ")
                    If pAdtDS.Tables(0).Rows(0).Item("DISCHARGE_DATETIME").ToString = String.Empty Then
                        .Append("NULL")
                    End If
                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append("AND")
                    .Append(" PATIENT_ACCNUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                    .Append("'")
                End With
            ElseIf pTriggerEvent = "A44" Then
                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET ")
                    .Append("PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append(" AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("OLD_PATIENT_MRC"))
                    .Append("'")
                    .Append(" AND")
                    .Append(" PATIENT_ACCNUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("OLD_PATIENT_ACCOUNT_NUMBER"))
                    .Append("'")

                End With
            ElseIf pTriggerEvent = "A06" Or pTriggerEvent = "A07" Then
                With _strSQL
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET ")
                    .Append("PATIENT_CLASS = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_CLASS"))
                    .Append("'")
                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append(" AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append(" AND")
                    .Append(" PATIENT_ACCNUMBER = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_ACCOUNT_NUMBER"))
                    .Append("'")
                End With
            End If
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Inserting Patient Cache " & _
                                                                  " with the following Sql... " & _strSQL.ToString & vbCrLf)
            If _strSQL.Length > 0 Then
                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL.ToString))
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL.... " & _strSQL.ToString & _
                                    vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBSELECTFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL.... " & _strSQL.ToString & _
                                    vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try

            End If

            _strSQL.Remove(0, _strSQL.Length)

            If pTriggerEvent = "A34" Then

                With _strSQLUpdate
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append(" AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("OLD_PATIENT_MRC"))
                    .Append("'")
                End With


                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Updating Old Patient ID in MT_ATPAR_PATIENT_CACHE" & _
                                                                 " with the following Sql... " & _strSQLUpdate.ToString & vbCrLf)
                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQLUpdate.ToString))
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL in MT_ATPAR_PATIENT_CACHE...." & _strSQLUpdate.ToString & _
                                    vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBUPDATEFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL in MT_ATPAR_PATIENT_CACHE...." & _strSQLUpdate.ToString & _
                                    vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try
                _strSQLUpdate.Remove(0, _strSQLUpdate.Length)

                With _strSQLUpdate
                    .Append("UPDATE MT_ATPAR_PATIENT_CACHE SET PATIENT_NAME = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_NAME"))
                    .Append("', ")
                    .Append("PATIENT_SEX = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_SEX"))
                    .Append("', ")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append(" WHERE ORG_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("ORG_ID"))
                    .Append("'")
                    .Append(" AND")
                    .Append(" PATIENT_MRC = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                End With

                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Updating Patient ID in MT_ATPAR_PATIENT_CACHE" & _
                                                                  " with the following Sql... " & _strSQLUpdate.ToString & vbCrLf)
                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQLUpdate.ToString))
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL in MT_ATPAR_PATIENT_CACHE...." & _strSQLUpdate.ToString & _
                                    vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBUPDATEFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL in MT_ATPAR_PATIENT_CACHE...." & _strSQLUpdate.ToString & _
                                    vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try
                _strSQLUpdate.Remove(0, _strSQLUpdate.Length)
                Dim _strCaseHeader As New System.Text.StringBuilder

                With _strCaseHeader
                    .Append("UPDATE MT_POU_CASE_CART_HEADER SET PATIENT_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append(" WHERE PATIENT_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("OLD_PATIENT_MRC"))
                    .Append("'")
                End With
                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Updating Patient ID in MT_POU_CASE_CART_HEADER" & _
                                                                  " with the following Sql... " & _strCaseHeader.ToString & vbCrLf)
                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strCaseHeader.ToString))
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following(MT_POU_CASE_CART_HEADER) SQL...." & _strCaseHeader.ToString & _
                                    vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBUPDATEFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following(MT_POU_CASE_CART_HEADER) SQL...." & _strCaseHeader.ToString & _
                                    vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try

                _strCaseHeader.Remove(0, _strCaseHeader.Length)

                Dim _strChrCapHeader As New System.Text.StringBuilder
                With _strChrCapHeader
                    .Append("UPDATE MT_POU_CHARGECAPTURE_HEADER SET PATIENT_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append(" WHERE PATIENT_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("OLD_PATIENT_MRC"))
                    .Append("'")
                End With
                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Updating Patient ID in MT_POU_CHARGECAPTURE_HEADER" & _
                                                                  " with the following Sql... " & _strChrCapHeader.ToString & vbCrLf)
                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strChrCapHeader.ToString))
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following(MT_POU_CHARGECAPTURE_HEADER) SQL...." & _strChrCapHeader.ToString & _
                                    vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBUPDATEFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following(MT_POU_CHARGECAPTURE_HEADER) SQL...." & _strChrCapHeader.ToString & _
                                    vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try

                _strChrCapHeader.Remove(0, _strChrCapHeader.Length)
            End If

            If pTriggerEvent = "A44" Then

                With _strSQLUpdate
                    .Append("UPDATE MT_POU_CHARGECAPTURE_HEADER SET ")
                    .Append("PATIENT_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("PATIENT_MRC"))
                    .Append("'")
                    .Append(" WHERE PATIENT_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("OLD_PATIENT_MRC"))
                    .Append("'")
                    .Append(" AND")
                    .Append(" ACCOUNT_ID = '")
                    .Append(pAdtDS.Tables(0).Rows(0).Item("OLD_PATIENT_ACCOUNT_NUMBER"))
                    .Append("'")
                End With
                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Updating Patient ID in MT_ATPAR_PATIENT_CACHE" & _
                                                                 " with the following Sql... " & _strSQLUpdate.ToString & vbCrLf)
                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQLUpdate.ToString))
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL in MT_ATPAR_PATIENT_CACHE...." & _strSQLUpdate.ToString & _
                                    vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBUPDATEFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL in MT_ATPAR_PATIENT_CACHE...." & _strSQLUpdate.ToString & _
                                    vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try
                _strSQLUpdate.Remove(0, _strSQLUpdate.Length)


                '' End of Updating Charge Capture Details Data
            End If


            Return ATPAR_OK


        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

    End Function

'Note :  Deliver to ShipTo ID  Allocation Records are Checked for the
    '        Purpose of Printing in Receive Status Screen POID Headers Printing  . If any Ship to Id Records Present in the table
    '        MT_DELV_SHIPTO_ID_ALLOCATION Stock Header will be printed.

    Private Function Do_GetDelivShipToIDAllocation(ByVal pOrgGroupID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            Dim _strSQL1 As New StringBuilder
            Dim _intCnt As Integer = 0

            With _strSQL1
                .Append("SELECT COUNT(*) FROM MT_DELV_SHIPTO_ID_ALLOCATION WHERE ORG_GROUP_ID='")
                .Append(pOrgGroupID)
                .Append("' ")
            End With
            Try
                If log.IsInfoEnabled Then log.Info(methodBaseName & ":" & _strSQL1.ToString)
                _intCnt = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL1.ToString))
                _strSQL1.Remove(0, _strSQL1.Length)
                delivShipToIdAllocation = IIf(_intCnt > 0, "Y", "N")

            Catch ex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                          _strSQL1.ToString & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try
            Do_GetDelivShipToIDAllocation = ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To sync workstation departments to HHT
    ''' </summary>
    ''' <param name="pLastSyncDate"></param>
    ''' <param name="pOutPutParams"></param>
    ''' <param name="pDeviceTokenEntry"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Do_GetWksAllocDepartments(ByVal pLastSyncDate As String, _
                                              ByRef pOutPutParams As DataSet, _
                                              ByVal pDeviceTokenEntry() As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _dsDepts As DataSet = Nothing
        Dim _dtDepts As New DataTable
        Dim _drDepts As DataRow
        Dim _statusCode As Long = -1
        Dim _sbSql As New StringBuilder
        Try

            Try
                With _sbSql
                    .Append("SELECT D.DEPT_ID ,D.DEPT_NAME,D.STATUS FROM MT_POU_DEPT D,MT_POU_DEPT_USER_ALLOCATIONS DU,")
                    .Append("MT_POU_DEPT_WORKSTATIONS DW WHERE D.DEPT_ID=DU.DEPARTMENT_ID ")
                    .Append("AND D.ORG_GROUP_ID=DU.ORG_GROUP_ID AND DW.DEPARTMENT_ID =D.DEPT_ID AND D.STATUS = 0 AND DW.ORG_GROUP_ID=DU.ORG_GROUP_ID ")
                    .Append("AND DU.USER_ID = '").Append(pDeviceTokenEntry(TokenEntry_Enum.UserID)).Append("' ")
                    .Append("AND DU.ORG_GROUP_ID = '").Append(pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID)).Append("' ")
                    .Append("AND DW.WORKSTATION_MAC_ADDRESS = '").Append(pDeviceTokenEntry(TokenEntry_Enum.DeviceID)).Append("' ")

                End With
               
                If log.IsInfoEnabled Then log.Info(methodBaseName _
                                       & "Getting Workstation departments with the following SQL......" _
                                           & vbCrLf & _sbSql.ToString & vbCrLf)
                _dsDepts = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSql.ToString))
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Workstation departments " & vbCrLf & _
                                                                       " with the following SQL :" & _sbSql.ToString & vbCrLf & _
                                                                       " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If _dsDepts.Tables(0).Rows.Count > 0 Then
                _dsDepts.Tables(0).TableName = Enum_DEPENDENCIES.POU_DEPTDATA.ToString
                _dsDepts.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                _dsDepts.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
            Else
                _dtDepts.TableName = Enum_DEPENDENCIES.POU_DEPTDATA.ToString
                _dtDepts.Columns.Add(Status, Type.GetType("System.String"))

                _drDepts = _dtDepts.NewRow
                _drDepts.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtDepts.Rows.Add(_drDepts)

                _dsDepts.Tables.Add(_dtDepts)
            End If

            pOutPutParams.Tables.Add(_dsDepts.Tables(Enum_DEPENDENCIES.POU_DEPTDATA.ToString).Copy)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dsDepts = Nothing
        End Try

        Return ATPAR_OK

    End Function


    ''' <summary>
    ''' To get Location groups info 
    ''' </summary>
    ''' <param name="pLastSyncDate">Last Synchronisation Date</param>
    ''' <param name="pOutPutParams">Location Groups Data as Dataset</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns> 
    Private Function GetLabelsToPrint(ByVal pLastSyncDate As String, ByRef pOutPutParams As DataSet, ByVal pDeviceTokenEntry() As String) As Long _
                                    Implements IAtPar_DevTrans.GetLabelsToPrint

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Dim _strProfileID As String = String.Empty
        Dim _strSQL As String = String.Empty
        Dim _dsPrinterLabels As DataSet = Nothing
        Dim _dtPrinterLabels As New DataTable
        Dim _drPrinterLabels As DataRow
        Dim _statusCode As Long = -1
        Dim _sbSql As New StringBuilder

        Try

            Try
                _strProfileID = pDeviceTokenEntry(TokenEntry_Enum.ProfileID)

                With _sbSql
                    .Append("SELECT A.APP_ID, A.LABEL_FILE_NAME, A.LABEL_DATA_PNL, ")
                    .Append("A.LABEL_DATA_LVX, A.LABEL_IMAGE, A.MODEL, ")
                    .Append("A.WIDTH, A.HEIGHT, A.UPDATE_DATE, A.LINK_LABEL_TYPE ")
                    .Append("FROM MT_ATPAR_LABELS_DATA A, MT_ATPAR_PROFILE_APP_ACL B ")
                    .Append("WHERE A.APP_ID = B.APP_ID ")
                    .Append("AND PROFILE_ID = '" & _strProfileID & "' ")
                    .Append("AND A.LABEL_FILE_NAME IN( SELECT C.LABEL_FILE_NAME ")
                    .Append("FROM MT_ATPAR_SETUP_PRO_PRINTERES C ")
                    .Append("WHERE C.STATUS = 1 ")

                    If Not String.IsNullOrEmpty(pLastSyncDate) Then
                        .Append(" AND C.UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101) ")
                    End If

                    .Append(" GROUP BY C.LABEL_FILE_NAME) ")
                    .Append(" SELECT APP_ID, LABEL_FILE_NAME, FRIENDLY_NAME, ")
                    .Append("NETWORK_TYPE, IP_ADDRESS, PORT_NO, ")
                    .Append("A.UPDATE_DATE, USER_ID, LABEL_TYPE, ")
                    .Append("LINKED_LABEL_TYPE, PRINTER_CODE, NAME AS PRINTER_NAME ")
                    .Append("FROM MT_ATPAR_SETUP_PRO_PRINTERES A, MT_ATPAR_LBL_PRINTERS B ")
                    .Append("WHERE A.STATUS = 1 ")
                    .Append("AND A.PRINTER_CODE = B.CODE")
                End With


                If log.IsInfoEnabled Then log.Info(methodBaseName _
                                                       & "Getting Printer labels with the following SQL......" _
                                                           & vbCrLf & _sbSql.ToString & vbCrLf)
                _dsPrinterLabels = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSql.ToString))

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the Printer Labels " & vbCrLf & _
                                                                      " with the following SQL :" & _sbSql.ToString & vbCrLf & _
                                                                      " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try


            pOutPutParams = _dsPrinterLabels


        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dsPrinterLabels = Nothing
        End Try

        Return ATPAR_OK

    End Function


    Public Function Do_GetManageCarriersTable(ByVal pLastSyncDate As String, _
                                   ByRef pOutPutParams As DataSet) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _dsManageCarriers As DataSet = Nothing
        Dim _dtManageCarriers As New DataTable
        Dim _drManageCarriers As DataRow
        Dim _statusCode As Long = -1

        Try
            With _sbSQL
                .Append("SELECT SEARCH_STRING, START_POSITION, CARRIER, STATUS  FROM MT_RECV_MANAGE_CARRIERS ")
                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    .Append(" WHERE UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End If
            End With


            Try
                If log.IsDebugEnabled Then log.Debug(methodBaseName & "getmanagecarrierstable: " & _sbSQL.ToString())
                _dsManageCarriers = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))

            Catch ex As Exception
                If log.IsDebugEnabled Then log.Debug(methodBaseName & "Bexception:" & ex.Message)
            End Try

            If _dsManageCarriers.Tables(0).Rows.Count > 0 Then
                _dsManageCarriers.Tables(0).TableName = Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString
                _dsManageCarriers.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                _dsManageCarriers.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
            Else
                _dtManageCarriers.TableName = Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString
                _dtManageCarriers.Columns.Add(Status, Type.GetType("System.String"))

                _drManageCarriers = _dtManageCarriers.NewRow
                _drManageCarriers.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE

                _dtManageCarriers.Rows.Add(_drManageCarriers)

                _dsManageCarriers.Tables.Add(_dtManageCarriers)
            End If

            pOutPutParams.Tables.Add(_dsManageCarriers.Tables(Enum_DEPENDENCIES.MANAGE_CARRIERS.ToString).Copy)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dsManageCarriers = Nothing
        End Try

        Return ATPAR_OK

    End Function

#Region "Auto Putaway"

    ''' <summary>
    ''' Handles auto putaway process
    ''' </summary>
    ''' <param name="pDsPtwyItemsHdr"></param>
    ''' <param name="pDsPtwyItemsDtls"></param>
    ''' <param name="pDeviceTokenEntry"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function AutoPutaway(ByVal pDsPtwyItemsHdr As DataSet, ByVal pDsPtwyItemsDtls As DataSet, _
                                ByRef pTrans As SqlTransaction, ByVal pDeviceTokenEntry() As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Long = -1
        Dim _dvLocs As New DataView
        Dim _dtLocs As New DataTable
        Dim _strLoc As String = String.Empty
        Dim _dsDeptInfo As New DataSet 'holds all locations departments for which AUTO_PUTAWAY_ENABLED = Y
        Dim _dsPtwyOrdDtls As New DataSet
        Dim _blnFlag As Boolean = False
        Dim _sbSQL As New StringBuilder
        Dim _Cmd As SqlCommand
        Dim _intOrderStatus As Integer
        Dim _strQtyRound As String = String.Empty
        Dim _atparTrans As AtPar_Application_Transactions
        Dim _lngTransID As Long
        Dim _atparParameters As Atpar_Application_Parameters
        Dim _strBusinessUnit As String = String.Empty
        Dim _strVendorId As String = String.Empty
        Dim _strPOdate As String = String.Empty
        Dim _strPOStartdate As String = String.Empty
        Dim _strPOEnddate As String = String.Empty
        Dim _dtPtwyDate As DateTime
        Dim _dblConvFactor As Double

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _atparParameters = Atpar_Application_Parameters.CreateInstance(pDeviceTokenEntry(TokenEntry_Enum.SystemId))

        'Getting Org parameter Qty round option
        Try
            _atparParameters.OrgGroupId = pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID)
            _atparParameters.ApplicationId = EnumApps.PointOfUse
            _atparParameters.ParameterId = AppParameters_Enum.QTY_ROUND_TYPE.ToString

            _statusCode = _atparParameters.GetOrgGroupParamValue(_strQtyRound)
            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to get Order Qty Rounding Option org parameter with status code :" & _statusCode)
                Return _statusCode
            End If
            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Order Qty Rounding Option param Value:" & _strQtyRound)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to get org parameter with the exception : " & ex.ToString)
            Return E_SERVERERROR
        End Try

        ' calling Get Transaction method to get a new transaction Id
        Try
            _atparTrans = AtPar_Application_Transactions.CreateInstance(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(" Exception thrown in " & methodBaseName & " is... " & _
                                                                            vbCrLf & ex.ToString)
            Return E_SERVERERROR
        End Try

        Try
            _statusCode = _atparTrans.GetTransactionId(EnumApps.PointOfUse, _lngTransID)
            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to generate a new " & _
                                                                    "transactionId : StatusCode is : " & _
                                                                    _statusCode & vbCrLf)
                Return _statusCode
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to generate a new " & _
                                                                    "transactionId : Exception is : " & _
                                                                    ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

        'fetching distinct locations from input dataset

        _dvLocs = pDsPtwyItemsDtls.Tables(DataSet_Type.AUTOPUTAWAY_DETAILS.ToString).DefaultView
        _dtLocs = _dvLocs.ToTable(True, [Enum].Parse(GetType(Enum_AutoPutAway_Details), "LOCATION"))

        Try
            _dtPtwyDate = Now 'To keep common date in putaway devation header and details tables
            For _cnt As Integer = 0 To _dtLocs.Rows.Count - 1
                If String.IsNullOrEmpty(_strLoc) Then
                    _strLoc = _dtLocs.Rows(_cnt).Item(Enum_AutoPutAway_Details.LOCATION).ToString
                Else
                    _strLoc = _strLoc & "','" & _dtLocs.Rows(_cnt).Item(Enum_AutoPutAway_Details.LOCATION).ToString
                End If
            Next

            'Getting pou locations with auto putaway parameter checked

            If Not String.IsNullOrEmpty(_strLoc) Then

                _strBusinessUnit = pDsPtwyItemsHdr.Tables(0).Rows(0).Item([Enum].Parse(GetType(Enum_AutoPutAway_Header), "BUSINESS_UNIT")).ToString
                _strVendorId = pDsPtwyItemsHdr.Tables(0).Rows(0).Item([Enum].Parse(GetType(Enum_AutoPutAway_Header), "VENDOR_ID")).ToString()
                _strPOdate = pDsPtwyItemsHdr.Tables(0).Rows(0).Item([Enum].Parse(GetType(Enum_AutoPutAway_Header), "PO_DT")).ToString()
                _strPOStartdate = pDsPtwyItemsHdr.Tables(0).Rows(0).Item([Enum].Parse(GetType(Enum_AutoPutAway_Header), "START_DT_TIME")).ToString()
                _strPOEnddate = pDsPtwyItemsHdr.Tables(0).Rows(0).Item([Enum].Parse(GetType(Enum_AutoPutAway_Header), "END_DT_TIME")).ToString()
                Try
                    _statusCode = GetDeptLevelInfo(_strLoc, _strBusinessUnit, pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID), _dsDeptInfo, pTrans, _strVendorId, _strPOdate)
                    If _statusCode <> ATPAR_OK Then

                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the department level info with _statusCode:" & _statusCode)
                        Return _statusCode
                    End If

                Catch ex As Exception

                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the department level info and " & _
                                                                        " Exception is :" & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try

                If Not _dsDeptInfo Is Nothing AndAlso _dsDeptInfo.Tables.Count > 0 AndAlso _dsDeptInfo.Tables(0).Rows.Count > 0 Then

                    Dim _drDeptInfo() As DataRow 'holds location based items of pDsPtwyItemsDtls dataset

                    For _cnt As Integer = 0 To _dsDeptInfo.Tables(0).Rows.Count - 1
                        _blnFlag = False
                        _drDeptInfo = pDsPtwyItemsDtls.Tables(0).Select("[" & pDsPtwyItemsDtls.Tables(0).Columns(Enum_AutoPutAway_Details.LOCATION).ColumnName & "] = '" & _dsDeptInfo.Tables(0).Rows(_cnt).Item("LOCATION") & "'")

                        If _drDeptInfo.Length > 0 Then
                            'getting putaway order details for each location
                            Try
                                _strBusinessUnit = _dsDeptInfo.Tables(0).Rows(_cnt).Item("BUSINESS_UNIT")
                                _statusCode = GetPtwyOrderDtls(_strBusinessUnit, _dsDeptInfo.Tables(0).Rows(_cnt).Item("CART_ID"), _strVendorId, _strPOdate, _dsPtwyOrdDtls, pTrans)
                                If _statusCode <> ATPAR_OK Then

                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the putaway order details with _statusCode:" & _statusCode)
                                    Return _statusCode
                                End If

                            Catch ex As Exception

                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the putaway order details and " & _
                                                                                    " Exception is :" & ex.ToString & vbCrLf)
                                Return E_SERVERERROR
                            End Try

                            If Not _dsPtwyOrdDtls Is Nothing AndAlso _dsPtwyOrdDtls.Tables.Count > 0 AndAlso _dsPtwyOrdDtls.Tables(0).Rows.Count > 0 Then
                                'compare items in putaway order and input dataset details
                                Dim _drPtwyOrdDtls() As DataRow 'Contains each item related info
                                For _itmCnt As Integer = 0 To _dsPtwyOrdDtls.Tables(0).Rows.Count - 1 'each order details
                                    Dim _dtDeptInfo As New DataTable
                                    _dtDeptInfo = _drDeptInfo.CopyToDataTable
                                    _drPtwyOrdDtls = _dtDeptInfo.Select("[" & _dtDeptInfo.Columns(Enum_AutoPutAway_Details.ITEM_ID).ColumnName & "] = '" & _dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("ITEM_ID").ToString & "'")

                                    'if item exist then update PAR_MNGT_ORDER_DETAILS 

                                    If _drPtwyOrdDtls.Length > 0 Then
                                        _dblConvFactor = 0
                                        Dim _dblAlreadyRecvqty As Double
                                        _dblAlreadyRecvqty = 0
                                        Dim _dblQtyReceived As Double
                                        _dblQtyReceived = 0
                                        If Not IsDBNull(_dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("QTY_RCVD")) AndAlso Not String.IsNullOrEmpty(_dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("QTY_RCVD")) Then
                                            _dblAlreadyRecvqty = _dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("QTY_RCVD")
                                        End If

                                        For Each _dr In _drPtwyOrdDtls
                                            _dblQtyReceived = _dblQtyReceived + CDbl(_dr.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString()) 'putaway Qty from input dataset
                                        Next

                                        _dblConvFactor = _drPtwyOrdDtls(0).Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "CONVERSION_RATE")).ToString()
                                        If _dblConvFactor > 1 Then
                                            If _strQtyRound = "Ceil" Then
                                                _dblQtyReceived = (Math.Ceiling(_dblQtyReceived * _dblConvFactor))
                                            ElseIf _strQtyRound = "Floor" Then
                                                _dblQtyReceived = (Math.Floor(_dblQtyReceived * _dblConvFactor))
                                            End If
                                        End If

                                        _dblAlreadyRecvqty = _dblAlreadyRecvqty + _dblQtyReceived

                                        'Inserting into MT_POU_PTWY_DEVIATION_DETAILS Table

                                        Try
                                            _statusCode = InsertDeviationDtls(_dsPtwyOrdDtls.Tables(0).Rows(0).Item("ORDER_NO"), _
                                                                                _dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("ITEM_ID").ToString, _
                                                                                _drPtwyOrdDtls(0).Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "STORAGE_LOCATION")).ToString(), _
                                                                                CDbl(_dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("QTY")), _
                                                                                _dblAlreadyRecvqty, _
                                                                                pTrans, _dtPtwyDate)
                                            If _statusCode <> ATPAR_OK Then
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert the details in putaway deviation details with _statusCode:" & _statusCode)
                                                Return _statusCode
                                            End If

                                        Catch ex As Exception
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert the details in putaway deviation details and " & _
                                                                                                " Exception is :" & ex.ToString & vbCrLf)
                                            Return E_SERVERERROR
                                        End Try

                                        'Update PAR_MNGT_ORDER_DETAILS Table
                                        'if qty orderdered-(qty putaway+qty received) <=0 then status closed else partially received

                                        If (CDbl(_dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("QTY")) - (_dblQtyReceived + CDbl(_dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("QTY_RCVD")))) <= 0 Then
                                            _intOrderStatus = CLOSED
                                        Else
                                            _intOrderStatus = PARTIALLY_RECEIVED
                                        End If

                                        Try
                                            _statusCode = UpdateParMngtOrderDtls(_dblQtyReceived, _intOrderStatus, _
                                                                                    _dsPtwyOrdDtls.Tables(0).Rows(0).Item("ORDER_NO"), _
                                                                                _dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("LINE_NO"), _
                                                                                _dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("ITEM_ID").ToString, pTrans)
                                            If _statusCode <> ATPAR_OK Then
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Update the order details with _statusCode:" & _statusCode)
                                                Return _statusCode
                                            End If

                                        Catch ex As Exception
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Update the order details and " & _
                                                                                                " Exception is :" & ex.ToString & vbCrLf)
                                            Return E_SERVERERROR
                                        End Try

                                        _blnFlag = True

                                        Try
                                            _statusCode = InsertUpdateCartInventory(_drPtwyOrdDtls, _strBusinessUnit, _strQtyRound, _lngTransID,
                                                                                    _dsDeptInfo.Tables(0).Rows(_cnt).Item("CART_ID"),
                                                                                        _dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("ITEM_ID").ToString,
                                                                                    _dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("BIN_LOC").ToString, pTrans)
                                            If _statusCode <> ATPAR_OK Then
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert or update cart inventory with _statusCode:" & _statusCode)
                                                Return _statusCode
                                            End If

                                        Catch ex As Exception
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert or update cart inventory and " & _
                                                                                                " Exception is :" & ex.ToString & vbCrLf)
                                            Return E_SERVERERROR
                                        End Try

                                    Else

                                        If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Item : " & _
                                            _dsPtwyOrdDtls.Tables(0).Rows(_itmCnt).Item("ITEM_ID").ToString & _
                                            " : not exist in putaway order : " & _
                                            _dsPtwyOrdDtls.Tables(0).Rows(0).Item("ORDER_NO") & vbCrLf)

                                    End If

                                Next
                                'Inserting into MT_POU_PTWY_DEVIATION_HEADER Table
                                If _blnFlag Then
                                    Try
                                        _statusCode = InsertDeviationHeaderDtls(_dsPtwyOrdDtls.Tables(0).Rows(0).Item("ORDER_NO"), _
                                                                                pDeviceTokenEntry(TokenEntry_Enum.UserID), _
                                                                                pDeviceTokenEntry(TokenEntry_Enum.DeviceID), _
                                                                                _dsDeptInfo.Tables(0).Rows(_cnt).Item("CART_ID"), _
                                                                                _strBusinessUnit, pTrans, _dtPtwyDate)
                                        If _statusCode <> ATPAR_OK Then
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert the details in putaway deviation header with _statusCode:" & _statusCode)
                                            Return _statusCode
                                        End If

                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert the details in putaway deviation header and " & _
                                                                                            " Exception is :" & ex.ToString & vbCrLf)
                                        Return E_SERVERERROR
                                    End Try

                                    'Inserting into MT_ATPAR_TRANSACTION
                                    Try

                                        _statusCode = GenerateNewTransaction(_drDeptInfo.Length, pDeviceTokenEntry, _lngTransID, pTrans, _
                                                                             _strBusinessUnit, _dsDeptInfo.Tables(0).Rows(_cnt).Item("CART_ID"), _strPOStartdate, _strPOEnddate)
                                        If _statusCode <> ATPAR_OK Then

                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to generate new transaction" & _
                                                                                                    " in transaction table : StatusCode is : " & _
                                                                                                    _statusCode & vbCrLf)
                                            Return E_SERVERERROR
                                        End If


                                    Catch ex As Exception

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to generate new transaction" & _
                                                                                                " in transaction table : Exception is : " & _
                                                                                                ex.ToString & vbCrLf)
                                        Return E_SERVERERROR
                                    End Try

                                End If
                               
                            Else
                                If log.IsDebugEnabled Then log.Debug(methodBaseName & " : No putaway order details exist for location : " & _dsDeptInfo.Tables(0).Rows(_cnt).Item("CART_ID"))
                            End If
                        Else
                            If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Location based item details not found : ")
                        End If

                    Next

                Else
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Auto putaway enabled POU locations not found : ")
                End If
            Else
                If log.IsDebugEnabled Then log.Debug(methodBaseName & " : No locations exist : ")
            End If

        Catch ex As Exception

            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _dtLocs = Nothing
            _dsDeptInfo = Nothing
            _dsPtwyOrdDtls = Nothing
            _sbSQL = Nothing
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To track the information of every transaction done in POU modules CycleCount, Issue, Returns , 
    ''' Putaway and Case cart module transactions
    ''' </summary>
    ''' <param name="pTransID"></param>
    ''' <param name="pEventType"></param>
    ''' <param name="pUniqueID"></param>
    ''' <param name="pstrBUnit"></param>
    ''' <param name="pstrCartID"></param>
    ''' <param name="pstrItemID"></param>
    ''' <param name="pstrCompartment"></param>
    ''' <param name="pstrLotID"></param>
    ''' <param name="pstrSerialID"></param>
    ''' <param name="pqty"></param>
    ''' <param name="pQOH"></param>
    ''' <param name="pEndDate"></param>
    ''' <param name="pTrans"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function SaveInventoryTrackHistory(ByVal pTransID As Integer,
                                              ByVal pEventType As Integer,
                                              ByVal pUniqueID As Integer,
                                              ByVal pstrBUnit As String,
                                              ByVal pstrCartID As String,
                                              ByVal pstrItemID As String,
                                              ByVal pstrCompartment As String,
                                              ByVal pstrLotID As String,
                                              ByVal pstrSerialID As String,
                                              ByVal pqty As Double,
                                              ByVal pQOH As Double,
                                              ByVal pEndDate As String,
                                              ByVal pTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim sbSQL As New StringBuilder
        Dim _Cmd As SqlCommand

        Try

            Dim sqlParms() As SqlParameter = New SqlParameter(16) {}

            sqlParms(0) = New SqlParameter("@BUnit", SqlDbType.NVarChar, 50)
            sqlParms(0).Value = pstrBUnit

            sqlParms(1) = New SqlParameter("@ParLoc", SqlDbType.NVarChar, 50)
            sqlParms(1).Value = pstrCartID

            sqlParms(2) = New SqlParameter("@ItemID", SqlDbType.NVarChar, 50)
            sqlParms(2).Value = pstrItemID

            sqlParms(3) = New SqlParameter("@LotID", SqlDbType.NVarChar, 50)
            sqlParms(3).Value = pstrLotID

            sqlParms(4) = New SqlParameter("@SerialID", SqlDbType.NVarChar, 50)
            sqlParms(4).Value = pstrSerialID

            sqlParms(5) = New SqlParameter("@Compartment", SqlDbType.NVarChar, 50)
            sqlParms(5).Value = pstrCompartment

            sqlParms(6) = New SqlParameter("@transId", SqlDbType.Int)
            sqlParms(6).Value = pTransID

            sqlParms(7) = New SqlParameter("@EventStatus", SqlDbType.Int)
            sqlParms(7).Value = pEventType

            sqlParms(8) = New SqlParameter("@ActualQty", SqlDbType.Float)
            sqlParms(8).Value = pqty

            sqlParms(9) = New SqlParameter("@OnHandQty", SqlDbType.Float)
            sqlParms(9).Value = pQOH

            sqlParms(10) = New SqlParameter("@UpdateDate", SqlDbType.DateTime)
            sqlParms(10).Value = pEndDate

            sqlParms(11) = New SqlParameter("@UniqueID", SqlDbType.Int)
            sqlParms(11).Value = pUniqueID

            sqlParms(12) = New SqlParameter("@AdjustType", SqlDbType.Int)
            sqlParms(12).Value = 0

            sqlParms(13) = New SqlParameter("@ChargeCaptureTransID", SqlDbType.Int)
            sqlParms(13).Value = 0

            sqlParms(14) = New SqlParameter("@ReserveQtyOption", SqlDbType.NVarChar, 15)
            sqlParms(14).Value = ""

            sqlParms(15) = New SqlParameter("@StatusCode", SqlDbType.Int)
            sqlParms(15).Direction = ParameterDirection.Output



            _Cmd = New SqlCommand
            _Cmd.Connection = m_LocalDB.CreateConnection
            _Cmd.CommandTimeout = 0
            _Cmd.CommandType = CommandType.StoredProcedure
            _Cmd.CommandText = "SaveInventoryTrackHistory"
            _Cmd.Parameters.Add(sqlParms(0))
            _Cmd.Parameters.Add(sqlParms(1))
            _Cmd.Parameters.Add(sqlParms(2))
            _Cmd.Parameters.Add(sqlParms(3))
            _Cmd.Parameters.Add(sqlParms(4))
            _Cmd.Parameters.Add(sqlParms(5))
            _Cmd.Parameters.Add(sqlParms(6))
            _Cmd.Parameters.Add(sqlParms(7))
            _Cmd.Parameters.Add(sqlParms(8))
            _Cmd.Parameters.Add(sqlParms(9))
            _Cmd.Parameters.Add(sqlParms(10))
            _Cmd.Parameters.Add(sqlParms(11))
            _Cmd.Parameters.Add(sqlParms(12))
            _Cmd.Parameters.Add(sqlParms(13))
            _Cmd.Parameters.Add(sqlParms(14))
            _Cmd.Parameters.Add(sqlParms(15))
            With sbSQL
                .Remove(0, .Length)
                .Append("exec SaveInventoryTrackHistory")
                .Append("'" & sqlParms(0).Value.ToString & "', ")
                .Append("'" & sqlParms(1).Value.ToString & "', ")
                .Append("'" & sqlParms(2).Value.ToString & "', ")
                .Append("'" & sqlParms(3).Value.ToString & "', ")
                .Append("'" & sqlParms(4).Value.ToString & "', ")
                .Append("'" & sqlParms(5).Value.ToString & "', ")
                .Append("'" & sqlParms(6).Value.ToString & "', ")
                .Append("'" & sqlParms(7).Value.ToString & "', ")
                .Append("'" & sqlParms(8).Value.ToString & "', ")
                .Append("'" & sqlParms(9).Value.ToString & "', ")
                .Append("'" & sqlParms(10).Value.ToString & "' ")
                .Append("'" & sqlParms(11).Value.ToString & "', ")
                .Append("" & sqlParms(12).Value.ToString & ", ")
                .Append("" & sqlParms(13).Value.ToString & " , ")
                .Append("'" & sqlParms(14).Value.ToString & "' ")
            End With


            If log.IsInfoEnabled Then log.Info(methodBaseName & " : Inserting the Inventory track History with the " & _
                      " following SQL... " & vbCrLf & sbSQL.ToString & vbCrLf)

            Try
                m_LocalDB.ExecuteNonQuery(_Cmd, pTrans)
            Catch sqlex As SqlException

                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the following :" & _
                                            " Exception is : " & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception

                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the following :" & _
                                        " Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            Finally
                sbSQL.Remove(0, sbSQL.Length)
            End Try


        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL...." & _
                                                                  sbSQL.ToString & vbCrLf & _
                                                                  " Exception is : " & ex.ToString & _
                                                                  vbCrLf)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' To get department level information
    ''' </summary>
    ''' <param name="pLocations"></param>
    ''' <param name="pBUnit"></param>
    ''' <param name="pOrgGroupId"></param>
    ''' <param name="pDsDeptInfo"></param>
    ''' <param name="pTrans"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetDeptLevelInfo(ByVal pLocations As String, ByVal pBUnit As String, ByVal pOrgGroupId As String,
                                      ByRef pDsDeptInfo As DataSet, ByRef pTrans As SqlTransaction, ByVal pVendorId As String, ByVal pOrderDt As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _Cmd As SqlCommand

        Dim sqlParms() As SqlParameter
        Try
            sqlParms = New SqlParameter(5) {}

            sqlParms(0) = New SqlParameter("@LOCATION", SqlDbType.NVarChar)
            sqlParms(0).Value = pLocations

            sqlParms(1) = New SqlParameter("@BUSINESS_UNIT", SqlDbType.NVarChar)
            sqlParms(1).Value = pBUnit

            sqlParms(2) = New SqlParameter("@ORG_GROUP_ID", SqlDbType.NVarChar)
            sqlParms(2).Value = pOrgGroupId

            sqlParms(3) = New SqlParameter("@VENDOR_ID", SqlDbType.NVarChar)
            sqlParms(3).Value = pVendorId

            sqlParms(4) = New SqlParameter("@ORDER_DATE", SqlDbType.NVarChar)
            sqlParms(4).Value = pOrderDt

            If log.IsInfoEnabled Then
                Dim _strSQL As String = " Calling GetDepartmentInfo with the following syntax..  exec GetDepartmentInfo " &
                                        "'" & sqlParms(0).Value & "'," &
                                        "'" & sqlParms(1).Value & "'," &
                                        "'" & sqlParms(2).Value & "'," &
                                        "'" & sqlParms(3).Value & "'," &
                                        "'" & sqlParms(4).Value & "'"
                log.Info(methodBaseName & _strSQL)
            End If


            _Cmd = New SqlCommand

            _Cmd.Connection = m_LocalDB.CreateConnection
            _Cmd.CommandType = CommandType.StoredProcedure
            _Cmd.CommandText = "GetDepartmentInfo"
            _Cmd.Parameters.Add(sqlParms(0))
            _Cmd.Parameters.Add(sqlParms(1))
            _Cmd.Parameters.Add(sqlParms(2))
            _Cmd.Parameters.Add(sqlParms(3))
            _Cmd.Parameters.Add(sqlParms(4))

            pDsDeptInfo = m_LocalDB.ExecuteDataSet(_Cmd, pTrans)

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the department level info " & vbCrLf & GetSQLExceptionMessageString(sqlex))
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the department level info and exception is : " & vbCrLf & ex.ToString)
            Return E_SERVERERROR
        Finally
            _Cmd.Dispose()
        End Try
        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' To get putaway order details
    ''' </summary>
    ''' <param name="pBUnit"></param>
    ''' <param name="pLocation"></param>
    ''' <param name="pVendorId"></param>
    ''' <param name="pOrderDt"></param>
    ''' <param name="pDsPtwyOrdDtls"></param>
    ''' <param name="pTrans"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetPtwyOrderDtls(ByVal pBUnit As String, ByVal pLocation As String, ByVal pVendorId As String, _
                                      ByVal pOrderDt As String, ByRef pDsPtwyOrdDtls As DataSet, ByRef pTrans As SqlTransaction) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _Cmd As SqlCommand

        Dim sqlOrdrParms() As SqlParameter
        Try
            sqlOrdrParms = New SqlParameter(4) {}


            sqlOrdrParms(0) = New SqlParameter("@BUSINESS_UNIT", SqlDbType.NVarChar)
            sqlOrdrParms(0).Value = pBUnit

            sqlOrdrParms(1) = New SqlParameter("@LOCATION", SqlDbType.NVarChar)
            sqlOrdrParms(1).Value = pLocation

            sqlOrdrParms(2) = New SqlParameter("@VENDOR_ID", SqlDbType.NVarChar)
            sqlOrdrParms(2).Value = pVendorId

            sqlOrdrParms(3) = New SqlParameter("@ORDER_DATE", SqlDbType.NVarChar)
            sqlOrdrParms(3).Value = pOrderDt

            If log.IsInfoEnabled Then
                Dim _strSQL As String = " Calling GetPtwyOrderDtls with the following syntax.. exec GetPtwyOrderDtls " & _
                                            "'" & sqlOrdrParms(0).Value & "'," & _
                                        "'" & sqlOrdrParms(1).Value & "'," & _
                                            "'" & sqlOrdrParms(2).Value & "'," & _
                                        "'" & sqlOrdrParms(3).Value & "'"
                log.Info(methodBaseName & _strSQL)
            End If


            _Cmd = New SqlCommand

            _Cmd.Connection = m_LocalDB.CreateConnection
            _Cmd.CommandType = CommandType.StoredProcedure
            _Cmd.CommandText = "GetPtwyOrderDtls"
            _Cmd.Parameters.Add(sqlOrdrParms(0))
            _Cmd.Parameters.Add(sqlOrdrParms(1))
            _Cmd.Parameters.Add(sqlOrdrParms(2))
            _Cmd.Parameters.Add(sqlOrdrParms(3))

            pDsPtwyOrdDtls = m_LocalDB.ExecuteDataSet(_Cmd, pTrans)

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the putaway order details " & vbCrLf & GetSQLExceptionMessageString(sqlex))
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            Return E_SERVERERROR
        Finally
            _Cmd.Dispose()
        End Try
        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' To insert deviation header details
    ''' </summary>
    ''' <param name="pOrdNo"></param>
    ''' <param name="pUserId"></param>
    ''' <param name="pDeviceId"></param>
    ''' <param name="pLocation"></param>
    ''' <param name="pBUnit"></param>
    ''' <param name="pTrans"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function InsertDeviationHeaderDtls(ByVal pOrdNo As Integer, ByVal pUserId As String, ByVal pDeviceId As String, ByVal pLocation As String, _
                                               ByVal pBUnit As String, ByRef pTrans As SqlTransaction, ByVal pPtwyDt As DateTime) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Try
            With _sbSQL
                .Append("INSERT INTO MT_POU_PTWY_DEVIATION_HEADER(")
                .Append("ORDER_ID,PTWY_DATE_TIME, USER_ID, WORKSTATION_ID,CART_ID, BUSINESS_UNIT) VALUES(")
                .Append("" & pOrdNo & ",")
                .Append("'" & pPtwyDt & "', ")
                .Append("'" & pUserId & "',")
                .Append("'" & pDeviceId & "',")
                .Append("'" & pLocation & "',")
                .Append("'" & pBUnit & "')")
            End With

            If log.IsInfoEnabled Then log.Info(methodBaseName & " Inserting the putaway deviation" & _
                                                                    " header with the following SQL... " _
                                                                & _sbSQL.ToString & vbCrLf)


            m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pTrans)
        Catch sqlEx As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                & _sbSQL.ToString & vbCrLf & _
                                                                " Exception is : " & _
                                                                sqlEx.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBINSERTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                & _sbSQL.ToString & vbCrLf & _
                                                                " Exception is : " & _
                                                                ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbSQL.Remove(0, _sbSQL.Length)
        End Try
        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' To insert deviation details
    ''' </summary>
    ''' <param name="pOrdNo"></param>
    ''' <param name="pItemId"></param>
    ''' <param name="pStorageLoc"></param>
    ''' <param name="pQtyOrdered"></param>
    ''' <param name="pQtyReceived"></param>
    ''' <param name="pTrans"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function InsertDeviationDtls(ByVal pOrdNo As Integer, ByVal pItemId As String, ByVal pStorageLoc As String, ByVal pQtyOrdered As Double, _
                                         ByVal pQtyReceived As Double, ByRef pTrans As SqlTransaction, ByVal pPtwyDt As DateTime) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Try
            With _sbSQL
                .Append("INSERT INTO MT_POU_PTWY_DEVIATION_DETAILS(ORDER_ID,")
                .Append("PTWY_DATE_TIME, ITEM_ID, COMPARTMENT, QUANTITY_ORDERED, QUANTITY_RECEIVED) VALUES(")
                .Append("" & pOrdNo & ", ")
                .Append("'" & pPtwyDt & "', ")
                .Append("'" & pItemId & "', ")
                .Append("'" & substituteString(pStorageLoc) & "', ")
                .Append("" & pQtyOrdered & ", ")
                .Append("" & pQtyReceived & ")")
            End With

            If log.IsInfoEnabled Then log.Info(methodBaseName & " Inserting the putaway deviation" & _
                                                                    " details with the following SQL.... " _
                                                                & _sbSQL.ToString & vbCrLf)

            m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pTrans)
        Catch sqlEx As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                & _sbSQL.ToString & vbCrLf & _
                                                                " Exception is : " & _
                                                                sqlEx.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBINSERTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                & _sbSQL.ToString & vbCrLf & _
                                                                " Exception is : " & _
                                                                ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbSQL.Remove(0, _sbSQL.Length)
        End Try

        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' To update par management order details
    ''' </summary>
    ''' <param name="pQtyReceived"></param>
    ''' <param name="pOrderStatus"></param>
    ''' <param name="pOrdNo"></param>
    ''' <param name="pLineNo"></param>
    ''' <param name="pItemId"></param>
    ''' <param name="pTrans"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function UpdateParMngtOrderDtls(ByVal pQtyReceived As Double, ByVal pOrderStatus As Integer, ByVal pOrdNo As Integer, _
                                             ByVal pLineNo As String, ByVal pItemId As String, ByRef pTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Try
            With _sbSQL
                .Append("UPDATE PAR_MNGT_ORDER_DETAILS ")
                .Append("SET QTY_RCVD = QTY_RCVD + ")
                .Append(pQtyReceived)
                .Append(",")
                .Append("ORDER_STATUS = " & pOrderStatus & " WHERE ")
                .Append("ORDER_NO = " & pOrdNo & " AND ")
                .Append("LINE_NO = '" & pLineNo & "' AND ")
                .Append("ITEM_ID = '" & pItemId & "' ")
            End With


            If log.IsInfoEnabled Then log.Info(methodBaseName & " Updating the order details with the" & _
                                                                    " following SQL... " & _sbSQL.ToString & _
                                                                    vbCrLf)


            m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pTrans)
        Catch sqlEx As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                & _sbSQL.ToString & vbCrLf & _
                                                                " Exception is : " & _
                                                                sqlEx.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBUPDATEFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                & _sbSQL.ToString & vbCrLf & _
                                                                " Exception is : " & _
                                                                ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbSQL.Remove(0, _sbSQL.Length)
        End Try

        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' To insert or update cart inventory
    ''' </summary>
    ''' <param name="pDrPtwyOrdDtls"></param>
    ''' <param name="pBUnit"></param>
    ''' <param name="pQtyRound"></param>
    ''' <param name="pTransId"></param>
    ''' <param name="pLocation"></param>
    ''' <param name="pItmId"></param>
    ''' <param name="pTrans"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function InsertUpdateCartInventory(ByVal pDrPtwyOrdDtls() As DataRow, ByVal pBUnit As String,
                                               ByVal pQtyRound As String, ByVal pTransId As Long,
                                               ByVal pLocation As String, ByVal pItmId As String,
                                               ByVal pBinLoc As String,
                                               ByRef pTrans As SqlTransaction) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _dsCartInventory As New DataSet
        Dim _sbSQL As New StringBuilder
        Dim _dblPutAwayqty As Double
        Dim _statusCode As Long = -1
        Dim _strPrevItemId As String = String.Empty
        Dim _drtemsInfo() As DataRow
        Dim _dtItemsInfo As New DataTable
        Dim _strComp As String = String.Empty
        Dim DblConverFact As Double = 0
        Dim pLocType As String = ""
        _dtItemsInfo = pDrPtwyOrdDtls.CopyToDataTable
        Try

            For Each _drDtls In pDrPtwyOrdDtls
                Dim _dblConvFactor As Double
                'Update MT_POU_CART_INVENTORY table
                _sbSQL.Remove(0, _sbSQL.Length)
                With _sbSQL
                    .Append("SELECT BUSINESS_UNIT, CART_ID, ITEM_ID, ID, ACTUAL_QUANTITY, ")
                    .Append("COMPARTMENT, LOT_NUMBER, SERIAL_NUMBER, LOWEST_QOH FROM MT_POU_CART_INVENTORY ")
                    .Append("WHERE ")
                    .Append("BUSINESS_UNIT = '" & pBUnit & "' ")
                    .Append("AND CART_ID = '" & pLocation & "' ")
                    .Append("AND ITEM_ID = '" & _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "ITEM_ID")).ToString() & "' ")
                    .Append("AND LOT_NUMBER ='" & _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "LOT_ID")).ToString() & "' ")
                    .Append("AND SERIAL_NUMBER ='" & _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "SERIAL_ID")).ToString() & "' ")
                    .Append("AND COMPARTMENT ='" & pBinLoc & "' ")
                    '.Append("ORDER BY COMPARTMENT DESC ")
                End With

                If log.IsInfoEnabled Then log.Info(methodBaseName & " Check if item exists in the inventory" &
                                                                        " with the following SQL... " &
                                                                        _sbSQL.ToString & vbCrLf)
                Try
                    _dsCartInventory = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pTrans)
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                        & _sbSQL.ToString & vbCrLf &
                                                                        " Exception is : " &
                                                                        sqlEx.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBSELECTFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                        & _sbSQL.ToString & vbCrLf &
                                                                        " Exception is : " &
                                                                        ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                Finally
                    _sbSQL.Remove(0, _sbSQL.Length)
                End Try

                Try
                    _statusCode = GetItemAttributesCnvFact(pLocation, pBUnit, _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "ITEM_ID")), DblConverFact, 0, 0)
                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get GetItemAttributesCnvFact : StatusCode is : " & _statusCode & vbCrLf)
                        Return _statusCode
                    End If
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with Excepion : " & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try


                If Not IsDBNull(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "CONVERSION_RATE")).ToString()) AndAlso
                        Not String.IsNullOrEmpty(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "CONVERSION_RATE")).ToString()) Then
                    _dblConvFactor = _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "CONVERSION_RATE")).ToString()
                Else
                    _dblConvFactor = 1
                End If

                'Handling Location Type 
                If String.IsNullOrEmpty(pLocType) Then
                    _statusCode = GetLocationType(pBUnit, _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "LOCATION")), pLocType)
                    If _statusCode <> ATPAR_OK Then
                        Return _statusCode
                    End If
                End If

                If pLocType = LocationType.A.ToString Then
                    DblConverFact = _dblConvFactor
                End If

                If _dsCartInventory.Tables(0).Rows.Count > 0 Then


                    If Not IsDBNull(_dsCartInventory.Tables(0).Rows(0).Item("COMPARTMENT")) Then
                        _strComp = _dsCartInventory.Tables(0).Rows(0).Item("COMPARTMENT")
                    Else
                        _strComp = String.Empty
                    End If
                    _sbSQL.Remove(0, _sbSQL.Length)
                    With _sbSQL
                        .Append(" UPDATE MT_POU_CART_INVENTORY ")
                        .Append(" SET ITEM_QUANTITY_ON_HAND = ITEM_QUANTITY_ON_HAND + ")

                        If _dblConvFactor > 1 Then
                            If pQtyRound = "Ceil" Then
                                .Append(Math.Ceiling(CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())))
                            ElseIf pQtyRound = "Floor" Then
                                .Append(Math.Floor(CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())))
                            End If
                        Else
                            .Append(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())
                        End If


                        .Append(", ACTUAL_QUANTITY = ACTUAL_QUANTITY + ")
                        If _dblConvFactor > 1 Then
                            If pQtyRound = "Ceil" Then
                                .Append(Math.Ceiling(CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())))
                            ElseIf pQtyRound = "Floor" Then
                                .Append(Math.Floor(CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())))
                            End If
                        Else
                            .Append(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())
                        End If

                        If Not String.IsNullOrEmpty(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "EXPIRY_DATE")).ToString()) Then
                            .Append(", EXPIRY_DATE = '")
                            .Append(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "EXPIRY_DATE")).ToString())
                            .Append("' ")
                        End If

                        .Append(", LOWEST_QOH = LOWEST_QOH + " & (DblConverFact * CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())))
                        .Append(" WHERE ")
                        .Append("BUSINESS_UNIT = '" & pBUnit & "' ")
                        .Append("AND CART_ID = '" & pLocation & "' ")
                        .Append("AND ITEM_ID = '" & _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "ITEM_ID")).ToString() & "' ")
                        .Append("AND LOT_NUMBER ='" & _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "LOT_ID")).ToString() & "' ")
                        .Append("AND SERIAL_NUMBER ='" & _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "SERIAL_ID")).ToString() & "' ")
                        .Append("AND COMPARTMENT ='" & _strComp & "' ")

                    End With

                    If log.IsInfoEnabled Then log.Info(methodBaseName & " Updating the item in the inventory" &
                                                                            " with the following SQL... " &
                                                                            _sbSQL.ToString & vbCrLf)
                    Try
                        m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pTrans)
                    Catch sqlEx As SqlException

                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                            & _sbSQL.ToString & vbCrLf &
                                                                            " Exception is : " &
                                                                            sqlEx.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBUPDATEFAIL
                    Catch ex As Exception

                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                            & _sbSQL.ToString & vbCrLf &
                                                                            " Exception is : " &
                                                                            ex.ToString & vbCrLf)
                        Return E_SERVERERROR
                    Finally
                        _sbSQL.Remove(0, _sbSQL.Length)
                    End Try

                    'To insert data in inventory track table
                    If _strPrevItemId <> _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "ITEM_ID")).ToString() Then

                        _drtemsInfo = _dtItemsInfo.Select("[" & _dtItemsInfo.Columns(Enum_AutoPutAway_Details.ITEM_ID).ColumnName & "] =  '" & _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "ITEM_ID")).ToString() & "'")
                        If _drtemsInfo.Length > 0 Then
                            For _cnt As Integer = 0 To _drtemsInfo.Length - 1
                                If _dblConvFactor > 1 Then
                                    If pQtyRound = "Ceil" Then
                                        _dblPutAwayqty = _dblPutAwayqty + Math.Ceiling(_drtemsInfo(_cnt).Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString() * _dblConvFactor)
                                    ElseIf pQtyRound = "Floor" Then
                                        _dblPutAwayqty = _dblPutAwayqty + Math.Floor(_drtemsInfo(_cnt).Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString() * _dblConvFactor)
                                    End If
                                Else
                                    _dblPutAwayqty = _dblPutAwayqty + CType(_drtemsInfo(_cnt).Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString(), Double)
                                End If
                            Next
                            Try
                                'Calculating Latest QOH
                                Dim _dblPrevQOH As Double = 0
                                If Not IsDBNull(_dsCartInventory.Tables(0).Rows(0).Item("ACTUAL_QUANTITY")) Then
                                    _dblPrevQOH = CType(_dsCartInventory.Tables(0).Rows(0).Item("ACTUAL_QUANTITY"), Double)
                                End If
                                _dblPrevQOH = (_dblPutAwayqty + _dblPrevQOH)

                                _statusCode = SaveInventoryTrackHistory(pTransId, AppTransactionStatus.PutAway,
                                            _dsCartInventory.Tables(0).Rows(0).Item("ID"), _dsCartInventory.Tables(0).Rows(0).Item("BUSINESS_UNIT"),
                                            _dsCartInventory.Tables(0).Rows(0).Item("CART_ID"), _dsCartInventory.Tables(0).Rows(0).Item("ITEM_ID"),
                                            substituteString(_dsCartInventory.Tables(0).Rows(0).Item("COMPARTMENT")),
                                            _dsCartInventory.Tables(0).Rows(0).Item("LOT_NUMBER"),
                                            _dsCartInventory.Tables(0).Rows(0).Item("SERIAL_NUMBER"), _dblPutAwayqty, _dblPrevQOH, Now, pTrans)

                                If _statusCode <> ATPAR_OK Then
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert track history data with _statusCode:" & _statusCode)
                                    Return _statusCode
                                End If

                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert track history data and the Exception is : " &
                                                                                   " Exception is :" & ex.ToString & vbCrLf)
                                Return E_SERVERERROR
                            End Try
                        End If
                    End If
                Else
                    _sbSQL.Remove(0, _sbSQL.Length)
                    With _sbSQL
                        .Append("INSERT INTO MT_POU_CART_INVENTORY(")
                        .Append("BUSINESS_UNIT, CART_ID, ITEM_ID, LOT_NUMBER, SERIAL_NUMBER, COMPARTMENT, ITEM_QUANTITY_PAR, ITEM_QUANTITY_ON_HAND, ACTUAL_QUANTITY, LOWEST_QOH ")

                        If Not String.IsNullOrEmpty(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "EXPIRY_DATE")).ToString()) Then
                            .Append(", EXPIRY_DATE")
                        End If

                        .Append(") VALUES ('")
                        .Append(pBUnit)
                        .Append("','")
                        .Append(pLocation)
                        .Append("','")
                        .Append(pItmId)
                        .Append("','")
                        .Append(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "LOT_ID")).ToString())
                        .Append("','")
                        .Append(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "SERIAL_ID")).ToString())
                        .Append("','")
                        .Append(substituteString(pBinLoc))
                        .Append("',")
                        .Append(0)
                        .Append(",")


                        If _dblConvFactor > 1 Then
                            If pQtyRound = "Ceil" Then
                                .Append(Math.Ceiling(CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())))
                            ElseIf pQtyRound = "Floor" Then
                                .Append(Math.Floor(CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())))
                            End If
                        Else
                            .Append(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())
                        End If


                        .Append(",")


                        If _dblConvFactor > 1 Then
                            If pQtyRound = "Ceil" Then
                                .Append(Math.Ceiling(CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())))
                            ElseIf pQtyRound = "Floor" Then
                                .Append(Math.Floor(CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())))
                            End If
                        Else
                            .Append(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString())
                        End If

                        .Append(" ," & DblConverFact * CDbl(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY"))) & "")

                        If Not String.IsNullOrEmpty(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "EXPIRY_DATE")).ToString()) Then
                            .Append(", '")
                            .Append(_drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "EXPIRY_DATE")).ToString())
                            .Append("'")
                        End If

                        .Append(")")
                    End With

                    If log.IsInfoEnabled Then log.Info(methodBaseName & " Inserting the item into the" &
                                                                          " inventory with the following SQL.... " _
                                                                        & _sbSQL.ToString & vbCrLf)
                    Try
                        m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pTrans)
                    Catch sqlEx As SqlException

                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                            & _sbSQL.ToString & vbCrLf &
                                                                            " Exception is : " &
                                                                            sqlEx.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBINSERTFAIL
                    Catch ex As Exception

                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                            & _sbSQL.ToString & vbCrLf &
                                                                            " Exception is : " &
                                                                            ex.ToString & vbCrLf)
                        Return E_SERVERERROR
                    Finally
                        _sbSQL.Remove(0, _sbSQL.Length)
                    End Try

                    'To insert data in inventory track table
                    If _strPrevItemId <> _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "ITEM_ID")).ToString() Then
                        _drtemsInfo = _dtItemsInfo.Select("[" & _dtItemsInfo.Columns(Enum_AutoPutAway_Details.ITEM_ID).ColumnName & "] =  '" & _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "ITEM_ID")).ToString() & "'")
                        If _drtemsInfo.Length > 0 Then
                            For _cnt As Integer = 0 To _drtemsInfo.Length - 1
                                If _dblConvFactor > 1 Then
                                    If pQtyRound = "Ceil" Then
                                        _dblPutAwayqty = _dblPutAwayqty + Math.Ceiling(_drtemsInfo(_cnt).Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString() * _dblConvFactor)
                                    ElseIf pQtyRound = "Floor" Then
                                        _dblPutAwayqty = _dblPutAwayqty + Math.Floor(_drtemsInfo(_cnt).Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString() * _dblConvFactor)
                                    End If
                                Else
                                    _dblPutAwayqty = _dblPutAwayqty + CType(_drtemsInfo(_cnt).Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "QTY")).ToString(), Double)
                                End If
                            Next
                            Try
                                _statusCode = SaveInventoryTrackHistory(pTransId, AppTransactionStatus.PutAway,
                                                            0, pBUnit, pLocation, pItmId,
                                                             substituteString(pBinLoc),
                                                            _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "LOT_ID")).ToString(),
                                                             _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "SERIAL_ID")).ToString(), _dblPutAwayqty, _dblPutAwayqty, Now, pTrans)

                                If _statusCode <> ATPAR_OK Then
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert track history data with _statusCode:" & _statusCode)
                                    Return _statusCode
                                End If

                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert track history data and the Exception is : " &
                                                                                   " Exception is :" & ex.ToString & vbCrLf)
                                Return E_SERVERERROR
                            End Try
                        End If
                    End If

                End If
                _strPrevItemId = _drDtls.Item([Enum].Parse(GetType(Enum_AutoPutAway_Details), "ITEM_ID")).ToString()
            Next
        Catch ex As Exception
            Return E_SERVERERROR
        End Try
        Return ATPAR_OK
    End Function

    Private Function GenerateNewTransaction(ByVal pItemsCnt As Integer, _
                                            ByVal pDeviceTokenEntry() As String, _
                                            ByVal pTransID As Long, ByRef pTrans As SqlTransaction, ByVal pBunit As String, _
                                            ByVal pCartId As String, ByVal pStartDt As String, ByVal pEndDt As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)


        Try

            Dim _atparTransaction As AtPar_Application_Transactions
            Dim pTransactionDetails As AtPar_Transaction_Entity
            Dim _statusCode As Long = -1

            _atparTransaction = AtPar_Application_Transactions.CreateInstance(pDeviceTokenEntry(TokenEntry_Enum.SystemId))

            pTransactionDetails.TransactionId = pTransID
            pTransactionDetails.ApplicationId = EnumApps.PointOfUse
            pTransactionDetails.Status = AppTransactionStatus.PutAway
            pTransactionDetails.StartDateTime = pStartDt
            pTransactionDetails.ID = pCartId
            pTransactionDetails.BusinessUnit = pBunit
            pTransactionDetails.TotalRecordSent = pItemsCnt
            pTransactionDetails.EndDateTime = pEndDt
            pTransactionDetails.UpdateDateTime = Now
            pTransactionDetails.UserId = pDeviceTokenEntry(TokenEntry_Enum.UserID)
            pTransactionDetails.DownloadUserId = pDeviceTokenEntry(TokenEntry_Enum.UserID)
            pTransactionDetails.DeviceId = pDeviceTokenEntry(TokenEntry_Enum.DeviceID)
            pTransactionDetails.ScansCount = 0
            pTransactionDetails.ReportData1 = pTransID

            _statusCode = _atparTransaction.InsertTransaction(pTransactionDetails, pTrans)

            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert transaction :" & _
                                                                      " : Status Code is : " & _statusCode & _
                                                                      vbCrLf)
                Return _statusCode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert transaction :" & _
                                                                  " Exception is : " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK

    End Function
#End Region

    Public Function SaveNotesDetails(ByVal pdtNotesData As DataTable, ByRef _trans As SqlTransaction, ByVal pDeviceTokenEntry() As String) As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As New StringBuilder
        Dim _statusCode As Long

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            For index = 0 To pdtNotesData.Rows.Count - 1
                _strSQL.Append("INSERT INTO MT_ATPAR_NOTES (KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, KEY_6,")
                _strSQL.Append("KEY_7, KEY_8, KEY_9, KEY_10, KEY_11, KEY_12, KEY_13, APP_ID, SCREEN_NAME, TRANS_ID,")
                _strSQL.Append("CODE, NOTES, DATE_TIME) VALUES (")
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_1)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_1) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_2)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_2) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_3)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_3) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_4)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_4) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_5)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_5) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_6)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_6) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_7)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_7) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_8)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_8) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_9)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_9) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_10)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_10) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_11)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_11) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_12)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_12) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_13)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.KEY_13) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.APP_ID)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.APP_ID) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.SCREEN_NAME)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.SCREEN_NAME) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.TRANS_ID)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.TRANS_ID) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.CODE)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.CODE) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.NOTES)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.NOTES) & "',")
                Else
                    _strSQL.Append("'',")
                End If
                If Not String.IsNullOrEmpty(pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.DATE_TIME)) Then
                    _strSQL.Append("'" & pdtNotesData.Rows(index).Item(Send_Notes_Input_DETAILS_Enum.DATE_TIME) & "'")
                Else
                    _strSQL.Append("''")
                End If
                _strSQL.Append(" )")

                Try
                    If log.IsInfoEnabled Then log.Info(_strSQL)
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL.ToString()), _trans)

                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert the notes data " & vbCrLf & _
                                                                " with the following SQL :" & _strSQL.ToString & vbCrLf & _
                                                                " Exception is:" & ex.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBINSERTFAIL
                Finally
                    _strSQL.Remove(0, _strSQL.Length)
                End Try

            Next
        Catch ex As Exception

            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To sync allocated locations to HHT
    ''' </summary>
    ''' <param name="pOutPutParams"></param>
    ''' <param name="pAppID">AppId</param>
    ''' <param name="Location">Location</param>
    ''' <param name="pLastSyncDate">Last Synchronisation Date</param>
    ''' <param name="pDeviceTokenEntry"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Do_GetAllocLocations(ByRef pOutPutParams As DataSet, ByVal pAppID As Integer, ByVal Location As String, ByVal pLastSyncDate As String,
                                         ByVal pDeviceTokenEntry() As String) As Long


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _dsLocations As New DataSet
        Dim _dsLocationsChanged As New DataSet
        Dim _dtLocations As New DataTable
        Dim _drLocations As DataRow
        Dim _statusCode As Long = -1
        Dim _className As String = String.Empty
        Dim _classType As Type
        Dim _methodName As MethodInfo
        Dim _reflectObject As Object
        Dim _erpObjAssy As Assembly
        Dim _erpObjName As String = String.Empty
        Dim pInputParams As DataSet

        Try
            'Emptying the Department in Device Token so that it will get all
            'allocated location for all the departments

            pDeviceTokenEntry(TokenEntry_Enum.DeptID) = String.Empty

            _erpObjName = "POU_BusinessRules"

            CreateERPObject(_erpObjName, _erpObjAssy)

            _className = _erpObjName & ".POU_DevTrans"
            _classType = _erpObjAssy.GetType(_className)
            _methodName = _classType.GetMethod("GetAllocatedLocations")
            _reflectObject = Activator.CreateInstance(_classType)
            Dim args As Object() = {pInputParams, _dsLocations, pAppID, "", pDeviceTokenEntry}

            _statusCode = _methodName.Invoke(_reflectObject, args)
            If _statusCode = E_NORECORDFOUND Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & ": No Records found :")
            ElseIf _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in the remote call :" & _
                                    " Statuscode is : " & _statusCode & vbCrLf)
                Return _statusCode
            End If
            _dsLocations = args(1)
            If _dsLocations.Tables.Count > 0 Then

                If _dsLocations.Tables(0).Rows.Count > 0 Then
                    If Location = Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString Then
                        _dsLocations.Tables(0).TableName = Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString
                    ElseIf Location = Enum_DEPENDENCIES.RX_LOC_DATA.ToString Then
                        _dsLocations.Tables(0).TableName = Enum_DEPENDENCIES.RX_LOC_DATA.ToString
                    End If
                    _dsLocations.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                    _dsLocations.Tables(0).Rows(0).Item("STATUS_CODE") = S_DATAEXISTS_INTABLE
                    If Location = Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString Then
                        pOutPutParams.Tables.Add(_dsLocations.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Copy)
                    ElseIf Location = Enum_DEPENDENCIES.RX_LOC_DATA.ToString Then
                        pOutPutParams.Tables.Add(_dsLocations.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Copy)
                    End If

                Else
                    If Location = Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString Then
                        _dtLocations.TableName = Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString
                    ElseIf Location = Enum_DEPENDENCIES.RX_LOC_DATA.ToString Then
                        _dtLocations.TableName = Enum_DEPENDENCIES.RX_LOC_DATA.ToString
                    End If
                    _dtLocations.Columns.Add(Status, Type.GetType("System.String"))

                    _drLocations = _dtLocations.NewRow
                    _drLocations.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE
                    _dtLocations.Rows.Add(_drLocations)

                    _dsLocations.Tables.Add(_dtLocations)
                    If Location = Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString Then
                        pOutPutParams.Tables.Add(_dsLocations.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Copy)
                    ElseIf Location = Enum_DEPENDENCIES.RX_LOC_DATA.ToString Then
                        pOutPutParams.Tables.Add(_dsLocations.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Copy)
                    End If

                End If

            Else


                If Location = Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString Then
                    _dtLocations.TableName = Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString
                ElseIf Location = Enum_DEPENDENCIES.RX_LOC_DATA.ToString Then
                    _dtLocations.TableName = Enum_DEPENDENCIES.RX_LOC_DATA.ToString
                End If
                _dtLocations.Columns.Add(Status, Type.GetType("System.String"))

                _drLocations = _dtLocations.NewRow
                _drLocations.Item("STATUS_CODE") = S_NO_DATAEXISTS_INTABLE
                _dtLocations.Rows.Add(_drLocations)

                _dsLocations.Tables.Add(_dtLocations)
                If Location = Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString Then
                    pOutPutParams.Tables.Add(_dsLocations.Tables(Enum_DEPENDENCIES.POU_LOCATIONDATA.ToString).Copy)
                ElseIf Location = Enum_DEPENDENCIES.RX_LOC_DATA.ToString Then
                    pOutPutParams.Tables.Add(_dsLocations.Tables(Enum_DEPENDENCIES.RX_LOC_DATA.ToString).Copy)
                End If


            End If



        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR

        Finally
            _className = Nothing
            _classType = Nothing
            _methodName = Nothing
            _reflectObject = Nothing
            _erpObjAssy = Nothing
            _erpObjName = Nothing
            _dsLocations = Nothing
            _dsLocationsChanged = Nothing
        End Try

        Return ATPAR_OK

    End Function
    ''' <summary>
    ''' To get Inventory Business Units For Bin To Bin Product
    ''' </summary>
    ''' <param name="pLastSyncDate">Last Synchronisation Date</param>
    ''' <param name="pUId">User ID</param>
    ''' <param name="pProfileID">Profile ID</param>
    ''' <param name="pOutPutParams">Inventory Business Units as Dataset</param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    Private Function Do_GetInvBUnitsForBintoBin(ByVal pLastSyncDate As String, _
                                     ByVal pUId As String, _
                                     ByVal pProfileID As String, _
                                     ByRef pOutPutParams As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sbInvBunitsSQL As New StringBuilder
        Dim _sbLastSyncDateSQL As New StringBuilder
        Dim _dsAllocBunits As DataSet
        Dim _dsAllocBunitsDataChanged As DataSet
        Dim _drBunit As DataRow
        Dim _dsApps As DataSet
        Dim _strAppAccess As String = String.Empty
        Dim _statusCode As Long = -1

        Try

            Try
                _statusCode = GetProfileAppAcl(pProfileID, _dsApps)
                If _statusCode <> ATPAR_OK Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to get the AppID details : ")
                    Return E_SERVERERROR
                End If
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to invoke GetProfileAppAcl function " & _
                                                                                     vbCrLf & ex.ToString)
                Return E_SERVERERROR
            End Try

            For intCnt As Integer = 0 To _dsApps.Tables(0).Rows.Count - 1


                If _dsApps.Tables(0).Rows(intCnt).Item("APP_ID") = EnumApps.BinToBin Then

                    If Not String.IsNullOrEmpty(_strAppAccess) Then
                        _strAppAccess = _strAppAccess & "," & EnumApps.BinToBin
                    Else
                        _strAppAccess = EnumApps.BinToBin
                    End If

                End If

            Next

            With _sbInvBunitsSQL

                .Append("SELECT BUSINESS_UNIT, APP_ID, CASE WHEN COUNT_FLAG IS NULL THEN '0' ELSE COUNT_FLAG END AS COUNT_FLAG ")
                .Append("FROM MT_ATPAR_IBU_ALLOCATION ")
                .Append("WHERE USER_ID='" & pUId & "' ")
                .Append("AND APP_ID IN (" & _strAppAccess & ") ")

            End With

            If Not String.IsNullOrEmpty(pLastSyncDate) Then

                With _sbLastSyncDateSQL
                    .Append("AND UPDATE_DATE > CONVERT(DATETIME, '" & pLastSyncDate & "', 101)")
                End With

            End If
            _strSQL = _sbInvBunitsSQL.ToString

            If log.IsInfoEnabled Then log.Info(methodBaseName _
                                   & "Getting Inventory Busines Units with the following SQL......" _
                                   & vbCrLf & _strSQL & vbCrLf)

            Try
                _dsAllocBunits = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                _dsAllocBunits.Tables(0).TableName = Enum_DEPENDENCIES.INV_BU_BIN.ToString
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the inventory bunits " & vbCrLf & _
                                                                      " with the following SQL :" & _strSQL & vbCrLf & _
                                                                      " Exception is:" & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If _dsAllocBunits.Tables(0).Rows.Count > 0 Then

                If Not String.IsNullOrEmpty(pLastSyncDate) Then
                    _strSQL = _sbInvBunitsSQL.ToString & _sbLastSyncDateSQL.ToString

                    If log.IsInfoEnabled Then log.Info(methodBaseName _
                                           & "Getting Inventory Busines Units with the following SQL......" _
                                           & vbCrLf & _strSQL & vbCrLf)
                    Try
                        _dsAllocBunitsDataChanged = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " failed to get the inventory bunits " & vbCrLf & _
                                                                              " with the following SQL :" & _strSQL & vbCrLf & _
                                                                              " Exception is:" & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    End Try

                    If _dsAllocBunitsDataChanged.Tables(0).Rows.Count > 0 Then
                        _dsAllocBunits.Tables(0).TableName = Enum_DEPENDENCIES.INV_BU_BIN.ToString
                        _dsAllocBunits.Tables(0).Columns.Add(Status, Type.GetType("System.String"))
                        _dsAllocBunits.Tables(0).Rows(0).BeginEdit()
                        _dsAllocBunits.Tables(0).Rows(0).Item(Status) = S_DATAEXISTS_INTABLE
                        _dsAllocBunits.Tables(0).Rows(0).EndEdit()
                        pOutPutParams.Tables.Add(_dsAllocBunits.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Copy)

                    Else
                        _dsAllocBunits = Nothing

                        _dsAllocBunits = New DataSet
                        Dim _dtAllocBunits As New DataTable
                        _dtAllocBunits.TableName = Enum_DEPENDENCIES.INV_BU_BIN.ToString
                        _dtAllocBunits.Columns.Add(Status, Type.GetType("System.String"))
                        _drBunit = _dtAllocBunits.NewRow
                        _drBunit.Item(Status) = S_NO_DATAEXISTS_INTABLE
                        _dtAllocBunits.Rows.Add(_drBunit)
                        _dsAllocBunits.Tables.Add(_dtAllocBunits)
                    End If
                Else

                    _dsAllocBunits.Tables(0).TableName = Enum_DEPENDENCIES.INV_BU_BIN.ToString
                    _dsAllocBunits.Tables(0).Columns.Add(Status, Type.GetType("System.String"))

                    _dsAllocBunits.Tables(0).Rows(0).BeginEdit()
                    _dsAllocBunits.Tables(0).Rows(0).Item(Status) = S_DATAEXISTS_INTABLE
                    _dsAllocBunits.Tables(0).Rows(0).EndEdit()
                    pOutPutParams.Tables.Add(_dsAllocBunits.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Copy)

                End If

            Else

                _dsAllocBunits = Nothing

                _dsAllocBunits = New DataSet
                Dim _dtAllocBunits As New DataTable
                _dtAllocBunits.TableName = Enum_DEPENDENCIES.INV_BU_BIN.ToString
                _dtAllocBunits.Columns.Add(Status, Type.GetType("System.String"))
                _drBunit = _dtAllocBunits.NewRow
                _drBunit.Item(Status) = S_NO_DATAEXISTS_INTABLE
                _dtAllocBunits.Rows.Add(_drBunit)

                _dsAllocBunits.Tables.Add(_dtAllocBunits)
                pOutPutParams.Tables.Add(_dsAllocBunits.Tables(Enum_DEPENDENCIES.INV_BU_BIN.ToString).Copy)
            End If


        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & ex.ToString)
            Return E_SERVERERROR
        Finally
            _dsAllocBunits = Nothing
            _sbInvBunitsSQL = Nothing
            _sbLastSyncDateSQL = Nothing
        End Try

        Return ATPAR_OK

    End Function
    Public Function GetPatientDetails(ByVal pOrgId As String, ByVal pPatientMrc As String, ByVal pPatientAccNumber As String, ByRef pBlnPatientExist As Boolean) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As New System.Text.StringBuilder
        Dim intRecCnt As Integer

        With _strSQL
            .Append("SELECT COUNT(*) FROM MT_ATPAR_PATIENT_CACHE ")
            .Append("WHERE ORG_ID = '" & pOrgId & "' ")
            .Append("AND PATIENT_MRC = '" & pPatientMrc & "' ")
            .Append("AND PATIENT_ACCNUMBER = '" & pPatientAccNumber & "'")
        End With

        Try
            If log.IsInfoEnabled Then log.Info(methodBaseName & " Checking if Patient is existed or not : " & _strSQL.ToString & vbCrLf)
            intRecCnt = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL.ToString))
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " intRecCnt : " & intRecCnt)
        Catch ex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                _strSQL.ToString & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
            Exit Function
        End Try

        If intRecCnt > 0 Then
            pBlnPatientExist = True
        Else
            pBlnPatientExist = False
        End If
        If log.IsDebugEnabled Then log.Debug(methodBaseName & " pBlnPatientExist  :" & pBlnPatientExist)
        Return ATPAR_OK

    End Function

#Region "Nice Label Printing"

    Public Const LABEL_PROMPT_SEP As String = "$"
    Public Const LABEL_PROMPT_MULTILINE As String = "MULTILINE" & LABEL_PROMPT_SEP
    Public Const LABEL_PROMPT_BARCODE As String = "BARCODE"
    Public Const LABEL_PROMPT_IGNORE As String = "IGNORE"

    Public Function PrintNiceLabel(ByVal pPrinterAddressOrName As String, ByVal pPrinterPort As String, _
                                          ByVal pPrinterTye As String, ByVal pNiceLabelName As String, _
                                          ByVal pNoOfPrints As String, ByRef pErrMsg As String, _
                                          ByRef pDsPrintDetails As DataSet, ByVal pDeviceTokenEntry() As String) As Long _
                                          Implements IAtPar_DevTrans.PrintNiceLabel

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)



        Try
            Dim _StatusCode As Long
            Dim _processLabelVariablesStatusCode As Long = -1

            If pDsPrintDetails.Tables(0).Rows.Count > 0 Then



                _strLblFileName = AppDomain.CurrentDomain.BaseDirectory().Chars(0) & _
                                         ":\Atpar\Labels\" & pNiceLabelName & LabelFileNameSuffix

                If log.IsDebugEnabled Then log.Debug(methodBaseName & "Print Label File Name : " & _strLblFileName)

                'Create and initialize Pocket Nice Engine
                Try
                    ' don't try to reinitialize if the engine has already been created
                    If PNE Is Nothing Then
                        PNE = PocketNiceEngine.EngineClassFactory.CreateEngine
                        PNE.Init()
                    End If
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to Create NiceLabel engine, are the DLL's in the program directory : " & vbCrLf & ex.ToString)
                    Cleanup()
                    PrintNiceLabel = E_PRINTER_OBJ_CREATEFAIL
                    Exit Function
                End Try

                Try

                    If PNE.IsDemo Then
                        PNE.Registration("VA59334KVAVDYL798LK5LA76Y", "Srinivas Repala", "AtPar Inc")
                    End If
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to register NiceLabels, registration code okay?: " & vbCrLf & ex.ToString)
                    Cleanup()
                    PrintNiceLabel = E_PRINTER_OBJ_REGISTERFAIL
                    Exit Function
                End Try
                Try
                    pneLabel = PNE.OpenLabel(_strLblFileName)
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to open label, are BOTH the label files in the atpar\labels folder?: " & vbCrLf & ex.ToString)
                    Cleanup()
                    PrintNiceLabel = E_PRINTER_LABELOPENFAIL
                    Exit Function
                End Try

                For I As Integer = 0 To pDsPrintDetails.Tables(0).Rows.Count - 1
                    Try

                        _processLabelVariablesStatusCode = ProcessLabelVariables(pDsPrintDetails.Tables(0).Rows(I), pErrMsg)

                        If _processLabelVariablesStatusCode <> ATPAR_OK Then
                            Return _processLabelVariablesStatusCode
                        End If

                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed To Process label variables: " & vbCrLf & ex.ToString & ":")
                        Cleanup()
                        PrintNiceLabel = _processLabelVariablesStatusCode
                    End Try

                    Try
                        pneOutput = PocketNiceEngine.EngineClassFactory.CreateOutput
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create PNE output: " & vbCrLf & ex.ToString)
                        Cleanup()
                        PrintNiceLabel = E_PRINTER_CREATEOUTPUTFAIL
                        Exit Function
                    End Try

                    Try
                        'pneOutput.Kind = PocketNiceEngine.OutputKindType.TcpIP
                        If (pPrinterTye = "Mobile") Then
                            pneOutput.Kind = PocketNiceEngine.OutputKindType.TcpIP
                            pneOutput.SetTcpIp(pPrinterAddressOrName, pPrinterPort)
                        Else
                            pneOutput.Kind = PocketNiceEngine.OutputKindType.BlueTooth
                            pneOutput.SetBlueTooth(pPrinterPort)
                        End If


                        'pneOutput.Kind = PocketNiceEngine.OutputKindType.BlueTooth
                        'pneOutput.SetBlueTooth("9")
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed with Ex: " & vbCrLf & ex.ToString & ":")
                        Cleanup()
                        PrintNiceLabel = E_PRINTER_SETOUTPUTKINDFAIL
                    End Try

                    Try

                        pneLabel.Output = pneOutput
                    Catch ex As Exception

                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to set Output : " & vbCrLf & ex.ToString & ":")
                        Cleanup()
                        PrintNiceLabel = E_PRINTER_SETOUTPUTFAIL

                        Exit Function
                    End Try

                    Try
                        'Dim NoOfPrints As Integer = 1
                        'NoOfPrints = CType(pNoOfPrints, Integer)
                        pneLabel.Print(pNoOfPrints)
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to Print: " & vbCrLf & ex.ToString)
                        Cleanup()
                        PrintNiceLabel = E_PRINTERROR
                        Exit Function
                    End Try
                Next



                If Not pneLabel Is Nothing Then
                    PNE.CloseLabel(pneLabel)
                    pneLabel = Nothing
                End If
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Print Nice label... " & _
                                                                  vbCrLf & " : Exception is : " & ex.ToString & vbCrLf)
            Cleanup()
            Return E_SERVERERROR
        End Try
    End Function

    Private Function ProcessLabelVariables(ByVal pData As DataRow, ByRef pErrMsg As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Try
            Dim i As Integer = 0
            Dim _data As String
            Do While i <> pneLabel.LabelVariables.Count

                Dim labelVar As PocketNiceEngine.IPromptVariable = pneLabel.LabelVariables.GetAt(i)

                ' if the variable is not used, ignore the rule check
                If labelVar.IsUsed Then

                    Dim _lblVarPrompt As String = labelVar.Prompt

                    If pData.Table.Columns.Contains(labelVar.Name) Then
                        If Not IsDBNull(pData(labelVar.Name)) Then
                            _data = pData(labelVar.Name).ToString
                        End If
                    Else
                        _data = String.Empty
                    End If

                    If _lblVarPrompt = LABEL_PROMPT_BARCODE Then

                        '
                        ' Note: NO_LABEL_BARCODE_DATA_INDICATOR is used at this time because nicelabel doesn't support
                        ' removing(or not printing) a barcode variable if there's no data for it.
                        'if there's no data available for this barcode set the data to NO_LABEL_BARCODE_DATA_INDICATOR
                        If _data.Length = 0 Then _data = NO_LABEL_BARCODE_DATA_INDICATOR
                        If _data.Length > labelVar.Length Then
                            If log.IsDebugEnabled Then log.Debug("PrintNiceLabel:ProcessLabelVariables :" & "Barcode " & labelVar.Name & " Data length: " & _data.Length & " too large")
                            pErrMsg = "Incorrect data length for field: " & labelVar.Name & " and value: " & _data
                            ProcessLabelVariables = E_LABEL_DATA_LENGTH_ERROR
                            Exit Function
                        End If

                        If labelVar.DataFormat.IsDataOk(_data) Then
                            labelVar.Value = _data
                        Else
                            If log.IsDebugEnabled Then log.Debug("PrintNiceLabel:ProcessLabelVariables :" & "Incorrect Data Format: " & labelVar.Name & vbCrLf & "value :" & _data)
                            'TO DO : Need to get the error message from DB
                            pErrMsg = "Incorrect label data for field: " & labelVar.Name & " and value: " & _data
                            ProcessLabelVariables = E_LABEL_DATA_FORMAT_ERROR
                            Exit Function
                        End If
                    ElseIf _lblVarPrompt = LABEL_PROMPT_IGNORE Then
                        ' IGNORE prompts are used for all but the first LabelVariables of multiline sets
                        ' their values are populated within the case LABEL_PROMPT_MULTILINE block
                        i = i + 1
                        Continue Do

                    ElseIf _lblVarPrompt.StartsWith(LABEL_PROMPT_MULTILINE) Then
                        'parse prompt and get max number of lines
                        Dim _maxMultLines As Integer = Integer.Parse(_lblVarPrompt.Substring(LABEL_PROMPT_MULTILINE.Length))

                        ' get the data name based on the label variable name (i.e. remove _1)
                        Dim _labelName As String = labelVar.Name.Substring(0, labelVar.Name.IndexOf(LABEL_PROMPT_SEP))
                        _data = pData(_labelName).ToString

                        Static Dim _prevLoc As Integer

                        For _linenum As Integer = 1 To _maxMultLines
                            '  size the data according to a label variable's length

                            Dim _multLabelVar As PocketNiceEngine.IPromptVariable = pneLabel.LabelVariables.Item(_labelName & LABEL_PROMPT_SEP & _linenum)

                            ' a rudimentary word wrap.. cut data to size, disregarding word completions
                            Dim _cutdata As String
                            If _data.Length > _prevLoc + _multLabelVar.Length Then
                                _cutdata = _data.Substring(_prevLoc, _multLabelVar.Length)
                                _prevLoc = _prevLoc + _multLabelVar.Length
                                _multLabelVar.Value = _cutdata
                            Else
                                _cutdata = _data.Substring(_prevLoc)
                                _multLabelVar.Value = _cutdata
                                Exit For
                            End If

                        Next
                        _prevLoc = 0
                        i = i + 1
                        Continue Do
                    Else ' all other labelvars should have data truncated to labelvar.length
                        ' Dim _data As String = pData(labelVar.Name)
                        If _data.Length > labelVar.Length Then _data = _data.Substring(0, labelVar.Length)

                        ' TODO: this is probably not required for string data
                        If labelVar.DataFormat.IsDataOk(_data) Then
                            labelVar.Value = _data
                        Else
                            If log.IsDebugEnabled Then log.Debug("PrintNiceLabel:ProcessLabelVariables :" & "Incorrect Data Format: " & labelVar.Name & vbCrLf & "value :" & _data)
                            pErrMsg = "Incorrect label data for field: " & labelVar.Name & " and value: " & _data
                            ProcessLabelVariables = E_LABEL_DATA_FORMAT_ERROR
                            Exit Function
                        End If

                    End If

                End If

                i = i + 1
            Loop

            ProcessLabelVariables = ATPAR_OK
        Catch fex As System.FormatException
            If log.IsDebugEnabled Then log.Debug("PrintNiceLabel:ProcessLabelVariables :" & "Multiline Variable prompt is not well formed" & fex.ToString)
            ProcessLabelVariables = E_MULTI_LINE_ERROR
        Catch ex As Exception
            If log.IsDebugEnabled Then log.Debug("PrintNiceLabel:ProcessLabelVariables :" & "Error Processing Variables" & ex.ToString)
            ProcessLabelVariables = E_PRINTERROR
        End Try

    End Function

    Private Sub Cleanup()
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        If Not pneLabel Is Nothing Then
            PNE.CloseLabel(pneLabel)
            pneLabel = Nothing
        End If
        If Not pneOutput Is Nothing Then
            pneOutput = Nothing
        End If


    End Sub
#End Region


    ''' <summary>
    ''' GetItemAttributesCnvFact
    ''' </summary>
    ''' <param name="pstrCartId"></param>
    ''' <param name="pstrBusinessUnit"></param>
    ''' <param name="pstrItemId"></param>
    ''' <param name="pDblConverFact"></param>
    ''' <param name="pstrLowerQOH"></param>
    ''' <param name="pstrActualQty"></param>
    ''' <param name="pDeviceTokenEntry"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetItemAttributesCnvFact(ByVal pstrCartId As String, ByVal pstrBusinessUnit As String, ByVal pstrItemId As String, _
                                             ByRef pDblConverFact As Double, ByRef pstrLowerQOH As String, ByVal pstrActualQty As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim pdsSetItems As DataSet

        Try
            With _sbSQL
                .Append("SELECT CART_ID, ITEM_ID, BUSINESS_UNIT, ")
                .Append(" ORG_GROUP_ID, ISSUE_UOM, CONV_RATE_PAR_TO_ISSUE_CF FROM MT_ATPAR_ITEM_ATTRIBUTES ")
                .Append(" WHERE CART_ID = '")
                .Append(pstrCartId)
                .Append("' AND BUSINESS_UNIT ='")
                .Append(pstrBusinessUnit)
                .Append("' AND ITEM_ID = '")
                .Append(pstrItemId)
                .Append("' AND ISSUE_UOM <> PAR_UOM ")
            End With

            If log.IsInfoEnabled Then log.Info(methodBaseName & "GetItemAttributesCnvFact with:" _
                                                           & _sbSQL.ToString & vbCrLf)

            pdsSetItems = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))

            If pdsSetItems.Tables.Count > 0 AndAlso pdsSetItems.Tables(0).Rows.Count > 0 Then
                If String.IsNullOrEmpty(pdsSetItems.Tables(0).Rows(0).Item("CONV_RATE_PAR_TO_ISSUE_CF").ToString) Or CDbl(pdsSetItems.Tables(0).Rows(0).Item("CONV_RATE_PAR_TO_ISSUE_CF").ToString) = 0 Or _
                    IsDBNull(pdsSetItems.Tables(0).Rows(0).Item("CONV_RATE_PAR_TO_ISSUE_CF").ToString) Then
                    pDblConverFact = 1
                Else
                    pDblConverFact = CDbl(pdsSetItems.Tables(0).Rows(0).Item("CONV_RATE_PAR_TO_ISSUE_CF").ToString)
                End If
                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Conversion Factor Is :" & pDblConverFact)
            Else
                pstrLowerQOH = pstrActualQty
                pDblConverFact = 1
            End If
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Actuall Quantity Is :" & pstrActualQty)
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " LowestQOH Value Is :" & pstrLowerQOH)
            Return ATPAR_OK
        Catch sqlEx As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL...." &
                                                                    _sbSQL.ToString & vbCrLf &
                                                                    " Exception is : " & sqlEx.ToString &
                                                                    vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL...." &
                                                                    _sbSQL.ToString & vbCrLf &
                                                                    " Exception is : " & ex.ToString &
                                                                    vbCrLf)
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' To get location type
    ''' </summary>
    ''' <param name="pStrBunit"></param>
    ''' <param name="pStrCartID"></param>
    ''' <param name="pStrLocType"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetLocationType(ByVal pStrBunit As String, ByVal pStrCartID As String, ByRef pStrLocType As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim strSQL As String = String.Empty


        Try
            strSQL = "SELECT LOCATION_TYPE FROM MT_POU_DEPT_CART_ALLOCATIONS " & _
                                "WHERE BUSINESS_UNIT ='" & pStrBunit & "'" & _
                                "AND CART_ID='" & pStrCartID & "'"


            If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting the records from Dept User" & _
                                                                                " Allocations with the following SQL...." & _
                                                                                strSQL & vbCrLf)

            pStrLocType = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(strSQL))
        Catch sqlEx As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL...." _
                                                                & strSQL & vbCrLf & " Exception is : " & _
                                                                sqlEx.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL...." & _
                                                                    strSQL & vbCrLf & _
                                                                    " Exception is : " & ex.ToString & _
                                                                    vbCrLf)
            Return E_SERVERERROR
        End Try
        Return ATPAR_OK
    End Function

End Class

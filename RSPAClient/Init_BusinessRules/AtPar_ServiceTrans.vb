#Region "[ Imports ]"
Imports log4net
Imports System.Reflection
Imports System.Diagnostics
Imports System.Text
Imports System.Collections
Imports System.Data.SqlClient
Imports System.Data
Imports System.Net.mail
#End Region

Public Class AtPar_ServiceTrans
    Inherits AtPar_Application_Base

    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_ServiceTrans))

#Region "[ Public Functions ]"

    Public Sub New()
        Try
            log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.Init.ToString()
            log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = Nothing
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("BusinessRules Component Initialization Failed")
        End Try
    End Sub

    ''' <summary>
    ''' To check the Recall Schedules
    ''' </summary>
    ''' <param name="pServiceName"></param>
    ''' <param name="pJobType"></param>
    ''' <param name="pDay"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function CheckForRecallSchedule(ByVal pServiceName As String, ByVal pJobType As String, _
                                   ByVal pDay As String, ByVal pSystemID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _StatusCode As Long = -1
        Dim _sqlCmd As SqlCommand
        Dim _strSQL As String = String.Empty
        Dim _dsRecallItemDtls As New DataSet
        Dim _htDeptDtls As New Hashtable
        Dim _dsProdUtilDtls As New DataSet
        Dim _strItems As String = String.Empty
        Dim _blnIsValidRecallItems As Boolean = False

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object :" & _
                                       "Exception is " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try

            Dim sqlParms() As SqlParameter = New SqlParameter(4) {}

            sqlParms(0) = New SqlParameter("@ServiceName", SqlDbType.NVarChar)
            sqlParms(0).Value = pServiceName

            sqlParms(1) = New SqlParameter("@JobID", SqlDbType.NVarChar)
            sqlParms(1).Value = pJobType

            sqlParms(2) = New SqlParameter("@SheduleDay", SqlDbType.NVarChar)
            sqlParms(2).Value = pDay

            sqlParms(3) = New SqlParameter("@SheduleTime", SqlDbType.NVarChar)
            sqlParms(3).Value = Now.ToString("HH:mm")

            sqlParms(4) = New SqlParameter("@SheduleCount", SqlDbType.Int)
            sqlParms(4).Direction = ParameterDirection.Output


            _sqlCmd = New SqlCommand
            _sqlCmd.Connection = m_LocalDB.CreateConnection
            _sqlCmd.CommandType = CommandType.StoredProcedure
            _sqlCmd.CommandText = "GetRecallSchedules"
            _sqlCmd.Parameters.Add(sqlParms(0))
            _sqlCmd.Parameters.Add(sqlParms(1))
            _sqlCmd.Parameters.Add(sqlParms(2))
            _sqlCmd.Parameters.Add(sqlParms(3))
            _sqlCmd.Parameters.Add(sqlParms(4))

            _strSQL = "DECLARE @P1 INT " & vbCrLf & _
                      "SET @P1 = 0 " & vbCrLf & _
                      "EXEC	" & _
                      "GetRecallSchedules" & vbCrLf & _
                      "@ServiceName = N'" & sqlParms(0).Value & "'," & vbCrLf & _
                      "@JobID = N'" & sqlParms(1).Value & "'," & vbCrLf & _
                      "@SheduleDay = N'" & sqlParms(2).Value & "'," & vbCrLf & _
                      "@SheduleTime = N'" & sqlParms(3).Value & "'," & vbCrLf & _
                      "@SheduleCount = @P1 OUTPUT" & vbCrLf & _
                      "SELECT @P1"

            If log.IsInfoEnabled Then log.Info(_strSQL)

            Try
                m_LocalDB.ExecuteDataSet(_sqlCmd)

                If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Row Count: " & sqlParms(4).Value)
                _sqlCmd.Parameters.Clear()

            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to execute the following" & _
                              " SQL...." & _strSQL & vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                Return E_SERVERERROR
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to execute the following" & _
                             " SQL...." & _strSQL & vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try


            If sqlParms(4).Value > 0 Then

                Try

                    '// To get the Recall Item(s) from the AlertTrackIFService //'

                    ' _StatusCode = GetRecallItems(_dsRecallItemDtls)

                    If _StatusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in GetRecallItems:" & _
                                                            "StatusCode is :" & _StatusCode & vbCrLf)
                        Return E_SERVERERROR
                    End If

                    If _dsRecallItemDtls.Tables.Count > 0 Then
                        If _dsRecallItemDtls.Tables(0).Rows.Count > 0 Then

                            '// To Insert Recall Info into MT_ATPAR_RECALL_INFO Table //'
                            _StatusCode = ProcessRecallInfo(_dsRecallItemDtls, pSystemID, _blnIsValidRecallItems, _strItems)

                            If _StatusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to Insert RecallInfo:" & _
                                                                    "StatusCode is :" & _StatusCode & vbCrLf)
                                Return E_SERVERERROR
                            End If

                            If _blnIsValidRecallItems Then

                                '// To check the Recall Item(s) Existence in MT_POU_CART_INVENTORY table and Send Email to the Respective Department //'
                                _StatusCode = CheckRecallItemsInPOU(_strItems, pSystemID)

                                If _StatusCode <> ATPAR_OK Then
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to CheckRecallItemsInInventory:" & _
                                                                        "StatusCode is :" & _StatusCode & vbCrLf)
                                    Return E_SERVERERROR
                                End If

                            End If


                            '// To check the Recall Item(s) Existence in MT_RECV_DEVIATION_HEADER table and Send Email to the Respective Org GroupID //'
                            _StatusCode = CheckRecallItemsInRecv(_strItems, pSystemID)

                            If _StatusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to CheckRecallItemsInRecv:" & _
                                                                    "StatusCode is :" & _StatusCode & vbCrLf)
                                Return E_SERVERERROR
                            End If

                            '// To check the Recall Item(s) Existence in MT_STIS_DETAILS table and Send Email to the Respective Org GroupID //'
                            _StatusCode = CheckRecallItemsInStkIssue(_strItems, pSystemID)

                            If _StatusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to CheckRecallItemsInStockIssue:" & _
                                                                    "StatusCode is :" & _StatusCode & vbCrLf)
                                Return E_SERVERERROR
                            End If


                        Else
                            If log.IsWarnEnabled Then log.Warn(methodBaseName & ":No Recall Item(s) Found..." & vbCrLf)
                            Return E_NORECORDFOUND
                        End If

                    Else
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & ":No Recall Item(s) Found..." & vbCrLf)
                        Return E_NORECORDFOUND
                    End If

                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
                    Return E_SERVERERROR
                End Try

            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sqlCmd = Nothing
            _dsRecallItemDtls = Nothing
            _htDeptDtls = Nothing
            _dsProdUtilDtls = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To check the FTP Schedule to upload Item Master File
    ''' </summary>
    ''' <param name="pServiceName"></param>
    ''' <param name="pJobType"></param>
    ''' <param name="pDay"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function CheckForFtpSchedule(ByVal pServiceName As String, ByVal pJobType As String, _
                                  ByVal pDay As String, ByVal pSystemID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _StatusCode As Long = -1

        Dim _className As String = String.Empty
        Dim _classType As Type
        Dim _methodName As MethodInfo
        Dim _reflectObject As Object
        Dim _erpObjAssy As Assembly
        Dim _erpObjName As String = String.Empty

        Try
            _erpObjName = "POU_BusinessRules"

            CreateERPObject(_erpObjName, _erpObjAssy)

            _className = _erpObjName & ".POU_ServiceTrans"
            _classType = _erpObjAssy.GetType(_className)
            _methodName = _classType.GetMethod("checkScheduleForItemFileMaster")
            _reflectObject = Activator.CreateInstance(_classType)
            Dim args As Object() = {pServiceName, pJobType, pDay, pSystemID}

            _StatusCode = _methodName.Invoke(_reflectObject, args)

            If _StatusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to invoke POU_BusinessRules with " & _
                                                        " StatusCode :" & _StatusCode & vbCrLf)
                Return _StatusCode
            End If

            log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.Init.ToString()
            log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = Nothing

            Return ATPAR_OK

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
        End Try

    End Function

#End Region

#Region "[ Private Functions ]"

    ''' <summary>
    ''' To get the Recall Items from the AlertTrackIFService
    ''' </summary>
    ''' <param name="pDsRecallItemDtls"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    'Private Function GetRecallItems(ByRef pDsRecallItemDtls As DataSet) As Long
    '    Dim stackFrame As New StackFrame()
    '    Dim methodBase As MethodBase = stackFrame.GetMethod()
    '    Dim methodBaseName As String = methodBase.Name
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName)

    '    Dim _StatusCode As Long = -1
    '    Dim _sbInputXML As New StringBuilder
    '    Dim _htInvConfDtls As New Hashtable

    '    Dim _objRecall As RecallService

    '    Try

    '        '// Read and Validating the Inventory_Conf_Services.xml //'
    '        _StatusCode = ReadAndValidateInventaryConf(Enum_ServiceType.ALERT_DB, _htInvConfDtls)


    '        If _StatusCode <> ATPAR_OK Then
    '            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to read Inventory Conf:" &
    '                                                "StatusCode is :" & _StatusCode & vbCrLf)
    '            Return E_SERVERERROR
    '        End If

    '        '// Building Input XML for RecallService //'
    '        If _htInvConfDtls.Count > 0 Then

    '            RecallServiceUrl = _htInvConfDtls("MONIKER") & "://" & _htInvConfDtls("SERVER_IP") & "/Webservices/AlertTrack/AlertTrackIFService.asmx"
    '            _objRecall = New RecallService

    '            With _sbInputXML
    '                .Append("<ROOT>")
    '                .Append("<AUTHENTICATION>")
    '                .Append("<USERNAME>")
    '                .Append(_htInvConfDtls("USERNAME"))
    '                .Append("</USERNAME>")
    '                .Append("<PASSWORD>")
    '                .Append(_htInvConfDtls("PASSWORD"))
    '                .Append("</PASSWORD>")
    '                .Append("<CLIENTID>")
    '                .Append(_htInvConfDtls("CLIENTID"))
    '                .Append("</CLIENTID>")
    '                .Append("</AUTHENTICATION>")
    '                .Append("<SEARCH>")
    '                .Append("<MFGCATNO>")
    '                .Append("</MFGCATNO>")
    '                .Append("<MFRNAME>")
    '                .Append("</MFRNAME>")
    '                .Append("</SEARCH>")
    '                .Append("</ROOT>")
    '            End With

    '        Else
    '            If log.IsWarnEnabled Then log.Warn(methodBaseName & ":AlertDB configuration details are not " &
    '                                              "provided in Inventory_Conf_Services.xml:" & vbCrLf)
    '            Return E_SERVERERROR
    '        End If


    '        If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Input xml is: " & _sbInputXML.ToString &
    '                                            "AlertDB url is :" & RecallServiceUrl)

    '        '// Calling the GetLatestAlerts Method //'
    '        _StatusCode = _objRecall.GetLatestAlerts(_sbInputXML.ToString, pDsRecallItemDtls)

    '        If Not IsNothing(pDsRecallItemDtls) Then
    '            If pDsRecallItemDtls.Tables.Count > 0 Then
    '                If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Recall items rows count:" & pDsRecallItemDtls.Tables(0).Rows.Count)
    '            End If
    '        Else
    '            If log.IsDebugEnabled Then log.Debug(methodBaseName & ":No recall items from Alert db:")
    '        End If
    '        If _StatusCode = 110016 Then
    '            If log.IsWarnEnabled Then log.Warn(methodBaseName & " :Invalid User name: ")
    '        ElseIf _StatusCode <> ATPAR_OK Then
    '            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to get data from AlertDB:" &
    '                                                "StatusCode is :" & _StatusCode & vbCrLf)
    '            Return E_SERVERERROR
    '        End If


    '        Return ATPAR_OK

    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
    '        Return E_SERVERERROR
    '    Finally
    '        _objRecall = Nothing
    '        _sbInputXML = Nothing
    '        _htInvConfDtls = Nothing
    '    End Try

    'End Function

    ''' <summary>
    ''' To check the Range of Lot / Serial Number(s)
    ''' </summary>
    ''' <param name="pDsRecallInfo"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="pIsValidRecallItems"></param>
    ''' <param name="pItems"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function ProcessRecallInfo(ByVal pDsRecallInfo As DataSet, ByVal pSystemID As String, _
                                      ByRef pIsValidRecallItems As Boolean, ByRef pItems As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _StatusCode As Long = -1
        Dim _htLotNumbers As New Hashtable
        Dim _htSerialNumbers As New Hashtable
        Dim _sbItems As New StringBuilder

        Try

            pIsValidRecallItems = False

            For intCnt As Integer = 0 To pDsRecallInfo.Tables(0).Rows.Count - 1

                With pDsRecallInfo.Tables(0).Rows(intCnt)

                    '// check for multiple Lot/Serial Existence //'

                    If Not String.IsNullOrEmpty(.Item("AlertLotNum").ToString) Then
                        _StatusCode = SplitLotSerialValues(.Item("AlertLotNum").ToString, _htLotNumbers)

                        If _StatusCode <> ATPAR_OK Then
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to Split the Lot Numbers " & _
                                                        "with StatusCode: " & _StatusCode & vbCrLf)
                            Return E_SERVERERROR
                        End If
                    End If

                    If Not String.IsNullOrEmpty(.Item("AlertSerialNum").ToString) Then
                        _StatusCode = SplitLotSerialValues(.Item("AlertSerialNum").ToString, _htSerialNumbers)

                        If _StatusCode <> ATPAR_OK Then
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to Split the Serial Numbers " & _
                                                                "with StatusCode: " & _StatusCode & vbCrLf)
                            Return E_SERVERERROR
                        End If
                    End If


                    If _htLotNumbers.Count > 1 And _htSerialNumbers.Count > 1 Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & ":ItemID :" & .Item("ItemID") & _
                                                            " is having multiple Lot numbers and Serial numbers:")
                        _htLotNumbers.Clear()
                        _htSerialNumbers.Clear()
                        Continue For
                    End If

                    If _htLotNumbers.Count > 0 Or _htSerialNumbers.Count > 0 Then

                        If _htLotNumbers.Count > 1 Then

                            _StatusCode = InsertRecallItemDtls(_htLotNumbers, .Item("ItemID").ToString, String.Empty, _
                                           .Item("AlertSerialNum").ToString, .Item("ClientMfrName").ToString, _
                                           .Item("MfrCatNo").ToString, .Item("AlertID").ToString, .Item("AlertType").ToString, _
                                           .Item("AlertClass").ToString, .Item("AlertCategory").ToString, _
                                           .Item("AlertTitle").ToString, .Item("AlertSynopsis").ToString, _
                                           .Item("AlertURL").ToString, .Item("AlertDate").ToString, True, pSystemID)

                            pIsValidRecallItems = True
                            _htLotNumbers.Clear()

                        ElseIf _htSerialNumbers.Count > 1 Then

                            _StatusCode = InsertRecallItemDtls(_htSerialNumbers, .Item("ItemID").ToString, _
                                           .Item("AlertLotNum").ToString, String.Empty, .Item("ClientMfrName").ToString, _
                                           .Item("MfrCatNo").ToString, .Item("AlertID").ToString, .Item("AlertType").ToString, _
                                           .Item("AlertClass").ToString, .Item("AlertCategory").ToString, _
                                           .Item("AlertTitle").ToString, .Item("AlertSynopsis").ToString, _
                                           .Item("AlertURL").ToString, .Item("AlertDate").ToString, False, pSystemID)

                            pIsValidRecallItems = True
                            _htSerialNumbers.Clear()
                        Else
                            _StatusCode = InsertRecallItemDtls(Nothing, .Item("ItemID").ToString, _
                                           .Item("AlertLotNum").ToString, .Item("AlertSerialNum").ToString, .Item("ClientMfrName").ToString, _
                                           .Item("MfrCatNo").ToString, .Item("AlertID").ToString, .Item("AlertType").ToString, _
                                           .Item("AlertClass").ToString, .Item("AlertCategory").ToString, _
                                           .Item("AlertTitle").ToString, .Item("AlertSynopsis").ToString, _
                                           .Item("AlertURL").ToString, .Item("AlertDate").ToString, False, pSystemID)

                            pIsValidRecallItems = True
                            _htLotNumbers.Clear()
                            _htSerialNumbers.Clear()

                        End If
                    Else

                        _StatusCode = InsertRecallItemDtls(Nothing, .Item("ItemID").ToString, .Item("AlertLotNum").ToString, _
                                            .Item("AlertSerialNum").ToString, .Item("ClientMfrName").ToString, _
                                            .Item("MfrCatNo").ToString, .Item("AlertID").ToString, .Item("AlertType").ToString, _
                                            .Item("AlertClass").ToString, .Item("AlertCategory").ToString, _
                                            .Item("AlertTitle").ToString, .Item("AlertSynopsis").ToString, _
                                            .Item("AlertURL").ToString, .Item("AlertDate").ToString, False, pSystemID)

                        pIsValidRecallItems = True

                    End If

                    If _StatusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to InsertRecallItemDtls:" & _
                                                            "StatusCode is :" & _StatusCode & vbCrLf)
                        Return E_SERVERERROR
                    End If

                    _sbItems.Append("'" & .Item("ItemID").ToString & "',")
                   
                End With

            Next

            If _sbItems.Length > 0 Then
                With _sbItems
                    .Remove(.ToString.LastIndexOf(","), 1)
                End With
                pItems = _sbItems.ToString
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Recall Items:" & pItems & vbCrLf)
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _htLotNumbers = Nothing
            _htSerialNumbers = Nothing
            _sbItems = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To check the Existence of Recall Item(s) in the AtPar Inventory
    ''' </summary>
    ''' <param name="pRecallItems"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function CheckRecallItemsInPOU(ByVal pRecallItems As String, ByVal pSystemID As String) As Long


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Long = -1

        Dim _sbSQL As New StringBuilder
        Dim _dsRecallItemsInInv As New DataSet
        Dim _dsCartBinLocDtls As New DataSet
        Dim _dsProdUtilDtls As New DataSet
        Dim _strRowFilter As String = String.Empty
        Dim _dtFilterRecallData As New DataTable
        Dim _dtFilterOrg As New DataTable

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object :" & _
                                                 "Exception is " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try

            With _sbSQL

                .Append("SELECT DISTINCT B.ORG_GROUP_ID, B.DEPARTMENT_ID, A.BUSINESS_UNIT, A.CART_ID, A.ITEM_ID, ")
                .Append("A.EXPIRY_DATE, A.ITEM_QUANTITY_ON_HAND, C.ITEM_ID, C.LOT_NO, C.SERIAL_NO, ")
                .Append("C.MFG_NAME, C.MFG_CAT_NO, C.ALERT_ID, C.ALERT_TYPE, C.ALERT_CLASS, C.ALERT_CATEGORY, ")
                .Append("C.ALERT_TITLE, C.ALERT_SYNOPSIS, C.ALERT_URL, C.ALERT_DATE ")
                .Append("FROM MT_POU_CART_INVENTORY A, MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS B, MT_ATPAR_RECALL_INFO C WHERE ")
                .Append("A.CART_ID = B.CART_ID AND A.BUSINESS_UNIT = B.BUSINESS_UNIT AND A.ITEM_ID = C.ITEM_ID AND ")
                .Append("A.LOT_NUMBER = C.LOT_NO AND A.SERIAL_NUMBER = C.SERIAL_NO AND C.ITEM_ID IN(" & pRecallItems & ") ")
                .Append("ORDER BY B.ORG_GROUP_ID, B.DEPARTMENT_ID, A.BUSINESS_UNIT, A.CART_ID, A.ITEM_ID ")

            End With

            Try
                If log.IsInfoEnabled Then log.Info(vbCrLf & methodBaseName & " :Getting the Recall item details " & _
                             "with following SQL :" & vbCrLf & _sbSQL.ToString & vbCrLf)

                _dsRecallItemsInInv = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to to get the item details from " & _
                                                        "MT_POU_CART_INVENTORY table with following SQL " & vbCrLf & _
                                                        "Exception is : " & ex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Finally
                _sbSQL.Remove(0, _sbSQL.Length)
            End Try

            If _dsRecallItemsInInv.Tables(0).Rows.Count > 0 Then

                '// Get Product Utilization //'
                _statusCode = GetProductUtilization(pRecallItems, pSystemID, _dsProdUtilDtls)

                If _statusCode <> ATPAR_OK Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in GetProductUtilization:" & _
                                                   "StatusCode is :" & _statusCode & vbCrLf)
                    Return E_SERVERERROR
                End If

                _dtFilterOrg = _dsRecallItemsInInv.Tables(0).DefaultView.ToTable(True, "ORG_GROUP_ID", "DEPARTMENT_ID", "BUSINESS_UNIT", "CART_ID")

                For intCnt As Integer = 0 To _dtFilterOrg.Rows.Count - 1

                    _strRowFilter = String.Empty

                    _strRowFilter = "ORG_GROUP_ID = '" & _dtFilterOrg.Rows(intCnt).Item("ORG_GROUP_ID").ToString & "' " & _
                                    "AND DEPARTMENT_ID = '" & _dtFilterOrg.Rows(intCnt).Item("DEPARTMENT_ID").ToString & "' " & _
                                    "AND BUSINESS_UNIT = '" & _dtFilterOrg.Rows(intCnt).Item("BUSINESS_UNIT").ToString & "' " & _
                                    "AND CART_ID = '" & _dtFilterOrg.Rows(intCnt).Item("CART_ID").ToString & "' "

                    If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Filtering the RecallItems with :" & _strRowFilter)

                    Dim _dvFilter As DataView = New DataView(_dsRecallItemsInInv.Tables(0), _strRowFilter, "", DataViewRowState.CurrentRows)


                    _dtFilterRecallData = _dvFilter.ToTable

                    _statusCode = GetCartDtlsForRecallItems(_dtFilterOrg.Rows(intCnt).Item("CART_ID").ToString, _
                                                            _dtFilterOrg.Rows(intCnt).Item("BUSINESS_UNIT").ToString, _
                                                            _dsCartBinLocDtls, _dtFilterOrg.Rows(intCnt).Item("ORG_GROUP_ID").ToString, _
                                                            pSystemID)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in GetCartDtlsForRecallItems: " & _
                                                             "StatusCode is :" & _statusCode & vbCrLf)
                        Return E_SERVERERROR
                    End If


                    _statusCode = BuildEmailText(_dtFilterRecallData, pRecallItems, _
                                                 _dtFilterOrg.Rows(intCnt).Item("ORG_GROUP_ID").ToString, _
                                                 _dtFilterOrg.Rows(intCnt).Item("DEPARTMENT_ID").ToString, _
                                                 EnumApps.PointOfUse, _dsCartBinLocDtls, _dsProdUtilDtls, pSystemID)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in BuildEmailText:" & _
                                                             "StatusCode is :" & _statusCode & vbCrLf)
                        Return _statusCode
                    End If

                    _dtFilterRecallData.Clear()

                Next

            Else
                If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Recall Item(s) are not exists in POU Cart Inventory:")
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
            _dsRecallItemsInInv = Nothing
            _dsCartBinLocDtls = Nothing
            _dsProdUtilDtls = Nothing
            _dtFilterOrg = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To insert the Recall Items into MT_ATPAR_RECALL_INFO table
    ''' </summary>
    ''' <param name="pHtLotSerialDtls"></param>
    ''' <param name="pItemID"></param>
    ''' <param name="pLotNum"></param>
    ''' <param name="pSerialNum"></param>
    ''' <param name="pMfgName"></param>
    ''' <param name="pMfgCatNo"></param>
    ''' <param name="pAlertID"></param>
    ''' <param name="pAlertType"></param>
    ''' <param name="pAlertClass"></param>
    ''' <param name="pAlertCategory"></param>
    ''' <param name="pAlertTitle"></param>
    ''' <param name="pAlertSynopsis"></param>
    ''' <param name="pAlertURL"></param>
    ''' <param name="pAlertDate"></param>
    ''' <param name="pIsLot"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function InsertRecallItemDtls(ByVal pHtLotSerialDtls As Hashtable, ByVal pItemID As String, _
                                          ByVal pLotNum As String, ByVal pSerialNum As String, _
                                          ByVal pMfgName As String, ByVal pMfgCatNo As String, _
                                          ByVal pAlertID As String, ByVal pAlertType As String, _
                                          ByVal pAlertClass As String, ByVal pAlertCategory As String, _
                                          ByVal pAlertTitle As String, ByVal pAlertSynopsis As String, _
                                          ByVal pAlertURL As String, ByVal pAlertDate As String, _
                                          ByVal pIsLot As Boolean, ByVal pSystemID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _objKey As DictionaryEntry

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object :" & _
                                        "Exception is " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try


        Try

            If Not pHtLotSerialDtls Is Nothing Then

                For Each _objKey In pHtLotSerialDtls
                    With _sbSQL

                        .Append("INSERT INTO MT_ATPAR_RECALL_INFO( ")
                        .Append("ITEM_ID, LOT_NO, SERIAL_NO, MFG_NAME, MFG_CAT_NO, ALERT_ID, ")
                        .Append("ALERT_TYPE, ALERT_CLASS, ALERT_CATEGORY, ALERT_TITLE, ALERT_SYNOPSIS, ")
                        .Append("ALERT_URL, ALERT_DATE ) VALUES( '")
                        .Append(pItemID & "', '")

                        If pIsLot Then
                            .Append(_objKey.Value & "', '")
                        Else
                            .Append(pLotNum & "', '")
                        End If

                        If Not pIsLot Then
                            .Append(_objKey.Value & "', '")
                        Else
                            .Append(pSerialNum & "', '")
                        End If

                        .Append(pMfgName & "', '")
                        .Append(pMfgCatNo & "', '")
                        .Append(pAlertID & "', '")
                        .Append(pAlertType & "', '")
                        .Append(pAlertClass & "', '")
                        .Append(pAlertCategory & "', '")
                        .Append(substituteString(pAlertTitle) & "', '")
                        .Append(substituteString(pAlertSynopsis) & "', '")
                        .Append(pAlertURL & "', '")
                        .Append(pAlertDate & "' )")

                    End With

                    If log.IsInfoEnabled Then log.Info(methodBaseName & ":Inserting the Recall Info with SQL..." & _
                                                       vbCrLf & _sbSQL.ToString & vbCrLf)

                    Try
                        m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to insert into the " & _
                                                           "MT_ATPAR_RECALL_INFO table :" & vbCrLf & _
                                                           "With following SQL... " & _sbSQL.ToString & vbCrLf & _
                                                           "Exception is : " & ex.ToString & vbCrLf)

                        Return ATPAR_E_LOCALDBINSERTFAIL
                    Finally
                        _sbSQL.Remove(0, _sbSQL.Length)
                    End Try

                Next

            Else
                With _sbSQL

                    .Append("INSERT INTO MT_ATPAR_RECALL_INFO( ")
                    .Append("ITEM_ID, LOT_NO, SERIAL_NO, MFG_NAME, MFG_CAT_NO, ALERT_ID, ")
                    .Append("ALERT_TYPE, ALERT_CLASS, ALERT_CATEGORY, ALERT_TITLE, ALERT_SYNOPSIS, ")
                    .Append("ALERT_URL, ALERT_DATE ) VALUES( '")
                    .Append(pItemID & "', '")
                    .Append(pLotNum & "', '")
                    .Append(pSerialNum & "', '")
                    .Append(pMfgName & "', '")
                    .Append(pMfgCatNo & "', '")
                    .Append(pAlertID & "', '")
                    .Append(pAlertType & "', '")
                    .Append(pAlertClass & "', '")
                    .Append(pAlertCategory & "', '")
                    .Append(pAlertTitle & "', '")
                    .Append(pAlertSynopsis & "', '")
                    .Append(pAlertURL & "', '")
                    .Append(pAlertDate & "' )")

                End With

                If log.IsInfoEnabled Then log.Info(methodBaseName & ":Inserting the Recall Info with SQL..." & _
                                                   vbCrLf & _sbSQL.ToString & vbCrLf)

                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to insert into the " & _
                                                       "MT_ATPAR_RECALL_INFO table :" & vbCrLf & _
                                                       "With following SQL... " & _sbSQL.ToString & vbCrLf & _
                                                       "Exception is : " & ex.ToString & vbCrLf)

                    Return ATPAR_E_LOCALDBINSERTFAIL
                Finally
                    _sbSQL.Remove(0, _sbSQL.Length)
                End Try

            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _objKey = Nothing
            _sbSQL = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To get the Cart Details
    ''' </summary>
    ''' <param name="pCartId"></param>
    ''' <param name="pBUnit"></param>
    ''' <param name="pCartDetailsDS"></param>
    ''' <param name="pStrOrgGrpID"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="pProfileID"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function GetCartDtlsForRecallItems(ByVal pCartId As String, ByVal pBUnit As String, _
                                     ByRef pCartDetailsDS As DataSet, ByVal pStrOrgGrpID As String, _
                                     ByVal pSystemID As String, Optional ByVal pProfileID As String = "") As Long


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _reflectObject As Object

        Try

            Dim _atparParameters As Atpar_Application_Parameters
            Dim _orgParams As SortedList
            Dim _strItemDescrType As String
            Dim _strDefaultMfgItemID As String
            Dim _strItemPriceType As String
            Dim pInputParameters As New DataSet
            Dim pDeviceTokenEntry(8) As String
            pCartDetailsDS = New DataSet
            Dim _dsAtparCartDetails As DataSet

            Dim _className As String
            Dim _classType As Type
            Dim _methodName As MethodInfo
            Dim _erpObjName As String
            Dim _erpObjAssy As Assembly

            Dim _statusCode As Long = -1
            Dim _chrCartManagedAtpar As Char

            Dim _strNDCType As String = String.Empty
            Dim _strUPNType As String = String.Empty

            Try

                _orgParams = New SortedList
                _orgParams(AppParameters_Enum.ITEM_DESCR.ToString) = String.Empty
                _orgParams(AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString) = String.Empty
                _orgParams(AppParameters_Enum.ITEM_PRICE.ToString) = String.Empty
                _orgParams(AppParameters_Enum.CARTS_MNGD_ATPAR.ToString) = String.Empty
                _atparParameters = Atpar_Application_Parameters.CreateInstance(pSystemID)
                _atparParameters.OrgGroupId = pStrOrgGrpID
                _atparParameters.ApplicationId = EnumApps.PointOfUse

                'Getting OrgParam Values
                _statusCode = _atparParameters.GetOrgGroupParamValues(_orgParams)

                If _statusCode <> ATPAR_OK Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to get the org group parameter" & _
                                                                        " values : StatusCode is : " & _
                                                                        _statusCode & vbCrLf)
                    Return _statusCode
                End If

                _strItemDescrType = _orgParams(AppParameters_Enum.ITEM_DESCR.ToString)
                _strDefaultMfgItemID = _orgParams(AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString)
                _strItemPriceType = _orgParams(AppParameters_Enum.ITEM_PRICE.ToString)
                _chrCartManagedAtpar = _orgParams(AppParameters_Enum.CARTS_MNGD_ATPAR.ToString)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to get the org group parameter" & _
                                                                      " values : Exception is : " & _
                                                                      ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try

            'Not getting profile parameter values when there is no ProfileID
            If pProfileID <> "" And pProfileID <> String.Empty Then
                'Getting ProfileParam Values
                Dim _profParams As SortedList
                Try
                    _profParams = New SortedList

                    _profParams(AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString) = String.Empty
                    _profParams(AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString) = String.Empty

                    _atparParameters.ApplicationId = EnumApps.PointOfUse
                    _atparParameters.ProfileId = pProfileID

                    _statusCode = _atparParameters.GetProfileParamValues(_profParams)
                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to get the profile parameter" & _
                                                                            " values : StatusCode is : " & _
                                                                            _statusCode & vbCrLf)
                        Return _statusCode
                    End If

                    _strUPNType = _profParams(AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString)
                    _strNDCType = _profParams(AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString)

                Catch ex As Exception
                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to get Details from GetProfileParamValues function " & _
                                                                                                                " with StatusCode :" & _statusCode & ":")
                        Return _statusCode
                    End If
                End Try
            End If

            'Create and Add tables to I/P dataset
            Dim _dtHdrData As DataTable
            Dim _dtPreReq As DataTable
            Dim _dtListView As DataTable
            Dim _dtOutPutHdr As DataTable
            Dim _dtOutPutDtl As DataTable
            Dim _drHdr As DataRow
            Dim _drPreReq As DataRow
            Dim _drListView As DataRow

            Try
                _dtHdrData = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Detail_Defns, _
                                                                          DataSet_Type.HEADERS.ToString)
                _dtPreReq = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Cart_PreReqData_Defns, _
                                                                         DataSet_Type.PREREQDATA.ToString)
                _dtListView = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Cart_Detail_ListView_RequiredParams, _
                                                                           DataSet_Type.PREREQLISTVIEWPARAMS.ToString)
                'O/P
                _dtOutPutHdr = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Cart_DetailOutput_Header_Defns, _
                                                                            DataSet_Type.HEADERS.ToString)
                _dtOutPutDtl = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Cart_DetailOutput_Details_Defns, _
                                                                            DataSet_Type.DETAILS.ToString)

                pCartDetailsDS.Tables.Add(_dtOutPutHdr)
                pCartDetailsDS.Tables.Add(_dtOutPutDtl)

                If log.IsDebugEnabled Then log.Debug(methodBaseName & ":After adding the tables to the" & _
                                                                      " dataset " & vbCrLf)

                _drHdr = _dtHdrData.NewRow()

                _drHdr(Get_Detail_Defns_Enum.USER_ID) = String.Empty  'Requried in ERP component
                _drHdr(Get_Detail_Defns_Enum.BUSINESS_UNIT) = pBUnit
                _drHdr(Get_Detail_Defns_Enum.CART_ID) = pCartId
                _dtHdrData.Rows.Add(_drHdr)

                _drPreReq = _dtPreReq.NewRow()

                _drPreReq(Get_Cart_PreReqData_Enum.ITEM_PRICE) = _strItemPriceType
                _drPreReq(Get_Cart_PreReqData_Enum.ITEM_DESCR) = _strItemDescrType
                _drPreReq(Get_Cart_PreReqData_Enum.DEFAULT_MFG_ITEM_ID) = _strDefaultMfgItemID
                _drPreReq(Get_Cart_PreReqData_Enum.ITEM_UPN_TYPE_CODE) = _strUPNType
                _drPreReq(Get_Cart_PreReqData_Enum.ITEM_NDC_TYPE_CODE) = _strNDCType
                _drPreReq(Get_Cart_PreReqData_Enum.REMOTE_SCHEMA) = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.REMOTEDBCONNECTION), _
                                                                                  REMOTEDBCONNECTION.SCHEMA.ToString)
                _drPreReq(Get_Cart_PreReqData_Enum.REMOTE_DB_TYPE) = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.REMOTEDBCONNECTION), _
                                                                                   REMOTEDBCONNECTION.DATABASE.ToString)
                _dtPreReq.Rows.Add(_drPreReq)

                'TODO:  Need to confirm this
                _drListView = _dtListView.NewRow()
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_CTRL) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_OPT) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.COMPARTMENT) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.CONS_NON_STOCK) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_QTY) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_REQUIRED) = False
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.CUST_ITEM_NO) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.DESCR) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.FOQ) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.GTIN) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.INVENTORY_ITEM) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_COUNT_ORDER) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_ID) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.MAXIMUM_QTY) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.OPTIMAL_QTY) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.PRICE) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.PRINT_LATER_FLAG) = False
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.UOM) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.UPC_ID) = True
                _drListView(Get_Cart_Detail_ListView_Reqparams_Enum.VNDR_ITEM_ID) = True

                _dtListView.Rows.Add(_drListView)

                pInputParameters.Tables.Add(_dtHdrData)
                pInputParameters.Tables.Add(_dtPreReq)
                pInputParameters.Tables.Add(_dtListView)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to create or populate datatable" & _
                                                                      " with Exception... " & vbCrLf & _
                                                                      ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try

            pDeviceTokenEntry(TokenEntry_Enum.UserID) = String.Empty
            pDeviceTokenEntry(TokenEntry_Enum.DeviceID) = String.Empty
            pDeviceTokenEntry(TokenEntry_Enum.DateTime) = String.Empty
            pDeviceTokenEntry(TokenEntry_Enum.ProfileID) = String.Empty
            pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID) = String.Empty
            pDeviceTokenEntry(TokenEntry_Enum.AccessToken) = String.Empty
            pDeviceTokenEntry(TokenEntry_Enum.LdapUser) = String.Empty
            pDeviceTokenEntry(TokenEntry_Enum.ClientType) = ClientType.WEB
            pDeviceTokenEntry(TokenEntry_Enum.SystemId) = pSystemID

            'Calling ERP Component

            Try
                _erpObjName = GetConfigData(pSystemID, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                _erpObjName = EnumApps.CartCount.ToString() & "_" & _erpObjName

                If _chrCartManagedAtpar = YesNo_Enum.Y.ToString Then
                    _erpObjName = Erp_Obj_Name.CartCount_Atpar.ToString
                End If

                If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Component name is : " & _erpObjName & _
                                                                      vbCrLf)

                CreateERPObject(_erpObjName, _erpObjAssy)
                _className = _erpObjName & ".GetDetails"
                _classType = _erpObjAssy.GetType(_className)
                _methodName = _classType.GetMethod("GetDetails")
                _reflectObject = Activator.CreateInstance(_classType)

                Dim args As Object() = {pInputParameters, pCartDetailsDS, pDeviceTokenEntry}

                _statusCode = _methodName.Invoke(_reflectObject, args)

                pCartDetailsDS = args(1)

                If (_statusCode = E_NORECORDFOUND Or _statusCode = CRCT_E_CARTDOESNOTEXIST) And _chrCartManagedAtpar <> YesNo_Enum.Y.ToString Then

                    _erpObjName = Erp_Obj_Name.CartCount_Atpar.ToString

                    If log.IsDebugEnabled Then log.Debug(methodBaseName & ":ERP Component Name: " & _erpObjName & _
                                                                                          vbCrLf)
                    CreateERPObject(_erpObjName, _erpObjAssy)

                    _className = _erpObjName & ".GetDetails"
                    _classType = _erpObjAssy.GetType(_className)
                    _methodName = _classType.GetMethod("GetDetails")
                    _reflectObject = Activator.CreateInstance(_classType)

                    Dim arg As Object() = {pInputParameters, pCartDetailsDS, pDeviceTokenEntry}

                    _statusCode = _methodName.Invoke(_reflectObject, arg)


                    pCartDetailsDS = arg(1)

                    If log.IsWarnEnabled Then log.Warn(methodBaseName & ":No records found :" & _
                                                                        " Statuscode is : " & _statusCode & vbCrLf)
                ElseIf _statusCode <> ATPAR_OK Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Failed in the remote call :" & _
                                                                        " Statuscode is : " & _statusCode & vbCrLf)
                    If _statusCode = E_REMOTEERROR Then
                        Return E_SERVERERROR
                    Else
                        Return _statusCode
                    End If
                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in the remote call : Exception" & _
                                                                      " is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try


            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to get the cart items: Exception is: " _
                                                                & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _reflectObject = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To get the Product Utilization for the Recall Items
    ''' </summary>
    ''' <param name="pItemIDs"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="pDsPrdtUtilization"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function GetProductUtilization(ByVal pItemIDs As String, ByVal pSystemID As String, _
                                           ByRef pDsPrdtUtilization As DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object :" & _
                                       "Exception is " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try


        Try
            With _sbSQL
                .Append("SELECT C.ITEM_ID, UPDATE_DATE, ITEM_LOTNUMBER, ITEM_SRNUMBER, A.PATIENT_ID FROM ")
                .Append("MT_POU_CHARGECAPTURE_HEADER A, MT_POU_CHARGECAPTURE_DETAILS B, MT_ATPAR_RECALL_INFO C ")
                .Append("WHERE A.TRANSACTION_ID = B.TRANSACTION_ID AND B.ITEM_ID = C.ITEM_ID ")
                .Append("AND B.ITEM_LOTNUMBER = C.LOT_NO AND B.ITEM_SRNUMBER = C.SERIAL_NO ")
                .Append("AND B.ITEM_ID IN(" & pItemIDs & ") ")
            End With

            Try
                If log.IsInfoEnabled Then log.Info(methodBaseName & ": Getting details from MT_POU_CHARGECAPTURE_DETAILS : " & _
                              " table with the following SQL...." & vbCrLf & _sbSQL.ToString & vbCrLf)

                pDsPrdtUtilization = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to execute the following SQL... " & _
                               _sbSQL.ToString & " : Exception is : " & ex.ToString & vbCrLf)
            Finally
                _sbSQL.Remove(0, _sbSQL.Length)
            End Try

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To get the Recall Notification EmailID
    ''' </summary>
    ''' <param name="pOrgGroupID"></param>
    ''' <param name="pDept"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="pEmailAddr"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function GetRecallNotificationEmailID(ByVal pOrgGroupID As String, ByVal pDept As String, _
                                                  ByVal pAppID As Integer, ByVal pSystemID As String, _
                                                  ByRef pEmailAddr As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _sqlCmd As SqlCommand
        Dim _StatusCode As Long = -1

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object :" & _
                                       "Exception is " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try

            Dim sqlParms() As SqlParameter = New SqlParameter(3) {}

            sqlParms(0) = New SqlParameter("@OrgGroupID", SqlDbType.NVarChar)
            sqlParms(0).Value = pOrgGroupID

            sqlParms(1) = New SqlParameter("@DeptID", SqlDbType.NVarChar)
            sqlParms(1).Value = pDept

            sqlParms(2) = New SqlParameter("@AppID", SqlDbType.SmallInt)
            sqlParms(2).Value = pAppID

            sqlParms(3) = New SqlParameter("@RecallEmailID", SqlDbType.NVarChar, 50)
            sqlParms(3).Direction = ParameterDirection.Output

            _sqlCmd = New SqlCommand
            _sqlCmd.Connection = m_LocalDB.CreateConnection
            _sqlCmd.CommandType = CommandType.StoredProcedure
            _sqlCmd.CommandText = "GetRecallNotificationEmail"
            _sqlCmd.Parameters.Add(sqlParms(0))
            _sqlCmd.Parameters.Add(sqlParms(1))
            _sqlCmd.Parameters.Add(sqlParms(2))
            _sqlCmd.Parameters.Add(sqlParms(3))

            _strSQL = "DECLARE @P1 NVARCHAR(50) " & vbCrLf & _
                      "EXEC	" & _
                      "GetRecallNotificationEmail" & vbCrLf & _
                      "@OrgGroupID = N'" & sqlParms(0).Value & "'," & vbCrLf & _
                      "@DeptID = N'" & sqlParms(1).Value & "'," & vbCrLf & _
                      "@AppID = N'" & sqlParms(2).Value & "'," & vbCrLf & _
                      "@RecallEmailID = @P1 OUTPUT" & vbCrLf & _
                      "SELECT @P1"

            If log.IsInfoEnabled Then log.Info(_strSQL)

            Try
                m_LocalDB.ExecuteDataSet(_sqlCmd)

                If log.IsDebugEnabled Then log.Debug(methodBaseName & ":RecallEmailID is : " & sqlParms(3).Value)
                _sqlCmd.Parameters.Clear()

            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to execute the following" & _
                                                                      " SQL...." & _strSQL & vbCrLf & _
                                                                      " Exception is : " & sqlEx.ToString _
                                                                      & vbCrLf)
                Return E_SERVERERROR
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to execute the following" & _
                                                                     " SQL...." & _strSQL & vbCrLf & _
                                                                     " Exception is : " & ex.ToString _
                                                                     & vbCrLf)
                Return E_SERVERERROR
            End Try

            If Not IsDBNull(sqlParms(3).Value) Then
                If sqlParms(3).Value <> "" Then
                    pEmailAddr = sqlParms(3).Value
                End If
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _strSQL = Nothing
            _sqlCmd = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To send the Email Notification for the Recall Items
    ''' </summary>
    ''' <param name="pOrgGroupID"></param>
    ''' <param name="pDeptID"></param>
    ''' <param name="pEmailText"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function SendRecallEmail(ByVal pOrgGroupID As String, ByVal pDeptID As String, _
                                     ByVal pAppID As Integer, ByVal pEmailText As StringBuilder, _
                                     ByVal pSystemID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Long = -1
        Dim _objAtParUtils As AtPar_Utils
        Dim _strRecallEmailID As String = String.Empty

        Try

            _statusCode = GetRecallNotificationEmailID(pOrgGroupID, pDeptID, pAppID, pSystemID, _strRecallEmailID)

            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in GetRecallNotificationEmailID:" & _
                                     "StatusCode is :" & _statusCode & vbCrLf)
                Return E_SERVERERROR
            End If


            If Not String.IsNullOrEmpty(_strRecallEmailID) Then
                _objAtParUtils = New AtPar_Utils

                _statusCode = _objAtParUtils.SendEmail(pSystemID, "AtPar - Recall Notice", pEmailText.ToString, _strRecallEmailID, MailPriority.High)

                If _statusCode <> ATPAR_OK Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in sendEmail:" & _
                                         "StatusCode is :" & _statusCode & vbCrLf)
                    'As WebService will not ReSend the Recall Item(s) again so skipping any Email Config Errors
                End If
            Else
                If log.IsWarnEnabled Then log.Warn(methodBaseName & ": RECALL_NOTIFICATION_EMAIL is not configured. " & _
                                                   "Skipping the Email notification" & vbCrLf)
            End If
            

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _objAtParUtils = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To check the Recall Item(s) in Receive Deviation Table(s)
    ''' </summary>
    ''' <param name="pRecallItems"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function CheckRecallItemsInRecv(ByVal pRecallItems As String, ByVal pSystemID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Long = -1

        Dim _sbSQL As New StringBuilder
        Dim _dsRecallItemsInRecv As New DataSet
        Dim _strRowFilter As String = String.Empty
        Dim _dtFilterRecallData As New DataTable
        Dim _dtFilterOrg As New DataTable

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object :" & _
                                        "Exception is " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try

            With _sbSQL

                .Append("SELECT DISTINCT A.REPORT_DATA_1 AS ORG_GROUP_ID, A.BUSINESS_UNIT, C.ITEM_ID, A.DESCRIPTION, C.LOT_NO, ")
                .Append("C.SERIAL_NO, C.MFG_NAME, C.MFG_CAT_NO, C.ALERT_ID, C.ALERT_TYPE, C.ALERT_CLASS, ")
                .Append("C.ALERT_CATEGORY, C.ALERT_TITLE, C.ALERT_SYNOPSIS, C.ALERT_URL, C.ALERT_DATE, B.EXPIRY_DATE, ")
                .Append("B.QTY, B.RECV_UOM FROM MT_RECV_DEVIATION_HEADER A, MT_RECV_DEVIATION_DETAILS B, MT_ATPAR_RECALL_INFO C ")
                .Append("WHERE A.TRANSACTION_ID = B.TRANSACTION_ID AND A.LINE_NO = B.LINE_NO ")
                .Append("AND A.INV_ITEM_ID = C.ITEM_ID AND B.SERIAL_ID = C.SERIAL_NO AND B.LOT_ID = C.LOT_NO ")
                .Append("AND C.ITEM_ID IN (" & pRecallItems & ") ORDER BY A.REPORT_DATA_1, A.BUSINESS_UNIT, C.ITEM_ID ")

            End With

            Try
                If log.IsInfoEnabled Then log.Info(vbCrLf & methodBaseName & " :Getting the Recall item details " & _
                             "from MT_RECV_DEVIATION_HEADER with following SQL :" & vbCrLf & _sbSQL.ToString & vbCrLf)

                _dsRecallItemsInRecv = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to to get the item details from " & _
                                                        "MT_RECV_DEVIATION_HEADER table with following SQL " & vbCrLf & _
                                                        "Exception is : " & ex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Finally
                _sbSQL.Remove(0, _sbSQL.Length)
            End Try

            If _dsRecallItemsInRecv.Tables(0).Rows.Count > 0 Then

                _dtFilterOrg = _dsRecallItemsInRecv.Tables(0).DefaultView.ToTable(True, "ORG_GROUP_ID", "BUSINESS_UNIT")

                For intCnt As Integer = 0 To _dtFilterOrg.Rows.Count - 1

                    _strRowFilter = String.Empty

                    _strRowFilter = "ORG_GROUP_ID = '" & _dtFilterOrg.Rows(intCnt).Item("ORG_GROUP_ID").ToString & "' AND BUSINESS_UNIT = '" & _dtFilterOrg.Rows(intCnt).Item("BUSINESS_UNIT").ToString & "' "

                    If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Filtering the RecallItems with :" & _strRowFilter)

                    Dim _dvFilter As DataView = New DataView(_dsRecallItemsInRecv.Tables(0), _strRowFilter, "", DataViewRowState.CurrentRows)

                    _dtFilterRecallData = _dvFilter.ToTable

                    _statusCode = BuildEmailText(_dtFilterRecallData, pRecallItems, _
                                                 _dtFilterOrg.Rows(intCnt).Item("ORG_GROUP_ID").ToString, _
                                                 String.Empty, EnumApps.Receiving, Nothing, Nothing, pSystemID)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in BuildEmailText:" & _
                                                             "StatusCode is :" & _statusCode & vbCrLf)
                        Return _statusCode
                    End If

                    _dtFilterRecallData.Clear()

                Next

            Else
                If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Recall Item(s) are not exists in Receive Deviation :")
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
            _dsRecallItemsInRecv = Nothing
            _dtFilterRecallData = Nothing
            _dtFilterOrg = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To Build and Send Email Notification for the Recall Items
    ''' </summary>
    ''' <param name="pdtRecallData"></param>
    ''' <param name="pstrRecallItems"></param>
    ''' <param name="pOrgGroupID"></param>
    ''' <param name="pDeptID"></param>
    ''' <param name="pAppID"></param>
    ''' <param name="pdsCartBinLocDtls"></param>
    ''' <param name="pdsProdUtilDtls"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function BuildEmailText(ByVal pdtRecallData As DataTable, ByVal pstrRecallItems As String, _
                                    ByVal pOrgGroupID As String, ByVal pDeptID As String, _
                                    ByVal pAppID As Integer, ByVal pdsCartBinLocDtls As DataSet, _
                                    ByVal pdsProdUtilDtls As DataSet, ByVal pSystemID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Long = -1

        Dim _arSplitItems() As String
        Dim _drFilterItems() As DataRow
        Dim _drBinLoc() As DataRow
        Dim _drProdUtilities() As DataRow

        Dim _sbRecallHeader As New StringBuilder
        Dim _sbRecallInfo As New StringBuilder
        Dim _sbStrLocHeader As New StringBuilder
        Dim _sbStrLocInfo As New StringBuilder
        Dim _sbProdUtilHeader As New StringBuilder
        Dim _sbProdUtilInfo As New StringBuilder
        Dim _sbHtmlString As New StringBuilder
        Dim _sbEmailText As New StringBuilder
        Dim _intRowSpan As Integer = 0

        Dim _strLotNO As String = "DEFAULT"
        Dim _strSerialNO As String = "DEFAULT"
        Dim _strStrgloc As String = "DEFAULT"
        Dim _strStrgBinloc As String = "DEFAULT"

        Dim _strBinLoc As String = String.Empty
        Dim _strUom As String = String.Empty
        Dim _strItemDescr As String = String.Empty
        Dim _strQty As String = String.Empty
        Dim _strSearch As String = String.Empty
        Dim _arrLstItems As New ArrayList

        With _sbRecallHeader
            .Append("<tr><td>")
            .Append("<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top><tr><td>")
            .Append("<table align=left width=100% style=" & Chr(34) & "BORDER-COLLAPSE:collapse" & Chr(34) & " border=1 bordercolor=black>")
            .Append("<tr bgcolor=#D0A9F5>")
            .Append("<td align=left nowrap colspan=8><span class=c2><b>Recall Notice</b></span></td></tr>")
            .Append("<tr>")
            .Append("<td align=left nowrap><span class=c2><b>Alert Date - ID</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Product - Description</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Manufacturer</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Lot#</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Serial#</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Exp Date</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Synopsis</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Alert URL</b></span></td></tr>")
        End With

        With _sbStrLocHeader
            .Append("<tr><td>")
            .Append("<table align=left width=100% style=" & Chr(34) & "BORDER-COLLAPSE:collapse" & Chr(34) & " border=1 bordercolor=black>")
            .Append("<tr bgcolor=#D0A9F5>")
            .Append("<td align=left nowrap colspan=8><span class=c2><b>Storage Location</b></span></td></tr>")
            .Append("<tr>")
            .Append("<td align=left nowrap colspan =2><span class=c2><b>Par Location</b></span></td>")
            .Append("<td align=left nowrap colspan =2><span class=c2><b>Bin Location</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Lot#</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Serial#</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Exp Date</b></span></td>")
            .Append("<td align=left nowrap><span class=c2><b>Quantity</b></span></td></tr>")
        End With

        If pAppID = EnumApps.PointOfUse Then
            With _sbProdUtilHeader
                .Append("<tr><td>")
                .Append("<table align=left width=100% style=" & Chr(34) & "BORDER-COLLAPSE:collapse" & Chr(34) & " border=1 bordercolor=black>")
                .Append("<tr bgcolor=#D0A9F5>")
                .Append("<td align=left nowrap colspan=8><span class=c2><b>Product Utilization</b></span></td></tr>")
                .Append("<tr>")
                .Append("<td align=left nowrap colspan =2><span class=c2><b>Transaction Date</b></span></td>")
                .Append("<td align=left nowrap colspan =2><span class=c2><b>Patient ID</b></span></td>")
                .Append("<td align=left nowrap colspan =2><span class=c2><b>Lot#</b></span></td>")
                .Append("<td align=left nowrap colspan =2><span class=c2><b>Serial#</b></span></td></tr>")
            End With
        End If

        Try

            _arSplitItems = pstrRecallItems.Split(",")
            For intCnt As Integer = 0 To _arSplitItems.Length - 1
                If Not _arrLstItems.Contains(_arSplitItems(intCnt)) Then
                    _arrLstItems.Add(_arSplitItems(intCnt))
                End If
            Next

            For intCnt As Integer = 0 To _arrLstItems.Count - 1

                _drFilterItems = pdtRecallData.Select("ITEM_ID = " & _arrLstItems.Item(intCnt) & "")

                If _drFilterItems.Length > 0 Then
                    _intRowSpan = _drFilterItems.Length
                    For intRowCnt As Integer = 0 To _drFilterItems.Length - 1
                        If pAppID = EnumApps.StockIssue Then
                            If _strLotNO = _drFilterItems(intRowCnt).Item("LOT_NO").ToString And _
                              _strSerialNO = _drFilterItems(intRowCnt).Item("SERIAL_NO").ToString And _
                              _strStrgloc = _drFilterItems(intRowCnt).Item("STORAGE_LOCATION").ToString And _
                              _strStrgBinloc = _drFilterItems(intRowCnt).Item("BIN_LOCATION").ToString Then
                                Continue For
                            End If
                        Else
                            If _strLotNO = _drFilterItems(intRowCnt).Item("LOT_NO").ToString And _
                                           _strSerialNO = _drFilterItems(intRowCnt).Item("SERIAL_NO").ToString Then
                                Continue For
                            End If
                        End If

                        If pAppID = EnumApps.PointOfUse Then
                            _strBinLoc = String.Empty
                            _strUom = String.Empty
                            _strItemDescr = String.Empty
                            _strQty = String.Empty

                            If pdsCartBinLocDtls.Tables.Count > 0 Then
                                If pdsCartBinLocDtls.Tables(0).Rows.Count > 0 Then

                                    _drBinLoc = pdsCartBinLocDtls.Tables("DETAILS").Select("[" & Get_Cart_Detail_Enum.INV_ITEM_ID & "] = '" & _drFilterItems(intRowCnt).Item("ITEM_ID").ToString & "'")

                                    If _drBinLoc.Length > 0 Then
                                        _strBinLoc = _drBinLoc(0).Item(Get_Cart_Detail_Enum.COMPARTMENT).ToString
                                        _strUom = _drBinLoc(0).Item(Get_Cart_Detail_Enum.UOM).ToString
                                        _strItemDescr = _drBinLoc(0).Item(Get_Cart_Detail_Enum.ITEM_DESCR).ToString
                                    End If

                                End If
                            End If
                            _strQty = _drFilterItems(intRowCnt).Item("ITEM_QUANTITY_ON_HAND").ToString()
                        ElseIf pAppID = EnumApps.StockIssue Then
                            _strUom = String.Empty
                            _strQty = String.Empty
                            _strItemDescr = String.Empty
                            _strUom = _drFilterItems(intRowCnt).Item("UOM").ToString()
                            _strQty = _drFilterItems(intRowCnt).Item("QTY").ToString()
                            _strItemDescr = _drFilterItems(intRowCnt).Item("DESCRIPTION").ToString
                        Else
                            _strUom = String.Empty
                            _strQty = String.Empty
                            _strItemDescr = String.Empty
                            _strUom = _drFilterItems(intRowCnt).Item("RECV_UOM").ToString()
                            _strQty = _drFilterItems(intRowCnt).Item("QTY").ToString()
                            _strItemDescr = _drFilterItems(intRowCnt).Item("DESCRIPTION").ToString
                        End If
                        If _strLotNO = _drFilterItems(intRowCnt).Item("LOT_NO").ToString And _
                           _strSerialNO = _drFilterItems(intRowCnt).Item("SERIAL_NO").ToString Then
                        Else
                            With _sbRecallInfo
                                .Append("<tr>")
                                If intRowCnt = 0 Then
                                    .Append("<td rowspan = " & _intRowSpan & " align=left width = 100px><span class=c2>" & _drFilterItems(intRowCnt).Item("ALERT_DATE").ToString & "-" & _drFilterItems(intRowCnt).Item("ALERT_ID").ToString & "</span></td>")
                                    .Append("<td rowspan = " & _intRowSpan & " align=left width = 100px><span class=c2>" & _drFilterItems(intRowCnt).Item("ITEM_ID").ToString & " - " & _strItemDescr & "</span></td>")
                                    .Append("<td rowspan = " & _intRowSpan & " align=left width = 100px><span class=c2>" & _drFilterItems(intRowCnt).Item("MFG_NAME").ToString & "</span></td>")
                                End If
                                .Append("<td align=left width = 50px><span class=c2>" & IIf(String.IsNullOrEmpty(_drFilterItems(intRowCnt).Item("LOT_NO").ToString), "&nbsp;", _drFilterItems(intRowCnt).Item("LOT_NO").ToString) & "</span></td>")
                                .Append("<td align=left width = 50px><span class=c2>" & IIf(String.IsNullOrEmpty(_drFilterItems(intRowCnt).Item("SERIAL_NO").ToString), "&nbsp;", _drFilterItems(intRowCnt).Item("SERIAL_NO").ToString) & "</span></td>")
                                .Append("<td align=left width = 100px><span class=c2>" & IIf(String.IsNullOrEmpty(_drFilterItems(intRowCnt).Item("EXPIRY_DATE").ToString), "&nbsp;", _drFilterItems(intRowCnt).Item("EXPIRY_DATE").ToString) & "</span></td>")
                                If intRowCnt = 0 Then
                                    .Append("<td rowspan = " & _intRowSpan & " align=left width = 400px><span class=c2>" & _drFilterItems(intRowCnt).Item("ALERT_SYNOPSIS").ToString & "</span></td>")
                                    .Append("<td rowspan = " & _intRowSpan & " align=left width = 300px ><span class=c2>" & _drFilterItems(intRowCnt).Item("ALERT_URL").ToString & "</span>")
                                End If
                                .Append("</tr>")
                            End With
                        End If
                        With _sbStrLocInfo
                            .Append("<tr>")
                            If pAppID = EnumApps.Receiving Then
                                .Append("<td align=left colspan =2><span class=c2>&nbsp;</span></td>") 'CartID
                                .Append("<td align=left colspan =2><span class=c2>&nbsp;</span></td>") 'BinLoc
                            ElseIf pAppID = EnumApps.StockIssue Then
                                .Append("<td align=left colspan =2><span class=c2>" & _drFilterItems(intRowCnt).Item("STORAGE_LOCATION").ToString & "</span></td>") 'STORAGE_LOCATION
                                .Append("<td align=left colspan =2><span class=c2>" & _drFilterItems(intRowCnt).Item("BIN_LOCATION").ToString & "</span></td>") 'ISSUE TO LOCATION
                            Else
                                .Append("<td align=left colspan =2><span class=c2>" & _drFilterItems(intRowCnt).Item("CART_ID").ToString & "</span></td>")
                                .Append("<td align=left colspan =2><span class=c2>" & IIf(String.IsNullOrEmpty(_strBinLoc), "&nbsp;", _strBinLoc) & "</span></td>")
                            End If

                            .Append("<td align=left><span class=c2>" & IIf(String.IsNullOrEmpty(_drFilterItems(intRowCnt).Item("LOT_NO").ToString), "&nbsp;", _drFilterItems(intRowCnt).Item("LOT_NO").ToString) & "</span></td>")
                            .Append("<td align=left><span class=c2>" & IIf(String.IsNullOrEmpty(_drFilterItems(intRowCnt).Item("SERIAL_NO").ToString), "&nbsp;", _drFilterItems(intRowCnt).Item("SERIAL_NO").ToString) & "</span></td>")
                            .Append("<td align=left><span class=c2>" & IIf(String.IsNullOrEmpty(_drFilterItems(intRowCnt).Item("EXPIRY_DATE").ToString), "&nbsp;", _drFilterItems(intRowCnt).Item("EXPIRY_DATE").ToString) & "</span></td>")
                            .Append("<td align=left><span class=c2>" & _strQty & "-" & _strUom & "</span></td>")
                            .Append("</tr>")
                        End With

                        If pAppID = EnumApps.PointOfUse Then
                            If pdsProdUtilDtls.Tables(0).Rows.Count > 0 Then
                                _strSearch = String.Empty
                                _strSearch = "ITEM_ID = '" & _drFilterItems(intRowCnt).Item("ITEM_ID").ToString & "' " & _
                                             "AND ITEM_LOTNUMBER = '" & _drFilterItems(intRowCnt).Item("LOT_NO").ToString & "' " & _
                                             "AND ITEM_SRNUMBER = '" & _drFilterItems(intRowCnt).Item("SERIAL_NO").ToString & "'"

                                _drProdUtilities = pdsProdUtilDtls.Tables(0).Select(_strSearch)

                                If _drProdUtilities.Length > 0 Then
                                    For intdrCnt As Integer = 0 To _drProdUtilities.Length - 1
                                        With _sbProdUtilInfo
                                            .Append("<tr>")
                                            .Append("<td align=left colspan =2><span class=c2>" & IIf(String.IsNullOrEmpty(_drProdUtilities(intdrCnt).Item("UPDATE_DATE").ToString), "&nbsp;", _drProdUtilities(intdrCnt).Item("UPDATE_DATE").ToString) & "</span></td>")
                                            .Append("<td align=left colspan =2><span class=c2>" & IIf(String.IsNullOrEmpty(_drProdUtilities(intdrCnt).Item("PATIENT_ID").ToString), "&nbsp;", _drProdUtilities(intdrCnt).Item("PATIENT_ID").ToString) & "</span></td>")
                                            .Append("<td align=left colspan =2><span class=c2>" & IIf(String.IsNullOrEmpty(_drFilterItems(intRowCnt).Item("LOT_NO").ToString), "&nbsp;", _drFilterItems(intRowCnt).Item("LOT_NO").ToString) & "</span></td>")
                                            .Append("<td align=left colspan =2><span class=c2>" & IIf(String.IsNullOrEmpty(_drFilterItems(intRowCnt).Item("SERIAL_NO").ToString), "&nbsp;", _drFilterItems(intRowCnt).Item("SERIAL_NO").ToString) & "</span></td>")
                                            .Append("</tr>")
                                        End With
                                    Next
                                End If

                            End If
                        End If

                        _strLotNO = _drFilterItems(intRowCnt).Item("LOT_NO").ToString
                        _strSerialNO = _drFilterItems(intRowCnt).Item("SERIAL_NO").ToString
                        If pAppID = EnumApps.StockIssue Then
                            _strStrgloc = _drFilterItems(intRowCnt).Item("STORAGE_LOCATION").ToString
                            _strStrgBinloc = _drFilterItems(intRowCnt).Item("BIN_LOCATION").ToString
                        End If
                    Next

                    _sbHtmlString.Append(_sbRecallHeader)
                    _sbHtmlString.Append(_sbRecallInfo)
                    _sbHtmlString.Append("</table>")
                    _sbHtmlString.Append("</td></tr>")
                    _sbHtmlString.Append(_sbStrLocHeader)
                    _sbHtmlString.Append(_sbStrLocInfo)
                    _sbHtmlString.Append("</table>")
                    _sbHtmlString.Append("</td></tr>")

                    If pAppID = EnumApps.PointOfUse Then
                        If _sbProdUtilInfo.Length > 0 Then
                            _sbHtmlString.Append(_sbProdUtilHeader)
                            _sbHtmlString.Append(_sbProdUtilInfo)
                            _sbHtmlString.Append("</table>")
                            _sbHtmlString.Append("</td></tr>")
                        End If
                    End If

                    _sbHtmlString.Append("</Table>")
                    _sbHtmlString.Append("</td></tr>")

                    _sbRecallInfo.Remove(0, _sbRecallInfo.Length)
                    _sbStrLocInfo.Remove(0, _sbStrLocInfo.Length)
                    _sbProdUtilInfo.Remove(0, _sbProdUtilInfo.Length)


                End If

            Next

            _sbEmailText.Append("<Table>")
            _sbEmailText.Append(_sbHtmlString.ToString)
            _sbEmailText.Append("</Table>")

            '// To Send the Recall Email Notification for Recall Item(s) //'
            _statusCode = SendRecallEmail(pOrgGroupID, pDeptID, pAppID, _sbEmailText, pSystemID)

            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in SendRecallEmail:" & _
                                                     "StatusCode is :" & _statusCode & vbCrLf)
                'As WebService will not ReSend the Recall Item(s) again so skipping any Email Config Errors
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbRecallHeader = Nothing
            _sbRecallInfo = Nothing
            _sbStrLocHeader = Nothing
            _sbStrLocInfo = Nothing
            _sbProdUtilHeader = Nothing
            _sbProdUtilInfo = Nothing
            _sbHtmlString = Nothing
            _sbEmailText = Nothing
            _drFilterItems = Nothing
            _drBinLoc = Nothing
            _arSplitItems = Nothing
            _drProdUtilities = Nothing
            _arrLstItems = Nothing
        End Try

    End Function

    Private Function CheckRecallItemsInStkIssue(ByVal pRecallItems As String, ByVal pSystemID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Long = -1

        Dim _sbSQL As New StringBuilder
        Dim _dsRecallItemsInStk As New DataSet
        Dim _strRowFilter As String = String.Empty
        Dim _dtFilterRecallData As New DataTable
        Dim _dtFilterOrg As New DataTable

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object :" & _
                                        "Exception is " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try

            With _sbSQL
                .Append("SELECT DISTINCT D.ORG_GROUP_ID,A.BUSINESS_UNIT, C.ITEM_ID, '' AS DESCRIPTION,")
                .Append("C.LOT_NO,C.SERIAL_NO, C.MFG_NAME, C.MFG_CAT_NO, C.ALERT_ID, C.ALERT_TYPE,")
                .Append("C.ALERT_CLASS,C.ALERT_CATEGORY, C.ALERT_TITLE, C.ALERT_SYNOPSIS, C.ALERT_URL,")
                .Append("C.ALERT_DATE, CONVERT(VARCHAR(10),B.EXPIRY_DATE,101) AS EXPIRY_DATE,SUM(B.QTY) AS QTY, B.UOM,")
                .Append("B.STORAGE_LOCATION,A.REPORT_DATA_3 AS BIN_LOCATION ")
                .Append("FROM MT_ATPAR_TRANSACTION A,MT_STIS_DETAILS B,")
                .Append("MT_ATPAR_RECALL_INFO C,MT_ATPAR_ORG_GROUP_BUNITS D ")
                .Append("WHERE A.APP_ID = ").Append(EnumApps.StockIssue)
                .Append(" AND A.TRANSACTION_ID = B.TRANSACTION_ID ")
                .Append("AND A.BUSINESS_UNIT = D.BUSINESS_UNIT AND B.ITEM_ID = C.ITEM_ID ")
                .Append("AND B.SERIAL_ID = C.SERIAL_NO AND B.LOT_ID = C.LOT_NO ")
                .Append("AND C.ITEM_ID IN (" & pRecallItems & ") ")
                .Append(" GROUP BY D.ORG_GROUP_ID,A.BUSINESS_UNIT,C.ITEM_ID,C.LOT_NO,C.SERIAL_NO,")
                .Append("C.MFG_NAME, C.MFG_CAT_NO, C.ALERT_ID, C.ALERT_TYPE,C.ALERT_CLASS,C.ALERT_CATEGORY,")
                .Append("C.ALERT_TITLE, C.ALERT_SYNOPSIS, C.ALERT_URL,C.ALERT_DATE, B.EXPIRY_DATE,")
                .Append("B.UOM,B.STORAGE_LOCATION,A.REPORT_DATA_3 ")
                .Append(" ORDER BY D.ORG_GROUP_ID, A.BUSINESS_UNIT, C.ITEM_ID ,C.LOT_NO,C.SERIAL_NO")

            End With

            Try
                If log.IsInfoEnabled Then log.Info(vbCrLf & methodBaseName & " :Getting the Recall item details " & _
                             "from MT_STIS_DETAILS with following SQL :" & vbCrLf & _sbSQL.ToString & vbCrLf)

                _dsRecallItemsInStk = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to to get the item details from " & _
                                                        "MT_STIS_DETAILS table with following SQL " & vbCrLf & _
                                                        "Exception is : " & ex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Finally
                _sbSQL.Remove(0, _sbSQL.Length)
            End Try

            If _dsRecallItemsInStk.Tables(0).Rows.Count > 0 Then

                _dtFilterOrg = _dsRecallItemsInStk.Tables(0).DefaultView.ToTable(True, "ORG_GROUP_ID", "BUSINESS_UNIT")

                For intCnt As Integer = 0 To _dtFilterOrg.Rows.Count - 1

                    _strRowFilter = String.Empty

                    _strRowFilter = "ORG_GROUP_ID = '" & _dtFilterOrg.Rows(intCnt).Item("ORG_GROUP_ID").ToString & "' AND BUSINESS_UNIT = '" & _dtFilterOrg.Rows(intCnt).Item("BUSINESS_UNIT").ToString & "' "

                    If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Filtering the RecallItems with :" & _strRowFilter)

                    Dim _dvFilter As DataView = New DataView(_dsRecallItemsInStk.Tables(0), _strRowFilter, "", DataViewRowState.CurrentRows)

                    _dtFilterRecallData = _dvFilter.ToTable

                    _statusCode = BuildEmailText(_dtFilterRecallData, pRecallItems, _
                                                 _dtFilterOrg.Rows(intCnt).Item("ORG_GROUP_ID").ToString, _
                                                 String.Empty, EnumApps.StockIssue, Nothing, Nothing, pSystemID)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in BuildEmailText:" & _
                                                             "StatusCode is :" & _statusCode & vbCrLf)
                        Return _statusCode
                    End If

                    _dtFilterRecallData.Clear()

                Next

            Else
                If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Recall Item(s) are not exists in Receive Deviation :")
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
            _dsRecallItemsInStk = Nothing
            _dtFilterRecallData = Nothing
            _dtFilterOrg = Nothing
        End Try


    End Function

#End Region

End Class

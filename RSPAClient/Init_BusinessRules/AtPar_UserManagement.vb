#Region "Imports"
Imports System.AppDomain
Imports System.Xml
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports Microsoft.ApplicationBlocks.Data
Imports System.Reflection
Imports System.Diagnostics
Imports System.Threading
Imports AtPar_BusinessRules_RemotingProxy
Imports Atpar_EncryptionServices
Imports System.IO
Imports System.Security
Imports System.DirectoryServices
Imports System
Imports System.Text
Imports Microsoft.VisualBasic
Imports System.Runtime.InteropServices
Imports Microsoft.Win32
Imports log4net
Imports System.Data.Odbc
Imports System.Data
Imports System.Collections
#End Region

#Region "Bug Fix(s)"
'RT-0003809-05/19/2008
'DK-0004072-06/09/2008- GetUsers function _strSQL
'SM-0004070 06/15/2008- SSO Integration
'SM-0004194 07/07/2008
'SM-0004192 07/07/2008
'NB-0004382 09/19/2008
'NB-0004558 09/25/2008
'HK-0004113-09/30/2008
'SM-0004756-10/07/2008
'NB-0004892-10/10/2008
'NB-0004523-10/14/2008
'NB-0004950-10/24/2008
'RK-0005045-11/11/2008
'RK-0005428-01/28/2009
'NB-0005446-01/30/2009
'NB-0005685-02/17/2009
'SM-0005620-02/17/2009
'NB-0005519-02/20/2009
'NB-0005339-02/23/2009
'NB-0005339-03/05/2009
'DK-0005948-03/12/2009
'NB-0006027-03/14/2009


#End Region

#Region "UserManagement Class implementation section"
Public Class AtPar_UserManagement
    Inherits AtPar_Application_Base
    Implements IAtPar_UserManagement
    Implements IDisposable


    Private disposedValue As Boolean = False        ' To detect redundant calls
    Private Const CONST_ATPAR As String = "Atpar"
  
#Region " IDisposable Support "
    ' This code added by Visual Basic to correctly implement the disposable pattern.
    Public Sub Dispose() Implements IDisposable.Dispose
        ' Do not change this code.  Put cleanup code in Dispose(ByVal disposing As Boolean) above.
        Dispose(True)
        GC.SuppressFinalize(Me)
    End Sub
#End Region

    ' IDisposable
    Protected Overridable Sub Dispose(ByVal disposing As Boolean)
        If Not Me.disposedValue Then
            If disposing Then

                Dim stackFrame As New StackFrame()
                Dim methodBase As MethodBase = stackFrame.GetMethod()
                Dim methodBaseName As String = methodBase.Name

                ' TODO: close out the SQL connection
                'Discard log4net filter value
            End If

            ' TODO: free shared unmanaged resources
        End If
        Me.disposedValue = True
    End Sub


    Private sqlConnect As SqlConnection
    Private sqlStr As String
    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_UserManagement))

    Public Const TIME_ZONE_ID_UNKNOWN = 0
    Public Const TIME_ZONE_ID_STANDARD = 1
    Public Const TIME_ZONE_ID_INVALID = &HFFFFFFFF
    Public Const TIME_ZONE_ID_DAYLIGHT = 2

    Dim _className As String
    Dim _classType As Type
    Dim _reflectObject As Object
    Dim _methodName As MethodInfo

    Declare Auto Sub GetSystemTime Lib "Kernel32.dll" (ByRef sysTime As systemtime)
    <DllImport("Kernel32.dll")> _
Public Shared Function GetTimeZoneInformation(ByRef lpTimeZoneInformation As TIME_ZONE_INFORMATION) As UInteger

    End Function
    <StructLayout(LayoutKind.Sequential, CharSet:=CharSet.Unicode)> _
       Public Structure TIME_ZONE_INFORMATION
        <MarshalAs(UnmanagedType.I4)> _
        Public Bias As Int32
        <MarshalAs(UnmanagedType.ByValTStr, SizeConst:=32)> _
        Public StandardName As String
        Public StandardDate As systemtime
        <MarshalAs(UnmanagedType.I4)> _
        Public StandardBias As Int32
        <MarshalAs(UnmanagedType.ByValTStr, SizeConst:=32)> _
        Public DaylightName As String
        Public DaylightDate As systemtime
        <MarshalAs(UnmanagedType.I4)> _
        Public DaylightBias As Int32
    End Structure
    <StructLayout(LayoutKind.Sequential)> Public Structure systemtime
        Public wyear As Short
        Public wmonth As Short
        Public wdayofweek As Short
        Public wday As Short
        Public whour As Short
        Public wminute As Short
        Public wsecond As Short
        Public wmilliseconds As Short
    End Structure

    Public Enum TimeZoneReturn
        TimeZoneCode = 0
        TimeZoneName = 1
        UTC_BaseOffset = 2
        UTC_Offset = 3
        DST_Active = 4
        DST_Offset = 5
    End Enum

    Sub New()

        log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.Init.ToString()

    End Sub

    ''' <summary>
    ''' To Get Roles of the User for Each Application
    ''' </summary>
    ''' <param name="dsUser">DataSet Contains Application Users Details</param>
    ''' <param name="userId">UserId for the Application</param>
    ''' <param name="roleId">RoleId of the User</param>
    ''' <param name="appId">Application Id</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetUserAppRoleACL(ByRef dsUser As DataSet, Optional ByVal userId As String = "", _
                                      Optional ByVal roleId As String = "", _
                                      Optional ByVal appId As Long = 0) As Long _
                                      Implements IAtPar_UserManagement.GetUserAppRoleACL

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = userId

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        _strSQL = "SELECT DISTINCT A.USER_ID, A.FIRST_NAME, A.LAST_NAME, " & _
                    " A.FIRST_NAME + ' ' + A.LAST_NAME + ' (' + A.USER_ID + ')' AS FULLNAME " & _
                    " FROM MT_ATPAR_USER A,  MT_ATPAR_USER_APP_ACL B, MT_ATPAR_USER_ACL C " & _
                    "WHERE A.USER_ID = B.USER_ID AND A.USER_ID = C.USER_ID  AND C.ACCOUNT_DISABLED = 0  "

        If Len(userId) > 0 Then
            _strSQL &= " AND A.USER_ID IN (SELECT CLIENT_USER FROM MT_ATPAR_USER_GROUPS " & _
                       " WHERE SERVER_USER = '" & userId & "' AND APP_ID = " & appId & ")"
        End If

        If Len(roleId) > 0 Then
            _strSQL &= " AND B.APP_ID = " & appId
        ElseIf roleId = "ADMIN" Then
            _strSQL &= " AND B.ROLE_ID ='ADMIN'"
        Else
            _strSQL &= " AND B.ROLE_ID ='" & roleId & "'" & " AND B.APP_ID = " & appId
        End If

        If log.IsInfoEnabled Then log.Info(methodBaseName & ":" & _strSQL)

        Try
            dsUser = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                 _strSQL & vbCrLf & "Exception is : " & sqlex.tostring & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' To get the BusinessUnit of the Organisation, called by mt_atpar_manage_org_group_bunits.aspx
    ''' </summary>
    ''' <param name="pUserID">User ID</param>
    ''' <param name="pOrggrpID">GroupId of Organisation</param>
    ''' <param name="pDsOrgBUnits">Dataset containing BusinessUnit of the Organisation </param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetOrgBUnits(ByVal pUserID As String, ByVal pOrggrpID As String, _
                                 ByRef pDsOrgBUnits As DataSet, ByVal pDeviceTokenEntry() As String) As Integer _
                                 Implements IAtPar_UserManagement.GetOrgBUnits

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New Diagnostics.StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim dsLocalDataset As Data.DataSet ' Middle Tire Dataset
        Dim intCount As Integer
        Dim intCnt As Integer
        Dim _strSQL As String = String.Empty
        Dim _StatusCode As Long
        Dim strOutXml As String
        Dim _strInXml As String = "<ROOT></ROOT>"
        Dim _remoteAtparObj As String
        Dim _remoteDBType As String
        Dim _erpObjAssy As Assembly

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _remoteAtparObj = CONST_ATPAR & "_" & GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), _
                          CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.DOWNLOADFROM.ToString())

        _remoteDBType = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.REMOTEDBCONNECTION.ToString(), REMOTEDBCONNECTION.DATABASE.ToString())

        Try
            CreateERPObject(_remoteAtparObj, _erpObjAssy)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Create ERP Object .... " & _remoteAtparObj _
                                & vbCrLf & "Exception thrown is..." & ex.ToString)
            Return E_SERVERERROR
        End Try

        'For Atpar_FileInterface, Atpar_XML , Atpar_ASCII no RemoteDB details exists
        Dim _blnErpFlag As Boolean = False
        If _remoteAtparObj <> Erp_Obj_Name.Atpar_FileInterface.ToString And _
                _remoteAtparObj <> Erp_Obj_Name.Atpar_XML.ToString And _
                 _remoteAtparObj <> Erp_Obj_Name.Atpar_ASCII.ToString And _
                _remoteAtparObj <> Erp_Obj_Name.Atpar_IMMS.ToString Then
            _blnErpFlag = True
            If _remoteDBType = "NONE" Or String.IsNullOrEmpty(_remoteDBType) Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " ERP Information Missing")
                Return E_REMOTEERROR
            End If

        End If

        If log.IsDebugEnabled Then log.Debug(methodBaseName & ":ErpObj:" & _remoteAtparObj & ":_blnErpFlag:" & _blnErpFlag & ":")

        'creating the remote obj which is specified in the config.xml, implementation of Reflection
        Try
            _className = _remoteAtparObj & ".GetBUnits"
            _classType = _erpObjAssy.GetType(_className)

            _methodName = _classType.GetMethod("GetBUnits")
            _reflectObject = Activator.CreateInstance(_classType)
            If Not _blnErpFlag Then
                Dim args As Object() = {_strInXml, strOutXml, pDeviceTokenEntry}
                _StatusCode = _methodName.Invoke(_reflectObject, args)
                strOutXml = args(1)
            Else
                Dim args As Object() = {strOutXml, pDeviceTokenEntry}
                _StatusCode = _methodName.Invoke(_reflectObject, args)
                strOutXml = args(0)
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Remote Object Instance Create Failed " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _reflectObject = Nothing
        End Try

        If _StatusCode <> ATPAR_OK Then
            If log.IsWarnEnabled Then log.Warn(_StatusCode)
            Return _StatusCode
        End If

        'SM-0005620
        _strSQL = " SELECT BUSINESS_UNIT , BU_TYPE FROM MT_ATPAR_ORG_GROUP_BUNITS " & _
                  " WHERE ORG_GROUP_ID = '" & pOrggrpID & "' " & _
                  " ORDER BY BUSINESS_UNIT ASC "
        'RK-0005428
        If log.IsInfoEnabled Then log.Info(_strSQL)
        Try
            dsLocalDataset = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
        Catch sqlex As SqlException
            GetOrgBUnits = ATPAR_E_LOCALDBSELECTFAIL
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                 _strSQL & vbCrLf & "Exception is : " & sqlex.tostring & vbCrLf)
            Throw New Exception("GetOrgBUnits Failed", sqlex)
        Catch ex As Exception
            GetOrgBUnits = E_SERVERERROR
            Throw New Exception("GetOrgBUnits Failed", ex)
        End Try

        'Declaring and Initializing the DataTable and its contents - rows and columns
        Dim dtBUnits As DataTable = New DataTable("Table")
        Dim dcRow As DataRow
        Dim dcColumn1 As DataColumn = New DataColumn("BUSINESS_UNIT", System.Type.GetType("System.String"))
        Dim dcColumn2 As DataColumn = New DataColumn("DESCR", System.Type.GetType("System.String"))
        Dim dcColumn3 As DataColumn = New DataColumn("BU_TYPE", System.Type.GetType("System.String"))
        Dim dcColumn4 As DataColumn = New DataColumn("CHK_VALUE", System.Type.GetType("System.Int32"))
        dcColumn4.DefaultValue = 0
        Dim dcColumn5 As DataColumn = New DataColumn("ROWINDEX", System.Type.GetType("System.Int32"))
        dcColumn5.DefaultValue = 0


        dtBUnits.Columns.Add(dcColumn1)
        dtBUnits.Columns.Add(dcColumn2)
        dtBUnits.Columns.Add(dcColumn3)
        dtBUnits.Columns.Add(dcColumn4)
        dtBUnits.Columns.Add(dcColumn5)

        'Creating XML Document object
        Dim Doc As New XmlDocument
        Dim xmlNodeList As XmlNodeList
        Dim xmlNode As XmlNode
        Dim strFormattedString As String = String.Empty

        'Replacing '&' with 'amp;' to avoid errors in XML document creation
        strOutXml = strOutXml.Replace("&", "amp;")

        If log.IsDebugEnabled Then log.Debug("New String: " & strOutXml)

        Try
            Doc.Load(New StringReader(strOutXml))
            If Not _blnErpFlag Then
                xmlNodeList = Doc.SelectNodes("/ROOT/HEADER")
            Else
                xmlNodeList = Doc.SelectNodes("/ROOT/BUSINESS_UNIT/RECORD")
            End If


            For Each xmlNode In xmlNodeList
                If xmlNode.HasChildNodes Then
                    dcRow = dtBUnits.NewRow()
                    dcRow.Item("BUSINESS_UNIT") = xmlNode.ChildNodes(0).InnerText
                    strFormattedString = xmlNode.ChildNodes(1).InnerText.Replace("amp;", "&")
                    dcRow.Item("DESCR") = strFormattedString
                    dcRow.Item("BU_TYPE") = xmlNode.ChildNodes(2).InnerText
                End If
                dtBUnits.Rows.Add(dcRow)
            Next

        Catch ex As XmlException
            If GetOrgBUnits = E_XMLSTRINGNOTLOADED Then
                If log.IsWarnEnabled Then log.Warn("E_XMLSTRINGNOTLOADED :" & ex.ToString)
            Else
                If log.IsWarnEnabled Then log.Warn("XML ERROR :" & ex.ToString)
            End If
            Exit Function

        Finally
            strFormattedString = String.Empty

        End Try

        'Assigning DataTable to DataSet
        pDsOrgBUnits = New DataSet
        pDsOrgBUnits.Tables.Add(dtBUnits)

        Try
            ' Checking whether  Middle Tire DataBase is NULL or not
            If dsLocalDataset.Tables(0).Rows.Count = 0 Then
                For intCount = 0 To pDsOrgBUnits.Tables(0).Rows.Count - 1
                    pDsOrgBUnits.Tables(0).Rows(intCount).Item("CHK_VALUE") = "0"
                Next
                'Comparing  both PeopleSoft and Middle Tire BUnits and User Id Columns.
            ElseIf dsLocalDataset.Tables(0).Rows.Count > 0 Then
                For intCnt = 0 To pDsOrgBUnits.Tables(0).Rows.Count - 1
                    For intCount = 0 To dsLocalDataset.Tables(0).Rows.Count - 1
                        If pDsOrgBUnits.Tables(0).Rows(intCnt).Item("BUSINESS_UNIT") = _
                                 dsLocalDataset.Tables(0).Rows(intCount).Item("BUSINESS_UNIT") Then
                            If pDsOrgBUnits.Tables(0).Rows(intCnt).Item("BU_TYPE") = _
                                dsLocalDataset.Tables(0).Rows(intCount).Item("BU_TYPE") Then

                                pDsOrgBUnits.Tables(0).Rows(intCnt).Item("CHK_VALUE") = "1"
                            End If
                        End If
                    Next 'for i = 0 To dsLocalDataset.Tables(0).Rows.Count - 1
                Next 'for j = 0 To pDsPSBunits.Tables(0).Rows.Count - 1
            End If

            With pDsOrgBUnits.Tables(0)
                For intCount = 0 To .Rows.Count - 1
                    .Rows(intCount).Item("ROWINDEX") = intCount
                Next
                .AcceptChanges()
            End With

        Catch ex As Exception
            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed adding columns to Dataset")
            Return E_SERVERERROR

        End Try

        Return ATPAR_OK
    End Function

    'NB-0005339
    ''' <summary>
    ''' To Add Users, called by mt_atpar_manage_users.aspx
    ''' </summary>
    ''' <param name="arrlstUsers">ArrayList Containing Users</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function AddUser(ByVal arrlstUsers As ArrayList, ByVal pDeviceTokenEntry() As String) As Integer _
                            Implements IAtPar_UserManagement.AddUser

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = arrlstUsers(14)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)


        Dim strHashVal As String
        Dim _StatusCode As Long
        Dim strPwd As String
        Dim _strEnterpriseSystem As String = String.empty
        Dim sqlParms As SqlParameter() = New SqlParameter(25) {}

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strEnterpriseSystem = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get the enterprise system name " _
                                                                & ex.ToString & ":" & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try
            ' if there's no password, use the default password
            If arrlstUsers(1).Length > 0 Then
                strPwd = arrlstUsers(1) & arrlstUsers(0)
            Else
                strPwd = DEFAULT_EMPTY_PASSWORD & arrlstUsers(0)
            End If
            strHashVal = CSHA256.ComputeHash(strPwd)

            sqlParms(0) = New SqlParameter("@pMode", SqlDbType.NVarChar)  '@pMode 0-ADDING USER, 1-EDITING USER
            sqlParms(0).Value = CType(AddEdit_Enum.ADD, Integer)
            sqlParms(1) = New SqlParameter("@pUserID", SqlDbType.NVarChar)
            sqlParms(1).Value = arrlstUsers(0)
            sqlParms(2) = New SqlParameter("@pPasswordRequired", SqlDbType.NVarChar) 'required 1, not required - 0
            sqlParms(2).Value = arrlstUsers(17)
            sqlParms(3) = New SqlParameter("@pPassword", SqlDbType.NVarChar)
            sqlParms(3).Value = strHashVal
            sqlParms(4) = New SqlParameter("@pTokenExpPeriod", SqlDbType.Int)
            sqlParms(4).Value = arrlstUsers(16)
            sqlParms(5) = New SqlParameter("@pIdleTime", SqlDbType.Int)
            sqlParms(5).Value = arrlstUsers(19)
            sqlParms(6) = New SqlParameter("@pFirstName", SqlDbType.NVarChar)
            sqlParms(6).Value = arrlstUsers(2)
            sqlParms(7) = New SqlParameter("@pLastName", SqlDbType.NVarChar)
            sqlParms(7).Value = arrlstUsers(3)
            sqlParms(8) = New SqlParameter("@pMiddleInitial", SqlDbType.NVarChar)
            sqlParms(8).Value = arrlstUsers(4)
            sqlParms(9) = New SqlParameter("@pEmailID", SqlDbType.NVarChar)
            sqlParms(9).Value = arrlstUsers(5)
            sqlParms(10) = New SqlParameter("@pPhone1", SqlDbType.NVarChar)
            sqlParms(10).Value = arrlstUsers(6)
            sqlParms(11) = New SqlParameter("@pPhone2", SqlDbType.NVarChar)
            sqlParms(11).Value = arrlstUsers(7)
            sqlParms(12) = New SqlParameter("@pFax", SqlDbType.NVarChar)
            sqlParms(12).Value = arrlstUsers(8)
            sqlParms(13) = New SqlParameter("@pPager", SqlDbType.NVarChar)
            sqlParms(13).Value = arrlstUsers(9)
            sqlParms(14) = New SqlParameter("@pOrgGroup", SqlDbType.NVarChar)
            sqlParms(14).Value = arrlstUsers(23)
            sqlParms(15) = New SqlParameter("@pProfile", SqlDbType.NVarChar)
            sqlParms(15).Value = arrlstUsers(10)
            sqlParms(16) = New SqlParameter("@pLdapUser", SqlDbType.NVarChar) 'default ''
            sqlParms(16).Value = arrlstUsers(11)
            sqlParms(17) = New SqlParameter("@pLdapRole", SqlDbType.NVarChar) 'default ''
            sqlParms(17).Value = arrlstUsers(12)
            sqlParms(18) = New SqlParameter("@pLdapOrg", SqlDbType.NVarChar)  'default ''
            sqlParms(18).Value = arrlstUsers(13)
            sqlParms(19) = New SqlParameter("@pTimeRestrictions", SqlDbType.NVarChar)  ' default 1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;
            sqlParms(19).Value = arrlstUsers(18)
            sqlParms(20) = New SqlParameter("@pPwdResetReq", SqlDbType.NVarChar) ' default 'N'
            sqlParms(20).Value = arrlstUsers(20)
            sqlParms(21) = New SqlParameter("@pLastUpdateUser ", SqlDbType.NVarChar)
            sqlParms(21).Value = arrlstUsers(14)
            sqlParms(22) = New SqlParameter("@pAccountDisabled", SqlDbType.NVarChar) ' default 0
            sqlParms(22).Value = arrlstUsers(24)
            sqlParms(23) = New SqlParameter("@pUserDN", SqlDbType.NVarChar) ' default 0
            sqlParms(23).Value = arrlstUsers(25)
            sqlParms(24) = New SqlParameter("@pEnterpriseSystem", SqlDbType.NVarChar) ' default 0
            sqlParms(24).Value = _strEnterpriseSystem
            sqlParms(25) = New SqlParameter("@StatusCode", SqlDbType.Int)
            sqlParms(25).direction = ParameterDirection.Output

            If log.IsInfoEnabled Then

                log.Info("Calling SP_CreateUpdateUser with the following syntax..")
                Dim _strSQL As String = "DECLARE @P1 INT " & _
                                               "SET @P1 = 0 " & vbCrLf & _
                                               vbCrLf & _
                                               "EXEC	" & _
                                               "SP_CreateUpdateUser" & vbCrLf & _
                                               "@pMode = N'" & sqlParms(0).Value & "'," & vbCrLf & _
                                               "@pUserID = N'" & sqlParms(1).Value & "'," & vbCrLf & _
                                               "@pPasswordRequired = N'" & sqlParms(2).Value & "'," & vbCrLf & _
                                               "@pPassword = N'" & sqlParms(3).Value & "'," & vbCrLf & _
                                               "@pTokenExpPeriod = N'" & sqlParms(4).Value & "'," & vbCrLf & _
                                               "@pIdleTime = N'" & sqlParms(5).Value & "'," & vbCrLf & _
                                               "@pFirstName = N'" & sqlParms(6).Value & "'," & vbCrLf & _
                                               "@pLastName = N'" & sqlParms(7).Value & "'," & vbCrLf & _
                                               "@pMiddleInitial = N'" & sqlParms(8).Value & "'," & vbCrLf & _
                                               "@pEmailID = N'" & sqlParms(9).Value & "'," & vbCrLf & _
                                               "@pPhone1 = N'" & sqlParms(10).Value & "'," & vbCrLf & _
                                               "@pPhone2 = N'" & sqlParms(11).Value & "'," & vbCrLf & _
                                               "@pFax = N'" & sqlParms(12).Value & "'," & vbCrLf & _
                                               "@pPager = N'" & sqlParms(13).Value & "'," & vbCrLf & _
                                               "@pOrgGroup = N'" & sqlParms(14).Value & "'," & vbCrLf & _
                                               "@pProfile = N'" & sqlParms(15).Value & "'," & vbCrLf & _
                                               "@pLdapUser = N'" & sqlParms(16).Value & "'," & vbCrLf & _
                                               "@pLdapRole = N'" & sqlParms(17).Value & "'," & vbCrLf & _
                                               "@pLdapOrg = N'" & sqlParms(18).Value & "'," & vbCrLf & _
                                               "@pTimeRestrictions = N'" & sqlParms(19).Value & "'," & vbCrLf & _
                                               "@pPwdResetReq = N'" & sqlParms(20).Value & "'," & vbCrLf & _
                                               "@pLastUpdateUser  = N'" & sqlParms(21).Value & "'," & vbCrLf & _
                                               "@pAccountDisabled = N'" & sqlParms(22).Value & "'," & vbCrLf & _
                                               "@pUserDn = N'" & sqlParms(23).Value & "'," & vbCrLf & _
                                               "@pEnterpriseSystem = N'" & sqlParms(24).Value & "'," & vbCrLf & _
                                               "@StatusCode = @P1 output" & vbCrLf & _
                                               vbCrLf & _
                                               "SELECT	@P1 "
                log.Info(_strSQL)
            End If

            Dim _Cmd As SqlCommand
            Try
                _Cmd = New SqlCommand

                _Cmd.Connection = m_LocalDB.CreateConnection
                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "SP_CreateUpdateUser"
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
                _Cmd.Parameters.Add(sqlParms(16))
                _Cmd.Parameters.Add(sqlParms(17))
                _Cmd.Parameters.Add(sqlParms(18))
                _Cmd.Parameters.Add(sqlParms(19))
                _Cmd.Parameters.Add(sqlParms(20))
                _Cmd.Parameters.Add(sqlParms(21))
                _Cmd.Parameters.Add(sqlParms(22))
                _Cmd.Parameters.Add(sqlParms(23))
                _Cmd.Parameters.Add(sqlParms(24))
                _Cmd.Parameters.Add(sqlParms(25))

                m_LocalDB.ExecuteNonQuery(_Cmd)

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlex))
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal("E_SERVERERROR :" & ex.ToString)
                Return E_SERVERERROR
            Finally
                _Cmd.dispose()
            End Try


            _StatusCode = sqlParms(25).Value
            If log.IsDebugEnabled Then log.Debug("_StatusCode for SP_CreateUpdateUser in AddUser" & _StatusCode)
            Return _StatusCode

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("User Creation failed " & ex.ToString)
            Return ATPAR_E_LOCALDBINSERTFAIL
        End Try

    End Function

    'SM-0004756
    ''' <summary>
    ''' To get SecurityParameters, called by mt_atpar_manage_users.aspx & Security COnfiguration
    ''' </summary>
    ''' <param name="pDSSecurityParams">Dataset Containing Security Params</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetSecurityParams(ByRef pDSSecurityParams As DataSet, ByVal pDeviceTokenEntry() As String) As Integer _
                                      Implements IAtPar_UserManagement.GetSecurityParams

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = " SELECT PASSWD_MIN_LENGTH," & _
                      " PASSWD_MAX_LENGTH," & _
                      " PASSWD_EXP_PERIOD," & _
                      " PASSWD_RESET_REQUIRED," & _
                      " MAINTAIN_PASSWD_HISTORY," & _
                      " CHECK_PASSWD_HISTORY," & _
                      " PASS_REQ_HHT_USERS," & _
                      " ALLOWED_INVALID_LOGIN_ATTEMPTS," & _
                      " PASSWD_COMPLEXITY," & _
                      " MAINTAIN_SECURITY_AUDIT," & _
                      " ALLOW_REG_DEVICES," & _
                      " LOGIN_HISTORY," & _
                      " LDAP_PASS_EXP_ALTMSG" & _
                      " FROM MT_ATPAR_SECURITY_PARAMS"

            If log.IsInfoEnabled Then log.Info(_strSQL)

            pDSSecurityParams = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

    End Function

    'SM-0004756
    ''' <summary>
    ''' To Update SecurityParameters, called by mt_atpar_security_configuration.aspx
    ''' </summary>
    ''' <param name="pDSSecurityParams">Dataset Containing Security Params</param>
    ''' <returns>ATPAR_OK on Success else Error Code</returns>
    ''' <remarks></remarks>
    Public Function UpdateSecurityParams(ByRef pDSSecurityParams As DataSet, ByVal pDeviceTokenEntry() As String) As Long _
                                      Implements IAtPar_UserManagement.UpdateSecurityParams

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = " UPDATE MT_ATPAR_SECURITY_PARAMS SET " & _
                      " PASSWD_MIN_LENGTH = '" & pDSSecurityParams.Tables(0).Rows(0).Item("PASSWD_MIN_LENGTH") & "'," & _
                      " PASSWD_MAX_LENGTH = '" & pDSSecurityParams.Tables(0).Rows(0).Item("PASSWD_MAX_LENGTH") & "'," & _
                      " PASSWD_EXP_PERIOD = '" & pDSSecurityParams.Tables(0).Rows(0).Item("PASSWD_EXP_PERIOD") & "'," & _
                      " PASSWD_RESET_REQUIRED = '" & pDSSecurityParams.Tables(0).Rows(0).Item("PASSWD_RESET_REQUIRED") & "'," & _
                      " MAINTAIN_PASSWD_HISTORY = '" & pDSSecurityParams.Tables(0).Rows(0).Item("MAINTAIN_PASSWD_HISTORY") & "'," & _
                      " CHECK_PASSWD_HISTORY = '" & pDSSecurityParams.Tables(0).Rows(0).Item("CHECK_PASSWD_HISTORY") & "'," & _
                      " PASS_REQ_HHT_USERS = '" & pDSSecurityParams.Tables(0).Rows(0).Item("PASS_REQ_HHT_USERS") & "'," & _
                      " ALLOWED_INVALID_LOGIN_ATTEMPTS = '" & pDSSecurityParams.Tables(0).Rows(0).Item("ALLOWED_INVALID_LOGIN_ATTEMPTS") & "'," & _
                      " PASSWD_COMPLEXITY = '" & pDSSecurityParams.Tables(0).Rows(0).Item("PASSWD_COMPLEXITY") & "'," & _
                      " MAINTAIN_SECURITY_AUDIT = '" & pDSSecurityParams.Tables(0).Rows(0).Item("MAINTAIN_SECURITY_AUDIT") & "'," & _
                      " ALLOW_REG_DEVICES = '" & pDSSecurityParams.Tables(0).Rows(0).Item("ALLOW_REG_DEVICES") & "'," & _
                      " LOGIN_HISTORY = '" & pDSSecurityParams.Tables(0).Rows(0).Item("LOGIN_HISTORY") & "'," & _
                      " LDAP_PASS_EXP_ALTMSG = '" & pDSSecurityParams.Tables(0).Rows(0).Item("LDAP_PASS_EXP_ALTMSG") & "'"


            If log.IsInfoEnabled Then log.Info(_strSQL)

            pDSSecurityParams = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                          _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBINSERTFAIL
        End Try

    End Function

    ''' <summary>
    ''' To Check User Information, called by mt_atpar_manage_users.aspx
    ''' </summary>
    ''' <param name="pUserID">UserId to check</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function CheckUser(ByVal pUserID As String, ByVal pDeviceTokenEntry() As String) As Integer _
                              Implements IAtPar_UserManagement.CheckUser

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim intCnt As Integer
        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = "SELECT COUNT(USER_ID) FROM MT_ATPAR_USER WHERE USER_ID='" & pUserID & "'"

            If log.IsInfoEnabled Then log.Info(_strSQL)

            intCnt = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            If intCnt > 0 Then
                Return ATPAR_E_USERALREADYEXISTS
            End If

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

    End Function

    ''' <summary>
    ''' To get the User Details, called by mt_atpar_manage_users.aspx
    ''' </summary>
    ''' <param name="pUserID">UserId of the User</param>
    ''' <param name="pDSUserDetails">Dataset containing UserDetails</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetUserDetails(ByVal pUserID As String, _
                                   ByRef pDSUserDetails As DataSet, ByVal pDeviceTokenEntry() As String) As Integer _
                                   Implements IAtPar_UserManagement.GetUserDetails

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            Dim sqlParms() As SqlParameter

            sqlParms = New SqlParameter(1) {}
            sqlParms(0) = New SqlParameter("@pUserID", SqlDbType.NVarChar)
            sqlParms(0).Value = pUserID

            If log.IsInfoEnabled Then
                log.Info("Calling sp_GetUserDetails with the following syntax..")
                Dim _strSQL As String = "exec sp_GetUserDetails " & _
                                         "'" & sqlParms(0).Value & "' "
                log.Info(_strSQL)
            End If

            Dim _Cmd As SqlCommand
            Try
                _Cmd = New SqlCommand

                _Cmd.Connection = m_LocalDB.CreateConnection
                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "sp_GetUserDetails"
                _Cmd.Parameters.Add(sqlParms(0))

                pDSUserDetails = m_LocalDB.ExecuteDataSet(_Cmd)

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlex))
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal("E_SERVERERROR :" & ex.ToString)
                Return E_SERVERERROR
            Finally
                _Cmd.dispose()
            End Try

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed with exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

    End Function

	'NB-0005339
    ''' <summary>
    ''' Function for updating user information, called by mt_atpar_manage_users.aspx
    ''' </summary>
    ''' <param name="arrlstUsers">ArrayList contains Users Information</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function UpdateUser(ByVal arrlstUsers As ArrayList, ByVal pDeviceTokenEntry() As String) As Integer _
                               Implements IAtPar_UserManagement.UpdateUser

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = arrlstUsers(14)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim strHashVal As String = String.Empty
        Dim strPwd As String
        Dim _StatusCode As Long
        Dim _strEnterpriseSystem As String = String.empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strEnterpriseSystem = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get the enterprise system name " _
                                                                & ex.ToString & ":" & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try
            'NB-0004892 
            'Computing the Hash
            If arrlstUsers(17) = 1 Then
                If Not String.IsNullOrEmpty(arrlstUsers(1)) Then
                    strPwd = arrlstUsers(1) & arrlstUsers(0)
                    strHashVal = CSHA256.ComputeHash(strPwd)
                End If
            Else
                strPwd = DEFAULT_EMPTY_PASSWORD & arrlstUsers(0)
                strHashVal = CSHA256.ComputeHash(strPwd)
            End If

            Dim sqlParms As SqlParameter() = New SqlParameter(25) {}

            sqlParms(0) = New SqlParameter("@pMode", SqlDbType.NVarChar)  '@pMode 0-ADDING USER, 1-EDITING USER
            sqlParms(0).Value = CType(AddEdit_Enum.EDIT, Integer)
            sqlParms(1) = New SqlParameter("@pUserID", SqlDbType.NVarChar)
            sqlParms(1).Value = arrlstUsers(0)
            sqlParms(2) = New SqlParameter("@pPasswordRequired", SqlDbType.NVarChar) 'required 1, not required - 0
            sqlParms(2).Value = arrlstUsers(17)
            sqlParms(3) = New SqlParameter("@pPassword", SqlDbType.NVarChar)
            sqlParms(3).Value = strHashVal
            sqlParms(4) = New SqlParameter("@pTokenExpPeriod", SqlDbType.Int)
            sqlParms(4).Value = arrlstUsers(16)
            sqlParms(5) = New SqlParameter("@pIdleTime", SqlDbType.Int)
            sqlParms(5).Value = arrlstUsers(19)
            sqlParms(6) = New SqlParameter("@pFirstName", SqlDbType.NVarChar)
            sqlParms(6).Value = arrlstUsers(2)
            sqlParms(7) = New SqlParameter("@pLastName", SqlDbType.NVarChar)
            sqlParms(7).Value = arrlstUsers(3)
            sqlParms(8) = New SqlParameter("@pMiddleInitial", SqlDbType.NVarChar)
            sqlParms(8).Value = arrlstUsers(4)
            sqlParms(9) = New SqlParameter("@pEmailID", SqlDbType.NVarChar)
            sqlParms(9).Value = arrlstUsers(5)
            sqlParms(10) = New SqlParameter("@pPhone1", SqlDbType.NVarChar)
            sqlParms(10).Value = arrlstUsers(6)
            sqlParms(11) = New SqlParameter("@pPhone2", SqlDbType.NVarChar)
            sqlParms(11).Value = arrlstUsers(7)
            sqlParms(12) = New SqlParameter("@pFax", SqlDbType.NVarChar)
            sqlParms(12).Value = arrlstUsers(8)
            sqlParms(13) = New SqlParameter("@pPager", SqlDbType.NVarChar)
            sqlParms(13).Value = arrlstUsers(9)
            sqlParms(14) = New SqlParameter("@pOrgGroup", SqlDbType.NVarChar)
            sqlParms(14).Value = arrlstUsers(24)
            sqlParms(15) = New SqlParameter("@pProfile", SqlDbType.NVarChar)
            sqlParms(15).Value = arrlstUsers(10)
            sqlParms(16) = New SqlParameter("@pLdapUser", SqlDbType.NVarChar) 'default ''
            sqlParms(16).Value = arrlstUsers(11)
            sqlParms(17) = New SqlParameter("@pLdapRole", SqlDbType.NVarChar) 'default ''
            sqlParms(17).Value = arrlstUsers(12)
            sqlParms(18) = New SqlParameter("@pLdapOrg", SqlDbType.NVarChar)  'default ''
            sqlParms(18).Value = arrlstUsers(13)
            sqlParms(19) = New SqlParameter("@pTimeRestrictions", SqlDbType.NVarChar)  ' default 1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;
            sqlParms(19).Value = arrlstUsers(18)
            sqlParms(20) = New SqlParameter("@pPwdResetReq", SqlDbType.NVarChar) ' default 'N'
            sqlParms(20).Value = arrlstUsers(20)
            sqlParms(21) = New SqlParameter("@pLastUpdateUser ", SqlDbType.NVarChar)
            sqlParms(21).Value = arrlstUsers(14)
            sqlParms(22) = New SqlParameter("@pAccountDisabled", SqlDbType.NVarChar) ' default 0
            sqlParms(22).Value = arrlstUsers(25)
            sqlParms(23) = New SqlParameter("@pUserDN", SqlDbType.NVarChar) ' default 0
            sqlParms(23).Value = arrlstUsers(21)
            sqlParms(24) = New SqlParameter("@pEnterpriseSystem", SqlDbType.NVarChar) ' default 0
            sqlParms(24).Value = _strEnterpriseSystem
            sqlParms(25) = New SqlParameter("@StatusCode", SqlDbType.Int)
            sqlParms(25).direction = ParameterDirection.Output

            If log.IsInfoEnabled Then

                log.Info("Calling SP_CreateUpdateUser with the following syntax..")
                Dim _strSQL As String = "DECLARE @P1 INT " & _
                                               "SET @P1 = 0 " & vbCrLf & _
                                               vbCrLf & _
                                               "EXEC	" & _
                                               "SP_CreateUpdateUser" & vbCrLf & _
                                               "@pMode = N'" & sqlParms(0).Value & "'," & vbCrLf & _
                                               "@pUserID = N'" & sqlParms(1).Value & "'," & vbCrLf & _
                                               "@pPasswordRequired = N'" & sqlParms(2).Value & "'," & vbCrLf & _
                                               "@pPassword = N'" & sqlParms(3).Value & "'," & vbCrLf & _
                                               "@pTokenExpPeriod = N'" & sqlParms(4).Value & "'," & vbCrLf & _
                                               "@pIdleTime = N'" & sqlParms(5).Value & "'," & vbCrLf & _
                                               "@pFirstName = N'" & sqlParms(6).Value & "'," & vbCrLf & _
                                               "@pLastName = N'" & sqlParms(7).Value & "'," & vbCrLf & _
                                               "@pMiddleInitial = N'" & sqlParms(8).Value & "'," & vbCrLf & _
                                               "@pEmailID = N'" & sqlParms(9).Value & "'," & vbCrLf & _
                                               "@pPhone1 = N'" & sqlParms(10).Value & "'," & vbCrLf & _
                                               "@pPhone2 = N'" & sqlParms(11).Value & "'," & vbCrLf & _
                                               "@pFax = N'" & sqlParms(12).Value & "'," & vbCrLf & _
                                               "@pPager = N'" & sqlParms(13).Value & "'," & vbCrLf & _
                                               "@pOrgGroup = N'" & sqlParms(14).Value & "'," & vbCrLf & _
                                               "@pProfile = N'" & sqlParms(15).Value & "'," & vbCrLf & _
                                               "@pLdapUser = N'" & sqlParms(16).Value & "'," & vbCrLf & _
                                               "@pLdapRole = N'" & sqlParms(17).Value & "'," & vbCrLf & _
                                               "@pLdapOrg = N'" & sqlParms(18).Value & "'," & vbCrLf & _
                                               "@pTimeRestrictions = N'" & sqlParms(19).Value & "'," & vbCrLf & _
                                               "@pPwdResetReq = N'" & sqlParms(20).Value & "'," & vbCrLf & _
                                               "@pLastUpdateUser  = N'" & sqlParms(21).Value & "'," & vbCrLf & _
                                               "@pAccountDisabled = N'" & sqlParms(22).Value & "'," & vbCrLf & _
                                                "@pUserDN = N'" & sqlParms(23).Value & "'," & vbCrLf & _
                                                "@pEnterpriseSystem = N'" & sqlParms(24).Value & "'," & vbCrLf & _
                                               "@StatusCode = @P1 output" & vbCrLf & _
                                               vbCrLf & _
                                               "SELECT	@P1 "
                log.Info(_strSQL)
            End If

            Dim _Cmd As SqlCommand
            Try
                _Cmd = New SqlCommand

                _Cmd.Connection = m_LocalDB.CreateConnection
                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "SP_CreateUpdateUser"
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
                _Cmd.Parameters.Add(sqlParms(16))
                _Cmd.Parameters.Add(sqlParms(17))
                _Cmd.Parameters.Add(sqlParms(18))
                _Cmd.Parameters.Add(sqlParms(19))
                _Cmd.Parameters.Add(sqlParms(20))
                _Cmd.Parameters.Add(sqlParms(21))
                _Cmd.Parameters.Add(sqlParms(22))
                _Cmd.Parameters.Add(sqlParms(23))
                _Cmd.Parameters.Add(sqlParms(24))
                _Cmd.Parameters.Add(sqlParms(25))

                m_LocalDB.ExecuteNonQuery(_Cmd)

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlex))
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal("E_SERVERERROR :" & ex.ToString)
                Return E_SERVERERROR
            Finally
                _Cmd.dispose()
            End Try


            _StatusCode = sqlParms(25).Value
            If log.IsDebugEnabled Then log.Debug("_StatusCode for SP_CreateUpdateUser in UpdateUser" & _StatusCode)
            Return _StatusCode

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("User updation failed " & ex.ToString)
            Return ATPAR_E_LOCALDBUPDATEFAIL
        End Try

        Return _StatusCode
    End Function

    ''' <summary>
    ''' To Check Profiles of the Application, called by mt_atpar_manage_users.aspx
    ''' </summary>
    ''' <param name="pUserID">UserId of the User</param>
    ''' <param name="pProfileID">Id of the Profile to be Checked</param>
    ''' <param name="pAccessType">Type of the Access</param>
    ''' <param name="pResult">Result</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function CheckProfileAppACL(ByVal pUserID As String, ByVal pProfileID As String, _
                                       ByVal pAccessType As Integer, _
                                       ByRef pResult As Boolean, ByVal pDeviceTokenEntry() As String) As Integer _
                                       Implements IAtPar_UserManagement.CheckProfileAppACL

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim intCnt As Integer
        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = "SELECT COUNT(APP_ID) FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='" & pProfileID & "'"

            If pAccessType = ClientType.WEB Then
                _strSQL = _strSQL & " AND SERVER_USER='Y'"
            ElseIf pAccessType = ClientType.HHT Then
                _strSQL = _strSQL & " AND CLIENT_USER='Y'"
            End If

            If log.IsInfoEnabled Then log.Info(_strSQL)

            intCnt = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            If intCnt > 0 Then
                pResult = True
            Else
                pResult = False
            End If

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                         _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

    End Function

    ''' <summary>
    ''' To get the Users Infomation, called by mt_atpar_users.aspx
    ''' </summary>
    ''' <param name="pUserID">UserId of the User</param>
    ''' <param name="pDSUsers">Dataset Contains Users information</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetUsers(ByVal pUserID As String, ByRef pDSUsers As DataSet, _
                             ByVal pOrgId As String, ByVal pProfileId As String, _
                             ByVal pSearchId As String, _
                             ByVal pDeviceTokenEntry() As String) As Integer _
                             Implements IAtPar_UserManagement.GetUsers

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            'NB-0005519
            'DK-0004072-06/09/2008
            'HK-0004113
            _strSQL = "SELECT C.USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL, ACCOUNT_DISABLED , EMAIL_ID, " & _
                      "PHONE1, FAX, PROFILE_ID, D.ORG_GROUP_ID, LDAP_USER FROM " & _
                      "(SELECT  A.USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL, ACCOUNT_DISABLED , EMAIL_ID, " & _
                      "PHONE1, FAX, PROFILE_ID, LDAP_USER FROM MT_ATPAR_USER A,  MT_ATPAR_USER_ACL B WHERE " & _
                      "A.USER_ID = B.USER_ID)C , MT_ATPAR_USER_ORG_GROUPS D " & _
                      "WHERE C.USER_ID = D.USER_ID"
            If pOrgId <> "ALL" Then
                _strSQL = _strSQL & " AND ( D.ORG_GROUP_ID ='" & pOrgId & "' OR D.ORG_GROUP_ID='')"
            End If
            If (pProfileId <> "ADMIN") Then
                _strSQL = _strSQL & " AND PROFILE_ID <> 'ADMIN' "
            End If

            If Not String.IsNullOrEmpty(pSearchId) Then
                _strSQL = _strSQL & " AND ( C.USER_ID LIKE '" & pSearchId & "%' OR "
                _strSQL = _strSQL & "FIRST_NAME LIKE '" & pSearchId & "%'  OR "
                _strSQL = _strSQL & "LAST_NAME LIKE '" & pSearchId & "%')"
            End If

            If log.IsInfoEnabled Then log.Info(methodBaseName & " Sql to get users list: " & vbCrLf & _strSQL)

            pDSUsers = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_strSQL))

            If pDSUsers.Tables(0).Rows.Count = 0 Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " No Data Found")
                Return E_NORECORDFOUND
            Else
                Return ATPAR_OK
            End If
        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                         _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Throw New Exception("GetUsers Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                         _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Throw New Exception("GetUsers Failed", ex)
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' To get the Users Infomation, called by mt_atpar_users.aspx
    ''' </summary>
    ''' <param name="pUserID">UserId of the User</param>
    ''' <param name="pDSUsers">Dataset Contains Users information</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetManageUsers(ByVal pUserID As String, _
                                   ByRef pDSUsers As DataSet, _
                                   ByVal pOrgId As String, _
                                   ByVal pProfileId As String, _
                                   ByVal pSearchId As String, _
                                   ByVal pDeviceTokenEntry() As String) As Long _
                                   Implements IAtPar_UserManagement.GetManageUsers

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbUsersList As New StringBuilder

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            With _sbUsersList
                .Append("SELECT C.USER_ID, FIRST_NAME, LAST_NAME FROM ")
                .Append("(SELECT  A.USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL, ACCOUNT_DISABLED , EMAIL_ID, ")
                .Append("PHONE1, FAX, PROFILE_ID, LDAP_USER FROM MT_ATPAR_USER A,  MT_ATPAR_USER_ACL B WHERE ")
                .Append("A.USER_ID = B.USER_ID)C , MT_ATPAR_USER_ORG_GROUPS D ")
                .Append("WHERE C.USER_ID = D.USER_ID ")
                If pOrgId <> "ALL" Then
                    .Append(" AND ( D.ORG_GROUP_ID ='" & pOrgId & "' OR D.ORG_GROUP_ID='') ")
                End If

                If (pProfileId <> "ADMIN") Then
                    .Append(" AND PROFILE_ID <> 'ADMIN' ")
                End If

                If Not String.IsNullOrEmpty(pSearchId) Then
                    .Append(" AND ( C.USER_ID LIKE '" & pSearchId & "%' OR ")
                    .Append("FIRST_NAME LIKE '" & pSearchId & "%'  OR ")
                    .Append("LAST_NAME LIKE '" & pSearchId & "%')")
                End If

            End With

            If log.IsInfoEnabled Then log.Info(methodBaseName & " Sql to get users list: " & vbCrLf & _sbUsersList.ToString)

            pDSUsers = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbUsersList.ToString))

            If pDSUsers.Tables(0).Rows.Count = 0 Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " No Data Found")
                Return E_NORECORDFOUND
            Else
                Return ATPAR_OK
            End If
        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                         _sbUsersList.ToString & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                         _sbUsersList.ToString & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _sbUsersList = Nothing
        End Try

    End Function

    ''' <summary>
    ''' To Get Count of the ServerAccess, called by mt_atpar_assign_profiles.aspx
    ''' </summary>
    ''' <param name="pUserID">UserId of the User</param>
    ''' <param name="pProfileID">Id of the Profile that access</param>
    ''' <param name="pCnt">Profiles CountNumber</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetServerAccessCnt(ByVal pUserID As String, ByVal pProfileID As String, _
                                       ByRef pCnt As Integer, ByVal pDeviceTokenEntry() As String) As Integer _
                                       Implements IAtPar_UserManagement.GetServerAccessCnt

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = "SELECT COUNT(SERVER_USER) FROM MT_ATPAR_PROFILE_APP_ACL WHERE SERVER_USER='Y' AND "

            If Not String.IsNullOrEmpty(pProfileID) Then
                _strSQL = _strSQL & "PROFILE_ID='" & pProfileID & "'"
            End If

            If log.IsInfoEnabled Then log.Info(methodBaseName & _strSQL)

            pCnt = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                          _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

    End Function

    ''' <summary>
    ''' To get the Count of the ClientAccess, called by mt_atpar_assign_profiles.aspx
    ''' </summary>
    ''' <param name="pUserID">UserId of the User</param>
    ''' <param name="pProfileID">Id of the Profile that Access</param>
    ''' <param name="pCnt">CountNumber</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetClientAccessCnt(ByVal pUserID As String, ByVal pProfileID As String, _
                                       ByRef pCnt As Integer, ByVal pDeviceTokenEntry() As String) As Integer _
                                       Implements IAtPar_UserManagement.GetClientAccessCnt

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = "SELECT COUNT(CLIENT_USER) FROM MT_ATPAR_PROFILE_APP_ACL WHERE CLIENT_USER='Y' AND "

            If Not String.IsNullOrEmpty(pProfileID) Then
                _strSQL = _strSQL & "PROFILE_ID='" & pProfileID & "'"
            End If

            If log.IsInfoEnabled Then log.Info(_strSQL)

            pCnt = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

    End Function

    ''' <summary>
    ''' To get the LDAP user list
    ''' </summary>
    ''' <param name="pUserID">UserId of the User</param>
    ''' <param name="pDsLdapUsers">LDAP Users Dataset</param>
    ''' <param name="pStrSearchFilter">Search Filter</param>
    ''' <param name="pStrEntryLimit">Entry Limit</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetLdapUsers(ByVal pUserID As String, ByRef pDsLdapUsers As DataSet, ByVal pStrSearchFilter As String, _
                                    ByVal pStrEntryLimit As String, ByVal pDeviceTokenEntry() As String) As Integer Implements IAtPar_UserManagement.GetLdapUsers

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Dim oSearcher As New DirectorySearcher
        Dim oResults As SearchResultCollection
        Dim oResult As SearchResult
        Dim RetArray As New ArrayList
        Dim mCount As Integer

        Dim dsAtparUser As DataSet
        Dim dsLdapUser As New DataSet
        Dim intNoofRecords As Integer

        Dim _strSQL As String = String.Empty
        Dim dtTbl As New DataTable
        Dim dtTblLdap As New DataTable
        Dim dtRowLdap As DataRow
        Dim dtRow As DataRow
        'NB-5685
 Dim strSearchFilter As String
        Dim _strProtocol As String = String.Empty
        Dim _strServerName As String = String.Empty
        Dim _strSearchFilter As String = String.Empty
        Dim _strLdapUserID As String = String.Empty
        Dim _strLDAPUserDN As String = String.Empty
        Dim _strLdapFirstName As String = String.Empty
        Dim _strLdapLastName As String = String.Empty
        Dim _strLdapMInitial As String = String.Empty
        Dim _strLdapEmailID As String = String.Empty
        Dim _strLdapMobile As String = String.Empty
        Dim _strLdapFax As String = String.Empty
        Dim _strEntryLimit As String = String.Empty
        Dim _strAuthType As String = String.Empty
        Dim _strSearchScope As String = String.Empty
        Dim _strBaseDn As String = String.Empty
        Dim _strUserName As String = String.Empty
        Dim _strPassword As String = String.Empty
    


        dtTbl.Columns.Add("USER_ID")
        dtTbl.Columns.Add("FIRST_NAME")
        dtTbl.Columns.Add("LAST_NAME")
        dtTbl.Columns.Add("MIDDLE_INITIAL")
        dtTbl.Columns.Add("EMAIL_ID")
        dtTbl.Columns.Add("PHONE1")
        dtTbl.Columns.Add("FAX")
        'NB-0004523
        dtTbl.Columns.Add("USERDN")

        dtTblLdap.Columns.Add("USER_ID")
        dtTblLdap.Columns.Add("FIRST_NAME")
        dtTblLdap.Columns.Add("LAST_NAME")
        dtTblLdap.Columns.Add("MIDDLE_INITIAL")
        dtTblLdap.Columns.Add("EMAIL_ID")
        dtTblLdap.Columns.Add("PHONE1")
        dtTblLdap.Columns.Add("FAX")
        'NB-0004523
        dtTblLdap.Columns.Add("USERDN")

        Try
            _strProtocol = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.PROTOCOL.ToString())
            _strServerName = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.SERVERNAME.ToString())
            _strSearchFilter = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.SEARCHFILTER.ToString())
            _strLdapUserID = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.USERID.ToString())
            _strLdapFirstName = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.FIRSTNAME.ToString())
            _strLdapLastName = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.LASTNAME.ToString())
            _strLdapMInitial = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.MIDDLEINITIAL.ToString())
            _strLdapEmailID = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.EMAILID.ToString())
            _strLdapMobile = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.PHONE.ToString())
            _strLdapFax = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.FAX.ToString())
            _strEntryLimit = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.ENTRYLIMIT.ToString())
            _strAuthType = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.AUTHTYPE.ToString())
            _strSearchScope = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.SEARCHSCOPE.ToString())
            _strBaseDn = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.BASEDN.ToString())
            _strUserName = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.USERNAME.ToString())

            If Not String.IsNullOrEmpty(GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.PASSWORD.ToString())) Then
                _strPassword = Decrypt(GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.PASSWORD.ToString()))
            End If

            If (_strProtocol = "LDAP") Or (_strProtocol = "LDAPS") Then
                _strProtocol = "LDAP"
            End If
            'HK-0003596
            If String.IsNullOrEmpty(_strProtocol) Or _
                String.IsNullOrEmpty(_strServerName) Or _
                String.IsNullOrEmpty(_strSearchFilter) Then

                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Required parameters/Inputs missing")
                GetLdapUsers = E_REMOTEERROR
                Exit Function
            End If
			
			 Dim _nEntryLimit As Integer



            If Not String.IsNullOrEmpty(pStrEntryLimit) Then
                _nEntryLimit = Integer.Parse(pStrEntryLimit)
            Else
                _nEntryLimit = Integer.Parse(_strEntryLimit)
            End If

            Dim _nAuthType As Integer

            Select Case _strAuthType.ToUpper
                Case "NONE"
                    _nAuthType = AuthenticationTypes.None
                    Exit Select
                Case "ANONYMOUS"
                    _nAuthType = AuthenticationTypes.Anonymous
                    Exit Select
                Case "SECURE"
                    _nAuthType = AuthenticationTypes.Secure
                    Exit Select
                Case "SECURESOCKETSLAYER"
                    _nAuthType = AuthenticationTypes.SecureSocketsLayer
                    Exit Select

                Case Else 'default
                    _nAuthType = AuthenticationTypes.Anonymous
            End Select

			 Dim _nSearchScope As Integer


            Select Case _strSearchScope.ToUpper
                Case "BASE"
                    _nSearchScope = SearchScope.Base
                    Exit Select
                Case "ONELEVEL"
                    _nSearchScope = SearchScope.OneLevel
                    Exit Select
                Case "SUBTREE"
                    _nSearchScope = SearchScope.Subtree
                    Exit Select
                Case Else 'default
                    _nSearchScope = SearchScope.Base
            End Select

            'setup resultFields
			 Dim resultFields As New ArrayList


            If Not String.IsNullOrEmpty(_strLdapUserID) Then resultFields.Add(_strLdapUserID)
            If Not String.IsNullOrEmpty(_strLDAPUserDN) Then resultFields.Add(_strLDAPUserDN)
            If Not String.IsNullOrEmpty(_strLdapFirstName) Then resultFields.Add(CleanString(_strLdapFirstName))
            If Not String.IsNullOrEmpty(_strLdapLastName) Then resultFields.Add(CleanString(_strLdapLastName))
            If Not String.IsNullOrEmpty(_strLdapMInitial) Then resultFields.Add(_strLdapMInitial)
            If Not String.IsNullOrEmpty(_strLdapEmailID) Then resultFields.Add(_strLdapEmailID)
            If Not String.IsNullOrEmpty(_strLdapMobile) Then resultFields.Add(_strLdapMobile)
            If Not String.IsNullOrEmpty(_strLdapFax) Then resultFields.Add(_strLdapFax)

            Dim strResultsFields(resultFields.ToArray.Length - 1) As String

            resultFields.CopyTo(strResultsFields, 0)

            Dim _strLdapConnectString As String = _strProtocol & "://" & _strServerName & IIf(_strBaseDn.Length > 0, "/", "") & _strBaseDn


            If Not String.IsNullOrEmpty(pStrSearchFilter) Then
                If pStrSearchFilter.Contains(",") Then
                    pStrSearchFilter = pStrSearchFilter.Replace(",", ")(")
                    strSearchFilter = "(&(" & pStrSearchFilter & ")(" & _strSearchFilter & "))"
                Else
                    strSearchFilter = "(&(" & pStrSearchFilter & ")(" & _strSearchFilter & "))"
                End If
            Else
                strSearchFilter = _strSearchFilter
            End If
            Dim _str As String = "URL: " & _strLdapConnectString & "?(" & _strSearchFilter & ")" & " UserDN:" & _strUserName & _
                          vbCrLf & "Search Scope: " & _strSearchScope & " AuthType: " & _strAuthType

            If log.IsDebugEnabled Then log.Debug(methodBaseName & "LDAP Connection String  : " & _str)
            Try

                 With oSearcher
                    .SearchRoot = New DirectoryEntry(_strLdapConnectString, _strUserName, _strPassword, _nAuthType)
                    .SizeLimit = _nEntryLimit
                    .PropertiesToLoad.AddRange(strResultsFields)
                    .Filter = strSearchFilter
                    .SearchScope = _nSearchScope
                    oResults = .FindAll()
                End With

                'NB-0006027
            Catch ex As Exception
                'TODO: throw a LDAP_CONNECT error here
                'Dim _str As String = "URL: " & _strLdapConnectString & "?(" & _strSearchFilter & ")" & " UserDN:" & _strUserName & _
                'vbCrLf & "Search Scope: " & _strSearchScope & " AuthType: " & _strAuthType
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & vbCrLf & _str & vbCrLf & ex.ToString)
                Return E_SERVERERROR
            End Try
            'NB-0004523

             mCount = oResults.Count
            Dim _serverPath As String = _strProtocol & "://" & _strServerName & "/"
            If mCount > 0 Then
                For Each oResult In oResults
                    Dim currentEntry As DirectoryEntry = oResult.GetDirectoryEntry

                    dtRow = dtTbl.NewRow()
                    dtRow("USER_ID") = currentEntry.Properties(_strLdapUserID).Value
                    dtRow("FIRST_NAME") = currentEntry.Properties(CleanString(_strLdapFirstName)).Value
                    dtRow("LAST_NAME") = currentEntry.Properties(CleanString(_strLdapLastName)).Value
                    dtRow("MIDDLE_INITIAL") = currentEntry.Properties(_strLdapMInitial).Value
                    dtRow("EMAIL_ID") = currentEntry.Properties(_strLdapEmailID).Value
                    dtRow("PHONE1") = currentEntry.Properties(_strLdapMobile).Value
                    dtRow("FAX") = currentEntry.Properties(_strLdapFax).Value
                    dtRow("USERDN") = currentEntry.Path.Substring(CleanString(_serverPath.Length))
                    dtTbl.Rows.Add(dtRow)
                Next
                dsLdapUser.Tables.Add(dtTbl)
            End If

            If dsLdapUser.Tables.Count = 0 Then
                Return E_NORECORDFOUND
            ElseIf dsLdapUser.Tables(0).Rows.Count > 0 Then
                For intCount As Integer = 0 To dsLdapUser.Tables(0).Rows.Count - 1

                    _strSQL = "SELECT COUNT(USER_ID) FROM MT_ATPAR_USER WHERE USER_ID = " & _
                                 " '" & dsLdapUser.Tables(0).Rows(intCount).Item("USER_ID") & "' "

                    If log.IsInfoEnabled Then log.Info(_strSQL)

                    intNoofRecords = 0
                    intNoofRecords = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))
                    If intNoofRecords = 0 Then
                        dtRowLdap = dtTblLdap.NewRow()
                        If (dsLdapUser.Tables(0).Rows(intCount).Item("USER_ID").ToString = "") Then
                            dtRowLdap("USER_ID") = String.Empty
                        Else
                            dtRowLdap("USER_ID") = UCase(dsLdapUser.Tables(0).Rows(intCount).Item("USER_ID"))
                        End If

                        dtRowLdap("FIRST_NAME") = dsLdapUser.Tables(0).Rows(intCount).Item("FIRST_NAME")
                        dtRowLdap("LAST_NAME") = dsLdapUser.Tables(0).Rows(intCount).Item("LAST_NAME")
                        dtRowLdap("MIDDLE_INITIAL") = dsLdapUser.Tables(0).Rows(intCount).Item("MIDDLE_INITIAL")
                        dtRowLdap("EMAIL_ID") = dsLdapUser.Tables(0).Rows(intCount).Item("EMAIL_ID")
                        dtRowLdap("PHONE1") = dsLdapUser.Tables(0).Rows(intCount).Item("PHONE1")
                        dtRowLdap("FAX") = dsLdapUser.Tables(0).Rows(intCount).Item("FAX")
                        dtRowLdap("USERDN") = dsLdapUser.Tables(0).Rows(intCount).Item("USERDN")
                        dtTblLdap.Rows.Add(dtRowLdap)
                    End If
                Next
                If dtTblLdap.Rows.Count > 0 Then
                    pDsLdapUsers.Tables.Add(dtTblLdap)
                Else
                    Return ATPAR_E_USERALREADYEXISTS
                End If
            End If
            Return ATPAR_OK
        Catch sex As System.ArgumentException
            'Invalid Search Filter
            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & sex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

    End Function

    'NB-0005685
    ''' <summary>
    ''' To save LdapUsers Information,called by mt_atpar_import_user.aspx
    ''' </summary>
    ''' <param name="pUserID">User ID</param>
    ''' <param name="pSessionTime">Session Time taken</param>
    ''' <param name="pIdleTime">IdleTime Taken</param>
    ''' <param name="pOrgGrpId">Organisation Group Id</param>
    ''' <param name="pProfileID">Id of the Profile</param>
    ''' <param name="pDsLdapUsers">Dataset contains LdapUsersData</param>
    ''' <param name="pUserDtlsArr">Arraylist contains Users Details</param>
    ''' <returns>ATPAR_OK on success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function SaveLdapUsers(ByVal pUserID As String, ByVal pSessionTime As String, _
                                  ByVal pIdleTime As String, _
                                  ByVal pOrgGrpId As String, _
                                  ByVal pProfileID As String, _
                                  ByVal pDsLdapUsers As DataSet, _
                                  ByVal pUserDtlsArr As ArrayList, _
                                  ByVal pDeviceTokenEntry() As String) As Integer _
                                  Implements IAtPar_UserManagement.SaveLdapUsers

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        sqlConnect = m_LocalDB.CreateConnection()
        sqlConnect.Open()
        Dim trans As SqlTransaction = sqlConnect.BeginTransaction()
        Dim intPwdExp As Integer
        Dim _strSQL As String = String.Empty
        Dim _dsProfileParams As New DataSet
        Dim _strEnterpriseSystem As String = String.Empty

        Try
            _strEnterpriseSystem = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get the enterprise system name " & _
                                                                ex.ToString & ":" & vbCrLf)
            Return E_SERVERERROR
        End Try

        Try
            Try
                _strSQL = "SELECT PASSWD_EXP_PERIOD FROM MT_ATPAR_SECURITY_PARAMS "

                If log.IsInfoEnabled Then log.Info(_strSQL)

                intPwdExp = m_localdb.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL), trans)

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                          _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            End Try

            If pDsLdapUsers.Tables.Count > 0 Then

                For intCount As Integer = 0 To pDsLdapUsers.Tables(0).Rows.Count - 1
                    'MT_ATPAR_USER
                    _strSQL = String.Empty



                    _strSQL = " INSERT INTO MT_ATPAR_USER (USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL," & _
                                 " EMAIL_ID, PHONE1, FAX, CREATE_USER_ID, PROFILE_ID, CREATE_DATE, LDAP_USER,LAST_UPDATE_DATE,LAST_UPDATE_USER, USERDN) VALUES" & _
                                 "('" & pDsLdapUsers.Tables(0).Rows(intCount).Item("USER_ID") & "','" & substituteString(pDsLdapUsers.Tables(0).Rows(intCount).Item("FIRST_NAME")) & "', " & _
                                 " '" & substituteString(pDsLdapUsers.Tables(0).Rows(intCount).Item("LAST_NAME")) & "','" & pDsLdapUsers.Tables(0).Rows(intCount).Item("MIDDLE_INITIAL") & "'," & _
                                 " '" & pDsLdapUsers.Tables(0).Rows(intCount).Item("EMAIL_ID") & "','" & pDsLdapUsers.Tables(0).Rows(intCount).Item("PHONE1") & "'," & _
                                 " '" & pDsLdapUsers.Tables(0).Rows(intCount).Item("FAX") & "','" & pDsLdapUsers.Tables(0).Rows(intCount).Item("CREATE_USER_ID") & "'," & _
                                 " '" & pProfileID & "',GETDATE(),'Y',GETDATE(),'" & pDsLdapUsers.Tables(0).Rows(intCount).Item("USER_ID") & "'," & _
                                 " '" & substituteString(pDsLdapUsers.Tables(0).Rows(intCount).Item("USERDN")) & "')"

                    If log.IsInfoEnabled Then log.Info(_strSQL)
                    Try
                        m_localdb.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                    Catch sqexp As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                             _strSQL & vbCrLf & "Exception is : " & sqexp.ToString & vbCrLf)
                        If sqexp.Message.Contains("String or binary data would be truncated") Then
                            Return ATPAR_E_LOCALDBINSERTFAIL
                        End If
                        Throw New Exception("Insert into MT_ATPAR_USER failed: " & _strSQL, sqexp)
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                 _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                        Throw New Exception("Insert into MT_ATPAR_USER failed: " & _strSQL, ex)
                    End Try


                    'MT_ATPAR_USER_ACL
                    _strSQL = String.Empty
                    _strSQL = " INSERT INTO MT_ATPAR_USER_ACL (USER_ID, TOKEN_EXPIRY_PERIOD, LOGIN_ALLOWED, PASSHASH_REQUIRED, TIME_RESTRICTIONS," & _
                                 " ACCOUNT_DISABLED, IDLE_TIME, INVALID_LOGIN_ATTEMPTS, PASSWD_RESET_REQUIRED, REPORT_USER, RECORDS_PER_PAGE, " & _
                                 " DEFAULT_REPORT_DURATION, PASSWD_UPDATE_DATE, PASSWD_EXPT_DATE) VALUES('" & pDsLdapUsers.Tables(0).Rows(intCount).Item("USER_ID") & "'," & _
                                 " '" & pSessionTime & "',1,1,'" & pDsLdapUsers.Tables(0).Rows(intCount).Item("TIME_RESTRICTIONS") & "'," & _
                                 " 0 ,'" & pIdleTime & "',0,'N',0,10,10,'" & Now() & "','" & DateAdd(DateInterval.Day, intPwdExp, Now()) & "')"

                    If log.IsInfoEnabled Then log.Info(_strSQL)

                    Try
                        m_localdb.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                        Throw New Exception("Insert into MT_ATPAR_USER_ACL failed: " & _strSQL, ex)
                    End Try

                    'MT_ATPAR_USER_ORG_GROUPS

                    _strSQL = String.Empty
                    _strSQL = "INSERT INTO MT_ATPAR_USER_ORG_GROUPS (USER_ID, ORG_GROUP_ID, LAST_UPDATE_DATE, LAST_UPDATE_USER) VALUES" & _
                                        "('" & pDsLdapUsers.Tables(0).Rows(intCount).Item("USER_ID") & "','" & pOrgGrpId & "'," & _
                                        " GETDATE(),'" & pDsLdapUsers.Tables(0).Rows(intCount).Item("CREATE_USER_ID") & "') "

                    If log.IsInfoEnabled Then log.Info(_strSQL)
                    Try
                        m_localdb.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                        trans.Rollback()
                        Throw New Exception("Insert into MT_ATPAR_USER_ORG_GROUPS failed: " & _strSQL, ex)
                        SaveLdapUsers = ATPAR_E_LOCALDBSELECTFAIL
                        Exit Function
                    End Try

                    'insert userparameters
                    Try
                        _strSQL = String.Empty
                        _strSQL = " SELECT APP_ID, PARAMETER_ID, DEFAULT_VALUE AS PARAMETER_VALUE FROM MT_ATPAR_PARAM_MASTER " & _
                                  " WHERE PARAMETER_LEVEL='USER' AND ENTERPRISE_SYSTEM = '" & _strEnterpriseSystem & "'" & _
                                  " AND APP_ID IN (SELECT DISTINCT APP_ID FROM MT_ATPAR_PROFILE_APP_ACL " & _
                                  " WHERE (CLIENT_USER='Y' OR SERVER_USER='Y') AND PROFILE_ID = '" & pProfileID & "')"

                        If log.IsInfoEnabled Then log.Info(methodBaseName & _strSQL)

                        _dsProfileParams = m_localdb.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                    Catch ex As Exception
                        trans.Rollback()
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                        SaveLdapUsers = ATPAR_E_LOCALDBSELECTFAIL
                        Exit Function
                    End Try

                    If _dsProfileParams.Tables.Count > 0 Then
                        For intProfileCount As Integer = 0 To _dsProfileParams.Tables(0).Rows.Count - 1
                            _strSQL = String.Empty
                            Try
                                _strSQL = "INSERT INTO MT_ATPAR_USER_APP_PARAMETERS (APP_ID, USER_ID, PARAMETER_ID, PARAMETER_VALUE, " & _
                                            " LAST_UPDATE_DATE, LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) " & _
                                            " VALUES('" & _dsProfileParams.Tables(0).Rows(intProfileCount).Item("APP_ID") & "', " & _
                                            " '" & pDsLdapUsers.Tables(0).Rows(intCount).Item("USER_ID") & "', " & _
                                            " '" & _dsProfileParams.Tables(0).Rows(intProfileCount).Item("PARAMETER_ID") & "'," & _
                                            " '" & _dsProfileParams.Tables(0).Rows(intProfileCount).Item("PARAMETER_VALUE") & "', " & _
                                            "GETDATE()," & _
                                            "''," & _
                                            "'')"
                                If log.IsInfoEnabled Then log.Info(methodBaseName & _strSQL)
                                m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                            Catch ex As Exception
                                trans.Rollback()
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                                SaveLdapUsers = ATPAR_E_LOCALDBINSERTFAIL
                                Exit Function
                            End Try
                        Next
                    End If
                Next
            Else

                'MT_ATPAR_USER
                _strSQL = String.Empty
                _strSQL = " INSERT INTO MT_ATPAR_USER (USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL," & _
                             " EMAIL_ID, PHONE1, FAX, CREATE_USER_ID, PROFILE_ID, CREATE_DATE, LDAP_USER,LAST_UPDATE_DATE,LAST_UPDATE_USER, USERDN) VALUES" & _
                             "('" & pUserDtlsArr(0) & "','" & substituteString(pUserDtlsArr(1)) & "', " & _
                             " '" & substituteString(pUserDtlsArr(2)) & "','" & pUserDtlsArr(3) & "'," & _
                             " '" & pUserDtlsArr(4) & "','" & pUserDtlsArr(5) & "'," & _
                             " '" & pUserDtlsArr(6) & "','" & pUserDtlsArr(8) & "'," & _
                             " '" & pProfileID & "',GETDATE(),'Y',GETDATE(),'" & pUserDtlsArr(8) & "'," & _
                             " '" & substituteString(pUserDtlsArr(7)) & "')"

                If log.IsInfoEnabled Then log.Info(_strSQL)
                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                    Throw New Exception("Insert into MT_ATPAR_USER failed: " & _strSQL, ex)
                End Try


                'MT_ATPAR_USER_ACL
                _strSQL = String.Empty
                _strSQL = " INSERT INTO MT_ATPAR_USER_ACL (USER_ID, TOKEN_EXPIRY_PERIOD, LOGIN_ALLOWED, PASSHASH_REQUIRED, TIME_RESTRICTIONS," & _
                             " ACCOUNT_DISABLED, IDLE_TIME, INVALID_LOGIN_ATTEMPTS, PASSWD_RESET_REQUIRED, REPORT_USER, RECORDS_PER_PAGE, " & _
                             " DEFAULT_REPORT_DURATION, PASSWD_UPDATE_DATE, PASSWD_EXPT_DATE) VALUES('" & pUserDtlsArr(0) & "'," & _
                             " '" & pSessionTime & "',1,1,'" & pUserDtlsArr(9) & "'," & _
                             " 0 ,'" & pIdleTime & "',0,'N',0,10,10,'" & Now() & "','" & DateAdd(DateInterval.Day, intPwdExp, Now()) & "')"

                If log.IsInfoEnabled Then log.Info(_strSQL)

                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                    Throw New Exception("Insert into MT_ATPAR_USER_ACL failed: " & _strSQL, ex)
                End Try

                'MT_ATPAR_USER_ORG_GROUPS

                _strSQL = String.Empty
                _strSQL = "INSERT INTO MT_ATPAR_USER_ORG_GROUPS (USER_ID, ORG_GROUP_ID, LAST_UPDATE_DATE, LAST_UPDATE_USER) VALUES" & _
                                    "('" & pUserDtlsArr(0) & "','" & pOrgGrpId & "'," & _
                                    " GETDATE(),'" & pUserDtlsArr(8) & "') "

                If log.IsInfoEnabled Then log.Info(_strSQL)
                Try
                    m_localdb.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                    Throw New Exception("Insert into MT_ATPAR_USER_ORG_GROUPS failed: " & _strSQL, ex)
                End Try

                'insert userparameters
                Try
                    _strSQL = String.Empty
                    _strSQL = " SELECT APP_ID, PARAMETER_ID, DEFAULT_VALUE AS PARAMETER_VALUE FROM MT_ATPAR_PARAM_MASTER " & _
                              " WHERE PARAMETER_LEVEL='USER' AND ENTERPRISE_SYSTEM = '" & _strEnterpriseSystem & "'" & _
                              " AND APP_ID IN (SELECT DISTINCT APP_ID FROM MT_ATPAR_PROFILE_APP_ACL " & _
                              " WHERE (CLIENT_USER='Y' OR SERVER_USER='Y') AND PROFILE_ID = '" & pProfileID & "')"

                    If log.IsInfoEnabled Then log.Info(methodBaseName & _strSQL)

                    _dsProfileParams = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                Catch ex As Exception
                    trans.Rollback()
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                  _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                    SaveLdapUsers = ATPAR_E_LOCALDBSELECTFAIL
                    Exit Function
                End Try

                If _dsProfileParams.Tables.Count > 0 Then
                    For intProfileCount As Integer = 0 To _dsProfileParams.Tables(0).Rows.Count - 1
                        _strSQL = String.Empty
                        Try
                            _strSQL = "INSERT INTO MT_ATPAR_USER_APP_PARAMETERS (APP_ID, USER_ID, PARAMETER_ID, PARAMETER_VALUE, " & _
                                        " LAST_UPDATE_DATE, LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) " & _
                                        " VALUES('" & _dsProfileParams.Tables(0).Rows(intProfileCount).Item("APP_ID") & "', " & _
                                        " '" & pUserDtlsArr(0) & "', " & _
                                        " '" & _dsProfileParams.Tables(0).Rows(intProfileCount).Item("PARAMETER_ID") & "'," & _
                                        " '" & _dsProfileParams.Tables(0).Rows(intProfileCount).Item("PARAMETER_VALUE") & "', " & _
                                        "GETDATE()," & _
                                        "''," & _
                                        "'')"
                            If log.IsInfoEnabled Then log.Info(methodBaseName & _strSQL)
                            m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL), trans)
                        Catch ex As Exception
                            trans.Rollback()
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                  _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                            SaveLdapUsers = ATPAR_E_LOCALDBINSERTFAIL
                            Exit Function
                        End Try
                    Next
                End If
            End If

            trans.Commit()
            Return ATPAR_OK
        Catch ex As Exception
            trans.Rollback()
            If log.IsFatalEnabled Then log.Fatal("Failed to SaveLDAPUsers " & ex.ToString)
            Return ATPAR_E_LOCALDBINSERTFAIL
        Finally
            If sqlConnect.State <> ConnectionState.Closed Then
                sqlConnect.Close()
            End If
        End Try

    End Function

    ''' <summary>
    ''' To get the Servertime
    ''' </summary>
    ''' <returns>System time</returns>
    ''' <remarks></remarks>
    Public Function tagGetServerTime()

        Dim SysTime As systemtime
        GetSystemTime(SysTime)
        tagGetServerTime = IIf(SysTime.wmonth > 9, SysTime.wmonth, ("0" & SysTime.wmonth)) & _
                           "/" & _
                           IIf(SysTime.wday > 9, SysTime.wday, ("0" & SysTime.wday)) & _
                           "/" & _
                           SysTime.wyear & _
                           " " & _
                           IIf(SysTime.whour > 9, SysTime.whour, ("0" & SysTime.whour)) & _
                           ":" & _
                           IIf(SysTime.wminute > 9, SysTime.wminute, ("0" & SysTime.wminute)) & _
                           ":" & _
                           IIf(SysTime.wsecond > 9, SysTime.wsecond, ("0" & SysTime.wsecond)) & _
                           ":" & SysTime.wmilliseconds
    End Function

    ''' <summary>
    ''' To get the localtime zone
    ''' </summary>
    ''' <param name="ReturnValue">Timezone to be returned</param>
    ''' <returns>Timezone value</returns>
    ''' <remarks></remarks>
    Public Function LocalTimeZone(ByVal ReturnValue As TimeZoneReturn) As Object

        ' UTC_BaseOffset = UTC offset, not including DST
        ' UTC_Offset = UTC offset, including DST if active
        ' DST_Active = True if DST is currently active, otherwise false
        ' DST_Offset = Offset value for DST (generally -60, if in US)

        Dim x As Long
        Dim tzi As TIME_ZONE_INFORMATION
        Dim strName As String
        Dim bDST As Boolean

        Select Case GetTimeZoneInformation(tzi)
            ' if not daylight assume standard
            Case TIME_ZONE_ID_DAYLIGHT
                strName = tzi.DaylightName.ToString  ' convert to string
                bDST = True
            Case Else
                strName = tzi.StandardName.ToString
        End Select

        ' name terminates with null
        x = InStr(strName, vbNullChar)
        If x > 0 Then strName = strName.Substring(0, x - 1)

        If ReturnValue = TimeZoneReturn.DST_Active Then
            LocalTimeZone = bDST
        End If

        If ReturnValue = TimeZoneReturn.TimeZoneName Then
            LocalTimeZone = strName
        End If

        If ReturnValue = TimeZoneReturn.TimeZoneCode Then
            LocalTimeZone = strName.Substring(0, 1)
            x = InStr(1, strName, " ")
            Do While x > 0
                LocalTimeZone = LocalTimeZone & Mid(strName, x + 1, 1)
                x = InStr(x + 1, strName, " ", CompareMethod.Text)
            Loop
            LocalTimeZone = Trim(LocalTimeZone)
        End If

        If ReturnValue = TimeZoneReturn.UTC_BaseOffset Then
            LocalTimeZone = tzi.Bias
        End If

        If ReturnValue = TimeZoneReturn.DST_Offset Then
            LocalTimeZone = tzi.DaylightBias
        End If

        If ReturnValue = TimeZoneReturn.UTC_Offset Then
            If bDST Then
                LocalTimeZone = tzi.Bias + tzi.DaylightBias
            Else
                LocalTimeZone = tzi.Bias
            End If
        End If

    End Function

    'Function returns the value which is set in My Profile Screen for that particular logged in user,called by index.aspx
    ''' <summary>
    ''' To get the Preferences
    ''' </summary>
    ''' <param name="pStrPreference">Preference name</param>
    ''' <param name="pStrUID">UserId</param>
    ''' <param name="pStrRetVal">Return value</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetMyPreferences(ByVal pStrPreference As String, _
                                     ByVal pStrUID As String, _
                                     ByRef pStrRetVal As String, ByVal pDeviceTokenEntry() As String) As Long _
                                     Implements IAtPar_UserManagement.GetMyPreferences

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = " SELECT " & pStrPreference & " FROM MT_ATPAR_USER_ACL " & _
                      " WHERE USER_ID='" & pStrUID & "'"

            If log.IsInfoEnabled Then log.Info(_strSQL)

            pStrRetVal = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                                                _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

    End Function

    ''' <summary>
    ''' To get the User Status
    ''' </summary>
    ''' <param name="pSvrUserID">Server User ID</param>
    ''' <param name="pUserID">User ID</param>
    ''' <param name="pFirstName">First Name</param>
    ''' <param name="pLastname">Last Name</param>
    ''' <param name="pStatus">Status</param>
    ''' <param name="pdsUserStatus">User Status DataSet</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetUserStatus(ByVal pSvrUserID As String, ByVal pUserId As String, _
                                  ByVal pFirstName As String, _
                                  ByVal pLastName As String, _
                                  ByVal pStatus As String, _
                                  ByRef pdsUserStatus As DataSet, _
                                  ByVal pOrgId As String, ByVal pProfileId As String, _
                                  ByVal pDeviceTokenEntry() As String) As Integer _
                                  Implements IAtPar_UserManagement.GetUserStatus

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pSvrUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        'NB-0004382
        Try
            _strSQL = " SELECT A.USER_ID, FIRST_NAME, LAST_NAME, CREATE_DATE, ACCOUNT_DISABLED , PROFILE_ID , ORG_GROUP_ID FROM MT_ATPAR_USER A," & _
                      " MT_ATPAR_USER_ACL B, MT_ATPAR_USER_ORG_GROUPS C WHERE A.USER_ID = B.USER_ID AND A.USER_ID = C.USER_ID  "

            If (pOrgId <> "ALL") Then
                _strSQL = _strSQL & " AND (C.ORG_GROUP_ID = '" & pOrgId & "' OR C.ORG_GROUP_ID ='') "
            End If
            If (pProfileId <> "ADMIN") Then
                _strSQL = _strSQL & " AND PROFILE_ID <> 'ADMIN' "
            End If
            'RK-0005045
            If Not String.IsNullOrEmpty(pUserId) Then
                _strSQL = _strSQL & "AND A.USER_ID LIKE '" & pUserId & "%' "
            End If
            If Not String.IsNullOrEmpty(pFirstName) Then
                _strSQL = _strSQL & "AND FIRST_NAME LIKE '" & pFirstName & "%' "
            End If
            If Not String.IsNullOrEmpty(pLastName) Then
                _strSQL = _strSQL & "AND LAST_NAME LIKE'" & pLastName & "%' "
            End If

            If pStatus = 1 Then
                _strSQL = _strSQL & "AND ACCOUNT_DISABLED=0 "
            ElseIf pStatus = 2 Then
                _strSQL = _strSQL & "AND ACCOUNT_DISABLED=1 "
            End If

            _strSQL = _strSQL & " ORDER BY A.USER_ID "

            If log.IsInfoEnabled Then log.Info(_strSQL)

            pdsUserStatus = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))

            If pdsUserStatus.Tables(0).Rows.Count = 0 Then
                Return E_NORECORDFOUND
            Else
                Return ATPAR_OK
            End If
        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                           _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Throw New Exception("GetUserStatus Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                           _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Throw New Exception("GetUserStatus Failed", ex)
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' To Update the User Status
    ''' </summary>
    ''' <param name="pSvrUserID">Server User ID</param>
    ''' <param name="pUserID">User ID</param>
    ''' <param name="pStatus">Status</param>
    ''' <returns>ATPAR_OK on Success else Error Code</returns>
    ''' <remarks></remarks>
    Public Function UpdateUserStatus(ByVal pSvrUserID As String, ByVal pUserId As String, _
                                     ByVal pStatus As String, ByVal pDeviceTokenEntry() As String) As Integer _
                                     Implements IAtPar_UserManagement.UpdateUserStatus

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pSvrUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = "UPDATE MT_ATPAR_USER_ACL SET ACCOUNT_DISABLED = " & pStatus & ", INVALID_LOGIN_ATTEMPTS=0 WHERE USER_ID ='" & pUserId & "' "

            If log.IsInfoEnabled Then log.Info(_strSQL)

            m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            Return ATPAR_OK
        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                          _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Throw New Exception("UpdateUserStatus Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                          _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Throw New Exception("UpdateUserStatus Failed", ex)
            Return E_SERVERERROR
        End Try

    End Function


    ''' <summary>
    ''' To check whether menu is assigned for a user or not
    ''' </summary>
    ''' <param name="sqlex">SqlException object</param>
    ''' <returns>Exception in String format</returns>
    ''' <remarks></remarks>
    Public Function IsMenuAssigned(ByVal pUserID As String, ByVal pProfileID As String, ByVal pStrChkMenuName As String, _
        ByRef pIntCnt As Integer, ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.IsMenuAssigned

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = "SELECT COUNT(*) FROM MT_ATPAR_PROFILE_MENU A, MT_ATPAR_MENUS B " & _
                            " WHERE A.PROFILE_ID = '" & pProfileID & "' AND B.MENU_NAME = '" & pStrChkMenuName & "'" & _
                            " AND A.MENU_CODE = B.MENU_CODE "

            If log.IsInfoEnabled Then log.Info(_strSQL)
            pIntCnt = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                     _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                    _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK
    End Function

    'DK-0005948-03/12/2009
    ''' <summary>
    ''' To get the Menus
    ''' </summary>
    ''' <param name="pAppId">AppId</param>
    ''' <param name="pProfileId">ProfileId</param>
    ''' <param name="pDSMenus">Dataset containing MenusIds of the Organisation </param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetMenus(ByVal pAppId As String, ByVal pProfileId As String, _
                             ByRef pDSMenus As DataSet, ByVal pDeviceTokenEntry() As String) As Long _
                                                       Implements IAtPar_UserManagement.GetMenus

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _strEnterpriseSystem As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strEnterpriseSystem = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get the enterprise system name " _
                                                                & ex.ToString & ":" & vbCrLf)
            Return E_SERVERERROR
        End Try

        _strSQL = " SELECT A.MENU_CODE, A.MENU_NAME, B.APP_ID FROM MT_ATPAR_MENUS A, MT_ATPAR_PROFILE_MENU B" _
                  & " WHERE A.MENU_CODE = B.MENU_CODE and B.APP_ID=" & pAppId & " AND B.PROFILE_ID = '" & pProfileId & "' " _
                  & " AND A.ENTERPRISE_SYSTEM='" & _strEnterpriseSystem & "' AND A.APP_ID = B.APP_ID ORDER BY B.MENU_SEQ_NO"
        If log.IsInfoEnabled Then log.Info(methodBaseName & " : " & _strSQL)
        Try
            pDSMenus = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
            If pDSMenus.Tables.Count > 0 Then
                If pDSMenus.Tables(0).Rows.Count > 0 Then
                    If log.IsDebugEnabled Then log.Debug("Menus count for APP_ID: " & pAppId & " and PROFILE_ID:" & pProfileId & _
                    ":" & pDSMenus.Tables(0).Rows.Count)
                End If
            Else
                If log.IsDebugEnabled Then log.Debug("No Assigned menus for APP_ID: " & pAppId & " and PROFILE_ID:" & pProfileId)
            End If
            GetMenus = ATPAR_OK

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                          _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : SQLExceptionMessageString : ", sqlex)
            GetMenus = ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                        _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : Failed :Exception : ", ex)
            GetMenus = E_SERVERERROR
        End Try

    End Function

	'DK-0005948-03/12/2009
    ''' <summary>
    ''' To get the Application Name
    ''' </summary>
    ''' <param name="pAppId">AppId</param>
    ''' <param name="pAppName">AppName</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetAppName(ByVal pAppId As String, _
                               ByRef pAppName As String, _
                               ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.GetAppName

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _strSQL = "SELECT APP_NAME FROM MT_ATPAR_APP WHERE APP_ID=" & pAppId & ""
        If log.IsInfoEnabled Then log.Info(methodBaseName & " : " & _strSQL)
        Try
            pAppName = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))
            GetAppName = ATPAR_OK

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                      _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : SQLExceptionMessageString : ", sqlex)
            GetAppName = ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                     _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : Failed :Exception : ", ex)
            GetAppName = E_SERVERERROR
        End Try

    End Function

    'DK-0005948-03/12/2009
    ''' <summary>
    ''' To get the Application Role IDs
    ''' </summary>
    ''' <param name="pUserId">pUserId</param>
    ''' <param name="pDSAppRoleIds">Dataset to get the App role Ids</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetAppRoleIDs(ByVal pUserId As String, _
                                  ByRef pDSAppRoleIds As DataSet, _
                                  ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.GetAppRoleIDs

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _strSQL = " SELECT A.PROFILE_ID,A.LDAP_USER, B.APP_ID, B.SERVER_USER, B.CLIENT_USER" _
                & " FROM MT_ATPAR_USER A, MT_ATPAR_PROFILE_APP_ACL B" _
                & " WHERE A.PROFILE_ID = B.PROFILE_ID AND " _
                & " A.USER_ID ='" & pUserId & "' AND B.SERVER_USER='Y' ORDER BY APP_ID"

        If log.IsInfoEnabled Then log.Info(methodBaseName & " : " & _strSQL)
        Try
            pDSAppRoleIds = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
            If pDSAppRoleIds.Tables.Count > 0 Then
                If pDSAppRoleIds.Tables(0).Rows.Count > 0 Then
                    If log.IsDebugEnabled Then log.Debug("User Profile products count:" & pDSAppRoleIds.Tables(0).Rows.Count)
                End If
            Else
                If log.IsDebugEnabled Then log.Debug("Profile assigned to user doesnot have products: " & pDSAppRoleIds.Tables(0).Rows.Count)
            End If

            GetAppRoleIDs = ATPAR_OK

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                 _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : SQLExceptionMessageString : ", sqlex)
            GetAppRoleIDs = ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : Failed :Exception : ", ex)
            GetAppRoleIDs = E_SERVERERROR
        End Try

    End Function

	'DK-0005948-03/12/2009
    ''' <summary>
    ''' To get the User info for given a User ID
    ''' </summary>
    ''' <param name="pUserId">pUserId</param>
    ''' <param name="pDSUserParam">Dataset of User Parameters</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetUser(ByVal pUserId As String, _
                            ByRef pDSUserParam As DataSet, _
                            ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.GetUser

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _strSQL = "SELECT MT_ATPAR_USER.USER_ID AS USER_ID, MT_ATPAR_USER.PASSHASH AS PASSHASH, MT_ATPAR_USER.FIRST_NAME AS FIRST_NAME, " & _
                       "MT_ATPAR_USER.LAST_NAME AS LAST_NAME, MT_ATPAR_USER.MIDDLE_INITIAL AS MIDDLE_INITIAL, MT_ATPAR_USER.EMAIL_ID AS EMAIL_ID, " & _
                       "MT_ATPAR_USER.PHONE1 AS PHONE1, MT_ATPAR_USER.PHONE2 AS PHONE2, MT_ATPAR_USER.FAX AS FAX, MT_ATPAR_USER.PAGER AS PAGER, " & _
                       "MT_ATPAR_USER_ACL.TOKEN_EXPIRY_PERIOD AS TOKEN_EXPIRY_PERIOD, " & _
                       "MT_ATPAR_USER_ACL.LOGIN_ALLOWED AS LOGIN_ALLOWED, MT_ATPAR_USER_ACL.PASSHASH_REQUIRED AS PASSHASH_REQUIRED, MT_ATPAR_USER_ACL.TIME_RESTRICTIONS AS TIME_RESTRICTIONS, " & _
                       "MT_ATPAR_USER_ACL.ACCOUNT_DISABLED AS ACCOUNT_DISABLED, MT_ATPAR_USER_ACL.IDLE_TIME AS IDLE_TIME, MT_ATPAR_USER_ACL.PASSWD_RESET_REQUIRED AS PASSWD_RESET_REQUIRED, " & _
                       "MT_ATPAR_USER_ACL.REPORT_USER AS REPORT_USER, MT_ATPAR_USER_ACL.RECORDS_PER_PAGE AS RECORDS_PER_PAGE, MT_ATPAR_USER_ACL.DEFAULT_REPORT_DURATION AS DEFAULT_REPORT_DURATION, " & _
                       "MT_ATPAR_USER.LDAP_USER FROM MT_ATPAR_USER INNER JOIN MT_ATPAR_USER_ACL " & _
                       "ON MT_ATPAR_USER.USER_ID = MT_ATPAR_USER_ACL.USER_ID " & _
                       "WHERE MT_ATPAR_USER.USER_ID= '" & pUserId & "'"




        If log.IsInfoEnabled Then log.Info(methodBaseName & " : " & _strSQL)
        Try
            pDSUserParam = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
            GetUser = ATPAR_OK

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                     _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : SQLExceptionMessageString : ", sqlex)
            GetUser = ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                    _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : Failed :Exception : ", ex)
            GetUser = E_SERVERERROR
        End Try

    End Function

    'DK-0005948-03/12/2009
    ''' <summary>
    ''' To get the Org Group ID for a given User ID
    ''' </summary>
    ''' <param name="pUserId">pUserId</param>
    ''' <param name="pOrgGroupId">Org Group ID</param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
    ''' <remarks></remarks>
    Public Function GetUserOrgGrpID(ByVal pUserId As String, _
                                    ByRef pOrgGroupId As String, _
                                    ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.GetUserOrgGrpID

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _strSQL = "SELECT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUPS " & _
        "WHERE ORG_GROUP_ID=(SELECT ORG_GROUP_ID FROM MT_ATPAR_USER_ORG_GROUPS WHERE USER_ID='" & pUserId & "')"

        If log.IsInfoEnabled Then log.Info(methodBaseName & " : " & _strSQL)
        Try
            pOrgGroupId = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))
            GetUserOrgGrpID = ATPAR_OK

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                      _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : SQLExceptionMessageString : ", sqlex)
            GetUserOrgGrpID = ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                     _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Throw New Exception(methodBaseName & " : Failed :Exception : ", ex)
            GetUserOrgGrpID = E_SERVERERROR
        End Try

    End Function

End Class
#End Region

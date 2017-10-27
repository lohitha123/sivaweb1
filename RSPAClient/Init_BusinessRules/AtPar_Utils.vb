#Region "Imports"
Imports System.AppDomain
Imports System.Xml
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports Microsoft.ApplicationBlocks.Data
Imports System.Reflection
Imports System.Threading
Imports AtPar_BusinessRules_RemotingProxy
Imports System.IO
Imports log4net
Imports System.Text
Imports System.Net.mail
Imports System.Data
Imports System.Net
Imports System.Net.Mime
Imports System.Web

#End Region

#Region "Bug Fixes"
'SM-0006018-03/12/2009
'VD-0007458-08-05-2009
#End Region

Public Class AtPar_Utils
    Inherits AtPar_Application_Base
    Implements IAtPar_Utils
    Implements IDisposable

    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_Utils))
    'Private sqlConnect As SqlConnection

    ''' <summary>
    ''' To get User Parameter Values
    ''' </summary>
    ''' <param name="pUserID">User ID</param>
    ''' <param name="pStrTableName">Table Name</param>
    ''' <param name="pStrFieldName">Field Name</param>
    ''' <param name="pStrWhereCondition">Where Condition</param>
    ''' <param name="pDSParameterValues">Dataset Parameter Values</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
	''' <remarks></remarks>
    Public Function GetParameterValues(ByVal pUserID As String, ByVal pStrTableName As String, ByVal pStrFieldName As String, _
                                       ByVal pStrWhereCondition As String, ByRef pDSParameterValues As DataSet, ByVal pDeviceTokenEntry() As String, ByVal pParameterId As String) As Long _
                                       Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetParameterValues

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        If pParameterId.ToLower() = AppParameters_Enum.DEFAULT_DISTRIB_TYPE.ToString().ToLower Then
            _sbSQL.Append("SELECT DISTINCT ").Append(pStrFieldName).Append(" FROM ").Append(pStrTableName).Append(" WHERE ").Append(pStrWhereCondition).Append(" ")
        Else
            _sbSQL.Append("SELECT ").Append(pStrFieldName).Append(" FROM ").Append(pStrTableName).Append(" WHERE ").Append(pStrWhereCondition).Append(" ")
        End If

        Try
            If log.IsInfoEnabled Then log.Info(_sbSQL.ToString())

            pDSParameterValues = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))

            If pDSParameterValues.Tables(0).Rows.Count = 0 Then
                GetParameterValues = E_NORECORDFOUND
                Exit Function
            Else
                GetParameterValues = ATPAR_OK
            End If
        Catch ex As Exception
            GetParameterValues = ATPAR_E_LOCALDBSELECTFAIL
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get ParameterValues " & vbCrLf & _
                                                                " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                                " Exception is:" & ex.ToString & vbCrLf)
            Exit Function

        End Try

    End Function

    ''' <summary>
    ''' To get latest AtPar Values, called by mt_atpar_assign_profiles.aspx
    ''' </summary>
    ''' <param name="appId">Application Id</param>
    ''' <param name="fieldName">Field Name</param>
    ''' <param name="latestVal">Latest value</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetAtparLatestValues(ByVal appId As String, ByVal fieldName As String, _
                                         ByRef latestVal As Long, ByVal pDeviceTokenEntry() As String) As Long Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetAtparLatestValues

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSelect, _sbUpdate As New StringBuilder

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _sbSelect.Append(" SELECT LATEST_VALUE FROM MT_ATPAR_LATEST_VALUES ")
            _sbSelect.Append(" WHERE APP_ID=").Append(appId).Append(" AND FIELD_ID='").Append(fieldName).Append("'")

            If log.IsDebugEnabled Then log.Debug(_sbSelect.ToString())

            latestVal = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSelect.ToString()))

            Try
                latestVal = latestVal + 1
                _sbUpdate.Append(" UPDATE MT_ATPAR_LATEST_VALUES  ")
                _sbUpdate.Append(" SET LATEST_VALUE=").Append(latestVal).Append(" ")
                _sbUpdate.Append(" WHERE APP_ID=").Append(appId).Append(" AND FIELD_ID='").Append(fieldName).Append("'")

                If log.IsInfoEnabled Then log.Info(_sbUpdate.ToString())

                m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbUpdate.ToString()))

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to update AtparLatestValues " & vbCrLf & _
                                                               " with the following SQL :" & _sbUpdate.ToString & vbCrLf & _
                                                               " Exception is:" & ex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBUPDATEFAIL
                Exit Function
            End Try
            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get AtparLatestValues " & vbCrLf & _
                                                               " with the following SQL :" & _sbSelect.ToString & vbCrLf & _
                                                               " Exception is:" & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try
    End Function

    ''' <summary>
    ''' To get Allowed Audit Data; called by mt_atpar_assign_profiles.aspx, mt_atpar_audit_setup.aspx
    ''' mt_atpar_define_groups.aspx, mt_atpar_manage_devices.aspx, mt_user_parameter.aspx, mt_atpar_manage_profiles.aspx
    ''' </summary>
    ''' <param name="pUserID">User ID</param>
    ''' <param name="intAppId">Application id</param>
    ''' <param name="strMenuCode">Menu Code</param>
    ''' <param name="pStrAudit">Audit Report</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetAuditAllowed(ByVal pUserID As String, ByVal intAppId As Integer, _
                                    ByVal strMenuCode As String, ByRef pStrAudit As String, _
                                    ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetAuditAllowed

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
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

        Try

            _sbSQL.Append(" SELECT AUDIT FROM MT_ATPAR_MENUS WHERE APP_ID='").Append(intAppId).Append("'")
            _sbSQL.Append(" AND MENU_CODE='").Append(strMenuCode).Append("'")
            _sbSQL.Append(" AND ENTERPRISE_SYSTEM = '").Append(_strEnterpriseSystem).Append("'")

            If log.IsInfoEnabled Then log.Info(_sbSQL.ToString())

            pStrAudit = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))

            If String.IsNullOrEmpty(pStrAudit) Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " No Data Found")
                Return E_NORECORDFOUND
            Else
                Return ATPAR_OK
            End If

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get Audit info  " & vbCrLf & _
                                                               " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                               " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("GetAuditAllowed Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get Audit info " & vbCrLf & _
                                                              " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                              " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetAuditAllowed Failed", ex)
            Return E_SERVERERROR
        End Try
    End Function

    ''' <summary>
    ''' To get Business Units List
    ''' </summary>
    ''' <param name="pUserId">user id</param>
    ''' <param name="psDSBUList">dataset contains Business Units List</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetBUList(ByVal pUserId As String, _
                              ByRef psDSBUList As System.Data.DataSet, _
                              ByVal pDeviceTokenEntry() As String) As Long Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetBUList

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        'NB- 4068 07/19/2008
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL, _sbSelect As New StringBuilder
        Dim pOrgValue As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _sbSQL.Append(" SELECT ORG_GROUP_ID FROM MT_ATPAR_USER_ORG_GROUPS ")
        _sbSQL.Append(" WHERE USER_ID='").Append(pUserId).Append("'")

        If log.IsInfoEnabled Then log.Info(_sbSQL.ToString())

        Try
            pOrgValue = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get org group ID " & vbCrLf & _
                                                               " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                               " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("GetBUList Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get org group ID " & vbCrLf & _
                                                              " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                              " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetBUList Failed", ex)
            Return E_SERVERERROR
        End Try

        If UCase(pOrgValue) = "ALL" Then
            _sbSelect.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS")
        Else
            _sbSelect.Append(" SELECT B.BUSINESS_UNIT FROM MT_ATPAR_USER_ORG_GROUPS A, ")
            _sbSelect.Append(" MT_ATPAR_ORG_GROUP_BUNITS B ")
            _sbSelect.Append(" WHERE A. ORG_GROUP_ID = B.ORG_GROUP_ID AND A.USER_ID ='").Append(pUserId).Append("' ")

        End If
        If log.IsDebugEnabled Then log.Debug(_sbSelect.ToString())

        Try
            psDSBUList = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSelect.ToString()))
        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get org group bunits " & vbCrLf & _
                                                                 " with the following SQL :" & _sbSelect.ToString & vbCrLf & _
                                                                 " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("GetBUList Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get org group bunits " & vbCrLf & _
                                                               " with the following SQL :" & _sbSelect.ToString & vbCrLf & _
                                                               " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetBUList Failed", ex)
            Return E_SERVERERROR
        End Try
        Return ATPAR_OK
    End Function

    'SM-0005620
    ''' <summary>
    ''' To return distinct BusinessUnits List(Inventory or Purchasing)
    ''' based on Business Unit Type parameter sent to the function
    ''' </summary>
    ''' <param name="pUserId">User ID</param>
    ''' <param name="pBusinessUnitType">Business Unit type (Inventory/Purchasing)</param>
    ''' <param name="psDSBUList">dataset contains Business Units List</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetBusinessUnits(ByVal pUserId As String, ByVal pBusinessUnitType As String, _
                                     ByRef psDSBUList As System.Data.DataSet, ByVal pDeviceTokenEntry() As String) As Long _
                                     Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetBusinessUnits

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strOrgId As String = String.Empty
        Dim _dsOrgGrpList As System.Data.DataSet = Nothing
        Dim intRCnt As Integer
        Dim strOrgValue As String = String.Empty
        Dim _StatusCode As Long

        Dim _sbSQL, _sbSelect As New StringBuilder

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _sbSQL.Append(" SELECT ORG_GROUP_ID FROM MT_ATPAR_USER_ORG_GROUPS ")
        _sbSQL.Append(" WHERE USER_ID='").Append(pUserId).Append("'")

        If log.IsInfoEnabled Then log.Info(_sbSQL.ToString())

        Try
            _strOrgId = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))
        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get OrgGroupID " & vbCrLf & _
                                                              " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                              " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("GetBusinessUnits Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get OrgGroupID " & vbCrLf & _
                                                              " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                              " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetBusinessUnits Failed", ex)
            Return E_SERVERERROR
        End Try

        If UCase(_strOrgId) <> "ALL" Then
            Try
                If Not String.IsNullOrEmpty(_strOrgId) Then
                    _StatusCode = GetUserOrgGroupList(_strOrgId, _dsOrgGrpList)
                    If _StatusCode = ATPAR_OK Then
                        If _dsOrgGrpList.Tables.Count > 0 Then
                            For i As Integer = 0 To _dsOrgGrpList.Tables(0).Rows.Count - 1
                                If i = 0 Then
                                    intRCnt = 0
                                End If
                                With _dsOrgGrpList.Tables(0).Rows(i)
                                    If intRCnt = 0 Then
                                        strOrgValue = "'" & .Item("ORG_GROUP_ID") & "'"
                                        intRCnt = intRCnt + 1
                                    Else
                                        strOrgValue = strOrgValue & ",'" & .Item("ORG_GROUP_ID") & "'"
                                    End If

                                End With
                            Next
                        End If
                    End If
                End If
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal("GetBusinessUnits call failed " & ex.ToString)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Finally
                _dsOrgGrpList = Nothing
            End Try
        End If

        'Condition to check whether butype is inventory or purchasing

        If pBusinessUnitType = AtparEnums.BusinessType.Inventory Then
            If UCase(_strOrgId) = "ALL" Then
                _sbSelect.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BU_TYPE= '").Append(BU_TYPE_INVENTORY).Append("' ")
            Else
                If Not String.IsNullOrEmpty(strOrgValue) Then
                    _sbSelect.Append(" SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  ")
                    _sbSelect.Append(" WHERE ORG_GROUP_ID IN (").Append(strOrgValue).Append(") AND BU_TYPE= '").Append(BU_TYPE_INVENTORY).Append("' ")
                End If
            End If
        ElseIf pBusinessUnitType = AtparEnums.BusinessType.Purchasing Then
            If UCase(_strOrgId) = "ALL" Then
                _sbSelect.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BU_TYPE= '").Append(BU_TYPE_PURCHASING).Append("' ")
            Else
                If Not String.IsNullOrEmpty(strOrgValue) Then
                    _sbSelect.Append(" SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  ")
                    _sbSelect.Append(" WHERE ORG_GROUP_ID IN (").Append(strOrgValue).Append(") AND BU_TYPE= '").Append(BU_TYPE_PURCHASING).Append("' ")
                End If
            End If
        ElseIf pBusinessUnitType = AtparEnums.BusinessType.AllBunits Then
            If UCase(_strOrgId) = "ALL" Then
                _sbSelect.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ")
            Else
                If Not String.IsNullOrEmpty(strOrgValue) Then
                    _sbSelect.Append(" SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  ")
                    _sbSelect.Append(" WHERE ORG_GROUP_ID IN (").Append(strOrgValue).Append(")")
                End If
            End If
        End If

        If log.IsInfoEnabled Then log.Info(_sbSelect.ToString())

        Try
            If _sbSelect.Length > 0 Then
                psDSBUList = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSelect.ToString()))
            Else
                'SM-0005770
                GetBusinessUnits = E_NORECORDFOUND
                Exit Function
            End If

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get bunits " & vbCrLf & _
                                                              " with the following SQL :" & _sbSelect.ToString & vbCrLf & _
                                                              " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("GetBusinessUnits Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get bunits " & vbCrLf & _
                                                             " with the following SQL :" & _sbSelect.ToString & vbCrLf & _
                                                             " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetBusinessUnits Failed", ex)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK
    End Function


    ''' <summary>
    ''' To get Business units based on Org group
    ''' </summary>
    ''' <param name="pUserId"></param>
    ''' <param name="pBusinessUnitType"></param>
    ''' <param name="psDSBUList"></param>
    ''' <param name="pDeviceTokenEntry"></param>
    ''' <param name="pOrgGroupID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetOrgGroupBUnits(ByVal pUserId As String, ByVal pBusinessUnitType As String, _
                                     ByRef psDSBUList As System.Data.DataSet, ByVal pDeviceTokenEntry() As String, _
                                      ByVal pOrgGroupID As String) As Long _
                                     Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetOrgGroupBUnits

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strOrgId As String = String.Empty
        Dim _dsOrgGrpList As System.Data.DataSet = Nothing
        Dim intRCnt As Integer
        Dim strOrgValue As String = String.Empty
        Dim _StatusCode As Long

        Dim _sbSQL, _sbSelect As New StringBuilder

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _sbSQL.Append(" SELECT ORG_GROUP_ID FROM MT_ATPAR_USER_ORG_GROUPS ")
        _sbSQL.Append(" WHERE USER_ID='").Append(pUserId).Append("'")

        If log.IsInfoEnabled Then log.Info(_sbSQL.ToString())

        Try

            If Not String.IsNullOrEmpty(pOrgGroupID) Then
                _strOrgId = pOrgGroupID
            Else
                _strOrgId = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))
            End If

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get OrgGroupID " & vbCrLf & _
                                                              " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                              " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("GetOrgGroupBUnits Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get OrgGroupID " & vbCrLf & _
                                                              " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                              " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetOrgGroupBUnits Failed", ex)
            Return E_SERVERERROR
        End Try

        If UCase(_strOrgId) <> "ALL" Then
            Try
                If Not String.IsNullOrEmpty(_strOrgId) Then
                    _StatusCode = GetUserOrgGroupList(_strOrgId, _dsOrgGrpList)
                    If _StatusCode = ATPAR_OK Then
                        If _dsOrgGrpList.Tables.Count > 0 Then
                            For i As Integer = 0 To _dsOrgGrpList.Tables(0).Rows.Count - 1
                                If i = 0 Then
                                    intRCnt = 0
                                End If
                                With _dsOrgGrpList.Tables(0).Rows(i)
                                    If intRCnt = 0 Then
                                        strOrgValue = "'" & .Item("ORG_GROUP_ID") & "'"
                                        intRCnt = intRCnt + 1
                                    Else
                                        strOrgValue = strOrgValue & ",'" & .Item("ORG_GROUP_ID") & "'"
                                    End If

                                End With
                            Next
                        End If
                    End If
                End If
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal("GetOrgGroupBUnits call failed " & ex.ToString)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Finally
                _dsOrgGrpList = Nothing
            End Try
        End If

        'Condition to check whether butype is inventory or purchasing

        If pBusinessUnitType = AtparEnums.BusinessType.Inventory Then
            If UCase(_strOrgId) = "ALL" Then
                _sbSelect.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BU_TYPE= '").Append(BU_TYPE_INVENTORY).Append("' ")
            Else
                If Not String.IsNullOrEmpty(strOrgValue) Then
                    _sbSelect.Append(" SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  ")
                    _sbSelect.Append(" WHERE ORG_GROUP_ID IN (").Append(strOrgValue).Append(") AND BU_TYPE= '").Append(BU_TYPE_INVENTORY).Append("' ")
                End If
            End If
        ElseIf pBusinessUnitType = AtparEnums.BusinessType.Purchasing Then
            If UCase(_strOrgId) = "ALL" Then
                _sbSelect.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BU_TYPE= '").Append(BU_TYPE_PURCHASING).Append("' ")
            Else
                If Not String.IsNullOrEmpty(strOrgValue) Then
                    _sbSelect.Append(" SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  ")
                    _sbSelect.Append(" WHERE ORG_GROUP_ID IN (").Append(strOrgValue).Append(") AND BU_TYPE= '").Append(BU_TYPE_PURCHASING).Append("' ")
                End If
            End If
        ElseIf pBusinessUnitType = AtparEnums.BusinessType.AllBunits Then
            If UCase(_strOrgId) = "ALL" Then
                _sbSelect.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ")
            Else
                If Not String.IsNullOrEmpty(strOrgValue) Then
                    _sbSelect.Append(" SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  ")
                    _sbSelect.Append(" WHERE ORG_GROUP_ID IN (").Append(strOrgValue).Append(")")
                End If
            End If
        End If

        If log.IsInfoEnabled Then log.Info(_sbSelect.ToString())

        Try
            If _sbSelect.Length > 0 Then
                psDSBUList = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSelect.ToString()))
            Else
                'SM-0005770
                GetOrgGroupBUnits = E_NORECORDFOUND
                Exit Function
            End If

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get bunits " & vbCrLf & _
                                                              " with the following SQL :" & _sbSelect.ToString & vbCrLf & _
                                                              " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("GetOrgGroupBUnits Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get bunits " & vbCrLf & _
                                                             " with the following SQL :" & _sbSelect.ToString & vbCrLf & _
                                                             " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetOrgGroupBUnits Failed", ex)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK
    End Function


    'SM-0005620
    ''' <summary>
    ''' To get Org Group IDs allocated for a User
    ''' </summary>
    ''' <param name="pstrOrgGrpId">Org Group Id</param>
    ''' <param name="pDsOrgGrpList">dataset contains Distinct Org group id's List</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Private Function GetUserOrgGroupList(ByVal pstrOrgGrpId As String, _
                                        ByRef pDsOrgGrpList As System.Data.DataSet) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            

            Dim _cmdGetDistinctOrgGrpIDs As New SqlCommand

            sqlConnect = m_LocalDB.CreateConnection()
            sqlConnect.Open()

            Dim pOrgGrpID As SqlParameter = New SqlParameter("@pOrgGrpID", SqlDbType.NVarChar)
            pOrgGrpID.Value = pstrOrgGrpId

            If log.IsInfoEnabled Then
                log.Info("Calling sp_GetDistinctOrgGrpIDs with the following syntax..")
                Dim _strSQL As String = "exec sp_GetDistinctOrgGrpIDs " & _
                                         "'" & pOrgGrpID.Value & "' "
                log.Info(_strSQL)
            End If

            _cmdGetDistinctOrgGrpIDs.CommandType = CommandType.StoredProcedure
            _cmdGetDistinctOrgGrpIDs.CommandText = "sp_GetDistinctOrgGrpIDs"
            _cmdGetDistinctOrgGrpIDs.Parameters.Add(pOrgGrpID)

            _cmdGetDistinctOrgGrpIDs.Connection = m_LocalDB.CreateConnection
            pDsOrgGrpList = m_localDB.ExecuteDataset(_cmdGetDistinctOrgGrpIDs)

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("GetUserOrgGroupList call failed " & ex.ToString)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

    End Function

    'RT 3126
    ''' <summary>
    ''' To obtain org parameter value
    ''' </summary>
    ''' <param name="pOrgGroupId"></param>
    ''' <param name="pAppId"></param>
    ''' <param name="pParamId"></param>
    ''' <param name="pParamValue"></param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetOrgGroupParamValue(ByVal pOrgGroupId As Object, _
                                          ByVal pAppId As Object, ByVal pParamId As Object, _
                                          ByRef pParamValue As Object, ByVal pDeviceTokenEntry() As String) As Long Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetOrgGroupParamValue

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _StatusCode As Long

        Dim _atparParameters As Atpar_Application_Parameters
        _atparParameters = Atpar_Application_Parameters.CreateInstance(pDeviceTokenEntry(TokenEntry_Enum.SystemId))

        Try
            _atparParameters.OrgGroupId = pOrgGroupId
            _atparParameters.ApplicationId = pAppId
            _atparParameters.ParameterId = pParamId

            _StatusCode = _atparParameters.GetOrgGroupParamValue(pParamValue)

            If _StatusCode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & "failed to get GetOrgGroupParamValue :" & _StatusCode)
                Return _StatusCode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to get org parameters with the exception : " & ex.ToString)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To get Profile Parameter Values
    ''' </summary>
    ''' <param name="pProfileId">Profile ID</param>
    ''' <param name="pappId">Application ID</param>
    ''' <param name="pparamId">Parameter Id</param>
    ''' <param name="pParamValue">User Parameter value</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetProfileParamValue(ByVal pProfileId As String, _
                                         ByVal pappId As Integer, _
                                         ByVal pparamId As String, _
                                         ByRef pParamValue As String, _
                                         ByVal pDeviceTokenEntry() As String) As Long _
                                         Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetProfileParamValue

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _StatusCode As Long

        Dim _atparParameters As Atpar_Application_Parameters
        _atparParameters = Atpar_Application_Parameters.CreateInstance(pDeviceTokenEntry(TokenEntry_Enum.SystemId))

        Try
            _atparParameters.ProfileId = pProfileId
            _atparParameters.ProfileApplicationId = pappId
            _atparParameters.ParameterId = pparamId

            _StatusCode = _atparParameters.GetProfileParamValue(pParamValue)

            If _StatusCode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to get GetProfileParamValue :" & _StatusCode)
                Return _StatusCode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to get profile parameters with the exception : " & ex.ToString)
            Return E_SERVERERROR
        End Try

        GetProfileParamValue = ATPAR_OK

    End Function

    ''' <summary>
    ''' To get Security Parameter values , Called mt_atpar_assign_profiles.aspx
    ''' </summary>
    ''' <param name="pUserID">User ID</param>
    ''' <param name="pPwdReq">Required Password</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetSecurityParamVal(ByVal pUserID As String, ByRef pPwdReq As String, _
                                        ByVal pDeviceTokenEntry() As String) As Long _
                                        Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetSecurityParamVal

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            _strSQL = "SELECT PASS_REQ_HHT_USERS FROM MT_ATPAR_SECURITY_PARAMS "

            If log.IsInfoEnabled Then log.Info(_strSQL)

            pPwdReq = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            Return ATPAR_OK

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get secrity param value " & vbCrLf & _
                                                             " with the following SQL :" & _strSQL & vbCrLf & _
                                                             " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("GetSecurityParamVal Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get secrity param value " & vbCrLf & _
                                                          " with the following SQL :" & _strSQL & vbCrLf & _
                                                          " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetSecurityParamVal Failed", ex)
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' To get Transaction Id
    ''' </summary>
    ''' <param name="appId">Application Id</param>
    ''' <param name="transactionId">Transaction ID</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetTransactionId(ByVal appId As Object, ByRef transactionId As Object, _
                                     ByVal pDeviceTokenEntry() As String) As Long _
                                     Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetTransactionId

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _StatusCode As Long

        Dim _atparTransaction As AtPar_Application_Transactions
        _atparTransaction = AtPar_Application_Transactions.CreateInstance(pDeviceTokenEntry(TokenEntry_Enum.SystemId))

        Try
            ' get new transaction id
            _statusCode = _atparTransaction.GetTransactionId(appId, transactionId)

            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Get new transaction ID " & _statusCode)
                Return _statusCode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Get new transaction ID " & ex.ToString)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To get Transaction Business Units
    ''' </summary>
    ''' <param name="pAppId">Application Id</param>
    ''' <param name="pDSBUnits">Dataset Containing Business Units Data</param>
    ''' <param name="pServerUserID">Server User Id Who logged in</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetTransBUnits(ByVal pAppId As Integer, _
                                   ByRef pDsBUnit As System.Data.DataSet, _
                                   Optional ByVal pServerUserID As String = "") As Long _
                                   Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetTransBUnits

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder

        _sbSQL.Append("SELECT DISTINCT A.BUSINESS_UNIT FROM  ")

        If Not String.IsNullOrEmpty(pServerUserID) Then

            _sbSQL.Append(" MT_ATPAR_TRANSACTION A , MT_ATPAR_USER_GROUPS B ")
            _sbSQL.Append(" WHERE A.APP_ID = B.APP_ID AND SERVER_USER = '").Append(pServerUserID).Append("' ")
            _sbSQL.Append(" AND A.APP_ID = ").Append(pAppId)
            _sbSQL.Append(" AND (A.DOWNLOAD_USERID = B.CLIENT_USER OR A.USER_ID = B.CLIENT_USER)")

        Else
            _sbSQL.Append(" MT_ATPAR_TRANSACTION A WHERE APP_ID = ").Append(pAppId)
        End If

        If log.IsInfoEnabled Then log.Info(_sbSQL.ToString())

        Try
            pDsBUnit = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get trans bunits " & vbCrLf & _
                                                         " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                         " Exception is:" & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBUPDATEFAIL
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To get Transaction Fields
    ''' </summary>
    ''' <param name="pAppId">Application Id</param>
    ''' <param name="fieldName">Name of the Fields</param>
    ''' <param name="pDSUsers">Dataset Containing users Data</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetTransFields(ByVal pAppId As Integer, ByVal fieldName As String, _
                                   ByRef pDSUsers As System.Data.DataSet, ByVal pDeviceTokenEntry() As String) As Long _
                                   Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetTransFields

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        If fieldName = "USER_ID" Or fieldName = "DOWNLOAD_USERID" Then
            _sbSQL.Append(" SELECT DISTINCT A.").Append(fieldName).Append(", ")
            _sbSQL.Append(" B.FIRST_NAME + ' ' +B.LAST_NAME + ' (' + B.USER_ID + ')' AS FULLNAME  ")
            _sbSQL.Append(" FROM MT_ATPAR_TRANSACTION A, MT_ATPAR_USER B WHERE A.").Append(fieldName).Append(" = B.USER_ID ")
            _sbSQL.Append(" AND A.APP_ID = ").Append(pAppId)
        Else
            _sbSQL.Append(" SELECT DISTINCT ").Append(fieldName).Append(" FROM MT_ATPAR_TRANSACTION ")
            _sbSQL.Append(" WHERE APP_ID = ").Append(pAppId)
        End If

        If log.IsInfoEnabled Then log.Info(_sbSQL.ToString())

        Try
            pDSUsers = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get Trans fields " & vbCrLf & _
                                                          " with the following SQL :" & _sbSQL.tostring & vbCrLf & _
                                                          " Exception is:" & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBUPDATEFAIL
        End Try
        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To get Users Transactions Details
    ''' </summary>
    ''' <param name="pAppId">Application Id</param>
    ''' <param name="pDSUsers">Dataset Contains Users Data</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetTransUsers(ByVal pAppId As Integer, _
                                  ByRef pDSUser As System.Data.DataSet, ByVal pDeviceTokenEntry() As String) As Long _
                                  Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetTransUsers

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _strSQL = " SELECT DISTINCT USER_ID FROM MT_ATPAR_TRANSACTION " & _
                  " WHERE APP_ID = " & pAppId


        If log.IsInfoEnabled Then log.Info(_strSQL)

        Try
            pDSUser = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get Trans users " & vbCrLf & _
                                                         " with the following SQL :" & _strSQL & vbCrLf & _
                                                         " Exception is:" & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBUPDATEFAIL
        End Try

        Return ATPAR_OK

    End Function

    ''' <summary>
    ''' To get user Parameter Values
    ''' </summary>
    ''' <param name="appId">Application Id</param>
    ''' <param name="paramId">ParameterId</param>
    ''' <param name="userId">UserId of the User</param>
    ''' <param name="usrParamValue">UserParameterValue</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetUserParamValue(ByVal appId As Integer, ByVal paramId As String, _
                                      ByVal userId As String, ByRef usrParamValue As String, _
                                      ByVal pDeviceTokenEntry() As String) As Long _
                                      Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetUserParamValue

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _StatusCode As Long

        Dim _atparParameters As Atpar_Application_Parameters
        _atparParameters = Atpar_Application_Parameters.CreateInstance(pDeviceTokenEntry(TokenEntry_Enum.SystemId))

        Try
            _atparParameters.UserID = userId
            _atparParameters.ApplicationId = appId
            _atparParameters.ParameterId = paramId

            _StatusCode = _atparParameters.GetUserParamValue(usrParamValue)

            If _StatusCode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to get GetUserParamValue :" & _StatusCode)
                Return _StatusCode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to get user parameters with the exception : " & ex.ToString)
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK

    End Function

    'SM-4068 
    ''' <summary>
    ''' To get Users List, called by mt_atpar_user_parameter.aspx
    ''' </summary>
    ''' <param name="pUserId">Id of user</param>
    ''' <param name="pAppId">Application Id</param>
    ''' <param name="pOrgGrpId">Organisation Group id</param>
    ''' <param name="pDSUserList">dataset containing User List Data</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetUsersList(ByVal pUserId As String, _
                                ByVal pAppId As String, ByVal pOrgGrpId As String, _
                                ByRef pDSUserList As System.Data.DataSet, _
                                ByVal pDeviceTokenEntry() As String) As Long _
                                Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetUsersList

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSelectCount, _sbSelectUsers As New StringBuilder
        Dim intCount As Integer

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _sbSelectCount.Append(" SELECT COUNT(USER_ID) FROM  MT_ATPAR_USER A, MT_ATPAR_USER_GROUPS B WHERE ")
        _sbSelectCount.Append(" (A.USER_ID = B.CLIENT_USER  OR  A.USER_ID =B.SERVER_USER) AND B.APP_ID = ")
        _sbSelectCount.Append(" ").Append(pAppId).Append(" AND B.SERVER_USER ='").Append(pUserId).Append("' ")

        If log.IsInfoEnabled Then log.Info(_sbSelectCount.ToString())

        Try
            intCount = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSelectCount.ToString()))

            If intCount = 0 Then
                _sbSelectUsers.Append(" SELECT DISTINCT FIRST_NAME, LAST_NAME, ")
                _sbSelectUsers.Append(" MIDDLE_INITIAL, B.USER_ID, ")
                _sbSelectUsers.Append(" A.FIRST_NAME + ' ' + A.MIDDLE_INITIAL + ' ' + A.LAST_NAME + ' (' + A.USER_ID + ')' AS FULLNAME  FROM ")
                _sbSelectUsers.Append(" MT_ATPAR_USER A,MT_ATPAR_USER_ORG_GROUPS B,MT_ATPAR_PROFILE_APP_ACL C, MT_ATPAR_USER_ACL D ")
                _sbSelectUsers.Append(" WHERE A.USER_ID = B.USER_ID AND A.USER_ID = D.USER_ID AND D.ACCOUNT_DISABLED = 0 ")
                _sbSelectUsers.Append(" AND A.PROFILE_ID=C.PROFILE_ID AND C.APP_ID= ").Append(pAppId)

                If UCase(pOrgGrpId) <> "ALL" Then
                    _sbSelectUsers.Append(" AND B.ORG_GROUP_ID='").Append(pOrgGrpId).Append("' ")
                End If

                If log.IsInfoEnabled Then log.Info(_sbSelectUsers.ToString())

                pDSUserList = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSelectUsers.ToString()))
            Else
                'SB-0004282
                _sbSelectUsers.Append(" SELECT DISTINCT FIRST_NAME, LAST_NAME, ")
                _sbSelectUsers.Append(" MIDDLE_INITIAL, A.USER_ID, A.FIRST_NAME + ' ' + A.MIDDLE_INITIAL + ' ' +  ")
                _sbSelectUsers.Append(" A.LAST_NAME + ' (' + A.USER_ID + ')' AS FULLNAME FROM ")
                _sbSelectUsers.Append(" MT_ATPAR_USER A, MT_ATPAR_USER_GROUPS B, MT_ATPAR_USER_ACL C WHERE (A.USER_ID = B.CLIENT_USER ")
                _sbSelectUsers.Append(" ) AND A.USER_ID=C.USER_ID AND C.ACCOUNT_DISABLED = 0 AND B.APP_ID = ").Append(pAppId).Append(" AND B.SERVER_USER ='").Append(pUserId).Append("' ")

                If log.IsInfoEnabled Then log.Info(_sbSelectUsers.ToString())

                pDSUserList = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSelectUsers.ToString()))
            End If
        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get users list " & vbCrLf & _
                                                        " with the following SQL :" & _sbSelectUsers.ToString & vbCrLf & _
                                                        " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("GetUsersList Failed", sqlex)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get users list " & vbCrLf & _
                                                       " with the following SQL :" & _sbSelectUsers.ToString & vbCrLf & _
                                                       " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetUsersList Failed", ex)
            Return E_SERVERERROR
        End Try
    End Function


    ''' <summary>
    ''' To get Users List, called by mt_atpar_user_parameter.aspx
    ''' </summary>
    ''' <param name="pUserId">Id of user</param>
    ''' <param name="pAppId">Application Id</param>
    ''' <param name="pOrgGrpId">Organisation Group id</param>
    ''' <param name="pDSUserList">dataset containing User List Data</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetHeirarchyUsersList(ByVal pUserId As String, _
                                    ByVal pAppId As String, ByVal pOrgGrpId As String, _
                                    ByRef pDSUserList As System.Data.DataSet, _
                                    ByVal pDeviceTokenEntry() As String) As Long _
                                    Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetHeirarchyUsersList

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sqlCmd As SqlCommand
        Dim _StatusCode As String = String.Empty
        Dim _strSQL As String = String.Empty

        pDSUserList = New DataSet

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            Dim sqlParms() As SqlParameter = New SqlParameter(4) {}

            sqlParms(0) = New SqlParameter("@OrgGrp_ID", SqlDbType.NVarChar)
            sqlParms(0).Value = pOrgGrpId

            sqlParms(1) = New SqlParameter("@app_ID", SqlDbType.NVarChar)
            sqlParms(1).Value = pAppId

            sqlParms(2) = New SqlParameter("@userID", SqlDbType.NVarChar)
            sqlParms(2).Value = pUserId

            _sqlCmd = New SqlCommand
            _sqlCmd.Connection = m_LocalDB.CreateConnection
            _sqlCmd.CommandType = CommandType.StoredProcedure
            _sqlCmd.CommandText = "GetHeirarchyUsersList"
            _sqlCmd.Parameters.Add(sqlParms(0))
            _sqlCmd.Parameters.Add(sqlParms(1))
            _sqlCmd.Parameters.Add(sqlParms(2))


            If log.IsDebugEnabled Then
                log.Debug("Calling GetHeirarchyUsersList with the following syntax..")

                _strSQL = "EXEC GetHeirarchyUsersList " & vbCrLf & _
                                          " @OrgGrp_ID = N'" & sqlParms(0).Value & "'," & vbCrLf & _
                                          " @app_ID = N'" & sqlParms(1).Value & "'," & vbCrLf & _
                                          " @userID = N'" & sqlParms(2).Value & "'"

                log.Info(methodBaseName & vbCrLf & _strSQL)
            End If

            Try
                pDSUserList = m_LocalDB.Executedataset(_sqlCmd)
            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlEx))
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
                Return E_SERVERERROR
            End Try

            _sqlCmd.Parameters.Clear()
            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get users list " & vbCrLf & _
                                                                   " with the following SQL :" & _strSQL & vbCrLf & _
                                                                   " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("GetHeirarchyUsersList Failed", ex)
            Return E_SERVERERROR
        End Try
    End Function


    ''' <summary>
    ''' To Insert Audit Data; called by mt_atpar_assign_profiles.aspx,
    ''' mt_atpar_audit_setup.aspx, mt_atpar_define_groups.aspx, mt_atpar_manage_devices.aspx, mt_atpar_manage_org_group_bunits.aspx,
    ''' mt_atpar_manage_orggroups_org_parameters.aspx, mt_user_parameter.aspx, mt_atpar_manage_profiles.aspx
    ''' </summary>
    ''' <param name="dsAuditData">dataset Containing Audit Data </param>
    ''' <param name="pStrUser">User Name</param>
    ''' <param name="pStrFunction">Function Details</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function InsertAuditData(ByVal dsAuditData As System.Data.DataSet, ByVal pStrUser As String, _
                                    ByVal pStrFunction As String, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.InsertAuditData

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pStrUser
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim intCount As Int16

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            For intCount = 0 To dsAuditData.Tables(0).Rows.Count - 1

                _sbSQL.Append("INSERT INTO MT_ATPAR_SECURITY_AUDIT(UPDATE_USER_ID, UPDATE_DATE, ")
                _sbSQL.Append("KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, FUNCTION_NAME, FIELD_NAME, OLD_VALUE, NEW_VALUE) ")
                _sbSQL.Append("VALUES('").Append(pStrUser).Append("', GETDATE(), ")
                _sbSQL.Append("'").Append(dsAuditData.Tables(0).Rows(intCount).Item("KEY_1")).Append("', ")
                _sbSQL.Append("'").Append(dsAuditData.Tables(0).Rows(intCount).Item("KEY_2")).Append("', ")
                _sbSQL.Append("'").Append(dsAuditData.Tables(0).Rows(intCount).Item("KEY_3")).Append("', ")
                _sbSQL.Append("'").Append(dsAuditData.Tables(0).Rows(intCount).Item("KEY_4")).Append("', ")
                _sbSQL.Append("'").Append(dsAuditData.Tables(0).Rows(intCount).Item("KEY_5")).Append("', ")
                _sbSQL.Append("'").Append(pStrFunction).Append("', ")
                _sbSQL.Append("'").Append(dsAuditData.Tables(0).Rows(intCount).Item("FIELD_NAME")).Append("', ")
                _sbSQL.Append("'").Append(dsAuditData.Tables(0).Rows(intCount).Item("OLD_VALUE")).Append("', ")
                _sbSQL.Append("'").Append(dsAuditData.Tables(0).Rows(intCount).Item("NEW_VALUE")).Append("')")

                If log.IsInfoEnabled Then log.Info(_sbSQL.ToString())

                m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))

                _sbSQL.Remove(0, _sbSQL.Length)
            Next

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Insert AuditData " & vbCrLf & _
                                                        " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                        " Exception is:" & sqlex.ToString & vbCrLf)
            Throw New Exception("InsertAuditData Failed", sqlex)
            Return ATPAR_E_LOCALDBINSERTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Insert AuditData " & vbCrLf & _
                                                                   " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                                                   " Exception is:" & ex.ToString & vbCrLf)
            Throw New Exception("InsertAuditData Failed", ex)
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

        Return ATPAR_OK

    End Function


    ''' <summary>
    ''' To Get User FullName 
    ''' </summary>
    ''' <param name="userID">User Id</param>
    ''' <param name="strUserFullName">Full Name of the user</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetUserFullName(ByVal userID As String, ByRef strUserFullName As String, ByVal pDeviceTokenEntry() As String) As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _strSQL = "SELECT FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '(' + USER_ID + ')' AS USER_ID " & _
                " FROM MT_ATPAR_USER WHERE USER_ID = '" & userID & "' "
        Try
            If log.IsInfoEnabled Then log.Info(_strSQL)

            strUserFullName = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            GetUserFullName = ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Get User FullName " & vbCrLf & _
                                               " with the following SQL :" & _strSQL & vbCrLf & _
                                               " Exception is:" & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try
    End Function

    'SM-5620
    ''' <summary>
    ''' To get Allocated  Inventory BusinessUnits 
    ''' </summary>
    ''' <param name="pAppId">Application Id</param>
    ''' <param name="pDSBUnits">Dataset Containing Business Units Data</param>
    ''' <param name="pUserID">User Id Who logged in</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function GetAllocInvBUnits(ByVal pAppId As Integer, _
                                    ByRef pDsBUnit As System.Data.DataSet, _
                                    ByVal pUserId As String, _
                                    ByVal pDeviceTokenEntry() As String) As Long _
                                    Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetAllocInvBUnits

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _strOrgId As String = String.Empty
        Dim _strOrgValue As String = String.Empty
        Dim intRCnt As Integer
        Dim _dsUserList As System.Data.DataSet = Nothing
        Dim _strUserList As String = String.Empty
        Dim _StatusCode As Long
        Dim _strOrgGrpID As String = String.Empty



        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _StatusCode = GetUsersList(pUserId, pAppId, pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID), _dsUserList, pDeviceTokenEntry)

            If _StatusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal("Failed to call GetUsersList with StatusCode : " & _
                                                     _StatusCode)
                Return _StatusCode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Failed to  GetUsersList " & vbCrLf & ex.ToString)
            Return ATPAR_E_LOCALDBUPDATEFAIL
        End Try

        If _dsUserList.Tables(0).Rows.Count = 0 Then
            If log.IsWarnEnabled Then log.Warn(methodBaseName & ": Users are not allocated to Org Group : " & pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID))
            Return E_NORECORDFOUND
        End If

        For intRCnt = 0 To _dsUserList.Tables(0).Rows.Count - 1

            If Not String.IsNullOrEmpty(_strUserList) Then
                _strUserList = _strUserList & "," & "'" & _dsUserList.Tables(0).Rows(intRCnt)("USER_ID").ToString & "'"
            Else
                _strUserList = "'" & _dsUserList.Tables(0).Rows(intRCnt)("USER_ID").ToString & "'"
            End If

        Next

        _sbSQL.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_IBU_ALLOCATION  WHERE ")
        _sbSQL.Append(" APP_ID = '").Append(pAppId).Append("' AND USER_ID in (").Append(_strUserList).Append(")")

        If log.IsInfoEnabled Then log.Info(methodBaseName & " Query to fetch Allocated inventory BUnits: " & _
                                                              vbCrLf & _sbSQL.ToString())
        'VD-0007458
        Try
            pDsBUnit = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Get Allocated Inv BUnits " & vbCrLf & _
                                              " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                              " Exception is:" & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBUPDATEFAIL
        End Try

        If pDsBUnit.Tables(0).Rows.Count = 0 Then
            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Inventory BUnits are not allocated")
            Return E_NORECORDFOUND
        End If

        Return ATPAR_OK

    End Function


    Public Function GetOrgGroupAllocInvBUnits(ByVal pAppId As Integer, _
                                    ByRef pDsBUnit As System.Data.DataSet, _
                                    ByVal pUserId As String, _
                                    ByVal pOrgGroupID As String, ByVal pDeviceTokenEntry() As String) As Long _
                                    Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetOrgGroupAllocInvBUnits

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _strOrgId As String = String.Empty
        Dim _strOrgValue As String = String.Empty
        Dim intRCnt As Integer
        Dim _dsUserList As System.Data.DataSet = Nothing
        Dim _strUserList As String = String.Empty
        Dim _StatusCode As Long
        Dim _strOrgGrpID As String = String.Empty


        If Not String.IsNullOrEmpty(pOrgGroupID) Then
            _strOrgGrpID = pOrgGroupID
        Else
            _strOrgGrpID = pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID)
        End If

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _StatusCode = GetUsersList(pUserId, pAppId, _strOrgGrpID, _dsUserList, pDeviceTokenEntry)

            If _StatusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal("Failed to call GetUsersList with StatusCode : " & _
                                                     _StatusCode)
                Return _StatusCode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Failed to  GetUsersList " & vbCrLf & ex.ToString)
            Return ATPAR_E_LOCALDBUPDATEFAIL
        End Try

        If _dsUserList.Tables(0).Rows.Count = 0 Then
            If log.IsWarnEnabled Then log.Warn(methodBaseName & ": Users are not allocated to Org Group : " & _strOrgGrpID)
            Return E_NORECORDFOUND
        End If

        For intRCnt = 0 To _dsUserList.Tables(0).Rows.Count - 1

            If Not String.IsNullOrEmpty(_strUserList) Then
                _strUserList = _strUserList & "," & "'" & _dsUserList.Tables(0).Rows(intRCnt)("USER_ID").ToString & "'"
            Else
                _strUserList = "'" & _dsUserList.Tables(0).Rows(intRCnt)("USER_ID").ToString & "'"
            End If

        Next

        _sbSQL.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_IBU_ALLOCATION  WHERE ")
        _sbSQL.Append(" APP_ID = '").Append(pAppId).Append("' AND USER_ID in (").Append(_strUserList).Append(")")

        If log.IsInfoEnabled Then log.Info(methodBaseName & " Query to fetch Allocated inventory BUnits: " & _
                                                              vbCrLf & _sbSQL.ToString())
        'VD-0007458
        Try
            pDsBUnit = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Get Allocated Inv BUnits " & vbCrLf & _
                                              " with the following SQL :" & _sbSQL.ToString & vbCrLf & _
                                              " Exception is:" & ex.ToString & vbCrLf)
            Return ATPAR_E_LOCALDBUPDATEFAIL
        End Try

        If pDsBUnit.Tables(0).Rows.Count = 0 Then
            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Inventory BUnits are not allocated")
            Return E_NORECORDFOUND
        End If

        Return ATPAR_OK

    End Function

    Private disposedValue As Boolean = False        ' To detect redundant calls

    ' IDisposable
    Protected Overridable Sub Dispose(ByVal disposing As Boolean)
        If Not Me.disposedValue Then
            If disposing Then
                ' TODO: free unmanaged resources when explicitly called
            End If

            ' TODO: free shared unmanaged resources
            'Discard log4net filter value
            NDC.Pop()

        End If
        Me.disposedValue = True
    End Sub

#Region " IDisposable Support "
    ' This code added by Visual Basic to correctly implement the disposable pattern.
    Public Sub Dispose() Implements IDisposable.Dispose
        ' Do not change this code.  Put cleanup code in Dispose(ByVal disposing As Boolean) above.
        Dispose(True)
        GC.SuppressFinalize(Me)
    End Sub
#End Region

    Sub New()

        log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.Init.ToString()

    End Sub

#Region "Send Email"

    ''' <summary>
    ''' To Send Emails from Web, HHT (if any) and Windows services 
    ''' </summary>
    ''' <param name="pSystemID">System ID</param>
    ''' <param name="pSubject">Subject of the Email</param>
    ''' <param name="pBodyText">Body of the Email</param>
    ''' <param name="pToAddress">Recipient(To) Email Address (Comma seperated recipients)</param>
    ''' <param name="pMailPriority">Mail Priority</param>
    ''' <param name="pAttachment">Attachments if any</param>
    ''' <returns>ATPAR_OK on Success, else Error code</returns>
    ''' <remarks></remarks>
    Public Function SendEmail(ByVal pSystemID As String, _
                                    ByVal pSubject As String, _
                                    ByVal pBodyText As String, _
                                    ByVal pToAddress As String, _
                                    Optional ByVal pMailPriority As MailPriority = MailPriority.Normal, _
                                    Optional ByVal pAttachment As String = "") As Long _
                                    Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.SendEmail

        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pSystemID

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _StatusCode As Long

        Dim _strFromAddress As String = String.Empty
        Dim _strSmtpHost As String = String.Empty    ' smtp server
        Dim _strSmtpPort As String = String.Empty
        Dim _strSmtpUserName As String = String.Empty
        Dim _strSmtpPwd As String = String.Empty
        Dim _strSmtpAccountName As String = String.Empty
        Dim _strSmtpSSLEnabled As String = String.Empty
        Dim objMail As New MailMessage()
        Dim SmtpMail As New SmtpClient

        '' Need to check how and when to use these variables
        '' Defining these variables as we have them in the configuration manager screen
        'Dim _strSmtpAuthenticate As String = String.Empty
        'Dim _strSendUsing As String = String.Empty

        Try
            _strFromAddress = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString())
            _strSmtpHost = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_SERVER.ToString())
            _strSmtpPort = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString())
            _strSmtpUserName = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_USER_NAME.ToString())
            _strSmtpPwd = Decrypt(GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_PASSWORD.ToString()))
            _strSmtpAccountName = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString())
            _strSmtpSSLEnabled = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_USE_SSL.ToString())
            '' Need to check how and when to use these variables
            '' Defining these variables as we have them in the configuration manager screen
            '_strSmtpAuthenticate = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_AUTHENTICATE.ToString())
            '_strSendUsing = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_SEND_USING.ToString())


            ' checks whether the To Address is entered
            If String.IsNullOrEmpty(pToAddress) Then
                SendEmail = EMAIL_ENTER_TO_ADDRESS
                Exit Function
            End If
            objMail.To.Add(pToAddress)


            ' checks whether the SMTP HOST(Server) is configured
            If String.IsNullOrEmpty(_strSmtpHost) Then
                SendEmail = EMAIL_SMTP_SERVER_MISSING
                Exit Function
            End If
            SmtpMail.Host = _strSmtpHost

            ' checks whether the Port is configured
            If String.IsNullOrEmpty(_strSmtpPort) Then
                SendEmail = EMAIL_SMTP_SERVER_MISSING
                Exit Function
            End If
            SmtpMail.Port = _strSmtpPort

            ' checks whether the From Address is being configured

            If String.IsNullOrEmpty(_strFromAddress) Then
                SendEmail = EMAIL_ENTER_FROM_ADDRESS
                Exit Function
            End If
            objMail.From = New MailAddress(_strFromAddress)



            ' checks whether the Subject is entered
            If String.IsNullOrEmpty(pSubject) Then
                SendEmail = EMAIL_ENTER_SUBJECT
                Exit Function
            End If
            objMail.Subject = pSubject

            ' checks whether the Body is entered
            If String.IsNullOrEmpty(pBodyText) Then
                SendEmail = EMAIL_ENTER_BODY
                Exit Function
            End If
            objMail.Body = pBodyText

            ' checks whether the Mail Format is configured, if no then setting it to HTML as default
            objMail.IsBodyHtml = True

            ' checks whether there are any attahments
            If Not String.IsNullOrEmpty(pAttachment) Then
                Dim attachement As New Attachment(pAttachment)
                objMail.Attachments.Add(attachement)
            End If

            ' setting the mail priority - default it is normal
            objMail.Priority = pMailPriority

            ' checking whether the SMTP configuration is set in the DB
            Try
                'Dim SmtpMail As New SmtpClient
                '' checks whether the SMTP HOST(Server) is configured
                'If String.IsNullOrEmpty(_strSmtpHost) Then
                '    SendEmail = EMAIL_SMTP_SERVER_MISSING
                '    Exit Function
                'End If
                'SmtpMail.Host = _strSmtpHost

                '' checks whether the Port is configured
                'If String.IsNullOrEmpty(_strSmtpPort) Then
                '    SendEmail = EMAIL_SMTP_SERVER_MISSING
                '    Exit Function
                'End If
                'SmtpMail.Port = _strSmtpPort

                ' checks whether the Username and password is configured else uses the default credentials to send the email
                Dim SmtpCredentials As New System.Net.NetworkCredential
                If String.IsNullOrEmpty(_strSmtpUserName) Or String.IsNullOrEmpty(_strSmtpPwd) Then
                    SmtpMail.UseDefaultCredentials = True
                Else
                    ' checks whether the Account Name (domain) is configured
                    If String.IsNullOrEmpty(_strSmtpAccountName) Then
                        SmtpCredentials = New System.Net.NetworkCredential(_strSmtpUserName, _strSmtpPwd)
                    End If
                    SmtpCredentials = New System.Net.NetworkCredential(_strSmtpUserName, _strSmtpPwd, _strSmtpAccountName)
                    SmtpMail.UseDefaultCredentials = False
                    SmtpMail.Credentials = SmtpCredentials
                End If

                ' checks whether the SSL is configured
                If String.IsNullOrEmpty(_strSmtpSSLEnabled) Or _strSmtpSSLEnabled.ToLower() = "no" Then
                    SmtpMail.EnableSsl = False
                ElseIf _strSmtpSSLEnabled.ToLower() = "yes" Then
                    SmtpMail.EnableSsl = True
                End If

                '' Need to check how and when to use these variables
                '' Defining these variables as we have them in the configuration manager screen
                '' checks whether the Authentication is configured
                'If String.IsNullOrEmpty(_strSmtpAuthenticate) Then
                '    SendEMail = EMAIL_SMTP_SERVER_MISSING
                '    Exit Function
                'End If
                'SmtpMail.Credentials.GetCredential(_strSmtpHost, CType(_strSmtpPort, Integer), _strSmtpAuthenticate)
                '' checks whether the Send Using is configured
                'If String.IsNullOrEmpty(_strSendUsing) Then
                '   continue
                'End If

                SmtpMail.Send(objMail)
            Catch ex As Exception
                SendEmail = EMAIL_SEND_FAILED
                If log.IsFatalEnabled Then log.Fatal("AtParUtils: SendEmail :" & ex.ToString)
                Exit Function
            End Try

        Catch ex As Exception
            SendEmail = EMAIL_SEND_FAILED
            If log.IsFatalEnabled Then log.Fatal("AtparUtils: SendEmail: Failed to get config data : " & ex.ToString)
            Exit Function
        Finally
            objMail = Nothing
            SmtpMail = Nothing
        End Try

        _StatusCode = ATPAR_OK

        SendEmail = _StatusCode

    End Function

    Public Function SendEmbeddedEmail(ByVal pSystemID As String, _
                                ByVal pSubject As String, _
                                ByVal pBodyText As String, _
                                ByVal pToAddress As String, _
                                ByVal pImageName As String, _
                                ByVal pDeliverSign As Boolean, _
                                Optional ByVal pMailPriority As MailPriority = MailPriority.Normal, _
                                Optional ByVal pAttachment As String = "") As Long _
                                Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.SendEmbeddedEmail

        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pSystemID

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _StatusCode As Long

        Dim _strFromAddress As String = String.Empty
        Dim _strSmtpHost As String = String.Empty    ' smtp server
        Dim _strSmtpPort As String = String.Empty
        Dim _strSmtpUserName As String = String.Empty
        Dim _strSmtpPwd As String = String.Empty
        Dim _strSmtpAccountName As String = String.Empty
        Dim _strSmtpSSLEnabled As String = String.Empty
        Dim objMail As New MailMessage()
        Dim SmtpMail As New SmtpClient
        Dim view As AlternateView
        Dim resChartImage As LinkedResource
        Dim resLogo As LinkedResource
        Dim resTopbg As LinkedResource


        Try
            _strFromAddress = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString())
            _strSmtpHost = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_SERVER.ToString())
            _strSmtpPort = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString())
            _strSmtpUserName = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_USER_NAME.ToString())
            _strSmtpPwd = Decrypt(GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_PASSWORD.ToString()))
            _strSmtpAccountName = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString())
            _strSmtpSSLEnabled = GetConfigData(pSystemID, CONFIGFILE.EMAILCONFIGARATION.ToString(), EMAILCONFIGARATION.SMTP_USE_SSL.ToString())

            ' checks whether the To Address is entered
            If String.IsNullOrEmpty(pToAddress) Then
                Return EMAIL_ENTER_TO_ADDRESS
            End If
            objMail.To.Add(pToAddress)


            ' checks whether the SMTP HOST(Server) is configured
            If String.IsNullOrEmpty(_strSmtpHost) Then
                Return EMAIL_SMTP_SERVER_MISSING
            End If
            SmtpMail.Host = _strSmtpHost

            ' checks whether the Port is configured
            If String.IsNullOrEmpty(_strSmtpPort) Then
                Return EMAIL_SMTP_SERVER_MISSING
            End If
            SmtpMail.Port = _strSmtpPort

            ' checks whether the From Address is being configured

            If String.IsNullOrEmpty(_strFromAddress) Then
                Return EMAIL_ENTER_FROM_ADDRESS

            End If
            objMail.From = New MailAddress(_strFromAddress)



            ' checks whether the Subject is entered
            If String.IsNullOrEmpty(pSubject) Then
                Return EMAIL_ENTER_SUBJECT
            End If
            objMail.Subject = pSubject

            ' checks whether the Body is entered
            If String.IsNullOrEmpty(pBodyText) Then
                Return EMAIL_ENTER_BODY
            End If
            objMail.Body = pBodyText

            ' checks whether the Mail Format is configured, if no then setting it to HTML as default
            objMail.IsBodyHtml = True

            Dim _appPath As String
            _appPath = AppDomain.CurrentDomain.BaseDirectory().Chars(0) & _
                                         ":\AtPar\Web\images"

            view = AlternateView.CreateAlternateViewFromString(pBodyText, Nothing, MediaTypeNames.Text.Html)
            
            resLogo = New LinkedResource(_appPath & "\logo.jpg")
            resTopbg = New LinkedResource(_appPath & "\topbg.jpg")
            resLogo.ContentId = "logo"
            resTopbg.ContentId = "topbg"
            view.LinkedResources.Add(resLogo)
            view.LinkedResources.Add(resTopbg)

            If pImageName.ToString.Length > 0 Then
                Dim strImageNames As String = pImageName
                Dim lstList As New ArrayList

                lstList.AddRange(strImageNames.Split("&"c))
                For Each ImageName In lstList
                    If pDeliverSign Then
                        resChartImage = New LinkedResource(_appPath & "\delvRepSigns\" & ImageName.ToString())
                        resChartImage.ContentId = ImageName.ToString()
                        view.LinkedResources.Add(resChartImage)
                    Else
                        resChartImage = New LinkedResource(_appPath & "\" & ImageName.ToString())
                        resChartImage.ContentId = ImageName.ToString()
                        view.LinkedResources.Add(resChartImage)
                    End If
                Next

            End If

            objMail.AlternateViews.Add(view)


            ' checks whether there are any attahments
            If Not String.IsNullOrEmpty(pAttachment) Then
                Dim attachement As New Attachment(pAttachment)
                objMail.Attachments.Add(attachement)
            End If

            ' setting the mail priority - default it is normal
            objMail.Priority = pMailPriority

            ' checking whether the SMTP configuration is set in the DB
            Try

                ' checks whether the Username and password is configured else uses the default credentials to send the email
                Dim SmtpCredentials As New System.Net.NetworkCredential
                If String.IsNullOrEmpty(_strSmtpUserName) Or String.IsNullOrEmpty(_strSmtpPwd) Then
                    SmtpMail.UseDefaultCredentials = True
                Else
                    ' checks whether the Account Name (domain) is configured
                    If String.IsNullOrEmpty(_strSmtpAccountName) Then
                        SmtpCredentials = New System.Net.NetworkCredential(_strSmtpUserName, _strSmtpPwd)
                    End If
                    SmtpCredentials = New System.Net.NetworkCredential(_strSmtpUserName, _strSmtpPwd, _strSmtpAccountName)
                    SmtpMail.UseDefaultCredentials = False
                    SmtpMail.Credentials = SmtpCredentials
                End If

                ' checks whether the SSL is configured
                If String.IsNullOrEmpty(_strSmtpSSLEnabled) Or _strSmtpSSLEnabled.ToLower() = "no" Then
                    SmtpMail.EnableSsl = False
                ElseIf _strSmtpSSLEnabled.ToLower() = "yes" Then
                    SmtpMail.EnableSsl = True
                End If

                SmtpMail.Send(objMail)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal("AtParUtils: SendEmbeddedEmail :" & ex.ToString)
                Return EMAIL_SEND_FAILED
            End Try

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("AtparUtils: SendEmbeddedEmail: Failed to get config data : " & ex.ToString)
            Return EMAIL_SEND_FAILED
        Finally
            objMail.Dispose()
            SmtpMail = Nothing
        End Try

        Return ATPAR_OK

    End Function

#End Region


End Class

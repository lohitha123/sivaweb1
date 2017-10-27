Imports System.Data.SqlClient
Imports System.Reflection
Imports log4net
Imports System.Text

Public Class Atpar_Application_Parameters
    Inherits AtPar_Application_Base

#Region "Member Variables"
    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(Atpar_Application_Parameters))
    Private Shared m_Parameters As Atpar_Application_Parameters
    Private Shared m_ConnectionString As String = String.Empty

    Private m_appId As Integer
    Private m_ParameterId As String = String.Empty
    Private m_ParamValue As String = String.Empty
    Private m_UserId As String = String.Empty
    Private m_UserParamValue As String = String.Empty
    Private m_OrgGroupId As String = String.Empty
    Private m_ProfileId As String = String.Empty
    Private m_ProfileAppId As String = String.Empty

#End Region

#Region "Properties"

    ''' Gets or Sets the ApplicationId
    Public Property ApplicationId() As Integer
        Get
            Return m_appId
        End Get
        Set(ByVal value As Integer)
            m_appId = value
        End Set
    End Property

    ''' Gets or Sets the ParameterId
    Public Property ParameterId() As String
        Get
            Return m_ParameterId
        End Get
        Set(ByVal value As String)
            m_ParameterId = value
        End Set
    End Property

    ''' Gets or Sets the ParamValue
    Public Property ParamValue() As String
        Get
            Return m_ParamValue
        End Get
        Set(ByVal value As String)
            m_ParamValue = value
        End Set
    End Property

    ''' Gets or Sets the UserId
    Public Property UserId() As String
        Get
            Return m_UserId
        End Get
        Set(ByVal value As String)
            m_UserId = value
        End Set
    End Property

    ''' Gets or Sets the UserParamValue
    Public Property UserParamValue() As String
        Get
            Return m_UserParamValue
        End Get
        Set(ByVal value As String)
            m_UserParamValue = value
        End Set
    End Property

    ''' Gets or Sets the OrgGroupId
    Public Property OrgGroupId() As String
        Get
            Return m_OrgGroupId
        End Get
        Set(ByVal value As String)
            m_OrgGroupId = value
        End Set
    End Property

    ''' Gets or Sets the ProfileId
    Public Property ProfileId() As String
        Get
            Return m_ProfileId
        End Get
        Set(ByVal value As String)
            m_ProfileId = value
        End Set
    End Property

    ''' Gets or Sets the ProfileAppId
    Public Property ProfileApplicationId() As String
        Get
            Return m_ProfileAppId
        End Get
        Set(ByVal value As String)
            m_ProfileAppId = value
        End Set
    End Property

#End Region

    Sub New(ByVal pSystemId As String)
			Try
                CreateLocalDB(pSystemId)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(" Error while creating LocalDB Object " & ex.ToString)
                'Return m_Parameters
            End Try
    End Sub

#Region "User Defined Functions"


    Public Shared Function CreateInstance(ByVal pSystemId As String) As Atpar_Application_Parameters
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
			m_Parameters = New Atpar_Application_Parameters(pSystemId)
            
            

            CreateInstance = m_Parameters
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error while creating Atpar_Application_Parameters Object " & ex.ToString)
            Return m_Parameters
            Exit Function
        End Try

    End Function

    Public Function GetAppParamValue(ByRef paramVal As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty


        _strSQL = "SELECT PARAMETER_VALUE FROM MT_ATPAR_APP_PARAMETERS " & _
                            " WHERE APP_ID = " & ApplicationId & " AND PARAMETER_ID = '" & ParameterId & "'"

        If log.IsInfoEnabled Then log.Info(_strSQL)

        Try
            paramVal = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            GetAppParamValue = ATPAR_OK
        Catch ex As Exception
            GetAppParamValue = ATPAR_E_LOCALDBSELECTFAIL
            If log.IsFatalEnabled Then log.Fatal("ATPAR_E_LOCALDBSELECTFAIL :" & ex.ToString)
            Exit Function
        End Try

    End Function
    
    Public Function GetUserParamValue(ByRef usrParamValue As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim sqlcmd As New SqlCommand
        Dim _strSQL As String = String.Empty


        _strSQL = "SELECT PARAMETER_VALUE FROM MT_ATPAR_USER_APP_PARAMETERS " & _
                " WHERE APP_ID = " & ApplicationId & " AND PARAMETER_ID = '" & ParameterId & "' AND USER_ID = '" & UserId & "'"

        If log.IsInfoEnabled Then log.Info(_strSQL)

        Try
            usrParamValue = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            GetUserParamValue = ATPAR_OK
        Catch ex As Exception
            GetUserParamValue = ATPAR_E_LOCALDBSELECTFAIL
            If log.IsFatalEnabled Then log.Fatal("ATPAR_E_LOCALDBSELECTFAIL :" & ex.ToString)
            Exit Function
        End Try

    End Function

    ' TODO : Move into AtparApplication_Parameters class
    ''' <summary>
    ''' Get the User parameters 
    ''' </summary>
    ''' <param name="pParameters"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetUserParamValues(ByRef pParameters As SortedList) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            If (Len(ApplicationId) = 0 Or Len(UserId) = 0 Or pParameters.Count = 0) Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & "(ApplicationId:" & ApplicationId & _
                                                    ", UserId:" & UserId & ",pParameters.Count:" & pParameters.Count & _
                                                    ") E_INVALIDPARAMETER ")
                GetUserParamValues = E_INVALIDPARAMETER
                Exit Function
            End If

            Dim _sbSQL As Text.StringBuilder
            Dim _paramCount As Integer = pParameters.Count
            _sbSQL = New Text.StringBuilder
            Try


                _sbSQL.Append("SELECT ")

                ' if its a single parameter, just get the value
                If _paramCount = 1 Then
                    _sbSQL.Append("PARAMETER_VALUE ")
                ElseIf _paramCount > 1 Then
                    'if there are more, get both parameter_id and value
                    _sbSQL.Append("PARAMETER_ID, PARAMETER_VALUE ")
                End If

                ' TODO: schema
                _sbSQL.Append("FROM MT_ATPAR_USER_APP_PARAMETERS " & _
                              " WHERE USER_ID ='" & UserId & "' AND APP_ID = " & ApplicationId & " AND ")

                ' if its a single parameter, make a direct SQL query 
                If _paramCount = 1 Then
                    _sbSQL.Append(" PARAMETER_ID ='" & pParameters.GetKey(0) & "'")
                ElseIf _paramCount > 1 Then
                    ' if there are more than one parameters, make a SQL using IN (...)
                    Dim _paramsList(_paramCount) As String
                    For i As Integer = 0 To _paramCount - 1
                        _paramsList(i) = "'" & pParameters.GetKey(i) & "'"
                    Next
                    Dim _paramListStr As String = String.Join(",", _paramsList, 0, _paramCount)
                    _sbSQL.Append(" PARAMETER_ID IN (" & _paramListStr & ")")
                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " error creating SQL " & _sbSQL.ToString & vbCrLf & ex.ToString)
                GetUserParamValues = E_SERVERERROR
                Exit Function
            End Try

            ' if its a single transaction do a quick executescalar
            If _paramCount = 1 Then

                Try
                    If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Parameter value with the following SQL... " & _
                                                        vbCrLf & _sbSQL.ToString)

                    pParameters(pParameters.GetKey(0)) = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & _sbSQL.ToString & vbCrLf & ex.ToString)
                    GetUserParamValues = ATPAR_E_LOCALDBSELECTFAIL
                    Exit Function
                End Try

            ElseIf _paramCount > 1 Then
                ' if there is more than one get all of them
                Dim _ds As DataSet
                Try
                    If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Parameter values with the following SQL... " & _
                                    vbCrLf & _sbSQL.ToString)

                    _ds = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & _sbSQL.ToString & vbCrLf & ex.ToString)
                    GetUserParamValues = ATPAR_E_LOCALDBSELECTFAIL
                    Exit Function
                End Try

                Try

                    If Not _ds Is Nothing Then
                        For i As Integer = 0 To _ds.Tables(0).Rows.Count - 1
                            pParameters(_ds.Tables(0).Rows(i).Item("PARAMETER_ID")) = _ds.Tables(0).Rows(i).Item("PARAMETER_VALUE")
                        Next
                    End If
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to read parameters " & _sbSQL.ToString & _
                                                        vbCrLf & _ds.GetXml & vbCrLf & ex.ToString)
                    GetUserParamValues = E_SERVERERROR
                    Exit Function
                End Try

            End If

            ' print out the values we received for debugging
            If log.IsInfoEnabled Then
                Dim _sb As New Text.StringBuilder
                _sb.Append(" Got the following Parameter Values : " & vbCrLf)
                For Each i As DictionaryEntry In pParameters
                    _sb.Append("Parameter : " & i.Key.PadRight(20, "-") & ", Value :" & i.Value & vbCrLf)
                Next
                log.Info(_sb.ToString)
            End If

            GetUserParamValues = ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error getting values for parameters" & ex.ToString)
            GetUserParamValues = E_SERVERERROR
            Exit Function
        End Try


    End Function

    Public Function GetOrgGroupParamValue(ByRef pParamValue As Object) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        If (Len(ApplicationId) = 0 Or Len(ParameterId) = 0 Or Len(OrgGroupId) = 0) Then

            If log.IsWarnEnabled Then log.Warn("E_INVALIDPARAMETER")
            GetOrgGroupParamValue = E_INVALIDPARAMETER
            Exit Function
        End If

        _strSQL = " SELECT PARAMETER_VALUE FROM MT_ATPAR_ORG_GROUP_PARAMETERS " & _
                     " WHERE ORG_GROUP_ID = '" & OrgGroupId & "' AND APP_ID = '" & ApplicationId & _
                     "' AND PARAMETER_ID ='" & ParameterId & "'"

        If log.IsInfoEnabled Then log.Info(_strSQL)

        Try
            pParamValue = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))
        Catch ex As Exception
            GetOrgGroupParamValue = ATPAR_E_LOCALDBSELECTFAIL
            If log.IsFatalEnabled Then log.Fatal("ATPAR_E_LOCALDBSELECTFAIL :" & ex.ToString)
            Exit Function
        End Try

        GetOrgGroupParamValue = ATPAR_OK

    End Function

   
    Public Function GetOrgGroupParamValues(ByRef pParameters As SortedList) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            If (Len(ApplicationId) = 0 Or Len(OrgGroupId) = 0 Or pParameters.Count = 0) Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & "(ApplicationId:" & ApplicationId & _
                                                    ", OrgGroupId:" & OrgGroupId & ",pParameters.Count:" & pParameters.Count & _
                                                    ") E_INVALIDPARAMETER ")
                GetOrgGroupParamValues = E_INVALIDPARAMETER
                Exit Function
            End If

            Dim _sbSQL As Text.StringBuilder
            Dim _paramCount As Integer = pParameters.Count

            _sbSQL = New Text.StringBuilder
            Try

                _sbSQL.Append("SELECT ")

                ' if its a single parameter, just get the value
                If _paramCount = 1 Then
                    _sbSQL.Append("PARAMETER_VALUE ")
                ElseIf _paramCount > 1 Then
                    'if there are more, get both parameter_id and value
                    _sbSQL.Append("PARAMETER_ID, PARAMETER_VALUE ")
                End If

                ' TODO: schema
                _sbSQL.Append("FROM MT_ATPAR_ORG_GROUP_PARAMETERS " & _
                              " WHERE ORG_GROUP_ID ='" & OrgGroupId & "' AND APP_ID = " & ApplicationId & " AND ")

                ' if its a single parameter, make a direct SQL query 
                If _paramCount = 1 Then
                    _sbSQL.Append(" PARAMETER_ID ='" & pParameters.GetKey(0) & "'")
                ElseIf _paramCount > 1 Then
                    ' if there are more than one parameters, make a SQL using IN (...)
                    Dim _paramsList(_paramCount) As String
                    For i As Integer = 0 To _paramCount - 1
                        _paramsList(i) = "'" & pParameters.GetKey(i) & "'"
                    Next
                    Dim _paramListStr As String = String.Join(",", _paramsList, 0, _paramCount)
                    _sbSQL.Append(" PARAMETER_ID IN (" & _paramListStr & ")")
                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " error creating SQL " & _sbSQL.ToString & vbCrLf & ex.ToString)
                GetOrgGroupParamValues = E_SERVERERROR
                Exit Function
            End Try

            ' if its a single transaction do a quick executescalar
            If _paramCount = 1 Then

                Try
                    If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Parameter value with the following SQL... " & _
                                                        vbCrLf & _sbSQL.ToString)


                    pParameters(pParameters.GetKey(0)) = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & _sbSQL.ToString & vbCrLf & ex.ToString)
                    GetOrgGroupParamValues = ATPAR_E_LOCALDBSELECTFAIL
                    Exit Function
                End Try

            ElseIf _paramCount > 1 Then
                ' if there is more than one get all of them
                Dim _ds As DataSet
                Try
                    If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Parameter values with the following SQL... " & _
                                    vbCrLf & _sbSQL.ToString)

                    _ds = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & _sbSQL.ToString & vbCrLf & ex.ToString)
                    GetOrgGroupParamValues = ATPAR_E_LOCALDBSELECTFAIL
                    Exit Function
                End Try

                Try

                    If Not _ds Is Nothing Then
                        For i As Integer = 0 To _ds.Tables(0).Rows.Count - 1
                            pParameters(_ds.Tables(0).Rows(i).Item("PARAMETER_ID")) = _ds.Tables(0).Rows(i).Item("PARAMETER_VALUE")
                        Next
                    End If
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to read parameters " & _sbSQL.ToString & _
                                                        vbCrLf & _ds.GetXml & vbCrLf & ex.ToString)
                    GetOrgGroupParamValues = E_SERVERERROR
                    Exit Function
                End Try

            End If

            ' print out the values we received for debugging
            If log.IsInfoEnabled Then
                Dim _sb As New Text.StringBuilder
                _sb.Append(" Got the following Parameter Values : " & vbCrLf)
                For Each i As DictionaryEntry In pParameters
                    _sb.Append("Parameter : " & i.Key.PadRight(20, "-") & ", Value :" & i.Value & vbCrLf)
                Next
                log.Info(_sb.ToString)
            End If

            GetOrgGroupParamValues = ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error getting values for parameters" & ex.ToString)
            GetOrgGroupParamValues = E_SERVERERROR
            Exit Function
        End Try

    End Function

    ' TODO : Move into AtparApplication_Parameters class
    ' TODO : duplicate function, MUST be removed from Init.Atpar_Utils
    ''' <summary>
    ''' Get one or more Profile Parameter Values
    ''' </summary>
    ''' <param name="pParameters">SortedList of Parameters (Col 1 - parameters that need to be retrieved, Col2 - Values returned by DB</param>
    ''' <returns>ATPAR_OK on success else Error</returns>
    ''' <example>
    ''' To get a single parameter: 
    ''' <pre>
    ''' Dim param as new SortedList
    ''' param("PARAM_NAME") = String.Empty
    ''' 
    ''' _StatusCode = GetProfileParamValues(_profileID, _appid, param)
    ''' </pre>
    ''' To Get multiple parameters:
    ''' <pre>
    ''' Dim param as new SortedList
    ''' param("PARAM_NAME1") = String.Empty
    ''' param("PARAM_NAME2") = String.Empty
    ''' param("PARAM_NAME3") = String.Empty
    ''' 
    ''' _StatusCode = GetProfileParamValues(_profileID, _appid, param)
    ''' </pre>
    ''' </example>
    ''' <remarks></remarks>
    Public Function GetProfileParamValues(ByRef pParameters As SortedList) As Long _
                                             'Implements AtPar_BusinessRules_RemotingProxy.IAtPar_Utils.GetProfileParamValues

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            log.debug("Testing in Params..")

            If (Len(ApplicationId) = 0 Or Len(ProfileId) = 0 Or pParameters.Count = 0) Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & "(ApplicationId:" & ApplicationId & _
                                                    ", ProfileId:" & ProfileId & ",pParameters.Count:" & pParameters.Count & _
                                                    ") E_INVALIDPARAMETER ")
                GetProfileParamValues = E_INVALIDPARAMETER
                Exit Function
            End If

            Dim _sbSQL As Text.StringBuilder
            Dim _paramCount As Integer = pParameters.Count
            _sbSQL = New Text.StringBuilder
            Try


                _sbSQL.Append("SELECT ")

                ' if its a single parameter, just get the value
                If _paramCount = 1 Then
                    _sbSQL.Append("PARAMETER_VALUE ")
                ElseIf _paramCount > 1 Then
                    'if there are more, get both parameter_id and value
                    _sbSQL.Append("PARAMETER_ID, PARAMETER_VALUE ")
                End If

                ' TODO: schema
                _sbSQL.Append("FROM MT_ATPAR_PROFILE_PARAMETERS " & _
                              " WHERE PROFILE_ID ='" & ProfileId & "' AND APP_ID = " & ApplicationId & " AND ")

                ' if its a single parameter, make a direct SQL query 
                If _paramCount = 1 Then
                    _sbSQL.Append(" PARAMETER_ID ='" & pParameters.GetKey(0) & "'")
                ElseIf _paramCount > 1 Then
                    ' if there are more than one parameters, make a SQL using IN (...)
                    Dim _paramsList(_paramCount) As String
                    For i As Integer = 0 To _paramCount - 1
                        _paramsList(i) = "'" & pParameters.GetKey(i) & "'"
                    Next
                    Dim _paramListStr As String = String.Join(",", _paramsList, 0, _paramCount)
                    _sbSQL.Append(" PARAMETER_ID IN (" & _paramListStr & ")")
                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " error creating SQL " & _sbSQL.ToString & vbCrLf & ex.ToString)
                GetProfileParamValues = E_SERVERERROR
                Exit Function
            End Try

            ' if its a single transaction do a quick executescalar
            If _paramCount = 1 Then

                Try
                    If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Parameter value with the following SQL... " & _
                                                        vbCrLf & _sbSQL.ToString)

                    pParameters(pParameters.GetKey(0)) = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & _sbSQL.ToString & vbCrLf & ex.ToString)
                    GetProfileParamValues = ATPAR_E_LOCALDBSELECTFAIL
                    Exit Function
                End Try

            ElseIf _paramCount > 1 Then
                ' if there is more than one get all of them
                Dim _ds As DataSet
                Try
                    If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Parameter values with the following SQL... " & _
                                    vbCrLf & _sbSQL.ToString)

                    _ds = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & _sbSQL.ToString & vbCrLf & ex.ToString)
                    GetProfileParamValues = ATPAR_E_LOCALDBSELECTFAIL
                    Exit Function
                End Try

                Try

                    If Not _ds Is Nothing Then
                        For i As Integer = 0 To _ds.Tables(0).Rows.Count - 1
                            pParameters(_ds.Tables(0).Rows(i).Item("PARAMETER_ID")) = _ds.Tables(0).Rows(i).Item("PARAMETER_VALUE")
                        Next
                    End If
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to read parameters " & _sbSQL.ToString & _
                                                        vbCrLf & _ds.GetXml & vbCrLf & ex.ToString)
                    GetProfileParamValues = E_SERVERERROR
                    Exit Function
                End Try

            End If

            ' print out the values we received for debugging
            If log.IsInfoEnabled Then
                Dim _sb As New Text.StringBuilder
                _sb.Append(" Got the following Parameter Values : " & vbcrlf)
                For Each i As DictionaryEntry In pParameters
                    _sb.Append("Parameter : " & i.Key.PadRight(20, "-") & ", Value :" & i.Value & vbcrlf)
                Next
                log.Info(_sb.ToString)
            End If

            GetProfileParamValues = ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error getting values for parameters" & ex.ToString)
            GetProfileParamValues = E_SERVERERROR
            Exit Function
        End Try

    End Function

    Public Function GetProfileParamValue(ByRef pParamValue As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        If (Len(ProfileApplicationId) = 0 Or Len(ParameterId) = 0 Or Len(ProfileId) = 0) Then
            GetProfileParamValue = E_INVALIDPARAMETER
            If log.IsFatalEnabled Then log.Fatal("ATPAR_E_LOCALDBSELECTFAIL :")
            Exit Function
        End If

        _strSQL = " SELECT PARAMETER_VALUE  FROM MT_ATPAR_PROFILE_PARAMETERS " & _
                  " WHERE PROFILE_ID ='" & ProfileId & "' AND APP_ID = '" & ProfileApplicationId & "' AND PARAMETER_ID ='" & ParameterId & "'"

        If log.IsInfoEnabled Then log.Info(_strSQL)

        Try
            pParamValue = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))
        Catch ex As Exception
            GetProfileParamValue = ATPAR_E_LOCALDBSELECTFAIL
            If log.IsFatalEnabled Then log.Fatal("ATPAR_E_LOCALDBSELECTFAIL :" & ex.ToString)
            Exit Function
        End Try

        GetProfileParamValue = ATPAR_OK

    End Function

#End Region

End Class

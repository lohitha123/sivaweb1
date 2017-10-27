#Region "Imports"
Imports Microsoft.ApplicationBlocks.Data
Imports AtPar_BusinessRules_RemotingProxy
Imports Atpar_EncryptionServices
Imports System.AppDomain
Imports log4net
Imports System.IO
Imports System.Diagnostics
Imports System.Reflection
Imports System.Text.StringBuilder
Imports System.Data
Imports System.Data.SqlClient
Imports System.Security
Imports System.DirectoryServices
Imports System.Xml
Imports System.Text
#End Region

#Region "Bug Fix(s)"
'SM-0004757-10/08/2008
'NB-0004523-10/14/2008
'SM-0004934-10/22/2008
'SB-0004512-10/22/2008
'RT-0004894-10/24/2008
'DK-0005151-11/17/2008
'NB-0005446-01/30/2009
'NB-0005685-02/17/2009
'DK-0005948-03/12/2009
#End Region

Public Class AtPar_AuthServices
    Inherits AtPar_DeviceTransactions_Base
    Implements IAtPar_AuthServices
    Implements IAtPar_UserManagement
    Implements IDisposable

    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_AuthServices))

    Private disposedValue As Boolean = False        ' To detect redundant calls
    Private objUserManagement As AtPar_UserManagement
    Private _domain As DirectoryEntry
    Private _passwordAge As TimeSpan = TimeSpan.MinValue

    Const UF_DONT_EXPIRE_PASSWD As Integer = &H10000


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
        
            End If

            ' TODO: free shared unmanaged resources

        End If
        Me.disposedValue = True
    End Sub

    Public Sub New()

        Try

            log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.Init.ToString()
            log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = Nothing

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("BusinessRules Component Initialization Failed")
        End Try

    End Sub

    ''' <summary>
    ''' To get the Server Time
    ''' </summary>
    ''' <returns>Server time in XML format</returns>
    ''' <remarks></remarks>
    Public Function GetServerTime() As String _
    Implements IAtPar_AuthServices.GetServerTime

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim strServerTime As New StringBuilder

        With strServerTime
            .Append("<ROOT>")
            .Append("<SERVER_TIME>" & Format(System.DateTime.UtcNow(), ATPAR_LONGDATETIME_24H) & "</SERVER_TIME>")  'For HHT
            .Append("<SERVER_TIME_2>" & Format(System.DateTime.Now(), ATPAR_LONGDATETIME_24H) & "</SERVER_TIME_2>") 'For CrossPlatform
            .Append("</ROOT>")
        End With

        GetServerTime = strServerTime.ToString()

    End Function

    ''' <summary>
    ''' To get an access token 
    ''' </summary>
    ''' <returns>Status Code</returns>
    ''' <remarks>This function first checks if all conditions have been satisfied and 
    '''generates a token for a given user</remarks>
    Public Function GetAccessToken(ByVal pUserID As String, ByVal pPassword As String, _
                                   ByVal pLoginType As Integer, ByVal pDateTime As String, _
                                   ByVal pDeviceID As String, ByVal pAccessToken As String, _
                                   ByVal pSSOByPass As Boolean, ByRef pAccessTokenXML As String, _
                                   ByVal pDeviceTokenEntry() As String) As Long _
                                   Implements IAtPar_AuthServices.GetAccessToken

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        'AHHT = 5
        'IHHT = 6
        'WHHT = 7
        If pLoginType = ClientType.HHT Or pLoginType = ClientType.AHHT Or pLoginType = ClientType.IHHT Or pLoginType = ClientType.WHHT Then
            pSSOByPass = False
            Dim _Status As Long = ValidateSystemAndDevice(pDeviceTokenEntry(TokenEntry_Enum.SystemId), pDeviceTokenEntry(TokenEntry_Enum.DeviceId))
            If _Status <> ATPAR_OK Then
                Return _Status
            End If
        End If

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            ' required data checks
            If pUserID.Length = 0 Or pDateTime.Length = 0 Or pDeviceID.Length = 0 Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Required parameters missing, aborting token generation")
                GetAccessToken = E_INVALIDPARAMETER
                Exit Function
            End If

            ' decrypt the password
            Dim encServices As New AtParEncryptionServices
            ' Dim _DecryptedPassword As String = encServices.DecryptString(pPassword, AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase)
            Dim _DecryptedPassword As String = String.Empty


            If Not String.IsNullOrEmpty(pPassword) Then
                _DecryptedPassword = encServices.DecryptString(pPassword, AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase)
            End If

            ' this is wasted if its a ldap login, however its cheaper than making a DB call to find out
            ' if it infact is a ldap login
            ' TODO : this custom hash function is very slow and needs to be changed to use System.Crypto
            ' we'll need a way to upgrade existing native atpar user passwords if its changed
            Dim _PassHash As String = CSHA256.ComputeHash(_DecryptedPassword & pUserID)

            Dim _StatusCode As Long
            Dim _outProfileID As String
            Dim _outOrgGroupID As String
            Dim _outIdleTime As Integer
            Dim _outTokenExpPeriod As Integer
            Dim _outUserDN As String = String.Empty
            Dim _LdapUser As String = YesNo_Enum.N.ToString

            _StatusCode = CheckUserLogin(pUserID, _PassHash, pLoginType, pDateTime, pDeviceID, pAccessToken, _
                                         pSSOByPass, _outProfileID, _outOrgGroupID, _outIdleTime, _
                                         _outTokenExpPeriod, _outUserDN)

            Select Case _StatusCode
                Case AUTHENTICATE_AGAINST_LDAP
                    _LdapUser = YesNo_Enum.Y.ToString
                    _StatusCode = AuthenticateAgainstLDAP(pUserID, _outUserDN, _DecryptedPassword, pDeviceTokenEntry)

                    If _StatusCode = ATPAR_OK Then
                        Exit Select
                    Else
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to Authenticate against LDAP")
                        SaveLoginAttempts(pUserID, pDeviceID, pAccessToken, _StatusCode, String.Empty)
                        Return _StatusCode
                    End If
                Case ATPAR_E_LOCALDBSELECTFAIL
                    Return _StatusCode
                Case ATPAR_OK
                    Exit Select
                Case Else
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " CheckUserLogin Failed (" & _StatusCode & "), aborting token generation")
                    SaveLoginAttempts(pUserID, pDeviceID, pAccessToken, _StatusCode, String.Empty)
                    Return _StatusCode
            End Select

            Dim _encServices As New AtParEncryptionServices

            Dim _CurrentAccessToken As String = _encServices.HashString(pUserID & _PassHash & pDateTime & pDeviceID, AtParEncryptionServices.SaltTypes.TokenPasswordHash)
            Dim _ExpiryDT As DateTime = DateAdd(DateInterval.Minute, _outTokenExpPeriod, System.DateTime.UtcNow())
            Dim _RequestDT As DateTime = System.DateTime.UtcNow()
            'RT 4894
            Dim _AccessTokenXML As String = String.Empty
            _AccessTokenXML = GenerateAccessToken(_CurrentAccessToken, pUserID, _PassHash, _outOrgGroupID, pDeviceID, _
                                _ExpiryDT, _RequestDT, _outProfileID, _LdapUser, _outIdleTime, pAccessToken, pLoginType)

            If _AccessTokenXML.Length = 0 Then
                SaveLoginAttempts(pUserID, pDeviceID, pAccessToken, _StatusCode, String.Empty)
                Return ATPAR_E_TOKENSAVEFAIL
            End If

            SaveLoginAttempts(pUserID, pDeviceID, pAccessToken, _StatusCode, String.Empty)
            pAccessTokenXML = _AccessTokenXML

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Function Failed")
        End Try

    End Function

    ''' <summary>
    ''' To generate Access Token
    ''' </summary>
    ''' <param name="CurrentAccessToken">Current Access Token value.</param>
    ''' <param name="UserName">Username of logged in user.</param>
    ''' <param name="PassHash">Pass Hash value.</param>
    ''' <param name="OrgGroupID">Org Group ID value.</param>
    ''' <param name="DeviceID">Device ID value.</param>
    ''' <param name="ExpiryDateTime">Expiry Date Time of user login.</param>
    ''' <param name="RequestDateTime">Request Date Time of user login.</param>
    ''' <param name="ProfileID">Profile ID of the user.</param>
    ''' <param name="LdapUser">LDAP User value.</param>
    ''' <param name="IdleTime">Idle Time for the user login.</param>
    ''' <param name="oldAccessToken">Old Access Token value.</param>
    ''' <param name="LoginType">Login Type of the user.</param>
    ''' <returns>Access Token in XML format</returns>
    ''' <remarks>This function generates Access Token based on the login details & Old Access Token value.</remarks>
    Private Function GenerateAccessToken(ByVal CurrentAccessToken As String, ByVal UserName As String, _
                                         ByVal PassHash As String, ByVal OrgGroupID As String, _
                                         ByVal DeviceID As String, ByVal ExpiryDateTime As DateTime, _
                                         ByVal RequestDateTime As DateTime, ByVal ProfileID As String, ByVal LdapUser As String, _
                                         ByVal IdleTime As Integer, ByVal oldAccessToken As String, ByVal LoginType As Integer) As String

        'TODO: need to rewrite this function according to standards
        Try
            log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = UserName
            Dim stackFrame As New StackFrame()
            Dim methodBase As MethodBase = stackFrame.GetMethod()
            Dim methodBaseName As String = methodBase.Name
            If log.IsDebugEnabled Then log.Debug(methodBaseName)

            'RT 4894
            ' Dim LoginType As Integer
            ' Get the applications this token(user/profile) is allowed access to
            'TODO: ideally this should be generated as xml from sql server and passed directly to the callee
            ' and this dataset should be combined with one of the other queries and not result in a 3rd call to the DB

            Dim sql_param_profileid As SqlParameter = New SqlParameter("@ProfileID", SqlDbType.NVarChar, _
                                                                  ATPAR_DBSIZE_PROFILE_ID)
            sql_param_profileid.Value = ProfileID

            Dim sql_param_logintype As SqlParameter = New SqlParameter("@LoginType", SqlDbType.SmallInt)
            sql_param_logintype.Value = LoginType

            Dim dsAppIDs As DataSet

            If log.IsInfoEnabled Then
                log.Info("Calling SP_GetProfileApps with the following syntax..")
                Dim _strSQL As String = "exec SP_GetProfileApps " & _
                                         "'" & sql_param_profileid.Value & "','" & sql_param_logintype.value & "'"
                log.Info(_strSQL)
            End If

            Dim _Cmd As SqlCommand
            Try
                _Cmd = New SqlCommand
                _Cmd.Connection = m_LocalDB.CreateConnection
                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "SP_GetProfileApps"
                _Cmd.Parameters.Add(sql_param_profileid)
                _Cmd.Parameters.Add(sql_param_logintype)

                dsAppIDs = m_LocalDB.ExecuteDataSet(_Cmd)
                _Cmd.Parameters.Clear()
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlex))
                Throw sqlex
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
                Throw ex
            Finally
                _Cmd.dispose()
            End Try

            Dim strAppXML As String = String.Empty
            If Not dsAppIDs Is Nothing Then
                If dsAppIDs.Tables(0).Rows.Count > 0 Then
                    For intAppCnt As Integer = 2 To 20  '20 is hard coded need to changed when new apps are added
                        strAppXML = strAppXML & "<APP" & intAppCnt & ">"
                        For i As Integer = 0 To dsAppIDs.Tables(0).Rows.Count - 1
                            If intAppCnt = dsAppIDs.Tables(0).Rows(i).Item("APP_ID") Then
                                strAppXML = strAppXML & "1"
                            End If
                        Next
                        strAppXML = strAppXML & "</APP" & intAppCnt & ">"
                    Next
                End If
            End If

            ' create the token xml string
            Dim pAccessTokenXML As String
            pAccessTokenXML = "<ROOT><ACCESSTOKEN>" & CurrentAccessToken & "</ACCESSTOKEN>" & _
                              "<TOKENEXPIRYTIME>" & ExpiryDateTime & "</TOKENEXPIRYTIME>" & _
                              "<PASSHASH>" & PassHash & "</PASSHASH>" & _
                              "<IDLETIME>" & IdleTime & "</IDLETIME>" & _
                              "<PROFILE_ID>" & ProfileID & "</PROFILE_ID>" & _
                              "<ORG_GRP_ID>" & OrgGroupID & "</ORG_GRP_ID>" & _
                              "<LDAP_USER>" & LdapUser & "</LDAP_USER>" & _
                              strAppXML & "</ROOT>"


            ' save the token in the database

            Dim sql_param_userid As SqlParameter = New SqlParameter("@UserID", SqlDbType.NVarChar, _
                                                                ATPAR_DBSIZE_USER_ID)
            sql_param_userid.Value = UserName


            Dim sql_param_deviceid As SqlParameter = New SqlParameter("@DeviceID", SqlDbType.NVarChar, _
                                                                    ATPAR_DBSIZE_DEVICE_ID)
            sql_param_deviceid.Value = DeviceID

            Dim sql_param_expiryDateTime As SqlParameter = New SqlParameter("@ExpiryDateTime", SqlDbType.DateTime)
            sql_param_expiryDateTime.Value = ExpiryDateTime

            Dim sql_param_RequestDateTime As SqlParameter = New SqlParameter("@RequestDateTime", SqlDbType.DateTime)
            sql_param_RequestDateTime.Value = RequestDateTime

            Dim sql_param_idletime As SqlParameter = New SqlParameter("@IdleTime", SqlDbType.Int)
            sql_param_idletime.Value = IdleTime

            Dim sql_param_accesstoken As SqlParameter = New SqlParameter("@AccessToken", SqlDbType.NVarChar, _
                                                                        ATPAR_DBSIZE_ACCESS_TOKEN)
            sql_param_accesstoken.Value = CurrentAccessToken


            Dim sql_param_oldaccesstoken As SqlParameter = New SqlParameter("@OldAccessToken", SqlDbType.NVarChar, _
                                                                            ATPAR_DBSIZE_ACCESS_TOKEN)
            sql_param_oldaccesstoken.Value = oldAccessToken

            If log.IsInfoEnabled Then
                log.Info("Calling SP_SaveAccessToken with the following syntax..")

                Dim _strSQL As String = "EXEC SP_SaveAccessToken " & vbCrLf & _
                                          " @UserID = N'" & sql_param_userid.Value & "'," & vbCrLf & _
                                          " @DeviceID = N'" & sql_param_deviceid.value & "'," & vbCrLf & _
                                          " @ExpiryDateTime = N'" & sql_param_expiryDateTime.value & "'," & vbCrLf & _
                                          " @RequestDateTime = N'" & sql_param_RequestDateTime.value & "'," & vbCrLf & _
                                          " @ProfileID = N'" & sql_param_profileid.value & "'," & vbCrLf & _
                                          " @IdleTime = N'" & sql_param_idletime.value & "'," & vbCrLf & _
                                          " @AccessToken = N'" & sql_param_accesstoken.value & "'," & vbCrLf & _
                                          " @OldAccessToken = N'" & sql_param_oldaccesstoken.value & "'"

                log.Info(_strSQL)
            End If


            Try
                _Cmd = New SqlCommand

                _Cmd.Connection = m_LocalDB.CreateConnection
                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "SP_SaveAccessToken"
                _Cmd.Parameters.Add(sql_param_userid)
                _Cmd.Parameters.Add(sql_param_deviceid)
                _Cmd.Parameters.Add(sql_param_accesstoken)
                _Cmd.Parameters.Add(sql_param_expiryDateTime)
                _Cmd.Parameters.Add(sql_param_RequestDateTime)
                _Cmd.Parameters.Add(sql_param_profileid)
                _Cmd.Parameters.Add(sql_param_idletime)
                _Cmd.Parameters.Add(sql_param_oldaccesstoken)

                m_LocalDB.ExecuteNonQuery(_Cmd)

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlex))
                Throw sqlex
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
                Throw ex
            Finally
                _Cmd.dispose()
            End Try

            GenerateAccessToken = pAccessTokenXML

        Catch sqlex As SqlException
            If log.IsErrorEnabled Then log.Error(GetSQLExceptionMessageString(sqlex))
            Throw New Exception("GenerateAccessToken Failed", sqlex)
        Catch ex As Exception
            Throw New Exception("GenerateAccessToken Failed", ex)
        End Try

    End Function

    ''' <summary>
    ''' To check user login credentials.
    ''' </summary>
    ''' <param name="UserName">Username of logged in user.</param>
    ''' <param name="Passhash">Pass Hash value.</param>
    ''' <param name="LoginType">Login Type of the user.</param>
    ''' <param name="AtParDateTime">Server Date Time when user logged in.</param>
    ''' <param name="DeviceID">Device ID value.</param>
    ''' <param name="AccessToken">Access Token value.</param>
    ''' <param name="SSOByPass">SSO check boolean value.</param>
    ''' <param name="outProfileID">Profile ID of the user.</param>
    ''' <param name="outOrgGroupID">Org Group ID value.</param>
    ''' <param name="outIdleTime">Idle Time for the user login.</param>
    ''' <param name="outTokenExpiryPeriod">Expiry period of user token.</param>
    ''' <param name="RequestDateTime">Request Date Time of user login.</param>
    ''' <param name="outUserDN">User DN login.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    ''' <remarks>This function checks user login.</remarks>
    Private Function CheckUserLogin(ByVal UserName As String, ByVal Passhash As String, _
                                   ByVal LoginType As Integer, ByVal AtParDateTime As String, _
                                   ByVal DeviceID As String, ByVal AccessToken As String, _
                                   ByVal SSOByPass As Boolean, ByRef outProfileID As String, _
                                   ByRef outOrgGroupID As String, ByRef outIdleTime As Integer, _
                                   ByRef outTokenExpiryPeriod As Integer, ByRef outUserDN As String) As Long
        Try
            log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = UserName
            Dim stackFrame As New StackFrame()
            Dim methodBase As MethodBase = stackFrame.GetMethod()
            Dim methodBaseName As String = methodBase.Name
            If log.IsDebugEnabled Then log.Debug(methodBaseName)

            Dim sql_param_userid As SqlParameter = New SqlParameter("@UserID", SqlDbType.NVarChar, _
                                                                ATPAR_DBSIZE_USER_ID)
            sql_param_userid.Value = UserName


            Dim sql_param_logintype As SqlParameter = New SqlParameter("@LoginType", SqlDbType.SmallInt)
            sql_param_logintype.Value = LoginType

            Dim sql_param_deviceid As SqlParameter = New SqlParameter("@DeviceID", SqlDbType.NVarChar, _
                                                                    ATPAR_DBSIZE_DEVICE_ID)
            sql_param_deviceid.Value = DeviceID

            Dim sql_param_passhash As SqlParameter = New SqlParameter("@Passhash", SqlDbType.NVarChar, _
                                                                              ATPAR_DBSIZE_PASSHASH)
            sql_param_passhash.Value = Passhash

            Dim sql_param_apdatetime As SqlParameter = New SqlParameter("@AtParDateTime", SqlDbType.DateTime)
            'NB-0005446
            'sql_param_apdatetime.Value = Format(System.DateTime.UtcNow(), ATPAR_LONGDATETIME_24H)
            sql_param_apdatetime.Value = Now()
            Dim sql_param_ssobypass As SqlParameter = New SqlParameter("@SSOBypass", SqlDbType.Bit)
            sql_param_ssobypass.Value = SSOByPass

            Dim sql_param_statuscode As SqlParameter = New SqlParameter("@StatusCode", SqlDbType.Int)
            sql_param_statuscode.Direction = ParameterDirection.Output

            Dim sql_param_tokenexpiryperiod As SqlParameter = New SqlParameter("@TokenExpiryPeriod", SqlDbType.Int)
            sql_param_tokenexpiryperiod.Direction = ParameterDirection.Output

            Dim sql_param_profileid As SqlParameter = New SqlParameter("@ProfileID", SqlDbType.NVarChar, _
                                                                        ATPAR_DBSIZE_PROFILE_ID)
            sql_param_profileid.Direction = ParameterDirection.Output

            Dim sql_param_orggroupid As SqlParameter = New SqlParameter("@OrgGroupID", SqlDbType.NVarChar, _
                                                                        ATPAR_DBSIZE_ORG_GROUP_ID)
            sql_param_orggroupid.Direction = ParameterDirection.Output

            Dim sql_param_idletime As SqlParameter = New SqlParameter("@IdleTime", SqlDbType.Int)
            sql_param_idletime.Direction = ParameterDirection.Output


            Dim sql_param_UserDN As SqlParameter = New SqlParameter("@UserDN", SqlDbType.NVarChar, _
                                                                        ATPAR_DBSIZE_USERDN)
            sql_param_UserDN.Direction = ParameterDirection.Output
            'NB-0004523
            If log.IsInfoEnabled Then
                log.Info("Calling SP_CheckUserLogin with the following syntax..")
                Dim _strSQL As String = "DECLARE	" & _
                                          "@return_value int," & vbCrLf & _
                                          "@StatusCode int," & vbCrLf & _
                                          "@TokenExpiryPeriod int," & vbCrLf & _
                                          "@ProfileID nvarchar(30)," & vbCrLf & _
                                          "@OrgGroupID nvarchar(20)," & vbCrLf & _
                                          "@IdleTime int," & vbCrLf & _
                                          "@UserDN nvarchar(512)" & vbCrLf & _
                                          vbCrLf & _
                                        "EXEC	" & _
                                          "@return_value = SP_CheckUserLogin" & vbCrLf & _
                                          "@UserID = N'" & sql_param_userid.value & "'," & vbCrLf & _
                                          "@LoginType = " & sql_param_logintype.value & "," & vbCrLf & _
                                          "@DeviceID = N'" & sql_param_deviceid.value & "'," & vbCrLf & _
                                          "@Passhash = N'" & sql_param_passhash.value & "'," & vbCrLf & _
                                          "@AtParDateTime = N'" & sql_param_apdatetime.value & "'," & vbCrLf & _
                                          "@SSOBypass = " & sql_param_ssobypass.value & "," & vbCrLf & _
                                          "@StatusCode = @StatusCode OUTPUT," & vbCrLf & _
                                          "@TokenExpiryPeriod = @TokenExpiryPeriod OUTPUT," & vbCrLf & _
                                          "@ProfileID = @ProfileID OUTPUT," & vbCrLf & _
                                          "@OrgGroupID = @OrgGroupID OUTPUT," & vbCrLf & _
                                          "@IdleTime = @IdleTime OUTPUT," & vbCrLf & _
                                          "@UserDN = @UserDN OUTPUT" & vbCrLf & _
                                          vbCrLf & _
                                        "SELECT	" & _
                                          "@StatusCode as N'@StatusCode'," & vbCrLf & _
                                          "@TokenExpiryPeriod as N'@TokenExpiryPeriod'," & vbCrLf & _
                                          "@ProfileID as N'@ProfileID'," & vbCrLf & _
                                          "@OrgGroupID as N'@OrgGroupID'," & vbCrLf & _
                                          "@IdleTime as N'@IdleTime'," & vbCrLf & _
                                          "@UserDN as N'@UserDN'"
                log.Info(_strSQL)
            End If

            Dim _Cmd As SqlCommand
            Try
                _Cmd = New SqlCommand

                _Cmd.Connection = m_LocalDB.CreateConnection
                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "SP_CheckUserLogin"
                _Cmd.Parameters.Add(sql_param_userid)
                _Cmd.Parameters.Add(sql_param_logintype)
                _Cmd.Parameters.Add(sql_param_deviceid)
                _Cmd.Parameters.Add(sql_param_passhash)
                _Cmd.Parameters.Add(sql_param_apdatetime)
                _Cmd.Parameters.Add(sql_param_ssobypass)
                _Cmd.Parameters.Add(sql_param_statuscode)
                _Cmd.Parameters.Add(sql_param_tokenexpiryperiod)
                _Cmd.Parameters.Add(sql_param_profileid)
                _Cmd.Parameters.Add(sql_param_orggroupid)
                _Cmd.Parameters.Add(sql_param_idletime)
                _Cmd.Parameters.Add(sql_param_UserDN)

                m_LocalDB.ExecuteNonQuery(_Cmd)

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlex))
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
                Return E_SERVERERROR
            Finally
                _Cmd.dispose()
            End Try

            Dim _StatusCode As Long
            'NB-0004523
            _StatusCode = sql_param_statuscode.Value
            ' if its a atpar native auth we should expect ATPAR_OK, alternatively AUTHENTICATE_AGAINST_LDAP
            If _StatusCode = ATPAR_OK Or _StatusCode = AUTHENTICATE_AGAINST_LDAP Then
                outProfileID = sql_param_profileid.Value
                outOrgGroupID = sql_param_orggroupid.Value
                outIdleTime = sql_param_idletime.Value
                outTokenExpiryPeriod = sql_param_tokenexpiryperiod.Value
                outUserDN = Convert.ToString(sql_param_UserDN.Value)
            End If

            CheckUserLogin = _StatusCode

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(GetSQLExceptionMessageString(sqlex))
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("E_SERVERERROR :" & ex.ToString)
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' To check generated Access Token
    ''' </summary>
    ''' <param name="DeviceTokenEntry()">Array of user details</param>
    ''' <param name="AppID">Application ID for whcih the user has requested</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    ''' <remarks>This function is used to verify the generated Access Token.</remarks>
    Public Function CheckAccessToken(ByVal DeviceTokenEntry() As String, ByVal AppID As Integer) As Long _
                                      Implements IAtPar_AuthServices.CheckAccessToken

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = DeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = DeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim UserName As String = String.Empty
        Dim AccessToken As String = String.Empty
        Dim DeviceID As String = String.Empty

        UserName = DeviceTokenEntry(TokenEntry_Enum.UserID)
        AccessToken = DeviceTokenEntry(TokenEntry_Enum.AccessToken)
        DeviceID = DeviceTokenEntry(TokenEntry_Enum.DeviceID)
        'TODO: Read the other values from the DeviceTokenEntry String array

        ' required data checks
        If UserName.Length = 0 Or AccessToken.Length = 0 Or DeviceID.Length = 0 Then
            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Required parameters missing, cannot check access token")
            Return E_INVALIDPARAMETER
        End If

        Try
            CreateLocalDB(DeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            Dim _StatusCode As Long
            _StatusCode = tagCheckAccessToken(UserName, AccessToken, DeviceID, AppID)
            If _StatusCode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " CheckAccessToken(" & UserName & "," & AccessToken & "," & DeviceID & "," & AppID & ") Failed with error code :" & _StatusCode)
                Return _StatusCode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " " & ex.ToString)
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' To validate the generated Access Token.
    ''' </summary>
    ''' <param name="UserName">Username of logged in user.</param>
    ''' <param name="AccessToken">Access Token value.</param>
    ''' <param name="DeviceID">Device ID value.</param>
    ''' <param name="AppID">Application ID for whcih the user has requested</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Private Function tagCheckAccessToken(ByVal UserName As String, ByVal AccessToken As String, _
                                     ByVal DeviceID As String, ByVal AppID As Integer) As Long

        Try
            log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = UserName
            Dim stackFrame As New StackFrame()
            Dim methodBase As MethodBase = stackFrame.GetMethod()
            Dim methodBaseName As String = methodBase.Name
            If log.IsDebugEnabled Then log.Debug(methodBaseName)

            Dim sql_param_userid As SqlParameter = New SqlParameter("@UserID", SqlDbType.NVarChar, _
                                                                ATPAR_DBSIZE_USER_ID)
            sql_param_userid.Value = UserName


            Dim sql_param_accesstoken As SqlParameter = New SqlParameter("@AccessToken", SqlDbType.NVarChar, _
                                                                    ATPAR_DBSIZE_ACCESS_TOKEN)
            sql_param_accesstoken.Value = AccessToken

            Dim sql_param_apdatetime As SqlParameter = New SqlParameter("@AtParDateTime", SqlDbType.DateTime)
            sql_param_apdatetime.Value = Format(System.DateTime.UtcNow(), ATPAR_LONGDATETIME_24H)


            Dim sql_param_appid As SqlParameter = New SqlParameter("@AppID", SqlDbType.Int)
            sql_param_appid.Value = AppID

            Dim sql_param_deviceid As SqlParameter = New SqlParameter("@DeviceID", SqlDbType.NVarChar, _
                                                                ATPAR_DBSIZE_DEVICE_ID)
            sql_param_deviceid.Value = DeviceID

            Dim sql_param_statuscode As SqlParameter = New SqlParameter("@StatusCode", SqlDbType.Int)
            sql_param_statuscode.Direction = ParameterDirection.Output
            'NB-0004523
            If log.IsInfoEnabled Then
                log.Info("Calling SP_CheckAccessToken with the following syntax..")
                Dim _strSQL As String = "DECLARE	" & vbCrLf & _
                                        "@return_value int," & vbCrLf & _
                                        "@StatusCode int" & vbCrLf & _
                                        vbCrLf & _
                                        "EXEC	" & vbCrLf & _
                                        "@return_value = [ATPAR_MT].[SP_CheckAccessToken]" & vbCrLf & _
                                        "@UserID = N'" & sql_param_userid.value & "'," & vbCrLf & _
                                        "@AccessToken = N'" & sql_param_accesstoken.value & "'," & vbCrLf & _
                                        "@AtParDateTime = N'" & sql_param_apdatetime.value & "'," & vbCrLf & _
                                        "@AppID = " & sql_param_appid.value & "," & vbCrLf & _
                                        "@DeviceID = N'" & sql_param_deviceid.value & "'," & vbCrLf & _
                                        "@StatusCode = @StatusCode OUTPUT" & vbCrLf & _
                                        vbCrLf & _
                                        "SELECT	@StatusCode as N'@StatusCode'"
                log.Info(_strSQL)
            End If

            Dim _Cmd As SqlCommand
            Try
                _Cmd = New SqlCommand

                _Cmd.Connection = m_LocalDB.CreateConnection
                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "SP_CheckAccessToken"
                _Cmd.Parameters.Add(sql_param_userid)
                _Cmd.Parameters.Add(sql_param_accesstoken)
                _Cmd.Parameters.Add(sql_param_apdatetime)
                _Cmd.Parameters.Add(sql_param_appid)
                _Cmd.Parameters.Add(sql_param_deviceid)
                _Cmd.Parameters.Add(sql_param_statuscode)

                m_LocalDB.ExecuteNonQuery(_Cmd)

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(GetSQLExceptionMessageString(sqlex))
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal("E_SERVERERROR :" & ex.ToString)
                Return E_SERVERERROR
            Finally
                _Cmd.dispose()
            End Try

            'Dim _StatusCode As Long = DirectCast(sql_param_statuscode.Value)

            tagCheckAccessToken = sql_param_statuscode.Value

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(GetSQLExceptionMessageString(sqlex))
            Throw New Exception("tagCheckAccessToken Failed", sqlex)
        Catch ex As Exception
            Throw New Exception("tagCheckAccessToken Failed", ex)
        End Try

    End Function

    ''' <summary>
    ''' Authenticate a given user against the directory server
    ''' </summary>
    ''' <param name="pUserName">Username of logged in user.</param>
    ''' <param name="pUserdn">User DN value.</param>
    ''' <param name="pPassHash">Pass Hash value.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    ''' <remarks>The function logs failures to error log</remarks>
    Private Function AuthenticateAgainstLDAP(ByVal pUserName As String, _
                                             ByVal pUserdn As String, _
                                             ByVal pPassHash As String, _
                                             ByVal pDeviceTokenEntry() As String) As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserName
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)


        'DK-0004490
        Dim _strLdapConnectString As String = String.Empty
        Dim _accountStatusAttrib As String = String.Empty
        Dim _accountStatusAttribValue As String = String.Empty
        Dim _ldapSearchFilter As String = String.Empty
        Dim _debugStr As String = String.Empty
        Dim _StatusCode As Long

        Dim _strProtocol As String = String.Empty
        Dim _strServerName As String = String.Empty
        Dim _strBaseDn As String = String.Empty
        Dim _strLdapUserID As String = String.Empty
        Dim _strAuthType As String = String.Empty
        Dim _strAcntStatusRuleSet As String = String.Empty

        'For LDAP Authentication
        Dim LC As System.DirectoryServices.Protocols.LdapConnection
        Dim DI As System.DirectoryServices.Protocols.LdapDirectoryIdentifier
        Dim NC As System.Net.NetworkCredential

        Dim _nAuthType As Integer

        Try ' use configuration data

            ' if theres a account status ruleset, parse it and get attribute/value
            _strAuthType = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.AUTHTYPE.ToString())
            _strAcntStatusRuleSet = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.ACNTSTATRULE.ToString())

            If _strAcntStatusRuleSet.Length > 0 Then
                Dim _EQPos As Integer = InStr(_strAcntStatusRuleSet, "=")
                _accountStatusAttrib = _strAcntStatusRuleSet.Substring(0, _EQPos - 1)
                _accountStatusAttribValue = _strAcntStatusRuleSet.Substring(_EQPos)
            End If
            _strProtocol = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.PROTOCOL.ToString())
            _strServerName = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.SERVERNAME.ToString())
            _strBaseDn = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.BASEDN.ToString())
            _strLdapUserID = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.USERID.ToString())
            'DK-0004490
            If (_strProtocol = "LDAP") Or (_strProtocol = "LDAPS") Then
                _strProtocol = "LDAP"
            End If

            _strLdapConnectString = _strProtocol & "://" & _strServerName & IIf(_strBaseDn.Length > 0, "/", "") & _strBaseDn

            _ldapSearchFilter = _strLdapUserID & "=" & pUserName

            Select Case _strAuthType
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
            'common debug data		
            _debugStr = "Connect string: " & _strLdapConnectString & vbCrLf & _
                      "UserDN: " & pUserdn & vbCrLf & _
                      "Search Filter: " & _ldapSearchFilter & vbCrLf & _
                      "Search Attributes: " & _accountStatusAttrib & vbCrLf

        Catch ex As Exception
            AuthenticateAgainstLDAP = E_LOGIN_FAILED
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Invalid configuration data " & _
            _debugStr & ex.ToString)
            Exit Function
        End Try

        Try
            DI = New LdapDirectoryIdentifier(_strServerName)
            NC = New System.Net.NetworkCredential(pUserdn, pPassHash)
            LC = New System.DirectoryServices.Protocols.LdapConnection(DI, NC, AuthType.Basic)
            LC.SessionOptions.ProtocolVersion = 3

        Catch ex As Exception
            AuthenticateAgainstLDAP = E_LOGIN_FAILED
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to initialize System.Directory objects" & _
           _debugStr & ex.ToString)
            Exit Function
        End Try

        ' bind to the directory
        Try

            LC.Bind()

        Catch ex As Exception
            If ex.Message.Contains("The supplied credential is invalid") Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & "Either the UserDN or Password was invalid :" & _debugStr & ex.ToString)
                Return ATPAR_E_INVALIDPASSWORD
            Else
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to bind to the directory " & _
               _debugStr & ex.ToString)
                Return E_LOGIN_FAILED
            End If
        End Try

        ' if the accountstatus data wasn't specified, don't ask for this property on the server
        If _accountStatusAttrib.Length <> 0 Then

            Try

                Dim searchreq As New SearchRequest(_strBaseDn, _ldapSearchFilter, Protocols.SearchScope.Subtree)
                Dim searchresp As System.DirectoryServices.Protocols.SearchResponse
                Dim searchcoll As System.DirectoryServices.Protocols.SearchResultEntryCollection
                Dim searchentry As System.DirectoryServices.Protocols.SearchResultEntry

                searchresp = LC.SendRequest(searchreq)

                If searchresp.Entries.Count > 0 Then
                    searchcoll = searchresp.Entries
                    For Each searchentry In searchcoll
                        If searchentry.Attributes.Contains(_accountStatusAttrib) Then
                            Dim attr As DirectoryAttribute = searchentry.Attributes(_accountStatusAttrib)

                            ' if the returned value doesn't matche the ruleset()
                            If attr(0) <> _accountStatusAttribValue Then
                                _StatusCode = E_ACCOUNTDISABLED
                            Else
                                _StatusCode = ATPAR_OK
                            End If


                        End If
                    Next
                Else
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " No Attributes were returned for this user " & _
                     _debugStr)
                    Return E_LOGIN_FAILED
                End If


            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to check AccountStatus Attribute " & _
               _debugStr & ex.ToString)

                Return E_LOGIN_FAILED
            End Try

        End If

        AuthenticateAgainstLDAP = _StatusCode

    End Function


    'DK - 0005151
    ''' <summary>
    ''' To save Login Attempts
    ''' </summary>
    ''' <param name="userId">Id of the User</param>
    ''' <param name="deviceId">Id of the device</param>
    ''' <param name="deviceToken">Device Token</param>
    ''' <param name="reasonCode">Reason Code</param>
    ''' <param name="lastClientAddress">Address of the last client</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Private Function SaveLoginAttempts(ByVal userId As String, _
                                      ByVal deviceId As String, _
                                      ByVal deviceToken As String, _
                                      ByVal reasonCode As String, _
                                      ByVal lastClientAddress As String) As Long
        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = userId
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strLoginHistory As Integer

        Try

            Dim sql_param_userid As New SqlParameter("@pUserID", SqlDbType.NVarChar)
            sql_param_userid.Value = userId

            Dim sql_param_deviceid As New SqlParameter("@pDeviceID ", SqlDbType.NVarChar)
            sql_param_deviceid.Value = deviceId

            Dim sql_param_devicetoken As New SqlParameter("@pDeviceToken", SqlDbType.NVarChar)
            sql_param_devicetoken.Value = deviceToken

            Dim sql_param_reasoncode As New SqlParameter("@pReasonCode", SqlDbType.NVarChar)
            sql_param_reasoncode.Value = reasonCode

            Dim sql_param_lastcliaddr As New SqlParameter("@pLastClientAddress", SqlDbType.NVarChar)
            sql_param_lastcliaddr.Value = lastClientAddress

            If log.IsInfoEnabled Then
                log.Info("Calling SP_SaveLoginAttempts with the following syntax..")
                Dim _strSQL As String = "exec SP_SaveLoginAttempts " & _
                                         "'" & sql_param_userid.Value & "', " & _
                                         "'" & sql_param_deviceid.Value & "', " & _
                                         "'" & sql_param_devicetoken.Value & "', " & _
                                         "'" & sql_param_reasoncode.Value & "', " & _
                                         "'" & sql_param_lastcliaddr.value & "'"
                log.Info(_strSQL)
            End If


            Dim _Cmd As SqlCommand
            Try
                _Cmd = New SqlCommand

                _Cmd.Connection = m_LocalDB.CreateConnection
                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "SP_SaveLoginAttempts"
                _Cmd.Parameters.Add(sql_param_userid)
                _Cmd.Parameters.Add(sql_param_deviceid)
                _Cmd.Parameters.Add(sql_param_devicetoken)
                _Cmd.Parameters.Add(sql_param_reasoncode)
                _Cmd.Parameters.Add(sql_param_lastcliaddr)

                ' TODO: log the query string
                _strLoginHistory = m_LocalDB.ExecuteNonQuery(_Cmd)

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
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

    End Function

    ''' <summary>
    ''' To get a TokEntry collection for the given Access Token
    ''' </summary>
    ''' <param name="pAccessToken">Access Token value.</param>
    ''' <param name="pTokEntry">Token Entry collection.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Private Function GetTokenEntry(ByVal pAccessToken As String, _
                                   ByRef pTokEntry As DataSet, ByVal pDeviceTokenEntry() As String) As Long _
                                   Implements IAtPar_AuthServices.GetTokenEntry

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

        Try
            _strSQL = "SELECT USER_ID, ACCESS_TOKEN, DEVICE_ID, " & _
                                " CONVERT(VARCHAR(10), EXPIRY_TIME, 101) + ' ' + " & _
                                " CONVERT(VARCHAR(8), EXPIRY_TIME, 114) EXPIRY_TIME, CONVERT(VARCHAR(10), REQUEST_TIME, 101) + ' ' + " & _
                                " CONVERT(VARCHAR(8), REQUEST_TIME, 114) REQUEST_TIME," & _
                                " PROFILE_ID, IDLE_TIME FROM MT_ATPAR_TOKENS " & _
                                " WHERE ACCESS_TOKEN = '" & pAccessToken & "'"

            If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Token entry with the following sql..." & _
                                vbCrLf & _strSQL)

            pTokEntry = m_LocalDB.ExecuteDataSet(CommandType.Text, _strSQL)

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlex))
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("E_SERVERERROR :" & ex.ToString)
            Return E_SERVERERROR
        End Try

        GetTokenEntry = ATPAR_OK

    End Function

    ''' <summary>
    ''' To delete Access Token from DB
    ''' </summary>
    ''' <param name="pAccessToken">Access Token value.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Public Function DeleteAccessTokenEntry(ByVal pAccessToken As String, ByVal pDeviceTokenEntry() As String) As Long _
                                           Implements IAtPar_AuthServices.DeleteAccessTokenEntry

        ' Delete the token from the DB Table MT_ATPAR_TOKENS
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

        Try
            _strSQL = "DELETE FROM MT_ATPAR_TOKENS WHERE ACCESS_TOKEN = '" & pAccessToken & "'"

            If log.IsInfoEnabled Then log.Info(methodBaseName & " Deleteing tokens with the following sql... " & _
                            vbCrLf & _strSQL)

            m_LocalDB.ExecuteNonQuery(CommandType.Text, _strSQL)

        Catch sqlex As SqlException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                            _strSQL & vbCrLf & "Exception is : " & sqlex.tostring & vbCrLf)
            Return ATPAR_E_LOCALDBDELETEFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                            _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

        DeleteAccessTokenEntry = ATPAR_OK

    End Function

    'SM-4070 06/13/2008 SSO
    'Function returns the value which is set in config file for that particular SSO logged in user
    ''' <summary>
    ''' To check whether SSO is enabled or not
    ''' </summary>
    ''' <param name="pAccessToken">Access Token value.</param>
    ''' <param name="pSSOVariable">SSO Variable.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Private Function IsSSOEnabled(ByRef pIsEnabled As Boolean, _
                                 ByRef pSSOVariable As String, ByRef pSSOCookie As String, _
                                 ByRef pSSORedirect As String, ByVal pDeviceTokenEntry() As String) As Long _
                                 Implements IAtPar_AuthServices.IsSSOEnabled

        log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.Init.ToString()
        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = Nothing
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _ssoEnabled As String = String.Empty
        Dim _ssoVariable As String = String.Empty
        Dim _ssoCookie As String = String.Empty
        Dim _ssoRedirect As String = String.Empty

        _ssoEnabled = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), EName(Of CONFIGFILE)(CONFIGFILE.SSO), SSO.SSO_ENABLED.ToString)
        If log.IsDebugEnabled Then log.Debug(methodBaseName & "  SSO_Enabled ..." & _
                       vbCrLf & _ssoEnabled)

        _ssoVariable = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), EName(Of CONFIGFILE)(CONFIGFILE.SSO), SSO.SSO_VARIABLE.ToString)
        If log.IsDebugEnabled Then log.Debug(methodBaseName & "  SSO_Variable..." & _
                       vbCrLf & _ssoVariable)
        _ssoCookie = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), EName(Of CONFIGFILE)(CONFIGFILE.SSO), SSO.SSO_COOKIE_NAME.ToString)
        If log.IsDebugEnabled Then log.Debug(methodBaseName & "  SSO_Cookie..." & _
                       vbCrLf & _ssoCookie)
        _ssoRedirect = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), EName(Of CONFIGFILE)(CONFIGFILE.SSO), SSO.SSO_LOGOUT_PAGE.ToString)
        If log.IsDebugEnabled Then log.Debug(methodBaseName & "  SSO_Redirect..." & _
                       vbCrLf & _ssoRedirect)

        If _ssoEnabled = "True" Then
            If log.IsDebugEnabled Then log.Debug(methodBaseName & "  SSO_Enabled ...true condition")
            pIsEnabled = True
            pSSOVariable = _ssoVariable
            pSSOCookie = _ssoCookie
            pSSORedirect = _ssoRedirect
        Else
            If log.IsDebugEnabled Then log.Debug(methodBaseName & "  SSO_Enabled ...false condition")
            pIsEnabled = False
            pSSOVariable = String.Empty
        End If

        IsSSOEnabled = ATPAR_OK

    End Function

    'SM-4070 06/13/2008 SSO
    ''' <summary>
    ''' To check whether the login user ID is valid or not.
    ''' </summary>
    ''' <param name="pUserId">UserId of the logged in user.</param>
    ''' <param name="pIsValidUser">Valid user check value.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Public Function IsValidUser(ByVal pUserId As String, _
                                ByRef pIsValidUser As Boolean, _
                                ByVal pDeviceTokenEntry() As String) As Long _
                                Implements IAtPar_AuthServices.IsValidUser

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserId
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim intCnt As Integer = 0
        Dim _strSQL As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            _strSQL = "SELECT COUNT(USER_ID) " & _
                      " FROM MT_ATPAR_USER " & _
                      " WHERE UPPER(USER_ID) = Upper ('" & pUserId & "')"


            If log.IsInfoEnabled Then log.Info(methodBaseName & " Checking for atpar native user with the following sql..." & _
               vbCrLf & _strSQL)
            Try

                intCnt = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                            _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try

            If intCnt = 0 Then
                pIsValidUser = False
            Else
                pIsValidUser = True
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & ex.ToString)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try

        Return ATPAR_OK

    End Function

    'SM-0004757
    ''' <summary>
    ''' To update the newly changed password.
    ''' </summary>
    ''' <param name="uname">Username of the logged in user.</param>
    ''' <param name="oldPwd">Old password value.</param>
    ''' <param name="newPwd">New password value.</param>
    ''' <param name="hintQ">Hint question value.</param>
    ''' <param name="hintA">Hint answer value.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Public Function HashUpdatePassword(ByVal uname As String, ByVal oldPwd As String, ByVal newPwd As String, ByVal hintQ As String, ByVal hintA As String, ByVal pDeviceTokenEntry() As String) As Long _
       Implements IAtPar_AuthServices.HashUpdatePassword

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = uname
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

        Dim trans As SqlTransaction
        Dim strHashVal As String
        Dim oldhash As String
        Dim intCnt As Integer
        Dim strPwd As String
        Dim strProfileID As String
        Dim dsUserParams As DataSet

        Dim intRecCnt As Integer
        Dim rtnStr As String
        Dim _strSQL As String = String.Empty
        Dim newEncrypt As String = String.Empty
        Try
            'Dim _encServices As New AtParEncryptionServices
            'hintA = _encServices.EncryptString(hintA, AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase)
            rtnStr = UpdatePassword(pDeviceTokenEntry, uname, newPwd, Now(), hintQ, hintA, oldPwd)
            If rtnStr <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Call Failed")
                HashUpdatePassword = rtnStr
                Exit Function
            End If

            HashUpdatePassword = ATPAR_OK
        Catch ex As Exception
            Throw New Exception(methodBaseName & " Failed", ex)
            Return E_SERVERERROR
        End Try

    End Function

    'SM-0004934
    ''' <summary>
    ''' To retrieve password based on UserID, Hint Question & Hint Answer.
    ''' </summary>
    ''' <param name="pUserID">Username of the logged in user.</param>
    ''' <param name="pHintQ">Hint question value.</param>
    ''' <param name="rethintQ">Hint question value.</param>
    ''' <param name="pHintA">Optional Hint answer value.</param>
    ''' <param name="pNewPwd">Optional New password value.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Public Function ForgotHashPassword(ByVal pDeviceTokenEntry() As String, ByVal pUserID As String, ByVal pHintQ As String, ByRef rethintQ As String, _
                                       Optional ByVal pHintA As String = "", Optional ByVal pNewPwd As String = "") As Long _
                                       Implements IAtPar_AuthServices.ForgotHashPassword

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim rtnStr As String
        Dim rtnVal As String
        Dim xmlDoc As XmlDocument
        Dim xmlRoot As XmlNode
        Dim xmlItem As XmlNode
        Dim _Statuscode As Long
        Dim pOutXml As String = String.Empty

        Try
            CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try
            'Dim _encServices As New AtParEncryptionServices
            'pHintA = _encServices.EncryptString(pHintA, AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase)
            If log.IsDebugEnabled Then log.Debug(pHintA)
            If log.IsDebugEnabled Then log.Debug(pNewPwd)
            _Statuscode = ForgotPwd(pDeviceTokenEntry, pUserID, pHintQ, pOutXml, pHintA, pNewPwd)
            If log.IsDebugEnabled Then log.Debug(pOutXml)
            If _Statuscode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & "Call Failed")
                ForgotHashPassword = _Statuscode
                Exit Function
            End If
            If Not String.IsNullOrEmpty(pOutXml) Then
                Dim intXmlNodes As Integer
                Dim xmlItemChild As XmlNode
                xmlDoc = New XmlDocument
                xmlDoc.LoadXml(pOutXml)
                xmlRoot = xmlDoc.DocumentElement()
                For intXmlNodes = 0 To xmlRoot.ChildNodes.Count - 1
                    xmlItem = xmlRoot.ChildNodes.Item(intXmlNodes)
                    If xmlItem.Name = "STATUS_CODE" Then
                        _Statuscode = xmlItem.InnerText
                        If _Statuscode <> ATPAR_OK Then
                            If log.IsWarnEnabled Then log.Error(methodBaseName & " useraccount disabled  :")
                            ForgotHashPassword = ATPAR_E_PASSWORDUPDATIONFAILED
                            Exit Function
                        End If
                    ElseIf xmlItem.Name = "HINTQ" Then
                        rtnVal = xmlItem.InnerText
                        rethintQ = rtnVal
                        ForgotHashPassword = ATPAR_OK
                        Exit Function
                    End If
                Next
            End If
        Catch ex As Exception
            Throw New Exception(methodBaseName & " Failed", ex)
            Return E_SERVERERROR
        End Try

    End Function

    'SM-0004934
    ''' <summary>
    ''' To retrieve password based on UserID, Hint Question & Hint Answer.
    ''' </summary>
    ''' <param name="pUserID">Username of the logged in user.</param>
    ''' <param name="pHintQ">Hint question value.</param>
    ''' <param name="pOutXml">Out XML value.</param>
    ''' <param name="pHintA">Optional Hint answer value.</param>
    ''' <param name="pNewPwd">Optional New password value.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Private Function ForgotPwd(ByVal pDeviceTokenEntry() As String, ByVal pUserID As String, ByVal pHintQ As String, ByRef pOutXml As String, _
                         Optional ByVal pHintA As String = "", Optional ByVal pNewPwd As String = "") As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pUserID
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim pds As DataSet
        Dim xmlBunit As String = String.Empty
        Dim strXml As String = String.Empty
        Dim intCntExits As Integer
        Dim userExist As Boolean = False
        Dim _Statuscode As Long


        Dim rtnStr As String
        Dim xmlDoc As XmlDocument
        Dim xmlRoot As XmlNode
        Dim xmlItem As XmlNode

        Try

            If pUserID.Length = 0 Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Required parameters missing, aborting token generation")
                ForgotPwd = E_INVALIDPARAMETER
                Exit Function
            End If
            'checking user existence

            _strSQL = "SELECT A.USER_ID,A.PASSHASH, B.ACCOUNT_DISABLED,A.HINT_QUESTION,A.LDAP_USER, " & _
                      " A.HINT_ANSWER FROM MT_ATPAR_USER A INNER JOIN MT_ATPAR_USER_ACL B ON A.USER_ID = B.USER_ID WHERE " & _
                       "(A.USER_ID = '" & UCase(pUserID) & "')"

            Try
                If log.IsInfoEnabled Then log.Info(methodBaseName & " checking for user with the following sql..." & _
                            vbCrLf & _strSQL)
                pds = m_LocalDB.ExecuteDataSet(CommandType.Text, _strSQL)
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & sqlex.tostring & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try

            intCntExits = pds.Tables(0).Rows.Count
            If log.IsDebugEnabled Then log.Debug(intCntExits)
            For intCntExits = 0 To pds.Tables(0).Rows.Count - 1
                If Not String.IsNullOrEmpty(Trim(pds.Tables(0).Rows(intCntExits).Item("LDAP_USER").ToString())) And (pds.Tables(0).Rows(intCntExits).Item("LDAP_USER").ToString() = "Y") Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Password can not be changed for LDAP User :")
                    ForgotPwd = ATPAR_E_LDAPUSERPWDCANNOTEXIST
                    Exit Function
                Else
                    If String.IsNullOrEmpty(Trim(pds.Tables(0).Rows(intCntExits).Item("PASSHASH").ToString())) Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " Password donot Exist :")
                        ForgotPwd = E_PWDDONOTEXIST
                        Exit Function
                    End If
                    If String.IsNullOrEmpty(pds.Tables(0).Rows(intCntExits).Item("HINT_QUESTION").ToString()) Then
                        pHintQ = String.Empty
                    Else
                        pHintQ = pds.Tables(0).Rows(intCntExits).Item("HINT_QUESTION").ToString()
                    End If
                    If String.IsNullOrEmpty(Trim(pHintQ)) Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " HintQuestion donot Exist :")
                        ForgotPwd = E_HINTQNOTEXIST
                        Exit Function
                    End If
                    strXml = "<ROOT><HINTQ>" & substituteString(pHintQ) & "</HINTQ></ROOT>"
                    pOutXml = strXml
                    ForgotPwd = ATPAR_OK
                    If log.IsDebugEnabled Then log.Debug("strxml: " & strXml)
                    If pHintA <> " " And pNewPwd <> " " Then
                        If Trim(pHintA) <> Trim(pds.Tables(0).Rows(intCntExits).Item("HINT_ANSWER").ToString()) Then
                            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Hint Answer does not matched :")
                            ForgotPwd = ATPAR_HINTANOTMATCHED
                            Exit Function
                        Else
                            rtnStr = UpdatePassword(pDeviceTokenEntry, pUserID, pNewPwd, Now(), pHintQ, pHintA)
                            If log.IsDebugEnabled Then log.Debug("Update Password in ForGot: " & rtnStr)
                            If rtnStr <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Call Failed")
                                ForgotPwd = rtnStr
                                Exit Function
                            End If
                        End If
                    End If
                    If CBool(pds.Tables(0).Rows(intCntExits).Item("ACCOUNT_DISABLED")) Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " useraccount disabled  :")
                        ForgotPwd = E_ACCOUNTDISABLED
                        Exit Function
                    End If
                End If
            Next
            If intCntExits = 0 Then
                ForgotPwd = E_USERDONOTEXIST
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " user does not Exist :")
                Exit Function
            End If

            If pHintA <> " " And pNewPwd <> " " Then
                ForgotPwd = ATPAR_OK
            End If
        Catch ex As Exception
            Throw New Exception(methodBaseName & " Failed", ex)
            Return E_SERVERERROR
        End Try
    End Function

    ''' <summary>
    ''' To update the newly changed password.
    ''' </summary>
    ''' <param name="uname">Username of the logged in user.</param>
    ''' <param name="newPwd">New password value.</param>
    ''' <param name="datetime">Date Time value.</param>
    ''' <param name="hintQ">Optional Hint question value.</param>
    ''' <param name="hintA">Optional Hint answer value.</param>
    ''' <param name="oldPwd">Optional Old password value.</param>
    ''' <param name="deviceId">Optional Device ID value.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Private Function UpdatePassword(ByVal pDeviceTokenEntry() As String, ByVal uname As String, ByVal newPwd As String, ByVal datetime As String, Optional ByVal hintQ As String = "", Optional ByVal hintA As String = "", Optional ByVal oldPwd As String = "", Optional ByVal deviceId As String = "") As Long
        ' TODO: how come NO transactions!!!!!
        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = uname
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim trans As SqlTransaction
        Dim _StatusCode As Long
        Dim resFlag As Boolean
        Dim updatePwd As Boolean
        Dim newPassword As String
        Dim _strSQL As String = String.Empty
        Dim rc As Integer
        Dim pStrRetVal As String
        Dim dsSecParams As DataSet
        updatePwd = False
        resFlag = False
        Dim hashedNewPwd As String
        Try
            Dim encServices As New AtParEncryptionServices
            'hintA = encServices.DecryptString(hintA, AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase)

            If uname.Length = 0 Or datetime.Length = 0 Then
                _StatusCode = E_INVALIDPARAMETER
                UpdatePassword = E_INVALIDPARAMETER
                Exit Function
            End If

            _strSQL = "SELECT PASSHASH FROM MT_ATPAR_USER WHERE USER_ID='" & uname & "'"
            Try
                If log.IsInfoEnabled Then log.Info(methodBaseName & " selecting passhash with the following sql..." & _
                vbCrLf & _strSQL)
                pStrRetVal = m_LocalDB.ExecuteScalar(CommandType.Text, _strSQL)
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try

            If Not String.IsNullOrEmpty(deviceId) Then
                If CStr(pStrRetVal <> CStr(oldPwd)) Then
                    _StatusCode = ATPAR_E_PASSWORDNOTMATCHED
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Update password ")
                    Return ATPAR_E_PASSWORDNOTMATCHED
                    Exit Function
                End If
            Else
                If Not String.IsNullOrEmpty(oldPwd) Then
                    If CStr(pStrRetVal <> CStr(oldPwd)) Then
                        _StatusCode = ATPAR_E_PASSWORDNOTMATCHED
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Update password ")
                        Return ATPAR_E_PASSWORDNOTMATCHED
                        Exit Function
                    End If
                End If
            End If
            newPassword = encServices.DecryptString(newPwd, AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase)
            _StatusCode = IsValidPasswd(newPassword, pDeviceTokenEntry)
            If _StatusCode = ATPAR_OK Then
                hashedNewPwd = CSHA256.ComputeHash(CStr(newPassword & uname))
                Try
                    objUserManagement = New AtPar_UserManagement
                    _StatusCode = objUserManagement.GetSecurityParams(dsSecParams, pDeviceTokenEntry)
                Catch ex As Exception
                    If log.IsWarnEnabled Then log.Warn(" AtPar Usermanagement Object Create Failed :" & ex.ToString)
                Finally
                    If Not objUserManagement Is Nothing Then
                        objUserManagement.Dispose()
                        objUserManagement = Nothing
                    End If
                End Try
                If dsSecParams.Tables(0).Rows(0).Item("CHECK_PASSWD_HISTORY").ToString = "Y" Then
                    _StatusCode = ChkPasswdHistory(uname, hashedNewPwd, resFlag)
                    If _StatusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Update password ")
                        Return E_SERVERERROR
                        Exit Function
                    Else
                        If resFlag = True Then
                            updatePwd = True
                        Else
                            _StatusCode = ATPAR_E_PASSWORDEXISTS
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Update password ")
                            Return ATPAR_E_PASSWORDEXISTS
                            Exit Function
                        End If
                    End If
                Else

                    updatePwd = True
                End If
                If updatePwd Then
                    _strSQL = "UPDATE MT_ATPAR_USER SET PASSHASH = '" & hashedNewPwd & "'"
                    If hintQ <> " " And hintA <> "" Then
                        _strSQL = _strSQL & " , HINT_QUESTION = '" & hintQ.Replace("'", "''") & "',HINT_ANSWER = '" & hintA & " ' "
                    End If
                    _strSQL = _strSQL & " WHERE USER_ID='" & uname & "'"

                    Dim i As Integer
                    Try
                        If log.IsInfoEnabled Then log.Info(methodBaseName & " updating passhash with the following sql... " & _
                                vbCrLf & _strSQL)
                        i = m_LocalDB.ExecuteNonQuery(CommandType.Text, _strSQL)
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                         _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                         _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                        Return E_SERVERERROR
                    End Try

                    If i < 1 Then
                        _StatusCode = ATPAR_E_LOCALDBUPDATEFAIL
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Update password ")
                        Return E_SERVERERROR
                        Exit Function
                    End If
                    _strSQL = "UPDATE MT_ATPAR_USER_ACL SET PASSWD_UPDATE_DATE = '" & Now & "' , PASSWD_RESET_REQUIRED = 'N'," & _
                                    " PASSWD_EXPT_DATE = '" & Now.AddDays(CDbl(dsSecParams.Tables(0).Rows(0).Item("PASSWD_EXP_PERIOD"))) & "' WHERE USER_ID='" & uname & "'"
                    Try

                        If log.IsInfoEnabled Then log.Info(methodBaseName & " updating user_acl with the following sql... " & _
                                vbCrLf & _strSQL)
                        i = m_LocalDB.ExecuteNonQuery(CommandType.Text, _strSQL)
                    Catch sqlex As SqlException
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                         _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
                        Return ATPAR_E_LOCALDBSELECTFAIL
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                         _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                        Return E_SERVERERROR
                    End Try

                    If i < 1 Then
                        _StatusCode = ATPAR_E_LOCALDBUPDATEFAIL
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Update password ")
                        Return E_SERVERERROR
                        Exit Function
                    End If
                    If dsSecParams.Tables(0).Rows(0).Item("MAINTAIN_PASSWD_HISTORY").ToString = "Y" Then
                        'Inserting details into MT_ATPAR_PASSWD_HISTORY
                        _strSQL = "INSERT INTO MT_ATPAR_PASSWD_HISTORY(USER_ID,OLD_PASSHASH,UPDATE_DATE) VALUES(" & _
                                  "'" & uname & "','" & hashedNewPwd & "','" & Now & "')"
                        Try

                            If log.IsInfoEnabled Then log.Info(methodBaseName & " inserting password history with the following sql..." & _
                                        vbCrLf & _strSQL)
                            i = m_LocalDB.ExecuteNonQuery(CommandType.Text, _strSQL)
                        Catch sqlex As SqlException
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                             _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
                            Return ATPAR_E_LOCALDBSELECTFAIL
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                             _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                            Return E_SERVERERROR
                        End Try
                        If i < 1 Then
                            _StatusCode = ATPAR_E_LOCALDBINSERTFAIL
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Update password ")
                            Return E_SERVERERROR
                            Exit Function
                        End If
                    End If
                End If
            Else
                UpdatePassword = _StatusCode
                Exit Function
            End If
            UpdatePassword = ATPAR_OK
        Catch ex As Exception
            Throw New Exception(methodBaseName & " Failed", ex)
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' To check Password history.
    ''' </summary>
    ''' <param name="userId">User Id of the logged in user.</param>
    ''' <param name="Passhash">PassHash collection.</param>
    ''' <param name="resFlag">Flag value.</param>
    ''' <returns>ATPAR_OK on success, Error Codes on Error</returns>
    Private Function ChkPasswdHistory(ByVal userId As String, ByVal Passhash As Object, ByRef resFlag As Boolean) As Long
        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = userId

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _StatusCode As Long
        Dim _strSQL As String = String.Empty
        Dim dsPwd As DataSet
        Dim intCntExists As Integer
        Try
            _strSQL = "SELECT OLD_PASSHASH  FROM MT_ATPAR_PASSWD_HISTORY WHERE USER_ID='" & userId & "'"
            Try
                If log.IsInfoEnabled Then log.Info(methodBaseName & " selecting old password with the following sql..." & vbCrLf & _strSQL)
                dsPwd = m_LocalDB.ExecuteDataSet(CommandType.Text, _strSQL)
            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & sqlex.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                           _strSQL & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try
            For intCntExists = 0 To dsPwd.Tables(0).Rows.Count - 1
                If StrComp(dsPwd.Tables(0).Rows(intCntExists).Item("OLD_PASSHASH").ToString, Passhash) = 0 Then
                    resFlag = False
                    ChkPasswdHistory = ATPAR_OK
                    Exit Function
                End If
            Next
            resFlag = True
            ChkPasswdHistory = ATPAR_OK
        Catch ex As Exception
            Throw New Exception(methodBaseName & " Failed", ex)
            Return E_SERVERERROR
        End Try
    End Function

    ''' <summary>
    ''' To verify the Password entered.
    ''' </summary>
    ''' <param name="pwd">Password value.</param>
    ''' <returns>True on success, False on Error</returns>
    Private Function IsValidPasswd(ByVal pwd As Object, ByVal pDeviceTokenEntry() As String) As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim i As Integer
        Dim ichar
        Dim dsSecParams As DataSet
        Dim _StatusCode As Long
        Dim strChars As String = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        Dim strNumbers As String = "0123456789"
        Dim strSplChars As String = "@#$%&!"
        Dim strSpace As String = " "
        Dim strSymbols As String = "<>"

        Dim ch As String
        Dim strCtrlText As String
        Dim blnPwdChars As Boolean = False
        Dim blnPwdNum As Boolean = False
        Dim blnPwdSplChars As Boolean = False
        Try
            objUserManagement = New AtPar_UserManagement
            _StatusCode = objUserManagement.GetSecurityParams(dsSecParams, pDeviceTokenEntry)
        Catch ex As Exception
            If log.IsWarnEnabled Then log.Warn(methodBaseName & "AtPar Usermanagement Object Create Failed :" & ex.ToString)
        Finally
            If Not objUserManagement Is Nothing Then
                objUserManagement.Dispose()
                objUserManagement = Nothing
            End If
        End Try

        If (Len(pwd) < dsSecParams.Tables(0).Rows(0).Item("PASSWD_MIN_LENGTH") Or Len(pwd) > dsSecParams.Tables(0).Rows(0).Item("PASSWD_MAX_LENGTH")) Then
            IsValidPasswd = ATPAR_E_PASSWORDVALIDITY
            Exit Function
        Else
            strCtrlText = Trim(pwd)
            For intCnt As Integer = 0 To strCtrlText.Length - 1
                ch = strCtrlText(intCnt)
                If strSpace.IndexOf(ch) <> -1 Then
                    IsValidPasswd = ATPAR_E_PASSWORDVALIDITY
                    Exit Function
                End If
            Next

            'To Check Characters
            strCtrlText = Trim(pwd)
            For intCnt As Integer = 0 To strCtrlText.Length - 1
                ch = strCtrlText(intCnt)
                If strChars.IndexOf(ch) <> -1 Then
                    blnPwdChars = True
                    Exit For
                End If
            Next

            'To Check Numbers
            strCtrlText = Trim(pwd)
            For intCnt As Integer = 0 To strCtrlText.Length - 1
                ch = strCtrlText(intCnt)
                If strNumbers.IndexOf(ch) <> -1 Then
                    blnPwdNum = True
                    Exit For
                End If
            Next

            'To Check Spl Characters
            strCtrlText = Trim(pwd)
            For intCnt As Integer = 0 To strCtrlText.Length - 1
                ch = strCtrlText(intCnt)
                If strSplChars.IndexOf(ch) <> -1 Then
                    blnPwdSplChars = True
                    Exit For
                End If
            Next


            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": " & dsSecParams.Tables(0).Rows(0).Item("PASSWD_COMPLEXITY").ToString)


            Select Case dsSecParams.Tables(0).Rows(0).Item("PASSWD_COMPLEXITY").ToString
                Case "1"
                    If Not blnPwdChars Or blnPwdNum Or blnPwdSplChars Then
                        IsValidPasswd = FAILED_PASSWD_CMPX_1
                        Exit Function
                    End If
                Case "2"
                    If Not blnPwdChars Or Not blnPwdNum Or blnPwdSplChars Then
                        IsValidPasswd = FAILED_PASSWD_CMPX_2
                        Exit Function
                    End If
                Case "3"
                    If Not blnPwdChars Or Not blnPwdNum Or Not blnPwdSplChars Then
                        IsValidPasswd = FAILED_PASSWD_CMPX_3
                        Exit Function
                    End If
            End Select

        End If
        IsValidPasswd = ATPAR_OK
    End Function

    Public Function GetSystemIDs(ByRef pDsSystemIDs As DataSet, ByVal pSystemID As String) As Long _
                                 Implements IAtPar_AuthServices.GetSystemIDs

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _Statuscode As Long

        Try
            CreateMasterDB()
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create MasterDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Dim _sql_param_systemid As SqlParameter = New SqlParameter("@SystemId", SqlDbType.NVarChar, _
                                                                                          ATPAR_DBSIZE_SYSTEM_ID)
        _sql_param_systemid.Value = pSystemID

        If log.IsInfoEnabled Then
            log.Info("Calling usp_GetSystemDetails with the following syntax..")
            Dim _strSQL As String = "exec usp_GetSystemDetails " & _
                                                         "'" & _sql_param_systemid.Value & "'"
            log.Info(_strSQL)
        End If

        Try
            Dim _cmd As System.Data.Common.DbCommand = Nothing
            _cmd = New SqlCommand
            _cmd.Connection = m_MasterDB.CreateConnection
            _cmd.CommandType = CommandType.StoredProcedure
            _cmd.CommandText = "usp_GetSystemDetails"
            _cmd.Parameters.Add(_sql_param_systemid)

            pDsSystemIDs = m_MasterDB.ExecuteDataSet(_cmd)

            If pDsSystemIDs.Tables.Count > 0 Then
                If pDsSystemIDs.Tables(0).Rows.Count > 0 Then
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Total Number of Systems are :" & pDsSystemIDs.Tables(0).Rows.Count & ":")
                    Return ATPAR_OK
                Else
                    Return E_NORECORDFOUND
                End If
            Else
                Return E_NORECORDFOUND
            End If

            If _Statuscode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & "failed to get Systems :" & _Statuscode)
                Return _Statuscode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to get Systems with the exception : " & ex.ToString)
            Return E_SERVERERROR
        End Try

    End Function

    Public Function AddUser(ByVal arrlstUsers As System.Collections.ArrayList, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.AddUser

    End Function

    Public Function CheckProfileAppACL(ByVal pUserID As String, ByVal pProfileID As String, ByVal pAccessType As Integer, ByRef pResult As Boolean, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.CheckProfileAppACL

    End Function

    Public Function CheckUser(ByVal pUserID As String, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.CheckUser

    End Function

    Public Function GetClientAccessCnt(ByVal pUserID As String, ByVal pProfileID As String, ByRef pCnt As Integer, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetClientAccessCnt

    End Function
    'NB-0005685
    Public Function GetLdapUsers(ByVal pUserID As String, ByRef pDSLdapUsers As System.Data.DataSet, ByVal pStrSearchFilter As String, ByVal pStrEntryLimit As String, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetLdapUsers

    End Function

    Public Function GetMyPreferences(ByVal pStrPreference As String, ByVal pStrUID As String, ByRef pStrRetVal As String, ByVal pDeviceTokenEntry() As String) As Long Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetMyPreferences

    End Function

    Public Function GetOrgBUnits(ByVal pUserID As String, ByVal pOrggrpID As String, ByRef pDsOrgBUnits As System.Data.DataSet, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetOrgBUnits

    End Function

    Public Function GetSecurityParams(ByRef pDSSecurityParams As System.Data.DataSet, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetSecurityParams

    End Function

    Public Function GetServerAccessCnt(ByVal pUserID As String, ByVal pProfileID As String, ByRef pCnt As Integer, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetServerAccessCnt

    End Function

    Public Function GetUserAppRoleACL(ByRef dsUser As System.Data.DataSet, Optional ByVal userId As String = "", Optional ByVal roleId As String = "", Optional ByVal appId As Long = 0) As Long Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetUserAppRoleACL

    End Function

    Public Function GetUserDetails(ByVal pUserID As String, ByRef pDSUserDetails As System.Data.DataSet, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetUserDetails

    End Function

    Public Function GetUsers(ByVal pUserID As String, ByRef pDSUsers As System.Data.DataSet, ByVal pOrgId As String, ByVal pProfileId As String, ByVal pSearchId As String, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetUsers

    End Function

    Public Function GetManageUsers(ByVal pUserID As String, ByRef pDSUsers As System.Data.DataSet, ByVal pOrgId As String, ByVal pProfileId As String, ByVal pSearchId As String, ByVal pDeviceTokenEntry() As String) As Long Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetManageUsers

    End Function

    Public Function GetUserStatus(ByVal pSvrUserID As String, ByVal pUserId As String, ByVal pFirstName As String, ByVal pLastName As String, ByVal pStatus As String, ByRef pdsUserStatus As System.Data.DataSet, ByVal pOrgId As String, ByVal pProfileId As String, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.GetUserStatus

    End Function
    'NB-0005685
    Public Function SaveLdapUsers(ByVal pUserID As String, ByVal pSessionTime As String, ByVal pIdleTime As String, ByVal pOrgGrpId As String, ByVal pProfileID As String, ByVal pDsLdapUser As System.Data.DataSet, ByVal pUserDtlsArr As ArrayList, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.SaveLdapUsers

    End Function

    Public Function UpdateSecurityParams(ByRef pDSSecurityParams As System.Data.DataSet, ByVal pDeviceTokenEntry() As String) As Long Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.UpdateSecurityParams

    End Function

    Public Function UpdateUser(ByVal arrlstUsers As System.Collections.ArrayList, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.UpdateUser

    End Function

    Public Function UpdateUserStatus(ByVal pSvrUserID As String, ByVal pUserId As String, ByVal pStatus As String, ByVal pDeviceTokenEntry() As String) As Integer Implements AtPar_BusinessRules_RemotingProxy.IAtPar_UserManagement.UpdateUserStatus

    End Function
    Public Function IsMenuAssigned(ByVal pUserID As String, ByVal pProfileID As String, ByVal pStrChkMenuName As String, _
        ByRef pIntCnt As Integer, ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.IsMenuAssigned

    End Function
	'DK-0005948
    Public Function GetMenus(ByVal pAppId As String, ByVal pProfileId As String, ByRef pDSMenus As DataSet, ByVal pDeviceTokenEntry() As String) As Long _
                                                       Implements IAtPar_UserManagement.GetMenus

    End Function
    Public Function GetAppName(ByVal pAppId As String, ByRef pAppName As String, ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.GetAppName

    End Function
    Public Function GetAppRoleIDs(ByVal pUserId As String, ByRef pDSAppRoleIds As DataSet, ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.GetAppRoleIDs

    End Function
    Public Function GetUser(ByVal pUserId As String, ByRef pDSUserParam As DataSet, ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.GetUser

    End Function

    Public Function GetUserOrgGrpID(ByVal pUserId As String, ByRef pOrgGroupId As String, ByVal pDeviceTokenEntry() As String) As Long Implements IAtPar_UserManagement.GetUserOrgGrpID

    End Function

    '''<summary>
    ''' Checks whether HHT's default System is matched with the Middle tier
    '''</summary>
    '''<param name="pSystemID"></param>
    '''<return></return>
    Private Function ValidateSystemAndDevice(ByVal pSystemID As String, ByVal pDeviceID As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty

        ' check whether the system matches with the middle tier
        Try
            CreateMasterDB()
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create MasterDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Dim _sql_param_systemid As SqlParameter = New SqlParameter("@SystemId", SqlDbType.NVarChar, _
                                                                  ATPAR_DBSIZE_SYSTEM_ID)
        _sql_param_systemid.Value = pSystemID

        If log.IsInfoEnabled Then
            log.Info(methodBaseName & "Calling ATPAR_SP_VALIDATESYSTEM with the following syntax..")
            _strSQL = "exec ATPAR_SP_VALIDATESYSTEM " & _
                                         "'" & _sql_param_systemid.Value & "'"
            log.Info(_strSQL)
        End If

        Try
            Dim _cmd As System.Data.Common.DbCommand = Nothing
            _cmd = New SqlCommand
            _cmd.Connection = m_MasterDB.CreateConnection
            _cmd.CommandType = CommandType.StoredProcedure
            _cmd.CommandText = "ATPAR_SP_VALIDATESYSTEM"
            _cmd.Parameters.Add(_sql_param_systemid)

            Dim cnt As Integer = m_MasterDB.ExecuteScalar(_cmd)
            If cnt = 0 Then
                Return ATPAR_E_SYSTEMMISMATCH
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to check Systemid with the exception : " & ex.ToString)
            Return E_SERVERERROR
        End Try

        'check whether the "Allow registered devices only " parameter is checked or not from the Security configuration
        Try
            If log.IsDebugEnabled Then log.Debug(methodBaseName & "ALLOW REG DEVICE SYSTEM ID IS : " & pSystemID)
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        _strSQL = "SELECT CASE WHEN ALLOW_REG_DEVICES='Y' THEN 1 ELSE 0 END FROM MT_ATPAR_SECURITY_PARAMS"

        If log.IsInfoEnabled Then
            log.Info(methodBaseName & " : Query to check whether the security parameter is checked or not in the middle tier : " & _strSQL)
        End If

        Try
            Dim _flgAllowRegDevices As Integer = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL)).ToString()
            If _flgAllowRegDevices = 0 Then
                Return ATPAR_OK
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to check the allow device register parameter with the exception : " & ex.ToString)
            Return E_SERVERERROR
        End Try

        ' check whether the device is registered in the system devices table of master DB
        Dim _sql_param_sysid As SqlParameter = New SqlParameter("@SystemId", SqlDbType.NVarChar, _
                                                                                          ATPAR_DBSIZE_SYSTEM_ID)
        _sql_param_sysid.Value = pSystemID

        Dim _sql_param_deviceid As SqlParameter = New SqlParameter("@DeviceId", SqlDbType.NVarChar, _
                                                                                          ATPAR_DBSIZE_DEVICE_ID)
        _sql_param_deviceid.Value = pDeviceID

        If log.IsInfoEnabled Then
            log.Info(methodBaseName & "Calling ATPAR_SP_VALIDATEDEVICE with the following syntax..")
            _strSQL = "exec ATPAR_SP_VALIDATEDEVICE " & _
                                         "'" & _sql_param_sysid.Value & "'" & ", '" & _sql_param_deviceid.Value & "'"
            log.Info(_strSQL)
        End If
        Try
            Dim _cmd As System.Data.Common.DbCommand = Nothing
            _cmd = New SqlCommand
            _cmd.Connection = m_MasterDB.CreateConnection
            _cmd.CommandType = CommandType.StoredProcedure
            _cmd.CommandText = "ATPAR_SP_VALIDATEDEVICE"
            _cmd.Parameters.Add(_sql_param_sysid)
            _cmd.Parameters.Add(_sql_param_deviceid)

            Dim cnt As Integer = m_MasterDB.ExecuteScalar(_cmd)
            If cnt = 0 Then
                Return E_INVALIDDEVICE
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to check for device registered with the exception : " & ex.ToString)
            Return E_SERVERERROR
        End Try
    End Function

    Public Function GetLdapPwdExpiryDetails(ByVal pUserID As String, ByVal pLdapPwd As String, ByRef pNotificationDays As Integer, _
                                       ByRef pExpiryDate As String, ByRef pExpirationDays As Integer, ByRef pRetMsg As String, _
                                       ByVal pDeviceTokenEntry() As String) As Long _
                                       Implements IAtPar_AuthServices.GetLdapPwdExpiryDetails

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _StatusCode As Long
        Dim ExpiryDays As Integer
        Dim LdapExpTimeSpan As TimeSpan = TimeSpan.MaxValue
        Dim dsSecParams As DataSet
        Try

            Try
                objUserManagement = New AtPar_UserManagement
                _StatusCode = objUserManagement.GetSecurityParams(dsSecParams, pDeviceTokenEntry)
            Catch ex As Exception
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed while getting LDAP password expiry alert mesage:" & ex.ToString)
            Finally
                If Not objUserManagement Is Nothing Then
                    objUserManagement.Dispose()
                    objUserManagement = Nothing
                End If
            End Try

            'pNotificationDays = 14
            pNotificationDays = dsSecParams.Tables(0).Rows(0).Item("LDAP_PASS_EXP_ALTMSG")

            _StatusCode = WhenPwdExpires(pUserID, pLdapPwd, LdapExpTimeSpan, ExpiryDays, pDeviceTokenEntry)

            If _StatusCode = ATPAR_OK Then

                If LdapExpTimeSpan = TimeSpan.MaxValue Then
                    pRetMsg = "Password Never Expires"
                    pExpiryDate = ""
                    pExpirationDays = 0
                    GetLdapPwdExpiryDetails = ATPAR_LDAP_PWD_NEVER_EXPIRES
                ElseIf LdapExpTimeSpan = TimeSpan.MinValue Then
                    GetLdapPwdExpiryDetails = ATPAR_E_INVALIDPASSWORD
                Else
                    pExpiryDate = DateTime.Now.Add(LdapExpTimeSpan).ToString
                    pRetMsg = " Expires in " & LdapExpTimeSpan.Days
                    pExpirationDays = ExpiryDays
                    GetLdapPwdExpiryDetails = ATPAR_OK
                End If
            Else
                GetLdapPwdExpiryDetails = _StatusCode
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Get LDAP User Password Expiry Days ... " & _
                                              vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            GetLdapPwdExpiryDetails = E_SERVERERROR
        End Try

    End Function



    Public Function WhenPwdExpires(ByVal pUserID As String, ByVal pLdapPwd As String, ByRef LdapExpDays As TimeSpan, ByRef ExpiryDays As Integer, ByVal pDeviceTokenEntry() As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _StatusCode As Long
        Dim _strProtocol As String = String.Empty
        Dim _strServerName As String = String.Empty
        Dim _strBaseDn As String = String.Empty
        Dim _strLdapUserID As String = String.Empty
        Dim _strAuthType As String = String.Empty
        Dim _nAuthType As Integer
        Dim _strSearchScope As String = String.Empty
        Dim _strUserName As String = String.Empty
        Dim _strPassword As String = String.Empty
        Dim _strSearchFilter As String = String.Empty

        Dim _pwdAge As TimeSpan = TimeSpan.MinValue
        Try

            ' if theres a account status ruleset, parse it and get attribute/value
            _strAuthType = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.AUTHTYPE.ToString())
            _strProtocol = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.PROTOCOL.ToString())
            _strServerName = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.SERVERNAME.ToString())
            _strBaseDn = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.BASEDN.ToString())
            _strLdapUserID = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.USERID.ToString())
            _strSearchFilter = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.SEARCHFILTER.ToString())
            _strLdapUserID = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.USERID.ToString())
            _strSearchScope = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.SEARCHSCOPE.ToString())
            _strUserName = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.USERNAME.ToString())
            If Not String.IsNullOrEmpty(GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.PASSWORD.ToString())) Then
                _strPassword = Decrypt(GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemID), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.PASSWORD.ToString()))
                _strLdapUserID = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), CONFIGFILE.LDAPCONFIG.ToString(), LDAPCONFIG.USERID.ToString())
            End If


            'DK-0004490
            If (_strProtocol = "LDAP") Or (_strProtocol = "LDAPS") Then
                _strProtocol = "LDAP"
            End If

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


            Dim _strLdapConnectString As String = _strProtocol & "://" & _strServerName & IIf(_strBaseDn.Length > 0, "/", "") & _strBaseDn
            If log.IsDebugEnabled Then log.Debug(methodBaseName & "LDAP Connection String  : " & _strLdapConnectString)
            _domain = New DirectoryEntry(_strLdapConnectString, _strUserName, _strPassword, _nAuthType)
            Dim ds As New DirectorySearcher(_domain)
            ds.Filter = String.Format("(&(" & _strLdapUserID & "={0}))", pUserID)

            Dim sr As SearchResult = FindOne(ds)

            If sr IsNot Nothing Then
                Dim user As DirectoryEntry = sr.GetDirectoryEntry()
                Dim flags As Integer = CInt(user.Properties("userAccountControl").Value)
                If Convert.ToBoolean(flags And UF_DONT_EXPIRE_PASSWD) Then
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & " : LDAP Password set to Never Expires ")
                    'password never expires 
                    LdapExpDays = TimeSpan.MaxValue
                    Return ATPAR_LDAP_PWD_NEVER_EXPIRES
                End If

                'get when they last set their password 

                If user.Properties.Contains("pwdLastSet") Then
                    Dim pwdLastSet As DateTime = DateTime.FromFileTime(LongFromLargeInteger(user.Properties("pwdLastSet").Value))
                    If _domain.Properties.Contains("maxPwdAge") Then
                        Dim ldate As Long = LongFromLargeInteger(_domain.Properties("maxPwdAge")(0))
                        _pwdAge = TimeSpan.FromTicks(ldate)
                    Else
                        _pwdAge = TimeSpan.MaxValue
                        LdapExpDays = TimeSpan.MaxValue
                        Return ATPAR_LDAP_PWD_NEVER_EXPIRES
                    End If

                    Dim PLD As String = pwdLastSet.ToShortDateString()
                    Dim TOD As String = DateTime.Now.ToShortDateString()
                    Dim ND As Int32 = DateTime.Parse(TOD).Subtract(DateTime.Parse(PLD)).Days
                    Dim PwdAge As Int32 = Math.Abs(_pwdAge.Days)
                    ExpiryDays = (PwdAge - ND)

                    If pwdLastSet.Subtract(_pwdAge).CompareTo(DateTime.Now) > 0 Then
                        LdapExpDays = pwdLastSet.Subtract(_pwdAge).Subtract(DateTime.Now)
                    Else
                        'already expired 
                        LdapExpDays = TimeSpan.MinValue
                        Return ATPAR_OK
                    End If
                Else
                    LdapExpDays = TimeSpan.MaxValue
                    Return ATPAR_LDAP_PWD_NEVER_EXPIRES
                End If
            Else
                LdapExpDays = TimeSpan.MaxValue
                Return ATPAR_LDAP_PWD_NEVER_EXPIRES
            End If

            Return ATPAR_OK

        Catch ex As System.Runtime.InteropServices.COMException
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Unable to Calculate Password Expiry Days " & _
                                                                  ": " & ex.Message.ToString & vbCrLf)
            'If (ex.ErrorCode = "-2147023570") Then
            '    LdapExpDays = TimeSpan.MaxValue
            '    Return ATPAR_LDAP_PWD_NEVER_EXPIRES
            'ElseIf (ex.ErrorCode = "-2147016646") Then
            '    LdapExpDays = TimeSpan.MaxValue
            '    Return ATPAR_LDAP_PWD_NEVER_EXPIRES
            'End If

            LdapExpDays = TimeSpan.MaxValue
            Return ATPAR_LDAP_PWD_NEVER_EXPIRES

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Get Calculate Password Expiry Days ... " & _
                                                         vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try


    End Function

    Private Function LongFromLargeInteger(ByVal largeInteger As Object) As Long
        Dim type As System.Type = largeInteger.[GetType]()
        Dim highPart As Integer = CInt(type.InvokeMember("HighPart", BindingFlags.GetProperty, Nothing, largeInteger, Nothing))
        Dim lowPart As Integer = CInt(type.InvokeMember("LowPart", BindingFlags.GetProperty, Nothing, largeInteger, Nothing))

        Return CLng(highPart) << 32 Or CUInt(lowPart)
    End Function

    Private Function FindOne(ByVal searcher As DirectorySearcher) As SearchResult
        Dim sr As SearchResult = Nothing

        Dim src As SearchResultCollection = searcher.FindAll()

        If src.Count > 0 Then
            sr = src(0)
        End If
        src.Dispose()

        Return sr
    End Function
	
	
    Public Function ValidateClientVersion(ByVal pLoginType As String, ByVal pVersion As String, ByRef pServerClientVersion As String) As Long _
         Implements IAtPar_AuthServices.ValidateClientVersion

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _xmlDoc As New XmlDocument

        Try
            Dim strVersionXmlPath As String = AppDomain.CurrentDomain.BaseDirectory().Chars(0) & ":\Atpar\web\Version.xml"

            If System.IO.File.Exists(strVersionXmlPath) Then

                _xmlDoc.Load(strVersionXmlPath)

                Dim _xmlNodelist As XmlNodeList

                If pLoginType = ClientType.HHT.ToString() Then
                    _xmlNodelist = _xmlDoc.SelectNodes("/root/product_version/HHT")
                ElseIf pLoginType = ClientType.WEB.ToString() Then
                    _xmlNodelist = _xmlDoc.SelectNodes("/root/product_version/WEB")
                ElseIf pLoginType = ClientType.WIN32.ToString() Then
                    _xmlNodelist = _xmlDoc.SelectNodes("/root/product_version/Win32")
                ElseIf pLoginType = ClientType.AHHT.ToString() Then
                    _xmlNodelist = _xmlDoc.SelectNodes("/root/product_version/AHHT")
                ElseIf pLoginType = ClientType.IHHT.ToString() Then
                    _xmlNodelist = _xmlDoc.SelectNodes("/root/product_version/IHHT")
                ElseIf pLoginType = ClientType.WHHT.ToString() Then
                    _xmlNodelist = _xmlDoc.SelectNodes("/root/product_version/WHHT")
                End If

                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Version in Server :" & _xmlNodelist(0).InnerText)

                If (pVersion = _xmlNodelist(0).InnerText) Then
                    Return ATPAR_OK
                Else
                    pServerClientVersion = _xmlNodelist(0).InnerText
                    Return E_INVALIDCLIENT_VERSION
                End If

            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Exception is getting the version " & _
                                                                   ex.ToString & vbCrLf)
        End Try

    End Function

 
End Class

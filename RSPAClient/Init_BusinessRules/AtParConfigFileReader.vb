#Region "Imports"
Imports System.Xml
Imports System.Collections
Imports System.Collections.Generic
Imports System.Reflection
Imports System.Diagnostics
Imports log4net
Imports System.Data
Imports System.Data.Common
Imports System.Data.SqlClient
Imports Microsoft.Practices.EnterpriseLibrary.Data
Imports Microsoft.Practices.EnterpriseLibrary.Data.Sql
Imports Microsoft.Practices.EnterpriseLibrary.Common
Imports System.Net.NetworkInformation
#End Region

#Region "Bug Fix"

'NB-0006212 04/02/2009

#End Region

Public Class AtParConfigFileReader

#Region "[ Variable Declaration ]"
    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_DevTrans))
    Dim mSystems As New DataSet
    Dim mDrySystemConfiguration As New Dictionary(Of String, Dictionary(Of String, Dictionary(Of String, String)))
#End Region

#Region "[ Event Handlers ]"
    Public Sub New()
    End Sub
#End Region

#Region "[ Public Functions ]"

    ''' <summary>
    ''' To parse the Config file and create a Collection of values
    ''' </summary>
    ''' <param name="ConfigFile">Config File path</param>
    ''' <returns>Collection of values read from Conf.xml</returns>
    ''' <remarks></remarks>
    Public Function CacheConfigData(ByVal ConfigFile As String) As Collection

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        Dim config_collection As Collection

        Try
            config_collection = ReadConfig(ConfigFile)


            If Not config_collection Is Nothing Then
                Try
                    ' precache the high traffic config data
                    Dim coldata As New System.Collections.Generic.Dictionary(Of String, String)

                    coldata.Add(DBCONN_STRING.MASTER_DB.ToString, GetMasterDBConnectionString(config_collection))

                    ' TODO need to figure out how to get the name of the enum
                    config_collection.Add(coldata, "DBCONN_STRING")

                    'collogindata.Add(ERP_LOGIN_URL.LAWSONLOGANLOGINURL.ToString, GetLawsonLoganLoginUrl(config_collection))

                    'config_collection.Add(collogindata, "ERP_LOGIN_URL")
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to precache high traffic config data " & ex.ToString)
                    Return Nothing
                End Try
            Else
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to re-read config file ")
                Return Nothing
            End If

            Return config_collection

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to re-read config file " & ex.ToString)
            Return Nothing
        End Try

    End Function
#End Region

#Region "[ Read System Configuration Details ]"

#Region "[ Public Functions ]"
    ''' <summary>
    ''' 
    ''' </summary>
    ''' <param name="pConfData"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetSystemsConfigurationData(ByRef pSystemConfig As Dictionary(Of String, Dictionary(Of String, Dictionary(Of String, String))), ByVal pConfData As Collection) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            Dim _diSystemDetails As New Dictionary(Of String, String)
            Dim _statusCode As Long = -1

            _statusCode = GetSystems(mSystems)

            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Status Code Returned from GetSystems Method is :" & _statusCode & ":")
                Return _statusCode
            End If

            If Not IsNothing(mSystems) Then
                If mSystems.Tables.Count > 0 Then
                    For iRow As Integer = 0 To mSystems.Tables(0).Rows.Count - 1
                        Dim _connString As String = String.Empty
                        Dim _systemId As String = mSystems.Tables(0).Rows(iRow).Item("SYSTEM_ID")
                        Dim _statusId As Long = -1
                        Dim _drySystemDetails As New Dictionary(Of String, Dictionary(Of String, String))
                        Dim _drySystemConfig As New Dictionary(Of String, String)

                        Try

                            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Getting connection for System Id:" & _systemId & ":")

                            _statusId = GetSystemConnectionString(mSystems.Tables(0).Rows(iRow), _connString)

                            If _statusId <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Error while getting connection of System Id: " & _systemId & _
                                                                         " Status code returned is :" & _statusId)
                                Return _statusId
                            End If

                            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Successfully got connection for System Id:" & _systemId & ":")

                            _drySystemConfig.Add(CONFIGFILE.SYSTEMDBCONNECTION.ToString(), _connString)
                            _drySystemDetails.Add(CONFIGFILE.SYSTEMDBCONNECTION.ToString(), _drySystemConfig)

                            mDrySystemConfiguration.Add(_systemId, _drySystemDetails)

                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Error while getting connection of System Id: " & _systemId & ":" & ex.ToString())
                            Return E_SERVERERROR
                        End Try

                        Try
                            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Getting configuration data for System Id:" & _systemId & ":")

                            _statusId = GetSystemConfigurationData(_systemId, False)

                            If _statusId <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Error while reading system configuration data of System Id: " & _systemId & _
                                                                        " Status code returned is :" & _statusId)
                                Return _statusId
                            End If

                            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Successfully read configuration data for System Id:" & _systemId & ":")
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to read Systems Configuration Details :")
                            Return E_SERVERERROR
                        End Try
                    Next

                    pSystemConfig = mDrySystemConfiguration
                Else
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": No Systems Configuration Details Returned. Total Number of Tables Returned from GetSystems Method is :" & mSystems.Tables.Count & ":")
                    Return E_SERVERERROR
                End If
            Else
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": No Systems Configuration Details Returned. Data returned from GetSystems Method is Nothing:")
                Return E_SERVERERROR
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to read Systems Configuration Details :" & ex.ToString())
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' Gets all the Systems from Master Database
    ''' </summary>
    ''' <param name="pConfData"></param>
    ''' <param name="pDsSystems"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetSystems(ByRef pDsSystems As DataSet) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Try
            Dim _coldata As New System.Collections.Generic.Dictionary(Of String, String)
            Dim _coldata_MasterDB As New System.Collections.Generic.Dictionary(Of String, String)
            Dim _dbServerName As String = String.Empty
            Dim _dbConnectionString As String = String.Empty
            Dim _tmpArray() As String
            Dim _db As GenericDatabase = Nothing
            Dim _cmd As DbCommand = Nothing
            Dim _blnConnectionError As Boolean = False

            Dim _intCounter As Integer = 0
            Dim _intMasterDBTableCount As Integer = 0

            Dim _confData As Collection

            If Not IsNothing(AppDomain.CurrentDomain.GetData("AtParConfigData")) Then
                _confData = CType(AppDomain.CurrentDomain.GetData("AtParConfigData"), Collection)

                _coldata = CType(_confData.Item("DBCONN_STRING"), Dictionary(Of String, String))


                '// Reading @Par DB server name from configuration file.
                _coldata_MasterDB = CType(_confData.Item("MASTER_DB"), Dictionary(Of String, String))

                If Not IsNothing(_coldata_MasterDB) Then
                    If _coldata_MasterDB.Keys.Count > 0 Then

                        _dbServerName = _coldata_MasterDB.Item(EName(Of MASTER_DB)(MASTER_DB.SERVER))

                        If _dbServerName.Contains("\") Then
                            _tmpArray = _dbServerName.Split("\")
                            _dbServerName = _tmpArray(0)
                        End If


                    End If

                End If
              


                If Not IsNothing(_coldata) Then
                    If _coldata.Keys.Count > 0 Then
                        Try
                            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Getting all system details from Master Database :")

                            _dbConnectionString = _coldata.Item(DBCONN_STRING.MASTER_DB.ToString)


                            _db = New GenericDatabase(_dbConnectionString, System.Data.SqlClient.SqlClientFactory.Instance)

                            _cmd = New SqlCommand
                            _cmd.Connection = _db.CreateConnection
                            _cmd.CommandType = CommandType.StoredProcedure
                            _cmd.CommandText = "usp_GetSystemDetails"


                            '//---- When @Par application system reboots, Application service is
                            'starting prior to SQL server related services, to avoid this waitng
                            '20 seconds to start application service. ----//

                            Do

                                Try


                                    pDsSystems = _db.ExecuteDataSet(_cmd)

                                    If log.IsDebugEnabled Then log.Debug(methodBaseName & "pDsSystems.Tables.Count:" & pDsSystems.Tables.Count)

                                    '// Successfully read data from ATPAR_MASTER data base
                                    If pDsSystems.Tables.Count > 0 Then
                                        _blnConnectionError = False
                                        Exit Do
                                    End If

                                Catch sqlex As SqlException

                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Exception occurred while " & _
                                    " while connecting to DB server :" & GetSQLExceptionMessageString(sqlex).ToString & _
                                    "SQL Exception number is: " & sqlex.Number & " SQL Error Code is:" & sqlex.ErrorCode)


                                    '// SQL Exception number 18456 is for invalid credentials
                                    If sqlex.Number = 18456 Then
                                        _blnConnectionError = False
                                        WriteToEventLog("Failed to Authenticate the user. Either User Id " & _
                                        "or Password provided is wrong", "InitializeAtParSystem", EventLogEntryType.Error)
                                        Exit Do
                                    End If

                                    '// SQL Server services are stopped 
                                    If sqlex.Number = 2 Or sqlex.ErrorCode = -2146232060 Then
                                        _blnConnectionError = False
                                        WriteToEventLog("Server hosting the @Par data base is down", "InitializeAtParSystem", EventLogEntryType.Error)
                                        'Exit Do
                                    End If


                                End Try


                                If _intCounter = 100 Then
                                    _blnConnectionError = True
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " waited " & _intCounter & " seconds for DB server up: ")
                                    Exit Do
                                End If

                                _intCounter = _intCounter + 1

                                System.Threading.Thread.Sleep(5000)


                                _intMasterDBTableCount = pDsSystems.Tables.Count

                                '// wait until MasterDBTableCount > 0
                            Loop Until (_intMasterDBTableCount > 0)

                            If log.IsDebugEnabled Then log.Debug(methodBaseName & _
                                                        " Connection Error Occured " & _blnConnectionError)

                            If _blnConnectionError Then

                                Dim _pingClient As New Ping
                                Dim _status As IPStatus


                                Try

                                    '// Pinging @Par DB server to check its status
                                    _status = _pingClient.Send(_dbServerName).Status

                                    If log.IsDebugEnabled Then log.Debug(methodBaseName & "status " & _status)

                                    If _status = IPStatus.Success Then

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Status of the DB server is ..." & _
                                                                                   _status & ":")

                                        WriteToEventLog("An error has occurred while establishing connection to the server", "InitializeAtParSystem", EventLogEntryType.Error)


                                    Else

                                        '// @Par DB server down
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Server hosting the @Par data base is down " & _
                                            _status & ":")

                                        WriteToEventLog("Server hosting the @Par data base is down", "InitializeAtParSystem", EventLogEntryType.Error)

                                    End If
                                Catch ex As Exception
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to ping " & _
                                            "the DB Server " & _dbServerName & ":")
                                End Try


                                _blnConnectionError = False

                            End If

                            '//--------------//




                            If pDsSystems.Tables.Count > 0 Then
                                If pDsSystems.Tables(0).Rows.Count > 0 Then
                                    If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Total Number of Systems are :" & pDsSystems.Tables(0).Rows.Count & ":")
                                    Return ATPAR_OK
                                Else
                                    Return E_NORECORDFOUND
                                End If
                            Else
                                Return E_NORECORDFOUND
                            End If

                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get systems data from Master database:" & ex.ToString() & ":")
                            Return ATPAR_E_LOCALDBSELECTFAIL
                        End Try
                    Else
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get Master database connection. Check conf.xml:")
                        Return E_SERVERERROR
                    End If
                Else
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get Master database connection. Check conf.xml:")
                    Return E_SERVERERROR
                End If
            Else
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":No Data in Cache. Restart Atpar Application Service:")
                Return E_SERVERERROR
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get Master database connection :" & ex.ToString())
            Return E_SERVERERROR
        End Try
    End Function

    ''' <summary>
    ''' 
    ''' </summary>
    ''' <param name="pSystemId"></param>
    ''' <param name="pUpdateConfig"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetSystemConfigurationData(ByVal pSystemId As String, ByVal pUpdateConfig As Boolean) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _lngStatus As Long = -1
        Dim _systemId As String = String.Empty
        Dim _drySystemInformation As New Dictionary(Of String, Dictionary(Of String, String))

        Try
            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Getting System Configuration Details for System :" & pSystemId & ":")

            If pUpdateConfig = True Then
                mDrySystemConfiguration = AppDomain.CurrentDomain.GetData("AtParSystemConfigData")
            End If

            If mDrySystemConfiguration Is Nothing Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": No Data in Cache. Please restart AtPar -Application-Service")
                Return E_SERVERERROR
            Else
                _drySystemInformation = mDrySystemConfiguration(pSystemId)

                _lngStatus = ReadSystemConfigurationData(_drySystemInformation)


                If _lngStatus = E_NORECORDFOUND Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": No Configuraton Details exists for System Id: " & pSystemId & _
                                                                                       " Status code returned is: " & _lngStatus)

                ElseIf _lngStatus <> ATPAR_OK Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Error while Reading System Configuration details of System Id: " & pSystemId & _
                                                                    " Status code returned is: " & _lngStatus)

                Else
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Successfully Read System Configuration of System Id: " & pSystemId)

                    If pUpdateConfig = True Then
                        mDrySystemConfiguration(pSystemId) = _drySystemInformation
                        AppDomain.CurrentDomain.SetData("AtParSystemConfigData", mDrySystemConfiguration)
                    End If
                End If
            End If

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get System Configuration Data :" & pSystemId & ":" & ex.ToString())
            Return E_SERVERERROR
        End Try
    End Function
#End Region

#Region "[ Private Functions ]"

    ''' <summary>
    ''' 
    ''' </summary>
    ''' <param name="pDrSystemInfo"></param>
    ''' <param name="pConnectionString"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetSystemConnectionString(ByVal pDrSystemInfo As DataRow, ByRef pConnectionString As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _systemId As String = String.Empty

        Try
            _systemId = pDrSystemInfo.Item(MASTER_DB.SYSTEMID)

            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Building Connection String for System Id:" & _systemId & ":")

            pConnectionString = "Server=" & pDrSystemInfo.Item(MASTER_DB.SERVER) & _
                    ";Database=" & pDrSystemInfo.Item(MASTER_DB.DATASOURCE) & _
                    ";User ID=" & pDrSystemInfo.Item(MASTER_DB.USERID) & _
                    ";Password=" & Decrypt(pDrSystemInfo.Item(MASTER_DB.PASSWORD)) & _
                    ";Trusted_Connection=False;Max Pool Size=200"

            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create connection object for System :" & _systemId & ":" & ex.ToString())
            Return E_SERVERERROR
        End Try
    End Function

    ''' <summary>
    ''' 
    ''' </summary>
    ''' <param name="pDrySystemConfig"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function ReadSystemConfigurationData(ByRef pDrySystemConfig As Dictionary(Of String, Dictionary(Of String, String))) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            Dim _dbConnection As GenericDatabase
            Dim _drySystemConfig As Dictionary(Of String, String) = pDrySystemConfig(CONFIGFILE.SYSTEMDBCONNECTION.ToString())
            Dim _strConnString As String = _drySystemConfig(CONFIGFILE.SYSTEMDBCONNECTION.ToString())
            Dim _cmd As DbCommand = Nothing
            Dim _dsSystemConfig As New DataSet
            Dim _blnConnectionError As Boolean = False
            Dim _intCounter As Integer = 0
            Dim _intMiddleTierDBTableCount As Integer = 0

            _dbConnection = New GenericDatabase(_strConnString, System.Data.SqlClient.SqlClientFactory.Instance)

            _cmd = New SqlCommand
            _cmd.Connection = _dbConnection.CreateConnection
            _cmd.CommandType = CommandType.StoredProcedure
            _cmd.CommandText = "usp_GetSystemConfiguration"

            '''''''''''

            '//---- When @Par application system reboots, Application service is
            'starting prior to SQL server related services, to avoid this waitng
            '20 seconds to start application service. ----//
            Do
                Try
                    _dsSystemConfig = _dbConnection.ExecuteDataSet(_cmd)

                    If log.IsDebugEnabled Then log.Debug(methodBaseName & "_dsSystemConfig.Tables.Count:" & _dsSystemConfig.Tables.Count)

                    '// Successfully read data from ATPAR_MT data base
                    If _dsSystemConfig.Tables.Count > 0 Then
                        Exit Do
                    End If

                Catch sqlex As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Exception occurred while " & _
                                                      " while connecting to Middle tier DB server :" & GetSQLExceptionMessageString(sqlex).ToString & _
                                                      "SQL Exception number is: " & sqlex.Number & " SQL Error Code is:" & sqlex.ErrorCode)

                    '// SQL Exception number 18456 is for invalid credentials
                    If sqlex.Number = 18456 Then
                        WriteToEventLog("Failed to Authenticate the user. Either User Id " & _
                        "or Password provided is wrong", "InitializeAtParSystem", EventLogEntryType.Error)
                        Exit Do
                    End If

                    '// SQL Server services are stopped 
                    If sqlex.Number = 2 Or sqlex.ErrorCode = -2146232060 Then
                        WriteToEventLog("Server hosting the @Par Middle tier data base is down", "InitializeAtParSystem", EventLogEntryType.Error)
                        'Exit Do
                    End If
                End Try

                If _intCounter = 100 Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " waited " & _intCounter & " seconds for Middle tier DB server up: ")
                    Exit Do
                End If

                _intCounter = _intCounter + 1

                System.Threading.Thread.Sleep(5000)

                _intMiddleTierDBTableCount = _dsSystemConfig.Tables.Count

            Loop Until (_intMiddleTierDBTableCount > 0)

            '''''''''''

            With _dsSystemConfig
                If .Tables.Count > 0 Then
                    For Each config_file_element As String In config_file_elements
                        With _dsSystemConfig.Tables(1)
                            Dim primaryKeys(1) As DataColumn
                            primaryKeys(0) = .Columns(0)
                            primaryKeys(1) = .Columns(1)

                            .PrimaryKey = primaryKeys

                            Dim _drConfDetails() As DataRow = .Select("TAB_ID = '" & config_file_element & "'")
                            Dim _dryTabConfig As New Dictionary(Of String, String)
                            'Dim 

                            If _drConfDetails.Length > 0 Then
                                If config_file_element <> CONFIGFILE.REMOTEDBCONNECTION.ToString() Then
                                    Try
                                        For iTabConfRow As Integer = 0 To _drConfDetails.Length - 1
                                            If IsDBNull(_drConfDetails(iTabConfRow)("PARAMETER_VALUE")) Then
                                                _dryTabConfig.Add(_drConfDetails(iTabConfRow)("PARAMETER_ID"), String.Empty)
                                            Else
                                                _dryTabConfig.Add(_drConfDetails(iTabConfRow)("PARAMETER_ID"), _
                                                              _drConfDetails(iTabConfRow)("PARAMETER_VALUE"))
                                            End If
                                        Next

                                        If config_file_element = CONFIGFILE.ERP_SYS_DETAILS.ToString() Then
                                            Dim findTheseVals(1) As Object
                                            Dim _drPassword As DataRow
                                            Dim _ERPPassword As String = String.Empty

                                            findTheseVals(0) = config_file_element
                                            findTheseVals(1) = ERP_SYS_DETAILS.ERPPASSWORD.ToString()
                                            _drPassword = _dsSystemConfig.Tables(1).Rows.Find(findTheseVals)

                                            If _drPassword Is Nothing OrElse IsDBNull(_drPassword("PARAMETER_VALUE")) Then
                                                If log.IsWarnEnabled Then log.Warn(methodBaseName & ": No Password set for ERP System Details.:")
                                            Else
                                                _ERPPassword = Decrypt(_drPassword("PARAMETER_VALUE").ToString())
                                            End If

                                            _dryTabConfig.Add(DBCONN_STRING.DECRYPTPASSWORD.ToString, _ERPPassword)
                                        End If

                                        If pDrySystemConfig.ContainsKey(config_file_element) Then
                                            pDrySystemConfig(config_file_element) = _dryTabConfig
                                        Else
                                            pDrySystemConfig.Add(config_file_element, _dryTabConfig)
                                        End If

                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get Configuration Data from Database :" & ex.ToString())
                                        Return E_SERVERERROR
                                    End Try
                                Else
                                    Try
                                        For iTabConfRow As Integer = 0 To _drConfDetails.Length - 1
                                            If _drConfDetails(iTabConfRow)("PARAMETER_ID") <> REMOTEDBCONNECTION.DATABASE.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> REMOTEDBCONNECTION.SERVER.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> REMOTEDBCONNECTION.USERID.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> REMOTEDBCONNECTION.DATASOURCE.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> REMOTEDBCONNECTION.PASSWORD.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> REMOTEDBCONNECTION.DRIVER.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> REMOTEDBCONNECTION.SCHEMA.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> ERP_SYS_DETAILS.ERPSERVER.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> ERP_SYS_DETAILS.ERPPORTAL.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> ERP_SYS_DETAILS.ERPNODE.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> ERP_SYS_DETAILS.ERPWEBSERVERPORT.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> ERP_SYS_DETAILS.ERPPASSWORD.ToString() And _
                                            _drConfDetails(iTabConfRow)("PARAMETER_ID") <> ERP_SYS_DETAILS.ERPUSERID.ToString() Then

                                                If IsDBNull(_drConfDetails(iTabConfRow)("PARAMETER_VALUE")) Then
                                                    _dryTabConfig.Add(_drConfDetails(iTabConfRow)("PARAMETER_ID"), String.Empty)
                                                Else
                                                    _dryTabConfig.Add(_drConfDetails(iTabConfRow)("PARAMETER_ID"), _
                                                                  _drConfDetails(iTabConfRow)("PARAMETER_VALUE"))
                                                End If
                                            End If
                                        Next

                                        Dim _dbType, _server, _userid, _passwd, _driver, _erpDataSource, _schema As String
                                        Dim _connectString As String = String.Empty

                                        If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Building Remote Connection :")

                                        _dbType = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.REMOTEDBCONNECTION.ToString(), REMOTEDBCONNECTION.DATABASE.ToString())
                                        _erpDataSource = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.REMOTEDBCONNECTION.ToString(), REMOTEDBCONNECTION.DATASOURCE.ToString())
                                        _server = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.REMOTEDBCONNECTION.ToString(), REMOTEDBCONNECTION.SERVER.ToString())
                                        _userid = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.REMOTEDBCONNECTION.ToString(), REMOTEDBCONNECTION.USERID.ToString())
                                        _passwd = Decrypt(GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.REMOTEDBCONNECTION.ToString(), REMOTEDBCONNECTION.PASSWORD.ToString()))
                                        _driver = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.REMOTEDBCONNECTION.ToString(), REMOTEDBCONNECTION.DRIVER.ToString())
                                        _schema = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.REMOTEDBCONNECTION.ToString(), REMOTEDBCONNECTION.SCHEMA.ToString())

                                        Select Case _dbType
                                            Case EName(Of DATABASE_TYPES)(DATABASE_TYPES.SQLSERVER)
                                                _connectString = "Server=" & _server & ";Database=" & _erpDataSource & ";User ID=" & _userid & ";Password=" & _passwd & ";Trusted_Connection=False"
                                            Case EName(Of DATABASE_TYPES)(DATABASE_TYPES.ORACLE)
                                                _connectString = "Server=" & _server & ";UID=" & _userid & ";PWD=" & _passwd
                                            Case EName(Of DATABASE_TYPES)(DATABASE_TYPES.DB2)
                                                _connectString = "Provider=Microsoft.Jet.OLEDB.4.0;DataSource=NotesManagerServer.mdb"
                                        End Select

                                        _dryTabConfig.Add(REMOTEDBCONNECTION.SCHEMA.ToString(), _schema)
                                        _dryTabConfig.Add(REMOTEDBCONNECTION.DATABASE.ToString(), _dbType)
                                        _dryTabConfig.Add(config_file_element, _connectString)

                                        If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Remote DB Connection created successfully.:")

                                        If pDrySystemConfig.ContainsKey(config_file_element) Then
                                            pDrySystemConfig(config_file_element) = _dryTabConfig
                                        Else
                                            pDrySystemConfig.Add(config_file_element, _dryTabConfig)
                                        End If

                                        If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Creating PSCI Login Url :")

                                        Dim _strLoginUrl As String = String.Empty
                                        Dim _ServerName As String = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ERPSERVER.ToString())
                                        Dim _portal As String = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ERPPORTAL.ToString())
                                        Dim _node As String = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ERPNODE.ToString())
                                        Dim _httpPort As String = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ERPWEBSERVERPORT.ToString())
                                        Dim _PSSiteName As String = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ERPSITE.ToString())
                                        Dim _Password As String = Decrypt(GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ERPPASSWORD.ToString()))
                                        Dim _ErpUserID As String = GetValueFromDataSet(_dsSystemConfig, CONFIGFILE.ERP_SYS_DETAILS.ToString(), ERP_SYS_DETAILS.ERPUSERID.ToString())

                                        If _ServerName = String.Empty Or _portal = String.Empty Or _node = String.Empty _
                                                        Or _httpPort = String.Empty Or _PSSiteName = String.Empty _
                                                        Or _Password = String.Empty Or _ErpUserID = String.Empty Then

                                            Dim _strPwd As String = _Password
                                            Dim _intPwdlen As Integer = 0
                                            If Not String.IsNullOrEmpty(_strPwd) Then
                                                _intPwdlen = _strPwd.Length
                                            End If
                                            _strPwd = String.Empty
                                            If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Cannot create PSCI Login URL. Invalid Inputs:" & _
                                                                                    ":Server Name:" & _ServerName & ":" & _
                                                                                    ":Portal:" & _portal & ":" & _
                                                                                    ":Node:" & _node & ":" & _
                                                                                    ":Port:" & _httpPort & ":" & _
                                                                                    ":PSSiteName:" & _PSSiteName & ":" & _
                                                                                    ":Password:" & _strPwd.PadLeft(_intPwdlen, "*") & ":" & _
                                                                                    ":ErpUserID:" & _ErpUserID & ":")

                                        End If

                                        _strLoginUrl = _ServerName & ":" & _httpPort & "/psc/" & _PSSiteName & _
                                                    "/" & _portal & "/" & _node & "/s/" & _
                                                    "WEBLIB_SOAPTOCI.SOAPTOCI.FieldFormula.IScript_SOAPToCI" & _
                                                    "?userid=" & _ErpUserID & "&pwd=" & _Password & "&disconnect=y&postDataBin=y"

                                        _dryTabConfig.Add(ERP_LOGIN_URL.PSCILOGINURL.ToString, _strLoginUrl)

                                        If pDrySystemConfig.ContainsKey(ERP_LOGIN_URL.PSCILOGINURL.ToString) Then
                                            pDrySystemConfig(ERP_LOGIN_URL.PSCILOGINURL.ToString) = _dryTabConfig
                                        Else
                                            pDrySystemConfig.Add(ERP_LOGIN_URL.PSCILOGINURL.ToString, _dryTabConfig)
                                        End If

                                        If log.IsDebugEnabled Then log.Debug(methodBaseName & ": PSCI Login Url created successfully:")
                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get Remote Configuration Data from Database :" & ex.ToString())
                                        Return E_SERVERERROR
                                    End Try
                                End If
                            Else
                                If Not config_file_element.Equals(MASTERCONFIG.MASTER_DB.ToString) Then
                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & ": Data doesnt exist for Tab Id :" & config_file_element & ":")
                                End If
                            End If
                        End With
                    Next
                    Return ATPAR_OK
                Else
                    Return E_NORECORDFOUND
                End If
            End With

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to get System Configuration Data from Database :" & ex.ToString())
            Return E_SERVERERROR
        End Try
    End Function
#End Region

#End Region

#Region "[ Private Functions ]"

    ''' <summary>
    ''' Gets the connection string of Master Database
    ''' </summary>
    ''' <param name="pCol"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetMasterDBConnectionString(ByVal pCol As Collection) As String
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            If pCol.Contains(MASTERCONFIG.MASTER_DB.ToString()) Then
                Dim _col As System.Collections.Generic.Dictionary(Of String, String) = pCol.Item(MASTERCONFIG.MASTER_DB.ToString())

                Dim _server As String = _col.Item(EName(Of MASTER_DB)(MASTER_DB.SERVER))
                Dim _DataSource As String = _col.Item(EName(Of MASTER_DB)(MASTER_DB.DATASOURCE))
                Dim _UserID As String = _col.Item(EName(Of MASTER_DB)(MASTER_DB.USERID))

                Dim _Password As String = Decrypt(_col.Item(EName(Of MASTER_DB)(MASTER_DB.PASSWORD)))

                Return "Server=" & _server & ";Database=" & _DataSource & ";User ID=" & _UserID & ";Password=" & _Password & ";Trusted_Connection=False;Max Pool Size=200"
            Else
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Master Database details are not set in Conf.xml. Unable to build Master database connection :")
                Return String.Empty
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Error while building Master database connection string:" & ex.ToString())
            Throw ex
        End Try
    End Function

    ''' <summary>
    ''' To read the Config file
    ''' </summary>
    ''' <param name="ConfigFile">Config File path</param>
    ''' <returns>Collection of values read from Conf.xml</returns>
    ''' <remarks></remarks>
    Private Function ReadConfig(ByVal ConfigFile As String) As Collection

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If ConfigFile.Length = 0 Then Throw New Exception("No Config File Name/Path specified")

        Dim xmldoc As New System.Xml.XmlDocument
        Dim colout As New Collection

        Try

            Try
                'NB-0006212
                Threading.Thread.Sleep(1000)
                xmldoc.Load(ConfigFile)

                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Loaded " & ConfigFile & " file size " & xmldoc.InnerXml.Length)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Invalid XML in the Config File " & ex.ToString)
                Return Nothing
            End Try

            For Each config_file_element As String In config_file_elements

                Dim _node As XmlNode = xmldoc.SelectSingleNode("//" & config_file_element)

                If Not (_node Is Nothing) Then
                    Dim coldata As New System.Collections.Generic.Dictionary(Of String, String)

                    For Each node As XmlNode In _node.ChildNodes

                        Dim _data As String = String.Empty
                        If (node.HasChildNodes) Then _data = node.FirstChild.Value

                        Try
                            coldata.Add(node.Name, _data)
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Child Node " & node.Name & _
                                                " in Node " & config_file_element & _
                                                " occurrs multiple times or is incorrect " & ex.ToString)
                            Return Nothing
                        End Try
                    Next
                    Try
                        colout.Add(coldata, config_file_element)

                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Node " & config_file_element & _
                                            " occurrs multiple times or is incorrect " & ex.ToString)
                        Return Nothing
                    End Try

                End If
            Next

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error Reading Config File " & ex.ToString)
            Return Nothing
        Finally
            xmldoc = Nothing
        End Try

        Return colout

    End Function


    Private Function GetValueFromDataSet(ByVal pDsInput As DataSet, ByVal strTabId As String, ByVal strFindThis As String) As String
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _returnValue As String = String.Empty
        Const PARAMETER_VALUE As Int16 = 2

        Try
            Dim findTheseVals(1) As Object
            Dim _drRow As DataRow

            findTheseVals(0) = strTabId
            findTheseVals(1) = strFindThis

            _drRow = pDsInput.Tables(1).Rows.Find(findTheseVals)

            If _drRow Is Nothing OrElse IsDBNull(_drRow(PARAMETER_VALUE)) Then
                _returnValue = String.Empty
            Else
                _returnValue = _drRow(PARAMETER_VALUE).ToString()
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Error while getting value from Dataset : " & _
                                                                  ": Parameters : " & strFindThis & _
                                                                    ex.ToString())
        End Try

        Return _returnValue
    End Function

#End Region

#Region "[ Password Decrypt functionality ]"
    ''' <summary>
    ''' To decrypt the Password that has been encrypted
    ''' </summary>
    ''' <param name="Encrypted">Encrypted Password</param>
    ''' <returns>Decrypted Password</returns>
    ''' <remarks></remarks>
    Private Function Decrypt(ByVal Encrypted As String) As String
        Dim NewEncrypted As String = String.Empty
        Dim Letter As String
        Dim KeyNum As String
        Dim EncNum As String = String.Empty
        Dim encbuffer As Long
        Dim strDecrypted As String = String.Empty
        Dim Kdecrypt As String
        Dim lastTemp As String
        Dim LenTemp As Integer
        Dim temp As String
        Dim temp2 As String = String.Empty
        Dim itempstr As String
        Dim itempnum As Integer
        Dim Math As Long
        Dim i As Integer
        Dim encTxt As String
        Dim encChar As String = String.Empty
        Dim sEncKey As String
        Dim encKey

        'Same key should be used while encrypt and decrypt
        sEncKey = Chr(49) & Chr(45) & Chr(56) & Chr(48) & Chr(48) & Chr(45) & Chr(66) & Chr(69) & Chr(69) & Chr(45) & Chr(76) & Chr(79) & Chr(71) & Chr(79)

        On Error GoTo oops
        encTxt = String.Empty
        For i = 1 To Len(Encrypted)
            If Mid$(Encrypted, i, 1) = "_" Then
                encTxt = encTxt & Chr(CLng(encChar))
                encChar = String.Empty
            Else
                encChar = encChar & Mid$(Encrypted, i, 1)
            End If
        Next
        Encrypted = encTxt

        ReDim encKey(Len(sEncKey))
        For i = 1 To Len(sEncKey$)
            KeyNum = Mid$(sEncKey$, i, 1)
            encKey(i) = Asc(KeyNum)

            If i = 1 Then Math = encKey(i) : GoTo nextone
            If i >= 2 And Math - encKey(i) >= 0 And encKey(i) _
                    <= encKey(i - 1) Then Math = Math - encKey(i)
            If i >= 2 And Math - encKey(i) >= 0 And encKey(i) _
                   <= encKey(i - 1) Then Math = Math - encKey(i)
            If i >= 2 And encKey(i) >= Math And encKey(i) _
                   >= encKey(i - 1) Then Math = Math + encKey(i)
            If i >= 2 And encKey(i) < Math And encKey(i) _
                   >= encKey(i - 1) Then Math = Math + encKey(i)
nextone:
        Next i

        temp$ = Encrypted

        For i = 1 To Len(temp)
            itempstr = TrimSpaces(Str(Asc(Mid(temp, i, 1)) - _
               100))

            If Len(itempstr$) = 2 Then itempstr$ = itempstr$
            If i = Len(temp) - 2 Then LenTemp% = _
                 Len(Mid(temp2, Len(temp2) - 3))
            If i = Len(temp) Then itempstr$ = _
                TrimSpaces(itempstr$) : GoTo itsdone
            If Len(TrimSpaces(itempstr$)) = 1 Then _
               itempstr$ = "0" & TrimSpaces(itempstr$)
itsdone:
            temp2$ = temp2$ & itempstr
        Next i
        Encrypted = TrimSpaces(temp2$)


        For i = 1 To Len(Encrypted) Step 3
            NewEncrypted = NewEncrypted & _
                Mid(Encrypted, CLng(i), 3) & " "
        Next i

        lastTemp$ = TrimSpaces(Mid(NewEncrypted, _
              Len(NewEncrypted$) - 3))

        If Len(lastTemp$) = 2 Then
            lastTemp$ = Mid(NewEncrypted, _
               Len(NewEncrypted$) - 1)
            Encrypted = Mid(NewEncrypted, 1, _
               Len(NewEncrypted) - 2) & "0" & lastTemp$
        Else
            Encrypted$ = NewEncrypted$

        End If
        For i = 1 To Len(Encrypted)
            Letter = Mid$(Encrypted, i, 1)
            EncNum = EncNum & Letter
            If Letter = " " Then
                encbuffer = CLng(Mid(EncNum, 1, _
                  Len(EncNum) - 1))
                strDecrypted$ = strDecrypted & Chr(encbuffer - _
                   Math)
                EncNum = String.Empty
            End If
        Next i

        Decrypt = strDecrypted

        Exit Function
oops:

    End Function

    ''' <summary>
    ''' To trim extra white spaces from any String
    ''' </summary>
    ''' <param name="strstring">Input String</param>
    ''' <returns>Formatted String</returns>
    ''' <remarks></remarks>
    Private Function TrimSpaces(ByVal strstring As String) As String
        Dim lngpos As Long
        Do While InStr(1, strstring$, " ")

            lngpos& = InStr(1, strstring$, " ")
            strstring$ = Left$(strstring$, (lngpos& - 1&)) & _
               Right$(strstring$, Len(strstring$) - _
                  (lngpos& + Len(" ") - 1&))
        Loop
        TrimSpaces$ = strstring$
    End Function
#End Region

End Class

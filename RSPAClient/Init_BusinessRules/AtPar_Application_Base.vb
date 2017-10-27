#Region "Imports"
Imports System.Data
Imports System.Data.Common
Imports System.Data.SqlClient
Imports System.Data.OracleClient
Imports Microsoft.Practices.EnterpriseLibrary.Data
Imports Microsoft.Practices.EnterpriseLibrary.Data.Sql
Imports Microsoft.Practices.EnterpriseLibrary.Common
Imports System.Reflection
Imports System.Collections.Generic
Imports log4net
Imports System.IO
#End Region

''' <summary>
''' A base class that only AtPar_DeviceTransactions_Base and AtPar_WebTransactions_Base classes should inherit from and implement.
''' This class provides a common set of functions and objects that applications can use
''' Application DevTrans/WebTrans classes should never inherit this class directly
''' </summary>
''' <remarks></remarks>
Public MustInherit Class AtPar_Application_Base
    Inherits MarshalByRefObject
    Implements IDisposable

    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_Application_Base))
    Private disposedValue As Boolean = False        ' To detect redundant calls

#Region " IDisposable Support "
    ' This code added by Visual Basic to correctly implement the disposable pattern.
    Public Sub Dispose() Implements IDisposable.Dispose
        ' Do not change this code.  Put cleanup code in Dispose(ByVal disposing As Boolean) above.
        Dispose(True)
        GC.SuppressFinalize(Me)
    End Sub

    ' IDisposable
    Protected Overridable Sub Dispose(ByVal disposing As Boolean)
        If Not Me.disposedValue Then
            If disposing Then


            End If

            If Not sqlconnect Is Nothing Then
                sqlConnect.Close()
                sqlConnect.Dispose()
            End If

            If Not m_RemoteDB Is Nothing Then
                m_RemoteDB = Nothing
            End If

        End If
        Me.disposedValue = True
    End Sub

#End Region

#Region "Get Assembly Information"
    Public ReadOnly Property Version() As String
        Get
            Dim _ver As System.Version = My.Application.Info.Version
            Version = _ver.ToString
        End Get
    End Property

    Public ReadOnly Property AssemblyName() As String
        Get
            AssemblyName = My.Application.Info.AssemblyName
        End Get
    End Property

    Public ReadOnly Property Path() As String
        Get
            Path = My.Application.Info.DirectoryPath
        End Get
    End Property

    Public ReadOnly Property Dependencies() As String
        Get
            Dim outStr As String = ""
            Dim loadedAssemblies As _
                  ObjectModel.ReadOnlyCollection(Of Reflection.Assembly) = My.Application.Info.LoadedAssemblies
            For Each assembly As Reflection.Assembly In loadedAssemblies
                outStr = outStr + assembly.GetName().Name & vbCrLf
            Next
            Dependencies = outStr
        End Get
    End Property
#End Region

#Region "Read/Process system config Data"

    Protected Function GetConfigData(ByVal SystemId As String, ByVal ConfigElement As String, ByVal ConfigVariable As String) As String
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            If String.IsNullOrEmpty(SystemId) Or String.IsNullOrEmpty(ConfigElement) Or String.IsNullOrEmpty(ConfigVariable) Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & _
                                    " Invalid Parameters: " & _
                                    " SystemId " & SystemId & _
                                    " ConfigVariable " & ConfigVariable & _
                                    " or ConfigElement " & ConfigElement & " has not been provided")
                Return String.Empty
            End If

            Dim confData As New Dictionary(Of String, Dictionary(Of String, Dictionary(Of String, String)))
            confData = AppDomain.CurrentDomain.GetData("AtParSystemConfigData")

            If Not confData Is Nothing OrElse confData.Keys.Count <> 0 Then
                If confData.ContainsKey(SystemId) Then
                    Dim systemConfig As System.Collections.Generic.Dictionary(Of String, Dictionary(Of String, String)) = confData(SystemId)

                    If systemConfig.ContainsKey(ConfigElement) Then
                        Dim config As Dictionary(Of String, String) = systemConfig(ConfigElement)

                        If config.ContainsKey(ConfigVariable) Then
                            Return config(ConfigVariable)
                        Else
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": ConfigVariable :" & ConfigVariable & ": for System Id :" & SystemId & _
                                                                                                     ": and Config Element :" & ConfigElement & _
                                                                                                     ": is not found. Please check in System database.")
                            Return String.Empty
                        End If
                    Else
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Config Element :" & ConfigElement & _
                                                                              ": not found for System Id :" & SystemId & ":" & _
                                                                              ". Please check in System database.")
                        Return String.Empty
                    End If
                Else
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Missing AppDomain Data, for System Id :" & SystemId & ":" & _
                                                                          ". Please check if the system details exist in Master database.")
                    Return String.Empty
                End If
            Else
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Missing AppDomain Data, please make sure the AtPar Application Service has been started")
                Return String.Empty
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to Get Config Data " & ex.ToString)
            Return String.Empty
        End Try

    End Function


#End Region

#Region "Get SQL Connections"

    Protected  m_RemoteDB As GenericDatabase
    Protected  m_LocalDB, m_MasterDB As SQLDatabase

    Protected Overloads Sub CreateRemoteDB(ByVal pSystemId As String)
        Try
            m_RemoteDB = GetRemoteDBConnection(pSystemId)
        Catch ex As Exception
            Throw New Exception("Failed to Create Remote DB ", ex)
        End Try
    End Sub
    Protected Overloads Sub CreateRemoteDB(ByVal pDbType As String, ByVal pServer As String, _
                                           ByVal pUserId As String, ByVal pPwd As String, _
                                           ByVal pDriver As String, ByVal pDataSource As String, _
                                           ByVal pSchema As String, ByVal pSystemId As String)
        Try
            m_RemoteDB = GetRemoteDBConnection(pDbType, pServer, pUserId, pPwd, pDriver, pDataSource, pSchema, pSystemId)
        Catch ex As Exception
            Throw New Exception("Failed to Create Remote DB ", ex)
        End Try
    End Sub

    Protected Overloads Function GetRemoteDBConnection(ByVal pSystemId As String) As GenericDatabase
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Try
            Dim _db As GenericDatabase = Nothing
            Dim _dbConnectionString As String = String.Empty
            Dim _dbDatabaseType As String = String.Empty

            _dbConnectionString = GetConfigData(pSystemId, CONFIGFILE.REMOTEDBCONNECTION.ToString(), CONFIGFILE.REMOTEDBCONNECTION.ToString)
            _dbDatabaseType = GetConfigData(pSystemId, CONFIGFILE.REMOTEDBCONNECTION.ToString(), REMOTEDBCONNECTION.DATABASE.ToString())

            Select Case _dbDatabaseType
                Case DATABASE_TYPES.ORACLE.ToString
                    _db = New GenericDatabase(_dbConnectionString, System.Data.OracleClient.OracleClientFactory.Instance)
                Case DATABASE_TYPES.SQLSERVER.ToString
                    _db = New GenericDatabase(_dbConnectionString, System.Data.SqlClient.SqlClientFactory.Instance)
                Case DATABASE_TYPES.DB2.ToString
                    ' TODO: need to investigate this further
                    'm_RemoteDBConn = New GenericDatabase(remoteConnectionString, Data.Common.DbProviderFactories.GetFactory("System.Data.OleDb"))
            End Select

            Return _db
        Catch ex As Exception
            Throw New Exception(methodBaseName & " Failed to create a Remote Database object" & vbCrLf & ex.ToString)
        End Try
    End Function

    Protected Overloads Function GetRemoteDBConnection(ByVal pDbType As String, ByVal pServer As String, _
                                                       ByVal pUserId As String, ByVal pPwd As String, _
                                                       ByVal pDriver As String, ByVal pDataSource As String, _
                                                       ByVal pSchema As String, ByVal pSystemId As String) As GenericDatabase
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Try
            Dim _db As GenericDatabase = Nothing
            Dim _dbConnectionString As String = String.Empty

            Select Case pDbType
                Case EName(Of DATABASE_TYPES)(DATABASE_TYPES.SQLSERVER)
                    _dbConnectionString = "Server=" & pServer & ";Database=" & pDataSource & ";User ID=" & pUserId & ";Password=" & pPwd & ";Trusted_Connection=False"
                    _db = New GenericDatabase(_dbConnectionString, System.Data.SqlClient.SqlClientFactory.Instance)
                Case EName(Of DATABASE_TYPES)(DATABASE_TYPES.ORACLE)
                    _dbConnectionString = "Server=" & pServer & ";UID=" & pUserId & ";PWD=" & pPwd
                    _db = New GenericDatabase(_dbConnectionString, System.Data.OracleClient.OracleClientFactory.Instance)
            End Select

            Return _db
        Catch ex As Exception
            Throw New Exception(methodBaseName & " : Failed to create a Remote Database object" & vbCrLf & ex.ToString)
        End Try

    End Function

    Protected  Sub CreateLocalDB(ByVal pSystemId As String)
        Try
			m_LocalDB = GetLocalDBConnection(pSystemId)			
        Catch ex As Exception
            Throw New Exception("Failed to Create Local DB ", ex)
        End Try
    End Sub

    Private  Function GetLocalDBConnection(ByVal pSystemId As String) As SQLDatabase
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _db As SQLDatabase = Nothing
        Dim _dbConnectionString As String = String.Empty

        Try
            _dbConnectionString = GetConfigData(pSystemId, CONFIGFILE.SYSTEMDBCONNECTION.ToString(), CONFIGFILE.SYSTEMDBCONNECTION.ToString)
            _db = New SQLDatabase(_dbConnectionString)

            Return _db
        Catch ex As Exception
            Throw New Exception(methodBaseName & " Failed to create a Local Database object " & vbCrLf & ex.ToString)
        End Try
    End Function

    Private  Function GetMasterDBConnection() As SQLDatabase
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _db As SQLDatabase = Nothing
        Dim _dbConnectionString As String = String.Empty
        Dim _coldata As New System.Collections.Generic.Dictionary(Of String, String)
        Dim _confData As Collection

        Try
            _confData = CType(AppDomain.CurrentDomain.GetData("AtParConfigData"), Collection)

            _coldata = CType(_confData.Item("DBCONN_STRING"), Dictionary(Of String, String))

            If Not IsNothing(_coldata) Then
                If _coldata.Keys.Count > 0 Then
                    Try
                        If log.IsDebugEnabled Then log.Debug(methodBaseName & ": Getting all system details from Master Database :")

                        _dbConnectionString = _coldata.Item(DBCONN_STRING.MASTER_DB.ToString)

                        _db = New SQLDatabase(_dbConnectionString)
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create Master database connection:" & ex.ToString() & ":")
                        Throw New Exception(methodBaseName & " Failed to create a Master Database object ")
                    End Try
                End If
            End If

            
            Return _db
        Catch ex As Exception
            Throw New Exception(methodBaseName & " Failed to create a Master Database object " & vbCrLf & ex.ToString)
        End Try
    End Function

    Protected  Function CreateMasterDB() As SQLDatabase
        Try
            m_MasterDB = GetMasterDBConnection()
        Catch ex As Exception
            Throw New Exception("Failed to Create Master DB ", ex)
        End Try
    End Function
#End Region



#Region "ERP Object and related functions"

    Protected Sub CreateERPObject(ByVal ERPObjectName As String, ByRef ERPObjectAssembly As Assembly)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        Try
            If String.IsNullOrEmpty(ERPObjectName) Then
                Throw New Exception(methodBaseName & " Invalid Parameters: ERPObjectName " & ERPObjectName & _
                                    " has not been provided")
            End If

            Dim _erp_object_file As String
			_erp_object_file =  AppDomain.CurrentDomain.BaseDirectory().Chars(0) & ":\Atpar\bin\"
           ' _erp_object_file = AppDomain.CurrentDomain.BaseDirectory
            _erp_object_file = _erp_object_file & ERPObjectName & ".dll"
            Try
                ERPObjectAssembly = [Assembly].LoadFrom(_erp_object_file)
            Catch ex As Exception
                Throw New Exception(methodBaseName & " Failed to Load ERP Object Assembly " & ex.ToString)
            End Try

        Catch ex As Exception
            Throw ex
        End Try

    End Sub

#End Region

#Region "Debugging Functions"

    ''' <summary>  
    ''' don't use this function for any real work, just as a possible debugging tool  
    ''' </summary>  
    ''' <returns>a string representation of the config file</returns>  
    ''' <remarks></remarks>  
    Private Function printconfcol(ByRef pCol As Collection) As String
        Dim sb As New System.Text.StringBuilder
        For Each col As System.Collections.Generic.Dictionary(Of String, String) In pCol

            For Each pair As KeyValuePair(Of String, String) In col
                sb.Append(pair.Key.PadRight(30) & " " & pair.Value & vbCrLf)
            Next
        Next
        Return sb.ToString
    End Function
#End Region

#Region "Get SAP Connection"

    Protected Function GetSAPConnectionString(ByRef pSapConnectionString as string,ByVal pSystemId As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)


        Dim _strErpServer As String = String.Empty
        Dim _strSapSysnr As String = String.Empty
        Dim _strClientCode As String = String.Empty
        Dim _strErpUserID As String = String.Empty
        Dim _strErpPassword As String = String.Empty


        Try

            _strErpServer = GetConfigData(pSystemId, CONFIGFILE.ERP_SYS_DETAILS.ToString(), _
                                                            ERP_SYS_DETAILS.ERPSERVER.ToString())
            _strSapSysnr = GetConfigData(pSystemId, CONFIGFILE.ERP_SYS_DETAILS.ToString(), _
                                                            ERP_SYS_DETAILS.SYSNR.ToString())
            _strClientCode = GetConfigData(pSystemId, CONFIGFILE.ERP_SYS_DETAILS.ToString(), _
                                                            ERP_SYS_DETAILS.CLIENTCODE.ToString())
            _strErpUserID = GetConfigData(pSystemId, CONFIGFILE.ERP_SYS_DETAILS.ToString(), _
                                                            ERP_SYS_DETAILS.ERPUSERID.ToString())
            _strErpPassword = GetConfigData(pSystemId, EName(Of CONFIGFILE)(CONFIGFILE.ERP_SYS_DETAILS), _
                                                            DBCONN_STRING.DECRYPTPASSWORD.ToString)


            pSapConnectionString = "ASHOST=" & _strErpServer & " SYSNR=" & _strSapSysnr & " CLIENT=" & _strClientCode & _
                        " USER=" & _strErpUserID & " PASSWD=" & _strErpPassword


        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("SAP ERP Component Initialization Failed" & ex.ToString)
            Return ATPAR_E_REMOTEDBCONNECTFAIL
        End Try


        Return ATPAR_OK

    End Function
#End Region

#Region "Print InputParameters"

    ''' <summary>
    ''' Prints Dataset Statistics. Like Total Number of Tables, Number of Rows in each Table and Data.
    ''' </summary>
    ''' <param name="pDataset"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Protected Function PrintDatasetStatistics(ByVal pDataset As DataSet, ByVal pDeviceTokenEntry As String(), Optional ByVal pLogMsgMode As String = "") As Long
        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)

        Dim stackFrame As New StackFrame()
        Dim methodBaseName As String = stackFrame.GetMethod().Name

        Dim _strMsg As String = String.Empty

        _strMsg = methodBaseName
        DisplaylogMsg(pLogMsgMode, _strMsg, pDeviceTokenEntry)

        Dim _strHeading As String

        _strHeading = "Column Name ".PadRight(40, "-") & " Value ".PadRight(40, "-")

        Try
            _strMsg = methodBaseName & vbCrLf & "Number of Tables in Dataset:" & pDataset.Tables.Count
            DisplaylogMsg(pLogMsgMode, _strMsg, pDeviceTokenEntry)

            If pDataset.Tables.Count > 0 Then
                For iTableNum As Integer = 0 To pDataset.Tables.Count - 1
                    Dim sbDebugDetails As New System.Text.StringBuilder

                    With pDataset.Tables(iTableNum)
                        sbDebugDetails.AppendLine(":Table Name:" & .TableName & " And Total No. of Rows are :" & .Rows.Count & ":")

                        If .Rows.Count > 0 Then
                            For iTableRow As Integer = 0 To .Rows.Count - 1
                                sbDebugDetails.AppendLine("Row : " & (iTableRow + 1).ToString)

                                sbDebugDetails.AppendLine(_strHeading)

                                For iTableColumn As Integer = 0 To .Columns.Count - 1
                                    sbDebugDetails.AppendLine(.Columns(iTableColumn).Caption.PadRight(40, "-") & _
                                            " :" & .Rows(iTableRow).Item(iTableColumn).ToString() & ":")
                                Next

                            Next
                        Else
                            _strMsg = methodBaseName & ":No Rows in Table:" & .TableName
                            DisplaylogMsg(pLogMsgMode, _strMsg, pDeviceTokenEntry)
                        End If
                        _strMsg = vbCrLf & sbDebugDetails.ToString()
                        DisplaylogMsg(pLogMsgMode, _strMsg, pDeviceTokenEntry)
                    End With
                Next
            Else
                _strMsg = methodBaseName & ":No Tables in DataSet:"
                DisplaylogMsg(pLogMsgMode, _strMsg, pDeviceTokenEntry)
            End If


            Return ATPAR_OK
        Catch ex As Exception
            If log.IsDebugEnabled Then log.Debug(methodBaseName & ":Error while Printing InputParameters :" & ex.ToString())
            Return E_SERVERERROR
        End Try
    End Function

    Private Sub DisplaylogMsg(ByVal pLogMsgMode As String, ByVal pLogMsg As String, ByVal pDeviceTokenEntry As String())

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)

        Dim stackFrame As New StackFrame()
        Dim methodBaseName As String = stackFrame.GetMethod().Name
        Try
            If String.IsNullOrEmpty(pLogMsgMode) Then

                If log.IsDebugEnabled Then log.Debug(pLogMsg)

            ElseIf pLogMsgMode = Log_Msg_Mode.FATAL.ToString Then

                If log.IsFatalEnabled Then log.Fatal(pLogMsg)

            ElseIf pLogMsgMode = Log_Msg_Mode.INFO.ToString Then

                If log.IsInfoEnabled Then log.Info(pLogMsg)

            ElseIf pLogMsgMode = Log_Msg_Mode.WARN.ToString Then

                If log.IsWarnEnabled Then log.Warn(pLogMsg)

            Else

                If log.IsDebugEnabled Then log.Debug(pLogMsg)

            End If


        Catch ex As Exception
            pLogMsg = methodBaseName & ":Error while Printing InputParameters :" & ex.ToString()
            If String.IsNullOrEmpty(pLogMsgMode) Then

                If log.IsDebugEnabled Then log.Debug(pLogMsg)

            ElseIf pLogMsgMode = Log_Msg_Mode.FATAL.ToString Then

                If log.IsFatalEnabled Then log.Fatal(pLogMsg)

            ElseIf pLogMsgMode = Log_Msg_Mode.INFO.ToString Then

                If log.IsInfoEnabled Then log.Info(pLogMsg)

            ElseIf pLogMsgMode = Log_Msg_Mode.WARN.ToString Then

                If log.IsWarnEnabled Then log.Warn(pLogMsg)

            Else

                If log.IsDebugEnabled Then log.Debug(pLogMsg)

            End If

        End Try
    End Sub

#End Region


End Class

Imports log4net
Imports System.IO
Imports System.Reflection
Imports System.Diagnostics
Imports System.Collections.Generic

Public Class Utilities

    Private apconf As AtParConfigFileReader
    Private m_watcher As FileSystemWatcher
    Private m_configFile As String

    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(Utilities))

    Public Sub InitializeAtParSystem()
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            Dim _ConfigFilePath As String = AppDomain.CurrentDomain.BaseDirectory().Chars(0) & ":\AtPar"
            Dim _ConfigFileName As String = AtParFilePaths.CONFIG_FILE_NAME
            m_configFile = _ConfigFilePath & "\" & _ConfigFileName

            apconf = New AtParConfigFileReader()
            Dim config_col As Collection
            config_col = apconf.CacheConfigData(m_configFile)

            If Not config_col Is Nothing Then
                AppDomain.CurrentDomain.SetData("AtParConfigData", config_col)


                If config_col.Contains(MASTERCONFIG.MASTER_DB.ToString()) Then
                    Dim mDrySystemConfiguration As New Dictionary(Of String, Dictionary(Of String, Dictionary(Of String, String)))
                    apconf.GetSystemsConfigurationData(mDrySystemConfiguration, config_col)

                    AppDomain.CurrentDomain.SetData("AtParSystemConfigData", mDrySystemConfiguration)
                Else
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Master Database details are not set in Conf.xml.")
                End If

                Try
                    m_watcher = New FileSystemWatcher

                    m_watcher.Path = _ConfigFilePath
                    m_watcher.Filter = _ConfigFileName

                    AddHandler m_watcher.Changed, AddressOf OnConfigFileChanged

                    m_watcher.EnableRaisingEvents = True
                Catch ex As Exception
                    Throw ex
                End Try


            Else
                Throw New Exception("Failed to Read/Cache Config Data")
            End If

        Catch ex As Exception
            Throw New Exception("Failed to Read/Cache Config Data", ex)
        End Try

    End Sub

    ' This event is fired if the config file changes
    ''' <summary>
    ''' To update when config file changes
    ''' </summary>
    ''' <param name="source"></param>
    ''' <param name="e"></param>
    ''' <returns>ATPAR_OK on Success, else Error Code</returns>
	''' <remarks></remarks>
    Private Sub OnConfigFileChanged(ByVal source As Object, ByVal e As FileSystemEventArgs)
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        m_watcher.EnableRaisingEvents = False

        Try
            Dim config_col As Collection

            apconf = New AtParConfigFileReader()
            config_col = apconf.CacheConfigData(m_configFile)

            ' if file changes assume the worst and clear out Appdomain data
            AppDomain.CurrentDomain.SetData("AtParConfigData", Nothing)

            If Not config_col Is Nothing Then
                AppDomain.CurrentDomain.SetData("AtParConfigData", config_col)

                If config_col.Contains(MASTERCONFIG.MASTER_DB.ToString()) Then
                    AppDomain.CurrentDomain.SetData("AtParSystemConfigData", Nothing)

                    Dim mDrySystemConfiguration As New Dictionary(Of String, Dictionary(Of String, Dictionary(Of String, String)))
                    apconf.GetSystemsConfigurationData(mDrySystemConfiguration, config_col)

                    AppDomain.CurrentDomain.SetData("AtParSystemConfigData", mDrySystemConfiguration)
                Else
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Master Database details are not set in Conf.xml.")
                End If
            Else
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to read config data")
                ' also log to event viewer
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to read config data " & ex.ToString & ":")
        End Try

        m_watcher.EnableRaisingEvents = True
    End Sub


End Class

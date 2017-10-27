Module WindowsServiceDefns
  
  Public Function WriteToEventLog(ByVal Entry As String, ByVal AppName As String, _
            Optional ByVal EventType As EventLogEntryType = EventLogEntryType.Information, _
            Optional ByVal LogName As String = "Application") As Boolean

        Dim objEventLog As New EventLog()

        Try
            'Register the App as an Event Source
            If Not Diagnostics.EventLog.SourceExists(AppName) Then

                Diagnostics.EventLog.CreateEventSource(AppName, LogName)
            End If

            objEventLog.Source = AppName

            objEventLog.WriteEntry(Entry, EventType)
            Return True
        Catch Ex As Exception
            Return False

        End Try

    End Function
	

End Module

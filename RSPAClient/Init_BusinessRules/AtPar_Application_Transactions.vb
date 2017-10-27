Imports System.Data.SqlClient
Imports Microsoft.ApplicationBlocks.Data
Imports System.Reflection
Imports log4net
Imports System.Text

Public Class AtPar_Application_Transactions
    Inherits AtPar_Application_Base

#Region "Member Variables"
    ' TODO: need to evaluate if this is a performance problem
    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_Application_Transactions))
    Private Shared m_Transactions As AtPar_Application_Transactions
    Private Shared m_ConnectionString As String = String.Empty
#End Region
  
	Sub New(ByVal pSystemId As String)
			Try
                CreateLocalDB(pSystemId)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(" Error while creating LocalDB Object " & ex.ToString)
                'Return m_Parameters
            End Try
    End Sub

#Region "ENums"
    Public Enum AppTransactions_FieldMaps
        BUSINESS_UNIT = 1
        APP_ID = 2
        REPORT_DATA_1 = 3
        REPORT_DATA_2 = 4
    End Enum

    Public Enum CartCount_AppTransactions_FieldMaps
        OPTIMAL_QTY = 3
        COUNT_QTY = 4
    End Enum

#End Region

#Region "User Defined Functions"

    Public Shared Function CreateInstance(ByVal pSystemId As String) As AtPar_Application_Transactions
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
                m_Transactions = New AtPar_Application_Transactions(pSystemId)
           
            CreateInstance = m_Transactions
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error while creating AtPar_Application_Transactions Object " & ex.ToString)
            Return m_Transactions
        End Try
    End Function


  
    ''' <summary>
    ''' Get the status for a single or multiple transactions
    ''' </summary>
    ''' <param name="pAppId">Application ID</param>
    ''' <param name="pTransactions">SortedList of Transactions 
    ''' (Col 1 - transactions that need to be retrieved, 
    ''' Col2 - status of those transactions)</param>
    ''' <returns>AtPar Status Code</returns>
    ''' <example>
    ''' To get a single transaction status: 
    ''' <pre>
    ''' Dim _transid as new SortedList
    ''' _transid("transid") = 0 ' transaction status is a short int
    ''' 
    ''' _StatusCode = AtPar_Application_Transactions.GetTransactionStatus(_appid, _transid)
    ''' </pre>
    ''' To Get multiple parameters:
    ''' <pre>
    ''' Dim _transid as new SortedList
    ''' _transid("TRANSID1") = 0 ' transaction status is a short int
    ''' _transid("TRANSID2") = 0
    ''' _transid("TRANSID3") = 0
    ''' 
    ''' _StatusCode = AtPar_Application_Transactions.GetTransactionStatus(_appid, _transid)
    ''' </pre>
    ''' </example>
    ''' <remarks></remarks>
    Public Function GetTransactionStatus(ByVal pAppID As Short, ByRef pTransactions As SortedList, _
                                         Optional ByVal pDeviceId As String = "", _
                                         Optional ByVal pDownloadDateTime As DateTime = Nothing) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            If (Len(pAppID) = 0 Or pTransactions.Count = 0) Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & "(pAppId:" & pAppID & _
                                                    ",pTransactions.Count:" & pTransactions.Count & _
                                                    ") E_INVALIDPARAMETER ")
                GetTransactionStatus = E_INVALIDPARAMETER
                Exit Function
            End If

            Dim _sbSQL As Text.StringBuilder = Nothing
            Dim _TransCount As Integer = pTransactions.Count

            Try
                _sbSQL = New Text.StringBuilder

                _sbSQL.Append("SELECT ")

                ' if its a single transaction, just get the status 
                If _TransCount = 1 Then
                    _sbSQL.Append("STATUS ")
                ElseIf _TransCount > 1 Then
                    'if there are more, get both transactionid and status
                    _sbSQL.Append("TRANSACTION_ID, STATUS ")
                End If

                ' TODO: schema?
                _sbSQL.Append("FROM MT_ATPAR_TRANSACTION " & _
                              "WHERE APP_ID = " & pAppID & " AND ")

                ' if its a single transaction, make a direct SQL query 
                If _TransCount = 1 Then

                    If (Len(pTransactions.GetKey(0)) = 0 Or Len(pAppId) = 0) Then
                        GetTransactionStatus = E_INVALIDPARAMETER
                        If log.IsWarnEnabled Then log.Warn("E_INVALIDPARAMETER")
                        Exit Function
                    End If

                    If pAppID = EnumApps.StockIssue Then
                        _sbSQL.Append("( TRANSACTION_ID =").Append(pTransactions.GetKey(0)).Append(" OR ID = '")
                        _sbSQL.Append(pTransactions.GetKey(0)).Append("' )")
                        If (pDeviceId <> String.Empty) Then _sbSQL.Append(" AND DEVICE_ID='").Append(pDeviceId).Append("'")
                        If Not IsNothing(pDownloadDateTime) Then _sbSQL.Append(" AND START_DT_TIME='").Append(pDownloadDateTime).Append("'")
                    Else
                        _sbSQL.Append("TRANSACTION_ID =" & pTransactions.GetKey(0))
                    End If

                    ' if its a single transaction do a quick executescalar
                    Try
                        If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Transaction Status with the following SQL... " & _
                                                            vbCrLf & _sbSQL.ToString)

                        pTransactions(pTransactions.GetKey(0)) = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & _sbSQL.ToString & vbCrLf & ex.ToString)
                        GetTransactionStatus = ATPAR_E_LOCALDBSELECTFAIL
                        Exit Function
                    End Try

                ElseIf _TransCount > 1 Then
                    ' if there are more than one transactions, make a SQL using IN (...)
                    Dim _TransList(_TransCount) As String
                    For i As Integer = 0 To _TransCount - 1
                        _TransList(i) = pTransactions.GetKey(i)
                    Next
                    Dim _paramListStr As String = String.Join(",", _TransList, 0, _TransCount)
                    _sbSQL.Append("TRANSACTION_ID IN (" & _paramListStr & ")")

                    ' if there is more than one get all of them
                    Dim _ds As DataSet
                    Try
                        If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Transaction Statuses with the following SQL... " & _
                                        vbCrLf & _sbSQL.ToString)

                        _ds = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & _sbSQL.ToString & vbCrLf & ex.ToString)
                        GetTransactionStatus = ATPAR_E_LOCALDBSELECTFAIL
                        Exit Function
                    End Try

                    Try

                        If Not _ds Is Nothing Then
                            For i As Integer = 0 To _ds.Tables(0).Rows.Count - 1
                                pTransactions(_ds.Tables(0).Rows(i).Item("TRANSACTION_ID")) = _ds.Tables(0).Rows(i).Item("STATUS")
                            Next
                        End If
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to save parameters " & _sbSQL.ToString & _
                                                            vbCrLf & _ds.GetXml & vbCrLf & ex.ToString)
                        GetTransactionStatus = E_SERVERERROR
                        Exit Function
                    End Try

                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " error creating SQL " & _sbSQL.ToString & vbCrLf & ex.ToString)
                GetTransactionStatus = E_SERVERERROR
                Exit Function
            End Try


            ' print out the values we received for debugging
            If log.IsInfoEnabled Then
                Dim _sb As New Text.StringBuilder
                _sb.Append(" Got the following Transactions Values : " & vbCrLf)
                For Each i As DictionaryEntry In pTransactions
                    _sb.Append("TransactionID : " & i.Key & ", Status : " & i.Value & vbCrLf)
                Next
                log.Info(_sb.ToString)
            End If

            GetTransactionStatus = ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error getting status for transactions" & ex.ToString)
            GetTransactionStatus = E_SERVERERROR
            Exit Function
        End Try

    End Function

    Public Function GetAtparLatestValues(ByVal appId As String, ByVal fieldName As String, ByRef latestVal As Long) As Long


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _StatusCode As Long = -1

        Try
            _strSQL = "SELECT LATEST_VALUE FROM MT_ATPAR_LATEST_VALUES WHERE APP_ID=" & appId & " AND FIELD_ID='" & fieldName & "'"

            If log.IsDebugEnabled Then log.Debug(_strSQL)

            latestVal = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL))

            Try
                latestVal = latestVal + 1
                _strSQL = "UPDATE MT_ATPAR_LATEST_VALUES SET LATEST_VALUE=" & latestVal & " WHERE APP_ID=" & appId & " AND FIELD_ID='" & fieldName & "'"

                If log.IsInfoEnabled Then log.Info(_strSQL)

                m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strSQL))
            Catch ex As Exception
                GetAtparLatestValues = ATPAR_E_LOCALDBUPDATEFAIL
                If log.IsFatalEnabled Then log.Fatal("ATPAR_E_LOCALDBUPDATEFAIL :" & ex.ToString)
                Exit Function
            End Try
            _StatusCode = ATPAR_OK
            GetAtparLatestValues = _StatusCode
        Catch ex As Exception
            GetAtparLatestValues = ATPAR_E_LOCALDBSELECTFAIL
            If log.IsFatalEnabled Then log.Fatal("ATPAR_E_LOCALDBSELECTFAIL :" & ex.ToString)
            Exit Function
        End Try

    End Function

    Public Function InsertTransaction(ByVal pTransactionDetails As AtPar_Transaction_Entity, Optional ByVal trans As SqlTransaction = Nothing) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _sbSQL As New StringBuilder
        Dim _StatusCode As Long = -1

        If (Len(pTransactionDetails.TransactionId) = 0 Or Len(pTransactionDetails.ApplicationId) = 0) Then
            InsertTransaction = E_INVALIDPARAMETER
            If log.IsWarnEnabled Then log.Warn("E_INVALIDPARAMETER")
            Exit Function
        End If

        If Len(pTransactionDetails.DownloadDateTime) = 0 Then
            pTransactionDetails.DownloadDateTime = Now
        End If

        'suppressing single quotes with escape character
        If InStr(pTransactionDetails.Description, "'") > 0 Then
            pTransactionDetails.Description = Replace(pTransactionDetails.Description, "'", "''")
        End If

        _sbSQL.Append("INSERT INTO MT_ATPAR_TRANSACTION (TRANSACTION_ID, APP_ID, ID, " & _
                    "BUSINESS_UNIT, STATUS, TOTAL_REC_DOWNLOADED, DOWNLOAD_DT_TIME, " & _
                    "DOWNLOAD_USERID, USER_ID, DEVICE_ID, UPDATE_DT_TIME ")

        If Not String.IsNullOrEmpty(pTransactionDetails.Description) Then
            _sbSQL.Append(", DESCR")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData1) Then
            _sbSQL.Append(", REPORT_DATA_1")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData2) Then
            _sbSQL.Append(", REPORT_DATA_2")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData3) Then
            _sbSQL.Append(", REPORT_DATA_3")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData4) Then
            _sbSQL.Append(", REPORT_DATA_4")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData5) Then
            _sbSQL.Append(", REPORT_DATA_5")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData6) Then
            If Not (pTransactionDetails.ReportData6 = Date.MinValue) Then
                _sbSQL.Append(", REPORT_DATA_6")
            End If
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData7) Then
            If Not (pTransactionDetails.ReportData7 = Date.MinValue) Then
                _sbSQL.Append(", REPORT_DATA_7")
            End If
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData8) Then
            _sbSQL.Append(", REPORT_DATA_8")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData9) Then
            _sbSQL.Append(", REPORT_DATA_9")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData10) Then
            _sbSQL.Append(", REPORT_DATA_10")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData11) Then
            _sbSQL.Append(", REPORT_DATA_11")
        End If


        If Not String.IsNullOrEmpty(pTransactionDetails.StartDateTime) Then
            If Not (pTransactionDetails.StartDateTime = Date.minvalue) Then
                _sbSQL.Append(", START_DT_TIME")
            End If
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.EndDateTime) Then
            If Not (pTransactionDetails.EndDateTime = Date.minvalue) Then
                _sbSQL.Append(", END_DT_TIME")
            End If
        End If

        'Added only for point of use as scan count needs to be populated for POU while inserting transaction itself
        If pTransactionDetails.ApplicationId = EnumApps.PointOfUse Then
            _sbSQL.Append(", SCANS_COUNT")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.TotalRecordSent) Then
            _sbSQL.Append(", TOTAL_REC_SENT")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData12) Then
            _sbSQL.Append(", REPORT_DATA_12")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData13) Then
            _sbSQL.Append(", REPORT_DATA_13")
        End If

        _sbSQL.Append(") VALUES (" & pTransactionDetails.TransactionId & ", " & pTransactionDetails.ApplicationId & ", '" & pTransactionDetails.ID & "', '" & pTransactionDetails.BusinessUnit & "', ")
        _sbSQL.Append(" '" & pTransactionDetails.Status & "', " & pTransactionDetails.TotalRecordDownloaded & "")

        If Not String.IsNullOrEmpty(pTransactionDetails.DownloadDateTime) Then
            _sbSQL.Append(",'" & Now & "'")
        Else
            _sbSQL.Append(",'" & pTransactionDetails.DownloadDateTime & "'")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.DownloadUserId) Then
            _sbSQL.Append(",'" & pTransactionDetails.DownloadUserId & "'")
        Else
            _sbSQL.Append(",'" & pTransactionDetails.UserId & "'")

        End If
        _sbSQL.Append(", '" & pTransactionDetails.UserId & "','" & pTransactionDetails.DeviceId & "','" & Now & "'")

        If Not String.IsNullOrEmpty(pTransactionDetails.Description) Then
            _sbSQL.Append(", '" & pTransactionDetails.Description & "'")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData1) Then
            _sbSQL.Append(", '" & pTransactionDetails.ReportData1 & "'")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData2) Then
            _sbSQL.Append(", '" & pTransactionDetails.ReportData2 & "'")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData3) Then
            _sbSQL.Append(", '" & pTransactionDetails.ReportData3 & "'")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData4) Then
            _sbSQL.Append(", '" & pTransactionDetails.ReportData4 & "'")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData5) Then
            _sbSQL.Append(", '" & pTransactionDetails.ReportData5 & "'")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData6) Then
            If Not (pTransactionDetails.ReportData6 = Date.MinValue) Then
                _sbSQL.Append(", '" & pTransactionDetails.ReportData6 & "'")
            End If

        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData7) Then
            If Not (pTransactionDetails.ReportData7 = Date.MinValue) Then
                _sbSQL.Append(", " & pTransactionDetails.ReportData7 & "")
            End If

        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData8) Then
            _sbSQL.Append(", '" & pTransactionDetails.ReportData8 & "'")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData9) Then
            _sbSQL.Append(", " & pTransactionDetails.ReportData9)
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData10) Then
            _sbSQL.Append(", " & pTransactionDetails.ReportData10)
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData11) Then
            _sbSQL.Append(", " & pTransactionDetails.ReportData11)
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.StartDateTime) Then
            If Not (pTransactionDetails.StartDateTime = Date.MinValue) Then
                _sbSQL.Append(", '" & pTransactionDetails.StartDateTime & "'")
            End If
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.EndDateTime) Then
            If Not (pTransactionDetails.EndDateTime = Date.minvalue) Then
                _sbSQL.Append(", '" & pTransactionDetails.EndDateTime & "'")
            End If
        End If

        'Added only for point of use as scan count needs to be populated for POU while inserting transaction itself
        If pTransactionDetails.ApplicationId = EnumApps.PointOfUse Then
            _sbSQL.Append(", " & pTransactionDetails.ScansCount & "")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.TotalRecordSent) Then
            _sbSQL.Append(", " & pTransactionDetails.TotalRecordSent & "")
        End If



        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData12) Then
            _sbSQL.Append(", '" & pTransactionDetails.ReportData12 & "'")
        End If

        If Not String.IsNullOrEmpty(pTransactionDetails.ReportData13) Then
            _sbSQL.Append(", '" & pTransactionDetails.ReportData13 & "')")
        Else
            _sbSQL.Append(")")
        End If


        If log.IsInfoEnabled Then log.Info("Query to insert into MT_ATPAR_TRANSACTION :" & _sbSQL.ToString)

        Try
            If trans Is Nothing Then
                InsertTransaction = m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
            Else
                InsertTransaction = m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), trans)
            End If
        Catch ex As Exception
            InsertTransaction = ATPAR_E_LOCALDBINSERTFAIL
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : ATPAR_E_LOCALDBINSERTFAIL : with Exception ..." & ex.ToString & vbCrLf & _
                                                                        "SQL Query to insert into MT_ATPAR_TRANSACTION..." & vbCrLf & _sbSQL.ToString)
            Exit Function
        End Try
        InsertTransaction = ATPAR_OK
    End Function


    Public Function UpdateTransaction(ByVal pTransactionDetails As AtPar_Transaction_Entity, _
                                     Optional ByVal trans As SqlTransaction = Nothing) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _sbSQL As New StringBuilder

        Try
            _sbSQL.Append("UPDATE MT_ATPAR_TRANSACTION SET STATUS = '").Append(pTransactionDetails.Status)
            _sbSQL.Append("', UPDATE_DT_TIME = GetDate()")

            If Not String.IsNullOrEmpty(pTransactionDetails.StartDateTime) Then
                If Len(pTransactionDetails.StartDateTime) > 0 Then
                    If Not pTransactionDetails.StartDateTime = Date.MinValue Then
                        _sbSQL.Append(", START_DT_TIME = '")
                        _sbSQL.Append(pTransactionDetails.StartDateTime)
                        _sbSQL.Append("'")
                    End If
                End If
            End If

            If Len(pTransactionDetails.EndDateTime) > 0 Then
                If Not String.IsNullOrEmpty(pTransactionDetails.EndDateTime) Then
                    If Not pTransactionDetails.EndDateTime = Date.MinValue Then
                        _sbSQL.Append(", END_DT_TIME = '" & pTransactionDetails.EndDateTime & "'")
                    End If
                End If
            End If
            _sbSQL.Append(", USER_ID = '" & pTransactionDetails.UserId & "'")

            If pTransactionDetails.TotalRecordSent <> 0 Then
                _sbSQL.Append(", TOTAL_REC_SENT = " & pTransactionDetails.TotalRecordSent)
            End If

            If pTransactionDetails.StatusCode <> 0 Then
                _sbSQL.Append(", STATUS_CODE = " & pTransactionDetails.StatusCode)
            End If
            If Len(pTransactionDetails.Description) > 0 Then
                _sbSQL.Append(", DESCR = '" & pTransactionDetails.Description & "' ")
            End If
            _sbSQL.Append(", SCANS_COUNT = " & pTransactionDetails.ScansCount)
            If Len(pTransactionDetails.ReportData3) > 0 Then
                _sbSQL.Append(", REPORT_DATA_3 = '" & pTransactionDetails.ReportData3 & "' ")
            End If

            If Len(pTransactionDetails.ReportData8) > 0 Then
                _sbSQL.Append(", REPORT_DATA_8 = '" & pTransactionDetails.ReportData8 & "' ")
            End If

            If Not IsDBNull(pTransactionDetails.ReportData9) Then
                If pTransactionDetails.ReportData9 > 0 Then
                    _sbSQL.Append(", REPORT_DATA_9 = '" & pTransactionDetails.ReportData9 & "' ")
                End If
            End If

            If Not IsDBNull(pTransactionDetails.ReportData10) Then
                If Len(pTransactionDetails.ReportData10) > 0 Then
                    _sbSQL.Append(", REPORT_DATA_10 = '" & pTransactionDetails.ReportData10 & "' ")
                End If
            End If

            _sbSQL.Append(" WHERE TRANSACTION_ID = " & pTransactionDetails.TransactionId & " And APP_ID = " & pTransactionDetails.ApplicationId)

            Try
                If log.IsInfoEnabled Then log.Info(methodBaseName & " Updating transaction with the following sql... " & _
                      vbCrLf & _sbSQL.ToString)
                If trans Is Nothing Then
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                Else
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), trans)
                End If

            Catch sqlex As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlex) & _
                                                                vbCrLf & "Executed Query is ....." & vbCrLf & _sbSQL.ToString)
                Return ATPAR_E_LOCALDBUPDATEFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " ATPAR_E_LOCALDBUPDATEFAIL " & vbCrLf & ex.ToString & _
                                                                vbCrLf & "Executed Query is ....." & vbCrLf & _sbSQL.ToString)
                Return ATPAR_E_LOCALDBUPDATEFAIL
            End Try

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error Updating Transaction " & ex.ToString)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try
    End Function

    Public Function GetTransactionId(ByVal pAppID As Short, ByVal pclientTransactionID As Long, ByRef pTransactionID As Long, _
                                     Optional ByVal pDeviceId As String = "", _
                                     Optional ByVal pDownloadDateTime As String = "")
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As Text.StringBuilder = Nothing
        Dim _Cmd As SqlCommand
        _Cmd = New SqlCommand
        Dim _StatusCode As Long = -1

        Try
            _sbSQL = New Text.StringBuilder

            _sbSQL.Append("SELECT TRANSACTION_ID ")
            _sbSQL.Append("FROM MT_ATPAR_TRANSACTION " & _
                              "WHERE APP_ID = " & pAppID & " AND ")
            '_sbSQL.Append("ID =" & pclientTransactionID)
			
            If (pAppID = EnumApps.PointOfUse) Then

                _sbSQL.Append("REPORT_DATA_13 = '" & pclientTransactionID & "'")
            Else
                _sbSQL.Append("ID = '" & pclientTransactionID & "'")
            End If



            If (pDeviceId <> String.Empty) Then _sbSQL.Append(" AND DEVICE_ID='").Append(pDeviceId).Append("'")
            If (pDownloadDateTime <> String.Empty) Then _sbSQL.Append(" AND START_DT_TIME='").Append(pDownloadDateTime).Append("'")

            _Cmd.CommandType = CommandType.Text
            _Cmd.CommandText = _sbSQL.ToString
            _Cmd.Connection = m_LocalDB.CreateConnection

            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Getting Transaction ID with following Sql.." & vbCrLf & _sbSQL.ToString)

            pTransactionID = m_LocalDB.ExecuteScalar(_Cmd)

            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Transaction ID returned is : " & pTransactionID)
            Return ATPAR_OK
        Catch sqlex As SqlException
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Failed to execute following Sql.." & vbCrLf & _sbSQL.ToString)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Finally
            _Cmd.Dispose()
        End Try
    End Function

    Public Function GetMaxLineNumber(ByVal pclientTransactionID As Long, ByRef maxLineNum As Long)
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As Text.StringBuilder = Nothing
        Dim _Cmd As SqlCommand
        _Cmd = New SqlCommand
        Dim _StatusCode As Long = -1

        Try
            _sbSQL = New Text.StringBuilder

            _sbSQL.Append("SELECT MAX(LINE_NBR) ")
            _sbSQL.Append("FROM MT_STIS_DETAILS " & _
                              "WHERE ")
            _sbSQL.Append("TRANSACTION_ID =" & pclientTransactionID)

            _Cmd.CommandType = CommandType.Text
            _Cmd.CommandText = _sbSQL.ToString
            _Cmd.Connection = m_LocalDB.CreateConnection

            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Getting MaxLine number with following Sql.." & vbCrLf & _sbSQL.ToString)

            If Not IsDBNull(m_LocalDB.ExecuteScalar(_Cmd)) Then
                maxLineNum = m_LocalDB.ExecuteScalar(_Cmd)
            Else
                maxLineNum = -1
            End If


            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Max Line number returned is : " & maxLineNum)
            Return ATPAR_OK
        Catch sqlex As SqlException
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Failed to execute following Sql.." & vbCrLf & _sbSQL.ToString)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
            Return ATPAR_E_LOCALDBSELECTFAIL
        Finally
            _Cmd.Dispose()
        End Try
    End Function

    Public Function GetTransactionId(ByVal pAppId As Short, ByRef ptransactionId As Long, Optional ByVal ptrans As SqlTransaction = Nothing) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            Dim _sbSQLLog As New StringBuilder

            Dim _strSQL As String = String.Empty
            Dim _StatusCode As Long = -1

            Dim sql_param_appid As SqlParameter = New SqlParameter("@AppID", SqlDbType.Int)
            sql_param_appid.Value = pAppId

            Dim sql_param_transaction_id As SqlParameter = New SqlParameter("@TransactionID", SqlDbType.Int)
            sql_param_transaction_id.Direction = ParameterDirection.Output

            Dim _Cmd As SqlCommand
            _Cmd = New SqlCommand

            If log.IsInfoEnabled Then

                _sbSQLLog.Append("declare @P1 int " & vbCrLf)
                _sbSQLLog.Append("exec SP_GetTransactionID @AppID = 7, @TransactionID = @P1 output " & vbCrLf)
                _sbSQLLog.Append("select @P1")

                log.Info("Calling SP_GetTransactionID with the following syntax.." & vbCrLf & _sbSQLLog.ToString)
            End If

            Try


                _Cmd.CommandType = CommandType.StoredProcedure
                _Cmd.CommandText = "SP_GetTransactionID"
                _Cmd.Parameters.Add(sql_param_appid)
                _Cmd.Parameters.Add(sql_param_transaction_id)

                If ptrans Is Nothing Then
                    _Cmd.Connection = m_LocalDB.CreateConnection
                Else
                    _Cmd.Connection = ptrans.Connection
                End If

                m_LocalDB.ExecuteNonQuery(_Cmd)

                ptransactionId = sql_param_transaction_id.Value

                Return ATPAR_OK

            Catch sqlex As SqlException

                If log.IsFatalEnabled Then

                    log.Fatal(methodBaseName & vbCrLf & GetSQLExceptionMessageString(sqlex) & vbCrLf)
                    _sbSQLLog.Remove(0, _sbSQLLog.Length)
                    _sbSQLLog.Append("declare @P1 int " & vbCrLf)
                    _sbSQLLog.Append("set @P1=73 " & vbCrLf)
                    _sbSQLLog.Append("exec SP_GetTransactionID @AppID = 7, @TransactionID = @P1 output " & vbCrLf)
                    _sbSQLLog.Append("select @P1")

                    log.Fatal("Calling SP_GetTransactionID with the following syntax.." & vbCrLf & _sbSQLLog.ToString)
                End If
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Finally
                _Cmd.Dispose()
            End Try
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Error Updating Transaction " & ex.ToString)
            Return ATPAR_E_LOCALDBSELECTFAIL
        End Try
    End Function

    Public Function InsertDeviation(ByVal pDeviationDetails As AtPar_Deviation_Entity, Optional ByVal trans As SqlTransaction = Nothing) As Long
        '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
        '    Function: To Insert a deviation
        '    Parameters:
        '______________________________________________________________________________________________________________________
        '        Field Name  -   Cart Count  -  Cycle Count  -  Pick Plan    -      Putaway   -      Receiving
        '______________________________________________________________________________________________________________________
        '        BUSINESS_UNIT  BUSINESS_UNIT   BUSINESS_UNIT   BUSINESS_UNIT       BUSINESS_UNIT   BUSINESS_UNIT
        '        APP_ID             2                 3               5                 7               4
        '        KEY_1                          EVENT_ID        PICK_BATCH_ID       PLAN_ID         LINE_NBR
        '        KEY_2                                          PICK_LIST_LINENO    LINE_NBR        SCHED_NBR
        '        KEY_3                                                                              0 - Receive Deviation Report
        '                                                                                           1 - ASN Deviation Report
        '        KEY_4          CART_ID                                                             PO_ID
        '        KEY_5          COMPARTMENT     LOCATION                                            CARRIER_ID
        '        KEY_6          ITEM_ID         ITEM_ID
        '        REPORT_DATA_1  OPTIMAL_QTY     SYSTEM_QTY      QTY_REQUESTED       BASE_QTY        QTY_PO
        '        REPORT_DATA_2  COUNT_QTY       COUNT_QTY       QTY_ALLOCATED                       ASN_QTY
        '        REPORT_DATA_3                                  QTY                 QTY             QTY
        '        REPORT_DATA_4  TRANSACTION_ID  TRANSACTION_ID  TRANSACTION_ID      TRANSACTION_ID  TRANSACTION_ID
        '        Report_Data_5
        '        REPORT_DATA_6                                  ORDER_NO            PO_ID           UNIT_OF_MEASURE
        '        REPORT_DATA_7                                  LOCATION            VENDOR_ID       VENDOR_ID
        '        REPORT_DATA_8                                  ITEM_ID             ITEM_ID         ITEM_ID
        '        REPORT_DATA_9                                  DEPT_ID                             INVENTORY_ITEM
        '        REPORT_DATA_10                                 PICK_DATE           PUTAWAY_DATE
        '        REPORT_DATA_11  UPDATE_DATE    UPDATE_DATE     UPDATE_DATE         UPDATE_DATE     END_DT_TIME
        '        REPORT_DATA_12                                                                     ORIGIN BUSINESS UNIT
        '        USER_ID         USER ID        USER ID         USER_ID             USER_ID         USER_ID
        '        UPDATE_DATE     UPDATE_DATE    UPDATE_DATE                                         UPDATE_DATE
        '_______________________________________________________________________________________________________________________
        '    Returns:
        '       Success -ATPAR_OK
        '       Error - Status Code
        '           E_INVALIDPARAMETER - Invalid Parameter
        '           ATPAR_E_LOCALDBINSERTFAIL - Insert Failed
        ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _sbSQL As New StringBuilder
        Dim _StatusCode As Long = -1
        If (Len(pDeviationDetails.ApplicationId) = 0 Or Len(pDeviationDetails.BusinessUnit) = 0) Then
            _StatusCode = E_INVALIDPARAMETER
        Else
            _StatusCode = ATPAR_OK
        End If

        If _StatusCode = ATPAR_OK Then

            Try
                _sbSQL.Append("INSERT INTO MT_ATPAR_DEVIATION (APP_ID, BUSINESS_UNIT,KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, KEY_6 ")

                If Not IsNothing(pDeviationDetails.ReportData1) Then
                    _sbSQL.Append(", REPORT_DATA_1 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData2) Then
                    _sbSQL.Append(", REPORT_DATA_2 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData3) Then
                    _sbSQL.Append(", REPORT_DATA_3 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData4) Then
                    _sbSQL.Append(", REPORT_DATA_4 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData5) Then
                    _sbSQL.Append(", REPORT_DATA_5 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData6) Then
                    _sbSQL.Append(", REPORT_DATA_6 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData7) Then
                    _sbSQL.Append(", REPORT_DATA_7 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData8) Then
                    _sbSQL.Append(", REPORT_DATA_8 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData9) Then
                    _sbSQL.Append(", REPORT_DATA_9 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData10) Then
                    _sbSQL.Append(", REPORT_DATA_10 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData11) Then
                    _sbSQL.Append(", REPORT_DATA_11 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData12) Then
                    _sbSQL.Append(", REPORT_DATA_12 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData13) Then
                    _sbSQL.Append(", REPORT_DATA_13 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData14) Then
                    _sbSQL.Append(", REPORT_DATA_14 ")
                End If

                If Not IsNothing(pDeviationDetails.ReportData15) Then
                    _sbSQL.Append(", REPORT_DATA_15 ")
                End If

                If Not IsNothing(pDeviationDetails.UserId) Then
                    _sbSQL.Append(", USER_ID ")
                End If

                _sbSQL.Append(", UPDATE_DATE ")

                _sbSQL.Append(")Values(" & pDeviationDetails.ApplicationId & ", '" & pDeviationDetails.BusinessUnit & "', '" & pDeviationDetails.Key1 & "', '" & pDeviationDetails.Key2 & "', ' " & pDeviationDetails.Key3 & "', '" & pDeviationDetails.Key4 & "', '" & pDeviationDetails.Key5 & "', '" & pDeviationDetails.Key6 & "' ")

                If Not IsNothing(pDeviationDetails.ReportData1) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData1 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData2) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData2 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData3) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData3 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData4) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData4 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData5) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData5 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData6) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData6 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData7) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData7 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData8) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData8 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData9) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData9 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData10) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData10 & "'")
                End If
                'SB-0003981
                If Not IsNothing(pDeviationDetails.ReportData11) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData11 & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData12) Then
                    _sbSQL.Append(", '" & pDeviationDetails.ReportData12 & "'")
                End If


                If Not IsNothing(pDeviationDetails.ReportData13) Then
                    _sbSQL.Append(", '" & Replace(pDeviationDetails.ReportData13, "'", "''") & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData14) Then
                    _sbSQL.Append(", '" & Replace(pDeviationDetails.ReportData14, "'", "''") & "'")
                End If

                If Not IsNothing(pDeviationDetails.ReportData15) Then
                    _sbSQL.Append(", '" & Replace(pDeviationDetails.ReportData15, "'", "''") & "'")
                End If
                If Not IsNothing(pDeviationDetails.UserId) Then
                    _sbSQL.Append(", '" & pDeviationDetails.UserId & "'")
                End If

                If Not String.IsNullOrEmpty(pDeviationDetails.UpdateDate) Then
                    _sbSQL.Append(", '" & pDeviationDetails.UpdateDate & "')")
                Else
                    _sbSQL.Append(", GetDate())")

                End If

                If log.IsInfoEnabled Then log.Info(_sbSQL)

                If trans Is Nothing Then
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                Else
                    m_LocalDB.ExecuteNonQuery(trans, CommandType.Text, _sbSQL.ToString)
                End If


                _StatusCode = ATPAR_OK

            Catch ex As SqlException
                _StatusCode = ATPAR_E_LOCALDBINSERTFAIL
                If log.IsFatalEnabled Then log.Fatal("AtParUtils: InsertDeviation: SQL: " & _sbSQL.ToString & "Error Message:" & ex.Message.ToString & ":")
            Catch ex As Exception
                _StatusCode = ATPAR_E_LOCALDBINSERTFAIL
                If log.IsFatalEnabled Then log.Fatal("AtParUtils: InsertDeviation: SQL: " & _sbSQL.ToString & "Error Message:" & ex.Message.ToString & ":")
            End Try
        End If
        InsertDeviation = _StatusCode
    End Function

    Public Function UpdateDetailTransaction(ByVal pDetailTransaction As AtPar_Detail_Transaction_Entity, _
                                            Optional ByVal pTrans As SqlTransaction = Nothing, _
                                            Optional ByVal pUpdateQtyFlg As Boolean = False, _
											Optional ByVal pLineNoFlg As Boolean = False) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            Dim _StatusCode As Long = -1
            'Dim _strSQL As String = String.Empty
            Dim _sbSQL As New StringBuilder

            If (Len(pDetailTransaction.Transaction_Id) = 0 Or Len(pDetailTransaction.ApplicationId) = 0) Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " incorrect Transaction ID : " & pDetailTransaction.Transaction_Id & _
                                                    " or AppID : " & pDetailTransaction.ApplicationId)
                UpdateDetailTransaction = E_INVALIDPARAMETER
                Exit Function
            End If

            _sbSQL.Append("UPDATE MT_ATPAR_DETAIL_TRANSACTION SET STATUS = '").Append(pDetailTransaction.Status).Append("'")

            If Not IsNothing(pDetailTransaction.UserId) Then
                _sbSQL.Append(", USER_ID = '").Append(pDetailTransaction.UserId).Append("'")
            End If

            If Not IsNothing(pDetailTransaction.DownloadUserId) Then
                _sbSQL.Append(", DOWNLOAD_USER_ID = '").Append(pDetailTransaction.DownloadUserId).Append("'")
            End If


            If Not IsNothing(pDetailTransaction.KEY1) Then
                _sbSQL.Append(", KEY_1 = '").Append(pDetailTransaction.Key1).Append("'")
            End If
            If Not IsNothing(pDetailTransaction.KEY2) Then
                _sbSQL.Append(", KEY_2 = '").Append(pDetailTransaction.Key2).Append("'")
            End If
            If Not IsNothing(pDetailTransaction.KEY3) Then
                _sbSQL.Append(", KEY_3 = '").Append(pDetailTransaction.Key3).Append("'")
            End If
            If Not IsNothing(pDetailTransaction.KEY4) Then
                _sbSQL.Append(", KEY_4 = '").Append(pDetailTransaction.Key4).Append("'")
            End If
            If Not IsNothing(pDetailTransaction.KEY5) Then
                _sbSQL.Append(", KEY_5 = '").Append(pDetailTransaction.Key5).Append("'")
            End If
			
            If Not IsNothing(pDetailTransaction.StartDateTime) Then
				If Not (pDetailTransaction.StartDateTime = Date.MinValue) Then
					  _sbSQL.Append(", START_DT_TIME = '").Append(pDetailTransaction.StartDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
				End If
			End If
			
            If Not IsNothing(pDetailTransaction.EndDateTime) Then
				If Not (pDetailTransaction.EndDateTime = Date.MinValue) Then
					  _sbSQL.Append(", END_DT_TIME = '").Append(pDetailTransaction.EndDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
				End If
			End If

            If Not IsNothing(pDetailTransaction.UpdateDate) Then
                If Not (pDetailTransaction.UpdateDate = Date.MinValue) Then
                    _sbSQL.Append(", UPDATE_DATE = '").Append(pDetailTransaction.UpdateDate.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
                End If
            End If

            If Not IsNothing(pDetailTransaction.DeviceId) Then
                _sbSQL.Append(", DEVICE_ID = '").Append(pDetailTransaction.DeviceId).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData1) Then
                _sbSQL.Append(", REPORT_DATA_1 = '").Append(pDetailTransaction.ReportData1).Append("' ")
            End If

 
            If pLineNoFlg Then
            If Not IsNothing(pDetailTransaction.ReportData2) Then
			
                _sbSQL.Append(", REPORT_DATA_2 = '").Append(pDetailTransaction.ReportData2).Append("' ")
            End If
			End If

            If Not IsNothing(pDetailTransaction.ReportData3) Then
                _sbSQL.Append(", REPORT_DATA_3 = '").Append(pDetailTransaction.ReportData3).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData4) Then
                _sbSQL.Append(", REPORT_DATA_4 = '").Append(Replace(pDetailTransaction.ReportData4, "'", "''")).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData5) Then
                _sbSQL.Append(", REPORT_DATA_5 = '").Append(Replace(pDetailTransaction.ReportData5, "'", "''")).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData6) Then
                _sbSQL.Append(", REPORT_DATA_6 = '").Append(pDetailTransaction.ReportData6).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData7) Then
                _sbSQL.Append(", REPORT_DATA_7 = '").Append(pDetailTransaction.ReportData7).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData8) Then
                _sbSQL.Append(", REPORT_DATA_8 = '").Append(pDetailTransaction.ReportData8).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData9) Then
                _sbSQL.Append(", REPORT_DATA_9 = '").Append(pDetailTransaction.ReportData9).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData11) Then
                _sbSQL.Append(", REPORT_DATA_11 = '").Append(Replace(pDetailTransaction.ReportData11, "'", "''")).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData12) Then
                If Not (pDetailTransaction.ReportData12 = Date.MinValue) Then
                    _sbSQL.Append(", REPORT_DATA_12 = '").Append(pDetailTransaction.ReportData12.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
                End If
            End If

            If Not IsNothing(pDetailTransaction.ReportData13) Then
                If Not (pDetailTransaction.ReportData13 = Date.MinValue) Then
                    _sbSQL.Append(", REPORT_DATA_13 = '").Append(pDetailTransaction.ReportData13.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
                End If
            End If

            If Not IsNothing(pDetailTransaction.ReportData14) Then
                _sbSQL.Append(", REPORT_DATA_14 = '").Append(pDetailTransaction.ReportData14).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData15) Then
                _sbSQL.Append(", REPORT_DATA_15 = '").Append(pDetailTransaction.ReportData15).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData16) Then
                _sbSQL.Append(", REPORT_DATA_16 = '").Append(pDetailTransaction.ReportData16).Append("' ")
            End If

            If pUpdateQtyFlg Then
                If Not IsNothing(pDetailTransaction.ReportData17) Then
                    _sbSQL.Append(", REPORT_DATA_17 = '").Append(pDetailTransaction.ReportData17).Append("' ")
                End If
            End If

            If Not IsNothing(pDetailTransaction.ReportData18) Then
                If Not (pDetailTransaction.ReportData18 = Date.MinValue) Then
                    _sbSQL.Append(", REPORT_DATA_18 = '").Append(pDetailTransaction.ReportData18.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
                    '    Else
                    '        If EnumApps.Pharmacy = pDetailTransaction.ApplicationId Then
                    '            If pDetailTransaction.Status = 13 Or pDetailTransaction.Status = 1 Then
                    '                _sbSQL.Append(", REPORT_DATA_18 = NULL")
                    '            End If
                    '        End If
                    '    End If
                    'Else
                    '    If EnumApps.Pharmacy = pDetailTransaction.ApplicationId Then
                    '        If pDetailTransaction.Status = 13 Or pDetailTransaction.Status = 1 Then
                    '            _sbSQL.Append(", REPORT_DATA_18 = NULL")
                    '        End If
                End If
            End If

            If Not IsNothing(pDetailTransaction.ReportData20) Then
                _sbSQL.Append(", REPORT_DATA_20 = '").Append(pDetailTransaction.ReportData20).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData26) Then
                _sbSQL.Append(", REPORT_DATA_26 = '").Append(Replace(pDetailTransaction.ReportData26, "'", "''")).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData27) Then
                _sbSQL.Append(", REPORT_DATA_27 = '").Append(pDetailTransaction.ReportData27).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData28) Then
                _sbSQL.Append(", REPORT_DATA_28 = '").Append(pDetailTransaction.ReportData28).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData29) Then
                _sbSQL.Append(", REPORT_DATA_29 = '").Append(pDetailTransaction.ReportData29).Append("' ")
            End If

            'If Not IsNothing(pDetailTransaction.SignatureId) Then
            '   _sbSQL.Append(", SIGNATURE_ID = ").Append(pDetailTransaction.SignatureId)
            'End If

            If pDetailTransaction.SignatureId > 0 Then
                _sbSQL.Append(", SIGNATURE_ID = ").Append(pDetailTransaction.SignatureId)
            End If


            If Not IsNothing(pDetailTransaction.StatusCode) Then
                _sbSQL.Append(", STATUS_CODE = ").Append(pDetailTransaction.StatusCode)
            End If

            If Not IsNothing(pDetailTransaction.ReportData30) Then
                If Not (pDetailTransaction.ReportData30 = Date.MinValue) Then
                    _sbSQL.Append(", REPORT_DATA_30 = '").Append(pDetailTransaction.ReportData30.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
                End If
            End If

                If Not IsNothing(pDetailTransaction.ReportData31) Then
                    _sbSQL.Append(", REPORT_DATA_31 = '").Append(pDetailTransaction.ReportData31).Append("'")
                End If

                If Not IsNothing(pDetailTransaction.ReportData32) Then
                    _sbSQL.Append(", REPORT_DATA_32 = '").Append(pDetailTransaction.ReportData32).Append("'")
            End If

            If Not IsNothing(pDetailTransaction.ReportData47) Then
                _sbSQL.Append(", REPORT_DATA_47 = '").Append(pDetailTransaction.ReportData47).Append("' ")
            End If

            If Not IsNothing(pDetailTransaction.ReportData45) Then
                If Not (pDetailTransaction.ReportData45 = Date.MinValue) Then
                    _sbSQL.Append(", REPORT_DATA_45 = '").Append(pDetailTransaction.ReportData45.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
                Else
                    If EnumApps.Pharmacy = pDetailTransaction.ApplicationId Then
                        If pDetailTransaction.Status = 13 Or pDetailTransaction.Status = 1 Then
                            _sbSQL.Append(", REPORT_DATA_45 = NULL")
                        End If
                    End If
                End If
            Else
                If EnumApps.Pharmacy = pDetailTransaction.ApplicationId Then
                    If pDetailTransaction.Status = 13 Or pDetailTransaction.Status = 1 Then
                        _sbSQL.Append(", REPORT_DATA_45 = NULL")
                    End If
                End If
            End If
                _sbSQL.Append(" WHERE TRANSACTION_ID = ").Append(pDetailTransaction.Transaction_Id).Append(" And APP_ID = ").Append(pDetailTransaction.ApplicationId)


                If log.IsInfoEnabled Then log.Info(methodBaseName & " Updating Transaction With the following SQL... " & _
                                                    vbCrLf & _sbSQL.ToString())

                Try

                    If pTrans Is Nothing Then
                        m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()))
                    Else
                        m_LocalDB.ExecuteNonQuery(pTrans, CommandType.Text, _sbSQL.ToString())
                    End If


                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
                    Return ATPAR_E_LOCALDBUPDATEFAIL
                End Try

                Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ex.ToString)
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' To Insert a Transaction
    ''' </summary>
    ''' <param name="pDetailTransaction"></param>
    ''' <param name="pTrans"></param>
    ''' <returns>ATPAR_OK</returns>
    ''' <remarks></remarks>
    Public Function InsertDetailTransaction(ByVal pDetailTransaction As AtPar_Detail_Transaction_Entity, _
                                            Optional ByVal pTrans As SqlTransaction = Nothing) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _sbSQLValues As New StringBuilder
        Dim _StatusCode As Long = -1

        If (Len(pDetailTransaction.Transaction_Id) = 0 Or Len(pDetailTransaction.ApplicationId) = 0 Or Len(pDetailTransaction.UserId) = 0 Or Len(pDetailTransaction.DeviceId) = 0) Then
            InsertDetailTransaction = E_INVALIDPARAMETER
            If log.IsWarnEnabled Then log.Warn("E_INVALIDPARAMETER: ")
            Exit Function
        End If

        _sbSQL.Append("INSERT INTO MT_ATPAR_DETAIL_TRANSACTION ")
        _sbSQL.Append("(TRANSACTION_ID, APP_ID, ")
        _sbSQL.Append("USER_ID, DOWNLOAD_USER_ID, ")
        _sbSQL.Append("DEVICE_ID, UPDATE_DATE ")

        _sbSQLValues.Append(") VALUES (").Append(pDetailTransaction.Transaction_Id).Append(", ").Append(pDetailTransaction.ApplicationId).Append(", ")
        _sbSQLValues.Append("'").Append(pDetailTransaction.UserId).Append("', '").Append(pDetailTransaction.UserId).Append("', ")
        _sbSQLValues.Append("'").Append(pDetailTransaction.DeviceId).Append("', '").Append(Now()).Append("'")

        If Not IsNothing(pDetailTransaction.Key1) Then
            _sbSQL.Append(", KEY_1 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.Key1).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.Key2) Then
            _sbSQL.Append(", KEY_2 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.Key2).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.Key3) Then
            _sbSQL.Append(", KEY_3 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.Key3).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.Key4) Then
            _sbSQL.Append(", KEY_4 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.Key4).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.Key5) Then
            _sbSQL.Append(", KEY_5 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.Key5).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.Key6) Then
            _sbSQL.Append(", KEY_6 ")
            _sbSQLValues.Append(", ").Append(pDetailTransaction.Key6)
        End If

        If Not IsNothing(pDetailTransaction.Key7) Then
            _sbSQL.Append(", KEY_7 ")
            _sbSQLValues.Append(", ").Append(pDetailTransaction.Key7)
        End If

        If Not IsNothing(pDetailTransaction.Key8) Then
            _sbSQL.Append(", KEY_8 ")
            _sbSQLValues.Append(", ").Append(pDetailTransaction.Key8)
        End If

        If Not IsNothing(pDetailTransaction.Status) Then
            _sbSQL.Append(", STATUS ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.Status).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData1) Then
            _sbSQL.Append(", REPORT_DATA_1 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData1).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData2) Then
            _sbSQL.Append(", REPORT_DATA_2 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData2).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData3) Then
            _sbSQL.Append(", REPORT_DATA_3 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData3).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData4) Then
            _sbSQL.Append(", REPORT_DATA_4 ")
            _sbSQLValues.Append(", '").Append(Replace(pDetailTransaction.ReportData4, "'", "''")).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData5) Then
            _sbSQL.Append(", REPORT_DATA_5 ")
            _sbSQLValues.Append(", '").Append(Replace(pDetailTransaction.ReportData5, "'", "''")).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData5) Then
            _sbSQL.Append(", REPORT_DATA_40 ")
            _sbSQLValues.Append(", '").Append(Replace(pDetailTransaction.ReportData5, "'", "''")).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData6) Then
            _sbSQL.Append(", REPORT_DATA_6 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData6).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData7) Then
            _sbSQL.Append(", REPORT_DATA_7 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData7).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData8) Then
            _sbSQL.Append(", REPORT_DATA_8 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData8).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData9) Then
            _sbSQL.Append(", REPORT_DATA_9 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData9).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData10) Then
            _sbSQL.Append(", REPORT_DATA_10 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData10).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData11) Then
            _sbSQL.Append(", REPORT_DATA_11 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData11).Append("'")
        End If

        If Not String.IsNullOrEmpty(pDetailTransaction.ReportData12) Then
            If Not (pDetailTransaction.ReportData12 = Date.MinValue) Then
                _sbSQL.Append(", REPORT_DATA_12 ")
                _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData12.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
            End If

        End If

        If Not String.IsNullOrEmpty(pDetailTransaction.ReportData13) Then
            If Not (pDetailTransaction.ReportData13 = Date.MinValue) Then
                _sbSQL.Append(", REPORT_DATA_13 ")
                _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData13.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
            End If
        End If

        If Not IsNothing(pDetailTransaction.ReportData14) Then
            _sbSQL.Append(", REPORT_DATA_14 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData14).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData16) Then
            _sbSQL.Append(", REPORT_DATA_16 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData16).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData17) Then
            _sbSQL.Append(", REPORT_DATA_17 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData17).Append("'")
        End If

        'Changes: Inserting the NON_PO_ITEM value
        If Not IsNothing(pDetailTransaction.NonPoItem) Then
            _sbSQL.Append(", NON_PO_ITEM ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.NonPoItem).Append("'")
        End If

        'NonPo Item changes 
        If Not IsNothing(pDetailTransaction.ReportData15) Then
            _sbSQL.Append(", REPORT_DATA_15 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData15).Append("'")
        End If

        If Not String.IsNullOrEmpty(pDetailTransaction.ReportData18) Then
            If Not (pDetailTransaction.ReportData18 = Date.MinValue) Then
                _sbSQL.Append(", REPORT_DATA_18 ")
                _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData18.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
            End If
        End If

        If Not IsNothing(pDetailTransaction.ReportData19) Then
            _sbSQL.Append(", REPORT_DATA_19 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData19).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData20) Then
            _sbSQL.Append(", REPORT_DATA_20 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData20).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData21) Then
            _sbSQL.Append(", REPORT_DATA_21 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData21).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData22) Then
            _sbSQL.Append(", REPORT_DATA_22 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData22).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData23) Then
            _sbSQL.Append(", REPORT_DATA_23 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData23).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData24) Then
            _sbSQL.Append(", REPORT_DATA_24 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData24).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData25) Then
            _sbSQL.Append(", REPORT_DATA_25 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData25).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData26) Then
            _sbSQL.Append(", REPORT_DATA_26 ")
            _sbSQLValues.Append(", '").Append(Replace(pDetailTransaction.ReportData26, "'", "''")).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData27) Then
            _sbSQL.Append(", REPORT_DATA_27 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData27).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData28) Then
            _sbSQL.Append(", REPORT_DATA_28 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData28).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData29) Then
            _sbSQL.Append(", REPORT_DATA_29 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData29).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.SignatureId) Then
            _sbSQL.Append(", SIGNATURE_ID ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.SignatureId).Append("'")
        End If

        If Not String.IsNullOrEmpty(pDetailTransaction.ReportData30) Then
            If Not (pDetailTransaction.ReportData30 = Date.MinValue) Then
                _sbSQL.Append(", REPORT_DATA_30 ")
                _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData30.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
            End If
        End If

        If Not IsNothing(pDetailTransaction.ReportData31) Then
            _sbSQL.Append(", REPORT_DATA_31 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData31).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData32) Then
            _sbSQL.Append(", REPORT_DATA_32 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData32).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData33) Then
            _sbSQL.Append(", REPORT_DATA_33 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData33).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData34) Then
            _sbSQL.Append(", REPORT_DATA_34 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData34).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData35) Then
            _sbSQL.Append(", REPORT_DATA_35 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData35).Append("'")
        End If
		
        If Not IsNothing(pDetailTransaction.StartDateTime) Then
            If Not (pDetailTransaction.StartDateTime = Date.MinValue) Then
                _sbSQL.Append(", START_DT_TIME ") 
                _sbSQLValues.Append(", '").Append(pDetailTransaction.StartDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
            End If
        End If

        If Not IsNothing(pDetailTransaction.EndDateTime) Then
            If Not (pDetailTransaction.EndDateTime = Date.MinValue) Then
                _sbSQL.Append(", END_DT_TIME ")
                _sbSQLValues.Append(", '").Append(pDetailTransaction.EndDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'")
            End If
        End If

        If Not IsNothing(pDetailTransaction.ReportData36) Then
            _sbSQL.Append(", REPORT_DATA_36 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData36).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData37) Then
            _sbSQL.Append(", REPORT_DATA_37 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData37).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData38) Then
            _sbSQL.Append(", REPORT_DATA_38 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData38).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData42) Then
            _sbSQL.Append(", REPORT_DATA_42 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData42).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData43) Then
            _sbSQL.Append(", REPORT_DATA_43 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData43).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData44) Then
            _sbSQL.Append(", REPORT_DATA_44 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData44).Append("'")
        End If
		
        If Not IsNothing(pDetailTransaction.ReportData47) Then
            _sbSQL.Append(", REPORT_DATA_47 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData47).Append("'")
        End If

        If Not IsNothing(pDetailTransaction.ReportData46) Then
            _sbSQL.Append(", REPORT_DATA_46 ")
            _sbSQLValues.Append(", '").Append(pDetailTransaction.ReportData46).Append("')")
        Else
            _sbSQLValues.Append(")")
        End If

        _sbSQL.Append(_sbSQLValues.ToString())

        Try
            If log.IsInfoEnabled Then log.Info(_sbSQL.ToString)

            If Not pTrans Is Nothing Then
                m_LocalDB.ExecuteNonQuery(pTrans, CommandType.Text, _sbSQL.ToString)
            Else
                m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
            End If

        Catch ex As Exception
            InsertDetailTransaction = ATPAR_E_LOCALDBINSERTFAIL
            If log.IsFatalEnabled Then log.Fatal("ATPAR_E_LOCALDBINSERTFAIL: " & ex.ToString)
            Exit Function
        End Try

        InsertDetailTransaction = ATPAR_OK

    End Function

    Class Cart_trans_parameters
        Dim business_unit As String = ""
        Dim optimal_qty As Double
        Dim count_qty As Double
    End Class

    ''' <summary>
    ''' </summary>
    ''' <example>
    ''' Usage :
    ''' <code>
    ''' Dim nRet as Long = -1
    ''' try
    '''     Dim fmaps as ArrayList
    '''     fmaps.Add(CartCount_AppTransactions_FieldMaps.OptimalQty, "somevalue")
    '''     fmaps.Add(CartCount_AppTransactions_FieldMaps.CountQty, "somevalue")
    '''     nRet = InsertTransaction(fmaps,_transID)
    '''     if nRet != ATPAR_OK
    '''       exit
    '''     end if
    ''' catch ex as exception
    '''    log.IsWarnEnabled(ex.message)
    ''' end try
    ''' </code>
    ''' </example>
    ''' <param name="FieldMaps"></param>
    ''' <param name="TransactionID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertTransaction(ByVal FieldMaps As ArrayList, ByRef TransactionID As Long) As Long
        ' GetEnumName(AppTrans_FieldMaps, CartCount_AppTrans_FieldMaps.COUNT_QTY), Cart_trans_parameters.COUNT_QTY)
        ' stored proc
        'UPDATE(MT_ATPAR_TRANSACTION_ID_TBL) SET @TransactionID = TRANSACTION_ID = TRANSACTION_ID + 1 WHERE APP_ID = @AppId
    End Function
    ''' <summary>
    ''' Used to check the Product installation
    ''' </summary>
    ''' <param name="pAppId">Application ID</param>
    ''' <param name="pResult">Result</param>
    ''' <param name="pTrans">Transaction</param>
    ''' <param name="pDeviceTokenEntry">DeviceTokenEntry</param>
    ''' <returns>Return Error/Success Code</returns>
    ''' <remarks></remarks>
    Public Function IsProductInstalled(ByVal pAppId As Short, _
                                       ByRef pResult As Boolean, _
                                       ByVal pTrans As SqlTransaction, _
                                       ByVal pDeviceTokenEntry() As String) As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSql As String
        Try
            Dim _appID As Short

            _strSql = "SELECT APP_ID FROM MT_ATPAR_APP WHERE APP_ID=" & pAppId
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Selecting APP_ID with the following SQL... " & _
                                                       vbCrLf & _strSql)

            _appID = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSql), pTrans)
            If log.IsInfoEnabled Then log.Info(methodBaseName & " APP_ID " & _appID)

            pResult = IIf(_appID = pAppId, True, False)

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute SQL... " & _
                                          _strSql & vbCrLf & "Exception is : " & ex.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

    End Function


    ''' <summary>
    ''' To get the Status from Atpar Detail Transaction table
    ''' </summary>
    ''' <param name="pTransactions"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetDetailTransStatus(ByRef pTransactions As AtPar_Detail_Transaction_Entity, _
                                         Optional ByVal pTrans As SqlTransaction = Nothing) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        If (Len(pTransactions.ApplicationId) = 0) Then
            If log.IsWarnEnabled Then log.Warn(methodBaseName & "(pAppId:" & pTransactions.ApplicationId & _
                                                        ") E_INVALIDPARAMETER ")
            GetDetailTransStatus = E_INVALIDPARAMETER
            Exit Function
        End If

        Dim _sbSQL As New StringBuilder

        Try

            With _sbSQL

                .Append("SELECT ")
                .Append("STATUS, TRANSACTION_ID, USER_ID, DOWNLOAD_USER_ID, REPORT_DATA_3, REPORT_DATA_11, KEY_3, KEY_4, KEY_5, ")
                .Append("KEY_6, REPORT_DATA_5 ")
                ' TODO: schema?
                .Append("FROM MT_ATPAR_DETAIL_TRANSACTION ")
                .Append("WHERE APP_ID = " & pTransactions.ApplicationId & " ")

                If Not IsNothing(pTransactions.Transaction_Id) Then
                    'Checking for default values
                    If Not pTransactions.Transaction_Id = -1 Then
                        .Append("AND TRANSACTION_ID = '" & pTransactions.Transaction_Id & "'")
                    End If
                End If

                If Not IsNothing(pTransactions.Key1) Then
                    If Not String.IsNullOrEmpty(pTransactions.Key1) Then
                        .Append("AND KEY_1 = '" & pTransactions.Key1 & "'")
                    End If
                End If

                If Not IsNothing(pTransactions.Key2) Then
                    If Not String.IsNullOrEmpty(pTransactions.Key2) Then
                        .Append("AND KEY_2 = '" & pTransactions.Key2 & "'")
                    End If
                End If

                If Not IsNothing(pTransactions.Key3) Then
                    If Not String.IsNullOrEmpty(pTransactions.Key3) Then
                        .Append("AND KEY_3 = '" & pTransactions.Key3 & "'")
                    End If
                End If

                If Not IsNothing(pTransactions.Key4) Then
                    If Not String.IsNullOrEmpty(pTransactions.Key4) Then
                        .Append("AND KEY_4 = '" & pTransactions.Key4 & "'")
                    End If
                End If

                If Not IsNothing(pTransactions.Key5) Then
                    If Not String.IsNullOrEmpty(pTransactions.Key5) Then
                        .Append("AND KEY_5 = '" & pTransactions.Key5 & "'")
                    End If
                End If

            End With

            ' if there is more than one get all of them
            Dim _ds As DataSet

            Try
                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Getting Detail Transaction Status " & _
                                                            "with the following SQL... " & _
                                                            vbCrLf & _sbSQL.ToString)

                If Not pTrans Is Nothing Then
                    _ds = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pTrans)
                Else
                    _ds = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " call failed " & _sbSQL.ToString & _
                                                                        vbCrLf & ex.ToString)
                GetDetailTransStatus = ATPAR_E_LOCALDBSELECTFAIL
                Exit Function
            End Try

            Try

                If Not _ds Is Nothing Then

                    If _ds.Tables(0).Rows.Count = 0 Then
                        GetDetailTransStatus = E_NORECORDFOUND
                        Exit Function
                    End If

                    For i As Integer = 0 To _ds.Tables(0).Rows.Count - 1

                        With _ds.Tables(0).Rows(i)

                            If Not IsNothing(pTransactions.Status) Then
                                'If Not (pTransactions.Status) = -1 Then
                                pTransactions.Status = .Item("STATUS")
                                'End If
                            End If

                            If Not IsNothing(pTransactions.Transaction_Id) Then
                                'If Not (pTransactions.Transaction_Id) = -1 Then
                                pTransactions.Transaction_Id = .Item("TRANSACTION_ID")
                                'End If
                            End If

                            If Not IsNothing(pTransactions.UserId) Then
                                pTransactions.UserId = .Item("USER_ID")
                            End If
							
							  If Not IsNothing(pTransactions.DownloadUserId) Then
                                pTransactions.DownloadUserId = .Item("DOWNLOAD_USER_ID")
                            End If

                            If Not IsNothing(pTransactions.ReportData3) Then
                                pTransactions.ReportData3 = .Item("REPORT_DATA_3")
                            End If

                            If Not IsNothing(pTransactions.ReportData11) Then
                                pTransactions.ReportData11 = .Item("REPORT_DATA_11")
                            End If

                            If Not IsNothing(pTransactions.Key3) Then
                                pTransactions.Key3 = .Item("KEY_3")
                            End If

                            If Not IsNothing(pTransactions.Key4) Then
                                pTransactions.Key4 = .Item("KEY_4")
                            End If

                            If Not IsNothing(pTransactions.Key5) Then
                                pTransactions.Key5 = .Item("KEY_5")
                            End If

                            If Not IsNothing(pTransactions.Key6) Then
                                ' If Not pTransactions.Key6 = -1 Then
                                pTransactions.Key6 = .Item("KEY_6")
                                'End If
                            End If

                            If Not IsNothing(pTransactions.ReportData5) Then
                                pTransactions.ReportData5 = .Item("REPORT_DATA_5")
                            End If

                        End With

                    Next

                Else
                    GetDetailTransStatus = E_NORECORDFOUND
                    Exit Function
                End If
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to get the detail " & _
                                                        "transaction status " & _sbSQL.ToString & _
                                                    vbCrLf & _ds.GetXml & vbCrLf & ex.ToString)
                GetDetailTransStatus = E_SERVERERROR
                Exit Function
            End Try

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " error creating SQL " & _sbSQL.ToString & _
                                                                        vbCrLf & ex.ToString)
            GetDetailTransStatus = E_SERVERERROR
            Exit Function
        End Try

        GetDetailTransStatus = ATPAR_OK

    End Function
#End Region

End Class

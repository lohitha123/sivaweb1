#Region "Imports"
Imports System.IO
Imports System.Text
Imports System.Net
Imports System.Net.Sockets
Imports log4net
Imports System.Reflection
Imports System.Diagnostics
Imports System.Data
Imports System.Threading
Imports System.Xml
#End Region

Public Class AtPar_Billing_SocketManagement
    Inherits AtPar_DeviceTransactions_Base
#Region "Variable Declarations"

 
    'EVN
    Private eventTypeCode As String = ""
    'Socket
    Private m_mainSocket As Socket
    Private data(15000) As Byte
    Private m_thresholdValue As String = "3"
    Private m_timer As New System.Timers.Timer
    Private intTValue As Integer
    Private ReceiveSucess As Short
    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_Billing_SocketManagement))
    Dim objAtparBr As New AtPar_BusinessRules.AtPar_BillingProcess
    Private m_Stimer As New System.Timers.Timer
    Private intSTValue As Integer
    Private _strBillingThrsdValue As String
#End Region

#Region "Before Rules Implementation Billing segments logic"
    'Public Function BillingMessage(ByVal selRows() As DataRow, ByVal strBilling As String, _
    '                                ByRef _dtItems As DataTable, ByVal strBillingUploadPath As String, _
    '                                ByVal transactionId As String, ByVal m_mainSocket As Socket) As Long
    '    Dim stackFrame As New StackFrame()
    '    Dim methodBase As MethodBase = stackFrame.GetMethod()
    '    Dim methodBaseName As String = methodBase.Name
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName)

    '    Dim row As DataRow
    '    Dim _dtRow As DataRow
    '    Dim strFT As String
    '    Dim irFT1 As Integer
    '    Dim _strBuildFT1 As String = String.Empty
    '    Dim strPath As String
    '    Try
    '        For Each row In selRows
    '            strFT = String.Empty
    '            strPath = String.Empty
    '            intTValue = 0
    '            Dim bytCommand As Byte() = New Byte() {}
    '            Try
    '                If log.IsDebugEnabled Then log.Debug(methodBaseName & ": before calling get business units:")

    '                objAtparBr = New AtPar_BusinessRules.AtPar_BillingProcess
    '                _strBuildFT1 = objAtparBr.BuildFT1(row)

    '            Catch ex As Exception
    '                If log.IsFatalEnabled Then log.Fatal("Exception Thrown in " & methodBaseName & " is.. " & vbCrLf & ex.ToString)
    '                Return E_SERVERERROR
    '            Finally
    '                If Not objAtparBr Is Nothing Then
    '                    objAtparBr = Nothing
    '                End If
    '            End Try

    '            strFT = Chr(11) & strBilling & _strBuildFT1 & Chr(13) & Chr(28) & Chr(13)

    '            'Reading into bytes array
    '            bytCommand = Encoding.ASCII.GetBytes(strFT)
    '            'Start the timer
    '            m_timer.Interval = New TimeSpan(0, 0, 0, 1, 0).TotalMilliseconds
    '            m_timer.Start()
    '            AddHandler m_timer.Elapsed, AddressOf timerloop

    '            'Begin send data
    '            Try
    '                m_mainSocket.BeginSend(bytCommand, 0, bytCommand.Length, SocketFlags.None, New AsyncCallback(AddressOf SendData), m_mainSocket)
    '            Catch ex As Exception
    '                If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to send data to Billing Server" & ex.ToString)
    '            End Try

    '            While ReceiveSucess <> Receive_Status.RECEIVE_SUCESS
    '                Thread.Sleep(1000)
    '                If ReceiveSucess = Receive_Status.RECIEVE_FAIL Or ReceiveSucess = Receive_Status.RECEIVE_ABORT Then
    '                    Exit While
    '                End If
    '            End While
    '            m_timer.Stop()

    '            'Sending Success & Failed Items with Status Y/N

    '            _dtRow = _dtItems.NewRow
    '            _dtRow("TRANSACTION_ID") = row(Send_Charge_Capture_Details_Enum.TRANSACTION_ID)
    '            _dtRow("ITEM_ID") = row(Send_Charge_Capture_Details_Enum.ITEM_ID)
    '            _dtRow("LINE_NO") = row(Send_Charge_Capture_Details_Enum.LINE_NO)

    '            If ReceiveSucess = Receive_Status.RECEIVE_SUCESS Then
    '                'Success:
    '                _dtRow("SENT_STATUS") = "Y"
    '                _dtRow("BILL_QTY") = row(Send_Charge_Capture_Details_Enum.ITEM_COUNT)
    '                strPath = Billing_Files_Folder.Billing.ToString & "\" & "Processed\"
    '            Else
    '                'Failed:
    '                _dtRow("SENT_STATUS") = "N"
    '                _dtRow("BILL_QTY") = 0
    '                strPath = Billing_Files_Folder.Billing.ToString & "\" & "Error\"
    '            End If

    '            If row.Table.Columns.Contains(Send_Charge_Capture_Details_Enum.DEPARTMENT_ID) Then
    '                _dtRow("DEPARTMENT_ID") = row(Send_Charge_Capture_Details_Enum.DEPARTMENT_ID).ToString
    '            End If

    '            If row.Table.Columns.Contains(Send_Charge_Capture_Details_Enum.E_MAIL) Then
    '                _dtRow("E_MAIL") = row(Send_Charge_Capture_Details_Enum.E_MAIL).ToString
    '            End If


    '            _dtItems.Rows.Add(_dtRow)
    '            ReceiveSucess = Receive_Status.RECEIVE_NONE

    '            Dim sw As StreamWriter = New StreamWriter(strBillingUploadPath & strPath & transactionId & "_" & irFT1 & "_" & Now().ToString("yyyyMMddHHmmssms") & ".txt")
    '            sw.WriteLine(strFT)
    '            sw.Close()
    '            If log.IsDebugEnabled Then log.Debug(methodBaseName & "Billing String : " & strFT)
    '            irFT1 += 1
    '        Next
    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Process:" & ex.ToString)
    '        Return E_SERVERERROR
    '    End Try

    'End Function
#End Region


#Region "BillingMessage"

    ''' <summary>
    ''' BillingMessage
    ''' </summary>
    ''' <param name="row"></param>
    ''' <param name="strBilling"></param>
    ''' <param name="_dtItems"></param>
    ''' <param name="strBillingUploadPath"></param>
    ''' <param name="transactionId"></param>
    ''' <param name="irFT1"></param>
    ''' <param name="m_mainSocket"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function BillingMessage(ByVal strBilling As String, ByRef strSentstatus As String, _
                                    ByVal m_mainSocket As Socket) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        strSentstatus = String.Empty
        ' Dim row As DataRow
        Dim _dtRow As DataRow
        Dim strPath As String

        Try

            strPath = String.Empty
            Dim bytCommand As Byte() = New Byte() {}

            intTValue = 0
            'Reading into bytes array


            bytCommand = Encoding.ASCII.GetBytes(strBilling)
            'Start the timer
            m_timer.Interval = New TimeSpan(0, 0, 0, 1, 0).TotalMilliseconds
            m_timer.Start()
            AddHandler m_timer.Elapsed, AddressOf timerloop

            'Begin send data
            Try
                m_mainSocket.BeginSend(bytCommand, 0, bytCommand.Length, SocketFlags.None, New AsyncCallback(AddressOf SendData), m_mainSocket)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to send data to Billing Server" & ex.ToString)
            End Try

            While ReceiveSucess <> Receive_Status.RECEIVE_SUCESS
                Thread.Sleep(1000) 'To hold the control on process
                If ReceiveSucess = Receive_Status.RECIEVE_FAIL Or ReceiveSucess = Receive_Status.RECEIVE_ABORT Then
                    Exit While
                End If
            End While

            If ReceiveSucess = Receive_Status.RECEIVE_SUCESS Then
                'Success:
                strSentstatus = HL7_MESSAGE_SENT_STATUS.SUCESS.ToString
            Else
                'Failed:
                strSentstatus = HL7_MESSAGE_SENT_STATUS.FAILED.ToString
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Process:" & ex.ToString)
            Return E_SERVERERROR
        End Try

    End Function

#End Region



#Region "Socket Connection Calls"

    ''' <summary>
    ''' SocketAddress_Connection
    ''' </summary>
    ''' <param name="m_mainSocket"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function SocketAddress_Connection(ByVal m_mainSocket As Socket, ByVal pSystemID As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim GLOIP As IPAddress
        Dim GLOINTPORT As Integer

        'Commented below GetConfigData call because Obsolute function GetConfigData(With 2 parameters)is removed from AtPar_Application_Base class.
        'TODO: Need to Pass SystemID for GetConfigData 
        GLOIP = IPAddress.Parse(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.ADT_BILLING_SEND_ADDRESS.ToString))
        GLOINTPORT = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.ADT_BILLING_SEND_PORT.ToString)
        m_thresholdValue = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.ADT_BILLING_THRESHOLD_VALUE.ToString)
        If IsDBNull(m_thresholdValue) Or String.IsNullOrEmpty(m_thresholdValue) Then
            m_thresholdValue = "3"
        End If
        Dim ipLocal As IPEndPoint

        ipLocal = New IPEndPoint(GLOIP, GLOINTPORT)
        'm_mainSocket = New Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
        m_mainSocket.Blocking = True
        Try
            m_mainSocket.BeginConnect(ipLocal, New AsyncCallback(AddressOf Connected), m_mainSocket)
            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Connect Billinig Server" & ex.ToString)
            Exit Function
        End Try
    End Function

    Public Function SocketAddress_Connection(ByVal m_mainSocket As Socket, ByVal pSystemID As String, _
                                    ByVal pBillingSendAddress As String, ByVal pBillingPort As Integer, ByVal pBillingThrsdValue As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim ipLocal As IPEndPoint
        Dim GIPAddress As IPAddress
        GIPAddress = IPAddress.Parse(pBillingSendAddress)
        If log.IsDebugEnabled Then log.Debug(methodBaseName & " GIPAddress : " & GIPAddress.ToString)
        ipLocal = New IPEndPoint(GIPAddress, pBillingPort)
        'm_mainSocket = New Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
        m_mainSocket.Blocking = True
        Try
            m_mainSocket.BeginConnect(ipLocal, New AsyncCallback(AddressOf Connected), m_mainSocket)
            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Connect Billing Server" & ex.ToString)
            Exit Function
        End Try
    End Function

    ''' <summary>
    ''' SendData
    ''' </summary>
    ''' <param name="iar"></param>
    ''' <remarks></remarks>
    Private Sub SendData(ByVal iar As IAsyncResult)
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim remote As Socket
        Try
            remote = DirectCast(iar.AsyncState, Socket)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process SendData Callback" & ex.ToString)
            Exit Sub
        End Try

        Try
            Dim sent As Integer = remote.EndSend(iar)
            remote.BeginReceive(data, 0, data.Length - 1, SocketFlags.None, New AsyncCallback(AddressOf ReceiveData), remote)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process Send Data" & ex.ToString)
        End Try
    End Sub

    ''' <summary>
    ''' Connected
    ''' </summary>
    ''' <param name="iar"></param>
    ''' <remarks></remarks>
    Private Sub Connected(ByVal iar As IAsyncResult)
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim client As Socket
        Try
            client = DirectCast(iar.AsyncState, Socket)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Error in connected call back" & ex.ToString)
            Exit Sub
        End Try

        Try
            client.EndConnect(iar)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Connect to Billing Server" & ex.ToString)
        End Try
    End Sub

    ''' <summary>
    ''' ReceiveData
    ''' </summary>
    ''' <param name="iar"></param>
    ''' <remarks></remarks>
    Private Sub ReceiveData(ByVal iar As IAsyncResult)
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim remote As Socket
        Try
            remote = DirectCast(iar.AsyncState, Socket)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process ReceiveData Callback" & ex.ToString)
            Exit Sub
        End Try
        Try
            Dim recv As Integer = remote.EndReceive(iar)
            Dim stringData As String = Encoding.ASCII.GetString(data, 0, recv - 1)
            If log.IsDebugEnabled Then log.Debug(methodBaseName & "ACK is:" & stringData)
            If stringData.Length > 0 Then
                If ValidateACK(stringData) Then
                    ReceiveSucess = Receive_Status.RECEIVE_SUCESS
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & " NetItemUsage ACK Success Received: " & ReceiveSucess)
                    m_timer.Stop()
                End If
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Receive ACK" & ex.ToString)
        End Try
    End Sub

    ''' <summary>
    ''' ValidateACK
    ''' </summary>
    ''' <param name="pstrACK"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function ValidateACK(ByVal pstrACK As String) As Boolean
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _xmlBillingCodes As New System.Xml.XmlDocument
        Dim _strFilePath As String = String.Empty
        Dim _xmlBillingCodesNodeList As System.Xml.XmlNodeList
        Dim _strBillingCodeData As String
        Dim _strSuccessCodes() As String
        Dim blnBillingSucessCodes As Boolean = False

        Try

            _strFilePath = AppDomain.CurrentDomain.BaseDirectory & "BillingMessage_Outbound_Rules.xml"

            _xmlBillingCodes.Load(_strFilePath)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to Load BillingMessage outbound Rules file with exception " & ex.ToString())
            Exit Function
        End Try

        Try
            _xmlBillingCodesNodeList = _xmlBillingCodes.SelectNodes("//BILLING_SUCCESS_CODES/field")

            If _xmlBillingCodesNodeList.Count > 0 Then
                _strBillingCodeData = _xmlBillingCodesNodeList(0).Attributes("value").Value
                _strSuccessCodes = _strBillingCodeData.Split(","c)
            End If

            If Not _xmlBillingCodesNodeList.Count > 0 Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed XML <BILLING_SUCCESS_CODES/field> node does not exist in" & _
                     " the Rules file")

                Exit Function
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'BILLING_SUCCESS_CODES' " & _
                                                    "node has been specified in the <root> tag" & _
                                                    vbCrLf & ex.ToString)
            Exit Function
        Finally
            _xmlBillingCodesNodeList = Nothing
            _xmlBillingCodes = Nothing
        End Try

        Try
            Dim strACK() As String
            strACK = pstrACK.Split("|")
            For intACK As Integer = 0 To strACK.Length - 1
                blnBillingSucessCodes = _strSuccessCodes.Contains(strACK(intACK).ToString())
                If blnBillingSucessCodes = True Then
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & " strACK: " & strACK(intACK))
                    Return True
                End If
            Next
            Return False
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to Process ReceiveData Callback" & ex.ToString)
        End Try
    End Function

#End Region

#Region "Timer Calls"

    Private Sub timerloop(ByVal sender As System.Object, ByVal e As System.Timers.ElapsedEventArgs)
        Try
            intTValue += 1
            If Not String.IsNullOrEmpty(_strBillingThrsdValue) Then
                m_thresholdValue = _strBillingThrsdValue
            End If
            'If value is greater than threshold value, Abort the send
            If intTValue > CInt(m_thresholdValue) Then
                ReceiveSucess = Receive_Status.RECEIVE_ABORT
                m_timer.Stop()
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Timer loop:" & "Error in Timer loop" & ex.ToString)
        End Try
    End Sub
#End Region

#Region "NetItemUsage"
    ''' <summary>
    ''' SendToClinicalSystem
    ''' </summary>
    ''' <param name="pHL7Info"></param>
    ''' <param name="m_mainSocket"></param>
    ''' <param name="pDeviceTokenEntry"></param>
    ''' <param name="ptrasmissionStatus"></param>
    ''' <param name="pstrErrormsg"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function SendToClinicalSystem(ByVal pHL7Info As StringBuilder, _
                                          ByVal pSendNetItemUsgInfo As String,
                                          ByVal pDeviceTokenEntry() As String,
                                          ByRef ptrasmissionStatus As Integer, _
                                          ByRef pstrErrormsg As String, ByVal m_mainSocket As Socket) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _dtRow As DataRow
        Dim _StatusCode As Long = 0

        Try
            intSTValue = 0
            Dim _bytCommand As Byte() = New Byte() {}

            'Reading into bytes array
            _bytCommand = Encoding.ASCII.GetBytes(pHL7Info.ToString)
            'Start the timer
            m_Stimer.Interval = New TimeSpan(0, 0, 0, 1, 0).TotalMilliseconds
            m_Stimer.Start()
            AddHandler m_Stimer.Elapsed, AddressOf socktimerloop

            'If pSendNetItemUsgInfo = YesNo_Enum.Y.ToString Then
            '    If log.IsDebugEnabled Then log.Debug(methodBaseName & "Sending data to HL7 engine:")
            '    If m_mainSocket Is Nothing Then
            '        Try

            '            m_mainSocket = New Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
            '            _StatusCode = SocketAddress_Connection(m_mainSocket, pDeviceTokenEntry(TokenEntry_Enum.SystemId))

            '            If _StatusCode <> ATPAR_OK Then
            '                If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Failed to begin the connection : " & _StatusCode)
            '                Return S_POU_HL7_CONFIG_DETAILS_FAILED
            '            End If
            '        Catch ex As Exception
            '            If log.IsFatalEnabled Then log.Fatal("Exception Thrown in " & methodBaseName & " is.. " & vbCrLf & ex.ToString)
            '            Return S_POU_HL7_CONFIG_DETAILS_FAILED
            '        End Try
            '        'As Socket connection is not establishing, so we are waiting here to connect.
            '        Thread.Sleep(1000)
            '    End If
            'End If

            If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Is Socket Connected :" & m_mainSocket.Connected)
            If Not m_mainSocket Is Nothing Then
                Try
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Sending Data to socket ")
                    Thread.Sleep(100)
                    m_mainSocket.BeginSend(_bytCommand, 0, _bytCommand.Length, SocketFlags.None, New AsyncCallback(AddressOf SendData), m_mainSocket)
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to send data to Clinical System:" & ex.ToString)
                    pstrErrormsg = ex.ToString
                    ptrasmissionStatus = HL7_MESSAGE_SENT_STATUS.FAILED
                    _StatusCode = S_POU_NETITEMUSAGE_STATUS
                End Try
            End If
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Status Message :" & ReceiveSucess)
            While ReceiveSucess <> Receive_Status.RECEIVE_SUCESS
                Thread.Sleep(100) 'To hold the control on process
                If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Waiting for 5ms to receive response from net item usage/billing server ")
                If ReceiveSucess <> Receive_Status.RECEIVE_SUCESS Then
                    Thread.Sleep(500)
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Waiting for 10ms to receive response from net item usage/billing server ")
                    If ReceiveSucess <> Receive_Status.RECEIVE_SUCESS Then 'Status.RECEIVE_SUCESS Then
                        Thread.Sleep(1000)
                        If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Waiting for 20ms to receive response from net item usage/billing server ")
                        If ReceiveSucess <> Receive_Status.RECEIVE_SUCESS Then
                            Thread.Sleep(1500)
                            If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Waiting for 3s to receive response from net item usage/billing server ")
                        End If
                    End If

                End If
                If ReceiveSucess = Receive_Status.RECIEVE_FAIL Or ReceiveSucess = Receive_Status.RECEIVE_ABORT Then
                    Exit While
                End If
            End While
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Receive Success after While :" & ReceiveSucess)
            If ReceiveSucess = Receive_Status.RECEIVE_SUCESS Then
                'Success:
                ptrasmissionStatus = HL7_MESSAGE_SENT_STATUS.SUCESS
            Else
                'Failed:
                ptrasmissionStatus = HL7_MESSAGE_SENT_STATUS.FAILED
            End If
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " : ptrasmissionStatus :" & ptrasmissionStatus)
            ReceiveSucess = Receive_Status.RECEIVE_NONE
            Return _StatusCode

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Failed in " & methodBaseName & " with Exception :" & ex.Message.ToString)
            Return E_SERVERERROR
        End Try
    End Function

    Private Sub socktimerloop(ByVal sender As System.Object, ByVal e As System.Timers.ElapsedEventArgs)
        Try
            intSTValue += 1
            If Not String.IsNullOrEmpty(_strBillingThrsdValue) Then
                m_thresholdValue = _strBillingThrsdValue
            End If
            If Not IsDBNull(m_thresholdValue) AndAlso Not String.IsNullOrEmpty(m_thresholdValue) Then
                'If value is greater than threshold value, Abort the send
                If intSTValue > CInt(m_thresholdValue) Then
                    ReceiveSucess = Receive_Status.RECEIVE_ABORT
                    m_Stimer.Stop()
                End If
            Else
                m_Stimer.Stop()
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Timer loop:" & "Error in Timer loop" & ex.ToString)
        End Try
    End Sub
#End Region
End Class

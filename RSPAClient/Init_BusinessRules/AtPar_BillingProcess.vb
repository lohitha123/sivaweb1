#Region "Imports"
Imports System.IO
Imports System.Text
Imports System.Net
Imports System.Net.Sockets
Imports log4net
Imports System.Reflection
Imports System.Diagnostics
Imports System.Data
Imports System.Xml
Imports System.Threading
Imports System.Data.SqlClient
#End Region

''' -----------------------------------------------------------------------------------------------------
''' <summary>
''' Namespace AtPar_BillingProcess
''' </summary>
''' <remarks>
''' This component is used to process data according to HL7 Meditech specification for billing
''' to create a batch file to be sent to Billing system of an hospital
''' </remarks>
''' -----------------------------------------------------------------------------------------------------
Public Class AtPar_BillingProcess
    Inherits AtPar_Application_Base 

#Region "Variable Declarations"

    'Common HL7 Setup Variables
    'FHS
    Private strFileFieldSepararator As String
    Private strFileEncodingCharacters As String
    Private strFileSendingApplication As String = String.Empty
    Private strFileSendingFacility As String = String.Empty
    Private strFileReceivingApplication As String = String.Empty
    Private strFileReceivingFacility As String = String.Empty
    'BHS
    Private strBatchFieldSepararator As String
    Private strBatchEncodingCharacters As String
    Private strBatchSendingApplication As String = String.Empty
    'MSH
    Private strMessageFieldSepararator As String
    Private strMessageEncodingCharacters As String
    Private strMessageSendingApplication As String = String.Empty
    Private strMessageSendingFacility As String = String.Empty
    Private strMessageReceivingApplication As String = String.Empty
    Private strMessageReceivingFacility As String = String.Empty
    Private strMessageDate As String = String.Empty
    Private messageType As String = String.Empty
    Private processingId As String = String.Empty
    Private versionId As String = String.Empty
    'EVN
    Private eventTypeCode As String = String.Empty
    'Socket
    Private m_mainSocket As Socket
    Private data(1500) As Byte
    Private m_thresholdValue As String
    Dim row As DataRow
    Private m_timer As New System.Timers.Timer
    Private intTValue As Integer
    Private ReceiveSucess As Short
    Private _strMsgRecvApplication As String = String.Empty
    Private _strMsgRecvFacility As String = String.Empty
    Private _strBillingSendAddress As String = String.Empty
    Private irBillingPort As Integer
    Private _strBillingThrsdValue As String = String.Empty
    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_BillingProcess))
    Dim _strBuildFT1 As String = String.Empty
    Private Const CONST_BILL_ONLT_ITEM = "B"


    ''' BILLING_SEGMENT NUM
    ''''''''''''''''''''''''
    ''' FHS - FILE HEADER
    ''' BHS - BATCH HEADER
    ''' MSH - MESSAGE HEADER
    ''' EVN - EVENT TYPE
    ''' PID - PATIENT IDENTIFICATION
    ''' FT1 - FINANCIAL TRANSACTION
    ''' BTS - BATCH TRAILER
    ''' FTS - FILE TRAILER
    '''''''''''''''''''''''
#End Region

#Region "Event Handlers"

    Public Sub New()
        Try
            log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.Init.ToString()
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("BusinessRules Component Initialization Failed")
        End Try
    End Sub

#End Region

#Region "Billing"

#Region "Billing Process Key Function"

    ''' <summary>
    ''' ProcessBillingData
    ''' </summary>
    ''' <param name="pBillingDS"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ProcessBillingData(ByVal pBillingDS As DataSet, ByVal pSystemID As String, Optional ByVal pOrgGroupID As String = "") As DataTable
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _StatusCode As Long = 0
        Dim _strHL7MsgOrFile As String = String.Empty
        Dim strFHS As String = String.Empty
        Dim strBHS As String = String.Empty
        Dim strMSH As String = String.Empty
        Dim strEVN As String = String.Empty
        Dim strPID As String = String.Empty
        Dim strFT1 As String = String.Empty
        Dim ir As Integer
        Dim strBilling As String = String.Empty
        Dim strZFTSegment As String = String.Empty
        Dim isSameTransaction As Boolean
        Dim selRows() As DataRow
        Dim selDtlsRows() As DataRow
        Dim strSearch As String = String.Empty
        Dim transactionId As String = String.Empty
        Dim objAtparBr As New AtPar_BusinessRules.AtPar_Billing_SocketManagement
        Dim strFT As String = String.Empty
        Dim irFT1 As Integer
        Dim _str_CARTS_MNGD_ATPAR As String = String.Empty
        Dim strPath As String = String.Empty
        Dim row As DataRow
        Dim _xmlNodeList As IOrderedEnumerable(Of XmlNode)
        Dim _xmlNodeListforZFT As IOrderedEnumerable(Of XmlNode)
        Dim _xmlDoc As New System.Xml.XmlDocument
        Dim _sbbillmessage As StringBuilder
        Dim _strBillingMsg As String = String.Empty
        Dim _strBillingMsgForMultiple As String = String.Empty
        Dim strBillingUploadPath As String = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.ERP_SYS_DETAILS), ERP_SYS_DETAILS.UPLOADFILEPATH.ToString)

        Dim _str_HL7_BILLING_MESG As String = pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Send_Cart_BusinessRules_Enum.HL7_BILLING_MESG)
        Dim _str_BILLING_MSG_BY_TRANSACTION As String = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.BILLING_MSG_BY_TRANSACTION.ToString)

        If Not IsDBNull(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR)) Then
            _str_CARTS_MNGD_ATPAR = pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR)
        End If

        If Not IsDBNull(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS)) Then
            If Not String.IsNullOrEmpty(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS)) Then
                _strBillingSendAddress = pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS)
            End If
        End If

        If Not IsDBNull(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT)) Then
            If Not String.IsNullOrEmpty(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT)) Then
                irBillingPort = Convert.ToInt32(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT))
            End If
        End If


        If Not IsDBNull(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE)) Then
            If Not String.IsNullOrEmpty(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE)) Then
                _strBillingThrsdValue = pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE)
            End If
        End If

        If Not IsDBNull(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION)) Then
            If Not String.IsNullOrEmpty(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION)) Then
                _strMsgRecvApplication = pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION)
            End If
        End If

        If Not IsDBNull(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY)) Then
            If Not String.IsNullOrEmpty(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY)) Then
                _strMsgRecvFacility = pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY)
            End If
        End If

        Dim _dtItems As DataTable
        _dtItems = New DataTable("SENT_ITEMS")
        _dtItems.Columns.Add("TRANSACTION_ID")
        _dtItems.Columns.Add("LINE_NO")
        _dtItems.Columns.Add("ITEM_ID")
        _dtItems.Columns.Add("BILL_QTY")
        _dtItems.Columns.Add("SENT_STATUS")
        _dtItems.Columns.Add("DEPARTMENT_ID")
        _dtItems.Columns.Add("E_MAIL")

        Try
            _StatusCode = LoadBillingMessageRulesFile(_xmlDoc)
            If _StatusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Load BillingMessage Rules file :" _
                                                   & _StatusCode & ": Invalid BillingMessage outbound Rules File")

                Exit Function
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Status is :" & _StatusCode & _
                                                ": Failed to Load BillingMessage outbound Rules file with exception " & ex.ToString())
            Exit Function
        End Try
        If pBillingDS.Tables.Count > 0 Then
            If pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows.Count > 0 Then
                If Not IsDBNull(pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows(0).Item(Send_Charge_Capture_Header_Enum.ORG_ID)) Then
                    strMessageSendingFacility = pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows(0).Item(Send_Charge_Capture_Header_Enum.ORG_ID).ToString()
                End If
                If Not IsDBNull(pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows(0).Item(Send_Charge_Capture_Header_Enum.SERVICE_DATE)) Then
                    strMessageDate = pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows(0).Item(Send_Charge_Capture_Header_Enum.SERVICE_DATE).ToString()
                End If
            End If
        End If
        '''''''''''  As of Now FHS,BHS segments are not using so removed the code   
        Try

            If _str_HL7_BILLING_MESG = "Y" Then

                Try

                    m_mainSocket = New Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
                    If Not String.IsNullOrEmpty(pOrgGroupID) And Not String.IsNullOrEmpty(_strBillingSendAddress) And Not String.IsNullOrEmpty(irBillingPort.ToString) And Not String.IsNullOrEmpty(_strBillingThrsdValue) Then
                        _StatusCode = objAtparBr.SocketAddress_Connection(m_mainSocket, pSystemID, _strBillingSendAddress, irBillingPort, _strBillingThrsdValue)
                    Else
                        _StatusCode = objAtparBr.SocketAddress_Connection(m_mainSocket, pSystemID)
                    End If

                    If _StatusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Failed to begin the connection : " & _StatusCode)
                        Return _dtItems
                    End If
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal("Exception Thrown in " & methodBaseName & " is.. " & vbCrLf & ex.ToString)
                    Return _dtItems
                End Try
            End If

            isSameTransaction = False
            For ir = 0 To pBillingDS.Tables(0).Rows.Count - 1

                If transactionId = pBillingDS.Tables(0).Rows(ir).Item(Send_Charge_Capture_Header_Enum.TRANSACTION_ID).ToString Then
                    isSameTransaction = True
                    transactionId = pBillingDS.Tables(0).Rows(ir).Item(Send_Charge_Capture_Header_Enum.TRANSACTION_ID).ToString
                Else
                    transactionId = pBillingDS.Tables(0).Rows(ir).Item(Send_Charge_Capture_Header_Enum.TRANSACTION_ID).ToString
                    isSameTransaction = False
                End If

                If isSameTransaction = False Then

                    selRows = pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Select("[" & Send_Charge_Capture_Header_Enum.TRANSACTION_ID & "] = '" & transactionId & "'")

                    If selRows.Length > 0 Then
                        strBilling = String.Empty
                        _strBuildFT1 = String.Empty
                        strZFTSegment = String.Empty
                        _strBillingMsg = String.Empty

                        If log.IsDebugEnabled Then log.Debug(":Search row count :" & selRows.Length)

                        'Building MSH Segment
                        Try
                            _sbbillmessage = New StringBuilder
                            _xmlNodeList = _xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='MSH']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))
                            _StatusCode = BuildSegmantFormatForBilling(_sbbillmessage, _xmlNodeList, selRows, row, pSystemID)
                            strBilling = strBilling & _sbbillmessage.ToString & Chr(13)

                            If _StatusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in Build MSH Segment with  StatusCode :" & _StatusCode)
                                Return _dtItems
                            End If
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to build MSH Segment" & ex.ToString)
                            Return _dtItems
                        End Try

                        'Building EventType
                        Try
                            _sbbillmessage = New StringBuilder
                            _xmlNodeList = _xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='EVN']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))
                            _StatusCode = BuildSegmantFormatForBilling(_sbbillmessage, _xmlNodeList, selRows, row, pSystemID)
                            strBilling = strBilling & _sbbillmessage.ToString & Chr(13)

                            If _StatusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in Build EVN Segment with  StatusCode :" & _StatusCode)
                                Return _dtItems
                            End If
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to build Event Segment" & ex.ToString)
                            Return _dtItems
                        End Try
                        'Buiilding PID Segment
                        Try

                            _sbbillmessage = New StringBuilder
                            _xmlNodeList = _xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='PID']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))
                            _StatusCode = BuildSegmantFormatForBilling(_sbbillmessage, _xmlNodeList, selRows, row, pSystemID)
                            strBilling = strBilling & _sbbillmessage.ToString & Chr(13)

                            If _StatusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in Build PID Segment with  StatusCode :" & _StatusCode)
                                Return _dtItems
                            End If
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to build PID Segment" & ex.ToString)
                            Return _dtItems
                        End Try


                        irFT1 = 1
                        _xmlNodeList = _xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='FT1']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))
                        _xmlNodeListforZFT = _xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='ZFT']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))
                        selDtlsRows = pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Select("[" & Send_Charge_Capture_Details_Enum.CHARGE_CAPTURE_ID & "] = '" & transactionId & "'")
                        _strBillingMsgForMultiple = String.Empty
                        Dim _strSentstatus As String = String.Empty
                        For intcnt As Integer = 0 To selDtlsRows.Length - 1
                            'Buiilding FT1 Segment and ZFT segment(Additional items of financial transactions)  for each row and sending to clinical system
                            Try
                                _sbbillmessage = New StringBuilder
                                _strBuildFT1 = String.Empty

                                _StatusCode = BuildSegmantFormatForBilling(_sbbillmessage, _xmlNodeList, selRows, selDtlsRows(intcnt), pSystemID, intcnt + 1)
                                _strBuildFT1 = _sbbillmessage.ToString

                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal("Exception Thrown in " & methodBaseName & " is.. " & vbCrLf & ex.ToString)
                                Return _dtItems
                            End Try

                            If _xmlNodeListforZFT.Count > 0 Then
                                'Buiilding ZFT Segment
                                Try
                                    strZFTSegment = String.Empty
                                    _sbbillmessage = New StringBuilder
                                    _StatusCode = BuildSegmantFormatForBilling(_sbbillmessage, _xmlNodeListforZFT, selRows, selDtlsRows(intcnt), pSystemID)
                                    strZFTSegment = _sbbillmessage.ToString

                                    If _StatusCode <> ATPAR_OK Then
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in Build ZFT Segment with  StatusCode :" & _StatusCode)
                                        Return _dtItems
                                    End If
                                Catch ex As Exception
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to build ZFT Segment" & ex.ToString)
                                    Return _dtItems
                                End Try
                            End If

                            Try

                                If _str_HL7_BILLING_MESG = YesNo_Enum.Y.ToString Then
                                    If _str_BILLING_MSG_BY_TRANSACTION Then
                                        If intcnt = 0 Then
                                            _strBillingMsg = Chr(11) & strBilling & _strBuildFT1

                                        Else
                                            _strBillingMsg = _strBillingMsg & Chr(13) & _strBuildFT1
                                        End If

                                        If intcnt = selDtlsRows.Length - 1 Then
                                            If Not String.IsNullOrEmpty(strZFTSegment) Then
                                                _strBillingMsg = _strBillingMsg & Chr(13) & strZFTSegment
                                            End If
                                            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Final Billing Message sending to clinical system by TransID : " & _strBillingMsg)
                                            '_StatusCode = objAtparBr.BillingMessage(selDtlsRows(intcnt), _strBillingMsg, _strSentstatus, strBillingUploadPath, transactionId, intcnt, m_mainSocket)
                                            _StatusCode = objAtparBr.BillingMessage(_strBillingMsg & Chr(13) & Chr(28) & Chr(13), _strSentstatus, m_mainSocket)
                                            For intcnt1 As Integer = 0 To selDtlsRows.Length - 1
                                                Dim _drow As DataRow = selDtlsRows(intcnt1)
                                                If selDtlsRows.Length > 0 Then

                                                    GenerateBillingMessageFile(_drow, _strSentstatus, irFT1, pBillingDS, _strBillingMsg & Chr(13) & Chr(28) & Chr(13), transactionId, strBillingUploadPath, _str_BILLING_MSG_BY_TRANSACTION, _dtItems)
                                                End If
                                            Next
                                        End If
                                    Else
                                        _strBillingMsg = String.Empty
                                        _strBillingMsg = Chr(11) & strBilling & _strBuildFT1 '& Chr(13) & strZFTSegment & Chr(13) & Chr(28) & Chr(13)
                                        If Not String.IsNullOrEmpty(strZFTSegment) Then
                                            _strBillingMsg = _strBillingMsg & Chr(13) & strZFTSegment
                                        End If

                                        If log.IsDebugEnabled Then log.Debug(methodBaseName & " Final Billing Message sending to clinical system : " & _strBillingMsg)
                                        '_StatusCode = objAtparBr.BillingMessage(selDtlsRows(intcnt), _strBillingMsg, _strSentstatus, strBillingUploadPath, transactionId, intcnt, m_mainSocket)
                                        _StatusCode = objAtparBr.BillingMessage(_strBillingMsg & Chr(13) & Chr(28) & Chr(13), _strSentstatus, m_mainSocket)
                                        GenerateBillingMessageFile(selDtlsRows(intcnt), _strSentstatus, intcnt, pBillingDS, _strBillingMsg & Chr(13) & Chr(28) & Chr(13), transactionId, strBillingUploadPath, _str_BILLING_MSG_BY_TRANSACTION, _dtItems)
                                    End If
                                    '_strBillingMsg = String.Empty
                                    '_strBillingMsg = Chr(11) & strBilling & _strBuildFT1 & Chr(13) & strZFTSegment & Chr(13) & Chr(28) & Chr(13)

                                    'If log.IsDebugEnabled Then log.Debug(methodBaseName & " Final Billing Message sending to clinical system : " & _strBillingMsg)

                                    ''_StatusCode = objAtparBr.BillingMessage(selDtlsRows(intcnt), _strBillingMsg, _dtItems, strBillingUploadPath, transactionId, intcnt, m_mainSocket)
                                    '_StatusCode = objAtparBr.BillingMessage(_strBillingMsg, _strSentstatus, m_mainSocket)
                                Else 'If _str_HL7_BILLING_MESG = YesNo_Enum.Y.ToString Then

                                    Dim _strFilePrimaryName As String = String.Empty
                                    strPath = Billing_Files_Folder.Billing.ToString & "\"
                                    _strFilePrimaryName = strBillingUploadPath & strPath & transactionId

                                    If intcnt = 0 Then
                                        '_strBuildFT1 = _strBuildFT1 & Chr(13) & strZFTSegment & Chr(13) & _sbbillmessage.ToString
                                        _strBillingMsg = Chr(11) & strBilling & _strBuildFT1 '& Chr(13) & strZFTSegment
                                        If Not String.IsNullOrEmpty(strZFTSegment) Then
                                            _strBillingMsg = _strBillingMsg & Chr(13) & strZFTSegment
                                        End If

                                    Else
                                        _strBillingMsg = _strBillingMsg & Chr(13) & _strBuildFT1 '& Chr(13) & strZFTSegment
                                        If Not String.IsNullOrEmpty(strZFTSegment) Then
                                            _strBillingMsg = _strBillingMsg & Chr(13) & strZFTSegment
                                        End If
                                    End If

                                    If log.IsDebugEnabled Then log.Debug(methodBaseName & "Billing message writing to a file" & _strBillingMsg)

                                    Try
                                        _StatusCode = FileStreamWriter(_strFilePrimaryName, irFT1, _strBillingMsg & Chr(13) & Chr(28) & Chr(13))
                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to stream line the billing data" & ex.ToString)
                                    End Try

                                    Dim _drow As DataRow = selDtlsRows(intcnt)

                                    If selDtlsRows.Length > 0 Then
                                        Dim _dtRow As DataRow = _dtItems.NewRow

                                        _dtRow("TRANSACTION_ID") = _drow(Send_Charge_Capture_Details_Enum.TRANSACTION_ID)
                                        _dtRow("ITEM_ID") = _drow(Send_Charge_Capture_Details_Enum.ITEM_ID)

                                        If pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Columns.Contains(Send_Charge_Capture_Details_Enum.LINE_NO) Then
                                            _dtRow("LINE_NO") = _drow(Send_Charge_Capture_Details_Enum.LINE_NO)
                                        End If

                                        If _StatusCode <> ATPAR_OK Then
                                            _dtRow("SENT_STATUS") = "N"
                                            _dtRow("BILL_QTY") = 0
                                        ElseIf _StatusCode = ATPAR_OK Then
                                            _dtRow("SENT_STATUS") = "Y"
                                            _dtRow("BILL_QTY") = _drow(Send_Charge_Capture_Details_Enum.ITEM_COUNT)
                                        End If

                                        If pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Columns.Contains(Send_Charge_Capture_Details_Enum.DEPARTMENT_ID) Then
                                            _dtRow("DEPARTMENT_ID") = _drow(Send_Charge_Capture_Details_Enum.DEPARTMENT_ID)
                                        End If

                                        If pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Columns.Contains(Send_Charge_Capture_Details_Enum.E_MAIL) Then
                                            _dtRow("E_MAIL") = _drow(Send_Charge_Capture_Details_Enum.E_MAIL)
                                        End If

                                        _dtItems.Rows.Add(_dtRow)
                                    End If
                                End If 'If _str_HL7_BILLING_MESG = YesNo_Enum.Y.ToString Then

                                    If _StatusCode <> ATPAR_OK Then
                                        If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Failed to fetch the data with the status code : " & _StatusCode)
                                        Return _dtItems
                                    End If

                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal("Exception Thrown in " & methodBaseName & " is.. " & vbCrLf & ex.ToString)
                                Return _dtItems
                            End Try
                        Next

                    End If
                End If
            Next
            Dim DS As DataSet
            DS = New DataSet
            DS.Tables.Add(_dtItems)
            Return _dtItems
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process billing data" & ex.ToString)
        Finally
            If Not objAtparBr Is Nothing Then
                objAtparBr = Nothing
            End If
            If Not (m_mainSocket Is Nothing) Then
                m_mainSocket.Close()
            End If
        End Try

        Return _dtItems
    End Function

#End Region

    Public Function GenerateBillingMessageFile(ByVal _drow As DataRow, ByVal _strSentStatus As String, _
                                              ByVal Intcnt As Integer, ByVal pBillingDS As DataSet, ByVal _strBillingMsg As String, ByVal transactionId As String, _
                                              ByVal strBillingUploadPath As String, ByVal _strBILLING_MSG_BY_TRANSACTION As String, ByRef _dtItems As DataTable) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _StatusCode As Long = 0
        Dim _dtRow As DataRow = _dtItems.NewRow
        Dim strPath As String = String.Empty
        _dtRow("TRANSACTION_ID") = _drow(Send_Charge_Capture_Details_Enum.TRANSACTION_ID)
        _dtRow("ITEM_ID") = _drow(Send_Charge_Capture_Details_Enum.ITEM_ID)

        If pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Columns.Contains(Send_Charge_Capture_Details_Enum.LINE_NO) Then
            _dtRow("LINE_NO") = _drow(Send_Charge_Capture_Details_Enum.LINE_NO)
        End If

        If _strSentStatus <> HL7_MESSAGE_SENT_STATUS.SUCESS.ToString Then
            _dtRow("SENT_STATUS") = "N"
            _dtRow("BILL_QTY") = 0
        ElseIf _strSentStatus = HL7_MESSAGE_SENT_STATUS.SUCESS.ToString Then
            _dtRow("SENT_STATUS") = "Y"
            _dtRow("BILL_QTY") = _drow(Send_Charge_Capture_Details_Enum.ITEM_COUNT)
        End If

        If pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Columns.Contains(Send_Charge_Capture_Details_Enum.DEPARTMENT_ID) Then
            _dtRow("DEPARTMENT_ID") = _drow(Send_Charge_Capture_Details_Enum.DEPARTMENT_ID)
        End If

        If pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Columns.Contains(Send_Charge_Capture_Details_Enum.E_MAIL) Then
            _dtRow("E_MAIL") = _drow(Send_Charge_Capture_Details_Enum.E_MAIL)
        End If

        _dtItems.Rows.Add(_dtRow)
        Try
            If _strSentStatus <> HL7_MESSAGE_SENT_STATUS.SUCESS.ToString Then
                strPath = Billing_Files_Folder.Billing.ToString & "\" & "Error\"
            ElseIf _strSentStatus = HL7_MESSAGE_SENT_STATUS.SUCESS.ToString Then
                strPath = Billing_Files_Folder.Billing.ToString & "\" & "Processed\"
            End If
            Try
                _StatusCode = FileStreamWriter(strBillingUploadPath & strPath & transactionId, Intcnt, _strBillingMsg)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to stream line the billing data" & ex.ToString)
            End Try
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to stream line the billing data" & ex.ToString)
        End Try
    End Function
#Region "Billing Process Rules Implementation"

    ''' <summary>
    ''' load the xml file 
    ''' </summary>
    ''' <param name="_pxmlDoc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function LoadBillingMessageRulesFile(ByRef _pxmlDoc As System.Xml.XmlDocument) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _strXmlFilePath As String = String.Empty
        Dim _xmlNodeList As System.Xml.XmlNodeList
        Try
            _strXmlFilePath = AppDomain.CurrentDomain.BaseDirectory & "BillingMessage_Outbound_Rules.xml"

            ' checks whether the Outbound rules xml file exists
            If Not System.IO.File.Exists(_strXmlFilePath) Then
                If log.IsWarnEnabled Then log.Debug(methodBaseName & "BillingMessage outbound Rules file does not exist at file path :" & _
                                                         _strXmlFilePath)
                Return E_SERVERERROR
            Else
                Try
                    _pxmlDoc.Load(_strXmlFilePath)

                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Load BillingMessage outbound Rules file " & _strXmlFilePath)
                    Return E_SERVERERROR
                End Try

            End If
            ' gets the nodes list
            Try
                _xmlNodeList = _pxmlDoc.SelectNodes("//BILLING_MESSAGE_DATA/field")

                If Not _xmlNodeList.Count > 0 Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed XML <BILLING_MESSAGE_DATA/field> node does not exist in" & _
                         " the Rules file")

                    Return E_SERVERERROR
                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'BILLING_MESSAGE_DATA' " & _
                                                        "node has been specified in the <root> tag" & _
                                                        vbCrLf & ex.ToString)
                Return E_SERVERERROR
            End Try

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to load the Family Rules XML with the exception : " & _
                ex.ToString())
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' BuildSegmantFormatForBilling will call for MSH,EVN,PID,FT1,ZFT
    ''' </summary>
    ''' <param name="pSbformat"></param>
    ''' <param name="_xmlNodelist"></param>
    ''' <param name="pHeaderRows"></param>
    ''' <param name="pDetailsRow"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="pCounter"></param>
    ''' <returns>Error/Success Status Code</returns>
    ''' <remarks></remarks>
    Public Function BuildSegmantFormatForBilling(ByRef pSbformat As StringBuilder, _xmlNodelist As IOrderedEnumerable(Of XmlNode), ByVal pHeaderRows() As DataRow _
        , ByVal pDetailsRow As DataRow, Optional ByVal pSystemID As String = "none", Optional pCounter As Integer = 0) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strXmlValueType As String = String.Empty
        Dim _strXmlValue As String = String.Empty
        Dim _strResultValue As String = String.Empty
        Dim _strXmldatatype As String = String.Empty
        Dim _strXmlFieldName As String = String.Empty
        Dim _strXmldateformat As String = String.Empty
        Dim _strXmlSegmentValue As String = String.Empty
        Dim _strXmlField_Number As String = String.Empty
        Dim _strMsgEncodingChars As String = String.Empty
        Dim _strMsgFieldSeperator As String = String.Empty
        Dim _strDefValue As String = String.Empty
        _strMsgFieldSeperator = "|"
        _strMsgEncodingChars = "^~\&"

        Try
            If _xmlNodelist.Count > 0 Then
                For intNodeCnt As Integer = 0 To _xmlNodelist.Count - 1
                    If _xmlNodelist(intNodeCnt).Attributes.Count > 0 Then
                        With pSbformat
                            _strResultValue = String.Empty
                            If intNodeCnt = 0 Then
                                If _xmlNodelist(0).Attributes("segment").Value = "MSH" Or _xmlNodelist(0).Attributes("segment").Value = "FHS" Or _xmlNodelist(0).Attributes("segment").Value = "BHS" Then
                                    .Append(_xmlNodelist(0).Attributes("segment").Value)
                                Else
                                    .Append(_xmlNodelist(0).Attributes("segment").Value)
                                    .Append(_strMsgFieldSeperator)
                                End If

                            End If
                            Try
                                _strXmlSegmentValue = _xmlNodelist(intNodeCnt).Attributes("segment").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'segment' " & _
                                         "attribute has been specified in the <BILLING_MESSAGE_DATA/field> tag :" & ex.ToString())
                                Return E_SERVERERROR
                            End Try

                            Try
                                _strXmlValueType = _xmlNodelist(intNodeCnt).Attributes("value_type").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'value_type' " & _
                                         "attribute has been specified in the <BILLING_MESSAGE_DATA/field> tag :" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strXmlValue = _xmlNodelist(intNodeCnt).Attributes("value").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'value' " & _
                                         "attribute has been specified in the <BILLING_MESSAGE_DATA/field> tag :" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strXmlField_Number = _xmlNodelist(intNodeCnt).Attributes("field_no").Value

                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'field_no' " & _
                                         "attribute has been specified in the <BILLING_MESSAGE_DATA/field> tag :" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strXmldatatype = _xmlNodelist(intNodeCnt).Attributes("data_type").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'data_type' " & _
                                         "attribute has been specified in the <BILLING_MESSAGE_DATA/field> tag :" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strXmlFieldName = _xmlNodelist(intNodeCnt).Attributes("name").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'name' " & _
                                         "attribute has been specified in the <BILLING_MESSAGE_DATA/field> tag :" & ex.ToString())
                                Return E_SERVERERROR
                            End Try

                            If String.IsNullOrEmpty(_strXmlValueType) Or String.IsNullOrEmpty(_strXmldatatype) _
                                Or String.IsNullOrEmpty(_strXmlFieldName) Then
                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed BillingMessage rules file, " & _
                                                                  "one of the attribute values is empty")
                                Return E_SERVERERROR
                            End If
                            Try
                                _strDefValue = _xmlNodelist(intNodeCnt).Attributes("default_value").Value
                            Catch ex As Exception
                                _strDefValue = String.Empty
                                ' TODO need to see if there is a better way to avoid exceptions if the default_value attribute is not present
                            End Try
                            Try
                                Select Case _strXmlValueType.ToString

                                    Case VALUETYPES.ATPAR_CONDITION.ToString
                                        Select Case _strXmlFieldName
                                            Case MSH.SENDING_APPLICATION.ToString
                                                .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.SENDING_APPLICATION.ToString))
                                            Case MSH.SENDING_FACILITY.ToString
                                                .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.SENDING_FACILITY.ToString))
                                            Case MSH.RECEIVING_APPLICATION.ToString
                                                If Not String.IsNullOrEmpty(_strBillingSendAddress) And Not String.IsNullOrEmpty(irBillingPort.ToString) And Not String.IsNullOrEmpty(_strBillingThrsdValue) And Not String.IsNullOrEmpty(_strMsgRecvApplication) Then
                                                    .Append(_strMsgRecvApplication.ToString)
                                                Else
                                                    .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.RECEIVING_APPLICATION.ToString))
                                                End If
                                            Case MSH.RECEIVING_FACILITY.ToString
                                                If Not String.IsNullOrEmpty(_strBillingSendAddress) And Not String.IsNullOrEmpty(irBillingPort.ToString) And Not String.IsNullOrEmpty(_strBillingThrsdValue) And Not String.IsNullOrEmpty(_strMsgRecvFacility) Then
                                                    .Append(_strMsgRecvFacility.ToString)
                                                Else
                                                    .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.RECEIVING_FACILITY.ToString))
                                                End If
                                            Case MSH.VERSION_ID.ToString
                                                .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.ADT_VERSION.ToString))
                                            Case MSH.ENCODING_CHARACTERS.ToString
                                                .Append(_strMsgEncodingChars)
                                            Case BHS.BATCH_ENCODING_CHARACTERS.ToString
                                                .Append(_strMsgEncodingChars)
                                            Case FHS.FILE_ENCODING_CHARACTERS.ToString
                                                .Append(_strMsgEncodingChars)
                                            Case FT1.SET_ID_FINANCIAL_TRANSACTION.ToString
                                                If Not IsDBNull(_strXmlValue) AndAlso Not String.IsNullOrEmpty(_strXmlValue) Then
                                                    If _strXmlValue = "COUNTER" Then
                                                        .Append(pCounter)
                                                    End If
                                                End If
                                            Case FT1.PROCEDURE_CODE.ToString
                                                Try
                                                    .Append(pDetailsRow([Enum].Parse(GetType(Send_Charge_Capture_Details_Enum), _strXmlValue))).Append(_strDefValue)
                                                Catch ex As Exception
                                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Invalid Value " & _strXmlValue & " for field " & _
                                                            _strXmlFieldName & " in the <BILLING_MESSAGE_DATA> tag :" & _
                                                                             ex.ToString)
                                                End Try

                                        End Select
                                    Case VALUETYPES.ATPAR_HEADER.ToString
                                        If Not IsDBNull(pHeaderRows(0).Item([Enum].Parse(GetType(Send_Charge_Capture_Header_Enum), _strXmlValue))) AndAlso Not String.IsNullOrEmpty(pHeaderRows(0).Item([Enum].Parse(GetType(Send_Charge_Capture_Header_Enum), _strXmlValue))) Then
                                            .Append(pHeaderRows(0).Item([Enum].Parse(GetType(Send_Charge_Capture_Header_Enum), _strXmlValue)))
                                        Else
                                            .Append(String.Empty)
                                        End If
                                    Case VALUETYPES.ATPAR_DETAILS.ToString

                                        If _strXmldatatype <> DATATYPES.DATETIME.ToString Then

                                            If Not IsDBNull(pDetailsRow([Enum].Parse(GetType(Send_Charge_Capture_Details_Enum), _strXmlValue))) AndAlso Not String.IsNullOrEmpty(pDetailsRow([Enum].Parse(GetType(Send_Charge_Capture_Details_Enum), _strXmlValue))) Then
                                                .Append(pDetailsRow([Enum].Parse(GetType(Send_Charge_Capture_Details_Enum), _strXmlValue)))
                                            Else
                                                .Append(_strDefValue)
                                            End If
                                        Else
                                            Try
                                                _strXmldateformat = _xmlNodelist(intNodeCnt).Attributes("format").Value
                                                Dim strDate As String = String.Empty

                                                If Not IsDBNull(pDetailsRow([Enum].Parse(GetType(Send_Charge_Capture_Details_Enum), _strXmlValue))) AndAlso Not String.IsNullOrEmpty(pDetailsRow([Enum].Parse(GetType(Send_Charge_Capture_Details_Enum), _strXmlValue))) Then
                                                    strDate = pDetailsRow([Enum].Parse(GetType(Send_Charge_Capture_Details_Enum), _strXmlValue))

                                                    .Append(Convert.ToDateTime(strDate).ToString(_strXmldateformat.ToString))
                                                Else
                                                    .Append(String.Empty)
                                                End If

                                            Catch ex As Exception
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'format' " & _
                                                         "attribute has been specified in the <BILLING_MESSAGE_DATA/field> tag :" & ex.ToString())

                                                Return E_SERVERERROR
                                            End Try
                                        End If

                                    Case VALUETYPES.DEFAULT.ToString
                                        .Append(_strXmlValue).ToString()
                                End Select
                                Select Case _strXmldatatype

                                    Case DATATYPES.DATETIME.ToString

                                        If _strXmlValueType = VALUETYPES.DEFAULT.ToString Then
                                            Try
                                                _strXmldateformat = _xmlNodelist(intNodeCnt).Attributes("format").Value
                                                .Append((Convert.ToDateTime(Now).ToString(_strXmldateformat.ToString)))
                                            Catch ex As Exception
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'format' " & _
                                                         "attribute has been specified in the <BILLING_MESSAGE_DATA/field> tag :" & ex.ToString())

                                                Return E_SERVERERROR
                                            End Try

                                        End If

                                End Select
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Invalid Value " & _strXmlValueType & " for field " & _
                                              _strXmlFieldName & " in the <BILLING_MESSAGE_DATA> tag :" & _
                                                                               ex.ToString)
                                Return E_SERVERERROR
                            End Try
                            'appending pipe symbol for each field
                            .Append(_strMsgFieldSeperator)
                        End With
                    End If
                Next

            Else
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if " & _
                  _strXmlSegmentValue & ":" & "attribute has been specified in the <BILLING_MESSAGE_DATA/field> tag :")

                Return E_SERVERERROR
            End If
            pSbformat = pSbformat.Remove(pSbformat.ToString.LastIndexOf("|"), 1)

            If log.IsDebugEnabled Then log.Debug(methodBaseName & _strXmlSegmentValue & " :" & pSbformat.ToString)

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Failed in " & methodBaseName & " with Exception :" & ex.Message.ToString)
            Return E_SERVERERROR
        End Try

    End Function


#End Region

#Region "Stream writer Calls"

    Public Function FileStreamWriter(ByVal pFilePrimaryName As String, ByVal pFileSequenceNo As Integer, ByVal strFT As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        'Writing the msg into file
        Try
            Dim sw As StreamWriter = New StreamWriter(pFilePrimaryName & "_" & pFileSequenceNo & "_" & Now().ToString("yyyyMMddHHmmssms") & ".txt")
            sw.WriteLine(strFT)
            sw.Close()
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to writing data to a file" & ex.ToString)
        End Try
    End Function

#End Region

#Region "Building the Batch Trailer "
    ''' <summary>
    ''' To Build the Batch Trailer , Called in ProcessBillingData Function
    ''' </summary>
    ''' <returns>BillingString Batch Trailer</returns>
    ''' <remarks></remarks>
    Public Function BuildBTS() As String

    End Function
#End Region

#Region "Building the Financial Trailer"
    ''' <summary>
    ''' To Build the Financial Trailer, Called in ProcessBillingData Function
    ''' </summary>
    ''' <returns>BillingString Financial Trailer</returns>
    ''' <remarks></remarks>
    Public Function BuildFTS() As String

    End Function
#End Region

#Region "Before Rules Implementation Billing segments logic"
    ' ''' <summary>
    ' ''' To Build the BillingData As a BillingFile , Called by Batch Schedule
    ' ''' </summary>
    ' ''' <param name="pBillingDS">DataSet</param>
    ' ''' <param name="pSystemID">String</param>
    ' ''' <returns>True on Success else False</returns>
    ' ''' <remarks></remarks>
    'Public Function ProcessBillingData(ByVal pBillingDS As DataSet, ByVal pSystemID As String) As DataTable
    '    Dim stackFrame As New StackFrame()
    '    Dim methodBase As MethodBase = stackFrame.GetMethod()
    '    Dim methodBaseName As String = methodBase.Name
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName)

    '    Dim _StatusCode As Long = -1
    '    Dim _strHL7MsgOrFile As String = String.Empty
    '    Dim strFHS As String = String.Empty
    '    Dim strBHS As String = String.Empty
    '    Dim strMSH As String = String.Empty
    '    Dim strEVN As String = String.Empty
    '    Dim strPID As String = String.Empty
    '    Dim strFT1 As String = String.Empty
    '    Dim ir As Integer
    '    Dim strBilling As String = String.Empty
    '    Dim isSameTransaction As Boolean
    '    Dim selRows() As DataRow
    '    Dim selDtlsRows() As DataRow
    '    Dim strSearch As String = String.Empty
    '    Dim transactionId As String = String.Empty
    '    Dim objAtparBr As New AtPar_BusinessRules.AtPar_Billing_SocketManagement
    '    Dim strFT As String = String.Empty
    '    Dim irFT1 As Integer
    '    Dim _str_CARTS_MNGD_ATPAR As String = String.Empty
    '    Dim strPath As String = String.Empty

    '    Dim strBillingUploadPath As String = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.ERP_SYS_DETAILS), ERP_SYS_DETAILS.UPLOADFILEPATH.ToString)

    '    Dim _str_HL7_BILLING_MESG As String = pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Send_Cart_BusinessRules_Enum.HL7_BILLING_MESG)

    '    If Not IsDBNull(pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR)) Then
    '        _str_CARTS_MNGD_ATPAR = pBillingDS.Tables(DataSet_Type.PREREQDATA.ToString).Rows(0).Item(Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR)
    '    End If

    '    Dim _dtItems As DataTable
    '    _dtItems = New DataTable("SENT_ITEMS")
    '    _dtItems.Columns.Add("TRANSACTION_ID")
    '    _dtItems.Columns.Add("LINE_NO")
    '    _dtItems.Columns.Add("ITEM_ID")
    '    _dtItems.Columns.Add("BILL_QTY")
    '    _dtItems.Columns.Add("SENT_STATUS")
    '    _dtItems.Columns.Add("DEPARTMENT_ID")
    '    _dtItems.Columns.Add("E_MAIL")

    '    strFileFieldSepararator = "|"
    '    strFileEncodingCharacters = "^~\&"
    '    strFileSendingApplication = String.Empty
    '    strFileSendingFacility = String.Empty
    '    strFileReceivingApplication = String.Empty
    '    strFileReceivingFacility = String.Empty
    '    strBatchFieldSepararator = "|"
    '    strBatchEncodingCharacters = "^~\&"
    '    strBatchSendingApplication = String.Empty
    '    strMessageFieldSepararator = "|"
    '    strMessageEncodingCharacters = "^~\&"
    '    strMessageSendingApplication = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.SENDING_APPLICATION.ToString)
    '    strMessageSendingFacility = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.SENDING_FACILITY.ToString)
    '    strMessageReceivingApplication = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.RECEIVING_APPLICATION.ToString)
    '    strMessageReceivingFacility = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.RECEIVING_FACILITY.ToString)
    '    messageType = "DFT"
    '    processingId = "T"
    '    versionId = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.ADT_VERSION.ToString)
    '    eventTypeCode = "P01"

    '    If pBillingDS.Tables.Count > 0 Then
    '        If pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows.Count > 0 Then
    '            If Not IsDBNull(pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows(0).Item(Send_Charge_Capture_Header_Enum.ORG_ID)) Then
    '                strMessageSendingFacility = pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows(0).Item(Send_Charge_Capture_Header_Enum.ORG_ID).ToString()
    '            End If
    '            If Not IsDBNull(pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows(0).Item(Send_Charge_Capture_Header_Enum.SERVICE_DATE)) Then
    '                strMessageDate = pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Rows(0).Item(Send_Charge_Capture_Header_Enum.SERVICE_DATE).ToString()
    '            End If
    '        End If
    '    End If

    '    Try
    '        'Start Building the Message segments
    '        'Call Build File Header
    '        Try
    '            strFHS = BuildFHS()
    '        Catch ex As Exception
    '            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to build FHS Segment" & ex.ToString)
    '            Exit Function
    '        End Try

    '        'Call Build Batch Header
    '        Try
    '            strBHS = BuildBHS()
    '        Catch ex As Exception
    '            If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to build BHS Segment" & ex.ToString)
    '            Exit Function
    '        End Try

    '        strBilling = strFHS & strBHS
    '        If _str_HL7_BILLING_MESG = "Y" Then

    '            Try

    '                m_mainSocket = New Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
    '                _StatusCode = objAtparBr.SocketAddress_Connection(m_mainSocket, pSystemID)

    '                If _StatusCode <> ATPAR_OK Then
    '                    If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Failed to begin the connection : " & _StatusCode)
    '                    Exit Function
    '                End If
    '            Catch ex As Exception
    '                If log.IsFatalEnabled Then log.Fatal("Exception Thrown in " & methodBaseName & " is.. " & vbCrLf & ex.ToString)
    '                Exit Function
    '            End Try
    '        End If

    '        isSameTransaction = False
    '        For ir = 0 To pBillingDS.Tables(0).Rows.Count - 1

    '            If transactionId = pBillingDS.Tables(0).Rows(ir).Item(Send_Charge_Capture_Header_Enum.TRANSACTION_ID).ToString Then
    '                isSameTransaction = True
    '                transactionId = pBillingDS.Tables(0).Rows(ir).Item(Send_Charge_Capture_Header_Enum.TRANSACTION_ID).ToString
    '            Else
    '                transactionId = pBillingDS.Tables(0).Rows(ir).Item(Send_Charge_Capture_Header_Enum.TRANSACTION_ID).ToString
    '                isSameTransaction = False
    '            End If

    '            If isSameTransaction = False Then

    '                selRows = pBillingDS.Tables(DataSet_Type.HEADERS.ToString).Select("[" & Send_Charge_Capture_Header_Enum.TRANSACTION_ID & "] = '" & transactionId & "'")

    '                If selRows.Length > 0 Then
    '                    strBilling = String.Empty
    '                    _strBuildFT1 = String.Empty

    '                    If log.IsDebugEnabled Then log.Debug(":Search row count :" & selRows.Length)

    '                    strBilling = String.Empty

    '                    'Building MSH Segment
    '                    Try
    '                        strBilling = strBilling & BuildMSH()
    '                    Catch ex As Exception
    '                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to build MSH Segment" & ex.ToString)
    '                        Exit Function
    '                    End Try

    '                    'Building EventType
    '                    Try
    '                        strBilling = strBilling & BuildEventType()
    '                    Catch ex As Exception
    '                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to build Event Segment" & ex.ToString)
    '                        Exit Function
    '                    End Try
    '                    'Buiilding PID Segment
    '                    Try

    '                        strBilling = strBilling & BuildPID(selRows)
    '                    Catch ex As Exception
    '                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to build PID Segment" & ex.ToString)
    '                        Exit Function
    '                    End Try


    '                    strFT = String.Empty
    '                    irFT1 = 1

    '                    If _str_HL7_BILLING_MESG = "Y" Then
    '                        Try
    '                            If log.IsDebugEnabled Then log.Debug(methodBaseName & ": before calling get business units:")

    '                            selDtlsRows = pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Select("[" & Send_Charge_Capture_Details_Enum.CHARGE_CAPTURE_ID & "] = '" & transactionId & "'")

    '                            _StatusCode = objAtparBr.BillingMessage(selDtlsRows, strBilling, _dtItems, strBillingUploadPath, transactionId, m_mainSocket)
    '                            If _StatusCode <> ATPAR_OK Then
    '                                If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Failed to fetch the data with the status code : " & _StatusCode)
    '                                Exit Function
    '                            End If

    '                        Catch ex As Exception
    '                            If log.IsFatalEnabled Then log.Fatal("Exception Thrown in " & methodBaseName & " is.. " & vbCrLf & ex.ToString)
    '                            Exit Function
    '                        End Try

    '                    Else
    '                        Dim _strFilePrimaryName As String = String.Empty
    '                        strPath = Billing_Files_Folder.Billing.ToString & "\"
    '                        _strFilePrimaryName = strBillingUploadPath & strPath & transactionId
    '                        strFT = Chr(11) & strBilling & _strBuildFT1 & Chr(13) & Chr(28) & Chr(13)
    '                        'filtering the details data
    '                        selDtlsRows = pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Select("[" & Send_Charge_Capture_Details_Enum.CHARGE_CAPTURE_ID & "] = '" & transactionId & "'")
    '                        For i As Integer = 0 To selDtlsRows.Length - 1
    '                            Dim _drow As DataRow = selDtlsRows(i)
    '                            If selDtlsRows.Length > 0 Then

    '                                'To build the  file
    '                                _strBuildFT1 = _strBuildFT1 & BuildFT1(_drow)

    '                                strFT = Chr(11) & strBilling & _strBuildFT1 & Chr(13) & Chr(28) & Chr(13)
    '                                Try
    '                                    _StatusCode = FileStreamWriter(_strFilePrimaryName, irFT1, strFT)
    '                                Catch ex As Exception
    '                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to stream line the billing data" & ex.ToString)
    '                                End Try

    '                                Dim _dtRow As DataRow = _dtItems.NewRow

    '                                _dtRow("TRANSACTION_ID") = _drow(Send_Charge_Capture_Details_Enum.TRANSACTION_ID)
    '                                _dtRow("ITEM_ID") = _drow(Send_Charge_Capture_Details_Enum.ITEM_ID)

    '                                If pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Columns.Contains(Send_Charge_Capture_Details_Enum.LINE_NO) Then
    '                                    _dtRow("LINE_NO") = _drow(Send_Charge_Capture_Details_Enum.LINE_NO)
    '                                End If

    '                                If _StatusCode <> ATPAR_OK Then
    '                                    _dtRow("SENT_STATUS") = "N"
    '                                    _dtRow("BILL_QTY") = 0
    '                                ElseIf _StatusCode = ATPAR_OK Then
    '                                    _dtRow("SENT_STATUS") = "Y"
    '                                    _dtRow("BILL_QTY") = _drow(Send_Charge_Capture_Details_Enum.ITEM_COUNT)
    '                                End If

    '                                If pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Columns.Contains(Send_Charge_Capture_Details_Enum.DEPARTMENT_ID) Then
    '                                    _dtRow("DEPARTMENT_ID") = _drow(Send_Charge_Capture_Details_Enum.DEPARTMENT_ID)
    '                                End If

    '                                If pBillingDS.Tables(DataSet_Type.DETAILS.ToString).Columns.Contains(Send_Charge_Capture_Details_Enum.E_MAIL) Then
    '                                    _dtRow("E_MAIL") = _drow(Send_Charge_Capture_Details_Enum.E_MAIL)
    '                                End If

    '                                _dtItems.Rows.Add(_dtRow)
    '                            End If
    '                        Next
    '                    End If
    '                End If
    '            End If
    '        Next
    '        Dim DS As DataSet
    '        DS = New DataSet
    '        DS.Tables.Add(_dtItems)

    '        Return _dtItems
    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process billing data" & ex.ToString)
    '    Finally
    '        If Not objAtparBr Is Nothing Then
    '            objAtparBr = Nothing
    '        End If
    '    End Try

    '    Return _dtItems
    'End Function

#Region "Building the Message Header Segment"
    ' ''' <summary>
    ' ''' To Build the Message Header Segment , Called in ProcessBillingData Function
    ' ''' </summary>
    ' ''' <returns>BillingString Message Header</returns>
    ' ''' <remarks></remarks>
    'Public Function BuildMSH() As String
    '    Dim stackFrame As New StackFrame()
    '    Dim methodBase As MethodBase = stackFrame.GetMethod()
    '    Dim methodBaseName As String = methodBase.Name
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName)

    '    Dim strMessageHdr As String
    '    Dim messageDateTime As String = Convert.ToDateTime(Now).ToString("yyyyMMddHHmm")
    '    Dim ir As Integer
    '    '::TO DO generate sequence
    '    Dim messageControlId As String = "123"
    '    Dim sequenceNo As String = String.Empty
    '    Dim continuationPointer As String = String.Empty
    '    Dim messageHdr As MSH
    '    Dim messageHdrField As String

    '    Try
    '        strMessageHdr = "MSH"
    '        For Each messageHdr In [Enum].GetValues(GetType(MSH))
    '            ir = ir + 1
    '            messageHdrField = messageHdr.ToString
    '            Select Case messageHdrField
    '                Case MSH.FIELD_SEPARATOR.ToString
    '                    strMessageHdr = strMessageHdr
    '                Case MSH.ENCODING_CHARACTERS.ToString
    '                    strMessageHdr = strMessageHdr & strMessageEncodingCharacters
    '                Case MSH.SENDING_APPLICATION.ToString
    '                    strMessageHdr = strMessageHdr & strMessageSendingApplication
    '                Case MSH.SENDING_FACILITY.ToString
    '                    strMessageHdr = strMessageHdr & strMessageSendingFacility
    '                Case MSH.RECEIVING_APPLICATION.ToString
    '                    strMessageHdr = strMessageHdr & strMessageReceivingApplication
    '                Case MSH.RECEIVING_FACILITY.ToString
    '                    strMessageHdr = strMessageHdr & strMessageReceivingFacility
    '                Case MSH.DATE_TIME_OF_MESSAGE.ToString
    '                    strMessageHdr = strMessageHdr & messageDateTime
    '                Case MSH.SECURITY.ToString
    '                    strMessageHdr = strMessageHdr
    '                Case MSH.MESSAGE_TYPE.ToString
    '                    strMessageHdr = strMessageHdr & messageType
    '                Case MSH.MESSAGE_CONTROL_ID.ToString
    '                    strMessageHdr = strMessageHdr & messageControlId
    '                Case MSH.PROCESSING_ID.ToString
    '                    strMessageHdr = strMessageHdr & processingId
    '                Case MSH.VERSION_ID.ToString
    '                    strMessageHdr = strMessageHdr & versionId
    '                Case MSH.SEQUENCE_NUMBER.ToString
    '                    strMessageHdr = strMessageHdr & sequenceNo
    '                Case MSH.CONTINUATION_POINTER.ToString
    '                    strMessageHdr = strMessageHdr & continuationPointer
    '            End Select
    '            If ir = [Enum].GetValues(GetType(MSH)).Length Then
    '                strMessageHdr = strMessageHdr
    '            Else
    '                strMessageHdr = strMessageHdr & strMessageFieldSepararator
    '            End If
    '        Next
    '        strMessageHdr = strMessageHdr & Chr(13)
    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process BuildMSH" & ex.ToString)
    '    End Try
    '    Return strMessageHdr
    'End Function
#End Region

#Region "Building the Event Type"
    ' ''' <summary>
    ' ''' To Build the Event Type , Called in ProcessBillingData Function
    ' ''' </summary>
    ' ''' <returns>BillingString EventType </returns>
    ' ''' <remarks></remarks>
    'Public Function BuildEventType() As String
    '    Dim stackFrame As New StackFrame()
    '    Dim methodBase As MethodBase = stackFrame.GetMethod()
    '    Dim methodBaseName As String = methodBase.Name
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName)

    '    Dim strEventType As String
    '    Dim eventDateTime As String = Convert.ToDateTime(Now).ToString("yyyyMMddHHmm")
    '    Dim eventType As EVENT_TYPE
    '    Dim eventTypeField As String
    '    Dim ir As Integer
    '    If strMessageDate <> String.Empty Then
    '        eventDateTime = Convert.ToDateTime(strMessageDate).ToString("yyyyMMddHHmm")
    '    End If
    '    Try
    '        strEventType = "EVN" & strMessageFieldSepararator
    '        For Each eventType In [Enum].GetValues(GetType(EVENT_TYPE))
    '            ir = ir + 1
    '            eventTypeField = eventType.ToString
    '            Select Case eventTypeField
    '                Case EVENT_TYPE.EVENT_TYPE_CODE.ToString
    '                    strEventType = strEventType & eventTypeCode
    '                Case EVENT_TYPE.EVENT_DATE_TIME.ToString
    '                    strEventType = strEventType & eventDateTime
    '            End Select
    '            If ir = [Enum].GetValues(GetType(EVENT_TYPE)).Length Then
    '                strEventType = strEventType
    '            Else
    '                strEventType = strEventType & strMessageFieldSepararator
    '            End If
    '        Next
    '        strEventType = strEventType & Chr(13)
    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process BuildEventType" & ex.ToString)
    '    End Try
    '    Return strEventType
    'End Function
#End Region

#Region "Building the Patient Identification"
    ' ''' <summary>
    ' ''' To Build the Patient Identification, Called in ProcessBillingData Function
    ' ''' </summary>
    ' ''' <param name="pIdRows">DataRow</param>
    ' ''' <returns>BillingString Patient Identification </returns>
    ' ''' <remarks></remarks>
    'Public Function BuildPID(ByVal pIdRows() As DataRow) As String

    '    Dim stackFrame As New StackFrame()
    '    Dim methodBase As MethodBase = stackFrame.GetMethod()
    '    Dim methodBaseName As String = methodBase.Name
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName)

    '    Dim strPatientSegment As String
    '    Dim setPID As String = String.Empty
    '    Dim patientId As String = String.Empty
    '    Dim patientMRC As String = String.Empty
    '    Dim altPatientId As String = String.Empty
    '    Dim patientName As String = String.Empty
    '    Dim motherMaidenName As String = String.Empty
    '    Dim dateOfBirth As String = String.Empty
    '    Dim administrativeSex As String = String.Empty
    '    Dim patientAlias As String = String.Empty
    '    Dim race As String = String.Empty
    '    Dim patientAddress As String = String.Empty
    '    Dim countryCode As String = String.Empty
    '    Dim homePhoneNumber As String = String.Empty
    '    Dim businessPhoneNumber As String = String.Empty
    '    Dim primaryLanguage As String = String.Empty
    '    Dim maritalStatus As String = String.Empty
    '    Dim religion As String = String.Empty
    '    Dim patientAccountNumber As String = String.Empty
    '    Dim _strPatVisitNumber As String = String.Empty
    '    Dim pidSegment As PID
    '    Dim pidField As String
    '    Dim ir As Integer

    '    Try
    '        'PATIENT_ID
    '        If pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_ID) Is DBNull.Value Then
    '            patientMRC = String.Empty
    '        Else
    '            patientMRC = pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_ID).ToString
    '        End If
    '        If log.IsDebugEnabled Then log.Debug(":patientMRC:" & patientMRC)
    '        'PATIENT_NAME
    '        If pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_NAME) Is DBNull.Value Then
    '            patientName = String.Empty
    '        Else
    '            patientName = pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_NAME).ToString
    '        End If
    '        If log.IsDebugEnabled Then log.Debug(":patientName:" & patientName)
    '        'PATIENT_SEX
    '        If pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_SEX) Is DBNull.Value Then
    '            administrativeSex = String.Empty
    '        Else
    '            administrativeSex = pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_SEX).ToString
    '        End If
    '        If log.IsDebugEnabled Then log.Debug(":administrativeSex:" & administrativeSex)
    '        'PATIENT_ACCOUNT_NUMBER
    '        If pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_ACCOUNT_NUMBER) Is DBNull.Value Then
    '            patientAccountNumber = String.Empty
    '        Else
    '            patientAccountNumber = pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_ACCOUNT_NUMBER).ToString
    '        End If
    '        If log.IsDebugEnabled Then log.Debug(":patientAccountNumber:" & patientAccountNumber)
    '        'PATIENT_VISIT_NUMBER - Putting visit number at alternate patient ID position
    '        If pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_VISIT_NUMBER) Is DBNull.Value Then
    '            _strPatVisitNumber = String.Empty
    '        Else
    '            _strPatVisitNumber = pIdRows(0).Item(Send_Charge_Capture_Header_Enum.PATIENT_VISIT_NUMBER).ToString
    '        End If
    '        If log.IsDebugEnabled Then log.Debug(":Patient Visit Number:" & _strPatVisitNumber)
    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process PID Segment" & ex.ToString)
    '        Exit Function
    '    End Try
    '    Try
    '        strPatientSegment = "PID" & strMessageFieldSepararator

    '        For Each pidSegment In [Enum].GetValues(GetType(PID))
    '            ir = ir + 1
    '            pidField = pidSegment.ToString
    '            Select Case pidField
    '                Case PID.SET_ID_PID.ToString
    '                    strPatientSegment = strPatientSegment & setPID
    '                Case PID.PATIENT_ID.ToString
    '                    strPatientSegment = strPatientSegment & patientId
    '                Case PID.PATIENT_MEDICAL_RECORD_NUMBER.ToString
    '                    strPatientSegment = strPatientSegment & patientMRC
    '                Case PID.ALTERNATE_PATIENT_ID.ToString
    '                    strPatientSegment = strPatientSegment & _strPatVisitNumber
    '                Case PID.PATIENT_NAME.ToString
    '                    strPatientSegment = strPatientSegment & patientName
    '                Case PID.MOTHERS_MAIDEN_NAME.ToString
    '                    strPatientSegment = strPatientSegment & motherMaidenName
    '                Case PID.DATE_TIME_OF_BIRTH.ToString
    '                    strPatientSegment = strPatientSegment & dateOfBirth
    '                Case PID.ADMINISTRATIVE_SEX.ToString
    '                    strPatientSegment = strPatientSegment & administrativeSex
    '                Case PID.PATIENT_ALIAS.ToString
    '                    strPatientSegment = strPatientSegment & patientAlias
    '                Case PID.RACE.ToString
    '                    strPatientSegment = strPatientSegment & race
    '                Case PID.PATIENT_ADDRESS.ToString
    '                    strPatientSegment = strPatientSegment & patientAddress
    '                Case PID.COUNTRY_CODE.ToString
    '                    strPatientSegment = strPatientSegment & countryCode
    '                Case PID.PHONE_NUMBER_HOME.ToString
    '                    strPatientSegment = strPatientSegment & homePhoneNumber
    '                Case PID.PHONE_NUMBER_BUSINESS.ToString
    '                    strPatientSegment = strPatientSegment & businessPhoneNumber
    '                Case PID.PRIMARY_LANGUAGE.ToString
    '                    strPatientSegment = strPatientSegment & primaryLanguage
    '                Case PID.MARITAL_STATUS.ToString
    '                    strPatientSegment = strPatientSegment & maritalStatus
    '                Case PID.RELIGION.ToString
    '                    strPatientSegment = strPatientSegment & religion
    '                Case PID.PATIENT_ACCOUNT_NUMBER.ToString
    '                    strPatientSegment = strPatientSegment & patientAccountNumber
    '            End Select

    '            If ir = [Enum].GetValues(GetType(PID)).Length Then
    '                strPatientSegment = strPatientSegment
    '            Else
    '                strPatientSegment = strPatientSegment & strMessageFieldSepararator
    '            End If
    '        Next
    '        strPatientSegment = strPatientSegment '& vbCrLf
    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process PID Segment" & ex.ToString)
    '    End Try

    '    Return strPatientSegment
    'End Function
#End Region

#Region "Build FT1 Segment"

    ' ''' <summary>
    ' ''' To Build FT1 Segment, Called in ProcessBillingData Function
    ' ''' </summary>
    ' ''' <param name="ft1Row">DataRow</param>
    ' ''' <returns>BillingString Finacial Transaction</returns>
    ' ''' <remarks></remarks>
    'Public Function BuildFT1(ByVal ft1Row As DataRow) As String

    '    Dim stackFrame As New StackFrame()
    '    Dim methodBase As MethodBase = stackFrame.GetMethod()
    '    Dim methodBaseName As String = methodBase.Name
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName)

    '    Dim strFT1Segment As String
    '    Dim setIdFinTransaction As String = String.Empty
    '    Dim transactionId As String = String.Empty
    '    Dim transactionBatchId As String = String.Empty
    '    Dim transactionDate As String = String.Empty
    '    'Taking the Now Date As Posting Date
    '    Dim transactionPostingDate As String = Convert.ToDateTime(Now).ToString("yyyyMMddHHmm")
    '    Dim transactionType As String = String.Empty
    '    Dim transactionCode As String = String.Empty
    '    Dim transactionQuantity As String = String.Empty
    '    Dim transactionAmountExt As String = String.Empty
    '    Dim performingPhysician As String = String.Empty
    '    Dim orderingPhysician As String = String.Empty
    '    'Added new variable for Unit Cost and Patient type  
    '    Dim strUnitCost As String = String.Empty
    '    Dim strPatienttype As String = String.Empty
    '    Dim strCostCenterId As String = String.Empty
    '    Dim strFT1AllSegments As String
    '    Dim FT1Segment As FT1
    '    Dim FT1Field As String
    '    Dim ir As Integer
    '    Dim strItemID As String = String.Empty
    '    Dim strItemDescr As String = String.Empty
    '    strMessageFieldSepararator = "|"

    '    ' For Each ft1Row In ft1Rows
    '    Try
    '        If log.IsDebugEnabled Then log.Debug("Capture date time:" & ft1Row(Send_Charge_Capture_Details_Enum.CAPTURE_DATE_TIME))
    '        'CAPTURE_DATE_TIME
    '        If ft1Row(Send_Charge_Capture_Details_Enum.CAPTURE_DATE_TIME) Is DBNull.Value Then
    '            transactionDate = String.Empty
    '        Else
    '            transactionDate = Convert.ToDateTime(ft1Row(Send_Charge_Capture_Details_Enum.CAPTURE_DATE_TIME)).ToString("yyyyMMddHHmm")
    '        End If
    '        'ITEM_COUNT
    '        If ft1Row(Send_Charge_Capture_Details_Enum.ITEM_COUNT) Is DBNull.Value Then
    '            transactionQuantity = String.Empty
    '        Else
    '            transactionQuantity = ft1Row(Send_Charge_Capture_Details_Enum.ITEM_COUNT).ToString
    '        End If
    '        'AMOUNT
    '        If ft1Row(Send_Charge_Capture_Details_Enum.AMOUNT) Is DBNull.Value Then
    '            transactionAmountExt = String.Empty
    '        Else
    '            transactionAmountExt = ft1Row(Send_Charge_Capture_Details_Enum.AMOUNT).ToString
    '        End If
    '        'TRANSACTION_CODE
    '        If ft1Row(Send_Charge_Capture_Details_Enum.TRANSACTION_CODE) Is DBNull.Value Then
    '            transactionCode = String.Empty
    '        Else
    '            transactionCode = ft1Row(Send_Charge_Capture_Details_Enum.TRANSACTION_CODE).ToString
    '        End If
    '        'TRANSACTION_TYPE
    '        If ft1Row(Send_Charge_Capture_Details_Enum.TRANSACTION_TYPE) Is DBNull.Value Then
    '            transactionType = String.Empty
    '        Else
    '            transactionType = ft1Row(Send_Charge_Capture_Details_Enum.TRANSACTION_TYPE).ToString
    '        End If
    '        'ITEM_PRICE
    '        If ft1Row(Send_Charge_Capture_Details_Enum.ITEM_PRICE) Is DBNull.Value Then
    '            strUnitCost = String.Empty
    '        Else
    '            strUnitCost = ft1Row(Send_Charge_Capture_Details_Enum.ITEM_PRICE).ToString
    '        End If
    '        'PHYSICIAN_ID
    '        If ft1Row(Send_Charge_Capture_Details_Enum.PHYSICIAN_ID) Is DBNull.Value Then
    '            performingPhysician = String.Empty
    '        Else
    '            performingPhysician = ft1Row(Send_Charge_Capture_Details_Enum.PHYSICIAN_ID).ToString
    '        End If
    '        'TRANSACTION_ID
    '        If ft1Row(Send_Charge_Capture_Details_Enum.TRANSACTION_ID) Is DBNull.Value Then
    '            transactionId = String.Empty
    '        Else
    '            transactionId = ft1Row(Send_Charge_Capture_Details_Enum.TRANSACTION_ID).ToString
    '        End If
    '        'PATIENT_TYPE
    '        If ft1Row(Send_Charge_Capture_Details_Enum.PATIENT_TYPE) Is DBNull.Value Then
    '            strPatienttype = String.Empty
    '        Else
    '            strPatienttype = ft1Row(Send_Charge_Capture_Details_Enum.PATIENT_TYPE).ToString
    '        End If

    '        'ITEM_ID
    '        If ft1Row(Send_Charge_Capture_Details_Enum.ITEM_ID) Is DBNull.Value Or ft1Row(Send_Charge_Capture_Details_Enum.ITEM_ID).ToString = String.Empty Then
    '            strItemID = String.Empty
    '        Else
    '            strItemID = ft1Row(Send_Charge_Capture_Details_Enum.ITEM_ID).ToString
    '        End If

    '        'ITEM_DESCRIPTION
    '        If ft1Row(Send_Charge_Capture_Details_Enum.ITEM_DESCRIPTION) Is DBNull.Value Or ft1Row(Send_Charge_Capture_Details_Enum.ITEM_DESCRIPTION).ToString = String.Empty Then
    '            strItemDescr = String.Empty
    '        Else
    '            strItemDescr = ft1Row(Send_Charge_Capture_Details_Enum.ITEM_DESCRIPTION).ToString
    '        End If

    '        If ft1Row(Send_Charge_Capture_Details_Enum.COST_CENTER) Is DBNull.Value Or ft1Row(Send_Charge_Capture_Details_Enum.COST_CENTER).ToString = String.Empty Then
    '            strCostCenterId = String.Empty
    '        Else
    '            strCostCenterId = ft1Row(Send_Charge_Capture_Details_Enum.COST_CENTER).ToString
    '        End If

    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process FT1 Segment" & ex.ToString)
    '        Exit Function
    '    End Try
    '    strFT1Segment = Chr(13) & "FT1" & strMessageFieldSepararator
    '    For Each FT1Segment In [Enum].GetValues(GetType(FT1))
    '        ir = ir + 1
    '        FT1Field = FT1Segment.ToString
    '        Select Case FT1Field
    '            Case FT1.SET_ID_FINANCIAL_TRANSACTION.ToString
    '                strFT1Segment = strFT1Segment & setIdFinTransaction
    '            Case FT1.TRANSACTION_ID.ToString
    '                strFT1Segment = strFT1Segment & transactionId
    '            Case FT1.TRANSACTION_BATCH_ID.ToString
    '                strFT1Segment = strFT1Segment & transactionBatchId
    '            Case FT1.TRANSACTION_DATE.ToString
    '                strFT1Segment = strFT1Segment & transactionDate
    '            Case FT1.TRANSACTION_POSTING_DATE.ToString
    '                strFT1Segment = strFT1Segment & transactionPostingDate
    '            Case FT1.TRANSACTION_TYPE.ToString
    '                strFT1Segment = strFT1Segment & transactionType
    '            Case FT1.TRANSACTION_CODE.ToString
    '                strFT1Segment = strFT1Segment & transactionCode
    '            Case FT1.TRANSACTION_QUANTITY.ToString
    '                strFT1Segment = strFT1Segment & transactionQuantity
    '            Case FT1.TRANSACTION_AMOUNT_EXT.ToString
    '                strFT1Segment = strFT1Segment & transactionAmountExt
    '            Case FT1.PATIENT_TYPE.ToString
    '                strFT1Segment = strFT1Segment & strPatienttype
    '            Case FT1.PERFORMING_PHYSICIAN.ToString
    '                strFT1Segment = strFT1Segment & performingPhysician
    '            Case FT1.ORDERING_PHYSICIAN.ToString
    '                strFT1Segment = strFT1Segment & orderingPhysician
    '            Case FT1.UNIT_COST.ToString
    '                strFT1Segment = strFT1Segment & strUnitCost
    '            Case FT1.FT1_FIELD_8.ToString     'Item ID
    '                strFT1Segment = strFT1Segment & strItemID
    '            Case FT1.FT1_FIELD_9.ToString     'Item Description
    '                strFT1Segment = strFT1Segment & strItemDescr
    '            Case FT1.DEPARTMENT_CODE.ToString     'Cost center ID
    '                strFT1Segment = strFT1Segment & strCostCenterId
    '        End Select
    '        If ir = [Enum].GetValues(GetType(FT1)).Length Then
    '            strFT1Segment = strFT1Segment
    '        Else
    '            strFT1Segment = strFT1Segment & strMessageFieldSepararator
    '        End If
    '    Next
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName & "FT1 Transaction string :" & strFT1Segment)
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName & "FT1 Segment string :" & strFT1AllSegments)

    '    Return strFT1Segment
    'End Function

#End Region
#Region "Building the File Header Segment"
    ' ''' <summary>
    ' ''' To Build the File Header Segment , Called in ProcessBillingData Function
    ' ''' </summary>
    ' ''' <returns>BillingString File Header</returns>
    ' ''' <remarks></remarks>
    'Public Function BuildFHS() As String
    '    Dim stackFrame As New StackFrame()
    '    Dim methodBase As MethodBase = stackFrame.GetMethod()
    '    Dim methodBaseName As String = methodBase.Name
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName)

    '    'All these data come from hl7SetUpData
    '    Dim strFileHeader As String
    '    Dim fileHdr As FHS
    '    Dim fileHdrField As String
    '    Dim fileCreationDateTime As String
    '    Dim ir As Integer
    '    Try

    '        fileCreationDateTime = Convert.ToDateTime(Now).ToString("yyyyMMddHHmm")

    '        strFileHeader = "FHS"
    '        For Each fileHdr In [Enum].GetValues(GetType(FHS))
    '            ir = ir + 1
    '            fileHdrField = fileHdr.ToString
    '            Select Case fileHdrField
    '                Case FHS.FILE_FIELD_SEPARATOR.ToString
    '                    strFileHeader = strFileHeader
    '                Case FHS.FILE_ENCODING_CHARACTERS.ToString
    '                    strFileHeader = strFileHeader & strFileEncodingCharacters
    '                Case FHS.FILE_SENDING_APPLICATION.ToString
    '                    strFileHeader = strFileHeader & strFileSendingApplication
    '                Case FHS.FILE_SENDING_FACILITY.ToString
    '                    strFileHeader = strFileHeader & strFileSendingFacility
    '                Case FHS.FILE_RECEIVING_APPLICATION.ToString
    '                    strFileHeader = strFileHeader & strFileReceivingApplication
    '                Case FHS.FILE_RECEIVING_FACILITY.ToString
    '                    strFileHeader = strFileHeader & strFileReceivingFacility
    '                Case FHS.FILE_CREATION_DATE_TIME.ToString
    '                    strFileHeader = strFileHeader & fileCreationDateTime
    '            End Select
    '            If ir = [Enum].GetValues(GetType(FHS)).Length Then
    '                strFileHeader = strFileHeader
    '            Else
    '                strFileHeader = strFileHeader & strFileFieldSepararator
    '            End If
    '        Next
    '        strFileHeader = strFileHeader & Chr(13)

    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process BuildFHS" & ex.ToString)
    '    End Try
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName & "FHS segment string :" & strFileHeader)
    '    Return strFileHeader

    'End Function
#End Region

#Region "Building the Batch Header Segment"
    ' ''' <summary>
    ' ''' To Build the Batch Header Segment , Called in ProcessBillingData Function
    ' ''' </summary>
    ' ''' <returns>BillingString Batch Header</returns>
    ' ''' <remarks></remarks>
    'Public Function BuildBHS() As String

    '    Dim stackFrame As New StackFrame()
    '    Dim methodBase As MethodBase = stackFrame.GetMethod()
    '    Dim methodBaseName As String = methodBase.Name
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName)

    '    Dim strBatchHdr As String
    '    Dim batchHdr As BHS
    '    Dim batchHdrField As String
    '    Dim batchCreationDateTime As String
    '    Dim ir As Integer

    '    Try
    '        batchCreationDateTime = Convert.ToDateTime(Now).ToString("yyyyMMddHHmm")
    '        strBatchHdr = "BHS"
    '        For Each batchHdr In [Enum].GetValues(GetType(BHS))
    '            ir = ir + 1
    '            batchHdrField = batchHdr.ToString
    '            Select Case batchHdrField
    '                Case BHS.BATCH_FIELD_SEPARATOR.ToString
    '                    strBatchHdr = strBatchHdr
    '                Case BHS.BATCH_ENCODING_CHARACTERS.ToString
    '                    strBatchHdr = strBatchHdr & strBatchEncodingCharacters
    '                Case BHS.BATCH_SENDING_APPLICATION.ToString
    '                    strBatchHdr = strBatchHdr & strBatchSendingApplication
    '                Case BHS.BATCH_CREATION_DATE_TIME.ToString
    '                    strBatchHdr = strBatchHdr & batchCreationDateTime
    '            End Select
    '            If ir = [Enum].GetValues(GetType(BHS)).Length Then
    '                strBatchHdr = strBatchHdr
    '            Else
    '                strBatchHdr = strBatchHdr & strBatchFieldSepararator
    '            End If
    '        Next
    '        strBatchHdr = strBatchHdr & Chr(13)
    '    Catch ex As Exception
    '        If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to process BuildBHS" & ex.ToString)
    '    End Try
    '    If log.IsDebugEnabled Then log.Debug(methodBaseName & "BHS segment string :" & strBatchHdr)
    '    Return strBatchHdr

    'End Function
#End Region
#End Region

#End Region

#Region "Net Item Usage"

    ''' <summary>
    ''' load the xml file 
    ''' </summary>
    ''' <param name="_pxmlDoc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function LoadNetItemUsageRulesFile(ByRef _pxmlDoc As System.Xml.XmlDocument) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _strXmlFilePath As String = String.Empty
        Dim _xmlNodeList As System.Xml.XmlNodeList
        Try
            _strXmlFilePath = AppDomain.CurrentDomain.BaseDirectory & "NetItemUsage_Outbound_Rules.xml"

            ' checks whether the Outbound rules xml file exists
            If Not System.IO.File.Exists(_strXmlFilePath) Then
                If log.IsWarnEnabled Then log.Debug(methodBaseName & " NetItemUsage outbound Rules file does not exist at file path :" & _
                                                         _strXmlFilePath)
                Return E_SERVERERROR
            Else
                Try
                    _pxmlDoc.Load(_strXmlFilePath)

                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Load NetItemUsage outbound Rules file " & _strXmlFilePath)
                    Return E_SERVERERROR
                End Try

            End If
            ' gets the nodes list
            Try
                _xmlNodeList = _pxmlDoc.SelectNodes("//NET_ITEM_USAGE_DATA/field")

                If Not _xmlNodeList.Count > 0 Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed XML <NET_ITEM_USAGE_DATA/field> node does not exist in" & _
                         " the Rules file")

                    Return E_SERVERERROR
                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'NET_ITEM_USAGE_DATA' " & _
                                                        "node has been specified in the <root> tag" & _
                                                        vbCrLf & ex.ToString)
                Return E_SERVERERROR
            End Try

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to load the Family Rules XML with the exception : " & _
                ex.ToString())
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' PrepareNetItemUsageInfo
    ''' </summary>
    ''' <param name="pSendNetItemUsgInfo"></param>
    ''' <param name="pDSInputParams"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="pDsLookup"></param>
    ''' <returns>Error/Success Status Code</returns>
    ''' <remarks></remarks>
    Public Function PrepareNetItemUsageInfo(ByVal pSendNetItemUsgInfo As String, ByVal pDSInputParams As DataSet, _
                                       ByVal pDeviceTokenEntry() As String, ByVal pDsLookup As DataSet) As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Long = 0
        Dim _sbMSH As New StringBuilder
        Dim _sbPID As New StringBuilder
        Dim _sbFT1 As New StringBuilder
        Dim _sbFT1Wastage As New StringBuilder
        Dim _sbFT1Return As New StringBuilder
        Dim _sbZPM As New StringBuilder
        Dim _sbTotalSegment As New StringBuilder
        Dim _sbTotalWastageSegment As New StringBuilder
        Dim _sbTotalReturnSegment As New StringBuilder
        Dim _dtSentItemStatus As DataTable
        Dim _dblItemCnt As Double = 0
        Dim _dblWastageQty As Double = 0
        Dim _dblReturnQty As Double = 0
        Dim _dblIssuedQty As Double = 0
        Dim _transId As Long = -1
        Dim _intLineNo As Integer = 0
        Dim dr As DataRow

        Dim _strBillOnlyItemFlag As String = String.Empty
        Dim _sbSearchSQL As New StringBuilder
        Dim _drRow As DataRow()
        Dim _strBusinessUnit As String = String.Empty
        Dim _strCartId As String = String.Empty
        Dim _strItemID As String = String.Empty
        Dim _strLotNumber As String = String.Empty
        Dim _strSrNumber As String = String.Empty
        Dim _strCompartment As String = String.Empty

        Dim _xmlNodeList As IOrderedEnumerable(Of XmlNode)
        Dim _xmlDoc As New System.Xml.XmlDocument
        Dim _blnConfXmlFileExists As Boolean = True

        Dim _transmissionStatus As Integer
        Dim _strErrormsg As String = String.Empty
        Dim _HL7StatusCode As Long = 0
        Dim _FileCreationstatus As Long = 0
        Dim _intCounter As Integer = 0
        ''
        Dim objAtparBr As New AtPar_BusinessRules.AtPar_Billing_SocketManagement
        Dim _strPickListID As String = String.Empty
        Try
            _statusCode = LoadNetItemUsageRulesFile(_xmlDoc)
            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Load NetItemUsage Rules file :" _
                                                   & _statusCode & ": Invalid NetItemUsage outbound Rules File")

                _blnConfXmlFileExists = False

            End If


        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Status is :" & _statusCode & _
                                                ": Failed to Load NetItemUsage outbound Rules file with exception " & ex.ToString())
            _blnConfXmlFileExists = False
        End Try


        Try

            If _blnConfXmlFileExists Then

                _strPickListID = String.Empty
                _dtSentItemStatus = New DataTable("SENT_ITEMS")
                _dtSentItemStatus.Columns.Add("TRANSACTION_ID")
                _dtSentItemStatus.Columns.Add("LINE_NO")
                _dtSentItemStatus.Columns.Add("ITEM_ID")
                _dtSentItemStatus.Columns.Add("BILL_QTY")
                _dtSentItemStatus.Columns.Add("SENT_STATUS")

                Dim _strBillingUploadPath As String = GetConfigData(pDeviceTokenEntry(TokenEntry_Enum.SystemId), EName(Of CONFIGFILE)(CONFIGFILE.ERP_SYS_DETAILS), ERP_SYS_DETAILS.UPLOADFILEPATH.ToString)
                Dim _xmlNodeHeaderList As IOrderedEnumerable(Of XmlNode)
                _xmlNodeHeaderList = _xmlDoc.DocumentElement.SelectNodes(" // HEADER / field[@name='HDR']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))
                If log.IsDebugEnabled Then log.Debug(methodBaseName & "_xmlNodeHeaderList count " & _xmlNodeHeaderList.Count)


                _xmlNodeList = _xmlDoc.DocumentElement.SelectNodes("//NET_ITEM_USAGE_DATA/field[@segment='MESSAGE_HEADER']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))
                'MSH
                _statusCode = BuildSegmantFormat(dr, _sbMSH, pDeviceTokenEntry(TokenEntry_Enum.SystemId), _xmlNodeHeaderList, _xmlNodeList)

                If _statusCode <> ATPAR_OK Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in BuildMSH with StatusCode :" & _statusCode)
                    Return E_SERVERERROR
                End If

                _xmlNodeList = _xmlDoc.DocumentElement.SelectNodes(" // NET_ITEM_USAGE_DATA / field[@segment='PATIENT_IDENTIFICATION']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))

                'PID For every case we have only one patient record.
                If Not _xmlNodeList Is Nothing AndAlso _xmlNodeList.Count > 0 Then
                    If pDSInputParams.Tables.Contains("PATIENT_INFO") AndAlso pDSInputParams.Tables("PATIENT_INFO").Rows.Count > 0 Then
                        _strPickListID = IIf(IsDBNull(pDSInputParams.Tables("PATIENT_INFO").Rows(0).Item("PICK_LIST_ID")), String.Empty, pDSInputParams.Tables("PATIENT_INFO").Rows(0).Item("PICK_LIST_ID"))
                        _statusCode = BuildSegmantFormat(pDSInputParams.Tables("PATIENT_INFO").Rows(0), _sbPID, pDeviceTokenEntry(TokenEntry_Enum.SystemId), _xmlNodeHeaderList, _xmlNodeList)
                    End If
                End If

                If _statusCode <> ATPAR_OK Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in BuildMSH with StatusCode :" & _statusCode)
                    Return E_SERVERERROR
                End If

                If pSendNetItemUsgInfo = YesNo_Enum.Y.ToString Then
                    If log.IsDebugEnabled Then log.Debug(methodBaseName & "Sending data to HL7 engine:")
                    Try

                        m_mainSocket = New Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
                        _statusCode = objAtparBr.SocketAddress_Connection(m_mainSocket, pDeviceTokenEntry(TokenEntry_Enum.SystemId))

                        If _statusCode <> ATPAR_OK Then
                            If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Failed to begin the connection : " & _statusCode)
                            Return S_POU_HL7_CONFIG_DETAILS_FAILED
                        End If
                    Catch ex As Exception
                        If log.IsFatalEnabled Then log.Fatal("Exception Thrown in " & methodBaseName & " is.. " & vbCrLf & ex.ToString)
                        Return S_POU_HL7_CONFIG_DETAILS_FAILED
                    End Try
                    'As Socket connection is not establishing, so we are waiting here to connect.
                    Thread.Sleep(1000)
                End If

                For intCnt As Integer = 0 To pDSInputParams.Tables(0).Rows.Count - 1
                    _transId = pDSInputParams.Tables(0).Rows(intCnt).Item("TRANSACTION_ID").ToString
                    _intCounter = _intCounter + 1
                    _dblItemCnt = 0
                    If Not IsDBNull(pDSInputParams.Tables(0).Rows(intCnt).Item("ITEM_COUNT")) Then
                        If Not String.IsNullOrEmpty(pDSInputParams.Tables(0).Rows(intCnt).Item("ITEM_COUNT")) Then
                            _dblItemCnt = pDSInputParams.Tables(0).Rows(intCnt).Item("ITEM_COUNT")
                        End If
                    End If

                    _dblIssuedQty = 0
                    If Not IsDBNull(pDSInputParams.Tables(0).Rows(intCnt).Item("ISSUE_QTY")) Then
                        If Not String.IsNullOrEmpty(pDSInputParams.Tables(0).Rows(intCnt).Item("ISSUE_QTY")) Then
                            _dblIssuedQty = pDSInputParams.Tables(0).Rows(intCnt).Item("ISSUE_QTY")
                        End If
                    End If

                    _dblWastageQty = 0
                    If Not IsDBNull(pDSInputParams.Tables(0).Rows(intCnt).Item("WASTAGE_QTY")) Then
                        If Not String.IsNullOrEmpty(pDSInputParams.Tables(0).Rows(intCnt).Item("WASTAGE_QTY")) Then
                            _dblWastageQty = pDSInputParams.Tables(0).Rows(intCnt).Item("WASTAGE_QTY")
                        End If
                    End If

                    _dblReturnQty = 0
                    If Not IsDBNull(pDSInputParams.Tables(0).Rows(intCnt).Item("RETURN_QTY")) Then
                        If Not String.IsNullOrEmpty(pDSInputParams.Tables(0).Rows(intCnt).Item("RETURN_QTY")) Then
                            _dblReturnQty = pDSInputParams.Tables(0).Rows(intCnt).Item("RETURN_QTY")
                        End If
                    End If

                    'If _strBillOnlyItemFlag <> CONST_BILL_ONLT_ITEM Then 'Bill Only Item
                    'From HHT, Item count is getting as (Pick qty - Return qty), 
                    'so we are adding return qty to the item count to get exact Vend qty
                    If (_dblItemCnt + _dblIssuedQty + _dblReturnQty) > 0 Then
                        _xmlNodeList = _xmlDoc.DocumentElement.SelectNodes("//NET_ITEM_USAGE_DATA/field[@segment='FINANCIAL_TRANSACTION']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))
                        'FT1
                        _statusCode = BuildSegmantFormat(pDSInputParams.Tables(0).Rows(intCnt), _sbFT1, pDeviceTokenEntry(TokenEntry_Enum.SystemId), _xmlNodeHeaderList, _xmlNodeList, _intCounter, HL7_TRANSACTION_TYPE.V.ToString, (_dblItemCnt + _dblIssuedQty + _dblReturnQty), _strPickListID)
                        If _statusCode <> ATPAR_OK Then
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in BuildFT1 with StatusCode :" & _statusCode)
                            Return E_SERVERERROR
                        End If

                        If _dblWastageQty <> 0 Then

                            _statusCode = BuildSegmantFormat(pDSInputParams.Tables(0).Rows(intCnt), _sbFT1Wastage, pDeviceTokenEntry(TokenEntry_Enum.SystemId), _xmlNodeHeaderList, _xmlNodeList, _intCounter, HL7_TRANSACTION_TYPE.W.ToString, _dblWastageQty, _strPickListID)

                            If _statusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in BuildFT1 with Wastage qty StatusCode :" & _statusCode)
                                Return E_SERVERERROR
                            End If
                        End If

                        If _dblReturnQty <> 0 Then
                            _statusCode = BuildSegmantFormat(pDSInputParams.Tables(0).Rows(intCnt), _sbFT1Return, pDeviceTokenEntry(TokenEntry_Enum.SystemId), _xmlNodeHeaderList, _xmlNodeList, _intCounter, HL7_TRANSACTION_TYPE.R.ToString, _dblReturnQty, _strPickListID)

                            If _statusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in BuildFT1 with Return qty StatusCode :" & _statusCode)
                                Return E_SERVERERROR
                            End If

                        End If
                        'ZPM
                        _xmlNodeList = _xmlDoc.DocumentElement.SelectNodes("//NET_ITEM_USAGE_DATA/field[@segment='ADDL_SUPPLY_USAGE']").Cast(Of XmlNode)().OrderBy(Function(node) CInt(node.Attributes("field_no").Value))

                        _statusCode = BuildSegmantFormat(pDSInputParams.Tables(0).Rows(intCnt), _sbZPM, pDeviceTokenEntry(TokenEntry_Enum.SystemId), _xmlNodeHeaderList, _xmlNodeList)

                        If _statusCode <> ATPAR_OK Then
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in BuildZPM with StatusCode :" & _statusCode)
                            Return E_SERVERERROR
                        End If

                        ''' For Vendor
                        With _sbTotalSegment
                            .Append(Chr(11))
                            .Append(_sbMSH.ToString)
                            .Append(Chr(13))
                            .Append(_sbPID.ToString)
                            .Append(Chr(13))
                            .Append(_sbFT1.ToString)
                            .Append(Chr(13))
                            .Append(_sbZPM.ToString)
                            .Append(Chr(13))
                            .Append(Chr(28))
                            .Append(Chr(13))
                        End With

                        'For Wastage
                        If _sbFT1Wastage.Length > 0 Then
                            With _sbTotalWastageSegment
                                .Append(Chr(11))
                                .Append(_sbMSH.ToString)
                                .Append(Chr(13))
                                .Append(_sbPID.ToString)
                                .Append(Chr(13))
                                .Append(_sbFT1Wastage.ToString)
                                .Append(Chr(13))
                                .Append(_sbZPM.ToString)
                                .Append(Chr(13))
                                .Append(Chr(28))
                                .Append(Chr(13))
                            End With
                        End If

                        'For Return
                        If _sbFT1Return.Length > 0 Then
                            With _sbTotalReturnSegment
                                .Append(Chr(11))
                                .Append(_sbMSH.ToString)
                                .Append(Chr(13))
                                .Append(_sbPID.ToString)
                                .Append(Chr(13))
                                .Append(_sbFT1Return.ToString)
                                .Append(Chr(13))
                                .Append(_sbZPM.ToString)
                                .Append(Chr(13))
                                .Append(Chr(28))
                                .Append(Chr(13))
                            End With
                        End If


                        If log.IsDebugEnabled Then log.Debug(methodBaseName & ":TotalSegment for Vendor:" & _sbTotalSegment.ToString)
                        If _sbTotalWastageSegment.Length > 0 Then
                            If log.IsDebugEnabled Then log.Debug(methodBaseName & ":TotalSegment for Wastage:" & _sbTotalWastageSegment.ToString)
                        End If
                        If _sbTotalReturnSegment.Length > 0 Then
                            If log.IsDebugEnabled Then log.Debug(methodBaseName & ":TotalSegment for Return:" & _sbTotalReturnSegment.ToString)
                        End If

                        Dim _strFileName As String = String.Empty
                        Dim _strPath As String = String.Empty


                        _intLineNo = 0
                        If Not IsDBNull(pDSInputParams.Tables(0).Rows(intCnt).Item("LINE_NO")) Then
                            If Not String.IsNullOrEmpty(pDSInputParams.Tables(0).Rows(intCnt).Item("LINE_NO")) Then
                                _intLineNo = CInt(pDSInputParams.Tables(0).Rows(intCnt).Item("LINE_NO").ToString)
                            End If
                        End If

                        If pSendNetItemUsgInfo = YesNo_Enum.Y.ToString Then

                            'Vend Message Sending to Clinical System
                            _strErrormsg = String.Empty
                            _statusCode = objAtparBr.SendToClinicalSystem(_sbTotalSegment, pSendNetItemUsgInfo, pDeviceTokenEntry, _transmissionStatus, _strErrormsg, m_mainSocket)

                            If _statusCode = S_POU_HL7_CONFIG_DETAILS_FAILED Then
                                _HL7StatusCode = RecordHL7Message(pDSInputParams.Tables(0).Rows(intCnt), _sbTotalSegment.ToString, pDeviceTokenEntry, S_POU_HL7_CONFIG_DETAILS_FAILED, HL7_TRANSACTION_TYPE.V.ToString, _strErrormsg)
                            Else
                                _HL7StatusCode = RecordHL7Message(pDSInputParams.Tables(0).Rows(intCnt), _sbTotalSegment.ToString, pDeviceTokenEntry, _transmissionStatus, HL7_TRANSACTION_TYPE.V.ToString, _strErrormsg)
                            End If

                            'Record HL7 Vend messasge into DB

                            'Save the File if Insertion failed in transmission table
                            If _HL7StatusCode <> ATPAR_OK Then
                                Try
                                    _FileCreationstatus = FileStreamWriterNetItem(_strFileName, _intLineNo, _sbTotalSegment, HL7_TRANSACTION_TYPE.V.ToString, _transmissionStatus, _transId, _strBillingUploadPath)
                                Catch ex As Exception
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to stream line the net item usage info:" & ex.ToString)
                                End Try
                            Else
                                Try
                                    _FileCreationstatus = FileStreamWriterNetItem(_strFileName, _intLineNo, _sbTotalSegment, HL7_TRANSACTION_TYPE.V.ToString, _transmissionStatus, _transId, _strBillingUploadPath)
                                Catch ex As Exception
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to stream line the net item usage info:" & ex.ToString)
                                End Try
                            End If

                            'Wastage Message Sending to Clinical System
                            If _sbTotalWastageSegment.Length > 0 Then
                                _strErrormsg = String.Empty
                                _statusCode = objAtparBr.SendToClinicalSystem(_sbTotalWastageSegment, pSendNetItemUsgInfo, pDeviceTokenEntry, _transmissionStatus, _strErrormsg, m_mainSocket)
                                'Record HL7 Wastage messasge into DB

                                If _statusCode = S_POU_HL7_CONFIG_DETAILS_FAILED Then
                                    _HL7StatusCode = RecordHL7Message(pDSInputParams.Tables(0).Rows(intCnt), _sbTotalWastageSegment.ToString, pDeviceTokenEntry, S_POU_HL7_CONFIG_DETAILS_FAILED, HL7_TRANSACTION_TYPE.W.ToString, _strErrormsg)
                                Else
                                    _HL7StatusCode = RecordHL7Message(pDSInputParams.Tables(0).Rows(intCnt), _sbTotalWastageSegment.ToString, pDeviceTokenEntry, _transmissionStatus, HL7_TRANSACTION_TYPE.W.ToString, _strErrormsg)
                                End If


                                If _HL7StatusCode <> ATPAR_OK Then
                                    'Save the File
                                    _FileCreationstatus = FileStreamWriterNetItem(_strFileName, _intLineNo, _sbTotalWastageSegment, HL7_TRANSACTION_TYPE.W.ToString, _transmissionStatus, _transId, _strBillingUploadPath)
                                Else
                                    _FileCreationstatus = FileStreamWriterNetItem(_strFileName, _intLineNo, _sbTotalWastageSegment, HL7_TRANSACTION_TYPE.W.ToString, _transmissionStatus, _transId, _strBillingUploadPath)
                                End If
                            End If

                            If _sbTotalReturnSegment.Length > 0 Then
                                _strErrormsg = String.Empty
                                'Return Message Sending to Clinical System
                                _statusCode = objAtparBr.SendToClinicalSystem(_sbTotalReturnSegment, pSendNetItemUsgInfo, pDeviceTokenEntry, _transmissionStatus, _strErrormsg, m_mainSocket)
                                'Record HL7 Return messasge into DB

                                If _statusCode = S_POU_HL7_CONFIG_DETAILS_FAILED Then
                                    _HL7StatusCode = RecordHL7Message(pDSInputParams.Tables(0).Rows(intCnt), _sbTotalReturnSegment.ToString, pDeviceTokenEntry, S_POU_HL7_CONFIG_DETAILS_FAILED, HL7_TRANSACTION_TYPE.R.ToString, _strErrormsg)
                                Else
                                    _HL7StatusCode = RecordHL7Message(pDSInputParams.Tables(0).Rows(intCnt), _sbTotalReturnSegment.ToString, pDeviceTokenEntry, _transmissionStatus, HL7_TRANSACTION_TYPE.R.ToString, _strErrormsg)
                                End If
                                If _HL7StatusCode <> ATPAR_OK Then
                                    'Save the File
                                    _FileCreationstatus = FileStreamWriterNetItem(_strFileName, _intLineNo, _sbTotalReturnSegment, HL7_TRANSACTION_TYPE.R.ToString, _transmissionStatus, _transId, _strBillingUploadPath)
                                Else
                                    _FileCreationstatus = FileStreamWriterNetItem(_strFileName, _intLineNo, _sbTotalReturnSegment, HL7_TRANSACTION_TYPE.R.ToString, _transmissionStatus, _transId, _strBillingUploadPath)
                                End If
                            End If

                            If _statusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in SendToClinicalSystem : " & _statusCode)
                                If _statusCode <> S_POU_NETITEMUSAGE_STATUS Then
                                    Return _statusCode
                                End If
                            End If

                        Else 'If pSendNetItemUsgInfo = YesNo_Enum.Y.ToString

                            _strPath = NetItemUsage_Files_Folder.NetItemUsage.ToString & "\"
                            _strFileName = _strBillingUploadPath & _strPath & _transId.ToString

                            Try
                                _statusCode = FileStreamWriterNetItem(_strFileName, _intLineNo, _sbTotalSegment, HL7_TRANSACTION_TYPE.V.ToString)
                                If _statusCode = ATPAR_OK Then
                                    If _sbTotalWastageSegment.Length > 0 Then
                                        _statusCode = FileStreamWriterNetItem(_strFileName, _intLineNo, _sbTotalWastageSegment, HL7_TRANSACTION_TYPE.W.ToString)
                                    End If
                                End If

                                If _statusCode = ATPAR_OK Then
                                    If _sbTotalReturnSegment.Length > 0 Then
                                        _statusCode = FileStreamWriterNetItem(_strFileName, _intLineNo, _sbTotalReturnSegment, HL7_TRANSACTION_TYPE.R.ToString)
                                    End If
                                End If

                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to stream line the net item usage info:" & ex.ToString)
                            End Try

                        End If

                        _sbFT1.Remove(0, _sbFT1.Length)
                        _sbFT1Wastage.Remove(0, _sbFT1Wastage.Length)
                        _sbFT1Return.Remove(0, _sbFT1Return.Length)
                        _sbZPM.Remove(0, _sbZPM.Length)
                        _sbTotalSegment.Remove(0, _sbTotalSegment.Length)
                        _sbTotalWastageSegment.Remove(0, _sbTotalWastageSegment.Length)
                        _sbTotalReturnSegment.Remove(0, _sbTotalReturnSegment.Length)

                    Else
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Transaction Quantity is zero, so skipping the ItemID: " & _
                                pDSInputParams.Tables(0).Rows(intCnt).Item("ITEM_ID").ToString & " , SerialID : " & _
                                pDSInputParams.Tables(0).Rows(intCnt).Item("SERIAL_ID").ToString & " , LotID : " & _
                                pDSInputParams.Tables(0).Rows(intCnt).Item("LOT_ID").ToString & ":" & vbCrLf)
                    End If

                Next

                Return _statusCode


            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Failed in " & methodBaseName & " with Exception :" & ex.Message.ToString)
            Return E_SERVERERROR
        Finally
            _sbMSH = Nothing
            _sbFT1 = Nothing
            _sbPID = Nothing
            _sbFT1Wastage = Nothing
            _sbFT1Return = Nothing
            _sbZPM = Nothing
            _sbTotalSegment = Nothing
            If Not (m_mainSocket Is Nothing) Then
                Thread.Sleep(1000)
                m_mainSocket.Shutdown(SocketShutdown.Both)
                m_mainSocket.Close()
                If log.IsDebugEnabled Then log.Debug(methodBaseName & "::" & "Socket connection closed:")
            End If
        End Try

    End Function

    ''' <summary>
    ''' FileStreamWriter
    ''' </summary>
    ''' <param name="pFilePrimaryName"></param>
    ''' <param name="pFileSequenceNo"></param>
    ''' <param name="_sbSegment"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function FileStreamWriterNetItem(ByVal pFilePrimaryName As String, ByVal pFileSequenceNo As Integer, _
                                     ByVal _sbSegment As StringBuilder, ByVal pTransactionType As String, _
                                     Optional pTransactionStatus As Integer = 0, Optional pTransID As Long = 0, _
                                     Optional pStrBillingUploadPath As String = "") As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        'Writing the msg into file
        If pFilePrimaryName = String.Empty Then
            Dim _strPath As String = String.Empty
            If pTransactionStatus = HL7_MESSAGE_SENT_STATUS.SUCESS Then
                _strPath = NetItemUsage_Files_Folder.NetItemUsage.ToString & "\" & NetItemUsage_Files_Folder.Processed.ToString & "\"
            Else
                _strPath = NetItemUsage_Files_Folder.NetItemUsage.ToString & "\" & NetItemUsage_Files_Folder.Error.ToString & "\"
            End If
            pFilePrimaryName = pStrBillingUploadPath & _strPath & pTransID.ToString
        End If

        Try
            Dim sw As StreamWriter = New StreamWriter(pFilePrimaryName & "_" & pFileSequenceNo & "_" & pTransactionType & "_" & Now().ToString("yyyyMMddHHmmssms") & ".txt")
            sw.WriteLine(_sbSegment.ToString)
            sw.Close()
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to writing data to a file:" & ex.ToString)
        End Try
    End Function

    ''' <summary>
    ''' BuildSegmantFormat
    ''' </summary>
    ''' <param name="pDRInputParams"></param>
    ''' <param name="pSbformat"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="_xmlNodeHeaderList"></param>
    ''' <param name="_xmlNodelist"></param>
    ''' <param name="pCounter"></param>
    ''' <param name="pTransactionType"></param>
    ''' <param name="pQty"></param>
    ''' <returns>Error/Success Status Code</returns>
    ''' <remarks></remarks>
    Private Function BuildSegmantFormat(ByVal pDRInputParams As DataRow, ByRef pSbformat As StringBuilder, _
                                           ByVal pSystemID As String, ByVal _xmlHdrNodeList As IOrderedEnumerable(Of XmlNode), _xmlNodelist As IOrderedEnumerable(Of XmlNode), Optional pCounter As Integer = 0, _
                                        Optional ByVal pTransactionType As String = "none", Optional ByVal pQty As Double = 0, _
                                        Optional ByVal pPickListID As String = "") As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strXmlValueType As String = String.Empty
        Dim _strXmlValue As String = String.Empty
        Dim _strResultValue As String = String.Empty
        Dim _strXmldatatype As String = String.Empty
        Dim _strXmlFieldName As String = String.Empty
        Dim _strXmldateformat As String = String.Empty
        Dim _strXmlSegmentValue As String = String.Empty
        Dim _strXmlField_Number As String = String.Empty
        Dim _strMsgEncodingChars As String = String.Empty
        Dim _strMsgFieldSeperator As String = String.Empty
        Dim _strDefValue As String = String.Empty
        Dim _xmlHdrSegment As String = String.Empty
        Dim _strXmlsubSegmentNo As String = String.Empty
        Dim _strXmlsubSegmentCount As String = String.Empty
        Dim _strXmlsubSegmentsep As String = String.Empty
        Dim _strPrevioussegmentNo As String = String.Empty
        _strMsgFieldSeperator = "|"
        _strMsgEncodingChars = "^~\&"
        Dim _strmaxlength As String = String.Empty
        Try


            If _xmlNodelist.Count > 0 Then
                For intNodeCnt As Integer = 0 To _xmlNodelist.Count - 1
                    _strmaxlength = String.Empty
                    If _xmlNodelist(intNodeCnt).Attributes.Count > 0 Then
                        With pSbformat
                            _strResultValue = String.Empty
                            Try
                                '_strXmlSegmentValue = _xmlNodelist(intNodeCnt).Attributes("segment").Value
                                'Getting message segment
                                If _xmlHdrNodeList.Count > 0 Then
                                    For intHdrNodeCnt As Integer = 0 To _xmlHdrNodeList.Count - 1
                                        _xmlHdrSegment = _xmlHdrNodeList(intHdrNodeCnt).Attributes("segment").Value
                                        If (_xmlHdrSegment.ToString = _xmlNodelist(intNodeCnt).Attributes("segment").Value) Then
                                            _strXmlSegmentValue = _xmlHdrNodeList(intHdrNodeCnt).Attributes("value").Value
                                        End If
                                    Next
                                End If
                                'End of getting message segment
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'segment' " & _
                                         "attribute has been specified in the <NET_ITEM_USAGE_DATA/field> tag" & ex.ToString())
                                Return E_SERVERERROR
                            End Try

                            If intNodeCnt = 0 Then
                                If _strXmlSegmentValue = "MSH" Then
                                    .Append(_strXmlSegmentValue)
                                Else
                                    .Append(_strXmlSegmentValue)
                                    .Append(_strMsgFieldSeperator)
                                End If

                            End If


                            Try
                                _strXmlValueType = _xmlNodelist(intNodeCnt).Attributes("value_type").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'value_type' " & _
                                         "attribute has been specified in the <NET_ITEM_USAGE_DATA/field> tag" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strXmlValue = _xmlNodelist(intNodeCnt).Attributes("value").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'value' " & _
                                         "attribute has been specified in the <NET_ITEM_USAGE_DATA/field> tag" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strmaxlength = _xmlNodelist(intNodeCnt).Attributes("maxlength").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'value' " & _
                                                        "attribute has been specified in the <NET_ITEM_USAGE_DATA/field> tag" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strXmlField_Number = _xmlNodelist(intNodeCnt).Attributes("field_no").Value

                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'field_no' " & _
                                         "attribute has been specified in the <NET_ITEM_USAGE_DATA/field> tag" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strXmldatatype = _xmlNodelist(intNodeCnt).Attributes("data_type").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'data_type' " & _
                                         "attribute has been specified in the <NET_ITEM_USAGE_DATA/field> tag" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strXmlFieldName = _xmlNodelist(intNodeCnt).Attributes("name").Value
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'name' " & _
                                         "attribute has been specified in the <NET_ITEM_USAGE_DATA/field> tag" & ex.ToString())
                                Return E_SERVERERROR
                            End Try
                            Try
                                _strXmlsubSegmentCount = _xmlNodelist(intNodeCnt).Attributes("sub_segments_count").Value

                            Catch ex As Exception
                                ' TODO need to see if there is a better way to avoid exceptions if the default_value attribute is not present
                            End Try

                            Try
                                _strXmlsubSegmentNo = _xmlNodelist(intNodeCnt).Attributes("sub_segment_no").Value

                            Catch ex As Exception
                                ' TODO need to see if there is a better way to avoid exceptions if the default_value attribute is not present
                            End Try
                            Try
                                _strXmlsubSegmentsep = _xmlNodelist(intNodeCnt).Attributes("sub_segment_sep").Value

                            Catch ex As Exception
                                ' TODO need to see if there is a better way to avoid exceptions if the default_value attribute is not present
                            End Try

                            If String.IsNullOrEmpty(_strXmlValueType) Or String.IsNullOrEmpty(_strXmldatatype) _
                                Or String.IsNullOrEmpty(_strXmlFieldName) Then
                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed NetItemUsage rules file, " & _
                                                                  "one of the attribute values is empty")
                                Return E_SERVERERROR
                            End If
                            Try
                                _strDefValue = _xmlNodelist(intNodeCnt).Attributes("default_value").Value
                            Catch ex As Exception
                                ' TODO need to see if there is a better way to avoid exceptions if the default_value attribute is not present
                            End Try

                            Try
                                Select Case _strXmlValueType.ToString

                                    Case VALUETYPES.ATPAR_CONDITION.ToString
                                        Select Case _strXmlFieldName
                                            Case MSH.SENDING_APPLICATION.ToString
                                                .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.SENDING_APPLICATION.ToString))
                                            Case MSH.SENDING_FACILITY.ToString
                                                .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.SENDING_FACILITY.ToString))
                                            Case MSH.RECEIVING_APPLICATION.ToString
                                                .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.RECEIVING_APPLICATION.ToString))
                                            Case MSH.RECEIVING_FACILITY.ToString
                                                .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.RECEIVING_FACILITY.ToString))
                                            Case MSH.VERSION_ID.ToString
                                                .Append(GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.ADT_VERSION.ToString))
                                            Case MSH.ENCODING_CHARACTERS.ToString
                                                .Append(_strMsgEncodingChars)
                                            Case FT1.TRANSACTION_TYPE.ToString
                                                .Append(pTransactionType.ToString)
                                            Case FT1.TRANSACTION_QUANTITY.ToString
                                                .Append(pQty)
                                            Case FT1.SET_ID_FINANCIAL_TRANSACTION.ToString
                                                If Not IsDBNull(_strXmlValue) AndAlso Not String.IsNullOrEmpty(_strXmlValue) Then
                                                    If _strXmlValue = "COUNTER" Then
                                                        .Append(pCounter)
                                                    End If
                                                End If
                                            Case ZPM.STATION_NAME.ToString
                                                If Not IsDBNull(pDRInputParams(_strXmlValue)) AndAlso Not String.IsNullOrEmpty(pDRInputParams(_strXmlValue)) Then
                                                    .Append(pDRInputParams(_strXmlValue).ToString)
                                                Else
                                                    .Append(_strDefValue.ToString)
                                                End If
                                            Case FT1.PICK_LIST_ID.ToString
                                                .Append(pPickListID)
                                            Case ZPM.IMPLANT.ToString
                                                If Not IsDBNull(pDRInputParams(_strXmlValue)) AndAlso Not String.IsNullOrEmpty(pDRInputParams(_strXmlValue)) Then
                                                    If pDRInputParams(_strXmlValue).ToString = S_IMPLANT_ITEM Then
                                                        .Append(YesNo_Enum.Y.ToString)
                                                    Else
                                                        .Append(YesNo_Enum.N.ToString)
                                                    End If
                                                Else
                                                    .Append(YesNo_Enum.N.ToString)
                                                End If
                                        End Select
                                    Case VALUETYPES.ATPAR_DETAILS.ToString
                                        Select Case _strXmlFieldName
                                            Case PID.PATIENT_NAME.ToString
                                                If String.IsNullOrEmpty(pDRInputParams(_strXmlValue).ToString) Then
                                                    .Append(" ")
                                                Else
                                                    .Append(pDRInputParams(_strXmlValue).ToString)
                                                End If

                                            Case PID.PATIENT_ID.ToString

                                                If Not String.IsNullOrEmpty(_strPrevioussegmentNo) And Not String.IsNullOrEmpty(_strXmlsubSegmentNo) Then
                                                    .Append(String.Concat(Enumerable.Repeat(_strXmlsubSegmentsep, _strXmlsubSegmentNo - _strPrevioussegmentNo)))
                                                ElseIf Not String.IsNullOrEmpty(_strXmlsubSegmentNo) AndAlso _strXmlsubSegmentNo > 1 Then
                                                    .Append(String.Concat(Enumerable.Repeat(_strXmlsubSegmentsep, _strXmlsubSegmentNo - 1)))
                                                End If

                                                If Not String.IsNullOrEmpty(_strXmlValue) Then
                                                    .Append(pDRInputParams(_strXmlValue).ToString)
                                                ElseIf Not String.IsNullOrEmpty(_strDefValue) Then
                                                    .Append(_strDefValue)
                                                End If
                                                If Not String.IsNullOrEmpty(_strXmlsubSegmentNo) AndAlso Not String.IsNullOrEmpty(_strXmlsubSegmentCount) Then
                                                    If _strXmlsubSegmentCount > _strXmlsubSegmentNo Then
                                                        _strPrevioussegmentNo = _strXmlsubSegmentNo
                                                        Continue For
                                                    End If
                                                End If

                                            Case FT1.TRANSACTION_CODE.ToString
                                                If Not String.IsNullOrEmpty(_strPrevioussegmentNo) And Not String.IsNullOrEmpty(_strXmlsubSegmentNo) Then
                                                    .Append(String.Concat(Enumerable.Repeat(_strXmlsubSegmentsep, _strXmlsubSegmentNo - _strPrevioussegmentNo)))
                                                ElseIf Not String.IsNullOrEmpty(_strXmlsubSegmentNo) AndAlso _strXmlsubSegmentNo > 1 Then
                                                    .Append(String.Concat(Enumerable.Repeat(_strXmlsubSegmentsep, _strXmlsubSegmentNo - 1)))
                                                End If
                                                .Append(pDRInputParams(_strXmlValue).ToString)
                                                If Not String.IsNullOrEmpty(_strXmlsubSegmentNo) AndAlso Not String.IsNullOrEmpty(_strXmlsubSegmentCount) Then
                                                    If _strXmlsubSegmentCount > _strXmlsubSegmentNo Then
                                                        _strPrevioussegmentNo = _strXmlsubSegmentNo
                                                        Continue For
                                                    End If
                                                End If

                                            Case ZPM.EXPIRY_DATE.ToString

                                                Try

                                                    If Not IsDBNull(pDRInputParams(_strXmlValue)) AndAlso Not String.IsNullOrEmpty(pDRInputParams(_strXmlValue)) Then
                                                        _strXmldateformat = _xmlNodelist(intNodeCnt).Attributes("format").Value
                                                        .Append((Convert.ToDateTime(pDRInputParams(_strXmlValue)).ToString(_strXmldateformat.ToString)))
                                                    End If


                                                Catch ex As Exception
                                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'format' " & _
                                                             "attribute has been specified in the <NEt_ITEM_USAGE_DATA/field> tag" & ex.ToString())

                                                    Return E_SERVERERROR
                                                End Try
                                            Case Else
                                                If _strXmlValue = "LOT_ID" Or _strXmlValue = "SERIAL_ID" Then
                                                    If pDRInputParams(_strXmlValue).ToString.Length > CInt(_strmaxlength) Then
                                                        .Append(pDRInputParams(_strXmlValue).ToString.Substring(0, _strmaxlength))
                                                    Else
                                                        .Append(pDRInputParams(_strXmlValue).ToString)
                                                    End If
                                                Else
                                                    .Append(pDRInputParams(_strXmlValue).ToString)
                                                End If
                                        End Select
                                    Case VALUETYPES.DEFAULT.ToString
                                        .Append(_strXmlValue).ToString()
                                End Select
                                Select Case _strXmldatatype

                                    Case DATATYPES.DATETIME.ToString

                                        If _strXmlValueType = VALUETYPES.DEFAULT.ToString Then
                                            Try
                                                _strXmldateformat = _xmlNodelist(intNodeCnt).Attributes("format").Value
                                                .Append((Convert.ToDateTime(Now).ToString(_strXmldateformat.ToString)))


                                            Catch ex As Exception
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'format' " & _
                                                         "attribute has been specified in the <NEt_ITEM_USAGE_DATA/field> tag" & ex.ToString())

                                                Return E_SERVERERROR
                                            End Try
                                        End If

                                End Select
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Invalid Value " & _strXmlValueType & " for field " & _
                                              _strXmlFieldName & " in the <NEt_ITEM_USAGE_DATA> tag" & _
                                                                               ex.ToString)
                                Return E_SERVERERROR
                            End Try
                            'appending pipe symbol for each field
                            .Append(_strMsgFieldSeperator)
                        End With
                    End If
                Next

            Else
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if " & _
                  _strXmlSegmentValue & ":" & "attribute has been specified in the <NEt_ITEM_USAGE_DATA/field> tag")

                Return E_SERVERERROR
            End If
            pSbformat = pSbformat.Remove(pSbformat.ToString.LastIndexOf("|"), 1)

            If log.IsDebugEnabled Then log.Debug(methodBaseName & _strXmlSegmentValue & " :" & pSbformat.ToString)

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Failed in " & methodBaseName & " with Exception :" & ex.Message.ToString)
            Return E_SERVERERROR
        End Try

    End Function

    ''' <summary>
    ''' SendNetItemUsageHL7PendingInfo
    ''' </summary>
    ''' <param name="pSendNetItemUsgPendingInfo"></param>
    ''' <param name="pDeviceTokenEntry"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function SendNetItemUsageHL7PendingInfo(ByVal pSendNetItemUsgPendingInfo As DataSet, ByVal pDeviceTokenEntry() As String) As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = pDeviceTokenEntry(TokenEntry_Enum.UserID)
        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pDeviceTokenEntry(TokenEntry_Enum.SystemId)

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Long = 0
        Dim _strHL7Message As New StringBuilder
        Dim _lngUniqueID As Long
        Dim _transmissionStatus As Integer
        Dim _strErrormsg As String = String.Empty
        Dim objAtparBr As New AtPar_BusinessRules.AtPar_Billing_SocketManagement

        If log.IsDebugEnabled Then log.Debug(methodBaseName & "::" & "Sending Pending messages data to HL7 engine:")

        Try
            m_mainSocket = New Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
            _statusCode = objAtparBr.SocketAddress_Connection(m_mainSocket, pDeviceTokenEntry(TokenEntry_Enum.SystemId))

            If _statusCode <> ATPAR_OK Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & ":Failed to begin the connection : " & _statusCode)
                'As this is pending info we are not throwing any message
                _statusCode = S_POU_HL7_CONFIG_DETAILS_FAILED
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Exception Thrown in " & methodBaseName & " is.. " & vbCrLf & ex.ToString)
            'As this is pending info we are not throwing any message
            _statusCode = S_POU_HL7_CONFIG_DETAILS_FAILED
        End Try

        Try
            'As Socket connection is not establishing, so we are waiting here to connect.
            ' Thread.Sleep(1000)
            For intCnt As Integer = 0 To pSendNetItemUsgPendingInfo.Tables(0).Rows.Count - 1

                _strHL7Message.Remove(0, _strHL7Message.Length)
                _lngUniqueID = 0
                _strErrormsg = String.Empty
                If Not IsDBNull(pSendNetItemUsgPendingInfo.Tables(0).Rows(intCnt).Item("HL7_MESSAGE")) _
                   AndAlso Not String.IsNullOrEmpty(pSendNetItemUsgPendingInfo.Tables(0).Rows(intCnt).Item("HL7_MESSAGE").ToString) Then

                    _strHL7Message.Append(pSendNetItemUsgPendingInfo.Tables(0).Rows(intCnt).Item("HL7_MESSAGE").ToString())

                    _lngUniqueID = CType(pSendNetItemUsgPendingInfo.Tables(0).Rows(intCnt).Item("ID").ToString(), Long)

                    If _statusCode = S_POU_HL7_CONFIG_DETAILS_FAILED Then ' If configuration details are not provided, we have to update the status as failed
                        _statusCode = HL7MessageUpdate(_lngUniqueID, HL7_MESSAGE_SENT_STATUS.FAILED, pDeviceTokenEntry)
                    Else
                        _statusCode = objAtparBr.SendToClinicalSystem(_strHL7Message, YesNo_Enum.Y.ToString, pDeviceTokenEntry, _transmissionStatus, _strErrormsg, m_mainSocket)
                        _statusCode = HL7MessageUpdate(_lngUniqueID, _transmissionStatus, pDeviceTokenEntry)
                    End If

                End If
            Next

            Return _statusCode

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("Failed in " & methodBaseName & " with Exception :" & ex.Message.ToString)
            Return E_SERVERERROR
        Finally
            If Not (m_mainSocket Is Nothing) Then
                Thread.Sleep(10000)
                m_mainSocket.Shutdown(SocketShutdown.Both)
                m_mainSocket.Close()
                If log.IsDebugEnabled Then log.Debug(methodBaseName & "::" & "Socket connection closed:")
            End If
        End Try

    End Function

    ''' <summary>
    '''  RecordHL7Message
    ''' </summary>
    ''' <param name="_drItemDtls"></param>
    ''' <param name="pHL7Info"></param>
    ''' <param name="pDeviceTokenEntry"></param>
    ''' <param name="pSentstatus"></param>
    ''' <param name="pTransactionType"></param>
    ''' <param name="pErrorMessage"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function RecordHL7Message(ByVal _drItemDtls As DataRow, ByVal pHL7Info As String, _
                                ByVal pDeviceTokenEntry() As String, ByVal pSentstatus As Integer, _
                                ByVal pTransactionType As String, ByVal pErrorMessage As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(":" & methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _intmsgtype As Integer
        Dim _statuscode As Long = 0

        Try
            Try
                CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
                Return E_SERVERERROR
            End Try

            If pTransactionType = HL7_TRANSACTION_TYPE.V.ToString Then
                _intmsgtype = HL7_MESSAGE_TYPE.NIU_V
            ElseIf pTransactionType = HL7_TRANSACTION_TYPE.W.ToString Then
                _intmsgtype = HL7_MESSAGE_TYPE.NIU_W
            ElseIf pTransactionType = HL7_TRANSACTION_TYPE.R.ToString Then
                _intmsgtype = HL7_MESSAGE_TYPE.NIU_R
            End If


            Dim _Cmd As SqlCommand
            Dim sqlParms() As SqlParameter = New SqlParameter(13) {}

            sqlParms(0) = New SqlParameter("@TransactionID", SqlDbType.BigInt)
            sqlParms(0).Value = _drItemDtls("TRANSACTION_ID")

            sqlParms(1) = New SqlParameter("@AppID", SqlDbType.SmallInt)
            sqlParms(1).Value = EnumApps.PointOfUse

            sqlParms(2) = New SqlParameter("@CaseID", SqlDbType.NVarChar)
            sqlParms(2).Value = _drItemDtls("CASE_ID")

            sqlParms(3) = New SqlParameter("@ItemID", SqlDbType.NVarChar)
            sqlParms(3).Value = _drItemDtls("ITEM_ID")

            sqlParms(4) = New SqlParameter("@PrefListID", SqlDbType.NVarChar)
            sqlParms(4).Value = _drItemDtls("PREF_LIST_ID")

            sqlParms(5) = New SqlParameter("@ProcCode", SqlDbType.NVarChar)
            sqlParms(5).Value = _drItemDtls("PROCEDURE_CODE")

            If Not IsDBNull(_drItemDtls("CUSTOM_ITEM_NO")) AndAlso Not String.IsNullOrEmpty(_drItemDtls("CUSTOM_ITEM_NO").ToString) Then
                sqlParms(6) = New SqlParameter("@CustomItemNo", SqlDbType.NVarChar)
                sqlParms(6).Value = _drItemDtls("CUSTOM_ITEM_NO")
            Else
                sqlParms(6) = New SqlParameter("@CustomItemNo", SqlDbType.NVarChar)
                sqlParms(6).Value = _drItemDtls("ITEM_ID")
            End If
            sqlParms(7) = New SqlParameter("@HL7MessageType", SqlDbType.Char)
            sqlParms(7).Value = _intmsgtype

            sqlParms(8) = New SqlParameter("@HL7MessageSentStatus", SqlDbType.Char)
            sqlParms(8).Value = pSentstatus

            sqlParms(9) = New SqlParameter("@HL7Message", SqlDbType.NVarChar)
            sqlParms(9).Value = pHL7Info

            sqlParms(10) = New SqlParameter("@ErrorMessage", SqlDbType.NVarChar)
            sqlParms(10).Value = pErrorMessage

            sqlParms(11) = New SqlParameter("@UpdateDate", SqlDbType.NVarChar)
            sqlParms(11).Value = Now()

            sqlParms(12) = New SqlParameter("@UpdateUserID", SqlDbType.NVarChar)
            sqlParms(12).Value = pDeviceTokenEntry(TokenEntry_Enum.UserID)


            _Cmd = New SqlCommand
            _Cmd.Connection = m_LocalDB.CreateConnection
            _Cmd.CommandType = CommandType.StoredProcedure
            _Cmd.CommandText = "InsertHL7Message"
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

            _strSQL = "exec InsertHL7Message " & sqlParms(0).Value.ToString & "," & sqlParms(1).Value & "" & _
                                ",'" & sqlParms(2).Value.ToString & "','" & sqlParms(3).Value.ToString & "','" & sqlParms(4).Value.ToString & "' " & _
                                ",'" & sqlParms(5).Value.ToString & "','" & sqlParms(6).Value.ToString & "','" & sqlParms(7).Value.ToString & "' " & _
                                ",'" & sqlParms(8).Value.ToString & "','" & sqlParms(9).Value.ToString & "','" & sqlParms(10).Value.ToString & "' " & _
                                  ",'" & sqlParms(11).Value.ToString & "','" & sqlParms(12).Value.ToString & "' "

            Try
                m_LocalDB.ExecuteNonQuery(_Cmd)

                If log.IsInfoEnabled Then log.Info(methodBaseName & _strSQL)
            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL...." & _strSQL & _
                                                                        vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to insert the HL7Message info " & vbCrLf & _
                                                                  " with the following SQL :" & _strSQL & vbCrLf & _
                                                                " Exception is:" & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try

            _Cmd.Parameters.Clear()

            Return _statuscode

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("RecordHL7Message:" & "Error in " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _strSQL = Nothing
        End Try
    End Function

    ''' <summary>
    ''' HL7MessageUpdate
    ''' </summary>
    ''' <param name="pUniqueId"></param>
    ''' <param name="pStatusUpdate"></param>
    ''' <param name="pDeviceTokenEntry"></param>
    ''' <remarks></remarks>
    Public Function HL7MessageUpdate(ByVal pUniqueId As Long, _
                                 ByVal pStatusUpdate As Integer, _
                                 ByVal pDeviceTokenEntry() As String) As Long


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strSQL As String = String.Empty
        Dim _statuscode As Long = 0

        Try
            Try
                CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemId))
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(":" & methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
                Return E_SERVERERROR
            End Try

            Dim _Cmd As SqlCommand
            Dim sqlParms() As SqlParameter = New SqlParameter(1) {}

            sqlParms(0) = New SqlParameter("@ID", SqlDbType.BigInt)
            sqlParms(0).Value = pUniqueId
            If log.IsInfoEnabled Then log.Info(":" & methodBaseName & " MESSAGE UNIQUEID :" & pUniqueId)
            sqlParms(1) = New SqlParameter("@HL7MessageSentStatus", SqlDbType.Char)
            sqlParms(1).Value = pStatusUpdate
            If log.IsInfoEnabled Then log.Info(":" & methodBaseName & " MESSAGE STATUS :" & pStatusUpdate)

            _Cmd = New SqlCommand
            _Cmd.Connection = m_LocalDB.CreateConnection
            _Cmd.CommandType = CommandType.StoredProcedure
            _Cmd.CommandText = "UpdatePendingHL7Messages"
            _Cmd.Parameters.Add(sqlParms(0))
            _Cmd.Parameters.Add(sqlParms(1))

            _strSQL = "exec UpdatePendingHL7Messages " & sqlParms(0).Value.ToString & "," & sqlParms(1).Value.ToString & ""
            Try
                m_LocalDB.ExecuteNonQuery(_Cmd)

                If log.IsInfoEnabled Then log.Info(methodBaseName & _strSQL)
            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the following SQL...." & _strSQL & _
                                                                        vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Update  HL7Message info " & vbCrLf & _
                                                                  " with the following SQL :" & _strSQL & vbCrLf & _
                                                                " Exception is:" & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try

            _Cmd.Parameters.Clear()

            Return _statuscode

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("HL7MessageUpdate:" & "Error in " & ex.ToString)
            Return E_SERVERERROR
        Finally
            _strSQL = Nothing
        End Try

    End Function

#End Region


End Class

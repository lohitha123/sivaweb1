#Region "Imports"
Imports System.Data.SqlClient
Imports System.net.Mail
Imports System.Data.Odbc
Imports System.Xml
Imports System.IO
Imports Microsoft.ApplicationBlocks.Data
Imports System.Threading
Imports System.Reflection
Imports System.ServiceProcess
Imports log4net
Imports System.Text
#End Region

#Region "Bug Fixes"
'DG-IT0001087 - 02/12/2009
'DG-IT0001087 - 02/19/2009
'SB-0004512 - 10/22/2008
'SM-0005620-02/22/2009
#End Region
Module AtParDefns

    Private ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtParDefns))

    ' default blank password
    Public Const DEFAULT_EMPTY_PASSWORD = "#$%^&*(*)"
	Public Const BU_TYPE_INVENTORY = "I"
    Public Const BU_TYPE_PURCHASING = "P"

    Public Const PAR = "01"
    Public Const FOQ = "02"
    Public Const MINMAX = "03"
  
    Public strPath As String = AppDomain.CurrentDomain.BaseDirectory().Chars(0) & ":\Atpar\"
    Public gJITConfPath As String = strPath & "JIT_CONFIG.XML"
    Public confPath As String = strPath & "Conf.xml"

    Public gLocalDatabase                        'Local Database Type MS Accss/SQL Server
    Public gLocalUserID                      'User ID for local Database

    Public gDebugOn As Boolean
    Public gLocalDBConnectionString As String
    Public gAttempts As Integer = 0
    'Public gStrJITConfPath As String = ""
    Public gStrDBConfPath As String = String.Empty
    'Public gStrSMUrlPath As String = ""
    'Public gStrSmAS2HeaderId As String = ""
    'Public gStrSMDUNSNo As String = ""
    'Public gStrSITEDUNSNo As String = ""
    Public gStrEmailServerIP As String = String.Empty
    Public gStrMailToAddress As String = String.Empty
    Public gStrMailFromAddress As String = String.Empty
    Public gStrEmailSubject As String = String.Empty
    Public gStrEmailBody As String = String.Empty
    Public gStrISACtrlNo As String = String.Empty
    Public gIntNoAttempts As Integer = 0
    Public gStrSenderId As String = String.Empty
    Public gStrGroupCtrlNo As String = String.Empty
    Public gStrColSeparator As String
    Public gStrColEndChar As String
    Public gStrJITDownloadPath As String = String.Empty
    Public MaxAttemptsFlag As Boolean = False
    Public gtimerTime As Integer = 0
    Public gJITTimerSleepTime As Integer = 0
    Private dsJITXMLData As New DataSet
    Private dsJITXMLDataVal As Integer = 0
    Public gJITDataString As String = String.Empty
    Public JITData_Timer As System.Timers.Timer
    Public sch_job_t As Thread
    Public gStrHeaderString As String
    Public gStrControlHeaderString As String
    Public gMTDatabase As String
    Public gLocalPasswd                      'Password for Local Database
    Public gLocalDataSource                  'Database Name
    Public gLocalServer                      'Local Database server name ((Where SQL Server is existing))
    Public gLocalDriver                      'Drivers for Local Database
    Public gLocalDbPath                      'Local DB Path (Access Specific)    
    Public gEnterpriseSystem                     'Enterprise System
    Public gRemoteUserID                         ' User ID of Remote Database
    Public gRemotePasswd                         ' Password for Remote Database
    Public gRemoteServer                         ' Remote Server IP/Name/TNS Name
    Public gRemoteODBCDriver                     ' Remote Driver/provider
    Public gProductLine                          ' Product Line - Lawson
    Public gConnectionString                     ' Connection String - Lawson
    Public gRemoteNetTrans                       ' Network transoprt for db2
    Public gRemoteSchema                         ' Default schema for db2
    Public gRemoteDatabase                       ' database type oracle/DB2.
    Public gRemoteDataSource                     ' data source/database name
    Public gERPUserID                              ' ERP User ID
    Public gERPPassword                          ' ERP Password
    Public gERPServer                            ' ERP Server
    Public gRemoteHost
    Public gRemoteService
    Public gRemoteProtocol
    Public gERPPortal
    Public gERPNode
    Public gERPSite
    Public gSICompInterfaceName
    Public gERPWebServerPort
    Public gERPVersion
    Public gDownloadFilePath                     'xml file path from which we read the data
    Public gUploadFilePath
    Public gSMTPServer As String          'SMTP Server Name
    Public gSMTPServerPort As String      'Portno which is used to send the mail
    Public gSMTPAccountName As String      'Name of the Account from which you want to send the mail
    Public gSMTPMailAddress As String     'Mail Address
    Public gSMTPAuthenticate As String     'Authentication methode used
    Public gSendUserName As String        'User name
    Public gSendPassword As String        'Password
    Public gSMTPUseSSL As String          'Secure Socket Layer
    Public gSendUsing As String
    Public gRemoteCartObj As String                        'Remote CartCount Object
    Public gRemoteAtParObj As String
    Public gCartCountDebug As String                      'Cart Debug tag
    Public strMoniker As String
    Public strHost As String
    Public strPort As String
    Public strPOUServicePort As String
    Public gRemoteCycleObj As String                       'Remote CycleCOunt Object
    Public gCycleCountDebug As String
    Public gAtParPickOutFileType As String
    Public gRemoteReceiveObj As String                     'Remote Receive Object
    Public gReceivingDebug As String                       'Receiving Debug tag
    Public gRemoteReceiveFrequency As Double
    Public gParItemReadFreq As Double
    Public gRemotePickFrequency As Double
    Public gRemoteDeliverObj                     'Remote Deliver Object
    Public gDeliverDebug                         'Deliver Debug tag
    Public gAtparCustName
	public gAtparEmployeeLoadfreq

    Public gRemotePickObj                        'Remote PickPlan Object
    Public gRemotePickClsModule                  'Remote PickPlan Class Module
    Public gPickPlanDebug


    Public gRemotePutObj                        'Remote PickPlan Object
    Public gPutAwayDebug


    Public gMAgentDebug


    Public gTrackITDebug
    Public gRemoteTrackITObj


    Public gStockIssueDebug
    Public gRemoteStockIssueObj

    Public gPOUDebug
    Public gRemotePOUObj
    'SB-0003236 -05/06/2008
    Public gBinToBinDebug
    Public gRemoteBinToBinObj
    'SM-0004070 07/01/2008 SSO
    Public gSSOEnabled
    Public gSSOVariable

    Public gSMTP_Server As String
    Public gSMTP_MailAddress As String
    Public gSMTP_ServerPort As String
    Public gSMTP_AccountName As String
    Public gSMTP_Authenticate As String
    Public gSMTP_SendUserName As String
    Public gSMTP_SendPwd As String
    Public gSMTP_UseSsl As String
    Public gSMTP_SendUsing As String
    Public gErrorLogLevel As String
    Public gErrorLogCycleFreq As String
    Public gAtParDebug As String
    Private gErrorLogPath       ' Path to store error files in.


    'Public gApUtils 'As AtPar_BusinessRules.Utils

    Public sqlConnect As SqlConnection
    Public gRemoteDBType As Integer
    Public gRemoteDBConn 'Remote DB Connection object
    Public gRemoteHostPath As String
    Public gRemoteHostPathForPOU As String
    Public gRemoteDBTrans 'ERP object
    Public gRemoteCartDBTrans As String
    Public gAppPath As String = String.Empty

    'Dim pWGetPath, pFileName, pAgenetName, pCertificate, pURL As String
    'pFileName = "c:\atpar\11.jit"
    'pAgenetName = "AtPar"
    'pCertificate = "WEBPROD09.der"
    'pURL = "http://129.33.161.18:4545/invoke/wm.EDIINT/receive"
    'wget parameters
    Public mWgetJITFileName As String
    Public mWgetAgenetName As String
    Public mWgetCertificate As String
    Public mWgetURL As String
    ' for AS2Data
    Public mAs2From As String
    Public mAs2To As String
    Public mAs2MDNMailTo As String
    Public mAs2URL As String
    Public mAs2UserAgent As String
    Public mAs2EDIType As String
    Public mAs2MDNReceipt As String
    Public mAs2ReceiptMessage As String
    Public mAs2ReplyHeader As String
    Public mAs2ReceiptContent As String

    Public gAtParServiceManagerFrequency As Double
    Public gMeditechNPRSchTime As String = String.Empty
    Public gAtParOutputType As String
    ''''''''''''''
    '' Transaction Status
    Public Const statDownloaded = 1        ' Status = Downloaded
    Public Const statCISuccess = 17        ' Status = CI Success
    Public Const statEIPSuccess = 18       ' Status =EIP Success
    Public Const statError = 10            ' Status = Error
    Public Const statSent = 11             ' Status = sent
    Public Const statUnlock = 12           ' Status = Unlock
    Public Const statCancel = 13           ' Status = Cancel/Delete
    Public Const statRemSucess = 14        ' Status = Remote method success
    Public Const statCartPutAwayDownload = 7
    Public Const statPutAway = 4
    Public Const statRevised = 8
    Public Const statEventCounting As Integer = 4     ' Status = counting
    Public Const statEventCountComplete As Integer = 7  ' Status = completed
    'rt 4353
    Public Const statIssued = 6        ' Status = Issued in StockIssue app
    Public Const statReturned = 16
    Public Const statPick = 3
    Public Const statCaseAdd = 25

    'Parmanagement Order Status
    Public Const statOrdOpen = 5                  ' Order Status = Open
    Public Const statOrdSent = 10                 ' Order Status = Sent
    Public Const statOrdPartiallySent = 12     ' Order Status = Partially Sent
    Public Const statOrdRecv = 15                 ' Order Status = Received
    Public Const statOrdCancel = 20                 ' Order Status = Received
    'For LDAP
    Public gStrLdapUserID As String = String.Empty
    Public gStrLDAPUserDN As String = String.Empty
    Public gStrLdapFirstName As String = String.Empty
    Public gStrLdapLastName As String = String.Empty
    Public gStrLdapMInitial As String = String.Empty
    Public gStrLdapEmailID As String = String.Empty
    Public gStrLdapMobile As String = String.Empty
    Public gStrLdapFax As String = String.Empty
    Public gStrServerName As String = String.Empty
    Public gStrProtocol As String = String.Empty
    Public gStrAuthType As String = String.Empty
    Public gStrSearchScope As String = String.Empty
    Public gStrBaseDn As String = String.Empty
    Public gStrAcntStatusRuleSet As String = String.Empty
    Public gStrEntryLimit As String = String.Empty
    Public gStrSearchFilter As String = String.Empty
    Public gStrUserName As String = String.Empty
    Public gStrPassword As String = String.Empty
    'For calling the assembly dynamically
    Public gRemoteAssembly As [Assembly]
	Public RecallServiceUrl As String = String.Empty

    




#Region "Reading information from conf.xml file"

    Public Sub ReadConfig()
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _StatusCode As Long
        Try
            Dim xmlDoc As New XmlDocument
            Dim xmlRoot As XmlNode
            Dim xmlItem As XmlNode
            Dim xmlItemChild As XmlNode
            Dim xmlReadFile As String = String.Empty
            Dim m_FileSystem As FileStream = Nothing
            Dim xmlString As String
            Dim intXmlNodes As Integer
            Dim intXmlLDBChildNodes As Integer
            Dim intXmlRDBChildNodes As Integer
            Dim intXmlSPChildNodes As Integer
            Dim intXmlRCChildNodes As Integer
            Dim intXmlCartChildNodes As Integer
            Dim intXmlCycleChildNodes As Integer
            Dim intXmlDlvrChildNodes As Integer
            Dim intXmlEMailChildNodes As Integer
            Dim intXmlPickChildNodes As Integer
            Dim intXmlRecvChildNodes As Integer
            Dim intXmlStkISSUEChildNodes As Integer
            Dim intXmlTKTtChildNodes As Integer
            Dim intXmlMAgentChildNodes As Integer
            Dim intXmlPAwayChildNodes As Integer
            Dim intXmlBinToBinChildNodes As Integer
            'SM-0004070 07/01/2008 SSO
            Dim intXmlSSOChildNodes As Integer

            Try

                m_FileSystem = File.Open(confPath, FileMode.Open, FileAccess.Read)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal("AtParDefns: ReadConfig: " & _StatusCode)
            End Try

            Dim buffer(m_FileSystem.Length) As Byte
            m_FileSystem.Read(buffer, 0, m_FileSystem.Length)

            'After </CONFIGFILE> any empty line giving error so to solve that changed the above statement
            'VRS-30Oct2007
            xmlString = System.Text.UTF8Encoding.UTF8.GetString(buffer).Substring(0, InStr(System.Text.UTF8Encoding.UTF8.GetString(buffer), "</CONFIGFILE>") + 12)

            'xmlString = System.Text.UTF8Encoding.UTF8.GetString(buffer)
            m_FileSystem.Close()
            xmlDoc.LoadXml(xmlString)
            xmlRoot = xmlDoc.DocumentElement()
            For intXmlNodes = 0 To (xmlRoot.ChildNodes.Count - 1)
                xmlItem = xmlRoot.ChildNodes.Item(intXmlNodes)
                If (xmlItem.Name = "LOCALDBCONNECTION") Then
                    For intXmlLDBChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlLDBChildNodes)
                        Select Case xmlItemChild.Name
                            Case "DATABASE"
                                gMTDatabase = xmlItemChild.InnerText
                            Case "USERID"
                                gLocalUserID = xmlItemChild.InnerText
                            Case "PASSWORD"
                                gLocalPasswd = String.Empty
                                If (Len(xmlItemChild.InnerText) <> 0) Then
                                    gLocalPasswd = Decrypt(xmlItemChild.InnerText)
                                End If
                            Case "DATASOURCE"
                                gLocalDataSource = xmlItemChild.InnerText
                            Case "SERVER"
                                gLocalServer = xmlItemChild.InnerText
                            Case "DRIVER"
                                gLocalDriver = xmlItemChild.InnerText
                            Case "LOCALDBPATH"
                                gLocalDbPath = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "REMOTEDBCONNECTION") Then
                    For intXmlRDBChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlRDBChildNodes)
                        Select Case xmlItemChild.Name
                            Case "ENTERPRISESYSTEM"
                                gEnterpriseSystem = xmlItemChild.InnerText
                            Case "VERSION"
                                gERPVersion = xmlItemChild.InnerText
                            Case "DATABASE"
                                gRemoteDatabase = xmlItemChild.InnerText
                            Case "NETTRANS"
                                gRemoteNetTrans = xmlItemChild.InnerText
                            Case "SCHEMA"
                                gRemoteSchema = xmlItemChild.InnerText
                            Case "DATASOURCE"
                                gRemoteDataSource = xmlItemChild.InnerText
                            Case "USERID"
                                gRemoteUserID = xmlItemChild.InnerText
                            Case "PASSWORD"
                                gRemotePasswd = String.Empty
                                If (Len(xmlItemChild.InnerText) <> 0) Then
                                    gRemotePasswd = Decrypt(xmlItemChild.InnerText)
                                End If
                            Case "SERVER"
                                gRemoteServer = xmlItemChild.InnerText
                            Case "ERPUSERID"
                                gERPUserID = xmlItemChild.InnerText
                            Case "ERPPASSWORD"
                                gERPPassword = String.Empty
                                If (Len(xmlItemChild.InnerText) <> 0) Then
                                    gERPPassword = Decrypt(xmlItemChild.InnerText)
                                End If
                            Case "ERPSERVER"
                                gERPServer = xmlItemChild.InnerText
                            Case "DRIVER"
                                gRemoteODBCDriver = xmlItemChild.InnerText
                            Case "PRODUCTLINE"
                                gProductLine = xmlItemChild.InnerText
                            Case "CONNECTIONSTRING"
                                gConnectionString = xmlItemChild.InnerText
                            Case "DOWNLOADFILEPATH"
                                gDownloadFilePath = xmlItemChild.InnerText
                            Case "UPLOADFILEPATH"
                                gUploadFilePath = xmlItemChild.InnerText
                            Case "HOST"
                                gRemoteHost = xmlItemChild.InnerText
                            Case "SERVICE"
                                gRemoteService = xmlItemChild.InnerText
                            Case "PROTOCOL"
                                gRemoteProtocol = xmlItemChild.InnerText
                            Case "ERPPORTAL"
                                gERPPortal = xmlItemChild.InnerText
                            Case "ERPNODE"
                                gERPNode = xmlItemChild.InnerText
                            Case "ERPWEBSERVERPORT"
                                gERPWebServerPort = xmlItemChild.InnerText
                            Case "ERPSITE"
                                gERPSite = xmlItemChild.InnerText
                            Case "ERPSICOMPINTERFACE"
                                gSICompInterfaceName = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "REMOTINGCONFIGARATION") Then
                    For intXmlRCChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlRCChildNodes)
                        Select Case xmlItemChild.Name
                            Case "MONIKER"
                                strMoniker = xmlItemChild.InnerText
                            Case "HOST"
                                strHost = xmlItemChild.InnerText
                            Case "PORT"
                                strPort = xmlItemChild.InnerText
                            Case "POU_PORT"
                                strPOUServicePort = xmlItemChild.InnerText
                        End Select
                    Next
                    gRemoteHostPath = strMoniker & "://" & strHost & IIf(Len(strPort) > 0, ":" & strPort, "") & "/"
                    gRemoteHostPathForPOU = strMoniker & "://" & strHost & IIf(Len(strPOUServicePort) > 0, ":" & strPOUServicePort, "") & "/"
                ElseIf (xmlItem.Name = "SYSTEMPARAMETERS") Then
                    For intXmlSPChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlSPChildNodes)
                        Select Case xmlItemChild.Name
                            Case "ERRORLOGLEVEL"
                                gErrorLogLevel = xmlItemChild.InnerText
                            Case "ERRORLOGPATH"
                                gErrorLogPath = xmlItemChild.InnerText
                            Case "COMP"
                                gRemoteAtParObj = xmlItemChild.InnerText
                            Case "ERRORLOGCYCLEFREQ"
                                gErrorLogCycleFreq = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gAtParDebug = xmlItemChild.InnerText
                            Case "UPLOADFREQUENCY"
                                If xmlItemChild.InnerText <> String.Empty Then
                                    gAtParServiceManagerFrequency = xmlItemChild.InnerText
                                End If
								'DG-IT0001087
							Case "CUSTOMER_NAME"
                                If xmlItemChild.InnerText <> "" Then
                                    gAtparCustName = xmlItemChild.InnerText
                                End If

							Case "EMPLOYEE_DATALOAD_FREQ"
                                If xmlItemChild.InnerText <> "" Then
                                    gAtparEmployeeLoadfreq = xmlItemChild.InnerText
                                End If
																
                        End Select
                    Next
                ElseIf (xmlItem.Name = "CARTCOUNT") Then
                    For intXmlCartChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlCartChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemoteCartObj = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gCartCountDebug = xmlItemChild.InnerText
                            Case "STOCKLESS_FILETYPE"
                                gAtParOutputType = xmlItemChild.InnerText
                            Case "PAR_ITEMLOAD_FREQUENCY"
                                If xmlItemChild.InnerText <> String.Empty Then
                                    gParItemReadFreq = xmlItemChild.InnerText
                                End If
                        End Select
                    Next
                ElseIf (xmlItem.Name = "CYCLECOUNT") Then
                    For intXmlCycleChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlCycleChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemoteCycleObj = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gCycleCountDebug = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "RECEIVING") Then
                    For intXmlRecvChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlRecvChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemoteReceiveObj = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gReceivingDebug = xmlItemChild.InnerText
                            Case "FREQUENCY"
                                If xmlItemChild.InnerText <> String.Empty Then
                                    gRemoteReceiveFrequency = xmlItemChild.InnerText
                                End If
                            Case "NPR_REPORT_SCHTIME"
                                gMeditechNPRSchTime = xmlItemChild.InnerText

                        End Select
                    Next
                ElseIf (xmlItem.Name = "DELIVER") Then
                    For intXmlDlvrChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlDlvrChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemoteDeliverObj = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gDeliverDebug = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "PICKPLAN") Then
                    For intXmlPickChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlPickChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemotePickObj = xmlItemChild.InnerText
                            Case "CLSMOD"
                                gRemotePickClsModule = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gPickPlanDebug = xmlItemChild.InnerText
                            Case "FREQUENCY"
                                If xmlItemChild.InnerText <> String.Empty Then
                                    gRemotePickFrequency = xmlItemChild.InnerText
                                End If
                            Case "OUTFILETYPE"
                                gAtParPickOutFileType = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "PUTAWAY") Then
                    For intXmlPAwayChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlPAwayChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemotePutObj = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gPutAwayDebug = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "MAGENT") Then
                    For intXmlMAgentChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlMAgentChildNodes)
                        Select Case xmlItemChild.Name
                            Case "TURNONDEBUG"
                                gMAgentDebug = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "TRACKIT") Then
                    For intXmlTKTtChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlTKTtChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemoteTrackITObj = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gTrackITDebug = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "STOCKISSUE") Then
                    For intXmlStkISSUEChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlStkISSUEChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemoteStockIssueObj = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gStockIssueDebug = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "POINTOFUSE") Then
                    For intXmlTKTtChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlTKTtChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemotePOUObj = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gPOUDebug = xmlItemChild.InnerText
                        End Select
                    Next
                    'SB-0003236 -05/06/2008
                ElseIf (xmlItem.Name = "BINTOBIN") Then
                    For intXmlBinToBinChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlBinToBinChildNodes)
                        Select Case xmlItemChild.Name
                            Case "COMP"
                                gRemoteBinToBinObj = xmlItemChild.InnerText
                            Case "TURNONDEBUG"
                                gBinToBinDebug = xmlItemChild.InnerText
                        End Select
                    Next
                    'SM-0004070 07/01/2008 SSO
                ElseIf (xmlItem.Name = "SSO") Then
                    For intXmlSSOChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlSSOChildNodes)
                        Select Case xmlItemChild.Name
                            Case "SSO_ENABLED"
                                gSSOEnabled = xmlItemChild.InnerText
                            Case "SSO_VARIABLE"
                                gSSOVariable = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "EMAILCONFIGARATION") Then
                    For intXmlEMailChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlEMailChildNodes)
                        Select Case xmlItemChild.Name
                            Case "SMTP_SERVER"
                                gSMTPServer = xmlItemChild.InnerText
                            Case "SMTP_SERVER_PORT"
                                gSMTPServerPort = xmlItemChild.InnerText
                            Case "SMTP_ACCOUNT_NAME"
                                gSMTPAccountName = xmlItemChild.InnerText
                            Case "SMTP_MAIL_ADDRESS"
                                gSMTPMailAddress = xmlItemChild.InnerText
                            Case "SMTP_AUTHENTICATE"
                                gSMTPAuthenticate = xmlItemChild.InnerText
                            Case "SEND_USER_NAME"
                                gSendUserName = xmlItemChild.InnerText
                            Case "SEND_PASSWORD"
                                gSendPassword = String.Empty
                                If (Len(xmlItemChild.InnerText) <> 0) Then
                                    gSendPassword = Decrypt(xmlItemChild.InnerText)
                                End If
                            Case "SMTP_USE_SSL"
                                gSMTPUseSSL = xmlItemChild.InnerText
                            Case "SEND_USING"
                                gSendUsing = xmlItemChild.InnerText
                        End Select
                    Next
                ElseIf (xmlItem.Name = "LDAPCONFIG") Then
                    For intXmlTKTtChildNodes = 0 To xmlItem.ChildNodes.Count - 1
                        xmlItemChild = xmlItem.ChildNodes.Item(intXmlTKTtChildNodes)
                        Select Case xmlItemChild.Name
                            Case "SERVERNAME"
                                gStrServerName = xmlItemChild.InnerText
                            Case "PROTOCOL"
                                gStrProtocol = xmlItemChild.InnerText
                            Case "AUTHTYPE"
                                gStrAuthType = xmlItemChild.InnerText
                            Case "SEARCHSCOPE"
                                gStrSearchScope = xmlItemChild.InnerText
                            Case "BASEDN"
                                gStrBaseDn = xmlItemChild.InnerText
                            Case "ACNTSTATRULE"
                                gStrAcntStatusRuleSet = xmlItemChild.InnerText
                            Case "ENTRYLIMIT"
                                gStrEntryLimit = xmlItemChild.InnerText
                            Case "SEARCHFILTER"
                                gStrSearchFilter = xmlItemChild.InnerText
                            Case "USERNAME"
                                gStrUserName = xmlItemChild.InnerText
                            Case "PASSWORD"
                                gStrPassword = String.Empty
                                If (Len(xmlItemChild.InnerText) <> 0) Then
                                    gStrPassword = Decrypt(xmlItemChild.InnerText)
                                End If
                            Case "USERID"
                                gStrLdapUserID = xmlItemChild.InnerText
                            Case "FIRSTNAME"
                                gStrLdapFirstName = xmlItemChild.InnerText
                            Case "LASTNAME"
                                gStrLdapLastName = xmlItemChild.InnerText
                            Case "MIDDLEINITIAL"
                                gStrLdapMInitial = xmlItemChild.InnerText
                            Case "EMAILID"
                                gStrLdapEmailID = xmlItemChild.InnerText
                            Case "PHONE1"
                                gStrLdapMobile = xmlItemChild.InnerText
                            Case "FAX"
                                gStrLdapFax = xmlItemChild.InnerText
                        End Select
                    Next
                End If
            Next
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal("AtParDefns: ReadConfig: " & ex.ToString)
        End Try

    End Sub
#End Region

#Region "Password Decrypt functionality"
    Public Function Decrypt(ByVal Encrypted As String) As String
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

    Public Function Encrypt(ByVal Plain As String) As String
        Dim encrypted2 As String
        Dim LenLetter As Integer
        Dim Letter As String
        Dim encstr As String
        Dim temp As String
        Dim temp2 As String
        Dim itempstr As String
        Dim itempnum As Integer
        Dim Math As Long
        Dim i As Integer
        Dim sEncKey As String
        Dim encKey
        Dim strEnc
        Dim cipher
        'Same key should be used while encrypt and decrypt
        sEncKey = Chr(49) & Chr(45) & Chr(56) & Chr(48) & Chr(48) & Chr(45) & Chr(66) & Chr(69) & Chr(69) & Chr(45) & Chr(76) & Chr(79) & Chr(71) & Chr(79)

        On Error GoTo oops
        ReDim encKey(Len(sEncKey))

        For i = 1 To Len(sEncKey$)
            encKey(i) = Asc(Mid$(sEncKey$, i, 1))
            If i = 1 Then Math = encKey(i) : GoTo nextone
            If i >= 2 And Math - encKey(i) >= 0 And encKey(i) <= _
                encKey(i - 1) Then Math = Math - encKey(i)
            If i >= 2 And Math - encKey(i) >= 0 And encKey(i) <= _
                encKey(i - 1) Then Math = Math - encKey(i)
            If i >= 2 And encKey(i) >= Math And encKey(i) >= _
                encKey(i - 1) Then Math = Math + encKey(i)
            If i >= 2 And encKey(i) < Math And encKey(i) _
               >= encKey(i - 1) Then Math = Math + encKey(i)
nextone:
        Next i
        For i = 1 To Len(Plain)
            Letter = Mid$(Plain, i, 1)
            LenLetter = Asc(Letter) + Math

            If LenLetter >= 100 Then
                encstr = encstr & Asc(Letter) + Math & " "
            End If
            If LenLetter <= 99 Then
                encstr$ = encstr & "0" & Asc(Letter) + Math & " "
            End If
        Next i

        temp$ = encstr
        temp$ = TrimSpaces(temp)
        itempnum% = Mid(temp, 1, 2)
        temp2$ = Chr(itempnum% + 100)

        If Len(itempnum%) >= 2 Then
            itempstr$ = Str(itempnum%)
        End If
        If Len(itempnum%) = 1 Then
            itempstr$ = "0" & TrimSpaces(Str(itempnum%))
        End If
        encrypted2$ = temp2

        For i = 3 To Len(temp) Step 2
            itempnum% = Mid(temp, i, 2)
            temp2$ = Chr(itempnum% + 100)
            If i = Len(temp) Then
                itempstr$ = Str(itempnum%) : GoTo itsdone
            End If
            If Len(itempnum%) = 2 Then
                itempstr$ = Str(itempnum%)
            End If

            If Len(TrimSpaces(Str(itempnum))) = 1 Then
                itempstr$ = "0" & TrimSpaces(Str(itempnum%))
            End If
itsdone:
            encrypted2$ = encrypted2 & temp2$
        Next i
        strEnc = encrypted2
        'To make it compatible with xml text format
        For i = 1 To Len(strEnc)
            cipher = cipher & Asc(Mid(strEnc, i, 1)) & "_"
        Next
        Encrypt = cipher
        Exit Function
oops:

    End Function

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
#Region "Server Logging Variables and Routines"

    ''' <summary>
    ''' To substitute escape character for special characters
    ''' </summary>
    ''' <param name="pSource"></param>
    ''' <param name="pIsDbRelated"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function substituteString(ByVal pSource As String, Optional ByVal pIsDbRelated As Boolean = False) As String
        'To substitute escape character for below mentioned special characters
        'TODO:: Other special characters have to be added.
        'Ampersand 	&amp; 	& 	&#38;#38;
        'Left angle bracket 	&lt; 	< 	&#38;#60;
        'Right angle bracket 	&gt; 	> 	&#62;
        'Straight quotation mark 	&quot; 	" 	&#39;
        'Apostrophe 	&apos; 	' 	&#34;

        If Not IsDBNull(pSource) AndAlso Not String.IsNullOrEmpty(pSource) Then

            pSource = Replace(pSource, "'", "''")

            If Not pIsDbRelated Then
                pSource = Replace(pSource, "&", "&amp;")
                pSource = Replace(pSource, "$@PARLT@PAR$", "&lt;")
                pSource = Replace(pSource, "$@PARGT@PAR$", "&gt;")
            End If

        End If

        substituteString = pSource

    End Function

  
#End Region

#Region "Database Connection Routines"

    Public Function GetSQLConnection() As SqlConnection
        ' TODO: Get Connection String from Enterprise Service
        Dim m_connection As SqlConnection 'middletier DB connection 
        ReadConfig()
        gLocalDBConnectionString = "Server=" & gLocalServer & ";Database=" & gLocalDataSource & ";User ID=" & gLocalUserID & ";Password=" & gLocalPasswd & ";Trusted_Connection=False"
        m_connection = New SqlConnection(gLocalDBConnectionString)
        Return m_connection
    End Function

    
#End Region

#Region "SendMail"

    Public Function SendMail(ByVal pFromAddress As String, ByVal pSubject As String, ByVal pBodyText As String, ByVal pToAddress As String, _
    Optional ByVal pMailPriority As MailPriority = MailPriority.Normal, Optional ByVal pAttachment As String = "") As Long


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Dim _strSQL As String = String.Empty
        Dim _StatusCode As Long
        Try
            ReadConfig()

            Dim objMail As New MailMessage()

            If Not String.IsNullOrEmpty(pFromAddress) Then
                Dim frmaddress As New MailAddress(pFromAddress)
                objMail.From = frmaddress
            Else
                Dim frmaddress As New MailAddress(gSMTPMailAddress)
                objMail.From = frmaddress
            End If
            If Not String.IsNullOrEmpty(pAttachment) Then
                Dim attachement As New Attachment(pAttachment)
                objMail.Attachments.Add(attachement)
            End If

            objMail.To.Add(pToAddress)
            objMail.Subject = pSubject
            objMail.Priority = pMailPriority
            objMail.IsBodyHtml = True
            objMail.Body = pBodyText


            Dim SmtMail As New SmtpClient
            SmtMail.Host = gSMTPServer
            SmtMail.Port = gSMTPServerPort
            SmtMail.Send(objMail)

        Catch ex As Exception
            SendMail = EMAIL_SEND_FAILED
            If log.IsFatalEnabled Then log.Fatal("AtParDefns: SendMail :" & ex.ToString)
            Exit Function
        End Try
        _StatusCode = ATPAR_OK
        
        SendMail = _StatusCode
    End Function
#End Region

     Public Function CleanString(ByVal pSource As String) As String
        ' Clean up the string with out any single/double quotations.
        
        If Not String.Isnullorempty(pSource) Then
        
			pSource = Replace(pSource, "<", "$@PARLT@PAR$")
            pSource = Replace(pSource, ">", "$@PARGT@PAR$")
            pSource = Replace(pSource, """", String.Empty)
        
		End If
		
        Return pSource

    End Function

    ''' <summary>
    ''' Called when we need to insert into the middle tier tables before substitute string is called
    ''' Restores the values for ',less than , greater than
    ''' </summary>
    ''' <param name="pSource"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetDatabaseString(ByVal pSource As String) As String

        If Not String.IsNullOrEmpty(pSource) Then

            pSource = Replace(pSource, "$@PARLT@PAR$", "<")
            pSource = Replace(pSource, "$@PARGT@PAR$", ">")
            pSource = Replace(pSource, "'", "''")

        End If

        Return pSource

    End Function

    Public Sub RemoteObjCreate(ByVal pRemoteObj As String)
		try
	        Dim path As String
	        path = AppDomain.CurrentDomain.BaseDirectory
	        path = path & "\" & pRemoteObj & ".dll"
	        gRemoteAssembly = [Assembly].LoadFrom(path)
		Catch ex as Exception
			Throw ex
		End Try
    End Sub

	 ''' <summary>
    ''' tagGetAppVersionInfo - Print an applications version info
    ''' </summary>
    ''' <returns>Version information</returns>
    ''' <remarks>All Applications.GetAppVersionInfo Methods.</remarks>
    Public Function tagGetAppVersionInfo() As String
        tagGetAppVersionInfo = "<ROOT><APP_VERSION>" & My.Application.Info.AssemblyName & "      " & My.Application.Info.Version.Major & "." & My.Application.Info.Version.Minor & "." & My.Application.Info.Version.Revision & "</APP_VERSION></ROOT>"
    End Function

    Public Function StatusXMLBuild(ByVal statusCode As Long) As String
        Dim strvalue As String
        strValue = "<ROOT><STATUS_CODE>" & statusCode & "</STATUS_CODE></ROOT>"

        StatusXMLBuild = strValue
    End Function

    'DG-IT1087
    Public Sub addTextElement(ByVal doc As XmlDocument, ByVal nodeParent As XmlElement, ByVal strTag As String, ByVal strValue As String)
        Dim nodeElem As XmlElement = doc.CreateElement(strTag)
        Dim nodeText As XmlText = doc.CreateTextNode(strValue)
        nodeParent.AppendChild(nodeElem)
        nodeElem.AppendChild(nodeText)
    End Sub

    Function GetServiceStatus(ByVal strServiceName As String) As ServiceControllerStatus
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug("AtparDefns : " & methodBaseName)

        Dim service As New ServiceController(strServiceName)
        Dim status As ServiceControllerStatus = service.Status
        service.Dispose()
        Return status
    End Function

    ''' <summary>
    ''' This function can be used to replace the special chars in XML file
    ''' </summary>
    ''' <param name="linenumber">exception line number</param>
    ''' <param name="strFilePath">File Path</param>
    ''' <param name="pStrApplication">Application type</param>
    ''' <param name="lngCount">Line count of Xml File</param>
    ''' <returns>Error/Success Code</returns>
    ''' <remarks></remarks>

    Public Function Process_XML_SpecialChars(ByVal linenumber As Long, _
                                             ByVal strFilePath As String, _
                                             ByVal pStrApplication As String, _
                                             ByVal lines() As String, _
                                             Optional ByVal lngCount As Long = 0) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBaseName As String = stackFrame.GetMethod().Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strReader As StreamReader
        Dim xmlDoc As New XmlDocument
        Dim _strmWriter As StreamWriter
        Dim _strLine As String = String.Empty
        Dim _strReplace As String = String.Empty
        Dim _strAppPath As String = AppDomain.CurrentDomain.BaseDirectory().Chars(0) & ":\Atpar\"
        Dim _strTempfile As String = _strAppPath & pStrApplication & "_Temp.xml"
        Dim _lngCnt As Long = 0
        Dim _intLineposition As Int32
        Dim _lngStatusCode As Long

        Try

            _strLine = lines(linenumber - 1).Trim()

            _intLineposition = InStr(2, _strLine, "<")

            If _intLineposition > 0 Then
                _strReplace = "&lt;"
            Else
                _intLineposition = InStr(2, _strLine, ">")
                If _intLineposition > 0 Then
                    _strReplace = "&gt;"
                End If
            End If

            _strLine = Mid(_strLine, 1, _intLineposition - 1) + _strReplace + Mid(_strLine, _intLineposition + 1)

            lines(linenumber - 1) = _strLine

            File.WriteAllLines(strFilePath, lines)

            Try
                xmlDoc.Load(strFilePath)
            Catch ex As XmlException
                'Recursing the function as to remove all the special characters at every occurence
                linenumber = ex.LineNumber
                _lngStatusCode = Process_XML_SpecialChars(linenumber, strFilePath, pStrApplication, lines)
            Finally
                _strReader = Nothing
                _strmWriter = Nothing
                xmlDoc = Nothing

            End Try

            If _lngStatusCode = ATPAR_OK Then

                Try
                    File.Delete(_strTempfile)
                Catch ex As Exception
                    _lngStatusCode = E_SERVERERROR
                    Process_XML_SpecialChars = _lngStatusCode
                End Try

                Process_XML_SpecialChars = _lngStatusCode

            End If


        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception :" & _
                                                 ex.ToString & ": " & vbCrLf)
            Return E_SERVERERROR
        Finally
            _strReader = Nothing
            _strmWriter = Nothing
            xmlDoc = Nothing
        End Try

    End Function

    ''' <summary>
    ''' This function can be used to read Inventoty config XML file
    ''' </summary>
    ''' <param name="pJobType">Job type</param>
    ''' <param name="pHashTblInvConfDetails">Hash table to store details</param>
    ''' <returns>Error/Success Code</returns>
    ''' <remarks></remarks>
    Public Function ReadAndValidateInventaryConf(ByVal pJobType As String, _
                                                 ByRef pHashTblInvConfDetails As Hashtable) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strUserName As String = String.Empty
        Dim _strPassWord As String = String.Empty
        Dim _strClientID As String = String.Empty
        Dim _strMoniker As String = String.Empty
        Dim _strServerIP As String = String.Empty
        Dim _strPort As String = String.Empty
        Dim _strDefDir As String = String.Empty
        Dim _strMandatoryfield As String = String.Empty
        Dim _strMandatoryColumn As String = String.Empty

        Dim xmldoc As New System.Xml.XmlDocument
        Dim xmlElmt As XmlElement
        Dim INVENTORY_CONFIG_FILENAME As String = "Inventory_Conf_Services.xml"

        Dim xmlfilepath As String = AppDomain.CurrentDomain.BaseDirectory & INVENTORY_CONFIG_FILENAME

        Try
            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Loading Inventory config XML from Path " & xmlfilepath)
            xmldoc.Load(xmlfilepath)

            xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/CLIENT_ID")

            If Not IsNothing(xmlElmt) Then
                _strClientID = xmlElmt.InnerText
                If String.IsNullOrEmpty(_strClientID) Then
                    _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", CLIENT_ID", "CLIENT_ID")
                End If
            Else
                _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", CLIENT_ID", "CLIENT_ID")
            End If

            Select Case pJobType
                Case Enum_ServiceType.REF_DB
                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/REF_DB/WEB_SERVICE/MONIKER")

                    If Not IsNothing(xmlElmt) Then
                        _strMoniker = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strMoniker) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", MONIKER", "MONIKER")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", MONIKER", "MONIKER")
                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/REF_DB/WEB_SERVICE/SERVER_IP")

                    If Not IsNothing(xmlElmt) Then
                        _strServerIP = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strServerIP) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", SERVER_IP", "SERVER_IP")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", SERVER_IP", "SERVER_IP")
                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/REF_DB/WEB_SERVICE/PORT")

                    If Not IsNothing(xmlElmt) Then
                        _strPort = xmlElmt.InnerText

                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/REF_DB/WEB_SERVICE/USERNAME")

                    If Not IsNothing(xmlElmt) Then
                        _strUserName = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strUserName) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", USERNAME", "USERNAME")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", USERNAME", "USERNAME")
                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/REF_DB/WEB_SERVICE/PASSWORD")

                    If Not IsNothing(xmlElmt) Then
                        _strPassWord = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strPassWord) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", PASSWORD", "PASSWORD")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", PASSWORD", "PASSWORD")
                    End If

                Case Enum_ServiceType.ALERT_DB
                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/ALERT_DB/WEB_SERVICE/MONIKER")

                    If Not IsNothing(xmlElmt) Then
                        _strMoniker = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strMoniker) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", MONIKER", "MONIKER")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", MONIKER", "MONIKER")
                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/ALERT_DB/WEB_SERVICE/SERVER_IP")

                    If Not IsNothing(xmlElmt) Then
                        _strServerIP = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strServerIP) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", SERVER_IP", "SERVER_IP")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", SERVER_IP", "SERVER_IP")
                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/ALERT_DB/WEB_SERVICE/PORT")

                    If Not IsNothing(xmlElmt) Then
                        _strPort = xmlElmt.InnerText

                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/ALERT_DB/WEB_SERVICE/USERNAME")

                    If Not IsNothing(xmlElmt) Then
                        _strUserName = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strUserName) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", USERNAME", "USERNAME")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", USERNAME", "USERNAME")
                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/ALERT_DB/WEB_SERVICE/PASSWORD")

                    If Not IsNothing(xmlElmt) Then
                        _strPassWord = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strPassWord) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", PASSWORD", "PASSWORD")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", PASSWORD", "PASSWORD")
                    End If
                Case Enum_ServiceType.FTP_INFO
                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/FTP_INFO/SERVER_IP")

                    If Not IsNothing(xmlElmt) Then
                        _strServerIP = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strServerIP) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", SERVER_IP", "SERVER_IP")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", SERVER_IP", "SERVER_IP")
                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/FTP_INFO/USERNAME")

                    If Not IsNothing(xmlElmt) Then
                        _strUserName = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strUserName) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", USERNAME", "USERNAME")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", USERNAME", "USERNAME")
                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/FTP_INFO/PASSWORD")

                    If Not IsNothing(xmlElmt) Then
                        _strPassWord = xmlElmt.InnerText
                        If String.IsNullOrEmpty(_strPassWord) Then
                            _strMandatoryfield = IIf(_strMandatoryfield.Length > 0, _strMandatoryfield & ", PASSWORD", "PASSWORD")
                        End If
                    Else
                        _strMandatoryColumn = IIf(_strMandatoryColumn.Length > 0, _strMandatoryColumn & ", PASSWORD", "PASSWORD")
                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/FTP_INFO/PORT")

                    If Not IsNothing(xmlElmt) Then
                        _strPort = xmlElmt.InnerText

                    End If

                    xmlElmt = xmldoc.SelectSingleNode("//CONFIGFILE/FTP_INFO/DEFAULT_DIR")

                    If Not IsNothing(xmlElmt) Then
                        _strDefDir = xmlElmt.InnerText
                    End If
            End Select

            If _strMandatoryfield.Length > 0 Or _strMandatoryColumn.Length > 0 Then

                If _strMandatoryColumn.Length > 0 Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : " & _strMandatoryColumn & "  :Mandatory column(s) missing.")
                End If

                If _strMandatoryfield.Length > 0 Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : " & _strMandatoryfield & "  :Mandatory data is missing.")
                End If

                Return E_NORECORDFOUND
            Else
                With pHashTblInvConfDetails
                    .Add("CLIENTID", _strClientID)
                    If pJobType = Enum_ServiceType.ALERT_DB Or pJobType = Enum_ServiceType.REF_DB Then
                        .Add("MONIKER", _strMoniker)
                    End If
                    .Add("SERVER_IP", _strServerIP)
                    .Add("PORT", _strPort)
                    .Add("USERNAME", _strUserName)
                    .Add("PASSWORD", _strPassWord)
                    If pJobType = Enum_ServiceType.FTP_INFO Then
                        .Add("DEFAULTDIR", _strDefDir)
                    End If
                End With
            End If
            Return ATPAR_OK
        Catch exFileNotFound As FileNotFoundException
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Inventory config file named : " & INVENTORY_CONFIG_FILENAME & " not found. " & exFileNotFound.ToString())
            Return E_SERVERERROR
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Load Inventory config XML " & xmlfilepath)
            Return E_SERVERERROR
        End Try

    End Function

	    Public Function SplitLotSerialValues(ByVal pSplitStr As String, ByRef pHtLotSRValues As Hashtable) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _intIndex As Integer
        Dim _statusCode As Long = -1

        Try

            Dim _strSplitVal As String() = pSplitStr.Split(",")
            For _intIndex = 0 To _strSplitVal.Length - 1
                If _strSplitVal(_intIndex).ToString.Contains(":") Then
                    _statusCode = SplitRangesData(_strSplitVal(_intIndex).ToString, pHtLotSRValues)
                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with StatusCode: " & _statusCode & vbCrLf)
                        Return E_SERVERERROR
                    End If
                Else
                    pHtLotSRValues.Add(_strSplitVal(_intIndex), _strSplitVal(_intIndex))
                End If
            Next

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

    End Function

    Private Function SplitRangesData(ByVal pRangeValue As String, ByRef pHtRangeValues As Hashtable) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Try
            Dim sa As String() = pRangeValue.Split(":")
            Dim FirstVal As Integer
            Dim SecondVal As Integer
            Dim _strMyValues As String
            Dim _strPrefix As String
            Dim _intFValIndex As Integer = 0
            Dim _intSValIndex As String = 0
            Dim _strFVal As String = Trim(sa(0)) 'TO avoid unecessary spaces.
            Dim _strSVal As String = Trim(sa(1)) 'TO avoid unecessary spaces.
            Dim _blnSChar As Boolean = False
            Dim _blnFChar As Boolean = False
            For intFCnt As Integer = 0 To _strFVal.Length - 1
                Dim chr As Char = _strFVal.Chars(intFCnt)
                If Not Char.IsNumber(chr) Then
                    _blnFChar = True
                    _intFValIndex = intFCnt
                End If
            Next
            For intSCnt As Integer = 0 To _strSVal.Length - 1
                Dim chr As Char = _strSVal.Chars(intSCnt)
                If Not Char.IsNumber(chr) Then
                    _blnSChar = True
                    _intSValIndex = intSCnt
                End If
            Next
            If _intSValIndex = 0 And _blnFChar = False Then
                FirstVal = _strFVal
            Else
                FirstVal = _strFVal.Substring(_intFValIndex + 1)
            End If

            If _intSValIndex = 0 And _blnSChar = False Then
                SecondVal = _strSVal
            Else
                SecondVal = _strSVal.Substring(_intSValIndex + 1)
            End If

            _strPrefix = _strFVal.Substring(0, _intFValIndex + 1)
            Do While (FirstVal <= SecondVal)
                _strMyValues = FirstVal
                FirstVal = FirstVal + 1
                pHtRangeValues.Add(_strPrefix & _strMyValues, _strPrefix & _strMyValues)
            Loop
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

    End Function

    Public Function SplitPackagingStrByItem(ByVal pPackagingStr As String, _
                                            ByVal pBunit As String, _
                                            ByVal pInvItemID As String, _
                                            ByRef pItemPkgStr As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name

        Dim _statusCode As Long = -1
        'packaging string is in the format of "STKRM|0030247|CS/33 BOX/6 PR|STKRM|0030248|BOX|STKRM|0030344|EA|STKRM|0030348|EA"
        'so splitting with "|" pipe symbol
        Dim _strsearchstring As String = String.empty
        _strsearchstring = pBunit & "|" & pInvItemID & "|"
        Try
            If pPackagingStr.Contains(_strsearchstring) Then
                pPackagingStr = pPackagingStr.Substring(pPackagingStr.IndexOf(_strsearchstring) + _strsearchstring.Length)
                If pPackagingStr.Contains("|") Then
                    Dim _strSplitVal() As String = pPackagingStr.Split("|")
                    If _strSplitVal.length > 0 Then
                        pItemPkgStr = _strSplitVal(0)
                    End If
                Else
                    'if it is a last item then pipe will not exits
                    pItemPkgStr = pPackagingStr
                End If
            Else
                pItemPkgStr = String.empty
            End If
            Return ATPAR_OK
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed to get packaging string for: " & _strsearchstring & vbCrLf & _
                                             " :Exception is:" & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try

    End Function
	
End Module

Imports System.Text
Imports System.Collections
Imports System.Text.RegularExpressions
Imports log4net
Imports System.Reflection
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Mail
Imports System.Net.Mail

''' -----------------------------------------------------------------------------
''' <summary>
''' 
''' </summary>
''' <remarks>
''' This class invoked by ADTListener_WinService after it receives the message(HL7)
''' from ADT system. The message buffer is passed to this class as input
''' This class takes the input message buffer, apply rules for the buffer
''' validates the message. If the message received is valid populates the appropriate
''' tables Point Of Use Middle Tier(using POU_BusinessRules) and it returns back the
''' Message Acknowledgement string 
''' HL7 VERSION
''' This parser is in accordance with 
''' HL7 MEDITECH Admissions System 2.1 specifications
'''
''' </remarks>
Public Class AtPar_ADTParser
    Inherits AtPar_DeviceTransactions_Base
    Dim _strWarning As String = String.Empty
    Dim _strErrMsg As String = String.Empty
    Dim _strFieldPos As String = String.Empty

#Region "Message Segment Enums"
    Public Enum FIELD_NAMES
        PATIENT_MRC = 1
        PATIENT_FIRST_NAME = 2
        PATIENT_BEDNUMBER = 3
        PATIENT_DEPARTMENT = 4
        PATIENT_SEX = 5
        PATIENT_ACCOUNT_NUMBER = 6
        PATIENT_CLASS = 7
        MESSAGE_DATETIME = 8
        ADMIT_DATETIME = 9
        DISCHARGE_DATETIME = 10
        ORG_ID = 11
        PATIENT_VISIT_NUMBER = 12
        OLD_PATIENT_MRC = 15
        PATIENT_MIDDLE_NAME = 13
        PATIENT_LAST_NAME = 14
        OLD_PATIENT_ACCOUNT_NUMBER = 16
        PATIENT_ROOM_NUMBER = 17
    End Enum
    Public Enum SIU_FIELD_NAMES
        PATIENT_MRC = 1
        PATIENT_ACC_NO = 2
        CASE_ID = 3
        ROOM_ID = 4
        PROCEDURE_ID = 5
        PROCEDURE_DESC = 6
        PREF_LIST_ID = 7
        PREF_LIST_DESC = 8
        PHYSICIAN_ID = 9
        PHYSICIAN_FN = 10
        ITEM_ID = 11
        ITEM_DESC = 12
        PICK_QUANTITY = 13
        HOLD_QUANTITY = 14
        ITEM_INVENTORY = 15
        PERFORM_DATETIME = 17
        CASE_DESC = 18
        PREF_ID = 19
        PHYSICIAN_LN = 20
        PHYSICIAN_MN = 21
        PROC_ID = 22
        PERFORM_TIME = 23
        DEPT_ID = 24
        COST_CENTER_CODE = 25
        SERVICE_CODE = 26
        ENCOUNTER_ID = 27
        PICK_LIST_ID = 28
    End Enum
    'ACKNOWLEDMENT CODES ENUM (MSA)
    'AA - APPLICATION ACCEPT
    'AE - APPLICATION ERROR
    'AR - APPLICATION RE_intCntECT
    Enum ACK_CODES
        AA
        AE
        AR
    End Enum
    'ACCOUNT STATUS CODES(PV1 segment)
    'Enum ACCOUNT_STATUS
    '    SCH         'SCHEDULED
    '    ADM         'ADMITTED
    '    DIS         'DISCHARGED
    '    PRE         'PRE-ADMITTED/REGISTERED
    '    REG         'REGISTERED
    '    DEP         'DEPARTED
    'End Enum

    Enum MSH
        FIELD_SEPARATOR = 1
        ENCODING_CHARACTERS = 2
        SENDING_APPLICATION = 3
        SENDING_FACILITY = 4
        RECEIVING_APPLICATION = 5
        RECEIVING_FACILITY = 6
        DATE_TIME_OF_MESSAGE = 7
        SECURITY = 8
        MESSAGE_TYPE = 9
        MESSAGE_CONTROL_ID = 10
        PROCESSING_ID = 11
        VERSION_ID = 12
        SEQUENCE_NUMBER = 13
        'Adding Extra field for different version messages
        MSH_FIELD_14 = 14
        MSH_FIELD_15 = 15
        MSH_FIELD_16 = 16
        MSH_FIELD_17 = 17
        MSH_FIELD_18 = 18
        MSH_FIELD_19 = 19
        MSH_FIELD_20 = 20

    End Enum

    Enum PID
        SET_ID_PID = 1
        PATIENT_ID = 2
        PATIENT_MEDICAL_RECORD_NUMBER = 3
        ALTERNATE_PATIENT_ID = 4
        PATIENT_NAME = 5
        MOTHERS_MAIDEN_NAME = 6
        DATE_TIME_OF_BIRTH = 7
        ADMINISTRATIVE_SEX = 8
        PATIENT_ALIAS = 9
        RACE = 10
        PATIENT_ADDRESS = 11
        COUNTRY_CODE = 12
        PHONE_NUMBER_HOME = 13
        PHONE_NUMBER_BUSINESS = 14
        PRIMARY_LANGUAGE = 15
        MARITAL_STATUS = 16
        RELIGION = 17
        PATIENT_ACCOUNT_NUMBER = 18
        PATIENT_SSN = 19
        'Adding Extra field for different version messages
        PID_FIELD_20 = 20
        PID_FIELD_21 = 21
        PID_FIELD_22 = 22
        PID_FIELD_23 = 23
        PID_FIELD_24 = 24
        PID_FIELD_25 = 25

    End Enum

    Enum PV1
        SET_ID_PV1 = 1
        PATIENT_CLASS = 2
        ASSIGNED_PATIENT_LOCATION = 3
        ADMISSION_TYPE = 4
        PREADMIT_NUMBER = 5
        PRIOR_PATIENT_LOCATION = 6
        ATTENDING_DOCTOR = 7
        REFERRING_DOCTOR = 8
        CONSULTING_DOCTOR = 9
        HOSPITAL_SERVICE = 10
        TEMPORARY_LOCATION = 11
        PREADMIT_TEST_INDICATOR = 12
        RE_ADMISSION_INDICATOR = 13
        ADMIT_SOURCE = 14
        AMBULATORY_STATUS = 15
        VIP_INDICATOR = 16
        ADMITTING_DOCTOR = 17
        PATIENT_TYPE = 18
        VISIT_NUMBER = 19
        FINANCIAL_CLASS = 20
        CHARGE_PRICE_INDICATOR = 21
        COURTESY_CODE = 22
        CREDIT_RATING = 23
        CONTRACT_CODE = 24
        CONTRACT_EFFECTIVE_DATE = 25
        CONTRACT_AMOUNT = 26
        CONTRACT_PERIOD = 27
        INTEREST_CODE = 28
        TRANSFER_TO_BAD_DEBT_CODE = 29
        TRANSFER_TO_BAD_DEBT_DATE = 30
        BAD_DEBT_AGENCY_CODE = 31
        BAD_DEBT_TRANSFER_AMOUNT = 32
        BAD_DEBT_RECOVERY_AMOUNT = 33
        DELETE_ACCOUNT_INDICATOR = 34
        DELETE_ACCOUNT_DATE = 35
        DISCHARGE_DISPOSITION = 36
        DISCHARGED_TO_LOCATION = 37
        DEIT_TYPE = 38
        SERVICING_FACILITY = 39
        BED_STATUS = 40
        ACCOUNT_STATUS = 41
        PENDING_LOCATION = 42
        PRIOR_TEMPORARY_LOCATION = 43
        ADMIT_DATE_TIME = 44
        DISCHARGE_DATE_TIME = 45
        'Adding Extra field for different version messages
        PV1_FIELD_46 = 46
        PV1_FIELD_47 = 47
        PV1_FIELD_48 = 48
        PV1_FIELD_49 = 49
        PV1_FIELD_50 = 50
    End Enum

    'Enum NK1
    '    SET_ID_NK1 = 1
    '    NK1_NAME = 2
    '    RELATIONSHIP = 3
    '    ADDRESS = 4
    '    PHONE_NUMBER = 5
    '    'Adding Extra field for different version messages
    '    NK1_FIELD_6 = 6
    '    NK1_FIELD_7 = 7
    '    NK1_FIELD_8 = 8
    '    NK1_FIELD_9 = 9
    '    NK1_FIELD_10 = 10

    'End Enum
#End Region
    Private Shared ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtPar_ADTParser))

#Region "Unused Functions"
    Public Function enum_MSH(ByVal val As Integer) As String
        enum_MSH = MSH.GetName(GetType(MSH), val)
    End Function
    Public Function enum_PID(ByVal val As Integer) As String
        enum_PID = PID.GetName(GetType(PID), val)
    End Function
    Public Function enum_PV1(ByVal val As Integer) As String
        enum_PV1 = PV1.GetName(GetType(PV1), val)
    End Function
#End Region
    Public Function enum_ACK_CODES(ByVal val As Integer) As String
        enum_ACK_CODES = ACK_CODES.GetName(GetType(ACK_CODES), val)
    End Function


    ''' <summary>
    ''' Validate Input Message
    ''' </summary>
    ''' <param name="inputMessageString"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ValidateInputMessage(ByVal pInputMsgString As String, ByRef pStrMsgAck As String, ByVal pSystemID As String) As Long

        log4net.ThreadContext.Properties(LOGPROPERTIES.SYSTEMID.ToString) = pSystemID

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        'Declare all the variables required for 
        'Updating POU DB
        'Set the Data once a segment is valid
        'Once every segment is valid
        'Call the methods in Business Rules for Insert/Update/Deletion of Data

        'MSH Segment related Variables
        Dim _strCombMsgType As String   ' Combination of Message Type and Trigger Event
        Dim _strMsgType As String       ' Message Type - ADT
        Dim _strTriggerEvent As String      ' A01, A02, A03, A04, A05, A06, A08, A11, A12, A13, A17, A18
        Dim _strMsgCtrlID As String  ' This is used for sending back the acknowledgement back
        Dim _strDateTimeOfMsg As String
        Dim _strFormatMsgDateTime As String
        Dim _strfacility As String

        'Message Ack related Variables
        Dim _strMSH As String
        Dim _strMSA As String
        'Dim _strMessageAck As String

        Dim _strSegmentArr As String()
        Dim _strFieldsArr As String()
        Dim regEx As Regex

        Dim _xmlDoc As New System.Xml.XmlDocument
        Dim _xmlNodeList As System.Xml.XmlNodeList
        Dim _strXmlName As String = String.Empty
        Dim _strXmlSegment As String = String.Empty
        Dim _strXmlFieldNo As String = String.Empty
        Dim _strXmlCompositeFieldNo As String = String.Empty
        Dim _strXmlMandatory As String = String.Empty
        Dim _strXmlEvents As String = String.Empty
        Dim _intMaxLength As Integer
        Dim _strFieldValue As String = String.Empty
        Dim _blnSegmentMatched As Boolean
        Dim _blnFieldValueExist As Boolean
        Dim _blnComponentValueExist As Boolean
        Dim _blnConfXmlFileExists As Boolean = True
        Dim _blnFieldPositionValue As Boolean
        Dim _blnIsValidSegment As Boolean
        Dim _blnIsValidMsg As Boolean = True
        Dim _strRetVal As String = String.Empty
        Dim _strPATIENT_MRC As String = String.Empty
        Dim _strPATIENT_NAME As String = String.Empty
        Dim _strPATIENT_MIDDLE_NAME As String = String.Empty
        Dim _strPATIENT_LAST_NAME As String = String.Empty
        Dim _strPATIENT_BEDNUMBER As String = String.Empty
        Dim _strPATIENT_DEPARTMENT As String = String.Empty
        Dim _strPATIENT_SEX As String = String.Empty
        Dim _strPATIENT_ACCOUNT_NUMBER As String = String.Empty
        Dim _strPATIENT_CLASS As String = String.Empty
        Dim _strPATIENT_ROOM_NO As String = String.Empty
        Dim _strMESSAGE_DATETIME As String = String.Empty
        Dim _strADMIT_DATETIME As String = String.Empty
        Dim _strDISCHARGE_DATETIME As String = String.Empty
        Dim _strCASE_ID As String = String.Empty
        Dim _strCASE_DESC As String = String.Empty
        Dim _strROOM_ID As String = String.Empty
        Dim _strPROCEDURE_ID As String = String.Empty
        Dim _strPROCEDURE_DESC As String = String.Empty
        Dim _strPREF_ID As String = String.Empty
        Dim _strPROC_ID As String = String.Empty
        Dim _strPREF_LIST_ID As String = String.Empty
        Dim _strPREF_DESC As String = String.Empty
        Dim _strPHYSICIAN_ID As String = String.Empty
        Dim _strPHYSICIAN_FN As String = String.Empty
        Dim _strPHYSICIAN_LN As String = String.Empty
        Dim _strPHYSICIAN_MN As String = String.Empty
        Dim _strPERFORM_DATETIME As String = String.Empty
        Dim _strPERFORM_TIME As String = String.Empty
        Dim _strITEM_ID As String = String.Empty
        Dim _strITEM_DESC As String = String.Empty
        Dim _strITEM_INVENTORY As String = String.Empty
        Dim _strPICK_QTY As String = String.Empty
        Dim _strHOLD_QTY As String = String.Empty
        Dim _strORG_ID As String = String.Empty
        Dim _strVisitNo As String = String.Empty
        Dim _strOLD_PATIENT_MRC As String = String.Empty
        Dim _strOLD_PATIENT_Account_Number As String = String.Empty
        Dim _strCostCenter As String = String.Empty
        Dim _strDeptId As String = String.Empty
        Dim _strServiceCode As String = String.Empty
        Dim _strEncounterID As String = String.Empty
        Dim _strPickListID As String = String.Empty
        Dim _StatusCode As Long = -1
        Dim _strFieldSeparator As String
        Dim _strComponentSeparator As String

        Dim _strFields As String = String.Empty

        Dim _strADTMsgType As String = String.Empty
        Dim _strCaseMsgType As String = String.Empty
        Dim _strErrorMssg As String = String.Empty
        Dim _strHL7_PRG_EXCEPTION_MSG As String = "Parser Error"
        Dim _strRulesError As String = "ADT Parser Rules not set properly"
        Dim _strPatientDataError As String = "Error in loading patient data into @Par"
        Dim _strPositionFieldError As String = String.Empty

        Dim _DeviceTokenEntry(8) As String
        'Device token entry
        _DeviceTokenEntry(TokenEntry_Enum.UserID) = String.Empty
        _DeviceTokenEntry(TokenEntry_Enum.AccessToken) = String.Empty
        _DeviceTokenEntry(TokenEntry_Enum.DeviceID) = String.Empty
        _DeviceTokenEntry(TokenEntry_Enum.DateTime) = String.Empty
        _DeviceTokenEntry(TokenEntry_Enum.ProfileID) = String.Empty
        _DeviceTokenEntry(TokenEntry_Enum.OrgGrpID) = String.Empty
        _DeviceTokenEntry(TokenEntry_Enum.LdapUser) = String.Empty
        _DeviceTokenEntry(TokenEntry_Enum.ClientType) = String.Empty
        _DeviceTokenEntry(TokenEntry_Enum.SystemId) = pSystemID

        Try
            'Splitting the Incoming Message into different segments
            _strSegmentArr = Regex.Split(Trim(pInputMsgString), Chr(13))

            _strFieldSeparator = _strSegmentArr(0).Substring(_strSegmentArr(0).IndexOf("H") + 1, 1)
            _strComponentSeparator = _strSegmentArr(0).Substring(_strSegmentArr(0).IndexOf(_strFieldSeparator) + 1, 1)

            If log.IsDebugEnabled Then log.Debug(methodBaseName & "Field Separator,Component Separator:" & _strFieldSeparator &
                                                    ":," & _strComponentSeparator)



            _strFieldsArr = Trim(_strSegmentArr(0)).Split(_strFieldSeparator)

            'Creating an array including field separator
            Dim pInputArr(_strFieldsArr.Length + 1) As String        'Adding Field Separator
            Dim _strMsgTypeArr As String()

            pInputArr(0) = "MSH"     ' _strFieldsArr(0)
            pInputArr(1) = _strFieldSeparator
            For _intCnt As Integer = 1 To _strFieldsArr.Length - 1
                pInputArr(_intCnt + 1) = _strFieldsArr(_intCnt)
            Next


            _strMSH = BuildMessageAckHdr(pInputArr)

            ' - Store the Message Type like ADT^A01(Take only A01 event type) which is useful
            '   for appropriate action to be taken on the data(Insert/Update/Delete from Middle Tier)
            ' - Split within element with _strComponentSeparator("^" commonly) character

            _strMsgCtrlID = pInputArr(MSH.MESSAGE_CONTROL_ID)
            _strCombMsgType = pInputArr(MSH.MESSAGE_TYPE)
            _strfacility = pInputArr(MSH.SENDING_FACILITY)

            _strMsgTypeArr = _strCombMsgType.Split(_strComponentSeparator)

            _strMsgType = _strMsgTypeArr(0)
            _strTriggerEvent = _strMsgTypeArr(1)
            _strDateTimeOfMsg = pInputArr(MSH.DATE_TIME_OF_MESSAGE)


            _strADTMsgType = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.ADT_MESSAGE_TYPE.ToString)
            _strCaseMsgType = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.ADT_CASE_MESSAGE_TYPE.ToString)

            ' Loading the ADT Rules file
            If _strMsgType.ToUpper = _strADTMsgType Then 'HL7 msg for patient info

                Try
                    _StatusCode = LoadADTRulesFile(_xmlNodeList)
                    If _StatusCode <> ATPAR_OK Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to Load ADT Rules file :" _
                                                           & _StatusCode & ": Invalid ADT Rules File")

                        _blnConfXmlFileExists = False

                    End If


                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Status is :" & _StatusCode &
                                                        ": Failed to Load ADT Rules file with exception " & ex.ToString())
                    _blnConfXmlFileExists = False
                End Try

                'Validate and populate the node attributes
                Try

                    ' If configuration file exists and loads properly then we get into the loop
                    If _blnConfXmlFileExists Then

                        For intNodeCnt As Integer = 0 To _xmlNodeList.Count - 1

                            If _xmlNodeList(intNodeCnt).Attributes.Count > 0 Then
                                Try
                                    Try
                                        _strXmlName = _xmlNodeList(intNodeCnt).Attributes("name").Value
                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'name' " &
                                                 "attribute has been specified in the <ADT_PATIENT_DATA/field> tag" & ex.ToString())
                                        _blnIsValidMsg = False
                                        _strErrorMssg = _strRulesError
                                        Exit For
                                    End Try
                                    Try
                                        _strXmlSegment = _xmlNodeList(intNodeCnt).Attributes("segment").Value
                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'segment' " &
                                                 "attribute has been specified in the <ADT_PATIENT_DATA><field> tag" & ex.ToString())
                                        _blnIsValidMsg = False
                                        _strErrorMssg = _strRulesError
                                        Exit For
                                    End Try

                                    Try
                                        _strXmlFieldNo = _xmlNodeList(intNodeCnt).Attributes("field_no").Value
                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'field_no' " &
                                                 "attribute has been specified in the <ADT_PATIENT_DATA/field> tag" & ex.ToString())
                                        _blnIsValidMsg = False
                                        _strErrorMssg = _strRulesError
                                        Exit For
                                    End Try
                                    Try
                                        _strXmlCompositeFieldNo = _xmlNodeList(intNodeCnt).Attributes("composite_field_no").Value
                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'composit_field_no' " &
                                                 "attribute has been specified in the <ADT_PATIENT_DATA/field> tag" & ex.ToString())
                                        _blnIsValidMsg = False
                                        _strErrorMssg = _strRulesError
                                        Exit For
                                    End Try
                                    Try
                                        _strXmlMandatory = _xmlNodeList(intNodeCnt).Attributes("mandatory").Value
                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'mandatory' " &
                                                 "attribute has been specified in the <ADT_PATIENT_DATA/field> tag" & ex.ToString())
                                        _blnIsValidMsg = False
                                        _strErrorMssg = _strRulesError
                                        Exit For
                                    End Try
                                    Try
                                        _strXmlEvents = _xmlNodeList(intNodeCnt).Attributes("events").Value
                                    Catch ex As Exception
                                        _strXmlEvents = "All"
                                    End Try

                                    If _strXmlName = "MSA_ERROR_LENGTH" Then
                                        Try
                                            _intMaxLength = Convert.ToInt32(_xmlNodeList(intNodeCnt).Attributes("length").Value)
                                            Continue For
                                        Catch ex As Exception
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'length' " & ex.ToString())
                                            _intMaxLength = 80
                                            Continue For
                                        End Try
                                    End If


                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Attributes for the node counter :" & intNodeCnt & ":" & vbCrLf &
                                                                        "Field Name :" & _strXmlName & ":" & vbCrLf &
                                                                        "Segment :" & _strXmlSegment & ":" & vbCrLf &
                                                                        "Field Number :" & _strXmlFieldNo & ":" & vbCrLf &
                                                                        "Compostie Field Number :" & _strXmlCompositeFieldNo & ":" & vbCrLf &
                                                                        "Events :" & _strXmlEvents & ":" & vbCrLf &
                                                                       "Mandatory :" & _strXmlMandatory & ":")

                                    If String.IsNullOrEmpty(_strXmlName) Or String.IsNullOrEmpty(_strXmlSegment) _
                                        Or String.IsNullOrEmpty(_strXmlFieldNo) Or String.IsNullOrEmpty(_strXmlMandatory) Then
                                        _blnIsValidMsg = False
                                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed ADT rules file, " &
                                                                            "one of the attribute values is empty")
                                        _strErrorMssg = _strHL7_PRG_EXCEPTION_MSG
                                        Exit For
                                    End If

                                Catch ex As Exception
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed ADT rules file exception is :" & vbCrLf &
                                                                         ex.ToString())
                                    _blnIsValidMsg = False
                                    _strErrorMssg = _strHL7_PRG_EXCEPTION_MSG
                                    Exit For
                                End Try
                            Else
                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed ADT rules file, attributes not found for the node" &
                                                                    " count :" & intNodeCnt.ToString & ":")
                                _blnIsValidMsg = False
                                _strErrorMssg = _strRulesError
                                Exit For
                            End If


                            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Validation of node attributes starts....")

                            ' checks whether the segments defined in the xml file exist in the message
                            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Validating the segment specified in the node attribute matches" &
                                                                " in Message received.....")

                            _blnIsValidSegment = CheckSegmentExistInMsg(_strSegmentArr, _strXmlSegment, _strXmlEvents)

                            If Not _blnIsValidSegment Then
                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Segment :" & _strXmlSegment &
                                                                    ": not provided in the message ")
                                _blnIsValidMsg = False
                                _strErrorMssg = " Segment :" & _strXmlSegment & " is Missing"
                                Exit For
                            End If

                            ' Start of For loop for the segments
                            For intSegmentCnt As Integer = 0 To _strSegmentArr.Length - 1

                                Dim _strFieldArr() As String

                                _strFields = _strSegmentArr(intSegmentCnt)

                                If String.IsNullOrEmpty(_strFields) Then
                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Segment field at the position :" & intSegmentCnt &
                                                                        ": does not exist in the message ")
                                    Exit For
                                End If

                                _strFieldArr = _strFields.Split(_strFieldSeparator)

                                'Checking segment node attribute matches with Segment from Message  
                                If _strXmlSegment.ToLower() = _strFieldArr(0).ToLower() Then


                                    ' validate if value exists in the message at the field position
                                    If log.IsDebugEnabled Then log.Debug(methodBaseName & " Validation of field no. node attributes ")
                                    If Not String.IsNullOrEmpty(_strXmlFieldNo) Then

                                        ' checks whether the segment is MSH, if so then we need to do (- 1) for the field position
                                        ' As per the HL7 message it is 7th position but as per the array after splitting with field seperator it is 6th position
                                        ' because HL7 considers (|) at the first position

                                        If _strXmlSegment.ToLower() = "msh" Then

                                            If log.IsDebugEnabled Then log.Debug(methodBaseName & "Resetting the field position value :" & _strXmlFieldNo & ": for the MSH segment")

                                            Try
                                                Dim _intMSHFieldNo As Integer = IIf(IsNumeric(_strXmlFieldNo), (CType(_strXmlFieldNo, Integer) - 1), 0)

                                                _strXmlFieldNo = _intMSHFieldNo.ToString()

                                                If log.IsDebugEnabled Then log.Debug(methodBaseName & "Resetted value is :" & _strXmlFieldNo & ":")

                                            Catch ex As Exception
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to reset the field position value for MSH segment with the exception :" & ex.Message.ToString() & ":")
                                            End Try
                                        End If


                                        _StatusCode = ValidateFieldPositionValue(_strFields, _strXmlFieldNo,
                                                                                    _strFieldSeparator, _blnFieldPositionValue, _strXmlName, _strPositionFieldError)

                                        If _StatusCode <> ATPAR_OK Then
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Field position" &
                                                                                _strXmlFieldNo & ": specified is missing in the message ")
                                            _blnIsValidMsg = False
                                            _strErrorMssg = _strXmlSegment & _strPositionFieldError
                                            Exit For
                                        End If
                                        If _blnFieldPositionValue = False Then
                                            _blnIsValidMsg = False
                                            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Field position :" &
                                                                                _strXmlFieldNo & ": specified is missing in the message ")

                                            _strErrorMssg = _strXmlSegment & _strPositionFieldError
                                            Exit For
                                        End If
                                    End If

                                    ' check for mandatory
                                    If log.IsDebugEnabled Then log.Debug(methodBaseName & " Validation of mandatory node attribute for attribute value" &
                                                                        " of :" & _strXmlMandatory & ":")
                                    If Not String.IsNullOrEmpty(_strXmlMandatory) And _strXmlMandatory.ToLower() = "y" Then ' when mandatory is "Y"

                                        If log.IsDebugEnabled Then log.Debug(methodBaseName & " Validating if field value exists or not ")

                                        _StatusCode = ValidateFieldValue(_strFields, _strXmlFieldNo, _strFieldValue,
                                                                     _strFieldSeparator, _blnFieldValueExist, _strXmlName)

                                        If _StatusCode <> ATPAR_OK Then
                                            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed at function ValidateFieldValue ")
                                            _blnIsValidMsg = False
                                            _strErrorMssg = _strHL7_PRG_EXCEPTION_MSG
                                            Exit For
                                        End If

                                        If Not _blnFieldValueExist Then
                                            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Mandatory Field value at" &
                                                                               " the position :" & _strXmlFieldNo &
                                                                               ": is not provided in the message  ")
                                            _blnIsValidMsg = False
                                            _strErrorMssg = _strFieldArr(0) & "-Field No-" & _strXmlFieldNo & " missing"
                                            Exit For
                                        End If


                                        If log.IsDebugEnabled Then log.Debug(methodBaseName & " Validation of composite field no. node attribute for" &
                                                                            " attribute value at :" & _strXmlCompositeFieldNo & ":")
                                        ' check for the field value at the component position
                                        If Not String.IsNullOrEmpty(_strXmlCompositeFieldNo) Then

                                            If log.IsDebugEnabled Then log.Debug(methodBaseName & " Validating if composite field value at position :" &
                                                                                _strXmlCompositeFieldNo & ":" &
                                                                                " exists or not in the field value :" & _strFieldValue & ":")
                                            _StatusCode = ValidateCompositeValues(_strFieldValue, _strComponentSeparator,
                                                                                    _strXmlCompositeFieldNo, _strFieldValue, _blnComponentValueExist, _strXmlName)


                                            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Status code after ValidateCompositeValues is : " & _StatusCode & ":")
                                            If _StatusCode <> ATPAR_OK Then
                                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed at function ValidateCompositeValues ")
                                                _blnIsValidMsg = False
                                                _strErrorMssg = _strHL7_PRG_EXCEPTION_MSG
                                                Exit For
                                            End If


                                            If Not _blnComponentValueExist Then
                                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Mandatory Field value at" &
                                                                                    " the composite field position :" & _strXmlCompositeFieldNo &
                                                                                    ": in Field value :" & _strFieldValue &
                                                                                    ": is not provided in the message ")
                                                _blnIsValidMsg = False
                                                _strErrorMssg = _strXmlSegment & " Composite FieldNo-" & _strXmlCompositeFieldNo & "missing"
                                                Exit For
                                            End If
                                        End If


                                    Else ' when mandatory is "N"

                                        If log.IsDebugEnabled Then log.Debug(methodBaseName & " Validating if field value exists or not ")
                                        _StatusCode = ValidateFieldValue(_strFields, _strXmlFieldNo, _strFieldValue,
                                                                            _strFieldSeparator, _blnFieldValueExist, _strXmlName)

                                        If _StatusCode <> ATPAR_OK Then
                                            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed at function ValidateFieldValue ")
                                            _blnIsValidMsg = False
                                            _strErrorMssg = _strHL7_PRG_EXCEPTION_MSG
                                            Exit For
                                        End If

                                        If Not String.IsNullOrEmpty(_strFieldValue) Then
                                            ' check for the field value at the component position
                                            If Not String.IsNullOrEmpty(_strXmlCompositeFieldNo) Then

                                                _StatusCode = ValidateCompositeValues(_strFieldValue, _strComponentSeparator,
                                                                                    _strXmlCompositeFieldNo, _strFieldValue, _blnComponentValueExist, _strXmlName)

                                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Status code after ValidateCompositeValues is : " & _StatusCode & ":")
                                                If _StatusCode <> ATPAR_OK Then
                                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed at function ValidateCompoSiteValues ")
                                                    _blnIsValidMsg = False
                                                    _strErrorMssg = _strHL7_PRG_EXCEPTION_MSG
                                                    Exit For
                                                End If
                                                If Not _blnComponentValueExist Then
                                                    _strErrMsg = " Composite field value of field name " & _strXmlName & " doesnot exists at the composite position in the message"
                                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & _strErrMsg)
                                                    Exit For
                                                End If
                                            End If

                                        End If
                                    End If

                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Valid msg boolean value is :" & _blnIsValidMsg & ":")

                                    If _blnIsValidMsg Then
                                        'set values
                                        Try
                                            If log.IsWarnEnabled Then log.Warn(methodBaseName & " Setting Values for Field Name :" & _strXmlName & ":" &
                                                                            "Field value is : " & _strFieldValue & ":")

                                            If Not String.IsNullOrEmpty(_strFieldValue) Then
                                                _strFieldValue = Regex.Replace(_strFieldValue, "<|>|'|&", "")
                                            End If

                                            Select Case _strXmlName
                                                Case FIELD_NAMES.PATIENT_MRC.ToString()
                                                    _strPATIENT_MRC = _strFieldValue

                                                    'In Patient name we will have First name, middle name and last name, so we are concatinating all and inserting
                                                Case FIELD_NAMES.PATIENT_FIRST_NAME.ToString()
                                                    _strPATIENT_NAME = _strFieldValue

                                                Case FIELD_NAMES.PATIENT_MIDDLE_NAME.ToString()
                                                    _strPATIENT_MIDDLE_NAME = _strFieldValue

                                                Case FIELD_NAMES.PATIENT_LAST_NAME.ToString()
                                                    _strPATIENT_LAST_NAME = _strFieldValue

                                                Case FIELD_NAMES.PATIENT_BEDNUMBER.ToString()
                                                    _strPATIENT_BEDNUMBER = _strFieldValue

                                                Case FIELD_NAMES.PATIENT_DEPARTMENT.ToString()
                                                    _strPATIENT_DEPARTMENT = _strFieldValue

                                                Case FIELD_NAMES.PATIENT_SEX.ToString()
                                                    _strPATIENT_SEX = _strFieldValue

                                                Case FIELD_NAMES.PATIENT_ACCOUNT_NUMBER.ToString()
                                                    _strPATIENT_ACCOUNT_NUMBER = _strFieldValue

                                                Case FIELD_NAMES.PATIENT_CLASS.ToString()
                                                    _strPATIENT_CLASS = _strFieldValue

                                                Case FIELD_NAMES.MESSAGE_DATETIME.ToString()
                                                    Try
                                                        If Not String.IsNullOrEmpty(_strFieldValue) And _strFieldValue.Length >= 10 Then

                                                            _strFormatMsgDateTime = _strFieldValue.Substring(0, 4) & "/" _
                                                                                    & _strFieldValue.Substring(4, 2) & "/" _
                                                                                    & _strFieldValue.Substring(6, 2) & " " _
                                                                                    & _strFieldValue.Substring(8, 2) & ":" _
                                                                                    & _strFieldValue.Substring(10, 2)
                                                            _strMESSAGE_DATETIME = Format(Convert.ToDateTime(_strFormatMsgDateTime), "MM/dd/yyyy HH:mm:ss")
                                                        Else
                                                            _strMESSAGE_DATETIME = String.Empty
                                                        End If
                                                    Catch ex As Exception
                                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to set the MESSAGE_DATETIME value" &
                                                                                            " with the exception " & ex.ToString())
                                                    End Try
                                                Case FIELD_NAMES.ADMIT_DATETIME.ToString()
                                                    _strADMIT_DATETIME = _strFieldValue

                                                Case FIELD_NAMES.DISCHARGE_DATETIME.ToString()
                                                    _strDISCHARGE_DATETIME = _strFieldValue

                                                Case FIELD_NAMES.ORG_ID.ToString()
                                                    _strORG_ID = _strFieldValue

                                                Case FIELD_NAMES.PATIENT_VISIT_NUMBER.ToString()
                                                    _strVisitNo = _strFieldValue
                                                Case FIELD_NAMES.OLD_PATIENT_MRC.ToString()
                                                    _strOLD_PATIENT_MRC = _strFieldValue
                                                Case FIELD_NAMES.OLD_PATIENT_ACCOUNT_NUMBER.ToString()
                                                    _strOLD_PATIENT_Account_Number = _strFieldValue
                                                Case FIELD_NAMES.PATIENT_ROOM_NUMBER.ToString()
                                                    _strPATIENT_ROOM_NO = _strFieldValue
                                            End Select
                                        Catch ex As Exception
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to set the values with the exception " &
                                                                                    ex.ToString())
                                            _blnIsValidMsg = False
                                            _strErrorMssg = _strHL7_PRG_EXCEPTION_MSG
                                            Exit For
                                        End Try

                                    End If

                                End If


                            Next ' End of For loop for the segments   


                            If Not _blnIsValidMsg Then
                                _blnIsValidMsg = False
                                Exit For
                            End If
                        Next


                    End If

                    If _blnIsValidMsg Then

                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " Message received is validated and patient data" &
                                                            " picked from message used to populate or update database...  ")

                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " Final Field Values are :" &
                                                            " PATIENT_MRC : " & _strPATIENT_MRC &
                                                            " PATIENT_NAME : " & _strPATIENT_NAME & " " & _strPATIENT_MIDDLE_NAME & " " & _strPATIENT_LAST_NAME &
                                                            " PATIENT_BEDNUMBER : " & _strPATIENT_BEDNUMBER &
                                                            " PATIENT_DEPARTMENT : " & _strPATIENT_DEPARTMENT &
                                                            " PATIENT_SEX : " & _strPATIENT_SEX &
                                                            " PATIENT_ACCOUNT_NUMBER : " & _strPATIENT_ACCOUNT_NUMBER &
                                                            " PATIENT_CLASS : " & _strPATIENT_CLASS &
                                                            " MESSAGE_DATETIME : " & _strMESSAGE_DATETIME &
                                                            " ADMIT_DATETIME : " & _strADMIT_DATETIME &
                                                            " DISCHARGE_DATETIME : " & _strDISCHARGE_DATETIME &
                                                            " ORG_ID : " & _strORG_ID &
                                                            " PATIENT_VISIT_NUMBER : " & _strVisitNo &
                                                            " OLD_PATIENT_MRC : " & _strOLD_PATIENT_MRC &
                                                            " OLD_PATIENT_ACCOUNT_NUMBER : " & _strOLD_PATIENT_Account_Number &
                                                            " PATIENT_ROOM_NUMBER : " & _strPATIENT_ROOM_NO)


                        ' setting the data into the datatable
                        'Stored the required data in DataSet
                        Dim _dsADT As New DataSet
                        Dim _dtADT As DataTable
                        Dim _drADT As DataRow
                        _dtADT = New DataTable

                        'Defining Data Table in Dataset
                        _dtADT.Columns.Add("PATIENT_MRC", Type.GetType("System.String"))
                        _dtADT.Columns.Add("PATIENT_NAME", Type.GetType("System.String"))
                        _dtADT.Columns.Add("PATIENT_BEDNUMBER", Type.GetType("System.String"))
                        _dtADT.Columns.Add("PATIENT_ROOM_NUMBER", Type.GetType("System.String"))
                        _dtADT.Columns.Add("PATIENT_DEPARTMENT", Type.GetType("System.String"))
                        _dtADT.Columns.Add("PATIENT_SEX", Type.GetType("System.String"))
                        _dtADT.Columns.Add("PATIENT_ACCOUNT_NUMBER", Type.GetType("System.String"))
                        _dtADT.Columns.Add("PATIENT_CLASS", Type.GetType("System.String"))
                        _dtADT.Columns.Add("MESSAGE_DATETIME", Type.GetType("System.String"))
                        'GP-0001233
                        _dtADT.Columns.Add("ADMIT_DATETIME", Type.GetType("System.String"))
                        _dtADT.Columns.Add("DISCHARGE_DATETIME", Type.GetType("System.String"))
                        _dtADT.Columns.Add("ORG_ID", Type.GetType("System.String"))
                        _dtADT.Columns.Add("PATIENT_VISIT_NUMBER", Type.GetType("System.String"))
                        _dtADT.Columns.Add("STATUS", Type.GetType("System.String"))
                        _dtADT.Columns.Add("OLD_PATIENT_MRC", Type.GetType("System.String"))
                        _dtADT.Columns.Add("OLD_PATIENT_ACCOUNT_NUMBER", Type.GetType("System.String"))



                        _drADT = _dtADT.NewRow
                        _drADT.Item("PATIENT_MRC") = _strPATIENT_MRC
                        _drADT.Item("PATIENT_NAME") = _strPATIENT_NAME & " " & _strPATIENT_MIDDLE_NAME & " " & _strPATIENT_LAST_NAME
                        _drADT.Item("PATIENT_BEDNUMBER") = _strPATIENT_BEDNUMBER
                        _drADT.Item("PATIENT_ROOM_NUMBER") = _strPATIENT_ROOM_NO
                        _drADT.Item("PATIENT_DEPARTMENT") = _strPATIENT_DEPARTMENT
                        _drADT.Item("PATIENT_SEX") = _strPATIENT_SEX
                        _drADT.Item("PATIENT_ACCOUNT_NUMBER") = _strPATIENT_ACCOUNT_NUMBER
                        _drADT.Item("PATIENT_CLASS") = _strPATIENT_CLASS
                        _drADT.Item("MESSAGE_DATETIME") = _strMESSAGE_DATETIME 'Format(Convert.ToDateTime(_strFormatMsgDateTime), "MM/dd/yyyy HH:mm:ss") '_strMESSAGE_DATETIME
                        'GP-IT0001233
                        _drADT.Item("ADMIT_DATETIME") = _strADMIT_DATETIME
                        _drADT.Item("DISCHARGE_DATETIME") = _strDISCHARGE_DATETIME
                        _drADT.Item("ORG_ID") = _strORG_ID
                        _drADT.Item("PATIENT_VISIT_NUMBER") = _strVisitNo
                        _drADT.Item("STATUS") = String.Empty
                        _drADT.Item("OLD_PATIENT_MRC") = _strOLD_PATIENT_MRC
                        _drADT.Item("OLD_PATIENT_ACCOUNT_NUMBER") = _strOLD_PATIENT_Account_Number
                        _dtADT.Rows.Add(_drADT)

                        _dsADT.Tables.Add(_dtADT)

                        If log.IsDebugEnabled Then
                            PrintDatasetStatistics(_dsADT, _DeviceTokenEntry)
                        End If

                        PrintDS(_dsADT)

                        Dim adtPatientInfo As New AtPar_DevTrans


                        'ToDO:  As of now, we are inserting the patient info when trigger event is AddPatient and Register Patient - need to confirm
                        'GP-IT0001348,IT0001349
                        'Here, for A01 - Admit Patient and A04 - Admit to ER as OP, we inseting the records, for remaining all 
                        ' trigger events updating the patient info

                        Try
                            If Not String.IsNullOrEmpty(_strTriggerEvent) Then

                                adtPatientInfo.Add_Edit_ADTPatientData(_dsADT, pSystemID, _strTriggerEvent)
                            Else
                                If log.IsWarnEnabled Then log.Warn(methodBaseName & "Failed to Add/Update Patient Data")
                            End If
                            If _StatusCode <> ATPAR_OK Then
                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Failed to Add/Update Patient Data into database with Status as :" & _StatusCode & ":")
                                _blnIsValidMsg = False
                                _strErrorMssg = _strPatientDataError
                            End If
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Add/Update Patient Data into database with exception :" & vbCrLf & ex.ToString & ":")
                            _blnIsValidMsg = False
                            _strErrorMssg = _strPatientDataError
                        End Try


                    Else
                        _blnIsValidMsg = False

                        If log.IsWarnEnabled Then log.Warn(methodBaseName & "Configuration File doesnot exists or malformed configuration file")

                    End If

                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Status is :" & _StatusCode & ": Failed in getting values with exception" _
                                                        & ex.ToString())
                    _blnIsValidMsg = False
                    _strErrorMssg = _strHL7_PRG_EXCEPTION_MSG

                End Try

            ElseIf _strMsgType.ToUpper = _strCaseMsgType Then 'HL7 msg for case info

                Dim _className As String = String.Empty
                Dim _classType As Type
                Dim _methodName As MethodInfo
                Dim _reflectObject As Object
                Dim _erpObjAssy As Assembly
                Dim _erpObjName As String = String.Empty

                Dim _dsSIU As New DataSet
                Dim _dtSIUHeader As DataTable
                Dim _dtSIUDetails As DataTable
                Dim _dtPreference As DataTable
                Dim _dtProcedure As DataTable
                Dim _dtPhysician As DataTable
                Dim _dtItemDetails As DataTable
                Dim _drSIUHeader As DataRow
                Dim _drSIUDetails As DataRow
                Dim _drProcedure As DataRow
                Dim _drPhysician As DataRow
                Dim _drPreference As DataRow
                Dim _drItemDetails As DataRow

                Dim _strAtparPrefID As String = String.Empty
                Dim _strAtparPrefDescr As String = String.Empty
                Dim _strAtparProcID As String = String.Empty
                Dim _strSourceValue As String = String.Empty
                Dim _strWrng As String = String.Empty




                Dim _strPatientMRN As String = String.Empty
                Dim _strCaseId As String = String.Empty
                Dim _strProcedure As String = String.Empty
                Dim _strPreference As String = String.Empty


                Dim _intTransmissionStatus As Integer = HL7_MESSAGE_SENT_STATUS.SUCESS

                _dtSIUHeader = New DataTable("CASE_HEADER")

                'Defining Headers Data Table in Dataset
                _dtSIUHeader.Columns.Add("PATIENT_MRC", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("CASE_ID", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("CASE_DESC", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("ROOM_ID", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("PERFORM_DATETIME", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("PROCEDURE_ID", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("PROCEDURE_DESC", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("PREF_LIST_ID", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("PREF_LIST_DESC", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("PHYSICIAN_ID", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("PHYSICIAN_FN", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("PHYSICIAN_LN", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("PHYSICIAN_MN", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("DEPT_ID", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("COST_CENTER_CODE", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("SERVICE_CODE", Type.GetType("System.String"))
                _dtSIUHeader.Columns.Add("ENCOUNTER_ID", Type.GetType("System.Int64"))
                _dtSIUHeader.Columns.Add("PICK_LIST_ID", Type.GetType("System.String"))

                _dtSIUDetails = New DataTable("CASE_DETAILS")

                'Defining Details Data Table in Dataset
                _dtSIUDetails.Columns.Add("CASE_ID", Type.GetType("System.String"))
                _dtSIUDetails.Columns.Add("ITEM_ID", Type.GetType("System.String"))
                _dtSIUDetails.Columns.Add("ITEM_DESC", Type.GetType("System.String"))
                _dtSIUDetails.Columns.Add("ITEM_INVENTORY", Type.GetType("System.String"))
                _dtSIUDetails.Columns.Add("PICK_QTY", Type.GetType("System.String"))
                _dtSIUDetails.Columns.Add("HOLD_QTY", Type.GetType("System.String"))
                _dtSIUDetails.Columns.Add("PREF_LIST_ID", Type.GetType("System.String"))
                _dtSIUDetails.Columns.Add("PROCEDURE_ID", Type.GetType("System.String"))

                _dtPreference = New DataTable("PREFERENCE")
                'Defining Preference Details Data Table in Data Set
                _dtPreference.Columns.Add("SET_ID", Type.GetType("System.String"))
                _dtPreference.Columns.Add("PREF_LIST_ID", Type.GetType("System.String"))
                _dtPreference.Columns.Add("PREF_LIST_DESC", Type.GetType("System.String"))


                _dtProcedure = New DataTable("PROCEDURE")
                'Defining Procedure Details Data Table in Data Set
                _dtProcedure.Columns.Add("SET_ID", Type.GetType("System.String"))
                _dtProcedure.Columns.Add("PROCEDURE_ID", Type.GetType("System.String"))
                _dtProcedure.Columns.Add("PROCEDURE_DESC", Type.GetType("System.String"))

                _dtPhysician = New DataTable("PHYSICIAN")
                'Defining Physician Details Data Table in Data Set
                _dtPhysician.Columns.Add("SET_ID", Type.GetType("System.String"))
                _dtPhysician.Columns.Add("PHYSICIAN_ID", Type.GetType("System.String"))
                _dtPhysician.Columns.Add("PHYSICIAN_FN", Type.GetType("System.String"))
                _dtPhysician.Columns.Add("PHYSICIAN_LN", Type.GetType("System.String"))
                _dtPhysician.Columns.Add("PHYSICIAN_MN", Type.GetType("System.String"))

                _dtItemDetails = New DataTable("ITEM_DETAILS")
                'Defining Item Details Data Table in Data Set
                _dtItemDetails.Columns.Add("SET_ID", Type.GetType("System.String"))
                _dtItemDetails.Columns.Add("ITEM_ID", Type.GetType("System.String"))
                _dtItemDetails.Columns.Add("ITEM_DESC", Type.GetType("System.String"))
                _dtItemDetails.Columns.Add("ITEM_INVENTORY", Type.GetType("System.String"))
                _dtItemDetails.Columns.Add("PICK_QTY", Type.GetType("System.String"))
                _dtItemDetails.Columns.Add("HOLD_QTY", Type.GetType("System.String"))
                _dtItemDetails.Columns.Add("PREF_ID", Type.GetType("System.String"))
                _dtItemDetails.Columns.Add("PROCEDURE_ID", Type.GetType("System.String"))

                Try
                    _StatusCode = LoadSIURulesFile(_xmlNodeList)
                    If _StatusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Load SIU Rules file :" _
                                                           & _StatusCode & ": Invalid SIU Rules File")

                        _blnConfXmlFileExists = False

                    End If


                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Status is :" & _StatusCode &
                                                        ": Failed to Load SIU Rules file with exception " & ex.ToString())
                    _strErrMsg = ex.ToString
                    _blnConfXmlFileExists = False
                End Try

                If _blnConfXmlFileExists Then
                    If _strTriggerEvent <> String.Empty Then

                        For intSegmentCnt As Integer = 0 To _strSegmentArr.Length - 1

                            Dim _strFieldArr() As String

                            _strFields = _strSegmentArr(intSegmentCnt)

                            If String.IsNullOrEmpty(_strFields) Then

                                _strErrMsg = "Segment field at the position :" & intSegmentCnt & " : does not exist in the message "

                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " : " & _strErrMsg)
                                Exit For
                            End If

                            _strFieldArr = _strFields.Split(_strFieldSeparator)
                            If log.IsDebugEnabled Then log.Debug(methodBaseName & " :Looking for segment: " & _strFieldArr(0).ToString)
                            For intNodeCnt As Integer = 0 To _xmlNodeList.Count - 1

                                _strSourceValue = String.Empty

                                If _xmlNodeList(intNodeCnt).Attributes.Count > 0 Then
                                    Try
                                        _strXmlSegment = _xmlNodeList(intNodeCnt).Attributes("segment").Value

                                    Catch ex As Exception
                                        _strErrMsg = " Malformed XML, please check if 'segment' " &
                                                    "attribute has been specified in the <SIU_CASE_DATA><field> tag" & ex.ToString()

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                        _blnIsValidMsg = False
                                        Exit For
                                    End Try
                                    Try
                                        _strXmlFieldNo = _xmlNodeList(intNodeCnt).Attributes("field_no").Value
                                    Catch ex As Exception
                                        _strErrMsg = " Malformed XML, please check if 'field_no' " &
                                                 "attribute has been specified in the <SIU_CASE_DATA/field> tag" & ex.ToString()

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                        _blnIsValidMsg = False
                                        Exit For
                                    End Try
                                    Try
                                        _strXmlMandatory = _xmlNodeList(intNodeCnt).Attributes("mandatory").Value
                                    Catch ex As Exception
                                        _strErrMsg = " Malformed XML, please check if 'mandatory' " &
                                                 "attribute has been specified in the <SIU_CASE_DATA/field> tag" & ex.ToString()

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                        _blnIsValidMsg = False
                                        Exit For
                                    End Try
                                    Try
                                        _strXmlCompositeFieldNo = _xmlNodeList(intNodeCnt).Attributes("composite_field_no").Value
                                    Catch ex As Exception

                                        _strErrMsg = " Malformed XML, please check if 'composit_field_no' " &
                                                 "attribute has been specified in the <SIU_CASE_DATA/field> tag" & ex.ToString()

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                        _blnIsValidMsg = False
                                        Exit For
                                    End Try
                                    Try
                                        _strXmlName = _xmlNodeList(intNodeCnt).Attributes("name").Value
                                    Catch ex As Exception

                                        _strErrMsg = " Malformed XML, please check if 'name' " &
                                                 "attribute has been specified in the <SIU_CASE_DATA/field> tag" & ex.ToString()

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                        _blnIsValidMsg = False
                                        Exit For
                                    End Try

                                    If Not _xmlNodeList(intNodeCnt).Attributes("source") Is Nothing Then
                                        _strSourceValue = _xmlNodeList(intNodeCnt).Attributes("source").Value
                                    End If

                                    If String.IsNullOrEmpty(_strXmlName) Or String.IsNullOrEmpty(_strXmlSegment) _
                                        Or String.IsNullOrEmpty(_strXmlFieldNo) Or String.IsNullOrEmpty(_strXmlMandatory) Then
                                        _blnIsValidMsg = False

                                        _strErrMsg = " Malformed SIU rules file, " &
                                                                            "one of the attribute values is empty"
                                        If log.IsWarnEnabled Then log.Warn(methodBaseName & ":" & _strErrMsg)
                                        Exit For
                                    End If
                                    'Checking Segment from Message matches with segment node attribute
                                    If _strFieldArr(0).ToLower() = _strXmlSegment.ToLower() And String.IsNullOrEmpty(_strSourceValue) Then
                                        ' validate if value exists in the message at the field position
                                        If Not String.IsNullOrEmpty(_strXmlFieldNo) Then

                                            ' checks whether the segment is MSH, if so then we need to do (- 1) for the field position
                                            ' As per the HL7 message it is 7th position but as per the array after splitting with field seperator it is 6th position
                                            ' because HL7 considers (|) at the first position

                                            If _strXmlSegment.ToLower() = "msh" Then


                                                Try
                                                    Dim _intMSHFieldNo As Integer = IIf(IsNumeric(_strXmlFieldNo), (CType(_strXmlFieldNo, Integer) - 1), 0)

                                                    _strXmlFieldNo = _intMSHFieldNo.ToString()

                                                Catch ex As Exception
                                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & "Failed to reset the field position value for MSH segment with the exception :" & ex.Message.ToString() & ":")
                                                End Try
                                            End If

                                            _StatusCode = ValidateFieldPositionValue(_strFields, _strXmlFieldNo,
                                                                                        _strFieldSeparator, _blnFieldPositionValue, _strXmlName)

                                            If _StatusCode <> ATPAR_OK Then

                                                _strErrMsg = " Field position" & _strXmlFieldNo & ": specified is missing in the message "

                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                                _blnIsValidMsg = False
                                                Exit For
                                            End If
                                            If _blnFieldPositionValue = False Then
                                                _blnIsValidMsg = False
                                                _strErrMsg = " Field position :" & _strXmlFieldNo & ": specified is missing in the message "
                                                If log.IsWarnEnabled Then log.Warn(methodBaseName & ":" & _strErrMsg)
                                                Exit For
                                            End If
                                        End If
                                        'Check For Mandatory

                                        If Not String.IsNullOrEmpty(_strXmlMandatory) And _strXmlMandatory.ToLower() = "y" Then ' when mandatory is "Y"


                                            _StatusCode = ValidateFieldValue(_strFields, _strXmlFieldNo, _strFieldValue,
                                                                         _strFieldSeparator, _blnFieldValueExist, _strXmlName)

                                            If _StatusCode <> ATPAR_OK Then
                                                _strErrMsg = " Failed at function ValidateFieldValue "
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                                _blnIsValidMsg = False
                                                Exit For
                                            End If

                                            If Not _blnFieldValueExist Then

                                                _strWarning = String.Empty

                                                ParseWarnMessage(_strXmlName, _strFieldValue, _strPATIENT_MRC,
                                                            _strCASE_ID, _strPROCEDURE_ID, _strPREF_ID, _strXmlFieldNo)

                                                'If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Mandatory Field Name : " & _strXmlName & " And Field value at" & _
                                                '                                   " position :" & _strXmlFieldNo & _
                                                '                                   ": is not provided in the message  ")


                                                ProcessEmail(_strWarning, pSystemID, _strPATIENT_MRC, _strCASE_ID, _strPROCEDURE_ID, _strPREF_ID)

                                                _blnIsValidMsg = False
                                                Exit For
                                            End If


                                            ' check for the field value at the component position
                                            If Not String.IsNullOrEmpty(_strXmlCompositeFieldNo) Then

                                                _StatusCode = ValidateCompositeValues(_strFieldValue, _strComponentSeparator,
                                                                                        _strXmlCompositeFieldNo, _strFieldValue, _blnComponentValueExist, _strXmlName)


                                                If _StatusCode <> ATPAR_OK Then
                                                    _strErrMsg = " Failed at function ValidateCompositeValues "
                                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                                    _blnIsValidMsg = False
                                                    Exit For
                                                End If


                                                If Not _blnComponentValueExist Then

                                                    _strWarning = String.Empty

                                                    ParseWarnMessage(_strXmlName, _strFieldValue, _strPATIENT_MRC,
                                                                     _strCASE_ID, _strPROCEDURE_ID, _strPREF_ID, , _strXmlCompositeFieldNo)

                                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : " & _strWarning)
                                                    _strErrMsg = _strWarning
                                                    ProcessEmail(_strWarning, pSystemID, _strPATIENT_MRC, _strCASE_ID, _strPROCEDURE_ID, _strPREF_ID)

                                                    _blnIsValidMsg = False
                                                    Exit For
                                                End If
                                            End If


                                        Else ' when mandatory is "N"

                                            _StatusCode = ValidateFieldValue(_strFields, _strXmlFieldNo, _strFieldValue,
                                                                                _strFieldSeparator, _blnFieldValueExist, _strXmlName)

                                            If _StatusCode <> ATPAR_OK Then
                                                _strErrMsg = " Failed at function ValidateFieldValue "
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                                _blnIsValidMsg = False
                                                Exit For
                                            End If

                                            If Not String.IsNullOrEmpty(_strFieldValue) Then
                                                ' check for the field value at the component position
                                                If Not String.IsNullOrEmpty(_strXmlCompositeFieldNo) Then

                                                    _StatusCode = ValidateCompositeValues(_strFieldValue, _strComponentSeparator,
                                                                                        _strXmlCompositeFieldNo, _strFieldValue, _blnComponentValueExist, _strXmlName)

                                                    If _StatusCode <> ATPAR_OK Then
                                                        _strErrMsg = " Failed at function ValidateCompoSiteValues "
                                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                                        _blnIsValidMsg = False
                                                        Exit For
                                                    End If
                                                End If

                                            End If
                                        End If

                                        If _blnIsValidMsg Then
                                            'set values
                                            Try
                                                If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Value for Field Name :" & _strXmlName & ": " &
                                                                                "Field value is : " & _strFieldValue & ":")

                                                If Not String.IsNullOrEmpty(_strFieldValue) Then
                                                    _strFieldValue = Regex.Replace(_strFieldValue, "<|>|'|&", "")
                                                End If

                                                Select Case _strXmlName
                                                    Case SIU_FIELD_NAMES.ITEM_ID.ToString()
                                                        _strITEM_ID = _strFieldValue
                                                    Case SIU_FIELD_NAMES.ITEM_DESC.ToString()
                                                        _strITEM_DESC = _strFieldValue
                                                        If _strITEM_DESC.Length > 60 Then
                                                            _strITEM_DESC = _strITEM_DESC.Substring(0, 60)
                                                        End If
                                                    Case SIU_FIELD_NAMES.PICK_QUANTITY.ToString()
                                                        _strPICK_QTY = _strFieldValue
                                                    Case SIU_FIELD_NAMES.HOLD_QUANTITY.ToString()
                                                        _strHOLD_QTY = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PREF_LIST_ID.ToString()
                                                        _strPREF_LIST_ID = _strFieldValue
                                                    Case SIU_FIELD_NAMES.ITEM_INVENTORY.ToString()
                                                        _strITEM_INVENTORY = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PHYSICIAN_ID.ToString()
                                                        _strPHYSICIAN_ID = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PHYSICIAN_FN.ToString()
                                                        _strPHYSICIAN_FN = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PHYSICIAN_LN.ToString()
                                                        _strPHYSICIAN_LN = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PHYSICIAN_MN.ToString()
                                                        _strPHYSICIAN_MN = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PROCEDURE_ID.ToString()
                                                        _strPROCEDURE_ID = IIf(String.IsNullOrEmpty(_strFieldValue), "NOPROC", _strFieldValue)
                                                    Case SIU_FIELD_NAMES.PROCEDURE_DESC.ToString()
                                                        _strPROCEDURE_DESC = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PREF_LIST_DESC.ToString()
                                                        _strPREF_DESC = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PERFORM_DATETIME.ToString()
                                                        Try
                                                            If Not String.IsNullOrEmpty(_strFieldValue) And _strFieldValue.Length >= 10 Then

                                                                _strFormatMsgDateTime = _strFieldValue.Substring(0, 4) & "/" _
                                                                                        & _strFieldValue.Substring(4, 2) & "/" _
                                                                                        & _strFieldValue.Substring(6, 2) & " " _
                                                                                        & _strFieldValue.Substring(8, 2) & ":" _
                                                                                        & _strFieldValue.Substring(10, 2)
                                                                _strPERFORM_DATETIME = Format(Convert.ToDateTime(_strFormatMsgDateTime), "MM/dd/yyyy HH:mm:ss")
                                                            ElseIf Not String.IsNullOrEmpty(_strFieldValue) And _strFieldValue.Length = 8 Then
                                                                _strFormatMsgDateTime = _strFieldValue.Substring(0, 4) & "/" _
                                                                                      & _strFieldValue.Substring(4, 2) & "/" _
                                                                                      & _strFieldValue.Substring(6, 2)
                                                                _strPERFORM_DATETIME = Format(Convert.ToDateTime(_strFormatMsgDateTime), "MM/dd/yyyy")
                                                            Else
                                                                _strPERFORM_DATETIME = String.Empty
                                                            End If
                                                        Catch ex As Exception
                                                            _strErrMsg = " Failed to set the PERFORM_DATETIME value" &
                                                                                                " with the exception " & ex.ToString()

                                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                                            _blnIsValidMsg = False
                                                            Exit For
                                                        End Try
                                                    Case SIU_FIELD_NAMES.PATIENT_MRC.ToString()
                                                        _strPATIENT_MRC = _strFieldValue
                                                    Case SIU_FIELD_NAMES.CASE_ID.ToString()
                                                        _strCASE_ID = _strFieldValue
                                                    Case SIU_FIELD_NAMES.CASE_DESC.ToString()
                                                        _strCASE_DESC = _strFieldValue
                                                    Case SIU_FIELD_NAMES.ROOM_ID.ToString()
                                                        _strROOM_ID = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PREF_ID.ToString()
                                                        _strPREF_ID = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PROC_ID.ToString()
                                                        _strPROC_ID = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PERFORM_TIME.ToString()
                                                        If Not String.IsNullOrEmpty(_strFieldValue) Then
                                                            _strPERFORM_TIME = _strFieldValue.Substring(0, 2) & ":" & _strFieldValue.Substring(2, 2)
                                                        Else
                                                            _strPERFORM_TIME = String.Empty
                                                        End If
                                                    Case SIU_FIELD_NAMES.COST_CENTER_CODE.ToString()
                                                        _strCostCenter = _strFieldValue
                                                    Case SIU_FIELD_NAMES.DEPT_ID.ToString()
                                                        _strDeptId = _strFieldValue
                                                    Case SIU_FIELD_NAMES.SERVICE_CODE.ToString()
                                                        _strServiceCode = _strFieldValue
                                                    Case SIU_FIELD_NAMES.ENCOUNTER_ID.ToString()
                                                        _strEncounterID = _strFieldValue
                                                    Case SIU_FIELD_NAMES.PICK_LIST_ID.ToString()
                                                        _strPickListID = _strFieldValue
                                                End Select



                                            Catch ex As Exception
                                                _strErrMsg = " Failed to set the values with the exception " & ex.ToString()
                                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                                _blnIsValidMsg = False
                                                Exit For
                                            End Try
                                        End If
                                    ElseIf _strSourceValue = "ATPAR" Then
                                        Select Case _strXmlName
                                            Case SIU_FIELD_NAMES.PREF_ID.ToString()
                                                If String.IsNullOrEmpty(_strAtparPrefID) And _dtProcedure.Rows.Count > 0 _
                                                    And _dtPhysician.Rows.Count > 0 Then

                                                    _StatusCode = GetPrefID(_dtProcedure.Rows(0).Item("PROCEDURE_ID").ToString,
                                                                            _dtPhysician.Rows(0).Item("PHYSICIAN_ID").ToString,
                                                                            _strAtparPrefID, _strAtparPrefDescr, pSystemID)

                                                    If _StatusCode <> ATPAR_OK Then
                                                        _strErrMsg = " : Failed in function GetPrefID with statuscode : " & _StatusCode
                                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                                        _blnIsValidMsg = False
                                                        Exit For
                                                    End If
                                                    _strAtparPrefID = IIf(String.IsNullOrEmpty(_strAtparPrefID), "UNKNOWN", _strAtparPrefID)
                                                    _strAtparPrefDescr = IIf(String.IsNullOrEmpty(_strAtparPrefDescr), "UNKNOWN", _strAtparPrefDescr)
                                                    _strAtparProcID = _dtProcedure.Rows(0).Item("PROCEDURE_ID").ToString
                                                    _strPREF_LIST_ID = _strAtparPrefID
                                                    _strPREF_DESC = _strAtparPrefDescr
                                                End If
                                        End Select
                                    End If
                                Else
                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed SIU rules file, " &
                                                                          "one of the attribute values is empty")
                                    _blnIsValidMsg = False
                                    Exit For

                                End If
                            Next

                            If Not String.IsNullOrEmpty(_strPERFORM_TIME) And Not String.IsNullOrEmpty(_strFormatMsgDateTime) Then
                                _strPERFORM_DATETIME = Format(Convert.ToDateTime(_strFormatMsgDateTime & " " & _strPERFORM_TIME), "MM/dd/yyyy HH:mm:ss")
                            End If

                            If _blnIsValidMsg Then

                                If _strPREF_LIST_ID <> String.Empty Then
                                    _drPreference = _dtPreference.NewRow
                                    _drPreference.Item("SET_ID") = _strFieldArr(1)
                                    _drPreference.Item("PREF_LIST_ID") = _strPREF_LIST_ID
                                    _drPreference.Item("PREF_LIST_DESC") = _strPREF_DESC
                                    _dtPreference.Rows.Add(_drPreference)
                                End If

                                If _strPHYSICIAN_ID <> String.Empty Then
                                    _drPhysician = _dtPhysician.NewRow
                                    _drPhysician.Item("SET_ID") = _strFieldArr(1)
                                    _drPhysician.Item("PHYSICIAN_ID") = _strPHYSICIAN_ID
                                    _drPhysician.Item("PHYSICIAN_FN") = _strPHYSICIAN_FN
                                    _drPhysician.Item("PHYSICIAN_LN") = _strPHYSICIAN_LN
                                    _drPhysician.Item("PHYSICIAN_MN") = _strPHYSICIAN_MN
                                    _dtPhysician.Rows.Add(_drPhysician)
                                End If

                                If _strPROCEDURE_ID <> String.Empty Then
                                    _drProcedure = _dtProcedure.NewRow
                                    _drProcedure.Item("SET_ID") = _strFieldArr(1)
                                    _drProcedure.Item("PROCEDURE_ID") = _strPROCEDURE_ID
                                    _drProcedure.Item("PROCEDURE_DESC") = _strPROCEDURE_DESC
                                    _dtProcedure.Rows.Add(_drProcedure)
                                End If

                                If _strITEM_ID <> String.Empty Then
                                    _drItemDetails = _dtItemDetails.NewRow
                                    _drItemDetails.Item("SET_ID") = _strFieldArr(1)
                                    _drItemDetails.Item("ITEM_ID") = _strITEM_ID
                                    _drItemDetails.Item("ITEM_DESC") = _strITEM_DESC
                                    _drItemDetails.Item("PICK_QTY") = _strPICK_QTY
                                    _drItemDetails.Item("HOLD_QTY") = _strHOLD_QTY
                                    _drItemDetails.Item("ITEM_INVENTORY") = _strITEM_INVENTORY
                                    _drItemDetails.Item("PREF_ID") = IIf(String.IsNullOrEmpty(_strAtparPrefID), _strPREF_ID, _strAtparPrefID)
                                    _drItemDetails.Item("PROCEDURE_ID") = IIf(String.IsNullOrEmpty(_strAtparProcID), _strPROC_ID, _strAtparProcID)
                                    _dtItemDetails.Rows.Add(_drItemDetails)
                                End If

                                _strPREF_ID = String.Empty
                                _strPREF_DESC = String.Empty
                                _strPHYSICIAN_ID = String.Empty
                                _strPHYSICIAN_FN = String.Empty
                                _strPHYSICIAN_LN = String.Empty
                                _strPHYSICIAN_MN = String.Empty
                                _strPROCEDURE_ID = String.Empty
                                _strPROCEDURE_DESC = String.Empty
                                _strITEM_ID = String.Empty
                                _strITEM_DESC = String.Empty
                                _strPICK_QTY = String.Empty
                                _strHOLD_QTY = String.Empty
                                _strITEM_INVENTORY = String.Empty
                                _strPREF_LIST_ID = String.Empty
                                _strPROC_ID = String.Empty
                            End If
                        Next
                    Else
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " Trigger Event Not Exists in the Message")
                        _blnIsValidMsg = False
                    End If

                    If _blnIsValidMsg Then

                        If log.IsDebugEnabled Then
                            PrintDatasetStatistics(_dsSIU, _DeviceTokenEntry)
                        End If

                        Dim _strCaseInfoSystem As String = String.Empty
                        _strCaseInfoSystem = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.CASE_INFORMATION_SYSTEM.ToString)

                        If log.IsDebugEnabled Then log.Debug(methodBaseName & " : CaseInfoSystem is :" & _strCaseInfoSystem)

                        If _strCaseInfoSystem = CASE_INFO_SYSTEM.HSM.ToString Then

                            _StatusCode = ProcessHSMData(_strCASE_ID, _strPATIENT_MRC, _strROOM_ID,
                                                         _strPERFORM_DATETIME, _dtItemDetails, pSystemID)

                            If _StatusCode <> ATPAR_OK Then
                                _strErrMsg = " Failed in ProcessHSMData " & " with statuscode :" & _StatusCode
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                _blnIsValidMsg = False
                            End If
                        Else
                            Dim drPref As DataRow()
                            Dim drPhys As DataRow()
                            Dim drProc As DataRow()
                            Dim drItem As DataRow()
                            Dim _strSetID As String
                            Dim _strPrefID As String
                            Dim _strProcID As String

                            Dim _dvItemDetails As New DataView
                            _dvItemDetails = _dtItemDetails.DefaultView
                            Dim _dtItems As DataTable = _dvItemDetails.ToTable(True, "PREF_ID")
                            If _dtItems.Rows.Count > 0 Then
                                If Not String.IsNullOrEmpty(_dtItems.Rows(0).Item("PREF_ID")) Then
                                    If _dtPreference.Rows.Count > 0 Then
                                        For i As Integer = 0 To _dtPreference.Rows.Count - 1
                                            _strPrefID = String.Empty
                                            _strSetID = String.Empty
                                            _strProcID = String.Empty

                                            _strSetID = _dtPreference.Rows(i).Item("SET_ID").ToString
                                            _strPrefID = _dtPreference.Rows(i).Item("PREF_LIST_ID").ToString
                                            _strProcID = _dtProcedure.Rows(i).Item("PROCEDURE_ID").ToString

                                            drPref = _dtPreference.Select("SET_ID = '" & _strSetID & "'")
                                            If _strPrefID = "UNKNOWN" Or _strPrefID = _strAtparPrefID Then
                                                drPhys = _dtPhysician.Select("1=1")
                                            Else
                                                drPhys = _dtPhysician.Select("SET_ID = '" & _strSetID & "'")
                                            End If
                                            drProc = _dtProcedure.Select("SET_ID = '" & _strSetID & "'")
                                            drItem = _dtItemDetails.Select("PREF_ID = '" & _strPrefID & "' AND PROCEDURE_ID ='" & _strProcID & "'")

                                            _drSIUHeader = _dtSIUHeader.NewRow
                                            _drSIUHeader.Item("PATIENT_MRC") = _strPATIENT_MRC
                                            _drSIUHeader.Item("CASE_ID") = _strCASE_ID
                                            _drSIUHeader.Item("CASE_DESC") = _strCASE_DESC
                                            _drSIUHeader.Item("ROOM_ID") = _strROOM_ID

                                            If drProc.Length > 0 Then
                                                _drSIUHeader.Item("PROCEDURE_ID") = drProc(0).Item("PROCEDURE_ID")
                                                _drSIUHeader.Item("PROCEDURE_DESC") = drProc(0).Item("PROCEDURE_DESC")
                                            Else
                                                _drSIUHeader.Item("PROCEDURE_ID") = String.Empty
                                                _drSIUHeader.Item("PROCEDURE_DESC") = String.Empty
                                            End If
                                            If drPref.Length > 0 Then
                                                _drSIUHeader.Item("PREF_LIST_ID") = drPref(0).Item("PREF_LIST_ID")
                                                _drSIUHeader.Item("PREF_LIST_DESC") = drPref(0).Item("PREF_LIST_DESC")
                                            Else
                                                _drSIUHeader.Item("PREF_LIST_ID") = String.Empty
                                                _drSIUHeader.Item("PREF_LIST_DESC") = String.Empty
                                            End If
                                            If drPhys.Length > 0 Then
                                                _drSIUHeader.Item("PHYSICIAN_ID") = drPhys(0).Item("PHYSICIAN_ID")
                                                _drSIUHeader.Item("PHYSICIAN_FN") = drPhys(0).Item("PHYSICIAN_FN")
                                                _drSIUHeader.Item("PHYSICIAN_LN") = drPhys(0).Item("PHYSICIAN_LN")
                                                _drSIUHeader.Item("PHYSICIAN_MN") = drPhys(0).Item("PHYSICIAN_MN")
                                            Else
                                                _drSIUHeader.Item("PHYSICIAN_ID") = String.Empty
                                                _drSIUHeader.Item("PHYSICIAN_FN") = String.Empty
                                                _drSIUHeader.Item("PHYSICIAN_LN") = String.Empty
                                                _drSIUHeader.Item("PHYSICIAN_MN") = String.Empty
                                            End If
                                            _drSIUHeader.Item("PERFORM_DATETIME") = _strPERFORM_DATETIME


                                            If Not String.IsNullOrEmpty(_strDeptId) AndAlso String.IsNullOrEmpty(_strCostCenter) Then

                                                _drSIUHeader.Item("DEPT_ID") = _strDeptId

                                                'get Cost center id
                                                _StatusCode = GetDeptOrCostCenterCode(_strDeptId, CASE_FILTER.DEPT_ID.ToString, pSystemID, _strCostCenter)

                                                If _StatusCode <> ATPAR_OK Then

                                                    _strErrMsg = "Failed in GetDeptOrCostCenterCode with StatusCode :" & _StatusCode & vbCrLf
                                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : " & _strErrMsg)

                                                    _StatusCode = InsertHL7CaseMsg(pInputMsgString, _strCASE_ID, _strPREF_LIST_ID, _strPROCEDURE_ID, _intTransmissionStatus, pSystemID, _strErrMsg)

                                                    If _StatusCode <> ATPAR_OK Then
                                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed in While Inserting the Inbound information " &
                                                                                             " with statuscode :" & _StatusCode)
                                                    End If
                                                    Return E_SERVERERROR
                                                End If

                                                _drSIUHeader.Item("COST_CENTER_CODE") = _strCostCenter

                                                If String.IsNullOrEmpty(_strCostCenter) Then
                                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Cost center is not configured at Atpar for department : " & _strDeptId)
                                                End If

                                            ElseIf Not String.IsNullOrEmpty(_strCostCenter) AndAlso String.IsNullOrEmpty(_strDeptId) Then
                                                _drSIUHeader.Item("COST_CENTER_CODE") = _strCostCenter

                                                'get Dept id
                                                _StatusCode = GetDeptOrCostCenterCode(_strCostCenter, CASE_FILTER.COST_CENTER_CODE.ToString, pSystemID, _strDeptId)

                                                If _StatusCode <> ATPAR_OK Then

                                                    _strErrMsg = "Failed in GetDeptOrCostCenterCode with StatusCode :" & _StatusCode & vbCrLf

                                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : " & _strErrMsg)

                                                    _StatusCode = InsertHL7CaseMsg(pInputMsgString, _strCASE_ID, _strPREF_LIST_ID, _strPROCEDURE_ID, _intTransmissionStatus, pSystemID, _strErrMsg)

                                                    If _StatusCode <> ATPAR_OK Then
                                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed in While Inserting the Inbound information " &
                                                                                             " with statuscode :" & _StatusCode)
                                                    End If


                                                    Return E_SERVERERROR
                                                End If
                                                _drSIUHeader.Item("DEPT_ID") = _strDeptId

                                                If String.IsNullOrEmpty(_strDeptId) Then
                                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Department is not configured at Atpar for cost center : " & _strCostCenter)
                                                End If
                                            ElseIf Not String.IsNullOrEmpty(_strCostCenter) AndAlso Not String.IsNullOrEmpty(_strDeptId) Then

                                                _drSIUHeader.Item("COST_CENTER_CODE") = _strCostCenter
                                                _drSIUHeader.Item("DEPT_ID") = _strDeptId

                                            End If
                                            If Not String.IsNullOrEmpty(_strServiceCode) Then
                                                _drSIUHeader.Item("SERVICE_CODE") = _strServiceCode
                                            End If
                                            If Not String.IsNullOrEmpty(_strEncounterID) Then
                                                _drSIUHeader.Item("ENCOUNTER_ID") = CLng(_strEncounterID)
                                            End If
                                            If Not String.IsNullOrEmpty(_strPickListID) Then
                                                _drSIUHeader.Item("PICK_LIST_ID") = _strPickListID
                                            End If
                                            _dtSIUHeader.Rows.Add(_drSIUHeader)

                                            If drItem.Length > 0 Then
                                                For j As Integer = 0 To drItem.Length - 1
                                                    _drSIUDetails = _dtSIUDetails.NewRow
                                                    _drSIUDetails.Item("CASE_ID") = _strCASE_ID
                                                    _drSIUDetails.Item("ITEM_ID") = drItem(j).Item("ITEM_ID")
                                                    _drSIUDetails.Item("ITEM_DESC") = drItem(j).Item("ITEM_DESC")
                                                    _drSIUDetails.Item("ITEM_INVENTORY") = drItem(j).Item("ITEM_INVENTORY")
                                                    _drSIUDetails.Item("PICK_QTY") = drItem(j).Item("PICK_QTY")
                                                    _drSIUDetails.Item("HOLD_QTY") = drItem(j).Item("HOLD_QTY")
                                                    _drSIUDetails.Item("PREF_LIST_ID") = _strPrefID
                                                    _drSIUDetails.Item("PROCEDURE_ID") = _strProcID
                                                    _dtSIUDetails.Rows.Add(_drSIUDetails)
                                                Next
                                            End If
                                        Next
                                        _dsSIU.Tables.Add(_dtSIUHeader)
                                        _dsSIU.Tables.Add(_dtSIUDetails)
                                    End If
                                Else
                                    'WMC Customer HL7 Message Reading
                                    Dim _dsPrefListDetails As New DataSet
                                    Try
                                        CreateLocalDB(_DeviceTokenEntry(TokenEntry_Enum.SystemId))
                                    Catch ex As Exception

                                        _strErrMsg = "Failed to create LocalDB Object " & ex.ToString & ":"

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": " & _strErrMsg)

                                        _StatusCode = InsertHL7CaseMsg(pInputMsgString, _strCASE_ID, _strPREF_LIST_ID, _strPROCEDURE_ID, _intTransmissionStatus, pSystemID, _strErrMsg)

                                        If _StatusCode <> ATPAR_OK Then
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed in While Inserting the Inbound information " &
                                                                                 " with statuscode :" & _StatusCode)
                                        End If

                                        Return E_SERVERERROR
                                    End Try

                                    Dim _sbSQL As New StringBuilder

                                    _sbSQL.Append("SELECT AL.ITEM_ID,AL.PREF_LIST_ID,AL.QUANTITY, AL.HOLD_QTY , AL.PROCEDURE_ID, HDR.PREF_LIST_DESCR, AL.CUST_ITEM_NO ")
                                    _sbSQL.Append("FROM MT_POU_PREF_LIST_ALLOC AL , MT_POU_PREF_LIST_HEADER HDR ")
                                    _sbSQL.Append("WHERE AL.PREF_LIST_ID = HDR.PREF_LIST_ID ")
                                    _sbSQL.Append("AND AL.PROCEDURE_ID = HDR.PROCEDURE_ID ")
                                    _sbSQL.Append("AND HDR.PHYSICIAN_ID = '" & _dtPhysician.Rows(0).Item("PHYSICIAN_ID") & "'")
                                    _sbSQL.Append("AND HDR.PROCEDURE_ID = '" & _dtProcedure.Rows(0).Item("PROCEDURE_ID") & "'")
                                    _sbSQL.Append(" ORDER BY AL.QUANTITY DESC ")


                                    If log.IsInfoEnabled Then log.Info(methodBaseName & " Getting Pref list Details.. " &
                                                                 _sbSQL.ToString & vbCrLf)

                                    Try
                                        _dsPrefListDetails = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
                                    Catch sqlEx As SqlException

                                        _strErrMsg = "Failed to execute the SQL..." & _sbSQL.ToString & vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : " & _strErrMsg)

                                        _StatusCode = InsertHL7CaseMsg(pInputMsgString, _strCASE_ID, _strPREF_LIST_ID, _strPROCEDURE_ID, _intTransmissionStatus, pSystemID, _strErrMsg)

                                        If _StatusCode <> ATPAR_OK Then
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed in While Inserting the Inbound information " &
                                                                                 " with statuscode :" & _StatusCode)
                                        End If
                                        Return ATPAR_E_LOCALDBSELECTFAIL
                                    Catch ex As Exception

                                        _strErrMsg = " Failed to execute the SQL..." & _sbSQL.ToString & vbCrLf & " Exception is : " & ex.ToString & vbCrLf

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : " & _strErrMsg)
                                        _StatusCode = InsertHL7CaseMsg(pInputMsgString, _strCASE_ID, _strPREF_LIST_ID, _strPROCEDURE_ID, _intTransmissionStatus, pSystemID, _strErrMsg)

                                        If _StatusCode <> ATPAR_OK Then
                                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed in While Inserting the Inbound information " &
                                                                                 " with statuscode :" & _StatusCode)
                                        End If

                                        Return E_SERVERERROR
                                    Finally
                                        _sbSQL.Remove(0, _sbSQL.Length)
                                    End Try


                                    Dim _strPrefDesc As String = String.Empty
                                    For i As Integer = 0 To _dtItemDetails.Rows.Count - 1
                                        _strPrefID = "UNKNOWN"
                                        _strPrefDesc = "UNKNOWN"
                                        _drSIUDetails = _dtSIUDetails.NewRow
                                        _drSIUDetails.Item("CASE_ID") = _strCASE_ID
                                        _drSIUDetails.Item("ITEM_ID") = _dtItemDetails.Rows(i).Item("ITEM_ID")
                                        _drSIUDetails.Item("ITEM_DESC") = _dtItemDetails.Rows(i).Item("ITEM_DESC")
                                        _drSIUDetails.Item("ITEM_INVENTORY") = _dtItemDetails.Rows(i).Item("ITEM_INVENTORY")
                                        _drSIUDetails.Item("PROCEDURE_ID") = _dtProcedure.Rows(0).Item("PROCEDURE_ID")
                                        _drSIUDetails.Item("PICK_QTY") = _dtItemDetails.Rows(i).Item("PICK_QTY")
                                        _drSIUDetails.Item("HOLD_QTY") = 0
                                        _drSIUDetails.Item("PREF_LIST_ID") = _strPrefID
                                        Dim _drPref() As DataRow
                                        _drPref = _dsPrefListDetails.Tables(0).Select("(ITEM_ID='" & _dtItemDetails.Rows(i).Item("ITEM_ID") & "' OR CUST_ITEM_NO = '" & _dtItemDetails.Rows(i).Item("ITEM_ID") & "') AND PROCEDURE_ID='" & _dtProcedure.Rows(0).Item("PROCEDURE_ID") & "'")
                                        If (_drPref.Length > 0) Then
                                            _strPrefID = _drPref(0).Item("PREF_LIST_ID")
                                            _strPrefDesc = _drPref(0).Item("PREF_LIST_DESCR")
                                            _drSIUDetails.Item("PREF_LIST_ID") = _drPref(0).Item("PREF_LIST_ID")
                                            _drSIUDetails.Item("PICK_QTY") = _drPref(0).Item("QUANTITY")
                                            _drSIUDetails.Item("HOLD_QTY") = _drPref(0).Item("HOLD_QTY")
                                        End If
                                        _dtSIUDetails.Rows.Add(_drSIUDetails)

                                        'Case Header Table Building
                                        Dim _drHdr() As DataRow
                                        If (_dtSIUHeader.Rows.Count > 0) Then
                                            _drHdr = _dtSIUHeader.Select("PREF_LIST_ID='" & _strPrefID & "'")
                                        End If

                                        If i = 0 Then
                                            GoTo BuildCaseHeader
                                        End If
                                        If (_drHdr.Length = 0) Then
BuildCaseHeader:                            _drSIUHeader = _dtSIUHeader.NewRow
                                            _drSIUHeader.Item("PATIENT_MRC") = _strPATIENT_MRC
                                            _drSIUHeader.Item("CASE_ID") = _strCASE_ID
                                            _drSIUHeader.Item("CASE_DESC") = _strCASE_DESC
                                            _drSIUHeader.Item("ROOM_ID") = _strROOM_ID

                                            If _dtProcedure.Rows.Count > 0 Then
                                                _drSIUHeader.Item("PROCEDURE_ID") = _dtProcedure.Rows(0).Item("PROCEDURE_ID")
                                                _drSIUHeader.Item("PROCEDURE_DESC") = _strPROCEDURE_DESC
                                            Else
                                                _drSIUHeader.Item("PROCEDURE_ID") = String.Empty
                                                _drSIUHeader.Item("PROCEDURE_DESC") = String.Empty
                                            End If
                                            _drSIUHeader.Item("PREF_LIST_ID") = _strPrefID
                                            _drSIUHeader.Item("PREF_LIST_DESC") = _strPrefDesc

                                            If _dtPhysician.Rows.Count > 0 Then
                                                _drSIUHeader.Item("PHYSICIAN_ID") = _dtPhysician.Rows(0).Item("PHYSICIAN_ID")
                                                _drSIUHeader.Item("PHYSICIAN_FN") = _dtPhysician.Rows(0).Item("PHYSICIAN_FN")
                                                _drSIUHeader.Item("PHYSICIAN_LN") = _dtPhysician.Rows(0).Item("PHYSICIAN_LN")
                                                _drSIUHeader.Item("PHYSICIAN_MN") = _dtPhysician.Rows(0).Item("PHYSICIAN_MN")
                                            Else
                                                _drSIUHeader.Item("PHYSICIAN_ID") = String.Empty
                                                _drSIUHeader.Item("PHYSICIAN_FN") = String.Empty
                                                _drSIUHeader.Item("PHYSICIAN_LN") = String.Empty
                                                _drSIUHeader.Item("PHYSICIAN_MN") = String.Empty
                                            End If
                                            _drSIUHeader.Item("PERFORM_DATETIME") = _strPERFORM_DATETIME


                                            If Not String.IsNullOrEmpty(_strCostCenter) AndAlso String.IsNullOrEmpty(_strDeptId) Then
                                                _drSIUHeader.Item("COST_CENTER_CODE") = _strCostCenter

                                                'get Dept id
                                                _StatusCode = GetDeptOrCostCenterCode(_strCostCenter, CASE_FILTER.COST_CENTER_CODE.ToString, pSystemID, _strDeptId)

                                                If _StatusCode <> ATPAR_OK Then

                                                    _strErrMsg = " Failed in GetDeptOrCostCenterCode with StatusCode :" & _StatusCode & vbCrLf

                                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : " & _strErrMsg)
                                                    _StatusCode = InsertHL7CaseMsg(pInputMsgString, _strCASE_ID, _strPREF_LIST_ID, _strPROCEDURE_ID, _intTransmissionStatus, pSystemID, _strErrMsg)

                                                    If _StatusCode <> ATPAR_OK Then
                                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed in While Inserting the Inbound information " &
                                                                                             " with statuscode :" & _StatusCode)
                                                    End If

                                                    Return E_SERVERERROR
                                                End If
                                                _drSIUHeader.Item("DEPT_ID") = _strDeptId

                                                If String.IsNullOrEmpty(_strDeptId) Then
                                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Department is not configured at Atpar for cost center : " & _strCostCenter)
                                                End If


                                            ElseIf Not String.IsNullOrEmpty(_strDeptId) AndAlso String.IsNullOrEmpty(_strCostCenter) Then

                                                _drSIUHeader.Item("DEPT_ID") = _strDeptId

                                                'get Cost center id
                                                _StatusCode = GetDeptOrCostCenterCode(_strDeptId, CASE_FILTER.DEPT_ID.ToString, pSystemID, _strCostCenter)

                                                If _StatusCode <> ATPAR_OK Then

                                                    _strErrMsg = " Failed in GetDeptOrCostCenterCode with StatusCode :" & _StatusCode & vbCrLf
                                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : " & _strErrMsg)

                                                    _StatusCode = InsertHL7CaseMsg(pInputMsgString, _strCASE_ID, _strPREF_LIST_ID, _strPROCEDURE_ID, _intTransmissionStatus, pSystemID, _strErrMsg)

                                                    If _StatusCode <> ATPAR_OK Then
                                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed in While Inserting the Inbound information " &
                                                                                             " with statuscode :" & _StatusCode)
                                                    End If

                                                    Return E_SERVERERROR
                                                End If

                                                _drSIUHeader.Item("COST_CENTER_CODE") = _strCostCenter

                                                If String.IsNullOrEmpty(_strCostCenter) Then
                                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Cost center is not configured at Atpar for department : " & _strDeptId)
                                                End If
                                            ElseIf Not String.IsNullOrEmpty(_strCostCenter) AndAlso Not String.IsNullOrEmpty(_strDeptId) Then
                                                _drSIUHeader.Item("COST_CENTER_CODE") = _strCostCenter
                                                _drSIUHeader.Item("DEPT_ID") = _strDeptId
                                            End If
                                            If Not String.IsNullOrEmpty(_strServiceCode) Then
                                                _drSIUHeader.Item("SERVICE_CODE") = _strServiceCode
                                            End If
                                            If Not String.IsNullOrEmpty(_strEncounterID) Then
                                                _drSIUHeader.Item("ENCOUNTER_ID") = CLng(_strEncounterID)
                                            End If
                                            If Not String.IsNullOrEmpty(_strPickListID) Then
                                                _drSIUHeader.Item("PICK_LIST_ID") = _strPickListID
                                            End If
                                            _dtSIUHeader.Rows.Add(_drSIUHeader)
                                        End If
                                    Next
                                    _dsSIU.Tables.Add(_dtSIUHeader)
                                    _dsSIU.Tables.Add(_dtSIUDetails)
                                End If
                            End If

                            If _dsSIU.Tables.Count > 1 Then

                                If log.IsDebugEnabled Then log.Debug(methodBaseName & " Trigger Event : " & _strTriggerEvent)

                                Try
                                    _erpObjName = "POU_BusinessRules"

                                    CreateERPObject(_erpObjName, _erpObjAssy)

                                    _className = _erpObjName & ".POU_DevTrans"
                                    _classType = _erpObjAssy.GetType(_className)
                                    _methodName = _classType.GetMethod("Add_Edit_SIUCaseData")
                                    _reflectObject = Activator.CreateInstance(_classType)
                                    Dim args As Object() = {_dsSIU, _DeviceTokenEntry, _strTriggerEvent}

                                    _StatusCode = _methodName.Invoke(_reflectObject, args)

                                    If _StatusCode <> ATPAR_OK Then
                                        _strErrMsg = " Failed to invoke POU_BusinessRules with " &
                                                                                " StatusCode :" & _StatusCode & vbCrLf

                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                        _blnIsValidMsg = False
                                    End If

                                    log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.Init.ToString()
                                    log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = Nothing

                                Catch ex As Exception
                                    _strErrMsg = "Failed with EX: " & ex.Message.ToString & vbCrLf
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                    _blnIsValidMsg = False

                                Finally
                                    _className = Nothing
                                    _classType = Nothing
                                    _methodName = Nothing
                                    _reflectObject = Nothing
                                    _erpObjAssy = Nothing
                                    _erpObjName = Nothing
                                End Try

                                If _StatusCode <> ATPAR_OK Then
                                    _strErrMsg = " Failed to Add/Update Case Data into database with Status as :" & _StatusCode & ":"
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":" & _strErrMsg)
                                    _blnIsValidMsg = False
                                End If
                            Else
                                If log.IsWarnEnabled Then log.Warn(methodBaseName & "No Headers/Details Data")
                                _blnIsValidMsg = False
                            End If
                        End If

                    End If

                End If

                If _strErrMsg <> String.Empty Or _strErrMsg <> "" Then
                    _intTransmissionStatus = HL7_MESSAGE_SENT_STATUS.FAILED
                End If
                _StatusCode = InsertHL7CaseMsg(pInputMsgString, _strCASE_ID, _strPREF_LIST_ID, _strPROCEDURE_ID, _intTransmissionStatus, pSystemID, _strErrMsg)

                If _StatusCode <> ATPAR_OK Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed in While Inserting the Inbound information " &
                                                         " with statuscode :" & _StatusCode)
                End If

                Dim _strUpdateHLSTrans As New StringBuilder
                Dim _strErrrAutoPickErrMsg As String = String.Empty
                If _dsSIU.Tables.Contains("AUTOCASEPICK") AndAlso _dsSIU.Tables("AUTOCASEPICK").Rows.Count > 0 Then
                    For Each _drAutoCasePick As DataRow In _dsSIU.Tables("AUTOCASEPICK").Rows

                        With _strUpdateHLSTrans
                            _strErrrAutoPickErrMsg = _drAutoCasePick.Item("STATUS_CODE") & " : " & _drAutoCasePick.Item("ERROR_MESSAGE")
                            .Append("UPDATE MT_ATPAR_HL7_MSGS_TRANSMISSION SET ")
                            .Append("TRANSMISSION_STATUS = 2, HL7_ERROR_MESSAGE= '" & _strErrrAutoPickErrMsg & "' ")
                            .Append("WHERE KEY_2 ='" & _strCASE_ID & "' AND KEY_4= '" & _strPREF_LIST_ID & "' AND KEY_5='" & _strPROCEDURE_ID & "' ")
                            .Append("AND APP_ID = 15 AND HL7_MSG_TYPE = 5 ")
                            .Append("AND TRANSMISSION_STATUS = 0")

                        End With
                        If log.IsInfoEnabled Then log.Info("Update query: " & _strUpdateHLSTrans.ToString)
                        If _strUpdateHLSTrans.Length > 0 Then
                            If log.IsInfoEnabled Then log.Info(methodBaseName & " : Updating MT_ATPAR_HL7_MSGS_TRANSMISSION " &
                                                               "with following SQL... " & _strUpdateHLSTrans.ToString & vbCrLf)

                            Try
                                m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_strUpdateHLSTrans.ToString))
                            Catch sqlEx As SqlException
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                                                & _strUpdateHLSTrans.ToString & vbCrLf & " Exception is : " &
                                                                sqlEx.ToString & vbCrLf)

                                Return ATPAR_E_LOCALDBUPDATEFAIL
                            Catch ex As Exception
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                           & _strUpdateHLSTrans.ToString & vbCrLf & " Exception is : " &
                                                           ex.ToString & vbCrLf)

                                Return E_SERVERERROR
                            Finally
                                _strUpdateHLSTrans.Remove(0, _strUpdateHLSTrans.Length)
                            End Try
                        End If

                    Next
                End If
            Else
                If log.IsWarnEnabled Then log.Warn(methodBaseName & "Invalid message type")
                _blnIsValidMsg = False
                _strErrorMssg = _strHL7_PRG_EXCEPTION_MSG
            End If

            If Not String.IsNullOrEmpty(_strErrorMssg) Then
                If _strErrorMssg.Length > _intMaxLength Then
                    _strErrorMssg = _strErrorMssg.Substring(0, _intMaxLength)
                End If
            End If

            _strMSA = BuildMessageACk(_blnIsValidMsg, _strMsgCtrlID, _strErrorMssg)

            If _blnIsValidMsg Then
                If log.IsDebugEnabled Then log.Debug(methodBaseName & "Sending Acknowledment with AA code ")
            Else
                If log.IsDebugEnabled Then log.Debug(methodBaseName & "Sending Acknowledment with AE code ")
            End If

            pStrMsgAck = Chr(11) & _strMSH & Chr(13) & _strMSA & Chr(28) & Chr(13)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Status is :" & _StatusCode & ": Failed in Validate Input Message with" &
                                                " exception " & ex.ToString())
            Return E_SERVERERROR
        End Try
        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' Validates the xml file 
    ''' </summary>
    ''' <param name="pXmlNodeList"></param>
    ''' <param name="pADTFileExist"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function LoadADTRulesFile(ByRef pXmlNodeList As System.Xml.XmlNodeList) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strXmlFilePath As String = String.Empty
        Dim _xmlDoc As New System.Xml.XmlDocument

        Try
            _strXmlFilePath = AppDomain.CurrentDomain.BaseDirectory & "ADT_Inbound_Rules.xml"

            ' checks whether the family rules xml file exists
            If Not System.IO.File.Exists(_strXmlFilePath) Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " ADT Rules file does not exist at file path :" & _strXmlFilePath & ":")
                Return E_SERVERERROR

            Else
                Try
                    _xmlDoc.Load(_strXmlFilePath)
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Load ADT Rules file " & _strXmlFilePath)
                    Return E_SERVERERROR
                End Try

            End If
            ' gets the nodes list
            Try
                pXmlNodeList = _xmlDoc.SelectNodes("//ADT_PATIENT_DATA/field")
                If Not pXmlNodeList.Count > 0 Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed XML <ADT_PATIENT_DATA/field> node does not exist in" &
                                                        " the Rules file")

                    Return E_SERVERERROR
                End If


            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'ADT_PATIENT_DATA' " &
                                                        "node has been specified in the <root> tag" &
                                                        vbCrLf & ex.ToString)
                Return E_SERVERERROR
            End Try

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to load the Family Rules XML with the exception : " & ex.ToString())
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK
    End Function
    ''' <summary>
    ''' Validates the xml file 
    ''' </summary>
    ''' <param name="pXmlNodeList"></param>
    ''' <param name="pSIUFileExist"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function LoadSIURulesFile(ByRef pXmlNodeList As System.Xml.XmlNodeList) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strXmlFilePath As String = String.Empty
        Dim _xmlDoc As New System.Xml.XmlDocument

        Try
            _strXmlFilePath = AppDomain.CurrentDomain.BaseDirectory & "SIU_Inbound_Rules.xml"

            ' checks whether the family rules xml file exists
            If Not System.IO.File.Exists(_strXmlFilePath) Then
                If log.IsDebugEnabled Then log.Debug(methodBaseName & " SIU Rules file does not exist at file path :" & _strXmlFilePath & ":")
                Return E_SERVERERROR

            Else
                Try
                    _xmlDoc.Load(_strXmlFilePath)
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to Load SIU Rules file " & _strXmlFilePath)
                    Return E_SERVERERROR
                End Try

            End If
            ' gets the nodes list
            Try
                pXmlNodeList = _xmlDoc.SelectNodes("//SIU_CASE_DATA/field")
                If Not pXmlNodeList.Count > 0 Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " Malformed XML <SIU_CASE_DATA/field> node does not exist in" &
                                                        " the Rules file")

                    Return E_SERVERERROR
                End If

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Malformed XML, please check if 'SIU_CASE_DATA' " &
                                                        "node has been specified in the <root> tag" &
                                                        vbCrLf & ex.ToString)
                Return E_SERVERERROR
            End Try

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to load the Family Rules XML with the exception : " & ex.ToString())
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' validates whether the segment from xml is existing in the message
    ''' </summary>
    ''' <param name="pSegmentArr"></param>
    ''' <param name="pXmlSegmentVal"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function CheckSegmentExistInMsg(ByVal pSegmentArr() As String, ByVal pXmlSegmentVal As String, ByVal pXmlEventsVal As String) As Boolean
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _blnFlg As Boolean = False

        Try
            If pXmlEventsVal = "All" Then
                If pSegmentArr.Length > 0 Then

                    For i As Integer = 0 To pSegmentArr.Length - 1
                        If pSegmentArr(i).ToString.Contains(pXmlSegmentVal) Then
                            _blnFlg = True
                            Exit For
                        End If
                    Next
                    If _blnFlg Then
                        Return True
                    Else
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " Invalid message Segment :" & pXmlSegmentVal &
                                                            ": does not exist in the message")
                        Return False
                    End If
                End If
            Else
                Return True
            End If
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to check segment :" & pXmlSegmentVal &
                                                ": with the exception :" & ex.ToString())
            Return False
        End Try
    End Function

    ''' <summary>
    ''' validates if field position exist in the message
    ''' </summary>
    ''' <param name="pSegment"></param>
    ''' <param name="pXmlFieldNo"></param>
    ''' <param name="pFieldPositionValue"></param>
    ''' <param name="pFieldSeparator"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function ValidateFieldPositionValue(ByVal pSegment As String, ByVal pXmlFieldNo As String,
                                                ByVal pFieldSeparator As String, ByRef pFieldPositionValue As Boolean, ByVal pFieldName As String, Optional ByRef pErrormessage As String = "") As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim intFieldPos As Integer
        Dim _strFieldsArr() As String

        Try
            intFieldPos = IIf(IsNumeric(pXmlFieldNo), (CType(pXmlFieldNo, Integer)), 0)

            ' validating the message to check whether field value exists in the position mentioned in the xml
            _strFieldsArr = pSegment.Split(pFieldSeparator)

            If Not _strFieldsArr.Length >= (intFieldPos) Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " Invalid field position :" & (intFieldPos - 1).ToString() &
                                                    ": field position of field name" & pFieldName & " does not exist in the message")
                pFieldPositionValue = False
                pErrormessage = (intFieldPos).ToString() & " missing in the segment"
            End If

            pFieldPositionValue = True

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to check the field " & pFieldName & "  at the position :" & (intFieldPos - 1).ToString() &
                                                    ": with the exception : " & ex.ToString())
            pFieldPositionValue = False
            Return E_SERVERERROR
        End Try

        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' Validates for the field value at the corresponding position in the message with repsect to the position mentioned in the XML file
    ''' </summary>
    ''' <param name="pSegment"></param>
    ''' <param name="pFieldPos"></param>
    ''' <param name="pFieldSeparator"></param>
    ''' <param name="pFieldValue"></param>
    ''' <param name="pFieldValueExist"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function ValidateFieldValue(ByVal pSegment As String, ByVal pFieldPos As Integer,
                                            ByRef pFieldValue As String, ByVal pFieldSeparator As String,
                                            ByRef pFieldValueExist As Boolean, ByVal pFieldName As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strFieldArr() As String
        Dim _intFieldPos As Integer = pFieldPos
        _strFieldPos = String.Empty
        _strFieldPos = _intFieldPos.ToString()
        Try
            _strFieldArr = pSegment.Split(pFieldSeparator)

            If _strFieldArr.Length > 0 Then

                If _strFieldArr.Length > _intFieldPos Then

                    If String.IsNullOrEmpty(_strFieldArr(_intFieldPos).ToString()) Then
                        _strErrMsg = " Mandatory Field Name : " & pFieldName & " Field value at the position :" & _intFieldPos.ToString() &
                                                       ": does not exist in the message"

                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " " & _strErrMsg)
                        pFieldValue = String.Empty
                        pFieldValueExist = False
                    Else
                        pFieldValueExist = True
                        pFieldValue = _strFieldArr(_intFieldPos).ToString()
                        If log.IsDebugEnabled Then log.Debug(methodBaseName & " " & pFieldName & " Field value at the position :" & _intFieldPos.ToString() &
                                                            ": is :" & pFieldValue & ":")
                    End If
                End If
            Else
                _strErrMsg = " Segment :" & _strFieldArr(0).ToString() &
                                                    ": does not contain any field values"
                If log.IsWarnEnabled Then log.Warn(methodBaseName & _strErrMsg)
                pFieldValue = String.Empty
                pFieldValueExist = False
            End If

        Catch ex As Exception
            _strErrMsg = " Failed to validate field with the exception : " & ex.ToString()
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to validate field with the exception : " & ex.ToString())
            pFieldValueExist = False
            Return E_SERVERERROR
        End Try
        Return ATPAR_OK
    End Function

    ''' <summary>
    ''' Validates for the composite field value corresponding to the component field value in the XML
    ''' </summary>
    ''' <param name="pFieldVal"></param>
    ''' <param name="pCompositeFieldValue"></param>
    ''' <param name="pComponentSeparator"></param>
    ''' <param name="pXmlcompositeFieldNoValue"></param>
    ''' <param name="pCompositeValueExist"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function ValidateCompositeValues(ByVal pFieldVal As String, ByVal pComponentSeparator As String,
                                                ByVal pXmlCompositeFieldNoValue As String, ByRef pCompositeFieldValue As String,
                                                      ByRef pCompositeValueExist As Boolean, ByVal pFieldName As String) As Long
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strCompositeFieldArr() As String
        Dim _intCompositeFieldPos As Integer
        Try
            _intCompositeFieldPos = IIf(IsNumeric(pXmlCompositeFieldNoValue), (CType(pXmlCompositeFieldNoValue, Integer)), 0)
            _strCompositeFieldArr = pFieldVal.Split(pComponentSeparator)

            If _strCompositeFieldArr.Length >= _intCompositeFieldPos Then

                If String.IsNullOrEmpty(_strCompositeFieldArr(_intCompositeFieldPos - 1)) Then

                    pCompositeFieldValue = String.Empty

                    pCompositeValueExist = False
                Else
                    pCompositeValueExist = True
                    pCompositeFieldValue = _strCompositeFieldArr(_intCompositeFieldPos - 1)

                End If
            Else
                _strErrMsg = " Composite field value of field name " & pFieldName & " doesnot exists at the composite position :" &
                                                    _intCompositeFieldPos & ": in the message"
                If log.IsWarnEnabled Then log.Warn(methodBaseName & _strErrMsg)
                pCompositeValueExist = False
            End If


        Catch ex As Exception
            _strErrMsg = "  Failed to validate composite field value of field name " & pFieldName & ". with the exception : " &
                                                ex.ToString()
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & _strErrMsg)
            'pCompositeValueExist = False
            Return E_SERVERERROR
        End Try
        Return ATPAR_OK
    End Function

    Public Sub New()
        Try
            log4net.ThreadContext.Properties(LOGPROPERTIES.PRODUCTNAME.ToString) = EnumApps.PointOfUse.ToString()
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(ex.ToString)
            Return
        End Try
    End Sub

#Region "Message Ack"

    ''' <summary>
    ''' Build Message Ack Hdr
    ''' </summary>
    ''' <param name="inputArr"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function BuildMessageAckHdr(ByVal pInputArr() As String) As String

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Try

            Dim _strMSH As String
            Dim _intCnt As Integer

            'Build Message Header(MSH)
            _strMSH = "MSH|"
            For _intCnt = 2 To pInputArr.Length - 1
                'If Last field no field separator is required
                If _intCnt = pInputArr.Length - 1 Then
                    If pInputArr(_intCnt) = "" Or pInputArr(_intCnt) Is Nothing Then
                        _strMSH = _strMSH & pInputArr(_intCnt)
                        Dim intMSH As Integer
                        _strMSH = _strMSH.Substring(0, _strMSH.LastIndexOf("|"))
                    Else
                        _strMSH = _strMSH & pInputArr(_intCnt)
                    End If
                Else
                    If _intCnt = MSH.MESSAGE_TYPE Then
                        _strMSH = _strMSH & "ACK|"
                    Else
                        _strMSH = _strMSH & pInputArr(_intCnt) & "|"
                    End If
                End If
            Next
            Return _strMSH

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed in Build Message Ack Hdr" & vbCrLf & ex.ToString)
        End Try
    End Function

    ''' <summary>
    ''' Build Message Ack
    ''' </summary>
    ''' <param name="isValidMessage"></param>
    ''' <param name="messageControlID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>    
    Private Function BuildMessageACk(ByVal _blnIsValidMessage As Boolean, ByVal _strMsgCtrlID As String, ByVal _strErrorMssg As String) As String
        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)
        Try

            Dim _strMSA As String
            If _blnIsValidMessage Then
                _strMSA = "MSA|" & enum_ACK_CODES(ACK_CODES.AA) & "|" & _strMsgCtrlID
            Else
                If _strErrorMssg <> "" Or _strErrorMssg <> String.Empty Then
                    _strMSA = "MSA|" & enum_ACK_CODES(ACK_CODES.AE) & "|" & _strMsgCtrlID & "|" & _strErrorMssg
                Else
                    _strMSA = "MSA|" & enum_ACK_CODES(ACK_CODES.AE) & "|" & _strMsgCtrlID
                End If
            End If
            Return _strMSA
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed in Build Message Ack" & vbCrLf & ex.ToString)
            Return E_SERVERERROR
        End Try
    End Function
#End Region

    Private Function PrintDS(ByVal ds As DataSet)
        Dim it, ic, ir As Integer
        For it = 0 To ds.Tables.Count - 1
            For ir = 0 To ds.Tables(it).Rows.Count - 1
                For ic = 0 To ds.Tables(it).Columns.Count - 1
                    'If isDebugLogEnabled Then log.Debug(ds.Tables(it).Rows(ir).Item(ic) & " ")
                Next
            Next
        Next
    End Function

#Region "Process HSM Data"

    ''' <summary>
    ''' ProcessHSMData
    ''' </summary>
    ''' <param name="pCaseId"></param>
    ''' <param name="pDsHLMsgItemData"></param>
    ''' <param name="pDsHLMsgCaseHdr"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function ProcessHSMData(ByVal pCaseId As String, ByVal pPatientMrc As String,
                                    ByVal pRoomNo As String, ByVal pCasePerformDate As String,
                                    ByVal pDtHLMsgItemData As DataTable, ByVal pSystemID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _className As String = String.Empty
        Dim _classType As Type
        Dim _methodName As MethodInfo
        Dim _reflectObject As Object
        Dim _erpObjAssy As Assembly
        Dim _erpObjName As String = String.Empty

        Dim _dsHsmMasterData As New DataSet
        Dim _sqlConnect As SqlConnection
        Dim _sqlTrans As SqlTransaction

        Dim _statusCode As Long = -1

        Try

            _erpObjName = "AtPar_" & GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.CASE_INFORMATION_SYSTEM.ToString)

            CreateERPObject(_erpObjName, _erpObjAssy)

            _className = _erpObjName & ".GetCaseData"
            _classType = _erpObjAssy.GetType(_className)
            _methodName = _classType.GetMethod("GetCaseData")
            _reflectObject = Activator.CreateInstance(_classType)
            Dim args As Object() = {pCaseId, pSystemID, _dsHsmMasterData}

            _statusCode = _methodName.Invoke(_reflectObject, args)

            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with " &
                                                     " StatusCode :" & _statusCode & vbCrLf)
                Return E_SERVERERROR
            End If

            _dsHsmMasterData = args(2)

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to create object for AtPar_HSM : " &
                                                "exception is : " & ex.ToString())
            Return E_SERVERERROR
        End Try

        Try

            If _dsHsmMasterData.Tables.Count > 0 Then

                Dim _drSearch() As DataRow

                If _dsHsmMasterData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows.Count = 0 Then
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : No Case info found for the CaseID : " & pCaseId)
                    Return E_SERVERERROR
                ElseIf _dsHsmMasterData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows.Count > 1 Then
                    _drSearch = _dsHsmMasterData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Select("IS_PRIMARY = 1")

                    If _drSearch.Length = 0 Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Primary Preference List was not configured " &
                                            "for the Case ID : " & pCaseId & ". Skippinmg the entire HL7 message.")

                        Return E_SERVERERROR
                    End If
                End If

                'Replacing case id with appointment id
                If _dsHsmMasterData.Tables(CASE_INFO_TABLES.DEPT_DETAILS).Rows.Count > 0 Then

                    Dim _intApptId As Integer = 0
                    Dim _strDeptId As String = String.Empty

                    _intApptId = IIf(IsDBNull(_dsHsmMasterData.Tables(CASE_INFO_TABLES.DEPT_DETAILS).Rows(0).Item("APPOINTMENT_ID")),
                                  0, _dsHsmMasterData.Tables(CASE_INFO_TABLES.DEPT_DETAILS).Rows(0).Item("APPOINTMENT_ID"))

                    _strDeptId = IIf(IsDBNull(_dsHsmMasterData.Tables(CASE_INFO_TABLES.DEPT_DETAILS).Rows(0).Item("DEPT_ID")),
                                  String.Empty, _dsHsmMasterData.Tables(CASE_INFO_TABLES.DEPT_DETAILS).Rows(0).Item("DEPT_ID"))

                    If _intApptId = 0 Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Appointment id was not configured " &
                                           "for the Case ID : " & pCaseId & ". Skippinmg the entire HL7 message.")
                        Return E_SERVERERROR

                    ElseIf String.IsNullOrEmpty(_strDeptId) Then
                        If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Department id was not configured " &
                                           "for the Case ID : " & pCaseId & ". Skippinmg the entire HL7 message.")
                        Return E_SERVERERROR

                    End If

                    pCaseId = _intApptId

                Else
                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Department id, Appointment id was not configured " &
                                            "for the Case ID : " & pCaseId & ". Skippinmg the entire HL7 message.")
                    Return E_SERVERERROR
                End If
            Else
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " : No Case info found for the CaseID : " & pCaseId)
                Return E_SERVERERROR
            End If

            Try
                CreateLocalDB(pSystemID)
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to create LocalDB Object " & ex.ToString & ":")
                Return E_SERVERERROR
            End Try

            Try
                _sqlConnect = m_LocalDB.CreateConnection()
                _sqlConnect.Open()
                _sqlTrans = _sqlConnect.BeginTransaction

            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to establish SQL connection : " &
                                                    "Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            End Try

            '// Process Specialty Info  //'
            _statusCode = ProcessSpecialtyInfo(_dsHsmMasterData, _sqlTrans)

            If _statusCode <> ATPAR_OK Then
                _sqlTrans.Rollback()
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in ProcessSpecialtyInfo with " &
                                                     " StatusCode :" & _statusCode & vbCrLf)
                Return E_SERVERERROR
            End If


            '// Process Physician Info  //'
            _statusCode = ProcessPhysicianInfo(_dsHsmMasterData, _sqlTrans)

            If _statusCode <> ATPAR_OK Then
                _sqlTrans.Rollback()
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in ProcessPhysicianInfo with " &
                                                     " StatusCode :" & _statusCode & vbCrLf)
                Return E_SERVERERROR
            End If

            '// Process Procedure Info  //'
            _statusCode = ProcessProcedureInfo(_dsHsmMasterData, _sqlTrans)

            If _statusCode <> ATPAR_OK Then
                _sqlTrans.Rollback()
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in ProcessProcedureInfo with " &
                                                     " StatusCode :" & _statusCode & vbCrLf)
                Return E_SERVERERROR
            End If


            '// Process PrefList Info  //'
            _statusCode = ProcessPrefListInfo(pCaseId, _dsHsmMasterData, _sqlTrans)

            If _statusCode <> ATPAR_OK Then
                _sqlTrans.Rollback()
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in ProcessPrefListInfo with " &
                                                     " StatusCode :" & _statusCode & vbCrLf)
                Return E_SERVERERROR
            End If


            '// Process CaseInfo  //'
            _statusCode = ProcessCaseInfo(pCaseId, pPatientMrc, pRoomNo,
                                          pCasePerformDate, _dsHsmMasterData, pDtHLMsgItemData,
                                          pSystemID, _sqlTrans)

            If _statusCode <> ATPAR_OK Then
                _sqlTrans.Rollback()
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in ProcessCaseInfo with " &
                                                     " StatusCode :" & _statusCode & vbCrLf)
                Return E_SERVERERROR
            End If

            _sqlTrans.Commit()

            Return ATPAR_OK


        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                                 ex.ToString())
            Return E_SERVERERROR
        Finally
            If Not _sqlConnect Is Nothing Then
                If _sqlConnect.State <> ConnectionState.Closed Then
                    _sqlConnect.Close()
                End If
                _sqlConnect = Nothing
            End If
            _dsHsmMasterData = Nothing
        End Try

    End Function

    ''' <summary>
    ''' ProcessSpecialtyInfo
    ''' </summary>
    ''' <param name="pDsHsmData"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function ProcessSpecialtyInfo(ByVal pDsHsmData As DataSet, ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _drSearch() As DataRow

        Try

            If pDsHsmData.Tables(CASE_INFO_TABLES.SPECIALITY_DETAILS).Rows.Count = 0 Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Specialty Codes are not found.")
                Return ATPAR_OK
            End If

            Dim _dvSplInfo As New DataView
            _dvSplInfo = pDsHsmData.Tables(CASE_INFO_TABLES.SPECIALITY_DETAILS).DefaultView
            Dim _dtSplInfo As DataTable = _dvSplInfo.ToTable(True, "SPECIALTY_CODE")

            If _dtSplInfo.Rows.Count > 0 Then
                For intCnt As Integer = 0 To _dtSplInfo.Rows.Count - 1

                    _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.SPECIALITY_DETAILS).Select("SPECIALTY_CODE = '" & _dtSplInfo.Rows(intCnt).Item("SPECIALTY_CODE").ToString & "'")

                    If _drSearch.Length > 0 Then
                        Dim _Cmd As New SqlCommand
                        _Cmd.Connection = m_LocalDB.CreateConnection
                        _Cmd.CommandType = CommandType.StoredProcedure
                        _Cmd.CommandText = "ProcessSpecialtyInfo"

                        Dim _sqlParam As SqlParameter

                        _sqlParam = New SqlParameter("@SpecialtyCode", SqlDbType.NVarChar, 20)
                        _sqlParam.Value = _drSearch(0).Item("SPECIALTY_CODE").ToString
                        _Cmd.Parameters.Add(_sqlParam)

                        _sqlParam = New SqlParameter("@Descr", SqlDbType.NVarChar, 50)
                        _sqlParam.Value = Regex.Replace(_drSearch(0).Item("SPECIALTY_DESCR").ToString, "<|>|'|&", "")
                        _Cmd.Parameters.Add(_sqlParam)

                        _sqlParam = New SqlParameter("@UserID", SqlDbType.NVarChar, 20)
                        _sqlParam.Value = "BATCH"
                        _Cmd.Parameters.Add(_sqlParam)

                        With _sbSQL
                            .Remove(0, .Length)
                            .Append("exec ProcessSpecialtyInfo ")

                            If _Cmd.Parameters.Count > 0 Then
                                For Each p As SqlParameter In _Cmd.Parameters
                                    .Append("'" & p.Value & "', ")
                                Next
                                .Remove(.ToString.LastIndexOf(","), 1)
                            End If
                        End With

                        If log.IsInfoEnabled Then log.Info(methodBaseName & ": Inserting/Updating Specialty info with :" &
                                                           " following.... " & _sbSQL.ToString & vbCrLf)

                        Try
                            m_LocalDB.ExecuteNonQuery(_Cmd, pSqlTrans)
                        Catch sqlEx As SqlException
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                                 _sbSQL.ToString & vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                            Return ATPAR_E_LOCALDBINSERTFAIL
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                                    _sbSQL.ToString & vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                            Return E_SERVERERROR
                        Finally
                            _sbSQL.Remove(0, _sbSQL.Length)
                            _Cmd.Dispose()
                        End Try
                    End If
                Next
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                                 ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

    End Function

    ''' <summary>
    ''' ProcessPhysicianInfo
    ''' </summary>
    ''' <param name="pDsHsmData"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function ProcessPhysicianInfo(ByVal pDsHsmData As DataSet, ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _drSearch() As DataRow

        Try

            If pDsHsmData.Tables(CASE_INFO_TABLES.PHYSICIAN_DETAILS).Rows.Count = 0 Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Physician details are not found.")
                Return ATPAR_OK
            End If

            Dim _dvPhyInfo As New DataView
            _dvPhyInfo = pDsHsmData.Tables(CASE_INFO_TABLES.PHYSICIAN_DETAILS).DefaultView
            Dim _dtPhyInfo As DataTable = _dvPhyInfo.ToTable(True, "PHYSICIAN_ID")

            If _dtPhyInfo.Rows.Count > 0 Then
                For intCnt As Integer = 0 To _dtPhyInfo.Rows.Count - 1

                    _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.PHYSICIAN_DETAILS).Select("PHYSICIAN_ID = '" & _dtPhyInfo.Rows(intCnt).Item("PHYSICIAN_ID").ToString & "'")

                    If _drSearch.Length > 0 Then
                        Dim _Cmd As New SqlCommand
                        _Cmd.Connection = m_LocalDB.CreateConnection
                        _Cmd.CommandType = CommandType.StoredProcedure
                        _Cmd.CommandText = "ProcessPhysicianInfo"
                        Dim _sqlParam As SqlParameter

                        _sqlParam = New SqlParameter("@PhysicianId", SqlDbType.NVarChar, 30)
                        _sqlParam.Value = _drSearch(0).Item("PHYSICIAN_ID").ToString
                        _Cmd.Parameters.Add(_sqlParam)

                        _sqlParam = New SqlParameter("@FirstName", SqlDbType.NVarChar, 50)
                        _sqlParam.Value = Regex.Replace(_drSearch(0).Item("PHY_FN").ToString, "<|>|'|&", "")
                        _Cmd.Parameters.Add(_sqlParam)

                        _sqlParam = New SqlParameter("@LastName", SqlDbType.NVarChar, 50)
                        _sqlParam.Value = Regex.Replace(_drSearch(0).Item("PHY_LN").ToString, "<|>|'|&", "")
                        _Cmd.Parameters.Add(_sqlParam)

                        _sqlParam = New SqlParameter("@MiddleInitial", SqlDbType.NVarChar, 20)
                        _sqlParam.Value = Regex.Replace(_drSearch(0).Item("PHY_MI").ToString, "<|>|'|&", "")
                        _Cmd.Parameters.Add(_sqlParam)

                        _sqlParam = New SqlParameter("@UserID", SqlDbType.NVarChar, 20)
                        _sqlParam.Value = "BATCH"
                        _Cmd.Parameters.Add(_sqlParam)

                        With _sbSQL
                            .Remove(0, .Length)
                            .Append("exec ProcessPhysicianInfo ")

                            If _Cmd.Parameters.Count > 0 Then
                                For Each p As SqlParameter In _Cmd.Parameters
                                    .Append("'" & p.Value & "', ")
                                Next
                                .Remove(.ToString.LastIndexOf(","), 1)
                            End If
                        End With

                        If log.IsInfoEnabled Then log.Info(methodBaseName & ": Inserting/Updating Physician info with :" &
                                                           " following.... " & _sbSQL.ToString & vbCrLf)

                        Try
                            m_LocalDB.ExecuteNonQuery(_Cmd, pSqlTrans)
                        Catch sqlEx As SqlException
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                                 _sbSQL.ToString & vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                            Return ATPAR_E_LOCALDBINSERTFAIL
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                                    _sbSQL.ToString & vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                            Return E_SERVERERROR
                        Finally
                            _sbSQL.Remove(0, _sbSQL.Length)
                            _Cmd.Dispose()
                        End Try
                    End If
                Next
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                                 ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

    End Function

    ''' <summary>
    ''' ProcessProcedureInfo
    ''' </summary>
    ''' <param name="pDsHsmData"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function ProcessProcedureInfo(ByVal pDsHsmData As DataSet, ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _drSearch() As DataRow

        Try

            If pDsHsmData.Tables(CASE_INFO_TABLES.PROCEDURE_DETAILS).Rows.Count = 0 Then
                If log.IsWarnEnabled Then log.Warn(methodBaseName & " : Procedure Codes are not found.")
                Return ATPAR_OK
            End If

            Dim _dvProcInfo As New DataView
            _dvProcInfo = pDsHsmData.Tables(CASE_INFO_TABLES.PROCEDURE_DETAILS).DefaultView
            Dim _dtProcInfo As DataTable = _dvProcInfo.ToTable(True, "PROCEDURE_CODE")

            If _dtProcInfo.Rows.Count > 0 Then
                For intCnt As Integer = 0 To _dtProcInfo.Rows.Count - 1

                    _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.PROCEDURE_DETAILS).Select("PROCEDURE_CODE = '" & _dtProcInfo.Rows(intCnt).Item("PROCEDURE_CODE").ToString & "'")

                    If _drSearch.Length > 0 Then
                        Dim _Cmd As New SqlCommand
                        _Cmd.Connection = m_LocalDB.CreateConnection
                        _Cmd.CommandType = CommandType.StoredProcedure
                        _Cmd.CommandText = "ProcessProcedureInfo"
                        Dim _sqlParam As SqlParameter

                        _sqlParam = New SqlParameter("@ProcCode", SqlDbType.NVarChar, 20)
                        _sqlParam.Value = _drSearch(0).Item("PROCEDURE_CODE").ToString
                        _Cmd.Parameters.Add(_sqlParam)

                        _sqlParam = New SqlParameter("@ProcDescr", SqlDbType.NVarChar, 254)
                        _sqlParam.Value = Regex.Replace(_drSearch(0).Item("PROCEDURE_DESCR").ToString, "<|>|'|&", "")
                        _Cmd.Parameters.Add(_sqlParam)

                        _sqlParam = New SqlParameter("@SpecialtyCode", SqlDbType.NVarChar, 20)
                        _sqlParam.Value = _drSearch(0).Item("SPECIALTY_CODE").ToString
                        _Cmd.Parameters.Add(_sqlParam)

                        _sqlParam = New SqlParameter("@UserID", SqlDbType.NVarChar, 20)
                        _sqlParam.Value = "BATCH"
                        _Cmd.Parameters.Add(_sqlParam)

                        With _sbSQL
                            .Remove(0, .Length)
                            .Append("exec ProcessProcedureInfo ")

                            If _Cmd.Parameters.Count > 0 Then
                                For Each p As SqlParameter In _Cmd.Parameters
                                    .Append("'" & p.Value & "', ")
                                Next
                                .Remove(.ToString.LastIndexOf(","), 1)
                            End If
                        End With

                        If log.IsInfoEnabled Then log.Info(methodBaseName & ": Inserting/Updating Procedure info with :" &
                                                           " following.... " & _sbSQL.ToString & vbCrLf)

                        Try
                            m_LocalDB.ExecuteNonQuery(_Cmd, pSqlTrans)
                        Catch sqlEx As SqlException
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                                 _sbSQL.ToString & vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                            Return ATPAR_E_LOCALDBINSERTFAIL
                        Catch ex As Exception
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                                    _sbSQL.ToString & vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                            Return E_SERVERERROR
                        Finally
                            _sbSQL.Remove(0, _sbSQL.Length)
                            _Cmd.Dispose()
                        End Try
                    End If
                Next
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                                 ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

    End Function

    ''' <summary>
    ''' ProcessPrefListInfo
    ''' </summary>
    ''' <param name="pCaseId"></param>
    ''' <param name="pDsHsmData"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function ProcessPrefListInfo(ByVal pCaseId As String, ByRef pDsHsmData As DataSet,
                                         ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _sbPrefs As New StringBuilder
        Dim _dtAtParPrefList As New DataSet

        Dim _statusCode As Long = -1

        Try

            Dim _dvPrefInfo As New DataView
            _dvPrefInfo = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).DefaultView
            Dim _dtPrefInfo As DataTable = _dvPrefInfo.ToTable(True, "PREF_LIST_ID")

            For intCnt As Integer = 0 To _dtPrefInfo.Rows.Count - 1
                With _sbPrefs
                    .Append("'")
                    .Append(_dtPrefInfo.Rows(intCnt).Item("PREF_LIST_ID"))
                    .Append("',")
                End With
            Next

            _sbPrefs.Remove(_sbPrefs.ToString.LastIndexOf(","), 1)

            If pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Rows.Count > 0 Then

                With _sbSQL
                    .Append("SELECT PREF_LIST_ID, PROCEDURE_ID, ITEM_ID, CUST_ITEM_NO, ")
                    .Append("QUANTITY OPEN_QTY, HOLD_QTY, STATUS, 'Y' AS REMOVEDIN_HSMDB ")
                    .Append("FROM MT_POU_PREF_LIST_ALLOC WHERE PREF_LIST_ID IN (")
                    .Append(_sbPrefs.ToString)
                    .Append(")")
                End With

                Try

                    If log.IsInfoEnabled Then log.Info(methodBaseName & " : Getting PerfList details from ATPAR " &
                                            "with the following SQL...." & _sbSQL.ToString & vbCrLf)
                    _dtAtParPrefList = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pSqlTrans)
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                            _sbSQL.ToString & vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                    Return ATPAR_E_LOCALDBSELECTFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                            _sbSQL.ToString & vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                    Return E_SERVERERROR
                Finally
                    _sbSQL.Remove(0, _sbSQL.Length)
                    _sbPrefs.Remove(0, _sbPrefs.Length)
                End Try

                Dim _strItemID As String = String.Empty
                Dim _strPrefID As String = String.Empty
                Dim _strProcCode As String = String.Empty
                Dim _dblOpenQty As Double = 0
                Dim _dblHoldQty As Double = 0
                Dim _dblHsmOpenQty As Double = 0
                Dim _dblHsmHoldQty As Double = 0
                Dim _drSearch() As DataRow

                For intPrefCnt As Integer = 0 To pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Rows.Count - 1

                    _strProcCode = String.Empty
                    _dblOpenQty = 0
                    _dblHoldQty = 0
                    _dblHsmOpenQty = 0
                    _dblHsmHoldQty = 0

                    With pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Rows(intPrefCnt)

                        _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Select("PREF_LIST_ID = '" & .Item("PREF_LIST_ID").ToString & "'")

                        If _drSearch.Length = 1 Then
                            _strProcCode = _drSearch(0).Item("PROCEDURE_CODE").ToString
                        ElseIf _drSearch.Length > 1 Then
                            _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Select("PREF_LIST_ID = '" & .Item("PREF_LIST_ID").ToString & "' AND IS_PRIMARY = '1'")
                            If _drSearch.Length > 0 Then
                                _strProcCode = _drSearch(0).Item("PROCEDURE_CODE").ToString
                            End If
                        End If

                        '// Updating the Proc Code for the items  //'
                        pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Rows(intPrefCnt).Item("PROCEDURE_CODE") = _strProcCode

                        If Not IsDBNull(.Item("OPEN_QTY")) Then
                            If Not String.IsNullOrEmpty(.Item("OPEN_QTY")) Then
                                _dblHsmOpenQty = .Item("OPEN_QTY")
                            End If
                        End If

                        If Not IsDBNull(.Item("HOLD_QTY")) Then
                            If Not String.IsNullOrEmpty(.Item("HOLD_QTY")) Then
                                _dblHsmHoldQty = .Item("HOLD_QTY")
                            End If
                        End If

                        If _dtAtParPrefList.Tables(0).Rows.Count > 0 Then

                            _drSearch = _dtAtParPrefList.Tables(0).Select("PREF_LIST_ID = '" & .Item("PREF_LIST_ID").ToString &
                                                                          "' AND PROCEDURE_ID = '" & _strProcCode & "' AND CUST_ITEM_NO = '" &
                                                                          .Item("CUST_ITEM_NO").ToString & "'")

                            If _drSearch.Length > 0 Then
                                _drSearch(0).Item("REMOVEDIN_HSMDB") = "N"

                                If Not IsDBNull(_drSearch(0).Item("OPEN_QTY")) Then
                                    If Not String.IsNullOrEmpty(_drSearch(0).Item("OPEN_QTY")) Then
                                        _dblOpenQty = _drSearch(0).Item("OPEN_QTY")
                                    End If
                                End If

                                If Not IsDBNull(_drSearch(0).Item("HOLD_QTY")) Then
                                    If Not String.IsNullOrEmpty(_drSearch(0).Item("HOLD_QTY")) Then
                                        _dblHoldQty = _drSearch(0).Item("HOLD_QTY")
                                    End If
                                End If

                                '// Activating the Pref Item if it is in InActive   //'
                                If _drSearch(0).Item("STATUS") Then
                                    With _sbSQL
                                        .Remove(0, .Length)
                                        .Append("UPDATE MT_POU_PREF_LIST_ALLOC SET STATUS = 0, UPDATE_DATE = GETDATE(), ")
                                        .Append("UPDATE_USERID = 'BATCH' ")
                                        .Append("WHERE PREF_LIST_ID = '")
                                        .Append(pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Rows(intPrefCnt).Item("PREF_LIST_ID"))
                                        .Append("' AND PROCEDURE_ID = '")
                                        .Append(_strProcCode)
                                        .Append("' AND CUST_ITEM_NO = '")
                                        .Append(pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Rows(intPrefCnt).Item("CUST_ITEM_NO"))
                                        .Append("'")
                                        .Append("       ")
                                    End With
                                End If

                                '// Updating Pref List Items Open/Hold Qty  //'
                                If (_dblOpenQty <> _dblHsmOpenQty) Or (_dblHoldQty <> _dblHsmHoldQty) Then
                                    With _sbSQL
                                        .Append("UPDATE MT_POU_PREF_LIST_ALLOC SET QUANTITY = ")
                                        .Append(_dblHsmOpenQty)
                                        .Append(", HOLD_QTY = ")
                                        .Append(_dblHsmHoldQty)
                                        .Append(", UPDATE_DATE = GETDATE(), ")
                                        .Append("UPDATE_USERID = 'BATCH' ")
                                        .Append("WHERE PREF_LIST_ID = '")
                                        .Append(pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Rows(intPrefCnt).Item("PREF_LIST_ID"))
                                        .Append("' AND PROCEDURE_ID = '")
                                        .Append(_strProcCode)
                                        .Append("' AND CUST_ITEM_NO = '")
                                        .Append(pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Rows(intPrefCnt).Item("CUST_ITEM_NO"))
                                        .Append("'")
                                    End With

                                End If

                                If _sbSQL.Length > 0 Then
                                    If log.IsInfoEnabled Then log.Info(methodBaseName & " : Updating Pref List Details " &
                                                                       "with following SQL... " & _sbSQL.ToString & vbCrLf)

                                    Try
                                        m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pSqlTrans)
                                    Catch sqlEx As SqlException
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                                                        & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                                                        sqlEx.ToString & vbCrLf)

                                        Return ATPAR_E_LOCALDBUPDATEFAIL
                                    Catch ex As Exception
                                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " Failed to execute the SQL... " _
                                                                   & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                                                   ex.ToString & vbCrLf)

                                        Return E_SERVERERROR
                                    Finally
                                        _sbSQL.Remove(0, _sbSQL.Length)
                                    End Try
                                End If

                            Else
                                '// Inserting Pref List Items //'
                                _statusCode = InsertPrefListDetails(.Item("PREF_LIST_ID").ToString,
                                                                   _strProcCode,
                                                                   GetDatabaseString(.Item("ITEM_DESCR").ToString),
                                                                   _dblHsmOpenQty, _dblHsmHoldQty,
                                                                   .Item("CUST_ITEM_NO").ToString, pSqlTrans)

                                If _statusCode <> ATPAR_OK Then
                                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in InsertPrefListDetails with " &
                                                    " StatusCode :" & _statusCode & vbCrLf)
                                    Return E_SERVERERROR
                                End If

                            End If
                        Else
                            '// Inserting Pref List Items //'
                            _statusCode = InsertPrefListDetails(.Item("PREF_LIST_ID").ToString,
                                                                   _strProcCode,
                                                                   GetDatabaseString(.Item("ITEM_DESCR").ToString),
                                                                   _dblHsmOpenQty, _dblHsmHoldQty,
                                                                   .Item("CUST_ITEM_NO").ToString, pSqlTrans)

                            If _statusCode <> ATPAR_OK Then
                                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in InsertPrefListDetails with " &
                                                " StatusCode :" & _statusCode & vbCrLf)
                                Return E_SERVERERROR
                            End If
                        End If

                    End With
                Next

                If _dtAtParPrefList.Tables(0).Rows.Count > 0 Then
                    _drSearch = _dtAtParPrefList.Tables(0).Select("REMOVEDIN_HSMDB = 'Y'")
                    If _drSearch.Length > 0 Then
                        '// InActiavating the Items  '//
                        _statusCode = InActivePrefListItems(_drSearch, pSqlTrans)

                        If _statusCode <> ATPAR_OK Then
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in InActivePrefListItems with " &
                                            " StatusCode :" & _statusCode & vbCrLf)
                            Return E_SERVERERROR
                        End If
                    End If
                End If

                '// Inserting Pref Header  //'
                _statusCode = InsertPerfListHeader(pDsHsmData, pSqlTrans)

                If _statusCode <> ATPAR_OK Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in InsertPerfListHeader with " &
                                    " StatusCode :" & _statusCode & vbCrLf)
                    Return E_SERVERERROR
                End If

            Else
                '// InActiavating the Items  '//
                With _sbSQL
                    .Remove(0, .Length)
                    .Append("UPDATE MT_POU_PREF_LIST_ALLOC SET STATUS = 1, UPDATE_DATE = GETDATE(), ")
                    .Append("UPDATE_USERID = 'BATCH' ")
                    .Append("WHERE PREF_LIST_ID IN(")
                    .Append(_sbPrefs.ToString)
                    .Append(")")
                End With

                If log.IsInfoEnabled Then log.Info(methodBaseName & " Updating Pref List Details " &
                                                   "with following SQL... " & _sbSQL.ToString & vbCrLf)

                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pSqlTrans)
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                                    & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                                    sqlEx.ToString & vbCrLf)

                    Return ATPAR_E_LOCALDBUPDATEFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                               & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                               ex.ToString & vbCrLf)

                    Return E_SERVERERROR
                Finally
                    _sbSQL.Remove(0, _sbSQL.Length)
                End Try

            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                                 ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
            _sbPrefs = Nothing
            _dtAtParPrefList = Nothing
        End Try

    End Function

    ''' <summary>
    ''' InsertPrefListDetails
    ''' </summary>
    ''' <param name="pPrefID"></param>
    ''' <param name="pProcCode"></param>
    ''' <param name="pItemDescr"></param>
    ''' <param name="pOpenQty"></param>
    ''' <param name="pHoldQty"></param>
    ''' <param name="pCustItemNo"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function InsertPrefListDetails(ByVal pPrefID As String, ByVal pProcCode As String,
                                           ByVal pItemDescr As String, ByVal pOpenQty As Double,
                                           ByVal pHoldQty As Double, ByVal pCustItemNo As String,
                                           ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder

        Try

            With _sbSQL
                .Remove(0, .Length)
                .Append("INSERT INTO MT_POU_PREF_LIST_ALLOC (PREF_LIST_ID, PROCEDURE_ID, ITEM_ID, ITEM_DESCR, ")
                .Append("CUST_ITEM_NO, QUANTITY, HOLD_QTY, UPDATE_DATE, UPDATE_USERID) VALUES('")
                .Append(pPrefID)
                .Append("', '")
                .Append(pProcCode)
                .Append("', '")
                .Append(pCustItemNo)
                .Append("', '")
                .Append(Regex.Replace(pItemDescr, "<|>|'|&", ""))
                .Append("', '")
                .Append(pCustItemNo)
                .Append("', ")
                .Append(pOpenQty)
                .Append(", ")
                .Append(pHoldQty)
                .Append(", GETDATE(), 'BATCH')")
            End With

            If log.IsInfoEnabled Then log.Info(methodBaseName & " Inserting Pref List Details " &
                                               "with following SQL... " & _sbSQL.ToString & vbCrLf)

            Try
                m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pSqlTrans)
            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                                & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                                sqlEx.ToString & vbCrLf)

                Return ATPAR_E_LOCALDBINSERTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                           & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                           ex.ToString & vbCrLf)

                Return E_SERVERERROR
            Finally
                _sbSQL.Remove(0, _sbSQL.Length)
            End Try

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                                 ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

    End Function

    ''' <summary>
    ''' InActivePrefListItems
    ''' </summary>
    ''' <param name="pDrItems"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function InActivePrefListItems(ByVal pDrItems() As DataRow, ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder

        Try
            For intCnt As Integer = 0 To pDrItems.Length - 1
                With _sbSQL
                    .Remove(0, .Length)
                    .Append("UPDATE MT_POU_PREF_LIST_ALLOC SET STATUS = 1, UPDATE_DATE = GETDATE(), ")
                    .Append("UPDATE_USERID = 'BATCH' ")
                    .Append("WHERE PREF_LIST_ID = '")
                    .Append(pDrItems(intCnt).Item("PREF_LIST_ID").ToString)
                    .Append("' AND PROCEDURE_ID = '")
                    .Append(pDrItems(intCnt).Item("PROCEDURE_ID").ToString)
                    .Append("' AND CUST_ITEM_NO = '")
                    .Append(pDrItems(intCnt).Item("CUST_ITEM_NO").ToString)
                    .Append("'")
                End With

                If log.IsInfoEnabled Then log.Info(methodBaseName & " Updating Pref List Details " &
                                                   "with following SQL... " & _sbSQL.ToString & vbCrLf)

                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pSqlTrans)
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                                    & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                                    sqlEx.ToString & vbCrLf)

                    Return ATPAR_E_LOCALDBUPDATEFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                               & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                               ex.ToString & vbCrLf)

                    Return E_SERVERERROR
                Finally
                    _sbSQL.Remove(0, _sbSQL.Length)
                End Try
            Next

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                                ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

    End Function

    ''' <summary>
    ''' InsertPerfListHeader
    ''' </summary>
    ''' <param name="pDsHsmData"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function InsertPerfListHeader(ByVal pDsHsmData As DataSet, ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _drSearch() As DataRow
        Dim _strPhyID As String = String.Empty

        Try

            Dim _dvPrefInfo As New DataView
            _dvPrefInfo = pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).DefaultView
            Dim _dtPrefInfo As DataTable = _dvPrefInfo.ToTable(True, "PREF_LIST_ID", "PROCEDURE_CODE")

            For intCnt As Integer = 0 To _dtPrefInfo.Rows.Count - 1
                _strPhyID = String.Empty

                _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Select("PREF_LIST_ID = '" & _dtPrefInfo.Rows(intCnt).Item("PREF_LIST_ID").ToString &
                                                                                    "' AND PROCEDURE_CODE = '" & _dtPrefInfo.Rows(intCnt).Item("PROCEDURE_CODE").ToString & "'")

                If _drSearch.Length > 0 Then
                    _strPhyID = _drSearch(0).Item("PHYSICIAN_ID").ToString
                End If

                With _sbSQL
                    .Remove(0, .Length)
                    .Append("IF NOT EXISTS(SELECT PREF_LIST_ID FROM MT_POU_PREF_LIST_HEADER ")
                    .Append("WHERE PREF_LIST_ID = '")
                    .Append(_dtPrefInfo.Rows(intCnt).Item("PREF_LIST_ID").ToString)
                    .Append("' AND PROCEDURE_ID = '")
                    .Append(_dtPrefInfo.Rows(intCnt).Item("PROCEDURE_CODE").ToString)
                    .Append("')")
                    .Append("INSERT INTO MT_POU_PREF_LIST_HEADER(PREF_LIST_ID, PREF_LIST_DESCR, PROCEDURE_ID,  ")
                    .Append("PHYSICIAN_ID, UPDATE_DATE, UPDATE_USERID, STATUS) ")
                    .Append("VALUES('")
                    .Append(_dtPrefInfo.Rows(intCnt).Item("PREF_LIST_ID").ToString)
                    .Append("', '', '")
                    .Append(_dtPrefInfo.Rows(intCnt).Item("PROCEDURE_CODE").ToString)
                    .Append("', '")
                    .Append(_strPhyID)
                    .Append("', GETDATE(), 'BATCH', 0")
                    .Append(")")
                End With

                If log.IsInfoEnabled Then log.Info(methodBaseName & " : Inserting Pref List Header " &
                                               "with following SQL... " & _sbSQL.ToString & vbCrLf)

                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pSqlTrans)
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                                    & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                                    sqlEx.ToString & vbCrLf)

                    Return ATPAR_E_LOCALDBINSERTFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                               & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                               ex.ToString & vbCrLf)

                    Return E_SERVERERROR
                Finally
                    _sbSQL.Remove(0, _sbSQL.Length)
                End Try
            Next

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                                ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try
    End Function

    ''' <summary>
    ''' ProcessCaseInfo
    ''' </summary>
    ''' <param name="pCaseId"></param>
    ''' <param name="pCaseDescr"></param>
    ''' <param name="pPatientMrc"></param>
    ''' <param name="pRoomNo"></param>
    ''' <param name="pCasePerformDate"></param>
    ''' <param name="pDsHsmData"></param>
    ''' <param name="pDtHLMsgItemData"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function ProcessCaseInfo(ByVal pCaseId As String, ByVal pPatientMrc As String,
                                     ByVal pRoomNo As String, ByVal pCasePerformDate As String,
                                     ByVal pDsHsmData As DataSet, ByVal pDtHLMsgItemData As DataTable,
                                     ByVal pSystemID As String, ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _drSearch() As DataRow
        Dim _drPrefSearch() As DataRow
        Dim _drCaseStatus() As DataRow

        Dim _strProc As String = String.Empty
        Dim _strPhyID As String = String.Empty
        Dim _strPrefID As String = String.Empty
        Dim _intCaseCnt As Integer = 0

        Dim _statusCode As Long = -1
        Dim _strCaseDescr As String = String.Empty
        Dim _dtCaseHeader As DataTable
        Dim _dsCaseStatusDtls As New DataSet
        Dim _dblHoldQty As Double = 0
        Dim _strDeptID As String = String.Empty
        Dim _strCostCenter As String = String.Empty
        Dim _strSpecialtyCode As String = String.Empty

        Try

            _statusCode = GetCaseStatusDetails(pCaseId, _dsCaseStatusDtls, pSqlTrans)

            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in GetCaseStatusDetails with " &
                                                     " StatusCode :" & _statusCode & vbCrLf)
                Return E_SERVERERROR
            End If

            _dtCaseHeader = New DataTable("CASE_HEADER")
            _dtCaseHeader.Columns.Add("PREF_LIST_ID", Type.GetType("System.String"))
            _dtCaseHeader.Columns.Add("PROCEDURE_CODE", Type.GetType("System.String"))
            _dtCaseHeader.Columns.Add("PHYSICIAN_ID", Type.GetType("System.String"))
            _dtCaseHeader.Columns.Add("CASE_DESCR", Type.GetType("System.String"))
            _dtCaseHeader.Columns.Add("DEPT_ID", Type.GetType("System.String"))
            _dtCaseHeader.Columns.Add("COST_CENTER_CODE", Type.GetType("System.String"))
            _dtCaseHeader.Columns.Add("SPECIALTY_CODE", Type.GetType("System.String"))

            If pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows.Count > 1 Then
                _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Select("IS_PRIMARY = 1")

                If _drSearch.Length > 0 Then
                    _strProc = _drSearch(0).Item("PROCEDURE_CODE").ToString
                    _strPhyID = _drSearch(0).Item("PHYSICIAN_ID").ToString
                    _strCaseDescr = _drSearch(0).Item("CASE_DESCR").ToString
                    _strPrefID = _drSearch(0).Item("PREF_LIST_ID").ToString
                    _strSpecialtyCode = IIf(IsDBNull(_drSearch(0).Item("SPECIALITY_CODE")), String.Empty, _drSearch(0).Item("SPECIALITY_CODE"))
                End If
            Else
                _strProc = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows(0).Item("PROCEDURE_CODE").ToString
                _strPhyID = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows(0).Item("PHYSICIAN_ID").ToString
                _strCaseDescr = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows(0).Item("CASE_DESCR").ToString
                _strPrefID = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows(0).Item("PREF_LIST_ID").ToString
                _strSpecialtyCode = IIf(IsDBNull(pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows(0).Item("SPECIALITY_CODE")),
                            String.Empty, pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows(0).Item("SPECIALITY_CODE"))
            End If

            'Get the Dept Id from DEPT_DETAILS table  
            If pDsHsmData.Tables(CASE_INFO_TABLES.DEPT_DETAILS).Rows.Count > 0 Then

                _strDeptID = IIf(IsDBNull(pDsHsmData.Tables(CASE_INFO_TABLES.DEPT_DETAILS).Rows(0).Item("DEPT_ID")),
                             String.Empty, pDsHsmData.Tables(CASE_INFO_TABLES.DEPT_DETAILS).Rows(0).Item("DEPT_ID"))

                'Get the Cost Center for Department Id from middle tier
                If Not String.IsNullOrEmpty(_strDeptID) Then

                    _statusCode = GetDeptOrCostCenterCode(_strDeptID, CASE_FILTER.DEPT_ID.ToString, pSystemID, _strCostCenter)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in GetDeptOrCostCenterCode with " &
                                                           "StatusCode :" & _statusCode & vbCrLf)
                        Return E_SERVERERROR
                    End If

                End If

            End If

            Dim _dvItemInfo As New DataView
            _dvItemInfo = pDtHLMsgItemData.DefaultView
            Dim _dtItemInfo As DataTable = _dvItemInfo.ToTable(True, "ITEM_ID")

            For intCnt As Integer = 0 To _dtItemInfo.Rows.Count - 1

                _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Select("CUST_ITEM_NO = '" &
                                                         _dtItemInfo.Rows(intCnt).Item("ITEM_ID").ToString &
                                                         "' AND PREF_LIST_ID = '" & _strPrefID & "'" &
                                                         " AND PROCEDURE_CODE = '" & _strProc & "'")
                If _drSearch.Length = 0 Then
                    _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.PREF_LIST_DETAILS).Select("CUST_ITEM_NO = '" &
                                         _dtItemInfo.Rows(intCnt).Item("ITEM_ID").ToString & "'", "PREF_LIST_ID DESC")
                End If

                If _drSearch.Length > 0 Then

                    '// Checking the Case Status in ATPAR //'
                    If _dsCaseStatusDtls.Tables(0).Rows.Count > 0 Then
                        _drCaseStatus = _dsCaseStatusDtls.Tables(0).Select("CASE_ID = '" & pCaseId & "' AND PREF_LIST_ID = '" &
                                                                           _drSearch(0).Item("PREF_LIST_ID").ToString &
                                                                           "' AND PROCEDURE_CODE = '" & _drSearch(0).Item("PROCEDURE_CODE").ToString & "'")

                        If _drCaseStatus.Length > 0 Then
                            If _drCaseStatus(0).Item("STATUS") = CInt(CASE_PICK_STATUS.PICKED) Then
                                If log.IsWarnEnabled Then log.Warn(methodBaseName & " : CaseID : " & pCaseId & ", Preflist id : " &
                                    _drSearch(0).Item("PREF_LIST_ID").ToString & ", Procedure code : " &
                                    _drSearch(0).Item("PROCEDURE_CODE").ToString & " is in PICKED status. " &
                                    "So skipping the item no : " & _drSearch(0).Item("CUST_ITEM_NO").ToString & vbCrLf)
                                Continue For
                            End If
                        End If
                    End If

                    _dblHoldQty = 0
                    If Not IsDBNull(_drSearch(0).Item("HOLD_QTY")) Then
                        If Not String.IsNullOrEmpty(_drSearch(0).Item("HOLD_QTY")) Then
                            _dblHoldQty = _drSearch(0).Item("HOLD_QTY")
                        End If
                    End If

                    _statusCode = InsertCaseItems(pCaseId, _drSearch(0).Item("PREF_LIST_ID").ToString,
                                                 _drSearch(0).Item("PROCEDURE_CODE").ToString,
                                                 _drSearch(0).Item("CUST_ITEM_NO").ToString,
                                                 _drSearch(0).Item("ITEM_DESCR").ToString,
                                                 _drSearch(0).Item("OPEN_QTY"),
                                                 _dblHoldQty, pSqlTrans)

                    If _statusCode <> ATPAR_OK Then
                        If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in InsertCaseItems with " &
                                                            "StatusCode :" & _statusCode & vbCrLf)
                        Return E_SERVERERROR
                    End If


                    _strPhyID = String.Empty
                    _strCaseDescr = String.Empty

                    _drPrefSearch = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Select("PREF_LIST_ID = '" & _drSearch(0).Item("PREF_LIST_ID").ToString &
                                                                                        "' AND PROCEDURE_CODE = '" & _drSearch(0).Item("PROCEDURE_CODE").ToString & "'")

                    If _drPrefSearch.Length > 0 Then
                        _strPhyID = _drPrefSearch(0).Item("PHYSICIAN_ID").ToString
                        _strCaseDescr = _drPrefSearch(0).Item("CASE_DESCR").ToString
                    End If

                    Dim _drNewRow As DataRow = _dtCaseHeader.NewRow()
                    _drNewRow.Item("PREF_LIST_ID") = _drSearch(0).Item("PREF_LIST_ID").ToString
                    _drNewRow.Item("PROCEDURE_CODE") = _drSearch(0).Item("PROCEDURE_CODE").ToString
                    _drNewRow.Item("PHYSICIAN_ID") = _strPhyID
                    _drNewRow.Item("CASE_DESCR") = _strCaseDescr
                    _drNewRow.Item("DEPT_ID") = _strDeptID
                    _drNewRow.Item("COST_CENTER_CODE") = _strCostCenter
                    _drNewRow.Item("SPECIALTY_CODE") = _strSpecialtyCode
                    _dtCaseHeader.Rows.Add(_drNewRow)
                Else
                    'UNKNOWN PREF
                    _strProc = String.Empty
                    _strPhyID = String.Empty
                    _strCaseDescr = String.Empty

                    If pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows.Count > 1 Then
                        _drSearch = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Select("IS_PRIMARY = 1")

                        If _drSearch.Length > 0 Then
                            _strProc = _drSearch(0).Item("PROCEDURE_CODE").ToString
                            _strPhyID = _drSearch(0).Item("PHYSICIAN_ID").ToString
                            _strCaseDescr = _drSearch(0).Item("CASE_DESCR").ToString
                        End If
                    Else
                        _strProc = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows(0).Item("PROCEDURE_CODE").ToString
                        _strPhyID = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows(0).Item("PHYSICIAN_ID").ToString
                        _strCaseDescr = pDsHsmData.Tables(CASE_INFO_TABLES.CASE_DETAILS).Rows(0).Item("CASE_DESCR").ToString
                    End If

                    _drSearch = pDtHLMsgItemData.Select("ITEM_ID = '" & _dtItemInfo.Rows(intCnt).Item("ITEM_ID").ToString & "'")

                    If _drSearch.Length > 0 Then


                        '// Checking the Case Status in ATPAR //'
                        If _dsCaseStatusDtls.Tables(0).Rows.Count > 0 Then
                            _drCaseStatus = _dsCaseStatusDtls.Tables(0).Select("CASE_ID = '" & pCaseId & "' AND PREF_LIST_ID = 'UNKNOWN' AND PROCEDURE_CODE = '" &
                                                                               _strProc & "'")

                            If _drCaseStatus.Length > 0 Then
                                If _drCaseStatus(0).Item("STATUS") = CInt(CASE_PICK_STATUS.PICKED) Then
                                    If log.IsWarnEnabled Then log.Warn(methodBaseName & " : CaseID : " & pCaseId & ", Preflist id : " &
                                        "UNKNOWN, Procedure code : " & _strProc & " is in PICKED status. " &
                                        "So skipping the item no : " & _drSearch(0).Item("ITEM_ID").ToString & vbCrLf)
                                    Continue For
                                End If
                            End If
                        End If

                        _dblHoldQty = 0
                        If Not IsDBNull(_drSearch(0).Item("HOLD_QTY")) Then
                            If Not String.IsNullOrEmpty(_drSearch(0).Item("HOLD_QTY")) Then
                                _dblHoldQty = _drSearch(0).Item("HOLD_QTY")
                            End If
                        End If

                        _statusCode = InsertCaseItems(pCaseId, "UNKNOWN", _strProc,
                                                    _drSearch(0).Item("ITEM_ID").ToString,
                                                    _drSearch(0).Item("ITEM_DESC").ToString,
                                                    _drSearch(0).Item("PICK_QTY"),
                                                    _dblHoldQty, pSqlTrans)

                        If _statusCode <> ATPAR_OK Then
                            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in InsertCaseItems with " &
                                                                "StatusCode :" & _statusCode & vbCrLf)
                            Return E_SERVERERROR
                        End If

                        Dim _drNewRow As DataRow = _dtCaseHeader.NewRow()
                        _drNewRow.Item("PREF_LIST_ID") = "UNKNOWN"
                        _drNewRow.Item("PROCEDURE_CODE") = _strProc
                        _drNewRow.Item("PHYSICIAN_ID") = _strPhyID
                        _drNewRow.Item("CASE_DESCR") = _strCaseDescr
                        _drNewRow.Item("DEPT_ID") = _strDeptID
                        _drNewRow.Item("COST_CENTER_CODE") = _strCostCenter
                        _drNewRow.Item("SPECIALTY_CODE") = _strSpecialtyCode
                        _dtCaseHeader.Rows.Add(_drNewRow)
                    End If

                End If
            Next

            If _dtCaseHeader.Rows.Count > 0 Then

                _statusCode = InsertCaseHeader(pCaseId, pPatientMrc, pRoomNo,
                                               pCasePerformDate, pDsHsmData, _dtCaseHeader,
                                               pSystemID, pSqlTrans)

                If _statusCode <> ATPAR_OK Then
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed in InsertCaseHeader with " &
                                                        "StatusCode :" & _statusCode & vbCrLf)
                    Return E_SERVERERROR
                End If

            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                                ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
            _dtCaseHeader = Nothing
        End Try

    End Function

    ''' <summary>
    ''' InsertCaseItems
    ''' </summary>
    ''' <param name="pCaseID"></param>
    ''' <param name="pPrefID"></param>
    ''' <param name="pProc"></param>
    ''' <param name="pCustItemNo"></param>
    ''' <param name="pItemDescr"></param>
    ''' <param name="pOpenQty"></param>
    ''' <param name="pHoldQty"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function InsertCaseItems(ByVal pCaseID As String, ByVal pPrefID As String,
                                     ByVal pProc As String, ByVal pCustItemNo As String,
                                     ByVal pItemDescr As String, ByVal pOpenQty As Double,
                                     ByVal pHoldQty As Double, ByVal pSqlTrans As SqlTransaction) As Long


        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder

        Try

            With _sbSQL
                .Remove(0, .Length)
                .Append("IF NOT EXISTS(SELECT CASE_ID FROM MT_POU_CASE_CART_DETAILS ")
                .Append("WHERE CASE_ID = '")
                .Append(pCaseID)
                .Append("' AND PREF_LIST_ID = '")
                .Append(pPrefID)
                .Append("' AND PROCEDURE_CODE = '")
                .Append(pProc)
                .Append("' AND (ITEM_ID = '")
                .Append(pCustItemNo)
                .Append("' OR CUST_ITEM_NO = '")
                .Append(pCustItemNo)
                .Append("'))")
                .Append("INSERT INTO MT_POU_CASE_CART_DETAILS(CASE_ID, ITEM_ID, ITEM_DESCR, ITEM_INVENTORY, ")
                .Append("PICK_QTY, HOLD_QTY, PREF_LIST_ID, PROCEDURE_CODE, ITEM_SOURCE, ")
                .Append("CUST_ITEM_NO, ACT_OPEN_QTY, ACT_HOLD_QTY) VALUES ('")
                .Append(pCaseID)
                .Append("', '")
                .Append(pCustItemNo)   'Inserting CustItemNo in ItemID
                .Append("', '")
                .Append(Regex.Replace(GetDatabaseString(pItemDescr), "<|>|'|&", ""))
                .Append("', '")
                .Append(String.Empty)
                .Append("', ")
                .Append(pOpenQty)
                .Append(", ")
                .Append(pHoldQty)
                .Append(", '")
                .Append(pPrefID)
                .Append("', '")
                .Append(pProc)
                .Append("', ")
                .Append(CaseItem_Source.HL7)
                .Append(", '")
                .Append(pCustItemNo)
                .Append("', ")
                .Append(pOpenQty)
                .Append(", ")
                .Append(pHoldQty)
                .Append(")")
            End With

            If log.IsInfoEnabled Then log.Info(methodBaseName & " : Inserting case item " &
                                   "with following SQL... " & _sbSQL.ToString & vbCrLf)

            Try
                m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pSqlTrans)
            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                                & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                                sqlEx.ToString & vbCrLf)

                Return ATPAR_E_LOCALDBINSERTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                           & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                           ex.ToString & vbCrLf)

                Return E_SERVERERROR
            Finally
                _sbSQL.Remove(0, _sbSQL.Length)
            End Try

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                               ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

    End Function

    ''' <summary>
    ''' InsertCaseHeader
    ''' </summary>
    ''' <param name="pCaseID"></param>
    ''' <param name="pCaseDescr"></param>
    ''' <param name="pPatientMrc"></param>
    ''' <param name="pRoomNo"></param>
    ''' <param name="pCasePerformDate"></param>
    ''' <param name="pDsHsmData"></param>
    ''' <param name="pDtCaseHdr"></param>
    ''' <param name="pSystemID"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function InsertCaseHeader(ByVal pCaseID As String, ByVal pPatientMrc As String,
                                      ByVal pRoomNo As String, ByVal pCasePerformDate As String,
                                      ByVal pDsHsmData As DataSet, ByVal pDtCaseHdr As DataTable,
                                      ByVal pSystemID As String, ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _drSearch() As DataRow
        Dim _strCaseDescr As String = String.Empty
        Dim _strPhyID As String = String.Empty
        Dim _strDeptID As String = String.Empty
        Dim _strCostCenter As String = String.Empty
        Dim _strSpecialityCode As String = String.Empty

        Try

            Dim _blnPrePickQAProc As Boolean = False

            _blnPrePickQAProc = GetConfigData(pSystemID, EName(Of CONFIGFILE)(CONFIGFILE.ATPAR_SYSTEM), ATPAR_SYSTEM.PREPICK_QA_PROCESS_REQUIRED.ToString)

            If log.IsDebugEnabled Then log.Debug(methodBaseName & " : Pre Pick QA Process required : " & _blnPrePickQAProc)


            Dim _dvHdrInfo As New DataView
            _dvHdrInfo = pDtCaseHdr.DefaultView
            Dim _dtHdrInfo As DataTable = _dvHdrInfo.ToTable(True, "PREF_LIST_ID", "PROCEDURE_CODE")

            For intCnt As Integer = 0 To _dtHdrInfo.Rows.Count - 1

                _strPhyID = String.Empty

                _drSearch = pDtCaseHdr.Select("PREF_LIST_ID = '" & _dtHdrInfo.Rows(intCnt).Item("PREF_LIST_ID").ToString &
                                              "' AND PROCEDURE_CODE = '" & _dtHdrInfo.Rows(intCnt).Item("PROCEDURE_CODE").ToString & "'")

                If _drSearch.Length > 0 Then
                    _strPhyID = _drSearch(0).Item("PHYSICIAN_ID").ToString
                    _strCaseDescr = _drSearch(0).Item("CASE_DESCR").ToString
                    _strDeptID = _drSearch(0).Item("DEPT_ID").ToString
                    _strCostCenter = _drSearch(0).Item("COST_CENTER_CODE").ToString
                    _strSpecialityCode = _drSearch(0).Item("SPECIALTY_CODE").ToString
                End If

                With _sbSQL
                    .Append("IF NOT EXISTS(SELECT CASE_ID FROM MT_POU_CASE_CART_HEADER ")
                    .Append("WHERE CASE_ID = '")
                    .Append(pCaseID)
                    .Append("' AND PREF_LIST_ID = '")
                    .Append(_dtHdrInfo.Rows(intCnt).Item("PREF_LIST_ID").ToString)
                    .Append("' AND PROCEDURE_CODE = '")
                    .Append(_dtHdrInfo.Rows(intCnt).Item("PROCEDURE_CODE").ToString)
                    .Append("')")
                    .Append("INSERT INTO MT_POU_CASE_CART_HEADER(CASE_ID, PATIENT_ID, DESCRIPTION, PHYSICIAN, PREF_LIST_ID, STATUS,")
                    .Append(" ROOM_NO, PERFORM_DATE, CREATE_USER_ID, UPDATE_DATE, UPDATE_USER_ID, CREATE_DATE, PROCEDURE_CODE, ")
                    .Append(" DEPT_ID , COST_CENTER_CODE , SERVICE_CODE ")
                    .Append(") VALUES('")
                    .Append(pCaseID)
                    .Append("','")
                    .Append(pPatientMrc)
                    .Append("', '")
                    .Append(Regex.Replace(GetDatabaseString(_strCaseDescr), "<|>|'|&", ""))
                    .Append("', '")
                    .Append(_strPhyID)
                    .Append("', '")
                    .Append(_dtHdrInfo.Rows(intCnt).Item("PREF_LIST_ID").ToString)
                    .Append("', '")
                    If _blnPrePickQAProc Then
                        .Append(Decimal.Zero) 'Open
                    Else
                        .Append(Decimal.One) 'Ready
                    End If
                    .Append("', '")
                    .Append(pRoomNo)
                    .Append("', '")
                    .Append(pCasePerformDate)
                    .Append("', '")
                    .Append("BATCH")
                    .Append("', GETDATE()")
                    .Append(",'")
                    .Append("BATCH")
                    .Append("', GETDATE()")
                    .Append(", '")
                    .Append(_dtHdrInfo.Rows(intCnt).Item("PROCEDURE_CODE").ToString)
                    .Append("', '")
                    .Append(_strDeptID)
                    .Append("', '")
                    .Append(_strCostCenter)
                    .Append("', '")
                    .Append(_strSpecialityCode)
                    .Append("')")
                End With

                If log.IsInfoEnabled Then log.Info(methodBaseName & " : Inserting case header " &
                                   "with following SQL... " & _sbSQL.ToString & vbCrLf)

                Try
                    m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pSqlTrans)
                Catch sqlEx As SqlException
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                                    & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                                    sqlEx.ToString & vbCrLf)

                    Return ATPAR_E_LOCALDBINSERTFAIL
                Catch ex As Exception
                    If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                               & _sbSQL.ToString & vbCrLf & " Exception is : " &
                                               ex.ToString & vbCrLf)

                    Return E_SERVERERROR
                Finally
                    _sbSQL.Remove(0, _sbSQL.Length)
                End Try

            Next

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                              ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

    End Function

    ''' <summary>
    ''' GetCaseStatusDetails
    ''' </summary>
    ''' <param name="pCaseID"></param>
    ''' <param name="pDsCaseStatusDtls"></param>
    ''' <param name="pSqlTrans"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetCaseStatusDetails(ByVal pCaseID As String, ByRef pDsCaseStatusDtls As DataSet,
                                          ByVal pSqlTrans As SqlTransaction) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder

        Try

            With _sbSQL
                .Append("SELECT CASE_ID, PREF_LIST_ID, PROCEDURE_CODE, STATUS FROM MT_POU_CASE_CART_HEADER ")
                .Append("WHERE CASE_ID = '")
                .Append(pCaseID)
                .Append("'")
            End With

            Try

                If log.IsInfoEnabled Then log.Info(methodBaseName & " : Getting Case status details from ATPAR " &
                                        "with the following SQL...." & _sbSQL.ToString & vbCrLf)
                pDsCaseStatusDtls = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString), pSqlTrans)
            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                        _sbSQL.ToString & vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                        _sbSQL.ToString & vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            Finally
                _sbSQL.Remove(0, _sbSQL.Length)
            End Try

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                             ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
        End Try

    End Function


    ''' <summary>
    ''' GetDeptOrCostCenterCode
    ''' </summary>
    ''' <param name="pId"></param>
    ''' <param name="pFilter"></param>
    ''' <param name="pDeptOrCostCenterId"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetDeptOrCostCenterCode(ByVal pId As String, ByVal pFilter As String,
                                             ByVal pSystemID As String, ByRef pDeptOrCostCenterId As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _dsIds As New DataSet

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            With _sbSQL
                If pFilter = CASE_FILTER.DEPT_ID.ToString Then
                    .Append("SELECT ")
                    .Append("CASE WHEN COUNT(COST_CENTER_CODE ) > 0 THEN ")
                    .Append("(SELECT  TOP 1 COST_CENTER_CODE FROM PAR_MNGT_COST_CENTER WHERE ISNUMERIC(COST_CENTER_CODE )=1 ")
                    .Append("AND DEPT_ID = '").Append(pId).Append("' AND STATUS = 0  ORDER BY CAST(COST_CENTER_CODE AS INT) ASC) ")
                    .Append("ELSE ")
                    .Append("(SELECT TOP 1 COST_CENTER_CODE FROM PAR_MNGT_COST_CENTER WHERE DEPT_ID = '").Append(pId)
                    .Append("' AND STATUS = 0  ORDER BY COST_CENTER_CODE ASC) ")
                    .Append("END AS 'COST_CENTER_CODE' ")
                    .Append("FROM PAR_MNGT_COST_CENTER WHERE ISNUMERIC(COST_CENTER_CODE )=1  AND  DEPT_ID = '").Append(pId)
                    .Append("' AND STATUS = 0")
                Else
                    .Append("SELECT ")
                    .Append("CASE WHEN COUNT(DEPT_ID ) > 0 THEN ")
                    .Append("(SELECT  TOP 1 DEPT_ID FROM PAR_MNGT_COST_CENTER WHERE ISNUMERIC(DEPT_ID )=1 ")
                    .Append("AND COST_CENTER_CODE = '").Append(pId).Append("' AND STATUS = 0  ORDER BY CAST(DEPT_ID AS INT) ASC) ")
                    .Append("ELSE ")
                    .Append("(SELECT TOP 1 DEPT_ID FROM PAR_MNGT_COST_CENTER WHERE COST_CENTER_CODE = '").Append(pId)
                    .Append("' AND STATUS = 0  ORDER BY DEPT_ID ASC) ")
                    .Append("END AS 'DEPT_ID' ")
                    .Append("FROM PAR_MNGT_COST_CENTER WHERE ISNUMERIC(DEPT_ID )=1  AND  COST_CENTER_CODE = '").Append(pId)
                    .Append("' AND STATUS = 0")
                End If

            End With

            Try

                If log.IsInfoEnabled Then log.Info(methodBaseName & " : Getting Cost center,Dept ids from ATPAR " &
                                        "with the following SQL...." & _sbSQL.ToString & vbCrLf)
                _dsIds = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))

            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                        _sbSQL.ToString & vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                        _sbSQL.ToString & vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            Finally
                _sbSQL.Remove(0, _sbSQL.Length)
            End Try

            If _dsIds.Tables(0).Rows.Count > 0 Then

                If pFilter = CASE_FILTER.DEPT_ID.ToString Then
                    pDeptOrCostCenterId = _dsIds.Tables(0).Rows(0).Item("COST_CENTER_CODE").ToString
                Else
                    pDeptOrCostCenterId = _dsIds.Tables(0).Rows(0).Item("DEPT_ID").ToString
                End If

            Else
                pDeptOrCostCenterId = String.Empty
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                             ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
            _dsIds = Nothing
        End Try

    End Function

    Enum CASE_FILTER
        DEPT_ID = 0
        COST_CENTER_CODE = 1
    End Enum
#End Region

    ''' <summary>
    ''' GetPrefID
    ''' </summary>
    ''' <param name="pProcId"></param>
    ''' <param name="pPhyID"></param>
    ''' <param name="pPrefId"></param>
    ''' <param name="pPrefDescr"></param>
    ''' <param name="pSystemID"></param>
    ''' <returns>ATPAR_OK on Success, else ERROR CODE</returns>
    ''' <remarks></remarks>
    Private Function GetPrefID(ByVal pProcId As String, ByVal pPhyID As String,
                               ByRef pPrefId As String, ByRef pPrefDescr As String,
                               ByVal pSystemID As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _sbSQL As New StringBuilder
        Dim _dsPrefIds As New DataSet

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            With _sbSQL
                .Append("SELECT PREF_LIST_ID, PREF_LIST_DESCR FROM MT_POU_PREF_LIST_HEADER ")
                .Append("WHERE PROCEDURE_ID = '")
                .Append(pProcId)
                .Append("' AND PHYSICIAN_ID = '")
                .Append(pPhyID)
                .Append("'")
            End With

            Try

                If log.IsInfoEnabled Then log.Info(methodBaseName & " : Getting Pref Lists from ATPAR " &
                                        "with the following SQL...." & _sbSQL.ToString & vbCrLf)
                _dsPrefIds = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString))
            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                        _sbSQL.ToString & vbCrLf & " Exception is : " & sqlEx.ToString & vbCrLf)
                Return ATPAR_E_LOCALDBSELECTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL.... " &
                                        _sbSQL.ToString & vbCrLf & " Exception is : " & ex.ToString & vbCrLf)
                Return E_SERVERERROR
            Finally
                _sbSQL.Remove(0, _sbSQL.Length)
            End Try

            If _dsPrefIds.Tables(0).Rows.Count > 0 Then
                pPrefId = _dsPrefIds.Tables(0).Rows(0).Item("PREF_LIST_ID").ToString
                pPrefDescr = _dsPrefIds.Tables(0).Rows(0).Item("PREF_LIST_DESCR").ToString
            Else
                pPrefId = String.Empty
                pPrefDescr = String.Empty
            End If

            Return ATPAR_OK

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed with exception : " &
                                             ex.ToString())
            Return E_SERVERERROR
        Finally
            _sbSQL = Nothing
            _dsPrefIds = Nothing
        End Try

    End Function

    Public Function ParseWarnMessage(ByVal pXmlName As String, ByVal pFieldValue As String,
                                     ByVal pPATIENT_MRC As String, ByVal pCASE_ID As String, ByVal pPROCEDURE_ID As String, ByVal pPREF_ID As String,
                                     Optional ByVal pXmlFieldNo As String = "", Optional ByVal pXmlCompositeFieldNo As String = "")

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)



        Try
            If Not String.IsNullOrEmpty(pXmlFieldNo) Then

                'It would be better if we display error message as "Mandatory Field Name:XXXX Field value at the position:3:does not exit" for all the mandatory fields.

                _strWarning = " : Mandatory Field Name : " & pXmlName & " And Field value at" &
                                                                 " position :" & pXmlFieldNo &
                                                                 ": does not exist in the message"

            ElseIf Not String.IsNullOrEmpty(pXmlCompositeFieldNo) Then



                _strWarning = " Mandatory Field Name : " & pXmlName & " and Field value :" & _strFieldPos &
                                                                   ": at the composite field position :" & pXmlCompositeFieldNo &
                                                                   ": does not exist in the message "

                '_strWarning = " Mandatory Field Name : " & pXmlName & " and Field value :" & pFieldValue & _
                '                                                       ": at the composite field position :" & pXmlCompositeFieldNo & _
                '                                                       ": is not provided in the message "
            End If


        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
        End Try

    End Function


    Public Function ProcessEmail(ByVal pwrnmessage As String, ByVal pSystemId As String, ByVal pMRN As String, ByVal pCaseId As String,
                                 ByVal pProcId As String, ByVal pPrefId As String) As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _strEmailId As String = String.Empty
        Dim sbHtmlString As New StringBuilder
        Dim _objAtParUtils As AtPar_BusinessRules.AtPar_Utils

        _strEmailId = GetConfigData(pSystemId, EName(Of CONFIGFILE)(CONFIGFILE.HL7), HL7.ADT_EMAILID.ToString)

        Dim _statusCode As Integer = -1

        Try
            With sbHtmlString
                .Append("<table align=left width=100%>")
                .Append("<tr><td>")
                .Append("<table align=left width=100%>")
                .Append("<tr>")
                .Append("<td align=left><span>Following is the error in parsing the case for ")


                If Not String.IsNullOrEmpty(pMRN) Then
                    .Append("MRN : " & pMRN)
                End If

                If Not String.IsNullOrEmpty(pCaseId) Then
                    .Append(", Case ID: " & pCaseId)
                End If

                If Not String.IsNullOrEmpty(pProcId) Then
                    .Append(", Procedure ID: " & pProcId)
                End If

                If Not String.IsNullOrEmpty(pPrefId) Then
                    .Append(", Preference List: " & pPrefId)
                End If

                .Append("</span></td>")
                .Append("</tr>")
                .Append("<tr>")
                .Append("<td align=left><span></span></td>")
                .Append("</tr>")
                .Append("</table>")
                .Append("</td></tr>")
                .Append("<tr>")
                .Append("<td align=left nowrap><span>" & pwrnmessage & "</span></td>")
                .Append("</tr>")
                .Append("</table>")
            End With


            _objAtParUtils = New AtPar_BusinessRules.AtPar_Utils
            _statusCode = _objAtParUtils.SendEmail(pSystemId, "Error while parsing the Case for MRN: " & pMRN, sbHtmlString.ToString, _strEmailId, MailPriority.High)

            If _statusCode <> ATPAR_OK Then
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed in sendEmail:" &
                                        "StatusCode is :" & _statusCode & vbCrLf)
                'Ignoring errors
            End If

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        Finally
            _objAtParUtils = Nothing
        End Try

    End Function

    Public Function InsertHL7CaseMsg(ByVal pHL7message As String, ByVal pCaseId As String, ByVal pPreflst As String, ByVal pProc As String,
                                     ByVal pTransmissionStatus As Integer, ByVal pSystemID As String, Optional ByVal perrormsg As String = "") As Long

        Dim stackFrame As New StackFrame()
        Dim methodBase As MethodBase = stackFrame.GetMethod()
        Dim methodBaseName As String = methodBase.Name
        If log.IsDebugEnabled Then log.Debug(methodBaseName)

        Dim _statusCode As Integer = -1
        Dim _strSpace As String = " "

        Dim _StrSql As New StringBuilder

        Try
            CreateLocalDB(pSystemID)
        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ": Failed to create LocalDB Object " & ex.ToString & ":")
            Return E_SERVERERROR
        End Try

        Try

            With _StrSql
                .Append("INSERT INTO MT_ATPAR_HL7_MSGS_TRANSMISSION (")
                .Append("TRANSACTION_ID, APP_ID, KEY_1, KEY_2, KEY_3, KEY_4, KEY_5,	HL7_MSG_TYPE,")
                .Append("TRANSMISSION_STATUS, HL7_MESSAGE, ")
                If perrormsg <> "" AndAlso perrormsg <> String.Empty Then
                    .Append("HL7_ERROR_MESSAGE, ")
                End If
                .Append("UPDATE_DATE, UPDATE_USER_ID)")
                .Append("VALUES (")
                .Append("'" & _strSpace & "' , " & EnumApps.PointOfUse & " ," & EnumApps.PointOfUse & ", '" & pCaseId & "', '" & _strSpace & "', '" & pPreflst & "','" & pProc & "'")
                .Append(", '" & HL7_MESSAGE_TYPE.CASE_INFO & "' ,'" & pTransmissionStatus & "' , '" & substituteString(pHL7message.Trim()) & "'")
                If perrormsg <> "" AndAlso perrormsg <> String.Empty Then
                    .Append(",'" & perrormsg & "'")
                End If
                .Append(", GETDATE(), '" & pSystemID & "'")
                .Append(")")
            End With

            If log.IsInfoEnabled Then log.Info(methodBaseName & " Inserting Inbound Details " & _
                                    "with following SQL... " & _StrSql.ToString & vbCrLf)

            Try
                m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(_StrSql.ToString))
            Catch sqlEx As SqlException
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                                & _StrSql.ToString & vbCrLf & " Exception is : " & _
                                                sqlEx.ToString & vbCrLf)

                Return ATPAR_E_LOCALDBINSERTFAIL
            Catch ex As Exception
                If log.IsFatalEnabled Then log.Fatal(methodBaseName & " : Failed to execute the SQL... " _
                                           & _StrSql.ToString & vbCrLf & " Exception is : " & _
                                           ex.ToString & vbCrLf)

                Return E_SERVERERROR

            Finally
                _StrSql.Remove(0, _StrSql.Length)
            End Try

        Catch ex As Exception
            If log.IsFatalEnabled Then log.Fatal(methodBaseName & ":Failed with EX: " & ex.Message.ToString & vbCrLf)
            Return E_SERVERERROR
        End Try
        Return ATPAR_OK
    End Function
End Class

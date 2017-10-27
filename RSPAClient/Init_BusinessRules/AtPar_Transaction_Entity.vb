Public Structure AtPar_Transaction_Entity

    Private m_TransactionId As Integer
    Private m_AppId As Integer
    Private m_ID As String
    Private m_BusinessUnit As String
    Private m_Description As String
    Private m_Status As Integer
    Private m_StatusCode As Integer
    Private m_TotalRecordSent As Integer
    Private m_TotalRecordDownloaded As Integer
    Private m_DownloadDateTime As Date
    Private m_StartDateTime As Date
    Private m_EndDateTime As Date
    Private m_UpdateDateTime As Date
    Private m_UserId As String
    Private m_DownloadUserId As String
    Private m_DeviceId As String
    Private m_ScansCount As Integer
    Private m_ReportData1 As String
    Private m_ReportData2 As String
    Private m_ReportData3 As String
    Private m_ReportData4 As String
    Private m_ReportData5 As String
    Private m_ReportData6 As Date
    Private m_ReportData7 As Date
    Private m_ReportData8 As String
    Private m_ReportData9 As String
    Private m_ReportData10 As String
    Private m_ReportData11 As String
    Private m_ReportData12 As String
    Private m_ReportData13 As String


    Public Property TransactionId() As Integer
        Get
            Return m_TransactionId
        End Get
        Set(ByVal value As Integer)
            m_TransactionId = value
        End Set
    End Property



    Public Property ApplicationId() As Integer
        Get
            Return m_AppId
        End Get
        Set(ByVal value As Integer)
            m_AppId = value
        End Set
    End Property


    Public Property ID() As String
        Get
            Return m_ID
        End Get
        Set(ByVal value As String)
            m_ID = value
        End Set
    End Property



    Public Property BusinessUnit() As String
        Get
            Return m_BusinessUnit
        End Get
        Set(ByVal value As String)
            m_BusinessUnit = value
        End Set
    End Property


    Public Property Description() As String
        Get
            Return m_Description
        End Get
        Set(ByVal value As String)
            m_Description = value
        End Set
    End Property


    Public Property Status() As Integer
        Get
            Return m_Status
        End Get
        Set(ByVal value As Integer)
            m_Status = value
        End Set
    End Property



    Public Property TotalRecordDownloaded() As Integer
        Get
            Return m_TotalRecordDownloaded
        End Get
        Set(ByVal value As Integer)
            m_TotalRecordDownloaded = value
        End Set
    End Property



    Public Property TotalRecordSent() As Integer
        Get
            Return m_TotalRecordSent
        End Get
        Set(ByVal value As Integer)
            m_TotalRecordSent = value
        End Set
    End Property



    Public Property StatusCode() As Integer
        Get
            Return m_StatusCode
        End Get
        Set(ByVal value As Integer)
            m_StatusCode = value
        End Set
    End Property



    Public Property DownloadDateTime() As Date
        Get
            Return m_DownloadDateTime
        End Get
        Set(ByVal value As Date)
            m_DownloadDateTime = value
        End Set
    End Property

    Public Property StartDateTime() As Date
        Get
            Return m_StartDateTime
        End Get
        Set(ByVal value As Date)
            m_StartDateTime = value
        End Set
    End Property


    Public Property EndDateTime() As Date
        Get
            Return m_EndDateTime
        End Get
        Set(ByVal value As Date)
            m_EndDateTime = value
        End Set
    End Property

    Public Property UpdateDateTime() As Date
        Get
            Return m_UpdateDateTime
        End Get
        Set(ByVal value As Date)
            m_UpdateDateTime = value
        End Set
    End Property




    Public Property UserId() As String
        Get
            Return m_UserId
        End Get
        Set(ByVal value As String)
            m_UserId = value
        End Set
    End Property


    Public Property DownloadUserId() As String
        Get
            Return m_DownloadUserId
        End Get
        Set(ByVal value As String)
            m_DownloadUserId = value
        End Set
    End Property




    Public Property DeviceId() As String
        Get
            Return m_DeviceId
        End Get
        Set(ByVal value As String)
            m_DeviceId = value
        End Set
    End Property

    Public Property ScansCount() As Integer
        Get
            Return m_ScansCount
        End Get
        Set(ByVal value As Integer)
            m_ScansCount = value
        End Set
    End Property



    Public Property ReportData1() As String
        Get
            Return m_ReportData1
        End Get
        Set(ByVal value As String)
            m_ReportData1 = value
        End Set
    End Property


    Public Property ReportData2() As String
        Get
            Return m_ReportData2
        End Get
        Set(ByVal value As String)
            m_ReportData2 = value
        End Set
    End Property


    Public Property ReportData3() As String
        Get
            Return m_ReportData3
        End Get
        Set(ByVal value As String)
            m_ReportData3 = value
        End Set
    End Property


    Public Property ReportData4() As String
        Get
            Return m_ReportData4
        End Get
        Set(ByVal value As String)
            m_ReportData4 = value
        End Set
    End Property



    Public Property ReportData5() As String
        Get
            Return m_ReportData5
        End Get
        Set(ByVal value As String)
            m_ReportData5 = value
        End Set
    End Property


    Public Property ReportData6() As Date
        Get
            Return m_ReportData6
        End Get
        Set(ByVal value As Date)
            m_ReportData6 = value
        End Set
    End Property


    Public Property ReportData7() As Date
        Get
            Return m_ReportData7
        End Get
        Set(ByVal value As Date)
            m_ReportData7 = value
        End Set
    End Property


    Public Property ReportData8() As String
        Get
            Return m_ReportData8
        End Get
        Set(ByVal value As String)
            m_ReportData8 = value
        End Set
    End Property


    Public Property ReportData9() As String
        Get
            Return m_ReportData9
        End Get
        Set(ByVal value As String)
            m_ReportData9 = value
        End Set
    End Property


    Public Property ReportData10() As String
        Get
            Return m_ReportData10
        End Get
        Set(ByVal value As String)
            m_ReportData10 = value
        End Set
    End Property



    Public Property ReportData11() As String
        Get
            Return m_ReportData11
        End Get
        Set(ByVal value As String)
            m_ReportData11 = value
        End Set
    End Property

    Public Property ReportData12() As String
        Get
            Return m_ReportData12
        End Get
        Set(ByVal value As String)
            m_ReportData12 = value
        End Set
    End Property
    Public Property ReportData13() As String
        Get
            Return m_ReportData13
        End Get
        Set(ByVal value As String)
            m_ReportData13 = value
        End Set
    End Property
End Structure

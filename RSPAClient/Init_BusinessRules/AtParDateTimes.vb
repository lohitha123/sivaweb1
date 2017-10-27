Module AtParDateTimes

	' Date Time Format Constants
    Public Const ATPAR_LONGDATETIME = "M/d/yyyy h:m:s"
    Public Const ATPAR_LONGDATETIME_24H = "MM/dd/yyyy HH:mm:ss"
    Public Const ATPAR_LONGDATETIME_STR = "Mdyyyyhms"             'This is used for Cocadinating as a single value( Ex: Lading )
    Public Const ATPAR_SHORTDATE = "M/d/yy"
    Public Const ATPAR_SHORTTIME = "HH:mm"

 'Server
    Public Const ATPAR_ORA_DATETIME_24H = "MM/DD/YYYY HH24:MI:SS"
    Public Const ATPAR_ORA_DATE = "MM/DD/YYYY"
    Public Const ATPAR_ORA_DATE_RR = "MM/DD/RR"

    Public Const ATPAR_FILEDATETIME_24H = "MM-dd-yyyy-HHmmssms"
    Public Const ATPAR_LONGDATE = "MM/dd/yyyy"
    Public Const ATPAR_INFORMIX_DATETIME = "%m/%d/%iY %H:%M:%S"
    Public Const ATPAR_INFORMIX_DATE = "%m/%d/%iy"
    Public Const ATPAR_SAP_DATETIME = "yyyyMMdd"
End Module

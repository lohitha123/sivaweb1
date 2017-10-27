' Database field sizes, should be kept in sync with DB schema changes */
Module AtParDBFieldSizes

    Public Const ATPAR_DBSIZE_USER_ID As Integer = 20
    Public Const ATPAR_DBSIZE_PASSHASH As Integer = 64
    Public Const ATPAR_DBSIZE_ACCESS_TOKEN As Integer = 64
	Public Const ATPAR_DBSIZE_PROFILE_ID As Integer = 30
	Public Const ATPAR_DBSIZE_ORG_GROUP_ID As Integer = 20
    Public Const ATPAR_DBSIZE_DEVICE_ID As Integer = 150
    Public Const ATPAR_DBSIZE_USERDN As Integer = 512
	Public Const ATPAR_DBSIZE_SYSTEM_ID As Integer = 50

End Module

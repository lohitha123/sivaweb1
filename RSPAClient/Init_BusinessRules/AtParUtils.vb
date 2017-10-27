#Region "Imports"
Imports System.Data.SqlClient
Imports Microsoft.ApplicationBlocks.Data
Imports System.Reflection
Imports log4net
Imports System.Text
#End Region

#Region "Bug Fixes"
'SB-0004512 - 10/22/2008
'RT-0004879 - 10/24/2008
'RK-0005010 - 11/02/2008
'DK-0005675 - 02/10/2009
#End Region
Module AtparUtils

    Private ReadOnly log As log4net.ILog = LogManager.GetLogger(GetType(AtparUtils))

	Public Function GetSQLExceptionMessageString(ByVal sqlex As SqlException) As String
        Dim _strSB As New Text.StringBuilder
        For i As Integer = 0 To sqlex.Errors.Count - 1
            _strSB.Append("Index #" & i.ToString() & vbCrLf _
                & "Message: " & sqlex.Errors(i).Message & vbCrLf _
                & "LineNumber: " & sqlex.Errors(i).LineNumber & vbCrLf _
                & "Source: " & sqlex.Errors(i).Source & vbCrLf _
                & "Procedure: " & sqlex.Errors(i).Procedure & vbCrLf)
        Next i
        GetSQLExceptionMessageString = _strSB.ToString
    End Function

End Module

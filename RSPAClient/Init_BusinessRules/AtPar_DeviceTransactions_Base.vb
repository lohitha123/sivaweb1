''' <summary>
''' An Interface that prescribes structure for all the GetHeader related tasks in any application
''' </summary>
''' <remarks>This interface should ONLY be DIRECTLY implemented by AtPar_DeviceTransactions_Base.
''' Applications should only override functions from the base class to provide implementations, they
''' should never directly implement this interface </remarks>
Public Interface IGetHeader
    'Function GetHeader(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Check_GetHeader_InputParameters(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_GetHeader_PreProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_GetHeader_ProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_GetHeader_PostProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
End Interface

''' <summary>
''' An Interface that prescribes structure for all the GetDetails related tasks in any application.
''' </summary>
''' <remarks>This interface should ONLY be DIRECTLY implemented by AtPar_DeviceTransactions_Base.
''' Applications should only override functions from the base class to provide implementations, they
''' should never directly implement this interface </remarks>
Public Interface IGetDetails
    'Function GetDetails(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Check_GetDetails_InputParameters(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_GetDetails_PreProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_GetDetails_ProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_GetDetails_PostProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
End Interface

''' <summary>
''' An Interface that prescribes structure for all the SendDetails related tasks in any application.
''' </summary>
''' <remarks>This interface should ONLY be DIRECTLY implemented by AtPar_DeviceTransactions_Base.
''' Applications should only override functions from the base class to provide implementations, they
''' should never directly implement this interface </remarks>
Public Interface ISendDetails
    'Function SendDetails(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Check_SendDetails_InputParameters(ByRef InputParameters As DataSet, ByRef OutputParameters As DataSet, ByRef DeviceTokenEntry() As String) As Long
    Function Execute_SendDetails_PreProcessTasks(ByRef InputParameters As DataSet, ByRef OutputParameters As DataSet, ByRef DeviceTokenEntry() As String) As Long
    Function Execute_SendDetails_ProcessTasks(ByRef InputParameters As DataSet, ByRef OutputParameters As DataSet, ByRef DeviceTokenEntry() As String) As Long
    Function Execute_SendDetails_PostProcessTasks(ByRef InputParameters As DataSet, ByRef OutputParameters As DataSet, ByRef DeviceTokenEntry() As String) As Long
End Interface

Public Interface IDeleteHeader
    'Function DeleteHeader(ByVal InputParameters As System.Data.DataSet, ByRef OutputParameters As String, ByVal DeviceTokenEntry() As String) As Long
    Function Check_DeleteHeader_InputParameters(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_DeleteHeader_PreProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_DeleteHeader_ProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_DeleteHeader_PostProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
End Interface


''' <summary>
''' An Interface that prescribes structure for all the SearchPOs related tasks in any application
''' </summary>
''' <remarks>This interface should ONLY be DIRECTLY implemented by AtPar_DeviceTransactions_Base.
''' Applications should only override functions from the base class to provide implementations, they
''' should never directly implement this interface </remarks>
Public Interface ISearchHeader
    Function Check_SearchHeader_InputParameters(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SearchHeader_PreProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SearchHeader_ProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SearchHeader_PostProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
End Interface

Public Interface IGetIUTHeader
    Function Check_GetIUTHeader_InputParameters(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_GetIUTHeader_PreProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_GetIUTHeader_ProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_GetIUTHeader_PostProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
End Interface

Public Interface IDeleteIUTHeader
    Function Check_DeleteIUTHeader_InputParameters(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_DeleteIUTHeader_PreProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_DeleteIUTHeader_ProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_DeleteIUTHeader_PostProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
End Interface

Public Interface ISendIUTDetails
    Function Check_SendIUTDetails_InputParameters(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SendIUTDetails_PreProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SendIUTDetails_ProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SendIUTDetails_PostProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
End Interface

Public Interface ISendNonHeader
    Function Check_SendNonHeader_InputParameters(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SendNonHeader_PreProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SendNonHeader_ProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SendNonHeader_PostProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
End Interface

Public Interface ISearchIUTHeader
    Function Check_SearchIUTHeader_InputParameters(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SearchIUTHeader_PreProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SearchIUTHeader_ProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
    Function Execute_SearchIUTHeader_PostProcessTasks(ByVal InputParameters As DataSet, ByRef OutputParameters As DataSet, ByVal DeviceTokenEntry() As String) As Long
End Interface

Public Class AtPar_DeviceTransactions_Base
    Inherits AtPar_Application_Base


End Class

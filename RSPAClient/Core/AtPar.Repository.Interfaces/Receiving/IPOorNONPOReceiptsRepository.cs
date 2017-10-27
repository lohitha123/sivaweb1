using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Receiving
{
    public interface IPOorNONPOReceiptsRepository
    {
        int CheckIfPoDownlodedForSameUser(string businessUnit, string iutOrder, string userID);
        bool CheckIfPoAlreadyDownloaded(string businessUnit, string poID, string userID);
        List<MT_ATPAR_RECALL_INFO> GetRecallitems(string poItems);
        bool checkDeliver();
        bool CheckShipToIDAllocation(string shiptoID, string orgGroupID, string userID);
        int GetExistingDetailTransForPOItem(string businessUnit, string poID, string lineNo, string scheduleNo);
        bool IsProductInstalled(int appID);
        Tuple<DataSet, DataRow, long> UpdateDeliverTransactions(string[] deviceTokenEntry, DataRow dr, DataSet inputparameters);
        Tuple<DataRow, long> SaveReceiptBoxInfo(DataRow dr, int transactionID);
        Dictionary<string, object> GetReceivePrerequisites(string orgID, string userID, string enterpriseSystem, string profileID);
        long InsertReceiveDeviationDetails(Receive_Deviation_Details_Entity deviationDetailsEntity);
        long InsertIUTReceiveDeviationDetails(IUT_RECV_Deviation_Details_Entity deviationDetailsEntity);
        long InsertReceiveDeviationHeader(Receive_Deviation_Header_Entity deviationHeaderEntity);
        List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetDeptLevelInfo(string location, string businessUnit, string orgGroupID, string vendorID, string orderDate);
        List<PAR_MNGT_ORDER_DETAILS> GetPtwyOrderDtls(string businessUnit, string location, string vendorID, string orderDt);
        long InsertDeviationDtls(int ordNo, string itemID, string storageLocation, Double qtyOrdered, Double qtyReceived, DateTime ptwyDt);
        long UpdateParMngtOrderDtls(Double qtyReceived, int orderStatus, int ordNo, string lineNo, string itemID, string transID = "");
        List<MT_POU_CART_INVENTORY> GetCartInventory(string BusinessUnit, DataRow dataRow);
        long UpdateCartInventory(Double dblConvFactor, string qtyRound, DataRow dataRow, string bUnit, string comp);
        long SaveInventoryTrackHistory(int transID, int eventType, int uniqueID, string bUnit, string cartID, string itemID, string compartment, string lotID, string serialID, double qty, double QOH, string endDate);
        long InsertCartInventory(DataRow dataRow, string bUnit, string location, string itemID, double dblConvFactor, string qtyRound);
        long InsertDeviationHeaderDtls(int ordNo, string userID, string deviceID, string location, string bUnit, DateTime ptwyDt);
        long SaveNotesDetails(DataTable notesData);
        long InsertIUTReceiveDeviationHeader(IUT_RECV_Deviation_Header_Entity deviationHeaderEntity);
        Tuple<List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>> GetPrintHeaderItemDetails();
        string GetBusinessUnit(string bUnit, string[] deviceTokenEntry);
        int GetInitBusinessUnitCount(DataSet inputParameters);
        int GetPtwyBusinessUnitCount(DataSet inputParameters);
        List<RM_USER_LOCATIONS> GetBadgeDetails(string recpName);
        bool checkIfTrackingExists(string trackingNo);
    }
}

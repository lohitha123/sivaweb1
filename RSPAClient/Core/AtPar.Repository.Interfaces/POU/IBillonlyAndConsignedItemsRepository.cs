using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
  public interface IBillonlyAndConsignedItemsRepository
    {
        // string GetERPName();

        Dictionary<string, object> GetConsignmentItemOrderReports(string ItemID, string vendorId, string departmentId, string businessUnit, string cartId, string startDate, string endDate, string poNumber,string[] deviceTokenEntry);
        long UpdateNonCatalogItemDtls(VM_SEARCHITEM_DETAILS itemDetails, string userID);
        long UpdateItemStatus(int transID, string itemID, string status);
        List<PAR_MNGT_VENDOR> GetVendorsInfo(string orgGrpID);
        long UpdateConsignmentItemOrderReports(string transID, string itemID, bool vendorResponse, bool approverResponse, bool reviewerResponse, decimal itemPrice, string workflowInstanceID, string responseFrom, string uom, string deptID, string lotID, string serialID, int lineNo, string comments,string reviewerType,string userID);
    }
}

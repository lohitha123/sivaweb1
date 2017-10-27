using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
   public interface ICreateOrdersRepository
    {
        List<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, string[] deviceTokenEntry, string locationType = "", string cartType = "");
        List<VM_POU_CART_ITEM_SUBSTITUTE> GetItemQOH(string bUnit, string cartID, string itemID);
        Double GettingSubItemsQOH(string businessUnit, string cartID, string itemID, string compartment);
        List<MT_ATPAR_ITEM_ATTRIBUTES> GetItemAttributes(string bUnit, string cartID);
        string GetStorageArea(string deptID, string orgGrpID);
        int GetParLocations(string cartID, string bUnit);
        string GetReplinish(string bUnit, string cartID);
        bool CheckPerpectual(string bUnit, string cartID);
        long InsertOrderHeaders(long orderNo, string bUnit, string cartID, string vendorID, int appID, string inventoryOrderFlg);
        long InsertOrderDetails(bool perpectualMMIS, long orderNo, int lineNo, string itemID, string compartmentID, double countQty,
            string uom, double qoh);
        long UpdateOrderDetails(long remStatus, string orderIds);
        string GetVendorEmail(string vendorID, string[] deviceTokenEntry);
        List<MT_POU_DEPT_CART_ALLOCATIONS> GetDeptInfo(string bUnit, string cartID, int appID);
        List<PAR_MNGT_PAR_LOC_HEADER> GetParLocDetails(string bUnit, string cartID, int appID);
        List<MT_ATPAR_USER> GetBatchUserInfo();
        int GetAccountNum(string itemID, string[] deviceTokenEntry);
        List<PAR_MNGT_ITEM> GetItemDetails(string itemID, string[] deviceTokenEntry);
    }
}

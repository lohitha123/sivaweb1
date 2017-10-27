#region Usings
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic; 
#endregion

namespace AtPar.Service.Interfaces.POU
{
    public interface IConsignmentItemsService
    {
        AtParWebApiResponse<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID);
        AtParWebApiResponse<VM_MT_POU_DEPT_CARTS> GetUserdepartmentsCarts(string userID, string orgGrpID, string locationType = "");
        AtParWebApiResponse<MT_POU_NONCART_ITEMS> GetConsignmentItems(string businessUnit, string cartID, string itemID, string itemDescription);
        AtParWebApiResponse<long> AddConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems);
        AtParWebApiResponse<long> UpdateConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems);
        AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefID, string procID = "");
        AtParWebApiResponse<VM_INVENTORY_CART_ITEMS> GetItemsAdjustQty(string bUnit, string cartID, string itemID, string compartment, string userID, string orgGrpID, string systemID);
        AtParWebApiResponse<long> UpdateCartInventory(List<VM_INVENTORY_ITEMS_TABLE> lstCartInvItemList);
    }
}
 
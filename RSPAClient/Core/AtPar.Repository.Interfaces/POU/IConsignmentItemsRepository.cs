#region Usings
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;

#endregion

namespace AtPar.Repository.Interfaces.POU
{
    public interface IConsignmentItemsRepository
    {
        List<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID);
        List<VM_MT_POU_DEPT_CARTS> GetUserdepartmentsCarts(string userID, string orgGrpID, string locationType = "");
        List<MT_POU_NONCART_ITEMS> GetConsignmentItems(string businessUnit, string cartID, string itemID, string itemDescription);
        long AddConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems);
        long UpdateConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems);
        List<MT_POU_NONCART_ITEMS> GetNonCartItems(string bUnit, string cartID);
        long UpdateCartInventory(List<VM_INVENTORY_ITEMS_TABLE> lstCartInvItemList);
    }
}

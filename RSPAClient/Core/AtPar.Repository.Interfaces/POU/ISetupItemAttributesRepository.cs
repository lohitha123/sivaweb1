
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.POU
{
    public interface ISetupItemAttributesRepository
    {
        Tuple<long, List<string>> SaveDeptItemAttributes(List<VM_MT_POU_ITEM_ATTRIBUTES> lstItemAtributes, string deptID, string bUnit, string locationType, string itemID, string orgGrpID, string userID);

        string GetStorageArea(string deptID, string orgGrpID);
     
        List<MT_POU_CRITICAL_ITEMS> GetCriticalItems(string cartID, string bUnit);
     
        List<MT_POU_DEPT_CART_ALLOCATIONS> GetDeptCartAllocations(string orgGrpID);
        List<MT_POU_CART_INVENTORY> GetCartInventory(string bUnit);
        List<MT_ATPAR_ITEM_ATTRIBUTES> GetItemAttributes(string bUnit, string cartID, string orgGroupID, string itemID);
      
    }
}

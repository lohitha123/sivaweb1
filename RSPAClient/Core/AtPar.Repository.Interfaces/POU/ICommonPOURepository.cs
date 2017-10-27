using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;

namespace AtPar.Repository.Interfaces.POU
{
    public interface ICommonPOURepository
    {

        //poucart header
        List<string> GetBUnits(string orgGrpID);

        //pou
        string GetLocationType(string bUnit, string cartID, string locType="");

        List<MT_ATPAR_ITEM_ATTRIBUTES> GetItnAttr(string bUnit, string cartID);
        string GetStorageArea(string deptID, string orgGrpID);

        List<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefID, string procID = "");

        List<VM_MT_POU_DEPT_CARTS> GetAllocatedCarts(string businessUnit, string deptID, int appID, string locationType = "");

        List<MT_POU_NONCART_ITEMS> GetNonCartItems(string bUnit, string cartID);

        List<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID);

        List<MT_POU_DEPT_WORKSTATIONS> GetCartWorkstations(string departmentID, string cartId, string orgGrpID, int appID);

        List<VM_SEARCHITEM_DETAILS> GetCartDetails(string strSearch, string strManufacuturer, string strDescription, bool blnScanflag, string[] deviceTokenEntry, bool isPeopleSoft = true);

        Tuple<long, DataSet> GetCaseItemsProperties(string strCaseItems);

        List<VM_SEARCHITEM_DETAILS> SearchItemInNonCart(string strSearch, string strManufacuturer, string strDescription, bool blnScanflag, string[] deviceTokenEntry);

        List<VM_SEARCHITEM_DETAILS> SearchItemInAllocatedCarts(string strSearch, string[] deviceTokenEntry);


    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace AtPar.Service.Interfaces.POU
{
    public interface ICommonPOUService
    {

        Tuple<long, DataSet> GetCartDetails(string cartID, string bUnit, DataSet cartDetailsDS, string orgGrpID, string systemID, string profileID = "", string locationType = "", StringBuilder syncData = null, string syncFlag = "", int appID = 15, string deptID = "");

        Tuple<long, DataSet> GetCart_Headers(string orgGrpID, string[] deviceTokenEntry, string locationType = "", int appID = 15);

        AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefID, string procID = "");

        AtParWebApiResponse<VM_DEPARTMENT_CART_ITEMS> GetDepartmentItems(string deptID, string orgGrpID, string[] deviceTokenEntry);

        AtParWebApiResponse<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID);

        AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS> GetCartWorkstations(string departmentID, string cartId, string orgGrpID, int pAppID, string[] deviceTokenEntry);

        AtParWebApiResponse<VM_SEARCHITEM_DETAILS> SearchInERPItemMaster(string strItemID,string[] deviceTokenEntry);

        AtParWebApiResponse<VM_SEARCHITEM_DETAILS> SearchItem(string pStrItemID, int pAppID, string[] pDeviceTokenEntry, bool pBlnScanFlag = false, string pStrFileType = "", bool pBlnLocSelection = false, DataSet pdsInputParams = null);
    }
}

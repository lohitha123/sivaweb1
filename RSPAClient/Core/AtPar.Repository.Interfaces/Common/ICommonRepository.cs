//using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Common
{
    public interface ICommonRepository
    {
        MT_ATPAR_STATUS GetStatusMessage(long statusCode);
        string GetAuditAllowed(string userId, int appId, string menuCode, string enterpriseSystem);
        MT_ATPAR_SECURITY_PARAMS GetSecurityParams();
        List<MT_ATPAR_SYSTEM_DB> GetSystemIDs(string pSystemID);
        long InsertAuditData(List<MT_ATPAR_SECURITY_AUDIT> securityAudit, string user, string function);
        List<MT_ATPAR_USER> GetOrgsList(string appId, string orgGrpId);
        int GetUserscount(string UserId, string appId);
        List<MT_ATPAR_USER> GetUsersList(string appID, string userID);
        List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> GetConfigData(List<string> lstConfigVariables);
        string GetMyPreferences(string preference, string userID);
        List<string> GetOrgBusinessUnits(string OrgGrpId, int BusinessUnitType);
        List<MT_ATPAR_ORG_GROUPS> GetAllUserOrgGroups();
        List<MT_ATPAR_ORG_GROUPS> GetOrgDetails(string userID);
        long InsertAuditInfo(short appId, string functionName, string subFunctionName, string keys, string updateUserId, string fieldName, string oldValue, string newValue);
        List<MT_ATPAR_AUDIT_SCREEN_CONTROLS> GetAuditFields(short appId, string functionName);
        List<MT_ATPAR_ORG_GROUPS> GetUserOrgGroups(string user, string orgGrpID);

        // BUnits 
        long ProcessBUnits(List<VM_ATPAR_IBU_ALLOCATION> lstBUnits, string userID, string appID, string serverUserID);
        long ProcessSelectedBUnits(List<VM_ATPAR_IBU_ALLOCATION> lstBUnits, string userID, string appID, string serverUserID);
        List<MT_ATPAR_IBU_ALLOCATION> GetBUnits(string appId);
        //       
        List<MT_ATPAR_APP> GetApps(string userID);
        List<MT_ATPAR_ORG_GROUPS> GetOrgGrpIDs(string userID, string orgGrpID, string name);
        List<MT_ATPAR_PROFILE> GetProfiles(string userID);
        int GetServerAccessCnt(string userID, string profileID);
        int GetClientAccessCnt(string userID, string profileID);
        List<MT_ATPAR_SETUP_PRO_PRINTERES> GetPrintersData(string appID, string printerName);
        List<VM_MT_ATPAR_ORG_GROUP_PARAMETERS> GetAppParameters(string userID, string orgGrpID, string appID);
        bool CheckRecall();
        long SaveAppParameters(string orgGrpID, string appID, string user, List<MT_ATPAR_ORG_GROUP_PARAMETERS> lstAppParams);
        List<MT_ATPAR_ORG_GROUPS> GetOrgGroupIDS();
        List<object> GetTableDataDynamic(object tablename, string keyColumns);
        List<MT_ATPAR_ORG_GROUP_BUNITS> GetOrgBUnits(string userID, string orgGrpID);
        List<string> GetAtParVersions(string[] deviceTokenEntry);

        //receiving - 'ship to ids' module related
        string GetUserOrgGroupId(string userId);
        List<string> GetUserOrgGroupList(string orgGrpId);
        List<string> GetOrgGroupBUnitsAll(string orgGrpID, string businessUnitType);
        List<string> GetOrgGroupBUnitsSelected(List<string> orgGrpIds, string businessUnitType);
        string GetUserOrgGrpID(string userID);
        string GetOrgGroupParamValue(string orgParamName, int appID, string orgGroupID);
        void GetOrgGroupParamValues(SortedList<string, string> orgParams, int appID, string orgGroupID);
        void GetProfileParamValues(SortedList<string, string> profParams, int appID, string profileID);
        string GetProfileParamValue(string profileID, int appID, string parameterID);
        string GetUserParamValue(string userID, int appID, string parameterID);
        List<string> GetListViewDetails(string appID, string screenName, string profileID);
        void GetUserParamValues(SortedList<string, string> userParams, int appID, string UserID);
        long GetAtparLatestValues(int appID, string fieldName);
        long InsertTransaction(AtPar_Transaction_Entity transactionDetails);
        long UpdateTransaction(AtPar_Transaction_Entity transactionDetails);
        long GetTransactionId(int AppID);
        long GetTransactionID(int appID, long clientTransactionID, string deviceID = "", string downloadDateTime = "");

        List<MT_CRCT_CRITICAL_ITEMS> GetCriticalItems(string bUnit, string cartID);
        long Check_CartAllocation(string userID, string bUnit, string cartID, DateTime currentDay);

        Tuple<List<MT_ATPAR_TRANSACTION>, string> GetReleaseOrdersSP(int appID, string userID, string bUnit, string ordNO, string orgGroupID);
        long UpdateTransactionStatus(int appID, string userID, string transID = "");
        string GetOrgGroupName(string orgGrpID);
        List<string> GetBusinessUnits(string orgID, string orgValue, string businessUnitType);
        string GetOrgGroupId(string userID);
        int CheckUser(string userID);
        List<MT_ATPAR_USER> GetLdapUsers(List<MT_ATPAR_USER> lstUsers);
        long AddUser(VM_MT_ATPAR_USER_ADD user, string strEnterpriseSystem);

        List<MT_ATPAR_APP> GetProfile(string profileID);
        List<VM_MT_ATPAR_PROFILE_APP_MENUS> GetProfileAppMenus(string profileID, string enterpriseSystem);
        List<VM_MT_ATPAR_PROFILE_APP_PARAMETERS> GetProfileAppParameters(string profileID, string enterpriseSystem);
        List<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY> GetProfileScreenDisplay(string profileID, string enterpriseSystem);
        int GetClientUserCount(string profileID);
        int GetServerUserCount(string profileID);
        int GetProfileIdCount(string profileID);
        List<MT_ATPAR_ORG_GROUP_BUNITS> GetBusinessUnits(string orgGroupID = "", string inventoryType = "");
       


        List<PAR_MNGT_PAR_LOC_HEADER> GetLocByOrgId(string orgID);
        List<string> GetOrgIds(string userID);
        List<MT_POU_DEPT> GetDepartment(string departmentID, string deptDescr, string orgGrpID);
        List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetWorkstations(string departmentID, string cartID, string orgGrpID, int appID);


        List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetAllocatedCartWorkstations(string departmentID, string cartID, string orgGrpID, int appID);
        long GetTransactionStatus(SortedList<string, string> transactions, int appID, string deviceID = "", string downloadDateTime = "");
        Tuple<List<MT_ATPAR_SETUP_PRO_PRINTERES>, long> GetNiceLabelsPrintersData(int appID, string status, string printerType);

        int GetReceiveIDCount(string businessUnit, string iutID, string[] deviceTokenEntry);
        int GetPutawayIDCount(string businessUnit, string iutID, string[] deviceTokenEntry);
        List<VM_MT_POU_USER_DEPARTMENTS> GetUserDepartments(string userID, string orgGrpID);

        List<VM_POU_PHYSICIANS_BY_PREF_OR_PROC> GetPhysiciansByPrefOrProc(int flag);
        long InsertDetailTransaction(AtPar_Detail_Transaction_Entity transactionDetails);
        //long InsertDetailTransaction(AtPar_Detail_Transaction_Entity transactionDetails, ATPAR_MT_Context objContext);

        //pou
        string GetLocationType(string bUnit, string cartID);
        List<MT_ATPAR_ITEM_ATTRIBUTES> GetItnAttr(string bUnit, string cartID);
        string GetStorageArea(string deptID, string orgGrpID);
        List<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefID, string procID = "");
        long InsertDeviation(AtPar_Deviation_Entity deviationDetails);

        List<MT_POU_PHYSICIAN> GetPhysicians();
        List<MT_POU_PREF_LIST_HEADER> GetPrefList(string id, string descr, string deptID, string procCode, string physicians, int statusFlag = 0);
        List<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES> GetCodes(string codeType, string code, string descr);
        List<PAR_MNGT_ITEM> GetItems(string ItemID, string OrgId, string AppID);

        List<string> GetCostCenterOrgIds(string userID);
        long UpdateOrderDetails(List<VM_POU_ORDER_DETAILS> lstOrderDetails);
        List<PAR_MNGT_VENDOR> GetAtparVendors(string strOrgGrpID);

        //UpdateDepts
        long InsertPouDept(List<MT_POU_DEPT> lstDept);
        long UpdatePouDept(List<MT_POU_DEPT> lstDept, int appID);
        List<MT_ATPAR_IBU_ALLOCATION> GetBUs(string appID);
        List<MT_ATPAR_ITEM_ATTRIBUTES> GetItemAttributes(string bUnit, string cartID);
        long GetTransactionId(short appID, dynamic trans = null);
        List<MT_CYCT_EVENT_HDR> GetEventIds(string bunit, string userID, string[] deviceTokenEntry);

        List<MT_ATPAR_SYSTEM_DB> GetRptSystemIDs();
        string GetUserFullName(string UserId);
        Tuple<DataSet, long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID);
    }
}

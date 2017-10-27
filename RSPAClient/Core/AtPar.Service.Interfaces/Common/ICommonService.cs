using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Common
{
    public interface ICommonService
    {
        AtParWebApiResponse<MT_ATPAR_SYSTEM_DB> GetSystemIDs(string pSystemID);
        AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS> GetSecurityParams();
        AtParWebApiResponse<string> GetAuditAllowed(string userId, int appId, string menuCode, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT> InsertAuditData(List<MT_ATPAR_SECURITY_AUDIT> audit, string user, string function, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_USER> GetUsersList(string userID, string appID, string orgGrpID, params string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetUserOrgGroups(string user, string orgGrpID, string[] deviceTokenEntry);
        AtParWebApiResponse<string> GetMyPreferences(string preference, string uId, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_APP> GetApps(string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetOrgGrpIDs(string userID, string orgGrpID, string name);
        AtParWebApiResponse<MT_ATPAR_PROFILE> GetProfiles(string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<int> GetServerAccessCnt(string userID, string profileID, string[] deviceTokenEntry);
        AtParWebApiResponse<int> GetClientAccessCnt(string userID, string profileID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES> GetPrintersData(string appID, string printerName, string[] deviceTokenEntry);
        AtParWebApiResponse<VM_MT_ATPAR_ORG_GROUP_PARAMETERS> GetAppParameters(string userID, string orgGrpID, string appID, string[] deviceTokenEntry);
        AtParWebApiResponse<bool> CheckRecall();
        AtParWebApiResponse<MT_ATPAR_ORG_GROUP_PARAMETERS> SaveAppParameters(string orgGrpID, string appID, string user, List<MT_ATPAR_ORG_GROUP_PARAMETERS> lstAppParams, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION> AllocateBUnits(string AppId, string UserId, string ServerUserId, List<VM_ATPAR_IBU_ALLOCATION> lstbunitsAllocation, bool Searched, params string[] DeviceTokenEntry);
        AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits(string[] BArray, string AppId, string UserID, string BUnit, string Description, string ServerUserID, params string[] DeviceTokenEntry);
        AtParWebApiResponse<SSL_CONFIG_DETAILS> GetSSLConfigDetails();
        AtParWebApiResponse<SSL_CONFIG_DETAILS> DoAuditData(string userId, short appId, string functionName, List<VM_MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstAuditData);
        AtParWebApiResponse<string> GetOrgBusinessUnits(string OrgGrpId, int BusinessUnitType, params string[] DeviceTokenEntry);
        AtParWebApiResponse<string> GetOrgGroupBUnits(string userId, string orgGrpId, string businessUnitType);
        AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetOrgGroupIDS(string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS> GetOrgBUnits(string userID, string orgGrpID, string[] deviceTokenEntry);
        List<string> GetAtParVesrions(string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetOrgDetails(string userID);
        AtParWebApiResponse<MT_ATPAR_USER_ORG_GROUPS> GetUserOrgGrpID(string pUserId);
        AtParWebApiResponse<long> GetAtparLatestValues(int appID, string fieldName);
        AtParWebApiResponse<VM_MT_ATPAR_LOCATIONS> GetLocations(string orgGrpID, string status, string locID, string locName, string[] deviceTokenEntry);
        AtParWebApiResponse<long> UpdateLocIDStatus(string orgGrpID, bool status, string locID, string[] deviceTokenEntry);

        AtParWebApiResponse<long> GetCartItemsInfo(string orgGroupID, string businessUnit, string cartID, string serverUser, params string[] deviceTokenEntry);
        AtParWebApiResponse<string> GetOrgGroupParamValue(string orgParamName, int appID, string orgGroupID);
        AtParWebApiResponse<MT_ATPAR_TRANSACTION> GetReleaseOrders(int appID, string userID, string bUnit, string ordNO, string[] deviceTokenEntry, string orgGroupID, string lFlag = "", string transID = "");
        AtParWebApiResponse<string> GetOrgGroupName(string orgGrpID);
        AtParWebApiResponse<string> GetBusinessUnits(string userID, string busineesUnitType);
        AtParWebApiResponse<string> GetEnterpriseSystem();
        AtParWebApiResponse<MT_ATPAR_USER> CheckUser(string userID);
        AtParWebApiResponse<MT_ATPAR_USER> GetLdapUsers(string userID, string strSearchFilter, string strEntryLimit);
        AtParWebApiResponse<string> GetProfileParamValue(string profileID, int appID, string parameterID);
        AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> AddUser(VM_MT_ATPAR_USER_ADD user);
        AtParWebApiResponse<long> GetProfileInfo(string profileID);
        AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS> GetOrgGroupBusinessUnits(string orgGroupID = "", string inventoryType = "");

        AtParWebApiResponse<PAR_MNGT_PAR_LOC_HEADER> GetLocByOrgId(string orgID);
        AtParWebApiResponse<string> GetOrgIds(string userID);
        AtParWebApiResponse<MT_POU_DEPT> GetDepartment(string departmentID, string deptDescr, string orgGrpID);


        AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS> GetUserDepartments(string userID, string orgGrpID);
        AtParWebApiResponse<VM_POU_PHYSICIANS_BY_PREF_OR_PROC> GetPhysiciansByPrefOrProc(int flag);
        AtParWebApiResponse<string> GetServerIP();

        AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES> GetNiceLabelsPrintersData(int appID, string status, string printerType);

        AtParWebApiResponse<MT_POU_PHYSICIAN> GetPhysicians();
        AtParWebApiResponse<MT_POU_PREF_LIST_HEADER> GetPrefList(string id, string descr, string deptID, string procCode, string physicians, int statusFlag = 0);
        AtParWebApiResponse<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES> GetCodes(string codeType, string code, string descr);


        AtParWebApiResponse<PAR_MNGT_ITEM> GetItems(string ItemID, string OrgId, string AppID);

        AtParWebApiResponse<string> GetCostCenterOrgIds(string userID);

        AtParWebApiResponse<long> UpdateOrderDetails(List<VM_POU_ORDER_DETAILS> lstOrderDetails, string[] deviceTokenEntry);
        AtParWebApiResponse<PAR_MNGT_VENDOR> GetAtparVendors(string strOrgGrpID);

        AtParWebApiResponse<long> InsertPouDept(List<MT_POU_DEPT> lstDept);
        AtParWebApiResponse<long> UpdatePouDept(List<MT_POU_DEPT> lstDept, int appID);
        DataTable ProcessBillingData(DataSet billingDS, string systemID, string orgGroupID = "");
        AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUs(string userID, string[] bArray, string appID, string selectedUserID, string[] deviceTokenEntry, string bUnit = "", string descr = "");

        AtParWebApiResponse<long> SendEmbeddedEmail(string systemID, string subject, string bodyText, string toAddress, string imageName, string deliverSign, string mailPriority, string attachment);

        AtParWebApiResponse<long> SendEmail(string systemID, string subject, string bodyText, string toAddress, string mailPriority, string attachment);
        AtParWebApiResponse<MT_CYCT_EVENT_HDR> GetEventIds(string bUnit, string userID, string[] deviceTokenEntry);
        long ConvertColumnType(ref DataSet ds);
        AtParWebApiResponse<string> GetUserFullName(string userID);
        AtParWebApiResponse<long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID);
    }
}

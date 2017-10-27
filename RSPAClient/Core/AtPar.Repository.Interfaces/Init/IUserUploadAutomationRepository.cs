using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IUserUploadAutomationRepository
    {
        string GetProfileID(string profileID);
        Tuple<long, bool> CheckLDAPUser(string userID);
        long Do_UpdateLoadedUser(VM_MT_ATPAR_USER_ADD user, DataRow row, bool updateParameter);
        long SetUserParam(DataRow Row, string userID, string clientAddress, string updateUser);
        long DeleteUserParams(string userID);
        long InsertOrgGroups(string user, List<MT_ATPAR_ORG_GROUPS> lstOrgData);
        long UpdateOrgGroups(string user, List<MT_ATPAR_ORG_GROUPS> lstOrgData);
        long InsertListofOrgBuData(string user, List<MT_ATPAR_ORG_GROUP_BUNITS> lstBuData);
        long InsertOrgBuData(string user, MT_ATPAR_ORG_GROUP_BUNITS orgBuData);
        long DeleteOrgBuData(string user, MT_ATPAR_ORG_GROUP_BUNITS orgBuData);
        long InsertOrgGrpParams(string user, string lotSel, MT_ATPAR_ORG_GROUP_PARAMETERS orgGrpParams);
        long UpdateOrgGrpParams(string user, string lotSel, MT_ATPAR_ORG_GROUP_PARAMETERS orgGrpParams);
        int GetProfilecount(string profileID);
        long SaveProfileUsersInfo(string mode, string profileID, string profileDescr, string userID,
          string clientAddr, bool strAlterProfileCtoS, string strEnterpriseSystem, List<MT_ATPAR_PROFILE_APP_ACL> lstProfiles,
          List<MT_ATPAR_PROFILE_MENU> lstMenus, List<MT_ATPAR_PROFILE_PARAMETERS> lstParams,
          List<MT_ATPAR_PROFILE_LIST_VIEW> lstScreenDisplay, bool blnUserUpload = false);

    }
}

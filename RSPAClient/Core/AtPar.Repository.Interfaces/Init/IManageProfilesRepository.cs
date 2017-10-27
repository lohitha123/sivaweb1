using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IManageProfilesRepository
    {
        long AddProfileInfo(string profileID, string profileDescr, Dictionary<string, dynamic> dictProfile, string userID, string clientAddr, string enterpriseSystem, bool alterProfileCtoS);
        int GetClientUserCount(string profileID);
        List<VM_MT_ATPAR_PROFILE_APP_MENUS> GetProfileAppMenus(string profileID, string enterpriseSystem);
        List<VM_MT_ATPAR_PROFILE_APP_PARAMETERS> GetProfileAppParameters(string profileID, string enterpriseSystem);
        int GetProfileIdCount(string profileID);
        List<MT_ATPAR_APP> GetProfiles(string profileID);
        List<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY> GetProfileScreenDisplay(string profileID, string enterpriseSystem);
        int GetServerUserCount(string profileID);
        long UpdateProfileInfo(string profileID, string profileDescr, Dictionary<string, dynamic> dictProfile, int appID, string userID, string clientAddr, string enterpriseSystem, bool alterProfileCtoS);
        bool GetProfileType(string profileID);
        List<VM_MT_ATPAR_USER_ADD> GetUsersList(string profileID);
        long updateReportsUserRole(string strUserId, bool blnReportsDesign, bool blnDashboardDesign);

    }
}
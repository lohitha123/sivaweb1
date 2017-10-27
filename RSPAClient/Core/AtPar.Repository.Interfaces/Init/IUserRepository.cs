
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IUserRepository
    {
        List<MT_ATPAR_USER_PROFILE_APP_ACL> GetAppRoleIDs(string UserId);
        List<VM_GROUP_MENUS_LIST> GetGroupMenusList(string enterpriseSystem, string profileID,string userID);
        VM_MT_ATPAR_USER_PROFILE GetUser(string userId);
        List<MT_ATPAR_APP> GetApps(string userID);
        List<MT_ATPAR_APP_GROUP> GetAppGroups();
        List<MT_ATPAR_USER> GetAllUsers();
        long SaveUserDetails(VM_MT_ATPAR_USER_PROFILE user);
        List<VM_USER_STATUS> GetUserStatus(string serverUserID, string userID, string firstName, string lastName,
                                                  string status, string orgGroupID, string profileID);
        long UpdateUserStatus(string serverUserID, string userID, string status);
        List<VM_REPORTS_MENUS_LIST> GetReportsMenusList(string enterpriseSystem, string orgGroupID, string userID);
        MT_ATPAR_APP GetReportsApp();
    }
}

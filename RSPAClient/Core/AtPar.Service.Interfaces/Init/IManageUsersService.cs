using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.Init
{
    public interface IManageUsersService
    {
        AtParWebApiResponse<MT_ATPAR_PROFILE_MENU> IsMenuAssigned(string userID, string profileID, string chkMenuName);

        AtParWebApiResponse<VM_MT_ATPAR_USER> GetManageUsers(string userID, string orgId, string profileId, string searchId);

        AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL_ORG> GetUsers(string userID, string orgId, string profileId, string searchId);

        AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> UpdateUser(VM_MT_ATPAR_USER_ADD arrlstUsers);

        AtParWebApiResponse<VM_MT_ATPAR_USER> GetUserDetails(string userID);

        AtParWebApiResponse<MT_ATPAR_USER> RefreshUserDN(string strUser, string userFname, string userLname);
    }
}

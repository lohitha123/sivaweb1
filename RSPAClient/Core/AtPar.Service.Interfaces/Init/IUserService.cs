using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IUserService
    {
        AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL> GetAppRoleIDs(string UserId);
        AtParWebApiResponse<long> GetGroupMenusList( string profileID,string userID);
        AtParWebApiResponse<VM_MT_ATPAR_USER_PROFILE> GetUser(string userId);
        AtParWebApiResponse<MT_ATPAR_USER> GetAllUsers();
        AtParWebApiResponse<long> SaveUserDetails(VM_MT_ATPAR_USER_PROFILE user);
        AtParWebApiResponse<VM_USER_STATUS> GetUserStatus(string serverUserID, string userID, string firstName, string lastName,
                                                  string status, string orgGroupID, string profileID);
        AtParWebApiResponse<long> UpdateUserStatus(string serverUserID, string userID, string status);

    }
}

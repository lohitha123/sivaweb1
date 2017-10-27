using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
   public interface IManageUsersRepository
    {
        int IsMenuAssigned(string userID, string profileID, string chkMenuName);

        List<VM_MT_ATPAR_USER> GetManageUsers(string userID, string orgId, string profileId, string searchId);

        List<MT_ATPAR_USER_PROFILE_APP_ACL_ORG> GetUsers(string userID, string orgId, string profileId, string searchId);

        long UpdateUser(VM_MT_ATPAR_USER_ADD arrlstUsers, string enterpriseSystem);

        long GetUserDetails(string userID);      
    }
}

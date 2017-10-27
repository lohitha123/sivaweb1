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
    public interface IAddUserService
    {
        AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> AddUser(VM_MT_ATPAR_USER_ADD user);
        AtParWebApiResponse<MT_ATPAR_USER> CheckUser(string userID);
        AtParWebApiResponse<MT_ATPAR_PROFILE_APP_ACL> CheckProfileAppACL(string userID, string profileID, int accessType);
        AtParWebApiResponse<VM_MT_ATPAR_USER_ACL_ADD> SaveLdapUsers(string userID, string sessionTime, string idleTime, string orgGrpId, string profileID, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers);
        AtParWebApiResponse<AtParKeyValuePair> PopulateConfigData();
        AtParWebApiResponse<MT_ATPAR_USER> GetLdapUsers(string userID, string strSearchFilter, string strEntryLimit);

    }
}

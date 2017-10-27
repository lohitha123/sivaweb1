using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IAddUserRepository
    {
        
        int CheckUser(string userID);
        long AddUser(VM_MT_ATPAR_USER_ADD user,string strEnterpriseSystem);
        int CheckProfileAppACL(string userID, string profileID, int accessType);
        long SaveLdapUsers(string userID, string sessionTime, string idleTime, string orgGrpId, string profileID, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers,string strEnterpriseSystem);
                
        // long InsertListofUserDetails(string profileID, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers);
        // long InsertListofUserAclDetails(string sessionTime, string idleTime, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers);
        //  long InsertListofUserOrgDetails(string profileID, string orgGrpId, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers);
        //  long InsertProfileParams(string profileID, string orgGrpId, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers, List<MT_ATPAR_PARAM_MASTER> lstProfileParams);
        // long InsertUserDetails(string profileID, VM_MT_ATPAR_USER_ACL_ADD userDtls);
        // long InsertUserAclDetails(string sessionTime, string idleTime, VM_MT_ATPAR_USER_ACL_ADD userDtls);
        // long InsertUserOrgDetails(string profileID, string orgGrpId, VM_MT_ATPAR_USER_ACL_ADD userDtls);
        // List<MT_ATPAR_PARAM_MASTER> GetUserParams(string profileID);

        List<MT_ATPAR_USER> GetLdapUsers(List<MT_ATPAR_USER> lstUsers);

        long InsertRegReportUser(VM_MT_ATPAR_USER_ADD User);
        long InsertLadapReportUser(List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers, string orgGrpId);
        bool IsServerProfile(string ProfileId);


    }
}

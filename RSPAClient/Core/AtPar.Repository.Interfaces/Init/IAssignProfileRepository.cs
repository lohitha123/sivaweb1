using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IAssignProfileRepository
    {
        string GetSecurityParamVal(string userId);
        List<VM_MT_ATPAR_PROF_USER> GetProfileUsersInfo(string userID, string uID, string lDap, string fName, string lOrg, string profileID, string orgGrpID);
        long SaveProfileUsersInfo(List<VM_MT_ATPAR_USER> lstProfUserInfo, string profile, string orgGrp, string uId,string enterpriseSystem);
    }
}

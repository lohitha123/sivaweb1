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
    public interface IAssignProfileService
    {
       
        AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS> GetSecurityParamVal(string userId, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_USER> SaveProfileUsersInfo(List<VM_MT_ATPAR_USER> lstProfUserInfo, string profile, string orgGrp, string uId);
        AtParWebApiResponse<VM_MT_ATPAR_PROF_USER> GetProfileUsersInfo(string userID, string uID, string lDap, string fName, string lOrg, string profileID, string orgGrpID);
    }
}

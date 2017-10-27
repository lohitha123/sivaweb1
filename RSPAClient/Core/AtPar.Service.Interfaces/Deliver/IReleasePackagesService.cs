using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.Deliver
{
    public interface IReleasePackagesService
    {
        AtParWebApiResponse<VM_RELEASEPACKAGES> GetReleasePackages(int appId, string userId, string orgGroupId, string bunit, string trckNoOrPoIdOrLoc, string[] deviceTokenEntry, string flag = "", string transId = "");
    }
}
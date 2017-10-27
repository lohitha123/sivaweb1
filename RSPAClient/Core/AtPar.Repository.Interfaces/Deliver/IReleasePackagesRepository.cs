using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.Deliver
{
    public interface IReleasePackagesRepository
    {
       
        List<VM_RELEASEPACKAGES> GetReleasePackages(int appId, string userId, string orgGroupId, string bunit, string trckNoOrPoIdOrLoc,
            string[] deviceTokenEntry, string flag = "", string transId = "");
        
      
    }
}
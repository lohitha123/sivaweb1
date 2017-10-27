using AtPar.Common;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Init
{
    public interface ISetupLocationsService
    {
        AtParWebApiResponse<long> InsertUpdateLocIDs(List<VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS> locIDS, string mode, string newOrgID, string[] deviceTokenEntry);
    }
}

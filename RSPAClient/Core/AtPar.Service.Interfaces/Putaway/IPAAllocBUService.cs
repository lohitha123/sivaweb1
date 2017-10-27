using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.Putaway
{
    public interface IPAAllocBUService
    {
        AtParWebApiResponse<MT_PTWY_BU_ALLOCATION> AllocateBUnits(string userId, string serverUserId, List<MT_PTWY_BU_ALLOCATION> lstbunitsAllocation, bool searched, params string[] deviceTokenEntry);
        AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits(string[] businessUnitsArray, string userID, string bUnit, string description, string serverUserID, params string[] deviceTokenEntry);
    }
}

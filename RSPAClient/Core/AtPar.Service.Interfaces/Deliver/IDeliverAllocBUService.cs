using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.Deliver
{
    public interface IDeliverAllocBUService
    {
        AtParWebApiResponse<MT_DELV_BU_ALLOCATION> AllocateBUnits(string userId, string serverUserId, List<MT_DELV_BU_ALLOCATION> lstbunitsAllocation, bool searched, params string[] deviceTokenEntry);
        AtParWebApiResponse<MT_DELV_BU_ALLOCATION> GetBUnits(string[] businessUnitsArray, string userID, string bUnit, string description, string serverUserID, params string[] deviceTokenEntry);
    }
}
using AtPar.Common;
using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Init
{
    public interface IAllocateLocationGroupsService
    {
        AtParWebApiResponse<long> CopyLocationDetails(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string copyToUserId, string userId, string orgGroupID, string locationGroupId, string clientIP, short appId);
        AtParWebApiResponse<long> DeleteLocationDetails(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroupDetails, string orgGroupID, string locationGroupId, string userId, short appId);
        AtParWebApiResponse<MT_ATPAR_LOC_GROUPS> GetLocationGroups(string orgGroupID, string userId, string locationGroupId, string displayMode, short appId);
        AtParWebApiResponse<long> InsertLocationGroups(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string orgGroupID, string locationGroupId, string assignedUserId, string userId, string clientIP, short appId);
        AtParWebApiResponse<long> MoveLocationDetails(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string fromUserId, string toUserId, string orgGroupID, string locationGroupId, string userId, string clientIP, short appId);

    }
}

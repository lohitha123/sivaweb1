using AtPar.POCOEntities;
using System;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IAllocateLocationGroupsRepository
    {
        long DeleteLocationDetails(string orgGroupID, string locationGroupId, string userID, short appId);
        List<MT_ATPAR_LOC_GROUPS> GetActiveLocationGroups(string orgGroupID, string locationGroupId);
        List<MT_ATPAR_LOC_GROUP_ALLOCATION> GetLocationGroupsAssignedToUser(string orgGroupID, string userId, short appId);
        List<MT_ATPAR_LOC_GROUP_ALLOCATION> GetLocGroupUsers(string orgGroupID, string locationGroupId,short appId);
        long InsertLocationDetails(string orgGroupID, string locationGroupId, string userID, string toUserId, string clientIP, short appId);
        long InsertLocationGroups(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string orgGroupID, string locationGroupId, string assignedUserId, string userID, string clientIP, short appId);
        Boolean IsLocationExists(string orgGroupID, string locationGroupId, string selectedUserId, short appId);
    }
}

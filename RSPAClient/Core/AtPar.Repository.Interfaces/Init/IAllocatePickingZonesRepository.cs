using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IAllocatePickingZonesRepository
    {
        List<MT_ATPAR_STORAGE_ZONE> GetActiveStorageZones(string orgGroupId);
        List<MT_ATPAR_STORAGE_ZONES_ALLOCATION> GetAllocatedStorageZones(string orgGroupId, string storageZoneId, string userId, short appId);
        List<MT_ATPAR_STORAGE_ZONES_ALLOCATION> GetStorageZoneUsers(string orgGroupId, string storageZoneId);
        long InsertUserStorageZones(List<MT_ATPAR_STORAGE_ZONE> lstAllocatedStorageZones, string orgGroupId,
                                    string storageZoneId, string assignedUserId, string userId, short appId);
    }
}

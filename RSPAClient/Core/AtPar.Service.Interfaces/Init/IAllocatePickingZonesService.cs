using AtPar.Common;
using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Init
{
    public interface IAllocatePickingZonesService
    {
        AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE> GetUserStorageZones(string orgGroupId, string storageZoneId, string userId, short appId);
        AtParWebApiResponse<long> InsertUserStorageZones(List<MT_ATPAR_STORAGE_ZONE> lstAllocatedStorageZones, string orgGroupId,
                                                         string storageZoneId, string assignedUserId, string userId, short appId);
    }
}

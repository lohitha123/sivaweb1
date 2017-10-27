using AtPar.Common;
using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Init
{
    public interface ISetupStorageLocationGroupsService
    {
        AtParWebApiResponse<MT_ATPAR_ZONE_STORAGE_LEVELS> GetZoneStorageLevelDetails(string orgGroupID, string zoneGroupID, string bUnit, string area, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> InsertStorageZoneGroups(string zoneID, string zoneDescr, string userID, string orgID);
        AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE> GetStorageZoneGroups(string zoneGrpID, string zoneGrpDescr, string orgID);
        AtParWebApiResponse<long> UpdateZones(string zoneID, string zoneDescr, int status, string orgGrpID);
        AtParWebApiResponse<long> InsertzoneStorageLevels(string userID, string orgGroupID, string zoneGroupID, List<MT_ATPAR_ZONE_STORAGE_LEVELS> lstZoneStorageLevels);
    }
}

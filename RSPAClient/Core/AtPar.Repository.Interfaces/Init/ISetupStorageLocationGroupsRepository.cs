using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.Init
{
    public interface ISetupStorageLocationGroupsRepository
    {
        int GetBusinessUnitCount(string orgGroupID, string bUnit);
        List<MT_ATPAR_ZONE_STORAGE_LEVELS> GetZoneStorageLevels(string zoneGroupID, string orgGroupID, string bUnit, string area);
        int GetStorageZoneCount(string zoneID, string orgID);
        long InsertStorageZone(string orgID, string zoneID, string zoneDescr, string userID);
        List<MT_ATPAR_STORAGE_ZONE> GetStorageZoneGroups(string zoneGrpID, string zoneGrpDescr, string orgID);
        long UpdateZones(string zoneID, string zoneDescr, int status, string orgGrpID);
        long InsertzoneStorageLevels(string userID, string orgGroupID, string zoneGroupID, List<MT_ATPAR_ZONE_STORAGE_LEVELS> lstZoneStorageLevels);
       
    }
}

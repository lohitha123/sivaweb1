using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.Init
{
    public interface ISetupLocationGroupsRepository
    {
        int GetLocGroupsCount(string orgID, string groupID);
        long InsertLocGroups(string orgID, string groupID, string groupDescr, string userID);
        long GetLocGroupAllocationCount(string locGrpID, string orgGrpID);
        long UpdateLocGroups(int status, string locGrpID, string orgGrpID);
        List<MT_ATPAR_LOC_GROUPS> GetLocationGroups(string locGrpID, string locGrpDescr, string orgID);
        long InsertLocationDetails(string orgID, string locGroupID, string clientIP, string orgGroupID, string userID, List<VM_MT_ATPAR_SETUP_LOCATIONGROUPS> lstLocGroups);
        List<MT_DELV_EXCLUDE_LOC> GetExcludedLocations();
        int GetBUnitCount(string orgGroupID, string bUnit);
        List<MT_ATPAR_LOC_GROUP_MEMBERS> GetLocGroupMembers(string locGroupID, string orgGroupID, string bUnit, string locID);
    }
}

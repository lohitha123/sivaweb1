using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;
using System.Data;

namespace AtPar.Service.Interfaces.Init
{
    public interface ISetupLocationGroupsService
    {
        AtParWebApiResponse<long> InsertLocationGroups(string orgID, string groupID, string groupDescr, string userID);
        AtParWebApiResponse<long> UpdateLocationGroups(int status, string locGrpID, string orgGrpID);
        AtParWebApiResponse<MT_ATPAR_LOC_GROUPS> GetLocationGroups(string locGrpID, string locGrpDescr, string orgID);
        AtParWebApiResponse<long> InsertLocationDetails(string orgID, string locGroupID, string clientIP, string orgGroupID, string userID, List<VM_MT_ATPAR_SETUP_LOCATIONGROUPS> lstLocGroups);
        AtParWebApiResponse<MT_DELV_EXCLUDE_LOC> GetExcludedLocations();
        AtParWebApiResponse<VM_MT_ATPAR_LOCATION_DETAILS> GetLocationDetails(string bUnit, string locID, int appID, string userID, string orgGroupID, string locGroupID, string[] deviceTokenEntry);
    }
}

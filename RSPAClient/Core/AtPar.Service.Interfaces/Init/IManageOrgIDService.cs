using AtPar.Common;
using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Init
{
    public interface IManageOrgIDService
    {
        AtParWebApiResponse<RM_ORG_UNITS> GetOrgUnits(string userId, string orgId,
                                                      string orgType, string orgName,
                                                      string status, string[] deviceTokenEntry);

        AtParWebApiResponse<long> UpdateOrgIDStatus(string userId, string orgId,
                                                    string orgType, bool status,
                                                    string[] pDeviceTokenEntry);

        AtParWebApiResponse<long> InsertUpdateOrgUnits(string userId, List<RM_ORG_UNITS> lstOrgUnits,
                                                       string mode, string newType, string[] deviceTokenEntry);
        

        AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetOrgGrpIDs(string userId, string orgGrpId,
                                                              string name, string[] deviceTokenEntry);
    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Init
{
    public interface IManageOrgGroupsService
    {
        AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> SaveOrgGroupsInfo(string orgGrpID, string orgGrpName, string prvOrgID, string user);
        AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> UpdateOrgGroupsInfo(string orgGrpName, string prvOrgID, string user);
        AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS> SaveOrgGroupsBUnits(string userID, string orgGrpId, List<MT_ATPAR_ORG_GROUP_BUNITS> lstOrgGrpParams);
    }
}

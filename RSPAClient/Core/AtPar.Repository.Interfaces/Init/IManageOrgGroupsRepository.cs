using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IManageOrgGroupsRepository
    {
        long SaveOrgGroupsInfo(string orgGrpID, string orgGrpName, string user, string enterpriseSystem);
        long UpdateOrgGroupsInfo(string orgGrpName, string prvOrgID, string user);
        long SaveOrgGroupsBUnits(string userID, string orgGrpID, List<MT_ATPAR_ORG_GROUP_BUNITS> lstOrgGrpParams);
    }
}

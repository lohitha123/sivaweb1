using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IManageOrgIDRepository
    {
        List<MT_ATPAR_ORG_GROUPS> GetOrgGrpIDs(string userId, string orgGrpId, string name);
    }
}

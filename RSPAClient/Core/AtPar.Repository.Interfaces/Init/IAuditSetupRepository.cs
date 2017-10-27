using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces
{
    public interface IAuditSetupRepository
    {
        List<MT_ATPAR_MENUS> GetAppMenus(int appID,string enterpriseSystem);
        long SaveAuditSetUpInfo(List<MT_ATPAR_MENUS> lstMenu, string user, string enterpriseSystem);
    }
}

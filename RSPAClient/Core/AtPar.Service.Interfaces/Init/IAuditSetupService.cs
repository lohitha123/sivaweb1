using AtPar.Common;
using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces
{
    public interface IAuditSetupService
    {
        AtParWebApiResponse<MT_ATPAR_MENUS> GetAppMenus( int appID);
        AtParWebApiResponse<long> SaveAuditSetUpInfo(List<MT_ATPAR_MENUS> lstMenu, string user);
    }
}

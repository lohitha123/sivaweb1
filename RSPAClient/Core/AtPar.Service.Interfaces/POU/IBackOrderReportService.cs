using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IBackOrderReportService
    {
        AtParWebApiResponse<long> GetBackOrderReportData(string pStrBusinessUnit, string pStrCartId, string pStrUserId, string pStrFromDate, string pStrToDate, string pOrgGrpID, int pAppID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, string locationType = "", string cartType = "", params string[] deviceTokenEntry);
    }
}

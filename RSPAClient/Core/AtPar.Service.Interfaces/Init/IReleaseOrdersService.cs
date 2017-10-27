using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IReleaseOrdersService
    {

        AtParWebApiResponse<MT_ATPAR_TRANSACTION> GetReleaseOrders(int appID, string userID,
            string bUnit, string ordNo, string orgGrpID, bool updateRequired, string transID,
            params string[] deviceTokenEntry);

    }
}

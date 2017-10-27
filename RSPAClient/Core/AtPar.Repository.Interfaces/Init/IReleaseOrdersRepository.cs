using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IReleaseOrdersRepository
    {
        long UpdateTransactionStatus(int AppId, string UserId, string TransId = "");
        Tuple<List<MT_ATPAR_TRANSACTION>, string> GetReleaseOrders(int AppId, string UserId, string Bunit, string OrdNo, string OrgGrpID);

    }
}

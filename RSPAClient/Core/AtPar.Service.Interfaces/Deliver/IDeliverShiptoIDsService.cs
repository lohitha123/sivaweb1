using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Deliver
{
    public interface IDeliverShiptoIDsService
    {
        AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION> AllocateShiptoIDs(string serverUserID, List<MT_DELV_SHIPTO_ID_ALLOCATION> lstShiptoIDs);
        AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION> GetOrgGrpShiptoIDs(string orgGroupID, string serverUserID, params string[] deviceTokenEntry);
    }
}

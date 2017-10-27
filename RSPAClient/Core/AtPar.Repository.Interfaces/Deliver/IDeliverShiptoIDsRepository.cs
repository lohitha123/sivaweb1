using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Deliver
{
    public interface IDeliverShiptoIDsRepository
    {
        List<MT_DELV_SHIPTO_ID_ALLOCATION> GetOrgGrpShiptoIDs(string orgGroupID);
        long ProcessShiptoIDs(List<MT_DELV_SHIPTO_ID_ALLOCATION> lstShiptoIDs);
    }
}

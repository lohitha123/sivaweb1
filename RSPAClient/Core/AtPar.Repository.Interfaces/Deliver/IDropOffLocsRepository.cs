using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Deliver
{
    public interface IDropOffLocsRepository
    {
        long EditUpdateDropOffLocs(string drpLocID, string locDesc, string orgGroupID, string userID, string prevLocID);
        List<MT_DELV_LOC_DETAILS> GetDropOffLocs(string locID, string locDesc, string orgGroupID);
        long InsertDropOffLocs(MT_DELV_LOC_DETAILS location);
        long IsDropOffLocExistOrNot(string locID, string orgGroupID);
        long UpdateDropOffLocs(int status, string orgGroupID, string locID, string userID);
    }
}

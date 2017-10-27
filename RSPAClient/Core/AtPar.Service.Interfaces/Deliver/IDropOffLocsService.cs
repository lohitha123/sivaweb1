using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Deliver
{
    public interface IDropOffLocsService
    {
        AtParWebApiResponse<MT_DELV_LOC_DETAILS> EditUpdateDropOffLocs(string drpLocID, string locDesc, string orgGroupID, string userID, string prevLocID);
        AtParWebApiResponse<MT_DELV_LOC_DETAILS> GetDropOffLocs(string locID, string locDesc, string orgGroupID);
        AtParWebApiResponse<MT_DELV_LOC_DETAILS> InsertDropOffLocs(MT_DELV_LOC_DETAILS location);
        AtParWebApiResponse<long> UpdateDropOffLocs(int status, string orgGroupID, string locID, string userID);
    }
}

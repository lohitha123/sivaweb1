using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.Deliver
{
    public interface IExcludeLocsService
    {
        AtParWebApiResponse<MT_DELV_EXCLUDE_LOC> ExcludeLocs(List<MT_DELV_EXCLUDE_LOC> lstLocs, params string[] deviceTokenEntry);
        AtParWebApiResponse<MT_DELV_EXCLUDE_LOC> GetAllLocations(string setID, string location, params string[] deviceTokenEntry);
    }
}
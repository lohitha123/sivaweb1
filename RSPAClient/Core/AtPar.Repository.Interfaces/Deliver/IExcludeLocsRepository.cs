using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.Deliver
{
    public interface IExcludeLocsRepository
    {
        List<MT_DELV_EXCLUDE_LOC> GetLocations();
        long ProcessLocations(List<MT_DELV_EXCLUDE_LOC> lstLocations, string serverUserID);
    }
}
using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.Deliver
{
    public interface IDeliverAllocBURepository
    {
        List<MT_DELV_BU_ALLOCATION> GetBUnits();
        long ProcessBUnits(List<MT_DELV_BU_ALLOCATION> lstBUnits, string userID, string serverUserID);
        long ProcessSelectedBUnits(List<MT_DELV_BU_ALLOCATION> lstBUnits, string userID, string serverUserID);
    }
}
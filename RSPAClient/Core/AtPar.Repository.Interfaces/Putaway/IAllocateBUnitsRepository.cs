using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Putaway
{
    public interface IAllocateBUnitsRepository
    {
        List<MT_PTWY_BU_ALLOCATION> GetBUnits();
        long ProcessBUnits(List<MT_PTWY_BU_ALLOCATION> lstBUnits, string userID, string serverUserID);
        long ProcessSelectedBUnits(List<MT_PTWY_BU_ALLOCATION> lstBUnits, string userID, string serverUserID);
    }
}

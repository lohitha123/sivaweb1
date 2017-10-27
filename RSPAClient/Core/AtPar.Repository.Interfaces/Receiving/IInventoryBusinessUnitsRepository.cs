using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Receiving
{
   public interface IInventoryBusinessUnitsRepository
    {
        List<MT_ATPAR_IBU_ALLOCATION> GetBUnits(string appId);
        long ProcessBUnits(List<MT_ATPAR_IBU_ALLOCATION> lstBUnits, string userID, string appID, string serverUserID);
        long ProcessSelectedBUnits(List<MT_ATPAR_IBU_ALLOCATION> lstBUnits, string userID, string appID, string serverUserID);


    }
}

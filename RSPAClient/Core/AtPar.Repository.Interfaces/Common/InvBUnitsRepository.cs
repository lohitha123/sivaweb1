using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.Common
{
    public interface InvBUnitsRepository
    {
        List<MT_ATPAR_IBU_ALLOCATION> GetBUnits(string appId);
        long ProcessBUnits(List<VM_ATPAR_IBU_ALLOCATION> lstBUnits, string userID, string appID, string serverUserID);
        long ProcessSelectedBUnits(List<VM_ATPAR_IBU_ALLOCATION> lstBUnits, string userID, string appID, string serverUserID);
    }
}

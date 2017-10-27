using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.StockIssue
{
    public interface IAllocateDestinationLocationsRepository
    {
        List<string> GetDistinctBusinessUnits(int appID, string userList);
        List<MT_STIS_DEST_LOC_ALLOCATION> GetDestinationLocations();
        long ProcessDestLocations(List<MT_STIS_DEST_LOC_ALLOCATION> lstLocations, string selectedUserID, string userID);
       long ProcessSelectedLocations(List<MT_STIS_DEST_LOC_ALLOCATION> lstLocations, string bUnit, string selectedUserID, string userID);
    }
}

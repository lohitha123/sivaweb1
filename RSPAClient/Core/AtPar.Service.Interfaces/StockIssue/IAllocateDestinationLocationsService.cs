using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.StockIssue
{
    public interface IAllocateDestinationLocationsService
    {

        AtParWebApiResponse<string> GetAllocInvBUnits(int appID, string userID, string orgGrpID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION> AllocatedDestLocations(string userID, string selectedUserID, List<MT_STIS_DEST_LOC_ALLOCATION> lstLocations, bool searched, string bUnit, params string[] deviceTokenEntry);

        AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION> GetDestinationLocations(string[] bArray, string location, string userID,
                                                                string orgGroupID, string serverUserID, string[] deviceTokenEntry);
    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface ITransactionHistoryReportService
    {
        AtParWebApiResponse<long> GetInventoryTrackHistoryReport(string startDate, string endDate,
            string bUnit, string parLoc, string itemID, string orgID, bool negInventory
            , int appID, string[] deviceTokenEntry);

        AtParWebApiResponse<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS> GetDeptAllocCarts(string businessUnit, string cartId, int display, string locationType, int appId, string orgGrpID, string[] deviceTokenEntry);

    }
}

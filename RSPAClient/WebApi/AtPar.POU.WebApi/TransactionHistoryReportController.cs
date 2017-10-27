using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.POU.WebApi
{
   public class TransactionHistoryReportController : ApiController
    {
        private ILog _log;
        private ITransactionHistoryReportService _service;
        public TransactionHistoryReportController(ILog log, ITransactionHistoryReportService service)
        {
            _log = log;
            _service = service;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetInventoryTrackHistoryReport(string startDate, string endDate,
            string bUnit, string parLoc, string itemID, string orgID, bool negInventory
            , int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetInventoryTrackHistoryReport( startDate,  endDate,
             bUnit,  parLoc,  itemID,  orgID,  negInventory
            ,  appID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS> GetDeptAllocCarts(string businessUnit, string cartId, int display, string locationType, int appId, string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var response = _service.GetDeptAllocCarts(businessUnit, cartId, display, locationType, appId, orgGrpID, deviceTokenEntry);
            return response;
        }

    }
}

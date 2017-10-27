using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using log4net;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class QuantityOnHandReportController :ApiController
    {
        private ILog _log;
        private IQuantityOnHandReportService _service;
        public QuantityOnHandReportController(ILog log, IQuantityOnHandReportService service)
        {
            _log = log;
            _service = service;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetQtyOnHandReportData(string businessUnit, string cartID,
            string itemID, string vendID, string userID,
            string serialNumber, bool negativeStatus,
            string lotNumber,
            string orgGrpID, int appID,[FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetQtyOnHandReportData(businessUnit, cartID,
             itemID, vendID, userID,
             serialNumber, negativeStatus,
             lotNumber,
             orgGrpID, appID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetUserdepartmentsitems(string userID, string orgGrpID,
            bool synchInvCarts, int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetUserdepartmentsitems( userID,  orgGrpID,
             synchInvCarts,  appID, deviceTokenEntry);
            return result;
        }
    }
}

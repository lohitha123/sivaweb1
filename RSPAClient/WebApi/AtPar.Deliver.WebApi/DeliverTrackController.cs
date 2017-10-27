using AtPar.Common;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using System.Web.Http;

namespace AtPar.Deliver.WebApi
{
    public class DeliverTrackController : ApiController
    {
        private IDeliverTrackService _service;
        private ILog _log;
        public DeliverTrackController(ILog log, IDeliverTrackService service)
        {
            _service = service;
            _log = log;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetDeliveryTrackingReportData(string trackNo, string poId, string deptID, string fromDate, string toDate, string vendorName, string itemDesc, string itemID, string carrierID, string strDeliveryLoc, string requestor, string receiver, string selectedStatus, string currentStatus, string systemID, string locDescr)
        {
            var result = _service.GetDeliveryTrackingReportData(trackNo, poId, deptID, fromDate, toDate, vendorName, itemDesc, itemID, carrierID, strDeliveryLoc, requestor, receiver, selectedStatus, currentStatus, systemID, locDescr);
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<long> ValidateSystemID(string systemID)
        {
            var result = _service.ValidateSystemID(systemID);
            return result;
        }
    }
}

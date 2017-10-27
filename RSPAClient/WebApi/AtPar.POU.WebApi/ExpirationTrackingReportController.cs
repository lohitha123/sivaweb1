using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class ExpirationTrackingReportController : ApiController
    {
        private ILog _log;
        private IExpirationTrackingReportService _service;
        public ExpirationTrackingReportController(ILog log, IExpirationTrackingReportService service)
        {
            _log = log;
            _service = service;
            _log.SetLoggerType(typeof(ExpirationTrackingReportController));
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetExpirationTrackingReport(string orgGrpID, [FromUri] string[] deviceTokenEntry,
            int duration, string fromDate, string toDate,
            string deptID, int appID, string cartID)
        {
            var result = _service.GetExpirationTrackingReport(orgGrpID, deviceTokenEntry,
             duration, fromDate, toDate,
             deptID, appID, cartID);
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<long> GetExpItemCnt(string orgGrpID, string userID,
             int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetExpItemCnt(orgGrpID, userID,
              appID, deviceTokenEntry);
            return result;
        }

        public AtParWebApiResponse<VM_GetDeptCartAllocations> GetDeptCartAllocations(string businessUnit, string deptID, int appID, string locType, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetDeptCartAllocations(businessUnit, deptID,appID, locType, deviceTokenEntry);
            return result;
        }
    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class DeliveryTrackITReportController : ApiController
    {
        #region Private Variable

        private IDeliveryReportService _delreportService;
        private ILog _log;

        #endregion

        #region Constructor

        public DeliveryTrackITReportController(IDeliveryReportService delreportService, ILog log)
        {
            _delreportService = delreportService;
            _log = log;
            _log.SetLoggerType(typeof(DeliveryTrackITReportController));
        }

        #endregion

        #region Public Methods

        

        [HttpGet]
        public AtParWebApiResponse<long> GetTkITDeliverReport(string fromDate, string toDate, string request, string recipient, string userId, string departmentId, string itemId, string vendorName, string descr, string location,
         string reqId, string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _delreportService.GetTkITDeliverReport( fromDate,  toDate,  request,  recipient,  userId,  departmentId,  itemId,  vendorName,  descr,  location,
          reqId,  status,deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetRequestors(bool inactiveStatusChk, [FromUri] string[] deviceTokenEntry)
        {
            var result = _delreportService.GetRequestors(inactiveStatusChk, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetTKITDepts(string deptID,  string status, [FromUri] string[] deviceTokenEntry)
        {

            var result = _delreportService.GetTKITDepts(deptID, status, deviceTokenEntry);
            return result;

        }



        #endregion
    }
}

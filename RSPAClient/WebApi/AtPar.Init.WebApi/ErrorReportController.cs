using AtPar.Common;
using AtPar.Service.Interfaces.Init;
using log4net;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class ErrorReportController : ApiController
    {
        private ILog _log;
        private IErrorReportService _service;
        public ErrorReportController(ILog log, IErrorReportService service)
        {
            _log = log;
            _service = service;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetErrorReport(string userID, string fromDate, string toDate,[FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetErrorReport( userID,  fromDate,  toDate,  deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> PopulateConfigData([FromUri]string[] deviceTokenEntry)
        {
            var result = _service.PopulateConfigData( deviceTokenEntry);
            return result;
        }
    }
}

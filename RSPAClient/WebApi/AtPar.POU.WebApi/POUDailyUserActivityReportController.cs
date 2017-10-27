using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using log4net;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class POUDailyUserActivityReportController : ApiController
    {
        private ILog _log;
        private IDailyUserActivityReportService _service;
        public POUDailyUserActivityReportController(ILog log, IDailyUserActivityReportService service)
        {
            _log = log;
            _service = service;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetDailyUserActivityRep(string userID, string transType, string date, int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetDailyUserActivityRep( userID,  transType,  date,  appID,  deviceTokenEntry);
            return result;
        }
    }
}

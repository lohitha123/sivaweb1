using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using log4net;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class LowStockReportController : ApiController
    {
        private ILowStockReportService _service;
        private ILog _log;
        public LowStockReportController(ILowStockReportService service, ILog log)
        {
            _service = service;
            _log = log;
        }
        [HttpGet]
        public AtParWebApiResponse<long> GetLowStockRep(string orgGrpID, int appID,[FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetLowStockRep(orgGrpID, appID, deviceTokenEntry);
            return result;
        }
    }
}

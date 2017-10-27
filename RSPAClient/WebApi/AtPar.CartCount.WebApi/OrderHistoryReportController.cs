using AtPar.Common;
using AtPar.Service.Interfaces.CartCount;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.CartCount.WebApi
{
    public class OrderHistoryReportController : ApiController
    {
        private IOrderHistoryReportService _service;
        private ILog _log;
        public OrderHistoryReportController(IOrderHistoryReportService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(OrderHistoryReportController));
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetOrderHistoryRep(string user, string bUnit, string parLoc, string orgGroup, string profileID,[FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetOrderHistoryRep(user, bUnit, parLoc, orgGroup, profileID, deviceTokenEntry);
            return result;
        }
    }
}

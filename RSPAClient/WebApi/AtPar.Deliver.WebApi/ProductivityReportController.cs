using AtPar.Common;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Deliver.WebApi
{
   public class ProductivityReportController : ApiController
    {
        private ILog _log;
        private IProductivityReportService _service;
        public ProductivityReportController(ILog log , IProductivityReportService service)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(ProductivityReportController));
        }

        [HttpGet]
      public  AtParWebApiResponse<long> GetCycleTimeReport(string orgGroupID, string fromDate, string toDate,
            string userID, string startEvent, string endEvent,
           [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetCycleTimeReport(orgGroupID, fromDate, toDate,
             userID, startEvent, endEvent,
             deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetProductivityReport(string orgGroupID, string fromDate,
            string todate, string userID, int interval, string fTime, string toTime)
        {
            var result = _service.GetProductivityReport( orgGroupID,  fromDate,
             todate,  userID,  interval,  fTime,  toTime);
            return result;
        }
    }
}

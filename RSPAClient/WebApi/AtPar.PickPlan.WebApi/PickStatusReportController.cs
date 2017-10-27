using AtPar.Common;
using AtPar.Service.Interfaces.PickPlan;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.PickPlan.WebApi
{
   public class PickStatusReportController : ApiController
    {
        private ILog _log;
        private IPickStatusReportService _service;
        public PickStatusReportController(ILog log, IPickStatusReportService service)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(PickStatusReportController));
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetPickstatusReport(string inputXml,[FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetPickstatusReport(inputXml, deviceTokenEntry);
            return result;
        }
    }
}

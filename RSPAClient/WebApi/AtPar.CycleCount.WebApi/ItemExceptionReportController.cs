using AtPar.Common;
using AtPar.Service.Interfaces.CycleCount;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.CycleCount.WebApi
{
    public class ItemExceptionReportController : ApiController
    {
        private ILog _log;
        private IItemExceptionReportService _service;
        public ItemExceptionReportController(ILog log, IItemExceptionReportService service)
        {
            _log = log;
            _service = service;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetCycleExceptionReport(string bUnit, string eventID,
            string itemID, string fromDate, string toDate, string orgGrpId)
        {
            var result = _service.GetCycleExceptionReport( bUnit,  eventID,
             itemID,  fromDate,  toDate,  orgGrpId);
            return result;
        }
    }
}

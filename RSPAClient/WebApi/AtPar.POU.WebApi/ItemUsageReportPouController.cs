using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
   public class ItemUsageReportPouController : ApiController
    {
        private ILog _log;
        private IItemUsageReportService _service;
        public ItemUsageReportPouController(ILog log, IItemUsageReportService service)
        {
            _log = log;
            _service = service;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetItemUsageReport(string businessUnit, string cartID,
            string itemID, string fromDate, string toDate, int appID)
        {
            var result = _service.GetItemUsageReport( businessUnit,  cartID,
             itemID,  fromDate,  toDate,  appID);
            return result;
        }
    }
}

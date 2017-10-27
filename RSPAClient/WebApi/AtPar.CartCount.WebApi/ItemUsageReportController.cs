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
    public class ItemUsageReportController : ApiController
    {
        private IItemUsageReportService _service;
        private ILog _log;
        public ItemUsageReportController(IItemUsageReportService service,ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(ItemUsageReportController));
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetItemUsageDetails(string itemID, string fDate, string toDate, string bUnit, string cartId, string srvrUserID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetItemUsageDetails(itemID, fDate, toDate, bUnit, cartId, srvrUserID, deviceTokenEntry);
            return result;
        }
    }
}

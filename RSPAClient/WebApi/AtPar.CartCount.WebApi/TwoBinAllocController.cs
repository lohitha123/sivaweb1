using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtPar.CartCount.WebApi
{
    public class TwoBinAllocController : ApiController
    {
        private ITwoBinAlloService _Service;
        private ILog _log;

        public TwoBinAllocController(ITwoBinAlloService Service, ILog log)
        {
            _Service = Service;
            _log = log;
            _log.SetLoggerType(typeof(TwoBinAllocController));

        }

        [HttpGet]
        public AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION> GetTwoBinCartsAllocation(string bUnit, string cartID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetTwoBinCartsAllocation(bUnit, cartID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION> TwoBinSaving(List<MT_CRCT_TWO_BIN_ALLOCATION> lstTwoBins, string bUnit, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.TwoBinSaving(lstTwoBins, bUnit);
            return result;
        }
    }
}

using AtPar.Common;
using AtPar.Service.Interfaces.Init;
using AtPar.Service.Interfaces.RFID;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.RFID.WebApi
{
    public class RFIDUtilsController:ApiController
    {
        private IRFIDUtilsService _objRFIDUtilsService;
        private ILog _log;

        public RFIDUtilsController(ILog log, IRFIDUtilsService objRFIDUtilsService)
        {
            _objRFIDUtilsService = objRFIDUtilsService;
            _log = log;

        }

        [HttpGet]
        public AtParWebApiResponse<bool> CheckTokenValidity([FromUri]string[] deviceTokenEntry)
        {
            var result = _objRFIDUtilsService.CheckTokenValidity(deviceTokenEntry);
            return result;
        }
    }
}

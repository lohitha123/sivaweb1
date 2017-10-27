using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.CycleCount;
using log4net;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.CycleCount.WebApi
{
   public class GetHeaderController:ApiController
    {
        private IGetHeaderService _service;
        private ILog _log;

        public GetHeaderController(IGetHeaderService service, ILog log)
        {
            _log = log;
            _service = service;
            _log.SetLoggerType(typeof(AllocateEventsController));
        }

        [HttpGet]
        public AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER> GetHeader(string inputParameters,[FromUri] string[] deviceTokenEntry )
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
         
                  
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Before Calling Business Service Method"); }
            System.Data.DataSet myDataSet = JsonConvert.DeserializeObject<System.Data.DataSet>(inputParameters);
            var status = _service.GetHeader(myDataSet, deviceTokenEntry);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "After Calling Business Service Method"); }
            return status;
        }
    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.CycleCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.CycleCount.WebApi
{
    public class AllocateEventsController : ApiController
    {
        #region Private Variable

        private IAllocateEventsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public AllocateEventsController(IAllocateEventsService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(AllocateEventsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_CYCT_EVENT_HEADER_OUTPUT> GetAllocateEvents(string userID, string bUnit,
                                                                string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetAllocateEvents(userID, bUnit, orgGroupID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<object> AllocateEvents([FromBody] List<VM_CYCT_EVENT_HEADER_OUTPUT> lstEventDetails, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.AllocateEvents(lstEventDetails, deviceTokenEntry);
            return result;
        }

        #endregion

    }
}

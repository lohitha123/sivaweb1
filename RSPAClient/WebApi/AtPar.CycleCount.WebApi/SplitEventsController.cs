
using AtPar.Common;
using AtPar.POCOEntities;
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
    public class SplitEventsController : ApiController
    {
        #region Private Variable

        private ISplitEventsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public SplitEventsController(ISplitEventsService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(SplitEventsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<bool> CheckForSplit(string eventID, string bUnit, bool checkSplit, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var response = _service.CheckForSplit(eventID, bUnit, checkSplit, userID, deviceTokenEntry);
            return response;
        }

        [HttpGet]
        public AtParWebApiResponse<long> SplitEvents(string bUnit, string eventID, int noOfSubEvents, string userID, string profileID, string orgGroupID, string orderBy, string fromLoc, string toLoc, [FromUri] string[] deviceTokenEntry)
        {
            var response = _service.SplitEvent(bUnit, eventID, noOfSubEvents, userID, profileID, orgGroupID, orderBy, fromLoc, toLoc, deviceTokenEntry);
            return response;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER> GetEventsList(string bUnit, [FromUri] string[] deviceTokenEntry)
        {
            var response = _service.GetEventsList(bUnit, deviceTokenEntry);
            return response;
        }

        #endregion
    }
}

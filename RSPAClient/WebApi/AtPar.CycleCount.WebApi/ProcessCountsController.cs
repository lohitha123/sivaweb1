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
    public class ProcessCountsController : ApiController
    {
        private IProcessCountsService _service;
        private ILog _log;

        #region Constructor

        public ProcessCountsController(IProcessCountsService service, ILog log)
        {
            _service = service;
            _log = log;
            Utils.SetProductLog(AtParWebEnums.EnumApps.CycleCount);
            _log.SetLoggerType(typeof(ProcessCountsController));
        }

        #endregion
        
        [HttpGet]
        public AtParWebApiResponse<bool> GetEventDetails(string eventID, string bUnit, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetEventDetails(eventID, bUnit, userID, deviceTokenEntry);
            return result;

        }

        [HttpGet]
        public AtParWebApiResponse<bool> CheckIfEventIsParentEvent(string bUnit, string eventID, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CheckIfEventIsParentEvent(bUnit, eventID, userID, deviceTokenEntry);
            return result;
        }
        [HttpPost]
        public AtParWebApiResponse<long> UpdateReviewer(string updateUser, string eventID, string bUnit, [FromBody] List<VM_UPDATE_REVIEWER_DATA> lstUpdateReviewerData, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateReviewer(updateUser, lstUpdateReviewerData, eventID, bUnit, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<bool> UpdateStatusForTransaction(string status, string transID, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateStatusForTransaction(status, transID, userID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> UpdateHdrDetails(string updateUser, string bUnit, string eventID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateHdrDetails(updateUser, bUnit, eventID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<bool> CheckIfAllEventsDownloaded(string eventID, string bUnit, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CheckIfAllEventsDownloaded(eventID, bUnit, userID, deviceTokenEntry);
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<bool> CheckStatusOfEvents(string userID, string bUnit, string eventID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CheckStatusOfEvents(userID, bUnit, eventID);
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<bool> CheckIfAllEventsCounted(string eventID, string bUnit, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CheckIfAllEventsCounted(eventID, bUnit, userID, deviceTokenEntry);
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<long> SendEvent(string bUnit, string eventID, string userID, string profileID, string storeDetailHistory, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.SendEvent(bUnit, eventID, userID, profileID, storeDetailHistory, deviceTokenEntry);
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<bool> CheckIfStatusUpdatedForCountedEvent(string eventID, string bUnit, string userID,[FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CheckIfStatusUpdatedForCountedEvent(eventID, bUnit, userID, deviceTokenEntry);
            return result;
        }

    }
}

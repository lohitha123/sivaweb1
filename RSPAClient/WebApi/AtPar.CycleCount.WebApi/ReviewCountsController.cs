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
    public class ReviewCountsController : ApiController
    {
        private IReviewCountsService _service;
        private ILog _log;

        #region Constructor

        public ReviewCountsController(IReviewCountsService service, ILog log)
        {
            _service = service;
            _log = log;
            Utils.SetProductLog(AtParWebEnums.EnumApps.CycleCount);
            _log.SetLoggerType(typeof(ReviewCountsController));
        }

        #endregion


        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_USER> GetReCountUsersList(string appID, string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetReCountUsersList(appID, orgGrpID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_CYCT_EVENT_HDR> GetReviewCountsEventIds(string bUnit, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetReviewCountsEventIds(bUnit, userID, deviceTokenEntry);
            return result;

        }

        [HttpGet]
        public AtParWebApiResponse<MT_CYCT_EVENT_HDR> CheckIfEventHasMultipleTransactions(string eventId, string bunit, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CheckIfEventHasMultipleTransactions(eventId, bunit, userID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetReviewCountEventDetails(string bUnit, string eventID, string userID, string recntuserID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetReviewCountEventDetails(bUnit, eventID, userID, recntuserID, deviceTokenEntry);
            return result;

        }

        [HttpGet]
        public AtParWebApiResponse<long> GetUser_Date(string bUnit, string eventID, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetUser_Date(bUnit, eventID, userID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<bool> CheckIfSplitEvntIsPartEvnt(string bUnit, string eventID, [FromUri] string[] deviceTokenEntry)
        {

            var result = _service.CheckIfSplitEvntIsPartEvnt(bUnit, eventID, deviceTokenEntry);
            return result;

        }
        [HttpPost]
        public AtParWebApiResponse<long> SendRevCntEvntsToERP(string loginUser, string reviewedUser, string bUnit, string eventID, [FromBody] List<MT_CYCT_EVENT_DETAIL> lstReviewCountDtls, string profileID, string orgGroupID,[FromUri] string[] deviceTokenEntry)
        {
            var result = _service.SendRevCntEvntsToERP(loginUser, reviewedUser, bUnit, eventID, lstReviewCountDtls, profileID, orgGroupID, deviceTokenEntry);
            return result;
        }
        [HttpPost]
        public AtParWebApiResponse<long> UpdateReviewCountEvent(string reviewedUser, string bUnit, string eventID, string userID, string reCntUser, [FromBody] List<VM_REVIEW_COUNTS_EVENT_DATA> lstReviewCountDtls, [FromUri] string[] pDeviceTokenEntry)
        {
            var result = _service.UpdateReviewCountEvent(reviewedUser, bUnit, eventID, lstReviewCountDtls, userID, reCntUser, pDeviceTokenEntry);
            return result;
        }

    }
}

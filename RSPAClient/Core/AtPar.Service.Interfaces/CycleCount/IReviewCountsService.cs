using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CycleCount
{
    public interface IReviewCountsService
    {
        AtParWebApiResponse<bool> CheckIfSplitEvntIsPartEvnt(string bUnit, string eventID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_USER> GetReCountUsersList(string appID, string orgGrpID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_CYCT_EVENT_HDR> GetReviewCountsEventIds(string bUnit, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_CYCT_EVENT_HDR> CheckIfEventHasMultipleTransactions(string eventId, string bunit, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> GetReviewCountEventDetails(string bUnit, string eventID, string userID, string recntuserID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> GetUser_Date(string bUnit, string eventID, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> SendRevCntEvntsToERP(string pLoginUser, string pReviewedUser, string pBUnit, string pEventId, List<MT_CYCT_EVENT_DETAIL> lstReviewCountDtls, string pProfileID, string pOrgGroupId, string[] pDeviceTokenEntry);
        AtParWebApiResponse<long> UpdateReviewCountEvent(string pReviewedUser, string bUnit, string eventID, List<VM_REVIEW_COUNTS_EVENT_DATA> pDsReviewCountDtls, string userID, string reCntUser, string[] pDeviceTokenEntry);
    }
}

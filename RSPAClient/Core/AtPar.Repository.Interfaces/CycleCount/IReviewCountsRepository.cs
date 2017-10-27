using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CycleCount
{
    public interface IReviewCountsRepository
    {
        long CheckIfSplitEvntIsPartEvnt(string bUnit, string eventID, string[] deviceTokenEntry);
        List<MT_CYCT_EVENT_HDR_MASTER> GetEventDetails(string bUnit, string eventID);
        List<MT_CYCT_EVENT_HDR_MASTER> GetLatestUpdatesFromHdr(string bUnit, string eventID, string userID);
        List<MT_CYCT_EVENT_HDR> GetReviewCountsEventIds(string bUnit, string userID, string[] deviceTokenEntry);
        Tuple<long, List<MT_ATPAR_USER>> GetReCountUsersList(string appID, string orgGrpID, string[] deviceTokenEntry);
        List<MT_CYCT_EVENT_HDR> CheckIfEventHasMultipleTransactions(string pEventId, string pBunit, string pUserID, string[] pDeviceTokenEntry);
        Tuple<long, Dictionary<string, string>, Dictionary<string, object>> GetReviewCountEventDetails(string pbUnit, string peventId, string puserID, string pRecntuserID, string[] pDeviceTokenEntry);
        Tuple<long, string> SendRevCntEvntsToERP(string pLoginUser, string pReviewedUser, string pBUnit, string pEventId,DataSet dsReviewCountDtls, string pProfileID, string pOrgGroupId, string[] pDeviceTokenEntry);
        //long InsertDeviationReportData(string _strSysCountPctDeviation, string[] pDeviceTokenEntry, string pStrBunit = null, string pStrEventID = null);
        //long DeleteEvents(string pBunit, string pEventID, string pUserID, string pDtldHstFlag);
        Tuple<long, Dictionary<string, object>> UpdateReviewCountEvent(string pReviewedUser, string bUnit, string eventID, DataSet pDsReviewCountDtls, string userID, string reCntUser, string[] pDeviceTokenEntry);
       // Tuple<long, string> SendEventERP(string erpObjName, string strXml, string[] pDeviceTokenEntry);
    }
}

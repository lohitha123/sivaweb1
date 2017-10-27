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
    public interface IProcessCountsService
    {       
        AtParWebApiResponse<bool> GetEventDetails(string eventID, string bUnit, string pUserID, string[] pDeviceTokenEntry);
        AtParWebApiResponse<bool> CheckIfEventIsParentEvent(string bUnit, string eventID, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> UpdateReviewer(string updateUser, List<VM_UPDATE_REVIEWER_DATA> lstUpdateReviewerData, string eventID, string bUnit, string[] deviceTokenEntry);
        AtParWebApiResponse<long> UpdateHdrDetails(string updateUser, string bUnit, string eventID, string[] deviceTokenEntry);
        AtParWebApiResponse<bool> UpdateStatusForTransaction(string status, string transID, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<bool> CheckIfAllEventsDownloaded(string eventID, string bUnit, string pUserID, string[] pDeviceTokenEntry);
        AtParWebApiResponse<bool> CheckStatusOfEvents(string userID, string bUnit, string eventID);
        AtParWebApiResponse<bool> CheckIfAllEventsCounted(string eventID, string bUnit, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> SendEvent(string bUnit, string eventID, string userID, string profileID, string storeDetailHistory, string[] deviceTokenEntry);
        AtParWebApiResponse<bool> CheckIfStatusUpdatedForCountedEvent(string eventID, string bUnit, string pUserID, string[] deviceTokenEntry);
        long GetEventItemsForSysQty(string bUnit, string eventID, string userID, string[] deviceTokenEntry, ref System.Data.DataSet pDsDetails);
    }
}

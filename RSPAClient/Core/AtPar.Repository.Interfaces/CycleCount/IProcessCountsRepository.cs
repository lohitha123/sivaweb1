using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CycleCount
{
    public interface IProcessCountsRepository
    {       

        long CheckIfEventIsParentEvent(string bUnit, string eventID, string userID, string[] deviceTokenEntry);

        long GetEventIDsFromMaster(string eventID, string bUnit);

        long GetEventIDsFromHDR(string eventID, string bUnit);

        long CheckStatusOfEvents(string userID, string bUnit, string eventID);

        bool CheckIfAllEventsCounted(string eventID, string bUnit, string pUserID, string[] pDeviceTokenEntry);

        Dictionary<string, object> GetEventData(string bUnit, string eventID);

        List<MT_CYCT_EVENT_HDR_MASTER> GetParentEventID(string bUnit, string eventID);

        long UpdateHdrDetails(string updateUser,string bUnit, string eventID);

        long UpdateReviewer(string updateUser, List<VM_UPDATE_REVIEWER_DATA> lstUpdateReviewerData, string eventID, string bUnit, string[] deviceTokenEntry);

        DataSet GetItemsToSendToERP(string bUnit, string eventID);

        long SendEvent(string bUnit, string eventID, string sysCountPctDev, string storeDetailHistory, string[] deviceTokenEntry);

        long UpdateStatusForTransaction(string pStatus, string transID, string pUserID, string[] pDeviceTokenEntry);
        bool CheckIfStatusUpdatedForCountedEvent(string eventID, string bUnit, string pUserID, string[] pDeviceTokenEntry);
    }
}

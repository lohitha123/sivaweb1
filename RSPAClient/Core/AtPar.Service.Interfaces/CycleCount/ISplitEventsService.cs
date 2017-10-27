using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CycleCount
{
   public interface ISplitEventsService
    {
        AtParWebApiResponse<bool> CheckForSplit(string eventID, string bUnit, bool checkSplit, string UserId, string[] DeviceTokenEntry);
        AtParWebApiResponse<long> SplitEvent(string Bunit, string EventId, int NoOfSubEvents, string UserId, string ProfileId, string OrgGroupId, string OrderBy, string StrFromLoc, string StrToLoc, string[] DeviceTokenEntry);
        AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER> GetEventsList(string bUnit, string[] deviceTokenEntry);
        System.Data.DataSet BuildDetailsInputDataset(string Bunit, string EventId, string UserID, string eventType = "0");
        Tuple<long, string> GetDetails(DataSet _dsEventDetails, string[] DeviceTokenEntry);
    }
}

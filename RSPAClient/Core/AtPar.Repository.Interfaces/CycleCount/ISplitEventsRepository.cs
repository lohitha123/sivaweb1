using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;
using System.Data.SqlClient;
using AtPar.POCOEntities;
using System.Data;

namespace AtPar.Repository.Interfaces.CycleCount
{
    public interface ISplitEventsRepository
    {
        long CheckForSplit(string eventID, string bUnit, bool checkSplit, string userID, string[] deviceTokenEntry);
        //int GetEventItems(string Bunit, string EventId, string UserId,List<MT_CYCLECOUNT_SUBEVENTS> LstSubEvents,string ProfileId,string OrgGroupId, string OrderBy, string StrFromLoc, string StrToLoc, string[] DeviceTokenEntry);
        long SplitEvent(string businessUnit, string eventId, int noOfSubEvents, string userID, string profileId,
                                string orgGroupId, string orderBy, string strFromLoc, string strToLoc, string erpObjName, List<MT_CYCLECOUNT_SUBEVENTS> lstSubEvents, string[] deviceTokenEntry);
        long CheckIfEventAllocated(string Bunit, string EventID, string UserId);
        List<MT_ATPAR_TRANSACTION> GetTransactionForEvent(string Bunit,string EventId,string UserId);
        long ExecuteTransactions(AtPar_Transaction_Entity TransactionDetails,int Transaction,int Status);
        List<MT_CYCT_EVENT_HDR> GetHeaderStatus(long TransId);
        long GetTransactionForRecountEvent(string Bunit,string EventId,string UserId);
        long CheckIfEventSplit(string Bunit, string EventId);
        Tuple<long, List<MT_CYCT_EVENT_DETAIL>,List<object>> GetEventData(bool RecountCheck, bool pBlnEventSplit, DataSet InputParams, string UserID, DataSet OutPutParams);
        long CheckRecountsExist(string Bunit, string UserID, string EventId);
        long DeleteEvents(string Bunit, string EventId, string TransId,string AllocFlag,string StrDtldCntHst);
        long InsertHdrDetAndUpdateEventTran(DataSet InputParameters,DataSet OutputParameters,string[] DeviceTokenEntry,long TransId);
        long InsertHdrDetAndUpdateEventTran(DataSet InputParameters, DataSet OutputParameters, string[] DeviceTokenEntry, long TransId, bool GetRecounttransID, bool GetRecountCanceltransID);
        List<MT_CYCT_ITEM_UOM_MASTER> GetItemUomMaster(bool pBlnEventSplit, string ITEM_REC_NUM, string UNIT_OF_MEASURE, string userID);

        long GetEventItems(string bUnit, string eventID, List<MT_CYCLECOUNT_SUBEVENTS> PdsSubEventNames, string userID,
              string ProfileId, string OrgGroupId, string OrderBy, string StrFromLoc, string StrToLoc, string outXml, string[] DeviceTokenEntry);




    }
}

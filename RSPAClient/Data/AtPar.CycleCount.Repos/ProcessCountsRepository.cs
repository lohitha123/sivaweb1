using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CycleCount.Repos
{
    public class ProcessCountsRepository : IProcessCountsRepository
    {
        #region private variables

        private ILog _log;

        #endregion

        #region Constructor
        public ProcessCountsRepository(ILog log)
        {
            _log = log;
        }
        #endregion

        #region Methods
     

        public long CheckIfEventIsParentEvent(string bUnit, string eventID, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSQl.Append("SELECT COUNT(TRANSACTION_ID) FROM MT_CYCT_EVENT_HDR ")
                         .Append("WHERE BUSINESS_UNIT = '").Append(bUnit).Append("' AND PARENT_EVENT_ID = '")
                         .Append(eventID).Append("' ")
                         .Append("AND EVENT_STATUS NOT IN (").Append((int)AtParWebEnums.AppTransactionStatus.Sent)
                         .Append(",").Append((int)AtParWebEnums.AppTransactionStatus.Cancel)
                         .Append(")");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " Checking if the selected event is parent event" + " with the following.... " + sbSQl.ToString());
                    var transCount = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned transaction  Count " + transCount); }

                    return transCount;


                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSQl = null;
            }


        }

        public Dictionary<string, object> GetEventData(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                List<MT_CYCT_EVENT_HDR> eventDetails = GetEventDataFromHdr(bUnit, eventID);

                //need to add sql query or procedure

                var getEventItems = GetEventItems(bUnit, eventID);
                var getEventItemProperties = GetEventItemProperties(bUnit, eventID);
                List<MT_CYCT_EVENT_DETAIL> getEventDetails = GetEventDetails(bUnit, eventID);
                var splittedCount = GetSplittedCountFromHdrMaster(bUnit, eventID);
                var totalRecCount = GetTotalRecCountFromEventDetail(bUnit, eventID);
                Dictionary<string, object> obj = new Dictionary<string, object> { { "eventDetails", eventDetails }, { "getEventItems", getEventItems },
                   { "getEventItemProperties", getEventItemProperties }, { "splittedCount", splittedCount },
                    { "totalRecCount", totalRecCount }, { "getEventDetails", getEventDetails }};
                return obj;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                //return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                throw ex;
            }
        }


        public long UpdateHdrDetails(string updateUser, string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    sbSQl.Append("UPDATE MT_CYCT_EVENT_HDR SET UPDATE_USER_ID='")
                        .Append(updateUser).Append("'")
                        .Append("WHERE BUSINESS_UNIT='")
                    .Append(bUnit).Append("'")
                    .Append(" AND EVENT_ID='").Append(eventID).Append("'");


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Execution SQL  " + sbSQl); }

                    var count = objContext.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Update Count is  " + count); }

                    return AtparStatusCodes.ATPAR_OK;


                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSQl = null;
            }


        }

        public long GetEventIDsFromMaster(string eventID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSQl.Append("SELECT COUNT( DISTINCT EVENT_ID) FROM MT_CYCT_EVENT_HDR_MASTER ")
                        .Append(" WHERE PARENT_EVENT_ID='")
                        .Append(eventID).Append("' ").Append("AND BUSINESS_UNIT = '").Append(bUnit).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var eventsInMasterCnt = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();//changed from long to int

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Event IDs In Master Count is  " + eventsInMasterCnt); }

                    return eventsInMasterCnt;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public long GetEventIDsFromHDR(string eventID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    sbSQl.Append("SELECT COUNT( DISTINCT EVENT_ID) FROM MT_CYCT_EVENT_HDR ")
                        .Append(" WHERE PARENT_EVENT_ID='")
                        .Append(eventID).Append("' ").Append("AND BUSINESS_UNIT = '").Append(bUnit)
                        .Append("' AND EVENT_STATUS IN ('")
                        .Append(AtParDefns.statDownloaded).Append("','")
                        .Append(AtParDefns.statEventCounting).Append("','").Append(AtParDefns.statEventCountComplete).Append("') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var eventsInHDRCnt = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Event IDs in HDR Count is  " + eventsInHDRCnt); }

                    return eventsInHDRCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSQl = null;
            }


        }

        public long CheckStatusOfEvents(string userID, string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSQl.Append("SELECT COUNT(EVENT_STATUS) FROM  MT_CYCT_EVENT_HDR WHERE BUSINESS_UNIT = '")
                        .Append(bUnit).Append("' AND PARENT_EVENT_ID ='").Append(eventID)
                        .Append("' AND EVENT_STATUS = 7");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var statusOfEvent = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Event Status Count is  " + statusOfEvent); }

                    return statusOfEvent;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public bool CheckIfAllEventsCounted(string eventID, string bUnit, string pUserID, string[] pDeviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            bool pAllEventsCounted = false;
            int intTransIdCnt = 0;
            List<MT_CYCT_EVENT_HDR> lstTransId = new List<MT_CYCT_EVENT_HDR>();
            List<MT_CYCT_EVENT_ALLOCATION> lstNoOfRecords = new List<MT_CYCT_EVENT_ALLOCATION>();
            bool blnEventscounts = false;
            int intRecItemCnt = 0;
            try
            {

                var lstEventID = GetDistinctEventIDsFromHDR(eventID, bUnit);
                bool _blnUserCounted = false;
                foreach (var events in lstEventID)
                {
                    blnEventscounts = false;

                    lstTransId = GetTransactionIDsFromEventHDR(bUnit, events.EVENT_ID);

                    lstNoOfRecords = GetNoOfRecordsFromEventAllocation(bUnit, events.EVENT_ID);

                    if (lstNoOfRecords.Count > 0)
                    {
                        intRecItemCnt = (lstNoOfRecords[0].NO_RECORDS != null) ? Convert.ToInt32(lstNoOfRecords[0].NO_RECORDS) : 0;
                    }
                    for (intTransIdCnt = 0; intTransIdCnt <= lstTransId.Count - 1; intTransIdCnt++)
                    {
                        int intCounts = 0;
                        int intItemCnt = 0;

                        intItemCnt = GetItemRecordCountFromEventDetail(lstTransId[intTransIdCnt].TRANSACTION_ID.ToString());

                        intCounts = GetItemQntyCountFromEventDetail(bUnit, eventID, lstTransId[intTransIdCnt].TRANSACTION_ID.ToString());

                        if (intItemCnt == intCounts)
                        {
                            blnEventscounts = true;
                            if (intRecItemCnt != 0)
                            {
                                if (intRecItemCnt == intItemCnt)
                                {
                                    _blnUserCounted = true;
                                }
                                //if Allocation of events is unchecked
                            }
                            else
                            {
                                _blnUserCounted = true;
                            }
                        }
                    }
                    if (!blnEventscounts)
                    {
                        pAllEventsCounted = blnEventscounts;
                        return pAllEventsCounted;
                    }
                }
                if (!_blnUserCounted)
                {
                    pAllEventsCounted = _blnUserCounted;
                    return pAllEventsCounted;
                }
                pAllEventsCounted = blnEventscounts;
                if (pAllEventsCounted == false)
                {
                    return pAllEventsCounted;
                }
                return pAllEventsCounted;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private List<MT_CYCT_EVENT_HDR> GetDistinctEventIDsFromHDR(string eventID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    sbSQl.Append("SELECT DISTINCT (EVENT_ID)  FROM MT_CYCT_EVENT_HDR WHERE PARENT_EVENT_ID='")
                        .Append(eventID).Append("' AND BUSINESS_UNIT='").Append(bUnit)
                        .Append("' AND EVENT_STATUS IN ('").Append(AtParDefns.statDownloaded)
                        .Append("','").Append(AtParDefns.statEventCounting).Append("','")
                        .Append(AtParDefns.statEventCountComplete).Append("')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    string[] columns = new[] { "EVENT_ID" };
                    var lstEventId = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Distinct Event IDs in HDR Count is  " + lstEventId.Count); }

                    return lstEventId;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }


        }

        private List<MT_CYCT_EVENT_HDR> GetTransactionIDsFromEventHDR(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSQl.Append("SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR WHERE EVENT_ID='")
                          .Append(eventID)
                          .Append("' AND BUSINESS_UNIT='")
                          .Append(bUnit)
                          .Append("' AND EVENT_STATUS IN ('")
                          .Append(AtParDefns.statDownloaded)
                          .Append("','")
                          .Append(AtParDefns.statEventCounting)
                          .Append("','")
                          .Append(AtParDefns.statEventCountComplete)
                          .Append("')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());
                    string[] columns = new string[] { "TRANSACTION_ID" };
                    var transIds = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned transaction IDs  Count " + transIds.Count); }

                    return transIds;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private List<MT_CYCT_EVENT_ALLOCATION> GetNoOfRecordsFromEventAllocation(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSQl.Append(" SELECT NO_RECORDS FROM MT_CYCT_EVENT_ALLOCATION WHERE ")
                            .Append(" BUSINESS_UNIT = '").Append(bUnit)
                            .Append("' AND EVENT_ID = '")
                            .Append(eventID)
                            .Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());
                    string[] columns = new string[] { "NO_RECORDS" };
                    var noOfRecords = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_ALLOCATION>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned transaction IDs  Count " + noOfRecords.Count); }

                    return noOfRecords;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private int GetItemRecordCountFromEventDetail(string transID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    sbSQl.Append(" SELECT COUNT(ITEM_REC_NUM) FROM MT_CYCT_EVENT_DETAIL WHERE TRANSACTION_ID='")
                         .Append(transID).Append("' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());

                    var itemRecCnt = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Item Record  Count " + itemRecCnt); }

                    return itemRecCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private int GetItemQntyCountFromEventDetail(string bUnit, string eventID, string transID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {


                    sbSQl.Append(" SELECT COUNT(COUNT_QTY) FROM MT_CYCT_EVENT_DETAIL WHERE TRANSACTION_ID='")
                         .Append(transID).Append("' ")
                         .Append("AND LATEST_UPDATE_DATE <> CONVERT(DATETIME, '1900/01/01', 101) AND COUNT_QTY IS NOT NULL ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());

                    var qntyCnt = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Quantity  Count " + qntyCnt); }

                    return qntyCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        #region GetEventData StoredProcedure Splitting

        private List<MT_CYCT_EVENT_HDR_MASTER> GetSplittedCountFromHdrMaster(string bUnit, string parentEventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {


                    sbSQl.Append(" SELECT COUNT(*) AS ISSPLITTED FROM MT_CYCT_EVENT_HDR_MASTER WHERE BUSINESS_UNIT ='")
                         .Append(bUnit).Append("' ")
                         .Append("AND PARENT_EVENT_ID= '").Append(parentEventID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());
                    string[] columns = new[] { "ISSPLITTED" };
                    var qntyCnt = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "splitted  Count " + qntyCnt.Select(a => a.ISSPLITTED).FirstOrDefault()); }

                    return qntyCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private List<MT_CYCT_EVENT_DETAIL> GetTotalRecCountFromEventDetail(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {


                    sbSQl.Append("SELECT COUNT(*) AS TOTALREC FROM MT_CYCT_EVENT_DETAIL A WHERE A.TRANSACTION_ID IN")
                         .Append("(SELECT MAX(TRANSACTION_ID) FROM MT_CYCT_EVENT_HDR WHERE BUSINESS_UNIT='")
                         .Append(bUnit).Append("' ")
                         .Append("AND (PARENT_EVENT_ID= '").Append(eventID).Append("'")
                         .Append(" OR EVENT_ID = '")
                         .Append(eventID)
                         .Append("' ) AND EVENT_STATUS NOT IN (11,13) GROUP BY EVENT_ID )");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());
                    string[] columns = new[] { "TOTALREC" };
                    var totalRecCnt = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_DETAIL>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Total Records  Count " + totalRecCnt.Select(a => a.TOTALREC).FirstOrDefault()); }

                    return totalRecCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private List<MT_CYCT_EVENT_HDR> GetEventDataFromHdr(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    //need to add one column in entity EventUsers

                    sbSQl.Append(" SELECT A.TRANSACTION_ID, A.EVENT_ID, COMPLETED_DATE, EVENT_STATUS,")
                         .Append("FIRST_NAME+' '+ MIDDLE_INITIAL+ ' ' +LAST_NAME+'('+A.USER_ID+')' AS EVENTUSERS,A.USER_ID ")
                         .Append(" FROM MT_CYCT_EVENT_HDR A,MT_ATPAR_USER B ")
                         .Append(" WHERE A.BUSINESS_UNIT =  '").Append(bUnit)
                         .Append("' AND (A.PARENT_EVENT_ID = '").Append(eventID).Append("'")
                         .Append(" OR A.EVENT_ID = '")
                         .Append(eventID)
                         .Append("')")
                         .Append(" AND A.EVENT_STATUS NOT IN (11,13) AND A.USER_ID = B.USER_ID ORDER BY A.EVENT_ID, A.TRANSACTION_ID  ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());
                    string[] columns = new[] { "TRANSACTION_ID", "EVENT_ID", "COMPLETED_DATE", "EVENT_STATUS", "EVENTUSERS", "USER_ID" };
                    var lstHdrEvents = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Total Events Count " + lstHdrEvents.Count); }

                    return lstHdrEvents;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private List<MT_CYCT_EVENT_DETAIL> GetEventItems(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            SqlParameter[] sqlParms = new SqlParameter[2];
            sqlParms[0] = new SqlParameter("@bunit", SqlDbType.NVarChar);
            sqlParms[0].Value = bUnit;

            sqlParms[1] = new SqlParameter("@eventID", SqlDbType.NVarChar);
            sqlParms[1].Value = eventID;

            try
            {

                using (var objContext = new ATPAR_MT_Context())
                {
                    //need to add one column in entity EventUsers


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    sbSQl
                        .Append("exec GetEventItems '").Append(sqlParms[0].Value.ToString()).Append("', ")
                         .Append("'").Append(sqlParms[1].Value.ToString()).Append("'");

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());

                    string[] columns = new[] { "INV_ITEM_ID","DESCRIPTION","MFG_ITEM_ID", "STORAGE_AREA", "STOR_LEVEL_1", "STOR_LEVEL_2", "STOR_LEVEL_3", "STOR_LEVEL_4",
                        "STORAGE_LOCATION","ITEM_PRICE","SYS_QTY","UNIT_OF_MEASURE","STD_PACK_UOM","CONTAINER_ID","SERIAL_ID","INV_LOT_ID","LATEST_UPDATE_DATE","COUNT_USER_ID",
                    "CUST_ITEM_NO","COUNT_QTY1","COUNT_QTY2","ITEM_REC_NUM","L_S_CONTROLLED","SERIAL_CONTROLLED","CONSIGNED_FLAG","STAGED_DATE","EVENT_TYPE","CONVERSION_RATE"};

                    var lstEventItems = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_DETAIL>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Total Events Count " + lstEventItems.Count); }

                    return lstEventItems;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private List<MT_CYCT_EVENT_DETAIL> GetEventItemProperties(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            SqlParameter[] sqlParms = new SqlParameter[2];
            sqlParms[0] = new SqlParameter("@bunit", SqlDbType.NVarChar);
            sqlParms[0].Value = bUnit;

            sqlParms[1] = new SqlParameter("@eventID", SqlDbType.NVarChar);
            sqlParms[1].Value = eventID;

            try
            {

                using (var objContext = new ATPAR_MT_Context())
                {
                    //need to add one column in entity EventUsers


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    sbSQl
                        .Append("exec GetEventItemProperties '").Append(sqlParms[0].Value.ToString()).Append("', ")
                         .Append("'").Append(sqlParms[1].Value.ToString()).Append("'");

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());
                    string[] columns = new[] { "INV_ITEM_ID", "STORAGE_AREA", "STOR_LEVEL_1", "STOR_LEVEL_2", "STOR_LEVEL_3", "STOR_LEVEL_4", "CONTAINER_ID",
                        "UNIT_OF_MEASURE","STD_PACK_UOM","SERIAL_ID","INV_LOT_ID","COUNT_QTY","TRANSACTION_ID","LATEST_UPDATE_DATE","COUNT_USER_ID","L_S_CONTROLLED",
                    "SERIAL_CONTROLLED","CONSIGNED_FLAG","STAGED_DATE"};
                    var lstEventItemsProps = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_DETAIL>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Total Events Count " + lstEventItemsProps.Count); }

                    return lstEventItemsProps;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private List<MT_CYCT_EVENT_DETAIL> GetEventDetails(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            SqlParameter[] sqlParms = new SqlParameter[2];
            sqlParms[0] = new SqlParameter("@bunit", SqlDbType.NVarChar);
            sqlParms[0].Value = bUnit;

            sqlParms[1] = new SqlParameter("@eventID", SqlDbType.NVarChar);
            sqlParms[1].Value = eventID;

            try
            {

                using (var objContext = new ATPAR_MT_Context())
                {
                    //need to add one column in entity EventUsers


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    sbSQl.Append("")
                        .Append("exec GetEventDetails '").Append(sqlParms[0].Value.ToString()).Append("', ")
                         .Append("'").Append(sqlParms[1].Value.ToString()).Append("'");

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());
                    string[] columns = new[] { "INV_ITEM_ID","DESCRIPTION","MFG_ITEM_ID", "STORAGE_AREA", "STOR_LEVEL_1", "STOR_LEVEL_2", "STOR_LEVEL_3", "STOR_LEVEL_4",
                        "STORAGE_LOCATION","ITEM_PRICE","SYS_QTY","UNIT_OF_MEASURE","STD_PACK_UOM","CONTAINER_ID","SERIAL_ID","INV_LOT_ID","LATEST_UPDATE_DATE","COUNT_USER_ID",
                    "CUST_ITEM_NO","COUNT_QTY1","COUNT_QTY2","ITEM_REC_NUM","L_S_CONTROLLED","SERIAL_CONTROLLED","CONSIGNED_FLAG","STAGED_DATE","EVENT_TYPE","CONVERSION_RATE"};

                    var lstEventDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_DETAIL>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Total Events Count " + lstEventDetails.Count); }

                    return lstEventDetails;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        #endregion

        public List<MT_CYCT_EVENT_HDR_MASTER> GetParentEventID(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            SqlCommand _sqlCmd = default(SqlCommand);
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    //need to add one column in entity EventUsers


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    SqlParameter[] sqlParms = new SqlParameter[2];

                    sqlParms[0] = new SqlParameter("@eventid", SqlDbType.NVarChar);
                    sqlParms[0].Value = eventID;

                    sqlParms[1] = new SqlParameter("@bunit", SqlDbType.NVarChar);
                    sqlParms[1].Value = bUnit;
                    _sqlCmd = new SqlCommand();
                    _sqlCmd.Parameters.Add(sqlParms[0]);
                    _sqlCmd.Parameters.Add(sqlParms[1]);

                    sbSQl
                          .Append("EXEC GET_PARENT_EVENTID '").Append(sqlParms[0].Value.ToString()).Append("', ")
                           .Append("'").Append(sqlParms[1].Value.ToString()).Append("'");
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  executing the following SQL Query.... " + sbSQl.ToString());

                    string[] columns = new[] { "PARENT_EVENT_ID" };
                    var lstEventsDs = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(columns, sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Total Parent Event Ids Count " + lstEventsDs.Count); }

                    return lstEventsDs;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }

        }
        public long UpdateReviewer(string updateUser, List<VM_UPDATE_REVIEWER_DATA> lstUpdateReviewerData, string eventID, string bUnit, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            string _strSQL = string.Empty;

            if (lstUpdateReviewerData.Count == 0)
            {
                return AtparStatusCodes.E_NORECORDFOUND;
            }
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    for (int intCnt = 0; intCnt <= lstUpdateReviewerData.Count - 1; intCnt++)
                    {

                        //For Each character As Char In .Item("REVIEWERCNT")
                        //    If Not Integer.TryParse(character, New Integer) Then
                        //        Return E_NOTANUMBER
                        //    End If
                        //Next


                        //sbSQl.Append("SELECT STORAGE_AREA, STOR_LEVEL_1, STOR_LEVEL_2, STOR_LEVEL_3, STOR_LEVEL_4,")
                        //   .Append("CONTAINER_ID, SERIAL_ID, INV_LOT_ID, UNIT_OF_MEASURE, COUNT_QTY, COUNT_QTY1, COUNT_QTY2 ")
                        //   .Append("FROM MT_CYCT_EVENT_DETAIL WHERE ITEM_REC_NUM = '")
                        //   .Append(lstUpdateReviewerData[intCnt].ITEMRECNUM).Append("' ").Append(" AND TRANSACTION_ID = '")
                        //   .Append(lstUpdateReviewerData[intCnt].TRANSID).Append("'");
                        sbSQl.Append("SELECT COUNT_QTY ")
                          .Append("FROM MT_CYCT_EVENT_DETAIL WHERE ITEM_REC_NUM = '")
                          .Append(lstUpdateReviewerData[intCnt].ITEMRECNUM).Append("' ").Append(" AND TRANSACTION_ID = '")
                          .Append(lstUpdateReviewerData[intCnt].TRANSID).Append("'");

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + "  executing the following SQL Query.... " + sbSQl.ToString());
                        //string[] columns = new[] { "STORAGE_AREA", "STOR_LEVEL_1", "STOR_LEVEL_2", "STOR_LEVEL_3", "STOR_LEVEL_4", "CONTAINER_ID", "SERIAL_ID",
                        //    "INV_LOT_ID","UNIT_OF_MEASURE","COUNT_QTY","COUNT_QTY1","COUNT_QTY2"};
                        string[] columns = new[] {
                           "COUNT_QTY"};
                        var countQty = objContext.Database.SqlQuery<double?>(sbSQl.ToString()).FirstOrDefault();

                        //NB-4639
                        double _cntqty = 0;
                        if (!string.IsNullOrEmpty(countQty.ToString()))
                        {
                            _cntqty =Convert.ToDouble(countQty);
                        }


                        if (string.IsNullOrEmpty(lstUpdateReviewerData[intCnt].UPDATEUSER))
                        {
                            lstUpdateReviewerData[intCnt].UPDATEUSER = updateUser;
                        }
                        var status = UpdateEventDetailReviewCnt(lstUpdateReviewerData[intCnt], _cntqty);
                        if (status != AtparStatusCodes.ATPAR_OK)
                        {
                            return status;
                        }

                    }
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;

            }


        }

        private long UpdateEventDetailReviewCnt(VM_UPDATE_REVIEWER_DATA updateReviewerData, double countQty)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    //need to add one column in entity EventUsers


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }



                    sbSQl.Append("UPDATE MT_CYCT_EVENT_DETAIL SET REVIEWER_COUNT='").Append(updateReviewerData.REVIEWERCNT).Append("', ")
                       .Append("COUNT_USER_ID = '").Append(updateReviewerData.UPDATEUSER).Append("',  UPDATE_USER_ID='").Append(updateReviewerData.UPDATEUSER)
                       .Append("' , LATEST_UPDATE_DATE ='").Append(DateTime.Now + "' ");




                    if ((updateReviewerData.UPDATEDT.ToString() == string.Empty) && !string.IsNullOrEmpty(countQty.ToString()))
                    {
                        sbSQl.Append(" , UPDATE_DATE='").Append(DateTime.Now).Append("'");
                        //If (.Item("UPDATEDT") <> String.Empty) Then
                    }
                    else
                    {
                        string cntQty = string.Empty;
                        if (!string.IsNullOrEmpty(countQty.ToString()))
                        {
                            cntQty = countQty.ToString();
                        }

                        if ((updateReviewerData.UPDATECNTDTWEB == "Y") && (cntQty != updateReviewerData.REVIEWERCNT.ToString()))
                        {
                            sbSQl.Append(" , UPDATE_DATE='").Append(DateTime.Now).Append("'");
                        }
                    }

                    sbSQl.Append(" , COUNT_QTY='").Append(updateReviewerData.REVIEWERCNT).Append("' ").Append(" , COUNT_QTY1='")
                         .Append(updateReviewerData.ISSUECNT).Append("' ").Append(" , COUNT_QTY2='").Append(updateReviewerData.ORDERCNT)
                         .Append("' ").Append(" WHERE ITEM_REC_NUM ='").Append(updateReviewerData.ITEMRECNUM).Append("' ")
                         .Append(" AND TRANSACTION_ID='").Append(updateReviewerData.TRANSID).Append("'");

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  executing the following SQL Query.... " + sbSQl.ToString());

                    var updateCnt = objContext.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Updated Count is " + updateCnt); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
        }

        public long UpdateStatusForTransaction(string pStatus, string transID, string pUserID, string[] pDeviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                //SW-4318
                int intCounts = 0;
                int intItemCnt = 0;
                try
                {
                    intItemCnt = GetItemRecordCountFromEventDetail(transID);
                    intCounts = GetCountQntyCountFromEventDetail(transID);
                }
                catch (Exception)
                {
                    return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                }
                /////handling recount users if parent user counts cancelled///'
                if (pStatus == "13")
                {
                    int _intRecountExist = 0;
                    try
                    {
                        _intRecountExist = GetUserIDCountFromEventHdr(transID);

                        if (_intRecountExist > 0)
                        {

                            return AtparStatusCodes.S_CYCT_RECOUNTS_EXIST;
                        }
                    }
                    catch (Exception)
                    {
                        return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                    }
                    //Handling parent user if recount user is cancelled
                    try
                    {
                        UpdateUserIDCountFromEventDetail(transID);
                    }
                    catch (Exception)
                    {
                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;

                    }

                }

                /////End of handling recount users if parent user counts cancelled///'

                if (intItemCnt == intCounts || Convert.ToInt32(pStatus) == AtParDefns.statCancel)
                {
                    UpdateEventStatus(transID, pStatus);
                }
                else
                {
                    return AtparStatusCodes.S_CYCT_RECOUNTEXISTS;
                }
                //Updating status for transaction table
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception)
            {

                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }


        }

        private int UpdateEventStatus(string transID, string pStatus)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSQl.Append("UPDATE MT_CYCT_EVENT_HDR SET EVENT_STATUS='").Append(pStatus).Append("' ");

                    if (Convert.ToInt32(pStatus) == AtParDefns.statEventCountComplete)
                    {
                        sbSQl.Append(" , COMPLETED_DATE=GETDATE() ");
                    }

                    sbSQl.Append("WHERE TRANSACTION_ID='").Append(transID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ": Executing SQL :" + sbSQl.ToString());

                    var qntyCnt = objContext.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " updated  Count " + qntyCnt); }

                    return qntyCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private int UpdateUserIDCountFromEventDetail(string transID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSQl.Append("UPDATE MT_CYCT_EVENT_DETAIL SET RECOUNT_USER_ID = NULL,RECOUNT_FLAG = 'N' ");
                    sbSQl.Append("WHERE RECOUNT_USER_ID = (SELECT DISTINCT [USER_ID] FROM MT_CYCT_EVENT_HDR ");
                    sbSQl.Append("WHERE TRANSACTION_ID = '" + transID + "' AND EVENT_STATUS <> 13 )");
                    sbSQl.Append(" AND TRANSACTION_ID IN  (SELECT DISTINCT(DTL.TRANSACTION_ID)");
                    sbSQl.Append(" FROM MT_CYCT_EVENT_DETAIL DTL,MT_CYCT_EVENT_HDR HDR  WHERE");
                    sbSQl.Append(" HDR.EVENT_ID=(SELECT DISTINCT [EVENT_ID] ");
                    sbSQl.Append(" FROM MT_CYCT_EVENT_HDR WHERE TRANSACTION_ID = '" + transID + "' AND ");
                    sbSQl.Append(" EVENT_STATUS <> 13)");
                    sbSQl.Append(" AND HDR.USER_ID<>(SELECT DISTINCT [USER_ID]");
                    sbSQl.Append(" FROM MT_CYCT_EVENT_HDR WHERE TRANSACTION_ID = '" + transID + "' AND");
                    sbSQl.Append(" EVENT_STATUS <> 13)AND RECOUNT_FLAG = 'Y' AND RECOUNT_USER_ID = (SELECT DISTINCT [USER_ID] ");
                    sbSQl.Append(" FROM MT_CYCT_EVENT_HDR WHERE TRANSACTION_ID = '" + transID + "' AND");
                    sbSQl.Append(" EVENT_STATUS <> 13) AND DTL.TRANSACTION_ID <> '" + transID + "' AND HDR.TRANSACTION_ID=DTL.TRANSACTION_ID)");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " Executing SQL for Updating parent user if recount user cancelled " + sbSQl.ToString());

                    var qntyCnt = objContext.Database.ExecuteSqlCommand(sbSQl.ToString());
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " updated  Count " + qntyCnt); }

                    return qntyCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private int GetUserIDCountFromEventHdr(string transID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSQl.Append("SELECT COUNT([USER_ID]) FROM MT_CYCT_EVENT_HDR WHERE (EVENT_STATUS <> 13");
                    sbSQl.Append(" OR EVENT_STATUS IS NULL ) AND [USER_ID] IN ");
                    sbSQl.Append("(SELECT DISTINCT DTL.RECOUNT_USER_ID FROM ");
                    sbSQl.Append("MT_CYCT_EVENT_HDR HDR,MT_CYCT_EVENT_DETAIL DTL");
                    sbSQl.Append(" WHERE DTL.RECOUNT_FLAG = '").Append(AtParWebEnums.YesNo_Enum.Y.ToString()).Append("'");
                    sbSQl.Append(" AND DTL.RECOUNT_USER_ID <> HDR.[USER_ID]");
                    sbSQl.Append(" AND DTL.TRANSACTION_ID = ").Append(transID);
                    sbSQl.Append(" AND HDR.TRANSACTION_ID = DTL.TRANSACTION_ID)");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "   Executing SQL for Parent Recount exist " + sbSQl.ToString());

                    var qntyCnt = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Returned User ids  Count " + qntyCnt); }

                    return qntyCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }



        private int GetCountQntyCountFromEventDetail(string transID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSQl.Append(" SELECT COUNT(COUNT_QTY) FROM MT_CYCT_EVENT_DETAIL WHERE TRANSACTION_ID = '")
                         .Append(transID).Append("' ")
                         .Append("AND COUNT_QTY IS NOT NULL");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());

                    var qntyCnt = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Count Quantity  Count " + qntyCnt); }

                    return qntyCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }


        public DataSet GetItemsToSendToERP(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            SqlParameter[] sqlParms = new SqlParameter[2];
            sqlParms[0] = new SqlParameter("@bunit", SqlDbType.NVarChar);
            sqlParms[0].Value = bUnit;

            sqlParms[1] = new SqlParameter("@eventID", SqlDbType.NVarChar);
            sqlParms[1].Value = eventID;

            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    objContext.Database.Connection.Open();
                    //need to add one column in entity EventUsers
                    var command = objContext.Database.Connection.CreateCommand();
                    command.CommandText = "GetItemsToSendToERP";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParms);
                    var reader = command.ExecuteReader();

                    List<VM_MT_CYCT_EVENT_DETAIL> listEventDetails =
                    ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_MT_CYCT_EVENT_DETAIL>
                    (reader).ToList();
                    reader.NextResult();
                    List<VM_MT_CYCT_EVENT_HDR> listHdrDetails =
                        ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_MT_CYCT_EVENT_HDR>
                (reader).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    sbSQl
                        .Append("exec GetItemsToSendToERP '").Append(sqlParms[0].Value.ToString()).Append("', ")
                         .Append("'").Append(sqlParms[1].Value.ToString()).Append("'");

                    //if (_log.IsDebugEnabled)
                    //    _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());
                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug("Calling GetItemsToSendToERP with the following syntax.." + sbSQl.ToString());

                    }
                    objContext.Database.Connection.Close();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Total Events Count " + listEventDetails.Count); }
                    DataSet _dsEventItems = new DataSet();
                    DataTable dtEventItems = listEventDetails.ToDataTable();
                    DataTable dtEventType = listHdrDetails.ToDataTable();

                    _dsEventItems.Tables.Add(dtEventItems);
                    _dsEventItems.Tables.Add(dtEventType);
                    if (_dsEventItems.Tables.Count > 0)
                        _dsEventItems.Tables[0].TableName = "DETAIL";

                    return _dsEventItems;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }


        }

        #region SendEvent

        public long SendEvent(string bUnit, string eventID, string sysCountPctDev, string storeDetailHistory, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlParms = new SqlParameter[6];
                    sqlParms[0] = new SqlParameter("@countDevPer", SqlDbType.Int);
                    sqlParms[0].Value = sysCountPctDev;

                    sqlParms[1] = new SqlParameter("@appId", SqlDbType.Int);
                    sqlParms[1].Value = AtParWebEnums.EnumApps.CycleCount;

                    sqlParms[2] = new SqlParameter("@paramVal", SqlDbType.NVarChar);
                    sqlParms[2].Value = storeDetailHistory;

                    sqlParms[3] = new SqlParameter("@bunit", SqlDbType.NVarChar);
                    sqlParms[3].Value = bUnit;

                    sqlParms[4] = new SqlParameter("@eventID", SqlDbType.NVarChar);
                    sqlParms[4].Value = eventID;

                    sqlParms[5] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlParms[5].Direction = ParameterDirection.Output;

                    sbSQl.Append("EXEC SendEvent @countDevPer,@appId,@paramVal,@bunit,@eventID,@StatusCode out");

                    var _strSQL = "DECLARE @P1 INT " + "SET @P1 = 0 " + "\n" + "EXEC\t" + "SendEvent" + "\n" + "@countDevPer = N'" + sqlParms[0].Value + "'," + "\n" + "@appId = N'" + sqlParms[1].Value + "'," + "\n" + "@paramVal = N'" + sqlParms[2].Value + "'," + "\n" + "@bunit = N'" + sqlParms[3].Value + "'," + "\n" + "@eventID = N'" + sqlParms[4].Value + "'," + "\n" + "@StatusCode = @P1 output" + "\n" + "SELECT\t@P1 ";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _strSQL.ToString() + ":")); }
                    }

                    objContext.Database.ExecuteSqlCommand(sbSQl.ToString(), sqlParms);

                    long _StatusCode = Convert.ToInt64(sqlParms[5].Value);


                    //if (_log.IsDebugEnabled)
                    //    _log.Debug(methodBaseName + " Inserting DEVIATION and" + " EVENT_SUMMARY , Updating the" + " TRANSACTION STATUS, DELETING the" + " MASTER tables, HDR, DETAILS, ITEM_UOM," + " ALLOCATION tables with" + " the following.... " + "\n" + _strSQL + "\n");

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Status Code returned from SendEvent is: " + _StatusCode); }

                    if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to insert the data in middle tier" + " tables: StatusCode is : " + _StatusCode + "\n" + " Failed to execute the" + " SQL... " + "\n" + _strSQL + "\n");
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                    return _StatusCode;

                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }




        }


        #endregion

        public bool CheckIfStatusUpdatedForCountedEvent(string eventID, string bUnit, string pUserID, string[] pDeviceTokenEntry)
        {

            bool pStatusChanged = false;
            string strStatus = string.Empty;
            int intEventId = 0;
            int intTransIdCnt = 0;
            bool blnEventscounts = false;

            try
            {
                var dsEventId = GetDistinctEventIDsFromHDR(eventID, bUnit);
                //SW-4298             
                for (intEventId = 0; intEventId <= dsEventId.Count - 1; intEventId++)
                {
                    blnEventscounts = false;
                    var dsTransId = GetTransactionIDsFromEventHDR(bUnit, dsEventId[intEventId].EVENT_ID);

                    for (intTransIdCnt = 0; intTransIdCnt <= dsTransId.Count - 1; intTransIdCnt++)
                    {
                        int intCounts = 0;
                        int intItemCnt = 0;
                        intItemCnt = GetItemRecordCountFromEventDetail(dsTransId[intTransIdCnt].TRANSACTION_ID.ToString());
                        intCounts = GetCountQntyCountFromEventDetail(dsTransId[intTransIdCnt].TRANSACTION_ID.ToString());

                        if (intItemCnt == intCounts)
                        {
                            strStatus = GetEventStatusFromHdr(dsTransId[intTransIdCnt].TRANSACTION_ID.ToString());

                            if (Convert.ToInt32(strStatus) != AtParDefns.statDownloaded)
                            {
                                blnEventscounts = true;
                            }
                        }
                    }
                    if (!blnEventscounts)
                    {
                        pStatusChanged = blnEventscounts;

                        return pStatusChanged;
                    }
                }

                pStatusChanged = blnEventscounts;
                return pStatusChanged;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        private string GetEventStatusFromHdr(string transID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {


                    sbSQl.Append(" SELECT EVENT_STATUS FROM MT_CYCT_EVENT_HDR WHERE ")
                        .Append(" TRANSACTION_ID='").Append(transID).Append("' ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "  with the following SQL Query.... " + sbSQl.ToString());

                    var eventStatus = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Event Status is " + eventStatus); }

                    return eventStatus.ToString();
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }
        #endregion
    }

}

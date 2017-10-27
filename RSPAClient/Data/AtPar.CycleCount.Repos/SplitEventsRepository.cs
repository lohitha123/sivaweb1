using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using System.Collections;

namespace AtPar.CycleCount.Repos
{
    public class SplitEventsRepository : ISplitEventsRepository
    {

        #region private variables

        private ILog _log;

        #endregion
        int standardConvFac = 1;

        #region Constructor
        public SplitEventsRepository(ILog log)
        {
            _log = log;
        }
        #endregion

        #region Methods

        public long CheckForSplit(string eventID, string bUnit, bool CheckSplit, string userID, string[] DeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long count = -1;

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (var entites = new ATPAR_MT_Context())
                {

                    sbSQl.Append("SELECT COUNT(EVENT_ID) FROM  MT_CYCT_EVENT_HDR WHERE ( EVENT_ID='" + eventID + "' ");
                    sbSQl.Append(" OR PARENT_EVENT_ID='" + eventID + "' ) AND BUSINESS_UNIT='" + bUnit + "' ");

                    if (CheckSplit)
                    {
                        sbSQl.Append(" AND EVENT_STATUS IN ");
                        sbSQl.Append("('" + AtParDefns.statDownloaded + "','" + AtParDefns.statEventCounting + "','" + AtParDefns.statEventCountComplete + "')");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { entites.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                        }
                    }

                    count = entites.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    return count;

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

        public long SplitEvent(string businessUnit, string eventId, int noOfSubEvents, string userID, string profileId,
                               string orgGroupId, string orderBy, string strFromLoc, string strToLoc, string erpObjName, List<MT_CYCLECOUNT_SUBEVENTS> lstSubEvents, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_CYCLECOUNT_GET_EVENTS> _lstEventItems = new List<MT_CYCLECOUNT_GET_EVENTS>();
            List<MT_CYCLECOUNT_SUBEVENTS> _lstSubEvents = new List<MT_CYCLECOUNT_SUBEVENTS>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        var updateStatus = DeleteEventsForSplit(businessUnit, eventId, userID, erpObjName, objContext);

                        if (updateStatus != AtparStatusCodes.ATPAR_OK)
                        {
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        trans.Commit();

                    }
                }


                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        //private long DeleteEventsForSplit(string bUnit, string eventID, string userID, ATPAR_MT_Context objContext, string[] DeviceTokenEntry)
        //{

        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    StringBuilder sbSQl = new StringBuilder();
        //    List<MT_CYCT_EVENT_HDR_MASTER> _lstCyctEventHdrMster = new List<MT_CYCT_EVENT_HDR_MASTER>();


        //    string strEnterpriseSystem = "PEOPLESOFT";
        //    //strEnterpriseSystem = GetConfigData(DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString(), AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString);
        //    int count;
        //    try
        //    {
        //        sbSQl.Append("SELECT BUSINESS_UNIT,PARENT_EVENT_ID,EVENT_ID,TRANSACTION_ID FROM ");
        //        sbSQl.Append("MT_CYCT_EVENT_HDR_MASTER WHERE PARENT_EVENT_ID='" + eventID + "' AND BUSINESS_UNIT='" + bUnit + "'");
        //        if (!_log.IsDebugEnabled)
        //        {
        //            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
        //        }
        //        var fields = new[] { "BUSINESS_UNIT", "PARENT_EVENT_ID", "EVENT_ID", "TRANSACTION_ID" };

        //        _lstCyctEventHdrMster = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(fields, sbSQl.ToString()).ToList();

        //        if (_lstCyctEventHdrMster.Count == 0)
        //        {
        //            sbSQl.Remove(0, sbSQl.Length);
        //            sbSQl.Append("DELETE FROM MT_CYCT_EVENT_ALLOCATION WHERE BUSINESS_UNIT='" + bUnit + "' AND EVENT_ID ='" + eventID + "'");
        //            count = objContext.Database.ExecuteSqlCommand(sbSQl.ToString());
        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }
        //        }
        //        else
        //        {
        //            try
        //            {
        //                for (int intloop = 0; intloop <= _lstCyctEventHdrMster.Count - 1; intloop++)
        //                {
        //                    sbSQl.Remove(0, sbSQl.Length);
        //                    sbSQl.Append("DELETE FROM MT_CYCT_EVENT_ALLOCATION WHERE BUSINESS_UNIT='" + bUnit + "' AND EVENT_ID='" + _lstCyctEventHdrMster[intloop].EVENT_ID + "'");
        //                    count = objContext.Database.ExecuteSqlCommand(sbSQl.ToString());
        //                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

        //                    sbSQl.Remove(0, sbSQl.Length);
        //                    sbSQl.Append("DELETE FROM MT_CYCT_EVENT_HDR_MASTER WHERE TRANSACTION_ID='" + _lstCyctEventHdrMster[intloop].TRANSACTION_ID + "'");
        //                    count = objContext.Database.ExecuteSqlCommand(sbSQl.ToString());
        //                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

        //                    sbSQl.Remove(0, sbSQl.Length);
        //                    sbSQl.Append("DELETE FROM MT_CYCT_EVENT_DETAIL_MASTER WHERE TRANSACTION_ID='" + _lstCyctEventHdrMster[intloop].TRANSACTION_ID + "' ");
        //                    count = objContext.Database.ExecuteSqlCommand(sbSQl.ToString());
        //                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

        //                    if (strEnterpriseSystem == "PEOPLESOFT")
        //                    {
        //                        sbSQl.Remove(0, sbSQl.Length);
        //                        sbSQl.Append("DELETE FROM MT_CYCT_ITEM_UOM_MASTER WHERE ");
        //                        sbSQl.Append("TRANSACTION_ID='" + _lstCyctEventHdrMster[intloop].TRANSACTION_ID + "'");
        //                        count = objContext.Database.ExecuteSqlCommand(sbSQl.ToString());
        //                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }
        //                    }
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
        //                return AtparStatusCodes.E_SERVERERROR;
        //            }
        //        }


        //        return AtparStatusCodes.ATPAR_OK;


        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
        //        return AtparStatusCodes.E_SERVERERROR;
        //    }
        //    finally
        //    {
        //        sbSQl = null;
        //    }
        //}

        public long DeleteEventsForSplit(string businessUnit, string eventId, string userID,
                             string erpObjName, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();
            long statusCode = 0;
            try
            {
                var dsEvents = GetEventsForSplit(businessUnit, eventId, objContext);
                if (dsEvents.Count == 0)
                {
                    statusCode = Delete_CYCT_EVENT_ALLOCATION(businessUnit, eventId, objContext);
                    return statusCode;
                }
                else
                {
                    foreach (var events in dsEvents)
                    {
                        statusCode = Delete_CYCT_EVENT_ALLOCATION(businessUnit, eventId, objContext);

                        statusCode = Delete_From_MT_CYCT_EVENT_HDR_MASTER(events.TRANSACTION_ID, objContext);

                        statusCode = Delete_From_MT_CYCT_EVENT_DETAIL_MASTER(events.TRANSACTION_ID, objContext);

                        if (erpObjName.ToUpper() == AtParWebEnums.Enterprise_Enum.Peoplesoft.ToString().ToUpper())
                        {
                            Delete_From_MT_CYCT_ITEM_UOM_MASTER(events.TRANSACTION_ID, objContext);
                        }
                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
        }

        private List<MT_CYCT_EVENT_HDR_MASTER> GetEventsForSplit(string businessUnit, string eventId, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                _sbSQL.Append("SELECT BUSINESS_UNIT,PARENT_EVENT_ID,EVENT_ID,TRANSACTION_ID FROM ")
                      .Append("MT_CYCT_EVENT_HDR_MASTER WHERE PARENT_EVENT_ID='" + eventId)
                      .Append("' AND BUSINESS_UNIT='" + businessUnit + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                string[] columns = { "BUSINESS_UNIT", "PARENT_EVENT_ID", "EVENT_ID", "TRANSACTION_ID" };
                var dsEvents = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(columns, _sbSQL.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned events  Count " + dsEvents.Count); }

                return dsEvents;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        private int Delete_From_MT_CYCT_ITEM_UOM_MASTER(string transactionID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                _sbSQL.Append("DELETE FROM MT_CYCT_ITEM_UOM_MASTER WHERE ")
                      .Append("TRANSACTION_ID ='" + transactionID)
                      .Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                var count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Deleted events  Count " + count); }
                return count;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        private int Delete_From_MT_CYCT_EVENT_HDR_MASTER(string transactionID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                _sbSQL.Append("DELETE FROM MT_CYCT_EVENT_HDR_MASTER WHERE TRANSACTION_ID=" +
                                            transactionID);

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                var count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Deleted events  Count " + count); }
                return count;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        private int Delete_From_MT_CYCT_EVENT_DETAIL_MASTER(string transactionID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                _sbSQL.Append("DELETE FROM MT_CYCT_EVENT_DETAIL_MASTER WHERE TRANSACTION_ID=" +
                                               transactionID);

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                var count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Deleted events  Count " + count); }
                return count;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        private long Delete_CYCT_EVENT_ALLOCATION(string businessUnit, string eventId, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                _sbSQL.Append("DELETE FROM MT_CYCT_EVENT_ALLOCATION WHERE BUSINESS_UNIT='" + businessUnit)
                      .Append("' AND EVENT_ID ='" + eventId + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                var count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned events  Count " + count); }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        public long CheckIfEventAllocated(string bUnit, string EventID, string userID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();
            long eventCount = -1;
            try
            {
                using (var entites = new ATPAR_MT_Context())
                {

                    _sbSQL.Append("SELECT COUNT(EVENT_ID) ");
                    _sbSQL.Append("FROM MT_CYCT_EVENT_ALLOCATION ");
                    _sbSQL.Append("WHERE EVENT_ID='" + EventID + "' ");
                    _sbSQL.Append("AND BUSINESS_UNIT='" + bUnit + "' ");
                    _sbSQL.Append("AND USER_ID='" + userID + "' ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { entites.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    eventCount = entites.Database.SqlQuery<int>(_sbSQL.ToString()).FirstOrDefault();
                }
                return eventCount;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public List<MT_ATPAR_TRANSACTION> GetTransactionForEvent(string bUnit, string eventID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            List<MT_ATPAR_TRANSACTION> lstAtparTrans = new List<MT_ATPAR_TRANSACTION>();
            try
            {
                using (var entites = new ATPAR_MT_Context())
                {

                    _sbSQL.Append("SELECT A.TRANSACTION_ID, A.STATUS FROM MT_ATPAR_TRANSACTION A  ");
                    _sbSQL.Append("WHERE A.BUSINESS_UNIT='" + bUnit + "' ");
                    _sbSQL.Append("AND A.ID='" + eventID + "' ");
                    _sbSQL.Append("AND A.DOWNLOAD_USERID='" + userID + "' ");
                    _sbSQL.Append("AND A.APP_ID=" + (int)AtParWebEnums.EnumApps.CycleCount);
                    _sbSQL.Append(" ORDER BY A.TRANSACTION_ID DESC");
                    var fields = new[] { "TRANSACTION_ID", "STATUS" };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { entites.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    lstAtparTrans = entites.Database.DifferedExecuteQuery<MT_ATPAR_TRANSACTION>(fields, _sbSQL.ToString()).ToList();

                    return lstAtparTrans;
                }
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                lstAtparTrans = null;
                _sbSQL = null;
            }
        }

        public long ExecuteTransactions(AtPar_Transaction_Entity transactionDetails, int transaction, int status)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long _status = -1;
            using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
            {
                using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                {
                    _status = UpdateTransaction(transactionDetails, objContext);

                    if (status != AtparStatusCodes.ATPAR_OK)
                    {
                        trans.Rollback();
                        return AtparStatusCodes.E_SERVERERROR;
                    }

                    _status = UpdateHeaderStatus(transaction, status, objContext);

                    if (status != AtparStatusCodes.ATPAR_OK)
                    {
                        trans.Rollback();
                        return AtparStatusCodes.E_SERVERERROR;
                    }

                    trans.Commit();
                }
            }
            return AtparStatusCodes.ATPAR_OK;


        }
        private long UpdateTransaction(AtPar_Transaction_Entity transactionDetails, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                _sbSQL.Append("UPDATE MT_ATPAR_TRANSACTION SET STATUS = '").Append(transactionDetails.Status);
                _sbSQL.Append("', UPDATE_DT_TIME = GetDate()");

                if (transactionDetails.StartDateTime != DateTime.MinValue)
                {
                    _sbSQL.Append(", START_DT_TIME = '");
                    _sbSQL.Append(transactionDetails.StartDateTime);
                    _sbSQL.Append("'");
                }
                if (transactionDetails.EndDateTime != DateTime.MinValue)
                {
                    _sbSQL.Append(", END_DT_TIME = '");
                    _sbSQL.Append(transactionDetails.EndDateTime);
                    _sbSQL.Append("'");
                }
                _sbSQL.Append(", USER_ID = '" + transactionDetails.UserId + "'");
                if (transactionDetails.TotalRecordSent != 0)
                {
                    _sbSQL.Append(", TOTAL_REC_SENT = " + transactionDetails.TotalRecordSent);
                }
                if (transactionDetails.StatusCode != 0)
                {
                    _sbSQL.Append(", STATUS_CODE = " + transactionDetails.StatusCode);
                }
                if ((transactionDetails.Description).Length > 0)
                {
                    _sbSQL.Append(", DESCR = " + transactionDetails.Description);
                }
                _sbSQL.Append(", SCANS_COUNT = " + transactionDetails.ScansCount);

                if ((transactionDetails.ReportData3).Length > 0)
                {
                    _sbSQL.Append(", REPORT_DATA_3 = " + transactionDetails.ReportData3);
                }
                if ((transactionDetails.ReportData8).Length > 0)
                {
                    _sbSQL.Append(", REPORT_DATA_8 = " + transactionDetails.ReportData8);
                }
                if ((transactionDetails.ReportData9).Length > 0)
                {
                    _sbSQL.Append(", REPORT_DATA_9 = " + transactionDetails.ReportData9);
                }
                if ((transactionDetails.ReportData10).Length > 0)
                {
                    _sbSQL.Append(", REPORT_DATA_10 = " + transactionDetails.ReportData10);
                }
                _sbSQL.Append(" WHERE TRANSACTION_ID = " + transactionDetails.TransactionId + " And APP_ID = " + transactionDetails.ApplicationId);

                objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());


                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                _sbSQL = null;
            }

        }

        private long UpdateHeaderStatus(long transID, int Status, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();


            _sbSQL.Append("UPDATE MT_CYCT_EVENT_HDR SET EVENT_STATUS=" + Status + " ");
            _sbSQL.Append("WHERE TRANSACTION_ID=" + transID);

            if (!_log.IsDebugEnabled)
            {
                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
            }

            try
            {
                objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public List<MT_CYCT_EVENT_HDR> GetHeaderStatus(long TransId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            List<MT_CYCT_EVENT_HDR> lstCytEvHdr = new List<MT_CYCT_EVENT_HDR>();

            try
            {
                using (var entites = new ATPAR_MT_Context())
                {
                    _sbSQL.Append("SELECT ISNULL(EVENT_STATUS,0) FROM MT_CYCT_EVENT_HDR ");
                    _sbSQL.Append("WHERE TRANSACTION_ID=" + TransId);
                    var fields = new[] { "EVENT_STATUS" };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { entites.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    lstCytEvHdr = entites.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR>(fields, _sbSQL.ToString()).ToList();
                    return lstCytEvHdr;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                throw ex;
            }

        }

        public long GetTransactionForRecountEvent(string bUnit, string eventID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();


            try
            {
                using (var entites = new ATPAR_MT_Context())
                {
                    _sbSQL.Append("SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR ");
                    _sbSQL.Append("WHERE BUSINESS_UNIT ='" + bUnit + "' ");
                    _sbSQL.Append("AND EVENT_ID = '" + eventID + "' ");
                    _sbSQL.Append("AND [USER_ID] = '" + userID + "' ");
                    _sbSQL.Append(" AND EVENT_STATUS IS NULL ORDER BY TRANSACTION_ID DESC");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { entites.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    var transID = entites.Database.SqlQuery<long>(_sbSQL.ToString()).ToList().FirstOrDefault();
                    return transID;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
        }

        public long CheckIfEventSplit(string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            int _intSplitCnt;
            int _intSubEventCnt;
            var fields = new[] { "EVENT_ID" };

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    _sbSQL.Append("SELECT COUNT(EVENT_ID) FROM MT_CYCT_EVENT_HDR_MASTER ");
                    _sbSQL.Append("WHERE BUSINESS_UNIT ='" + bUnit + "' ");
                    _sbSQL.Append("AND EVENT_ID = '" + eventID + "'");

                    _intSplitCnt = objContext.Database.SqlQuery<int>(_sbSQL.ToString()).FirstOrDefault();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Check if the event is split with the following SQL...." + _sbSQL.ToString()); }

                    if (_intSplitCnt > 0)
                        return _intSplitCnt;
                    else
                    {
                        _sbSQL.Remove(0, _sbSQL.Length);
                        _sbSQL.Append("SELECT COUNT(EVENT_ID) FROM MT_CYCT_EVENT_HDR_MASTER ");
                        _sbSQL.Append("WHERE BUSINESS_UNIT ='" + bUnit + "' ");
                        _sbSQL.Append("AND PARENT_EVENT_ID = '" + eventID + "'");

                        _intSubEventCnt = objContext.Database.SqlQuery<int>(_sbSQL.ToString()).FirstOrDefault();
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Check if the we are downloading the split with the following SQL...." + _sbSQL.ToString()); }

                        if (_intSubEventCnt > 0)
                        {
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug("Cannot get items for the parent event " +
                                  eventID + " which has sub events ");
                                return AtparStatusCodes.S_CYCT_SPLIT_EVNT_CANNOT_DL_PARENT;
                            }

                        }
                        return _intSplitCnt;
                    }

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
        }

        public Tuple<long, List<MT_CYCT_EVENT_DETAIL>, List<object>> GetEventData(bool RecountCheck, bool pBlnEventSplit, DataSet inputParams, string UserID, DataSet OutPutParams)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            DataTable dtItemAltUomDetails = new DataTable();
            string _strbUnit, _strEventID, _strUserID = string.Empty;
            bool _blnCountAndNew = false, _blnRecountAndNew = false, _blnRecount = false, _blnGetRecounttransID = false,
                _blnGetRecountCanceltransID = false, _blnDisplayCnts = true;
            StringBuilder _sbSQL = new StringBuilder();
            List<MT_CYCT_EVENT_HDR> lstCytEvHdr = new List<MT_CYCT_EVENT_HDR>();
            long statusCode, _lngtransID = 0;


            dtItemAltUomDetails.Columns.Add("INV_ITEM_ID", Type.GetType("System.String"));
            dtItemAltUomDetails.Columns.Add("UNIT_OF_MEASURE", Type.GetType("System.String"));
            dtItemAltUomDetails.Columns.Add("CONVERSION_RATE", Type.GetType("System.Double"));
            dtItemAltUomDetails.Columns.Add("ITEM_REC_NUM", Type.GetType("System.String"));
            dtItemAltUomDetails.Columns.Add("UOM_TYPE", Type.GetType("System.String"));
            var _rowData = inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];

            try
            {
                _strbUnit = _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString();
                _strEventID = _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString();

                if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.COUNT_AND_NEW] != System.DBNull.Value)
                    _blnCountAndNew = (bool)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.COUNT_AND_NEW];

                if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT_AND_NEW] != System.DBNull.Value)
                    _blnRecountAndNew = (bool)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT_AND_NEW];

                if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT] != System.DBNull.Value)
                    _blnRecount = (bool)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT];

                if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.USER_ID] != System.DBNull.Value)
                    _strUserID = _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.USER_ID].ToString();

                if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID] != System.DBNull.Value)
                    _blnGetRecounttransID = (bool)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID];

                if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID] != System.DBNull.Value)
                    _blnGetRecountCanceltransID = (bool)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID];
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_blnGetRecounttransID)
                    {

                        _sbSQL.Append("SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR WHERE ");
                        _sbSQL.Append("BUSINESS_UNIT = '" + _strbUnit + "' AND EVENT_ID = '");
                        _sbSQL.Append(_strEventID + "' AND USER_ID = '" + _strUserID + "' ");
                        _sbSQL.Append("AND EVENT_STATUS IS NULL");
                        var field = new[] { "TRANSACTION_ID" };

                        if (!_log.IsDebugEnabled)
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }


                        lstCytEvHdr = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR>(field, _sbSQL.ToString()).ToList();

                        _lngtransID = lstCytEvHdr.Select(x => x.TRANSACTION_ID).FirstOrDefault();

                        if (_lngtransID == 0)
                        {
                            if (_log.IsWarnEnabled)
                                _log.Fatal(methodBaseName + ":No data found");
                            return new Tuple<long, List<MT_CYCT_EVENT_DETAIL>, List<object>>(AtparStatusCodes.E_NORECORDFOUND, null, null);
                        }

                    }

                    else if (_blnGetRecountCanceltransID) /* FOR RECOUNT USER TO HANDLE CANCEL STATUS*/
                    {
                        using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                        {
                            try
                            {

                                if (!_log.IsDebugEnabled)
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }


                                SqlParameter bUnit = new SqlParameter("@Mode", _strbUnit);
                                SqlParameter UsrId = new SqlParameter("@SearchString", _strUserID);
                                SqlParameter EvntId = new SqlParameter("@StartPosition", _strEventID);
                                SqlParameter paramStatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                                paramStatusCode.Direction = System.Data.ParameterDirection.Output;
                                SqlParameter transID = new SqlParameter("@transID", System.Data.SqlDbType.Int);
                                transID.Direction = System.Data.ParameterDirection.Output;
                                //need to check
                                var result = objContext.Database.ExecuteSqlCommand("EXEC GetCancelTransDtls @bunit, @userID, @eventID, @StatusCode out,transID out", bUnit, UsrId, EvntId, paramStatusCode, transID);
                                statusCode = long.Parse(paramStatusCode.Value.ToString());
                                _lngtransID = long.Parse(transID.Value.ToString());

                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    trans.Rollback();
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to insert the data in middle tier tables: StatusCode is :" + statusCode);
                                    return new Tuple<long, List<MT_CYCT_EVENT_DETAIL>, List<object>>(AtparStatusCodes.E_SERVERERROR, null, null);
                                }
                                trans.Commit();
                            }
                            catch (Exception ex)
                            {
                                trans.Rollback();
                                return new Tuple<long, List<MT_CYCT_EVENT_DETAIL>, List<object>>(AtparStatusCodes.E_SERVERERROR, null, null);
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                            }
                        }
                    }

                    else
                    {
                        if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION] == System.DBNull.Value)
                            _lngtransID = (int)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION];
                    }

                    //Check if the count qty needs to be displayed or not when event is downloaded
                    if (inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_PreReqData_Enum.REVIEW_COUNTS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() &&
                        (_blnRecountAndNew || _blnRecount))
                        _blnDisplayCnts = false;



                    if ((pBlnEventSplit) && (!_blnGetRecounttransID && !RecountCheck))
                    {
                        //Checking recounts for user
                        if (!RecountCheck)
                        {
                            statusCode = CheckRecountsExist(_strbUnit, _strUserID, _strEventID);

                            if (statusCode == AtparStatusCodes.S_CYCT_RECOUNTS_EXIST)
                            {
                                if (_log.IsWarnEnabled)
                                {
                                    _log.Fatal(methodBaseName + ":Recounts exist for the user.And status code returned is: " + AtparStatusCodes.S_CYCT_RECOUNTS_EXIST);
                                    return new Tuple<long, List<MT_CYCT_EVENT_DETAIL>, List<object>>(AtparStatusCodes.S_CYCT_RECOUNTS_EXIST, null, null);
                                }
                            }
                            else if (statusCode != AtparStatusCodes.ATPAR_OK)
                                return new Tuple<long, List<MT_CYCT_EVENT_DETAIL>, List<object>>(statusCode, null, null);
                        }
                        //End of Checking recounts for user

                        _sbSQL.Remove(0, _sbSQL.Length);
                        _sbSQL.Append("SELECT B.TRANSACTION_ID, B.ITEM_REC_NUM, B.INV_ITEM_ID, B.STORAGE_AREA, B.STOR_LEVEL_1, ");
                        _sbSQL.Append("B.STOR_LEVEL_2, B.STOR_LEVEL_3, B.STOR_LEVEL_4, B.CONTAINER_ID, B.STAGED_DATE, ");
                        _sbSQL.Append("B.SERIAL_ID, B.INV_LOT_ID, B.UNIT_OF_MEASURE, B.SYS_QTY, B.DESCRIPTION, ");
                        _sbSQL.Append("B.UPC_ID, B.MFG_ITEM_ID, B.VEND_ITEM_ID, B.GTIN, B.INVENTORY_TAG_ID, ");
                        _sbSQL.Append("B.CUSTOM_ITEM_NO, B.ITEM_PRICE, A.PARENT_EVENT_ID, ");
                        _sbSQL.Append("B.REPORT_FIELD_1, B.REPORT_FIELD_2, B.REPORT_FIELD_3, B.REPORT_FIELD_4, B.PACKAGING_STRING, B.UOM_TYPE ,B.STD_PACK_UOM, ");
                        _sbSQL.Append("B.L_S_CONTROLLED, B.CONSIGNED_FLAG, 0 AS EVENT_TYPE, 'Y' AS RECOUNT_FLAG ,B.LOT_CONTROLLED,B.SERIAL_CONTROLLED ");
                        _sbSQL.Append("FROM MT_CYCT_EVENT_DETAIL_MASTER B, MT_CYCT_EVENT_HDR_MASTER A ");
                        _sbSQL.Append("WHERE A.TRANSACTION_ID = B.TRANSACTION_ID ");
                        _sbSQL.Append("AND A.TRANSACTION_ID IN (SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR_MASTER ");
                        _sbSQL.Append("WHERE BUSINESS_UNIT = '" + _strbUnit + "' ");
                        _sbSQL.Append("AND EVENT_ID = '" + _strEventID + "') ");
                    }

                    else
                    {
                        _sbSQL.Append("SELECT B.UPDATE_DATE, B.TRANSACTION_ID, B.ITEM_REC_NUM, B.INV_ITEM_ID, B.STORAGE_AREA, ");
                        _sbSQL.Append("B.STOR_LEVEL_1, B.STOR_LEVEL_2, B.STOR_LEVEL_3, B.STOR_LEVEL_4, B.CONTAINER_ID, ");
                        _sbSQL.Append("B.STAGED_DATE, B.SERIAL_ID, B.INV_LOT_ID, B.UNIT_OF_MEASURE, B.SYS_QTY, ");
                        _sbSQL.Append("B.DESCRIPTION, B.UPC_ID, B.MFG_ITEM_ID, B.VEND_ITEM_ID, B.GTIN, ");
                        _sbSQL.Append("B.INVENTORY_TAG_ID, B.CUST_ITEM_NO, B.COUNT_QTY, A.PARENT_EVENT_ID, ");
                        _sbSQL.Append("B.REPORT_FIELD_1, B.REPORT_FIELD_2, B.REPORT_FIELD_3, B.REPORT_FIELD_4, B.PACKAGING_STRING,B.ITEM_PRICE, B.UOM_TYPE,B.STD_PACK_UOM, ");
                        _sbSQL.Append("B.L_S_CONTROLLED, B.CONSIGNED_FLAG, A.EVENT_TYPE, B.RECOUNT_FLAG ,B.LOT_CONTROLLED,B.SERIAL_CONTROLLED ");
                        _sbSQL.Append("FROM MT_CYCT_EVENT_DETAIL B , MT_CYCT_EVENT_HDR A ");
                        _sbSQL.Append("WHERE A.TRANSACTION_ID = B.TRANSACTION_ID ");
                        _sbSQL.Append("AND A.TRANSACTION_ID = " + _lngtransID + " ");

                        if ((inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID].ToString() == "true") ||
                            (_blnGetRecountCanceltransID))
                            _sbSQL.Append("AND A.EVENT_STATUS IS NULL ");
                        else
                            _sbSQL.Append("AND A.EVENT_STATUS NOT IN ( '" + AtParDefns.statCancel + "' , '" + AtParDefns.statEventCountComplete + "' , '" + AtParDefns.statSent + "' ) ");

                        if ((!_blnCountAndNew) && (!_blnRecountAndNew) && (!_blnRecount))
                            _sbSQL.Append("AND COUNT_QTY IS NULL");
                        else if (_blnRecountAndNew)
                            _sbSQL.Append("AND ((RECOUNT_FLAG = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "' AND RECOUNT_USER_ID = '" + _strUserID + "') OR COUNT_QTY IS NULL) ");
                        else if (_blnRecount)
                            _sbSQL.Append("AND RECOUNT_FLAG = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "' AND RECOUNT_USER_ID = '" + _strUserID + "' ");
                    }
                    var fields = new[] { "BUSINESS_UNIT", "PARENT_EVENT_ID", "EVENT_ID", "TRANSACTION_ID" };

                    var _lstEventDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_DETAIL>(fields, _sbSQL.ToString()).ToList();
                    List<object> boolVariables = new List<object> { _blnDisplayCnts, pBlnEventSplit, _blnGetRecounttransID, RecountCheck, _blnGetRecountCanceltransID, _strbUnit, _strEventID, _lngtransID };
                    return new Tuple<long, List<MT_CYCT_EVENT_DETAIL>, List<object>>(AtparStatusCodes.ATPAR_OK, _lstEventDetails, boolVariables);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return new Tuple<long, List<MT_CYCT_EVENT_DETAIL>, List<object>>(AtparStatusCodes.E_SERVERERROR, null, null);
            }
            finally
            {
                _sbSQL = null;
            }
        }



        public long CheckRecountsExist(string bUnit, string UserID, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long statusCode;
            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    SqlParameter bUnits = new SqlParameter("@bunit", bUnit);
                    SqlParameter UsrId = new SqlParameter("@userID", UserID);
                    SqlParameter EvntId = new SqlParameter("@eventID", eventID);
                    SqlParameter paramStatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                    paramStatusCode.Direction = System.Data.ParameterDirection.Output;

                    var result = objContext.Database.ExecuteSqlCommand("EXEC CheckRecountsExist @bunit, @userID, @eventID, @StatusCode out", bUnits, UsrId, EvntId, paramStatusCode);
                    statusCode = long.Parse(paramStatusCode.Value.ToString());

                    if (statusCode == AtparStatusCodes.S_CYCT_RECOUNTS_EXIST)
                    {
                        return AtparStatusCodes.S_CYCT_RECOUNTS_EXIST;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed check Recount exists " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSQL = null;
            }

            return AtparStatusCodes.ATPAR_OK;
        }
        public long DeleteEvents(string bUnit, string eventID, string TransId, string AllocFlag, string StrDtldCntHst)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (StrDtldCntHst == AtParWebEnums.YesNo_Enum.N.ToString())
                        {
                            try
                            {
                                _sbSQL.Append("DELETE FROM MT_CYCT_EVENT_DETAIL ");
                                _sbSQL.Append("WHERE TRANSACTION_ID = '" + TransId + "' ");
                                if (!_log.IsDebugEnabled)
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                                objContext.Database.SqlQuery<int>(_sbSQL.ToString()).First();
                            }
                            catch (Exception ex)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                            }

                            try
                            {
                                _sbSQL.Remove(0, _sbSQL.Length);
                                _sbSQL.Append("DELETE FROM MT_CYCT_ITEM_UOM ");
                                _sbSQL.Append("WHERE BUSINESS_UNIT = '" + bUnit + "' ");
                                _sbSQL.Append("AND EVENT_ID = '" + eventID + "' ");

                                if (!_log.IsDebugEnabled)
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                                objContext.Database.SqlQuery<int>(_sbSQL.ToString()).First();
                            }
                            catch (Exception ex)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                            }
                            try
                            {
                                _sbSQL.Remove(0, _sbSQL.Length);
                                _sbSQL.Append("DELETE FROM MT_CYCT_EVENT_HDR  ");
                                _sbSQL.Append("WHERE TRANSACTION_ID ='" + TransId + "' ");

                                if (!_log.IsDebugEnabled)
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                                objContext.Database.SqlQuery<int>(_sbSQL.ToString()).First();
                            }
                            catch (Exception ex)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                            }
                        }

                        else if (StrDtldCntHst == AtParWebEnums.YesNo_Enum.Y.ToString())
                        {
                            // As we are not deleting the event info from event header and details tables
                            // we have to keep the event in SENT status.

                            try
                            {
                                _sbSQL.Remove(0, _sbSQL.Length);
                                _sbSQL.Append(" UPDATE MT_CYCT_EVENT_HDR SET EVENT_STATUS = '").Append(AtParWebEnums.AppTransactionStatus.Sent);
                                _sbSQL.Append("', SEND_DATE_TIME = '").Append(DateTime.Now).Append("'");
                                _sbSQL.Append(" WHERE TRANSACTION_ID = '" + TransId + "' ");

                                if (!_log.IsDebugEnabled)
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                                objContext.Database.SqlQuery<int>(_sbSQL.ToString()).First();
                            }
                            catch (Exception ex)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                            }
                        }

                        if (string.IsNullOrEmpty(AllocFlag))
                        {
                            try
                            {
                                _sbSQL.Remove(0, _sbSQL.Length);
                                _sbSQL.Append("DELETE FROM MT_CYCT_EVENT_ALLOCATION  ");
                                _sbSQL.Append("WHERE BUSINESS_UNIT ='" + bUnit + "' ");
                                _sbSQL.Append("WHERE EVENT_ID ='" + eventID + "' ");
                                if (!_log.IsDebugEnabled)
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                                objContext.Database.SqlQuery<int>(_sbSQL.ToString()).First();
                            }
                            catch (Exception ex)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                            }

                        }
                        trans.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSQL = null;
            }

        }


        public long InsertHdrDetAndUpdateEventTran(DataSet InputParameters, DataSet OutputParameters, string[] DeviceTokenEntry, long TransId, bool GetRecountTransID, bool GetRecountCancelTransID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            long statuscode = -1;
            try
            {


                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (!GetRecountTransID && !GetRecountCancelTransID)
                        {
                            statuscode = InsertHdrAndDetails(InputParameters, OutputParameters, TransId, objContext, DeviceTokenEntry);

                            if (statuscode != AtparStatusCodes.ATPAR_OK)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " :insert Events info into HEADER, DETAILS, ITEM UOM tables with statucode " + statuscode);
                                return AtparStatusCodes.E_SERVERERROR;
                            }

                        }
                        if ((!Convert.ToBoolean(InputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.SEND_OLD_TRANSACTION]) &&
                            !GetRecountCancelTransID) || OutputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count > 0 &&
                            Convert.ToBoolean(InputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.SEND_OLD_TRANSACTION]) &&
                            InputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_STATUS].ToString() == ((int)AtParDefns.statEventCounting).ToString()
                            || GetRecountCancelTransID)

                        //if ((InputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.SEND_OLD_TRANSACTION].ToString() == "true") && 
                        //    (OutputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count > 0) &&                           
                        //   ((int)InputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_STATUS] == AtParDefns.statEventCounting))
                        {
                            statuscode = UpdateEventTransaction(Convert.ToInt32(InputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.Get_Event_Details_Enum.TRANSACTION.ToString()].ToString())
                                         , Convert.ToInt32(OutputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID.ToString()].ToString())
                                            , objContext, DeviceTokenEntry);

                            if (statuscode != AtparStatusCodes.ATPAR_OK)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " :Failed toupdate the transaction for the event in HEADER and DETAILS tables with statucode " + statuscode);
                                return AtparStatusCodes.E_SERVERERROR;
                            }
                        }

                        if (GetRecountTransID || GetRecountCancelTransID)
                        {
                            statuscode = UpdateHeaderStatus(Convert.ToInt32(OutputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID.ToString()]),
                                            AtParDefns.statDownloaded, objContext);
                            if (statuscode != AtparStatusCodes.ATPAR_OK)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(":Failed in " + methodBaseName + " with " + statuscode);
                                return AtparStatusCodes.E_SERVERERROR;
                            }
                        }

                        trans.Commit();
                    }
                }
                return AtparStatusCodes.ATPAR_OK;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally { _sbSQL = null; }

        }

        private long InsertHdrAndDetails(DataSet InputParameters, DataSet OutputParameters, long TransId, ATPAR_MT_Context objContext, string[] DeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            DataRow _drEventOutputParams;
            string _itemRecNum = String.Empty;
            int _intDetailsCnt = 0;
            string _strLoc = string.Empty;
            string _dtLatestDate = "1900-01-01 00:00:00";
            int _intAltUomCnt;
            //Insert the data into HEADER, DETAILS and ITEM_UOM tables if insert flag is true
            _drEventOutputParams = OutputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];
            if (!string.IsNullOrEmpty(InputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.INSERT_FLAG].ToString())
                &&InputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.INSERT_FLAG].ToString().ToLower() == "true")
            {
                _sbSQL.Append("INSERT INTO MT_CYCT_EVENT_HDR( ");
                _sbSQL.Append("BUSINESS_UNIT, ");
                _sbSQL.Append("EVENT_ID, ");
                _sbSQL.Append("UPDATE_DATE, ");
                _sbSQL.Append("TRANSACTION_ID, ");
                _sbSQL.Append("USER_ID, ");
                _sbSQL.Append("PARENT_EVENT_ID, ");
                _sbSQL.Append("EVENT_STATUS ) ");
                _sbSQL.Append("VALUES( ");
                _sbSQL.Append("'" + _drEventOutputParams[AtParWebEnums.Get_Event_DetailOutput_Header_Enum.BUSINESS_UNIT.ToString()] + "', ");
                _sbSQL.Append("'" + _drEventOutputParams[AtParWebEnums.Get_Event_DetailOutput_Header_Enum.EVENT_ID.ToString()] + "', ");
                _sbSQL.Append("GETDATE() , ");
                _sbSQL.Append(" " + TransId + " , ");
                _sbSQL.Append("'" + DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "', ");
                _sbSQL.Append("'" + _drEventOutputParams[AtParWebEnums.Get_Event_DetailOutput_Header_Enum.PARENT_EVENT_ID.ToString()] + "', ");
                _sbSQL.Append("'" + AtParDefns.statDownloaded + "') ");

                try
                {
                    if (!_log.IsDebugEnabled)
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                }
                catch (Exception ex)
                {

                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                    return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                }

                foreach (DataRow _drEventDetails in OutputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows)
                {

                    if (InputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.IS_ITEM_FROM_ERP].ToString().ToLower() == "true")
                    {
                        //If output dataset built from ERP then add the item rec num value into the dataset
                        //if not it comes from middle tier
                        //_itemRecNum = "1" + Right("00000000000" & _lngtransID, 11) & Right("000000" & _intDetailsCnt, 6)
                        string trnsString = "00000000000" + TransId;
                        string cntString = "000000" + _intDetailsCnt;
                        _itemRecNum = "1" + trnsString.Substring(trnsString.Length - 11, 11) + cntString.Substring(cntString.Length - 6, 6);

                      //  _itemRecNum = "1" + ("00000000000" + TransId) + ("000000" + _intDetailsCnt);
                        _drEventDetails[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] = _itemRecNum;
                    }

                    _strLoc = string.Empty;
                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA] != System.DBNull.Value)
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA].ToString();

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1] != System.DBNull.Value)
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1].ToString();

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2] != System.DBNull.Value)
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2].ToString();

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3] != System.DBNull.Value)
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3].ToString();

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4] != System.DBNull.Value)
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4].ToString();

                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOCATION] = _strLoc;

                    _sbSQL.Remove(0, _sbSQL.Length);
                    _sbSQL.Append("INSERT INTO MT_CYCT_EVENT_DETAIL( ");
                    _sbSQL.Append("TRANSACTION_ID, ");
                    _sbSQL.Append("INV_ITEM_ID, ");
                    _sbSQL.Append("STORAGE_AREA, ");
                    _sbSQL.Append("STOR_LEVEL_1, ");
                    _sbSQL.Append("STOR_LEVEL_2, ");
                    _sbSQL.Append("STOR_LEVEL_3, ");
                    _sbSQL.Append("STOR_LEVEL_4, ");
                    _sbSQL.Append("CONTAINER_ID, ");
                    _sbSQL.Append("INVENTORY_TAG_ID, ");
                    _sbSQL.Append("SERIAL_ID, ");
                    _sbSQL.Append("INV_LOT_ID, ");
                    _sbSQL.Append("UNIT_OF_MEASURE, ");
                    _sbSQL.Append("LATEST_UPDATE_DATE, ");

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] != System.DBNull.Value)
                    {
                        _sbSQL.Append("COUNT_QTY, ");
                    }
                        _sbSQL.Append("SYS_QTY, ");

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR] != System.DBNull.Value)
                    {
                        _sbSQL.Append("DESCRIPTION, ");
                    }

                    _sbSQL.Append("UPC_ID, ");
                    _sbSQL.Append("MFG_ITEM_ID, ");
                    _sbSQL.Append("VEND_ITEM_ID, ");
                    _sbSQL.Append("GTIN, ");
                    _sbSQL.Append("ITEM_PRICE, ");
                    _sbSQL.Append("RECOUNT_FLAG, ");
                    _sbSQL.Append("ITEM_REC_NUM, ");
                    _sbSQL.Append("STAGED_DATE, ");
                    _sbSQL.Append("CUST_ITEM_NO ");

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MANUFACTURER] != System.DBNull.Value)
                    {
                        _sbSQL.Append(", MANUFACTURER ");
                    }
                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PROJECT_ID] != System.DBNull.Value)
                    {
                        _sbSQL.Append(",PROJECT_ID ");
                    }

                    _sbSQL.Append(",REPORT_FIELD_1 ");
                    _sbSQL.Append(",REPORT_FIELD_2 ");
                    _sbSQL.Append(",REPORT_FIELD_3 ");
                    _sbSQL.Append(",REPORT_FIELD_4 ");
                    _sbSQL.Append(",PACKAGING_STRING ");
                    _sbSQL.Append(",UOM_TYPE ");
                    _sbSQL.Append(",STD_PACK_UOM ");
                    _sbSQL.Append(",L_S_CONTROLLED ");
                    _sbSQL.Append(",CONSIGNED_FLAG ");
                    _sbSQL.Append(",LOT_CONTROLLED ");
                    _sbSQL.Append(",SERIAL_CONTROLLED ");
                    _sbSQL.Append(") VALUES( ");
                    _sbSQL.Append(TransId + ",");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID] + "', ");

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA] != System.DBNull.Value)
                        _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA] + "', ");//GetDatabaseString
                    else
                        _sbSQL.Append("'',");

                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE] + "', ");
                    _sbSQL.Append("'" + _dtLatestDate + "', ");

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] != System.DBNull.Value)
                    {
                        _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] + "', ");
                    }

                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] + "', ");

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR] != System.DBNull.Value)
                    {
                        _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR] + "', ");
                    }

                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPC_ID] + "', ");

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID] != System.DBNull.Value)
                        _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID] + "', ");
                    else
                        _sbSQL.Append("'',");

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID] != System.DBNull.Value)
                        _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID] + "', ");
                    else
                        _sbSQL.Append("'',");

                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.GTIN] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PRICE] + "', ");
                    _sbSQL.Append("'" + AtParWebEnums.YesNo_Enum.N.ToString() + "', ");

                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO] + "', ");

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MANUFACTURER] != System.DBNull.Value)
                    {
                        _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MANUFACTURER] + "', ");
                    }
                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PROJECT_ID] != System.DBNull.Value)
                    {
                        _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PROJECT_ID] + "', ");
                    }

                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_1] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_2] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_3] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_4] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PACKAGING_STRING] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED] + "', ");
                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED] + "' ");
                    _sbSQL.Append(")");

                    try
                    {
                        if (!_log.IsDebugEnabled)
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                        objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + "Failed to insert into event details table with following with SQL....." + _sbSQL.ToString() + ex.ToString());
                        return AtparStatusCodes.E_SERVERERROR;
                    }


                    _intAltUomCnt = 0;
                    //'Note :  We are inserting the data into Item_uom table only when we have alternate uom's for the item
                    //'If we are having an alternate uom then the alternate uom count for that item will always be > 1
                    //'which means the item has alternate uoms and we need to insert the data into item_uom table

                    int _intAltUomCount=0;

                    try
                    {
                        _intAltUomCount = OutputParameters.Tables[AtParWebEnums.DataSet_Type.ALTERNATEUOMS.ToString()]
                                        .Select("[" + OutputParameters.Tables[AtParWebEnums.DataSet_Type.ALTERNATEUOMS.ToString()]  
                                         .Columns[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.INV_ITEM_ID].ColumnName + "] = '"
                                         + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID] + "'").Length;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + "Failed to get the alternate Uom Count" + ex.ToString());
                        return AtparStatusCodes.E_SERVERERROR;
                    }

                    if (_intAltUomCount > 0)
                    {
                        foreach (DataRow _drAltUomsDetails in OutputParameters.Tables[AtParWebEnums.DataSet_Type.ALTERNATEUOMS.ToString()].Rows)
                        {
                            if (_drAltUomsDetails[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.INV_ITEM_ID].ToString() == _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID].ToString())
                            {
                                _drAltUomsDetails[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.ITEM_REC_NUM] = _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM];
                                //Insert the standard UOM and conversion factor for the item

                                if (_intAltUomCnt == 0)
                                {
                                    _sbSQL.Remove(0, _sbSQL.Length);

                                    //TODO: If not exists is implemented as a temporary fix as we are 
                                    //getting primary key violations when event split and either in 
                                    //complete or cancel status

                                    _sbSQL.Append("IF NOT EXISTS (SELECT ITEM_REC_NUM FROM MT_CYCT_ITEM_UOM ");
                                    _sbSQL.Append("WHERE ITEM_REC_NUM = '" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM] + "'");
                                    _sbSQL.Append("AND USER_ID = '" + DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");
                                    _sbSQL.Append("AND UOM = '" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE] + "') ");
                                    _sbSQL.Append("INSERT INTO MT_CYCT_ITEM_UOM (");
                                    _sbSQL.Append("ITEM_REC_NUM, ");
                                    _sbSQL.Append("USER_ID, ");
                                    _sbSQL.Append("UOM, ");
                                    _sbSQL.Append("CONVERSION_RATE, ");
                                    _sbSQL.Append("BUSINESS_UNIT, ");
                                    _sbSQL.Append("EVENT_ID, ");
                                    _sbSQL.Append("INV_ITEM_ID, ");
                                    _sbSQL.Append("UOM_TYPE )");
                                    _sbSQL.Append("VALUES (");
                                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM] + "', ");
                                    _sbSQL.Append("'" + DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "', ");
                                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE] + "', ");
                                    _sbSQL.Append(standardConvFac + ", ");
                                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.BUSINESS_UNIT] + "', ");
                                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.EVENT_ID] + "', ");
                                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID] + "', ");
                                    _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE] + "') ");

                                    try
                                    {
                                        if (!_log.IsDebugEnabled)
                                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                                        objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                                    }
                                    catch (Exception ex)
                                    {
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + "Failed to insert into event alternate uom table with the following qurey....." + _sbSQL.ToString() + ex.ToString());
                                        return AtparStatusCodes.E_SERVERERROR;
                                    }
                                    _intAltUomCnt = _intAltUomCnt + 1;
                                }
                                _sbSQL.Remove(0, _sbSQL.Length);

                                //Insert the alternate Uom's and conversion factors for the item
                                //TODO: If not exists is implemented as a temporary fix as we are 
                                //getting primary key violations when event split and either in 
                                //complete or cancel status

                                _sbSQL.Append("IF NOT EXISTS (SELECT ITEM_REC_NUM FROM MT_CYCT_ITEM_UOM ");
                                _sbSQL.Append("WHERE ITEM_REC_NUM = '" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM] + "'");
                                _sbSQL.Append("AND USER_ID = '" + DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");
                                _sbSQL.Append("AND UOM = '" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE] + "') ");
                                _sbSQL.Append("INSERT INTO MT_CYCT_ITEM_UOM (");
                                _sbSQL.Append("ITEM_REC_NUM, ");
                                _sbSQL.Append("USER_ID, ");
                                _sbSQL.Append("UOM, ");
                                _sbSQL.Append("CONVERSION_RATE, ");
                                _sbSQL.Append("BUSINESS_UNIT, ");
                                _sbSQL.Append("EVENT_ID, ");
                                _sbSQL.Append("INV_ITEM_ID, ");
                                _sbSQL.Append("UOM_TYPE )");
                                _sbSQL.Append("VALUES (");
                                _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM] + "', ");
                                _sbSQL.Append("'" + DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "', ");
                                _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE] + "', ");
                                _sbSQL.Append("'"+_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONVERSION_RATE] + "', ");
                                _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.BUSINESS_UNIT] + "', ");
                                _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.EVENT_ID] + "', ");
                                _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID] + "', ");
                                _sbSQL.Append("'" + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE] + "') ");

                                try
                                {
                                    if (!_log.IsDebugEnabled)
                                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                                    objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + "Failed to insert into event alternate uom table with the following qurey....." + _sbSQL.ToString() + ex.ToString());
                                    return AtparStatusCodes.E_SERVERERROR;
                                }
                            }

                        }
                    }

                    _intDetailsCnt = _intDetailsCnt + 1;
                }

            }

            return AtparStatusCodes.ATPAR_OK;
        }

        private long UpdateEventTransaction(long TransId, long NewTransId, ATPAR_MT_Context objContext, string[] DeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            int count;

            try
            {

                _sbSQL.Append("UPDATE MT_CYCT_EVENT_HDR SET TRANSACTION_ID= '" + NewTransId + "' ");
                _sbSQL.Append("WHERE TRANSACTION_ID= '" + TransId + "' ");

                if (!_log.IsDebugEnabled)
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

            try
            {
                _sbSQL.Remove(0, _sbSQL.Length);
                _sbSQL.Append("UPDATE MT_CYCT_EVENT_DETAIL SET TRANSACTION_ID= '" + NewTransId + "' ");
                _sbSQL.Append("WHERE TRANSACTION_ID= '" + TransId + "' ");

                if (!_log.IsDebugEnabled)
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

            return AtparStatusCodes.ATPAR_OK;
        }

        public List<MT_CYCT_ITEM_UOM_MASTER> GetItemUomMaster(bool pBlnEventSplit, string ITEM_REC_NUM, string UNIT_OF_MEASURE, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    sbSQL.Append("SELECT UOM, CONVERSION_RATE, ITEM_REC_NUM, UOM_TYPE ");

                    if (pBlnEventSplit)
                    {
                        sbSQL.Append("FROM MT_CYCT_ITEM_UOM_MASTER ");
                    }
                    else
                    {
                        sbSQL.Append("FROM MT_CYCT_ITEM_UOM ");
                    }

                    sbSQL.Append("WHERE ITEM_REC_NUM = '" + ITEM_REC_NUM + "' ");

                    if (!pBlnEventSplit)
                    {
                        sbSQL.Append("AND USER_ID = '" + userID + "' ");
                    }

                    sbSQL.Append("AND UOM <> '" + UNIT_OF_MEASURE + "' ");
                    if (!_log.IsDebugEnabled)
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + " Get the alternate UOM's for the item " + "with the following SQL...." + sbSQL.ToString() + ":")); }
                    string[] columns = { "UOM", "CONVERSION_RATE", "ITEM_REC_NUM", "UOM_TYPE" };
                    var _dsItemAltUomDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_ITEM_UOM_MASTER>(columns, sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + _dsItemAltUomDetails.Count); }
                    return _dsItemAltUomDetails;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }

            finally
            {
                sbSQL = null;
            }
        }

        public long InsertHdrDetAndUpdateEventTran(DataSet InputParameters, DataSet OutputParameters, string[] DeviceTokenEntry, long TransId)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region GetEventItems
        private long InsertEventHdrMaster(long transactionID, string businessUnit, string subEventID, string eventID, int item, string userID, int orderBy, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_CYCT_EVENT_HDR_MASTER(TRANSACTION_ID,BUSINESS_UNIT,EVENT_ID,")
                    .Append("PARENT_EVENT_ID,NO_OF_ITEMS,UPDATE_USER_ID,UPDATE_DATE,SORT_BY_FIELD)VALUES('")
                    .Append(transactionID).Append("',").Append("'").Append(businessUnit).Append("','")
                    .Append(subEventID).Append("','").Append(eventID).Append("',").Append(item).
                    Append(",").Append("'").Append(userID).Append("','").Append(DateTime.Now).Append("',").Append(orderBy).Append(")");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long UpdateEventHdrMaster(string fromLoc, long transactionID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_CYCT_EVENT_HDR_MASTER SET [FROM]='").Append(fromLoc).Append("' WHERE TRANSACTION_ID=").Append(transactionID);

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long UpdateHdrMasterToLoc(string toLoc, long transactionID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                  if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_CYCT_EVENT_HDR_MASTER SET [TO]='").Append(toLoc).Append("' WHERE TRANSACTION_ID=").Append(transactionID);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
                    return AtparStatusCodes.ATPAR_OK;
                
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        //public void insertEventDetailMaster(DataSet pdsEvents)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    StringBuilder sbSql = new StringBuilder();

        //    try
        //    {
        //        using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
        //        {
        //            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


        //            sbSql.Append("INSERT INTO MT_CYCT_EVENT_DETAIL_MASTER(TRANSACTION_ID,ITEM_REC_NUM,DESCRIPTION,INV_ITEM_ID,STORAGE_AREA, UPC_ID,STOR_LEVEL_1, STOR_LEVEL_2, STOR_LEVEL_3,STOR_LEVEL_4, CONTAINER_ID,STAGED_DATE,SERIAL_ID, INV_LOT_ID,UNIT_OF_MEASURE,SYS_QTY,MFG_ITEM_ID, VEND_ITEM_ID,CUSTOM_ITEM_NO, ITEM_PRICE,INVENTORY_TAG_ID, GTIN, REPORT_FIELD_1, REPORT_FIELD_2, REPORT_FIELD_3, REPORT_FIELD_4, PACKAGING_STRING, UOM_TYPE,STD_PACK_UOM, L_S_CONTROLLED, CONSIGNED_FLAG,LOT_CONTROLLED,SERIAL_CONTROLLED) VALUES('")
        //                .Append(lngTransactionId).Append("', '").Append(strItemrec).Append("','")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["DESCRIPTION"].ToString())
        //                .Append("', '").Append(pdsEvents.Tables[0].Rows[intCntItems]["INV_ITEM_ID"].ToString()).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["STORAGE_AREA"].ToString()).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["UPC_ID"].ToString()).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_1"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_2"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_3"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_4"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["CONTAINER_ID"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["STAGED_DATE"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["SERIAL_ID"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["INV_LOT_ID"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["UNIT_OF_MEASURE"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["SYS_QTY"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["MFG_ITEM_ID")
        //                .Append("', '" + pdsEvents.Tables[0].Rows[intCntItems]["VEND_ITEM_ID"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["CUSTOM_ITEM_NO"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["ITEM_PRICE"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["INVENTORY_TAG_ID"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["GTIN"]).Append("', '")
        //                .Append(pdsEvents.Tables[0].Rows[intCntItems]["REPORT_FIELD_1"]
        //                + "', '" + pdsEvents.Tables[0].Rows[intCntItems]["REPORT_FIELD_2"] + "', '" +
        //                pdsEvents.Tables[0].Rows[intCntItems]["REPORT_FIELD_3"] + "', '" +
        //                pdsEvents.Tables[0].Rows[intCntItems]["REPORT_FIELD_4"] + "', '" +
        //                pdsEvents.Tables[0].Rows[intCntItems]["PACKAGING_STRING"] + "', '" +
        //                pdsEvents.Tables[0].Rows[intCntItems]["UOM_TYPE"] + "', '" +
        //                pdsEvents.Tables[0].Rows[intCntItems]["STD_PACK_UOM") + "', '" +
        //                pdsEvents.Tables[0].Rows[intCntItems]["L_S_CONTROLLED"] + "', '" +
        //                pdsEvents.Tables[0].Rows[intCntItems]["CONSIGNED_FLAG"] + "', '" +
        //                pdsEvents.Tables[0].Rows[intCntItems]["LOT_CONTROLLED"] + "', '" +
        //                pdsEvents.Tables[0].Rows[intCntItems]["SERIAL_CONTROLLED"] + "'" + ")");



        //            if (!_log.IsDebugEnabled)
        //            {
        //                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
        //            }
        //            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
        //            return AtparStatusCodes.ATPAR_OK;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
        //        return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
        //    }
        //    finally
        //    {
        //        sbSql = null;
        //    }
        //}
        public long GetEventItems(string bUnit, string eventID, List<MT_CYCLECOUNT_SUBEVENTS> PdsSubEventNames,  string userID,
            string ProfileId, string OrgGroupId, string OrderBy, string StrFromLoc, string StrToLoc, string outXml, string[] DeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int intCntItems = 0;
            int intCntSplit = 0;
            int intItems = 0;
            int intItemSplit = 0;
            int intItemsRem = 0;

            //SW-0005604
        
            string strItemrec = null;
            int intRecCount = 0;
            string descr = string.Empty;
            string defaultItem = string.Empty;
            string price = string.Empty;
            XDocument xmlDom = new XDocument();
            //XNode xmlRoot = default(XNode);
            //XNode xmlRecord = default(XNode);
            //XNode xmlItem = default(XNode);
            //XNode xmlItemChild = default(XNode);
            DataRow itemRow = default(DataRow);
            DataTable dtEvents = default(DataTable);
            DataView dvEvents = default(DataView);
            DataSet pdsEvents = new DataSet();
            string strOrderby = string.Empty;
            int intOrderby = 0;
            string strUpdateSql = null;
            DataTable _dtItemAltUom = new DataTable();
            DataRow _drItemAltUom = default(DataRow);
            string _strItemId = null;
            DataSet _dsItemAltUom = new DataSet();
            DataRow[] _drAltUom = null;
            //DataRow _dr = default(DataRow);
            StringBuilder _sbAltUom = new StringBuilder();
            DataRow[] _drUomExist = null;
            string _strUom = string.Empty;
            StringBuilder _sbStandardUom = new StringBuilder();
            _dtItemAltUom.Columns.Add("UNIT_OF_MEASURE", Type.GetType("System.String"));
            _dtItemAltUom.Columns.Add("CONVERSION_RATE", Type.GetType("System.Double"));
            _dtItemAltUom.Columns.Add("INV_ITEM_ID", Type.GetType("System.String"));
            _dtItemAltUom.Columns.Add("UOM_TYPE", Type.GetType("System.String"));

            //NB-0005059
            string strFromLoc = null;
            string strToLoc = null;
            dtEvents = new DataTable("EVENTS");
            dtEvents.Columns.Add("INV_ITEM_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
            dtEvents.Columns.Add("STORAGE_AREA", Type.GetType("System.String"));
            dtEvents.Columns.Add("STOR_LEVEL_1", Type.GetType("System.String"));
            dtEvents.Columns.Add("STOR_LEVEL_2", Type.GetType("System.String"));
            dtEvents.Columns.Add("STOR_LEVEL_3", Type.GetType("System.String"));
            dtEvents.Columns.Add("STOR_LEVEL_4", Type.GetType("System.String"));
            dtEvents.Columns.Add("CONTAINER_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("STAGED_DATE", Type.GetType("System.String"));
            dtEvents.Columns.Add("SERIAL_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("INV_LOT_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("UNIT_OF_MEASURE", Type.GetType("System.String"));
            dtEvents.Columns.Add("SYS_QTY", Type.GetType("System.String"));
            dtEvents.Columns.Add("UPC_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("MFG_ITEM_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("VEND_ITEM_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("CUSTOM_ITEM_NO", Type.GetType("System.String"));
            dtEvents.Columns.Add("ITEM_PRICE", Type.GetType("System.String"));
            dtEvents.Columns.Add("INVENTORY_TAG_ID", Type.GetType("System.String"));
            //NB-0004387
            dtEvents.Columns.Add("GTIN", Type.GetType("System.String"));
            dtEvents.Columns.Add("REPORT_FIELD_1", Type.GetType("System.String"));
            dtEvents.Columns.Add("REPORT_FIELD_2", Type.GetType("System.String"));
            dtEvents.Columns.Add("REPORT_FIELD_3", Type.GetType("System.String"));
            dtEvents.Columns.Add("REPORT_FIELD_4", Type.GetType("System.String"));
            dtEvents.Columns.Add("PACKAGING_STRING", Type.GetType("System.String"));
            dtEvents.Columns.Add("UOM_TYPE", Type.GetType("System.String"));
            dtEvents.Columns.Add("STD_PACK_UOM", Type.GetType("System.String"));
            dtEvents.Columns.Add("L_S_CONTROLLED", Type.GetType("System.String"));
            dtEvents.Columns.Add("LOT_CONTROLLED", Type.GetType("System.String"));
            dtEvents.Columns.Add("SERIAL_CONTROLLED", Type.GetType("System.String"));
            dtEvents.Columns.Add("CONSIGNED_FLAG", Type.GetType("System.String"));
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var transaction = objContext.Database.BeginTransaction())
                    {


                        try
                        {
                            try
                            {
                                xmlDom = XDocument.Parse(outXml);
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + "XML String Not Loaded " + ex);
                                return AtparStatusCodes.E_XMLSTRINGNOTLOADED;
                            }

                            var xmlRoot = xmlDom.Root;
                            for (int i = 0; i <= xmlRoot.Descendants("HEADER").Count() + xmlRoot.Descendants("DETAIL").Count()- 1; i++)
                            {
                                var xmlRecord = xmlRoot.Elements().ElementAt(i);
                                if (xmlRecord.Name == "DETAIL")
                                {
                                    itemRow = dtEvents.NewRow();
                                    _strItemId = string.Empty;
                                    for (int j = 0; j <= xmlRecord.Descendants().Count() - 1; j++)
                                    {
                                        var xmlItem = xmlRecord.Descendants().ElementAt(j);
                                        switch (xmlItem.Name.ToString())
                                        {
                                            case "ITEMID":
                                                itemRow["INV_ITEM_ID"] = xmlItem.Value;
                                                _strItemId = xmlItem.Value;
                                                break;
                                            case "DESCR":
                                                itemRow["DESCRIPTION"] = xmlItem.Value;
                                                break;
                                            case "SAREA":
                                                itemRow["STORAGE_AREA"] = xmlItem.Value;
                                                break;
                                            case "STORL1":
                                                itemRow["STOR_LEVEL_1"] = xmlItem.Value;
                                                break;
                                            case "STORL2":
                                                itemRow["STOR_LEVEL_2"] = xmlItem.Value;
                                                break;
                                            case "STORL3":
                                                itemRow["STOR_LEVEL_3"] = xmlItem.Value;
                                                break;
                                            case "STORL4":
                                                itemRow["STOR_LEVEL_4"] = xmlItem.Value;
                                                break;
                                            case "CONTID":
                                                itemRow["CONTAINER_ID"] = xmlItem.Value;
                                                break;
                                            case "STAGDT":
                                                itemRow["STAGED_DATE"] = xmlItem.Value;
                                                break;
                                            case "SERID":
                                                itemRow["SERIAL_ID"] = xmlItem.Value;
                                                break;
                                            case "LOTID":
                                                itemRow["INV_LOT_ID"] = xmlItem.Value;
                                                break;
                                            case "UOM":
                                                itemRow["UNIT_OF_MEASURE"] = xmlItem.Value;
                                                break;
                                            case "SYSQTY":
                                                itemRow["SYS_QTY"] = xmlItem.Value;
                                                break;
                                            case "UPCID":
                                                itemRow["UPC_ID"] = xmlItem.Value;
                                                break;
                                            case "MITMID":
                                                itemRow["MFG_ITEM_ID"] = xmlItem.Value;
                                                break;
                                            case "VITMID":
                                                itemRow["VEND_ITEM_ID"] = xmlItem.Value;
                                                break;
                                            case "CITMID":
                                                itemRow["CUSTOM_ITEM_NO"] = xmlItem.Value;
                                                break;
                                            case "PRICE":
                                                itemRow["ITEM_PRICE"] = xmlItem.Value;
                                                break;
                                            case "TAGID":
                                                itemRow["INVENTORY_TAG_ID"] = xmlItem.Value;
                                                break;
                                            //NB-0004387
                                            case "r":
                                                itemRow["GTIN"] = xmlItem.Value;
                                                break;
                                            case "REPORT_FIELD_1":
                                                itemRow["REPORT_FIELD_1"] = xmlItem.Value;
                                                break;
                                            case "REPORT_FIELD_2":
                                                itemRow["REPORT_FIELD_2"] = xmlItem.Value;
                                                break;
                                            case "REPORT_FIELD_3":
                                                itemRow["REPORT_FIELD_3"] = xmlItem.Value;
                                                break;
                                            case "REPORT_FIELD_4":
                                                itemRow["REPORT_FIELD_4"] = xmlItem.Value;
                                                break;
                                            case "PACKAGING_STRING":
                                                itemRow["PACKAGING_STRING"] = xmlItem.Value;
                                                break;
                                            case "UOM_TYPE":
                                                itemRow["UOM_TYPE"] = xmlItem.Value;
                                                break;
                                            case "STD_PACK_UOM":
                                                itemRow["STD_PACK_UOM"] = xmlItem.Value;
                                                break;
                                            case "L_S_CONTROLLED":
                                                itemRow["L_S_CONTROLLED"] = xmlItem.Value;
                                                break;
                                            case "CONSIGNED_FLAG":
                                                itemRow["CONSIGNED_FLAG"] = xmlItem.Value;
                                                break;
                                            case "LOT_CONTROLLED":
                                                itemRow["LOT_CONTROLLED"] = xmlItem.Value;
                                                break;
                                            case "SERIAL_CONTROLLED":
                                                itemRow["SERIAL_CONTROLLED"] = xmlItem.Value;
                                                break;
                                            case "ALTUOM":

                                                _drItemAltUom = _dtItemAltUom.NewRow();
                                                _strUom = string.Empty;

                                                for (int intUomCnt = 0; intUomCnt <= xmlItem.Descendants().Count() - 1; intUomCnt++)
                                                {
                                                    var xmlItemChild = xmlItem.Descendants().ElementAt(intUomCnt);

                                                    switch (xmlItemChild.Name.ToString())
                                                    {
                                                        case "UOM":
                                                            _drItemAltUom["UNIT_OF_MEASURE"] = xmlItemChild.Value;
                                                            _strUom = xmlItemChild.Value;
                                                            break;
                                                        case "CONFAC":
                                                            _drItemAltUom["CONVERSION_RATE"] = xmlItemChild.Value;
                                                            break;
                                                        case "UOM_TYPE":
                                                            _drItemAltUom["UOM_TYPE"] = xmlItemChild.Value;
                                                            break;
                                                    }

                                                    _drItemAltUom["INV_ITEM_ID"] = _strItemId;

                                                }


                                                _drUomExist = _dtItemAltUom.Select("UNIT_OF_MEASURE = '" + _strUom + "' AND INV_ITEM_ID = '" + _strItemId + "'");

                                                if (_drUomExist.Length == 0)
                                                {
                                                    _dtItemAltUom.Rows.Add(_drItemAltUom);
                                                }

                                                break;
                                        }

                                    }

                                    dtEvents.Rows.Add(itemRow);

                                }
                            }

                            _dsItemAltUom.Tables.Add(_dtItemAltUom);

                            if (_log.IsInfoEnabled)
                                _log.Info(methodBaseName + OrderBy);
                            //to sort the table based onthe parameter
                            dvEvents = dtEvents.DefaultView;
                            //NB-0005042
                            if (OrderBy == "STORAGE_AREA")
                            {
                                dvEvents.Sort = "STORAGE_AREA, STOR_LEVEL_1, STOR_LEVEL_2, STOR_LEVEL_3, STOR_LEVEL_4";
                            }
                            else if (OrderBy == "DESCRIPTION")
                            {
                                dvEvents.Sort = "DESCRIPTION";
                            }
                            else
                            {
                                dvEvents.Sort = OrderBy;
                            }

                            dtEvents = dvEvents.ToTable();
                            pdsEvents.Tables.Add(dtEvents);
                            if (OrderBy == "STORAGE_AREA")
                            {
                                strOrderby = "STORAGE_AREA";
                                intOrderby = 2;
                            }
                            else if (OrderBy == "INVENTORY_TAG_ID")
                            {
                                strOrderby = "INVENTORY_TAG_ID";
                                intOrderby = 3;
                            }
                            else if (OrderBy == "INV_ITEM_ID")
                            {
                                strOrderby = "INV_ITEM_ID";
                                intOrderby = 1;
                            }
                            else if (OrderBy == "DESCRIPTION")
                            {
                                strOrderby = "DESCRIPTION";
                                intOrderby = 4;
                            }

                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "XML parsing failed " + ex.ToString());
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        //setting the values for spliting
                        intCntItems = pdsEvents.Tables[0].Rows.Count;
                        intCntSplit = PdsSubEventNames.Count;
                        intItemsRem = intCntItems % intCntSplit;
                        intRecCount = 0;
                        //RT 4268
                        intItems = (int)Math.Floor(Convert.ToDouble(intCntItems / intCntSplit));

                        intItemSplit = (int)Math.Floor(Convert.ToDouble(intCntItems / intCntSplit));
                        intCntItems = 0;
                        long transactionID = -1;
                        for (intCntSplit = 0; intCntSplit <= PdsSubEventNames.Count - 1; intCntSplit++)
                        {

                            if ((intCntItems > pdsEvents.Tables[0].Rows.Count))
                            {

                            }
                            else
                            {
                                long status = 0;
                                transactionID = GetTransactionId((int)AtParWebEnums.EnumApps.CycleCount);
                                if ((intItemsRem > 0) & (intCntSplit == PdsSubEventNames.Count - 1))
                                {
                                    var item = intItemSplit + intItemsRem;
                                    status = InsertEventHdrMaster(transactionID, bUnit, PdsSubEventNames[intCntSplit].SUBEVENT_ID, eventID, item, userID, intOrderby, objContext);

                                }
                                else
                                {
                                    status = InsertEventHdrMaster(transactionID, bUnit, PdsSubEventNames[intCntSplit].SUBEVENT_ID, eventID, intItemSplit, userID, intOrderby, objContext);

                                }
                                if (status != AtparStatusCodes.ATPAR_OK)
                                {
                                    transaction.Rollback();
                                    return status;
                                }

                                if ((intItemsRem > 0) & (intCntSplit == PdsSubEventNames.Count - 1))
                                {
                                    //SW-0005145
                                    intRecCount = intItems + intItemsRem - 1;
                                }
                                else
                                {
                                    intRecCount = intItems - 1;
                                }

                                //NB-0005042
                                for (intItems = 0; intItems <= intRecCount; intItems++)
                                {

                                    if ((intCntItems > pdsEvents.Tables[0].Rows.Count - 1))
                                    {
                                    }
                                    else
                                    {
                                        if ((intItems == 0))
                                        {
                                            //NB-0005327
                                            if (strOrderby == "STORAGE_AREA" | strOrderby == "DESCRIPTION")
                                            {
                                                if (!string.IsNullOrEmpty(StrFromLoc))
                                                {
                                                    strFromLoc = StrFromLoc + " " + pdsEvents.Tables[0].Rows[intCntItems][strOrderby].ToString() +
                                                        pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_1"].ToString() +
                                                        pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_2"].ToString() +
                                                        pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_3"].ToString() +
                                                        pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_4"].ToString();
                                                }
                                                else
                                                {
                                                    strFromLoc = pdsEvents.Tables[0].Rows[intCntItems][strOrderby].ToString() +
                                                        pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_1"].ToString() +
                                                        pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_2"].ToString() +
                                                        pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_3"].ToString() +
                                                        pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_4"].ToString();
                                                }
                                            }
                                            else
                                            {
                                                if (!string.IsNullOrEmpty(StrFromLoc))
                                                {
                                                    strFromLoc = StrFromLoc + " " + pdsEvents.Tables[0].Rows[intCntItems][strOrderby].ToString();
                                                }
                                                else
                                                {
                                                    strFromLoc = pdsEvents.Tables[0].Rows[intCntItems][strOrderby].ToString();
                                                }
                                            }
                                            if (!string.IsNullOrEmpty(strFromLoc))
                                            {
                                                if (strFromLoc.Length > 50)
                                                {
                                                    strFromLoc = strFromLoc.Substring(0, 50);
                                                }
                                            }

                                            status = UpdateEventHdrMaster(strFromLoc, transactionID, objContext);
                                            if (status != AtparStatusCodes.ATPAR_OK)
                                            {
                                                transaction.Rollback();
                                                return status;
                                            }
                                        }

                                    }

                                    if ((intItems == intRecCount))
                                    {
                                        if (strOrderby == "STORAGE_AREA")
                                        {
                                            if (!string.IsNullOrEmpty(StrToLoc))
                                            {
                                                strToLoc = StrToLoc + " " + pdsEvents.Tables[0].Rows[intCntItems][strOrderby].ToString() +
                                                    pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_1"].ToString() +
                                                    pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_2"].ToString() +
                                                    pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_3"].ToString() +
                                                    pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_4"].ToString();
                                            }
                                            else
                                            {
                                                strToLoc = pdsEvents.Tables[0].Rows[intCntItems][strOrderby].ToString() +
                                                    pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_1"].ToString() +
                                                    pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_2"].ToString() +
                                                    pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_3"].ToString() +
                                                    pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_4"].ToString();
                                            }
                                        }
                                        else
                                        {
                                            if (!string.IsNullOrEmpty(StrToLoc))
                                            {
                                                strToLoc = StrToLoc + " " + pdsEvents.Tables[0].Rows[intCntItems][strOrderby].ToString();
                                            }
                                            else
                                            {
                                                strToLoc = pdsEvents.Tables[0].Rows[intCntItems][strOrderby].ToString();
                                            }
                                        }
                                        if (!string.IsNullOrEmpty(strToLoc))
                                        {
                                            if (strToLoc.Length > 50)
                                            {
                                                strToLoc = strToLoc.Substring(0, 50);
                                            }
                                        }


                                        status = UpdateHdrMasterToLoc(strToLoc, transactionID,objContext);
                                        if (status != AtparStatusCodes.ATPAR_OK)
                                        {
                                            transaction.Rollback();
                                            return status;
                                        }
                                    }

                                    // somestring.Substring(somestring.Length - 3, 3);
                                    string trnsString = "00000000000" + transactionID;
                                    string cntString = "000000" + intCntItems;
                                    strItemrec = "1" + trnsString.Substring(trnsString.Length - 11, 11) + cntString.Substring(cntString.Length - 6, 6);

                                    //  strItemrec = "1" + Right("00000000000" + lngTransactionId, 11) + Strings.Right("000000" + intCntItems, 6);
                                   
                                    //NB-0004387
                                    sbSql.Append("INSERT INTO MT_CYCT_EVENT_DETAIL_MASTER(TRANSACTION_ID,ITEM_REC_NUM,DESCRIPTION,INV_ITEM_ID,STORAGE_AREA, UPC_ID,STOR_LEVEL_1, STOR_LEVEL_2, STOR_LEVEL_3,STOR_LEVEL_4, CONTAINER_ID,STAGED_DATE,SERIAL_ID, INV_LOT_ID,UNIT_OF_MEASURE,SYS_QTY,MFG_ITEM_ID, VEND_ITEM_ID,CUSTOM_ITEM_NO, ITEM_PRICE,INVENTORY_TAG_ID, GTIN, REPORT_FIELD_1, REPORT_FIELD_2, REPORT_FIELD_3, REPORT_FIELD_4, PACKAGING_STRING, UOM_TYPE,STD_PACK_UOM, L_S_CONTROLLED, CONSIGNED_FLAG,LOT_CONTROLLED,SERIAL_CONTROLLED) VALUES('")
                           .Append(transactionID).Append("', '").Append(strItemrec).Append("','")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["DESCRIPTION"].ToString())
                           .Append("', '").Append(pdsEvents.Tables[0].Rows[intCntItems]["INV_ITEM_ID"].ToString()).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["STORAGE_AREA"].ToString()).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["UPC_ID"].ToString()).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_1"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_2"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_3"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["STOR_LEVEL_4"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["CONTAINER_ID"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["STAGED_DATE"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["SERIAL_ID"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["INV_LOT_ID"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["UNIT_OF_MEASURE"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["SYS_QTY"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["MFG_ITEM_ID"])
                           .Append("', '" + pdsEvents.Tables[0].Rows[intCntItems]["VEND_ITEM_ID"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["CUSTOM_ITEM_NO"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["ITEM_PRICE"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["INVENTORY_TAG_ID"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["GTIN"]).Append("', '")
                           .Append(pdsEvents.Tables[0].Rows[intCntItems]["REPORT_FIELD_1"]
                           + "', '" + pdsEvents.Tables[0].Rows[intCntItems]["REPORT_FIELD_2"] + "', '" +
                           pdsEvents.Tables[0].Rows[intCntItems]["REPORT_FIELD_3"] + "', '" +
                           pdsEvents.Tables[0].Rows[intCntItems]["REPORT_FIELD_4"] + "', '" +
                           pdsEvents.Tables[0].Rows[intCntItems]["PACKAGING_STRING"] + "', '" +
                           pdsEvents.Tables[0].Rows[intCntItems]["UOM_TYPE"] + "', '" +
                           pdsEvents.Tables[0].Rows[intCntItems]["STD_PACK_UOM"] + "', '" +
                           pdsEvents.Tables[0].Rows[intCntItems]["L_S_CONTROLLED"] + "', '" +
                           pdsEvents.Tables[0].Rows[intCntItems]["CONSIGNED_FLAG"] + "', '" +
                           pdsEvents.Tables[0].Rows[intCntItems]["LOT_CONTROLLED"] + "', '" +
                           pdsEvents.Tables[0].Rows[intCntItems]["SERIAL_CONTROLLED"] + "'" + ")");


                                    try
                                    {
                                      var count=  objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                                    }
                                    catch (SqlException sqlex)
                                    {
                                        transaction.Rollback();
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + ":ATPAR_E_LOCALDBINSERTFAIL :" + sqlex.ToString());
                                        return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                                    }
                                    finally
                                    {
                                        sbSql.Clear();
                                    }


                                    try
                                    {
                                        _drAltUom = _dsItemAltUom.Tables[0].Select("INV_ITEM_ID = '" + pdsEvents.Tables[0].Rows[intCntItems]["INV_ITEM_ID"].ToString() + "'");


                                        if (_drAltUom.Length > 0)
                                        {
                                            var sql = _sbStandardUom;
                                            sql.Append("INSERT INTO MT_CYCT_ITEM_UOM_MASTER (");
                                            sql.Append("ITEM_REC_NUM, ");
                                            sql.Append("UOM, ");
                                            sql.Append("CONVERSION_RATE, ");
                                            sql.Append("TRANSACTION_ID, ");
                                            sql.Append("INV_ITEM_ID, ");
                                            sql.Append("UOM_TYPE ) ");
                                            sql.Append("VALUES (");
                                            sql.Append("'" + strItemrec + "', ");
                                            sql.Append("'" + pdsEvents.Tables[0].Rows[intCntItems]["UNIT_OF_MEASURE"] + "', ");
                                            sql.Append("" + standardConvFac + ", ");
                                            sql.Append("" + transactionID + ", ");
                                            sql.Append("'" + pdsEvents.Tables[0].Rows[intCntItems]["INV_ITEM_ID"].ToString() + "', ");
                                            sql.Append("'" + pdsEvents.Tables[0].Rows[intCntItems]["UOM_TYPE"] + "') ");


                                            try
                                            {
                                                objContext.Database.ExecuteSqlCommand(sql.ToString());
                                            }
                                            catch (SqlException sqlex)
                                            {
                                                transaction.Rollback();
                                                if (_log.IsFatalEnabled)
                                                    _log.Fatal(methodBaseName + " Failed to insert data " + "for standard uom's for item "
                                                        + pdsEvents.Tables[0].Rows[intCntItems]["INV_ITEM_ID"].ToString() + "\n" + sqlex.ToString());
                                                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                                            }
                                            finally
                                            {
                                                _sbStandardUom.Remove(0, _sbStandardUom.Length);
                                            }

                                        }

                                        foreach (DataRow _dr in _drAltUom)
                                        {
                                            //Here we are generating a dataset for the alternate uoms, looping the dataset and
                                            //inserting into the table as we need ITEM_REC_NUM which is a part of the primary key
                                            //and it is being generated while looping the details dataset.
                                            //Details dataset is being generated as we need to sort the data based on the type
                                            //selected in the split by dropdown which can either be itemid or storage location.
                                            if (pdsEvents.Tables[0].Rows[intCntItems]["UNIT_OF_MEASURE"].ToString().Trim() != _dr["UNIT_OF_MEASURE"].ToString().Trim())
                                            {
                                                var sql = _sbAltUom;
                                                sql.Append("INSERT INTO MT_CYCT_ITEM_UOM_MASTER (");
                                                sql.Append("ITEM_REC_NUM, ");
                                                sql.Append("UOM, ");
                                                sql.Append("CONVERSION_RATE, ");
                                                sql.Append("TRANSACTION_ID, ");
                                                sql.Append("INV_ITEM_ID, ");
                                                sql.Append("UOM_TYPE ) ");
                                                sql.Append("VALUES (");
                                                sql.Append("'" + strItemrec + "', ");
                                                sql.Append("'" + _dr["UNIT_OF_MEASURE"] + "', ");
                                                sql.Append("" + _dr["CONVERSION_RATE"] + ", ");
                                                sql.Append("" + transactionID + ", ");
                                                sql.Append("'" + _dr["INV_ITEM_ID"] + "', ");
                                                sql.Append("'" + _dr["UOM_TYPE"] + "') ");


                                                try
                                                {
                                                    objContext.Database.ExecuteSqlCommand(sql.ToString());
                                                }
                                                catch (SqlException sqlex)
                                                {
                                                    if (_log.IsFatalEnabled)
                                                        _log.Fatal(methodBaseName + " Failed to insert data " + "for alternate uom's for item "
                                                            + pdsEvents.Tables[0].Rows[intCntItems]["INV_ITEM_ID"].ToString() + "\n" + sqlex.ToString());
                                                    return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                                                }
                                                finally
                                                {
                                                    _sbAltUom.Remove(0, _sbAltUom.Length);
                                                }

                                            }

                                        }

                                    }
                                    catch (Exception ex)
                                    {
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + " Failed to insert data " + "for alternate uom's for item "
                                                + pdsEvents.Tables[0].Rows[intCntItems]["INV_ITEM_ID"].ToString() + "\n" + ex.ToString());
                                        return AtparStatusCodes.E_SERVERERROR;
                                    }

                                    intCntItems = intCntItems + 1;

                                }
                            }
                        }
                        transaction.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }


                }
               
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
        }
        #region GetTransactionId
        public long GetTransactionId(int appID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long transactionId = -1;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter sql_param_appid = new SqlParameter("@AppID", SqlDbType.Int);
                    sql_param_appid.Value = appID;

                    SqlParameter sql_param_transaction_id = new SqlParameter("@TransactionID", SqlDbType.Int);
                    sql_param_transaction_id.Direction = ParameterDirection.Output;


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var cnt = objContext.Database.ExecuteSqlCommand("exec SP_GetTransactionID @AppID, @TransactionID OUT", sql_param_appid, sql_param_transaction_id);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned updated Trans Id Count " + cnt); }


                    transactionId = (Int32)sql_param_transaction_id.Value;

                }
                return transactionId;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
        }
        #endregion
        #endregion
    }
}

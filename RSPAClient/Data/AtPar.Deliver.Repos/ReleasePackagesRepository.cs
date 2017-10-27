using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AtPar.Repository.Interfaces.Deliver;
using System.Data.SqlClient;
using System.Xml;
using System.Data;
using AtPar.ViewModel;

namespace AtPar.Deliver.Repos
{
    public class ReleasePackagesRepository : IReleasePackagesRepository
    {

        ILog _log;
        
        public ReleasePackagesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ExcludeLocsRepository));
        }

        #region Main Functions

        public List<VM_RELEASEPACKAGES> GetReleasePackages(int appID, string userId, string orgGroupID, string bunit,
                                                           string trckNoOrPoIdOrLoc, string[] deviceTokenEntry, string flag = "", string transID = "")
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _StatusCode = -1;
            List<VM_RELEASEPACKAGES> lstReleasePackages = new List<VM_RELEASEPACKAGES>();

            try
            {
                if (flag == AtParWebEnums.YesNo_Enum.Y.ToString())
                {

                    _StatusCode = DeleteReleasePackageItems(transID, deviceTokenEntry);

                    if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to delete the package item " + " : StatusCode is : " + _StatusCode); }
                        return null;
                    }

                }

                lstReleasePackages = GetReleasePackagesSP(appID, orgGroupID, bunit, trckNoOrPoIdOrLoc);
                lstReleasePackages = lstReleasePackages.OrderBy(x => x.TRACKING_NO).ToList();
                return lstReleasePackages;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
        }

        private long DeleteReleasePackageItems(string transIDs, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string[] _mtransIds = null;
            long StatusCode = -1;

            try
            {

                _mtransIds = transIDs.Split(',');

                for (int _intCnt = 0; _intCnt <= _mtransIds.Count() - 1; _intCnt++)
                {

                    int transID = -1;
                    string _strUpdateDate = string.Empty;

                    transID = Convert.ToInt32(_mtransIds[_intCnt]);

                    if (transID != -1)
                    {
                        using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                        {
                            using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                            {

                                List<MT_DELV_ITEM_TRIP_MISC_EVENT> lstHandOverData = GetHandoverData(transID, objContext);

                                if (lstHandOverData == null)
                                {
                                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}", methodBaseName, " Failed to get data from GetHandoverData Status Code is")); }
                                    trans.Rollback();
                                }

                                if (lstHandOverData.Count > 0)
                                {
                                    _strUpdateDate = lstHandOverData.FirstOrDefault().UPDATE_DATE.ToString();
                                }

                                List<MT_DELV_ITEM_TRIP> lstDelvItemTripData = GetDelvItemTripData(transID, _strUpdateDate, objContext);

                                if (lstDelvItemTripData == null)
                                {
                                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}", methodBaseName, " Failed to get data from GetHandoverData Status Code is")); }
                                    trans.Rollback();
                                }

                                if (lstDelvItemTripData.Count > 0)
                                {
                                    foreach (var item in lstDelvItemTripData)
                                    {
                                        StatusCode = InsertItemTripDeleteData(transID, item.UPDATE_DATE.ToString(), item.EVENT_ID, item.USER_ID, objContext);

                                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}", methodBaseName, " Failed to insert item ")); }
                                            return StatusCode;
                                        }

                                    }

                                }

                                StatusCode = DeleteTripAndAttempt(transID, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}", methodBaseName, " Failed to insert item ")); }
                                    return StatusCode;
                                }


                                List<MT_DELV_ITEM_TRIP> lstLatestEventData = GetLatestEventData(transID, objContext);

                                if (lstLatestEventData == null)
                                {
                                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}", methodBaseName, " Failed to get data from GetLatestEventData Status Code is")); }
                                    trans.Rollback();
                                }

                                AtPar_Detail_Transaction_Entity transactionDetails = new AtPar_Detail_Transaction_Entity();

                                if (lstLatestEventData.Count > 0)
                                {
                                    var latestEvent = lstLatestEventData.FirstOrDefault();

                                    transactionDetails.Transaction_Id = transID;
                                    transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.Deliver;
                                    transactionDetails.Status = latestEvent.EVENT_ID;
                                    transactionDetails.UpdateDate = latestEvent.UPDATE_DATE ?? DateTime.Now;
                                    transactionDetails.UserId = string.Empty;

                                    StatusCode = UpdateDetailTransaction(transactionDetails);

                                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}", methodBaseName, " Failed to update transaction ")); }
                                        return StatusCode;
                                    }
                                }
                                else
                                {
                                    transactionDetails.Transaction_Id = transID;
                                    transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.Deliver;
                                    transactionDetails.Status = (int)AtParWebEnums.AppTransactionStatus.Cancel;
                                    transactionDetails.UpdateDate = DateTime.Now;
                                    transactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                                    StatusCode = UpdateDetailTransaction(transactionDetails);

                                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}", methodBaseName, " Failed to update transaction ")); }
                                        return StatusCode;
                                    }

                                    StatusCode = DeleteMiscEventData(transID, objContext);
                                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}", methodBaseName, " Failed to delete data ")); }
                                        return StatusCode;
                                    }

                                }

                                trans.Commit();
                            }
                        }


                    }

                }             
                

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }



            return AtparStatusCodes.ATPAR_OK;
        }

        private List<VM_RELEASEPACKAGES> GetReleasePackagesSP(int appId, string orgGroupID, string bunit, string trckNoOrPoIdOrLoc)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string SqlStr = string.Empty;
            List<VM_RELEASEPACKAGES> lstPackages = new List<VM_RELEASEPACKAGES>();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter pAppId = new SqlParameter("@pAppId", System.Data.SqlDbType.NVarChar);
                    pAppId.Value = appId;

                    SqlParameter pOrgGrpId = new SqlParameter("@pOrgGrpId", System.Data.SqlDbType.NVarChar);
                    pOrgGrpId.Value = orgGroupID;

                    SqlParameter pBunit = new SqlParameter("@pBunit", System.Data.SqlDbType.NVarChar);
                    pBunit.Value = bunit;

                    SqlParameter pTrckNoOrPoIdOrLoc = new SqlParameter("@pTrckNoOrPoIdOrLoc", System.Data.SqlDbType.NVarChar);
                    pTrckNoOrPoIdOrLoc.Value = trckNoOrPoIdOrLoc;

                    SqlParameter StatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                    StatusCode.Direction = System.Data.ParameterDirection.Output;

                    object[] parameters = { pAppId, pOrgGrpId, pBunit, pTrckNoOrPoIdOrLoc, StatusCode };

                    SqlStr = "EXEC GetReleasePackages @pAppId,@pOrgGrpId,@pBunit,@pTrckNoOrPoIdOrLoc,@StatusCode";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var fields = new[] { "APP_ID", "TRANSACTION_ID", "KEY_1", "PO_ID", "LOCATION", "TRACKING_NO", "DOWNLOAD_DT_TIME", "CURRENT_EVENT", "USERNAME", "UID", "REPORT_DATA_8", "TRACKINGNO_POID_LOC" };

                    lstPackages = objContext.Database.DifferedExecuteQuery<VM_RELEASEPACKAGES>(fields, SqlStr, parameters).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Release packages Returned: {1}", methodBaseName, lstPackages != null ? lstPackages.Count() : 0)); }

                    return lstPackages;

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + " Failed to delete the details in middle tier tables: Exception is :" + ex.ToString() + "\r\n"); }
                throw ex;
            }
        }


        #endregion

        #region DeleteTripAndAttempt

        private List<MT_DELV_ITEM_TRIP_MISC_EVENT> GetHandoverData(long transId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long statusCode = -1;
            List<MT_DELV_ITEM_TRIP_MISC_EVENT> lstHandOverData = new List<MT_DELV_ITEM_TRIP_MISC_EVENT>();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                SqlParameter transID = new SqlParameter("@TRANS_ID", System.Data.SqlDbType.Int);
                transID.Value = transId;

                SqlParameter StatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                StatusCode.Direction = System.Data.ParameterDirection.Output;

                object[] parameters = { transID, StatusCode };
                sbSql.Remove(0, sbSql.Length);

                sbSql.Append("EXEC GetDelvItemHandOverData @TRANS_ID, @StatusCode OUT");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                }

                var fields = new[] { "EVENT_ID", "UPDATE_DATE", "USER_ID", "TO_USER_OR_LOCGRP" };

                lstHandOverData = objContext.Database.DifferedExecuteQuery<MT_DELV_ITEM_TRIP_MISC_EVENT>(fields, sbSql.ToString(), parameters).ToList();

                statusCode = long.Parse(StatusCode.Value.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} StatusCode from GetDelvItemHandOverData: {1} ", methodBaseName, statusCode)); }

                if (statusCode == AtparStatusCodes.ATPAR_OK)
                {
                    return lstHandOverData;
                }
                else
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} StatusCode from GetDelvItemHandOverData: {1} ", methodBaseName, statusCode)); }
                    return null;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        private long DeleteDelvItemMiscData(long transId, string updateDate, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long _StatusCode = -1;

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                SqlParameter transID = new SqlParameter("@TRANS_ID", System.Data.SqlDbType.Int);
                transID.Value = transId;

                SqlParameter paramUpdateDate = new SqlParameter("@UPDATE_DATE", System.Data.SqlDbType.NVarChar);
                paramUpdateDate.Value = updateDate;

                SqlParameter StatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                StatusCode.Direction = ParameterDirection.Output;

                string SqlStr = "exec DeleteDelvItemMiscData @TRANS_ID,@UPDATE_DATE,@StatusCode OUT";

                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + ":Query DeleteDelvItemMiscData: " + SqlStr + "\r\n"); }

                objContext.Database.ExecuteSqlCommand(SqlStr, transID, paramUpdateDate, StatusCode);

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                }

                _StatusCode = (int)StatusCode.Value;

                if ((_StatusCode != AtparStatusCodes.ATPAR_OK))
                {
                    if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to delete the data from middle tier tables. StatusCode is :" + _StatusCode + "\r\n"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                return AtparStatusCodes.ATPAR_OK;

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to execute the following.. \r\n  Exception is : " + ex.ToString() + "\r\n"); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private long DeleteDelvItemTripData(long transId, string updateDate, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long _StatusCode = -1;

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                SqlParameter transID = new SqlParameter("@TRANS_ID", System.Data.SqlDbType.Int);
                transID.Value = transId;

                SqlParameter paramUpdateDate = new SqlParameter("@UPDATE_DATE", System.Data.SqlDbType.NVarChar);
                paramUpdateDate.Value = updateDate;

                SqlParameter StatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                StatusCode.Direction = ParameterDirection.Output;

                string SqlStr = "exec DeleteDelvItemTripData @TRANS_ID,@UPDATE_DATE,@StatusCode OUT";

                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + ":Query DeleteDelvItemTripData: " + SqlStr + "\r\n"); }

                objContext.Database.ExecuteSqlCommand(SqlStr, transID, paramUpdateDate, StatusCode);

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                }

                _StatusCode = (int)StatusCode.Value;

                if ((_StatusCode != AtparStatusCodes.ATPAR_OK))
                {
                    if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to delete the data from middle tier tables. StatusCode is :" + _StatusCode + "\r\n"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                return AtparStatusCodes.ATPAR_OK;

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to execute the following.. \r\n  Exception is : " + ex.ToString() + "\r\n"); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private long DeleteDelvAttmptData(long transId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long _StatusCode = -1;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                SqlParameter transID = new SqlParameter("@TRANS_ID", System.Data.SqlDbType.Int);
                transID.Value = transId;

                SqlParameter StatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                StatusCode.Direction = ParameterDirection.Output;

                string SqlStr = "exec DeleteDelvAttmptData @TRANS_ID,@StatusCode OUT";
                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + ":Query to delete the deliver item trip data: " + SqlStr + "\r\n"); }

                objContext.Database.ExecuteSqlCommand(SqlStr, transID, StatusCode);

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                }

                _StatusCode = (int)StatusCode.Value;


                if ((_StatusCode != AtparStatusCodes.ATPAR_OK))
                {
                    if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to delete the data from middle tier tables. StatusCode is :" + _StatusCode + "\r\n"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                return AtparStatusCodes.ATPAR_OK;

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to execute the following.. \r\n  Exception is : " + ex.ToString() + "\r\n"); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private long DeleteTripAndAttempt(long transId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _StatusCode = -1;
            string _strUpdateDate = String.Empty;

            try
            {
                List<MT_DELV_ITEM_TRIP_MISC_EVENT> lstHandOverData = GetHandoverData(transId, objContext);
                if (lstHandOverData == null)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + " Failed to delete the details in middle tier tables: StatusCode is :" + _StatusCode + "\r\n"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }


                if (lstHandOverData.Count > 0)
                {
                    _strUpdateDate = lstHandOverData.FirstOrDefault().UPDATE_DATE.ToString();
                }

                if (!string.IsNullOrEmpty(_strUpdateDate))
                {
                    _StatusCode = DeleteDelvItemMiscData(transId, _strUpdateDate, objContext);

                    if ((_StatusCode != AtparStatusCodes.ATPAR_OK))
                    {
                        if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to delete the data from middle tier tables. StatusCode is :" + _StatusCode + "\r\n"); }
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }

                _StatusCode = DeleteDelvItemTripData(transId, _strUpdateDate, objContext);

                if ((_StatusCode != AtparStatusCodes.ATPAR_OK))
                {
                    if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to delete the data from middle tier tables. StatusCode is :" + _StatusCode + "\r\n"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }


                _StatusCode = DeleteDelvAttmptData(transId, objContext);

                if ((_StatusCode != AtparStatusCodes.ATPAR_OK))
                {
                    if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to delete the data from middle tier tables. StatusCode is :" + _StatusCode + "\r\n"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + " Failed to delete the details in middle tier tables: Exception is :" + ex.ToString() + "\r\n"); }
                return AtparStatusCodes.E_SERVERERROR;
            }



        }

        #endregion

        #region DeleteReleasePackageItems

        private List<MT_DELV_ITEM_TRIP> GetDelvItemTripData(long transId, string updateDate, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long _StatusCode = -1;
            List<MT_DELV_ITEM_TRIP> lstItemTrip = new List<MT_DELV_ITEM_TRIP>();
            string SqlStr = string.Empty;

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                SqlParameter transID = new SqlParameter("@TRANS_ID", System.Data.SqlDbType.Int);
                transID.Value = transId;

                SqlParameter paramUpdateDate = new SqlParameter("@UPDATE_DATE", System.Data.SqlDbType.VarChar);
                paramUpdateDate.Value = updateDate;

                SqlParameter StatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                StatusCode.Direction = ParameterDirection.Output;


                SqlStr = "EXEC GetDelvItemTripData @TRANS_ID,@UPDATE_DATE,@StatusCode OUT";
                object[] parameters = { transID, paramUpdateDate, StatusCode };

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                }
                var fields = new[] { "EVENT_ID", "UPDATE_DATE", "USER_ID" };

                lstItemTrip = objContext.Database.DifferedExecuteQuery<MT_DELV_ITEM_TRIP>(fields, SqlStr, parameters).ToList();

                _StatusCode = (int)StatusCode.Value;

                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to fetch the data from middle tier tables: StatusCode is :" + _StatusCode + "\r\n" + "Failed to execute the SQL..." + SqlStr + "\r\n"); }
                    return null;
                }

                return lstItemTrip;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to execute the following SQL.... " + SqlStr + "\r\n" + " Exception is : " + ex.ToString() + "\r\n"); }
                throw ex;
            }


        }

        private long InsertItemTripDeleteData(long transId, string updateDate, int eventID, string userID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long _StatusCode = -1;
            string SqlStr = string.Empty;

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                SqlParameter transID = new SqlParameter("@TRANS_ID", System.Data.SqlDbType.Int);
                transID.Value = transId;

                SqlParameter paramUpdateDate = new SqlParameter("@UPDATE_DATE", System.Data.SqlDbType.NVarChar);
                paramUpdateDate.Value = updateDate;

                SqlParameter paramEventID = new SqlParameter("@EVENT_ID", System.Data.SqlDbType.Int);
                paramEventID.Value = eventID;

                SqlParameter paramUserID = new SqlParameter("@USER_ID", System.Data.SqlDbType.NVarChar);
                paramUserID.Value = userID;

                SqlParameter StatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                StatusCode.Direction = ParameterDirection.Output;

                objContext.Database.ExecuteSqlCommand("exec InsertItemTripDeleteData @TRANS_ID,@UPDATE_DATE,@EVENT_ID,@USER_ID,@StatusCode OUT",
                                                                transID, paramUpdateDate,
                                                                paramEventID, paramUserID, StatusCode);

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}:", methodBaseName, Globals.QUERY))); }
                }

                _StatusCode = long.Parse(StatusCode.Value.ToString());
               // _StatusCode = (long)StatusCode.Value;

                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to insert the data in middle tier tables: StatusCode is :  " + _StatusCode + "\r\n"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                return AtparStatusCodes.ATPAR_OK;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to insert the details in middle tier tables: Exception is : " + ex.ToString() + "\r\n"); }
                throw ex;
            }

        }

        private List<MT_DELV_ITEM_TRIP> GetLatestEventData(long transID, ATPAR_MT_Context objContext)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = string.Empty;
            List<MT_DELV_ITEM_TRIP> lstItemTrip = new List<MT_DELV_ITEM_TRIP>();
            long _StatusCode = -1;

            try
            {


                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                SqlParameter paramTransID = new SqlParameter("@TRANS_ID", System.Data.SqlDbType.Int);
                paramTransID.Value = transID;

                SqlParameter StatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                StatusCode.Direction = System.Data.ParameterDirection.Output;

                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                string SqlStr = "EXEC GetDelvItemLatestEventData @TRANS_ID,@StatusCode OUT";
                object[] parameters = { paramTransID, StatusCode };


                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                }


                var fields = new[] { "EVENT_ID", "UPDATE_DATE", "USER_ID" };

                lstItemTrip = objContext.Database.DifferedExecuteQuery<MT_DELV_ITEM_TRIP>(fields, SqlStr, parameters).ToList();

                _StatusCode = (int)StatusCode.Value;

                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to fetch the data from middle tier tables: StatusCode is :" + _StatusCode + "\r\n" + "Failed to execute the SQL..." + _strSQL + "\r\n"); }
                    return null;
                }

                return lstItemTrip;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + ":"); }
                throw ex;
            }


        }

        private long UpdateDetailTransaction(AtPar_Detail_Transaction_Entity transactionDetails, bool lineNoFlg = false, bool updateQtyFlg = false)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    if ((transactionDetails.Transaction_Id == 0) || (transactionDetails.ApplicationId == 0))
                    {
                        return AtparStatusCodes.E_INVALIDPARAMETER;
                    }


                    sbSql.Append("UPDATE MT_ATPAR_DETAIL_TRANSACTION SET STATUS = '").Append(transactionDetails.Status).Append("'");


                    if (transactionDetails.UserId != null)
                    {
                        sbSql.Append(", USER_ID = '").Append(transactionDetails.UserId).Append("'");
                    }

                    if (transactionDetails.Key1 != null)
                    {
                        sbSql.Append(", KEY_1 = '").Append(transactionDetails.Key1).Append("'");
                    }


                    if (transactionDetails.Key2 != null)
                    {
                        sbSql.Append(",  KEY_2 = '").Append(transactionDetails.Key2).Append("' ");
                    }


                    if (transactionDetails.Key3 != null)
                    {
                        sbSql.Append(", KEY_3 = '").Append(transactionDetails.Key3).Append("' ");
                    }

                    if (transactionDetails.Key4 != null)
                    {
                        sbSql.Append(", KEY_4 = '").Append(transactionDetails.Key4).Append("'  ");
                    }

                    if (transactionDetails.Key5 != null)
                    {
                        sbSql.Append(",  KEY_5 = '").Append(transactionDetails.Key5).Append("' ");
                    }

                    if (transactionDetails.StartDateTime != null)
                    {
                        if (transactionDetails.StartDateTime != DateTime.MinValue)
                        {
                            sbSql.Append(", START_DT_TIME = '").Append(transactionDetails.StartDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                        }

                    }

                    if (transactionDetails.EndDateTime != null)
                    {
                        if (transactionDetails.EndDateTime != DateTime.MinValue)
                        {
                            sbSql.Append(", END_DT_TIME = '").Append(transactionDetails.EndDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                        }

                    }

                    if (transactionDetails.UpdateDate != null)
                    {
                        if (transactionDetails.UpdateDate != DateTime.MinValue)
                        {
                            sbSql.Append(", UPDATE_DATE = '").Append(transactionDetails.UpdateDate.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                        }

                    }

                    if (transactionDetails.DeviceId != null)
                    {
                        sbSql.Append(", DEVICE_ID = '").Append(transactionDetails.DeviceId).Append("'  ");
                    }

                    if (transactionDetails.ReportData1 != null)
                    {
                        sbSql.Append(", REPORT_DATA_1 = '").Append(transactionDetails.ReportData1).Append("' ");
                    }

                    if (lineNoFlg)
                    {
                        if (transactionDetails.ReportData2 != null)
                        {
                            sbSql.Append(", REPORT_DATA_2 = '").Append(transactionDetails.ReportData2).Append("'");
                        }

                    }

                    if (transactionDetails.ReportData3 != null)
                    {
                        sbSql.Append(", REPORT_DATA_3 = '").Append(transactionDetails.ReportData3).Append("' ");
                    }


                    if (transactionDetails.ReportData4 != null)
                    {
                        sbSql.Append(", REPORT_DATA_4 = '").Append(transactionDetails.ReportData4.Replace("'", "''")).Append("' ");
                    }

                    if (transactionDetails.ReportData5 != null)
                    {

                        sbSql.Append(", REPORT_DATA_5 = '").Append(transactionDetails.ReportData5.Replace("'", "''")).Append("'");
                    }

                    if (transactionDetails.ReportData6 != null)
                    {
                        sbSql.Append(", REPORT_DATA_6 = '").Append(transactionDetails.ReportData6).Append("' ");
                    }

                    if (transactionDetails.ReportData7 != null)
                    {
                        sbSql.Append(", REPORT_DATA_7 = '").Append(transactionDetails.ReportData7).Append("' ");
                    }

                    if (transactionDetails.ReportData8 != null)
                    {
                        sbSql.Append(", REPORT_DATA_8 = '").Append(transactionDetails.ReportData8).Append("' ");
                    }

                    if (transactionDetails.ReportData9 != null)
                    {
                        sbSql.Append(", REPORT_DATA_9 = '").Append(transactionDetails.ReportData9).Append("' ");
                    }
                    if (transactionDetails.ReportData11 != null)
                    {

                        sbSql.Append(", REPORT_DATA_11 = '").Append(transactionDetails.ReportData11.Replace("'", "''")).Append("'");
                    }

                    if (transactionDetails.ReportData12 != null)
                    {
                        if (transactionDetails.ReportData12 != DateTime.MinValue)
                        {
                            sbSql.Append(", REPORT_DATA_12 ='").Append(transactionDetails.ReportData12.ToString("MM/dd/yyyy hh:mm:ss:tt")).Append("' ");
                        }

                    }

                    if (transactionDetails.ReportData13 != null)
                    {
                        if (transactionDetails.ReportData13 != DateTime.MinValue)
                        {
                            sbSql.Append(", REPORT_DATA_13 ='").Append(transactionDetails.ReportData13.ToString("MM/dd/yyyy hh:mm:ss:tt")).Append("' ");
                        }

                    }

                    if (transactionDetails.ReportData14 != null)
                    {

                        sbSql.Append(", REPORT_DATA_14 = '").Append(transactionDetails.ReportData14).Append("'");
                    }
                    if (transactionDetails.ReportData15 != null)
                    {

                        sbSql.Append(", REPORT_DATA_15 = '").Append(transactionDetails.ReportData15).Append("'");
                    }
                    if (transactionDetails.ReportData16 != null)
                    {

                        sbSql.Append(", REPORT_DATA_16 = '").Append(transactionDetails.ReportData16).Append("'");
                    }

                    if (updateQtyFlg)
                    {
                        if (transactionDetails.ReportData17 != null)
                        {

                            sbSql.Append(", REPORT_DATA_17 = '").Append(transactionDetails.ReportData17).Append("'");
                        }
                    }

                    if (transactionDetails.ReportData18 != null)
                    {
                        if (transactionDetails.ReportData18 != DateTime.MinValue)
                        {
                            sbSql.Append(",REPORT_DATA_18 = '").Append(transactionDetails.ReportData18.ToString("MM/dd/yyyy hh:mm:ss:tt")).Append("'");
                        }

                    }
                    if (transactionDetails.ReportData20 != null)
                    {

                        sbSql.Append(", REPORT_DATA_20 = '").Append(transactionDetails.ReportData20).Append("'");
                    }
                    if (transactionDetails.ReportData26 != null)
                    {

                        sbSql.Append(", REPORT_DATA_26 = '").Append(transactionDetails.ReportData26.Replace("'", "''")).Append("'");
                    }
                    if (transactionDetails.ReportData27 != null)
                    {

                        sbSql.Append(", REPORT_DATA_27 = '").Append(transactionDetails.ReportData27).Append("'");
                    }

                    if (transactionDetails.ReportData28 != null)
                    {

                        sbSql.Append(", REPORT_DATA_28 = '").Append(transactionDetails.ReportData28).Append("'");
                    }
                    if (transactionDetails.ReportData29 != null)
                    {

                        sbSql.Append(", REPORT_DATA_29 = '").Append(transactionDetails.ReportData29).Append("'");
                    }

                    if (transactionDetails.SignatureId > 0)
                    {
                        sbSql.Append(", SIGNATURE_ID = '").Append(transactionDetails.ReportData29).Append(" ");
                    }

                    if (transactionDetails.StatusCode != null)
                    {

                        sbSql.Append(", STATUS_CODE = '").Append(transactionDetails.StatusCode).Append("'");
                    }

                    if (transactionDetails.ReportData30 != null)
                    {
                        if (transactionDetails.ReportData30 != DateTime.MinValue)
                        {
                            sbSql.Append(",REPORT_DATA_30 = '").Append(transactionDetails.ReportData30.ToString("MM/dd/yyyy hh:mm:ss:tt")).Append("'");
                        }

                    }
                    if (transactionDetails.ReportData31 != null)
                    {

                        sbSql.Append(", REPORT_DATA_31 = '").Append(transactionDetails.ReportData31).Append("'");
                    }
                    if (transactionDetails.ReportData32 != null)
                    {

                        sbSql.Append(", REPORT_DATA_32 = '").Append(transactionDetails.ReportData32).Append("'");
                    }
                    if (transactionDetails.ReportData47 != null)
                    {

                        sbSql.Append(", REPORT_DATA_47 = '").Append(transactionDetails.ReportData47).Append("'");
                    }




                    if (transactionDetails.ReportData45 != null)
                    {
                        if (transactionDetails.ReportData45 != DateTime.MinValue)
                        {
                            sbSql.Append(",REPORT_DATA_45='").Append(transactionDetails.ReportData45.ToString("MM/dd/yyyy hh:mm:ss:tt")).Append("'");
                        }
                        else
                        {
                            if ((int)AtParWebEnums.EnumApps.Pharmacy == transactionDetails.ApplicationId)
                            {
                                if (transactionDetails.Status == 13 || transactionDetails.Status == 1)
                                {
                                    sbSql.Append(", REPORT_DATA_45 = NULL");
                                }
                            }
                        }

                    }
                    else
                    {
                        if ((int)AtParWebEnums.EnumApps.Pharmacy == transactionDetails.ApplicationId)
                        {
                            if (transactionDetails.Status == 13 || transactionDetails.Status == 1)
                            {
                                sbSql.Append(", REPORT_DATA_45 = NULL");
                            }
                        }
                    }
                    sbSql.Append(" WHERE TRANSACTION_ID = ").Append(transactionDetails.Transaction_Id).Append(" And APP_ID = ").Append(transactionDetails.ApplicationId).Append(" ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }


                    return AtparStatusCodes.ATPAR_OK;


                }

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

        private long DeleteMiscEventData(long transID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = string.Empty;
            long _StatusCode = -1;

            try
            {


                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                SqlParameter paramTransID = new SqlParameter("@TRANS_ID", System.Data.SqlDbType.Int);
                paramTransID.Value = transID;

                SqlParameter StatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                StatusCode.Direction = ParameterDirection.Output;

                string SqlStr = "exec DeleteMiscDownloadedData @TRANS_ID,@StatusCode OUT";
                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + ":Query to delete the latest event data when cancelled: " + SqlStr + "\r\n"); }

                objContext.Database.ExecuteSqlCommand(SqlStr, paramTransID, StatusCode);

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                }

                _StatusCode = (int)StatusCode.Value;

                if ((_StatusCode != AtparStatusCodes.ATPAR_OK))
                {
                    if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to get the data from middle tier tables: StatusCode is : " + _StatusCode + "\r\n  Failed to execute the SQL... \r\n" + _strSQL + "\r\n"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Debug(methodBaseName + " Failed to get the data from middle tier tables: Exception is : " + ex.ToString() + "\r\n "); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        #endregion

        
    }    

}

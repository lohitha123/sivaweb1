using AtPar.Repository.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using System.Data.Entity;

namespace AtPar.TrackIT.Repos
{
    public class SetupReasonCodesRepository : ISetupReasonCodesRepository
    {
        private ILog _log;

        public SetupReasonCodesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(SetupReasonCodesRepository));
        }

        /// <summary>
        /// Used to get the Reason Codes from DB
        /// </summary>
        /// <param name="reasonCode"></param>
        /// <param name="desc"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public List<TKIT_REASON_CODES> GetReasonCodes(string reasonCode, string desc, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();
            bool _blnWhere = false;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT ORG_GROUP_ID, REASON_CODE, REASON_DESCR, UPDATE_DATE, UPDATE_USERID, STATUS  ");
                    sbSQL.Append(" FROM TKIT_REASON_CODES");

                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                    {
                        sbSQL.Append(" WHERE ORG_GROUP_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "'");
                        _blnWhere = true;
                    }

                    if (!string.IsNullOrEmpty(reasonCode))
                    {
                        if (_blnWhere)
                        {
                            sbSQL.Append(" AND (REASON_CODE LIKE '" + reasonCode + "%' ");
                            sbSQL.Append(" OR REASON_DESCR LIKE '" + reasonCode + "%') ");
                        }
                        else
                        {
                            sbSQL.Append(" WHERE (REASON_CODE LIKE '" + reasonCode + "%' ");
                            sbSQL.Append(" OR REASON_DESCR LIKE '" + reasonCode + "%') ");
                        }
                    }

                    sbSQL.Append(" ORDER BY REASON_CODE");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstReasonCodes = objContext.Database.SqlQuery<TKIT_REASON_CODES>(sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstReasonCodes.Count); }

                    return lstReasonCodes;

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

        private long CheckReasonExistOrNot(string reasonCode)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.TKIT_REASON_CODES.Count(c => c.REASON_CODE == reasonCode);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Rows returned " + cnt); }

                    if (cnt > 0)
                    {
                        return AtparStatusCodes.TKIT_E_REASONCODEEXISTS;
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
        }

        /// <summary>
        /// Used to create the Reason code in db
        /// </summary>
        /// <param name="reasonCode"></param>
        /// <param name="desc"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns>Returns ATPAR_OK on success, if any exception returns ATPAR_E_LOCADBUPDATEFAIL</returns>
        public long CreateReasonCodes(string reasonCode, string desc, string orgGrpID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                var StatusCode = CheckReasonExistOrNot(reasonCode);

                if (StatusCode.Equals(AtparStatusCodes.ATPAR_OK) == false)
                {
                    return StatusCode;
                }

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO TKIT_REASON_CODES (ORG_GROUP_ID, REASON_CODE, REASON_DESCR, UPDATE_DATE, UPDATE_USERID)");
                    sbSql.Append(" VALUES ('" + orgGrpID + "', ");
                    sbSql.Append("'" + reasonCode + "', '" + desc + "', GETDATE(), ");
                    sbSql.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "') ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }

        }

        /// <summary>
        /// Used to update the Reason code in db
        /// </summary>
        /// <param name="reasonCode"></param>
        /// <param name="desc"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns>Returns ATPAR_OK on success, if any exception returns ATPAR_E_LOCADBUPDATEFAIL</returns>
        public long UpdateReasonCodes(string reasonCode, string desc, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE TKIT_REASON_CODES SET REASON_DESCR = '" + desc + "', ");
                    sbSql.Append("UPDATE_DATE = GETDATE(), UPDATE_USERID='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' ");
                    sbSql.Append("WHERE REASON_CODE = '" + reasonCode + "' ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                }

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

        /// <summary>
        /// Used to update Reason Code status in the DB
        /// </summary>
        /// <param name="reasonCode"></param>
        /// <param name="status"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns>Returns ATPAR_OK on success, if any exception returns ATPAR_E_LOCADBUPDATEFAIL</returns>
        public long DeleteReasonCode(string reasonCode, bool status, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE TKIT_REASON_CODES SET  STATUS = '" + status + "', ");
                    sbSql.Append("UPDATE_DATE = GETDATE(), ");
                    sbSql.Append("UPDATE_USERID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' ");
                    sbSql.Append("WHERE REASON_CODE = '" + reasonCode + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                }

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

    }
}

using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.AssetManagement;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AtPar.AssetManagement.Repos
{
    public class AccessPermissionsRepository : IAccessPermissionsRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor

        public AccessPermissionsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AccessPermissionsRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the Access Field Details
        /// </summary>
        /// <returns></returns>
        public List<MT_ATPAR_UI_FIELDS> GetAccessFieldDetails()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT APP_ID, SCREEN_NAME, FIELD_NAME, FIELD_DESCR, DISPLAY_FLAG, EDIT_FLAG, SCAN_ORDER, MANDATORY_FLAG ");
                    sbSql.Append("FROM MT_ATPAR_UI_FIELDS ORDER BY FIELD_NAME ASC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstAccessFieldDetails = objContext.Database.SqlQuery<MT_ATPAR_UI_FIELDS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstAccessFieldDetails.Count); }

                    return lstAccessFieldDetails;
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

        /// <summary>
        /// Gets the Allocated Access Fields for the given User
        /// </summary>
        /// <param name="appId"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="userId"></param>
        /// <param name="screenName"></param>
        /// <returns></returns>
        public List<MT_ATPAR_UI_SETUP> GetAllocatedAccessFieldDetails(string appId, string orgGroupId, string userId, string screenName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT APP_ID, SCREEN_NAME, USER_ID, FIELD_NAME, FIELD_DESCR, DISPLAY_FLAG, EDIT_FLAG, SCAN_ORDER, MANDATORY_FLAG ");
                    sbSql.Append("FROM MT_ATPAR_UI_SETUP WHERE USER_ID = '" + userId + "' ");
                    sbSql.Append("AND APP_ID = " + appId + " AND SCREEN_NAME = '" + screenName + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "APP_ID", "SCREEN_NAME", "USER_ID", "FIELD_NAME", "FIELD_DESCR", "DISPLAY_FLAG", "EDIT_FLAG", "SCAN_ORDER", "MANDATORY_FLAG" };
                    var lstAllocatedAccessFieldDetails = objContext.Database.DifferedExecuteQuery<MT_ATPAR_UI_SETUP>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstAllocatedAccessFieldDetails.Count); }

                    return lstAllocatedAccessFieldDetails;
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

        /// <summary>
        /// Inserts the Allocated Access Field Details for the User
        /// </summary>
        /// <param name="lstAccessFieldDetails"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public long InsertAccessFields(List<MT_ATPAR_UI_SETUP> lstAccessFieldDetails, string orgGroupId, string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    foreach (var field in lstAccessFieldDetails)
                    {
                        sbSql.Clear();

                        sbSql.Append("INSERT INTO MT_ATPAR_UI_SETUP(ORG_GROUP_ID, APP_ID, SCREEN_NAME, USER_ID, FIELD_NAME, FIELD_DESCR, ");
                        sbSql.Append("DISPLAY_FLAG, EDIT_FLAG, SCAN_ORDER, MANDATORY_FLAG, UPDATE_DATE) ");
                        sbSql.Append("VALUES ('" + orgGroupId + "', ");
                        sbSql.Append((int)AtParWebEnums.EnumApps.AssetManagement);
                        sbSql.Append(", '" + field.SCREEN_NAME + "'");
                        sbSql.Append(", '" + userId + "'");
                        sbSql.Append(", '" + field.FIELD_NAME + "'");
                        sbSql.Append(", '" + field.FIELD_DESCR + "'");
                        sbSql.Append(", '" + field.DISPLAY_FLAG + "'");
                        sbSql.Append(", '" + field.EDIT_FLAG + "'");
                        sbSql.Append(", '" + field.SCAN_ORDER + "'");
                        sbSql.Append(", '" + field.MANDATORY_FLAG + "'");
                        sbSql.Append(", GETDATE())");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

                    }

                    return AtparStatusCodes.ATPAR_OK;
                }
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

        /// <summary>
        /// Deletes the Access Fields for the given User
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public long DeleteAccessFields(string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_ATPAR_UI_SETUP WHERE APP_ID = " + (int)AtParWebEnums.EnumApps.AssetManagement);
                    sbSql.Append(" AND USER_ID = '" + userId + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

    }
}

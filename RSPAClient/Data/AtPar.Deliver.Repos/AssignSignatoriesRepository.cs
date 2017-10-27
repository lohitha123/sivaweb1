using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Deliver;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AtPar.Deliver.Repos
{
    public class AssignSignatoriesRepository : IAssignSignatoriesRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor

        public AssignSignatoriesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AssignSignatoriesRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the distinct Cost Center Codes
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public List<MT_DELV_COST_CENTER_AUTH_PERSON> GetCodes(string code)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT COST_CENTER_CODE ");
                    sbSql.Append("FROM MT_DELV_COST_CENTER_AUTH_PERSON ");

                    if (!string.IsNullOrWhiteSpace(code))
                    {
                        sbSql.Append(" WHERE COST_CENTER_CODE LIKE '%" + code + "%'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "COST_CENTER_CODE" };
                    var lstCodes = objContext.Database.DifferedExecuteQuery<MT_DELV_COST_CENTER_AUTH_PERSON>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCodes.Count); }

                    return lstCodes;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Gets the Cost Center Auth Person Details
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public List<MT_DELV_COST_CENTER_AUTH_PERSON> GetAuthSign(string code)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT AUTH_USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_NAME ");
                    sbSql.Append("FROM MT_DELV_COST_CENTER_AUTH_PERSON ");
                    sbSql.Append(" WHERE COST_CENTER_CODE = '" + code + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "AUTH_USER_ID", "FIRST_NAME", "LAST_NAME", "MIDDLE_NAME" };
                    var lstAuthDetails = objContext.Database.DifferedExecuteQuery<MT_DELV_COST_CENTER_AUTH_PERSON>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstAuthDetails.Count); }

                    return lstAuthDetails;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Adds the Cost Center Auth Person Details
        /// </summary>
        /// <param name="costCenterCode"></param>
        /// <param name="userId"></param>
        /// <param name="firstName"></param>
        /// <param name="lastName"></param>
        /// <param name="middleName"></param>
        /// <returns></returns>
        public long AddAuthSign(string costCenterCode, string userId, string firstName,
                                 string lastName, string middleName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (GetAuthCodeCount(userId).Equals(0))
                {
                    using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                        sbSql.Append("INSERT INTO MT_DELV_COST_CENTER_AUTH_PERSON(COST_CENTER_CODE, AUTH_USER_ID, FIRST_NAME, ");
                        sbSql.Append("LAST_NAME, MIDDLE_NAME) VALUES ('" + costCenterCode + "', '" + userId + "',");
                        sbSql.Append("'" + firstName + "', '" + lastName + "', '" + middleName + "') ");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
                else
                {
                    return AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Updates the Cost Center Code
        /// </summary>
        /// <param name="newCostCenterCode"></param>
        /// <param name="oldCostCenterCode"></param>
        /// <returns></returns>
        public long UpdateAuthSign(string newCostCenterCode, string oldCostCenterCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql.Append("UPDATE MT_DELV_COST_CENTER_AUTH_PERSON SET COST_CENTER_CODE = '" + newCostCenterCode + "' ");
                    sbSql.Append("WHERE COST_CENTER_CODE = '" + oldCostCenterCode + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        /// <summary>
        /// Deletes the Cost Center
        /// </summary>
        /// <param name="costCenterCode"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public long DeleteAuthSign(string costCenterCode, string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            userId = userId.ReplaceNullwithEmpty();
            if (userId == "null")
            {
                userId = string.Empty;
            }
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql.Append("DELETE FROM MT_DELV_COST_CENTER_AUTH_PERSON ");
                    sbSql.Append("WHERE COST_CENTER_CODE = '" + costCenterCode + "' ");

                    if (!string.IsNullOrWhiteSpace(userId))
                    {
                        sbSql.Append("AND AUTH_USER_ID = '" + userId + "'");
                    }

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
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        #endregion

        #region Private Methods

        private int GetAuthCodeCount(string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int authCodeCount = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(*) FROM MT_DELV_COST_CENTER_AUTH_PERSON WHERE AUTH_USER_ID = '" + userId + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    authCodeCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Auth Code count  returned : " + authCodeCount); }

                    return authCodeCount;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

    }
}

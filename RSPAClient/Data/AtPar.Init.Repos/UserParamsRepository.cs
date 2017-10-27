using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AtPar.Init.Repos
{
   public class UserParamsRepository : IUserParamsRepository
    {
        private ILog _log;

        public UserParamsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(UserParamsRepository));
        }

        #region GetParameterValues
        /// <summary>
        /// Getting Distinct Parameter Values
        /// </summary>
        /// <param name="fieldName"></param>
        /// <param name="tableName"></param>
        /// <param name="whereCondition"></param>
        /// <returns></returns>
        public List<string> GetDistinctParamValues(string fieldName, string tableName, string whereCondition)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT ").Append(fieldName).Append(" FROM ").Append(tableName).Append(" WHERE ").Append(whereCondition).Append(" ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var lstParameterValues = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of parameter values returned : " + lstParameterValues.Count()); }

                    return lstParameterValues;
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
        /// Getting Parameter Values
        /// </summary>
        /// <param name="fieldName"></param>
        /// <param name="tableName"></param>
        /// <param name="whereCondition"></param>
        /// <returns></returns>
        public List<string> GetParamValue(string fieldName, string tableName, string whereCondition)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ").Append(fieldName).Append(" FROM ").Append(tableName).Append(" WHERE ").Append(whereCondition).Append(" ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var lstParameterValues = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of parameter values returned " + lstParameterValues.Count()); }

                    return lstParameterValues;
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
        #endregion

        #region SetUserParams
        /// <summary>
        /// Updating User Parameters
        /// </summary>
        /// <param name="lstUserParams"></param>
        /// <returns></returns>
        public long SetUserParams(List<MT_ATPAR_USER_APP_PARAMETERS> lstUserParams)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = null;
            var count = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var dbContextTransaction = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                            {
                                foreach (var userParam in lstUserParams)
                                {
                                    sbSql = new StringBuilder();
                                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                                    sbSql.Append("UPDATE MT_ATPAR_USER_APP_PARAMETERS SET PARAMETER_VALUE ='").Append(userParam.PARAMETER_VALUE).Append("', LAST_UPDATE_DATE = '").Append(DateTime.Now).Append("', LAST_UPDATE_USER='").Append(userParam.USER_ID).Append("',LAST_CLIENT_ADDRESS ='").Append(userParam.LAST_CLIENT_ADDRESS).Append("' WHERE APP_ID ='").Append(userParam.APP_ID).Append("' AND USER_ID ='").Append(userParam.USER_ID).Append("' AND PARAMETER_ID ='").Append(userParam.PARAMETER_ID).Append("'");

                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                                    }

                                    var currentCount = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                                    count = currentCount + count;
                                    sbSql = null;
                                }
                                dbContextTransaction.Commit();

                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                                return AtparStatusCodes.ATPAR_OK;
                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            dbContextTransaction.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }
        #endregion

        #region GetUserParams
        /// <summary>
        /// Getting User Parameters
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="userID"></param>
        /// <param name="enterpriseSystem"></param>
        /// <returns></returns>
        public List<VM_MT_ATPAR_USER_PARAMS> GetUserParams(string appID, string userID, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<VM_MT_ATPAR_USER_PARAMS> lstUserParams = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.PARAMETER_ID, A.PARAMETER_VALUE, B.SHORT_DESCR, '['+B.LONG_DESCR+']' as LONG_DESCR, B.PARAMETER_TYPE,B.VALIDATION, B.MULTIPLE_VALUES, B.REQUIRED_FLAG, B.PROMPT_TABLE, B.PROMPT_FIELD, B.WHERE_CONDITION FROM MT_ATPAR_USER_APP_PARAMETERS A,MT_ATPAR_PARAM_MASTER B WHERE A.PARAMETER_ID = B.PARAMETER_ID And A.APP_ID = B.APP_ID And B.PARAMETER_LEVEL = 'USER' AND A.USER_ID ='").Append(userID).Append("' And A.APP_ID =").Append(appID).Append(" AND ENTERPRISE_SYSTEM ='").Append(enterpriseSystem).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    lstUserParams = objContext.Database.SqlQuery<VM_MT_ATPAR_USER_PARAMS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of user parameters returned: " + lstUserParams.Count()); }

                    return lstUserParams;
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
        #endregion
    }
}

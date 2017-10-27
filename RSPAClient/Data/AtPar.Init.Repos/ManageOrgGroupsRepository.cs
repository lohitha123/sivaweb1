using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace AtPar.Init.Repos
{
    public class ManageOrgGroupsRepository : IManageOrgGroupsRepository
    {
        private ILog _log;
        public ManageOrgGroupsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageOrgGroupsRepository));
        }

        #region SaveOrgGroupsInfo      

        /// <summary>
        /// Updating Org Groups To MT_ATPAR_ORG_GROUPS
        /// </summary>
        /// <param name="orgGrpName"></param>
        /// <param name="prvOrgID"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public long UpdateOrgGroupsInfo(string orgGrpName, string prvOrgID, string user)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_ORG_GROUPS SET ORG_GROUP_NAME='");
                    sbSql.Append(orgGrpName);
                    sbSql.Append("',LAST_UPDATE_DATE=" + " GETDATE() ,LAST_UPDATE_USER = '");
                    sbSql.Append(user).Append("' WHERE ORG_GROUP_ID = '").Append(prvOrgID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
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
        /// Saving Org Group Info To MT_ATPAR_ORG_GROUPS
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <param name="orgGrpName"></param>
        /// <param name="user"></param>
        /// <param name="enterpriseSystem"></param>
        /// <param name="prvOrgID"></param>
        /// <returns></returns>
        public long SaveOrgGroupsInfo(string orgGrpID, string orgGrpName, string user, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_ATPAR_PARAM_MASTER> listParamSystem = null;
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            sbSql.Append("INSERT INTO MT_ATPAR_ORG_GROUPS(ORG_GROUP_ID,ORG_GROUP_NAME,LAST_UPDATE_DATE,LAST_UPDATE_USER) VALUES ('");
                            sbSql.Append(orgGrpID).Append("','").Append(orgGrpName).Append("',GETDATE(),'").Append(user).Append("') ");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                            listParamSystem = SelectOrgGroupsInfo(enterpriseSystem, objContext);

                            foreach (var item in listParamSystem)
                            {
                                if (item.PARAMETER_ID == "CUSTOM_SQL_DESTLOCATION")
                                {
                                    item.DEFAULT_VALUE = item.DEFAULT_VALUE.Replace("'", "''");
                                }
                                long insertStatusCode = InsertOrgGroupsParam(orgGrpID, user, item.APP_ID, item.PARAMETER_ID, item.DEFAULT_VALUE, objContext);

                                if (!insertStatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                                }
                            }
                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (SqlException ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            trans.Rollback();

                            if (ex.Number == 2627)
                            {
                                return AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION;
                            }
                            else
                            {
                                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Getting Org Groups Info
        /// </summary>
        /// <param name="enterpriseSystem"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private List<MT_ATPAR_PARAM_MASTER> SelectOrgGroupsInfo(string enterpriseSystem, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string[] fileds = new string[] { "APP_ID", "PARAMETER_ID", "DEFAULT_VALUE" };

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT  APP_ID,PARAMETER_ID,DEFAULT_VALUE  FROM MT_ATPAR_PARAM_MASTER WHERE PARAMETER_LEVEL='Org' AND ENTERPRISE_SYSTEM='").Append(enterpriseSystem).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var auditfields = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PARAM_MASTER>(fileds, sbSql.ToString()).ToList();
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count "); }

                return auditfields;
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
        /// Saving Org Group Parameters
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <param name="user"></param>
        /// <param name="appID"></param>
        /// <param name="parameterID"></param>
        /// <param name="defaultValue"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertOrgGroupsParam(string orgGrpID, string user, short appID, string parameterID, string defaultValue, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" INSERT INTO MT_ATPAR_ORG_GROUP_PARAMETERS(APP_ID,PARAMETER_ID,PARAMETER_VALUE,ORG_GROUP_ID,LAST_UPDATE_DATE,LAST_UPDATE_USER) VALUES (");
                sbSql.Append(appID).Append(",'").Append(parameterID).Append("','").Append(defaultValue).Append("','").Append(orgGrpID).Append("',GETDATE(),'").Append(user).Append("')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

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
        #endregion

        #region SaveOrgGroupsBUnits

        /// <summary>
        /// Saving Org Groups BUnits to MT_ATPAR_ORG_GROUP_BUNITS
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="lstOrgGrpParams"></param>
        /// <returns></returns>
        public long SaveOrgGroupsBUnits(string userID, string orgGrpID, List<MT_ATPAR_ORG_GROUP_BUNITS> lstOrgGrpParams)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;

            DeleteOrgBunits(orgGrpID);

            statusCode = InsertOrgBunits(userID, orgGrpID, lstOrgGrpParams);

            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
            {
                return statusCode;
            }
            else
            {
                return AtparStatusCodes.ATPAR_OK;
            }
        }

        /// <summary>
        /// Saving OrgBUnits
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="lstOrgGrpParams"></param>
        /// <returns></returns>
        private long InsertOrgBunits(string userID, string orgGrpID, List<MT_ATPAR_ORG_GROUP_BUNITS> lstOrgGrpParams)
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
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            foreach (var item in lstOrgGrpParams)
                            {
                                sbSql = new StringBuilder();
                                if (item.CHK_VALUE == "1")
                                {
                                    if ((item.BUSINESS_UNIT.IndexOf("'")) > 0)
                                    {
                                        item.BUSINESS_UNIT = item.BUSINESS_UNIT.Replace("'", "''");
                                    }

                                    sbSql.Append("INSERT INTO MT_ATPAR_ORG_GROUP_BUNITS(BUSINESS_UNIT,ORG_GROUP_ID,BU_TYPE,LAST_UPDATE_DATE,LAST_UPDATE_USERID) VALUES ('").Append(item.BUSINESS_UNIT).Append("','").Append(orgGrpID).Append("','").Append(item.BU_TYPE).Append("','").Append(DateTime.Now).Append("','").Append(userID).Append("' ) ");

                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                                    }

                                    var currentCount = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                                    count = currentCount + count;
                                    sbSql = null;
                                }
                            }

                            dbContextTransaction.Commit();

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (SqlException ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            dbContextTransaction.Rollback();

                            if (ex.Number == 2627)
                            {
                                return AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION;
                            }
                            else
                            {
                                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Deleting OrgBUnits
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        private long DeleteOrgBunits(string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" DELETE FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID =  '").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
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

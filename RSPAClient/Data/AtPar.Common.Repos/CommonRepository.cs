using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Data.Entity;
using AtPar.ViewModel;
using System.Xml.Linq;
using AtParEncryptionServices;
using System.Data.Entity.Infrastructure;

namespace AtPar.Common.Repos
{
    public class CommonRepository : ICommonRepository, InvBUnitsRepository
    {

        ILog _log;

        public CommonRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CommonRepository));
        }

        /// <summary>
        /// Used to get the Status Message for the provided Status Code
        /// </summary>
        /// <param name="statusCode"></param>
        /// <returns></returns>
        public MT_ATPAR_STATUS GetStatusMessage(long statusCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            MT_ATPAR_STATUS objMtAtParStatus = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    objMtAtParStatus = objContext.MT_ATPAR_STATUS.Where(x => x.STATUS_CODE == statusCode).FirstOrDefault();
                }

                return objMtAtParStatus;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        public string GetAuditAllowed(string userId, int appId, string menuCode, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT AUDIT FROM MT_ATPAR_MENUS WHERE APP_ID='").Append(appId).Append("'");
                    sbSql.Append(" AND MENU_CODE='").Append(menuCode).Append("'");
                    sbSql.Append(" AND ENTERPRISE_SYSTEM = '").Append(enterpriseSystem).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var audit = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    return audit;
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

        #region GetSecurityParams
        /// <summary>
        /// Used to get the security parameters from the database
        /// </summary>
        /// <returns></returns>
        public MT_ATPAR_SECURITY_PARAMS GetSecurityParams()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbInsert = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbInsert.Append("SELECT PASSWD_MIN_LENGTH, PASSWD_MAX_LENGTH, PASSWD_EXP_PERIOD,PASSWD_RESET_REQUIRED, MAINTAIN_PASSWD_HISTORY,CHECK_PASSWD_HISTORY,")
                              .Append(" PASS_REQ_HHT_USERS, ALLOWED_INVALID_LOGIN_ATTEMPTS, PASSWD_COMPLEXITY,")
                              .Append(" MAINTAIN_SECURITY_AUDIT, ALLOW_REG_DEVICES, LOGIN_HISTORY,")
                              .Append(" LDAP_PASS_EXP_ALTMSG FROM MT_ATPAR_SECURITY_PARAMS");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbInsert.ToString() + ":")); }
                    }

                    var securityParams = context.Database.SqlQuery<MT_ATPAR_SECURITY_PARAMS>(sbInsert.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Security Params : " + securityParams); }

                    return securityParams;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbInsert.ToString()); }
                throw ex;
            }
            finally
            {
                sbInsert = null;
            }
        }
        #endregion

        public List<MT_ATPAR_SYSTEM_DB> GetSystemIDs(string systemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                List<MT_ATPAR_SYSTEM_DB> lstSystems = new List<MT_ATPAR_SYSTEM_DB>();
                AtParDefns.SystemID = systemID;
                //ATPAR_MASTER_Context.BuildConnectionString = string.Empty;

                using (ATPAR_MASTER_Context objContext = new ATPAR_MASTER_Context())
                {
                    SqlParameter sql_param_systemid = new SqlParameter("@SystemId", SqlDbType.NVarChar, 50);
                    sql_param_systemid.Value = systemID;

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var fields = new[] { "SYSTEM_ID", "SERVER", "USERID", "PASSWORD", "DATASOURCE", "SYSTEM_NAME", "SCHEMA_NAME" };

                    lstSystems = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SYSTEM_DB>(fields, "exec usp_GetSystemDetails @SystemId", sql_param_systemid).ToList();

                }

                return lstSystems;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        /// <summary>
        /// Inserting data into MT_ATPAR_SECURITY_AUDIT table
        /// </summary>
        /// <param name="securityAudit"></param>
        /// <param name="user"></param>
        /// <param name="function"></param>
        /// <returns></returns>
        public long InsertAuditData(List<MT_ATPAR_SECURITY_AUDIT> securityAudit, string user, string function)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var count = 0;

            using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
            {
                using (var dbContextTransaction = objContext.Database.BeginTransaction())
                {
                    try
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        if (securityAudit != null && securityAudit.Count > 0)
                        {
                            foreach (var item in securityAudit)
                            {
                                sbSql.Append("INSERT INTO MT_ATPAR_SECURITY_AUDIT(UPDATE_USER_ID, UPDATE_DATE, ");
                                sbSql.Append("KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, FUNCTION_NAME, FIELD_NAME, OLD_VALUE, NEW_VALUE) ");
                                sbSql.Append("VALUES('").Append(user).Append("', GETDATE(), ");
                                sbSql.Append("'").Append(item.KEY_1).Append("', ");
                                sbSql.Append("'").Append(item.KEY_2).Append("', ");
                                sbSql.Append("'").Append(item.KEY_3).Append("', ");
                                sbSql.Append("'").Append(item.KEY_4).Append("', ");
                                sbSql.Append("'").Append(item.KEY_5).Append("', ");
                                sbSql.Append("'").Append(function).Append("', ");
                                sbSql.Append("'").Append(item.FIELD_NAME).Append("', ");
                                sbSql.Append("'").Append(item.OLD_VALUE).Append("', ");
                                sbSql.Append("'").Append(item.NEW_VALUE).Append("')");

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                }
                                objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                                count++;
                                sbSql.Remove(0, sbSql.Length);
                            }
                            dbContextTransaction.Commit();

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                            return AtparStatusCodes.ATPAR_OK;
                        }
                        else
                        {
                            return AtparStatusCodes.ATPAR_OK;
                        }

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }

                        dbContextTransaction.Rollback();
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                    finally
                    {
                        sbSql = null;
                    }
                }
            }
        }

        public List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> GetConfigData(List<string> lstConfigVariables)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string ConfigVariables = string.Empty;



            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

            try
            {
                if (lstConfigVariables != null && lstConfigVariables.Count > 0)
                {
                    if (lstConfigVariables.Count == 1)
                    {
                        ConfigVariables = "'" + lstConfigVariables.FirstOrDefault() + "'";
                    }
                    else
                    {
                        ConfigVariables = "'" + string.Join(",", lstConfigVariables).Replace(",", "','") + "'";
                    }

                }
                else
                {
                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + Globals.EXCEPTION + " No Parameterid's"); }
                    return null;
                }

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var fields = new[] { "TAB_ID", "PARAMETER_ID", "PARAMETER_VALUE" };

                    sbSql.Append("SELECT TAB_ID, PARAMETER_ID, PARAMETER_VALUE FROM MT_ATPAR_CONFIGURATION_SECTION_DTLS WHERE PARAMETER_ID IN (" + ConfigVariables + ")");

                    lstConfigSectionDtls = objContext.Database.DifferedExecuteQuery<MT_ATPAR_CONFIGURATION_SECTION_DTLS>(fields, sbSql.ToString()).ToList();
                }

                return lstConfigSectionDtls;

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

        #region GetUsersList
        public int GetUserscount(string userID, string appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(USER_ID) FROM  MT_ATPAR_USER A, MT_ATPAR_USER_GROUPS B WHERE ");
                    sbSql.Append("(A.USER_ID = B.CLIENT_USER  OR  A.USER_ID =B.SERVER_USER) AND B.APP_ID =  ");
                    sbSql.Append("").Append(Convert.ToInt16(appID)).Append(" AND B.SERVER_USER ='").Append(userID).Append("' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var cnt = objContext.Database.SqlQuery<int>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + cnt); }

                    if (cnt != null)
                    {
                        result = cnt[0];
                    }
                    return result;
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

        public List<MT_ATPAR_USER> GetOrgsList(string appID, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT FIRST_NAME, LAST_NAME, MIDDLE_INITIAL, B.USER_ID, ");
                    sbSql.Append("CASE WHEN (A.MIDDLE_INITIAL IS NULL OR A.MIDDLE_INITIAL=' ' )  THEN (A.FIRST_NAME+' '+A.LAST_NAME+' ('+A.USER_ID+')' ) ELSE(A.FIRST_NAME + ' ' + A.MIDDLE_INITIAL + ' ' + A.LAST_NAME + ' (' + A.USER_ID + ')')  END AS FULLNAME ");
                    sbSql.Append("FROM MT_ATPAR_USER A,MT_ATPAR_USER_ORG_GROUPS B,MT_ATPAR_PROFILE_APP_ACL C, MT_ATPAR_USER_ACL D ");
                    sbSql.Append("WHERE A.USER_ID = B.USER_ID AND A.USER_ID = D.USER_ID AND D.ACCOUNT_DISABLED = 0 ");
                    sbSql.Append("AND A.PROFILE_ID=C.PROFILE_ID AND C.APP_ID= ").Append(appID);


                    if (orgGrpID != "All")
                    {
                        sbSql.Append("AND B.ORG_GROUP_ID='").Append(orgGrpID).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "FIRST_NAME", "LAST_NAME", "MIDDLE_INITIAL", "USER_ID", "FULLNAME" };
                    var lstUsers = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstUsers); }

                    return lstUsers;
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
        /// Getting users list from MT_ATPAR_USER,MT_ATPAR_USER_GROUPS and MT_ATPAR_USER_ACL tables
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public List<MT_ATPAR_USER> GetUsersList(string appID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT FIRST_NAME, LAST_NAME,MIDDLE_INITIAL, A.USER_ID,  ");
                    sbSql.Append("CASE WHEN (A.MIDDLE_INITIAL IS NULL OR A.MIDDLE_INITIAL=' ' )  THEN (A.FIRST_NAME+' '+A.LAST_NAME+' ('+A.USER_ID+')' ) ELSE(A.FIRST_NAME + ' ' + A.MIDDLE_INITIAL + ' ' + A.LAST_NAME + ' (' + A.USER_ID + ')')  END AS FULLNAME FROM ");
                    sbSql.Append("MT_ATPAR_USER A, MT_ATPAR_USER_GROUPS B, MT_ATPAR_USER_ACL C WHERE (A.USER_ID = B.CLIENT_USER ");
                    sbSql.Append(") AND A.USER_ID=C.USER_ID AND C.ACCOUNT_DISABLED = 0 AND B.APP_ID =  ");
                    sbSql.Append("").Append(appID).Append(" AND B.SERVER_USER ='").Append(userID).Append("' ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "FIRST_NAME", "LAST_NAME", "MIDDLE_INITIAL", "USER_ID", "FULLNAME" };
                    var lstUsers = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstUsers); }

                    return lstUsers;
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

        #region GetMyPreferences
        /// <summary>
        /// Getting preferences from MT_ATPAR_USER_ACL
        /// </summary>
        /// <param name="preference"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public string GetMyPreferences(string preference, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT " + preference + " FROM MT_ATPAR_USER_ACL WHERE ");
                    sbSql.Append("USER_ID = '" + userID + "'  ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var strRetVal = objContext.Database.SqlQuery<short>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + strRetVal.ToString()); }

                    return strRetVal.ToString();
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

        #region GetOrgBusinessUnits
        public List<string> GetOrgBusinessUnits(string orgGrpID, int businessUnitType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT BUSINESS_UNIT  ");
                    sbSql.Append("FROM MT_ATPAR_ORG_GROUP_BUNITS");
                    sbSql.Append(" WHERE ORG_GROUP_ID ='" + orgGrpID + "' ");

                    if (businessUnitType == (int)AtParWebEnums.BusinessType.Inventory)
                    {
                        sbSql.Append(" AND BU_TYPE = '" + Globals.BU_TYPE_INVENTORY + "'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var lstOrgGroupBunits = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of BUnits Returned: " + lstOrgGroupBunits.Count); }

                    return lstOrgGroupBunits;

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

        public List<string> GetOrgGroupBUnitsAll(string orgGrpID, string businessUnitType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sqlstr = string.Empty;
            string BUtype = string.Empty;
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    if (businessUnitType == AtParWebEnums.BusinessType.Inventory.ToString())
                    {
                        BUtype = Globals.BU_TYPE_INVENTORY;
                        sqlstr = string.Format("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BU_TYPE= '{0}'", BUtype);
                    }
                    else if (businessUnitType == AtParWebEnums.BusinessType.Purchasing.ToString())
                    {
                        BUtype = Globals.BU_TYPE_PURCHASING;
                        sqlstr = string.Format("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BU_TYPE= '{0}'", BUtype);
                    }
                    else if (businessUnitType == AtParWebEnums.BusinessType.AllBunits.ToString())
                    {
                        BUtype = Globals.BU_TYPE_PURCHASING;
                        sqlstr = "SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS";
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sqlstr))); }
                    }

                    var lstOrgGroupBunits = objContext.Database.SqlQuery<string>(sqlstr).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of BUnits Returned: {1}", methodBaseName, lstOrgGroupBunits != null ? lstOrgGroupBunits.Count : 0)); }

                    return lstOrgGroupBunits;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sqlstr)); }
                throw ex;
            }
            finally
            {
                sqlstr = string.Empty;
            }
        }

        public List<string> GetOrgGroupBUnitsSelected(List<string> orgGrpIds, string businessUnitType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sqlstr = string.Empty;
            string BUtype = string.Empty;
            string orgGrpIdsCSstr = string.Empty;

            try
            {
                orgGrpIdsCSstr = string.Format("'{0}'", string.Join("','", orgGrpIds));

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    if (businessUnitType == AtParWebEnums.BusinessType.Inventory.ToString())
                    {
                        BUtype = Globals.BU_TYPE_INVENTORY;
                        sqlstr = string.Format("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID IN ({1}) AND BU_TYPE= '{0}'", BUtype, orgGrpIdsCSstr);
                    }
                    else if (businessUnitType == AtParWebEnums.BusinessType.Purchasing.ToString())
                    {
                        BUtype = Globals.BU_TYPE_PURCHASING;
                        sqlstr = string.Format("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID IN ({1}) AND BU_TYPE= '{0}'", BUtype, orgGrpIdsCSstr);
                    }
                    else if (businessUnitType == AtParWebEnums.BusinessType.AllBunits.ToString())
                    {
                        BUtype = Globals.BU_TYPE_PURCHASING;
                        sqlstr = string.Format("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID IN ({0})", orgGrpIdsCSstr);
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sqlstr))); }
                    }

                    var lstOrgGroupBunits = objContext.Database.SqlQuery<string>(sqlstr).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of BUnits Returned: {1}", methodBaseName, lstOrgGroupBunits != null ? lstOrgGroupBunits.Count : 0)); }

                    return lstOrgGroupBunits;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sqlstr)); }
                throw ex;
            }
            finally
            {
                sqlstr = string.Empty;
            }
        }
        #endregion

        #region GetAllUserOrgGroups
        public List<MT_ATPAR_ORG_GROUPS> GetAllUserOrgGroups()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_ORG_GROUPS> lstorgGroups = null;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_GROUP_ID, ORG_GROUP_NAME FROM MT_ATPAR_ORG_GROUPS");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "ORG_GROUP_ID", "ORG_GROUP_NAME" };
                    lstorgGroups = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUPS>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned list " + lstorgGroups); }
                    return lstorgGroups;

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

        #region GetUserOrgGroups
        /// <summary>
        /// Getting UserOrgGroups from MT_ATPAR_USER_ORG_GROUPS
        /// </summary>
        /// <param name="user"></param>
        /// <param name="orgGrpId"></param>
        /// <returns></returns>
        public List<MT_ATPAR_ORG_GROUPS> GetUserOrgGroups(string user, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            // string sbSql = string.Empty;
            List<MT_ATPAR_ORG_GROUPS> lstUsersOrgGroup = null;
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.ORG_GROUP_ID,B.ORG_GROUP_NAME FROM  MT_ATPAR_USER_ORG_GROUPS A ,MT_ATPAR_ORG_GROUPS B WHERE USER_ID ='");
                    sbSql.Append(user);
                    sbSql.Append("' AND A.ORG_GROUP_ID = B.ORG_GROUP_ID");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "ORG_GROUP_NAME" };

                    lstUsersOrgGroup = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUPS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of User Groups Returned: " + lstUsersOrgGroup.Count()); }

                    return lstUsersOrgGroup;
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

        #region GetOrgDetails
        public List<MT_ATPAR_ORG_GROUPS> GetOrgDetails(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string sbSql = string.Empty;
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter sql_param_userid = new SqlParameter("@userid", SqlDbType.NVarChar, 20);
                    sql_param_userid.Value = userID;

                    sbSql = "exec GetOrgGroupIds @userid";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "ORG_GROUP_ID", "ORG_GROUP_NAME" };
                    var lstOrgGroups = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUPS>(fileds, sbSql.ToString(), sql_param_userid).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Org Groups Returned: " + lstOrgGroups.Count); }

                    return lstOrgGroups;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = string.Empty;
            }
        }
        #endregion

        #region GetMyPreferences
        public List<MT_ATPAR_USER_ACL> GetMyPreferences(string preference, string uId, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string strSQL = string.Empty;
            string pStrRetVal = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    // CreateLocalDB(pDeviceTokenEntry(TokenEntry_Enum.SystemID))
                    strSQL = " SELECT " + preference + " FROM MT_ATPAR_USER_ACL  WHERE USER_ID='" + uId + "'";
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + strSQL.ToString() + ":")); }
                    }
                    //var fields = new[] { "USER_ID", "TOKEN_EXPIRY_PERIOD", "LOGIN_ALLOWED", "PASSHASH_REQUIRED", "TIME_RESTRICTIONS", "ACCOUNT_DISABLED","IDLE_TIME","INVALID_LOGIN_ATTEMPTS","PASSWD_RESET_REQUIRED","PASSWD_UPDATE_DATE","PASSWD_EXPT_DATE","REPORT_USER","RECORDS_PER_PAGE","DEFAULT_REPORT_DURATION", "TABLE_NAME" };

                    var auditfields = objContext.Database.SqlQuery<MT_ATPAR_USER_ACL>(strSQL).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of User Acl Returned: " + auditfields.Count()); }

                    return auditfields;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + strSQL.ToString()); }
                throw ex;
            }
            finally
            {
                strSQL = string.Empty;
            }
        }
        #endregion

        #region GetApps
        /// <summary>
        /// Gettings APP_ID and APP_NAME from MT_ATPAR_APP
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public List<MT_ATPAR_APP> GetApps(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_ATPAR_APP> lstAppData = null;
            string strSQL = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    strSQL = "SELECT APP_ID, APP_NAME FROM MT_ATPAR_APP";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    string[] fields = new string[] { "APP_ID", "APP_NAME" };
                    lstAppData = objContext.Database.DifferedExecuteQuery<MT_ATPAR_APP>(fields, strSQL).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of App Returned: " + lstAppData.Count()); }

                    return lstAppData;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + strSQL.ToString()); }
                throw ex;
            }
            finally
            {
                strSQL = string.Empty;
            }
        }
        #endregion

        #region GetOrgGrpIDs  
        /// <summary>
        /// Getting OrgGroupIds
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public List<MT_ATPAR_ORG_GROUPS> GetOrgGrpIDs(string userID, string orgGrpID, string name)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            List<MT_ATPAR_ORG_GROUPS> data = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramOrgGrpId = new SqlParameter("@pOrgGrpID", orgGrpID);
                    SqlParameter paramName = new SqlParameter("@pName", name);

                    object[] parameters = { paramOrgGrpId, paramName };
                    sbSql = "EXEC SP_GetOrgGrpID @pOrgGrpID,@pName";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "ORG_GROUP_ID", "ORG_GROUP_NAME" };
                    data = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUPS>(fields, sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Org Group Returned: " + data.Count()); }

                    return data;
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

        public string GetUserOrgGroupId(string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlStr = string.Format("SELECT ORG_GROUP_ID FROM MT_ATPAR_USER_ORG_GROUPS WHERE USER_ID='{0}'", userId);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var orgGroupId = objContext.Database.SqlQuery<string>(SqlStr).ToList().FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} : User Id : {1} - Org Group Id: {2}", methodBaseName, userId, orgGroupId.ReplaceNullwithEmpty())); }

                    return orgGroupId;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, SqlStr)); }
                throw ex;
            }
            finally
            {
                SqlStr = string.Empty;
            }
        }

        public List<string> GetUserOrgGroupList(string orgGrpId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter paramOrgGrpId = new SqlParameter("@pOrgGrpID", orgGrpId);

                    object[] parameters = { paramOrgGrpId };
                    SqlStr = "EXEC sp_GetDistinctOrgGrpIDs @pOrgGrpID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + SqlStr + ":")); }
                    }
                    var orgGroupIdIds = objContext.Database.SqlQuery<string>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} : Org Group Id : {1} - Fetched Distinct Org Group Ids count : {2}", methodBaseName, orgGrpId, orgGroupIdIds.Count())); }

                    return orgGroupIdIds;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, SqlStr)); }
                throw ex;
            }
            finally
            {
                SqlStr = string.Empty;
            }
        }
        #endregion

        #region GetProfiles
        /// <summary>
        /// Getting  PROFILE_ID and PROFILE_DESCRIPTION from MT_ATPAR_PROFILE table
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<MT_ATPAR_PROFILE> GetProfiles(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strSQL = string.Empty;
            List<MT_ATPAR_PROFILE> listProfiles = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    strSQL = "SELECT PROFILE_ID, PROFILE_DESCRIPTION FROM MT_ATPAR_PROFILE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + strSQL.ToString() + ":")); }
                    }

                    string[] fields = new string[] { "PROFILE_ID", "PROFILE_DESCRIPTION" };
                    listProfiles = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PROFILE>(fields, strSQL).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + listProfiles.Count); }

                    return listProfiles;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + strSQL.ToString()); }
                throw ex;
            }
        }
        #endregion

        #region GetServerAccessCnt
        /// <summary>
        /// Getting Server Access Count from MT_ATPAR_PROFILE_APP_ACL
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <returns></returns>
        public int GetServerAccessCnt(string userID, string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(SERVER_USER) FROM MT_ATPAR_PROFILE_APP_ACL WHERE SERVER_USER='Y'  ");

                    if (!string.IsNullOrEmpty(profileID))
                    {
                        sbSql.Append(" AND PROFILE_ID = '").Append(profileID).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).ToList().FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + count); }

                    return count;
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

        #region GetClientAccessCnt
        /// <summary>
        /// Getting Client Access Count from MT_ATPAR_PROFILE_APP_ACL
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <returns></returns>
        public int GetClientAccessCnt(string userID, string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(CLIENT_USER) FROM MT_ATPAR_PROFILE_APP_ACL WHERE CLIENT_USER='Y'  ");

                    if (!string.IsNullOrEmpty(profileID))
                    {
                        sbSql.Append(" AND PROFILE_ID = '").Append(profileID).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).ToList().FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + count); }

                    return count;
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

        #region GetPrintersData
        /// <summary>
        /// Getting Printers Data From Stored Procedure GetPrinterData
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="pPrinterName"></param>
        /// <returns></returns>
        public List<MT_ATPAR_SETUP_PRO_PRINTERES> GetPrintersData(string appID, string pPrinterName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strSQL = string.Empty;

            List<MT_ATPAR_SETUP_PRO_PRINTERES> data = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramAppID = new SqlParameter("@pAppID", appID);
                    SqlParameter paramPrinterName = new SqlParameter("@pPrinterName", pPrinterName);

                    object[] parameters = { paramAppID, paramPrinterName };

                    strSQL = "EXEC GetPrinterData @pAppID,@pPrinterName";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + strSQL.ToString() + ":")); }
                    }
                    var fields = new[] { "APP_ID", "PRINTER_CODE", "IP_ADDRESS", "PORT_NO", "FRIENDLY_NAME", "STATUS", "MODEL", "APP_NAME", "PRINTER_NAME", "NETWORK_TYPE", "FUNCTIONALITY", "LABEL_TYPE", "USER_ID" };

                    data = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SETUP_PRO_PRINTERES>(fields, strSQL, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Org Group Returned: " + data.Count()); }
                    if (data.Count > 1)
                    {
                        data = data.OrderBy(x => x.PRINTER_NAME).ToList();
                    }

                    return data;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + strSQL.ToString()); }
                throw ex;
            }
            finally
            {
                strSQL = null;
            }
        }
        #endregion

        #region GetAppParameters
        /// <summary>
        /// Getting AppParameters from SP_GetProductParameters
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="appID"></param>
        /// <returns></returns> 
        public List<VM_MT_ATPAR_ORG_GROUP_PARAMETERS> GetAppParameters(string userID, string orgGrpID, string appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = "";
            string strEnterpriseSystem = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                    List<string> lstParameters = new List<string>();

                    lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                    lstConfigSectionDtls = GetConfigData(lstParameters).ToList();

                    strEnterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramOrgGrpId = new SqlParameter("@pOrgGrpID", orgGrpID);
                    SqlParameter paramAppId = new SqlParameter("@pAppID", appID);
                    SqlParameter paramEnterpriseSystem = new SqlParameter("@pEnterpriseSystem", strEnterpriseSystem);

                    object[] parameters = { paramOrgGrpId, paramAppId, paramEnterpriseSystem };

                    sbSql = "EXEC SP_GetProductParameters @pOrgGrpID,@pAppID,@pEnterpriseSystem";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "PARAMETER_ID", "PARAMETER_VALUE", "SHORT_DESCR", "LONG_DESCR", "MULTIPLE_VALUES", "PARAMETER_TYPE", "VALIDATION", "DEFAULT_VALUE" };

                    var lstOrgParms = objContext.Database.DifferedExecuteQuery<VM_MT_ATPAR_ORG_GROUP_PARAMETERS>(fields, sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of AppParameters Returned: " + lstOrgParms.Count()); }

                    return lstOrgParms;
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

        #region CheckRecall
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public bool CheckRecall()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string recallParameter = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                    List<string> lstParameters = new List<string>();

                    lstParameters.Add(AtParWebEnums.Get_Recall_ParamValue_Enum.RECALL_MGMT_IMPLEMENTED.ToString());
                    lstParameters.Add(AtParWebEnums.CONFIGFILE.ATPAR_SYSTEM.ToString());

                    lstConfigSectionDtls = GetConfigData(lstParameters).ToList();

                    recallParameter = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.Get_Recall_ParamValue_Enum.RECALL_MGMT_IMPLEMENTED.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ATPAR_SYSTEM.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                    bool value = Convert.ToBoolean(recallParameter);
                    return value;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }
        #endregion

        #region SaveAppParameters
        /// <summary>
        /// Saving AppParameters to MT_ATPAR_ORG_GROUP_PARAMETERS
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <param name="appID"></param>
        /// <param name="user"></param>
        /// <param name="lstOrgParams"></param>
        /// <returns></returns>
        public long SaveAppParameters(string orgGrpID, string appID, string user, List<MT_ATPAR_ORG_GROUP_PARAMETERS> lstOrgParams)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_ATPAR_ORG_GROUP_PARAMETERS> listOrgParams = null;

            StringBuilder sbSql = new StringBuilder();

            long statusCode = -1;

            using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
            {
                using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                {
                    try
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        sbSql.Append("SELECT PARAMETER_ID FROM MT_ATPAR_ORG_GROUP_PARAMETERS WHERE ORG_GROUP_ID = '");
                        sbSql.Append(orgGrpID);
                        sbSql.Append("' AND APP_ID = '");
                        sbSql.Append(appID);
                        sbSql.Append("' ");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled)
                            {
                                objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                            }
                        }

                        string[] fields = new string[] { "PARAMETER_ID" };

                        listOrgParams = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUP_PARAMETERS>(fields, sbSql.ToString()).ToList();

                        foreach (var item in lstOrgParams)
                        {
                            string strSearch = string.Empty;
                            MT_ATPAR_ORG_GROUP_PARAMETERS serachRow = null;
                            serachRow = listOrgParams.Where(x => x.PARAMETER_ID == item.PARAMETER_ID).FirstOrDefault();

                            if (serachRow != null)
                            {
                                statusCode = UpdateAppParameters(orgGrpID, appID, user, item.PARAMETER_VALUE, item.PARAMETER_ID, objContext);

                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                            }
                            else
                            {
                                statusCode = InsertAppParameters(orgGrpID, appID, user, item.PARAMETER_VALUE, item.PARAMETER_ID, objContext);

                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                            }
                        }
                        trans.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                        trans.Rollback();
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                    finally
                    {
                        sbSql = null;
                    }
                }
            }
        }

        private long SelectAppParameters(string pOrgGrpId, string pAppId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_ATPAR_ORG_GROUP_PARAMETERS> listAppParams = null;
            StringBuilder sbSql = new StringBuilder();
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT PARAMETER_ID FROM MT_ATPAR_ORG_GROUP_PARAMETERS WHERE ORG_GROUP_ID = '");
                sbSql.Append(pOrgGrpId);
                sbSql.Append("' AND APP_ID = '");
                sbSql.Append(pAppId);
                sbSql.Append("' ");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                string[] fields = new string[] { "PARAMETER_ID" };
                listAppParams = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUP_PARAMETERS>(fields, sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count "); }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        private long UpdateAppParameters(string pOrgGrpId, string pAppId, string pUser, string paramValue, string paramId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" UPDATE MT_ATPAR_ORG_GROUP_PARAMETERS SET PARAMETER_VALUE =  ");
                sbSql.Append(" '").Append(paramValue).Append("' ");
                sbSql.Append(" , LAST_UPDATE_DATE = GETDATE() ,LAST_UPDATE_USER = '").Append(pUser).Append("' ");
                sbSql.Append("  WHERE ORG_GROUP_ID = '").Append(pOrgGrpId).Append("' AND  APP_ID = '").Append(pAppId).Append("' AND ");
                sbSql.Append(" PARAMETER_ID = '").Append(paramId).Append("' ");

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
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        private long InsertAppParameters(string pOrgGrpId, string pAppId, string pUser, string paramValue, string paramId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_ORG_GROUP_PARAMETERS (ORG_GROUP_ID, APP_ID, PARAMETER_ID,PARAMETER_VALUE, LAST_UPDATE_DATE, LAST_UPDATE_USER) VALUES ('");
                sbSql.Append(pOrgGrpId);
                sbSql.Append("','").Append(pAppId);
                sbSql.Append("', '").Append(paramId);
                sbSql.Append("', '").Append(paramValue);
                sbSql.Append("', GETDATE(), '");
                sbSql.Append(pUser);
                sbSql.Append("') ");

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

        #region DoAuditData

        public List<MT_ATPAR_AUDIT_SCREEN_CONTROLS> GetAuditFields(short appId, string functionName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = "";
            long statusCode = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter parampAppId = new SqlParameter("@pAppId", appId);
                    SqlParameter parampStrFunctionName = new SqlParameter("@pStrFunctionName", functionName);
                    SqlParameter paramStatusCode = new SqlParameter("@statusCode", statusCode);
                    paramStatusCode.Direction = System.Data.ParameterDirection.Output;

                    object[] parameters = { parampAppId, parampStrFunctionName, paramStatusCode };

                    sbSql = "EXEC GetAuditFields @pAppId,@pStrFunctionName,@statusCode OUT";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "FIELD_NAME", "SUBFUNCTION_NAME", "KEY_FLAG", "PARAMETER_VALUE", "APP_ID", "FUNCTION_NAME", "TABLE_NAME" };

                    var auditfields = objContext.Database.DifferedExecuteQuery<MT_ATPAR_AUDIT_SCREEN_CONTROLS>(fields, sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Vendors Returned: " + auditfields.Count()); }

                    return auditfields;
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

        public long InsertAuditInfo(short appId, string functionName, string subFunctionName, string keys, string updateUserId, string fieldName, string oldValue, string newValue)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append(" INSERT INTO MT_ATPAR_AUDIT_INFO ([APP_ID],[FUNCTION_NAME] , ").Append(" [SUBFUNCTION_NAME] ,[KEY_VALUES],[UPDATE_USER_ID],").Append(" [UPDATE_DATE] ,[FIELD_NAME] ,[OLD_VALUE],[NEW_VALUE]) ").Append((" VALUES ("
                  + (appId + ","))).Append(("'"
                  + (functionName + "',"))).Append(("'"
                  + (subFunctionName + "' ,"))).Append(("'"
                  + (keys.Replace("'", "''") + "',"))).Append(("'"
                  + (updateUserId + "',"))).Append("GETDATE(),").Append(("'"
                  + (fieldName + "',"))).Append(("'"
                  + (oldValue.Replace("'", "''") + "',"))).Append(("'"
                  + (newValue.Replace("'", "''") + "')")));

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
                }
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

        public List<object> GetTableDataDynamic(object tablename, string keyColumns)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var table = tablename.ToString();
            var s = table.Split('.');
            sbSql.Append("SELECT * FROM ").Append(tablename).Append(" WHERE ").Append(keyColumns);
            string s1 = "AtPar.POCOEntities." + tablename.ToString() + ",AtPar.POCOEntities";
            Type elementType = Type.GetType(s1, true);
            List<object> dynamicList = new List<object>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var enterpriseDetails = objContext.Database.SqlQuery(elementType, sbSql.ToString());

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    foreach (var item in enterpriseDetails)
                    {
                        dynamicList.Add(item);
                    }
                    return dynamicList;
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

        #region GetOrgGroupIDS
        /// <summary>
        /// Getting OrgGroupIds from  MT_ATPAR_ORG_GROUPS
        /// </summary>
        /// <returns></returns>
        public List<MT_ATPAR_ORG_GROUPS> GetOrgGroupIDS()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_ORG_GROUPS> lstOrgGrpIds = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_GROUP_ID,ORG_GROUP_NAME FROM MT_ATPAR_ORG_GROUPS WHERE ORG_GROUP_ID <> 'All'");

                    var fields = new[] { "ORG_GROUP_ID", "ORG_GROUP_NAME" };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    lstOrgGrpIds = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUPS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of user parameters returned: " + lstOrgGrpIds.Count()); }

                    return lstOrgGrpIds;
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

        #region GetOrgBUnits
        /// <summary>
        /// Getting OrgBUnits from MT_ATPAR_ORG_GROUP_BUNITS
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        public List<MT_ATPAR_ORG_GROUP_BUNITS> GetOrgBUnits(string userID, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_ORG_GROUP_BUNITS> data = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT BUSINESS_UNIT , BU_TYPE FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID = '").Append(orgGrpID).Append("' ORDER BY BUSINESS_UNIT ASC ");

                    var fields = new[] { "BUSINESS_UNIT", "BU_TYPE" };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    data = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUP_BUNITS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Org Group BUnits: " + data.Count()); }

                    return data;
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

        #region GetAtParVesrions
        public List<string> GetAtParVersions(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<string> atParVersions = new List<string>();

            try
            {
                XDocument doc = XDocument.Load(@"" + AppDomain.CurrentDomain.BaseDirectory[0] + ":\\AtPar\\Web\\Version.xml");
                XElement element = doc.Element("root").Element("product_version");

                atParVersions.Add("WEB : " + element.Element("WEB").Value);
                atParVersions.Add("HHT : " + element.Element("HHT").Value);
                atParVersions.Add("DT : " + element.Element("Win32").Value);
                atParVersions.Add("AHHT : " + element.Element("AHHT").Value);
                atParVersions.Add("IHHT : " + element.Element("IHHT").Value);
                atParVersions.Add("WHHT : " + element.Element("WHHT").Value);

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "AtPar Versions Count : " + atParVersions.Count()); }

                return atParVersions;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                //atParVersions = null;
            }
        }
        #endregion

        #region GetUserOrgGrpID
        /// <summary>
        /// To get an user orgGrpID
        /// </summary>
        /// <param name="userIdD"></param>
        /// <returns></returns>
        public string GetUserOrgGrpID(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql.Append("SELECT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUPS WHERE ORG_GROUP_ID IN ");
                    sbSql.Append("(SELECT ORG_GROUP_ID FROM MT_ATPAR_USER_ORG_GROUPS WHERE USER_ID='" + userID + "')");

                    var pOrgGroupId = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    return pOrgGroupId;
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

        #region Allocate BusinessUnits

        public long ProcessBUnits(List<VM_ATPAR_IBU_ALLOCATION> lstBUnits, string userID, string appID, string serverUserID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteBUnits(lstBUnits, userID, appID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        lstBUnits.RemoveAll(x => x.CHK_VALUE == 0);

                        StatusCode = InsertBunits(lstBUnits, appID, userID, serverUserID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        trans.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        public long ProcessSelectedBUnits(List<VM_ATPAR_IBU_ALLOCATION> lstBUnits, string userID, string appID, string serverUserID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteAllBunits(userID, appID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        StatusCode = InsertBunits(lstBUnits, appID, userID, serverUserID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        trans.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private long DeleteBUnits(List<VM_ATPAR_IBU_ALLOCATION> lstBUnits, string userID,
                                 string appID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();


            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstBUnits)
                {
                    sbSql.Clear();

                    sbSql.Append("IF EXISTS(SELECT BUSINESS_UNIT FROM MT_ATPAR_IBU_ALLOCATION WHERE  ");
                    sbSql.Append("USER_ID = '" + userID + "'AND BUSINESS_UNIT = '" + item.BUSINESS_UNIT + "' ");
                    sbSql.Append("AND APP_ID ='" + appID + "') ");
                    sbSql.Append("DELETE FROM MT_ATPAR_IBU_ALLOCATION WHERE USER_ID = '" + userID + "' ");
                    sbSql.Append("AND BUSINESS_UNIT = '" + item.BUSINESS_UNIT + "' AND APP_ID =" + appID + " ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }
                }

                return AtparStatusCodes.ATPAR_OK;

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

        private long InsertBunits(List<VM_ATPAR_IBU_ALLOCATION> lstBUnits, string appID, string userID,
                                   string serverUserID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstBUnits)
                {
                    sbSql.Clear();

                    item.ReplaceProperty(c => c.BUSINESS_UNIT);

                    sbSql.Append("INSERT INTO MT_ATPAR_IBU_ALLOCATION(APP_ID, ");
                    sbSql.Append("BUSINESS_UNIT, ");
                    sbSql.Append("USER_ID, ");
                    if (item.DEFAULT_PRINTER != null)
                    {
                        sbSql.Append("DEFAULT_PRINTER, ");
                    }

                    if (item.COUNT_FLAG != null)
                    {
                        sbSql.Append("COUNT_FLAG, ");
                    }

                    if (item.ALLOW_SIC_CONSIGN != null)
                    {
                        sbSql.Append("ALLOW_SIC_CONSIGN, ");
                    }

                    sbSql.Append("UPDATE_DATE, ");
                    sbSql.Append("UPDATE_USER_ID) ");
                    sbSql.Append("VALUES('" + appID + "', ");
                    sbSql.Append("'" + item.BUSINESS_UNIT + "', ");
                    sbSql.Append("'" + userID + "', ");
                    if (item.DEFAULT_PRINTER != null)
                    {
                        sbSql.Append("'" + item.DEFAULT_PRINTER + "', ");
                    }

                    if (item.COUNT_FLAG != null)
                    {
                        sbSql.Append("'" + item.COUNT_FLAG + "', ");
                    }

                    if (item.ALLOW_SIC_CONSIGN != null)
                    {
                        sbSql.Append("'" + item.ALLOW_SIC_CONSIGN + "', ");
                    }
                    sbSql.Append(" '" + DateTime.Now + "', ");
                    sbSql.Append("'" + serverUserID + "') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

                }

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

        private long DeleteAllBunits(string userID, string appID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_ATPAR_IBU_ALLOCATION WHERE  ");
                sbSql.Append("USER_ID = '" + userID + "' AND APP_ID ='" + appID + "' ");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }


                return AtparStatusCodes.ATPAR_OK;
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

        public List<MT_ATPAR_IBU_ALLOCATION> GetBUnits(string appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.APP_ID, BUSINESS_UNIT, A.USER_ID, CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+'('+A.USER_ID+')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '(' + A.USER_ID + ')')  END AS   ");
                    sbSql.Append("USERNAME, DEFAULT_PRINTER, COUNT_FLAG, ALLOW_SIC_CONSIGN FROM MT_ATPAR_IBU_ALLOCATION A, MT_ATPAR_USER B WHERE A.USER_ID=B.USER_ID ");
                    sbSql.Append("And A.APP_ID ='" + appId + "' ORDER BY BUSINESS_UNIT ASC ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "APP_ID", "BUSINESS_UNIT", "USER_ID", "USERNAME", "DEFAULT_PRINTER", "COUNT_FLAG", "ALLOW_SIC_CONSIGN" };

                    var lstBusinessUnits = objContext.Database.DifferedExecuteQuery<MT_ATPAR_IBU_ALLOCATION>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstBusinessUnits); }

                    return lstBusinessUnits;

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

        #region GetOrgGroupParamValues
        public void GetOrgGroupParamValues(SortedList<string, string> orgParams, int appID, string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_ORG_GROUP_PARAMETERS> lstOrgGrp = null;


            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (((appID.ToString().Length == 0) || ((orgGroupID.Length == 0) || (orgParams.Count == 0))))
                    {
                        if (_log.IsWarnEnabled)
                        {
                            _log.Warn((methodBaseName + ("(ApplicationId:" + (appID +
                                                        (", orgGroupID:" + (orgGroupID +
                                                        (",orgParams.Count:" + (orgParams.Count + ") E_INVALIDPARAMETER "))))))));
                        }

                        return;
                    }

                    int paramCount = orgParams.Count;

                    sbSql.Append("SELECT ");

                    if ((paramCount == 1))
                    {
                        sbSql.Append("PARAMETER_VALUE ");
                    }
                    else if ((paramCount > 1))
                    {
                        sbSql.Append("PARAMETER_ID, PARAMETER_VALUE ");
                    }


                    sbSql.Append(("FROM MT_ATPAR_ORG_GROUP_PARAMETERS " + (" WHERE ORG_GROUP_ID =\'"
                                    + (orgGroupID + ("\' AND APP_ID = "
                                    + (appID + " AND "))))));


                    if ((paramCount == 1))
                    {
                        sbSql.Append((" PARAMETER_ID =\'" + (orgParams.Keys[0] + "\'")));
                    }
                    else if ((paramCount > 1))
                    {
                        string[] paramsList = new string[paramCount];

                        for (int i = 0; i <= (paramCount - 1); i++)
                        {
                            paramsList[i] = ("\'" + (orgParams.Keys[i] + "\'"));
                        }

                        string _paramListStr = string.Join(",", paramsList, 0, paramCount);
                        sbSql.Append((" PARAMETER_ID IN (" + (_paramListStr + ")")));
                    }



                    if ((paramCount == 1))
                    {

                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }

                        orgParams[orgParams.Keys[0]] = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList().FirstOrDefault();


                    }
                    else if ((paramCount > 1))
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        var fields = new[] { "PARAMETER_ID", "PARAMETER_VALUE" };
                        lstOrgGrp = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUP_PARAMETERS>(fields, sbSql.ToString()).ToList();





                        if (!(lstOrgGrp == null))
                        {
                            foreach (var item in lstOrgGrp)
                            {
                                orgParams[item.PARAMETER_ID] = item.PARAMETER_VALUE;
                            }

                        }


                    }

                    //  print out the values we received for debugging
                    if (_log.IsInfoEnabled)
                    {

                        sbSql.Append((" Got the following Parameter Values : " + "\r\n"));
                        foreach (KeyValuePair<string, string> i in orgParams)
                        {
                            sbSql.Append(("Parameter : "
                                            + (i.Key.ToString().PadRight(20) + "-" + (", Value :" + (i.Value + "\r\n")))));
                        }

                        _log.Info(sbSql.ToString());
                    }


                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} {4}:", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }

                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetProfileParamValues        
        public void GetProfileParamValues(SortedList<string, string> profParams, int appID, string profileID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_PROFILE_PARAMETERS> lstProfileParams = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (((appID.ToString().Length == 0) || ((profileID.Length == 0) || (profParams.Count == 0))))
                    {
                        if (_log.IsWarnEnabled)
                        {
                            _log.Warn((methodBaseName + ("(ApplicationId:" + (appID +
                                                        (", ProfileID:" + (profileID +
                                                        (",profParams.Count:" + (profParams.Count + ") E_INVALIDPARAMETER "))))))));
                        }

                        return;

                    }

                    int paramCount = profParams.Count;

                    sbSql.Append("SELECT ");

                    if ((paramCount == 1))
                    {
                        sbSql.Append("PARAMETER_VALUE ");
                    }
                    else if ((paramCount > 1))
                    {
                        sbSql.Append("PARAMETER_ID, PARAMETER_VALUE ");
                    }


                    sbSql.Append(("FROM MT_ATPAR_PROFILE_PARAMETERS " + (" WHERE PROFILE_ID =\'"
                                    + (profileID + ("\' AND APP_ID = "
                                    + (appID + " AND "))))));


                    if ((paramCount == 1))
                    {
                        sbSql.Append((" PARAMETER_ID =\'" + (profParams.Keys[0] + "\'")));
                    }
                    else if ((paramCount > 1))
                    {
                        string[] paramsList = new string[paramCount];

                        for (int i = 0; (i <= (paramCount - 1)); i++)
                        {
                            paramsList[i] = ("\'" + (profParams.Keys[i] + "\'"));
                        }

                        string _paramListStr = string.Join(",", paramsList, 0, paramCount);
                        sbSql.Append((" PARAMETER_ID IN (" + (_paramListStr + ")")));
                    }


                    if ((paramCount == 1))
                    {

                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }

                        profParams[profParams.Keys[0]] = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList().FirstOrDefault();


                    }
                    else if ((paramCount > 1))
                    {

                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        var fields = new[] { "PARAMETER_ID", "PARAMETER_VALUE" };
                        lstProfileParams = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PROFILE_PARAMETERS>(fields, sbSql.ToString()).ToList();

                        if (!(lstProfileParams == null))
                        {
                            foreach (var item in lstProfileParams)
                            {
                                profParams[item.PARAMETER_ID] = item.PARAMETER_VALUE;
                            }

                        }


                    }

                    //  print out the values we received for debugging
                    if (_log.IsInfoEnabled)
                    {

                        sbSql.Append((" Got the following Parameter Values : " + "\r\n"));
                        foreach (KeyValuePair<string, string> i in profParams)
                        {

                            sbSql.Append(("Parameter : "
                                            + (i.Key.ToString().PadRight(20) + "-" + (", Value :" + (i.Value + "\r\n")))));
                        }

                        _log.Info(sbSql.ToString());
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} {4}:", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }

        }

        #endregion

        #region GetUserParamValues        
        public void GetUserParamValues(SortedList<string, string> userParams, int appID, string UserID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_USER_APP_PARAMETERS> lstProfileParams = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (((appID.ToString().Length == 0) || ((UserID.Length == 0) || (userParams.Count == 0))))
                    {
                        if (_log.IsWarnEnabled)
                        {
                            _log.Warn((methodBaseName + ("(ApplicationId:" + (appID +
                                                        (", ProfileID:" + (UserID +
                                                        (",userParams.Count:" + (userParams.Count + ") E_INVALIDPARAMETER "))))))));
                        }

                        return;

                    }

                    int paramCount = userParams.Count;

                    sbSql.Append("SELECT ");

                    if ((paramCount == 1))
                    {
                        sbSql.Append("PARAMETER_VALUE ");
                    }
                    else if ((paramCount > 1))
                    {
                        sbSql.Append("PARAMETER_ID, PARAMETER_VALUE ");
                    }


                    sbSql.Append(("FROM MT_ATPAR_USER_APP_PARAMETERS " + (" WHERE USER_ID =\'"
                                    + (UserID + ("\' AND APP_ID = "
                                    + (appID + " AND "))))));


                    if ((paramCount == 1))
                    {
                        sbSql.Append((" PARAMETER_ID =\'" + (userParams.Keys[0] + "\'")));
                    }
                    else if ((paramCount > 1))
                    {
                        string[] paramsList = new string[paramCount];

                        for (int i = 0; (i <= (paramCount - 1)); i++)
                        {
                            paramsList[i] = ("\'" + (userParams.Keys[i] + "\'"));
                        }

                        string _paramListStr = string.Join(",", paramsList, 0, paramCount);
                        sbSql.Append((" PARAMETER_ID IN (" + (_paramListStr + ")")));
                    }


                    if ((paramCount == 1))
                    {

                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }

                        userParams[userParams.Keys[0]] = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList().FirstOrDefault();


                    }
                    else if ((paramCount > 1))
                    {

                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        var fields = new[] { "PARAMETER_ID", "PARAMETER_VALUE" };
                        lstProfileParams = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER_APP_PARAMETERS>(fields, sbSql.ToString()).ToList();

                        if (!(lstProfileParams == null))
                        {
                            foreach (var item in lstProfileParams)
                            {
                                userParams[item.PARAMETER_ID] = item.PARAMETER_VALUE;
                            }

                        }


                    }

                    //  print out the values we received for debugging
                    if (_log.IsInfoEnabled)
                    {

                        sbSql.Append((" Got the following Parameter Values : " + "\r\n"));
                        foreach (KeyValuePair<string, string> i in userParams)
                        {

                            sbSql.Append(("Parameter : "
                                            + (i.Key.ToString().PadRight(20) + "-" + (", Value :" + (i.Value + "\r\n")))));
                        }

                        _log.Info(sbSql.ToString());
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

        #region GetProfileParamValue
        public string GetProfileParamValue(string profileID, int appID, string parameterID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PARAMETER_VALUE FROM ");
                    sbSql.Append("MT_ATPAR_PROFILE_PARAMETERS WHERE");
                    sbSql.Append(" PROFILE_ID ='" + profileID + "' AND APP_ID = " + appID + " ");
                    sbSql.Append(" AND PARAMETER_ID ='" + parameterID + "'");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var lstparameters = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Profiles Returned: " + lstparameters); }

                    return lstparameters;

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

        #region GetOrgGroupParamValue

        /// <summary>
        /// Gets the Org Group Parameter
        /// </summary>
        /// <param name="orgParamName"></param>
        /// <param name="appID"></param>
        /// <param name="orgGroupID"></param>
        /// <returns></returns>
        public string GetOrgGroupParamValue(string orgParamName, int appID, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql.Append("SELECT PARAMETER_VALUE FROM MT_ATPAR_ORG_GROUP_PARAMETERS WHERE ORG_GROUP_ID = '");
                    sbSql.Append(orgGroupID + "' AND APP_ID = '" + appID + "' AND PARAMETER_ID ='");
                    sbSql.Append(orgParamName + "'");

                    return objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} {4}:", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }

                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region GetUserParamValue
        public string GetUserParamValue(string userID, int appID, string parameterID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PARAMETER_VALUE FROM ");
                    sbSql.Append("MT_ATPAR_USER_APP_PARAMETERS WHERE");
                    sbSql.Append(" APP_ID = " + appID + " AND PARAMETER_ID ='" + parameterID + "' ");
                    sbSql.Append(" AND USER_ID='" + userID + "'");



                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var lstparameters = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of users Returned: " + lstparameters); }

                    return lstparameters;

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

        #region GetListViewDetails
        public List<string> GetListViewDetails(string appID, string screenName, string profileID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT FIELD_NAME FROM MT_ATPAR_PROFILE_LIST_VIEW WHERE APP_ID ='" + appID + "' ");
                    sbSql.Append("AND DISPLAY_FIELD = 'Y' AND SCREEN_NAME = '" + screenName + "' AND PROFILE_ID= '" + profileID + "' ");
                    sbSql.Append("UNION SELECT FIELD_NAME FROM MT_ATPAR_LIST_VIEW WHERE APP_ID = '" + appID + "' ");
                    sbSql.Append("AND MANDATORY_FIELD = 'Y' AND SCREEN_NAME = '" + screenName + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstFields = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstFields); }

                    return lstFields;

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

        #region GetAtparLatestValues

        public long GetAtparLatestValues(int appID, string fieldName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long latestVal;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT LATEST_VALUE FROM MT_ATPAR_LATEST_VALUES WHERE APP_ID=" + appID + " AND FIELD_ID='" + fieldName + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    latestVal = objContext.Database.SqlQuery<Int32>(sbSql.ToString()).FirstOrDefault();

                    latestVal += 1;

                    sbSql.Remove(0, sbSql.Length);

                    sbSql.Append("UPDATE MT_ATPAR_LATEST_VALUES  SET LATEST_VALUE=" + latestVal + " WHERE APP_ID=" + appID + "  AND FIELD_ID='" + fieldName + "'");

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    return latestVal;
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

        #region InsertTransaction
        public long InsertTransaction(AtPar_Transaction_Entity transactionDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

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


                            if ((transactionDetails.TransactionId == 0) || (transactionDetails.ApplicationId == 0))
                            {
                                return AtparStatusCodes.E_INVALIDPARAMETER;
                            }

                            if (transactionDetails.DownloadDateTime != null)
                            {
                                transactionDetails.DownloadDateTime = DateTime.Now;
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.Description) && transactionDetails.Description.IndexOf("'") > 0)
                            {
                                transactionDetails.Description = transactionDetails.Description.Replace("'", "''");
                            }


                            sbSql.Append("INSERT INTO MT_ATPAR_TRANSACTION (TRANSACTION_ID, APP_ID, ID, ");
                            sbSql.Append("BUSINESS_UNIT,STATUS, TOTAL_REC_DOWNLOADED, DOWNLOAD_DT_TIME, ");
                            sbSql.Append("DOWNLOAD_USERID, USER_ID, DEVICE_ID, UPDATE_DT_TIME  ");


                            if (!string.IsNullOrEmpty(transactionDetails.Description))
                            {
                                sbSql.Append(",DESCR ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData1))
                            {
                                sbSql.Append(",REPORT_DATA_1 ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData2))
                            {
                                sbSql.Append(",REPORT_DATA_2 ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData3))
                            {
                                sbSql.Append(",REPORT_DATA_3 ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData4))
                            {
                                sbSql.Append(",REPORT_DATA_4 ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData5))
                            {
                                sbSql.Append(",REPORT_DATA_5 ");
                            }

                            if (transactionDetails.ReportData6 != null)
                            {
                                if (transactionDetails.ReportData6 != DateTime.MinValue)
                                {
                                    sbSql.Append(",REPORT_DATA_6 ");
                                }
                            }
                            if (transactionDetails.ReportData7 != null)
                            {
                                if (transactionDetails.ReportData7 != DateTime.MinValue)
                                {
                                    sbSql.Append(",REPORT_DATA_7 ");
                                }
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData8))
                            {
                                sbSql.Append(",REPORT_DATA_8 ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData9))
                            {
                                sbSql.Append(",REPORT_DATA_9 ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData10))
                            {
                                sbSql.Append(",REPORT_DATA_10 ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData11))
                            {
                                sbSql.Append(",REPORT_DATA_11 ");
                            }

                            if (transactionDetails.StartDateTime != null)
                            {
                                if (transactionDetails.StartDateTime != DateTime.MinValue)
                                {
                                    sbSql.Append(",START_DT_TIME ");
                                }
                            }

                            if (transactionDetails.EndDateTime != null)
                            {
                                if (transactionDetails.EndDateTime != DateTime.MinValue)
                                {
                                    sbSql.Append(",END_DT_TIME ");
                                }
                            }

                            if (transactionDetails.ApplicationId == (int)AtParWebEnums.EnumApps.PointOfUse)
                            {
                                sbSql.Append(",SCANS_COUNT ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.TotalRecordSent.ToString()))
                            {
                                sbSql.Append(",TOTAL_REC_SENT ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData12))
                            {
                                sbSql.Append(",REPORT_DATA_12 ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData13))
                            {
                                sbSql.Append(",REPORT_DATA_13 ");
                            }


                            sbSql.Append(" )VALUES (" + transactionDetails.TransactionId + ", ");
                            sbSql.Append(" " + transactionDetails.ApplicationId + ",'" + transactionDetails.ID + "', ");
                            sbSql.Append(" '" + transactionDetails.BusinessUnit + "','" + transactionDetails.Status + "',");
                            sbSql.Append(" " + transactionDetails.TotalRecordDownloaded + " ");

                            if (transactionDetails.DownloadDateTime != null)
                            {
                                sbSql.Append(",'" + DateTime.Now + "' ");
                            }
                            else
                            {
                                sbSql.Append(",'" + transactionDetails.DownloadDateTime + "' ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.DownloadUserId))
                            {
                                sbSql.Append(",'" + transactionDetails.DownloadUserId + "' ");
                            }
                            else
                            {
                                sbSql.Append(",'" + transactionDetails.UserId + "' ");
                            }

                            sbSql.Append(",'" + transactionDetails.UserId + "' , '" + transactionDetails.DeviceId + "', ");
                            sbSql.Append(" '" + DateTime.Now + "'");

                            if (!string.IsNullOrEmpty(transactionDetails.Description))
                            {
                                sbSql.Append(",'" + transactionDetails.Description.ReplaceString() + "' ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData1))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData1 + "' ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData2))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData2 + "' ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData3))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData3 + "' ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData4))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData4 + "' ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData5))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData5 + "' ");
                            }
                            if (transactionDetails.ReportData6 != null)
                            {
                                if (transactionDetails.ReportData6 != DateTime.MinValue)
                                {
                                    sbSql.Append(",'" + transactionDetails.ReportData6 + "' ");
                                }
                            }

                            if (transactionDetails.ReportData7 != null)
                            {
                                if (transactionDetails.ReportData7 != DateTime.MinValue)
                                {
                                    sbSql.Append("," + transactionDetails.ReportData7 + " ");
                                }
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData8))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData8 + "' ");
                            }

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData9))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData9 + "' ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData10))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData10 + "' ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData11))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData11 + "' ");
                            }
                            if (transactionDetails.StartDateTime != null)
                            {
                                if (transactionDetails.StartDateTime != DateTime.MinValue)
                                {
                                    sbSql.Append(",'" + transactionDetails.ReportData11 + "' ");
                                }
                            }

                            if (transactionDetails.EndDateTime != null)
                            {
                                if (transactionDetails.EndDateTime != DateTime.MinValue)
                                {
                                    sbSql.Append(",'" + transactionDetails.EndDateTime + "' ");
                                }
                            }
                            if (transactionDetails.ApplicationId == (int)AtParWebEnums.EnumApps.PointOfUse)
                            {
                                sbSql.Append(",'" + transactionDetails.ScansCount + "' ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.TotalRecordSent.ToString()))
                            {
                                sbSql.Append(",'" + transactionDetails.TotalRecordSent + "' ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData12))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData12 + "' ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData13))
                            {
                                sbSql.Append(",'" + transactionDetails.ReportData13 + "' )");
                            }
                            else
                            {
                                sbSql.Append(")");
                            }


                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                        }

                    }
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
        #endregion

        #region UpdateTransaction
        public long UpdateTransaction(AtPar_Transaction_Entity transactionDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

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

                            sbSql.Append("UPDATE MT_ATPAR_TRANSACTION SET STATUS = " + transactionDetails.Status + ",  ");
                            sbSql.Append("UPDATE_DT_TIME= GetDate() ");


                            if (transactionDetails.StartDateTime != null)
                            {
                                if (transactionDetails.StartDateTime.ToString().Length > 0)
                                {
                                    if (transactionDetails.StartDateTime != DateTime.MinValue)
                                    {
                                        sbSql.Append(",START_DT_TIME= ");
                                        sbSql.Append(" '" + transactionDetails.StartDateTime + "' ");

                                    }
                                }
                            }

                            if (transactionDetails.StartDateTime.ToString().Length > 0)
                            {

                                if (transactionDetails.EndDateTime != null)
                                {
                                    if (transactionDetails.EndDateTime != DateTime.MinValue)
                                    {
                                        sbSql.Append(",END_DT_TIME='" + transactionDetails.EndDateTime + "'  ");
                                    }
                                }
                            }

                            sbSql.Append(", USER_ID='" + transactionDetails.UserId + "' ");

                            if (transactionDetails.TotalRecordSent != 0)
                            {
                                sbSql.Append(" ,TOTAL_REC_SENT= " + transactionDetails.TotalRecordSent + " ");
                            }
                            if (transactionDetails.StatusCode != 0)
                            {
                                sbSql.Append(",STATUS_CODE= " + transactionDetails.StatusCode + " ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.Description))
                            {
                                sbSql.Append(",DESCR= '" + transactionDetails.Description + "' ");
                            }
                            sbSql.Append(", SCANS_COUNT=" + transactionDetails.ScansCount + "");

                            if (!string.IsNullOrEmpty(transactionDetails.ReportData3))
                            {
                                sbSql.Append(",REPORT_DATA_3= '" + transactionDetails.ReportData3 + "' ");
                            }
                            if (!string.IsNullOrEmpty(transactionDetails.ReportData8))
                            {
                                sbSql.Append(",REPORT_DATA_8= '" + transactionDetails.ReportData8 + "' ");
                            }
                            if (transactionDetails.ReportData9 != null)
                            {
                                if (transactionDetails.ReportData9.Length > 0)
                                {
                                    sbSql.Append(",REPORT_DATA_9= '" + transactionDetails.ReportData9 + "' ");
                                }
                            }
                            if (transactionDetails.ReportData10 != null)
                            {
                                if (transactionDetails.ReportData10.Length > 0)
                                {
                                    sbSql.Append(",REPORT_DATA_10= '" + transactionDetails.ReportData10 + "' ");
                                }
                            }

                            sbSql.Append(" WHERE TRANSACTION_ID=" + transactionDetails.TransactionId + " AND ");
                            sbSql.Append(" APP_ID=" + transactionDetails.ApplicationId + "");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }


                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }

                    }
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
        #endregion

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

        #region GetTransactionID
        public long GetTransactionID(int appID, long clientTransactionID, string deviceID = "", string downloadDateTime = "")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT TRANSACTION_ID FROM MT_ATPAR_TRANSACTION  ");
                    sbSql.Append("WHERE APP_ID = '" + appID + "' AND ");

                    if (appID == (int)AtParWebEnums.EnumApps.PointOfUse)
                    {
                        sbSql.Append(" REPORT_DATA_13 = '" + clientTransactionID + "' ");
                    }
                    else
                    {
                        sbSql.Append(" ID = '" + clientTransactionID + "' ");
                    }


                    if (deviceID != string.Empty)
                    {
                        sbSql.Append(" AND DEVICE_ID='").Append(deviceID).Append("'");
                    }
                    if (downloadDateTime != string.Empty)
                    {
                        sbSql.Append(" AND START_DT_TIME='").Append(downloadDateTime).Append("'");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var transId = objContext.Database.SqlQuery<long>(sbSql.ToString()).FirstOrDefault();
                    // var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Transaction ID returned is : " + transId); }



                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetCartItemsInfo 
        public List<MT_CRCT_CRITICAL_ITEMS> GetCriticalItems(string bUnit, string cartID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID,ITEM_ID ");
                    sbSql.Append("FROM  MT_CRCT_CRITICAL_ITEMS WHERE BUSINESS_UNIT = '" + bUnit + "'");
                    sbSql.Append(" AND CART_ID = '" + cartID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstCriticalItems = objContext.Database.SqlQuery<MT_CRCT_CRITICAL_ITEMS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCriticalItems); }

                    return lstCriticalItems;

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

        public long Check_CartAllocation(string userID, string bUnit, string cartID, DateTime currentDay)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            int dayOfWeek = (int)DateTime.Now.DayOfWeek;
            dayOfWeek = dayOfWeek == 0 ? 7 : dayOfWeek;
            DateTime startOfWeek = DateTime.Now.AddDays(1 - (int)DateTime.Now.DayOfWeek);
            var intDayValue = DateTime.Now.DayOfWeek - startOfWeek.DayOfWeek;


            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT  A.CART_ID FROM MT_CRCT_USER_ALLOCATION A, MT_CRCT_USER_SCHEDULE B  ");
                    sbSql.Append("WHERE A.BUSINESS_UNIT = B.BUSINESS_UNIT AND A.CART_ID = B.CART_ID  ");
                    sbSql.Append("AND A.USER_ID = B.USER_ID AND A.USER_ID='" + userID + "' AND  ");
                    sbSql.Append("B.DAY = " + intDayValue + 1 + " AND A.CART_ID = '" + cartID + "' ");
                    sbSql.Append("AND A.BUSINESS_UNIT = '" + bUnit + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + count); }

                    if (count > 0)
                    {
                        return AtparStatusCodes.CRCT_S_NOACCESSTOCART;
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region Release Orders

        public long UpdateTransactionStatus(int appID, string userID, string transID = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_TRANSACTION SET STATUS = " + (int)AtParWebEnums.AppTransactionStatus.Unlock + "");
                    sbSql.Append(" WHERE APP_ID = " + appID + " AND TRANSACTION_ID IN ('" + transID + "') ");
                    sbSql.Append(" AND DOWNLOAD_USERID IN ('" + userID + "') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString())); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }

                    return AtparStatusCodes.ATPAR_OK;

                }

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        public Tuple<List<MT_ATPAR_TRANSACTION>, string> GetReleaseOrdersSP(int appID, string userID, string bUnit, string ordNO,
                                                                          string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string severStatusCode = "-1";
            List<MT_ATPAR_TRANSACTION> lsttransactions = null;
            Tuple<List<MT_ATPAR_TRANSACTION>, string> tupleResult = null;
            string sbSql = string.Empty;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[6];

                    sqlparams[0] = new SqlParameter("@pAppId", SqlDbType.NVarChar);
                    sqlparams[0].Value = appID;

                    sqlparams[1] = new SqlParameter("@pOrgGrpId", SqlDbType.NVarChar);
                    sqlparams[1].Value = orgGroupID;

                    sqlparams[2] = new SqlParameter("@pUserID", SqlDbType.NVarChar);
                    sqlparams[2].Value = userID;

                    sqlparams[3] = new SqlParameter("@pBunit", SqlDbType.NVarChar);
                    sqlparams[3].Value = bUnit;

                    sqlparams[4] = new SqlParameter("@pOrdNo", SqlDbType.NVarChar);
                    sqlparams[4].Value = ordNO;

                    sqlparams[5] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlparams[5].Direction = ParameterDirection.Output;

                    sbSql = "exec GetReleaseOrders @pAppId, @pOrgGrpId, @pUserID, @pBunit," +
                                       "@pOrdNo, @StatusCode OUT ";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var fileds = new[] { "APP_ID", "TRANSACTION_ID", "BUSINESS_UNIT", "ID", "DOWNLOAD_DT_TIME", "USERNAME", "UID", "DESCR" };
                    lsttransactions = objContext.Database.DifferedExecuteQuery<MT_ATPAR_TRANSACTION>(fileds, sbSql, sqlparams).ToList();

                    severStatusCode = sqlparams[5].Value.ToString();

                    tupleResult = new Tuple<List<MT_ATPAR_TRANSACTION>, string>(lsttransactions, severStatusCode);

                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned StatusCode " + severStatusCode); }

                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = string.Empty;
            }
        }

        #endregion

        #region GetOrgGroupName
        /// <summary>
        /// Getting Org Group Name
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        public string GetOrgGroupName(string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string orgGrpName = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_GROUP_NAME FROM MT_ATPAR_ORG_GROUPS WHERE ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    orgGrpName = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Org Group Name returned: " + orgGrpName); }

                    return orgGrpName;
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

        #region GetOrgGroupId
        /// <summary>
        /// To get org group Id
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public string GetOrgGroupId(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT ORG_GROUP_ID FROM MT_ATPAR_USER_ORG_GROUPS ");
                    sbSql.Append(" WHERE USER_ID ='" + userID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var orgID = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + orgID); }

                    return orgID;
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

        #region GetBusinessUnits
        /// <summary>
        /// To get business units
        /// </summary>
        /// <param name="orgValue"></param>
        /// <param name="businessUnitType"></param>
        /// <returns></returns>
        public List<string> GetBusinessUnits(string orgID, string orgValue, string businessUnitType)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<string> lstBusinessUnits = new List<string>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    switch ((AtParWebEnums.BusinessType)Enum.Parse(typeof(AtParWebEnums.BusinessType), businessUnitType))
                    {

                        case AtParWebEnums.BusinessType.Inventory:
                            if (orgID == "All")
                            {
                                sbSql.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BU_TYPE= '" + AtParDefns.BU_TYPE_INVENTORY + "'");
                            }
                            else if (!string.IsNullOrEmpty(orgValue))
                            {
                                sbSql.Append(" SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  ");
                                sbSql.Append(" WHERE ORG_GROUP_ID IN (" + orgValue + ")").Append(" AND BU_TYPE= '").Append(AtParDefns.BU_TYPE_INVENTORY).Append("' ");
                            }
                            break;
                        case AtParWebEnums.BusinessType.Purchasing:
                            if (orgID == "All")
                            {
                                sbSql.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BU_TYPE= '" + AtParDefns.BU_TYPE_PURCHASING + "'");
                            }
                            else if (!string.IsNullOrEmpty(orgValue))
                            {
                                sbSql.Append(" SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  ");
                                sbSql.Append(" WHERE ORG_GROUP_ID IN (" + orgValue + ")").Append(" AND BU_TYPE= '").Append(AtParDefns.BU_TYPE_PURCHASING).Append("' ");
                            }
                            break;
                        case AtParWebEnums.BusinessType.AllBunits:
                            if (orgID == "All")
                            {
                                sbSql.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ORDER BY BUSINESS_UNIT ASC");
                            }
                            else if (!string.IsNullOrEmpty(orgValue))
                            {
                                sbSql.Append(" SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  ");
                                sbSql.Append(" WHERE ORG_GROUP_ID IN (" + orgValue + ")");
                            }
                            break;
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    if (sbSql.Length > 0)
                    {
                        lstBusinessUnits = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstBusinessUnits); }

                    return lstBusinessUnits;
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

        #region CheckUser       
        public int CheckUser(string userID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var Count = objContext.MT_ATPAR_USER.Count(c => c.USER_ID == userID);


                    return Count;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        #endregion

        #region GetLdapUsers

        public List<MT_ATPAR_USER> GetLdapUsers(List<MT_ATPAR_USER> lstUsers)
        {
            var count = 0;
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            MT_ATPAR_USER objUser = null;
            List<MT_ATPAR_USER> lstLdapUsers = new List<MT_ATPAR_USER>();
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    foreach (var user in lstUsers)
                    {

                        objUser = new MT_ATPAR_USER();

                        sbSql.Append("SELECT COUNT(USER_ID) FROM MT_ATPAR_USER WHERE USER_ID ='" + user.USER_ID + "'");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        var list = objContext.Database.SqlQuery<int>(sbSql.ToString());
                        if (list != null && list.ToList().Count() > 0)
                        {
                            count = list.ToList()[0];
                        }
                        else
                        {
                            count = 0;
                        }

                        if (count == 0)
                        {
                            if (user.USER_ID == "")
                            {
                                objUser.USER_ID = string.Empty;
                            }
                            else
                            {
                                objUser.USER_ID = user.USER_ID.ToUpper();
                            }
                            objUser.FIRST_NAME = user.FIRST_NAME;
                            objUser.LAST_NAME = user.LAST_NAME;
                            objUser.MIDDLE_INITIAL = user.MIDDLE_INITIAL;
                            objUser.EMAIL_ID = user.EMAIL_ID;
                            objUser.PHONE1 = user.PHONE1;
                            objUser.FAX = user.FAX;
                            objUser.USERDN = user.USERDN;
                            lstLdapUsers.Add(objUser);
                        }
                    }
                    return lstLdapUsers;
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

        #region AddUser       
        public long AddUser(VM_MT_ATPAR_USER_ADD user, string strEnterpriseSystem)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;


            if (string.IsNullOrEmpty(strEnterpriseSystem))
            {
                strEnterpriseSystem = string.Empty;

            }

            if (!string.IsNullOrEmpty(user.PASSWORD))
            {
                strPwd = user.PASSWORD + user.USER_ID;
            }
            else
            {
                strPwd = AtParDefns.DEFAULT_EMPTY_PASSWORD + user.USER_ID;
            }

            strHashVal = CSHA256.ComputeHash(strPwd);

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter pMode = new SqlParameter("@pMode", System.Data.SqlDbType.NVarChar);
                    pMode.Value = Convert.ToInt32(AtParWebEnums.AddEdit_Enum.ADD);

                    SqlParameter pUserID = new SqlParameter("@pUserID", System.Data.SqlDbType.NVarChar);
                    pUserID.Value = user.USER_ID;

                    SqlParameter pPasswordRequired = new SqlParameter("@pPasswordRequired", System.Data.SqlDbType.Bit);
                    pPasswordRequired.Value = user.PASSHASH_REQUIRED;

                    SqlParameter pPassword = new SqlParameter("@pPassword", System.Data.SqlDbType.NVarChar);
                    pPassword.Value = strHashVal;

                    SqlParameter pTokenExpPeriod = new SqlParameter("@pTokenExpPeriod", System.Data.SqlDbType.Int);
                    pTokenExpPeriod.Value = user.TOKEN_EXPIRY_PERIOD;

                    SqlParameter pIdleTime = new SqlParameter("@pIdleTime", System.Data.SqlDbType.Int);
                    pIdleTime.Value = user.IDLE_TIME;

                    SqlParameter pFirstName = new SqlParameter("@pFirstName", System.Data.SqlDbType.NVarChar);
                    pFirstName.Value = user.FIRST_NAME;

                    SqlParameter pLastName = new SqlParameter("@pLastName", System.Data.SqlDbType.NVarChar);
                    pLastName.Value = user.LAST_NAME;

                    SqlParameter pMiddleInitial = new SqlParameter("@pMiddleInitial", System.Data.SqlDbType.NVarChar);
                    pMiddleInitial.Value = user.MIDDLE_INITIAL;

                    SqlParameter pEmailID = new SqlParameter("@pEmailID", System.Data.SqlDbType.NVarChar);
                    pEmailID.Value = user.EMAIL_ID;

                    SqlParameter pPhone1 = new SqlParameter("@pPhone1", System.Data.SqlDbType.NVarChar);
                    pPhone1.Value = user.PHONE1;

                    SqlParameter pPhone2 = new SqlParameter("@pPhone2", System.Data.SqlDbType.NVarChar);
                    pPhone2.Value = user.PHONE2;

                    SqlParameter pFax = new SqlParameter("@pFax", System.Data.SqlDbType.NVarChar);
                    pFax.Value = user.FAX;

                    SqlParameter pPager = new SqlParameter("@pPager", System.Data.SqlDbType.NVarChar);
                    pPager.Value = user.PAGER;

                    SqlParameter pOrgGroup = new SqlParameter("@pOrgGroup", System.Data.SqlDbType.NVarChar);
                    pOrgGroup.Value = user.ORG_GROUP_ID;

                    SqlParameter pProfile = new SqlParameter("@pProfile", System.Data.SqlDbType.NVarChar);
                    pProfile.Value = user.PROFILE_ID;

                    SqlParameter pLdapUser = new SqlParameter("@pLdapUser", System.Data.SqlDbType.NVarChar);
                    pLdapUser.Value = user.LDAP_USER;

                    SqlParameter pLdapRole = new SqlParameter("@pLdapRole", System.Data.SqlDbType.NVarChar);
                    pLdapRole.Value = user.LDAP_ROLE;

                    SqlParameter pLdapOrg = new SqlParameter("@pLdapOrg", System.Data.SqlDbType.NVarChar);
                    pLdapOrg.Value = user.LDAP_ORG;

                    SqlParameter pTimeRestrictions = new SqlParameter("@pTimeRestrictions", System.Data.SqlDbType.NVarChar);
                    pTimeRestrictions.Value = user.TIME_RESTRICTIONS;

                    SqlParameter pPwdResetReq = new SqlParameter("@pPwdResetReq", System.Data.SqlDbType.NVarChar);
                    pPwdResetReq.Value = user.PASSWD_RESET_REQUIRED;

                    SqlParameter pLastUpdateUser = new SqlParameter("@pLastUpdateUser", System.Data.SqlDbType.NVarChar);
                    pLastUpdateUser.Value = user.LAST_UPDATE_USER;

                    SqlParameter pAccountDisabled = new SqlParameter("@pAccountDisabled", System.Data.SqlDbType.Bit);
                    pAccountDisabled.Value = user.ACCOUNT_DISABLED;

                    SqlParameter pUserDN = new SqlParameter("@pUserDN", System.Data.SqlDbType.NVarChar);
                    pUserDN.Value = user.USERDN;

                    SqlParameter pEnterpriseSystem = new SqlParameter("@pEnterpriseSystem", System.Data.SqlDbType.NVarChar);
                    pEnterpriseSystem.Value = strEnterpriseSystem;

                    SqlParameter pStatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                    pStatusCode.Direction = System.Data.ParameterDirection.Output;

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var count = objContext.Database.ExecuteSqlCommand("exec SP_CreateUpdateUser @pMode," + "@pUserID,@pPasswordRequired,@pPassword," +
                           "@pTokenExpPeriod,@pIdleTime," +
                          "@pFirstName,@pLastName,@pMiddleInitial,@pEmailID,@pPhone1,@pPhone2," +
                          "@pFax,@pPager,@pOrgGroup,@pProfile,@pLdapUser,@pLdapRole,@pLdapOrg," +
                          "@pTimeRestrictions,@pPwdResetReq,@pLastUpdateUser,@pAccountDisabled," +
                          "@pUserDN,@pEnterpriseSystem,@StatusCode OUT",
                          pMode, pUserID, pPasswordRequired, pPassword, pTokenExpPeriod, pIdleTime, pFirstName, pLastName,
                          pMiddleInitial, pEmailID, pPhone1, pPhone2, pFax, pPager, pOrgGroup, pProfile, pLdapUser, pLdapRole,
                          pLdapOrg, pTimeRestrictions, pPwdResetReq, pLastUpdateUser, pAccountDisabled, pUserDN, pEnterpriseSystem,
                          pStatusCode);
                    statusCode = long.Parse(pStatusCode.Value.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }


                }
                return statusCode;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }


        }

        #endregion

        #region GetProfileInfo
        public List<MT_ATPAR_APP> GetProfile(string profileId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_APP> lstProfileApp = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.APP_ID, A.APP_NAME, B.CLIENT_USER, B.SERVER_USER FROM MT_ATPAR_APP A LEFT OUTER JOIN MT_ATPAR_PROFILE_APP_ACL B ON A.APP_ID = B.APP_ID AND B.PROFILE_ID = '").Append(profileId).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "APP_ID", "APP_NAME", "CLIENT_USER", "SERVER_USER" };

                    lstProfileApp = objContext.Database.DifferedExecuteQuery<MT_ATPAR_APP>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + lstProfileApp.Count()); }

                    return lstProfileApp;
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

        public List<VM_MT_ATPAR_PROFILE_APP_MENUS> GetProfileAppMenus(string profileId, string enterpriseSystem)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramProfileId = new SqlParameter("@profileId", profileId);
                    SqlParameter paramEnterpriseSystem = new SqlParameter("@enterpriseSystem", enterpriseSystem);

                    object[] parameters = { paramProfileId, paramEnterpriseSystem };

                    sbSql = "EXEC sp_GetProfileAppMenus @profileId,@enterpriseSystem";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var lstAppMenus = objContext.Database.SqlQuery<VM_MT_ATPAR_PROFILE_APP_MENUS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of profile app menus Returned: " + lstAppMenus.Count()); }

                    return lstAppMenus;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        public List<VM_MT_ATPAR_PROFILE_APP_PARAMETERS> GetProfileAppParameters(string profileId, string enterpriseSystem)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramProfileId = new SqlParameter("@profileId", profileId);
                    SqlParameter paramEnterpriseSystem = new SqlParameter("@enterpriseSystem", enterpriseSystem);

                    object[] parameters = { paramProfileId, paramEnterpriseSystem };

                    sbSql = "EXEC sp_GetProfileAppParameters @profileId,@enterpriseSystem";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var lstAppParameters = objContext.Database.SqlQuery<VM_MT_ATPAR_PROFILE_APP_PARAMETERS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of app parameters Returned: " + lstAppParameters.Count()); }

                    return lstAppParameters;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        public List<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY> GetProfileScreenDisplay(string profileId, string enterpriseSystem)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramProfileId = new SqlParameter("@profileId", profileId);
                    SqlParameter paramEnterpriseSystem = new SqlParameter("@enterpriseSystem", enterpriseSystem);

                    object[] parameters = { paramProfileId, paramEnterpriseSystem };

                    sbSql = "EXEC sp_GetProfileScreenDisplay @profileId,@enterpriseSystem";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var lstProfileScreenDisplay = objContext.Database.SqlQuery<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of app parameters Returned: " + lstProfileScreenDisplay.Count()); }

                    return lstProfileScreenDisplay;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #region SP_GetCounts
        /// <summary>
        /// Getting Client User Count
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public int GetClientUserCount(string profileId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(CLIENT_USER)AS COUNTS FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='").Append(profileId).Append("' AND CLIENT_USER='Y'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

                    return count;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Getting Server User Count
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public int GetServerUserCount(string profileId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(SERVER_USER)AS COUNTS FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='").Append(profileId).Append("' AND SERVER_USER='Y'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

                    return count;
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
        /// Getting Profile ID Count
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public int GetProfileIdCount(string profileId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(PROFILE_ID)AS COUNTS FROM MT_ATPAR_USER WHERE PROFILE_ID='").Append(profileId).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

                    return count;
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

        #endregion

        public List<MT_ATPAR_ORG_GROUP_BUNITS> GetBusinessUnits(string orgGroupID = "", string inventoryType = "")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_ORG_GROUP_BUNITS> lstBUnits = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");

                    if (!(orgGroupID == string.Empty & inventoryType == string.Empty))
                    {
                        sbSql.Append(" WHERE ");
                        if (orgGroupID != "All")
                        {
                            sbSql.Append(" ORG_GROUP_ID='").Append(orgGroupID).Append("'").Append(" AND ");
                        }
                        sbSql.Append("  BU_TYPE='").Append(inventoryType).Append("'");
                    }
                    else if (!(orgGroupID == string.Empty))
                    {
                        if (orgGroupID != "All")
                        {
                            sbSql.Append(" WHERE ORG_GROUP_ID='").Append(orgGroupID);
                        }
                    }
                    else if (!(inventoryType == string.Empty))
                    {
                        sbSql.Append("' WHERE BU_TYPE='").Append(inventoryType).Append("'");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "BUSINESS_UNIT" };

                    lstBUnits = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUP_BUNITS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of bunits returned: " + lstBUnits.Count()); }

                    return lstBUnits;
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



        #region GetLocByOrgId
        public List<PAR_MNGT_PAR_LOC_HEADER> GetLocByOrgId(string orgID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PAR_LOC_ID,LOCATION_NAME,POU_CART FROM PAR_MNGT_PAR_LOC_HEADER ");

                    if (!string.IsNullOrEmpty(orgID))
                    {
                        sbSql.Append("WHERE ORG_ID='" + orgID + "'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "PAR_LOC_ID", "LOCATION_NAME", "POU_CART" };
                    var lstLocations = objContext.Database.DifferedExecuteQuery<PAR_MNGT_PAR_LOC_HEADER>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstLocations.Count); }

                    return lstLocations;

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

        #region GetOrgIds
        public List<string> GetOrgIds(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strSQL = string.Empty;

            List<string> data = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramUserId = new SqlParameter("@userid", SqlDbType.NVarChar, 30);
                    paramUserId.Value = userID;

                    strSQL = "EXEC GetOrgIds @userid";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + strSQL.ToString() + ":")); }
                    }

                    data = objContext.Database.SqlQuery<string>(strSQL, paramUserId).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Org IDs Returned: " + data.Count()); }
                    return data;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + strSQL.ToString()); }
                throw ex;
            }
            finally
            {
                strSQL = string.Empty;
            }
        }

        public List<MT_POU_DEPT> GetDepartment(string departmentID, string deptDescr, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramDepartmentID = new SqlParameter("@DepartmentID", departmentID);
                    SqlParameter paramDescription = new SqlParameter("@Description", deptDescr);
                    SqlParameter paramOrgGroupID = new SqlParameter("@OrgGroupID", orgGrpID);


                    object[] parameters = { paramDepartmentID, paramDescription, paramOrgGroupID };

                    sbSql = "EXEC GetDepartment @DepartmentID,@Description,@OrgGroupID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }
                    var fields = new[] { "ORG_GROUP_ID", "DEPT_ID", "DEPT_NAME" };

                    var lstDepartment = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT>(fields, sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of app parameters Returned: " + lstDepartment.Count()); }

                    return lstDepartment;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion   

        #region GetCartWorkstations

        public List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetWorkstations(string departmentID, string cartID, string orgGrpID, int appID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramDepartmentID = new SqlParameter("@DepartmentId", departmentID);
                    SqlParameter paramCartId = new SqlParameter("@CartId", cartID);
                    SqlParameter paramOrgGrpID = new SqlParameter("@OrgGrpId", orgGrpID);
                    SqlParameter paramAppID = new SqlParameter("@AppID", appID);

                    object[] parameters = { paramDepartmentID, paramCartId, paramOrgGrpID, paramAppID };

                    sbSql = "EXEC GetWorkstations @DepartmentId,@CartId,@OrgGrpId,@AppID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var lstDeptCartWrkAlloc = objContext.Database.SqlQuery<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of app parameters Returned: " + lstDeptCartWrkAlloc.Count()); }

                    return lstDeptCartWrkAlloc;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }



        public List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetAllocatedCartWorkstations(string departmentID, string cartID, string orgGrpID, int appID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramDepartmentID = new SqlParameter("@DepartmentId", departmentID);
                    SqlParameter paramCartId = new SqlParameter("@CartId", cartID);
                    SqlParameter paramOrgGrpID = new SqlParameter("@OrgGrpId", orgGrpID);
                    SqlParameter paramAppID = new SqlParameter("@AppID", appID);

                    object[] parameters = { paramDepartmentID, paramCartId, paramOrgGrpID, paramAppID };

                    sbSql = "EXEC GetAllocatedCartWorkstations @DepartmentId,@CartId,@OrgGrpId,@AppID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var lstDeptWrkStations = objContext.Database.SqlQuery<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of app parameters Returned: " + lstDeptWrkStations.Count()); }

                    return lstDeptWrkStations;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }


        #endregion

        #region GetTransactionStatus
        public long GetTransactionStatus(SortedList<string, string> transactions, int appID, string deviceID = "", string downloadDateTime = "")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_TRANSACTION> lstTransaction = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (appID.ToString().Length == 0 || transactions.Count == 0)
                    {
                        if (_log.IsWarnEnabled)
                        {
                            _log.Warn((methodBaseName + ("(ApplicationId:" + (appID +
                                                        (",pTransactions.Count:" + (transactions.Count + ") E_INVALIDPARAMETER "))))));
                        }

                        return AtparStatusCodes.E_INVALIDPARAMETER;
                    }

                    sbSql.Append("SELECT ");

                    int transCount = transactions.Count;

                    if (transCount == 1)
                    {
                        sbSql.Append("STATUS ");
                    }
                    else if (transCount > 1)
                    {
                        sbSql.Append("TRANSACTION_ID,STATUS ");
                    }

                    sbSql.Append("FROM MT_ATPAR_TRANSACTION WHERE APP_ID = " + appID + " AND ");

                    if (transCount == 1)
                    {
                        if (transactions.Keys[0].Length == 0 || appID.ToString().Length == 0)
                        {

                            if (_log.IsWarnEnabled)
                            {
                                _log.Warn((methodBaseName + (" E_INVALIDPARAMETER ")));
                            }

                            return AtparStatusCodes.E_INVALIDPARAMETER;
                        }

                        if (appID == (int)AtParWebEnums.EnumApps.StockIssue)
                        {
                            sbSql.Append(" ( TRANSACTION_ID =").Append(transactions.Keys[0]).Append(" OR ID = '"); sbSql.Append(transactions.Keys[0]).Append("')");

                            if (deviceID != string.Empty)
                            {
                                sbSql.Append(" AND DEVICE_ID='").Append(deviceID).Append("'");
                            }
                            if (downloadDateTime != string.Empty)
                            {
                                sbSql.Append(" AND START_DT_TIME='").Append(downloadDateTime).Append("'");
                            }

                        }
                        else
                        {
                            sbSql.Append(" TRANSACTION_ID = '" + transactions.Keys[0] + "' ");
                        }


                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }

                        var trans = objContext.Database.SqlQuery<short>(sbSql.ToString()).ToList().FirstOrDefault();

                        transactions[transactions.Keys[0]] = trans.ToString();
                    }
                    else if (transCount > 1)
                    {
                        string[] transList = new string[transCount];

                        for (int i = 0; i <= (transCount - 1); i++)
                        {
                            transList[i] = ("\'" + (transactions.Keys[i] + "\'"));
                        }

                        string _transListStr = string.Join(",", transList, 0, transCount);

                        sbSql.Append((" TRANSACTION_ID IN (" + (_transListStr + ")")));


                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        var fields = new[] { "STATUS", "TRANSACTION_ID" };

                        lstTransaction = objContext.Database.DifferedExecuteQuery<MT_ATPAR_TRANSACTION>(fields, sbSql.ToString()).ToList();

                        if (lstTransaction != null)
                        {
                            foreach (var item in lstTransaction)
                            {
                                transactions[item.TRANSACTION_ID.ToString()] = item.STATUS.ToString();
                            }

                        }



                    }
                    //  print out the values we received for debugging
                    if (_log.IsInfoEnabled)
                    {

                        sbSql.Append((" Got the following Parameter Values : " + "\r\n"));
                        foreach (KeyValuePair<string, string> i in transactions)
                        {
                            sbSql.Append(("TransactionID : "
                                            + (i.Key + "Status :" + (i.Value + "\r\n"))));
                        }

                        _log.Info(sbSql.ToString());
                    }
                }
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} {4}:", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }

                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetNiceLabelsPrintersData
        public Tuple<List<MT_ATPAR_SETUP_PRO_PRINTERES>, long> GetNiceLabelsPrintersData(int appID, string status, string printerType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long severStatusCode = -1;
            List<MT_ATPAR_SETUP_PRO_PRINTERES> lstSetUpPrinters = null;
            Tuple<List<MT_ATPAR_SETUP_PRO_PRINTERES>, long> tupleResult = null;
            string sbSql = string.Empty;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[4];

                    sqlparams[0] = new SqlParameter("@App_ID", SqlDbType.NVarChar);
                    sqlparams[0].Value = appID;

                    sqlparams[1] = new SqlParameter("@Status", SqlDbType.NVarChar);
                    sqlparams[1].Value = status;

                    sqlparams[2] = new SqlParameter("@PrinterType", SqlDbType.NVarChar);
                    sqlparams[2].Value = printerType;

                    sqlparams[3] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlparams[3].Direction = ParameterDirection.Output;

                    sbSql = "exec GetNiceLabelsPrintersData @App_ID, @Status, @PrinterType,  @StatusCode OUT ";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var fileds = new[] { "APP_ID", "FRIENDLY_NAME", "IP_ADDRESS", "LABEL_FILE_NAME", "LABEL_TYPE", "MODEL", "PRINTER_CODE", "NETWORK_TYPE", "PORT_NO", "STATUS", "LABEL_DESCRIPTION" };

                    lstSetUpPrinters = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SETUP_PRO_PRINTERES>(fileds, sbSql, sqlparams).ToList();

                    severStatusCode = Convert.ToInt64(sqlparams[3].Value);

                    tupleResult = new Tuple<List<MT_ATPAR_SETUP_PRO_PRINTERES>, long>(lstSetUpPrinters, severStatusCode);

                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned StatusCode " + severStatusCode); }

                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = string.Empty;
            }
        }
        #endregion

        #region GetIDCount
        public int GetReceiveIDCount(string businessUnit, string iutID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(ID) FROM  MT_ATPAR_TRANSACTION WHERE ");
                    sbSql.Append("BUSINESS_UNIT ='").Append(businessUnit).Append("' ");
                    sbSql.Append(" AND APP_ID = ").Append((int)AtParWebEnums.EnumApps.Receiving).Append(" AND ID like '%").Append(iutID).Append("'");
                    sbSql.Append(" AND STATUS = ").Append(AtParDefns.statDownloaded).Append(" AND USER_ID != '").Append(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString()).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var cnt = objContext.Database.SqlQuery<int>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + cnt); }


                    if (cnt != null)
                    {
                        result = cnt[0];
                    }
                    return result;
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

        public int GetPutawayIDCount(string businessUnit, string iutID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(ID) FROM  MT_ATPAR_TRANSACTION WHERE ");
                    sbSql.Append("BUSINESS_UNIT ='").Append(businessUnit).Append("' ");
                    sbSql.Append("AND APP_ID = ").Append((int)AtParWebEnums.EnumApps.PutAway).Append(" AND ID like '%").Append(iutID).Append("'");
                    sbSql.Append("AND STATUS = ").Append(AtParDefns.statDownloaded).Append(" AND USER_ID != '").Append(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString()).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var cnt = objContext.Database.SqlQuery<int>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + cnt); }


                    if (cnt != null)
                    {
                        result = cnt[0];
                    }
                    return result;
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

        #region GetUserDepartments
        public List<VM_MT_POU_USER_DEPARTMENTS> GetUserDepartments(string userID, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramUserID = new SqlParameter("@UserId", userID);
                    SqlParameter paramOrgGrpID = new SqlParameter("@OrgGrpId", orgGrpID);


                    object[] parameters = { paramUserID, paramOrgGrpID };

                    sbSql = "exec GetUserDepartments  @UserId, @OrgGrpId";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    List<VM_MT_POU_USER_DEPARTMENTS> lstUserDepartments = objContext.Database.SqlQuery<VM_MT_POU_USER_DEPARTMENTS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of records Selected: " + lstUserDepartments.Count); }

                    return lstUserDepartments;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion



        #region GetPhysiciansByPrefOrProc
        /// <summary>
        /// Used to get the PhysiciansByPrefOrProc Report Data
        /// </summary>
        /// <param name="flag"></param>
        /// <returns></returns>
        public List<VM_POU_PHYSICIANS_BY_PREF_OR_PROC> GetPhysiciansByPrefOrProc(int flag)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            List<VM_POU_PHYSICIANS_BY_PREF_OR_PROC> lstPhysiciansbypreforproc = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                    SqlParameter parampflag = new SqlParameter("@FLAG", flag);

                    object[] parameters = { parampflag };

                    SqlStr = "EXEC GETPHYSICIANSBYPREFORPROC @FLAG";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    lstPhysiciansbypreforproc = objContext.Database.SqlQuery<VM_POU_PHYSICIANS_BY_PREF_OR_PROC>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of PhysiciansByPrefOrProc Data Returned: {1} ", methodBaseName, (lstPhysiciansbypreforproc != null ? lstPhysiciansbypreforproc.Count() : 0))); }

                    return lstPhysiciansbypreforproc;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                throw ex;
            }
            finally
            {
                SqlStr = string.Empty;
            }
        }
        #endregion

        #region InsertDetailTransaction
        public long InsertDetailTransaction(AtPar_Detail_Transaction_Entity transactionDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            StringBuilder sbSqlValues = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                            if ((transactionDetails.Transaction_Id == 0) || (transactionDetails.ApplicationId == 0) || (transactionDetails.UserId == string.Empty) || (transactionDetails.DeviceId == string.Empty))
                            {
                                return AtparStatusCodes.E_INVALIDPARAMETER;
                            }


                            sbSql.Append("INSERT INTO MT_ATPAR_DETAIL_TRANSACTION (TRANSACTION_ID, APP_ID,  ");
                            sbSql.Append("USER_ID,DOWNLOAD_USER_ID, DEVICE_ID, UPDATE_DATE ");

                            sbSqlValues.Append(" )VALUES (").Append(transactionDetails.Transaction_Id).Append(",").Append(transactionDetails.ApplicationId).Append(",");
                            sbSqlValues.Append("'").Append(transactionDetails.UserId).Append("','").Append(transactionDetails.UserId).Append("',");
                            sbSqlValues.Append("'").Append(transactionDetails.DeviceId).Append("','").Append(DateTime.Now.ToString()).Append("'");

                            if (transactionDetails.Key1 != null)
                            {
                                sbSql.Append(", KEY_1 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.Key1).Append("'");
                            }

                            if (transactionDetails.Key2 != null)
                            {
                                sbSql.Append(", KEY_2 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.Key2).Append("'");
                            }


                            if (transactionDetails.Key3 != null)
                            {
                                sbSql.Append(", KEY_3 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.Key3).Append("'");
                            }

                            if (transactionDetails.Key4 != null)
                            {
                                sbSql.Append(", KEY_4 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.Key4).Append("'");
                            }

                            if (transactionDetails.Key5 != null)
                            {
                                sbSql.Append(", KEY_5 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.Key5).Append("'");
                            }

                            if (transactionDetails.Key6 != null)
                            {
                                sbSql.Append(", KEY_6 ");
                                sbSqlValues.Append(",").Append(transactionDetails.Key6);
                            }

                            if (transactionDetails.Key7 != null)
                            {
                                sbSql.Append(", KEY_7 ");
                                sbSqlValues.Append(",").Append(transactionDetails.Key7);
                            }

                            if (transactionDetails.Key8 != null)
                            {
                                sbSql.Append(", KEY_8 ");
                                sbSqlValues.Append(",").Append(transactionDetails.Key8);
                            }


                            if (transactionDetails.Status != null)
                            {
                                sbSql.Append(", STATUS ");
                                sbSqlValues.Append(",'").Append(transactionDetails.Status).Append("'");
                            }

                            if (transactionDetails.ReportData1 != null)
                            {
                                sbSql.Append(", REPORT_DATA_1 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData1).Append("'");
                            }

                            if (transactionDetails.ReportData2 != null)
                            {
                                sbSql.Append(", REPORT_DATA_2 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData2).Append("'");
                            }

                            if (transactionDetails.ReportData3 != null)
                            {
                                sbSql.Append(", REPORT_DATA_3 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData3).Append("'");
                            }


                            if (transactionDetails.ReportData4 != null)
                            {
                                sbSql.Append(", REPORT_DATA_4 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData4.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData5 != null)
                            {
                                sbSql.Append(", REPORT_DATA_5 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData5.Replace("'", "''")).Append("'");
                            }


                            if (transactionDetails.ReportData5 != null)
                            {
                                sbSql.Append(", REPORT_DATA_40 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData5.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData6 != null)
                            {
                                sbSql.Append(", REPORT_DATA_6 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData6.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData7 != null)
                            {
                                sbSql.Append(", REPORT_DATA_7 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData7.Replace("'", "''")).Append("'");
                            }


                            if (transactionDetails.ReportData8 != null)
                            {
                                sbSql.Append(", REPORT_DATA_8 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData8.Replace("'", "''")).Append("'");
                            }


                            if (transactionDetails.ReportData9 != null)
                            {
                                sbSql.Append(", REPORT_DATA_9 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData9.Replace("'", "''")).Append("'");
                            }


                            if (transactionDetails.ReportData10 != null)
                            {
                                sbSql.Append(", REPORT_DATA_10 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData10.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData11 != null)
                            {
                                sbSql.Append(", REPORT_DATA_11 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData11.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData12 != null)
                            {
                                if (transactionDetails.ReportData12 != DateTime.MinValue)
                                {
                                    sbSql.Append(", REPORT_DATA_12 ");
                                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData12.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                                }

                            }

                            if (transactionDetails.ReportData13 != null)
                            {
                                if (transactionDetails.ReportData13 != DateTime.MinValue)
                                {
                                    sbSql.Append(", REPORT_DATA_13 ");
                                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData13.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                                }

                            }

                            if (transactionDetails.ReportData14 != null)
                            {
                                sbSql.Append(", REPORT_DATA_14 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData14.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData16 != null)
                            {
                                sbSql.Append(", REPORT_DATA_16 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData16.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData17 != null)
                            {
                                sbSql.Append(", REPORT_DATA_17 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData17).Append("'");
                            }

                            if (transactionDetails.NonPoItem != null)
                            {
                                sbSql.Append(", NON_PO_ITEM ");
                                sbSqlValues.Append(",'").Append(transactionDetails.NonPoItem).Append("'");
                            }

                            if (transactionDetails.ReportData15 != null)
                            {
                                sbSql.Append(", REPORT_DATA_15 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData15).Append("'");
                            }

                            if (transactionDetails.ReportData18 != null)
                            {
                                if (transactionDetails.ReportData18 != DateTime.MinValue)
                                {
                                    sbSql.Append(", REPORT_DATA_18 ");
                                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData18.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                                }

                            }

                            if (transactionDetails.ReportData19 != null)
                            {
                                sbSql.Append(", REPORT_DATA_19 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData19.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData20 != null)
                            {
                                sbSql.Append(", REPORT_DATA_20 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData20.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData21 != null)
                            {
                                sbSql.Append(", REPORT_DATA_21 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData21.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData22 != null)
                            {
                                sbSql.Append(", REPORT_DATA_22 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData22.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData23 != null)
                            {
                                sbSql.Append(", REPORT_DATA_23 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData23.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData24 != null)
                            {
                                sbSql.Append(", REPORT_DATA_24 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData24.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData25 != null)
                            {
                                sbSql.Append(", REPORT_DATA_25 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData25.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData26 != null)
                            {
                                sbSql.Append(", REPORT_DATA_26 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData26.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData27 != null)
                            {
                                sbSql.Append(", REPORT_DATA_27 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData27.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData28 != null)
                            {
                                sbSql.Append(", REPORT_DATA_28 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData28.Replace("'", "''")).Append("'");
                            }


                            if (transactionDetails.ReportData29 != null)
                            {
                                sbSql.Append(", REPORT_DATA_29 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData29.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.SignatureId != null)
                            {
                                sbSql.Append(", SIGNATURE_ID ");
                                sbSqlValues.Append(",'").Append(transactionDetails.SignatureId).Append("'");
                            }

                            if (transactionDetails.ReportData30 != null)
                            {
                                if (transactionDetails.ReportData30 != DateTime.MinValue)
                                {
                                    sbSql.Append(", REPORT_DATA_30 ");
                                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData30.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                                }

                            }


                            if (transactionDetails.ReportData31 != null)
                            {
                                sbSql.Append(", REPORT_DATA_31 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData31.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData32 != null)
                            {
                                sbSql.Append(", REPORT_DATA_32 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData32.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData33 != null)
                            {
                                sbSql.Append(", REPORT_DATA_33 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData33.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData34 != null)
                            {
                                sbSql.Append(", REPORT_DATA_34 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData34.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData35 != null)
                            {
                                sbSql.Append(", REPORT_DATA_35 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData35.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.StartDateTime != null)
                            {
                                if (transactionDetails.StartDateTime != DateTime.MinValue)
                                {
                                    sbSql.Append(", START_DT_TIME ");
                                    sbSqlValues.Append(",'").Append(transactionDetails.StartDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                                }

                            }

                            if (transactionDetails.EndDateTime != null)
                            {
                                if (transactionDetails.EndDateTime != DateTime.MinValue)
                                {
                                    sbSql.Append(", END_DT_TIME ");
                                    sbSqlValues.Append(",'").Append(transactionDetails.EndDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                                }

                            }

                            if (transactionDetails.ReportData36 != null)
                            {
                                sbSql.Append(", REPORT_DATA_36 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData36.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData37 != null)
                            {
                                sbSql.Append(", REPORT_DATA_37 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData37.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData38 != null)
                            {
                                sbSql.Append(", REPORT_DATA_38 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData38.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData42 != null)
                            {
                                sbSql.Append(", REPORT_DATA_42 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData42.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData43 != null)
                            {
                                sbSql.Append(", REPORT_DATA_43 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData43.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData44 != null)
                            {
                                sbSql.Append(", REPORT_DATA_44 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData44.Replace("'", "''")).Append("'");
                            }
                            if (transactionDetails.ReportData47 != null)
                            {
                                sbSql.Append(", REPORT_DATA_47 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData47.Replace("'", "''")).Append("'");
                            }

                            if (transactionDetails.ReportData46 != null)
                            {
                                sbSql.Append(", REPORT_DATA_46 ");
                                sbSqlValues.Append(",'").Append(transactionDetails.ReportData46.Replace("'", "''")).Append("')");
                            }
                            else
                            {
                                sbSqlValues.Append(")");
                            }

                            sbSql.Append(sbSqlValues.ToString());
                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                        }

                    }
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
                sbSqlValues = null;
            }
        }

        //public long InsertDetailTransaction(AtPar_Detail_Transaction_Entity transactionDetails, ATPAR_MT_Context objContext)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    StringBuilder sbSql = new StringBuilder();
        //    StringBuilder sbSqlValues = new StringBuilder();

        //    try
        //    {
        //        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


        //        if ((transactionDetails.Transaction_Id == 0) || (transactionDetails.ApplicationId == 0) || (transactionDetails.UserId == string.Empty) || (transactionDetails.DeviceId == string.Empty))
        //        {
        //            return AtparStatusCodes.E_INVALIDPARAMETER;
        //        }


        //        sbSql.Append("INSERT INTO MT_ATPAR_DETAIL_TRANSACTION (TRANSACTION_ID, APP_ID,  ");
        //        sbSql.Append("USER_ID,DOWNLOAD_USER_ID, DEVICE_ID, UPDATE_DATE ");

        //        sbSqlValues.Append(" )VALUES (").Append(transactionDetails.Transaction_Id).Append(",").Append(transactionDetails.ApplicationId).Append(",");
        //        sbSqlValues.Append("'").Append(transactionDetails.UserId).Append("','").Append(transactionDetails.UserId).Append("',");
        //        sbSqlValues.Append("'").Append(transactionDetails.DeviceId).Append("','").Append(DateTime.Now.ToString()).Append("'");

        //        if (transactionDetails.Key1 != null)
        //        {
        //            sbSql.Append(", KEY_1 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.Key1).Append("'");
        //        }

        //        if (transactionDetails.Key2 != null)
        //        {
        //            sbSql.Append(", KEY_2 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.Key2).Append("'");
        //        }


        //        if (transactionDetails.Key3 != null)
        //        {
        //            sbSql.Append(", KEY_3 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.Key3).Append("'");
        //        }

        //        if (transactionDetails.Key4 != null)
        //        {
        //            sbSql.Append(", KEY_4 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.Key4).Append("'");
        //        }

        //        if (transactionDetails.Key5 != null)
        //        {
        //            sbSql.Append(", KEY_5 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.Key5).Append("'");
        //        }

        //        if (transactionDetails.Key6 != null)
        //        {
        //            sbSql.Append(", KEY_6 ");
        //            sbSqlValues.Append(",").Append(transactionDetails.Key6);
        //        }

        //        if (transactionDetails.Key7 != null)
        //        {
        //            sbSql.Append(", KEY_7 ");
        //            sbSqlValues.Append(",").Append(transactionDetails.Key7);
        //        }

        //        if (transactionDetails.Key8 != null)
        //        {
        //            sbSql.Append(", KEY_8 ");
        //            sbSqlValues.Append(",").Append(transactionDetails.Key8);
        //        }


        //        if (transactionDetails.Status != null)
        //        {
        //            sbSql.Append(", STATUS ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.Status).Append("'");
        //        }

        //        if (transactionDetails.ReportData1 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_1 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData1).Append("'");
        //        }

        //        if (transactionDetails.ReportData2 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_2 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData2).Append("'");
        //        }

        //        if (transactionDetails.ReportData3 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_3 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData3).Append("'");
        //        }


        //        if (transactionDetails.ReportData4 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_4 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData4.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData5 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_5 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData5.Replace("'", "''")).Append("'");
        //        }


        //        if (transactionDetails.ReportData5 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_40 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData5.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData6 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_6 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData6.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData7 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_7 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData7.Replace("'", "''")).Append("'");
        //        }


        //        if (transactionDetails.ReportData8 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_8 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData8.Replace("'", "''")).Append("'");
        //        }


        //        if (transactionDetails.ReportData9 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_9 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData9.Replace("'", "''")).Append("'");
        //        }


        //        if (transactionDetails.ReportData10 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_10 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData10.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData11 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_11 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData11.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData12 != null)
        //        {
        //            if (transactionDetails.ReportData12 != DateTime.MinValue)
        //            {
        //                sbSql.Append(", REPORT_DATA_12 ");
        //                sbSqlValues.Append(",'").Append(transactionDetails.ReportData12.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
        //            }

        //        }

        //        if (transactionDetails.ReportData13 != null)
        //        {
        //            if (transactionDetails.ReportData13 != DateTime.MinValue)
        //            {
        //                sbSql.Append(", REPORT_DATA_13 ");
        //                sbSqlValues.Append(",'").Append(transactionDetails.ReportData13.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
        //            }

        //        }

        //        if (transactionDetails.ReportData14 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_14 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData14.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData16 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_16 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData16.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData17 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_17 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData17).Append("'");
        //        }

        //        if (transactionDetails.NonPoItem != null)
        //        {
        //            sbSql.Append(", NON_PO_ITEM ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.NonPoItem).Append("'");
        //        }

        //        if (transactionDetails.ReportData15 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_15 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData15).Append("'");
        //        }

        //        if (transactionDetails.ReportData18 != null)
        //        {
        //            if (transactionDetails.ReportData18 != DateTime.MinValue)
        //            {
        //                sbSql.Append(", REPORT_DATA_18 ");
        //                sbSqlValues.Append(",'").Append(transactionDetails.ReportData18.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
        //            }

        //        }

        //        if (transactionDetails.ReportData19 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_19 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData19.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData20 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_20 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData20.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData21 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_21 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData21.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData22 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_22 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData22.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData23 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_23 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData23.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData24 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_24 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData24.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData25 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_25 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData25.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData26 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_26 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData26.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData27 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_27 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData27.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData28 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_28 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData28.Replace("'", "''")).Append("'");
        //        }


        //        if (transactionDetails.ReportData29 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_29 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData29.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.SignatureId != null)
        //        {
        //            sbSql.Append(", SIGNATURE_ID ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.SignatureId).Append("'");
        //        }

        //        if (transactionDetails.ReportData30 != null)
        //        {
        //            if (transactionDetails.ReportData30 != DateTime.MinValue)
        //            {
        //                sbSql.Append(", REPORT_DATA_30 ");
        //                sbSqlValues.Append(",'").Append(transactionDetails.ReportData30.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
        //            }

        //        }


        //        if (transactionDetails.ReportData31 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_31 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData31.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData32 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_32 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData32.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData33 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_33 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData33.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData34 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_34 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData34.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData35 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_35 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData35.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.StartDateTime != null)
        //        {
        //            if (transactionDetails.StartDateTime != DateTime.MinValue)
        //            {
        //                sbSql.Append(", START_DT_TIME ");
        //                sbSqlValues.Append(",'").Append(transactionDetails.StartDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
        //            }

        //        }

        //        if (transactionDetails.EndDateTime != null)
        //        {
        //            if (transactionDetails.EndDateTime != DateTime.MinValue)
        //            {
        //                sbSql.Append(", END_DT_TIME ");
        //                sbSqlValues.Append(",'").Append(transactionDetails.EndDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
        //            }

        //        }

        //        if (transactionDetails.ReportData36 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_36 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData36.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData37 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_37 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData37.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData38 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_38 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData38.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData42 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_42 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData42.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData43 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_43 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData43.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData44 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_44 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData44.Replace("'", "''")).Append("'");
        //        }
        //        if (transactionDetails.ReportData47 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_47 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData47.Replace("'", "''")).Append("'");
        //        }

        //        if (transactionDetails.ReportData46 != null)
        //        {
        //            sbSql.Append(", REPORT_DATA_46 ");
        //            sbSqlValues.Append(",'").Append(transactionDetails.ReportData46.Replace("'", "''")).Append("')");
        //        }
        //        else
        //        {
        //            sbSqlValues.Append(")");
        //        }

        //        sbSql.Append(sbSqlValues.ToString());
        //        if (!_log.IsDebugEnabled)
        //        {
        //            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
        //        }

        //        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

        //        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }

        //        return AtparStatusCodes.ATPAR_OK;
        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
        //        return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
        //    }
        //    finally
        //    {
        //        sbSql = null;
        //        sbSqlValues = null;
        //    }
        //}
        #endregion

        //pou
        public string GetLocationType(string bUnit, string cartID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string locationType = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT LOCATION_TYPE FROM MT_POU_DEPT_CART_ALLOCATIONS WHERE BUSINESS_UNIT ='").Append(bUnit).Append("'").Append(" AND CART_ID='").Append(cartID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    locationType = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Location Type returned: " + locationType); }

                    return locationType;
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

        public List<MT_ATPAR_ITEM_ATTRIBUTES> GetItnAttr(string bUnit, string cartID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ITEM_ID, BUSINESS_UNIT, CART_ID, ORG_GROUP_ID, LOT_CONTROLLED, ");
                    sbSql.Append("SERIAL_CONTROLLED, CONVERSION_FACTOR, ISSUE_UOM FROM MT_ATPAR_ITEM_ATTRIBUTES ");
                    sbSql.Append("WHERE BUSINESS_UNIT='").Append(bUnit).Append("' AND CART_ID='").Append(cartID).Append("'");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    //var fields = new[] { "ITEM_ID", "BUSINESS_UNIT", "CART_ID", "ORG_GROUP_ID", "LOT_CONTROLLED", "SERIAL_CONTROLLED", "CONVERSION_FACTOR", "ISSUE_UOM", "CONV_RATE_PAR_TO_ISSUE_CF" };
                    var fields = new[] { "ITEM_ID", "BUSINESS_UNIT", "CART_ID", "ORG_GROUP_ID", "LOT_CONTROLLED", "SERIAL_CONTROLLED", "CONVERSION_FACTOR", "ISSUE_UOM" };

                    var lstItemAttributes = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ITEM_ATTRIBUTES>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemAttributes); }

                    return lstItemAttributes;
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

        public string GetStorageArea(string deptID, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string storageArea = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ISNULL(STORAGE_AREA,'') FROM MT_POU_DEPT WHERE DEPT_ID ='").Append(deptID).Append("'").Append("AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    storageArea = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Storage Area Returned: " + storageArea); }

                    return storageArea;
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
        /// To Get the Preference list details
        /// </summary>
        /// <param name="prefID"></param>
        /// <param name="procID"></param>
        /// <returns></returns>
        public List<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefID, string procID = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string sbSql = string.Empty;
            List<MT_POU_PREF_LIST_ALLOC> lstPrefDetails = null;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampPrefId = new SqlParameter("@PrefID", prefID);
                    SqlParameter parampProcID = new SqlParameter("@ProcID", procID);

                    object[] parameters = { parampPrefId, parampProcID };

                    if (!string.IsNullOrEmpty(prefID))
                    {
                        sbSql = "EXEC GetPrefListDetails @PrefID, @ProcID";

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql))); }
                        }

                        lstPrefDetails = objContext.Database.SqlQuery<MT_POU_PREF_LIST_ALLOC>(sbSql, parameters).ToList();

                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of records Returned: {1}", methodBaseName, lstPrefDetails != null ? lstPrefDetails.Count() : 0)); }
                    }
                    else
                    {
                        sbSql = "SELECT ITEM_ID, ITEM_DESCR , QUANTITY, STATUS FROM MT_POU_PREF_LIST_ALLOC ";

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql))); }
                        }

                        var fields = new[] { "ITEM_ID", "ITEM_DESCR", "QUANTITY", "STATUS" };

                        lstPrefDetails = objContext.Database.SqlQuery<MT_POU_PREF_LIST_ALLOC>(sbSql.ToString()).ToList();

                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of records Returned: {1}", methodBaseName, lstPrefDetails != null ? lstPrefDetails.Count() : 0)); }
                    }

                    return lstPrefDetails;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql)); }
                throw ex;
            }
            finally
            {
                sbSql = string.Empty;
            }
        }

        #region InsertDeviation
        public long InsertDeviation(AtPar_Deviation_Entity deviationDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long StatusCode = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if ((deviationDetails.ApplicationId == 0) || (deviationDetails.BusinessUnit.Length == 0))
                    {
                        return AtparStatusCodes.E_INVALIDPARAMETER;
                    }
                    else
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }

                    if (StatusCode == AtparStatusCodes.ATPAR_OK)
                    {
                        sbSql.Append("INSERT INTO MT_ATPAR_DEVIATION (APP_ID, BUSINESS_UNIT, KEY_1,KEY_2, ");
                        sbSql.Append("KEY_3,KEY_4, KEY_5, KEY_6 ");


                        if (deviationDetails.ReportData1.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_1 ");
                        }

                        if (deviationDetails.ReportData2.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_2 ");
                        }

                        if (deviationDetails.ReportData3.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_3 ");
                        }

                        if (deviationDetails.ReportData4.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_4 ");
                        }

                        if (deviationDetails.ReportData5.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_5 ");
                        }

                        if (deviationDetails.ReportData6 != null)
                        {
                            sbSql.Append(",REPORT_DATA_6 ");
                        }

                        if (deviationDetails.ReportData7 != null)
                        {
                            sbSql.Append(",REPORT_DATA_7 ");
                        }

                        if (deviationDetails.ReportData8 != null)
                        {
                            sbSql.Append(",REPORT_DATA_8 ");
                        }

                        if (deviationDetails.ReportData9 != null)
                        {
                            sbSql.Append(",REPORT_DATA_9 ");
                        }

                        if (deviationDetails.ReportData10 != null)
                        {
                            sbSql.Append(",REPORT_DATA_10 ");
                        }

                        if (deviationDetails.ReportData11 != null)
                        {
                            sbSql.Append(",REPORT_DATA_11 ");
                        }

                        if (deviationDetails.ReportData12 != null)
                        {
                            sbSql.Append(",REPORT_DATA_12 ");
                        }

                        if (deviationDetails.ReportData13 != null)
                        {
                            sbSql.Append(",REPORT_DATA_13 ");
                        }

                        if (deviationDetails.ReportData14 != null)
                        {
                            sbSql.Append(",REPORT_DATA_14 ");
                        }

                        if (deviationDetails.ReportData15 != null)
                        {
                            sbSql.Append(",REPORT_DATA_15 ");
                        }

                        if (deviationDetails.UserId != null)
                        {
                            sbSql.Append(",USER_ID ");
                        }

                        sbSql.Append(",UPDATE_DATE ");

                        sbSql.Append(" )VALUES (" + deviationDetails.ApplicationId + ", ");
                        sbSql.Append(" '" + deviationDetails.BusinessUnit + "','" + deviationDetails.Key1 + "' ");
                        sbSql.Append(" ,'" + deviationDetails.Key2 + "','" + deviationDetails.Key3 + "'");
                        sbSql.Append(" ,'" + deviationDetails.Key4 + "','" + deviationDetails.Key5 + "','" + deviationDetails.Key6 + "' ");

                        if (deviationDetails.ReportData1.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData1 + "' ");
                        }

                        if (deviationDetails.ReportData2.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData2 + "' ");
                        }

                        if (deviationDetails.ReportData3.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData3 + "' ");
                        }

                        if (deviationDetails.ReportData4.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData4 + "' ");
                        }

                        if (deviationDetails.ReportData5.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData5 + "' ");
                        }

                        if (deviationDetails.ReportData6 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData6 + "' ");
                        }

                        if (deviationDetails.ReportData7 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData7 + "' ");
                        }


                        if (deviationDetails.ReportData8 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData8 + "' ");
                        }

                        if (deviationDetails.ReportData9 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData9 + "' ");
                        }

                        if (deviationDetails.ReportData10 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData10 + "' ");
                        }

                        if (deviationDetails.ReportData11 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData11 + "' ");
                        }

                        if (deviationDetails.ReportData12 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData12 + "' ");
                        }

                        if (deviationDetails.ReportData13 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData13.Replace("'", "''") + "' ");
                        }

                        if (deviationDetails.ReportData14 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData14.Replace("'", "''") + "' ");
                        }

                        if (deviationDetails.ReportData15 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData15.Replace("'", "''") + "' ");
                        }

                        if (deviationDetails.UserId != null)
                        {
                            sbSql.Append(",'" + deviationDetails.UserId + "' ");
                        }

                        if (!string.IsNullOrEmpty(deviationDetails.UpdateDate))
                        {
                            sbSql.Append(",'" + deviationDetails.UpdateDate + "' ");
                        }
                        else
                        {
                            sbSql.Append(",GetDate()) ");
                        }



                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                        }

                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }



                        return AtparStatusCodes.ATPAR_OK;
                    }
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

        #endregion

        #region GetPhysicians
        public List<MT_POU_PHYSICIAN> GetPhysicians()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramStatus = new SqlParameter("@STATUS", AtParWebEnums.PHYSICIAN_STATUS.ACTIVE);
                    object[] parameters = { paramStatus };

                    sbSql = "exec GETPHYSICIANS  @STATUS";
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Getting the physicians with the following:" + sbSql); }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }
                    string[] fields = { "PHYSICIAN_ID", "FIRST_NAME", "MIDDLE_INITIAL", "LAST_NAME" };
                    List<MT_POU_PHYSICIAN> lstGetPhysicians = objContext.Database.DifferedExecuteQuery<MT_POU_PHYSICIAN>(fields, sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of records Selected: " + lstGetPhysicians.Count); }

                    return lstGetPhysicians;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = string.Empty;
            }
        }
        #endregion

        #region GetPrefList
        public List<MT_POU_PREF_LIST_HEADER> GetPrefList(string id, string descr, string deptID, string procCode, string physicians, int statusFlag = 0)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramID = new SqlParameter("@ID", id);
                    SqlParameter paramDescr = new SqlParameter("@Description", descr);
                    SqlParameter paramDeptId = new SqlParameter("@DepartmentId", deptID);
                    SqlParameter paramProcCode = new SqlParameter("@ProcedureCode", procCode);
                    SqlParameter paramPhysicians = new SqlParameter("@Physicians", physicians);
                    SqlParameter paramStatusFlag = new SqlParameter("@StatusFlag", statusFlag);

                    object[] parameters = { paramID, paramDescr, paramDeptId, paramProcCode, paramPhysicians, paramStatusFlag };

                    sbSql = "exec GetPrefLists @ID,@Description,@DepartmentId,@ProcedureCode,@Physicians,@StatusFlag";

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Executing the Stored Procedure:" + sbSql); }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }
                    string[] fields = { "PREF_LIST_ID", "PREF_LIST_DESCR", "STATUS", "PROCEDURE_ID", "PHYSICIAN_ID" };
                    List<MT_POU_PREF_LIST_HEADER> lstGetPrefList = objContext.Database.DifferedExecuteQuery<MT_POU_PREF_LIST_HEADER>(fields, sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of records Selected: " + lstGetPrefList.Count); }

                    return lstGetPrefList;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = string.Empty;
            }
        }
        #endregion

        #region GetCodes
        public List<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES> GetCodes(string codeType, string code, string descr)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sql = new StringBuilder();
            int intStatus = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    if (codeType.ToUpper() == AtParDefns.POU_Setup_REASONS.ToUpper())
                    {
                        _sql.Append("SELECT REASON_CODE AS CODE, DESCRIPTION, UPDATE_USER_ID, STATUS FROM MT_POU_REASON_CODE");
                    }
                    else if (codeType.ToUpper() == AtParDefns.POU_Setup_PROCEDURES.ToUpper())
                    {
                        _sql.Append("SELECT PROCEDURE_CODE AS CODE, SPECIALTY_CODE AS SCODE, DESCRIPTION, UPDATE_USER_ID, STATUS ");
                        _sql.Append(", CASE WHEN ([DESCRIPTION] IS NULL OR [DESCRIPTION] = '') THEN PROCEDURE_CODE ELSE PROCEDURE_CODE + ' - ' + [DESCRIPTION] END AS PROCEDURENAME ");
                        _sql.Append(" FROM MT_POU_PROCEDURE_CODE ");
                    }
                    else if (codeType.ToUpper() == AtParDefns.POU_Setup_COSTCENTER.ToUpper())
                    {
                        _sql.Append("SELECT COST_CENTER_CODE AS CODE, DESCRIPTION, UPDATE_USER_ID, STATUS FROM MT_POU_COST_CENTER");
                    }
                    else if (codeType.ToUpper() == AtParDefns.POU_Setup_CASECARTS.ToUpper())
                    {
                        _sql.Append("SELECT CASE_ID AS CODE, DESCRIPTION, UPDATE_USER_ID, STATUS FROM MT_POU_CASE_CART_HEADER");
                    }
                    else if (codeType.ToUpper() == AtParDefns.POU_Setup_SPECIALTY.ToUpper())
                    {
                        _sql.Append("SELECT SPECIALTY_CODE AS CODE, DESCRIPTION, UPDATE_USER_ID, STATUS FROM MT_POU_SPECIALTY_CODE");
                    }

                    if (codeType.ToUpper() != AtParDefns.POU_Setup_CASECARTS.ToUpper())
                        _sql.Append(" WHERE STATUS =" + intStatus + "");

                    if (!string.IsNullOrEmpty(code))
                    {
                        if (codeType.ToUpper() == AtParDefns.POU_Setup_REASONS.ToUpper())
                        {
                            _sql.Append(" AND REASON_CODE LIKE '%" + code + "%' ");
                        }
                        else if (codeType.ToUpper() == AtParDefns.POU_Setup_PROCEDURES.ToUpper())
                        {
                            _sql.Append(" AND PROCEDURE_CODE LIKE '%" + code + "%' ");
                        }
                        else if (codeType.ToUpper() == AtParDefns.POU_Setup_COSTCENTER.ToUpper())
                        {
                            _sql.Append(" AND COST_CENTER_CODE LIKE '%" + code + "%' ");
                        }
                        else
                        {
                            _sql.Append(" AND SPECIALTY_CODE LIKE '%" + code + "%' ");
                        }

                        if (!string.IsNullOrEmpty(descr))
                        {
                            _sql.Append(" AND DESCRIPTION LIKE '%" + descr + "%' ");
                        }
                    }
                    else if (!string.IsNullOrEmpty(descr))
                    {
                        _sql.Append(" AND DESCRIPTION LIKE '%" + descr + "%' ");
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Getting the POU codes with the following SQL...." + _sql); }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sql + ":")); }
                    }

                    List<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES> lstGetCodes = objContext.Database.SqlQuery<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES>(_sql.ToString()).ToList();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of records Selected: " + lstGetCodes.Count); }

                    return lstGetCodes;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sql.ToString()); }
                throw ex;
            }
            finally
            {
                _sql = null;
            }
        }
        #endregion

        #region UpdateOrderDetails
        public long UpdateOrderDetails(List<VM_POU_ORDER_DETAILS> lstOrderDetails)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            // StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            foreach (var Item in lstOrderDetails)
                            {
                                StringBuilder sbSql = new StringBuilder();
                                sbSql.Append(" UPDATE PAR_MNGT_ORDER_DETAILS SET");

                                // if (Item.STATUS == POUDefns.ORDER_STATUS.CANCEL.ToString())
                                if (Item.STATUS == "20")
                                {
                                    sbSql.Append(" QTY ='0', ");
                                }
                                else
                                {
                                    sbSql.Append(" QTY='").Append(Item.ORDER_QTY).Append("', ");
                                }
                                //GP-IT0000777
                                // if (Item.STATUS == POUDefns.ORDER_STATUS.RECV.ToString() | Item.STATUS == POUDefns.ORDER_STATUS.PARTIALLY_RECEIVED.ToString())
                                if (Item.STATUS == "15" || Item.STATUS == "25")
                                {
                                    sbSql.Append(" QTY_RCVD ='").Append(Item.RCVD_QTY).Append("',");
                                }

                                sbSql.Append(" ORDER_STATUS ='").Append(Item.STATUS).Append("' WHERE ").Append(" ITEM_ID='").Append(Item.ITEM_ID).Append("' ").Append(" AND ORDER_NO= '").Append(Item.ORDER_NO).Append("' ").Append(" AND LINE_NO='").Append(Item.LINE_NO).Append("' ");

                                if (Item.BIN_LOC != string.Empty)
                                {
                                    sbSql.Append(" AND BIN_LOC= '").Append(Item.BIN_LOC).Append("' ");
                                }

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled)
                                    {
                                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                                    }
                                }

                                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());



                                //  sbSql = null;

                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records updated : " + count); }
                            }
                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
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

        #region GetItems

        /// <summary>
        /// To get the Items
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgId"></param>
        /// <param name="AppID"></param>
        /// <returns></returns>
        public List<PAR_MNGT_ITEM> GetItems(string ItemID, string OrgId, string AppID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            List<PAR_MNGT_ITEM> listItems = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT PMI.ITEM_ID, PMI.SHORT_DESCR, PMI.ORG_GROUP_ID, PMI.STATUS  FROM PAR_MNGT_ITEM PMI INNER JOIN RM_ORG_UNITS ROU ON PMI.ORG_GROUP_ID=ROU.MASTER_GROUP_ID ");

                    if (!string.IsNullOrEmpty(OrgId))
                    {
                        sbSql.Append(" WHERE ROU.ORG_ID='" + OrgId + "' ");
                    }

                    if (Convert.ToInt32(AppID) == (int)AtParWebEnums.EnumApps.Pharmacy)
                    {
                        sbSql.Append("AND PMI.PHARMACY_FLG='TRUE' AND PMI.SUBSTITUTE_ITEM_FLG='FALSE' ");
                    }
                    else
                    {
                        sbSql.Append("AND PMI.PHARMACY_FLG='FALSE' AND PMI.SUBSTITUTE_ITEM_FLG='FALSE' ");
                    }

                    if (!string.IsNullOrEmpty(ItemID))
                    {
                        sbSql.Append("AND PMI.ITEM_ID LIKE '" + ItemID + "%' AND PMI.STATUS = 0 ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fileds = new[] { "ITEM_ID", "SHORT_DESCR", "ORG_GROUP_ID", "STATUS" };

                    listItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Items Returned: " + listItems.Count()); }

                    return listItems;
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


        #region GetBUs

        public List<MT_ATPAR_IBU_ALLOCATION> GetBUs(string appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append(" SELECT BUSINESS_UNIT,CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+'('+A.USER_ID+')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '(' + A.USER_ID + ')')  END AS USERNAME,A.USER_ID ")
                    .Append(" FROM MT_ATPAR_IBU_ALLOCATION A,MT_ATPAR_USER B WHERE A.USER_ID=B.USER_ID ")
                    .Append(" And A.APP_ID ='")
                    .Append(appID).Append("' ORDER BY BUSINESS_UNIT ASC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var fields = new[] { "BUSINESS_UNIT", "USERNAME", "USER_ID" };

                    var lstBunits = objContext.Database.DifferedExecuteQuery<MT_ATPAR_IBU_ALLOCATION>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of allocated Bunits Returned: {1}", methodBaseName, lstBunits.Count())); }

                    return lstBunits;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region GetCostCenterOrgIds

        /// <summary>
        /// Used to get the Cost Centers of the users
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public List<string> GetCostCenterOrgIds(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                List<string> lstCostCenters = null;

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    SqlParameter paramUserId = new SqlParameter("@userid", SqlDbType.NVarChar, 20);
                    paramUserId.Value = userID;

                    lstCostCenters = objContext.Database.SqlQuery<string>("exec GetCostCenterOrgGroupIds @userid", paramUserId).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCostCenters.Count); }

                }
                return lstCostCenters;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        #endregion

        public List<PAR_MNGT_VENDOR> GetAtparVendors(string strOrgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT VENDOR_ID, VENDOR_NAME, VEND_USER_ID, ADD_ITEMS_LFLAG FROM PAR_MNGT_VENDOR WHERE STATUS = 0 ");
                    if (strOrgGrpID != "All")
                    {
                        sbSql.Append("  AND ORG_GROUP_ID='" + strOrgGrpID + "'  ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var fields = new[] { "VENDOR_ID", "VENDOR_NAME", "VEND_USER_ID", "ADD_ITEMS_LFLAG" };

                    var lstAtParVendors = objContext.Database.DifferedExecuteQuery<PAR_MNGT_VENDOR>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Department Users Returned: {1}", methodBaseName, lstAtParVendors != null ? lstAtParVendors.Count() : 0)); }

                    return lstAtParVendors;
                }
            }
            catch (SqlException sqlExce)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, sqlExce.ToString())); }
                throw sqlExce;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #region UpdateDepts
        public long InsertPouDept(List<MT_POU_DEPT> lstDept)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbInsert = new StringBuilder();
            int insertCount = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            foreach (var item in lstDept)
                            {


                                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                                var count = GetDeptCount(item.DEPT_ID, item.ORG_GROUP_ID, objContext);

                                if (count == 0)
                                {
                                    sbInsert.Append("INSERT INTO MT_POU_DEPT(PREPICK_QA_PROCESS_REQUIRED,ORG_GROUP_ID, DEPT_ID, DEPT_NAME, ");
                                    sbInsert.Append("ATTN_TO, ADDRESS1, ADDRESS2, CITY, STATE, ZIP, PHONE, FAX, E_MAIL, ");
                                    sbInsert.Append("ALERT_NOTIFY_REQ, EMAIL_NOTIFY, COUNTRY, EXCP_APPROVAL_REQ, ");
                                    sbInsert.Append("INV_COORD_EMAIL, EXCP_APPROVER_EMAIL, RECALL_NOTIFICATION_EMAIL, ");
                                    sbInsert.Append("REMINDER_FREQ, STATUS, LAST_UPDATE_DATE, LAST_UPDATE_USER, ");
                                    sbInsert.Append("INV_INTERFACE_ENABLE, BILLING_ENABLE, DEFAULT_PRINTER, ");
                                    sbInsert.Append("DEFAULT_DISTRIBUTION_TYPE, DEFAULT_DESTINATION_LOCATION, ");
                                    sbInsert.Append("CATEGORY_CODE, BILLONLY_BUSINESS_UNIT, BILLONLY_LOCATION, ");
                                    sbInsert.Append("SEND_LOWSTOCK_EMAIL_ALERTS, EMAILID_FOR_LOWSTOCK_ALERTS, ");
                                    sbInsert.Append("SEND_PRODUCT_EXP_EMAIL_ALERTS, EMAILID_FOR_PRODUCT_EXP_ALERTS, ");

                                    sbInsert.Append("NO_OF_CASES_DOWNLOAD,ALLOW_LOC_SELECT, DURATION_TRACKING_EXP, PERCENTAGE_OPTIMUM_QTY, BUYER_ID, AUTO_PUTAWAY_ENABLED, STORAGE_AREA,CASE_PICK_STATUS,AUTO_CASE_PICK,BILL_ONLY_CONSIGN_IMPLMENTED,DEFAULT_IMPLANT_TYPE) ");
                                    sbInsert.Append("VALUES (");
                                    sbInsert.Append("'" + item.PREPICK_QA_PROCESS_REQUIRED + "','" + item.ORG_GROUP_ID + "','" + item.DEPT_ID + "','" + item.DEPT_NAME + "',");
                                    sbInsert.Append("'" + item.ATTN_TO + "','" + item.ADDRESS1 + "',");
                                    sbInsert.Append("'" + item.ADDRESS2 + "','" + item.CITY + "','" + item.STATE + "',");
                                    sbInsert.Append("'" + item.ZIP + "', '" + item.PHONE + "','" + item.FAX + "',");
                                    sbInsert.Append("'" + item.E_MAIL + "','" + item.ALERT_NOTIFY_REQ + "','" + item.EMAIL_NOTIFY + "',");
                                    sbInsert.Append("'" + item.COUNTRY + "','" + item.EXCP_APPROVAL_REQ + "','" + item.INV_COORD_EMAIL + "',");
                                    sbInsert.Append("'" + item.EXCP_APPROVER_EMAIL + "', ");
                                    sbInsert.Append("'" + item.RECALL_NOTIFICATION_EMAIL + "','" + item.REMINDER_FREQ + "',0,");
                                    sbInsert.Append(" getdate(), '" + item.LAST_UPDATE_USER + "', '" + item.INV_INTERFACE_ENABLE + "', ");
                                    sbInsert.Append("'" + item.BILLING_ENABLE + "','" + item.DEFAULT_PRINTER + "','" + item.DEFAULT_DISTRIBUTION_TYPE + "', ");
                                    sbInsert.Append("'" + item.DEFAULT_DESTINATION_LOCATION + "', '" + item.CATEGORY_CODE + "', ");
                                    sbInsert.Append("'" + item.BILLONLY_BUSINESS_UNIT + "', '" + item.BILLONLY_LOCATION + "', ");
                                    sbInsert.Append("'" + item.SEND_LOWSTOCK_EMAIL_ALERTS + "', '" + item.EMAILID_FOR_LOWSTOCK_ALERTS + "', ");
                                    sbInsert.Append("'" + item.SEND_PRODUCT_EXP_EMAIL_ALERTS + "', '" + item.EMAILID_FOR_PRODUCT_EXP_ALERTS + "', " + item.NO_OF_CASES_DOWNLOAD + ", ");

                                    sbInsert.Append("'" + item.ALLOW_LOC_SELECT + "', ");

                                    if (!string.IsNullOrEmpty(item.DURATION_TRACKING_EXP.ToString()))
                                    {
                                        sbInsert.Append("'" + item.DURATION_TRACKING_EXP + "'");
                                    }
                                    else
                                    {
                                        sbInsert.Append("NULL");
                                    }

                                    sbInsert.Append(",");

                                    if (!string.IsNullOrEmpty(item.PERCENTAGE_OPTIMUM_QTY.ToString()))
                                    {
                                        sbInsert.Append("'" + item.PERCENTAGE_OPTIMUM_QTY + "'");
                                    }
                                    else
                                    {
                                        sbInsert.Append("NULL");
                                    }

                                    sbInsert.Append(", '");
                                    sbInsert.Append(item.BUYER_ID);
                                    sbInsert.Append("', '");
                                    sbInsert.Append(item.AUTO_PUTAWAY_ENABLED);
                                    sbInsert.Append("', '");
                                    sbInsert.Append(item.STORAGE_AREA);
                                    sbInsert.Append("', '");
                                    sbInsert.Append(item.CASE_PICK_STATUS);
                                    sbInsert.Append("','");
                                    sbInsert.Append(item.AUTO_CASE_PICK);
                                    sbInsert.Append("','");
                                    sbInsert.Append(item.BILL_ONLY_CONSIGN_IMPLMENTED);
                                    sbInsert.Append("','");
                                    sbInsert.Append(item.DEFAULT_IMPLANT_TYPE);
                                    sbInsert.Append("')");

                                    var cnt = objContext.Database.ExecuteSqlCommand(sbInsert.ToString());
                                    insertCount = insertCount + cnt;

                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records inserted: " + insertCount); }

                                    sbInsert = null;

                                }
                                else
                                {
                                    return AtparStatusCodes.S_DEPT_EXIST;
                                }
                            }
                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbInsert.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + Globals.QUERY + sbInsert.ToString()); }
                throw ex;
            }
            finally
            {
                sbInsert = null;
            }
        }

        public long UpdatePouDept(List<MT_POU_DEPT> lstDept, int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSelect = new StringBuilder();
            StringBuilder sbUpdate = new StringBuilder();
            int updateCount = 0;
            DataSet dSDepts = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            foreach (var item in lstDept)
                            {
                                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                                var ListResult = GetDepts(item.ORG_GROUP_ID, item.DEPT_ID, appID, objContext);

                                dSDepts = ListResult.ToDataSet();

                                if (dSDepts.Tables[0].Rows.Count > 0)
                                {
                                    DataRow[] _dr = null;
                                    if (dSDepts.Tables[0].Rows[0]["INV_INTERFACE_ENABLE"].ToString() != item.INV_INTERFACE_ENABLE)
                                    {
                                        _dr = dSDepts.Tables[0].Select("SCHEDULE_ID NOT IN ('NULL','')");
                                        if (_dr.Length > 0)
                                        {

                                            return AtparStatusCodes.CARTS_ASSIGNED;
                                        }
                                    }
                                    if (dSDepts.Tables[0].Rows[0]["BILLING_ENABLE"].ToString() != item.BILLING_ENABLE)
                                    {
                                        _dr = dSDepts.Tables[0].Select("BILLING_OPTION IN (1,2)");
                                        if (_dr.Length > 0)
                                        {

                                            return AtparStatusCodes.CARTS_ASSIGNED;
                                        }
                                    }
                                }

                                sbUpdate.Remove(0, sbUpdate.Length);
                                sbUpdate.Append("UPDATE MT_POU_DEPT SET DEPT_NAME='" + item.DEPT_NAME + "', ATTN_TO='" + item.ATTN_TO + "', ");
                                sbUpdate.Append("ADDRESS1='" + item.ADDRESS1 + "', ADDRESS2='" + item.ADDRESS2 + "',");
                                sbUpdate.Append("CITY='" + item.CITY + "', STATE='" + item.STATE + "', ZIP='" + item.ZIP + "', PHONE='");
                                sbUpdate.Append(item.PHONE + "', FAX='" + item.FAX + "', E_MAIL='" + item.E_MAIL + "', ALERT_NOTIFY_REQ='");
                                sbUpdate.Append(item.ALERT_NOTIFY_REQ + "', EMAIL_NOTIFY='" + item.EMAIL_NOTIFY + "', COUNTRY='" + item.COUNTRY + "',");
                                sbUpdate.Append("LAST_UPDATE_DATE=getdate(),LAST_UPDATE_USER='" + item.LAST_UPDATE_USER + "', ");
                                sbUpdate.Append("EXCP_APPROVAL_REQ='" + item.EXCP_APPROVAL_REQ + "',INV_COORD_EMAIL='" + item.INV_COORD_EMAIL + "',");
                                sbUpdate.Append("EXCP_APPROVER_EMAIL='" + item.EXCP_APPROVER_EMAIL + "',REMINDER_FREQ='" + item.REMINDER_FREQ + "', ");
                                sbUpdate.Append("INV_INTERFACE_ENABLE='" + item.INV_INTERFACE_ENABLE + "',");
                                sbUpdate.Append("BILLING_ENABLE='" + item.BILLING_ENABLE + "',");
                                sbUpdate.Append("DEFAULT_PRINTER='" + item.DEFAULT_PRINTER + "',");
                                sbUpdate.Append("DEFAULT_DISTRIBUTION_TYPE='" + item.DEFAULT_DISTRIBUTION_TYPE + "',");
                                sbUpdate.Append("DEFAULT_DESTINATION_LOCATION='" + item.DEFAULT_DESTINATION_LOCATION + "', ");
                                sbUpdate.Append("CATEGORY_CODE='" + item.CATEGORY_CODE + "', ");
                                sbUpdate.Append("BILLONLY_BUSINESS_UNIT='" + item.BILLONLY_BUSINESS_UNIT + "', ");
                                sbUpdate.Append("BILLONLY_LOCATION='" + item.BILLONLY_LOCATION + "', ");
                                sbUpdate.Append("SEND_LOWSTOCK_EMAIL_ALERTS='" + item.SEND_LOWSTOCK_EMAIL_ALERTS + "', ");
                                sbUpdate.Append("EMAILID_FOR_LOWSTOCK_ALERTS='" + item.EMAILID_FOR_LOWSTOCK_ALERTS + "', ");
                                sbUpdate.Append("SEND_PRODUCT_EXP_EMAIL_ALERTS='" + item.SEND_PRODUCT_EXP_EMAIL_ALERTS + "', ");
                                sbUpdate.Append("EMAILID_FOR_PRODUCT_EXP_ALERTS='" + item.EMAILID_FOR_PRODUCT_EXP_ALERTS + "', ");
                                sbUpdate.Append("RECALL_NOTIFICATION_EMAIL='" + item.RECALL_NOTIFICATION_EMAIL + "', ");
                                sbUpdate.Append("NO_OF_CASES_DOWNLOAD=" + item.NO_OF_CASES_DOWNLOAD + ", ");
                                

                                sbUpdate.Append("ALLOW_LOC_SELECT='" + item.ALLOW_LOC_SELECT + "'");
                                sbUpdate.Append(", CASE_PICK_STATUS = " + item.CASE_PICK_STATUS);
                                sbUpdate.Append(", DURATION_TRACKING_EXP = ");

                                if (!string.IsNullOrEmpty(item.DURATION_TRACKING_EXP.ToString()))
                                {
                                    sbUpdate.Append(item.DURATION_TRACKING_EXP);
                                }
                                else
                                {
                                    sbUpdate.Append("NULL");
                                }

                                sbUpdate.Append(", PERCENTAGE_OPTIMUM_QTY = ");

                                if (!string.IsNullOrEmpty(item.PERCENTAGE_OPTIMUM_QTY.ToString()))
                                {
                                    sbUpdate.Append(item.PERCENTAGE_OPTIMUM_QTY);
                                }
                                else
                                {
                                    sbUpdate.Append("NULL");
                                }
                                sbUpdate.Append(", PREPICK_QA_PROCESS_REQUIRED='" + item.PREPICK_QA_PROCESS_REQUIRED + "'");
                                sbUpdate.Append(", BILL_ONLY_CONSIGN_IMPLMENTED='" + item.BILL_ONLY_CONSIGN_IMPLMENTED + "'");

                                sbUpdate.Append(", BUYER_ID = '" + item.BUYER_ID + "'");
                                sbUpdate.Append(", AUTO_PUTAWAY_ENABLED = '" + item.AUTO_PUTAWAY_ENABLED + "'");
                                sbUpdate.Append(", STORAGE_AREA = '" + item.STORAGE_AREA + "'");
                                sbUpdate.Append(", DEFAULT_IMPLANT_TYPE = '" + item.DEFAULT_IMPLANT_TYPE + "'");
                                sbUpdate.Append(", AUTO_CASE_PICK = '" + item.AUTO_CASE_PICK + "'");
                                sbUpdate.Append(" WHERE DEPT_ID='" + item.DEPT_ID + "' AND ORG_GROUP_ID='" + item.ORG_GROUP_ID + "'");

                                var cnt = objContext.Database.ExecuteSqlCommand(sbUpdate.ToString());
                                updateCount = updateCount + cnt;

                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records updated: " + updateCount); }

                                sbUpdate = null;
                            }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbUpdate.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSelect.ToString() + Globals.QUERY + sbUpdate.ToString()); }
                throw ex;
            }
            finally
            {
                sbSelect = null;
                sbUpdate = null;
            }
        }

        private int GetDeptCount(string deptID, string orgGroupID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" SELECT COUNT(DEPT_ID) FROM MT_POU_DEPT WHERE DEPT_ID ='").Append(deptID).Append("'").Append("AND ORG_GROUP_ID='").Append(orgGroupID).Append("'");

                int count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Items Returned: " + count); }

                return count;
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


        private List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> GetDepts(string orgGroupID, string deptID, int appID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT S.SCHEDULE_ID,S.BILLING_OPTION,D.INV_INTERFACE_ENABLE, " + "D.BILLING_ENABLE FROM MT_POU_DEPT D,MT_POU_DEPT_CART_ALLOCATIONS DC,MT_POU_PAR_LOC_PROCESS_SCHEDULE S " + "WHERE DC.DEPARTMENT_ID = D.DEPT_ID AND DC.ORG_GROUP_ID = D.ORG_GROUP_ID AND DC.APP_ID=S.APP_ID " + "AND (DC.CART_ID = S.ID OR DC.DEPARTMENT_ID = S.ID) AND DC.BUSINESS_UNIT = S.ORG_ID " + "AND D.ORG_GROUP_ID = '").Append(orgGroupID).Append("' AND D.DEPT_ID ='").Append(deptID).Append("' ").Append("AND DC.APP_ID = ").Append(appID);

                var fields = new string[] { "SCHEDULE_ID", "BILLING_OPTION", "INV_INTERFACE_ENABLE", "BILLING_ENABLE" };

                var ListResult = objContext.Database.DifferedExecuteQuery<MT_POU_PAR_LOC_PROCESS_SCHEDULE>(fields, (sbSql.ToString())).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Items Returned: " + ListResult.Count); }

                return ListResult;

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

        #region GetItemAttributes
        public List<MT_ATPAR_ITEM_ATTRIBUTES> GetItemAttributes(string bUnit, string cartID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ITEM_ID,BUSINESS_UNIT,CART_ID,ORG_GROUP_ID,LOT_CONTROLLED,SERIAL_CONTROLLED ");
                    sbSql.Append("FROM MT_ATPAR_ITEM_ATTRIBUTES WHERE BUSINESS_UNIT = '" + bUnit + "'");
                    sbSql.Append("AND CART_ID='" + cartID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var fileds = new[] { "ITEM_ID", "BUSINESS_UNIT", "CART_ID", "ORG_GROUP_ID", "LOT_CONTROLLED", "SERIAL_CONTROLLED" };

                    var lstItemAttributes = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ITEM_ATTRIBUTES>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemAttributes); }

                    return lstItemAttributes;
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

        #region GetTransactionId by transaction

        public long GetTransactionId(short appID, dynamic trans = null)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            string _strSQL = string.Empty;
            long transactionId = 0;

            SqlParameter sql_param_appid = new SqlParameter("@AppID", SqlDbType.Int);
            sql_param_appid.Value = appID;

            SqlParameter sql_param_transaction_id = new SqlParameter("@TransactionID", SqlDbType.Int);
            sql_param_transaction_id.Direction = ParameterDirection.Output;

            try
            {
                var transaction = trans as ATPAR_MT_Context;

                if (transaction == null)
                {

                    using (var objContext = new ATPAR_MT_Context())
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        var cnt = objContext.Database.ExecuteSqlCommand("exec SP_GetTransactionID @AppID, @TransactionID OUT", sql_param_appid, sql_param_transaction_id);

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned updated Trans Id Count " + cnt); }
                    }
                }
                else
                {
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { transaction.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var cnt = trans.Database.ExecuteSqlCommand("exec SP_GetTransactionID @AppID, @TransactionID OUT", sql_param_appid, sql_param_transaction_id);
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned updated Trans Id Count " + cnt); }
                }

                transactionId = Convert.ToInt64(sql_param_transaction_id.Value);

                return transactionId;

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region GetEventIds

        public List<MT_CYCT_EVENT_HDR> GetEventIds(string bunit, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            List<MT_CYCT_EVENT_HDR> eventIDs = null;

            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (!string.IsNullOrEmpty(bunit))
                    {
                        sbSQl.Append(" SELECT DISTINCT(EVENT_ID) AS EVENT_ID, EVENT_TYPE FROM MT_CYCT_EVENT_HDR ")
                            .Append("WHERE BUSINESS_UNIT='")
                            .Append(bunit)
                            .Append("' AND EVENT_STATUS IN ('").Append(AtParDefns.statDownloaded)
                            .Append("','")
                            .Append(AtParDefns.statEventCounting)
                            .Append("','").Append(AtParDefns.statEventCountComplete).Append("')")
                            .Append(" UNION ")
                            .Append(" SELECT DISTINCT (PARENT_EVENT_ID)AS EVENT_ID, EVENT_TYPE FROM MT_CYCT_EVENT_HDR ")
                            .Append(" WHERE BUSINESS_UNIT='").Append(bunit)
                            .Append("' AND  EVENT_STATUS IN ('").Append(AtParDefns.statDownloaded).Append("','")
                            .Append(AtParDefns.statEventCounting).Append("','").Append(AtParDefns.statEventCountComplete).Append("') AND PARENT_EVENT_ID NOT IN ")
                            .Append("(SELECT EVENT_ID FROM MT_CYCT_EVENT_HDR WHERE " + "BUSINESS_UNIT='")
                            .Append(bunit).Append("' AND  EVENT_STATUS IN ('").Append(AtParDefns.statDownloaded)
                            .Append("',").Append("'").Append(AtParDefns.statEventCounting).Append("','").Append(AtParDefns.statEventCountComplete).Append("'))");

                    }
                    else
                    {
                        sbSQl.Append(" SELECT DISTINCT (EVENT_ID) AS EVENT_ID, EVENT_TYPE  FROM MT_CYCT_EVENT_HDR ")
                        .Append("  Where (EVENT_STATUS = '").Append((int)AtParWebEnums.AppTransactionStatus.EventCounting).Append("'")
                        .Append("  Or EVENT_STATUS = '").Append((int)AtParWebEnums.AppTransactionStatus.Downloaded).Append("')")
                        .Append("  UNION SELECT DISTINCT PARENT_EVENT_ID AS EVENT_ID, EVENT_TYPE FROM MT_CYCT_EVENT_HDR ")
                        .Append("  WHERE PARENT_EVENT_ID  <> EVENT_ID")
                        .Append("  AND EVENT_STATUS NOT IN ('")
                        .Append((int)AtParWebEnums.AppTransactionStatus.Cancel).Append("','")
                        .Append((int)AtParWebEnums.AppTransactionStatus.Sent).Append("','")
                        .Append((int)AtParWebEnums.AppTransactionStatus.EventCountComplete).Append("')");

                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }


                    string[] columns = new[] { "EVENT_ID", "EVENT_TYPE" };
                    eventIDs = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR>(columns, sbSQl.ToString()).ToList();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned events  Count " + eventIDs.Count); }
                    return eventIDs;
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

        public List<MT_ATPAR_SYSTEM_DB> GetRptSystemIDs()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                List<MT_ATPAR_SYSTEM_DB> lstSystems = new List<MT_ATPAR_SYSTEM_DB>();
               
                //ATPAR_MASTER_Context.BuildConnectionString = string.Empty;

                using (ATPAR_MASTER_Context objContext = new ATPAR_MASTER_Context())
                {
                    //SqlParameter sql_param_systemid = new SqlParameter("@SystemId", SqlDbType.NVarChar, 50);
                    //sql_param_systemid.Value = systemID;

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var fields = new[] { "SYSTEM_ID", "SERVER", "USERID", "PASSWORD", "DATASOURCE", "SYSTEM_NAME", "SCHEMA_NAME" };

                    lstSystems = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SYSTEM_DB>(fields, "exec usp_GetRptSystemDetails").ToList();

                }

                return lstSystems;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        #region GetUserFullName
        public string GetUserFullName(string UserID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + ' (' + USER_ID + ')' AS FULLNAME FROM MT_ATPAR_USER WHERE USER_ID='").Append(UserID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var UserName = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (!string.IsNullOrEmpty(UserName))
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + UserName.ToString()); }                     
                    }
                    return UserName;
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

        #region GetHeirarchyUsersList
        public Tuple<DataSet, long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet dsUserList = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        SqlParameter[] sqlParms = new SqlParameter[3];

                        sqlParms[0] = new SqlParameter("@OrgGrp_ID", SqlDbType.NVarChar);
                        sqlParms[0].Value = orgGrpID;


                        sqlParms[1] = new SqlParameter("@app_ID", SqlDbType.NVarChar);
                        sqlParms[1].Value = appID;

                        sqlParms[2] = new SqlParameter("@userID", SqlDbType.NVarChar);
                        sqlParms[2].Value = userID;


                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GetHeirarchyUsersList";
                        command.CommandType = CommandType.StoredProcedure;

                        using (var reader = command.ExecuteReader())
                        {
                            var List1 =
                                ((IObjectContextAdapter)objContext)
                                    .ObjectContext
                                    .Translate<VM_STOCKISSUE_USERDETAILS>(reader)
                                    .ToList();

                            dsUserList = List1.ToDataSet();

                        }
                    }
                }
                return new Tuple<DataSet, long>(dsUserList, AtparStatusCodes.ATPAR_OK);
            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + "\r\n" + (sqlex));
                }
                return new Tuple<DataSet, long>(dsUserList, AtparStatusCodes.E_SERVERERROR);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ex.ToString());
                }
                return new Tuple<DataSet, long>(dsUserList, AtparStatusCodes.E_SERVERERROR);
            }
        }
        #endregion
    }
}


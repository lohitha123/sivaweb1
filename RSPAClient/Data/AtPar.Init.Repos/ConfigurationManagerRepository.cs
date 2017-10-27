using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Text;
using AtPar.ViewModel;
using Newtonsoft.Json.Linq;

namespace AtPar.Init.Repos
{
    public class ConfigurationManagerRepository : IConfigurationManagerRepository
    {
        private ILog _log;


        public ConfigurationManagerRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ConfigurationManagerRepository));
        }

        #region GetConfigurationDetails

        public List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> GetConfigSectionDtls()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfiguration = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT TAB_ID, PARAMETER_ID, FRIENDLY_NAME, DESCRIPTION, TYPE, VALIDATION_RULES, ");
                    sbSql.Append(" DEFAULT_VALUE, PARAMETER_VALUE, TOOL_TIP_INFO, VALID_FOR_ERP, DISPLAY_FLAG, DISPLAY_ORDER, NEW_VALIDATION_RULES ");
                    sbSql.Append(" FROM MT_ATPAR_CONFIGURATION_SECTION_DTLS ORDER BY ");
                    sbSql.Append(" TAB_ID,DISPLAY_ORDER;");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "TAB_ID", "PARAMETER_ID", "FRIENDLY_NAME", "DESCRIPTION", "TYPE", "VALIDATION_RULES", "DEFAULT_VALUE", "PARAMETER_VALUE", "TOOL_TIP_INFO", "VALID_FOR_ERP", "DISPLAY_FLAG", "DISPLAY_ORDER", "NEW_VALIDATION_RULES" };

                    lstConfiguration = objContext.Database.DifferedExecuteQuery<MT_ATPAR_CONFIGURATION_SECTION_DTLS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Records returned : " + lstConfiguration.Count()); }

                    return lstConfiguration;
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

        public List<MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS> GetConfigErpDtls()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS> lstEnterpriseDetails = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ENTERPRISE_SYSTEM, TYPE, ENTERPRISE_VERSION, DOWNLOAD_FROM, UPLOAD_TO FROM  MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS ORDER BY ENTERPRISE_SYSTEM");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":"));
                        }
                    }
                    lstEnterpriseDetails = objContext.Database.SqlQuery<MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Records returned : " + lstEnterpriseDetails.Count()); }

                    return lstEnterpriseDetails;
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

        #region SaveConfigurationDetails
        private long UpdateByDisplayFlag(ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                sbSql.Append("UPDATE MT_ATPAR_CONFIGURATION_SECTION_DTLS SET PARAMETER_VALUE=Null WHERE DISPLAY_FLAG='Y'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
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

        private long UpdateByTabId(List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstSavedConfigurationDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var count = 0;

            try
            {
                foreach (var pDSSavedConfigurationDetail in lstSavedConfigurationDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_CONFIGURATION_SECTION_DTLS ");
                    sbSql.Append("SET PARAMETER_VALUE='" + pDSSavedConfigurationDetail.PARAMETER_VALUE + "' ");
                    sbSql.Append("WHERE ");
                    sbSql.Append(" TAB_ID='" + pDSSavedConfigurationDetail.TAB_ID + "' ");
                    sbSql.Append("AND PARAMETER_ID='" + pDSSavedConfigurationDetail.PARAMETER_ID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                    count++;
                }

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

        public long SaveConfigurationDetails(List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls, string systemId, string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (lstConfigSectionDtls != null && lstConfigSectionDtls.Count > 0)
                        {
                            long statusCode = UpdateByDisplayFlag(objContext);

                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
                            }

                            statusCode = UpdateByTabId(lstConfigSectionDtls, objContext);

                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
                            }
                            statusCode = SaveMTConfigurationDetails(systemId, userId, lstConfigSectionDtls);

                            if (statusCode == AtparStatusCodes.ATPAR_OK)
                            {
                                trans.Commit();
                                AtParConfigFileReader objAtParConfig = new AtParConfigFileReader();
                                var objCls = new Utilities();
                                objCls.InitializeAtParSystem();
                                statusCode = objAtParConfig.GetSystemConfigurationData(systemId, true);
                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    return statusCode;
                                }
                            }
                            else
                            {
                                trans.Rollback();
                                return statusCode;
                            }
                        }
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
        }

        private long SaveMTConfigurationDetails(string systemId, string userId, List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstSavedConfigurationDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string systemName = string.Empty;
            string databaseSource = string.Empty;
            string schemaName = string.Empty;
            string userID = string.Empty;
            string password = string.Empty;
            string server = string.Empty;
            string strFilter = string.Empty;
            long statusCode = -1;

            try
            {
                if (lstSavedConfigurationDetails.Count > 0)
                {
                    strFilter = string.Empty;

                    if (lstSavedConfigurationDetails.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.SYSTEMDBCONNECTION.ToString()).ToList().Count > 0)
                    {
                        databaseSource = lstSavedConfigurationDetails.Where
                            (x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.SYSTEMDBCONNECTION.ToString() &&
                            x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATASOURCE.ToString()).FirstOrDefault().PARAMETER_VALUE;

                        userID = lstSavedConfigurationDetails.Where
                           (x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.SYSTEMDBCONNECTION.ToString() &&
                           x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.USERID.ToString()).FirstOrDefault().PARAMETER_VALUE;

                        password = lstSavedConfigurationDetails.Where
                           (x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.SYSTEMDBCONNECTION.ToString() &&
                           x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.PASSWORD.ToString()).FirstOrDefault().PARAMETER_VALUE;

                        server = lstSavedConfigurationDetails.Where
                           (x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.SYSTEMDBCONNECTION.ToString() &&
                           x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SERVER.ToString()).FirstOrDefault().PARAMETER_VALUE;
                        var systemDb = new MT_ATPAR_SYSTEM_DB
                        {
                            DATASOURCE = databaseSource,
                            LAST_UPDATE_DATE = DateTime.Today,
                            SERVER = server,
                            USERID = userID,
                            PASSWORD = password,
                            SYSTEM_ID = systemId,
                            LAST_UPDATE_USER = userId
                        };
                        statusCode = SaveMTConfigurationDetailsToSystemDB(systemDb);
                    }
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
        }
        #endregion

        public long SaveMTConfigurationDetailsToSystemDB(MT_ATPAR_SYSTEM_DB systemDb)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MASTER_Context objContext = new ATPAR_MASTER_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_SYSTEM_DB ").Append(("SET DATASOURCE='"
                + (systemDb.DATASOURCE + "' "))).Append((",USERID='"
                + (systemDb.USERID + "' "))).Append((",PASSWORD='"
                + (systemDb.PASSWORD + "' "))).Append((",SERVER='"
                + (systemDb.SERVER + "' "))).Append((",LAST_UPDATE_USER='"
                + (systemDb.LAST_UPDATE_USER + "' "))).Append((",LAST_UPDATE_DATE='"
                + (DateTime.Today + "' "))).Append(("WHERE SYSTEM_ID='"
                + (systemDb.SYSTEM_ID.Trim() + "' ")));

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
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

        public List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> GetSystemConfiguration()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDetails = null;

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT TAB_ID,PARAMETER_ID, PARAMETER_VALUE FROM MT_ATPAR_CONFIGURATION_SECTION_DTLS");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "TAB_ID", "PARAMETER_ID", "PARAMETER_VALUE" };

                    lstConfigSectionDetails = objContext.Database.DifferedExecuteQuery<MT_ATPAR_CONFIGURATION_SECTION_DTLS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Configuration Section Details Returned: " + lstConfigSectionDetails.Count()); }

                    return lstConfigSectionDetails;
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

        public IEnumerable<MT_ATPAR_CONFIGURATION_SECTION_DTLS> GetConfigTabNames()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            try
            {
                using (var entities = new ATPAR_MT_Context())
                {
                    List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> _lstCnfgmgr = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                    var fields = new[] { "TAB_ID", "TAB_NAME" };
                    _sbSQL.Append("SELECT TAB_ID,TAB_NAME FROM MT_ATPAR_CONFIGURATION_SECTION_DTLS GROUP BY ");
                    _sbSQL.Append(" TAB_ID,TAB_NAME;");

                    _lstCnfgmgr = entities.Database.DifferedExecuteQuery<MT_ATPAR_CONFIGURATION_SECTION_DTLS>(fields, _sbSQL.ToString()).ToList();

                    return _lstCnfgmgr;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public IEnumerable<MT_ATPAR_CONFIGURATION_SECTION_DTLS> GetConfigurationDetails()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            try
            {
                using (var entities = new ATPAR_MT_Context())
                {
                    List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> _lstCnfgmgr = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();//IEnumerable
                    MT_ATPAR_CONFIGURATION_SECTION_DTLS _objCnfgmgrSelection = null;



                    _sbSQL.Append(" SELECT TAB_ID,TAB_NAME, PARAMETER_ID, FRIENDLY_NAME, DESCRIPTION, TYPE, VALIDATION_RULES, ");
                    _sbSQL.Append(" DEFAULT_VALUE, PARAMETER_VALUE, TOOL_TIP_INFO, VALID_FOR_ERP, DISPLAY_FLAG, DISPLAY_ORDER ");
                    _sbSQL.Append(" FROM MT_ATPAR_CONFIGURATION_SECTION_DTLS ORDER BY ");
                    _sbSQL.Append(" TAB_ID,DISPLAY_ORDER;");
                    _sbSQL.Append("SELECT ENTERPRISE_SYSTEM,TYPE,ENTERPRISE_VERSION,DOWNLOAD_FROM,UPLOAD_TO from MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS ORDER BY ENTERPRISE_SYSTEM");

                    _lstCnfgmgr = entities.Database.SqlQuery<MT_ATPAR_CONFIGURATION_SECTION_DTLS>(_sbSQL.ToString()).ToList();

                    return _lstCnfgmgr;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public long UpDateConfigurationDetails(MT_ATPAR_CONFIGURATION_SECTION_DTLS objConfgData)
        {
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    var item = objContext.MT_ATPAR_CONFIGURATION_SECTION_DTLS.Where(x => x.TAB_ID == objConfgData.TAB_ID &&
                    x.PARAMETER_ID == objConfgData.PARAMETER_ID).FirstOrDefault();

                    item.PARAMETER_VALUE = objConfgData.PARAMETER_VALUE;
                    item.DEFAULT_VALUE = objConfgData.DEFAULT_VALUE;
                    item.DESCRIPTION = objConfgData.DESCRIPTION;
                    item.DISPLAY_FLAG = objConfgData.DISPLAY_FLAG;
                    item.DISPLAY_ORDER = objConfgData.DISPLAY_ORDER;
                    item.FRIENDLY_NAME = objConfgData.FRIENDLY_NAME;
                    item.PARAMETER_ID = objConfgData.PARAMETER_ID;
                    item.PARAMETER_VALUE = objConfgData.PARAMETER_VALUE;
                    item.TAB_ID = objConfgData.TAB_ID;
                    item.TAB_NAME = objConfgData.TAB_NAME;
                    item.TOOL_TIP_INFO = objConfgData.TOOL_TIP_INFO;
                    item.TYPE = objConfgData.TYPE;
                    item.VALIDATION_RULES = objConfgData.VALIDATION_RULES;
                    item.VALID_FOR_ERP = objConfgData.VALID_FOR_ERP;

                    objContext.SaveChanges();
                }

                return AtparStatusCodes.ATPAR_OK;
            }

            catch (Exception ex)
            {

                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
        }

        public string GetAtParSchema()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            // string Schema = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    _sbSQL.Append("SELECT SCHEMA_NAME(schema_id) FROM sys.tables where name='MT_ATPAR_APP' ");
                    var schema = objContext.Database.SqlQuery<string>(_sbSQL.ToString()).ToList();
                    return schema[0].ToString();
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return ex.Message;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public long UpdateSchema(string Schema)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            int count = 0;
            Guid categoryId = new Guid(AtParDefns.CONST_IZENDA_CATEGORY_ID);
            // string Schema = string.Empty;
            try
            {
                using (ATPAR_REP_CONFIGContext configContext = new ATPAR_REP_CONFIGContext())
                {
                    _sbSQL.Append("UPDATE IzendaQuerySourceCategory SET Name='" + Schema + "' WHERE Id='" + categoryId + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    count = configContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                }
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

        public List<MT_ATPAR_REPORTING_TABLES_LIST> GetQuerySourcesList()
        {
            string methodBaseName = string.Format("{0}.{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSql = new StringBuilder();
            List<MT_ATPAR_REPORTING_TABLES_LIST> lstrpttbl = new List<MT_ATPAR_REPORTING_TABLES_LIST>();
            try
            {
                using (ATPAR_MT_Context objcxt = new ATPAR_MT_Context())
                {
                    _sbSql.Append("SELECT NAME, TYPE FROM MT_ATPAR_REPORTING_TABLES_LIST");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    lstrpttbl = objcxt.Database.SqlQuery<MT_ATPAR_REPORTING_TABLES_LIST>(_sbSql.ToString()).ToList();
                }

                return lstrpttbl;
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                throw ex;
            }
        }

        public long UpdateQuerySource(List<MT_ATPAR_REPORTING_TABLES_LIST> lstRptTbl)
        {
            string methodBaseName = string.Format("{0}.{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSql = new StringBuilder();
            List<Guid> lstIds = new List<Guid>();
            int rowsaffected = 0;
            try
            {
                using (ATPAR_REP_CONFIGContext objcxt = new ATPAR_REP_CONFIGContext())
                {
                    using (DbContextTransaction dbTrans = objcxt.Database.BeginTransaction())
                    {
                        try
                        {
                            foreach (var rpttbl in lstRptTbl)
                            {
                                _sbSql.Clear();
                                _sbSql.Append("UPDATE IzendaQuerySource SET Selected=1 WHERE Name='" + rpttbl.NAME + "' AND Type='" + rpttbl.TYPE + "'");
                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                }
                                rowsaffected = objcxt.Database.ExecuteSqlCommand(_sbSql.ToString());
                            }
                        }
                        catch (Exception ex)
                        {
                            dbTrans.Rollback();
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }

                        try
                        {
                            _sbSql.Clear();
                            _sbSql.Append("SELECT Id FROM IzendaQuerySource WHERE Selected=1 AND Type='Stored Procedure'");
                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }
                            lstIds = objcxt.Database.SqlQuery<Guid>(_sbSql.ToString()).ToList();

                        }
                        catch (Exception ex)
                        {

                            dbTrans.Rollback();
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                        }


                        if (lstIds.Count > 0)
                        {
                            foreach (var id in lstIds)
                            {
                                try
                                {
                                    _sbSql.Clear();
                                    _sbSql.Append("UPDATE IzendaQuerySourceField SET Visible=1, Filterable=1 WHERE QuerySourceId='" + id + "'");
                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                    }
                                    rowsaffected = objcxt.Database.ExecuteSqlCommand(_sbSql.ToString());
                                }
                                catch (Exception ex)
                                {
                                    dbTrans.Rollback();
                                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                                    return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                    throw;
                                }

                            }
                        }

                        dbTrans.Commit();
                    }
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
        }

        public long UpdateLookUps(string schemaName)
        {
            string methodBaseName = string.Format("{0},{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int count = 0;
            StringBuilder _sbSql = new StringBuilder();
            List<VM_IZENDA_QUERY_SOURCE_FIELD> qrySourceFields = new List<VM_IZENDA_QUERY_SOURCE_FIELD>();
            try
            {
                using (ATPAR_REP_CONFIGContext objcxt = new ATPAR_REP_CONFIGContext())
                {
                    using (DbContextTransaction trans = objcxt.Database.BeginTransaction())
                    {
                        try
                        {
                            _sbSql.Append("SELECT Id, FilteredValue FROM IzendaQuerySourceField WHERE FilteredValue<>'' AND FilteredValue<>'{}' ");
                            qrySourceFields = objcxt.Database.SqlQuery<VM_IZENDA_QUERY_SOURCE_FIELD>(_sbSql.ToString()).ToList();
                            if (qrySourceFields.Count > 0)
                            {
                                for (int i = 0; i <= qrySourceFields.Count - 1; i++)
                                {
                                    VM_IZENDA_LOOKUPS lookUps = new VM_IZENDA_LOOKUPS();
                                    string filteredValue = qrySourceFields[i].FilteredValue.ToString();
                                    JObject jsonobj = JObject.Parse(filteredValue);
                                    jsonobj["databaseName"] = schemaName;
                                    string querySrcName = jsonobj["querySourceName"].ToString();
                                    string[] srcName = querySrcName.Split('.');
                                    srcName[0] = schemaName;
                                    jsonobj["querySourceName"] = string.Join(".", srcName);
                                    qrySourceFields[i].FilteredValue = jsonobj.ToString(Newtonsoft.Json.Formatting.None);

                                    _sbSql.Append("UPDATE IzendaQuerySourceField SET FilteredValue='" + jsonobj.ToString(Newtonsoft.Json.Formatting.None) + "' WHERE Id='" + qrySourceFields[i].Id + "'");
                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsInfoEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                    }

                                    count = objcxt.Database.ExecuteSqlCommand(_sbSql.ToString());
                                }
                            }
                            trans.Commit();
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }
                }
                return AtparStatusCodes.ATPAR_OK;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }

        }

        public long UpdateUsersImportStatus()
        {
            string methodBaseName = string.Format("{0}.{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context atparContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = atparContext.Database.BeginTransaction())
                    {
                        _sbSql.Append("UPDATE MT_ATPAR_REPORTS_SETTINGS SET VALUE='TRUE' WHERE NAME='" + AtParWebEnums.MT_Reports_Settings.USERS_IMPORTS.ToString() + "'");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { atparContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        atparContext.Database.ExecuteSqlCommand(_sbSql.ToString());

                        trans.Commit();
                    }

                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
        }

        public bool GetUsersImportStatus()
        {
            string methodBaseName = string.Format("{0}.{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSql = new StringBuilder();
            List<MT_ATPAR_REPORTS_SETTINGS> repSettings = new List<MT_ATPAR_REPORTS_SETTINGS>();

            try
            {
                using (ATPAR_MT_Context atparContext = new ATPAR_MT_Context())
                {

                    _sbSql.Append("SELECT NAME, VALUE FROM MT_ATPAR_REPORTS_SETTINGS WHERE NAME='" + AtParWebEnums.MT_Reports_Settings.USERS_IMPORTS.ToString() + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { atparContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }


                    repSettings = atparContext.Database.SqlQuery<MT_ATPAR_REPORTS_SETTINGS>(_sbSql.ToString()).ToList();

                }

                if (repSettings.Count > 0)
                {
                    return Convert.ToBoolean(repSettings[0].VALUE);
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                throw ex;
            }
        }

        public long UpdateHostName(string protocol, string serverName)
        {
            string methodBaseName = string.Format("{0}.{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSql = new StringBuilder();

            List<VM_IZENDA_SYSTEM_SETTINGS> lstsys = new List<VM_IZENDA_SYSTEM_SETTINGS>();
            try
            {
                if (serverName != "127.0.0.1")
                {
                    using (ATPAR_REP_CONFIGContext objcxt = new ATPAR_REP_CONFIGContext())
                    {
                        _sbSql.Append("SELECT Name, Value FROM IzendaSystemSetting");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        lstsys = objcxt.Database.SqlQuery<VM_IZENDA_SYSTEM_SETTINGS>(_sbSql.ToString()).ToList();

                        if (lstsys.Count > 0)
                        {
                            foreach (var item in lstsys)
                            {
                                if (item.Name == AtParWebEnums.Reporting_System_Settings_Enum.AuthGetAccessTokenUrl.ToString() || item.Name == AtParWebEnums.Reporting_System_Settings_Enum.WebUrl.ToString() ||
                                    item.Name == AtParWebEnums.Reporting_System_Settings_Enum.AuthValidateAccessTokenUrl.ToString())
                                {
                                    string value = item.Value;
                                    Uri uri = new Uri(item.Value.ToString());
                                    string host = uri.Host;
                                    value = protocol + "://" + serverName + value.Substring(value.IndexOf(host) + host.Count());

                                    using (DbContextTransaction dbTrans = objcxt.Database.BeginTransaction())
                                    {
                                        try
                                        {
                                            _sbSql.Clear();
                                            _sbSql.Append("UPDATE IzendaSystemSetting SET Value='" + value + "' WHERE Name='" + item.Name + "'");
                                            if (!_log.IsDebugEnabled)
                                            {
                                                if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                            }
                                            objcxt.Database.ExecuteSqlCommand(_sbSql.ToString());

                                        }
                                        catch (Exception ex)
                                        {
                                            dbTrans.Rollback();
                                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                                        }
                                        dbTrans.Commit();
                                    }
                                }
                            }
                        }

                    }
                }
                        return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                throw ex;
            }
        }
    }

}




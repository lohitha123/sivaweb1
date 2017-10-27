using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces;
using AtPar.Repository.Interfaces.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AtPar.Init.Repos
{
    public class AuditSetupRepository : IAuditSetupRepository
    {
        private ILog _log;
        private ICommonRepository _commonRepo;
        public AuditSetupRepository(ILog log, ICommonRepository commonRepo)
        {
            _log = log;
            _commonRepo = commonRepo;
            _log.SetLoggerType(typeof(AuditSetupRepository));
        }

        #region GetAppMenus
        /// <summary>
        /// Getting App Menus From MT_ATPAR_APP and MT_ATPAR_MENUS
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="enterpriseSystem"></param>
        /// <returns></returns>
        public List<MT_ATPAR_MENUS> GetAppMenus(int appID, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_MENUS> menuList = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.APP_ID, A.APP_NAME, B.MENU_ID, B.MENU_SUB_GROUP, B.MENU_NAME,(SELECT AUDIT = CASE WHEN B.AUDIT='Y' THEN 'True' ELSE 'False' END) AS UPDATE_DELETE FROM MT_ATPAR_APP A, MT_ATPAR_MENUS B WHERE A.APP_ID=B.APP_ID AND B.AUDIT!='I' AND B.ENTERPRISE_SYSTEM ='").Append(enterpriseSystem).Append("'");

                    if (appID != -1)
                    {
                        sbSql.Append(" AND A.APP_ID=").Append(appID);
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    string[] fileds = new string[] { "APP_ID", "APP_NAME", "MENU_ID", "MENU_SUB_GROUP", "MENU_NAME","AUDIT", "UPDATE_DELETE" };

                    menuList = objContext.Database.DifferedExecuteQuery<MT_ATPAR_MENUS>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + menuList.Count); }

                    return menuList;
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

        #region SaveAuditSetUpInfo
        /// <summary>
        /// Saving Audit Setup Info to MT_ATPAR_MENUS
        /// </summary>
        /// <param name="lstMenu"></param>
        /// <param name="user"></param>
        /// <param name="enterpriseSystem"></param>
        /// <returns></returns>
        public long SaveAuditSetUpInfo(List<MT_ATPAR_MENUS> lstMenu, string user, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var dbContextTransaction = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            foreach (var item in lstMenu)
                            {
                                sbSql.Append("UPDATE MT_ATPAR_MENUS SET AUDIT='").Append(item.AUDIT).Append("', LAST_UPDATE_USER = '").Append(user).Append("', LAST_UPDATE_DATE=GETDATE() WHERE  APP_ID='").Append(item.APP_ID).Append("'AND MENU_ID='").Append(item.MENU_ID).Append("' AND ENTERPRISE_SYSTEM = '").Append(enterpriseSystem).Append("'");

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                }
                                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                                sbSql.Clear();
                                //sbSql.Remove(0, sbSql.Length - 1);
                            }

                            dbContextTransaction.Commit();

                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            dbContextTransaction.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                        finally
                        {
                            sbSql = null;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() ); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }
        #endregion
    }
}

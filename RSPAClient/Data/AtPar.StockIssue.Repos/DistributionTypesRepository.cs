using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.StockIssue;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.StockIssue.Repos
{
    public class DistributionTypesRepository : IDistributionTypesRepository
    {
        private ILog _log;

        public DistributionTypesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(DistributionTypesRepository));
        }

        public List<MT_STIS_DISTRIB_TYPE> GetDistributionTypes(string distributionType)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT A.DISTRIB_TYPE, A.USER_ID, CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+'('+A.USER_ID+')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '(' + A.USER_ID + ')')  END AS USERNAME,");
                    sbSQL.Append(" A.SET_ID FROM MT_STIS_DISTRIB_TYPE A, MT_ATPAR_USER B WHERE A.USER_ID = B.USER_ID ");

                    if (!string.IsNullOrEmpty(distributionType))
                    {
                        sbSQL.Append("AND A.DISTRIB_TYPE LIKE '%" + distributionType + "%' ");
                    }

                    sbSQL.Append("ORDER BY DISTRIB_TYPE ASC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "DISTRIB_TYPE", "USER_ID", "USERNAME", "SET_ID" };

                    var lstDistTypes = objContext.Database.DifferedExecuteQuery<MT_STIS_DISTRIB_TYPE>(fields, sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstDistTypes.Count); }

                    return lstDistTypes;

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

        public long ProcessDistributionTypes(string loginUserID, string selectedUserID, List<MT_STIS_DISTRIB_TYPE> lstDistTypes)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        foreach (var item in lstDistTypes)
                        {
                            StatusCode = DeleteDistributionTypes(selectedUserID, item.DISTRIB_TYPE, objContext);
                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }
                        }

                        foreach (var item in lstDistTypes)
                        {
                            StatusCode = InsertDistributionTypes(loginUserID, selectedUserID, item.DISTRIB_TYPE, item.SET_ID, objContext);
                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }
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

        public long ProcessSelectedDistributionTypes(string loginUserID, string selectedUserID, List<MT_STIS_DISTRIB_TYPE> lstDistTypes)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        StatusCode = DeleteAllDistributionTypes(selectedUserID, objContext);
                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }
                        
                        foreach (var item in lstDistTypes)
                        {
                            StatusCode = InsertDistributionTypes(loginUserID, selectedUserID, item.DISTRIB_TYPE, item.SET_ID, objContext);
                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }
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

        private long DeleteDistributionTypes(string userID, string distributionType, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("IF EXISTS(SELECT DISTRIB_TYPE FROM MT_STIS_DISTRIB_TYPE WHERE ");
                sbSql.Append("USER_ID='" + userID + "' AND DISTRIB_TYPE='" + distributionType + "')");
                sbSql.Append("DELETE FROM MT_STIS_DISTRIB_TYPE WHERE ");
                sbSql.Append("USER_ID='" + userID + "' AND DISTRIB_TYPE= '" + distributionType + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Deleted " + count); }

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

        private long InsertDistributionTypes(string loginUserID, string selectedUserID, string distributionType,
                                                                       string setID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                sbSql.Clear();

                sbSql.Append("INSERT INTO MT_STIS_DISTRIB_TYPE(DISTRIB_TYPE, USER_ID, ");
                sbSql.Append("UPDATE_USER,UPDATE_DATE,SET_ID) VALUES ('" + distributionType + "', ");
                sbSql.Append("'" + selectedUserID + "', '" + loginUserID + "', '" + DateTime.Now + "', '" + setID + "')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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

        private long DeleteAllDistributionTypes(string selectedUserID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE  FROM MT_STIS_DISTRIB_TYPE  WHERE USER_ID= '" + selectedUserID + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Deleted " + count); }

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

    }
}

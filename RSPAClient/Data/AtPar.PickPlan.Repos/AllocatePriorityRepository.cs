using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.PickPlan;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.PickPlan.Repos
{
    public class AllocatePriorityRepository : IAllocatePriorityRepository
    {
        private ILog _log;

        public AllocatePriorityRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AllocatePriorityRepository));
        }

        /// <summary>
        /// Get Priorities from DB
        /// </summary>
        /// <param name="bUnit"></param>
        /// <param name="location"></param>
        /// <returns>Returns error or success code</returns>
        public List<MT_PKPL_PRIORITY> GetLocationPriorities(string bUnit, string location)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT BUSINESS_UNIT, LOCATION, DESCR, PRIORITY FROM MT_PKPL_PRIORITY ");
                    sbSQL.Append("WHERE BUSINESS_UNIT = '" + bUnit + "' AND  LOCATION IN ('" + location + "') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "BUSINESS_UNIT", "LOCATION", "DESCR", "PRIORITY" };

                    var lstPriorities = objContext.Database.DifferedExecuteQuery<MT_PKPL_PRIORITY>(fields, sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstPriorities.Count); }

                    return lstPriorities;

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

        /// <summary>
        /// Inserting the Priorities to DB
        /// </summary>
        /// <param name="bUnit"></param>
        /// <param name="location"></param>
        /// <param name="objContext"></param>
        /// <returns>Return error or success code</returns>
        private long DeleteLocationPriorities(string bUnit, string location, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_PKPL_PRIORITY WHERE ");
                sbSql.Append("BUSINESS_UNIT = '" + bUnit + "' ");
                sbSql.Append("AND LOCATION='" + location + "' ");

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

        /// <summary>
        /// Deleting the Priorities from DB
        /// </summary>
        /// <param name="priority"></param>
        /// <param name="objContext"></param>
        /// <returns>Return error or success code</returns>
        private long InsertLocationPriorities(string priorityLocation, MT_PKPL_PRIORITY priority, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                sbSql.Clear();

                //Replace single quote
                priority.ReplaceProperty(c => c.LOCATION);
                priority.ReplaceProperty(c => c.DESCR);

                sbSql.Append("INSERT INTO MT_PKPL_PRIORITY(BUSINESS_UNIT, LOCATION, ");
                sbSql.Append("PRIORITY, UPDATE_DATE, SETID, DESCR) ");
                sbSql.Append("VALUES('" + priority.BUSINESS_UNIT + "','" + priority.LOCATION + "', ");
                sbSql.Append("'" + priorityLocation + "', '" + DateTime.Now + "', ");
                sbSql.Append("'" + priority.SETID + "', '" + priority.DESCR + "')");


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

        /// <summary>
        /// Deletes Priority to a particular user and Reallocates the locations
        /// </summary>
        /// <param name="lstPriorities"></param>
        /// <returns>Returns error or success code</returns>
        public long ProcessLocationPriorities(string priority, List<MT_PKPL_PRIORITY> lstPriorities)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        foreach (var item in lstPriorities)
                        {
                            if ((item.CHK_VALUE == 1 && item.CHK_ALLOCATED == 0) || (item.CHK_VALUE == 1 && item.CHK_ALLOCATED == 1))
                            {
                                long StatusCode = DeleteLocationPriorities(item.BUSINESS_UNIT, item.LOCATION, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return StatusCode;
                                }

                                StatusCode = InsertLocationPriorities(priority, item, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return StatusCode;
                                }
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
    }
}

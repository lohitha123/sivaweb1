using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AtPar.Repository.Interfaces.Deliver;

namespace AtPar.Deliver.Repos
{
    public class ExcludeLocsRepository : IExcludeLocsRepository
    {
        ILog _log;
        public ExcludeLocsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ExcludeLocsRepository));
        }

        #region Exclude Locations

        private long DeleteLocations(List<MT_DELV_EXCLUDE_LOC> lstLocations, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();


            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstLocations)
                {
                    sbSql.Clear();

                    sbSql.Append("DELETE  FROM MT_DELV_EXCLUDE_LOC  WHERE SETID= '" + item.SETID + "' AND LOCATION ='" + item.LOCATION + "' ");
                   
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

        private long InsertLocations(List<MT_DELV_EXCLUDE_LOC> lstLocations, string serverUserID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstLocations)
                {
                    sbSql.Clear();

                    item.ReplaceProperty(c => c.LOCATION);

                    

                    sbSql.Append("INSERT INTO MT_DELV_EXCLUDE_LOC(SETID, LOCATION, UPDATE_DATE, UPDATE_USER_ID) ");
                    sbSql.Append("VALUES('" + item.SETID + "','" + item.LOCATION + "','" + DateTime.Now + "','" + serverUserID + "')");
                 

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
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() +Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;

            }
        }

        public long ProcessLocations(List<MT_DELV_EXCLUDE_LOC> lstLocations, string serverUserID)
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

                        var unCheckedLocations = lstLocations.Where(c => c.CHK_VALUE == 0 && c.CHK_ALLOCATED == 1).ToList();
                        var checkedLocations = lstLocations.Where(c => c.CHK_VALUE == 1 && c.CHK_ALLOCATED == 0).ToList();

                        if (unCheckedLocations.Count() > 0)
                        {
                            StatusCode = DeleteLocations(unCheckedLocations, objContext);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }

                        }
                        

                        StatusCode = InsertLocations(checkedLocations, serverUserID, objContext);

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

        #endregion

        public List<MT_DELV_EXCLUDE_LOC> GetLocations()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var result = objContext.MT_DELV_EXCLUDE_LOC.ToList();

                  
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + result.Count()); }

                    return result;

                }

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                throw ex;
            }            

        }
    }
}

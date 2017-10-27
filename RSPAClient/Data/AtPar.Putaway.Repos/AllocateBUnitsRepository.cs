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
using AtPar.Repository.Interfaces.Putaway;

namespace AtPar.Putaway.Repos
{
    public class AllocateBUnitsRepository : IAllocateBUnitsRepository
    {
        ILog _log;
        public AllocateBUnitsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AllocateBUnitsRepository));
        }

        #region AllocateBUnits

        /// <summary>
        /// Used to delete the User Business Units if exists
        /// </summary>
        /// <param name="lstBUnits"></param>
        /// <param name="userID"></param>
        /// <param name="appID"></param>
        /// <param name="objContext"></param>
        /// <returns>Success or Failure code</returns>
        private long DeleteBUnits(List<MT_PTWY_BU_ALLOCATION> lstBUnits, string userID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();


            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstBUnits)
                {
                    sbSql.Clear();

                    sbSql.Append("IF EXISTS(SELECT BUSINESS_UNIT FROM MT_PTWY_BU_ALLOCATION WHERE  ");
                    sbSql.Append("USER_ID = '" + userID + "'AND BUSINESS_UNIT = '" + item.BUSINESS_UNIT + "') ");
                    sbSql.Append("DELETE FROM MT_PTWY_BU_ALLOCATION WHERE USER_ID = '" + userID + "' ");
                    sbSql.Append("AND BUSINESS_UNIT = '" + item.BUSINESS_UNIT + "' ");

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

        /// <summary>
        /// Used to insert Business Units
        /// </summary>
        /// <param name="lstBUnits"></param>
        /// <param name="appID"></param>
        /// <param name="userID"></param>
        /// <param name="serverUserID"></param>
        /// <param name="objContext"></param>
        /// <returns>Success or Failure code</returns>
        private long InsertBunits(List<MT_PTWY_BU_ALLOCATION> lstBUnits, string userID,
                                    string serverUserID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstBUnits)
                {
                    sbSql.Clear();

                    item.ReplaceProperty(c => c.BUSINESS_UNIT);

                    sbSql.Append("INSERT INTO MT_PTWY_BU_ALLOCATION(BUSINESS_UNIT, USER_ID, ");
                    sbSql.Append("UPDATE_DATE, UPDATE_USER_ID) VALUES(");
                    sbSql.Append("'" + item.BUSINESS_UNIT + "', '" + userID + "', ");
                    sbSql.Append(" '" + DateTime.Now + "','" + serverUserID + "') ");

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

        /// <summary>
        /// Used to delete all Business Units of the user
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="appID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteAllBunits(string userID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_PTWY_BU_ALLOCATION WHERE USER_ID = '" + userID + "' ");

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

        public long ProcessBUnits(List<MT_PTWY_BU_ALLOCATION> lstBUnits, string userID, string serverUserID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteBUnits(lstBUnits, userID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        lstBUnits.RemoveAll(x => x.CHK_VALUE == 0);

                        StatusCode = InsertBunits(lstBUnits, userID, serverUserID, objContext);

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

        public long ProcessSelectedBUnits(List<MT_PTWY_BU_ALLOCATION> lstBUnits, string userID, string serverUserID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteAllBunits(userID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        StatusCode = InsertBunits(lstBUnits, userID, serverUserID, objContext);

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

        #region GetBUnits
        public List<MT_PTWY_BU_ALLOCATION> GetBUnits()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT,CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+'('+A.USER_ID+')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '(' + A.USER_ID + ')')  END AS  ");
                    sbSql.Append("USERNAME,A.USER_ID FROM MT_PTWY_BU_ALLOCATION A, MT_ATPAR_USER B WHERE A.USER_ID = B.USER_ID ");
                    sbSql.Append("ORDER BY BUSINESS_UNIT ASC ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "BUSINESS_UNIT", "USER_ID", "USERNAME", };

                    var lstBusinessUnits = objContext.Database.DifferedExecuteQuery<MT_PTWY_BU_ALLOCATION>(fileds, sbSql.ToString()).ToList();


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

    }

}

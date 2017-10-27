using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.Data;
using AtPar.Repository.Interfaces.Receiving;
using AtPar.Common;
using log4net;
using AtPar.ViewModel;
using System.Data.Entity;
using AtPar.POCOEntities;

namespace AtPar.Receiving.Repos
{
    public class ShipToIDsRepository : IShipToIDsRepository
    {
        ILog _log;

        public ShipToIDsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ShipToIDsRepository));
        }        

        private const string strDefaultShipToId = "DEFAULT_SHIPTO_ID";
        private const string strDefaultShipToLoc = "DEFAULT_SHIP_TO_LOC";

        /// <summary>
        /// Gets all Ship to IDs from DB
        /// </summary>
        /// <returns></returns>
        public List<MT_RECV_SHIPTO_ID_ALLOCATION> GetLocalDbShipToIds()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT SETID,SHIPTO_ID,DESCR, A.USER_ID, ");
                    sbSql.Append("CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+'('+A.USER_ID+')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '(' + A.USER_ID + ')')  END AS USERNAME ");
                    sbSql.Append("FROM MT_RECV_SHIPTO_ID_ALLOCATION A, MT_ATPAR_USER B ");
                    sbSql.Append("WHERE A.USER_ID=B.USER_ID ORDER BY SETID ASC ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    
                    var fileds = new[] { "SETID", "SHIPTO_ID", "DESCR", "USER_ID", "USERNAME" };

                    var lstShipToIdsLDB = objContext.Database.DifferedExecuteQuery<MT_RECV_SHIPTO_ID_ALLOCATION>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of ship to Ids Returned from Local DB: {1}", methodBaseName, lstShipToIdsLDB != null ? lstShipToIdsLDB.Count : 0)); }

                    return lstShipToIdsLDB;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Store the Selected Ship to IDs to DB
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="lstLocalShipToIDs"></param>
        /// <returns></returns>
        public long AllocateShipTOIDsSelected(string userID, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstLocalShipToIDs)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteShipToIds(userID, lstLocalShipToIDs, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        lstLocalShipToIDs.RemoveAll(c => c.CHK_VALUE == 0);

                        StatusCode = InsertShipToIds(userID, lstLocalShipToIDs, objContext);

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
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        /// <summary>
        /// Deleted the Ship to IDs from DB
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="lstShipToIDs"></param>
        /// <param name="objContext"></param>
        /// <returns>Return Success or Failure code</returns>
        private long DeleteShipToIds(string userID, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstShipToIDs, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                string tempDescr = string.Empty;

                foreach (var item in lstShipToIDs)
                {
                    sbSql.Clear();
                    tempDescr = string.Empty;
                    tempDescr = item.DESCR.ReplaceString().ReplaceQuotesWithEmpty();

                    sbSql.Append("IF EXISTS(SELECT SETID, SHIPTO_ID, DESCR FROM MT_RECV_SHIPTO_ID_ALLOCATION ");
                    sbSql.Append("WHERE USER_ID = '" + userID + "' AND SETID = '" + item.SETID + "' ");
                    sbSql.Append("AND SHIPTO_ID= '" + item.SHIPTO_ID + "' ");
                    sbSql.Append("AND DESCR= '" + tempDescr + "') ");
                    sbSql.Append("DELETE FROM MT_RECV_SHIPTO_ID_ALLOCATION ");
                    sbSql.Append("WHERE USER_ID = '" + userID + "' ");
                    sbSql.Append("AND SETID = '" + item.SETID + "' ");
                    sbSql.Append("AND SHIPTO_ID= '" + item.SHIPTO_ID + "' ");
                    sbSql.Append("AND DESCR= '" + tempDescr + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }


                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }
                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        /// <summary>
        /// Deletes all Ship to IDs from DB based on the user
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="objContext"></param>
        /// <returns>Returns error or success code</returns>
        private long DeleteShipToIdsAll(string userID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();


            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                string tempDescr = string.Empty;

                sbSql.Append("DELETE FROM MT_RECV_SHIPTO_ID_ALLOCATION ");
                sbSql.Append("WHERE USER_ID = '" + userID + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        /// <summary>
        /// Insert the allocated Ship to IDs to DB
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="lstShipToIDs"></param>
        /// <param name="objContext"></param>
        /// <returns>Return error or success code</returns>
        private long InsertShipToIds(string userID, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstShipToIDs, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();


            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                string tempDescr = string.Empty;

                foreach (var item in lstShipToIDs)
                {
                    sbSql.Clear();
                    tempDescr = string.Empty;
                    tempDescr = item.DESCR.ReplaceString().ReplaceQuotesWithEmpty();

                    sbSql.Append("INSERT INTO MT_RECV_SHIPTO_ID_ALLOCATION( SETID, USER_ID, SHIPTO_ID, DESCR) VALUES (");
                    sbSql.Append("'" + item.SETID + "', ");
                    sbSql.Append("'" + userID + "', ");
                    sbSql.Append("'" + item.SHIPTO_ID + "', ");
                    sbSql.Append("'" + tempDescr + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }
                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Insert the allocated Ship to IDs to DB
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="serverUserID"></param>
        /// <param name="lstShipToIDs"></param>
        /// <param name="objContext"></param>
        /// <returns>Returns error or success code</returns>
        private long InsertShipToIdsAll(string userID, string serverUserID, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstShipToIDs, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();


            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                string tempDescr = string.Empty;

                foreach (var item in lstShipToIDs)
                {
                    sbSql.Clear();
                    tempDescr = string.Empty;
                    tempDescr = item.DESCR.ReplaceString().ReplaceQuotesWithEmpty();

                    sbSql.Append("INSERT INTO MT_RECV_SHIPTO_ID_ALLOCATION( SETID, USER_ID, SHIPTO_ID, DESCR,LAST_UPDATE_DATE,LAST_UPDATE_USERID) VALUES (");
                    sbSql.Append("'" + item.SETID + "', ");
                    sbSql.Append("'" + userID + "', ");
                    sbSql.Append("'" + item.SHIPTO_ID + "', ");
                    sbSql.Append("'" + tempDescr + "', ");
                    sbSql.Append("'" + DateTime.Now.ToString() + "', ");
                    sbSql.Append("'" + serverUserID + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }
                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long AllocateShipTOIDsAll(string userID, string serverUserID, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstLocalShipToIDs)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteShipToIdsAll(userID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        lstLocalShipToIDs.RemoveAll(c => c.CHK_VALUE == 0);
                        StatusCode = InsertShipToIdsAll(userID, serverUserID, lstLocalShipToIDs, objContext);

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
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        /// <summary>
        /// Checking Ship to ID is allocated or not
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="lstShipToIds"></param>
        /// <returns>Returns the count</returns>
        public int IsDefaultShiptoIDUnAllocated(string userID, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstShipToIds)

        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int intRCnt = 0;
            string strShipToId = string.Empty;
            int unAllocCnt = 0;
            try
            {

                for (int i = 0; i < lstShipToIds.Count-1; i++)
                {
                    if (i == 0)
                    {
                        intRCnt = 0;
                    }

                    if (lstShipToIds[i].CHK_ALLOCATED == 1  && lstShipToIds[i].CHK_VALUE == 0)
                    {
                        if (intRCnt == 0)
                        {
                            strShipToId = "'" + lstShipToIds[i].SHIPTO_ID + "'";
                            intRCnt = intRCnt + 1;
                        }
                        else
                        {
                            strShipToId = strShipToId + ",'" + lstShipToIds[i].SHIPTO_ID + "'";
                        }
                    }
                }

                if (!string.IsNullOrEmpty(strShipToId)) {

                    using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                        sbSql.Append("SELECT COUNT(PARAMETER_ID) ");
                        sbSql.Append("FROM MT_ATPAR_USER_APP_PARAMETERS ");
                        sbSql.Append("WHERE APP_ID= " + (Int16)AtParWebEnums.EnumApps.Receiving + " ");
                        sbSql.Append("AND USER_ID='" + userID + "' ");
                        //sbSql.Append("AND  PARAMETER_ID'" + strDefaultShipToId + "' ");
                        sbSql.Append("AND  PARAMETER_ID IN('" + strDefaultShipToId + "','" + strDefaultShipToLoc + "') ");
                        sbSql.Append("AND PARAMETER_VALUE IN (" + strShipToId + ")");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                        }

                        unAllocCnt = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();


                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of unallocated ShipToIds count: {1}", methodBaseName, unAllocCnt)); }



                    }
                }

                return unAllocCnt;
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
    }
}

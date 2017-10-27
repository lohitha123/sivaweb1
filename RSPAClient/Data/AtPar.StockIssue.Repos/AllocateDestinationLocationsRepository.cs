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


namespace AtPar.StockIssue.Repos
{
    public class AllocateDestinationLocationsRepository : IAllocateDestinationLocationsRepository
    {
        private ILog _log;
        public AllocateDestinationLocationsRepository(ILog log)
        {
            _log = log;
        }

        #region GetAllocInvBUnits
        public List<string> GetDistinctBusinessUnits(int appID, string userList)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_IBU_ALLOCATION  WHERE ");
                    sbSql.Append(" APP_ID = '").Append(appID).Append("' AND USER_ID in (").Append(userList).Append(")");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var lstBusinessUnits = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Business Units returned : " + lstBusinessUnits.Count()); }

                    return lstBusinessUnits;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() ); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion
        #region GetDestinationLocations
        public List<MT_STIS_DEST_LOC_ALLOCATION> GetDestinationLocations()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT LOCATION_ID, BUSINESS_UNIT, A.USER_ID, ");
                    sbSql.Append("CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+'('+A.USER_ID+')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '(' + A.USER_ID + ')')  END AS USERNAME ");
                    sbSql.Append("FROM MT_STIS_DEST_LOC_ALLOCATION A, MT_ATPAR_USER B WHERE A.USER_ID=B.USER_ID ");
                    sbSql.Append("ORDER BY LOCATION_ID ASC");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() )); }
                    }

                    var fileds = new[] { "LOCATION_ID", "BUSINESS_UNIT", "USER_ID", "USERNAME" };

                    var lstBusinessUnits = objContext.Database.DifferedExecuteQuery<MT_STIS_DEST_LOC_ALLOCATION>(fileds, sbSql.ToString()).ToList();


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

        #region AllocatedDestLocations

        private long DeleteLocations(List<MT_STIS_DEST_LOC_ALLOCATION> lstLocations, string selectedUserID, ATPAR_MT_Context objContext)
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

                    sbSql.Append("IF EXISTS(SELECT LOCATION_ID FROM MT_STIS_DEST_LOC_ALLOCATION WHERE ");
                    sbSql.Append("USER_ID = '").Append(selectedUserID).Append("' AND LOCATION_ID = '");
                    sbSql.Append(item.LOCATION_ID).Append("'");
                    sbSql.Append("AND BUSINESS_UNIT = '").Append(item.BUSINESS_UNIT).Append("')");
                    sbSql.Append("DELETE FROM MT_STIS_DEST_LOC_ALLOCATION WHERE ");
                    sbSql.Append("USER_ID = '").Append(selectedUserID).Append("' AND LOCATION_ID = '").Append(item.LOCATION_ID).Append("' ");
                    sbSql.Append("AND BUSINESS_UNIT = '").Append(item.BUSINESS_UNIT).Append("'");

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

        private long DeleteAllLocations(string selectedUserID, string bUnit, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                sbSql.Append("DELETE  FROM MT_STIS_DEST_LOC_ALLOCATION  " + "WHERE USER_ID= '" + selectedUserID + "'");

                if (!string.IsNullOrEmpty(bUnit))
                {
                    if (bUnit != "Select BUnit")
                    {
                        sbSql.Append(" AND BUSINESS_UNIT = '" + bUnit + "'");
                    }
                }

                int count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Rows deleted : " + count); }
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

        private long InsertLocations(List<MT_STIS_DEST_LOC_ALLOCATION> lstAllocDestLocations, string selectedUserID,
          string userID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstAllocDestLocations)
                {
                    sbSql.Clear();

                    sbSql.Append("INSERT INTO MT_STIS_DEST_LOC_ALLOCATION(LOCATION_ID, USER_ID, UPDATE_USER, UPDATE_DATE, ");
                    sbSql.Append("BUSINESS_UNIT) VALUES ('" + item.LOCATION_ID + "','" + selectedUserID + "',");
                    sbSql.Append("'" + userID + "','" + DateTime.Now + "', '" + item.BUSINESS_UNIT + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));

                        }
                    }
                    int count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Rows Inserted  : " + count); }

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
        public long ProcessDestLocations(List<MT_STIS_DEST_LOC_ALLOCATION> lstLocations, string selectedUserID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteLocations(lstLocations, selectedUserID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        lstLocations.RemoveAll(x => x.CHK_VALUE == 0);

                        StatusCode = InsertLocations(lstLocations, selectedUserID, userID, objContext);

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

        public long ProcessSelectedLocations(List<MT_STIS_DEST_LOC_ALLOCATION> lstLocations, string bUnit, string selectedUserID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteAllLocations(selectedUserID, bUnit, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        StatusCode = InsertLocations(lstLocations, selectedUserID, userID, objContext);

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
    }
}

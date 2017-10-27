using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using AtPar.Repository.Interfaces.Deliver;

namespace AtPar.Deliver.Repos
{
    public class DropOffLocsRepository : IDropOffLocsRepository
    {
        private ILog _log;

        public DropOffLocsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(DropOffLocsRepository));
        }

        /// <summary>
        /// Used to verify Location ID Exist or not
        /// </summary>
        /// <param name="locID"></param>
        /// <param name="orgGroupID"></param>
        /// <returns>f Cost Center exists returns ATPAR_E_LOCGRPIDALREADYEXISTS, if not returns ATPAR_OK, in case of any
        /// exception returns ATPAR_E_LOCALDBSELECTFAIL</returns>
        public long IsDropOffLocExistOrNot(string locID, string orgGroupID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var existingCostCenterCount = objContext.MT_DELV_LOC_DETAILS.Count(c => c.DROP_OFF_LOCATION_ID == locID
                                                                            && c.ORG_GROUP_ID == orgGroupID);

                    if (existingCostCenterCount > 0)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Location : " + locID + " already exists"); }
                        return AtparStatusCodes.ATPAR_E_LOCGRPIDALREADYEXISTS;
                    }
                    else
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }

        }

        /// <summary>
        /// Used to insert Location to the DB
        /// </summary>
        /// <param name="location"></param>
        /// <returns>Returns ATPAR_OK on success, if any exception returns ATPAR_E_LOCALDBINSERTFAIL</returns>
        public long InsertDropOffLocs(MT_DELV_LOC_DETAILS location)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_DELV_LOC_DETAILS ");
                    sbSql.Append("(ORG_GROUP_ID, DROP_OFF_LOCATION_ID, LOCATION_DESC, STATUS, LAST_UPDATE_DATE, ");
                    sbSql.Append("LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) ");
                    sbSql.Append("VALUES (");
                    sbSql.Append("'" + location.ORG_GROUP_ID + "', ");
                    sbSql.Append("'" + location.DROP_OFF_LOCATION_ID + "', ");
                    sbSql.Append("'" + location.LOCATION_DESC + "', ");
                    sbSql.Append("'" + location.STATUS + "', GETDATE(), ");
                    sbSql.Append("'" + location.LAST_UPDATE_USER + "',");
                    sbSql.Append("'" + location.LAST_CLIENT_ADDRESS.HandleNull() + "')");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }

        }

        /// <summary>
        /// Used to update the Location Status Active and InActive
        /// </summary>
        /// <param name="status"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="locID"></param>
        /// <param name="userID"></param>
        /// <returns>Returns ATPAR_OK on success, if any exception returns ATPAR_E_LOCALDBUPDATEFAIL</returns>
        public long UpdateDropOffLocs(int status, string orgGroupID, string locID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_DELV_LOC_DETAILS SET STATUS = '" + status + "', ");
                    sbSql.Append("LAST_UPDATE_DATE = GETDATE()");
                    sbSql.Append("WHERE DROP_OFF_LOCATION_ID='" + locID + "' ");
                    sbSql.Append("AND ORG_GROUP_ID='" + orgGroupID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        /// <summary>
        /// Used to update Location to the DB
        /// </summary>
        /// <param name="drpLocID"></param>
        /// <param name="locDesc"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="userID"></param>
        /// <param name="prevLocID"></param>
        /// <returns>Returns ATPAR_OK on success, if any exception returns ATPAR_E_LOCADBUPDATEFAIL</returns>
        public long EditUpdateDropOffLocs(string drpLocID, string locDesc, string orgGroupID, string userID, string prevLocID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_DELV_LOC_DETAILS SET DROP_OFF_LOCATION_ID = '" + drpLocID + "', ");
                    sbSql.Append("LOCATION_DESC ='" + locDesc + "', ");
                    sbSql.Append("LAST_UPDATE_DATE = GETDATE(), ");
                    sbSql.Append("LAST_UPDATE_USER = '" + userID + "' ");
                    sbSql.Append("WHERE DROP_OFF_LOCATION_ID='" + prevLocID + "' ");
                    sbSql.Append("AND ORG_GROUP_ID='" + orgGroupID + "'");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        /// <summary>
        /// To get the drop off locations
        /// </summary>
        /// <param name="locID"></param>
        /// <param name="locDesc"></param>
        /// <param name="orgGroupID"></param>
        /// <returns></returns>
        public List<MT_DELV_LOC_DETAILS> GetDropOffLocs(string locID, string locDesc, string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT DROP_OFF_LOCATION_ID, ORG_GROUP_ID, LOCATION_DESC, STATUS FROM MT_DELV_LOC_DETAILS ");

                    if (!string.IsNullOrEmpty(orgGroupID))
                    {
                        if (orgGroupID != "All")
                        {
                            sbSQL.Append(" WHERE  ORG_GROUP_ID = '" + orgGroupID + "' ");
                        }
                    }

                    if (!string.IsNullOrEmpty(locID))
                    {
                        if (orgGroupID != "All")
                        {
                            sbSQL.Append(" AND DROP_OFF_LOCATION_ID LIKE '" + locID + "%' ");
                        }
                        else
                        {
                            sbSQL.Append(" WHERE DROP_OFF_LOCATION_ID LIKE '" + locID + "%' ");
                        }
                    }

                    if (!string.IsNullOrEmpty(locDesc))
                    {
                        if (orgGroupID != "All")
                        {
                            sbSQL.Append(" AND LOCATION_DESC LIKE '" + locDesc.ReplaceQuotesWithEmpty() + "%'");
                        }
                        else
                        {
                            sbSQL.Append(" WHERE LOCATION_DESC LIKE '" + locDesc.ReplaceQuotesWithEmpty() + "%'");
                        }
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }


                    var fields = new[] { "DROP_OFF_LOCATION_ID", "ORG_GROUP_ID", "LOCATION_DESC", "STATUS" };

                    var lstCostCostCenters = objContext.Database.DifferedExecuteQuery<MT_DELV_LOC_DETAILS>(fields, sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCostCostCenters.Count); }


                    return lstCostCostCenters;



                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }

        }

    }
}

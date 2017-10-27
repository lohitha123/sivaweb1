using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace AtPar.CartCount.Repos
{
    public class ProcessParametersRepository :  IProcessParametersRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor

        public ProcessParametersRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ProcessParametersRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the Carts Schedule Details
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="cartID"></param>
        /// <param name="bUnit"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> GetCartSchedules(string orgGroupID, string cartID, string bUnit)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT ORG_GROUP_ID, ORG_ID, PAR_LOC_ID, SCHEDULE_ID ");
                    sbSQL.Append("FROM MT_CRCT_PAR_LOC_SCHEDULE_DETAILS ");

                    if (!(string.IsNullOrEmpty(orgGroupID) && string.IsNullOrEmpty(bUnit) && string.IsNullOrEmpty(cartID)))
                    {
                        sbSQL.Append("WHERE ORG_GROUP_ID = '" + orgGroupID + "' ");
                    }

                    if (!(string.IsNullOrEmpty(bUnit) && string.IsNullOrEmpty(cartID)))
                    {
                        sbSQL.Append(" AND ORG_ID = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSQL.Append("AND PAR_LOC_ID LIKE '%" + cartID + "%'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstCartSchedules = objContext.Database.SqlQuery<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>(sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCartSchedules.Count); }


                    return lstCartSchedules;

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
        /// Gets the Schedule IDs
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <returns></returns>
        public List<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT ORG_GROUP_ID, SCHEDULE_ID, DESCRIPTION FROM MT_ATPAR_SCHEDULE_HEADER ");

                    if (orgGroupID != "All")
                    {
                        sbSQL.Append("WHERE ORG_GROUP_ID = '" + orgGroupID + "' ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "SCHEDULE_ID", "DESCRIPTION" };
                    var lstScheduleIds = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SCHEDULE_HEADER>(fields, sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstScheduleIds.Count); }

                    return lstScheduleIds;

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
        /// Allocates Cart Schedules
        /// </summary>
        /// <param name="lstCartSchedules"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="bUnit"></param>
        /// <returns></returns>
        public long AssignScheduleToCarts(List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> lstCartSchedules, string orgGroupID, string bUnit)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteCartSchedules(lstCartSchedules, orgGroupID, bUnit, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        lstCartSchedules.RemoveAll(x => x.CHK_VALUE == 0);

                        StatusCode = InsertCartSchedules(lstCartSchedules, orgGroupID, bUnit, objContext);

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
              
        /// <summary>
        /// Gets Carts allocated to User
        /// </summary>
        /// <param name="bUnit"></param>
        /// <param name="cartID"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public List<MT_CRCT_USER_ALLOCATION> GetUserCarts(string bUnit, string cartID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    int intUserGroupCount = GetLoggedInUserGroupsCount(userID);

                    sbSQL.Append("SELECT DISTINCT CART_ID, BUSINESS_UNIT FROM MT_CRCT_USER_ALLOCATION WHERE BUSINESS_UNIT = '" + bUnit + "' ");

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSQL.Append("AND CART_ID = '" + cartID + "' ");
                    }

                    if (intUserGroupCount > 0)
                    {
                        sbSQL.Append(" AND USER_ID IN (SELECT CLIENT_USER FROM MT_ATPAR_USER_GROUPS WHERE SERVER_USER='" + userID + "')");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "CART_ID", "BUSINESS_UNIT" };
                    var lstUserCarts = objContext.Database.DifferedExecuteQuery<MT_CRCT_USER_ALLOCATION>(fields, sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstUserCarts.Count); }

                    return lstUserCarts;

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
        /// Gets the Allocated Schedule Carts
        /// </summary>
        /// <param name="bUnit"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="cartID"></param>
        /// <returns></returns>
        public List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> GetAllocatedScheduleCarts(string bUnit, string orgGroupID, string cartID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT ORG_GROUP_ID, ORG_ID, PAR_LOC_ID, SCHEDULE_ID FROM ");
                    sbSQL.Append("MT_CRCT_PAR_LOC_SCHEDULE_DETAILS WHERE ORG_ID = '" + bUnit + "' AND ORG_GROUP_ID = '" + orgGroupID + "' ");

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSQL.Append(" AND PAR_LOC_ID = '" + cartID + "'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstAllocateSchCarts = objContext.Database.SqlQuery<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>(sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstAllocateSchCarts.Count); }

                    return lstAllocateSchCarts;
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

        #endregion

        #region Private Methods

        /// <summary>
        /// Deletes the Cart Schedules based on Org Group ID and BUnit
        /// </summary>
        /// <param name="lstCartSchedules"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="bUnit"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteCartSchedules(List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> lstCartSchedules, string orgGroupID, string bUnit, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstCartSchedules)
                {
                    sbSql.Clear();

                    sbSql.Append("DELETE FROM MT_CRCT_PAR_LOC_SCHEDULE_DETAILS WHERE ORG_GROUP_ID = '" + orgGroupID + "' AND ORG_ID = '" + bUnit + "' ");
                    sbSql.Append("AND PAR_LOC_ID = '" + item.PAR_LOC_ID + "'");


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
        /// Inserts Cart Schedule Details
        /// </summary>
        /// <param name="lstCartSchedules"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="bUnit"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertCartSchedules(List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> lstCartSchedules, string orgGroupID, string bUnit, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstCartSchedules)
                {
                    sbSql.Clear();

                    sbSql.Append("INSERT INTO MT_CRCT_PAR_LOC_SCHEDULE_DETAILS (ORG_GROUP_ID, ORG_ID, PAR_LOC_ID, ");
                    sbSql.Append("SCHEDULE_ID ) ");
                    sbSql.Append("VALUES ('" + orgGroupID + "','" + bUnit + "', '" + item.PAR_LOC_ID + "', ");
                    sbSql.Append("'" + item.SCHEDULE_ID + "' )");

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
        /// Gets the User Groups defined for the logged in user
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        private int GetLoggedInUserGroupsCount(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    int userGroupCount = objContext.MT_ATPAR_USER_GROUPS.Count(x => x.SERVER_USER == userID);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    return userGroupCount;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        #endregion

    }
}

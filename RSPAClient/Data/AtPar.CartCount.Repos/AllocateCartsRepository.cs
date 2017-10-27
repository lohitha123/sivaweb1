using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CartCount.Repos
{
    public class AllocateCartsRepository : IAllocateCartsRepository
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor 
        public AllocateCartsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AllocateCartsRepository));
        }

        #endregion 

        #region GetOrphanCarts
        public List<MT_CRCT_USER_ALLOCATION> GetOrphanCarts(string userID, string cartID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_CRCT_USER_ALLOCATION> lstOrphanCarts = new List<MT_CRCT_USER_ALLOCATION>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID, SHADOW_FLAG,DESCR FROM MT_CRCT_USER_ALLOCATION A,MT_ATPAR_USER B ");
                    sbSql.Append(" WHERE A.USER_ID ='" + userID + "'");
                    sbSql.Append(" and  A.USER_ID=B.USER_ID");
                    if (bUnit != "")
                    {
                        sbSql.Append(" AND A.BUSINESS_UNIT IN ('" + bUnit + "')");
                    }
                    else
                    {
                        sbSql.Append(" AND A.CART_ID LIKE '" + cartID + "%'");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "BUSINESS_UNIT", "CART_ID", "SHADOW_FLAG", "DESCR" };
                    lstOrphanCarts = objContext.Database.DifferedExecuteQuery<MT_CRCT_USER_ALLOCATION>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstOrphanCarts); }

                    return lstOrphanCarts;
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

        #region GetCarts
        public List<VM_MT_CRCT_USER_ALLOCATION> GetCartDetails(string cartID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            // List<MT_CRCT_USER_ALLOCATION> lstOrphanCarts = new List<MT_CRCT_USER_ALLOCATION>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID, SHADOW_FLAG,COUNT_BEFORE,");
                    sbSql.Append("DESCR, CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+ ' (' + A.USER_ID + ')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + ' (' + A.USER_ID + ')')  END AS USERNAME, ");
                    sbSql.Append("A.USER_ID,CART_COUNT_ORDER FROM MT_CRCT_USER_ALLOCATION A,MT_ATPAR_USER B ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + bUnit + "'");
                    sbSql.Append(" AND CART_ID ='" + cartID + "' AND A.USER_ID=B.USER_ID");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    // var fields = new[] { "USER_ID","BUSINESS_UNIT", "CART_ID", "SHADOW_FLAG", "COUNT_BEFORE","DESCR", "USERNAME" };

                    var lstOrphanCarts = objContext.Database.SqlQuery<VM_MT_CRCT_USER_ALLOCATION>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstOrphanCarts); }

                    return lstOrphanCarts;
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
        public int GetDay(string cartID, string bUnit, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DAY  FROM MT_CRCT_USER_SCHEDULE ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + bUnit + "' ");
                    sbSql.Append("AND CART_ID ='" + cartID + "' ");
                    sbSql.Append("AND USER_ID ='" + userID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var day = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + day); }

                    return day;
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

        #region GetSchedule
        public List<short> GetSchedule(string userID, string cartID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DAY FROM MT_CRCT_USER_SCHEDULE ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + bUnit + "'");
                    sbSql.Append(" AND CART_ID ='" + cartID + "' AND USER_ID ='" + userID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstdays = objContext.Database.SqlQuery<short>(sbSql.ToString()).ToList();

                    return lstdays;
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

        #region MoveCarts
        /// <summary>
        /// To move carts
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="seletedUserID"></param>
        /// <param name="cartID"></param>
        /// <param name="bUnit"></param>
        /// <param name="Desc"></param>
        /// <param name="cartCountOrder"></param>
        /// <param name="shadowFlag"></param>
        /// <param name="countBefore"></param>
        /// <param name="selectedDay"></param>
        /// <param name="all"></param>
        /// <returns></returns>
        public long MoveCarts(string userID, string seletedUserID, string cartID, string bUnit, string Desc,
                              int cartCountOrder, string shadowFlag, string countBefore, string selectedDay, bool all)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            bool cartAllocated;
            bool insertIntoUserSchedule;
            int noOfDays = 0;
            int count = 0;
            int userAllocatedDays = 0;
            int allocatedDays = 0;
            long statusCode;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            count = CheckCarts(seletedUserID, cartID, bUnit);
                        }
                        catch
                        {
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        if (count > 0)
                        {
                            cartAllocated = false;
                        }
                        else
                        {
                            cartAllocated = true;
                        }

                        string selectedDay1 = selectedDay.Replace(",", "','");
                        noOfDays = selectedDay1.Split(',').Length;
                        try
                        {
                            userAllocatedDays = CheckUserAllocatedDays(seletedUserID, cartID, bUnit);
                            allocatedDays = CheckDaysAllocated(seletedUserID, cartID, bUnit, selectedDay1);
                        }
                        catch
                        {
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        if ((userAllocatedDays == allocatedDays) && (allocatedDays == noOfDays))
                        {
                            insertIntoUserSchedule = false;
                        }
                        else
                        {
                            insertIntoUserSchedule = true;
                        }
                        if (all)
                        {
                            if (cartAllocated)
                            {
                                statusCode = InsertUserAllocation(seletedUserID, cartID, bUnit, Desc,
                                              cartCountOrder, shadowFlag, countBefore, objContext);

                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                            }
                            if (insertIntoUserSchedule)
                            {
                                statusCode = DeleteUserSchedule(seletedUserID, cartID, bUnit, objContext);
                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                                statusCode = InsertAllocateCarts(seletedUserID, cartID, bUnit, selectedDay, objContext);
                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                            }
                           
                        }
                        statusCode = DeleteUserSchedule(userID, cartID, bUnit, objContext);
                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }
                        statusCode = DeleteUserAllocation(userID, cartID, bUnit, objContext);
                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
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

        #region DeleteCarts
        /// <summary>
        /// To delete carts
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="cartID"></param>
        /// <param name="bUnit"></param>
        /// <returns></returns>
        public long DeleteCarts(string userID, string cartID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long statusCode;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        statusCode = DeleteUserSchedule(userID, cartID, bUnit, objContext);
                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }
                        statusCode = DeleteUserAllocation(userID, cartID, bUnit, objContext);
                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
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

        #region AllocateCarts
        /// <summary>
        /// To allocate Carts
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="seletedUserID"></param>
        /// <param name="cartID"></param>
        /// <param name="bUnit"></param>
        /// <param name="Desc"></param>
        /// <param name="cartCountOrder"></param>
        /// <param name="shadowFlag"></param>
        /// <param name="countBefore"></param>
        /// <param name="selectedDay"></param>
        /// <param name="all"></param>
        /// <returns></returns>
        public long AllocateCarts(string userID, string seletedUserID, string cartID, string bUnit, string Desc,
                              int cartCountOrder, string shadowFlag, string countBefore, string selectedDay, string all)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long statusCode;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        statusCode = DeleteUserAllocation(seletedUserID, cartID, bUnit, objContext);
                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }
                        statusCode = DeleteUserSchedule(seletedUserID, cartID, bUnit, objContext);
                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }
                        if (all == "TRUE")
                        {
                            statusCode = InsertUserAllocation(seletedUserID, cartID, bUnit, Desc,
                                              cartCountOrder, shadowFlag, countBefore, objContext);

                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
                            }
                            statusCode = InsertAllocateCarts(seletedUserID, cartID, bUnit, selectedDay, objContext);
                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
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

        #endregion

        #region CopyCarts
        /// <summary>
        /// To copy carts
        /// </summary>
        /// <param name="seletedUserID"></param>
        /// <param name="cartID"></param>
        /// <param name="bUnit"></param>
        /// <param name="Desc"></param>
        /// <param name="cartCountOrder"></param>
        /// <param name="shadowFlag"></param>
        /// <param name="countBefore"></param>
        /// <param name="selectedDay"></param>
        /// <param name="all"></param>
        /// <returns></returns>
        public long CopyCarts(string seletedUserID, string cartID, string bUnit, string Desc,
                              int cartCountOrder, string shadowFlag, string countBefore, string selectedDay, bool all)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            bool cartAllocated;
            bool insertIntoUserSchedule;
            int noOfDays = 0;
            int count = 0;
            int userAllocatedDays = 0;
            int allocatedDays = 0;
            long statusCode;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            count = CheckCarts(seletedUserID, cartID, bUnit);
                        }
                        catch
                        {
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        if (count > 0)
                        {
                            cartAllocated = false;
                        }
                        else
                        {
                            cartAllocated = true;
                        }

                        selectedDay = selectedDay.Replace(",", "','");
                        noOfDays = selectedDay.Split(',').Length;
                        try
                        {
                            userAllocatedDays = CheckUserAllocatedDays(seletedUserID, cartID, bUnit);
                            allocatedDays = CheckDaysAllocated(seletedUserID, cartID, bUnit, selectedDay);
                        }
                        catch
                        {
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        if ((userAllocatedDays == allocatedDays) && (allocatedDays == noOfDays))
                        {
                            insertIntoUserSchedule = false;
                        }
                        else
                        {
                            insertIntoUserSchedule = true;
                        }
                        if (all == true)
                        {
                            if (cartAllocated)
                            {
                                statusCode = InsertUserAllocation(seletedUserID, cartID, bUnit, Desc,
                                              cartCountOrder, shadowFlag, countBefore, objContext);

                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                            }
                            if (insertIntoUserSchedule)
                            {
                                statusCode = DeleteUserSchedule(seletedUserID, cartID, bUnit, objContext);
                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                                selectedDay = selectedDay.Replace("','", ",");
                                statusCode = InsertAllocateCarts(seletedUserID, cartID, bUnit, selectedDay, objContext);
                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
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

        #endregion

        #region Private Methods
        private int CheckCarts(string userID, string cartID, string bUnit)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append("SELECT COUNT(*) FROM MT_CRCT_USER_ALLOCATION ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + bUnit + "' ");
                    sbSql.Append("AND CART_ID ='" + cartID + "' ");
                    sbSql.Append("AND USER_ID ='" + userID + "'");
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Carts Count " + count); }
                    return count;

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
        private int CheckUserAllocatedDays(string userID, string cartID, string bUnit)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append("SELECT COUNT(DAY) FROM MT_CRCT_USER_SCHEDULE ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + bUnit + "' ");
                    sbSql.Append("AND CART_ID ='" + cartID + "' ");
                    sbSql.Append("AND USER_ID ='" + userID + "'");

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned User Allocated Days " + count); }
                    return count;

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
        private int CheckDaysAllocated(string userID, string cartID, string bUnit, string weekDay)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append("SELECT COUNT(DAY) FROM MT_CRCT_USER_SCHEDULE ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + bUnit + "' ");
                    sbSql.Append("AND CART_ID ='" + cartID + "' ");
                    sbSql.Append("AND USER_ID ='" + userID + "'");
                    sbSql.Append("AND DAY IN ('" + weekDay + "')");

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Days Allocated " + count); }
                    return count;

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
        private long InsertUserAllocation(string seletedUserID, string cartID, string bUnit, string Desc,
                                         int cartCountOrder, string shadowFlag, string countBefore, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var count = 0;
            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                sbSql.Append("INSERT INTO MT_CRCT_USER_ALLOCATION (BUSINESS_UNIT, CART_ID, DESCR, ");
                sbSql.Append("USER_ID, CART_COUNT_ORDER, SHADOW_FLAG, COUNT_BEFORE) ");
                sbSql.Append("VALUES ('" + bUnit + "', '" + cartID + "', '" + Desc + "','" + seletedUserID + "', ");
                sbSql.Append("'" + cartCountOrder + "', '" + shadowFlag + "', '" + countBefore + "') ");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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
        private long DeleteUserSchedule(string seletedUserID, string cartID, string bUnit, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var count = 0;
            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                sbSql.Append("DELETE FROM MT_CRCT_USER_SCHEDULE WHERE BUSINESS_UNIT = '" + bUnit + "' ");
                sbSql.Append("AND USER_ID='" + seletedUserID + "' ");
                sbSql.Append("AND CART_ID = '" + cartID + "' ");
                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

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
        private long DeleteUserAllocation(string seletedUserID, string cartID, string bUnit, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var count = 0;
            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                sbSql.Append("DELETE FROM MT_CRCT_USER_ALLOCATION WHERE BUSINESS_UNIT = '" + bUnit + "' ");
                sbSql.Append("AND USER_ID='" + seletedUserID + "' ");
                sbSql.Append("AND CART_ID = '" + cartID + "' ");
                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

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
        private long InsertAllocateCarts(string seletedUserID, string cartID, string bUnit, string selectedDay, ATPAR_MT_Context objContext)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;
            string strSql = string.Empty;
            try
            {
                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                SqlParameter pBUnit = new SqlParameter("@BUSINESS_UNIT", SqlDbType.VarChar, 10);
                pBUnit.Value = bUnit;

                SqlParameter pcartID = new SqlParameter("@CART_ID", SqlDbType.VarChar, 50);
                pcartID.Value = cartID;

                SqlParameter pUserID = new SqlParameter("@USER_ID", SqlDbType.VarChar, 20);
                pUserID.Value = seletedUserID;

                SqlParameter pDay = new SqlParameter("@Day", SqlDbType.VarChar,50);
                pDay.Value = selectedDay;

                SqlParameter pStatusCode = new SqlParameter("@StatusCode", SqlDbType.Int);
                pStatusCode.Direction = ParameterDirection.Output;

                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                 strSql = "DECLARE @P1 INT " +
                                "DECLARE @StatusCode INT " +
                                "SET @P1 = 0 " +
                                "exec SP_SENDALLOCATECARTS " +
                                "'" + pBUnit.Value + "', " +
                                "'" + pcartID.Value + "'," +
                                "'" + pUserID.Value + "'," +
                                "'" + pDay.Value + "', " +
                                "@StatusCode OUTPUT " +
                                "SELECT @P1  = @StatusCode PRINT @P1 ";
                var count = objContext.Database.ExecuteSqlCommand(strSql);
                // statusCode = long.Parse(pStatusCode.Value.ToString());
                var code = pStatusCode.Value;


                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }



                return statusCode;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + strSql); }
                throw ex;
            }
            finally
            {
                strSql = string.Empty;
            }
        }

        #endregion
    }
}

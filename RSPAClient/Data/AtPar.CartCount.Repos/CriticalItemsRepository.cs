using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CartCount.Repos
{
    public class CriticalItemsRepository : ICriticalItemsRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor

        public CriticalItemsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CriticalItemsRepository));
        }

        #endregion

        #region Public Methods

        #region AllocateCartItemInfo
        public long DeleteCriticalItems(string bUnit, string cartID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_CRCT_CRITICAL_ITEMS ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + bUnit + "'");
                    sbSql.Append(" AND CART_ID = '" + cartID + "'");

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

        public long CreateCriticalItem(string bUnit, string cartID, string itemID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_CRCT_CRITICAL_ITEMS (BUSINESS_UNIT, CART_ID, ITEM_ID)");
                    sbSql.Append("VALUES ('" + bUnit + "','" + cartID + "', '" + itemID + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
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

        #endregion

        #region GetCartItemInfo
        public List<MT_CRCT_CRITICAL_ITEMS> GetCriticalItems(string bUnit, string cartID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID, ITEM_ID ");
                    sbSql.Append("FROM  MT_CRCT_CRITICAL_ITEMS WHERE BUSINESS_UNIT = '" + bUnit + "'");
                    sbSql.Append(" AND CART_ID = '" + cartID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstCriticalItems = objContext.Database.SqlQuery<MT_CRCT_CRITICAL_ITEMS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCriticalItems); }

                    return lstCriticalItems;
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
                
        public long Check_CartAllocation(string userID, string bUnit, string cartID, DateTime currentDay)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            int dayOfWeek = (int)DateTime.Now.DayOfWeek;
            dayOfWeek = dayOfWeek == 0 ? 7 : dayOfWeek;
            DateTime startOfWeek = DateTime.Now.AddDays(1 - (int)DateTime.Now.DayOfWeek);
            var intDayValue = DateTime.Now.DayOfWeek - startOfWeek.DayOfWeek;


            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT  A.CART_ID FROM MT_CRCT_USER_ALLOCATION A, MT_CRCT_USER_SCHEDULE B  ");
                    sbSql.Append("WHERE A.BUSINESS_UNIT = B.BUSINESS_UNIT AND A.CART_ID = B.CART_ID  ");
                    sbSql.Append("AND A.USER_ID = B.USER_ID AND A.USER_ID='" + userID + "' AND  ");
                    sbSql.Append("B.DAY = " + intDayValue + 1 + " AND A.CART_ID = '" + cartID + "' ");
                    sbSql.Append("AND A.BUSINESS_UNIT = '" + bUnit + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + count); }

                    if (count > 0)
                    {
                        return AtparStatusCodes.CRCT_S_NOACCESSTOCART;
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        // Need to check what is the use of this function
        public long UpdateTransaction(AtPar_Transaction_Entity transactionDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_TRANSACTION SET STATUS = " + transactionDetails.Status + "  ");
                    sbSql.Append(", UPDATE_DT_TIME= GetDate() ");

                    if (transactionDetails.StartDateTime != null)
                    {
                        //if(transactionDetails.StartDateTime.ToString().Length > 0)
                        //{
                        if (transactionDetails.StartDateTime != DateTime.MinValue)
                        {
                            sbSql.Append(",START_DT_TIME=' ");
                            sbSql.Append("transactionDetails.StartDateTime ");
                            sbSql.Append("'");
                        }
                        //}
                    }

                    //if(transactionDetails.StartDateTime.ToString().Length > 0)
                    //{

                    if (transactionDetails.EndDateTime != null)
                    {
                        if (transactionDetails.EndDateTime != DateTime.MinValue)
                        {
                            sbSql.Append(",END_DT_TIME='" + transactionDetails.EndDateTime + "'  ");
                        }
                    }
                    //}

                    sbSql.Append(", USER_ID='" + transactionDetails.UserId + "' ");

                    if (transactionDetails.TotalRecordSent != 0)
                    {
                        sbSql.Append(" ,TOTAL_REC_SENT= " + transactionDetails.TotalRecordSent + " ");
                    }
                    if (transactionDetails.StatusCode != 0)
                    {
                        sbSql.Append(",STATUS_CODE= " + transactionDetails.StatusCode + " ");
                    }
                    if (transactionDetails.Description.Length > 0)
                    {
                        sbSql.Append(",DESCR= '" + transactionDetails.Description + "' ");
                    }
                    sbSql.Append(", SCANS_COUNT=" + transactionDetails.ScansCount + "");

                    if (transactionDetails.ReportData3.Length > 0)
                    {
                        sbSql.Append(",REPORT_DATA_3= '" + transactionDetails.ReportData3 + "' ");
                    }
                    if (transactionDetails.ReportData8.Length > 0)
                    {
                        sbSql.Append(",REPORT_DATA_8= '" + transactionDetails.ReportData8 + "' ");
                    }
                    if (transactionDetails.ReportData9 != null)
                    {
                        if (transactionDetails.ReportData9.Length > 0)
                        {
                            sbSql.Append(",REPORT_DATA_9= '" + transactionDetails.ReportData9 + "' ");
                        }
                    }
                    if (transactionDetails.ReportData10 != null)
                    {
                        if (transactionDetails.ReportData10.Length > 0)
                        {
                            sbSql.Append(",REPORT_DATA_10= '" + transactionDetails.ReportData10 + "' ");
                        }
                    }

                    sbSql.Append(" WHERE TRANSACTION_ID=" + transactionDetails.TransactionId + " AND ");
                    sbSql.Append(" APP_ID=" + transactionDetails.ApplicationId + "");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }



                    return AtparStatusCodes.ATPAR_OK;
                }

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


        #endregion

        #region GetCartBunitsInfo
        public int GetUserGroupsCount(int appID, string serverUser)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            
            int cnt = -1;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                                    
                    cnt = objContext.MT_ATPAR_USER_GROUPS.Count(c => c.APP_ID == appID && c.SERVER_USER == serverUser);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY )); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + cnt); }

                    return cnt;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
          
        }

        public List<MT_CRCT_USER_ALLOCATION> GetUserAllocatedCarts(string appID, string serverUser, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT CART_ID AS CRTID, BUSINESS_UNIT, ");
                    sbSql.Append("CASE WHEN DESCR IS NULL THEN '' ELSE DESCR END AS CART_ID ");
                    sbSql.Append(" FROM MT_CRCT_USER_ALLOCATION  WHERE USER_ID IN (SELECT CLIENT_USER");
                    sbSql.Append(" FROM MT_ATPAR_USER_GROUPS WHERE APP_ID = " + appID);
                    sbSql.Append(" AND SERVER_USER = '" + serverUser + "') ");
                    sbSql.Append(" AND BUSINESS_UNIT = '" + bUnit + "' ORDER BY BUSINESS_UNIT , CRTID ASC");


                    var fields = new[] { "CRTID", "BUSINESS_UNIT", "DESCR", "CART_ID" };

                    var lstUsersGroups = objContext.Database.DifferedExecuteQuery<MT_CRCT_USER_ALLOCATION>(fields, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstUsersGroups); }

                    return lstUsersGroups;

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

        public List<MT_CRCT_USER_ALLOCATION> GetBUnitAllocatedCarts(string bUnit, string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT CART_ID AS CRTID , BUSINESS_UNIT, CASE ");
                    sbSql.Append("WHEN DESCR IS NULL THEN '' ELSE DESCR END AS CART_ID ");
                    sbSql.Append("FROM MT_CRCT_USER_ALLOCATION WHERE BUSINESS_UNIT IN (SELECT BUSINESS_UNIT ");
                    sbSql.Append("FROM MT_ATPAR_ORG_GROUP_BUNITS ");

                    if (orgGroupID != "All")
                    {
                        sbSql.Append(" WHERE ORG_GROUP_ID = '" + orgGroupID + "'");
                    }
                    sbSql.Append(") AND BUSINESS_UNIT = '" + bUnit + "' ORDER BY BUSINESS_UNIT , CRTID ASC");


                    var fields = new[] { "CRTID", "BUSINESS_UNIT", "DESCR", "CART_ID" };

                    var lstOrgGroups = objContext.Database.DifferedExecuteQuery<MT_CRCT_USER_ALLOCATION>(fields, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstOrgGroups); }

                    return lstOrgGroups;
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

        #endregion
    }
}

using AtPar.Repository.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using System.Data.Entity;
using AtPar.ViewModel;
using System.Collections;

namespace AtPar.TrackIT.Repos
{
    public class RequestStatusRepository : IRequestStatusRepository
    {
        private ILog _log;

        public RequestStatusRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(InactivateItemsRepository));
        }

        #region Request Status        

        public long UpdateOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails, List<TKIT_ORDER_DETAILS> updateOrderDetails, string userID, string serverUserID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        if (lstOrderDetails.Count > 0)
                        {
                            foreach (var item in lstOrderDetails)
                            {
                                sbSql.Clear();
                                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                                if (item.CHK_VALUE == "1")
                                {
                                    sbSql.Append(" UPDATE TKIT_ORDER_DETAILS");
                                    sbSql.Append(" SET DELIVER_ITEM_STATUS ='" + AtParWebEnums.enum_TKIT_OrderStatus.Cancelled.ToString().ToUpper() + "',");
                                    sbSql.Append(" CANCEL_DATE = '" + DateTime.Now.ToString() + "'");
                                    sbSql.Append(" WHERE ORDER_NUMBER = " + item.ORDER_NUMBER + "");
                                    sbSql.Append(" AND ORDER_LINE_NUMBER = " + item.ORDER_LINE_NUMBER + "");

                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                    }

                                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated for Order Line No " + item.ORDER_LINE_NUMBER); }
                                    var OrderCancelledRecords = objContext.TKIT_ORDER_DETAILS.ToList().Where(x=>x.ORDER_NUMBER== item.ORDER_NUMBER&&x.DELIVER_ITEM_STATUS == AtParWebEnums.enum_TKIT_OrderStatus.Cancelled.ToString().ToUpper());
                                    if(OrderCancelledRecords!=null)
                                    {
                                        var orderNoTotalRecords = objContext.TKIT_ORDER_DETAILS.ToList().Where(x => x.ORDER_NUMBER == item.ORDER_NUMBER);

                                        if (orderNoTotalRecords!=null&& orderNoTotalRecords.ToList().Count() == OrderCancelledRecords.ToList().Count())
                                        {
                                            var tkitOrderHeader = objContext.TKIT_ORDER_HEADER.Where(x => x.ORDER_NUMBER == item.ORDER_NUMBER);
                                            if(tkitOrderHeader!=null&& tkitOrderHeader.ToList().Count>0)
                                            {
                                                tkitOrderHeader.ToList().FirstOrDefault().ORDER_STATUS = AtParWebEnums.enum_TKIT_OrderStatus.Cancelled.ToString().ToUpper();
                                                objContext.SaveChanges();
                                            }
                                        }
                                    }
                                   
                                }else  if (item.DELIVER_ITEM_STATUS == AtParWebEnums.ItemStatus_Enum.DELV.ToString())
                                {
                                    long StatusCode = UpdateOrderDetails(item.ESTIMATED_RETURN_DATE.ToString(), item.ORDER_NUMBER,
                                                                         item.ORDER_LINE_NUMBER, objContext);

                                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return StatusCode;
                                    }
                                }
                            }
                        }

                        if (updateOrderDetails.Count > 0)
                        {
                            foreach (var item in updateOrderDetails)
                            {
                                long StatusCode = UpdateOrderDetails(item.ESTIMATED_RETURN_DATE.ToString(), item.ORDER_NUMBER,
                                                                                                        item.ORDER_LINE_NUMBER, objContext);

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
            finally
            {
                sbSql = null;
            }
        }

        private long UpdateOrderDetails(string estimatedReturnDate, int orderNo, int orderLineNo, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" UPDATE TKIT_ORDER_DETAILS");
                sbSql.Append(" SET ESTIMATED_RETURN_DATE = '" + estimatedReturnDate + "'");
                sbSql.Append(" WHERE ORDER_NUMBER = " + orderNo + "");
                sbSql.Append(" AND ORDER_LINE_NUMBER = " + orderLineNo + "");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }

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

        public int GetStatusFromDetailTransaction(int orderNumber, int orderLineNo)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var transactionDetails = objContext.MT_ATPAR_DETAIL_TRANSACTION.Where(c => c.KEY_3 == orderNumber.ToString()
                                                                            && c.KEY_4 == orderLineNo.ToString()).FirstOrDefault();
                    if (transactionDetails != null)
                    {
                        if (transactionDetails.STATUS != null)
                        {
                            return Convert.ToInt32(transactionDetails.STATUS);
                        }
                        else
                        {
                            return 0;
                        }
                    }
                    else
                    {
                        return 0;
                    }

                    // return status.Value;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        public List<VM_TKIT_ORDER_DETAILS> GetOrderDetails(string requestID, string status, string deptID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (status == AtParWebEnums.enum_TKIT_OrderStatus.Pick.ToString()
                        || status == AtParWebEnums.enum_TKIT_OrderStatus.Load.ToString() ||
                         status == AtParWebEnums.enum_TKIT_OrderStatus.Unload.ToString())
                    {
                        sbSQL.Append(" SELECT 0 AS CHK_VALUE, A.ORDER_NUMBER, B.ORDER_LINE_NUMBER, ORDER_DATE, B.DELIVER_ITEM_STATUS,");
                        sbSQL.Append(" B.ITEM_ID, REQUEST_QTY, LOCATION_ID, ESTIMATED_RETURN_DATE, B.ITEM_DESCR,");
                        sbSQL.Append(" A.ORDER_COMMENTS , C.IMAGE, D.ITEM_TYPE_INDICATOR, E.STATUS");
                        sbSQL.Append(" FROM TKIT_ORDER_HEADER A, TKIT_ORDER_DETAILS B, TKIT_ITEM_MASTER C,");
                        sbSQL.Append(" TKIT_ITEM_TYPE D, MT_ATPAR_DETAIL_TRANSACTION E");
                        sbSQL.Append(" WHERE  C.ITEM_ID = B.ITEM_ID");
                        sbSQL.Append(" AND C.ITEM_TYPE = D.ITEM_TYPE");
                        sbSQL.Append(" AND A.ORDER_NUMBER = B.ORDER_NUMBER");
                        sbSQL.Append(" AND A.ORDER_NUMBER =E.KEY_3");
                        sbSQL.Append(" AND B.ORDER_LINE_NUMBER = E.KEY_4");
                        sbSQL.Append(" AND A.ORDER_NUMBER = '" + deptID + "'");

                        if (status == AtParWebEnums.enum_TKIT_OrderStatus.Pick.ToString())
                        {
                            sbSQL.Append(" AND E.STATUS =20 ");
                        }
                        else if (status == AtParWebEnums.enum_TKIT_OrderStatus.Load.ToString())
                        {
                            sbSQL.Append(" AND E.STATUS =30 ");
                        }
                        else if (status == AtParWebEnums.enum_TKIT_OrderStatus.Unload.ToString())
                        {
                            sbSQL.Append(" AND E.STATUS =40 ");
                        }
                    }
                    else
                    {
                        sbSQL.Append(" SELECT 0 AS CHK_VALUE, A.ORDER_NUMBER,");
                        sbSQL.Append(" B.ORDER_LINE_NUMBER,");
                        sbSQL.Append(" ORDER_DATE, ");
                        sbSQL.Append(" B.DELIVER_ITEM_STATUS,");
                        sbSQL.Append(" B.ITEM_ID,");
                        sbSQL.Append(" REQUEST_QTY,");
                        sbSQL.Append(" LOCATION_ID,");
                        sbSQL.Append("CONVERT(NVARCHAR,ESTIMATED_RETURN_DATE,101)ESTIMATED_RETURN_DATE,");
                        sbSQL.Append(" B.ITEM_DESCR,");
                        sbSQL.Append(" A.ORDER_COMMENTS,");
                        sbSQL.Append(" C.IMAGE,");
                        sbSQL.Append(" D.ITEM_TYPE_INDICATOR");
                        sbSQL.Append(" FROM TKIT_ORDER_HEADER A, TKIT_ORDER_DETAILS B, TKIT_ITEM_MASTER C, TKIT_ITEM_TYPE D");
                        sbSQL.Append(" WHERE C.ITEM_ID = B.ITEM_ID");
                        sbSQL.Append(" AND C.ITEM_TYPE = D.ITEM_TYPE");
                        sbSQL.Append(" AND A.ORDER_NUMBER = B.ORDER_NUMBER");
                        sbSQL.Append(" AND A.ORDER_NUMBER = '" + deptID + "'");

                        if (status != "All")
                        {
                            sbSQL.Append("  AND B.DELIVER_ITEM_STATUS = '" + status + "'");
                        }

                    }
                  
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fileds = new[] { "CHK_VALUE", "ORDER_NUMBER", "ORDER_LINE_NUMBER", "ORDER_DATE", "DELIVER_ITEM_STATUS", "ITEM_ID", "REQUEST_QTY", "LOCATION_ID", "ESTIMATED_RETURN_DATE", "ITEM_DESCR", "ORDER_COMMENTS", "IMAGE", "ITEM_TYPE_INDICATOR" };
                    var lstOrderDetails = objContext.Database.DifferedExecuteQuery<VM_TKIT_ORDER_DETAILS>(fileds, sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstOrderDetails.Count); }

                    return lstOrderDetails;
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

        public List<VM_TKIT_ORDER_DETAILS> GetOrderIDs(string fromDate, string toDate, string status, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();
            List<VM_TKIT_ORDER_DETAILS> lstOrderDetails;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (status == AtParWebEnums.enum_TKIT_OrderStatus.All.ToString())
                    {
                        sbSQL.Append(" SELECT ORDER_NUMBER, ORDER_DATE");
                        sbSQL.Append(" FROM TKIT_ORDER_HEADER");
                        sbSQL.Append(" WHERE ORDER_DATE >= CONVERT(DATETIME,'" + fromDate + "',101)");
                        sbSQL.Append(" AND ORDER_DATE <= DATEADD(DAY,1,CONVERT(DATETIME, '" + toDate + "',101))");
                        sbSQL.Append(" AND REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");
                        sbSQL.Append(" ORDER BY ORDER_NUMBER ");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        var fileds = new[] { "ORDER_NUMBER", "ORDER_DATE" };
                        var result = objContext.Database.DifferedExecuteQuery<VM_TKIT_ORDER_DETAILS>(fileds, sbSQL.ToString()).ToList();
                        return result;

                    }
                    else if (status == AtParWebEnums.enum_TKIT_OrderStatus.Open.ToString() ||
                            status == AtParWebEnums.enum_TKIT_OrderStatus.Cancelled.ToString() ||
                            status == AtParWebEnums.enum_TKIT_OrderStatus.Delivered.ToString())
                    {
                        sbSQL.Append(" SELECT DISTINCT(A.ORDER_NUMBER), B.ITEM_ID,  A.ORDER_DATE");//B.ORDER_LINE_NUMBER,
                        sbSQL.Append(" FROM TKIT_ORDER_HEADER A, TKIT_ORDER_DETAILS B");
                        sbSQL.Append(" WHERE A.ORDER_NUMBER = B.ORDER_NUMBER");
                        sbSQL.Append(" AND A.ORDER_DATE >= CONVERT(DATETIME,'" + fromDate + "',101)");
                        sbSQL.Append(" AND A.ORDER_DATE <= DATEADD(DAY,1,CONVERT(DATETIME, '" + toDate + "',101))");
                        sbSQL.Append(" AND A.REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");

                        if (status == AtParWebEnums.enum_TKIT_OrderStatus.Open.ToString())
                        {
                            sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = '" + AtParWebEnums.enum_TKIT_OrderStatus.Open.ToString().ToUpper() + "'");
                        }
                        else if (status == AtParWebEnums.enum_TKIT_OrderStatus.Cancelled.ToString())
                        {
                            sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = '" + AtParWebEnums.enum_TKIT_OrderStatus.Cancelled.ToString().ToUpper() + "'");
                        }
                        else if (status == AtParWebEnums.enum_TKIT_OrderStatus.Delivered.ToString())
                        {
                            sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = 'DELV'");
                        }

                        sbSQL.Append(" ORDER BY A.ORDER_NUMBER");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        var fileds = new[] { "ORDER_NUMBER", "ITEM_ID", "ORDER_DATE" };
                        var result = objContext.Database.DifferedExecuteQuery<VM_TKIT_ORDER_DETAILS>(fileds, sbSQL.ToString()).ToList();

                        return result;

                    }
                    else if (status == AtParWebEnums.enum_TKIT_OrderStatus.Pick.ToString() ||
                             status == AtParWebEnums.enum_TKIT_OrderStatus.Load.ToString() ||
                             status == AtParWebEnums.enum_TKIT_OrderStatus.Unload.ToString())
                    {
                        sbSQL.Append(" SELECT DISTINCT(A.KEY_3) AS ORDER_NUMBER, B.ORDER_DATE");
                        sbSQL.Append(" FROM MT_ATPAR_DETAIL_TRANSACTION A, TKIT_ORDER_HEADER B");
                        sbSQL.Append(" WHERE A.KEY_3 = B.ORDER_NUMBER");
                        sbSQL.Append(" AND B.ORDER_DATE >= CONVERT(DATETIME,'" + fromDate + "',101) ");
                        sbSQL.Append(" AND B.ORDER_DATE <= DATEADD(DAY,1,CONVERT(DATETIME, '" + toDate + "' ,101)) ");
                        sbSQL.Append(" AND B.REQUESTOR_ID='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");
                        sbSQL.Append(" AND A.APP_ID = 9");

                        if (status == AtParWebEnums.enum_TKIT_OrderStatus.Pick.ToString())
                        {
                            sbSQL.Append(" AND A.STATUS = 20");
                        }
                        else if (status == AtParWebEnums.enum_TKIT_OrderStatus.Load.ToString())
                        {
                            sbSQL.Append(" AND A.STATUS = 30");
                        }
                        else if (status == AtParWebEnums.enum_TKIT_OrderStatus.Unload.ToString())
                        {
                            sbSQL.Append(" AND A.STATUS = 40 ");
                        }

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        var fileds = new[] { "ORDER_NUMBER", "ITEM_ID", "ORDER_DATE" };
                        var result = objContext.Database.DifferedExecuteQuery<VM_TKIT_ORDER_DETAILS>(fileds, sbSQL.ToString()).ToList();

                        return result;

                    }


                }

                return null;
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

        #region Dash Board

        /// <summary>
        /// Used to get the orders
        /// </summary>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public List<TKIT_ORDER_HEADER> GetOrdersForDashboard(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT A.ORG_GROUP_ID, A.ORDER_NUMBER, ORDER_DATE, ORDER_STATUS, ORDER_COMMENTS, COUNT(ORDER_LINE_NUMBER) AS ITEM_COUNT ");
                    sbSQL.Append("FROM TKIT_ORDER_HEADER A, TKIT_ORDER_DETAILS B ");
                    sbSQL.Append("WHERE A.ORG_GROUP_ID = B.ORG_GROUP_ID AND A.ORDER_NUMBER = B.ORDER_NUMBER ");
                    sbSQL.Append("AND REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "' ");
                    sbSQL.Append("GROUP BY A.ORG_GROUP_ID, A.ORDER_NUMBER, ORDER_DATE, ORDER_STATUS, ORDER_COMMENTS ");
                    sbSQL.Append("ORDER BY A.ORDER_NUMBER, ORDER_DATE");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fileds = new[] { "ORG_GROUP_ID", "ORDER_NUMBER", "ORDER_DATE", "ORDER_STATUS" , "ORDER_COMMENTS", "ITEM_COUNT" };
                    var result = objContext.Database.DifferedExecuteQuery<TKIT_ORDER_HEADER>(fileds, sbSQL.ToString()).ToList();

                    return result;
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

        public List<TKIT_ORDER_DETAILS> GetOrderDetailsForDashboard(int orderNumber)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT A.ITEM_ID, A.ITEM_DESCR, REQUEST_QTY, LOCATION_ID, DELIVER_ITEM_STATUS, B.IMAGE ");
                    sbSQL.Append("FROM TKIT_ORDER_DETAILS A, TKIT_ITEM_MASTER B ");
                    sbSQL.Append("WHERE A.ORG_GROUP_ID = B.ORG_GROUP_ID ");
                    sbSQL.Append("AND A.ITEM_ID = B.ITEM_ID ");
                    sbSQL.Append("AND A.ORDER_NUMBER = " + orderNumber + " ");
                     

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fileds = new[] { "ITEM_ID", "ITEM_DESCR", "REQUEST_QTY", "LOCATION_ID", "DELIVER_ITEM_STATUS", "IMAGE" };
                    var result = objContext.Database.DifferedExecuteQuery<TKIT_ORDER_DETAILS>(fileds, sbSQL.ToString()).ToList();

                    return result;
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

    }
}

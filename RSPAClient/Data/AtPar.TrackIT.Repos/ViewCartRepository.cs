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
using AtPar.Repository.Interfaces.Common;
using System.Data;

namespace AtPar.TrackIT.Repos
{
    public class ViewCartRepository : IViewCartRepository
    {
        #region Private Variable

        private ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        public ViewCartRepository(ILog log, ICommonRepository commonRepository)
        {
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ViewCartRepository));
        }

        #region Clear Cart

        public long ClearCart(string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" DELETE FROM TKIT_CART_MANAGER");
                    sbSql.Append(" WHERE REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
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

        public long DeleteCartItem(int id)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM TKIT_CART_MANAGER ");
                    sbSql.Append("WHERE ID = " + id + "");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
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

        #endregion

        #region Place Order

        public Tuple<long, string> PlaceOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails, string comments, string requrestID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<long, string> tupleOutput = null;

            try
            {
                string orderID = _commonRepo.GetAtparLatestValues((int)AtParWebEnums.EnumApps.TrackIT, "ORDER_NUMBER").ToString();

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        
                        StatusCode = InsertOrderHeader(orderID, comments, deviceTokenEntry, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            tupleOutput = new Tuple<long, string>(StatusCode, (orderID));
                            return tupleOutput;
                        }

                        StatusCode = InsertOrderDetails(lstOrderDetails, orderID, deviceTokenEntry, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            tupleOutput = new Tuple<long, string>(StatusCode, (orderID));
                            return tupleOutput;
                        }

                        if (lstOrderDetails.Count > 0)
                        {
                            StatusCode = DeleteFromCartManager(deviceTokenEntry, objContext);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                tupleOutput = new Tuple<long, string>(StatusCode,(orderID));
                                return tupleOutput;
                            }
                        }

                        trans.Commit();
                        tupleOutput = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK,( orderID));
                        return tupleOutput;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR,null);
                return tupleOutput;
            }

        }

        private long DeleteFromCartManager(string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" DELETE FROM TKIT_CART_MANAGER");
                sbSql.Append(" WHERE REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");

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

        private long InsertOrderHeader(string orderID, string comments, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                sbSql.Clear();

                sbSql.Append(" INSERT INTO TKIT_ORDER_HEADER(");
                sbSql.Append(" ORG_GROUP_ID,");
                sbSql.Append(" ORDER_NUMBER,");
                sbSql.Append(" ORDER_DATE,");
                sbSql.Append(" REQUESTOR_ID,");
                sbSql.Append(" ORDER_STATUS,");
                sbSql.Append(" ORDER_COMMENTS )");
                sbSql.Append(" VALUES (");
                sbSql.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() + "',");
                sbSql.Append("'" + orderID + "', ");
                sbSql.Append("'" + DateTime.Now + "', ");
                sbSql.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "', ");
                sbSql.Append("'" + AtParWebEnums.enum_TKIT_OrderStatus.Open.ToString().ToUpper() + "', ");
                sbSql.Append("'" + comments + "')");

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

        private long InsertOrderDetails(List<TKIT_ORDER_DETAILS> lstOrderDetails, string orderID, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                for (int intCount = 0; intCount < lstOrderDetails.Count; intCount++)
                {
                    sbSql.Append(" INSERT INTO TKIT_ORDER_DETAILS(");
                    sbSql.Append(" ORG_GROUP_ID,");
                    sbSql.Append(" ORDER_NUMBER,");
                    sbSql.Append(" ORDER_LINE_NUMBER,");
                    sbSql.Append(" PATIENT_ID,");
                    sbSql.Append(" ITEM_ID,");
                    sbSql.Append(" ITEM_DESCR,");
                    sbSql.Append(" REQUEST_QTY,");
                    sbSql.Append(" LOCATION_ID,");
                    sbSql.Append(" REQUEST_FOR_USE_DATE,");
                    sbSql.Append(" ESTIMATED_RETURN_DATE,");
                    sbSql.Append(" DELIVER_ITEM_STATUS,");
                    sbSql.Append(" NEEDED_BY_DATE,");
                    sbSql.Append(" PATIENT_LAST_NAME,");
                    sbSql.Append(" PROCEDURE_CODE");
                    sbSql.Append(") VALUES(");
                    sbSql.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() + "',");
                    sbSql.Append("'" + orderID + "',");
                    sbSql.Append("" + intCount + 1 + ",");
                    sbSql.Append("'" + lstOrderDetails[intCount].PATIENT_ID + "', ");
                    sbSql.Append("'" + lstOrderDetails[intCount].ITEM_ID + "', ");
                    sbSql.Append("'" + lstOrderDetails[intCount].ITEM_DESCR.Replace("'", "''") + "', ");

                    if (lstOrderDetails[intCount].REQUEST_QTY.ToString() != "")
                    {
                        sbSql.Append(lstOrderDetails[intCount].REQUEST_QTY + ", ");
                    }
                    else
                    {
                        sbSql.Append(1 + ", ");
                    }

                    sbSql.Append("'" + lstOrderDetails[intCount].LOCATION_ID + "', NULL, ");

                    if (lstOrderDetails[intCount].ESTIMATED_RETURN_DATE.ToString() != "")
                    {
                        sbSql.Append("'" + lstOrderDetails[intCount].ESTIMATED_RETURN_DATE + "', ");
                    }
                    else
                    {
                        sbSql.Append("NULL, ");
                    }

                    sbSql.Append("'" + AtParWebEnums.enum_TKIT_OrderStatus.Open.ToString() + "', ");

                    if (lstOrderDetails[intCount].NEEDED_BY_DATE.ToString() != "")
                    {
                        sbSql.Append("'" + lstOrderDetails[intCount].NEEDED_BY_DATE + "', ");
                    }
                    else
                    {
                        sbSql.Append("NULL, ");
                    }
                    
                    sbSql.Append("'" + lstOrderDetails[intCount].PATIENT_LAST_NAME + "', ");
                    sbSql.Append("'" + lstOrderDetails[intCount].PROCEDURE_CODE + "')");
                }



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

        #endregion

        #region Count of Items

        public long GetRequestedItemsCount(string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT SUM(REQUEST_QTY)FROM TKIT_CART_MANAGER ");
                    sbSql.Append(" WHERE ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() + "' ");
                    sbSql.Append(" AND REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "' ");                  

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var sumQty = objContext.Database.SqlQuery<int>(sbSql.ToString()).ToList().FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Items ordered " + sumQty); }

                    return sumQty;
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

        public string GetVendorEmail(string vendorID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT  CONTACT_E_MAIL  FROM PAR_MNGT_VENDOR WHERE ");
                    sbSql.Append("VENDOR_ID = '" + vendorID + "' AND ORG_GROUP_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "' ");
                    sbSql.Append("AND STATUS = 0");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var strRetVal = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + strRetVal.ToString()); }

                    return strRetVal;
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

        public List<TKIT_REQUESTOR_DEPT> GetRequestorDepts(string requestorID, string OrgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT  DEPT_ID  FROM TKIT_REQUESTOR_DEPT WHERE ");
                    sbSql.Append("REQUESTOR_ID = '" + requestorID + "' AND ORG_GROUP_ID ='" + OrgGrpID + "' ");
                  
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "DEPT_ID" };

                    var lstReqDepts = objContext.Database.DifferedExecuteQuery<TKIT_REQUESTOR_DEPT>(fields, sbSql.ToString()).ToList();

                   // var strRetVal = objContext.Database.SqlQuery<TKIT_REQUESTOR_DEPT>(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Departments Count " + lstReqDepts.Count()); }

                    return lstReqDepts;
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

        public string GetRequestorOrgGroup(string OrgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT  ORG_GROUP_NAME  FROM MT_ATPAR_ORG_GROUPS WHERE ");
                    sbSql.Append("ORG_GROUP_ID ='" + OrgGrpID + "' ");
                    

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var strRetVal = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + strRetVal.ToString()); }

                    return strRetVal;
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

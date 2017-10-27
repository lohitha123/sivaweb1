using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Repos
{
    public class CreateOrdersRepository : ICreateOrdersRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor
        public CreateOrdersRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CreateOrdersRepository));
        }
        #endregion

        #region Public Methods

        #region GetBUnits_Carts
        public List<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, string[] deviceTokenEntry, string locationType = "", string cartType = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT  CART_ID, BUSINESS_UNIT, A.LOCATION_TYPE ");
                    sbSql.Append("FROM MT_POU_DEPT_CART_ALLOCATIONS A ");

                    if (appID == (int)AtParWebEnums.EnumApps.Pharmacy && string.IsNullOrEmpty(cartType))
                    {
                        sbSql.Append("JOIN PAR_MNGT_PAR_LOC_HEADER OH ON A.CART_ID=OH.PAR_LOC_ID ");
                        sbSql.Append("AND OH.PARLOC_TYPE != '" + cartType + "' ");
                    }
                    sbSql.Append(",MT_POU_DEPT_USER_ALLOCATIONS B WHERE A.ORG_GROUP_ID = B.ORG_GROUP_ID ");
                    sbSql.Append("AND A.DEPARTMENT_ID = B.DEPARTMENT_ID AND A.APP_ID = " + appID + " ");

                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                    {
                        sbSql.Append("AND A.ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "'");
                    }

                    if (locationType == "P")
                    {
                        sbSql.Append("AND A.LOCATION_TYPE != '" + AtParWebEnums.LocationType.I.ToString() + "'");
                    }

                    sbSql.Append("AND B.USER_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' ");
                    sbSql.Append(" ORDER BY BUSINESS_UNIT ");

                    var fileds = new[] { "CART_ID", "BUSINESS_UNIT", "LOCATION_TYPE" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_CART_ALLOCATIONS>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Records returned " + lstRecords); }

                    return lstRecords;
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

        #region GetItemQOH
        public List<VM_POU_CART_ITEM_SUBSTITUTE> GetItemQOH(string bUnit, string cartID, string itemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT SUM(ITEM_QUANTITY_ON_HAND) QOH, ITEM_ID,  ");
                    sbSql.Append("COMPARTMENT FROM MT_POU_CART_INVENTORY  ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + bUnit + "' ");
                    sbSql.Append("AND CART_ID = '" + cartID + "' ");

                    if (!string.IsNullOrEmpty(itemID))
                    {
                        sbSql.Append("AND ITEM_ID = '" + itemID + "'");
                    }

                    sbSql.Append(" GROUP BY ITEM_ID,COMPARTMENT ");

                    var fileds = new[] { "QOH", "ITEM_ID", "COMPARTMENT" };

                    var lstCartInventory = objContext.Database.DifferedExecuteQuery<VM_POU_CART_ITEM_SUBSTITUTE>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Records returned " + lstCartInventory); }

                    return lstCartInventory;
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

        #region GettingSubItemsQOH
        public Double GettingSubItemsQOH(string businessUnit, string cartID, string itemID, string compartment)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            Double QOH = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT B.ITEM_ID,B.SUBSTITUTE_ITEM_ID,A.ITEM_QUANTITY_ON_HAND ");
                    sbSql.Append("FROM MT_POU_CART_INVENTORY A ,PAR_MNGT_ITEM_SUBSTITUTE B ");
                    sbSql.Append("WHERE STATUS=1 AND A.ITEM_ID =B.SUBSTITUTE_ITEM_ID AND ");
                    sbSql.Append("BUSINESS_UNIT = '" + businessUnit + "'  ");
                    sbSql.Append("AND CART_ID = '" + cartID + "' ");
                    sbSql.Append("AND B.ITEM_ID = '" + itemID + "' ");
                    sbSql.Append("AND A.COMPARTMENT = '" + compartment + "' ");

                    var fileds = new[] { "ITEM_ID", "SUBSTITUTE_ITEM_ID", "ITEM_QUANTITY_ON_HAND" };

                    var lsCarts = objContext.Database.DifferedExecuteQuery<VM_POU_CART_ITEM_SUBSTITUTE>(fileds, sbSql.ToString()).ToList();

                    if (lsCarts != null && lsCarts.Count > 0)
                    {
                        QOH = lsCarts.AsEnumerable().Sum(x => Convert.ToDouble(lsCarts[0].ITEM_QUANTITY_ON_HAND));
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Substitute Items QOH for the item " + itemID + " is " + QOH); }


                    return QOH;
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

        #region GetItemAttributes
        public List<MT_ATPAR_ITEM_ATTRIBUTES> GetItemAttributes(string bUnit, string cartID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ITEM_ID,BUSINESS_UNIT,CART_ID,ORG_GROUP_ID,LOT_CONTROLLED,SERIAL_CONTROLLED ");
                    sbSql.Append("FROM MT_ATPAR_ITEM_ATTRIBUTES WHERE BUSINESS_UNIT = '" + bUnit + "'");
                    sbSql.Append("AND CART_ID='" + cartID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var fileds = new[] { "ITEM_ID", "BUSINESS_UNIT", "CART_ID", "ORG_GROUP_ID", "LOT_CONTROLLED", "SERIAL_CONTROLLED" };

                    var lstItemAttributes = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ITEM_ATTRIBUTES>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemAttributes); }

                    return lstItemAttributes;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetStorageArea
        public string GetStorageArea(string deptID, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string storageArea = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ISNULL(STORAGE_AREA,'') FROM MT_POU_DEPT WHERE DEPT_ID ='").Append(deptID).Append("'").Append("AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    storageArea = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Storage Area Returned: " + storageArea); }

                    return storageArea;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetParLocations

        public int GetParLocations(string cartID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int cnt = -1;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.MT_POU_PAR_LOC_PROCESS_SCHEDULE.Count(c => c.ORG_ID == bUnit && c.ID == cartID);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
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
        #endregion

        #region GetReplinish

        public string GetReplinish(string bUnit, string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT  REPLENISH_FROM  FROM MT_POU_PAR_LOC_PROCESS_SCHEDULE WHERE ");
                    sbSql.Append("ORG_ID = '" + bUnit + "' AND ID ='" + cartID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var strRetVal = objContext.Database.SqlQuery<short>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + strRetVal.ToString()); }

                    return strRetVal.ToString();
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

        #region CheckPerpectual

        public bool CheckPerpectual(string bUnit, string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ISNULL(PERPECTUAL_IN_MMIS,'False') FROM PAR_MNGT_PAR_LOC_HEADER  ");
                    sbSql.Append(" WHERE ORG_ID='" + bUnit + "' AND  PAR_LOC_ID = '" + cartID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var perpectual = objContext.Database.SqlQuery<bool>(sbSql.ToString()).FirstOrDefault();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "return perpectual in MMIS Status:" + perpectual); }

                    return perpectual;
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

        #region InsertOrderHeaders

        public long InsertOrderHeaders(long orderNo, string bUnit, string cartID, string vendorID, int appID, string inventoryOrderFlg)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            sbSql.Append("INSERT INTO PAR_MNGT_ORDER_HEADER(ORDER_NO, ORG_ID, PAR_LOC_ID, ORDER_DATE, ");
                            sbSql.Append("CREATE_USER,VENDOR_ID,APP_ID,INVENTORYORDER_FLAG) VALUES(" + orderNo + ", ");
                            sbSql.Append(" '" + bUnit + "' ,");
                            sbSql.Append(" '" + cartID + "' , GETDATE(),'BATCH',");
                            sbSql.Append(" '" + vendorID + "'," + appID + ",'" + inventoryOrderFlg + "' )");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of orderHeaders inserted " + count); }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;

                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }
                }
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

        #region InsertOrderDetails

        public long InsertOrderDetails(bool perpectualMMIS, long orderNo, int lineNo, string itemID, string compartmentID, double countQty,
            string uom, double qoh)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            sbSql.Append("INSERT INTO PAR_MNGT_ORDER_DETAILS(ORDER_NO, LINE_NO, ITEM_ID, BIN_LOC, ");
                            sbSql.Append("QTY,ORDER_STATUS,QTY_RCVD,LOT_NO,SERIAL_NO,UOM");

                            if (perpectualMMIS)
                            {
                                sbSql.Append(", COUNT_QTY");
                            }


                            sbSql.Append(")VALUES(" + orderNo + ", ");
                            sbSql.Append(" " + lineNo + " ,");
                            sbSql.Append(" '" + itemID + "' ,");
                            sbSql.Append(" '" + compartmentID + "'," + countQty + "," + (int)AtParWebEnums.ORDER_STATUS.OPEN + ",");
                            sbSql.Append(" '0','" + string.Empty + "','" + string.Empty + "','" + uom + "'");

                            if (perpectualMMIS)
                            {
                                sbSql.Append("," + qoh + "");
                            }
                            sbSql.Append(")");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of orderDetails inserted " + count); }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }

                    }
                }
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

        #region UpdateOrderDetails

        public long UpdateOrderDetails(long remStatus, string orderIds)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long StatusCode = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE PAR_MNGT_ORDER_DETAILS SET ORDER_STATUS = ");

                    if (remStatus != AtparStatusCodes.ATPAR_OK)
                    {
                        sbSql.Append("" + (int)AtParWebEnums.ORDER_STATUS.ERROR + "");
                        StatusCode = remStatus;
                    }
                    else
                    {
                        sbSql.Append("" + (int)AtParWebEnums.ORDER_STATUS.SENT + "");
                        StatusCode = AtparStatusCodes.ATPAR_OK;

                    }

                    sbSql.Append(" WHERE ORDER_NO IN (" + orderIds + ") ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of orderDetails updAted " + count); }


                    return StatusCode;

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

        #region GetVendorEmail

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

        #endregion

        #region GetDeptInfo

        public List<MT_POU_DEPT_CART_ALLOCATIONS> GetDeptInfo(string bUnit, string cartID, int appID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT DEPARTMENT_ID, DEPT_NAME FROM MT_POU_DEPT_CART_ALLOCATIONS DCA ");
                    sbSql.Append("JOIN MT_POU_DEPT D  ON DCA.DEPARTMENT_ID=D.DEPT_ID WHERE ");
                    sbSql.Append("BUSINESS_UNIT = '" + bUnit + "' AND CART_ID='" + cartID + "'");
                    sbSql.Append("AND APP_ID=" + appID + " AND D.STATUS= 0");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var fileds = new[] { "DEPARTMENT_ID", "DEPT_NAME" };

                    var lstItemAttributes = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_CART_ALLOCATIONS>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemAttributes); }

                    return lstItemAttributes;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetParLocDetails

        public List<PAR_MNGT_PAR_LOC_HEADER> GetParLocDetails(string bUnit, string cartID, int appID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT COST_CENTER_CODE, DELV_LOC_ADDRESS_1, DELV_LOC_ADDRESS_2,  ");
                    sbSql.Append("LOCATION_NAME FROM PAR_MNGT_PAR_LOC_HEADER WHERE PAR_LOC_ID ='" + cartID + "' ");
                    sbSql.Append("AND ORG_ID ='" + bUnit + "' ");

                    if (appID == (int)AtParWebEnums.EnumApps.PointOfUse)
                    {
                        sbSql.Append("AND POU_CART ='Y' ");
                    }
                    else
                    {
                        sbSql.Append("AND POU_CART ='P' ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var fileds = new[] { "COST_CENTER_CODE", "DELV_LOC_ADDRESS_1", "DELV_LOC_ADDRESS_2", "LOCATION_NAME" };

                    var lstItemAttributes = objContext.Database.DifferedExecuteQuery<PAR_MNGT_PAR_LOC_HEADER>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemAttributes); }

                    return lstItemAttributes;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetBatchUserInfo

        public List<MT_ATPAR_USER> GetBatchUserInfo()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT FIRST_NAME, LAST_NAME, MIDDLE_INITIAL, EMAIL_ID, PHONE1, FAX FROM MT_ATPAR_USER A,   ");
                    sbSql.Append("MT_ATPAR_USER_ACL B WHERE A.USER_ID = B.USER_ID AND A.USER_ID='BATCH' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var fileds = new[] { "FIRST_NAME", "LAST_NAME", "MIDDLE_INITIAL", "EMAIL_ID", "PHONE1", "FAX" };

                    var lstUsers = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstUsers); }

                    return lstUsers;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetAccountNum

        public int GetAccountNum(string itemID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            int cnt = -1;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ACCOUNT_NO FROM MT_PAR_MGMT_PRODGROUP_ACCOUNT A JOIN PAR_MNGT_ITEM P ");
                    sbSql.Append("ON A.CATEGORY_CODE = P.USER_FIELD_2 WHERE ITEM_ID= '" + itemID + "'  ");
                    sbSql.Append("AND ORG_GROUP_ID='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "'  ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    cnt = objContext.Database.SqlQuery<int>(sbSql.ToString()).Count();

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
        #endregion

        #region GetItemDetails

        public List<PAR_MNGT_ITEM> GetItemDetails(string itemID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT LONG_DESCR, VEND_ITEM_ID, UNIT_OF_PROCUREMENT ,ITEM_PRICE  ");
                    sbSql.Append("FROM PAR_MNGT_ITEM  WHERE ITEM_ID = '" + itemID + "' ");
                    sbSql.Append("AND ORG_GROUP_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var fileds = new[] { "LONG_DESCR", "VEND_ITEM_ID", "UNIT_OF_PROCUREMENT", "ITEM_PRICE" };

                    var lstUsers = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstUsers); }

                    return lstUsers;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
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

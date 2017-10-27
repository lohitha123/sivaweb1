using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Data;
using System.Linq;
using System.Text;

namespace AtPar.CartCount.Repos
{
    public class ManageOrdersRepository : IManageOrdersRepository
    {
        private ILog _log;
        public ManageOrdersRepository(ILog log)
        {
            _log = log;
        }

        public Tuple<DataSet, long> GetOrderDetails(int orderID, string orderStatus, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet dsOrderDetails = new DataSet();
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append(" SELECT A.ORDER_NO,A.BIN_LOC,A.LINE_NO,A.REQUISITION_NO,C.ORG_ID,");
                    sbSql.Append(" C.PAR_LOC_ID, C.VENDOR_ID, C.CREATE_USER, C.ORDER_DATE, A.ITEM_ID,");
                    sbSql.Append(" B.SHORT_DESCR, A.UOM, B.ITEM_PRICE, A.QTY, ");
                    sbSql.Append(" A.QTY_RCVD, A.ORDER_STATUS");
                    sbSql.Append(" FROM PAR_MNGT_ORDER_DETAILS A, PAR_MNGT_ITEM B, PAR_MNGT_ORDER_HEADER C, RM_ORG_UNITS R  ");
                    sbSql.Append(" WHERE A.ORDER_NO = C.ORDER_NO");
                    sbSql.Append(" AND C.ORG_ID = R.ORG_ID");
                    sbSql.Append(" AND A.ITEM_ID = B.ITEM_ID");
                    sbSql.Append(" AND R.MASTER_GROUP_ID = B.ORG_GROUP_ID");
                    sbSql.Append(" AND A.ORDER_NO = " + orderID + " ");
                    sbSql.Append(" AND R.ORG_TYPE='I'");

                    if (!string.IsNullOrEmpty(orderStatus))
                    {
                        sbSql.Append(" AND A.ORDER_STATUS = " + orderStatus + "  ORDER BY A.ORDER_STATUS");
                    }
                    else
                    {
                        sbSql.Append(" ORDER BY A.ORDER_STATUS");
                    }
                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + ":Query to fetch the data :" + sbSql.ToString() + Environment.NewLine);
                    }

                    var lstOrderDetails = objContext.Database.SqlQuery<VM_ORDER_DETAILS>(sbSql.ToString()).ToList();
                    dsOrderDetails = lstOrderDetails.ToDataSet();
                    return new Tuple<DataSet, long>(dsOrderDetails, AtparStatusCodes.ATPAR_OK);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ":Failed to get the data while executing the query : " + sbSql.ToString() + " : exception is : " + ex.ToString());
                }
                return new Tuple<DataSet, long>(null, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
            }
            finally
            {
                sbSql = null;
            }
        }

        public Tuple<DataSet, long> GetOrders(string fromDate, string toDate, string compID, string locID, string deptID, string vendorID, string ordStatus, string reqNo, string orgGroupID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DateTime _fDate = Convert.ToDateTime(fromDate);
            DateTime _tDate = Convert.ToDateTime(toDate);
            compID = compID.Replace("'", "''");
            locID = locID.Replace("'", "''");
            deptID = deptID.Replace("'", "''");
            ordStatus = ordStatus.Replace("'", "''");
            DataRow[] _drVendor = null;
            DataColumn _colInvBUnit = new DataColumn("INV_BUNIT", System.Type.GetType("System.String"));
            StringBuilder sbSql = new StringBuilder();
            DataSet dsOrders = new DataSet();

            //PAR_MNGT_ORDER_DETAILS table is included for REQUISITION_NO search so we are using key word DISTINCT
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append("SELECT DISTINCT A.ORDER_NO, A.ORG_ID, A.PAR_LOC_ID + '- ' + B.LOCATION_NAME PAR_LOC_ID, ");
                    sbSql.Append("CONVERT(CHAR(10), A.ORDER_DATE, 101) + ' ' + CONVERT(CHAR(8), A.ORDER_DATE, 108) ORDER_DATE, ");
                    sbSql.Append("FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '('+A.CREATE_USER+')' AS CREATE_USER, ");
                    sbSql.Append("A.VENDOR_ID, B.COST_CENTER_CODE, A.INVENTORYORDER_FLAG ");
                    sbSql.Append("FROM PAR_MNGT_ORDER_HEADER A, PAR_MNGT_PAR_LOC_HEADER B , ");
                    sbSql.Append("MT_ATPAR_USER D, PAR_MNGT_COST_CENTER E, PAR_MNGT_ORDER_DETAILS C ");
                    sbSql.Append("WHERE  A.CREATE_USER = D.USER_ID AND ");
                    sbSql.Append("E.ORG_ID = '" + orgGroupID + "' AND ");
                    sbSql.Append("A.ORG_ID = B.ORG_ID  AND A.PAR_LOC_ID = B.PAR_LOC_ID ");
                    sbSql.Append("AND B.COST_CENTER_CODE = E.COST_CENTER_CODE ");
                    sbSql.Append("AND A.ORDER_DATE >= CONVERT(DATETIME, '" + _fDate + "' ,101)  ");
                    sbSql.Append("AND A.ORDER_DATE <= DATEADD(DAY,1,CONVERT(DATETIME,'" + _tDate + "',101)) ");
                    sbSql.Append("AND A.APP_ID='" +(int) AtParWebEnums.EnumApps.CartCount + "'");
                    sbSql.Append("AND A.ORDER_NO=C.ORDER_NO ");

                    if (!string.IsNullOrEmpty(compID))
                    {
                        sbSql.Append(" AND A.ORG_ID LIKE '%" + compID + "%' ");
                    }

                    if (!string.IsNullOrEmpty(locID))
                    {
                        sbSql.Append(" AND  (A.PAR_LOC_ID LIKE '%" + locID + "%' OR B.LOCATION_NAME LIKE '%" + locID + "%') ");
                    }


                    if (!string.IsNullOrEmpty(deptID))
                    {
                        sbSql.Append(" AND (B.COST_CENTER_CODE LIKE '%" + deptID + "%'  ) "); //'OR F.DEPT_NAME LIKE '%" & deptId & "%'
                    }

                    if (!string.IsNullOrEmpty(ordStatus))
                    {
                        sbSql.Append(" AND  C.ORDER_STATUS = '" + ordStatus + "' ");
                    }

                    if (!string.IsNullOrEmpty(vendorID))
                    {
                        sbSql.Append(" AND A.VENDOR_ID LIKE '%" + vendorID + "%' ");
                    }

                    if (!string.IsNullOrEmpty(reqNo))
                    {
                        sbSql.Append(" AND (C.REQUISITION_NO LIKE '%" + reqNo + "%')  ");
                    }

                    if (string.IsNullOrEmpty(compID) && orgGroupID != "All")
                    {
                        sbSql.Append(" AND A.ORG_ID IN (SELECT  DISTINCT BUSINESS_UNIT  FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID =(" + "SELECT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUPS WHERE ORG_GROUP_ID= '" + orgGroupID + "' )  AND BU_TYPE='I')");
                    }


                    var lstOrders = objContext.Database.SqlQuery<VM_ORDERS>(sbSql.ToString()).ToList();
                    var dtOrders = lstOrders.ToDataTable();
                    sbSql = null;
                    sbSql = new StringBuilder();
                    sbSql.Append("SELECT A.VENDOR_ID, B.VENDOR_NAME FROM PAR_MNGT_ORDER_HEADER A, PAR_MNGT_VENDOR B ");
                    sbSql.Append("WHERE A.VENDOR_ID= B.VENDOR_ID ");

                    if (!string.IsNullOrEmpty(compID))
                    {
                        sbSql.Append(" AND A.ORG_ID LIKE '%" + compID + "%' ");
                    }

                    if (!string.IsNullOrEmpty(vendorID))
                    {
                        sbSql.Append(" AND (A.VENDOR_ID LIKE '%" + vendorID + "%' OR B.VENDOR_NAME  LIKE '%" + vendorID + "%')  ");
                    }

                    sbSql.Append("AND A.ORDER_DATE >= CONVERT(DATETIME, '" + _fDate + "' ,101)  ");
                    sbSql.Append("AND A.ORDER_DATE <= DATEADD(DAY,1,CONVERT(DATETIME,'" + _tDate + "',101)) ");

                    if (string.IsNullOrEmpty(compID) && orgGroupID != "All")
                    {
                        sbSql.Append("AND A.ORG_ID IN (SELECT  DISTINCT BUSINESS_UNIT  FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                        sbSql.Append("WHERE ORG_GROUP_ID =(SELECT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUPS ");
                        sbSql.Append("WHERE ORG_GROUP_ID= '" + orgGroupID + "' )  AND BU_TYPE='I')");
                    }



                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + ":Query to fetch the data :" + sbSql.ToString() + Environment.NewLine);
                    }

                    var fields = new[] { "VENDOR_ID", "VENDOR_NAME" };
                    var lstVendors = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ORDER_HEADER>(fields, sbSql.ToString()).ToList();

                    var dtVendors = lstVendors.ToDataTable();
                    dsOrders.Tables.Add(dtOrders);
                    dsOrders.Tables.Add(dtVendors);
                    //dsOrders = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(sbSql.ToString()));



                    _colInvBUnit.DefaultValue = "";

                    if (dsOrders != null)
                    {
                        dsOrders.Tables[0].Columns.Add(_colInvBUnit);
                        //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of dsOrders.Tables(0).Rows.Count for every iteration:
                        int tempVar = dsOrders.Tables[0].Rows.Count;
                        for (int intCount = 0; intCount < tempVar; intCount++)
                        {


                            if (Convert.ToString(dsOrders.Tables[0].Rows[intCount]["INVENTORYORDER_FLAG"]) == AtParWebEnums.YesNo_Enum.Y.ToString())
                            {

                                dsOrders.Tables[0].Rows[intCount]["INV_BUNIT"] = dsOrders.Tables[0].Rows[intCount]["VENDOR_ID"];
                                dsOrders.Tables[0].Rows[intCount]["VENDOR_ID"] = string.Empty;

                            }
                            else
                            {
                                _drVendor = dsOrders.Tables[1].Select("VENDOR_ID = '" + dsOrders.Tables[0].Rows[intCount]["VENDOR_ID"] + "'");

                                if (_drVendor.Length > 0)
                                {
                                    dsOrders.Tables[0].Rows[intCount]["VENDOR_ID"] = dsOrders.Tables[0].Rows[intCount]["VENDOR_ID"] + "-" + _drVendor[0]["VENDOR_NAME"].ToString();
                                }
                                else
                                {
                                    dsOrders.Tables[0].Rows[intCount]["VENDOR_ID"] = string.Empty;
                                }

                                dsOrders.Tables[0].Rows[intCount]["INV_BUNIT"] = string.Empty;

                            }
                        }

                    }
                    return new Tuple<DataSet, long>(dsOrders, AtparStatusCodes.ATPAR_OK);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ":Failed to get the data while executing the query : " + sbSql.ToString() + " : exception is : " + Environment.NewLine + ex.ToString() + ":");
                }
                return new Tuple<DataSet, long>(dsOrders, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
            }
        }

        public long UpdateOrderDetails(DataSet dSOrderDetails, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string gStatusCode = string.Empty;
            StringBuilder sbSql = new StringBuilder();


            try
            {

                //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of dSOrderDetails.Tables(0).Rows.Count for every iteration:
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var transaction = objContext.Database.BeginTransaction())
                    {
                        long tempVar = dSOrderDetails.Tables[0].Rows.Count;
                        for (int i = 0; i < tempVar; i++)
                        {

                            sbSql.Append(" UPDATE PAR_MNGT_ORDER_DETAILS SET QTY='" + dSOrderDetails.Tables[0].Rows[i]["ORDER_QTY"] + "' ");
                            sbSql.Append(" ,QTY_RCVD ='" + dSOrderDetails.Tables[0].Rows[i]["RCVD_QTY"] + "'");
                            sbSql.Append(" ,ORDER_STATUS ='" + dSOrderDetails.Tables[0].Rows[i]["STATUS"] + "' WHERE ");
                            sbSql.Append(" ITEM_ID='" + dSOrderDetails.Tables[0].Rows[i]["ITEM_ID"] + "' ");
                            sbSql.Append(" AND ORDER_NO= '" + dSOrderDetails.Tables[0].Rows[i]["ORDER_NO"] + "' ");
                            sbSql.Append(" AND LINE_NO='" + dSOrderDetails.Tables[0].Rows[i]["LINE_NO"] + "' ");
                            sbSql.Append(" AND BIN_LOC= '" + dSOrderDetails.Tables[0].Rows[i]["BIN_LOC"] + "' ");

                            try
                            {
                                //m_LocalDB.ExecuteNonQuery(m_LocalDB.GetSqlStringCommand(sbSql.ToString()));
                                objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                                if (_log.IsInfoEnabled)
                                {
                                    _log.Info(methodBaseName + ":Query to Update the data :" + sbSql.ToString() + Environment.NewLine);
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + ":Failed to update the data while executing the query : " + sbSql.ToString() + " : exception is : " + ex.ToString());
                                }
                                transaction.Rollback();
                                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                            }
                        }
                        transaction.Commit();
                    }
                }
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ":Failed to update the data while executing the query : " + sbSql.ToString() + " : exception is : " + ex.ToString());
                }

                return AtparStatusCodes.E_SERVERERROR;
            }

            return AtparStatusCodes.ATPAR_OK;
        }
    }
}

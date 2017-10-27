using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AtPar.POU.Repos
{
    public class ManageOrdersRepository : IManageOrdersRepository
    {
        private ILog _log;
        public ManageOrdersRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageOrdersRepository));
        }



        #region GetOrderDetails_ManageOrders
        public List<PAR_MNGT_ORDER_DETAILS> GetOrderDetails(string ordNo, string itemID, string ordStatus)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT ORDER_NO, ITEM_ID, REQUISITION_NO, QTY, QTY_RCVD, ORDER_STATUS, BIN_LOC,LINE_NO, TRANSACTION_ID, UOM FROM PAR_MNGT_ORDER_DETAILS  WHERE ORDER_NO = '").Append(ordNo).Append("'");

                    if (!string.IsNullOrEmpty(itemID))
                    {
                        sbSql.Append("AND ITEM_ID LIKE '%").Append(itemID).Append("%' ");
                    }

                    if (!string.IsNullOrEmpty(ordStatus))
                    {
                        sbSql.Append("AND ORDER_STATUS = ").Append(ordStatus).Append("  ORDER BY ORDER_STATUS");
                    }
                    else
                    {
                        sbSql.Append(" ORDER BY ORDER_STATUS");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "ORDER_NO", "ITEM_ID", "REQUISITION_NO", "QTY", "QTY_RCVD", "ORDER_STATUS", "BIN_LOC", "LINE_NO", "TRANSACTION_ID", "UOM" };

                    var lstOrderDetails = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ORDER_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of order details returned : " + lstOrderDetails.Count); }

                    return lstOrderDetails;
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

        #region GetOrderHeaders
        public List<VM_POU_MNGT_ORDER_DETAILS> GetDistinctOrderDetails(int appID, string orgGrpID, string compID, string locID, string deptID, string ordStatus, string reqNo, string itemID, DateTime fDate, DateTime tDate)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            fDate = fDate.Date;
            tDate = tDate.Date;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT A.ORDER_NO, VENDOR_ID, ORDER_DATE, ORG_ID, PAR_LOC_ID, DEPARTMENT_ID, B.LOCATION_TYPE,REQUISITION_NO FROM PAR_MNGT_ORDER_HEADER A,MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS B,PAR_MNGT_ORDER_DETAILS C WHERE A.ORG_ID = B.BUSINESS_UNIT AND A.PAR_LOC_ID = B.CART_ID AND A.ORDER_NO = C.ORDER_NO  AND A.ORDER_DATE >= CONVERT(SMALLDATETIME, '").Append(fDate).Append("' ,101) AND CAST(A.ORDER_DATE as DATE) <= CAST('").Append(tDate).Append("' as DATE) AND A.APP_ID = B.APP_ID AND A.APP_ID = '").Append(appID).Append("'");

                    if (appID == Convert.ToInt32(AtParWebEnums.EnumApps.Pharmacy))
                    {
                        sbSql.Append(" AND A.INVENTORYORDER_FLAG <> 'P'");
                    }

                    if (orgGrpID != "All")
                    {
                        sbSql.Append(" AND B.ORG_GROUP_ID = '").Append(orgGrpID).Append("' ");
                    }

                    if (!string.IsNullOrEmpty(compID))
                    {
                        sbSql.Append(" AND ORG_ID LIKE '%").Append(compID).Append("%' ");
                    }

                    if (!string.IsNullOrEmpty(locID))
                    {
                        sbSql.Append(" AND  PAR_LOC_ID LIKE '%").Append(locID).Append("%' ");
                    }

                    if (!string.IsNullOrEmpty(deptID))
                    {
                        sbSql.Append(" AND DEPARTMENT_ID LIKE '%").Append(deptID).Append("%' ");
                    }

                    if (!string.IsNullOrEmpty(ordStatus))
                    {
                        sbSql.Append(" AND  ORDER_STATUS = '").Append(ordStatus).Append("' ");
                    }

                    if (!string.IsNullOrEmpty(reqNo))
                    {
                        sbSql.Append(" AND C.REQUISITION_NO LIKE '%").Append(reqNo).Append("%' ");
                    }

                    if (!string.IsNullOrEmpty(itemID))
                    {
                        sbSql.Append(" AND C.ITEM_ID LIKE '%").Append(itemID).Append("%' ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var lstOrderDetails = objContext.Database.SqlQuery<VM_POU_MNGT_ORDER_DETAILS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of order details returned : " + lstOrderDetails.Count); }

                    return lstOrderDetails;
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

        //        #region GetEventItems
        //        public long InsertEventHdrMaster(long transactionID, string businessUnit, string subEventID, string eventID, int itemSplit, int itemsRem, string userID, int orderBy)
        //        {
        //            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //            StringBuilder sbSql = new StringBuilder();

        //            try
        //            {
        //                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
        //                {
        //                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

        //                    sbSql.Append("INSERT INTO MT_CYCT_EVENT_HDR_MASTER(TRANSACTION_ID,BUSINESS_UNIT,EVENT_ID,").Append("PARENT_EVENT_ID,NO_OF_ITEMS,UPDATE_USER_ID,UPDATE_DATE,SORT_BY_FIELD)VALUES('").Append(transactionID).Append("',").Append("'").Append(businessUnit).Append("','").Append(subEventID).Append("','").Append(eventID).Append("',").Append(itemSplit + itemsRem).Append(",").Append("'").Append(userID).Append("','").Append(DateTime.Now).Append("',").Append(orderBy).Append(")");

        //                    if (!_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
        //                    }
        //                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

        //                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
        //                    return AtparStatusCodes.ATPAR_OK;
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
        //                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
        //            }
        //            finally
        //            {
        //                sbSql = null;
        //            }
        //        }

        //        public long UpdateEventHdrMaster(string fromLoc,long transactionID)
        //        {
        //            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //            StringBuilder sbSql = new StringBuilder();

        //            try
        //            {
        //                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
        //                {
        //                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

        //                    sbSql.Append("UPDATE MT_CYCT_EVENT_HDR_MASTER SET [FROM]='").Append(fromLoc).Append("' WHERE TRANSACTION_ID=").Append(transactionID);

        //                    if (!_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
        //                    }
        //                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

        //                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
        //                    return AtparStatusCodes.ATPAR_OK;
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
        //                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
        //            }
        //            finally
        //            {
        //                sbSql = null;
        //            }
        //        }

        //        public long UpdateHdrMasterToLoc(string toLoc,long transactionID)
        //        {
        //            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //            StringBuilder sbSql = new StringBuilder();

        //            try
        //            {
        //                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
        //                {
        //                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

        //                    sbSql.Append("UPDATE MT_CYCT_EVENT_HDR_MASTER SET [TO]='").Append(toLoc).Append("' WHERE TRANSACTION_ID=").Append(transactionID);

        //                    if (!_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
        //                    }
        //                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

        //                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
        //                    return AtparStatusCodes.ATPAR_OK;
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
        //                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
        //            }
        //            finally
        //            {
        //                sbSql = null;
        //            }
        //        }

        //        public void insertEventDetailMaster(DataSet pdsEvents)
        //        {
        //            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //            StringBuilder sbSql = new StringBuilder();

        //            try
        //            {
        //                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
        //                {
        //                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


        //                    sbSql.Append("INSERT INTO MT_CYCT_EVENT_DETAIL_MASTER(TRANSACTION_ID,ITEM_REC_NUM,DESCRIPTION,INV_ITEM_ID,STORAGE_AREA, UPC_ID,STOR_LEVEL_1, STOR_LEVEL_2, STOR_LEVEL_3,STOR_LEVEL_4, CONTAINER_ID,STAGED_DATE,SERIAL_ID, INV_LOT_ID,UNIT_OF_MEASURE,SYS_QTY,MFG_ITEM_ID, VEND_ITEM_ID,CUSTOM_ITEM_NO, ITEM_PRICE,INVENTORY_TAG_ID, GTIN, REPORT_FIELD_1, REPORT_FIELD_2, REPORT_FIELD_3, REPORT_FIELD_4, PACKAGING_STRING, UOM_TYPE,STD_PACK_UOM, L_S_CONTROLLED, CONSIGNED_FLAG,LOT_CONTROLLED,SERIAL_CONTROLLED) VALUES('" ).Append( lngTransactionId ).Append( "', '" ).Append( strItemrec ).Append( "','" ).Append( pdsEvents.Tables(0).Rows(intCntItems).Item("DESCRIPTION").ToString() ).Append( "', '" ).Append( pdsEvents.Tables(0).Rows(intCntItems).Item("INV_ITEM_ID").ToString() ).Append( "', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("STORAGE_AREA").ToString() ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("UPC_ID").ToString() ).Append( "', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("STOR_LEVEL_1") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("STOR_LEVEL_2") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("STOR_LEVEL_3") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("STOR_LEVEL_4") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("CONTAINER_ID") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("STAGED_DATE") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("SERIAL_ID") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("INV_LOT_ID") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("UNIT_OF_MEASURE") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("SYS_QTY") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("MFG_ITEM_ID").Append("', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("VEND_ITEM_ID") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("CUSTOM_ITEM_NO") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("ITEM_PRICE") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("INVENTORY_TAG_ID") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("GTIN") ).Append("', '" ).Append(pdsEvents.Tables(0).Rows(intCntItems).Item("REPORT_FIELD_1") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("REPORT_FIELD_2") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("REPORT_FIELD_3") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("REPORT_FIELD_4") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("PACKAGING_STRING") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("UOM_TYPE") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("STD_PACK_UOM") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("L_S_CONTROLLED") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("CONSIGNED_FLAG") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("LOT_CONTROLLED") + "', '" + pdsEvents.Tables(0).Rows(intCntItems).Item("SERIAL_CONTROLLED") + "'" + ")"
        


        //                    if (!_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
        //                    }
        //                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

        //                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
        //                    return AtparStatusCodes.ATPAR_OK;
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
        //                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
        //            }
        //            finally
        //            {
        //                sbSql = null;
        //            }
        //        }
        //        #endregion
    }
}

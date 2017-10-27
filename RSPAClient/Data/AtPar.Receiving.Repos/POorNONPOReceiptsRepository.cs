using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Receiving;
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

namespace AtPar.Receiving.Repos
{
    public class POorNONPOReceiptsRepository : IPOorNONPOReceiptsRepository
    {
        ILog _log;
        public POorNONPOReceiptsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(POorNONPOReceiptsRepository));
        }

        #region Public Methods

        #region CheckIfPoDownlodedForSameUser
        public int CheckIfPoDownlodedForSameUser(string businessUnit, string iutOrder, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT TRANSACTION_ID FROM MT_ATPAR_TRANSACTION  ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + businessUnit + "' AND ");
                    sbSql.Append("APP_ID = " + (int)AtParWebEnums.EnumApps.Receiving + " AND ");
                    sbSql.Append("ID like '% " + iutOrder + "' AND  ");
                    sbSql.Append("STATUS =" + (int)AtParWebEnums.AppTransactionStatus.Downloaded + " AND ");
                    sbSql.Append("USER_ID = '" + userID + "' ");


                    var transId = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Transaction ID  is : " + transId); }

                    return transId;
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

        #region CheckIfPoAlreadyDownloaded
        public bool CheckIfPoAlreadyDownloaded(string businessUnit, string poID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(ID) FROM  MT_ATPAR_TRANSACTION WHERE ");
                    sbSql.Append("BUSINESS_UNIT ='" + businessUnit + "' ");
                    sbSql.Append("AND APP_ID = " + (int)AtParWebEnums.EnumApps.Receiving + " ");
                    sbSql.Append("AND ID like '%" + poID + "' ");
                    sbSql.Append("AND STATUS = " + (int)AtParWebEnums.AppTransactionStatus.Downloaded + " ");
                    sbSql.Append("AND USER_ID != '" + userID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    result = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + result); }


                    if (result > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region GetRecallitems
        public List<MT_ATPAR_RECALL_INFO> GetRecallitems(string poItems)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ITEM_ID,LOT_NO,SERIAL_NO FROM MT_ATPAR_RECALL_INFO");

                    if (!string.IsNullOrEmpty(poItems))
                    {
                        sbSql.Append(" WHERE ITEM_ID IN (" + poItems.ToString().TrimEnd(',') + ")");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "ITEM_ID", "LOT_NO", "SERIAL_NO" };

                    var lstRecallItems = objContext.Database.DifferedExecuteQuery<MT_ATPAR_RECALL_INFO>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstRecallItems); }

                    return lstRecallItems;
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

        #region checkDeliver
        public bool checkDeliver()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(APP_ID) FROM  MT_ATPAR_APP WHERE ");
                    sbSql.Append("APP_ID = ").Append((int)AtParWebEnums.EnumApps.Deliver);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    result = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + result); }


                    if (result > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region CheckShipToIDAllocation
        public bool CheckShipToIDAllocation(string shiptoID, string orgGroupID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT COUNT(*) FROM MT_DELV_SHIPTO_ID_ALLOCATION WHERE SHIPTO_ID=' ");
                    sbSql.Append(shiptoID).Append("' AND ORG_GROUP_ID='");
                    sbSql.Append(orgGroupID).Append("' ");



                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    result = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + result); }


                    if (result > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region GetExistingDetailTransForPOItem
        public int GetExistingDetailTransForPOItem(string businessUnit, string poID, string lineNo, string scheduleNo)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            int transId = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT TRANSACTION_ID FROM MT_ATPAR_DETAIL_TRANSACTION  ");
                    sbSql.Append("WHERE KEY_1 = '").Append(businessUnit).Append("' ");
                    sbSql.Append("AND APP_ID = ").Append((int)AtParWebEnums.EnumApps.Deliver).Append(" AND REPORT_DATA_1 ='").Append(poID).Append("'");
                    sbSql.Append(" AND STATUS = ").Append(AtParDefns.m_statDetailOpen).Append(" AND  ");
                    sbSql.Append("REPORT_DATA_2 = '").Append(lineNo).Append("' AND KEY_7 = '").Append(scheduleNo).Append("'");


                    var returnValue = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (returnValue != null)
                    {
                        if (returnValue.ToString().Trim().Length > 0)
                        {
                            transId = returnValue;
                        }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Transaction ID  is : " + transId); }

                    return transId;
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

        #region IsProductInstalled
        public bool IsProductInstalled(int appID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT APP_ID FROM MT_ATPAR_APP WHERE APP_ID=" + appID + " ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    result = objContext.Database.SqlQuery<Int16>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + result); }


                    if (result == appID)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region UpdateDeliverTransactions
        public Tuple<DataSet, DataRow, long> UpdateDeliverTransactions(string[] deviceTokenEntry, DataRow detailRow, DataSet inputParameter)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long StatusCode = -1;

            Tuple<DataSet, DataRow, long> tpleResult = null;
            //DataRow detailRow ; 
            // DataSet inputParameter = new DataSet();


            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("UPDATE MT_ATPAR_DETAIL_TRANSACTION SET STATUS = ");
                    sbSql.Append(" " + (int)AtParWebEnums.AppTransactionStatus.statDetailReceive + ", ");
                    sbSql.Append("REPORT_DATA_29 = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "',");
                    sbSql.Append("DEVICE_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID] + "',");
                    sbSql.Append("REPORT_DATA_6 ='" + detailRow[(int)AtParWebEnums.SendPO_Receive_Details_Enum.CARRIER_ID] + "',");
                    sbSql.Append("REPORT_DATA_12 = '" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.END_DT_TIME.ToString()] + "' ,");
                    sbSql.Append("REPORT_DATA_17 = " + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()] + ", ");
                    sbSql.Append("REPORT_DATA_20 = '" + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()] + "', ");
                    sbSql.Append("REPORT_DATA_24 = '" + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.BILL_OF_LADING.ToString()] + "', ");
                    sbSql.Append("REPORT_DATA_3 = '" + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.TRACKING_ID.ToString()] + "', ");
                    sbSql.Append("REPORT_DATA_31 = '" + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.EXT_TRK_NO.ToString()] + "', ");
                    sbSql.Append("REPORT_DATA_47 = " + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES.ToString()] + " ");
                    sbSql.Append("WHERE KEY_1 ='" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.BUSINESS_UNIT.ToString()] + "' ");
                    sbSql.Append("AND KEY_7 =  " + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()] + " ");
                    sbSql.Append("AND REPORT_DATA_1 = '" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.PO_ID.ToString()] + "' ");
                    sbSql.Append("AND REPORT_DATA_2 = " + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()] + " AND ");
                    sbSql.Append("STATUS = " + (int)AtParWebEnums.AppTransactionStatus.statDetailOpen + " ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }

                    tpleResult = new Tuple<DataSet, DataRow, long>(inputParameter, detailRow, AtparStatusCodes.ATPAR_OK);

                    return tpleResult;

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                tpleResult = new Tuple<DataSet, DataRow, long>(inputParameter, detailRow, AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL);
                return tpleResult;

            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region SaveReceiptBoxInfo
        public Tuple<DataRow, long> SaveReceiptBoxInfo(DataRow detailRow, int transactionID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            long StatusCode = -1;
            Tuple<DataRow, long> tpleResult = null;



            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            string strdelete = "";
                            strdelete = "DELETE FROM MT_RECV_PO_BOXES WHERE TRANSACTION_ID=" + transactionID +
                                 "  AND LINE_NBR = " + detailRow[(int)AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR] +
                                 " AND	SCHED_NBR =" + detailRow[(int)AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR] + "";
                            var dcount = objContext.Database.ExecuteSqlCommand(strdelete);

                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + dcount); }

                            sbSql.Append("INSERT INTO MT_RECV_PO_BOXES(TRANSACTION_ID, LINE_NBR, ");
                            sbSql.Append("SCHED_NBR, ITEM_ID, NO_OF_BOXES, CARRIER_ID, CUST_ITEM_NO) ");
                            sbSql.Append("VALUES(" + transactionID + ",");
                            sbSql.Append(" " + detailRow[(int)AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR] + ", ");
                            sbSql.Append("" + detailRow[(int)AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR] + ", ");
                            sbSql.Append(" '" + detailRow[(int)AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID] + "', ");
                            sbSql.Append("" + detailRow[(int)AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES] + ", ");
                            sbSql.Append("'" + detailRow[(int)AtParWebEnums.SendPO_Receive_Details_Enum.CARRIER_ID] + "', ");
                            sbSql.Append("'" + detailRow[(int)AtParWebEnums.SendPO_Receive_Details_Enum.CUST_ITEM_NO] + "') ");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

                            tpleResult = new Tuple<DataRow, long>(detailRow, AtparStatusCodes.ATPAR_OK);

                            trans.Commit();
                            return tpleResult;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            tpleResult = new Tuple<DataRow, long>(detailRow, AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL);
                            trans.Rollback();
                            return tpleResult;
                        }
                    }

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                tpleResult = new Tuple<DataRow, long>(detailRow, AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL);
                return tpleResult;

            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetReceivePrerequisites:Splitting stored procedure

        public Dictionary<string, object> GetReceivePrerequisites(string orgID, string userID, string enterpriseSystem, string profileID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                List<string> lstBunits = new List<string>();
                List<MT_RECV_SHIPTO_ID_ALLOCATION> lstShipToIDs = new List<MT_RECV_SHIPTO_ID_ALLOCATION>();
                List<MT_ATPAR_ORG_GROUP_PARAMETERS> lstOrgParms = new List<MT_ATPAR_ORG_GROUP_PARAMETERS>();
                List<MT_ATPAR_PROFILE_PARAMETERS> lstProfileApp = new List<MT_ATPAR_PROFILE_PARAMETERS>();
                List<MT_ATPAR_USER_APP_PARAMETERS> lstUserApp = new List<MT_ATPAR_USER_APP_PARAMETERS>();
                List<VM_ATPAR_PROFILE_LIST_VIEW> lstScreenApp = new List<VM_ATPAR_PROFILE_LIST_VIEW>();
                List<string> lstInventoryBunits = new List<string>();

                int shipToIdCount;
                Dictionary<string, object> receiveParamDetails = new Dictionary<string, object>();

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    lstBunits = GetBunits(orgID);
                    lstShipToIDs = GetShipToIDs(userID);
                    lstOrgParms = GetOrgGroupParameterValues(orgID, enterpriseSystem);
                    lstProfileApp = GetProfileApp(profileID, enterpriseSystem);
                    lstUserApp = GetUserApp(userID, enterpriseSystem);
                    lstScreenApp = GetScreenApp(profileID, enterpriseSystem);
                    lstInventoryBunits = GetInventoryBunits(userID);
                    shipToIdCount = GetShipToIdCount(orgID);

                    receiveParamDetails.Add("ALLOCATED_BUNITS", lstBunits);
                    receiveParamDetails.Add("ALLOCATED_SHIPTOIDS", lstShipToIDs);
                    receiveParamDetails.Add("ORG_PARAMETERS", lstOrgParms);
                    receiveParamDetails.Add("PROFILE_PARAMETERS", lstProfileApp);
                    receiveParamDetails.Add("USER_PARAMETERS", lstUserApp);
                    receiveParamDetails.Add("SCREEN_DISPLAY", lstScreenApp);
                    receiveParamDetails.Add("ALLOCATED_IUT_BUNITS", lstInventoryBunits);
                    receiveParamDetails.Add("DELV_ALLOC_SHIPTOIDS", shipToIdCount);

                    //var receiveParamDetails = new Dictionary<string, object> { { "ALLOCATED_BUNITS", lstBunits }, { "ALLOCATED_SHIPTOIDS", lstShipToIDs }, { "ORG_PARAMETERS", lstOrgParms }, { "PROFILE_PARAMETERS", lstProfileApp }, { "USER_PARAMETERS", lstUserApp }, { "SCREEN_DISPLAY", lstScreenApp } , { "ALLOCATED_IUT_BUNITS", lstInventoryBunits }, {"DELV_ALLOC_SHIPTOIDS", shipToIdCount } };

                    return receiveParamDetails;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        private List<string> GetBunits(string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<string> bunits = new List<string>();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT distinct(BUSINESS_UNIT) FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                    sbSql.Append("WHERE ORG_GROUP_ID =  '" + orgID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    bunits = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + bunits.Count); }

                    return bunits;
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
        private List<MT_RECV_SHIPTO_ID_ALLOCATION> GetShipToIDs(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT SETID, SHIPTO_ID, USER_ID FROM MT_RECV_SHIPTO_ID_ALLOCATION  ");
                    sbSql.Append("WHERE USER_ID = '" + userID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "SETID", "SHIPTO_ID", "USER_ID" };

                    var lstShipToIds = objContext.Database.DifferedExecuteQuery<MT_RECV_SHIPTO_ID_ALLOCATION>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstShipToIds); }

                    return lstShipToIds;
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
        private List<MT_ATPAR_ORG_GROUP_PARAMETERS> GetOrgGroupParameterValues(string orgID, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.APP_ID, A.PARAMETER_ID, A.PARAMETER_VALUE FROM ");
                    sbSql.Append("MT_ATPAR_ORG_GROUP_PARAMETERS A,MT_ATPAR_PARAM_MASTER B ");
                    sbSql.Append("WHERE A.APP_ID= B.APP_ID AND A.PARAMETER_ID = B.PARAMETER_ID ");
                    sbSql.Append("AND B.ENTERPRISE_SYSTEM = '" + enterpriseSystem + "'  ");
                    sbSql.Append("AND A.ORG_GROUP_ID ='" + orgID + "' AND B.CLIENT_SYNC = 'Y' ");
                    sbSql.Append("AND B.PARAMETER_LEVEL='ORG' AND A.APP_ID= 4  ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "APP_ID", "PARAMETER_ID", "PARAMETER_VALUE" };

                    var lstOrgParams = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUP_PARAMETERS>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstOrgParams); }

                    return lstOrgParams;
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
        private List<MT_ATPAR_PROFILE_PARAMETERS> GetProfileApp(string profileID, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.APP_ID, A.PARAMETER_ID, A.PARAMETER_VALUE FROM ");
                    sbSql.Append("MT_ATPAR_PROFILE_PARAMETERS A,MT_ATPAR_PARAM_MASTER B ");
                    sbSql.Append("WHERE A.APP_ID= B.APP_ID AND A.PARAMETER_ID = B.PARAMETER_ID ");
                    sbSql.Append("AND A.PROFILE_ID ='" + profileID + "' AND B.ENTERPRISE_SYSTEM = '" + enterpriseSystem + "'  ");
                    sbSql.Append("AND B.CLIENT_SYNC= 'Y' AND B.PARAMETER_LEVEL='PROFILE' ");
                    sbSql.Append("AND A.APP_ID=4 AND A.APP_ID IN (SELECT APP_ID FROM ");
                    sbSql.Append("MT_ATPAR_PROFILE_APP_ACL C, MT_ATPAR_USER D WHERE  ");
                    sbSql.Append("C.PROFILE_ID = D.PROFILE_ID AND ");
                    sbSql.Append("C.PROFILE_ID = '" + profileID + "' AND CLIENT_USER='Y')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "APP_ID", "PARAMETER_ID", "PARAMETER_VALUE" };

                    var lstProfileApps = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PROFILE_PARAMETERS>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstProfileApps); }

                    return lstProfileApps;
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
        private List<MT_ATPAR_USER_APP_PARAMETERS> GetUserApp(string userID, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.APP_ID, A.PARAMETER_ID, A.PARAMETER_VALUE FROM ");
                    sbSql.Append("MT_ATPAR_USER_APP_PARAMETERS A,MT_ATPAR_PARAM_MASTER B ");
                    sbSql.Append("WHERE A.APP_ID= B.APP_ID AND A.PARAMETER_ID = B.PARAMETER_ID ");
                    sbSql.Append("AND A.USER_ID ='" + userID + "' AND B.ENTERPRISE_SYSTEM = '" + enterpriseSystem + "'  ");
                    sbSql.Append("AND B.CLIENT_SYNC= 'Y' AND B.PARAMETER_LEVEL='USER' ");
                    sbSql.Append("AND A.APP_ID=4 AND A.APP_ID IN (SELECT APP_ID FROM ");
                    sbSql.Append("MT_ATPAR_PROFILE_APP_ACL C, MT_ATPAR_USER D WHERE  ");
                    sbSql.Append("C.PROFILE_ID = D.PROFILE_ID AND C.PROFILE_ID IN (SELECT PROFILE_ID  ");
                    sbSql.Append("FROM MT_ATPAR_USER WHERE USER_ID= '" + userID + "' AND CLIENT_USER='Y'))");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "APP_ID", "PARAMETER_ID", "PARAMETER_VALUE" };

                    var lstUserApps = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER_APP_PARAMETERS>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstUserApps); }

                    return lstUserApps;
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
        private List<VM_ATPAR_PROFILE_LIST_VIEW> GetScreenApp(string profileID, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.APP_ID, A.SCREEN_NAME, A.FIELD_NAME, A.COLUMN_HEADER,");
                    sbSql.Append("A.COLUMN_ORDER, A.COLUMN_WIDTH, B.MANDATORY_FIELD,");
                    sbSql.Append("A.DISPLAY_FIELD,B.ORDER_BY, B.COLUMN_MAX_SIZE, A.TOGGLE_FIELD,");
                    sbSql.Append("A.DEFAULT_TOGGLE_TEXT, A.TOGGLE_ORDER FROM ");
                    sbSql.Append("MT_ATPAR_PROFILE_LIST_VIEW A, MT_ATPAR_LIST_VIEW B ");
                    sbSql.Append("WHERE A.APP_ID = B.APP_ID AND A.SCREEN_NAME = B.SCREEN_NAME ");
                    sbSql.Append("AND A.FIELD_NAME = B.FIELD_NAME AND PROFILE_ID ='" + profileID + "' ");
                    sbSql.Append("AND B.ENTERPRISE_SYSTEM = '" + enterpriseSystem + "' AND A.APP_ID = 4");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "APP_ID","SCREEN_NAME","FIELD_NAME","COLUMN_HEADER","COLUMN_ORDER","COLUMN_WIDTH", "MANDATORY_FIELD","DISPLAY_FIELD","ORDER_BY","COLUMN_MAX_SIZE","TOGGLE_FIELD",
                        "DEFAULT_TOGGLE_TEXT","TOGGLE_ORDER"};

                    var lstProfilesList = objContext.Database.DifferedExecuteQuery<VM_ATPAR_PROFILE_LIST_VIEW>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstProfilesList); }

                    return lstProfilesList;
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
        private List<string> GetInventoryBunits(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<string> bunits = new List<string>();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT FROM MT_ATPAR_IBU_ALLOCATION ");
                    sbSql.Append("WHERE APP_ID= 4 AND USER_ID = '" + userID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    bunits = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + bunits.Count); }

                    return bunits;
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
        private int GetShipToIdCount(string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(SHIPTO_ID) SHIPTO_ID  FROM MT_DELV_SHIPTO_ID_ALLOCATION WHERE ORG_GROUP_ID='" + orgID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    result = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + result); }

                    return result;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }



        #endregion

        #region InsertReceiveDeviationDetails
        public long InsertReceiveDeviationDetails(Receive_Deviation_Details_Entity deviationDetailsEntity)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    string strdelete = "";
                    strdelete = "DELETE FROM MT_RECV_DEVIATION_DETAILS WHERE TRANSACTION_ID=" + deviationDetailsEntity.Transaction_Id +
                            "  AND LINE_NO = " + deviationDetailsEntity.Line_No +
                            "  AND SERIAL_ID = '" + deviationDetailsEntity.Serial_Id +
                            "'  AND LOT_ID = '" + deviationDetailsEntity.Lot_Id +
                            "' AND RECV_UOM ='" + deviationDetailsEntity.Recv_Uom + "'";
                    var dcount = objContext.Database.ExecuteSqlCommand(strdelete);

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + dcount); }


                    SqlParameter[] sqlparams = new SqlParameter[9];

                    sqlparams[0] = new SqlParameter("@Transaction_Id", SqlDbType.Int);
                    sqlparams[0].Value = deviationDetailsEntity.Transaction_Id;

                    sqlparams[1] = new SqlParameter("@Line_No", SqlDbType.Int);
                    sqlparams[1].Value = deviationDetailsEntity.Line_No;

                    sqlparams[2] = new SqlParameter("@Serial_Id", SqlDbType.NVarChar);
                    sqlparams[2].Value = deviationDetailsEntity.Serial_Id;

                    sqlparams[3] = new SqlParameter("@Lot_Id", SqlDbType.NVarChar);
                    sqlparams[3].Value = deviationDetailsEntity.Lot_Id;

                    sqlparams[4] = new SqlParameter("@Recv_Uom", SqlDbType.NVarChar);
                    sqlparams[4].Value = deviationDetailsEntity.Recv_Uom;

                    sqlparams[5] = new SqlParameter("@Recv_Conversion_Rate", SqlDbType.Float);
                    sqlparams[5].Value = deviationDetailsEntity.Recv_Conversion_Rate;

                    sqlparams[6] = new SqlParameter("@Qty", SqlDbType.Float);
                    sqlparams[6].Value = deviationDetailsEntity.QTY;
                    if (deviationDetailsEntity.Expiry_date == null)
                    {
                        sqlparams[7] = new SqlParameter("@Expiry_date", SqlDbType.DateTime);
                        sqlparams[7].Value = DBNull.Value;
                    }
                    else
                    {
                        sqlparams[7] = new SqlParameter("@Expiry_date", SqlDbType.DateTime);
                        sqlparams[7].Value = deviationDetailsEntity.Expiry_date;
                    }


                    sqlparams[8] = new SqlParameter("@Sched_No", SqlDbType.Int);
                    sqlparams[8].Value = deviationDetailsEntity.Sched_No;

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }


                    var cnt = objContext.Database.ExecuteSqlCommand("exec Sp_Insert_Recv_Deviation_Details @Transaction_Id, @Line_No, @Serial_Id, @Lot_Id, @Recv_Uom, @Recv_Conversion_Rate,@Qty, @Expiry_date, @Sched_No", sqlparams[0], sqlparams[1], sqlparams[2], sqlparams[3], sqlparams[4], sqlparams[5], sqlparams[6], sqlparams[7], sqlparams[8]);


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned inserted rows Count " + cnt); }

                    StatusCode = AtparStatusCodes.ATPAR_OK;

                }

                return StatusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        #endregion

        #region InsertIUTReceiveDeviationDetails
        public long InsertIUTReceiveDeviationDetails(IUT_RECV_Deviation_Details_Entity deviationDetailsEntity)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[8];

                    sqlparams[0] = new SqlParameter("@Transaction_Id", SqlDbType.Int);
                    sqlparams[0].Value = deviationDetailsEntity.Transaction_Id;

                    sqlparams[1] = new SqlParameter("@Line_No", SqlDbType.Int);
                    sqlparams[1].Value = deviationDetailsEntity.Line_No;

                    sqlparams[2] = new SqlParameter("@Serial_Id", SqlDbType.NVarChar);
                    sqlparams[2].Value = deviationDetailsEntity.Serial_Id;

                    sqlparams[3] = new SqlParameter("@Lot_Id", SqlDbType.NVarChar);
                    sqlparams[3].Value = deviationDetailsEntity.Lot_Id;

                    sqlparams[4] = new SqlParameter("@Recv_Uom", SqlDbType.NVarChar);
                    sqlparams[4].Value = deviationDetailsEntity.Recv_Uom;

                    sqlparams[5] = new SqlParameter("@Recv_Conversion_Rate", SqlDbType.Float);
                    sqlparams[5].Value = deviationDetailsEntity.Recv_Conversion_Rate;

                    sqlparams[6] = new SqlParameter("@Qty", SqlDbType.Float);
                    sqlparams[6].Value = deviationDetailsEntity.QTY;

                    sqlparams[7] = new SqlParameter("@Expiry_date", SqlDbType.DateTime);
                    sqlparams[7].Value = deviationDetailsEntity.Expiry_date;

                    sqlparams[8] = new SqlParameter("@Sched_No", SqlDbType.Int);
                    sqlparams[8].Value = deviationDetailsEntity.Sched_No;

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }


                    var cnt = objContext.Database.ExecuteSqlCommand("exec Sp_Insert_Recv_Deviation_Details @Transaction_Id, @Line_No, @Serial_Id, @Lot_Id, @Recv_Uom, @Recv_Conversion_Rate,@Qty, @Expiry_date, @Sched_No", sqlparams[0], sqlparams[1], sqlparams[2], sqlparams[3], sqlparams[4], sqlparams[5], sqlparams[6], sqlparams[7], sqlparams[8]);


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned inserted rows Count " + cnt); }

                    StatusCode = AtparStatusCodes.ATPAR_OK;

                }

                return StatusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        #endregion

        #region InsertReceiveDeviationHeader
        public long InsertReceiveDeviationHeader(Receive_Deviation_Header_Entity deviationHeaderEntity)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    string strDelete = "";
                    strDelete = "DELETE FROM MT_RECV_DEVIATION_HEADER WHERE TRANSACTION_ID = " + deviationHeaderEntity.Transaction_Id +
                               "  AND LINE_NO = " + deviationHeaderEntity.Line_No + "";

                    var dcount = objContext.Database.ExecuteSqlCommand(strDelete);
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + dcount); }

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[29];

                    sqlparams[0] = new SqlParameter("@Transaction_Id", SqlDbType.Int);
                    sqlparams[0].Value = deviationHeaderEntity.Transaction_Id;

                    sqlparams[1] = new SqlParameter("@Line_No", SqlDbType.Int);
                    sqlparams[1].Value = deviationHeaderEntity.Line_No;

                    sqlparams[2] = new SqlParameter("@Business_Unit", SqlDbType.NVarChar);
                    sqlparams[2].Value = deviationHeaderEntity.Business_Unit;

                    sqlparams[3] = new SqlParameter("@PO_ID", SqlDbType.NVarChar);
                    sqlparams[3].Value = deviationHeaderEntity.PO_ID;

                    sqlparams[4] = new SqlParameter("@PO_Line_No", SqlDbType.Int);
                    sqlparams[4].Value = deviationHeaderEntity.PO_Line_No;

                    sqlparams[5] = new SqlParameter("@PO_Sched_No", SqlDbType.Int);
                    sqlparams[5].Value = deviationHeaderEntity.PO_Sched_No;

                    sqlparams[6] = new SqlParameter("@Inv_Item_Id", SqlDbType.NVarChar);
                    sqlparams[6].Value = deviationHeaderEntity.Inv_Item_Id;

                    sqlparams[7] = new SqlParameter("@Description", SqlDbType.NVarChar);
                    sqlparams[7].Value = deviationHeaderEntity.Description;

                    sqlparams[8] = new SqlParameter("@Unit_Of_Measure", SqlDbType.NVarChar);
                    sqlparams[8].Value = deviationHeaderEntity.Unit_Of_Measure;

                    sqlparams[9] = new SqlParameter("@Qty_PO", SqlDbType.Float);
                    sqlparams[9].Value = deviationHeaderEntity.Qty_PO;

                    sqlparams[10] = new SqlParameter("@Qty", SqlDbType.Float);
                    sqlparams[10].Value = deviationHeaderEntity.Qty;

                    sqlparams[11] = new SqlParameter("@ASN_Qty", SqlDbType.Float);
                    sqlparams[11].Value = deviationHeaderEntity.Qty_PO;

                    sqlparams[12] = new SqlParameter("@Recv_Uom", SqlDbType.NVarChar);
                    sqlparams[12].Value = deviationHeaderEntity.Recv_Uom;

                    sqlparams[13] = new SqlParameter("@Recv_Conversion_Rate", SqlDbType.Float);
                    sqlparams[13].Value = deviationHeaderEntity.Recv_Conversion_Rate;

                    sqlparams[14] = new SqlParameter("@Inventory_Item", SqlDbType.NVarChar);
                    sqlparams[14].Value = deviationHeaderEntity.Inventory_Item;

                    sqlparams[15] = new SqlParameter("@Deviation_Type", SqlDbType.Int);
                    sqlparams[15].Value = deviationHeaderEntity.Deviation_Type;

                    sqlparams[16] = new SqlParameter("@Vendor_Id", SqlDbType.NVarChar);
                    sqlparams[16].Value = deviationHeaderEntity.Vendor_Id;

                    sqlparams[17] = new SqlParameter("@Carrier_Id", SqlDbType.NVarChar);
                    sqlparams[17].Value = deviationHeaderEntity.Carrier_Id;

                    sqlparams[18] = new SqlParameter("@Custom_Item_No", SqlDbType.NVarChar);
                    sqlparams[18].Value = deviationHeaderEntity.Custom_Item_No;

                    sqlparams[19] = new SqlParameter("@Due_Date", SqlDbType.DateTime);
                    sqlparams[19].Value = deviationHeaderEntity.Due_Date;

                    sqlparams[20] = new SqlParameter("@Receipt_Date", SqlDbType.DateTime);
                    sqlparams[20].Value = deviationHeaderEntity.Receipt_Date;

                    sqlparams[21] = new SqlParameter("@update_Date", SqlDbType.DateTime);
                    sqlparams[21].Value = deviationHeaderEntity.update_Date;

                    sqlparams[22] = new SqlParameter("@Report_Data_1", SqlDbType.NVarChar);
                    sqlparams[22].Value = deviationHeaderEntity.Report_Data_1;

                    sqlparams[23] = new SqlParameter("@Report_Data_2", SqlDbType.NVarChar);
                    sqlparams[23].Value = deviationHeaderEntity.Report_Data_2;

                    sqlparams[24] = new SqlParameter("@Report_Data_3", SqlDbType.NVarChar);
                    sqlparams[24].Value = deviationHeaderEntity.Report_Data_3;

                    sqlparams[25] = new SqlParameter("@Report_Data_4", SqlDbType.NVarChar);
                    sqlparams[25].Value = deviationHeaderEntity.Report_Data_4;

                    sqlparams[26] = new SqlParameter("@Report_Data_5", SqlDbType.NVarChar);
                    sqlparams[26].Value = deviationHeaderEntity.Report_Data_5;

                    sqlparams[27] = new SqlParameter("@Location", SqlDbType.NVarChar);
                    sqlparams[27].Value = deviationHeaderEntity.Location;

                    sqlparams[28] = new SqlParameter("@User_Id", SqlDbType.NVarChar);
                    sqlparams[28].Value = deviationHeaderEntity.User_Id;

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }


                    var cnt = objContext.Database.ExecuteSqlCommand("exec Sp_Insert_Recv_Deviation_Header @Transaction_Id, @Line_No, @Business_Unit, @PO_ID, @PO_Line_No, @PO_Sched_No,@Inv_Item_Id, @Description, @Unit_Of_Measure,@Qty_PO,@Qty,@ASN_Qty,@Recv_Uom,@Recv_Conversion_Rate,@Inventory_Item,@Deviation_Type,@Vendor_Id,@Carrier_Id,@Custom_Item_No,@Due_Date,@Receipt_Date,@update_Date,@Report_Data_1,@Report_Data_2,@Report_Data_3,@Report_Data_4,@Report_Data_5,@Location,@User_Id", sqlparams[0], sqlparams[1], sqlparams[2], sqlparams[3], sqlparams[4], sqlparams[5], sqlparams[6], sqlparams[7], sqlparams[8], sqlparams[9], sqlparams[10], sqlparams[11], sqlparams[12], sqlparams[13], sqlparams[14], sqlparams[15], sqlparams[16], sqlparams[17], sqlparams[18], sqlparams[19], sqlparams[20], sqlparams[21], sqlparams[22], sqlparams[23], sqlparams[24], sqlparams[25], sqlparams[26], sqlparams[27], sqlparams[28]);


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Inserted rows Count " + cnt); }

                    StatusCode = AtparStatusCodes.ATPAR_OK;

                }

                return StatusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        #endregion

        #region GetDeptLevelInfo
        public List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetDeptLevelInfo(string location, string businessUnit, string orgGroupID, string vendorID, string orderDate)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[5];

                    sqlparams[0] = new SqlParameter("@LOCATION", SqlDbType.NVarChar);
                    sqlparams[0].Value = location;

                    sqlparams[1] = new SqlParameter("@BUSINESS_UNIT", SqlDbType.NVarChar);
                    sqlparams[1].Value = businessUnit;

                    sqlparams[2] = new SqlParameter("@ORG_GROUP_ID", SqlDbType.NVarChar);
                    sqlparams[2].Value = orgGroupID;

                    sqlparams[3] = new SqlParameter("@VENDOR_ID", SqlDbType.NVarChar);
                    sqlparams[3].Value = vendorID;
                    sqlparams[4] = new SqlParameter("@ORDER_DATE", SqlDbType.NVarChar);
                    //if (!string.IsNullOrEmpty(orderDate))
                    //{                       
                    sqlparams[4].Value = Convert.ToDateTime(DateTime.Now.ToString("yyyy/MM/dd hh:mm"));
                    //}
                    //else
                    //{

                    //    sqlparams[4].Value = DBNull.Value;
                    //}


                    sbSql = "EXEC GetDepartmentInfo @LOCATION,@BUSINESS_UNIT,@ORG_GROUP_ID,@VENDOR_ID,@ORDER_DATE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var fields = new[] { "CART_ID", "DEPARTMENT_ID", "LOCATION", "BUSINESS_UNIT" };

                    var lstDeptCarts = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>(fields, sbSql, sqlparams).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Department carts Returned: " + lstDeptCarts.Count()); }

                    return lstDeptCarts;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region GetPtwyOrderDtls
        public List<PAR_MNGT_ORDER_DETAILS> GetPtwyOrderDtls(string businessUnit, string location, string vendorID, string orderDt)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[4];

                    sqlparams[0] = new SqlParameter("@BUSINESS_UNIT", SqlDbType.NVarChar);
                    sqlparams[0].Value = businessUnit;

                    sqlparams[1] = new SqlParameter("@LOCATION", SqlDbType.NVarChar);
                    sqlparams[1].Value = location;

                    sqlparams[2] = new SqlParameter("@VENDOR_ID", SqlDbType.NVarChar);
                    sqlparams[2].Value = vendorID;

                    sqlparams[3] = new SqlParameter("@ORDER_DATE", SqlDbType.NVarChar);
                    sqlparams[3].Value = orderDt;


                    sbSql = "EXEC GetPtwyOrderDtls @BUSINESS_UNIT,@LOCATION,@VENDOR_ID,@ORDER_DATE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var fields = new[] { "ORDER_NO" };

                    var lstOrders = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ORDER_DETAILS>(fields, sbSql, sqlparams).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Orders Returned: " + lstOrders.Count()); }

                    return lstOrders;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region InsertDeviationDtls
        public long InsertDeviationDtls(int ordNo, string itemID, string storageLocation, Double qtyOrdered, Double qtyReceived, DateTime ptwyDt)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_POU_PTWY_DEVIATION_DETAILS(ORDER_ID,");
                    sbSql.Append(" PTWY_DATE_TIME, ITEM_ID, COMPARTMENT, QUANTITY_ORDERED, ");
                    sbSql.Append(" QUANTITY_RECEIVED) VALUES(" + ordNo + ", '" + ptwyDt + "',");
                    sbSql.Append(" '" + itemID + "','" + storageLocation.substituteString() + "',");
                    sbSql.Append(" " + qtyOrdered + ", " + qtyReceived + ")");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Deviations details inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region UpdateParMngtOrderDtls
        public long UpdateParMngtOrderDtls(Double qtyReceived, int orderStatus, int ordNo, string lineNo, string itemID, string transID = "")
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE PAR_MNGT_ORDER_DETAILS SET QTY_RCVD = QTY_RCVD + qtyReceived,TRANSACTION_ID= " + transID + " ");
                    sbSql.Append("ORDER_STATUS = " + orderStatus + " WHERE ORDER_NO = " + ordNo + " AND  ");
                    sbSql.Append("LINE_NO = '" + lineNo + "' AND  ITEM_ID = '" + itemID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Order details inserted " + count); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region InsertUpdateCartInventory
        public List<MT_POU_CART_INVENTORY> GetCartInventory(string BusinessUnit, DataRow dataRow)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID, ITEM_ID, ID, ACTUAL_QUANTITY, ");
                    sbSql.Append("COMPARTMENT, LOT_NUMBER, SERIAL_NUMBER  FROM MT_POU_CART_INVENTORY ");
                    sbSql.Append("WHERE BUSINESS_UNIT = '" + BusinessUnit + "' ");
                    sbSql.Append(" AND CART_ID = '" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "LOCATION")].ToString() + "' ");
                    sbSql.Append(" AND ITEM_ID = '" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "ITEM_ID")].ToString() + "' ");
                    sbSql.Append(" AND LOT_NUMBER ='" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "LOT_ID")].ToString() + "' ");
                    sbSql.Append(" AND SERIAL_NUMBER ='" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "SERIAL_ID")].ToString() + "' ");
                    sbSql.Append("ORDER BY COMPARTMENT DESC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "BUSINESS_UNIT", "CART_ID", "ITEM_ID", "ID", "ACTUAL_QUANTITY", "COMPARTMENT", "LOT_NUMBER", "SERIAL_NUMBER" };

                    var lstCountBefore = objContext.Database.DifferedExecuteQuery<MT_POU_CART_INVENTORY>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Carts returned " + lstCountBefore); }

                    return lstCountBefore;

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

        public long UpdateCartInventory(Double dblConvFactor, string qtyRound, DataRow dataRow, string bUnit, string comp)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_POU_CART_INVENTORY SET ITEM_QUANTITY_ON_HAND = ITEM_QUANTITY_ON_HAND +  ");

                    if (dblConvFactor > 1)
                    {

                        if (qtyRound == "Ceil")
                        {
                            sbSql.Append(" '" + Math.Ceiling(Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor) + "' ");

                        }
                        else if (qtyRound == "Floor")
                        {
                            sbSql.Append(" '" + Math.Floor(Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor) + "' ");
                        }
                    }
                    else
                    {
                        sbSql.Append(" '" + Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) + "' ");
                    }
                    sbSql.Append(", ACTUAL_QUANTITY = ACTUAL_QUANTITY + ");

                    if (dblConvFactor > 1)
                    {

                        if (qtyRound == "Ceil")
                        {
                            sbSql.Append(" '" + Math.Ceiling(Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor) + "' ");

                        }
                        else if (qtyRound == "Floor")
                        {
                            sbSql.Append(" '" + Math.Floor(Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor) + "' ");
                        }
                    }
                    else
                    {
                        sbSql.Append(" '" + Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) + "' ");
                    }

                    if (!string.IsNullOrEmpty(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "EXPIRY_DATE")].ToString()))
                    {
                        sbSql.Append(", EXPIRY_DATE = ' ");
                        sbSql.Append(" '" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "EXPIRY_DATE")].ToString() + "'");
                        sbSql.Append("'");
                    }

                    sbSql.Append(" WHERE");
                    sbSql.Append("BUSINESS_UNIT = '" + bUnit + "'");
                    sbSql.Append("AND CART_ID = '" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "LOCATION")].ToString() + "'");
                    sbSql.Append("AND ITEM_ID = '" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "ITEM_ID")].ToString() + "'");
                    sbSql.Append("AND LOT_NUMBER = '" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "LOT_ID")].ToString() + "'");
                    sbSql.Append("AND SERIAL_NUMBER = '" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "SERIAL_ID")].ToString() + "'");
                    sbSql.Append("AND COMPARTMENT ='" + comp + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of carts updated " + count); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long SaveInventoryTrackHistory(int transID, int eventType, int uniqueID, string bUnit, string cartID, string itemID, string compartment, string lotID, string serialID, double qty, double QOH, string endDate)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[16];

                    sqlparams[0] = new SqlParameter("@BUnit", SqlDbType.NVarChar, 50);
                    sqlparams[0].Value = bUnit;

                    sqlparams[1] = new SqlParameter("@ParLoc", SqlDbType.NVarChar, 50);
                    sqlparams[1].Value = cartID;

                    sqlparams[2] = new SqlParameter("@ItemID", SqlDbType.NVarChar, 50);
                    sqlparams[2].Value = itemID;

                    sqlparams[3] = new SqlParameter("@LotID", SqlDbType.NVarChar, 50);
                    sqlparams[3].Value = lotID;

                    sqlparams[4] = new SqlParameter("@SerialID", SqlDbType.NVarChar, 50);
                    sqlparams[4].Value = serialID;

                    sqlparams[5] = new SqlParameter("@Compartment", SqlDbType.NVarChar, 50);
                    sqlparams[5].Value = compartment;

                    sqlparams[6] = new SqlParameter("@transId", SqlDbType.Int);
                    sqlparams[6].Value = transID;

                    sqlparams[7] = new SqlParameter("@EventStatus", SqlDbType.Int);
                    sqlparams[7].Value = eventType;

                    sqlparams[8] = new SqlParameter("@ActualQty", SqlDbType.Float);
                    sqlparams[8].Value = qty;

                    sqlparams[9] = new SqlParameter("@OnHandQty", SqlDbType.Float);
                    sqlparams[9].Value = QOH;

                    sqlparams[10] = new SqlParameter("@UpdateDate", SqlDbType.DateTime);
                    sqlparams[10].Value = endDate;

                    sqlparams[11] = new SqlParameter("@UniqueID", SqlDbType.Int);
                    sqlparams[11].Value = uniqueID;

                    sqlparams[12] = new SqlParameter("@AdjustType", SqlDbType.Int);
                    sqlparams[12].Value = 0;

                    sqlparams[13] = new SqlParameter("@ChargeCaptureTransID", SqlDbType.Int);
                    sqlparams[13].Value = 0;

                    sqlparams[14] = new SqlParameter("@ReserveQtyOption", SqlDbType.NVarChar, 15);
                    sqlparams[14].Value = "";

                    sqlparams[15] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlparams[15].Direction = ParameterDirection.Output;

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var cnt = objContext.Database.ExecuteSqlCommand("exec SaveInventoryTrackHistory @BUnit, @ParLoc, @ItemID, @LotID, @SerialID, @Compartment, @transId, @EventStatus, @ActualQty, @OnHandQty, @UpdateDate, @UniqueID, @AdjustType, @ChargeCaptureTransID, @ReserveQtyOption, @StatusCode OUT ", sqlparams[0], sqlparams[1], sqlparams[2], sqlparams[3], sqlparams[4], sqlparams[5], sqlparams[6], sqlparams[7], sqlparams[8], sqlparams[9], sqlparams[10], sqlparams[11], sqlparams[12], sqlparams[13], sqlparams[14], sqlparams[15]);


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Inserted or Updated rows Count " + cnt); }

                    StatusCode = AtparStatusCodes.ATPAR_OK;

                }

                return StatusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        public long InsertCartInventory(DataRow dataRow, string bUnit, string location, string itemID, double dblConvFactor, string qtyRound)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_POU_CART_INVENTORY(BUSINESS_UNIT,CART_ID ");
                    sbSql.Append("ITEM_ID, LOT_NUMBER, SERIAL_NUMBER,COMPARTMENT, ITEM_QUANTITY_PAR, "); sbSql.Append("ITEM_QUANTITY_ON_HAND, ACTUAL_QUANTITY");

                    if (!string.IsNullOrEmpty(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "EXPIRY_DATE")].ToString()))
                    {
                        sbSql.Append(",EXPIRY_DATE");
                    }

                    sbSql.Append(")VALUES('");
                    sbSql.Append("bUnit");
                    sbSql.Append("','");
                    sbSql.Append(location);
                    sbSql.Append("','");
                    sbSql.Append(itemID);
                    sbSql.Append("','");
                    sbSql.Append(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "LOT_ID")].ToString());
                    sbSql.Append("','");
                    sbSql.Append(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "SERIAL_ID")].ToString());
                    sbSql.Append("','");
                    sbSql.Append(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "STORAGE_LOCATION")].ToString().substituteString());
                    sbSql.Append("',");
                    sbSql.Append(0);
                    sbSql.Append(",");

                    if (dblConvFactor > 1)
                    {

                        if (qtyRound == "Ceil")
                        {
                            sbSql.Append(" '" + Math.Ceiling(Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor) + "' ");

                        }
                        else if (qtyRound == "Floor")
                        {
                            sbSql.Append(" '" + Math.Floor(Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor) + "' ");
                        }
                    }
                    else
                    {
                        sbSql.Append(" '" + Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) + "' ");
                    }
                    sbSql.Append(", ");

                    if (dblConvFactor > 1)
                    {

                        if (qtyRound == "Ceil")
                        {
                            sbSql.Append(" '" + Math.Ceiling(Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor) + "' ");

                        }
                        else if (qtyRound == "Floor")
                        {
                            sbSql.Append(" '" + Math.Floor(Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor) + "' ");
                        }
                    }
                    else
                    {
                        sbSql.Append(" '" + Convert.ToDouble(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) + "' ");
                    }

                    if (!string.IsNullOrEmpty(dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "EXPIRY_DATE")].ToString()))
                    {
                        sbSql.Append(",'");
                        sbSql.Append(" '" + dataRow[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "EXPIRY_DATE")].ToString() + "'");
                        sbSql.Append("'");
                    }

                    sbSql.Append(")");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of carts inserted " + count); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region InsertDeviationHeaderDtls
        public long InsertDeviationHeaderDtls(int ordNo, string userID, string deviceID, string location, string bUnit, DateTime ptwyDt)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_POU_PTWY_DEVIATION_HEADER(ORDER_ID,PTWY_DATE_TIME ");
                    sbSql.Append("USER_ID, WORKSTATION_ID, CART_ID,BUSINESS_UNIT)VALUES( ");
                    sbSql.Append("" + ordNo + ",");
                    sbSql.Append("'" + ptwyDt + "',");
                    sbSql.Append("'" + userID + "',");
                    sbSql.Append("'" + deviceID + "',");
                    sbSql.Append("'" + location + "',");
                    sbSql.Append("'" + bUnit + "')");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Headers inserted " + count); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region SaveNotesDetails
        public long SaveNotesDetails(DataTable notesData)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    for (int i = 0; i <= notesData.Rows.Count - 1; i++)
                    {

                        sbSql.Append("INSERT INTO MT_ATPAR_NOTES (KEY_1, KEY_2, KEY_3, KEY_4 ");
                        sbSql.Append("KEY_5, KEY_6, KEY_7, KEY_8, KEY_9, KEY_10, KEY_11, ");
                        sbSql.Append("KEY_12, KEY_13, APP_ID, SCREEN_NAME, TRANS_ID, CODE, ");
                        sbSql.Append("NOTES, DATE_TIME) VALUES( ");

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_1.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_1.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }


                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_2.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_2.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_3.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_3.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }


                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_4.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_4.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }


                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_5.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_5.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }


                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_6.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_6.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_7.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_7.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }


                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_8.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_8.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_9.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_9.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_10.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_10.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_11.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_11.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }


                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_12.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_12.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }


                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_13.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_13.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }


                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.APP_ID.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.APP_ID.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.SCREEN_NAME.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.SCREEN_NAME.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.TRANS_ID.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.TRANS_ID.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.CODE.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.CODE.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }


                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.NOTES.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.NOTES.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        if (!string.IsNullOrEmpty(notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.DATE_TIME.ToString()].ToString()))
                        {
                            sbSql.Append("'" + notesData.Rows[i][AtParWebEnums.Send_Notes_Input_DETAILS_Enum.DATE_TIME.ToString()].ToString() + "',");
                        }
                        else
                        {
                            sbSql.Append("'',");
                        }

                        sbSql.Append(") ");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;



                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;

            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region InsertIUTReceiveDeviationHeader
        public long InsertIUTReceiveDeviationHeader(IUT_RECV_Deviation_Header_Entity deviationHeaderEntity)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[29];

                    sqlparams[0] = new SqlParameter("@Transaction_Id", SqlDbType.Int);
                    sqlparams[0].Value = deviationHeaderEntity.Transaction_Id;

                    sqlparams[1] = new SqlParameter("@Line_No", SqlDbType.Int);
                    sqlparams[1].Value = deviationHeaderEntity.Line_No;

                    sqlparams[2] = new SqlParameter("@Business_Unit", SqlDbType.NVarChar);
                    sqlparams[2].Value = deviationHeaderEntity.Business_Unit;

                    sqlparams[3] = new SqlParameter("@PO_ID", SqlDbType.NVarChar);
                    sqlparams[3].Value = deviationHeaderEntity.PO_ID;

                    sqlparams[4] = new SqlParameter("@PO_Line_No", SqlDbType.Int);
                    sqlparams[4].Value = deviationHeaderEntity.PO_Line_No;

                    sqlparams[5] = new SqlParameter("@PO_Sched_No", SqlDbType.Int);
                    sqlparams[5].Value = deviationHeaderEntity.PO_Sched_No;

                    sqlparams[6] = new SqlParameter("@Inv_Item_Id", SqlDbType.NVarChar);
                    sqlparams[6].Value = deviationHeaderEntity.Inv_Item_Id;

                    sqlparams[7] = new SqlParameter("@Description", SqlDbType.NVarChar);
                    sqlparams[7].Value = deviationHeaderEntity.Description;

                    sqlparams[8] = new SqlParameter("@Unit_Of_Measure", SqlDbType.NVarChar);
                    sqlparams[8].Value = deviationHeaderEntity.Unit_Of_Measure;

                    sqlparams[9] = new SqlParameter("@Qty_PO", SqlDbType.Float);
                    sqlparams[9].Value = deviationHeaderEntity.Qty_PO;

                    sqlparams[10] = new SqlParameter("@Qty", SqlDbType.Float);
                    sqlparams[10].Value = deviationHeaderEntity.Qty;

                    sqlparams[11] = new SqlParameter("@ASN_Qty", SqlDbType.Float);
                    sqlparams[11].Value = deviationHeaderEntity.Qty_PO;

                    sqlparams[12] = new SqlParameter("@Recv_Uom", SqlDbType.NVarChar);
                    sqlparams[12].Value = deviationHeaderEntity.Recv_Uom;

                    sqlparams[13] = new SqlParameter("@Recv_Conversion_Rate", SqlDbType.Float);
                    sqlparams[13].Value = deviationHeaderEntity.Recv_Conversion_Rate;

                    sqlparams[14] = new SqlParameter("@Inventory_Item", SqlDbType.NVarChar);
                    sqlparams[14].Value = deviationHeaderEntity.Inventory_Item;

                    sqlparams[15] = new SqlParameter("@Deviation_Type", SqlDbType.Int);
                    sqlparams[15].Value = deviationHeaderEntity.Deviation_Type;

                    sqlparams[16] = new SqlParameter("@Vendor_Id", SqlDbType.NVarChar);
                    sqlparams[16].Value = deviationHeaderEntity.Vendor_Id;

                    sqlparams[17] = new SqlParameter("@Carrier_Id", SqlDbType.NVarChar);
                    sqlparams[17].Value = deviationHeaderEntity.Carrier_Id;

                    sqlparams[18] = new SqlParameter("@Custom_Item_No", SqlDbType.NVarChar);
                    sqlparams[18].Value = deviationHeaderEntity.Custom_Item_No;

                    sqlparams[19] = new SqlParameter("@Due_Date", SqlDbType.DateTime);
                    sqlparams[19].Value = deviationHeaderEntity.Due_Date;

                    sqlparams[20] = new SqlParameter("@Receipt_Date", SqlDbType.DateTime);
                    sqlparams[20].Value = deviationHeaderEntity.Receipt_Date;

                    sqlparams[21] = new SqlParameter("@update_Date", SqlDbType.DateTime);
                    sqlparams[21].Value = deviationHeaderEntity.update_Date;

                    sqlparams[22] = new SqlParameter("@Report_Data_1", SqlDbType.NVarChar);
                    sqlparams[22].Value = deviationHeaderEntity.Report_Data_1;

                    sqlparams[23] = new SqlParameter("@Report_Data_2", SqlDbType.NVarChar);
                    sqlparams[23].Value = deviationHeaderEntity.Report_Data_2;

                    sqlparams[24] = new SqlParameter("@Report_Data_3", SqlDbType.NVarChar);
                    sqlparams[24].Value = deviationHeaderEntity.Report_Data_3;

                    sqlparams[25] = new SqlParameter("@Report_Data_4", SqlDbType.NVarChar);
                    sqlparams[25].Value = deviationHeaderEntity.Report_Data_4;

                    sqlparams[26] = new SqlParameter("@Report_Data_5", SqlDbType.NVarChar);
                    sqlparams[26].Value = deviationHeaderEntity.Report_Data_5;

                    sqlparams[27] = new SqlParameter("@Location", SqlDbType.NVarChar);
                    sqlparams[27].Value = deviationHeaderEntity.Location;

                    sqlparams[28] = new SqlParameter("@User_Id", SqlDbType.NVarChar);
                    sqlparams[28].Value = deviationHeaderEntity.User_Id;

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }


                    var cnt = objContext.Database.ExecuteSqlCommand("exec Sp_Insert_Recv_Deviation_Header @Transaction_Id, @Line_No, @Business_Unit, @PO_ID, @PO_Line_No, @PO_Sched_No,@Inv_Item_Id, @Description, @Unit_Of_Measure,@Qty_PO,@Qty,@ASN_Qty,@Recv_Uom,@Recv_Conversion_Rate,@Inventory_Item,@Deviation_Type,@Vendor_Id,@Carrier_Id,@Custom_Item_No,@Due_Date,@Receipt_Date,@update_Date,@Report_Data_1,@Report_Data_2,@Report_Data_3,@Report_Data_4,@Report_Data_5,@Location,@User_Id", sqlparams[0], sqlparams[1], sqlparams[2], sqlparams[3], sqlparams[4], sqlparams[5], sqlparams[6], sqlparams[7], sqlparams[8], sqlparams[9], sqlparams[10], sqlparams[11], sqlparams[12], sqlparams[13], sqlparams[14], sqlparams[15], sqlparams[16], sqlparams[17], sqlparams[18], sqlparams[19], sqlparams[20], sqlparams[21], sqlparams[22], sqlparams[23], sqlparams[24], sqlparams[25], sqlparams[26], sqlparams[27], sqlparams[28]);


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Inserted rows Count " + cnt); }

                    StatusCode = AtparStatusCodes.ATPAR_OK;

                }

                return StatusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        #endregion

        #region GetPrintHeaderItemDetails
        public Tuple<List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>> GetPrintHeaderItemDetails()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_PRINT_LABEL_DETAILS> lst1 = null;
            List<MT_ATPAR_PRINT_LABEL_DETAILS> lst2 = null;
            List<MT_ATPAR_PRINT_LABEL_DETAILS> lst3 = null;
            List<MT_ATPAR_PRINT_LABEL_DETAILS> lst4 = null;
            Tuple<List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>> lstTplResult = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PLD.APP_ID,PLD.OBJECT_ID,PLD.FIELD_NAME,PLD.TEXT_VALUE,PLD.FIELD_GROUP,");
                    sbSql.Append("PLD.ROW_POSITION,PLD.COLUMN_POSITION,PLD.COLUMN_SPAN,PLD.DISPLAY_NAME,PLD.VISIBLE, ");
                    sbSql.Append("ALIGNMENT,PLD.HEADERFONT,PLD.VALUEFONT,PLH.FIELD_TYPE,PLH.FIELD_SIZE,PLD.LINE_NO FROM ");
                    sbSql.Append("MT_ATPAR_PRINT_LABEL_DETAILS PLD,MT_ATPAR_PRINT_FIELD_DEFAULTS PLH WHERE PLH.APP_ID = PLD.APP_ID ");
                    sbSql.Append("And PLH.OBJECT_ID = PLD.OBJECT_ID And PLH.OBJECT_ID = 'DELIVERY SLIP' ");
                    sbSql.Append("AND PLD.APP_ID ='" + (int)AtParWebEnums.EnumApps.Receiving + "' AND VISIBLE=1 ");
                    sbSql.Append("AND PLH.LINE_NO=PLD.LINE_NO AND SECTION='HEADER' ORDER BY ROW_POSITION,COLUMN_POSITION ASC; ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    string[] ffileds = { "APP_ID","OBJECT_ID","FIELD_NAME","TEXT_VALUE","FIELD_GROUP","ROW_POSITION","COLUMN_POSITION","COLUMN_SPAN","DISPLAY_NAME","VISIBLE",
                     "ALIGNMENT","HEADERFONT","VALUEFONT","FIELD_TYPE","FIELD_SIZE","LINE_NO" };

                    lst1 = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PRINT_LABEL_DETAILS>(ffileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lst1); }
                    sbSql.Clear();
                    sbSql.Append("SELECT PLD.APP_ID,PLD.OBJECT_ID,PLD.FIELD_NAME,PLD.TEXT_VALUE,");
                    sbSql.Append("PLD.FIELD_GROUP,PLD.ROW_POSITION,PLD.COLUMN_POSITION,PLD.DISPLAY_NAME,PLD.VISIBLE,ALIGNMENT, ");
                    sbSql.Append("PLD.HEADERFONT,PLD.VALUEFONT,PLH.FIELD_TYPE,PLH.FIELD_SIZE,PLD.COLUMN_SPAN,PLD.LINE_NO ");
                    sbSql.Append("FROM MT_ATPAR_PRINT_LABEL_DETAILS PLD,MT_ATPAR_PRINT_FIELD_DEFAULTS PLH WHERE  ");
                    sbSql.Append("PLH.APP_ID = PLD.APP_ID And PLH.OBJECT_ID = PLD.OBJECT_ID And PLH.OBJECT_ID = 'DELIVERY SLIP'");
                    sbSql.Append("AND PLD.APP_ID ='" + (int)AtParWebEnums.EnumApps.Receiving + "' AND VISIBLE=1 AND ");
                    sbSql.Append("PLH.LINE_NO=PLD.LINE_NO AND SECTION='DETAILS' ORDER BY ROW_POSITION,COLUMN_POSITION ASC; ");
                    string[] sfileds = { "APP_ID","OBJECT_ID","FIELD_NAME","TEXT_VALUE","FIELD_GROUP","ROW_POSITION","COLUMN_POSITION","COLUMN_SPAN","DISPLAY_NAME","VISIBLE",
                     "ALIGNMENT","HEADERFONT","VALUEFONT","FIELD_TYPE","FIELD_SIZE","LINE_NO" };
                    lst2 = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PRINT_LABEL_DETAILS>(sfileds, sbSql.ToString()).ToList();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lst2); }
                    sbSql.Clear();
                    sbSql.Append("SELECT DISTINCT HEADERFONT,VALUEFONT FROM  MT_ATPAR_PRINT_LABEL_DETAILS PLD, ");
                    sbSql.Append("MT_ATPAR_PRINT_FIELD_DEFAULTS PLH WHERE PLH.APP_ID = PLD.APP_ID And ");
                    sbSql.Append("PLH.OBJECT_ID = PLD.OBJECT_ID AND VISIBLE=1 AND PLH.LINE_NO=PLD.LINE_NO AND ");
                    sbSql.Append("PLD.TEXT_VALUE='TEXT' AND PLD.APP_ID ='" + (int)AtParWebEnums.EnumApps.Receiving + "' AND  ");
                    sbSql.Append("PLD.OBJECT_ID='DELIVERY SLIP' AND SECTION='HEADER'; ");
                    string[] fileds = { "HEADERFONT", "VALUEFONT" };
                    lst3 = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PRINT_LABEL_DETAILS>(fileds, sbSql.ToString()).ToList();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lst3); }
                    sbSql.Clear();
                    sbSql.Append("SELECT DISTINCT HEADERFONT,VALUEFONT FROM  MT_ATPAR_PRINT_LABEL_DETAILS PLD, ");
                    sbSql.Append("MT_ATPAR_PRINT_FIELD_DEFAULTS PLH WHERE PLH.APP_ID = PLD.APP_ID And ");
                    sbSql.Append("PLH.OBJECT_ID = PLD.OBJECT_ID AND VISIBLE=1 AND PLH.LINE_NO=PLD.LINE_NO");
                    sbSql.Append(" AND PLD.TEXT_VALUE='VALUE' AND ");
                    sbSql.Append(" PLD.APP_ID ='" + (int)AtParWebEnums.EnumApps.Receiving + "' AND PLD.OBJECT_ID='DELIVERY SLIP' AND ");
                    sbSql.Append("SECTION='DETAILS' ");
                    string[] hfileds = { "HEADERFONT", "VALUEFONT" };
                    lst4 = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PRINT_LABEL_DETAILS>(hfileds, sbSql.ToString()).ToList();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lst4); }


                    lstTplResult = new Tuple<List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>>(lst1, lst2, lst3, lst4);

                    return lstTplResult;
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

        #region GetBusinessUnit

        public string GetBusinessUnit(string bUnit, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BUSINESS_UNIT='").Append(bUnit).Append("'");
                    sbSql.Append("AND ORG_GROUP_ID='").Append(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]).Append("'AND BU_TYPE='P' ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var bUnits = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (bUnits == null)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + bUnits); }

                        return bUnits;
                    }
                    else
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + bUnits.ToString()); }

                        return bUnits.ToString();
                    }
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

        #region BusinessUnitCount
        public int GetInitBusinessUnitCount(DataSet inputParameters)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(BUSINESS_UNIT) FROM MT_ATPAR_IBU_ALLOCATION WHERE BUSINESS_UNIT='").Append(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SearchIUT_Header_Enum.BUSINESS_UNIT.ToString()]).Append("'");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows count " + count); }

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

        public int GetPtwyBusinessUnitCount(DataSet inputParameters)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(BUSINESS_UNIT) FROM MT_PTWY_BU_ALLOCATION WHERE BUSINESS_UNIT='").Append(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SearchIUT_Header_Enum.BUSINESS_UNIT.ToString()]).Append("'");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows count " + count); }


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
        #endregion

        #region GetBadgeDetails
        public List<RM_USER_LOCATIONS> GetBadgeDetails(string recpName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ISNULL(FIRST_NAME,' ') + ' ' + ISNULL(MIDDLE_NAME,' ') + ' ' + ISNULL(LAST_NAME,' ') ");
                    sbSql.Append("AS RECIEPENTNAME , EMPLOYEE_ID, PHONE_NO, ADDRESS_1, ADDRESS_2, ADDRESS_3, ADDRESS_4,LOCATION , BADGE_ID, SSN_NO, ");
                    sbSql.Append(" DEPT_ID, LOC_DESCR FROM  RM_USER_LOCATIONS ");

                    if (recpName != string.Empty)
                    {
                        sbSql.Append(" WHERE FIRST_NAME LIKE '" + recpName + "%' OR LAST_NAME LIKE '" + recpName + "%' ");
                    }
                    sbSql.Append(" ORDER BY RECIEPENTNAME ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "RECIEPENTNAME", "EMPLOYEE_ID", "PHONE_NO", "ADDRESS_1", "ADDRESS_2", "ADDRESS_3", "ADDRESS_4", "LOCATION", "BADGE_ID", "SSN_NO", "DEPT_ID", "LOC_DESCR" };

                    var lstLocations = objContext.Database.DifferedExecuteQuery<RM_USER_LOCATIONS>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstLocations); }

                    return lstLocations;
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

        #region checkIfTrackingExists
        public bool checkIfTrackingExists(string trackingNo)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT COUNT(*) FROM MT_ATPAR_DETAIL_TRANSACTION WHERE REPORT_DATA_3='" + trackingNo + "' ");
                    sbSql.Append(" AND APP_ID = " + (int)AtParWebEnums.EnumApps.Deliver + " AND STATUS NOT IN(" + (int)AtParWebEnums.AppTransactionStatus.statDelivery + ") ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    result = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + result); }


                    if (result > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
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

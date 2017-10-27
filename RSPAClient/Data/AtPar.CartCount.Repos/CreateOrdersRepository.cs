using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CartCount.Repos
{
    public class CreateOrdersRepository : ICreateOrdersRepository
    {

        #region Private Variable

        private ILog _log;

        #endregion

        public CreateOrdersRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CreateOrdersRepository));
        }


        #region Public Methods
      

        #region GetTransactionRecords
        public List<MT_ATPAR_TRANSACTION> GetTransactionRecords(string orgGroupID, string BusinessUnit, string ID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT TOP 5 TRANSACTION_ID, CONVERT(datetime, CONVERT(NVARCHAR(50),UPDATE_DT_TIME ,121)) ");
                    sbSql.Append("AS UPDATE_DT_TIME, UPDATE_DAY = (SELECT DATENAME(WEEKDAY, UPDATE_DT_TIME)),  ");
                    sbSql.Append("UPDATE_HOUR = (SELECT DATENAME(hour, UPDATE_DT_TIME)), ");
                    sbSql.Append("UPDATE_MINUTE = (SELECT DATENAME(minute, UPDATE_DT_TIME)), ");
                    sbSql.Append("CONVERT(NVARCHAR(50), UPDATE_DT_TIME, 121) ");
                    sbSql.Append(" AS DATESTRING ");
                    sbSql.Append("FROM MT_ATPAR_TRANSACTION WHERE REPORT_DATA_2 = '" + orgGroupID + "' ");
                    sbSql.Append("AND BUSINESS_UNIT= '" + BusinessUnit + "' AND ID ='" + ID + "'");
                    sbSql.Append("AND STATUS NOT IN ('" + AtParDefns.statError + "', ");
                    sbSql.Append(" '" + AtParDefns.statCancel + "','" + AtParDefns.statDownloaded + "', ");
                    sbSql.Append(" '" + AtParDefns.statCartPutAwayDownload + "','" + AtParDefns.statPutAway + "') ");
                    sbSql.Append("ORDER BY UPDATE_DT_TIME DESC");

                    var fileds = new[] { "TRANSACTION_ID", "UPDATE_DT_TIME", "UPDATE_DAY", "UPDATE_HOUR", "UPDATE_MINUTE", "DATESTRING" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<MT_ATPAR_TRANSACTION>(fileds, sbSql.ToString()).ToList();


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

        #region GetItemIds
        public Tuple<List<string>, List<string>> GetItemIds(string IDs)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<string> ids = null;
            List<string> ids1 = null;
            Tuple<List<string>, List<string>> tupleItemIds = null; 

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter sql_param_ids = new SqlParameter("@ids", SqlDbType.NVarChar);
                    sql_param_ids.Value = IDs;

                    SqlParameter sql_param_ids1 = new SqlParameter("@ids", SqlDbType.NVarChar);
                    sql_param_ids1.Value = IDs;

                    object[] parameters = { sql_param_ids };
                    object[] parameters1 = { sql_param_ids1 };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    ids = objContext.Database.SqlQuery<string>("SELECT sID FROM fnSplitintoTable(@ids) Ids GROUP BY sID HAVING(COUNT(sID) < 2)  ", parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned system Ids Count " + ids.Count()); }

                    ids1 = objContext.Database.SqlQuery<string>("SELECT sID FROM fnSplitintoTable(@ids) Ids GROUP BY sID HAVING(COUNT(sID) > 1)  ", parameters1).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned system Ids Count " + ids1.Count()); }

                    tupleItemIds = new Tuple<List<string>, List<string>>(ids, ids1);

                    return tupleItemIds;

                }


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        #endregion

        #region GetItemIdDetails
        public List<VM_ATPAR_CART_PREV_COUNTS> GetItemIdDetails(string IDs, string dateValue1, string dateValue2, string dateValue3, string dateValue4, string dateValue5)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<VM_ATPAR_CART_PREV_COUNTS> lstCartPrevCounts = null;

            try
            {


                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter sql_parm_Ids = new SqlParameter("@IDS", SqlDbType.VarChar, -1);
                    sql_parm_Ids.Value = IDs;
                    SqlParameter sql_parm_dt1 = new SqlParameter("@DATEVALUE1", SqlDbType.VarChar, 50);
                    sql_parm_dt1.Value = dateValue1;
                    SqlParameter sql_parm_dt2 = new SqlParameter("@DATEVALUE2", SqlDbType.VarChar, 50);
                    sql_parm_dt2.Value = dateValue2;
                    SqlParameter sql_parm_dt3 = new SqlParameter("@DATEVALUE3", SqlDbType.VarChar, 50);
                    sql_parm_dt3.Value = dateValue3;
                    SqlParameter sql_parm_dt4 = new SqlParameter("@DATEVALUE4", SqlDbType.VarChar, 50);
                    sql_parm_dt4.Value = dateValue4;
                    SqlParameter sql_parm_dt5 = new SqlParameter("@DATEVALUE5", SqlDbType.VarChar, 50);
                    sql_parm_dt5.Value = dateValue5;

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "ITEMID", "QTY" };

                   lstCartPrevCounts = objContext.Database.DifferedExecuteQuery<VM_ATPAR_CART_PREV_COUNTS>(fields, "EXEC sp_GetDetailsFromDb @IDS, @DATEVALUE1, @DATEVALUE2, @DATEVALUE3, @DATEVALUE4, @DATEVALUE5", sql_parm_Ids, sql_parm_dt1, sql_parm_dt2, sql_parm_dt3, sql_parm_dt4, sql_parm_dt5).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned system Ids Count " + lstCartPrevCounts.Count()); }

                    return lstCartPrevCounts;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }
        #endregion

        #region GetDetailsForRepeatedIds
        public List<VM_ATPAR_CART_PREV_COUNTS> GetDetailsForRepeatedIds(string IDs, string dateValue1, string dateValue2, string dateValue3, string dateValue4, string dateValue5)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {


                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter sql_parm_Ids = new SqlParameter("@iDs", SqlDbType.VarChar, -1);
                    sql_parm_Ids.Value = IDs;
                    SqlParameter sql_parm_dt1 = new SqlParameter("@dateValue1", SqlDbType.VarChar, 50);
                    sql_parm_dt1.Value = dateValue1;
                    SqlParameter sql_parm_dt2 = new SqlParameter("@dateValue2", SqlDbType.VarChar, 50);
                    sql_parm_dt2.Value = dateValue2;
                    SqlParameter sql_parm_dt3 = new SqlParameter("@dateValue3", SqlDbType.VarChar, 50);
                    sql_parm_dt3.Value = dateValue3;
                    SqlParameter sql_parm_dt4 = new SqlParameter("@dateValue4", SqlDbType.VarChar, 50);
                    sql_parm_dt4.Value = dateValue4;
                    SqlParameter sql_parm_dt5 = new SqlParameter("@dateValue5", SqlDbType.VarChar, 50);
                    sql_parm_dt5.Value = dateValue5;

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstCartPrevCounts = objContext.Database.SqlQuery<VM_ATPAR_CART_PREV_COUNTS>("EXEC sp_GetDetailsForRepatedIds @iDs,@dateValue1,@dateValue2,@dateValue3,@dateValue4,@dateValue5", sql_parm_Ids, sql_parm_dt1, sql_parm_dt2, sql_parm_dt3, sql_parm_dt4, sql_parm_dt5).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Repeated system Ids Count " + lstCartPrevCounts.Count()); }

                    return lstCartPrevCounts;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }


        #endregion



        #region GetCostCenter
        public string GetCostCenter(DataSet dsDataItems)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT COST_CENTER FROM PAR_MNGT_PAR_LOC_DETAILS WHERE ORG_ID = ");
                    sbSql.Append("'" + dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT] + "'");
                    sbSql.Append(" AND PAR_LOC_ID = '" + dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID] + "'");
                    sbSql.Append(" AND STATUS = '0' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var lstcostCenter = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList().FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of costcenters returned " + lstcostCenter); }

                    return lstcostCenter;

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

        #region InsertPreviousCounts
        public long InsertPreviousCounts(DataSet inputParameter, DataRow dataRow)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_CART_PREV_COUNTS(TRANSACTION_ID, ITEM_ID, COMPARTMENT, COUNT_QTY)");
                    sbSql.Append(" VALUES(" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID] + ", ");
                    sbSql.Append(" '" + dataRow[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID] + "' ,");
                    sbSql.Append(" '" + dataRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT] + "' ,");
                    sbSql.Append(" '" + dataRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_QUANTITY] + "' )");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of costcenters returned " + count); }


                    return AtparStatusCodes.ATPAR_OK;

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

        #region InsertParAudit
        public long InsertParAudit(DataSet inputParameter, DataRow dataRow)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string strTransId = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID] != null)
                    {
                        if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID].ToString().Length > 0)
                        {
                            strTransId = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID].ToString();

                        }
                    }
                    else if (dataRow[(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID].ToString() != null)
                    {
                        if (dataRow[(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID].ToString().Length > 0)
                        {
                            strTransId = dataRow[(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID].ToString();
                        }
                    }

                    sbSql.Append("INSERT INTO MT_CRCT_PAR_AUDIT (KEY_1, KEY_2, KEY_3,KEY_4, OLD_PAR_VALUE,");
                    sbSql.Append("NEW_PAR_VALUE,TRANSACTION_ID, UPDATE_DATE, USER_ID,UOM,KEY_5)VALUES ");
                    sbSql.Append("('" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT] + "', ");
                    sbSql.Append(" '" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID] + "', ");
                    sbSql.Append(" '" + dataRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT] + "', ");
                    sbSql.Append(" '" + dataRow[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID] + "', ");
                    sbSql.Append(" '" + dataRow[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY] + "', ");
                    sbSql.Append(" '" + dataRow[(int)AtParWebEnums.Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY] + "', ");
                    sbSql.Append(" " + strTransId + ", '" + DateTime.Now + "', ");
                    sbSql.Append(" '" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.USER_ID] + "', ");
                    sbSql.Append(" '" + dataRow[(int)AtParWebEnums.Send_Cart_Details_Enum.UOM] + "', ");
                    sbSql.Append(" '" + dataRow[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_DESCR] + "') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }



                    return AtparStatusCodes.ATPAR_OK;
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

        #region GetCountBefore
        public string GetCountBefore(DataSet inputParameter)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT_BEFORE = CASE WHEN COUNT_BEFORE IS NULL THEN '' ELSE COUNT_BEFORE END FROM MT_CRCT_USER_ALLOCATION ");
                    sbSql.Append(" WHERE BUSINESS_UNIT ='" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT] + "' ");
                    sbSql.Append(" AND CART_ID = '" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID] + "' ");
                    sbSql.Append(" AND USER_ID = '" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.USER_ID] + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var lstCountBefore = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList().FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of count Before returned " + lstCountBefore); }

                    return lstCountBefore;

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

        #region InsertDeviation
        public long InsertDeviation(AtPar_Deviation_Entity deviationDetails)
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

                    if ((deviationDetails.ApplicationId == 0) || (deviationDetails.BusinessUnit.Length == 0))
                    {
                        return AtparStatusCodes.E_INVALIDPARAMETER;
                    }
                    else
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }

                    if (StatusCode == AtparStatusCodes.ATPAR_OK)
                    {
                        sbSql.Append("INSERT INTO MT_ATPAR_DEVIATION (APP_ID, BUSINESS_UNIT, KEY_1,KEY_2, ");
                        sbSql.Append("KEY_3,KEY_4, KEY_5, KEY_6 ");


                        if (deviationDetails.ReportData1.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_1 ");
                        }

                        if (deviationDetails.ReportData2.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_2 ");
                        }

                        if (deviationDetails.ReportData3.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_3 ");
                        }

                        if (deviationDetails.ReportData4.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_4 ");
                        }

                        if (deviationDetails.ReportData5.ToString() != null)
                        {
                            sbSql.Append(",REPORT_DATA_5 ");
                        }

                        if (deviationDetails.ReportData6 != null)
                        {
                            sbSql.Append(",REPORT_DATA_6 ");
                        }

                        if (deviationDetails.ReportData7 != null)
                        {
                            sbSql.Append(",REPORT_DATA_7 ");
                        }

                        if (deviationDetails.ReportData8 != null)
                        {
                            sbSql.Append(",REPORT_DATA_8 ");
                        }

                        if (deviationDetails.ReportData9 != null)
                        {
                            sbSql.Append(",REPORT_DATA_9 ");
                        }

                        if (deviationDetails.ReportData10 != null)
                        {
                            sbSql.Append(",REPORT_DATA_10 ");
                        }

                        if (deviationDetails.ReportData11 != null)
                        {
                            sbSql.Append(",REPORT_DATA_11 ");
                        }

                        if (deviationDetails.ReportData12 != null)
                        {
                            sbSql.Append(",REPORT_DATA_12 ");
                        }

                        if (deviationDetails.ReportData13 != null)
                        {
                            sbSql.Append(",REPORT_DATA_13 ");
                        }

                        if (deviationDetails.ReportData14 != null)
                        {
                            sbSql.Append(",REPORT_DATA_14 ");
                        }

                        if (deviationDetails.ReportData15 != null)
                        {
                            sbSql.Append(",REPORT_DATA_15 ");
                        }

                        if (deviationDetails.UserId != null)
                        {
                            sbSql.Append(",USER_ID ");
                        }

                        sbSql.Append(",UPDATE_DATE ");

                        sbSql.Append(" )VALUES (" + deviationDetails.ApplicationId + ", ");
                        sbSql.Append(" '" + deviationDetails.BusinessUnit + "','" + deviationDetails.Key1 + "' ");
                        sbSql.Append(" ,'" + deviationDetails.Key2 + "','" + deviationDetails.Key3 + "'");
                        sbSql.Append(" ,'" + deviationDetails.Key4 + "','" + deviationDetails.Key5 + "','" + deviationDetails.Key6 + "' ");

                        if (deviationDetails.ReportData1.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData1 + "' ");
                        }

                        if (deviationDetails.ReportData2.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData2 + "' ");
                        }

                        if (deviationDetails.ReportData3.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData3 + "' ");
                        }

                        if (deviationDetails.ReportData4.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData4 + "' ");
                        }

                        if (deviationDetails.ReportData5.ToString() != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData5 + "' ");
                        }

                        if (deviationDetails.ReportData6 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData6 + "' ");
                        }

                        if (deviationDetails.ReportData7 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData7 + "' ");
                        }


                        if (deviationDetails.ReportData8 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData8 + "' ");
                        }

                        if (deviationDetails.ReportData9 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData9 + "' ");
                        }

                        if (deviationDetails.ReportData10 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData10 + "' ");
                        }

                        if (deviationDetails.ReportData11 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData11 + "' ");
                        }

                        if (deviationDetails.ReportData12 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData12 + "' ");
                        }

                        if (deviationDetails.ReportData13 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData13.Replace("'", "''") + "' ");
                        }

                        if (deviationDetails.ReportData14 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData14.Replace("'", "''") + "' ");
                        }

                        if (deviationDetails.ReportData15 != null)
                        {
                            sbSql.Append(",'" + deviationDetails.ReportData15.Replace("'", "''") + "' ");
                        }

                        if (deviationDetails.UserId != null)
                        {
                            sbSql.Append(",'" + deviationDetails.UserId + "' ");
                        }

                        if (!string.IsNullOrEmpty(deviationDetails.UpdateDate))
                        {
                            sbSql.Append(",'" + deviationDetails.UpdateDate + "' ");
                        }
                        else
                        {
                            sbSql.Append(",GetDate()) ");
                        }



                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                        }

                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }



                        return AtparStatusCodes.ATPAR_OK;
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

        #region GetOrderQty
        public Tuple<Double, string> GetOrderQty(string businessUnit, string cartPutaway, string cartId, string compartment, string itemId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            Double orderQty = 0;
            string lastOrderDate = string.Empty;
            Tuple<Double, string> tupleOrderQty = null; 
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (cartPutaway == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        sbSql.Append("SELECT ISNULL(SUM(REPORT_DATA_12 - (CASE WHEN REPORT_DATA_5 IS NULL THEN 0 ELSE REPORT_DATA_5 END)), 0) ");
                        sbSql.Append("AS ORDER_QTY, CONVERT(NVARCHAR(5), MAX(UPDATE_DATE), 101) + ' ' + ");
                        sbSql.Append(" LTRIM(SUBSTRING(CONVERT(VARCHAR(20), CONVERT(DATETIME, MAX(UPDATE_DATE)), 22), 10, 5) + ");
                        sbSql.Append(" RIGHT(CONVERT(VARCHAR(20),CONVERT(DATETIME, MAX(UPDATE_DATE)), 22), 3)) ");
                        sbSql.Append(" AS ORDER_DATE FROM MT_ATPAR_DEVIATION WHERE BUSINESS_UNIT = '" + businessUnit + "'"); 
                        sbSql.Append("  AND KEY_4 = '" + cartId + "' AND APP_ID = " + AtParWebEnums.EnumApps.CartCount + " AND ");
                        sbSql.Append(" KEY_5  = '" + compartment + "' AND KEY_6 = '" + itemId + "' ");
                        sbSql.Append(" AND (REPORT_DATA_5 IS NULL OR REPORT_DATA_5 = '' OR REPORT_DATA_5 < (REPORT_DATA_12))");
                    }
                    else
                    {
                        sbSql.Append("SELECT ISNULL(REPORT_DATA_12, 0) AS ORDER_QTY, CONVERT(NVARCHAR(5), MAX(UPDATE_DATE), 101) + '' +  ");
                        sbSql.Append("LTRIM(SUBSTRING(CONVERT(VARCHAR(20), CONVERT(DATETIME, MAX(UPDATE_DATE)), 22), 10, 5) +  ");
                        sbSql.Append(" RIGHT(CONVERT(VARCHAR(20),CONVERT(DATETIME, MAX(UPDATE_DATE)), 22), 3)) ");
                        sbSql.Append(" AS ORDER_DATE FROM MT_ATPAR_DEVIATION WHERE APP_ID = " + AtParWebEnums.EnumApps.CartCount + " AND KEY_4 = '" + cartId + "' ");
                        sbSql.Append(" AND KEY_5  = '" + compartment + "' AND KEY_6 = '" + itemId + "' AND (REPORT_DATA_5 IS NULL OR REPORT_DATA_5 = '' OR ");
                        sbSql.Append(" REPORT_DATA_5 < REPORT_DATA_12) AND UPDATE_DATE  = (SELECT MAX(UPDATE_DATE) FROM MT_ATPAR_DEVIATION ");
                        sbSql.Append(" WHERE  APP_ID = " + AtParWebEnums.EnumApps.CartCount + " AND KEY_4 = '" + cartId + "'");
                        sbSql.Append(" AND KEY_5  = '" + compartment + "' AND KEY_6 = '" + itemId + "' AND ");
                        sbSql.Append("(REPORT_DATA_5 IS NULL OR REPORT_DATA_5 = '' OR REPORT_DATA_5 < REPORT_DATA_12)) GROUP BY REPORT_DATA_12 ");

                    }

                    var fileds = new[] { "ORDER_QTY", "ORDER_DATE" };

                    var lstOrders = objContext.Database.DifferedExecuteQuery<MT_ATPAR_DEVIATION>(fileds, sbSql.ToString()).ToList();

                    if (lstOrders != null)
                    {
                        if (lstOrders.Count > 0)
                        {
                            orderQty = lstOrders[0].ORDER_QTY;
                            lastOrderDate = lstOrders[0].ORDER_DATE;
                        }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ": Order Qty : " + orderQty + ": and Order Date:" + lastOrderDate + ":for the Item:" + itemId); }

                    tupleOrderQty= new Tuple<Double, string>(orderQty, lastOrderDate);
                    return tupleOrderQty;

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

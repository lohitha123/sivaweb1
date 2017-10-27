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
    public class OptimizationReportRepository : IOptimizationReportRepository
    {

        #region Private Variable

        private ILog _log;

        #endregion

        public OptimizationReportRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(OptimizationReportRepository));
        }

        public List<MT_ATPAR_TRANSACTION> GetDeptIDs(string deptID, string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT(ID) FROM MT_ATPAR_TRANSACTION WHERE REPORT_DATA_5 ='" + deptID + "'");

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND ID = '" + cartID + "' ");
                    }

                    var fileds = new[] { "ID" };

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

        public List<MT_ATPAR_DEVIATION> GetOptimRep(DateTime tDate, DateTime fDate, string bUnit, string cartIDs, string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT(KEY_6),KEY_5 AS COMPARTMENT, KEY_4 AS CART_ID, BUSINESS_UNIT,KEY_5,KEY_4 FROM MT_ATPAR_DEVIATION ");
                    sbSql.Append(" WHERE APP_ID = 2 AND (UPDATE_DATE <= DATEADD(day, 1, CONVERT(DATETIME, '" + tDate.ToString("MM/dd/yyyy") + "', 101))");
                    sbSql.Append(" AND UPDATE_DATE  >= CONVERT(DATETIME, '" + fDate.ToString("MM/dd/yyyy") + "', 101))");
                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" AND BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartIDs))
                    {
                        if (((cartIDs.IndexOf(",") + 1)
                                    == 0))
                        {
                            sbSql.Append(" AND KEY_4 = " + (cartIDs + ""));
                        }
                        else
                        {
                            sbSql.Append(" AND KEY_4 IN ("
                                        + (cartIDs + ") "));
                        }

                    }
                    else if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND KEY_4 = \'"
                                     + (cartID + "\' "));
                    }


                    var fileds = new[] { "KEY_6", "KEY_5", "KEY_4", "BUSINESS_UNIT" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<MT_ATPAR_DEVIATION>(fileds, sbSql.ToString()).ToList();

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

        public List<MT_ATPAR_TRANSACTION> GetCartBunits(string deptID, string cartID, string bUnit)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ID AS CART_ID, BUSINESS_UNIT FROM MT_ATPAR_TRANSACTION WHERE REPORT_DATA_5 ='" + deptID + "'");

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND ID = '" + cartID + "' ");
                    }

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" AND BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    sbSql.Append(" GROUP BY ID, BUSINESS_UNIT");

                    var fileds = new[] { "ID", "BUSINESS_UNIT" };

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


        public List<VM_DEVIATION_USER_ALLOCATION> GetOpt(DateTime tDate, DateTime fDate, string bUnit, string cartIDs, string cartID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.BUSINESS_UNIT, A.KEY_4 AS CART_ID, B.DESCR FROM MT_ATPAR_DEVIATION A LEFT OUTER JOIN MT_CRCT_USER_ALLOCATION B ");
                    sbSql.Append("ON A.BUSINESS_UNIT = B.BUSINESS_UNIT AND A.KEY_4 = B.CART_ID ");
                    sbSql.Append("WHERE A.APP_ID = 2 AND (A.UPDATE_DATE <= DATEADD(day, 1, CONVERT(DATETIME, '" + tDate + "', 101)) ");
                    sbSql.Append("AND A.UPDATE_DATE  >= CONVERT(DATETIME, '" + fDate + "', 101))");
                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" AND A.BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartIDs))
                    {
                        if (((cartIDs.IndexOf(",") + 1)
                                    == 0))
                        {
                            sbSql.Append(" AND KEY_4 = " + (cartIDs + ""));
                        }
                        else
                        {
                            sbSql.Append(" AND KEY_4 IN ("
                                        + (cartIDs + ") "));
                        }

                    }
                    else if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND KEY_4 = \'"
                                     + (cartID + "\' "));
                    }

                    sbSql.Append(" GROUP BY A.KEY_4, A.BUSINESS_UNIT, B.DESCR");

                    var fileds = new[] { "BUSINESS_UNIT", "CART_ID", "DESCR" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<VM_DEVIATION_USER_ALLOCATION>(fileds, sbSql.ToString()).ToList();

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



        public string GetStartDate(string itemID, DateTime fDate, string pComp, string bUnit, string cartID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT UPDATE_DATE FROM MT_ATPAR_DEVIATION ");
                    sbSql.Append("WHERE KEY_6='" + itemID + "' ");
                    sbSql.Append(" AND (UPDATE_DATE <= CONVERT(DATETIME, '" + fDate + "', 101))");

                    if (!string.IsNullOrEmpty(pComp))
                    {
                        sbSql.Append(" AND KEY_5 = '" + pComp + "' ");
                    }

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" AND BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND KEY_4 = '" + cartID + "' ");
                    }

                    sbSql.Append(" ORDER BY UPDATE_DATE DESC");

                    var fileds = new[] { "UPDATE_DATE" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<MT_ATPAR_DEVIATION>(fileds, sbSql.ToString()).ToList().FirstOrDefault();


                    if(lstRecords == null)
                    {
                        return string.Empty;
                    }
                   // var lstRecords = objContext.Database.DifferedExecuteQuery<MT_ATPAR_DEVIATION>(fileds, sbSql.ToString()).ToList().FirstOrDefault().UPDATE_DATE.ToString();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Records returned " + lstRecords); }

                    return lstRecords.UPDATE_DATE.ToString();
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

        public string GetEndDate(string itemID, DateTime tDate, string pComp, string bUnit, string cartID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT UPDATE_DATE FROM MT_ATPAR_DEVIATION ");
                    sbSql.Append("WHERE KEY_6='" + itemID + "' ");
                    sbSql.Append(" AND (UPDATE_DATE  >=  CONVERT(DATETIME, '" + tDate + "', 101))");

                    if (!string.IsNullOrEmpty(pComp))
                    {
                        sbSql.Append(" AND KEY_5 = '" + pComp + "' ");
                    }

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" AND BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND KEY_4 = '" + cartID + "' ");
                    }

                    sbSql.Append(" ORDER BY UPDATE_DATE ASC");

                    var fileds = new[] { "UPDATE_DATE" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<MT_ATPAR_DEVIATION>(fileds, sbSql.ToString()).ToList().FirstOrDefault();


                    if (lstRecords == null)
                    {
                        return string.Empty;
                    }

                    // var lstRecords = objContext.Database.DifferedExecuteQuery<MT_ATPAR_DEVIATION>(fileds, sbSql.ToString()).ToList().FirstOrDefault().UPDATE_DATE.ToString();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Records returned " + lstRecords); }

                    return lstRecords.UPDATE_DATE.ToString();
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

        public List<VM_DEVIATION_TRANSACTION> GetDev(string itemID, string pComp, string bUnit, string cartID, string startDate, DateTime fDate, string endDate, DateTime tDate)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT A.REPORT_DATA_15 AS CUST_ITEM_ID, A.UPDATE_DATE,A.BUSINESS_UNIT ,A.REPORT_DATA_1 AS PAR_QTY, A.REPORT_DATA_2 AS COUNT_QTY, A.REPORT_DATA_12 AS USAGE, ");
                    sbSql.Append("A.REPORT_DATA_3 AS PRICE, A.KEY_4 AS CART_ID, A.KEY_5 AS COMPARTMENT, A.KEY_6 AS ITEM_ID, ");
                    sbSql.Append("A.REPORT_DATA_6 AS UOM, A.REPORT_DATA_13 AS DESCR FROM MT_ATPAR_DEVIATION A, MT_ATPAR_TRANSACTION B ");
                    sbSql.Append(" WHERE TRANSACTION_ID=A.REPORT_DATA_4 AND A.KEY_6='" + itemID + "' ");
                    sbSql.Append(" AND A.KEY_5='" + pComp + "' ");

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" AND A.BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND A.KEY_4 LIKE '" + cartID + "%' ");
                    }

                    if(!string.IsNullOrEmpty(startDate))
                    {
                        sbSql.Append(" AND (A.UPDATE_DATE >= CONVERT(DATETIME, '" + startDate + "', 101))");
                    }
                    else
                    {
                        sbSql.Append(" AND (A.UPDATE_DATE >= CONVERT(DATETIME, '" + fDate + "', 101))");
                    }

                    if (!string.IsNullOrEmpty(endDate))
                    {
                        sbSql.Append(" AND (A.UPDATE_DATE <= CONVERT(DATETIME, '" + endDate + "', 101))");
                    }
                    else
                    {
                        sbSql.Append(" AND (A.UPDATE_DATE <= CONVERT(DATETIME, '" + tDate + "', 101))");
                    }

                    sbSql.Append(" ORDER BY ITEM_ID, COMPARTMENT, UPDATE_DATE DESC");
                  

                    var fileds = new[] { "CUST_ITEM_ID", "UPDATE_DATE", "BUSINESS_UNIT", "PAR_QTY", "COUNT_QTY", "USAGE", "PRICE", "CART_ID", "COMPARTMENT", "ITEM_ID", "UOM", "DESCR" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<VM_DEVIATION_TRANSACTION>(fileds, sbSql.ToString()).ToList();

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


        public double GetOrderQty(string itemID, string bUnit, string cartID, string comp, DateTime fDate, string dtTempTodate)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ISNULL(SUM(CAST(REPORT_DATA_12 AS FLOAT)),0) AS TOTAL_ORD_QTY FROM MT_ATPAR_DEVIATION ");
                    sbSql.Append("WHERE KEY_6 = '" + itemID.Trim() + "' AND ");
                    sbSql.Append("BUSINESS_UNIT = '" + bUnit.Trim() + "' ");
                    sbSql.Append("AND KEY_4 = '" + cartID.Trim() + "' ");
                    sbSql.Append("AND KEY_5 = '" + comp.Trim() + "'");
                    sbSql.Append(" AND (UPDATE_DATE > = CONVERT(DATETIME, '" + fDate + "', 101))");
                    sbSql.Append(" AND (UPDATE_DATE < DATEADD(DAY,1,CONVERT(DATETIME, '" + dtTempTodate + "', 101)))");
                                       
                    var fileds = new[] { "TOTAL_ORD_QTY" };

                    var lstRecords = Convert.ToDouble(objContext.Database.SqlQuery<double>(sbSql.ToString()).ToList().FirstOrDefault());

                    if(lstRecords == null)
                    {
                        return 0;
                    }
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

        public List<MT_ATPAR_DEVIATION> GetOrphanItems(int appID, string bUnit, string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT BUSINESS_UNIT, KEY_4, KEY_6, REPORT_DATA_15, KEY_5, REPORT_DATA_13, REPORT_DATA_3, REPORT_DATA_6, ");
                    sbSql.Append("REPORT_DATA_1 FROM MT_ATPAR_DEVIATION WHERE 1=1 AND APP_ID = " + (int)AtParWebEnums.EnumApps.CartCount + "");

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" AND BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND KEY_4 = '" + cartID + "' ");
                    }

                    var fileds = new[] { "BUSINESS_UNIT", "KEY_4", "KEY_6", "REPORT_DATA_15", "KEY_5", "REPORT_DATA_13", "REPORT_DATA_3", "REPORT_DATA_6", "REPORT_DATA_1" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<MT_ATPAR_DEVIATION>(fileds, sbSql.ToString()).ToList();

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

        #region InsertParAuditReportData
        public long InsertParAuditReportData(string bUnit, string cartID, string compt, 
                                             string itemID, double optQty, double nopQty, int transID, 
                                             string userID, string uom, string strItemDesc)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strSQL = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    strSQL = "INSERT INTO MT_CRCT_PAR_AUDIT (KEY_1, KEY_2, KEY_3, " + "KEY_4, OLD_PAR_VALUE, NEW_PAR_VALUE, " + "TRANSACTION_ID, UPDATE_DATE, USER_ID, " + "UOM, KEY_5) VALUES" + "('" + bUnit + "','" + cartID + "','" + compt + "', " + "'" + itemID + "'," + optQty + "," + nopQty + ", " + "" + transID + ", '" + DateTime.Now + "','" + userID + "', " + "'" + uom + "','" + strItemDesc + "')";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + strSQL + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(strSQL);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "ParAuditReportData inserted :" + count); }


                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + strSQL); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
           
        }
        #endregion
    }
}

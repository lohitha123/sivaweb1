using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;

namespace AtPar.POU.Repos
{
    public class ParOptimizationReportRepository : IParOptimizationReportRepository
    {

        #region Private Variable

        private ILog _log;
        AtParWebEnums _enums;

        #endregion

        public ParOptimizationReportRepository(ILog log)
        {         
            _log = log;
            _log.SetLoggerType(typeof(ParOptimizationReportRepository));
        }
      
        public List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetCartIds(string bunit, string departmentID, string cartID, string orgGrpID, int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
           
          string locationType=  (AtParWebEnums.LocationType.I).ToString();


            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT(CART_ID), LOCATION_TYPE FROM MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS WHERE BUSINESS_UNIT='" + bunit + "'");

                    if (!string.IsNullOrEmpty(departmentID))
                    {
                        sbSql.Append(" AND DEPARTMENT_ID = '" + departmentID + "' ");
                    }
                    if (!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND CART_ID = '" + cartID + "' ");
                    }
                    if (orgGrpID != "All")
                    {
                        if (!string.IsNullOrEmpty(orgGrpID))
                        {
                            sbSql.Append(" AND ORG_GROUP_ID = '" + orgGrpID + "' ");
                        }
                    }
               
                    sbSql.Append(" AND LOCATION_TYPE <> '" + locationType + "' ");
                 
                    sbSql.Append(" AND APP_ID = '" + appID + "' ");

                    var fileds = new[] { "CART_ID", "LOCATION_TYPE" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>(fileds, sbSql.ToString()).ToList();

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

        public List<VM_PAR_OPTIMIZATION_DETAILS> GetOptUsageData(string bUnit, string cartID,DateTime fDate, DateTime tDate)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);      

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            cartID =cartID == null ? "" : cartID;
            bUnit = bUnit == null ? "" : bUnit;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter paramBunit = new SqlParameter("@BUnit", bUnit);
                    SqlParameter paramCartId = new SqlParameter("@CartID", cartID);
                    SqlParameter paramFromDate = new SqlParameter("@FromDate", fDate.ToString("MM/dd/yyyy"));
                    SqlParameter paramTodate = new SqlParameter("@ToDate", tDate.ToString("MM/dd/yyyy"));
                    object[] parameters = { paramBunit, paramCartId, paramFromDate, paramTodate};

                    SqlStr = "EXEC GetOptUsageData @BUnit,@CartID,@FromDate,@ToDate";
                    var fileds = new[] { "ITEM_ID", "COMPARTMENT", "MAXUSAGE", "MINUSAGE", "AVGUSAGE", "TOTUSAGE"};

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstOptUsageData = objContext.Database.DifferedExecuteQuery<VM_PAR_OPTIMIZATION_DETAILS>(fileds,SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Records returned: {1}", methodBaseName, (lstOptUsageData != null ? lstOptUsageData.Count() : 0))); }

                    return lstOptUsageData;
                }
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                throw ex;
            }
            finally
            {
                SqlStr = string.Empty;
            }

        }

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

        public List<VM_PAR_OPTIMIZATION_DETAILS> GetOptOrdData(string bUnit, string cartID, DateTime fDate, DateTime tDate)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            cartID = cartID == null ? "" : cartID;
            bUnit = bUnit == null ? "" : bUnit;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter paramBunit = new SqlParameter("@BUnit", bUnit);
                    SqlParameter paramCartId = new SqlParameter("@CartID", cartID);
                    SqlParameter paramFromDate = new SqlParameter("@FromDate", fDate.ToString("MM/dd/yyyy"));
                    SqlParameter paramTodate = new SqlParameter("@ToDate", tDate.ToString("MM/dd/yyyy"));
                    object[] parameters = { paramBunit, paramCartId, paramFromDate, paramTodate };

                    SqlStr = "EXEC GetOptOrdData @BUnit,@CartID,@FromDate,@ToDate";
                    var fileds = new[] { "ITEM_ID", "COMPARTMENT", "ORDQTY"};

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstOptOrdData = objContext.Database.DifferedExecuteQuery<VM_PAR_OPTIMIZATION_DETAILS>(fileds, SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Records returned: {1}", methodBaseName, (lstOptOrdData != null ? lstOptOrdData.Count() : 0))); }

                    return lstOptOrdData;
                }

            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr.ToString()); }
                throw ex;
            }
            finally
            {
                SqlStr = null;
            }
        }

        public List<VM_PAR_OPTIMIZATION_DETAILS> GetItemsAvgLeadTime(string bUnit, string cartID, DateTime fDate)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            cartID = cartID == null ? "" : cartID;
            bUnit = bUnit == null ? "" : bUnit;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter paramBunit = new SqlParameter("@BUnit", bUnit);
                    SqlParameter paramCartId = new SqlParameter("@CartID", cartID);
                    SqlParameter paramFromDate = new SqlParameter("@FromDate", fDate.ToString("MM/dd/yyyy"));               
                    object[] parameters = { paramBunit, paramCartId, paramFromDate};

                    SqlStr = "EXEC GetItemsAvgLeadTime @BUnit,@CartID,@FromDate";
                    var fileds = new[] { "ITEM_ID", "COMPARTMENT", "AVGTIME" };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstItemsAvgLeadTime = objContext.Database.DifferedExecuteQuery<VM_PAR_OPTIMIZATION_DETAILS>(fileds, SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Records returned: {1}", methodBaseName, (lstItemsAvgLeadTime != null ? lstItemsAvgLeadTime.Count() : 0))); }

                    return lstItemsAvgLeadTime;
                }

            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr.ToString()); }
                throw ex;
            }
            finally
            {
                SqlStr = null;
            }
        }



    }
}

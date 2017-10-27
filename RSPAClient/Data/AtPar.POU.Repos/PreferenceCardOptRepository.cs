using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.Data;
using System.Data.SqlClient;
using System.Data;
using AtPar.POCOEntities;

namespace AtPar.POU.Repos
{
    public class PreferenceCardOptRepository : IPreferenceCardOptRepository
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor
        public PreferenceCardOptRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(PreferenceCardOptRepository));
        }

        #endregion

        #region GetPrefOptBySpeciality
        
        public List<VM_POU_PREF_OPT_BY_SPECIALTY> GetPrefOptBySpeciality(string strYear, string strHalfYear, string strQuarter, string strMonth)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter[] sqlParms = new SqlParameter[4];

                    sqlParms[0] = new SqlParameter("@YEAR", SqlDbType.Int);
                    sqlParms[0].Value = (!string.IsNullOrEmpty(strYear)) ? Convert.ToInt32(strYear.Trim()) : 0;

                    sqlParms[1] = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    sqlParms[1].Value = (!string.IsNullOrEmpty(strHalfYear)) ? Convert.ToInt32(strHalfYear.Trim()) : 0;

                    sqlParms[2] = new SqlParameter("@QUARTER", SqlDbType.Int);
                    sqlParms[2].Value = (!string.IsNullOrEmpty(strQuarter)) ? Convert.ToInt32(strQuarter.Trim()) : 0;

                    sqlParms[3] = new SqlParameter("@MONTH", SqlDbType.Int);
                    sqlParms[3].Value = (!string.IsNullOrEmpty(strMonth)) ? Convert.ToInt32(strMonth.Trim()) : 0;

                    SqlStr = "EXEC GET_PREF_OPT_BY_SPECIALTY @YEAR,@HALFYEAR,@QUARTER,@MONTH";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    //var fields = new[] {
                    //    "SPECIALTY_CODE", "SPECIALTY_DESCRIPTION", "NO_OF_PROCEDURES", "NO_OF_PREF_LISTS",
                    //    "EFFICIENCY_PERCENTAGE", "TOTAL_PICKED_QTY", "TOTAL_PICKED_VALUE", "TOTAL_ISSUED_EXISTING_QTY",
                    //    "TOTAL_ISSUED_EXISTING_VALUE","TOTAL_ISSUED_NEW_QTY","TOTAL_ISSUED_NEW_VALUE",
                    //"TOTAL_RETURN_QTY","TOTAL_RETURN_VALUE","TOTAL_WASTED_QTY","TOTAL_WASTED_VALUE","TOTAL_USAGE",
                    //};

                    var lstPrefOptBySpeciality = objContext.Database.SqlQuery<VM_POU_PREF_OPT_BY_SPECIALTY>(SqlStr, sqlParms).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetPrefOptBySpeciality Returned: {1}", methodBaseName, lstPrefOptBySpeciality != null ? lstPrefOptBySpeciality.Count() : 0)); }

                    return lstPrefOptBySpeciality;
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

        #endregion

        #region GetPrefOptByProcedure

        public List<VM_POU_PREF_OPT_BY_PROCEDURE> GetPrefOptByProcedure(string pstrSpecialityCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter[] sqlParms = new SqlParameter[5];

                    sqlParms[0] = new SqlParameter("@YEAR", SqlDbType.Int);
                    sqlParms[0].Value = (!string.IsNullOrEmpty(pstrYear)) ? Convert.ToInt32(pstrYear.Trim()) : 0;

                    sqlParms[1] = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    sqlParms[1].Value = (!string.IsNullOrEmpty(pstrHalfYear)) ? Convert.ToInt32(pstrHalfYear.Trim()) : 0;

                    sqlParms[2] = new SqlParameter("@QUARTER", SqlDbType.Int);
                    sqlParms[2].Value = (!string.IsNullOrEmpty(pstrQuarter)) ? Convert.ToInt32(pstrQuarter.Trim()) : 0;

                    sqlParms[3] = new SqlParameter("@MONTH", SqlDbType.Int);
                    sqlParms[3].Value = (!string.IsNullOrEmpty(pstrMonth)) ? Convert.ToInt32(pstrMonth.Trim()) : 0;

                    sqlParms[4] = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    sqlParms[4].Value = pstrSpecialityCode;

                    SqlStr = "EXEC GET_PREF_OPT_BY_PROCEDURE @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }                   

                    var lstPrefOptByProcedure = objContext.Database.SqlQuery<VM_POU_PREF_OPT_BY_PROCEDURE>(SqlStr, sqlParms).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetPrefOptByProcedure Returned: {1}", methodBaseName, lstPrefOptByProcedure != null ? lstPrefOptByProcedure.Count() : 0)); }

                    return lstPrefOptByProcedure;
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

        #endregion

        #region GetPrefOptByPhysician

        public List<VM_POU_PREF_OPT_BY_PHYSICIAN> GetPrefOptByPhysician(string pstrSpecialityCode, string pstrProcedureCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter[] sqlParms = new SqlParameter[6];

                    sqlParms[0] = new SqlParameter("@YEAR", SqlDbType.Int);
                    sqlParms[0].Value = (!string.IsNullOrEmpty(pstrYear)) ? Convert.ToInt32(pstrYear.Trim()) : 0;

                    sqlParms[1] = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    sqlParms[1].Value = (!string.IsNullOrEmpty(pstrHalfYear)) ? Convert.ToInt32(pstrHalfYear.Trim()) : 0;

                    sqlParms[2] = new SqlParameter("@QUARTER", SqlDbType.Int);
                    sqlParms[2].Value = (!string.IsNullOrEmpty(pstrQuarter)) ? Convert.ToInt32(pstrQuarter.Trim()) : 0;

                    sqlParms[3] = new SqlParameter("@MONTH", SqlDbType.Int);
                    sqlParms[3].Value = (!string.IsNullOrEmpty(pstrMonth)) ? Convert.ToInt32(pstrMonth.Trim()) : 0;

                    sqlParms[4] = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    sqlParms[4].Value = pstrSpecialityCode;

                    sqlParms[5] = new SqlParameter("@PROCEDURE_CODE", SqlDbType.NVarChar);
                    sqlParms[5].Value = pstrProcedureCode;

                    SqlStr = "EXEC GET_PREF_OPT_BY_PHYSICIAN @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@PROCEDURE_CODE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }                 

                    var lstPrefOptByPhysician = objContext.Database.SqlQuery<VM_POU_PREF_OPT_BY_PHYSICIAN>(SqlStr, sqlParms).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetPrefOptByPhysicians Returned: {1}", methodBaseName, lstPrefOptByPhysician != null ? lstPrefOptByPhysician.Count() : 0)); }

                    return lstPrefOptByPhysician;
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

        #endregion

        #region GetPrefOptByPreference

        public List<VM_POU_PREF_OPT_BY_PREFERENCE> GetPrefOptByPreference(string pstrSpecialityCode, string pstrProcedureCode, string pstrPhysicianId, string pstrPrefListId, string pstrRemove,
            string pstrAddToHoldStart, string pstrAddToHoldEnd, string pstrAddToOpen, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter[] sqlParms = new SqlParameter[12];

                    sqlParms[0] = new SqlParameter("@YEAR", SqlDbType.Int);
                    sqlParms[0].Value = (!string.IsNullOrEmpty(pstrYear)) ? Convert.ToInt32(pstrYear.Trim()) : 0;

                    sqlParms[1] = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    sqlParms[1].Value = (!string.IsNullOrEmpty(pstrHalfYear)) ? Convert.ToInt32(pstrHalfYear.Trim()) : 0;

                    sqlParms[2] = new SqlParameter("@QUARTER", SqlDbType.Int);
                    sqlParms[2].Value = (!string.IsNullOrEmpty(pstrQuarter)) ? Convert.ToInt32(pstrQuarter.Trim()) : 0;

                    sqlParms[3] = new SqlParameter("@MONTH", SqlDbType.Int);
                    sqlParms[3].Value = (!string.IsNullOrEmpty(pstrMonth)) ? Convert.ToInt32(pstrMonth.Trim()) : 0;

                    sqlParms[4] = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    sqlParms[4].Value = pstrSpecialityCode;

                    sqlParms[5] = new SqlParameter("@PROCEDURE_CODE", SqlDbType.NVarChar);
                    sqlParms[5].Value = pstrProcedureCode;

                    sqlParms[6] = new SqlParameter("@PREF_LIST_ID", SqlDbType.NVarChar);
                    sqlParms[6].Value = pstrPrefListId;

                    sqlParms[7] = new SqlParameter("@PHYSICIAN_ID", SqlDbType.NVarChar);
                    sqlParms[7].Value = pstrPhysicianId;

                    sqlParms[8] = new SqlParameter("@REMOVE", SqlDbType.Int);
                    sqlParms[8].Value = (!string.IsNullOrEmpty(pstrRemove)) ? Convert.ToInt32(pstrRemove.Trim()) : 0;

                    sqlParms[9] = new SqlParameter("@ADDTOHOLDSTART", SqlDbType.Int);
                    sqlParms[9].Value = (!string.IsNullOrEmpty(pstrAddToHoldStart)) ? Convert.ToInt32(pstrAddToHoldStart.Trim()) : 0;

                    sqlParms[10] = new SqlParameter("@ADDTOHOLDEND", SqlDbType.Int);
                    sqlParms[10].Value = (!string.IsNullOrEmpty(pstrAddToHoldEnd)) ? Convert.ToInt32(pstrAddToHoldEnd.Trim()) : 0;

                    sqlParms[11] = new SqlParameter("@ADDTOOPEN", SqlDbType.Int);
                    sqlParms[11].Value = (!string.IsNullOrEmpty(pstrAddToOpen)) ? Convert.ToInt32(pstrAddToOpen.Trim()) : 0;

                    SqlStr = "EXEC GET_PREF_OPT_DETAILS_DATA @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@PROCEDURE_CODE,@PREF_LIST_ID,@PHYSICIAN_ID,@REMOVE,@ADDTOHOLDSTART,@ADDTOHOLDEND,@ADDTOOPEN";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }                   

                    var lstPrefOptByPreference = objContext.Database.SqlQuery<VM_POU_PREF_OPT_BY_PREFERENCE>(SqlStr, sqlParms).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetPrefOptByPreference Returned: {1}", methodBaseName, lstPrefOptByPreference != null ? lstPrefOptByPreference.Count() : 0)); }

                    return lstPrefOptByPreference;
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

        #endregion

        #region GetPrefOptHeaderData

        public List<VM_POU_PREF_OPT_HEADER_DATA> GetPrefOptHeaderData(string pstrSpecialityCode, string pstrProcedureCode, string pstrPhysicianId, string pstrPrefListId, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter[] sqlParms = new SqlParameter[8];

                    sqlParms[0] = new SqlParameter("@YEAR", SqlDbType.Int);
                    sqlParms[0].Value = (!string.IsNullOrEmpty(pstrYear)) ? Convert.ToInt32(pstrYear.Trim()) : 0;

                    sqlParms[1] = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    sqlParms[1].Value = (!string.IsNullOrEmpty(pstrHalfYear)) ? Convert.ToInt32(pstrHalfYear.Trim()) : 0;

                    sqlParms[2] = new SqlParameter("@QUARTER", SqlDbType.Int);
                    sqlParms[2].Value = (!string.IsNullOrEmpty(pstrQuarter)) ? Convert.ToInt32(pstrQuarter.Trim()) : 0;

                    sqlParms[3] = new SqlParameter("@MONTH", SqlDbType.Int);
                    sqlParms[3].Value = (!string.IsNullOrEmpty(pstrMonth)) ? Convert.ToInt32(pstrMonth.Trim()) : 0;

                    sqlParms[4] = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    sqlParms[4].Value = pstrSpecialityCode;

                    sqlParms[5] = new SqlParameter("@PROCEDURE_CODE", SqlDbType.NVarChar);
                    sqlParms[5].Value = pstrProcedureCode;

                    sqlParms[6] = new SqlParameter("@PREF_LIST_ID", SqlDbType.NVarChar);
                    sqlParms[6].Value = pstrPrefListId;

                    sqlParms[7] = new SqlParameter("@PHYSICIAN_ID", SqlDbType.NVarChar);
                    sqlParms[7].Value = pstrPhysicianId;

                    SqlStr = "EXEC GET_PREF_OPT_HEADER_DATA @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@PROCEDURE_CODE,@PREF_LIST_ID,@PHYSICIAN_ID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }
                   
                    var lstPrefOptHeaderData = objContext.Database.SqlQuery<VM_POU_PREF_OPT_HEADER_DATA>(SqlStr, sqlParms).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetPrefOptHeaderData Returned: {1}", methodBaseName, lstPrefOptHeaderData != null ? lstPrefOptHeaderData.Count() : 0)); }

                    return lstPrefOptHeaderData;
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

        #endregion

        #region GetCostVarianceAnalysisSupplyDetails

        public int GetCostVarianceAnalysisSupplyDetails(ref System.Data.DataSet pdsResult,string pstrItemGroup, string pstrPhysicianId, string pstrSpecialityCode, string pstrCodeText, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string strTableName = string.Empty;
            
            try
            {
                if(!string.IsNullOrEmpty(pstrHalfYear) && Convert.ToInt32(pstrHalfYear)!=0)
                {
                    strTableName = "MT_POU_RPT_SUPPLY_COMPARISON_H";
                }
                else if(!string.IsNullOrEmpty(pstrQuarter) && Convert.ToInt32(pstrQuarter) != 0)
                {
                    strTableName = "MT_POU_RPT_SUPPLY_COMPARISON_Q";
                }
                else if (!string.IsNullOrEmpty(pstrMonth) && Convert.ToInt32(pstrMonth) != 0)
                {
                    strTableName = "MT_POU_RPT_SUPPLY_COMPARISON_M";
                }
                else if (!string.IsNullOrEmpty(pstrYear) && Convert.ToInt32(pstrYear) != 0)
                {
                    strTableName = "MT_POU_RPT_SUPPLY_COMPARISON_Y";
                }

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    objContext.Database.Connection.Open();

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT * FROM (SELECT PROCEDURE_DESCRIPTION, ITEM_GROUP, PHYSICIAN_ID, ITEM_ID, MFR_CATALOG_NO, UNIT_COST, ISNULL(NO_OF_TIMES_ITEM_USED_BY_PHY,0) NO_OF_TIMES_ITEM_USED_BY_PHY ");
                    sbSql.Append(" FROM " + strTableName + " WHERE SPECIALTY_CODE ='" + pstrSpecialityCode + "' AND PROCEDURE_CODE='" + pstrCodeText + "' OR ICD_CODE= '" + pstrCodeText + "'  OR CPT_CODE= '" + pstrCodeText + "') AS SOURCETAB ");
                    sbSql.Append("PIVOT(AVG(NO_OF_TIMES_ITEM_USED_BY_PHY) FOR PHYSICIAN_ID IN (" + pstrPhysicianId + ")) AS PIVOTTABLE WHERE ITEM_GROUP ='" + pstrItemGroup + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    
                    SqlDataAdapter da = new SqlDataAdapter(sbSql.ToString(), objContext.Database.Connection.ConnectionString);
                    //DataSet _dsResult = new DataSet();
                    da.Fill(pdsResult);                   
                                       
                    //objContext.Database.Connection.Close();
                   
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + ((pdsResult.Tables[0].Rows.Count > 0) ? pdsResult.Tables[0].Rows.Count : 0)); }

                    return (pdsResult.Tables[0].Rows.Count>0)? pdsResult.Tables[0].Rows.Count:0;
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
    }
}

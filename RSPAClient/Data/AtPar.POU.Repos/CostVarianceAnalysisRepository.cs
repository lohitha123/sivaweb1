using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.Common;
using log4net;
using AtPar.ViewModel;
using AtPar.Data;
using System.Data.SqlClient;
using System.Data;

namespace AtPar.POU.Repos
{
    public class CostVarianceAnalysisRepository : ICostVarianceAnalysisRepository
    {
        #region Private Variable
        ILog _log;
        #endregion

        #region Constructor

        public CostVarianceAnalysisRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CostVarianceAnalysisRepository));
        }

        #endregion

        #region Public Methods

        #region Getcostvarianceanalysisspecialitydata
        /// <summary>
        /// To get costvarianceanalysisspecialitydata
        /// </summary>
        /// <param name="pselectedVarianceType"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public List<VM_POU_COSTVARIANCE_BY_SPECIALTY> Getcostvarianceanalysisspecialitydata(string pselectedVarianceType,string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            SqlParameter[] sqlParms = new SqlParameter[5];

            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter selectedVarianceType = new SqlParameter("@CODE_TEXT", SqlDbType.NVarChar);
                    selectedVarianceType.Value = pselectedVarianceType;

                    SqlParameter Year = new SqlParameter("@YEAR", SqlDbType.Int);
                    Year.Value = (!string.IsNullOrEmpty(pYear) ? Convert.ToInt32(pYear.Trim()) : 0);

                    SqlParameter HalfYear = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    HalfYear.Value = (!string.IsNullOrEmpty(pHalfYear) ? Convert.ToInt32(pHalfYear.Trim()) : 0);

                    SqlParameter Quarter = new SqlParameter("@QUARTER", SqlDbType.Int);
                    Quarter.Value = (!string.IsNullOrEmpty(pQuater) ? Convert.ToInt32(pQuater.Trim()) : 0);

                    SqlParameter Month = new SqlParameter("@MONTH", SqlDbType.Int);
                    Month.Value = (!string.IsNullOrEmpty(pMonthly) ? Convert.ToInt32(pMonthly.Trim()) : 0);


                    object[] parameters = { selectedVarianceType,Year, HalfYear, Quarter, Month };

                    SqlStr = "EXEC GET_COSTVARIANCE_BY_SPECIALTY @CODE_TEXT,@YEAR,@HALFYEAR,@QUARTER,@MONTH";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}{3}{4}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstCostVarianceBySpeciaty = objContext.Database.SqlQuery<VM_POU_COSTVARIANCE_BY_SPECIALTY>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} getting the costvariance by specialty ", methodBaseName)); }

                    return lstCostVarianceBySpeciaty;
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

        #region GetCostVarianceByDiagnosiscode
        /// <summary>
        ///  To get CostVarianceByDiagnosiscode
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pDescrtext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public List<VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE> GetCostVarianceByDiagnosiscode(string pSpecialityCode, string pCodetext, string pDescrtext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            SqlParameter[] sqlParms = new SqlParameter[7];

            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter Year = new SqlParameter("@YEAR", SqlDbType.Int);
                    Year.Value = (!string.IsNullOrEmpty(pYear) ? Convert.ToInt32(pYear.Trim()) : 0);

                    SqlParameter HalfYear = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    HalfYear.Value = (!string.IsNullOrEmpty(pHalfYear) ? Convert.ToInt32(pHalfYear.Trim()) : 0);

                    SqlParameter Quarter = new SqlParameter("@QUARTER", SqlDbType.Int);
                    Quarter.Value = (!string.IsNullOrEmpty(pQuater) ? Convert.ToInt32(pQuater.Trim()) : 0);

                    SqlParameter Month = new SqlParameter("@MONTH", SqlDbType.Int);
                    Month.Value = (!string.IsNullOrEmpty(pMonthly) ? Convert.ToInt32(pMonthly.Trim()) : 0);

                    SqlParameter SpecialityCode = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    SpecialityCode.Value = pSpecialityCode;

                    SqlParameter Codetext = new SqlParameter("@CODE_TEXT", SqlDbType.NVarChar);
                    Codetext.Value = pCodetext;

                    SqlParameter Descrtext = new SqlParameter("@DESCRTEXT", SqlDbType.NVarChar);
                    Descrtext.Value = pDescrtext;

                    object[] parameters = { Year, HalfYear, Quarter, Month, SpecialityCode, Codetext, Descrtext };

                    SqlStr = "EXEC GET_COSTVARIANCE_BY_DIAGNOSISCODE @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@CODE_TEXT,@DESCRTEXT";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}{3}{4}{5}{6}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstcostvariancebydiagnosiscode = objContext.Database.SqlQuery<VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} getting the costvariance by diagnosiscode ", methodBaseName)); }

                    return lstcostvariancebydiagnosiscode;
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

        #region GetCostVarianceBySurgeon
        /// <summary>
        /// To Get CostVarianceBySurgeon
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pProcCode"></param>
        /// <param name="pReimbursementCode"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public List<VM_POU_COSTVARIANCE_BY_SURGEON> GetCostVarianceBySurgeon(string pselectedVarianceType,string pSpecialityCode, string pReimbursementCode, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            SqlParameter[] sqlParms = new SqlParameter[8];

            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter Year = new SqlParameter("@YEAR", SqlDbType.Int);
                    Year.Value = (!string.IsNullOrEmpty(pYear) ? Convert.ToInt32(pYear.Trim()) : 0);

                    SqlParameter HalfYear = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    HalfYear.Value = (!string.IsNullOrEmpty(pHalfYear) ? Convert.ToInt32(pHalfYear.Trim()) : 0);

                    SqlParameter Quarter = new SqlParameter("@QUARTER", SqlDbType.Int);
                    Quarter.Value = (!string.IsNullOrEmpty(pQuater) ? Convert.ToInt32(pQuater.Trim()) : 0);

                    SqlParameter Month = new SqlParameter("@MONTH", SqlDbType.Int);
                    Month.Value = (!string.IsNullOrEmpty(pMonthly) ? Convert.ToInt32(pMonthly.Trim()) : 0);

                    SqlParameter SpecialityCode = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    SpecialityCode.Value = pSpecialityCode;

                    SqlParameter selectedVarianceType = new SqlParameter("@CODE_TEXT", SqlDbType.NVarChar);
                    selectedVarianceType.Value = pselectedVarianceType;

                    SqlParameter ReimbursementCode = new SqlParameter("@REIMBURSEMENT_CODE", SqlDbType.NVarChar);
                    ReimbursementCode.Value = pReimbursementCode;

                    object[] parameters = { Year, HalfYear, Quarter, Month, SpecialityCode, selectedVarianceType, ReimbursementCode };

                    SqlStr = "EXEC GET_COSTVARIANCE_BY_SURGEON @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@CODE_TEXT,@REIMBURSEMENT_CODE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}{3}{4}{5}{6}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstcostvariancebysurgeon = objContext.Database.SqlQuery<VM_POU_COSTVARIANCE_BY_SURGEON>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} getting the costvariance by surgeon ", methodBaseName)); }

                    return lstcostvariancebysurgeon;
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

        #region GetCostVarianceItemGroups
        /// <summary>
        /// GetCostVarianceItemGroups
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public List<VM_POU_COSTVARIANCE_ITEMGROUPS> GetCostVarianceItemGroups(string pDiagnosisCode, string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            SqlParameter[] sqlParms = new SqlParameter[7];

            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter Year = new SqlParameter("@YEAR", SqlDbType.Int);
                    Year.Value = (!string.IsNullOrEmpty(pYear) ? Convert.ToInt32(pYear.Trim()) : 0);

                    SqlParameter HalfYear = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    HalfYear.Value = (!string.IsNullOrEmpty(pHalfYear) ? Convert.ToInt32(pHalfYear.Trim()) : 0);

                    SqlParameter Quarter = new SqlParameter("@QUARTER", SqlDbType.Int);
                    Quarter.Value = (!string.IsNullOrEmpty(pQuater) ? Convert.ToInt32(pQuater.Trim()) : 0);

                    SqlParameter Month = new SqlParameter("@MONTH", SqlDbType.Int);
                    Month.Value = (!string.IsNullOrEmpty(pMonthly) ? Convert.ToInt32(pMonthly.Trim()) : 0);

                    SqlParameter SpecialityCode = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    SpecialityCode.Value = pSpecialityCode;

                    SqlParameter CodeText = new SqlParameter("@CODE_TEXT", SqlDbType.NVarChar);
                    CodeText.Value = pCodetext;

                    SqlParameter DiagnosisCode = new SqlParameter("@DIAGNOSIS_CODE", SqlDbType.NVarChar);
                    DiagnosisCode.Value = pDiagnosisCode;

                    object[] parameters = { Year, HalfYear, Quarter, Month, SpecialityCode, CodeText, DiagnosisCode };

                    SqlStr = "EXEC GET_COSTVARIANCE_ITEMGROUPS @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@CODE_TEXT,@DIAGNOSIS_CODE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}{3}{4}{5}{6}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstcostvariancebysurgeon = objContext.Database.SqlQuery<VM_POU_COSTVARIANCE_ITEMGROUPS>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} getting the costvariance item groups ", methodBaseName)); }

                    return lstcostvariancebysurgeon;
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

        #region GetCostvarianceSurgeonItemgroupDetails
        /// <summary>
        /// GetCostvarianceSurgeonItemgroupDetails
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pPhysicianId"></param>
        /// <param name="pPhysicianName"></param>
        /// <param name="pItemGroup"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public Dictionary<string,object> GetCostvarianceSurgeonItemgroupDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            string _strtablename = string.Empty;
            string _strWhere = string.Empty;
            SqlParameter[] sqlParms = new SqlParameter[9];            
            System.Data.DataSet pdsResult = new DataSet();
            Dictionary<string, object> Dict = new Dictionary<string, object>();

            if (pDiagnosisCode == "PROCEDURE_CODE")
            {
                pDiagnosisCode = "3";
            }
            if (pDiagnosisCode == "CPT_CODE")
            {
                pDiagnosisCode = "2";
            }
            if (pDiagnosisCode == "ICD_CODE")
            {
                pDiagnosisCode = "1";
            }
            
            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                   
                    if (!string.IsNullOrEmpty(pHalfYear) && Convert.ToInt32(pHalfYear) != 0)
                    {
                        _strtablename = "MT_POU_RPT_SPEND_BY_GROUP_H";
                        _strWhere = " PERIOD=" + pHalfYear + " AND YEAR=" + pYear + "AND DIAGNOSIS_CODE_TYPE = " + pDiagnosisCode;
                    }
                    else if (!string.IsNullOrEmpty(pQuater) && Convert.ToInt32(pQuater) != 0)
                    {
                        _strtablename = "MT_POU_RPT_SPEND_BY_GROUP_Q";
                        _strWhere = " PERIOD=" + pQuater + " AND YEAR=" + pYear + "AND DIAGNOSIS_CODE_TYPE = " + pDiagnosisCode;
                    }
                    else if (!string.IsNullOrEmpty(pMonthly) && Convert.ToInt32(pMonthly) != 0)
                    {
                        _strtablename = "MT_POU_RPT_SPEND_BY_GROUP_M";
                        _strWhere = " PERIOD=" + pMonthly + " AND YEAR=" + pYear + "AND DIAGNOSIS_CODE_TYPE = " + pDiagnosisCode;
                    }
                    else if (!string.IsNullOrEmpty(pYear) && Convert.ToInt32(pYear) != 0)
                    {
                        _strtablename = "MT_POU_RPT_SPEND_BY_GROUP_Y";
                        _strWhere = " YEAR=" + pYear + "AND DIAGNOSIS_CODE_TYPE = " + pDiagnosisCode;
                    }

                    SqlStr = " SELECT * FROM (SELECT ITEM_GROUP,PHYSICIAN_ID,CEILING(SUM(ISNULL(TOTAL_COST_ITEM_GROUP,0))) AS TOTAL_COST_ITEM_GROUP "
                 + " FROM " + _strtablename + " WHERE " + _strWhere + " AND SPECIALTY_CODE ='" + pSpecialityCode + "' AND DIAGNOSIS_CODE='" + pCodetext + "' GROUP BY ITEM_GROUP,PHYSICIAN_ID) AS SOURCETAB "
                 + " PIVOT(AVG(TOTAL_COST_ITEM_GROUP) FOR PHYSICIAN_ID IN (" + pPhysicianId + ")) AS PIVOTTABLE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}:", methodBaseName, SqlStr))); }
                    }

                    SqlDataAdapter da = new SqlDataAdapter(SqlStr.ToString(), objContext.Database.Connection.ConnectionString);                    
                    da.Fill(pdsResult);

                    
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + ((pdsResult.Tables[0].Rows.Count > 0) ? pdsResult.Tables[0].Rows.Count : 0)); }
                     Dict.Add("ItemGroupDetails", pdsResult);

                    return Dict;
                   
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

        #region GetCostvarianceItemHdrDetails
        /// <summary>
        /// GetCostvarianceItemHdrDetails
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public List<VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS> GetCostvarianceItemHdrDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            SqlParameter[] sqlParms = new SqlParameter[7];

            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter Year = new SqlParameter("@YEAR", SqlDbType.Int);
                    Year.Value = (!string.IsNullOrEmpty(pYear) ? Convert.ToInt32(pYear.Trim()) : 0);

                    SqlParameter HalfYear = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    HalfYear.Value = (!string.IsNullOrEmpty(pHalfYear) ? Convert.ToInt32(pHalfYear.Trim()) : 0);

                    SqlParameter Quarter = new SqlParameter("@QUARTER", SqlDbType.Int);
                    Quarter.Value = (!string.IsNullOrEmpty(pQuater) ? Convert.ToInt32(pQuater.Trim()) : 0);

                    SqlParameter Month = new SqlParameter("@MONTH", SqlDbType.Int);
                    Month.Value = (!string.IsNullOrEmpty(pMonthly) ? Convert.ToInt32(pMonthly.Trim()) : 0);

                    SqlParameter SpecialityCode = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    SpecialityCode.Value = pSpecialityCode;

                    SqlParameter CodeText = new SqlParameter("@CODE_TEXT", SqlDbType.NVarChar);
                    CodeText.Value = pCodetext;

                    SqlParameter DiagnosisCode = new SqlParameter("@DIAGNOSIS_CODE", SqlDbType.NVarChar);
                    DiagnosisCode.Value = pDiagnosisCode ;

                    object[] parameters = { Year, HalfYear, Quarter, Month, SpecialityCode, CodeText, DiagnosisCode };

                    SqlStr = "EXEC GET_COSTVARIANCE_ITEMGROUP_HDR_DETAILS @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@CODE_TEXT,@DIAGNOSIS_CODE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}{3}{4}{5}{6}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstcostvarianceItemHdrDetails = objContext.Database.SqlQuery<VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} getting the costvariance item header details ", methodBaseName)); }

                    return lstcostvarianceItemHdrDetails;
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

        #region GetCostvarianceSurgeonHdrData
        /// <summary>
        /// GetCostvarianceSurgeonHdrData
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public List<VM_POU_COSTVARIANCE_SURGEON_HDR_DATA> GetCostvarianceSurgeonHdrData(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            SqlParameter[] sqlParms = new SqlParameter[7];

            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter Year = new SqlParameter("@YEAR", SqlDbType.Int);
                    Year.Value = (!string.IsNullOrEmpty(pYear) ? Convert.ToInt32(pYear.Trim()) : 0);

                    SqlParameter HalfYear = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    HalfYear.Value = (!string.IsNullOrEmpty(pHalfYear) ? Convert.ToInt32(pHalfYear.Trim()) : 0);

                    SqlParameter Quarter = new SqlParameter("@QUARTER", SqlDbType.Int);
                    Quarter.Value = (!string.IsNullOrEmpty(pQuater) ? Convert.ToInt32(pQuater.Trim()) : 0);

                    SqlParameter Month = new SqlParameter("@MONTH", SqlDbType.Int);
                    Month.Value = (!string.IsNullOrEmpty(pMonthly) ? Convert.ToInt32(pMonthly.Trim()) : 0);

                    SqlParameter SpecialityCode = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    SpecialityCode.Value = pSpecialityCode;
                    //Here we are passing pcodetext to diagnosis and pdiagnosiscode to codetext
                    SqlParameter CodeText = new SqlParameter("@CODE_TEXT", SqlDbType.NVarChar);
                    CodeText.Value = pDiagnosisCode;

                    SqlParameter DiagnosisCode = new SqlParameter("@DIAGNOSIS_CODE", SqlDbType.NVarChar);
                    DiagnosisCode.Value = pCodetext ;
                  

                    object[] parameters = { Year, HalfYear, Quarter, Month, SpecialityCode, CodeText, DiagnosisCode };

                    SqlStr = "EXEC GET_COSTVARIANCE_SURGEON_HDR_DATA @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@CODE_TEXT,@DIAGNOSIS_CODE";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}{3}{4}{5}{6}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstcostvariancesurgeondata = objContext.Database.SqlQuery<VM_POU_COSTVARIANCE_SURGEON_HDR_DATA>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} getting the costvariance by surgeon header data ", methodBaseName)); }

                    return lstcostvariancesurgeondata;
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

        #region GetCostvarianceSupplyItemDetails
        /// <summary>
        /// GetCostvarianceSupplyItemDetails
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public List<VM_POU_COSTVARIANCE_ITEMGROUPS> GetCostvarianceSupplyItemDetails(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            SqlParameter[] sqlParms = new SqlParameter[6];

            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter Year = new SqlParameter("@YEAR", SqlDbType.Int);
                    Year.Value = (!string.IsNullOrEmpty(pYear) ? Convert.ToInt32(pYear.Trim()) : 0);

                    SqlParameter HalfYear = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    HalfYear.Value = (!string.IsNullOrEmpty(pHalfYear) ? Convert.ToInt32(pHalfYear.Trim()) : 0);

                    SqlParameter Quarter = new SqlParameter("@QUARTER", SqlDbType.Int);
                    Quarter.Value = (!string.IsNullOrEmpty(pQuater) ? Convert.ToInt32(pQuater.Trim()) : 0);

                    SqlParameter Month = new SqlParameter("@MONTH", SqlDbType.Int);
                    Month.Value = (!string.IsNullOrEmpty(pMonthly) ? Convert.ToInt32(pMonthly.Trim()) : 0);

                    SqlParameter SpecialityCode = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    SpecialityCode.Value = pSpecialityCode;

                    SqlParameter CodeText = new SqlParameter("@CODE_TEXT", SqlDbType.NVarChar);
                    CodeText.Value = pCodetext;

                    object[] parameters = { Year, HalfYear, Quarter, Month, SpecialityCode, CodeText };

                    SqlStr = "EXEC GET_COSTVARIANCE_SUPPLY_ITEM_DETAILS @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@CODE_TEXT";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}{3}{4}{5}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstcostvarianceItemHdrDetails = objContext.Database.SqlQuery<VM_POU_COSTVARIANCE_ITEMGROUPS>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} getting the costvariance Supply ItemDetails ", methodBaseName)); }

                    return lstcostvarianceItemHdrDetails;
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

        #region GetCostvarianceSupplyHdrData
        /// <summary>
        /// GetCostvarianceSupplyHdrData
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public List<VM_POU_COSTVARIANCE_SUPPLY_HDR_DATA> GetCostvarianceSupplyHdrData(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            SqlParameter[] sqlParms = new SqlParameter[6];

            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter Year = new SqlParameter("@YEAR", SqlDbType.Int);
                    Year.Value = (!string.IsNullOrEmpty(pYear) ? Convert.ToInt32(pYear.Trim()) : 0);

                    SqlParameter HalfYear = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    HalfYear.Value = (!string.IsNullOrEmpty(pHalfYear) ? Convert.ToInt32(pHalfYear.Trim()) : 0);

                    SqlParameter Quarter = new SqlParameter("@QUARTER", SqlDbType.Int);
                    Quarter.Value = (!string.IsNullOrEmpty(pQuater) ? Convert.ToInt32(pQuater.Trim()) : 0);

                    SqlParameter Month = new SqlParameter("@MONTH", SqlDbType.Int);
                    Month.Value = (!string.IsNullOrEmpty(pMonthly) ? Convert.ToInt32(pMonthly.Trim()) : 0);

                    SqlParameter SpecialityCode = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    SpecialityCode.Value = pSpecialityCode;

                    SqlParameter CodeText = new SqlParameter("@CODE_TEXT", SqlDbType.NVarChar);
                    CodeText.Value = pCodetext;

                    object[] parameters = { Year, HalfYear, Quarter, Month, SpecialityCode, CodeText };

                    SqlStr = "EXEC GET_COSTVARIANCE_SUPPLY_HDR_DATA @YEAR,@HALFYEAR,@QUARTER,@MONTH,@SPECIALTYCODE,@CODE_TEXT";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}{3}{4}{5}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstcostvarianceItemHdrDetails = objContext.Database.SqlQuery<VM_POU_COSTVARIANCE_SUPPLY_HDR_DATA>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} getting the Cost variance Supply Header Data ", methodBaseName)); }

                    return lstcostvarianceItemHdrDetails;
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

        #region GetCostvarianceSupplyItemData
        /// <summary>
        /// GetCostvarianceSupplyItemData
        /// </summary>
        /// <param name="pItemGroup"></param>
        /// <param name="pDiagnosisCode"></param>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pPhysicianId"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public Dictionary<string, object> GetCostvarianceSupplyItemData(string pItemGroup, string pDiagnosisCode, string pSpecialityCode, string pCodetext, string pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            string _strtablename = string.Empty;
            string _strWhere = string.Empty;
            SqlParameter[] sqlParms = new SqlParameter[9];            
            System.Data.DataSet pdsResult = new DataSet();
            Dictionary<string, object> Dict = new Dictionary<string, object>();

            if (pDiagnosisCode == "PROCEDURE_CODE")
            {
                pDiagnosisCode = "3";
            }
            if (pDiagnosisCode == "CPT_CODE")
            {
                pDiagnosisCode = "2";
            }
            if (pDiagnosisCode == "ICD_CODE")
            {
                pDiagnosisCode = "1";
            }

            try
            {

                using (ATPAR_MT_REPORTS_Context objContext = new ATPAR_MT_REPORTS_Context())
                {

                    if (!string.IsNullOrEmpty(pHalfYear) && Convert.ToInt32(pHalfYear) != 0)
                    {
                        _strtablename = "MT_POU_RPT_SUPPLY_COMPARISON_H";
                        _strWhere = " PERIOD=" + pHalfYear + " AND YEAR=" + pYear + "AND DIAGNOSIS_CODE_TYPE = " + pDiagnosisCode;
                    }
                    else if (!string.IsNullOrEmpty(pQuater) && Convert.ToInt32(pQuater) != 0)
                    {
                        _strtablename = "MT_POU_RPT_SUPPLY_COMPARISON_Q";
                        _strWhere = " PERIOD=" + pQuater + " AND YEAR=" + pYear + "AND DIAGNOSIS_CODE_TYPE = " + pDiagnosisCode;
                    }
                    else if (!string.IsNullOrEmpty(pMonthly) && Convert.ToInt32(pMonthly) != 0)
                    {
                        _strtablename = "MT_POU_RPT_SUPPLY_COMPARISON_M";
                        _strWhere = " PERIOD=" + pMonthly + " AND YEAR=" + pYear + "AND DIAGNOSIS_CODE_TYPE = " + pDiagnosisCode;
                    }
                    else if (!string.IsNullOrEmpty(pYear) && Convert.ToInt32(pYear) != 0)
                    {
                        _strtablename = "MT_POU_RPT_SUPPLY_COMPARISON_Y";
                        _strWhere = " YEAR=" + pYear + "AND DIAGNOSIS_CODE_TYPE = " + pDiagnosisCode;
                    }

                    SqlStr = " SELECT * FROM (SELECT ITEM_DESCRIPTION, ITEM_GROUP, PHYSICIAN_ID, ITEM_ID, MFR_CATALOG_NO, UNIT_COST, "
                        + "ISNULL(NO_OF_TIMES_ITEM_USED_BY_PHY,0) NO_OF_TIMES_ITEM_USED_BY_PHY "
                       + " FROM " + _strtablename + " WHERE " + _strWhere + " AND SPECIALTY_CODE ='" + pSpecialityCode + "' AND DIAGNOSIS_CODE='" + pCodetext + "') AS SOURCETAB "
                       + " PIVOT(AVG(NO_OF_TIMES_ITEM_USED_BY_PHY) FOR PHYSICIAN_ID IN (" + pPhysicianId + ")) AS PIVOTTABLE WHERE ITEM_GROUP ='" + pItemGroup + "' ";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}:", methodBaseName, SqlStr))); }
                    }

                    SqlDataAdapter da = new SqlDataAdapter(SqlStr.ToString(), objContext.Database.Connection.ConnectionString);
                    da.Fill(pdsResult);


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + ((pdsResult.Tables[0].Rows.Count > 0) ? pdsResult.Tables[0].Rows.Count : 0)); }
                    Dict.Add("DictSupplyItemData", pdsResult);

                    return Dict;

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

        #endregion
    }
}
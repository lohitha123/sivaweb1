using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.Repository.Interfaces.POU;
using AtPar.Data;
using System.Data;
using System.Data.SqlClient;

namespace AtPar.POU.Repos
{
    public class PhysicianBenchMarkRepository: IPhysicianBenchMarkRepository
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor
        public PhysicianBenchMarkRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(PhysicianBenchMarkRepository));
        }

        #endregion


        #region GetPhysicianSummaryBySpeciality

        public List<VM_POU_PHY_SUMMARY_BY_SPECIALTY> GetPhysicianSummaryBySpeciality(string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
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
                    sqlParms[0].Value = (!string.IsNullOrEmpty(pstrYear)) ? Convert.ToInt32(pstrYear.Trim()) : 0;

                    sqlParms[1] = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    sqlParms[1].Value = (!string.IsNullOrEmpty(pstrHalfYear)) ? Convert.ToInt32(pstrHalfYear.Trim()) : 0;

                    sqlParms[2] = new SqlParameter("@QUARTER", SqlDbType.Int);
                    sqlParms[2].Value = (!string.IsNullOrEmpty(pstrQuarter)) ? Convert.ToInt32(pstrQuarter.Trim()) : 0;

                    sqlParms[3] = new SqlParameter("@MONTH", SqlDbType.Int);
                    sqlParms[3].Value = (!string.IsNullOrEmpty(pstrMonth)) ? Convert.ToInt32(pstrMonth.Trim()) : 0;

                    SqlStr = "EXEC GET_PHY_SUMMARY_BY_SPECIALTY @YEAR,@HALFYEAR,@QUARTER,@MONTH";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }
                   
                    var lstPhySummaryBySpeciality = objContext.Database.SqlQuery<VM_POU_PHY_SUMMARY_BY_SPECIALTY>(SqlStr, sqlParms).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetPhysicianSummaryBySpeciality Returned: {1}", methodBaseName, lstPhySummaryBySpeciality != null ? lstPhySummaryBySpeciality.Count() : 0)); }

                    return lstPhySummaryBySpeciality;
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

        #region GetPhysicianRankData

        public List<VM_POU_PHY_RANK_DATA> GetPhysicianRankData(string pstrSpecialityCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
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

                    SqlStr = "EXEC GET_PHY_RANK_DATA @SPECIALTYCODE,@YEAR,@HALFYEAR,@QUARTER,@MONTH";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstPhysicianRankData = objContext.Database.SqlQuery<VM_POU_PHY_RANK_DATA>(SqlStr, sqlParms).ToList();
                    
                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetPhysicianRankData Returned: {1}", methodBaseName, lstPhysicianRankData != null ? lstPhysicianRankData.Count() : 0)); }

                    return lstPhysicianRankData;
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

        #region GetPhysicianScoreCardData

        public List<VM_POU_PHY_SCORE_CARD_DATA> GetPhysicianScoreCardData(string pstrSpecialityCode, string pstrPhysicianId, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
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

                    sqlParms[0] = new SqlParameter("@SPECIALTYCODE", SqlDbType.NVarChar);
                    sqlParms[0].Value = pstrSpecialityCode;

                    sqlParms[1] = new SqlParameter("@PHYSICIAN_ID", SqlDbType.NVarChar);
                    sqlParms[1].Value = pstrPhysicianId;

                    sqlParms[2] = new SqlParameter("@YEAR", SqlDbType.Int);
                    sqlParms[2].Value = (!string.IsNullOrEmpty(pstrYear)) ? Convert.ToInt32(pstrYear.Trim()) : 0;

                    sqlParms[3] = new SqlParameter("@HALFYEAR", SqlDbType.Int);
                    sqlParms[3].Value = (!string.IsNullOrEmpty(pstrHalfYear)) ? Convert.ToInt32(pstrHalfYear.Trim()) : 0;

                    sqlParms[4] = new SqlParameter("@QUARTER", SqlDbType.Int);
                    sqlParms[4].Value = (!string.IsNullOrEmpty(pstrQuarter)) ? Convert.ToInt32(pstrQuarter.Trim()) : 0;

                    sqlParms[5] = new SqlParameter("@MONTH", SqlDbType.Int);
                    sqlParms[5].Value = (!string.IsNullOrEmpty(pstrMonth)) ? Convert.ToInt32(pstrMonth.Trim()) : 0;

                    
                    SqlStr = "EXEC GET_PHY_SCORE_CARD_DATA @SPECIALTYCODE,@PHYSICIAN_ID,@YEAR,@HALFYEAR,@QUARTER,@MONTH";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var lstPhysicianScoreCardData = objContext.Database.SqlQuery<VM_POU_PHY_SCORE_CARD_DATA>(SqlStr, sqlParms).ToList();
                  
                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetPhysicianScoreCardData Returned: {1}", methodBaseName, lstPhysicianScoreCardData != null ? lstPhysicianScoreCardData.Count() : 0)); }

                    return lstPhysicianScoreCardData;
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
    }
}

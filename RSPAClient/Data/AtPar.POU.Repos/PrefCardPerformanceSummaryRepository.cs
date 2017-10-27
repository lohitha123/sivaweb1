using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;
using log4net;
using AtPar.Common;
using System.Data.SqlClient;
using AtPar.Data;

namespace AtPar.POU.Repos
{
    public class PrefCardPerformanceSummaryRepository : IPrefCardPerformanceSummaryRepository
    {
        ILog _log;
        public PrefCardPerformanceSummaryRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(PrefCardPerformanceSummaryRepository));
        }


        /// <summary>
        /// Used to get the PrefCardOptimization Report Data
        /// </summary>
        /// <param name="pFromDate"></param>
        /// <param name="pToDate"></param>
        /// <param name="pProcId"></param>
        /// <param name="pPhyId"></param>
        /// <returns></returns>
       public List<VM_POU_PREF_CARD_PERFORMANCE_SUMMARY> GetPrefPerformanceRpt(string pFromDate, string pToDate, string pProcId, string pPhyId="")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            if (pPhyId == null) pPhyId = "";
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampFromDate = new SqlParameter("@FROM_DATE", pFromDate);
                    SqlParameter paramToDate = new SqlParameter("@TO_DATE", pToDate);
                    SqlParameter paramProcId = new SqlParameter("@PROCEDURE_CODE", pProcId);
                    SqlParameter parampPhyId = new SqlParameter("@PHYSICIAN", pPhyId);
                    
                    object[] parameters = { parampFromDate, paramToDate, paramProcId, parampPhyId};

                    SqlStr = "EXEC GETPREFPERFORMANCERPT @FROM_DATE,@TO_DATE,@PROCEDURE_CODE,@PHYSICIAN";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    List<VM_POU_PREF_CARD_PERFORMANCE_SUMMARY> lstPrefPerformanceSummary = objContext.Database.SqlQuery<VM_POU_PREF_CARD_PERFORMANCE_SUMMARY>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of PrefPerformanceSummary Data Returned: {1}", methodBaseName, (lstPrefPerformanceSummary != null ? lstPrefPerformanceSummary.Count() : 0))); }

                    return  lstPrefPerformanceSummary;
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
    }
}

using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Repos
{
   public class PrefCardOptimizationReportRepository: IPrefCardOptimizationReportRepository
    {
        ILog _log;
        public PrefCardOptimizationReportRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(PrefCardOptimizationReportRepository));
        }


        /// <summary>
        /// Used to get the PrefCardOptimization Report Data
        /// </summary>
        /// <param name="pFromDate"></param>
        /// <param name="pToDate"></param>
        /// <param name="pProcId"></param>
        /// <param name="pcasecount"></param>
        /// <param name="pPhyId"></param>
        /// <returns></returns>
        public Tuple<int, List<VM_POU_PREF_CARD_OPTIMIZATION>> GetPrefCardOptimizationRpt(string pFromDate, string pToDate, string pProcId, string pPhyId = "")
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
                    SqlParameter paramcasecount = new SqlParameter("@CASECOUNT", System.Data.SqlDbType.Int);
                    paramcasecount.Direction = System.Data.ParameterDirection.Output;
                    
                      object[] parameters = { parampFromDate, paramToDate, paramProcId, parampPhyId, paramcasecount};

                    SqlStr = "EXEC GetPrefCardOptimizationReport @FROM_DATE,@TO_DATE,@PROCEDURE_CODE,@PHYSICIAN,@CASECOUNT OUT";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }
                    
                    //var fields = new[] { "DEPARTMENT_ID", "WORKSTATION_ID", "WORKSTATION_DESCR", "WORKSTATION_MAC_ADDRESS", "ORG_GROUP_ID" };

                    List<VM_POU_PREF_CARD_OPTIMIZATION> lstPrefCardOptimization = objContext.Database.SqlQuery<VM_POU_PREF_CARD_OPTIMIZATION>( SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of PrefCardOptimization Data Returned: {1} and Cases Count {2}", methodBaseName, (lstPrefCardOptimization != null ? lstPrefCardOptimization.Count() : 0), Convert.ToInt32(paramcasecount.Value))); }
 
                    return new Tuple<int, List<VM_POU_PREF_CARD_OPTIMIZATION>>(item1:Convert.ToInt32(paramcasecount.Value), item2:lstPrefCardOptimization);
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

using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;
using log4net;
using AtPar.Common;
using AtPar.Data;
using System.Data.SqlClient;
using System.Data;
using System.Data.Entity.Infrastructure;

namespace AtPar.POU.Repos
{
    public class PrefCardPerformanceDetailsRepository : IPrefCardPerformanceDetailsRepository
    {
        ILog _log;
        public PrefCardPerformanceDetailsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(PrefCardPerformanceDetailsRepository));
        }
       
        /// <summary>
        /// Used to get the PrefCarDPerformanceDtls Report Data
        /// </summary>
        /// <param name="pFromDate"></param>
        /// <param name="pToDate"></param>
        /// <param name="pProcId"></param>
        /// <param name="pPhyId"></param>
        /// <returns></returns>
        public List<VM_POU_PREF_CARD_PERFORMANCE_DETAILS> GetPrefCarDPerformanceDtls(string pFromDate, string pToDate, string pProcId, string pPhyId = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            if (pPhyId == null) pPhyId = "";
            List<VM_POU_PREF_CARD_PERFORMANCE_DETAILS> lstPrefPerformanceDetails = new List<VM_POU_PREF_CARD_PERFORMANCE_DETAILS>();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                        SqlParameter[] sqlParms = new SqlParameter[4];
                        sqlParms[0] = new SqlParameter("@FROM_DATE", SqlDbType.NVarChar);
                        sqlParms[0].Value = pFromDate;

                        sqlParms[1] = new SqlParameter("@TO_DATE", SqlDbType.NVarChar);
                        sqlParms[1].Value = pToDate;

                        sqlParms[2] = new SqlParameter("@PROCEDURE_CODE", SqlDbType.NVarChar);
                        sqlParms[2].Value = pProcId;

                        sqlParms[3] = new SqlParameter("@PHYSICIAN", SqlDbType.NVarChar);
                        sqlParms[3].Value = pPhyId;


                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GETPREFCARDPERFDTLS";
                        command.CommandType = CommandType.StoredProcedure;

                        SqlStr = "DECLARE @P1 INT " + "SET @P1 = 0 " + "\r\n" + "\r\n" + "EXEC	" + "GETPREFCARDPERFDTLS" + "\r\n" + "@FROM_DATE = N'" + sqlParms[0].Value + "'," + "\r\n" + "@TO_DATE = N'" + sqlParms[1].Value + "'," + "\r\n" + "@PROCEDURE_CODE = N'" + sqlParms[2].Value + "'," + "\r\n" + "@PHYSICIAN = N'" + sqlParms[3].Value + "'," + "SELECT	@P1 ";

                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(SqlStr);
                        }
                        try
                        {
                            using (var reader = command.ExecuteReader())
                            {
                                reader.NextResult();
                                lstPrefPerformanceDetails = ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<VM_POU_PREF_CARD_PERFORMANCE_DETAILS>(reader)
                                        .ToList();

                            }

                        }
                        catch (Exception ex)
                        {

                            throw ex;
                        }



                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of PrefPerformanceSummary Data Returned: {1}", methodBaseName, (lstPrefPerformanceDetails != null ? lstPrefPerformanceDetails.Count() : 0))); }

                        return lstPrefPerformanceDetails;
                    }
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

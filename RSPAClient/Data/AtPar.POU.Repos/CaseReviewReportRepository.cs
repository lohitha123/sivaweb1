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
using System.Data;
using System.Data.Entity.Infrastructure;
using AtPar.POCOEntities;

namespace AtPar.POU.Repos
{
    public class CaseReviewReportRepository : ICaseReviewReportRepository
    {

        ILog _log;
        public CaseReviewReportRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CaseReviewReportRepository));
        }

       

        /// <summary>
        /// Used to get the Case review report Cases information
        /// </summary>
        /// <param name="pstrDeptId"></param>
        /// <returns></returns>
        public List<VM_POU_GET_CASES_INFORMATION> GetCasesInformation(string pstrDeptId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampDeptID = new SqlParameter("@DEPT_ID", pstrDeptId);
                  

                    object[] parameters = { parampDeptID };

                    SqlStr = "EXEC GETCASESINFORMATION @DEPT_ID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    List<VM_POU_GET_CASES_INFORMATION> lstCaseReviewCasesInfo = objContext.Database.SqlQuery<VM_POU_GET_CASES_INFORMATION>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetCasesInformation Data for Case Review returned : {1}", methodBaseName, (lstCaseReviewCasesInfo != null ? lstCaseReviewCasesInfo.Count() : 0))); }

                    return lstCaseReviewCasesInfo;
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
        /// <summary>
        ///Used to get the Case review report Cases Data information
        /// </summary>
        /// <param name="pStrCaseID"></param>
        /// <returns></returns>
        public Dictionary<string, object> GetCaseReview(string pStrCaseID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;

            List<VM_POU_GETCASEREVIEW_RPT_CASE_HEADER_SUMMARY> lstGetcasereviewRptCaseHeaderSummary = null;
            List<VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_TOTAL_SUMMARY> lstGetcasereviewRptCaseItemTotalSummary = null;
            List<VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_INFO> lstGetcasereviewRptCaseItemInfo = null;
            List<VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_LOTSERIAL_DETAILS> lstGetcasereviewRptCaseItemLotserialDetails = null;

            try
            {
                var result = new Dictionary<string, object>();
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                        SqlParameter parampDeptID = new SqlParameter("@CASE_ID", pStrCaseID);
                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.Add(parampDeptID);
                        command.CommandText = "GetCaseReviewReport";
                        command.CommandType = CommandType.StoredProcedure;


                        SqlStr = "DECLARE @P1 INT " + "SET @P1 = 0 " + "\r\n" + "\r\n" + "EXEC	" + "GetCaseReviewReport" + "\r\n" + "@FROM_DATE = N'" + parampDeptID + "SELECT @P1";

                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(SqlStr);
                        }
                        
                        try
                        {
                            using (var reader = command.ExecuteReader())
                            {
                                lstGetcasereviewRptCaseHeaderSummary = ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<VM_POU_GETCASEREVIEW_RPT_CASE_HEADER_SUMMARY>(reader)
                                        .ToList();

                                reader.NextResult();


                                lstGetcasereviewRptCaseItemTotalSummary = ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_TOTAL_SUMMARY>(reader)
                                        .ToList();
                                reader.NextResult();

                                lstGetcasereviewRptCaseItemInfo = ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_INFO>(reader)
                                        .ToList();
                                reader.NextResult();

                                lstGetcasereviewRptCaseItemLotserialDetails = ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_LOTSERIAL_DETAILS>(reader)
                                        .ToList();

                            }

                        }
                        catch (Exception ex)
                        {

                            throw ex;
                        }

                       // List<VM_POU_GET_CASES_INFORMATION> lstCaseReviewCasesInfo = objContext.Database.SqlQuery<VM_POU_GET_CASES_INFORMATION>(SqlStr, parameters).ToList();

                       if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetCasesInformation Data for Case Review returned are CasereviewRptCaseHeaderSummary:{1}, CasereviewRptCaseItemTotalSummary:{2},CasereviewRptCaseItemInfo:{3},casereviewRptCaseItemLotserialDetails:{4}", methodBaseName, lstGetcasereviewRptCaseHeaderSummary.Count, lstGetcasereviewRptCaseItemTotalSummary.Count, lstGetcasereviewRptCaseItemInfo.Count, lstGetcasereviewRptCaseItemLotserialDetails.Count)); }

                        result.Add("CaseStatus", GetCaseStatus(pStrCaseID));
                        result.Add("lstGetcasereviewRptCaseHeaderSummary", lstGetcasereviewRptCaseHeaderSummary);
                        result.Add("lstGetcasereviewRptCaseItemTotalSummary", lstGetcasereviewRptCaseItemTotalSummary);
                        result.Add("lstGetcasereviewRptCaseItemInfo", lstGetcasereviewRptCaseItemInfo);
                        result.Add("lstGetcasereviewRptCaseItemLotserialDetails", lstGetcasereviewRptCaseItemLotserialDetails);

                        
                        return result;
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
        /// <summary>
        ///Used to get the Case review report Cases Status information
        /// </summary>
        /// <param name="pStrCaseID"></param>
        /// <returns></returns>

        private int GetCaseStatus(string pStrCaseID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }


                    if(!string.IsNullOrEmpty(pStrCaseID))
                    SqlStr = "SELECT STATUS  FROM MT_POU_CASE_CART_HEADER WHERE CASE_ID =  '" + pStrCaseID + "' ";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    int CaseStatus = objContext.Database.SqlQuery<short>(SqlStr).FirstOrDefault();

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    return CaseStatus;

                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
                
        }

    }
}

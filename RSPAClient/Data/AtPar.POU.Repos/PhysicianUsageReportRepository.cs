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

namespace AtPar.POU.Repos
{
    public class PhysicianUsageReportRepository : IPhysicianUsageReportRepository
    {
        ILog _log;
        public PhysicianUsageReportRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(PhysicianUsageReportRepository));
        }


        /// <summary>
        /// Used to get the PhysicianUsage Header Report Data
        /// </summary>
        /// <param name="pStrPhysicianID"></param>
        /// <param name="pStrProcedure"></param>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <returns></returns>
        public List<VM_POU_PHYSICIAN_USAGE_HEADER> GetPhysicianUsage(string pStrPhysicianID, string pStrProcedure, string pStrFromDate, string pStrToDate, string OrgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            OrgGrpID = OrgGrpID == null ? "" : OrgGrpID;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            pStrPhysicianID = pStrPhysicianID == null ? "" : pStrPhysicianID;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampFromDate = new SqlParameter("@PhysicianID", pStrPhysicianID);
                    SqlParameter paramToDate = new SqlParameter("@ProcedureCode", pStrProcedure);
                    SqlParameter paramProcId = new SqlParameter("@FromDate", pStrFromDate);
                    SqlParameter parampPhyId = new SqlParameter("@ToDate", pStrToDate);
                    SqlParameter parampOrgGroupID = new SqlParameter("@OrgGrpID", OrgGrpID);

                    object[] parameters = { parampFromDate, paramToDate, paramProcId, parampPhyId, parampOrgGroupID };

                    SqlStr = "EXEC GetPhysicianUsage @PhysicianID,@ProcedureCode,@FromDate,@ToDate,@OrgGrpID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    List<VM_POU_PHYSICIAN_USAGE_HEADER> lstPhysicianUsageHeader = objContext.Database.SqlQuery<VM_POU_PHYSICIAN_USAGE_HEADER>(SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Physician Usage Data Returned: {1}", methodBaseName, (lstPhysicianUsageHeader != null ? lstPhysicianUsageHeader.Count() : 0))); }

                    return lstPhysicianUsageHeader;
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
        /// Used to get the PhysicianUsage Details Report Data
        /// </summary>
        /// <param name="lstPhysicianUsageHeader"></param>
        /// <returns></returns>
        public List<VM_POU_PHYSICIAN_USAGE_DETAILS> GetPhysicianCompareDetails(List<VM_POU_PHYSICIAN_USAGE_HEADER> lstPhysicianUsageHeader)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
            StringBuilder sbSql = new StringBuilder();
            List<VM_POU_PHYSICIAN_USAGE_HEADER> _lstPhysicianUsageHeader = lstPhysicianUsageHeader;
            List<VM_POU_PHYSICIAN_USAGE_DETAILS> lstPhysicianUsageDetails = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT A.PHYSICIAN_ID, A.EXAM_ID, A.PREF_LIST_ID, A.CASE_ID, B.ITEM_ID,B.ITEM_DESCRIPTION,");
                    sbSql.Append("B.ITEM_DESCRIPTION,(SUM(B.ITEM_COUNT) + SUM(ISNULL(B.ISSUE_QTY,0))) AS ITEM_COUNT,((SUM(B.ITEM_COUNT)+ SUM(ISNULL(B.ISSUE_QTY,0))) - (SUM(ISNULL(D.RETURN_QTY,0)) + SUM(ISNULL(D.WASTAGE_QTY,0)))) AS USED_QTY,");
                    sbSql.Append("SUM(ISNULL(D.RETURN_QTY,0)) RETURN_QTY,SUM(ISNULL(D.WASTAGE_QTY,0)) WASTAGE_QTY, B.UOM, B.ISSUE_UOM, B.ISSUE_PRICE ");
                    sbSql.Append(",(((SUM(B.ITEM_COUNT)+ SUM(ISNULL(B.ISSUE_QTY,0))) - (SUM(ISNULL(D.RETURN_QTY,0)) + SUM(ISNULL(D.WASTAGE_QTY,0)))) * B.ISSUE_PRICE) AS SUMUSED,(SUM(ISNULL(D.RETURN_QTY,0)) * B.ISSUE_PRICE ) AS SUMRETURN,(SUM(ISNULL(D.WASTAGE_QTY,0)) * B.ISSUE_PRICE) AS SUMWASTAGE ");
                    sbSql.Append("FROM MT_POU_CHARGECAPTURE_HEADER A, MT_POU_PHYSICIAN C, MT_POU_CHARGECAPTURE_DETAILS B LEFT OUTER JOIN MT_POU_CHARGECAPTURE_RETURNS D ON (B.TRANSACTION_ID = D.TRANSACTION_ID) AND B.LINE_NO = D.LINE_NO ");
                    sbSql.Append("WHERE (A.TRANSACTION_ID = B.TRANSACTION_ID) AND A.PHYSICIAN_ID = C.PHYSICIAN_ID AND ( ");
                    if (_lstPhysicianUsageHeader != null)
                    {

                        for (int i = 0; i <= _lstPhysicianUsageHeader.Count-1; i++)
                        {
                            if(i != _lstPhysicianUsageHeader.Count - 1)
                                sbSql.Append("(A.EXAM_ID='" + _lstPhysicianUsageHeader[i].EXAM_ID + "' AND A.PREF_LIST_ID='" + _lstPhysicianUsageHeader[i].PREF_LIST_ID + "' AND A.CASE_ID='" + _lstPhysicianUsageHeader[i].CASE_ID + "') OR ");
                            else
                                sbSql.Append("(A.EXAM_ID='" + _lstPhysicianUsageHeader[i].EXAM_ID + "' AND A.PREF_LIST_ID='" + _lstPhysicianUsageHeader[i].PREF_LIST_ID + "' AND A.CASE_ID='" + _lstPhysicianUsageHeader[i].CASE_ID + "')");
                        }

                  
                    }
                    sbSql.Append(")");
                    sbSql.Append(" GROUP BY B.ITEM_ID, B.UOM, B.ISSUE_UOM, B.ISSUE_PRICE, A.PHYSICIAN_ID, A.EXAM_ID, B.ITEM_DESCRIPTION, A.PREF_LIST_ID, A.CASE_ID");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    lstPhysicianUsageDetails = objContext.Database.SqlQuery<VM_POU_PHYSICIAN_USAGE_DETAILS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0}:Pou physician usage details Count {1}", methodBaseName, (lstPhysicianUsageDetails != null ? lstPhysicianUsageDetails.Count() : 0))); }

                    return lstPhysicianUsageDetails;
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

    }
}

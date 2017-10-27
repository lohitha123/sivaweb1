using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.Common;
using log4net;
using AtPar.POCOEntities;
using AtPar.Data;
using System.Data.SqlClient;

namespace AtPar.POU.Repos
{
    public class ReleaseCasesRepository : IReleaseCasesRepository
    {
        ILog _log;
        public ReleaseCasesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ReleaseCasesRepository));
        }
        /// <summary>
        /// Used to get departnements
        /// </summary>
        /// <returns></returns>
        public List<MT_POU_DEPT> GetDepartments()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT DISTINCT DEPT_ID,DEPT_NAME,CASE WHEN (DEPT_NAME IS NULL OR DEPT_NAME = '') THEN DEPT_ID ");
                    sbSql.Append(" ELSE DEPT_ID + ' - ' + DEPT_NAME END AS DEPARTMENT FROM MT_POU_DEPT WHERE STATUS = 0 ");                   

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var fields = new[] { "DEPT_ID", "DEPT_NAME", "DEPARTMENT" };

                    var lstDepartmentUsers = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Department Users Returned: {1}", methodBaseName, lstDepartmentUsers != null ? lstDepartmentUsers.Count() : 0)); }

                    return lstDepartmentUsers;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString()+ Globals.QUERY + sbSql.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        /// <summary>
        /// Used to download the cases
        /// </summary>
        /// <returns></returns>
        public List<MT_POU_CASE_CART_HEADER> GetDownloadCases()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT DISTINCT CH.CASE_ID ,CH.DESCRIPTION,CH.DEPT_ID,CASE WHEN CH.DESCRIPTION IS NOT NULL AND CH.DESCRIPTION != '' THEN AT.ID  + ' - ' + CH.DESCRIPTION  ");
                    sbSql.Append(" ELSE AT.ID END CASE_ID FROM MT_ATPAR_TRANSACTION AT JOIN MT_POU_CASE_CART_HEADER CH ON AT.ID=CH.CASE_ID  ");
                    sbSql.Append(" AND AT.REPORT_DATA_3=CH.PREF_LIST_ID AND AT.REPORT_DATA_4=CH.PROCEDURE_CODE  ");
                    sbSql.Append(" WHERE AT.APP_ID = '" + (int)AtParWebEnums.EnumApps.PointOfUse + "' AND AT.STATUS = '" + (int)AtParWebEnums.AppTransactionStatus.Downloaded + "'");
                    

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var fields = new[] { "CASE_ID", "DESCRIPTION", "DEPT_ID", "CASE_ID" };

                    var lstDepartmentUsers = objContext.Database.DifferedExecuteQuery<MT_POU_CASE_CART_HEADER>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Department Users Returned: {1}", methodBaseName, lstDepartmentUsers != null ? lstDepartmentUsers.Count() : 0)); }

                    return lstDepartmentUsers;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Used to process the relese cases
        /// </summary>
        /// <param name="pIsUpdate"></param>
        /// <param name="pTransID"></param>
        /// <param name="pDeptID"></param>
        /// <param name="pCaseID"></param>
        /// <returns></returns>
        public List<MT_ATPAR_TRANSACTION> ProcessReleaseCases(bool pIsUpdate, int pTransID, string pDeptID, string pCaseID,int[] tranIDs)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            string SqlStr = string.Empty;
            SqlCommand _Cmd = default(SqlCommand);
            SqlParameter[] sqlParms = new SqlParameter[3];            

            //Update Transcation Details 
            if (pIsUpdate)
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    String arrTostr = tranIDs.Select(a => a.ToString()).Aggregate((i, j) => i + "," + j);
                    sbSql.Append(" UPDATE MT_ATPAR_TRANSACTION SET STATUS= '" + (int)AtParWebEnums.AppTransactionStatus.Unlock + "' ");
                    sbSql.Append(" WHERE APP_ID= " + (int)AtParWebEnums.EnumApps.PointOfUse + " AND TRANSACTION_ID in ( " + arrTostr + ") ");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    try
                    {
                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                        throw ex;                     
                    }
                    finally { sbSql = null; }
                }               
            }


            try
            {
               
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter DepartmentID = new SqlParameter("@DEPT_ID", pDeptID);
                    SqlParameter caseId = new SqlParameter("@CASE_ID", pCaseID);

                    object[] parameters = { DepartmentID, caseId };

                    SqlStr = "EXEC GetReleaseCases @DEPT_ID,@CASE_ID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var fields = new[] { "TRANSACTION_ID", "USER_ID", "CASE_ID", "PROCEDURE_CODE", "PREF_ID", "USERNAME", "PERFORM_DATE", "ID"};

                    var lstReleaseCases = objContext.Database.DifferedExecuteQuery<MT_ATPAR_TRANSACTION>(fields, SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Release cases Returned: {1}", methodBaseName, lstReleaseCases != null ? lstReleaseCases.Count() : 0)); }

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Release cases Returned: {1}", methodBaseName, lstReleaseCases != null ? lstReleaseCases.Count() : 0)); }

                    return lstReleaseCases;
                }               

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                throw ex;
            }
            finally
            {
                //_Cmd.Dispose();
                sbSql = null;
            }          
        }   


    }
}

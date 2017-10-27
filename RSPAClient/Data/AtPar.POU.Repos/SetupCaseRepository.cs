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
using System.Data;

namespace AtPar.POU.Repos
{
    public class SetupCaseRepository : ISetupCaseRepository
    {
        ILog _log;
        public SetupCaseRepository(ILog log)
        {
            _log = log;
        }


        public List<MT_POU_CASE_CART_HEADER> GetCaseInfo(string strPhysician, string strProcedureCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string SqlStr = string.Empty;
           // SqlCommand _Cmd = default(SqlCommand);
            SqlParameter[] sqlParms = new SqlParameter[3];

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter Physician = new SqlParameter("@Physician", SqlDbType.NVarChar);
                    Physician.Value = strPhysician;
                    SqlParameter ProcedureCode = new SqlParameter("@ProcedureCode", SqlDbType.NVarChar);
                    ProcedureCode.Value = strProcedureCode;
                    object[] parameters = { Physician, ProcedureCode };

                    SqlStr = "EXEC GetCaseInfo @Physician,@ProcedureCode";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var fields = new[] { "CASE_ID", "DESCRIPTION", "PHYSICIAN", "PREF_LIST_ID", "PROCEDURE_ID", "STATUS", "ROOM_NO", "PATIENT_ID", "PERFORM_DATE" };

                    var lstReleaseCases = objContext.Database.DifferedExecuteQuery<MT_POU_CASE_CART_HEADER>(fields, SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetCaseInfo Returned: {1}", methodBaseName, lstReleaseCases != null ? lstReleaseCases.Count() : 0)); }                    

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
              //  _Cmd.Dispose();
                SqlStr = string.Empty;
            }
        }


        public long AddCaseInfo(string caseID, string caseDesc, string physID, string patient, string prefID, string procID, string date, string userID, string roomNo, string status,
        string emergCase = "N", string deptId = "", string serviceCode = "", string costCenter = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            string SqlStr = string.Empty;
            SqlCommand _Cmd = default(SqlCommand);
            SqlParameter[] sqlParms = new SqlParameter[3];
            long _StatusCode = 0;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter CaseID = new SqlParameter("@CaseID", caseID);
                    SqlParameter CaseDesc = new SqlParameter("@CaseDesc", caseDesc);
                    SqlParameter PhysID = new SqlParameter("@PhysID", physID);
                    SqlParameter Patient = new SqlParameter("@Patient", patient);
                    SqlParameter PrefID = new SqlParameter("@PrefID", prefID);
                    SqlParameter ProcID = new SqlParameter("@ProcID", procID);
                    SqlParameter Date = new SqlParameter("@Date", date);
                    SqlParameter UserID = new SqlParameter("@UserID", userID);
                    SqlParameter RoomNo = new SqlParameter("@RoomNo", roomNo);
                    SqlParameter Status = new SqlParameter("@Status", status);
                    SqlParameter EmergCase = new SqlParameter("@EmergCase", emergCase);
                    SqlParameter DeptId = new SqlParameter("@DeptId", deptId);
                    SqlParameter ServiceCode = new SqlParameter("@ServiceCode", serviceCode);
                    SqlParameter CostCenterCode = new SqlParameter("@CostCenterCode", costCenter);
                    SqlParameter StatusCode = new SqlParameter("@StatusCode", SqlDbType.Int);
                    StatusCode.Direction = ParameterDirection.Output;

                    object[] parameters = { CaseID, CaseDesc, PhysID, Patient , PrefID , ProcID , Date , UserID , RoomNo , Status , EmergCase , DeptId , ServiceCode , CostCenterCode , StatusCode };

                    SqlStr = "EXEC InsertCaseInfo @CaseID, @CaseDesc, @PhysID, @Patient , @PrefID , @ProcID , @Date , @UserID , @RoomNo , @Status , @EmergCase , @DeptId , @ServiceCode , @CostCenterCode , @StatusCode OUT";
                                    
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    objContext.Database.ExecuteSqlCommand(SqlStr, parameters);

                    _StatusCode = (int)StatusCode.Value;

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} After AddCaseInfo method execution", methodBaseName) ); }

                  
                    return _StatusCode;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                throw ex;
            }
            finally
            {
               // _Cmd.Dispose();
                SqlStr = null;
            }
        }


        public long DeleteCaseID(string caseID, string prefID, string procID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = null, _infoMsg = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                   
                        _strSQL = "DELETE MT_POU_CASE_CART_HEADER WHERE  CASE_ID='" + caseID + " 'AND PREF_LIST_ID = '" + prefID + "' AND PROCEDURE_CODE = '" + procID + "'";
                        _infoMsg = " Deleting the preference list header with the following SQL..." + _strSQL;
                    
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(_strSQL);
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " " + _infoMsg + " " + count); }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                _strSQL = null;
            }
        }


        public List<MT_POU_PREF_LIST_HEADER> GetPreferenceListIDs()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                    
                    sbSql.Append("SELECT A.PREF_LIST_ID, A.PREF_LIST_DESCR, A.PROCEDURE_ID, B.DESCRIPTION , A.PHYSICIAN_ID,");
                    sbSql.Append("CASE WHEN (A.PREF_LIST_DESCR IS NULL OR A.PREF_LIST_DESCR = '') THEN A.PREF_LIST_ID ELSE A.PREF_LIST_ID + ' - ' + A.PREF_LIST_DESCR END AS PREFERENCENAME ,");
                    sbSql.Append("CASE WHEN (A.PREF_LIST_DESCR IS NULL OR A.PREF_LIST_DESCR = '') THEN A.PREF_LIST_ID ELSE A.PREF_LIST_DESCR + ' (' + A.PREF_LIST_ID + ')' END AS PREFLISTNAME,");
                    sbSql.Append("CASE WHEN (B.DESCRIPTION IS NULL OR B.DESCRIPTION = '') THEN B.PROCEDURE_CODE ELSE B.DESCRIPTION + ' (' + B.PROCEDURE_CODE + ')' END  AS PREF_PROCEDURES  ");
                    sbSql.Append(" FROM MT_POU_PREF_LIST_HEADER A JOIN MT_POU_PROCEDURE_CODE B ON B.PROCEDURE_CODE = A.PROCEDURE_ID AND A.STATUS = 0 ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var fields = new[] { "PREF_LIST_ID", "PREF_LIST_DESCR", "PROCEDURE_ID", "DESCRIPTION", "PHYSICIAN_ID", "PREFERENCENAME", "PREFLISTNAME", "PREF_PROCEDURES" };

                    var lstPreferenceList = objContext.Database.DifferedExecuteQuery<MT_POU_PREF_LIST_HEADER>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetPreferenceListIDs Returned: {1}", methodBaseName, lstPreferenceList != null ? lstPreferenceList.Count() : 0)); }

                    return lstPreferenceList;
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
        


    }
}

using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using  AtPar.Common.AtParWebEnums;

namespace AtPar.POU.Repos
{
    public class ManageCasesRepository : IManageCasesRepository
    {
        ILog _log;
        public ManageCasesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageCasesRepository));
        }

        /// <summary>
        /// Used to get the Departments
        /// </summary>
        /// <returns></returns>
        public List<MT_POU_DEPT> GetDepartments()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT DISTINCT DEPT_ID, DEPT_NAME, CASE WHEN (DEPT_NAME IS NULL OR DEPT_NAME = '') THEN DEPT_ID  ");
                    sbSQL.Append("ELSE DEPT_ID + ' - ' + DEPT_NAME END AS DEPARTMENT FROM MT_POU_DEPT WHERE STATUS = 0 ");

                    var fields = new[] { "DEPT_ID", "DEPT_NAME", "DEPARTMENT" };

                    var lstdepts = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT>(fields, sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstdepts.Count); }

                    return lstdepts;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }
        }


        public List<PAR_MNGT_COST_CENTER> GetDeptCostCenters()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT COST_CENTER_CODE, DEPT_ID FROM PAR_MNGT_COST_CENTER WHERE STATUS = 0 ");

                    var fields = new[] { "COST_CENTER_CODE", "DEPT_ID" };

                    var lstResult = objContext.Database.DifferedExecuteQuery<PAR_MNGT_COST_CENTER>(fields, sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstResult.Count); }

                    return lstResult;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }
        }

        /// <summary>
        /// Used to get the Service Codes
        /// </summary>
        /// <returns></returns>
        public List<MT_POU_SPECIALTY_CODE> GetServiceCodes()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT SPECIALTY_CODE, [DESCRIPTION], CASE WHEN ([DESCRIPTION] IS NULL OR [DESCRIPTION] = '') THEN SPECIALTY_CODE ELSE SPECIALTY_CODE + ' - ' + [DESCRIPTION] END AS SERVICECODE FROM MT_POU_SPECIALTY_CODE WHERE STATUS = 0 ");

                    var fields = new[] { "SPECIALTY_CODE", "DESCRIPTION", "SERVICECODE" };

                    var lstServiceCodes = objContext.Database.DifferedExecuteQuery<MT_POU_SPECIALTY_CODE>(fields, sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstServiceCodes.Count); }

                    return lstServiceCodes;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }
        }

        /// <summary>
        /// Used to get the Cases
        /// </summary>
        /// <returns></returns>
        public List<MT_POU_CASE_CART_HEADER> GetCases()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT CASE_ID, [DESCRIPTION], CASE WHEN ([DESCRIPTION] IS NULL OR [DESCRIPTION] = '') THEN CASE_ID ELSE CASE_ID + ' - ' + [DESCRIPTION] END AS CASEDESCR FROM MT_POU_CASE_CART_HEADER WHERE STATUS IN (0,1,3,5,7,9,13) ");

                    var fields = new[] { "CASE_ID", "DESCRIPTION", "CASEDESCR" };

                    var lstServiceCodes = objContext.Database.DifferedExecuteQuery<MT_POU_CASE_CART_HEADER>(fields, sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstServiceCodes.Count); }

                    return lstServiceCodes;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }
        }

        /// <summary>
        /// Used to Verify Reviewer data
        /// </summary>
        /// <param name="lstCaseInfo"></param>
        /// <param name="replacePref"></param>
        /// <returns></returns>
        public long VerifyReviewerdata(List<VM_MT_POU_CASE_INFO> lstCaseInfo, bool replacePref = false)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<VM_MT_POU_CASE_INFO> lstChkTrans = null;

            try
            {

                if (!replacePref)
                {
                    lstChkTrans = lstCaseInfo.Where(x => x.CHANGED_STATUS != string.Empty).ToList();

                    if (lstChkTrans == null)
                    {
                        lstChkTrans = lstCaseInfo.Where(x => x.REPLACE_CASE != string.Empty).ToList();
                    }
                }
                else
                {
                    lstChkTrans = lstCaseInfo;
                }

                if (lstChkTrans.Count > 0)
                {
                    foreach (var item in lstChkTrans)
                    {
                        int intcaseCurr_Status = 0;
                        int _count = 0;
                        string _status = string.Empty;

                        if (!replacePref)
                        {
                            _status = item.CURRENT_STATUS;
                        }
                        else
                        {
                            _status = item.STATUS;
                        }

                        switch (_status)
                        {
                            case "OPEN":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.OPEN;
                                break;
                            case "READY":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.READY;
                                break;
                            case "PARTIALLY PICKED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.PARTIALLYPICKED;
                                break;
                            case "PICKED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.PICKED;
                                break;
                            case "RETURNED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.RETURNED;
                                break;
                            case "REVIEWED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.REVIEWED;
                                break;
                            case "CLOSED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.CLOSED;
                                break;
                            case "REPLACED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.REPLACED;
                                break;
                            case "INACTIVE":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.INACTIVE;
                                break;
                            case "CANCELLED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.CANCELLED;
                                break;
                            case "PENDING":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.PENDING;
                                break;
                            case "CASEISSUED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.CASEISSUED;
                                break;
                            case "PREF_REPLACED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.PREF_REPLACED;
                                break;
                            case "REMOVE":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.REMOVE;
                                break;
                        }

                        _count = IsCaseExistInCaseCardHeader(item.CASE_ID, item.PROCEDURE_CODE, item.PREF_LIST_ID, intcaseCurr_Status);

                        if (_count > 0)
                        {
                            return AtparStatusCodes.S_POU_REVIEW_LATEST_DATA;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

            return AtparStatusCodes.ATPAR_OK;
        }

        public int IsCaseExistInCaseCardHeader(string caseID, string procedureCode, string prefListID, int caseCurrentStatus)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(CASE_ID) FROM  MT_POU_CASE_CART_HEADER WHERE CASE_ID ='" + caseID + "' ");
                    sbSql.Append("AND PROCEDURE_CODE = '" + procedureCode + "' AND PREF_LIST_ID ='" + prefListID + "' ");
                    sbSql.Append("AND STATUS <> " + caseCurrentStatus);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    cnt = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Vendors Count " + cnt); }

                    return cnt;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        #region Case status report

        public long InsertCaseTrackHistory(string caseID, string prefID, string procID, string orgGroupID, string deptID,
           int caseStatus, string userID, bool isManageCase)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            short casePickingStatus = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    VM_POU_CASE_CART_HEADER objCase = GetPatient(caseID, prefID, procID, objContext);

                    if (!isManageCase)
                    {
                        casePickingStatus = GetDeptCasePickingStatus(orgGroupID, deptID, objContext);
                    }
                    else
                    {
                        casePickingStatus = 0;
                    }


                    long StatusCode = InsertCaseTrack(/*caseTrackHistory*/caseID, prefID, procID, string.Empty, string.Empty,
                       caseStatus, userID, objContext);

                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        return StatusCode;
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private VM_POU_CASE_CART_HEADER GetPatient(string caseID, string prefID, string procID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();
            var objPatint = new VM_POU_CASE_CART_HEADER();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSQL.Append("SELECT PATIENT_ID, PERFORM_DATE, DEPT_ID FROM MT_POU_CASE_CART_HEADER ");
                sbSQL.Append("WHERE CASE_ID = '" + caseID + "' ");
                sbSQL.Append("AND PREF_LIST_ID='" + prefID + "' ");
                sbSQL.Append("AND PROCEDURE_CODE='" + procID + "' ");

                var fields = new[] { "PATIENT_ID", "PERFORM_DATE", "DEPT_ID" };

                var lstResult = objContext.Database.DifferedExecuteQuery<VM_POU_CASE_CART_HEADER>(fields, sbSQL.ToString()).ToList();

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstResult.Count); }

                objPatint.PATIENT_ID = lstResult.FirstOrDefault().PATIENT_ID;
                objPatint.PERFORM_DATE = lstResult.FirstOrDefault().PERFORM_DATE;
                objPatint.DEPT_ID = lstResult.FirstOrDefault().DEPT_ID;

                return objPatint;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }
        }

        private short GetDeptCasePickingStatus(string orgGroupID, string deptID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                short casePickStatus = objContext.MT_POU_DEPT.Where(x => x.ORG_GROUP_ID == orgGroupID && x.DEPT_ID == deptID).FirstOrDefault().CASE_PICK_STATUS;

                string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

                if (_log.IsDebugEnabled)
                {
                    _log.Debug(string.Format("{0} Case Pick Status for Org Group ID {1} and Department ID {2} is {3} ",
                 methodBaseName, orgGroupID, deptID, casePickStatus));
                }

                return casePickStatus;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        private long InsertCaseTrack(/*MT_POU_CASE_TRACK_HISTORY caseTrackHistory,*/string caseID, string prefID,
            string procID, string patientID, string performDate, int caseStatus, string userID, ATPAR_MT_Context objContext,
            int chargeTransID = 0, int transID = 0, int casePickStatus = 0, string deptID = "", string deviceID = "", string strComments = "")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {



                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_POU_CASE_TRACK_HISTORY(");
                sbSql.Append("[CASE_ID], [PREF_LIST_ID], [PROCEDURE_CODE], [PATIENT_ID], [PERFORM_DATE], [DEPARTMENT_ID], ");
                sbSql.Append("[CASE_STATUS], [UPDATE_USER_ID], ");
                sbSql.Append("[WORKSTATION_MAC_ADDRESS], [UPDATE_DT_TIME],[CASE_PICK_STATUS],[TRANSACTION_ID],[CHARGE_CAPTURE_TRANS_ID], COMMENTS) VALUES(");
                //sbSql.Append(caseTrackHistory.CASE_ID + "','");
                sbSql.Append("'" + caseID + "',");
                //sbSql.Append(caseTrackHistory.PREF_LIST_ID + "','");
                sbSql.Append("'" + prefID + "',");
                //sbSql.Append(caseTrackHistory.PROCEDURE_CODE + "','");
                sbSql.Append("'" + procID + "',");
                //sbSql.Append(caseTrackHistory.PATIENT_ID + "','");
                sbSql.Append("'" + patientID + "',");
                //sbSql.Append(caseTrackHistory.PERFORM_DATE + "','");
                sbSql.Append("'" + performDate + "',");
                //sbSql.Append(caseTrackHistory.DEPARTMENT_ID + "',");
                sbSql.Append("'" + deptID + "',");
                //sbSql.Append(caseTrackHistory.CASE_STATUS + ",'");
                sbSql.Append("'" + caseStatus + "',");
                // sbSql.Append(caseTrackHistory.UPDATE_USER_ID + "','");
                sbSql.Append("'" + userID + "',");
                //sbSql.Append(caseTrackHistory.WORKSTATION_MAC_ADDRESS + "',");
                sbSql.Append("'" + deviceID + "',");
                sbSql.Append("GETDATE() ,");
                // sbSql.Append(caseTrackHistory.CASE_PICK_STATUS + ",");
                sbSql.Append("" + casePickStatus + ", ");
                //sbSql.Append(caseTrackHistory.TRANSACTION_ID + ",");
                sbSql.Append("" + transID + ",");
                //sbSql.Append(caseTrackHistory.CHARGE_CAPTURE_TRANS_ID + ",'");
                sbSql.Append("" + chargeTransID + ",");
                //sbSql.Append(caseTrackHistory.COMMENTS + "')");
                sbSql.Append("'" + strComments + "')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }


                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region Process Cases

        public long UpdateCaseTransactionStatus(string caseID, string procCode, string prefID, string changedStatus, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSQL.Append("UPDATE MT_ATPAR_TRANSACTION SET STATUS = '" + changedStatus + "', UPDATE_DT_TIME = GETDATE() ");
                sbSQL.Append("WHERE ID = '" + caseID + "' AND APP_ID = '" + (int)AtParWebEnums.EnumApps.PointOfUse + "'  ");
                sbSQL.Append("AND REPORT_DATA_4 = '" + procCode + "' AND REPORT_DATA_3 = '" + prefID + "'");

                var count = objContext.Database.ExecuteSqlCommand(sbSQL.ToString());

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                return AtparStatusCodes.ATPAR_OK;


            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSQL = null;
            }
        }

        /// <summary>
        /// Update Case Cart Header
        /// </summary>
        /// <param name="caseID"></param>
        /// <param name="procCode"></param>
        /// <param name="prefID"></param>
        /// <param name="caseStatus"></param>
        /// <returns></returns>
        public long UpdateCaseCartHeader(string caseID, string procCode, string prefID, string caseStatus)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("UPDATE MT_POU_CASE_CART_HEADER SET STATUS = '" + caseStatus + "' , UPDATE_DATE = GETDATE() WHERE CASE_ID = '" + caseID + "' AND PROCEDURE_CODE = '" + procCode + "' AND PREF_LIST_ID = '" + prefID + "'");

                    var count = objContext.Database.ExecuteSqlCommand(sbSQL.ToString());

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }


            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSQL = null;
            }
        }

        /// <summary>
        /// To Get the Case Issue Status
        /// </summary>
        /// <param name="caseID"></param>
        /// <param name="prefID"></param>
        /// <param name="procCode"></param>
        /// <returns></returns>
        public int GetCaseIssueStatus(string caseID, string prefID, string procCode)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();
            int caseIssueStatus = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT COUNT(CASE_ID) FROM MT_POU_CHARGECAPTURE_HEADER WHERE CASE_ID = '" + caseID + "' AND PREF_LIST_ID = '" + prefID + "' AND EXAM_ID = '" + procCode + "' AND (CHARGE_STATUS <> 13 AND CHARGE_STATUS <> 17)");

                    caseIssueStatus = objContext.Database.SqlQuery<int>(sbSQL.ToString()).FirstOrDefault();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }
            return caseIssueStatus;
        }

        #region BuildCancelCases :splitting sp
        public Tuple<long, List<VM_POU_CHECK_CART_ALLOCATION>, List<MT_POU_CHARGECAPTURE_DETAILS>> BuildCancelCases(string caseID, string procCode, string prefID, string orgGrpId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = "";
            string IsCartAllocated = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramCaseId = new SqlParameter("@CASE_ID", caseID);
                    SqlParameter paramProcCode = new SqlParameter("@PROCEDURE_CODE", procCode);
                    SqlParameter paramPrefId = new SqlParameter("@PREF_LIST_ID", prefID);
                    SqlParameter paramOrgGrpId = new SqlParameter("@ORG_GROUP_ID", orgGrpId);
                    SqlParameter paramAppId = new SqlParameter("@AppID", AtParWebEnums.EnumApps.PointOfUse);
                    SqlParameter paramIsCartAllocated = new SqlParameter("@IS_CART_ALLOCATED", SqlDbType.Char,1);
                    paramIsCartAllocated.Direction = System.Data.ParameterDirection.Output;

                    object[] parameters = { paramCaseId, paramProcCode, paramPrefId, paramOrgGrpId, paramAppId, paramIsCartAllocated };

                    sbSql = "EXEC CheckCartAllocation @CASE_ID, @PROCEDURE_CODE, @PREF_LIST_ID, @ORG_GROUP_ID, @AppID, @IS_CART_ALLOCATED OUT";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "CART_ID", "BUSINESS_UNIT", "LOCATION_TYPE", "DEPT_ID", "INV_INTERFACE_ENABLE", "DEFAULT_DESTINATION_LOCATION", "DEFAULT_DISTRIBUTION_TYPE" };

                    var lstCarts = objContext.Database.DifferedExecuteQuery<VM_POU_CHECK_CART_ALLOCATION>(fields, sbSql, parameters).ToList();

                    IsCartAllocated = paramIsCartAllocated.Value.ToString();

                    if (IsCartAllocated == AtParWebEnums.YesNo_Enum.N.ToString())
                    {
                        return new Tuple<long, List<VM_POU_CHECK_CART_ALLOCATION>, List<MT_POU_CHARGECAPTURE_DETAILS>>(AtparStatusCodes.CRCT_S_CARTNOTALLOCATED, null, null);
                    }

                    List<MT_POU_CHARGECAPTURE_DETAILS> lstdetails = GetCaptureHeader(caseID, prefID, procCode, objContext);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Carts Allocated: " + lstCarts.Count()); }

                    return new Tuple<long, List<VM_POU_CHECK_CART_ALLOCATION>, List<MT_POU_CHARGECAPTURE_DETAILS>>(AtparStatusCodes.ATPAR_OK, lstCarts, lstdetails);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return new Tuple<long, List<VM_POU_CHECK_CART_ALLOCATION>, List<MT_POU_CHARGECAPTURE_DETAILS>>(AtparStatusCodes.E_SERVERERROR, null, null);
            }
            finally
            {
                sbSql = null;
            }
        }

        private List<MT_POU_CHARGECAPTURE_DETAILS> GetCaptureHeader(string caseID, string prefListID, string procdCode, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT (SUM(ISNULL(DTL.ITEM_COUNT,0) + ISNULL(DTL.ISSUE_QTY,0)) ) - (SUM(ISNULL(RTN.RETURN_QTY,0))) AS ITEM_COUNT,");
                sbSql.Append("SUM(HOLD_QTY) AS HOLD_QTY, DTL.ITEM_ID,DTL.COMPARTMENT, DTL.STORAGE_AREA, DTL.STORAGE_LEVEL_1, DTL.STORAGE_LEVEL_2, ");
                sbSql.Append("DTL.STORAGE_LEVEL_3, DTL.STORAGE_LEVEL_4, DTL.UOM, DTL.ITEM_SRNUMBER, DTL.ITEM_LOTNUMBER,");
                sbSql.Append("DTL.CART_ID, DTL.BUSINESS_UNIT, HDR.DEPARTMENT_ID,HDR.EXAM_ID AS PROCEDURE_CODE, ");
                sbSql.Append("HDR.PREF_LIST_ID, HDR.CASE_ID , DTL.UPDATE_USER_ID FROM MT_POU_CHARGECAPTURE_HEADER ");
                sbSql.Append("HDR JOIN MT_POU_CHARGECAPTURE_DETAILS DTL ON HDR.TRANSACTION_ID = DTL.TRANSACTION_ID LEFT JOIN MT_POU_CHARGECAPTURE_RETURNS RTN ");
                sbSql.Append("ON RTN.TRANSACTION_ID = DTL.TRANSACTION_ID AND RTN.LINE_NO = DTL.LINE_NO WHERE HDR.CASE_ID = '" + caseID + "' AND HDR.PREF_LIST_ID = '" + prefListID + "' ");
                sbSql.Append("AND HDR.EXAM_ID = '" + procdCode + "'  AND(HDR.CHARGE_STATUS <> 13 AND HDR.CHARGE_STATUS <> 17) GROUP BY ITEM_ID, COMPARTMENT, STORAGE_AREA, STORAGE_LEVEL_1, STORAGE_LEVEL_2, ");
                sbSql.Append("STORAGE_LEVEL_3, STORAGE_LEVEL_4, UOM, ITEM_LOTNUMBER, ITEM_SRNUMBER, CART_ID, BUSINESS_UNIT, DEPARTMENT_ID, CASE_ID, EXAM_ID, PREF_LIST_ID, UPDATE_USER_ID ");


                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                string[] fields = new string[] { "ITEM_COUNT", "HOLD_QTY","ITEM_ID","COMPARTMENT", "STORAGE_AREA","STORAGE_LEVEL_1","STORAGE_LEVEL_2", "STORAGE_LEVEL_3", "STORAGE_LEVEL_4", "UOM",
                    "ITEM_SRNUMBER","ITEM_LOTNUMBER","CART_ID", "BUSINESS_UNIT","DEPARTMENT_ID","PROCEDURE_CODE","PREF_LIST_ID","CASE_ID","UPDATE_USER_ID"};

                var lstDistCartHeader = objContext.Database.DifferedExecuteQuery<MT_POU_CHARGECAPTURE_DETAILS>(fields, sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstDistCartHeader.Count); }

                return lstDistCartHeader;

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
        #endregion


        public int DoCancelCaseProcessSP(string caseID, string procCode, string prefID, string bUnit)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = "";
           // string StatusCode = "N";
            int cnt;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramCaseId = new SqlParameter("@CASE_ID", caseID);
                    SqlParameter paramProcCode = new SqlParameter("@PROCEDURE_CODE", procCode);
                    SqlParameter paramPrefId = new SqlParameter("@PREF_LIST_ID", prefID);
                    SqlParameter paramBunit = new SqlParameter("@BUSINESS_UNIT", bUnit);
                    SqlParameter paramStatusCode = new SqlParameter("@STATUS_CODE", SqlDbType.Int);
                    paramStatusCode.Direction = System.Data.ParameterDirection.Output;

                    object[] parameters = { paramCaseId, paramProcCode, paramPrefId, paramBunit, paramStatusCode };

                    sbSql = "EXEC DoCancelCaseProcess @CASE_ID, @PROCEDURE_CODE, @PREF_LIST_ID, @BUSINESS_UNIT,@STATUS_CODE OUT";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var result = objContext.Database.ExecuteSqlCommand(sbSql, parameters);

                    cnt = (int)paramStatusCode.Value;
                    return cnt;
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

        public int ReplacePrefCardSP(string caseID, string procCode, string prefID, string newPrefListID, string newProcedureCode,
             string isUpdateAllDtls)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = "";
            int StatusCode = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramCaseId = new SqlParameter("@CASE_ID", caseID);
                    SqlParameter paramProcCode = new SqlParameter("@PROCEDURE_CODE", procCode);
                    SqlParameter paramPrefId = new SqlParameter("@PREF_LIST_ID", prefID);
                    SqlParameter paramNewPrefId = new SqlParameter("@NEW_PREF_LIST_ID", newPrefListID);
                    SqlParameter paramNewProcedureCode = new SqlParameter("@NEW_PROCEDURE_CODE", newProcedureCode);
                    SqlParameter paramIsUpdateAllDtls = new SqlParameter("@ISUPDATE_ALLDTLS", isUpdateAllDtls);

                    SqlParameter paramStatusCode = new SqlParameter("@STATUS_CODE", StatusCode);
                    paramStatusCode.Direction = System.Data.ParameterDirection.Output;

                    object[] parameters = { paramCaseId, paramProcCode, paramPrefId, paramNewPrefId, paramNewProcedureCode, paramIsUpdateAllDtls, paramStatusCode };

                    sbSql = "EXEC ReplacePrefCard @CASE_ID, @PROCEDURE_CODE, @PREF_LIST_ID, @NEW_PREF_LIST_ID, @NEW_PROCEDURE_CODE, @ISUPDATE_ALLDTLS, @STATUS_CODE OUT";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var result = objContext.Database.ExecuteSqlCommand(sbSql, parameters);

                    return (int)paramStatusCode.Value;
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

        public int IsNewCaseExistInCaseCardHeader(string replaceCaseID, string caseID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(CASE_ID) FROM MT_POU_CASE_CART_HEADER WHERE ((CASE_ID = '" + replaceCaseID + "' ");
                    sbSql.Append("AND STATUS IN (10,50)) OR (CASE_ID = '" + caseID + "' AND STATUS NOT IN (0,1)))");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Vendors Count " + cnt); }

                    return cnt;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }


        public List<MT_POU_CASE_CART_HEADER> GetDataForSelectedCase(string replaceCase)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT PROCEDURE_CODE, PREF_LIST_ID FROM MT_POU_CASE_CART_HEADER WHERE CASE_ID = '" + replaceCase + "' ");
                    sbSQL.Append("AND STATUS NOT IN (13, 17)");

                    var fields = new[] { "PROCEDURE_CODE", "PREF_LIST_ID" };

                    var lstCases = objContext.Database.DifferedExecuteQuery<MT_POU_CASE_CART_HEADER>(fields, sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCases.Count); }

                    return lstCases;
                }


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }
        }

        public int GetCaseStatus(string caseID, string prefID, string procCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _strSql = new StringBuilder();
            int caseStatus = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _strSql.Append("SELECT STATUS ");
                    _strSql.Append("FROM MT_POU_CASE_CART_HEADER ");
                    _strSql.Append("WHERE CASE_ID = '");
                    _strSql.Append(caseID);
                    _strSql.Append("' AND PREF_LIST_ID = '");
                    _strSql.Append(prefID);
                    _strSql.Append("' AND PROCEDURE_CODE = '");
                    _strSql.Append(procCode);
                    _strSql.Append("'");

                    caseStatus = objContext.Database.SqlQuery<short>(_strSql.ToString()).FirstOrDefault();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _strSql.ToString() + ":")); }
                    }

                    return caseStatus;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSql.ToString()); }
                throw ex;
            }
            finally
            {
                _strSql = null;
            }
        }

        public List<VM_POU_CASE_CART_HEADER_AND_DEPT> GetCaseCartItemDetails(string caseID, string prefID, string procCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _strSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _strSql.Append("SELECT H.COST_CENTER_CODE, D.DEFAULT_DESTINATION_LOCATION, D.DEFAULT_DISTRIBUTION_TYPE, D.INV_INTERFACE_ENABLE ");
                    _strSql.Append("FROM MT_POU_CASE_CART_HEADER H, MT_POU_DEPT D ");
                    _strSql.Append("WHERE H.DEPT_ID = D.DEPT_ID ");
                    _strSql.Append(" AND H.CASE_ID = '");
                    _strSql.Append(caseID);
                    _strSql.Append("' AND H.PREF_LIST_ID = '");
                    _strSql.Append(prefID);
                    _strSql.Append("' AND H.PROCEDURE_CODE = '");
                    _strSql.Append(procCode);
                    _strSql.Append("'");

                    var lstCaseCartHdrDept = objContext.Database.SqlQuery<VM_POU_CASE_CART_HEADER_AND_DEPT>(_strSql.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _strSql.ToString() + ":")); }
                    }
                    return lstCaseCartHdrDept;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSql.ToString()); }
                throw ex;
            }
            finally
            {
                _strSql = null;
            }
        }

        #region GetItemQuantityOnHand
        public Tuple<long, List<MT_POU_CART_INVENTORY>> GetItemQuantityOnHand(string businessUnit, string cartId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            System.Text.StringBuilder _sbSQL = new System.Text.StringBuilder();
            List<MT_POU_CART_INVENTORY> lstQtyOnHandDS = new List<MT_POU_CART_INVENTORY>();

            var sbSql = _sbSQL;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID, ITEM_ID, SUM(ITEM_QUANTITY_ON_HAND) AS QUANTITY_ON_HAND ");
                    sbSql.Append(", LOT_NUMBER, SERIAL_NUMBER, CONVERT(DATETIME, EXPIRY_DATE, 120) AS EXPIRY_DATE, COMPARTMENT ");
                    sbSql.Append(" FROM MT_POU_CART_INVENTORY WHERE BUSINESS_UNIT ='" + businessUnit + "'");
                    sbSql.Append(" AND CART_ID='" + cartId + "' GROUP BY BUSINESS_UNIT, CART_ID, ITEM_ID, LOT_NUMBER, ");
                    sbSql.Append("SERIAL_NUMBER, EXPIRY_DATE, COMPARTMENT");

                    if (_log.IsInfoEnabled)
                        _log.Info(methodBaseName + " Getting the Non cart item details with the" + " following SQL...." + _sbSQL.ToString());


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "BUSINESS_UNIT", "CART_ID", "ITEM_ID", "QUANTITY_ON_HAND", "LOT_NUMBER", "SERIAL_NUMBER", "EXPIRY_DATE", "COMPARTMENT" };

                    lstQtyOnHandDS = objContext.Database.DifferedExecuteQuery<MT_POU_CART_INVENTORY>(fields, _sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstQtyOnHandDS.Count); }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }

                return new Tuple<long, List<MT_POU_CART_INVENTORY>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
            }

            finally
            {
                _sbSQL = null;
            }


            return new Tuple<long, List<MT_POU_CART_INVENTORY>>(AtparStatusCodes.ATPAR_OK, lstQtyOnHandDS);

        }

        #endregion

        #region GetNonCartItems
        public Tuple<long, List<MT_POU_NONCART_ITEMS>> GetNonCartItems(string pStrBUnit, string pStrCartId)
        {


            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }



            StringBuilder _sbSQL = new StringBuilder();
            List<MT_POU_NONCART_ITEMS> lstNonCartItemDetails = new List<MT_POU_NONCART_ITEMS>();
            var sbSql = _sbSQL;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID,ITEM_ID, MANUFACTURE_ITEM_ID, VENDOR_ITEM_ID, CUST_ITEM_ID, ITEM_DESCRIPTION,VENDOR VENDOR_ID, ");
                    sbSql.Append("COUNT_ORDER, OPTIMUM_QTY, CHARGE_CODE, UOM, LOT_CONTROLLED, SERIALIZED, UPC_ID, ITEM_PRICE, COMPARTMENT ,STATUS ");
                    sbSql.Append("FROM MT_POU_NONCART_ITEMS ");
                    sbSql.Append("WHERE CART_ID='" + pStrCartId + "' ");
                    sbSql.Append("AND BUSINESS_UNIT='" + pStrBUnit + "' ");
                    sbSql.Append("AND STATUS != '" + AtParWebEnums.YesNo_Enum.N.ToString() + "'");

                    if (_log.IsInfoEnabled)
                        _log.Info(methodBaseName + " Getting the Non cart item details with the" + " following SQL...." + _sbSQL.ToString());


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "BUSINESS_UNIT", "CART_ID", "ITEM_ID", "MANUFACTURE_ITEM_ID", "VENDOR_ITEM_ID", "CUST_ITEM_ID", "ITEM_DESCRIPTION", "VENDOR_ID", "COUNT_ORDER", "OPTIMUM_QTY", "CHARGE_CODE", "UOM", "LOT_CONTROLLED", "SERIALIZED", "UPC_ID", "ITEM_PRICE", "COMPARTMENT", "STATUS" };

                    lstNonCartItemDetails = objContext.Database.DifferedExecuteQuery<MT_POU_NONCART_ITEMS>(fields, _sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstNonCartItemDetails.Count); }

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }

                return new Tuple<long, List<MT_POU_NONCART_ITEMS>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
            }

            finally
            {
                _sbSQL = null;
            }
            return new Tuple<long, List<MT_POU_NONCART_ITEMS>>(AtparStatusCodes.ATPAR_OK, lstNonCartItemDetails);
        }
        #endregion

        #region GetItemAttributesCnvFact

        public Tuple<double, string> GetItemAttributesCnvFact(string cartID, string bUnit, string itemID, string parUOM)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Double dblConverFact = 0;
            string strLowerQOH = string.Empty;
            int strActualQty = 0;
            StringBuilder sbSql = new StringBuilder();
            Tuple<double, string> tpl = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CART_ID, ITEM_ID, BUSINESS_UNIT, ORG_GROUP_ID, ISSUE_UOM, CONV_RATE_PAR_TO_ISSUE_CF ");
                    sbSql.Append("FROM MT_ATPAR_ITEM_ATTRIBUTES  WHERE CART_ID = '" + cartID + "' AND BUSINESS_UNIT = '" + bUnit + "'  AND ITEM_ID ='" + itemID + "'");

                    if (string.IsNullOrEmpty(parUOM) || parUOM == null)
                    {
                        sbSql.Append(" AND ISSUE_UOM != PAR_UOM ");
                    }
                    else
                    {
                        sbSql.Append(" AND ISSUE_UOM != '" + parUOM + "'");
                    }


                    var fields = new[] { "CART_ID", "ITEM_ID", "BUSINESS_UNIT", "ORG_GROUP_ID", "ISSUE_UOM", "CONV_RATE_PAR_TO_ISSUE_CF" };

                    var lstServiceCodes = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ITEM_ATTRIBUTES>(fields, sbSql.ToString()).ToList();


                    if (lstServiceCodes != null && lstServiceCodes.Count > 0)
                    {
                        if (string.IsNullOrEmpty(lstServiceCodes[0].CONV_RATE_PAR_TO_ISSUE_CF.ToString()) ||
                            Convert.ToDouble(lstServiceCodes[0].CONV_RATE_PAR_TO_ISSUE_CF.ToString()) == 0 ||
                            lstServiceCodes[0].CONV_RATE_PAR_TO_ISSUE_CF.ToString() == null)
                        {
                            dblConverFact = 1;
                        }
                        else
                        {
                            dblConverFact = Convert.ToDouble(lstServiceCodes[0].CONV_RATE_PAR_TO_ISSUE_CF.ToString());
                        }
                    }
                    else
                    {
                        strLowerQOH = strActualQty.ToString();
                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstServiceCodes.Count); }
                    tpl = new Tuple<double, string>(dblConverFact, strLowerQOH);
                    return tpl;
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

        #endregion

        #region SaveInventoryTrackHistory

        public long SaveTransactionHistory(DataRow detailRow, DataTable dtLookup, string replacePrefCard = "")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            StringBuilder sbLookUpSql = new StringBuilder();
            int intStatus = 0;
            int intUniqueId = 0;
            double dbAcutalQty = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    if (replacePrefCard == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        intStatus = (int)AtParWebEnums.CASE_PICK_STATUS.PREF_REPLACED;
                    }
                    else
                    {
                        intStatus = (int)AtParWebEnums.CASE_PICK_STATUS.CANCELLED;

                    }
                    int intTransId = GetTransID(detailRow);

                    sbLookUpSql.Remove(0, sbSql.Length);
                    sbLookUpSql.Append(" BUSINESS_UNIT = '" + detailRow["BUSINESS_UNIT"] + "' AND ");
                    sbLookUpSql.Append(" CART_ID = '" + detailRow["CART_ID"] + "' AND ");
                    sbLookUpSql.Append(" ITEM_ID = '" + detailRow["ITEM_ID"] + "' AND ");
                    sbLookUpSql.Append(" AND COMPARTMENT ='");
                    sbLookUpSql.Append(" " + detailRow["COMPARTMENT"].ToString().substituteString() + "' ");

                    List<MT_POU_CART_INVENTORY> lstCartInventory = GetQtyInventory(detailRow, dtLookup, sbLookUpSql.ToString());

                    if (lstCartInventory != null && lstCartInventory.Count > 0)
                    {
                        intUniqueId = Convert.ToInt32(lstCartInventory[0].ID);
                        dbAcutalQty = Convert.ToDouble(lstCartInventory[0].ACTUAL_QUANTITY);
                    }

                    long StatusCode = SaveInventoryTrackHistorys(intTransId, intStatus, intUniqueId, detailRow["BUSINESS_UNIT"].ToString(), detailRow["CART_ID"].ToString(), detailRow["ITEM_ID"].ToString(),
                           detailRow["COMPARTMENT"].ToString(), detailRow["ITEM_LOTNUMBER"].ToString(), detailRow["ITEM_SRNUMBER"].ToString(),
                           Convert.ToDouble(detailRow["ITEM_COUNT"]), dbAcutalQty, DateTime.Now.ToString());

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                   // var lstCount = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    //if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCount); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }


        }
        public int GetTransID(DataRow dataRow)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT TRANSACTION_ID FROM MT_ATPAR_TRANSACTION WHERE ID = ");
                    sbSql.Append(" '" + dataRow["CASE_ID"] + "' AND APP_ID=15 ORDER BY TRANSACTION_ID DESC  ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).ToList().FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCount); }

                    return lstCount;

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

        public List<MT_POU_CART_INVENTORY> GetQtyInventory(DataRow dataRow, DataTable dt, string lookUpSql)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            DataRow[] dr = null;
            string strSrCntrld = string.Empty;
            string strLotCntrld = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ACTUAL_QUANTITY , ID FROM MT_POU_CART_INVENTORY WHERE CART_ID =  ");
                    sbSql.Append(" '" + dataRow["CART_ID"].ToString() + "' AND ITEM_ID =  ");
                    sbSql.Append(" '" + dataRow["ITEM_ID"].ToString() + "' AND BUSINESS_UNIT =");
                    sbSql.Append(" '" + dataRow["BUSINESS_UNIT"].ToString() + "' AND COMPARTMENT = '" + dataRow["COMPARTMENT"].ToString().substituteString() + "' ");

                    if (dt != null && dt.Rows.Count > 0)
                    {
                        dr = dt.Select(lookUpSql);

                        if (dr.Length > 0)
                        {
                            if (dr[0]["SERIALIZED"] != null && !string.IsNullOrEmpty(dr[0]["SERIALIZED"].ToString()))
                            {
                                strSrCntrld = dr[0]["SERIALIZED"].ToString();
                            }
                            else
                            {
                                strSrCntrld = AtParWebEnums.YesNo_Enum.N.ToString();
                            }

                            if (dr[0]["LOTCONTROLLED"] != null && !string.IsNullOrEmpty(dr[0]["LOTCONTROLLED"].ToString()))
                            {
                                strLotCntrld = dr[0]["LOTCONTROLLED"].ToString();
                            }
                            else
                            {
                                strLotCntrld = AtParWebEnums.YesNo_Enum.N.ToString();
                            }

                            if (strLotCntrld == AtParWebEnums.YesNo_Enum.Y.ToString())
                            {
                                sbSql.Append("AND LOT_NUMBER = ");
                                sbSql.Append(" '" + dataRow["ITEM_LOTNUMBER"] + "' ");
                            }

                            if (strSrCntrld == AtParWebEnums.YesNo_Enum.Y.ToString())
                            {
                                sbSql.Append("AND SERIAL_NUMBER = ");
                                sbSql.Append(" '" + dataRow["ITEM_SRNUMBER"] + "' ");
                            }
                        }

                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "ACTUAL_QUANTITY", "ID" };

                    var lstCountBefore = objContext.Database.DifferedExecuteQuery<MT_POU_CART_INVENTORY>(fields, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Carts returned " + lstCountBefore); }

                    return lstCountBefore;

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

        public long SaveInventoryTrackHistorys(int transID, int eventType, int uniqueID, string bUnit, string cartID, string itemID,
            string compartment, string lotID, string serialID, double qty, double QOH, string endDate)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[16];

                    sqlparams[0] = new SqlParameter("@BUnit", SqlDbType.NVarChar, 50);
                    sqlparams[0].Value = bUnit;

                    sqlparams[1] = new SqlParameter("@ParLoc", SqlDbType.NVarChar, 50);
                    sqlparams[1].Value = cartID;

                    sqlparams[2] = new SqlParameter("@ItemID", SqlDbType.NVarChar, 50);
                    sqlparams[2].Value = itemID;

                    sqlparams[3] = new SqlParameter("@LotID", SqlDbType.NVarChar, 50);
                    sqlparams[3].Value = lotID;

                    sqlparams[4] = new SqlParameter("@SerialID", SqlDbType.NVarChar, 50);
                    sqlparams[4].Value = serialID;

                    sqlparams[5] = new SqlParameter("@Compartment", SqlDbType.NVarChar, 50);
                    sqlparams[5].Value = compartment;

                    sqlparams[6] = new SqlParameter("@transId", SqlDbType.Int);
                    sqlparams[6].Value = transID;

                    sqlparams[7] = new SqlParameter("@EventStatus", SqlDbType.Int);
                    sqlparams[7].Value = eventType;

                    sqlparams[8] = new SqlParameter("@ActualQty", SqlDbType.Float);
                    sqlparams[8].Value = qty;

                    sqlparams[9] = new SqlParameter("@OnHandQty", SqlDbType.Float);
                    sqlparams[9].Value = QOH;

                    sqlparams[10] = new SqlParameter("@UpdateDate", SqlDbType.DateTime);
                    sqlparams[10].Value = endDate;

                    sqlparams[11] = new SqlParameter("@UniqueID", SqlDbType.Int);
                    sqlparams[11].Value = uniqueID;

                    sqlparams[12] = new SqlParameter("@AdjustType", SqlDbType.Int);
                    sqlparams[12].Value = 0;

                    sqlparams[13] = new SqlParameter("@ChargeCaptureTransID", SqlDbType.Int);
                    sqlparams[13].Value = 0;

                    sqlparams[14] = new SqlParameter("@ReserveQtyOption", SqlDbType.NVarChar, 15);
                    sqlparams[14].Value = "";

                    sqlparams[15] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlparams[15].Direction = ParameterDirection.Output;

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var cnt = objContext.Database.ExecuteSqlCommand("exec SaveInventoryTrackHistory @BUnit, @ParLoc, @ItemID, @LotID, @SerialID, @Compartment, @transId, @EventStatus, @ActualQty, @OnHandQty, @UpdateDate, @UniqueID, @AdjustType, @ChargeCaptureTransID, @ReserveQtyOption, @StatusCode OUT ", sqlparams[0], sqlparams[1], sqlparams[2], sqlparams[3], sqlparams[4], sqlparams[5], sqlparams[6], sqlparams[7], sqlparams[8], sqlparams[9], sqlparams[10], sqlparams[11], sqlparams[12], sqlparams[13], sqlparams[14], sqlparams[15]);


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Inserted or Updated rows Count " + cnt); }

                    StatusCode = AtparStatusCodes.ATPAR_OK;

                }

                return StatusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        #endregion

        #region UpdatecartInventory
        public long UpdatecartInventory(int CaseStatus, string resvrQtyOption, DataRow drSearch, double DblConverFact, string lotCntrld,
            string srlCntrld)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long StatusCode = -1;
            double DblItemcount = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_POU_CART_INVENTORY SET ITEM_QUANTITY_ON_HAND = (LOWEST_QOH + ('");

                    if ((CaseStatus == 9 || CaseStatus == 7) && resvrQtyOption.ToUpper() == AtParWebEnums.RESVR_QTY_OPTION.TOTALPICKQTY.ToString() ||
                        resvrQtyOption.ToUpper() == AtParWebEnums.RESVR_QTY_OPTION.HOLDQTYONLY.ToString())
                    {
                        sbSql.Append("" + Convert.ToDouble(drSearch["ITEM_COUNT"]) + "'))/ " + DblConverFact + ", LOWEST_QOH = LOWEST_QOH  + ");
                        sbSql.Append("" + Convert.ToDouble(drSearch["ITEM_COUNT"]) + ", ACTUAL_QUANTITY = ACTUAL_QUANTITY + (");


                        if (Convert.ToDouble(drSearch["ITEM_COUNT"]) >= 0)
                        {
                            DblItemcount = Convert.ToDouble(drSearch["ITEM_COUNT"]) / DblConverFact;
                        }

                        sbSql.Append("" + DblItemcount + "");
                    }
                    else
                    {
                        sbSql.Append("" + Convert.ToDouble(Convert.ToDouble(drSearch["ITEM_COUNT"]) - Convert.ToDouble(drSearch["HOLD_QTY"])) + "))/ ");

                        sbSql.Append("" + DblConverFact + ", LOWEST_QOH = LOWEST_QOH " + Convert.ToDouble(Convert.ToDouble(drSearch["ITEM_COUNT"]) - Convert.ToDouble(drSearch["HOLD_QTY"])) + ", ACTUAL_QUANTITY =  ACTUAL_QUANTITY + (");

                        if (Convert.ToDouble(drSearch["ITEM_COUNT"]) >= 0)
                        {
                            DblItemcount = (Convert.ToDouble(drSearch["ITEM_COUNT"]) - Convert.ToDouble(drSearch["HOLD_QTY"])) / DblConverFact;
                        }
                        sbSql.Append(" " + DblItemcount + "");
                    }

                    sbSql.Append(") WHERE BUSINESS_UNIT = '");
                    sbSql.Append("" + drSearch["BUSINESS_UNIT"].ToString() + "' ");
                    sbSql.Append(" AND CART_ID = '");
                    sbSql.Append("" + drSearch["CART_ID"].ToString() + "' ");
                    sbSql.Append(" AND ITEM_ID = '");
                    sbSql.Append("" + drSearch["ITEM_ID"].ToString() + "' ");

                    if (lotCntrld == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        sbSql.Append(" AND LOT_NUMBER = '");
                        sbSql.Append("" + drSearch["ITEM_LOTNUMBER"].ToString() + "' ");
                    }
                    if (srlCntrld == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        sbSql.Append(" AND SERIAL_NUMBER = '");
                        sbSql.Append("" + drSearch["ITEM_SRNUMBER"].ToString() + "' ");
                    }
                    sbSql.Append(" AND COMPARTMENT = '");
                    sbSql.Append("" + drSearch["COMPARTMENT"].ToString() + "' ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of orderDetails updAted " + count); }


                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        public int GetCaseIdCount(string caseId, string procCode, string prefList, int status)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(CASE_ID) FROM MT_POU_CASE_CART_HEADER WHERE CASE_ID= ");
                    sbSql.Append(" '" + caseId + "' AND PROCEDURE_CODE ='" + procCode + "'AND PREF_LIST_ID = ");
                    sbSql.Append(" '" + prefList + "' AND STATUS != " + status + "");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Cases returned: " + count); }

                    return count;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long UpdateTransaction(DataRow detailRow)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" UPDATE MT_ATPAR_TRANSACTION SET STATUS =  ");
                    sbSql.Append(" " + detailRow["CHANGED_STATUS"] + ", UPDATE_DT_TIME = GETDATE() ");
                    sbSql.Append(" WHERE ID='" + detailRow["CASE_ID"] + "'  AND APP_ID= ");
                    sbSql.Append(" '" + (int)AtParWebEnums.EnumApps.PointOfUse + "'AND REPORT_DATA_4 = ");
                    sbSql.Append("'" + detailRow["PROCEDURE_CODE"] + "'AND REPORT_DATA_3= ");
                    sbSql.Append(" '" + detailRow["PREF_LIST_ID"] + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstCount = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCount); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }


        }

        public long Do_ReplaceCaseSP(DataRow[] drTrans, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = "";
           // string StatusCode = "N";
            long cnt = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    for (int i = 0; i <= drTrans.Length - 1; i++)
                    {
                        SqlParameter paramCaseId = new SqlParameter("@OR_CASE_ID", drTrans[i]["CASE_ID"]);
                        SqlParameter paramReplaceCase = new SqlParameter("@EMERGENCY_CASE", drTrans[i]["REPLACE_CASE"]);
                        SqlParameter paramUserId = new SqlParameter("@USER_ID", deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID]);
                        SqlParameter paramStatusCode = new SqlParameter("@STATUS_CODE", SqlDbType.Int);
                        paramStatusCode.Direction = System.Data.ParameterDirection.Output;

                        object[] parameters = { paramCaseId, paramReplaceCase, paramUserId, paramStatusCode };

                        sbSql = "EXEC ReplaceCase @OR_CASE_ID, @EMERGENCY_CASE, @USER_ID,@STATUS_CODE OUT";

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                        }


                        var result = objContext.Database.ExecuteSqlCommand(sbSql, parameters);
                        cnt = (int)paramStatusCode.Value;

                        if (cnt != 0)
                        {
                            return AtparStatusCodes.E_SERVERERROR;
                        }

                    }

                    return AtparStatusCodes.ATPAR_OK;
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
        public string GetStorageArea(string deptID, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string storageArea = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ISNULL(STORAGE_AREA,'') FROM MT_POU_DEPT WHERE DEPT_ID ='").Append(deptID).Append("'").Append("AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    storageArea = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Storage Area Returned: " + storageArea); }

                    return storageArea;
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

        #region GetDepartment
        public List<MT_POU_DEPT_USER_ALLOCATIONS> GetDepartmentID(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_POU_DEPT_USER_ALLOCATIONS> depts = new List<MT_POU_DEPT_USER_ALLOCATIONS>();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DEPARTMENT_ID FROM MT_POU_DEPT_USER_ALLOCATIONS WHERE USER_ID='" + userID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "DEPARTMENT_ID" };
                    depts = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_USER_ALLOCATIONS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + depts.Count); }

                    return depts;
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

        #endregion

        #region SaveReviewCaseItems
        public long SaveReviewCaseItems(List<MT_POU_CASE_CART_DETAILS> cartDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long StatusCode = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    foreach (var item in cartDetails)
                    {
                        sbSql.Clear();

                        item.ReplaceProperty(c => c.ITEM_DESCR);

                        if (item.IS_NEWITEM.ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                        {
                            StatusCode = InsertCartDetails(item, objContext);
                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                return StatusCode;
                            }

                        }
                        else
                        {
                            StatusCode = UpdateCartDetails(item, objContext);
                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                return StatusCode;
                            }
                        }
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;

            }
        }
        private long InsertCartDetails(MT_POU_CASE_CART_DETAILS item, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_POU_CASE_CART_DETAILS(CASE_ID, ITEM_ID, ITEM_DESCR, ");
                sbSql.Append("PICK_QTY, HOLD_QTY,PREF_LIST_ID,PROCEDURE_CODE,ITEM_SOURCE,CUST_ITEM_NO,");
                sbSql.Append("ITEM_STATUS,ACT_OPEN_QTY, ACT_HOLD_QTY) VALUES('" + item.CASE_ID + "', ");
                sbSql.Append("'" + item.ITEM_ID + "', '" + item.ITEM_DESCR + "', ");
                sbSql.Append("'" + item.PICK_QTY + "','" + item.HOLD_QTY + "','" + item.PREF_LIST_ID + "','" + item.PROCEDURE_CODE + "',");
                sbSql.Append(" " + (int)AtParWebEnums.CaseItem_Source.ATPAR + ",'" + item.CUST_ITEM_NO + "','" + item.ITEM_STATUS + "',0,0) ");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }


                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        private long UpdateCartDetails(MT_POU_CASE_CART_DETAILS item, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_POU_CASE_CART_DETAILS SET PICK_QTY = '" + item.PICK_QTY + "', ");
                sbSql.Append("HOLD_QTY='" + item.HOLD_QTY + "', ITEM_STATUS = '" + item.ITEM_STATUS + "' ");
                sbSql.Append("WHERE CASE_ID = '" + item.CASE_ID + "' AND PREF_LIST_ID ='" + item.PREF_LIST_ID + "'");
                sbSql.Append("AND PROCEDURE_CODE ='" + item.PROCEDURE_CODE + "'AND ITEM_ID ='" + item.ITEM_ID + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }


                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region GetCaseItems:splitting sp
        public Dictionary<string, object> GetCaseItems(string caseID, int previewType)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                List<VM_POU_CART_DETAILS> lstcartdetails = new List<VM_POU_CART_DETAILS>();
                List<VM_POU_CASE_CART_HEADER> lstCartheader = new List<VM_POU_CASE_CART_HEADER>();
                List<MT_POU_CHARGECAPTURE_DETAILS> lstCapture = new List<MT_POU_CHARGECAPTURE_DETAILS>();
                List<VM_POU_CASE_CART_HEADER> lstCartcaseheader = new List<VM_POU_CASE_CART_HEADER>();


                Dictionary<string, object> caseItems = new Dictionary<string, object>();

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    lstcartdetails = GetCaseCartDetails(caseID, previewType);
                    lstCartheader = GetCase(caseID, previewType);
                    lstCapture = GetCharge(caseID);
                    lstCartcaseheader = GetCaseCart(caseID);

                    caseItems.Add("CARTDETAILS", lstcartdetails);
                    caseItems.Add("CARTSHEADERS", lstCartheader);
                    caseItems.Add("CHARGECAPTURE", lstCapture);
                    caseItems.Add("CASECARTHEADER", lstCartcaseheader);

                    return caseItems;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        private List<VM_POU_CART_DETAILS> GetCaseCartDetails(string caseID, int previewType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    string erp = GetParameterValue();

                    sbSql.Append("SELECT DTLS.CASE_ID, DTLS.PREF_LIST_ID, DTLS.PROCEDURE_CODE, DTLS.ITEM_ID, DTLS.ITEM_DESCR, DTLS.PICK_QTY, DTLS.PICK_QTY AS OLD_PICK_QTY, ");
                    sbSql.Append("DTLS.HOLD_QTY, DTLS.HOLD_QTY AS OLD_HOLD_QTY,DTLS.QTY, 'N' AS IS_NEWITEM , DTLS.ITEM_ID AS Barcode ,' ' AS MANF_ITEM_ID, ");
                    sbSql.Append("(DTLS.PICK_QTY + DTLS.HOLD_QTY) AS TOTAL_QTY ,CASE  ");
                    sbSql.Append("WHEN ((DTLS.PICK_QTY + DTLS.HOLD_QTY)-(DTLS.QTY))< 0 THEN '0' ");
                    sbSql.Append("ELSE ((DTLS.PICK_QTY + DTLS.HOLD_QTY)-(DTLS.QTY)) ");
                    sbSql.Append("END AS SHORTAGE_QTY, CASE WHEN DTLS.CUST_ITEM_NO IS NULL THEN DTLS.ITEM_ID  ");
                    sbSql.Append("WHEN DTLS.CUST_ITEM_NO = '' THEN DTLS.ITEM_ID ");
                    sbSql.Append("ELSE DTLS.CUST_ITEM_NO ");
                    sbSql.Append("END AS ITEM, DTLS.CUST_ITEM_NO, DTLS.ITEM_STATUS, DTLS.STATUS AS CASE_STATUS ");
                    sbSql.Append("FROM MT_POU_CASE_CART_DETAILS DTLS JOIN MT_POU_CASE_CART_HEADER HDR ON HDR.CASE_ID = DTLS.CASE_ID AND HDR.PREF_LIST_ID = DTLS.PREF_LIST_ID AND HDR.PROCEDURE_CODE = DTLS.PROCEDURE_CODE ");
                    sbSql.Append("WHERE HDR.CASE_ID = '" + caseID + "' AND ");

                    if (previewType == 0)
                    {
                        sbSql.Append("HDR.STATUS IN (0,1,3,5,7,9,11,13,25) ");
                    }
                    else
                    {
                        sbSql.Append("HDR.STATUS IN (3,5) ");
                    }
                    sbSql.Append(" UNION SELECT CHDR.CASE_ID, CHDR.PREF_LIST_ID, CHDR.EXAM_ID , CDTLS.ITEM_ID , CDTLS.ITEM_DESCRIPTION, '0'AS PICK_QTY, '0'AS  OLD_PICK_QTY, ");
                    sbSql.Append("CDTLS.HOLD_QTY, CDTLS.HOLD_QTY AS OLD_HOLD_QTY,CDTLS.ITEM_COUNT , 'Y' AS IS_NEWITEM , CDTLS.ITEM_ID AS Barcode ,' ' AS MANF_ITEM_ID, ");
                    sbSql.Append("'0' AS TOTAL_QTY, ");
                    sbSql.Append("'0' AS SHORTAGE_QTY, ");
                    sbSql.Append("CASE WHEN CDTLS.CUST_ITEM_NO IS NULL THEN CDTLS.ITEM_ID ");
                    sbSql.Append("WHEN CDTLS.CUST_ITEM_NO = ''THEN CDTLS.ITEM_ID ");
                    sbSql.Append("ELSE CDTLS.CUST_ITEM_NO END AS ITEM ,CDTLS.CUST_ITEM_NO,'Y' AS ITEM_STATUS,'5' AS CASE_STATUS ");
                    sbSql.Append("FROM MT_POU_CHARGECAPTURE_DETAILS CDTLS JOIN MT_POU_CHARGECAPTURE_HEADER CHDR ON CHDR.TRANSACTION_ID =CDTLS.TRANSACTION_ID ");
                    sbSql.Append("WHERE (CHDR.CASE_ID ='" + caseID + "' AND CHDR.CHARGE_STATUS <> 17)  AND ");
                    //sbSql.Append("ELSE CDTLS.CUST_ITEM_NO END AS ITEM,CDTLS.CUST_ITEM_NO,''Y'' AS ITEM_STATUS,''5'' AS CASE_STATUS FROM MT_POU_CHARGECAPTURE_DETAILS CDTLS  ");
                    //sbSql.Append("JOIN MT_POU_CHARGECAPTURE_HEADER CHDR ON CHDR.TRANSACTION_ID =CDTLS.TRANSACTION_ID WHERE (CHDR.CASE_ID =''' + @CaseID + ''' AND CHDR.CHARGE_STATUS <> 17)  AND '");

                    if (erp == "PMM")
                    {
                        sbSql.Append("CDTLS.CUST_ITEM_NO NOT IN (SELECT  DTLS.CUST_ITEM_NO ");
                    }
                    else
                    {
                        sbSql.Append("CDTLS.ITEM_ID NOT IN (SELECT  DTLS.ITEM_ID  ");
                    }

                    sbSql.Append("FROM  MT_POU_CASE_CART_DETAILS DTLS JOIN MT_POU_CASE_CART_HEADER HDR  ON HDR.CASE_ID = DTLS.CASE_ID AND ");
                    sbSql.Append("HDR.PREF_LIST_ID = DTLS.PREF_LIST_ID AND HDR.PROCEDURE_CODE = DTLS.PROCEDURE_CODE WHERE HDR.STATUS IN (0,1,3,5,7,9,11,13,25)  AND  HDR.CASE_ID = '" + caseID + "' ) ");
                    sbSql.Append("ORDER BY DTLS.ITEM_ID,DTLS.PROCEDURE_CODE,DTLS.PREF_LIST_ID ASC ");


                    var fields = new[] { "CASE_ID", "PREF_LIST_ID", "PROCEDURE_CODE", "ITEM_ID", "ITEM_DESCR", "PICK_QTY", "OLD_PICK_QTY", "HOLD_QTY", "QTY", "IS_NEWITEM", "Barcode", "MANF_ITEM_ID", "TOTAL_QTY", "SHORTAGE_QTY", "ITEM", "CUST_ITEM_NO", "ITEM_STATUS", "CASE_STATUS" };

                    var lstCases = objContext.Database.DifferedExecuteQuery<VM_POU_CART_DETAILS>(fields, sbSql.ToString()).ToList();


                    // var lstCases = objContext.Database.SqlQuery<VM_POU_CART_DETAILS>(sbSql.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCases.Count); }

                    return lstCases;
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
        private string GetParameterValue()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PARAMETER_VALUE FROM MT_ATPAR_CONFIGURATION_SECTION_DTLS WHERE ");
                    sbSql.Append("PARAMETER_ID = 'ENTERPRISESYSTEM'  ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var strRetVal = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + strRetVal.ToString()); }

                    return strRetVal;
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
        private List<VM_POU_CASE_CART_HEADER> GetCase(string caseID, int previewType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT DISTINCT CASE WHEN ((PHY.FIRST_NAME IS NULL OR PHY.FIRST_NAME = '')  ");
                    sbSql.Append("AND (PHY.MIDDLE_INITIAL IS NULL OR PHY.MIDDLE_INITIAL = '') ");
                    sbSql.Append("AND (PHY.LAST_NAME IS NULL OR PHY.LAST_NAME = '')) THEN HDR.PHYSICIAN ");
                    sbSql.Append("ELSE PHY.PHYSICIAN_ID + ' - ' + ISNULL(PHY.FIRST_NAME,'')+ ' ' + ISNULL(PHY.MIDDLE_INITIAL,'') +' ' + ISNULL(PHY.LAST_NAME,'') END PHYSICIAN_DESCR,");
                    sbSql.Append("CASE WHEN (PROCE.DESCRIPTION IS NULL OR PROCE.DESCRIPTION = '') THEN HDR.PROCEDURE_CODE ");
                    sbSql.Append("ELSE PROCE.PROCEDURE_CODE + ' - ' + ISNULL(PROCE.DESCRIPTION,'') END PROC_DESCR, ");
                    sbSql.Append("CASE WHEN (PREF.PREF_LIST_DESCR IS NULL OR PREF.PREF_LIST_DESCR = '')  THEN HDR.PREF_LIST_ID ");
                    sbSql.Append("ELSE PREF.PREF_LIST_ID + ' - '+ ISNULL(PREF.PREF_LIST_DESCR,'') END PREF_DESCR ");
                    sbSql.Append("FROM MT_POU_CASE_CART_HEADER HDR LEFT OUTER JOIN ");
                    sbSql.Append("MT_POU_PREF_LIST_HEADER PREF ON HDR.PREF_LIST_ID = PREF.PREF_LIST_ID AND HDR.PROCEDURE_CODE = PREF.PROCEDURE_ID ");
                    sbSql.Append("LEFT OUTER JOIN MT_POU_PHYSICIAN PHY ON HDR.PHYSICIAN = PHY.PHYSICIAN_ID LEFT OUTER JOIN MT_POU_PROCEDURE_CODE PROCE ON HDR.PROCEDURE_CODE = PROCE.PROCEDURE_CODE ");
                    sbSql.Append("WHERE HDR.CASE_ID ='" + caseID + "' AND ");


                    if (previewType == 0)
                    {
                        sbSql.Append("HDR.STATUS IN (0,1,3,5,7,9,11,13,25) ");
                    }
                    else
                    {
                        sbSql.Append("HDR.STATUS IN (3,5)  ");
                    }


                    var fields = new[] { "PHYSICIAN_DESCR", "PROC_DESCR", "PREF_DESCR" };

                    var lstCases = objContext.Database.DifferedExecuteQuery<VM_POU_CASE_CART_HEADER>(fields, sbSql.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCases.Count); }

                    return lstCases;
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
        private List<MT_POU_CHARGECAPTURE_DETAILS> GetCharge(string caseID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT DTLS.MFG_ITEM_ID,DTLS.ITEM_ID,DTLS.CUST_ITEM_NO  FROM MT_POU_CHARGECAPTURE_HEADER  HDR, ");
                    sbSql.Append("MT_POU_CHARGECAPTURE_DETAILS DTLS WHERE HDR.TRANSACTION_ID=DTLS.TRANSACTION_ID ");
                    sbSql.Append("AND HDR.CASE_ID= '" + caseID + "' AND HDR.CHARGE_STATUS <> 17 ");

                    var fields = new[] { "MFG_ITEM_ID", "ITEM_ID", "CUST_ITEM_NO" };

                    var lstCases = objContext.Database.DifferedExecuteQuery<MT_POU_CHARGECAPTURE_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCases.Count); }

                    return lstCases;
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
        private List<VM_POU_CASE_CART_HEADER> GetCaseCart(string caseID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT CASE_ID, ISNULL(PREF_LIST_ID,'') AS PREF_LIST_ID, ISNULL(PROCEDURE_CODE,'') AS PROCEDURE_CODE, [STATUS] ");
                    sbSql.Append("FROM MT_POU_CASE_CART_HEADER WHERE CASE_ID = '" + caseID + "' AND STATUS <> 17  ");

                    var fields = new[] { "CASE_ID", "PREF_LIST_ID", "PROCEDURE_CODE", "STATUS" };

                    var lstCases = objContext.Database.DifferedExecuteQuery<VM_POU_CASE_CART_HEADER>(fields, sbSql.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCases.Count); }

                    return lstCases;
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

        #endregion

        #region ReplacePrefCard
        public long ReplacePrefCard(List<VM_MT_POU_CASE_INFO> lstCaseInfo)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("UPDATE MT_ATPAR_TRANSACTION SET STATUS = " + (int)AtParWebEnums.CASE_PICK_STATUS.PREF_REPLACED + ", ");
                    sbSql.Append("UPDATE_DT_TIME = GETDATE() WHERE ID='" + lstCaseInfo[0].CASE_ID + "' AND APP_ID='" + (int)AtParWebEnums.EnumApps.PointOfUse + "' ");
                    sbSql.Append(" AND REPORT_DATA_4 ='" + lstCaseInfo[0].PROCEDURE_CODE + "' AND REPORT_DATA_3='" + lstCaseInfo[0].PREF_LIST_ID + "'");


                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    return AtparStatusCodes.ATPAR_OK;
                }



            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }


        }

        #endregion
    }
}

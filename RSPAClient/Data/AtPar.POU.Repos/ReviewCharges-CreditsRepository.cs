using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Repos
{
    public class ReviewCharges_CreditsRepository : IReviewCharges_CreditsRepository
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor
        public ReviewCharges_CreditsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ReviewCharges_CreditsRepository));
        }

        #endregion

        #region GetCredits
        public Dictionary<string, object> GetCredits(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments,
                               bool reviewed)

        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            Dictionary<string, object> dicOutput = new Dictionary<string, object>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlParms = new SqlParameter[9];
                    string _strSQL = string.Empty;

                    sqlParms[0] = new SqlParameter("@StartDate", SqlDbType.NVarChar);
                    sqlParms[0].Value = fromDate;

                    sqlParms[1] = new SqlParameter("@EndDate", SqlDbType.NVarChar);
                    sqlParms[1].Value = toDate;

                    sqlParms[2] = new SqlParameter("@PatientID", SqlDbType.NVarChar);
                    sqlParms[2].Value = patientID;

                    sqlParms[3] = new SqlParameter("@ExamID", SqlDbType.NVarChar);
                    sqlParms[3].Value = examID;

                    sqlParms[4] = new SqlParameter("@AccountID", SqlDbType.NVarChar);
                    sqlParms[4].Value = accountID;

                    sqlParms[5] = new SqlParameter("@DeptID", SqlDbType.NVarChar);
                    sqlParms[5].Value = deptID;

                    sqlParms[6] = new SqlParameter("@Comments", SqlDbType.NVarChar);
                    sqlParms[6].Value = comments;

                    sqlParms[7] = new SqlParameter("@Reviewed", SqlDbType.Bit);
                    sqlParms[7].Value = reviewed;

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    sbSql.Append("SELECT DISTINCT B.[TRANSACTION_ID],(CASE WHEN [PATIENT_NAME] IS NULL THEN [PATIENT_ID]");
                    sbSql.Append("ELSE  [PATIENT_ID] + ' / ' + REPLACE(PATIENT_NAME, '^', ' ')  END) AS [PATIENT_NAME], PATIENT_ID, CONVERT(VARCHAR,CAPTURE_DATE_TIME,101) AS [CAPTURE_DATE_TIME],");
                    sbSql.Append("(SELECT FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + ' (' + USER_ID + ')' AS FULLNAME FROM [MT_ATPAR_USER] WHERE USER_ID = B.[USER_ID]) AS [USER_ID],");
                    sbSql.Append("[ACCOUNT_ID], [EXAM_ID], [COMMENTS], [REVIEWED], B.[DEPARTMENT_ID]");
                    sbSql.Append("FROM [MT_POU_CHARGECAPTURE_DETAILS] A, [MT_POU_CHARGECAPTURE_HEADER] B LEFT OUTER JOIN [MT_ATPAR_PATIENT_CACHE] ON");
                    sbSql.Append("[PATIENT_MRC] = [PATIENT_ID] WHERE [CAPTURE_DATE_TIME] >= '" + sqlParms[0].Value + "'  AND [CAPTURE_DATE_TIME] < '" + sqlParms[1].Value + "'");
                    sbSql.Append(" AND [ACCOUNT_ID] LIKE '" + sqlParms[4].Value + "'  + '%'");
                    sbSql.Append(" AND [EXAM_ID] LIKE '" + sqlParms[3].Value + "'  + '%'");
                    sbSql.Append(" AND [PATIENT_ID] LIKE '" + sqlParms[2].Value + "'  + '%'");
                    sbSql.Append(" AND B.[DEPARTMENT_ID] LIKE '" + sqlParms[5].Value + "' + '%'");
                    sbSql.Append(" AND ISNULL([COMMENTS],'') LIKE '%' + '" + sqlParms[6].Value + "' + '%'");
                    sbSql.Append(" AND [CHARGE_STATUS] = 6");
                    sbSql.Append(" AND B.TRANSACTION_ID = A.TRANSACTION_ID");
                    sbSql.Append(" AND B.ACCOUNT_ID = PATIENT_ACCNUMBER");
                    sbSql.Append(" AND A.BILL_STATUS = 'Y'");

                    var fields = new[] { "TRANSACTION_ID", "PATIENT_ID", "PATIENT_NAME", "CAPTURE_DATE_TIME", "USER_ID", "ACCOUNT_ID", "EXAM_ID", "COMMENTS", "REVIEWED", "DEPARTMENT_ID" };

                    var lstheaders = objContext.Database.SqlQuery<VM_POU_CREDIT_HEADER>(sbSql.ToString(), fields).ToList();
                    sbSql.Clear();
                    sbSql.Append("SELECT  A.[TRANSACTION_ID], A.[ITEM_ID], A.[ITEM_DESCRIPTION], A.[ITEM_LOTNUMBER], A.[ITEM_SRNUMBER], A.[ITEM_COUNT], A.[CHARGE_CODE], A.[LINE_NO], A.[ISSUE_PRICE] AS ITEM_PRICE, A.[BILLED_QTY],");
                    sbSql.Append("((A.ITEM_COUNT + (SELECT  ISNULL(SUM(RETURN_QTY), 0) FROM MT_POU_CHARGECAPTURE_RETURNS C WHERE C.TRANSACTION_ID = A.TRANSACTION_ID AND C.LINE_NO = A.LINE_NO)) -A.BILLED_QTY)  AS CREDIT_QTY");
                    sbSql.Append(" FROM[MT_POU_CHARGECAPTURE_DETAILS] A WHERE  A.[TRANSACTION_ID] IN(SELECT B.[TRANSACTION_ID] FROM[MT_POU_CHARGECAPTURE_HEADER] B WHERE A.BILL_STATUS = 'Y' AND B.[CAPTURE_DATE_TIME] >= '" + sqlParms[0].Value + "'");
                    sbSql.Append(" AND B.[CAPTURE_DATE_TIME] < '" + sqlParms[1].Value + "' AND B.[EXAM_ID] LIKE '" + sqlParms[3].Value + "' + '%' AND B.[ACCOUNT_ID] LIKE '" + sqlParms[4].Value + "' + '%'  ");
                    sbSql.Append("AND B.[PATIENT_ID] LIKE '" + sqlParms[2].Value + "' + '%' AND B.[DEPARTMENT_ID] LIKE '" + sqlParms[5].Value + "' + '%'");
                    sbSql.Append(" AND ISNULL([COMMENTS], '') LIKE '%' + '" + sqlParms[6].Value + "' + '%' AND[CHARGE_STATUS] = 6 )");

                    var fields1 = new[] { "TRANSACTION_ID", "ITEM_ID", "ITEM_DESCRIPTION", "ITEM_LOTNUMBER", "ITEM_SRNUMBER", "ITEM_COUNT", "CHARGE_CODE", "LINE_NO", "ITEM_PRICE", "BILLED_QTY", "CREDIT_QTY" };

                    var lstCredits = objContext.Database.SqlQuery<VM_POU_CREDIT_DETAILS>(sbSql.ToString(), fields1).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstheaders.Count); }
                    dicOutput.Add(AtParWebEnums.DataSet_Type.HEADERS.ToString(), lstheaders);
                    dicOutput.Add(AtParWebEnums.DataSet_Type.DETAILS.ToString(), lstCredits);

                    return dicOutput;

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

        #region GetCharges
        public Dictionary<string, object> GetCharges(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments, int status,
                               int appID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSqlHeader = new StringBuilder();
            StringBuilder sbSqlDetail = new StringBuilder();
            Tuple<List<VM_POU_CREDIT_HEADER>, List<VM_POU_CREDIT_DETAILS>> tupleOutput = null;
            Dictionary<string, object> dicOutput = new Dictionary<string, object>();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlParms = new SqlParameter[9];
                    string _strSQL = string.Empty;

                    sqlParms[0] = new SqlParameter("@StartDate", SqlDbType.NVarChar);
                    sqlParms[0].Value = fromDate;

                    sqlParms[1] = new SqlParameter("@EndDate", SqlDbType.NVarChar);
                    sqlParms[1].Value = toDate;

                    sqlParms[2] = new SqlParameter("@PatientID", SqlDbType.NVarChar);
                    sqlParms[2].Value = patientID;

                    sqlParms[3] = new SqlParameter("@ExamID", SqlDbType.NVarChar);
                    sqlParms[3].Value = examID;

                    sqlParms[4] = new SqlParameter("@AccountID", SqlDbType.NVarChar);
                    sqlParms[4].Value = accountID;

                    sqlParms[5] = new SqlParameter("@DeptID", SqlDbType.NVarChar);
                    sqlParms[5].Value = deptID;

                    sqlParms[6] = new SqlParameter("@Comments", SqlDbType.NVarChar);
                    sqlParms[6].Value = comments;

                    sqlParms[7] = new SqlParameter("@Status", SqlDbType.TinyInt);
                    sqlParms[7].Value = status;

                    sqlParms[8] = new SqlParameter("@AppID", SqlDbType.Int);
                    sqlParms[8].Value = appID;



                    sbSqlHeader.Append("SELECT DISTINCT(B.[TRANSACTION_ID]), ");
                    sbSqlHeader.Append(" (CASE WHEN [PATIENT_NAME] IS NULL THEN [PATIENT_ID] ");
                    sbSqlHeader.Append(" ELSE  [PATIENT_ID] + ' / ' + REPLACE(PATIENT_NAME, '^', '')  END) AS [PATIENT_NAME], PATIENT_ID, CONVERT(VARCHAR,CAPTURE_DATE_TIME,101) AS [CAPTURE_DATE_TIME], ");
                    sbSqlHeader.Append(" (SELECT FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + ' (' + USER_ID + ')' AS FULLNAME FROM [MT_ATPAR_USER] WHERE USER_ID = B.[USER_ID]) AS [USER_ID], ");
                    sbSqlHeader.Append(" [ACCOUNT_ID], [EXAM_ID], [COMMENTS], [REVIEWED], B.[DEPARTMENT_ID] ");
                    sbSqlHeader.Append(" FROM [MT_POU_CHARGECAPTURE_DETAILS] A,[MT_POU_CHARGECAPTURE_HEADER] B LEFT OUTER JOIN [MT_ATPAR_PATIENT_CACHE] ON ");
                    sbSqlHeader.Append(" [PATIENT_MRC] = [PATIENT_ID] ");
                    sbSqlHeader.Append(" WHERE [CAPTURE_DATE_TIME] >= CONVERT(DATETIME, '" + sqlParms[0].Value + "', 101) AND [CAPTURE_DATE_TIME] < CONVERT(DATETIME, '" + sqlParms[1].Value + "', 101)");
                    sbSqlHeader.Append(" AND [ACCOUNT_ID] LIKE '" + sqlParms[4].Value + "' + '%'");
                    sbSqlHeader.Append(" AND [EXAM_ID] LIKE '" + sqlParms[3].Value + "' +'%'");
                    sbSqlHeader.Append(" AND [PATIENT_ID] LIKE '" + sqlParms[2].Value + "' + '%'");
                    sbSqlHeader.Append(" AND B.[DEPARTMENT_ID] LIKE '" + sqlParms[5].Value + "' +'%' ");
                    sbSqlHeader.Append(" AND ISNULL([COMMENTS],'') LIKE '%' + '" + sqlParms[6].Value + "' + '%' AND B.[APP_ID] = CAST('" + sqlParms[8].Value + "' AS NVARCHAR)");

                    sbSqlDetail.Append(" SELECT  A.[TRANSACTION_ID], A.[ITEM_ID], A.[ITEM_DESCRIPTION], A.[ITEM_LOTNUMBER], ");
                    sbSqlDetail.Append("A.[ITEM_SRNUMBER], A.ITEM_COUNT AS ITEM_COUNT, ");
                    sbSqlDetail.Append("A.[CHARGE_CODE], A.[LINE_NO],A.[ITEM_PRICE]  FROM [MT_POU_CHARGECAPTURE_DETAILS] A ");
                    sbSqlDetail.Append("LEFT OUTER JOIN MT_POU_CHARGECAPTURE_RETURNS R ON (A.TRANSACTION_ID = R.TRANSACTION_ID) AND A.LINE_NO = R.LINE_NO ");
                    sbSqlDetail.Append("WHERE A.[TRANSACTION_ID] IN ");
                    sbSqlDetail.Append("(SELECT B.[TRANSACTION_ID] FROM [MT_POU_CHARGECAPTURE_HEADER] B ");
                    sbSqlDetail.Append("WHERE B.[CAPTURE_DATE_TIME] >=  CONVERT(DATETIME, '" + sqlParms[0].Value + "', 101) ");
                    sbSqlDetail.Append("AND B.[CAPTURE_DATE_TIME] <  CONVERT(DATETIME, '" + sqlParms[1].Value + "', 101) ");
                    sbSqlDetail.Append("AND B.[EXAM_ID] LIKE '" + sqlParms[3].Value + "'  + '%' ");
                    sbSqlDetail.Append("AND B.[ACCOUNT_ID] LIKE '" + sqlParms[4].Value + "' + '%' ");
                    sbSqlDetail.Append("AND B.[PATIENT_ID] LIKE '" + sqlParms[2].Value + "' + '%' ");
                    sbSqlDetail.Append("AND B.[DEPARTMENT_ID] LIKE '" + sqlParms[5].Value + "' +'%' ");
                    sbSqlDetail.Append("AND ISNULL([COMMENTS],' ') LIKE '%' + '" + sqlParms[6].Value + "' + '%' ");
                    sbSqlDetail.Append("AND [CHARGE_STATUS]='6' AND B.[APP_ID] =  CAST('" + sqlParms[8].Value + "' AS NVARCHAR) ) ");

                    if (status == 0)
                    {
                        sbSqlHeader.Append("AND [REVIEWED] = '0' ");
                        sbSqlHeader.Append("AND [CHARGE_STATUS]='6' ");
                        sbSqlHeader.Append("AND B.[TRANSACTION_ID] = A.[TRANSACTION_ID] ");
                        sbSqlHeader.Append("AND B.ACCOUNT_ID = PATIENT_ACCNUMBER ");
                        sbSqlHeader.Append("AND A.BILL_STATUS IS NULL ");

                        sbSqlDetail.Append("AND A.BILL_STATUS IS NULL");

                    }
                    else if (status == 1)
                    {
                        sbSqlHeader.Append("AND [REVIEWED] = '1' ");
                        sbSqlHeader.Append("AND [CHARGE_STATUS]='6' ");
                        sbSqlHeader.Append(" AND B.[TRANSACTION_ID] = A.[TRANSACTION_ID] ");
                        sbSqlHeader.Append("AND B.ACCOUNT_ID = PATIENT_ACCNUMBER ");
                        sbSqlHeader.Append("AND A.BILL_STATUS IS NULL ");

                        sbSqlDetail.Append(" AND A.BILL_STATUS IS NULL ");
                    }
                    else if (status == 2)
                    {
                        sbSqlHeader.Append(" AND [CHARGE_STATUS]='6' ");
                        sbSqlHeader.Append("AND B.[TRANSACTION_ID] = A.[TRANSACTION_ID] ");
                        sbSqlHeader.Append("AND B.ACCOUNT_ID = PATIENT_ACCNUMBER ");
                        sbSqlHeader.Append("AND A.BILL_STATUS = 'N' ");

                        sbSqlDetail.Append(" AND A.BILL_STATUS = 'N' ");
                    }
                    sbSqlDetail.Append(" GROUP BY A.[TRANSACTION_ID], A.[ITEM_ID], A.[ITEM_DESCRIPTION], A.[ITEM_LOTNUMBER],");
                    sbSqlDetail.Append("A.[ITEM_SRNUMBER], A.[CHARGE_CODE], A.[LINE_NO],A.[ITEM_PRICE],A.[ITEM_COUNT]");

                    var fields = new[] { "TRANSACTION_ID", "PATIENT_ID", "PATIENT_NAME", "CAPTURE_DATE_TIME", "USER_ID", "ACCOUNT_ID", "EXAM_ID", "COMMENTS", "REVIEWED", "DEPARTMENT_ID" };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSqlHeader.ToString() + ":")); }
                    }

                    var lstheaders = objContext.Database.SqlQuery<VM_POU_CREDIT_HEADER>(sbSqlHeader.ToString(), fields).ToList();
                    sbSqlHeader.Clear();

                    var fields1 = new[] { "TRANSACTION_ID", "ITEM_ID", "ITEM_DESCRIPTION", "ITEM_LOTNUMBER", "ITEM_SRNUMBER", "ITEM_COUNT", "CHARGE_CODE", "LINE_NO", "ITEM_PRICE", "BILLED_QTY", "CREDIT_QTY" };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSqlDetail.ToString() + ":")); }
                    }

                    var lstDetails = objContext.Database.SqlQuery<VM_POU_HEADER>(sbSqlDetail.ToString(), fields1).ToList();

                    sbSqlDetail.Clear();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstheaders.Count); }
                    dicOutput.Add(AtParWebEnums.DataSet_Type.HEADERS.ToString(), lstheaders);
                    dicOutput.Add(AtParWebEnums.DataSet_Type.DETAILS.ToString(), lstDetails);

                    return dicOutput;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSqlHeader.ToString() + " " + sbSqlDetail.ToString()); }
                throw ex;
            }
            finally
            {
                sbSqlHeader = null;
                sbSqlDetail = null;
            }
        }

        #endregion

        #region SetReviewed
        public long SetReviewed(int reviewChecked, string transID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_POU_CHARGECAPTURE_HEADER SET REVIEWED = ( " + reviewChecked + ") ");
                    sbSql.Append("WHERE TRANSACTION_ID IN ( " + transID + ") ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

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

        #region InsertPouChargeCaptureDetails
        public long InsertPouChargeCaptureDetails(string transactionID, string itemID, string itemDescription,
                                                  string itemLotNumber, string itemSerialnumber, string itemChargeCode,
                                                  string itemPrice, string lineNo, decimal pQty)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("Insert into MT_POU_CHARGECAPTURE_DETAILS (ITEM_ID, TRANSACTION_ID, ITEM_DESCRIPTION, ITEM_LOTNUMBER,");
                    sbSql.Append("ITEM_SRNUMBER, CHARGE_CODE, ITEM_PRICE, LINE_NO, ITEM_COUNT) Values ");
                    sbSql.Append("('" + itemID + "', '" + transactionID + "', '" + itemDescription + "', ");
                    sbSql.Append("'" + itemLotNumber + "','" + itemSerialnumber + "','" + itemChargeCode + "','" + itemPrice + "','" + lineNo + "','" + Convert.ToDouble(pQty) + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

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

        #region UpdateCreditInfo
        public long UpdateCreditHeader(long transID, VM_POU_CREDIT_HEADER objCreateHeader)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            sbSql.Append("UPDATE MT_POU_CHARGECAPTURE_HEADER SET PATIENT_ID = '" + objCreateHeader.PATIENT_ID.substituteString() + "', ");
                            sbSql.Append("ACCOUNT_ID ='" + objCreateHeader.ACCOUNT_ID.substituteString() + "', ");
                            sbSql.Append("EXAM_ID='" + objCreateHeader.EXAM_ID.substituteString() + "', ");
                            sbSql.Append("COMMENTS='" + objCreateHeader.COMMENTS.substituteString() + "', ");
                            sbSql.Append("CAPTURE_DATE_TIME='" + objCreateHeader.DATE_OF_SERVICE + "' ");
                            sbSql.Append("WHERE TRANSACTION_ID = '" + transID + "' ");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }
                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            trans.Commit();

                            return AtparStatusCodes.ATPAR_OK;


                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }

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

        public long UpdateCreditDetails(long transID, List<VM_POU_CREDIT_DETAILS> lstCreateDeatils)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            foreach (var objCreateDeatils in lstCreateDeatils)
                            {
                                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                                sbSql.Append("UPDATE MT_POU_CHARGECAPTURE_DETAILS SET ");
                                sbSql.Append("CHARGE_CODE = '" + objCreateDeatils.CHARGE_CODE + "', ");
                                sbSql.Append("ITEM_PRICE = '" + objCreateDeatils.ITEM_PRICE + "' ");
                                sbSql.Append("WHERE TRANSACTION_ID = '" + transID + "' ");
                                sbSql.Append("AND ITEM_ID = '" + objCreateDeatils.ITEM_ID + "' AND LINE_NO = '" + objCreateDeatils.LINE_NO + "' ");

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                                }
                                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                            }

                            trans.Commit();

                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }

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
        public long UpdateChargeCaptureDetails(string transType, List<VM_POU_CREDIT_DETAILS> lstCreateDeatils, bool isCreditsChanged)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            VM_POU_CREDIT_DETAILS objCredit = new VM_POU_CREDIT_DETAILS();
            objCredit = lstCreateDeatils.Where(x => x.SENT_STATUS == 'N').FirstOrDefault();
            var count = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    foreach (var item in lstCreateDeatils)
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        sbSql.Append("UPDATE MT_POU_CHARGECAPTURE_DETAILS SET ");

                        if ((transType == "CR") && (!isCreditsChanged))
                        {
                            sbSql.Append("BILLED_QTY = 0 ");
                        }
                        else if ((transType == "CR") && (isCreditsChanged))
                        {
                            sbSql.Append("BILLED_QTY = (BILLED_QTY - '" + item.BILL_QTY + "') ");
                        }
                        else
                        {
                            sbSql.Append("BILLED_QTY = '" + item.BILL_QTY + "' ");
                        }
                        if (transType == "CH")
                        {
                            sbSql.Append(", BILL_STATUS = '" + item.SENT_STATUS + "' ");
                        }
                        sbSql.Append("WHERE ITEM_ID = '" + item.ITEM_ID + "' ");
                        sbSql.Append("AND TRANSACTION_ID = '" + item.TRANSACTION_ID + "' ");
                        sbSql.Append("AND LINE_NO = " + item.LINE_NO);

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                        count++;
                    }
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }
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

        #region GetCreditsInfo
        public List<VM_POU_CREDIT_INFO> GetCreditsInfo(long transID, string transType, string chargecodeFilter)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            // List<MT_CRCT_USER_ALLOCATION> lstOrphanCarts = new List<MT_CRCT_USER_ALLOCATION>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.TRANSACTION_ID, A.PATIENT_ID, A.CAPTURE_DATE_TIME, A.DEPARTMENT_ID, ");
                    sbSql.Append("A.PHYSICIAN_ID, A.EXAM_ID AS PROCEDURE_CODE, B.ITEM_ID, ");
                    if (transType == "CR")
                    {
                        sbSql.Append("B.BILLED_QTY AS ITEM_COUNT, ");
                    }
                    else
                    {
                        sbSql.Append("B.ITEM_COUNT, ");
                    }

                    sbSql.Append("B.ITEM_PRICE, B.ITEM_COUNT * B.ITEM_PRICE AS AMOUNT, ");
                    sbSql.Append("C.PATIENT_NAME, C.PATIENT_SEX, C.PATIENT_ACCNUMBER, ");
                    sbSql.Append("'" + transType + "' AS TRANSACTION_TYPE, ");
                    sbSql.Append("B.CHARGE_CODE AS TRANSACTION_CODE, C.PATIENT_CLASS AS PATIENT_TYPE, ");
                    sbSql.Append("B.ITEM_DESCRIPTION, B.LINE_NO, C.PATIENT_VISIT_NUMBER ");
                    sbSql.Append("FROM MT_POU_CHARGECAPTURE_HEADER A, MT_POU_CHARGECAPTURE_DETAILS B, ");
                    sbSql.Append("MT_ATPAR_PATIENT_CACHE C ");
                    sbSql.Append("WHERE A.TRANSACTION_ID = B.TRANSACTION_ID ");
                    sbSql.Append("AND A.PATIENT_ID = C.PATIENT_MRC ");
                    sbSql.Append("AND A.ACCOUNT_ID = C.PATIENT_ACCNUMBER ");
                    sbSql.Append("AND A.TRANSACTION_ID = '" + transID + "' ");
                    sbSql.Append("AND A.CHARGE_STATUS = '6' ");
                    // Only issue
                    sbSql.Append("AND (B.CHARGE_CODE IS NOT NULL AND B.CHARGE_CODE <> '') ");
                    if (chargecodeFilter.Length > 0)
                    {
                        sbSql.Append("AND B.CHARGE_CODE NOT IN(" + chargecodeFilter + ") ");
                    }

                    if (transType == "CR")
                    {
                        sbSql.Append("AND B.BILL_STATUS = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "' ");
                    }

                    sbSql.Append("ORDER BY A.TRANSACTION_ID, B.LINE_NO ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    // var fields = new[] { "USER_ID","BUSINESS_UNIT", "CART_ID", "SHADOW_FLAG", "COUNT_BEFORE","DESCR", "USERNAME" };

                    var lstOrphanCarts = objContext.Database.SqlQuery<VM_POU_CREDIT_INFO>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstOrphanCarts); }

                    return lstOrphanCarts;
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

        #region InsertCreditValues

        public long InsertCreditValues(long transID, long newTransID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            SqlParameter sql_param_transID = new SqlParameter("@TransID", SqlDbType.NVarChar);
                            sql_param_transID.Value = transID;

                            SqlParameter sql_param_new_transID = new SqlParameter("@NewTransID", SqlDbType.NVarChar);
                            sql_param_new_transID.Value = newTransID;


                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand("exec InsertCreditValues @TransID,@NewTransID", sql_param_transID, sql_param_new_transID);

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of orderHeaders inserted " + count); }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;

                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }
                }
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

        #region DeletePatientInfo

        public long DeletePatientInfo(long transID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            SqlParameter sql_param_new_transID = new SqlParameter("@NewTransID", SqlDbType.NVarChar);
                            sql_param_new_transID.Value = transID;


                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand("exec DeletePatientInfo @NewTransID", sql_param_new_transID);

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of orderHeaders inserted " + count); }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;

                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }
                }
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

        #region UpdateCharges
        public long UpdateChargesHeader(List<VM_POU_CREDIT_HEADER> lstCreateHeaders)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (lstCreateHeaders.Count > 0)
                    {
                        VM_POU_CREDIT_HEADER objCreateHeader = lstCreateHeaders[0];
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        sbSql.Append("UPDATE MT_POU_CHARGECAPTURE_HEADER SET PATIENT_ID = '" + objCreateHeader.PATIENT_ID.substituteString() + "', ");
                        sbSql.Append("ACCOUNT_ID ='" + objCreateHeader.ACCOUNT_ID.substituteString() + "', ");
                        sbSql.Append("EXAM_ID='" + objCreateHeader.EXAM_ID.substituteString() + "', ");
                        sbSql.Append("COMMENTS='" + objCreateHeader.COMMENTS.substituteString() + "', ");
                        sbSql.Append("CAPTURE_DATE_TIME='" + objCreateHeader.DATE_TIME + "' ");
                        sbSql.Append("WHERE TRANSACTION_ID = '" + objCreateHeader.TRANSACTION_ID + "' ");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                        }
                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    }
                }
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

        public long UpdateChargesDetails(long transID, List<VM_POU_CREDIT_DETAILS> lstCreateDeatils)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    foreach (var objCreateDeatils in lstCreateDeatils)
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                        sbSql.Append("UPDATE MT_POU_CHARGECAPTURE_DETAILS SET ITEM_COUNT = '" + objCreateDeatils.ITEM_COUNT + "' , ");
                        sbSql.Append("CHARGE_CODE = '" + objCreateDeatils.CHARGE_CODE.substituteString() + "', ");
                        sbSql.Append("ITEM_PRICE = '" + objCreateDeatils.ITEM_PRICE + "' ");
                        sbSql.Append("WHERE TRANSACTION_ID = '" + transID + "' ");
                        sbSql.Append("AND ITEM_ID = '" + objCreateDeatils.ITEM_ID + "' AND LINE_NO = '" + objCreateDeatils.LINE_NO + "' ");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                        }
                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    }
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
    }
}

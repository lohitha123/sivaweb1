using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.StockIssue;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace AtPar.StockIssue.Repos
{
    public class IssueReportRepository : IIssueReportRepository
    {
        private ILog _log;
        public IssueReportRepository(ILog log)
        {
            _log = log;
        }

        public Tuple<DataSet, long> GetIssueReport(string bUnit, string userID,
            string deptID, string patientID, string issueToUser,
            string itemID, string itemDesc, string price, DateTime fromDt,
            DateTime toDt, string status, string serverUserID,
            string issueToLocation, DataSet dsUserList, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long tempGetIssueReport = 0;
            DataSet pDs = new DataSet();


            string strUserID = string.Empty;
            if (deptID == null) deptID = "";
            if (patientID == null) patientID = "";
            if (itemID == null) itemID = "";
            if (issueToUser == null) issueToUser = "";
            if (issueToLocation == null) issueToLocation = "";
            if (itemDesc == null) itemDesc = "";
            

            if (deptID.ToString().Contains("'"))
            {
                deptID = deptID.substituteString();
            }
            if (patientID.ToString().Contains("'"))
            {
                patientID = patientID.substituteString();
            }
            if (itemID.ToString().Contains("'"))
            {
                itemID = itemID.substituteString();
            }
            if (issueToUser.ToString().Contains("'"))
            {
                issueToUser = issueToUser.substituteString();
            }
            if (issueToLocation.ToString().Contains("'"))
            {
                issueToLocation = issueToLocation.substituteString();
            }
            if (itemDesc.ToString().Contains("'"))
            {
                itemDesc = itemDesc.substituteString();
            }

            if (dsUserList.Tables[0].Rows.Count > 0)
            {

                //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of dsUserList.Tables(0).Rows.Count for every iteration:
                int tempVar = dsUserList.Tables[0].Rows.Count;
                for (int i = 0; i < tempVar; i++)
                {

                    if (!string.IsNullOrEmpty(strUserID))
                    {
                        strUserID = strUserID + ",'" + dsUserList.Tables[0].Rows[i]["USER_ID"] + "'";
                    }
                    else
                    {
                        strUserID = "('" + dsUserList.Tables[0].Rows[i]["USER_ID"] + "'";
                    }

                }

                strUserID = strUserID + ")";

            }
            else
            {
                strUserID = "(' " + "')";
            }

            var sbSql = new StringBuilder();
            //MMR - 2579
            //SW-3031 01/31/2008
            //SM-0004576

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append(" SELECT A.TRANSACTION_ID AS TRANS_ID, A.BUSINESS_UNIT, A.REPORT_DATA_1 AS DEPT_ID, FIRST_NAME+' '+MIDDLE_INITIAL+' " + " '+LAST_NAME+'('+A.DOWNLOAD_USERID+')' AS USER_NAME, " + " A.USER_ID, A.REPORT_DATA_2 AS PATIENT_ID," + " A.REPORT_DATA_3 AS ISSUE_TO_LOCATION, A.REPORT_DATA_4 AS ISSUE_TO_USER, A. DESCR, B.ITEM_ID, B.ITEM_DESC, B.ISSUE_DATE, " + " B.STORAGE_LOCATION, CASE WHEN B.ADJUST_QTY IS NULL THEN B.QTY WHEN B.ADJUST_QTY='' THEN B.QTY ELSE ADJUST_QTY END AS QTY, B.UOM, B.PRICE, C.SIGNATURE, " + " A.STATUS, CASE WHEN B.ADJUST_TYPE IS NULL THEN 'Decrease' WHEN B.ADJUST_TYPE='D' THEN 'Decrease' WHEN B.ADJUST_TYPE='I' THEN 'Increase' END AS ADJUST_TYPE " + " FROM MT_STIS_DETAILS B,MT_ATPAR_USER D, " + " MT_ATPAR_TRANSACTION A LEFT OUTER JOIN MT_STIS_SIGNATURE C  ON A.REPORT_DATA_9 = C.SIGNATURE_ID " + " WHERE A.DOWNLOAD_USERID=D.USER_ID AND A.TRANSACTION_ID = B.TRANSACTION_ID " + " AND A.APP_ID = " + (int)AtParWebEnums.EnumApps.StockIssue + "");

                    if (bUnit != "ALL")
                    {
                        sbSql.Append(" AND A.BUSINESS_UNIT IN " + bUnit);
                    }

                    if (userID != "ALL")
                    {
                        sbSql.Append(" AND A.DOWNLOAD_USERID IN " + userID);
                    }
                    else
                    {
                        sbSql.Append("  AND A.DOWNLOAD_USERID IN " + strUserID);
                    }

                    if (deptID.Length > 0)
                    {
                        sbSql.Append(" AND A.REPORT_DATA_1 LIKE '%" + deptID + "%' ");
                    }

                    if (patientID.Length > 0)
                    {
                        sbSql.Append(" AND A.REPORT_DATA_2 LIKE  '%" + patientID + "%'");
                    }

                    if (issueToUser.Length > 0)
                    {
                        sbSql.Append(" AND A.REPORT_DATA_4 LIKE '%" + issueToUser + "%'");
                    }

                    if (itemID.Length > 0)
                    {
                        sbSql.Append(" AND B.ITEM_ID LIKE '%" + itemID + "%'");
                    }

                    if (itemDesc.Length > 0)
                    {
                        sbSql.Append(" AND B.ITEM_DESC LIKE '%" + itemDesc + "%'");
                    }

                    //MMR - 2579
                    if (status != "ALL")
                    {
                        if (status == "6")
                        {
                            status = "'6','17','18'";
                            sbSql.Append(" AND A.STATUS IN (" + status + ")");
                        }
                        else
                        {
                            sbSql.Append(" AND A.STATUS= '" + status + "' ");
                        }

                    }

                    if (issueToLocation.Length > 0)
                    {
                        sbSql.Append(" AND A.REPORT_DATA_3 LIKE '%" + issueToLocation + "%' ");
                    }

                    sbSql.Append(" AND B.ISSUE_DATE BETWEEN CONVERT(DATETIME,'" + fromDt + "', 101) " + " AND DATEADD(DAY, 1, CONVERT(DATETIME,'" + toDt + "', 101)) ");

                    sbSql.Append(" ORDER BY A.BUSINESS_UNIT, A.REPORT_DATA_1, B.ISSUE_DATE DESC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }



                    var list = objContext.Database.SqlQuery<VM_ISSUEREPORT>(sbSql.ToString()).ToList();
                    pDs = list.ToDataSet();

                

                    if (pDs.Tables[0].Rows.Count > 0)
                    {
                        tempGetIssueReport = AtparStatusCodes.ATPAR_OK;
                    }
                    else
                    {
                        tempGetIssueReport = AtparStatusCodes.E_NORECORDFOUND;
                    }

                    return new Tuple<DataSet, long>(pDs, tempGetIssueReport);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return new Tuple<DataSet, long>(null, tempGetIssueReport);
            }
            finally
            {
                sbSql = null;
            }
        }

        public class VM_ISSUEREPORT
        {
            public int TRANS_ID { get; set; }
            public string BUSINESS_UNIT { get; set; }
            public string DEPT_ID { get; set; }
            public string USER_NAME { get; set; }
            public string USER_ID { get; set; }
            public string PATIENT_ID { get; set; }
            public string ISSUE_TO_LOCATION { get; set; }
            public string ISSUE_TO_USER { get; set; }
            public string DESCR { get; set; }
            public string ITEM_ID { get; set; }
            public string ITEM_DESC { get; set; }
            public DateTime ISSUE_DATE { get; set; }
            public string STORAGE_LOCATION { get; set; }
            public double QTY { get; set; }
            public string UOM { get; set; }
            public double PRICE { get; set; }
            public string SIGNATURE { get; set; }
            public short STATUS { get; set; }
            public string ADJUST_TYPE { get; set; }
        }

        public Tuple<List<string>, long> GetDistinctBunits(string appID, string userList)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();
            DataSet ds = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_IBU_ALLOCATION  WHERE ");
                    sbSQL.Append(" APP_ID = '").Append(appID).Append("' AND USER_ID in (").Append(userList).Append(")");



                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstBusinessUnits = objContext.Database.SqlQuery<string>(sbSQL.ToString()).ToList();

                     //ds = lstBusinessUnits.ToDataSet();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstBusinessUnits.Count); }

                    return new Tuple<List<string>, long>(lstBusinessUnits, AtparStatusCodes.ATPAR_OK);

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                return new Tuple<List<string>, long>(null, AtparStatusCodes.ATPAR_OK);
            }
            finally
            {
                sbSQL = null;
            }
        }

        public Tuple<DataSet, long> GetHeirarchyUsersList(string orgGrpID,string appID,string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet dsUserList = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        SqlParameter[] sqlParms = new SqlParameter[3];

                        sqlParms[0] = new SqlParameter("@OrgGrp_ID", SqlDbType.NVarChar);
                        sqlParms[0].Value = orgGrpID;
                        

                        sqlParms[1] = new SqlParameter("@app_ID", SqlDbType.NVarChar);
                        sqlParms[1].Value = appID;

                        sqlParms[2] = new SqlParameter("@userID", SqlDbType.NVarChar);
                        sqlParms[2].Value = userID;


                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GetHeirarchyUsersList";
                        command.CommandType = CommandType.StoredProcedure;

                        using (var reader = command.ExecuteReader())
                        {
                            var List1 =
                                ((IObjectContextAdapter)objContext)
                                    .ObjectContext
                                    .Translate<VM_STOCKISSUE_USERDETAILS>(reader)
                                    .ToList();

                            dsUserList = List1.ToDataSet();
                            
                        }
                    }
                }
                return new Tuple<DataSet, long>(dsUserList, AtparStatusCodes.ATPAR_OK);
            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + "\r\n" + (sqlex));
                }
                return new Tuple<DataSet, long>(dsUserList, AtparStatusCodes.E_SERVERERROR);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ex.ToString());
                }
                return new Tuple<DataSet, long>(dsUserList, AtparStatusCodes.E_SERVERERROR);
            }
        }

        public Tuple<DataSet, long> GetUsersList(string pUserId, string pAppId, string pOrgGrpId)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSelectCount = new StringBuilder();
            StringBuilder _sbSelectUsers = new StringBuilder();
            DataSet pDSUserList = new DataSet();
            int intCount = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    _sbSelectCount.Append(" SELECT COUNT(USER_ID) FROM  MT_ATPAR_USER A, MT_ATPAR_USER_GROUPS B WHERE ");
                    _sbSelectCount.Append(" (A.USER_ID = B.CLIENT_USER  OR  A.USER_ID =B.SERVER_USER) AND B.APP_ID = ");
                    _sbSelectCount.Append(" ").Append(pAppId).Append(" AND B.SERVER_USER ='").Append(pUserId).Append("' ");

                    if (_log.IsInfoEnabled)
                        _log.Info(_sbSelectCount.ToString());

                    try
                    {
                        
                        intCount = objContext.Database.SqlQuery<int>(_sbSelectCount.ToString()).FirstOrDefault();

                        if (intCount == 0)
                        {
                            _sbSelectUsers.Append(" SELECT DISTINCT FIRST_NAME, LAST_NAME, ");
                            _sbSelectUsers.Append(" MIDDLE_INITIAL, B.USER_ID, ");
                            _sbSelectUsers.Append(" A.FIRST_NAME + ' ' + A.MIDDLE_INITIAL + ' ' + A.LAST_NAME + ' (' + A.USER_ID + ')' AS FULLNAME  FROM ");
                            _sbSelectUsers.Append(" MT_ATPAR_USER A,MT_ATPAR_USER_ORG_GROUPS B,MT_ATPAR_PROFILE_APP_ACL C, MT_ATPAR_USER_ACL D ");
                            _sbSelectUsers.Append(" WHERE A.USER_ID = B.USER_ID AND A.USER_ID = D.USER_ID AND D.ACCOUNT_DISABLED = 0 ");
                            _sbSelectUsers.Append(" AND A.PROFILE_ID=C.PROFILE_ID AND C.APP_ID= ").Append(pAppId);

                            if (pOrgGrpId != "All")
                            {
                                _sbSelectUsers.Append(" AND B.ORG_GROUP_ID='").Append(pOrgGrpId).Append("' ");
                            }

                            if (_log.IsInfoEnabled)
                                _log.Info(_sbSelectUsers.ToString());
                            var fields = new[] { "FIRST_NAME", "LAST_NAME", "MIDDLE_INITIAL", "USER_ID", "FULLNAME" };
                            //pDSUserList = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSelectUsers.ToString()));
                            var list1 = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER>(fields, _sbSelectUsers.ToString()).ToList();
                            pDSUserList=list1.ToDataSet();
                        }
                        else
                        {
                            //SB-0004282
                            _sbSelectUsers.Append(" SELECT DISTINCT FIRST_NAME, LAST_NAME, ");
                            _sbSelectUsers.Append(" MIDDLE_INITIAL, A.USER_ID, A.FIRST_NAME + ' ' + A.MIDDLE_INITIAL + ' ' +  ");
                            _sbSelectUsers.Append(" A.LAST_NAME + ' (' + A.USER_ID + ')' AS FULLNAME FROM ");
                            _sbSelectUsers.Append(" MT_ATPAR_USER A, MT_ATPAR_USER_GROUPS B, MT_ATPAR_USER_ACL C WHERE (A.USER_ID = B.CLIENT_USER ");
                            _sbSelectUsers.Append(" ) AND A.USER_ID=C.USER_ID AND C.ACCOUNT_DISABLED = 0 AND B.APP_ID = ").Append(pAppId).Append(" AND B.SERVER_USER ='").Append(pUserId).Append("' ");

                            if (_log.IsInfoEnabled)
                                _log.Info(_sbSelectUsers.ToString());

                           // pDSUserList = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_sbSelectUsers.ToString()));
                            var fields = new[] { "FIRST_NAME", "LAST_NAME", "MIDDLE_INITIAL", "USER_ID", "FULLNAME" };
                            var list1 = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER>(fields, _sbSelectUsers.ToString()).ToList();
                            pDSUserList = list1.ToDataSet();
                        }
                    }
                    catch (SqlException sqlex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to get users list  with the following SQL :" + _sbSelectUsers.ToString() +" Exception is:" + sqlex.ToString());
                        //throw new Exception("GetUsersList Failed", sqlex);
                        return new Tuple<DataSet, long>(pDSUserList, AtparStatusCodes. ATPAR_E_LOCALDBSELECTFAIL);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to get users list  with the following SQL :" + _sbSelectUsers.ToString()  + " Exception is:" + ex.ToString() );
                        //throw new Exception("GetUsersList Failed", ex);
                        return new Tuple<DataSet, long>(pDSUserList, AtparStatusCodes. E_SERVERERROR);
                    }
                }
                return new Tuple<DataSet, long>(pDSUserList, AtparStatusCodes.E_SERVERERROR);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSelectUsers.ToString()); }
                return new Tuple<DataSet, long>(null, AtparStatusCodes.ATPAR_OK);
            }
            finally
            {
                _sbSelectUsers = null;
                _sbSelectCount = null;
            }
        }

    }
}

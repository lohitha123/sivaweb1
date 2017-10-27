using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Deliver;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Deliver.Repos
{
    public class ProductivityReportRepository : IProductivityReportRepository
    {
        private ILog _log;
        public ProductivityReportRepository(ILog log)
        {
            _log = log;
        }


        public Tuple<DataSet, long> GetCycleTimeReportRepo(string orgGroupID, string fromDate, string toDate,
            string userID, string startEvent, string endEvent,
            string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long functionReturnValue = 0;
            DataSet dSTransRep = new DataSet();
            StringBuilder sbSql = new StringBuilder();
            long _StatusCode = 0;
            if (startEvent == null) startEvent = "0";
            if (endEvent == null) endEvent = "0";

            //dynamic status = null;
            //long i = 0;
            // long j = 0;
            //int transId = 0;
            string nonStockStoreValue = string.Empty;
            string dwnloadUserId = string.Empty;
            //Stores Download User ID
            string dwnloadTime = string.Empty;
            //Stores Download Time
            string receiveUserId = string.Empty;
            //Stores Receive User ID
            string receiveTime = string.Empty;
            //Stores Receive Time

            string strBadgeTrackNo = string.Empty;
            string strBadgeUserDetails = string.Empty;
            string arrUserBadgeDetails = string.Empty;
            StringBuilder whereClauseSql = null;
            DataSet dsTempDelvRep = new DataSet();
            //int intcurrTransID = 0;
            //int intPrevTransID = 0;
            string strDownLoadUserId = string.Empty;
            string strRecvUserId = string.Empty;
            string strDeliveredBy = string.Empty;
            string strDelvBy = string.Empty;
            string strDelvTo = string.Empty;
            string strVendName = string.Empty;
            DataSet pUserGroups = new DataSet();
            string[] arrUserID = null;
            string strUserId = string.Empty;

            DataSet dsDelvDetailRep = new DataSet();


            arrUserID = userID.Split(',');
            try
            {
                if ((arrUserID.Length > 0))
                {
                    for (int _intCnt = 0; _intCnt <= arrUserID.Length - 1; _intCnt++)
                    {
                        strUserId = strUserId + "'" + arrUserID[_intCnt].Trim() + "',";
                    }
                    strUserId = strUserId.Substring(0, strUserId.Length - 1);
                }
                else
                {
                    strUserId = userID;
                }
                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + ": strUserId : " + strUserId);
            }
            catch (Exception)
            {
                _StatusCode = AtparStatusCodes.E_SERVERERROR;
                functionReturnValue = _StatusCode;
            }


            //_StatusCode = gAPUtils.GetOrgGroupParamValue(orgGroupID, 4, "NON_STOCK_STORE", nonStockStoreValue, deviceTokenEntry)
            //If _StatusCode <> ATPAR_OK Then
            //    Return _StatusCode
            //End If
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append(" SELECT * FROM MT_ATPAR_USER_GROUPS,MT_ATPAR_USER B WHERE APP_ID= " + (int)AtParWebEnums.EnumApps.Deliver + " AND SERVER_USER ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "'");

                    if (_log.IsInfoEnabled)
                        _log.Info(methodBaseName + ": Executing SQL " + sbSql);


                    try
                    {
                        // pUserGroups = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(sbSql));
                        var lstUserGroups = objContext.Database.SqlQuery<VM_DELIVER_USER_GROUPS>(sbSql.ToString()).ToList();
                        pUserGroups = lstUserGroups.ToDataSet();
                    }
                    catch (Exception ex)
                    {
                        _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                        functionReturnValue = _StatusCode;
                        if (_log.IsFatalEnabled)
                            _log.Fatal("ATPAR_E_LOCALDBSELECTFAIL : while executing the query : " + sbSql + " : exception is : " + ex.ToString());
                        return new Tuple<DataSet, long>(dsDelvDetailRep, _StatusCode);
                    }

                    //clearing string builder
                    sbSql = null;
                    sbSql = new StringBuilder();

                    if (pUserGroups.Tables[0].Rows.Count <= 0)
                    {
                        sbSql.Append("SELECT * FROM (SELECT DTTRANS.TRANSACTION_ID, DTTRANSITEMS.TO_USER_OR_LOCGRP AS CURRENT_STATUS_USER, DTTRANS.STATUS,DTTRANS.REPORT_DATA_1 AS PO_ID,  DTTRANSITEMS.EVENT_ID,DTTRANS.REPORT_DATA_1,  DTTRANS.REPORT_DATA_2 AS LINE_NO, DTTRANS.REPORT_DATA_3, DTTRANS.REPORT_DATA_31 , DTTRANS.REPORT_DATA_6 AS  CARRIER_ID,   DTTRANS.REPORT_DATA_7 AS DEPT_ID, DTTRANS.HAND_OVER_DATE, DTTRANS.USER_ID AS HANDOVERUSER,    REPORT_DATA_4 AS DELIVERED_TO, DTTRANS.TRANSACTION_ID AS TRANS_ID, DTTRANS.KEY_6 AS DELIVER_NON_PO,   DTTRANS.SIGNATURE_ID, DTTRANS.REPORT_DATA_11 AS RECEIVER_NAME, DTTRANS.REPORT_DATA_19, DTTRANS.REPORT_DATA_20,    DTTRANS.REPORT_DATA_8, DTTRANS.REPORT_DATA_10, DTTRANS.KEY_4, DTTRANS.UPDATE_DATE AS UPDATE_DT_TIME, DTTRANS.REPORT_DATA_9 AS VENDOR_NAME,    DTTRANS.REPORT_DATA_12 AS RECEIPT_DATE, (CASE WHEN (REPORT_DATA_5 IS NULL OR REPORT_DATA_5='') AND (REPORT_DATA_26 IS NULL OR REPORT_DATA_26='') THEN ''  WHEN REPORT_DATA_5 IS NULL OR REPORT_DATA_5='' THEN ' - ' + REPORT_DATA_26 WHEN REPORT_DATA_26 IS NULL OR REPORT_DATA_26='' THEN REPORT_DATA_5 + ' - '  ELSE REPORT_DATA_5 + ' - ' + REPORT_DATA_26 END)AS LOCATION , DTTRANS.REPORT_DATA_16 AS ITEM_ID,   DTTRANS.REPORT_DATA_17 AS QTY, DTTRANS.REPORT_DATA_32 AS DELIVERY_LOCATION,    DTTRANS.DOWNLOAD_USER_ID, DTTRANS.REPORT_DATA_29 AS RECEIVE_USERID, DTTRANS.REPORT_DATA_30 AS DOWNLOAD_DT_TIME,   DTTRANSITEMS.USER_ID AS  DELIVERED_BY, DTTRANSITEMS.USER_ID AS EVENT_USER_ID, DTTRANSITEMS.UPDATE_DATE,   (CASE WHEN DTTRANSITEMS.EVENT_ID = 20  THEN  (SELECT FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'(' + USER_ID + ')'   FROM MT_ATPAR_USER WHERE USER_ID= DTTRANSITEMS.USER_ID )  ELSE '' END) AS PICKUP_USER, DTTRANS.REPORT_DATA_27 AS COMMENTS, DTTRANS.REPORT_DATA_37 AS HDR_COMMENTS  FROM (SELECT ATDTTRANS.*, ATORGGRPS.ORG_GROUP_ID FROM MT_ATPAR_DETAIL_TRANSACTION ATDTTRANS  INNER JOIN MT_ATPAR_USER_ORG_GROUPS ATORGGRPS ON   (ATDTTRANS.DOWNLOAD_USER_ID =ATORGGRPS.USER_ID OR ATDTTRANS.DOWNLOAD_USER_ID=ATORGGRPS.USER_ID)) AS DTTRANS   LEFT OUTER JOIN   (SELECT TRANSACTION_ID,EVENT_ID,TO_USER_OR_LOCGRP,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP_MISC_EVENT   UNION   SELECT TRANSACTION_ID,EVENT_ID,USER_ID,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP) DTTRANSITEMS  ON DTTRANSITEMS.TRANSACTION_ID=DTTRANS.TRANSACTION_ID  WHERE DTTRANS.APP_ID = " ).Append( (int)AtParWebEnums.EnumApps.Deliver ).Append( " ");

                        if (orgGroupID.ToUpper() != "ALL")
                        {
                            //sbSql = sbSql & " AND DTTRANS.KEY_1 IN (SELECT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID='" & orgGroupID & "' ) "
                            sbSql.Append(" AND EXISTS ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE  BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS B  WHERE B.ORG_GROUP_ID = '" ).Append( orgGroupID ).Append(" ' AND DTTRANS.ORG_GROUP_ID=B.ORG_GROUP_ID))");
                        }

                        //" AND DTTRANS.ORG_GROUP_ID='" & orgGroupID & "' "

                    }
                    else
                    {
                        sbSql.Append("SELECT * FROM (SELECT DTTRANS.TRANSACTION_ID, DTTRANSITEMS.TO_USER_OR_LOCGRP AS CURRENT_STATUS_USER,  DTTRANS.STATUS,DTTRANS.REPORT_DATA_1 AS PO_ID,  DTTRANSITEMS.EVENT_ID,DTTRANS.REPORT_DATA_1,  DTTRANS.REPORT_DATA_2 AS LINE_NO, DTTRANS.REPORT_DATA_3, DTTRANS.REPORT_DATA_31 , DTTRANS.REPORT_DATA_6 AS  CARRIER_ID,   DTTRANS.REPORT_DATA_7 AS DEPT_ID, DTTRANS.HAND_OVER_DATE, DTTRANS.USER_ID AS HANDOVERUSER,  REPORT_DATA_4 AS DELIVERED_TO, DTTRANS.TRANSACTION_ID AS TRANS_ID, DTTRANS.KEY_6 AS DELIVER_NON_PO,   DTTRANS.SIGNATURE_ID, DTTRANS.REPORT_DATA_11 AS RECEIVER_NAME,  DTTRANS.REPORT_DATA_19, DTTRANS.REPORT_DATA_20,  DTTRANS.REPORT_DATA_8, DTTRANS.REPORT_DATA_10, DTTRANS.KEY_4, DTTRANS.UPDATE_DATE AS UPDATE_DT_TIME, DTTRANS.REPORT_DATA_9 AS VENDOR_NAME,   DTTRANS.REPORT_DATA_12 AS RECEIPT_DATE, (CASE WHEN (REPORT_DATA_5 IS NULL OR REPORT_DATA_5='') AND (REPORT_DATA_26 IS NULL OR REPORT_DATA_26='') THEN ''  WHEN REPORT_DATA_5 IS NULL OR REPORT_DATA_5='' THEN ' - ' + REPORT_DATA_26 WHEN REPORT_DATA_26 IS NULL OR REPORT_DATA_26='' THEN REPORT_DATA_5 + ' - '  ELSE REPORT_DATA_5 + ' - ' + REPORT_DATA_26 END)AS LOCATION , DTTRANS.REPORT_DATA_16 AS ITEM_ID,   DTTRANS.REPORT_DATA_17 AS QTY, DTTRANS.REPORT_DATA_32 AS DELIVERY_LOCATION,   DTTRANS.DOWNLOAD_USER_ID, DTTRANS.REPORT_DATA_29 AS RECEIVE_USERID, DTTRANS.REPORT_DATA_30 AS DOWNLOAD_DT_TIME,   DTTRANSITEMS.USER_ID AS  DELIVERED_BY, DTTRANSITEMS.USER_ID AS EVENT_USER_ID, DTTRANSITEMS.UPDATE_DATE,   (CASE WHEN DTTRANSITEMS.EVENT_ID = 20  THEN (SELECT FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'(' + USER_ID + ')'   FROM MT_ATPAR_USER WHERE USER_ID= DTTRANSITEMS.USER_ID ) ELSE '' END) AS PICKUP_USER, DTTRANS.REPORT_DATA_27 AS COMMENTS, DTTRANS.REPORT_DATA_37 AS HDR_COMMENTS  FROM (SELECT DISTINCT ATDTTRANS.*, ATUSRGRPS.ORG_GROUP_ID, ATUSRGRPS.SERVER_USER FROM MT_ATPAR_DETAIL_TRANSACTION ATDTTRANS  INNER JOIN MT_ATPAR_USER_GROUPS ATUSRGRPS ON   (ATDTTRANS.DOWNLOAD_USER_ID =ATUSRGRPS.CLIENT_USER OR ATDTTRANS.DOWNLOAD_USER_ID=ATUSRGRPS.CLIENT_USER)  WHERE ATUSRGRPS.APP_ID = " ).Append( (int)AtParWebEnums.EnumApps.Deliver ).Append( " AND ATUSRGRPS.SERVER_USER='" ).Append( deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] ).Append( "' ) AS DTTRANS  LEFT OUTER JOIN   (SELECT TRANSACTION_ID,EVENT_ID,TO_USER_OR_LOCGRP,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP_MISC_EVENT   UNION   SELECT TRANSACTION_ID,EVENT_ID,USER_ID,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP) DTTRANSITEMS  ON DTTRANSITEMS.TRANSACTION_ID=DTTRANS.TRANSACTION_ID  WHERE DTTRANS.APP_ID = " ).Append( (int)AtParWebEnums.EnumApps.Deliver ).Append( " " ).Append( " AND DTTRANS.SERVER_USER='" ).Append( deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] ).Append( "' ");

                    }

                    string pStrCurrStatus = string.Empty;

                    sbSql.Append(" AND ((DTTRANS.REPORT_DATA_30 >= CONVERT(DATETIME,'" ).Append( fromDate ).Append( "',101) AND " ).Append( " DTTRANS.REPORT_DATA_30 <= DATEADD(DAY,1,CONVERT(DATETIME,'" ).Append( toDate ).Append( "',101)) AND " ).Append( " (DTTRANS.STATUS = 1 OR DTTRANS.STATUS = 13) ");

                    sbSql.Append(") OR  (DTTRANS.REPORT_DATA_12 >= CONVERT(DATETIME,'" ).Append( fromDate ).Append( "',101) AND " ).Append( " DTTRANS.REPORT_DATA_12 <= DATEADD(DAY,1,CONVERT(DATETIME,'" ).Append( toDate ).Append( "',101)) AND " ).Append( " DTTRANS.STATUS = 0 ");

                    sbSql.Append(") OR (DTTRANSITEMS.UPDATE_DATE >= CONVERT(DATETIME,'" ).Append( fromDate ).Append( "',101) AND" ).Append( " DTTRANSITEMS.UPDATE_DATE <= DATEADD(DAY,1,CONVERT(DATETIME,'" ).Append( toDate ).Append( "',101)) AND" ).Append( " DTTRANSITEMS.EVENT_ID >=" ).Append( startEvent ).Append( " AND DTTRANSITEMS.EVENT_ID < =" ).Append( endEvent ).Append( ")");

                    sbSql.Append(" )");



                    if (strUserId.Trim() != "'ALL'" & strUserId.Trim() != "ALL")
                    {
                        sbSql.Append(" AND DTTRANS.DOWNLOAD_USER_ID IN (" ).Append( strUserId ).Append( ")");
                    }
                    sbSql.Append(") AS A ");

                    whereClauseSql = new StringBuilder();

                    if (!string.IsNullOrEmpty(fromDate) & !string.IsNullOrEmpty(toDate))
                    {
                        whereClauseSql.Append(" WHERE UPDATE_DATE BETWEEN CONVERT(DATETIME,'" ).Append( fromDate ).Append( " ',101) AND  DATEADD(DAY,1,CONVERT(DATETIME,'" ).Append( toDate ).Append( "',101))");
                    }

                    sbSql.Append(whereClauseSql).Append(" ORDER BY TRANSACTION_ID,UPDATE_DATE, EVENT_ID ");
                    //" ORDER BY  DTTRANSITEMS.UPDATE_DATE,D.UPDATE_DATE, DTTRANS.TRANSACTION_ID, DTTRANSITEMS.EVENT_ID ,D.EVENT_ID "

                    if (_log.IsInfoEnabled)
                        _log.Info(methodBaseName + ":To get the transaction data from MT_ATPAR_DETAIL_TRANSACTION, MT_DELV_ITEM_TRIP_MISC_EVENTMT_DELV_ITEM_TRIP tables:" + sbSql);

                    try
                    {
                        // dsDelvDetailRep = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(sbSql));
                        var lstDelvDetailRep = objContext.Database.SqlQuery<VM_DELIVERY_TRANSACTION_DETAILS>(sbSql.ToString()).ToList();
                        dsDelvDetailRep = lstDelvDetailRep.ToDataSet();
                    }
                    catch (Exception ex)
                    {
                        _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                        functionReturnValue = _StatusCode;
                        if (_log.IsFatalEnabled)
                            _log.Fatal("ATPAR_E_LOCALDBSELECTFAIL : while executing the query : " + sbSql + " : exception is : " + ex.ToString());
                        return new Tuple<DataSet, long>(dsDelvDetailRep, _StatusCode);
                    }

                    if (dsDelvDetailRep.Tables[0].Rows.Count == 0)
                    {
                        _StatusCode = AtparStatusCodes.E_NORECORDFOUND;
                        if (_log.IsWarnEnabled)
                            _log.Warn("E_NORECORDFOUND");
                        functionReturnValue = _StatusCode;
                        return new Tuple<DataSet, long>(dsDelvDetailRep, _StatusCode);
                    }

                    //clearing string builder

                    //sbSql = null;
                    //sbSql = new StringBuilder();


                    //sbSql.Append("SELECT * FROM MT_DELV_DLVR_ATTEMPT ");

                    //if (_log.IsInfoEnabled)
                    //    _log.Info(methodBaseName + ": Executing SQL " + sbSql);

                    //Try
                    //    pDsAttempt = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(sbSql))
                    //Catch ex As Exception
                    //    _StatusCode = ATPAR_E_LOCALDBSELECTFAIL
                    //    GetCycleTimeReport = _StatusCode
                    //    If log.IsFatalEnabled Then log.Fatal("ATPAR_E_LOCALDBSELECTFAIL : while executing the query : " & sbSql & " : exception is : " & ex.ToString)
                    //    Exit Function
                    //End Try

                    dsDelvDetailRep.Tables[0].Columns.Add("SIGNATURE");
                    dsDelvDetailRep.Tables[0].Columns.Add("STATUS_MESSAGE");
                    dsDelvDetailRep.Tables[0].Columns.Add("STATUS_TIME");
                    dsDelvDetailRep.Tables[0].Columns.Add("STATUS_USER");
                    dsDelvDetailRep.Tables[0].Columns.Add("RECEPIENT");
                    dsDelvDetailRep.Tables[0].Columns.Add("HANDOVER");
                    dsDelvDetailRep.Tables[0].Columns.Add("OLD_LOCATION");
                    dsDelvDetailRep.Tables[0].Columns.Add("REDELIVER");
                    //dsDelvDetailRep.Tables(0).Columns.Add("STATUS_CODE")

                    return new Tuple<DataSet, long>(dsDelvDetailRep, AtparStatusCodes.ATPAR_OK);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
        }

        public Tuple<DataSet, long> GetProductivityReport(string orgGroupID,string fromDate,
            string todate,string userID,int interval,string fTime,string toTime)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet pDsProductivityRep = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        SqlParameter[] sqlParms = new SqlParameter[8];
                        sqlParms[0] = new SqlParameter("@OrgGrp_ID", SqlDbType.NVarChar);
        sqlParms[0].Value = orgGroupID;
                        sqlParms[1] = new SqlParameter("@FromDate", SqlDbType.NVarChar);
        sqlParms[1].Value = fromDate;
                        sqlParms[2] = new SqlParameter("@ToDate", SqlDbType.NVarChar);
        sqlParms[2].Value = todate;
                        sqlParms[3] = new SqlParameter("@UserId", SqlDbType.NVarChar);
        sqlParms[3].Value = userID;
                        sqlParms[4] = new SqlParameter("@Interval", SqlDbType.Int);
        sqlParms[4].Value = interval;
                        sqlParms[5] = new SqlParameter("@FTime", SqlDbType.NVarChar);
        sqlParms[5].Value = fTime;
                        sqlParms[6] = new SqlParameter("@ToTime", SqlDbType.NVarChar);
        sqlParms[6].Value = toTime;
                        sqlParms[7] = new SqlParameter("@StatusCode", SqlDbType.Int);
        sqlParms[7].Direction = ParameterDirection.Output;

                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GetDeliverProductivityReportDetails";
                        command.CommandType = CommandType.StoredProcedure;

                        if (_log.IsInfoEnabled)
                        {
                            _log.Info("Calling sp_GetRequisitionNo with the following syntax..");

                            string sbSql1 = "EXEC GetDeliverProductivityReportDetails " + "\r\n" + " @ids = N'" + sqlParms + "'";

                            _log.Info(sbSql1);
                        }

                        using (var reader = command.ExecuteReader())
                        {
                            var List1 =
                                ((IObjectContextAdapter)objContext)
                                    .ObjectContext
                                    .Translate<VM_GetDeliverProductivityReportDetails1>(reader)
                                    .ToList();

                            var dt = List1.ToDataTable();

                            reader.NextResult();

                            var List2 =
                               ((IObjectContextAdapter)objContext)
                                   .ObjectContext
                                   .Translate<VM_GetDeliverProductivityReportDetails1>(reader)
                                   .ToList();

                           var dt1= List2.ToDataTable();

                            pDsProductivityRep.Tables.Add(dt);
                            pDsProductivityRep.Tables.Add(dt1);
                        }
                    }
                }
                return new Tuple<DataSet, long>(pDsProductivityRep, AtparStatusCodes.ATPAR_OK);
            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + "\r\n" + (sqlex));
                }
                return new Tuple<DataSet, long>(pDsProductivityRep, AtparStatusCodes.E_SERVERERROR);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ex.ToString());
                }
                return new Tuple<DataSet, long>(pDsProductivityRep, AtparStatusCodes.E_SERVERERROR);
            }
        }

        private class VM_DELIVER_USER_GROUPS
        {
            public string USER_ID { get; set; }
            public string PASSHASH { get; set; }
            public string FIRST_NAME { get; set; }
            public string LAST_NAME { get; set; }
            public string MIDDLE_INITIAL { get; set; }
            public string EMAIL_ID { get; set; }
            public string PHONE1 { get; set; }
            public string PHONE2 { get; set; }
            public string FAX { get; set; }
            public string PAGER { get; set; }
            public string HINT_QUESTION { get; set; }
            public string HINT_ANSWER { get; set; }
            public string CREATE_USER_ID { get; set; }
            public DateTime? CREATE_DATE { get; set; }
            public string PROFILE_ID { get; set; }
            public string LDAP_USER { get; set; }
            public string LDAP_ROLE { get; set; }
            public string LDAP_ORG { get; set; }
            public DateTime? LAST_UPDATE_DATE { get; set; }
            public string LAST_UPDATE_USER { get; set; }
            public string LAST_CLIENT_ADDRESS { get; set; }
            public string USERDN { get; set; }
            public string FULLNAME { get; set; }
            public string VENDORNAME { get; set; }
            public string IMAGE_PATH { get; set; }
            public short APP_ID { get; set; }
            public string SERVER_USER { get; set; }
            public string CLIENT_USER { get; set; }
            public string ORG_GROUP_ID { get; set; }

        }

        private class VM_DELIVERY_TRANSACTION_DETAILS
        {
            public int TRANSACTION_ID { get; set; }
            public string CURRENT_STATUS_USER { get; set; }
            public int STATUS { get; set; }
            public string PO_ID { get; set; }
            public int EVENT_ID { get; set; }
            public string REPORT_DATA_1 { get; set; }
            public int LINE_NO { get; set; }
            public string REPORT_DATA_3 { get; set; }
            public string REPORT_DATA_31 { get; set; }
            public string CARRIER_ID { get; set; }
            public string DEPT_ID { get; set; }
            public DateTime? HAND_OVER_DATE { get; set; }
            public string HANDOVERUSER { get; set; }
            public string DELIVERED_TO { get; set; }
            public int TRANS_ID { get; set; }
            public int? DELIVER_NON_PO { get; set; }
            public int? SIGNATURE_ID { get; set; }
            public string RECEIVER_NAME { get; set; }
            public string REPORT_DATA_19 { get; set; }
            public string REPORT_DATA_20 { get; set; }
            public string REPORT_DATA_8 { get; set; }
            public string REPORT_DATA_10 { get; set; }
            public string KEY_4 { get; set; }
            public DateTime? UPDATE_DT_TIME { get; set; }
            public string VENDOR_NAME { get; set; }
            public DateTime? RECEIPT_DATE { get; set; }
            public string LOCATION { get; set; }
            public string ITEM_ID { get; set; }
            public double? QTY { get; set; }
            public string DELIVERY_LOCATION { get; set; }
            public string DOWNLOAD_USER_ID { get; set; }
            public string RECEIVE_USERID { get; set; }
            public DateTime? DOWNLOAD_DT_TIME { get; set; }
            public string DELIVERED_BY { get; set; }
            public string EVENT_USER_ID { get; set; }
            public DateTime UPDATE_DATE { get; set; }
            public string PICKUP_USER { get; set; }
            public string COMMENTS { get; set; }
            public string HDR_COMMENTS { get; set; }
        }

        public Tuple<string, long> GetUserFullName(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '(' + USER_ID + ')' AS USER_ID FROM MT_ATPAR_USER WHERE USER_ID = '" ).Append( userID ).Append( "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fullName = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Full Name returned" + fullName); }

                    return new Tuple<string, long>(fullName, AtparStatusCodes.ATPAR_OK);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return new Tuple<string, long>("", AtparStatusCodes.E_SERVERERROR);
            }
            finally
            {
                sbSql = null;
            }
        }

        public class VM_GetDeliverProductivityReportDetails1
        {
            public string START_INTERVAL { get; set; }
            public int PACKAGE_COUNT { get; set; }
            public string UserId { get; set; }
            public string TRANS_DATE { get; set; }
        }


    }
}

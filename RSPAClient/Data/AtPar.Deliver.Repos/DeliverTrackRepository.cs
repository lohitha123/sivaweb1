using log4net;
using AtPar.Common;
using System;
using System.Data;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Deliver;
using AtParVbUtilities;
using System.IO;

namespace AtPar.Deliver.Repos
{
    public class DeliverTrackRepository : IDeliverTrackRepository
    {
        private ILog _log;
        private IDeliveryReportRepository _deliveryRepo;
        AtParVbUtilities.VbUtilities ObjVButil = new VbUtilities();
        public DeliverTrackRepository(ILog log, IDeliveryReportRepository deliveryRepo)
        {
            _log = log;
            _deliveryRepo = deliveryRepo;
        }

        public Tuple<DataSet, bool, DataSet, long> GetDeliveryTrackingReportData(string trackNo, string poId, string deptID, string fromDate, string toDate, string vendorName, string itemDesc, string itemID,
string carrierID, string deliveryLoc, string requestor, string receiver, string selectedStatus, string currentStatus, string systemID, string locDescr)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet pDsDetails = new DataSet();
            bool pDetailsFlag = false;
            DataSet pDsDataArrayAttempt = new DataSet();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    long functionReturnValue = 0;

                    long _StatusCode = -1;

                    // Start of check for the systemid here
                    try
                    {
                        _StatusCode = ValidateSystemID(systemID);

                        if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + ": Failed to check system id " + ex.ToString() + ":");

                        return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, AtparStatusCodes.E_SERVERERROR);
                    }
                    // End of check for the systemid here


                    StringBuilder _strSql = new StringBuilder();
                    StringBuilder _sbSql = new StringBuilder();
                    dynamic _dsTransactions = default(DataSet);
                    dynamic _dsEvent = default(DataSet);
                    dynamic _dsAttempt = default(DataSet);
                    DataSet _dsOrgParam = new DataSet();
                    DataSet _dsTrans = new DataSet();
                    string _Status = string.Empty;
                    string _strUserID = string.Empty;
                    string _strOrgParam = string.Empty;
                    string _strSignature = string.Empty;
                    string _strDeliveryLocation = string.Empty;
                    DataTable dtEventDetails = new DataTable();
                    DataTable dtAttempts = new DataTable();
                    DataTable dtTransactions = new DataTable();
                    string _strEventStatus = string.Empty;
                    string _strNotes = string.Empty;

                    try
                    {
                        _sbSql.Append("SELECT * FROM (SELECT DISTINCT A.TRANSACTION_ID AS TRANSACTION_ID, STATUS, REPORT_DATA_1 AS PO_ID, REPORT_DATA_2 AS LINE, ");
                        _sbSql.Append("ISNULL(REPORT_DATA_3,'') AS INTTRACKING, REPORT_DATA_31 AS EXTTRACKING, ISNULL(REPORT_DATA_4,'') AS RECEPIENT, CASE WHEN (REPORT_DATA_26 IS NULL OR REPORT_DATA_26 = '') THEN REPORT_DATA_5 ELSE REPORT_DATA_5 + ' - ' + REPORT_DATA_26 END AS LOCATION, ");
                        _sbSql.Append("CASE WHEN (REPORT_DATA_40 IS NULL OR REPORT_DATA_40 = '') THEN '' ELSE REPORT_DATA_40 END AS OLD_LOCATION,");
                        _sbSql.Append("REPORT_DATA_6 AS CARRIER_ID, REPORT_DATA_7 DEPT_ID, REPORT_DATA_11, REPORT_DATA_8 AS ITEM_DESC, REPORT_DATA_10, ");
                        _sbSql.Append("KEY_1, KEY_7 AS SCH_LINE_NO, REPORT_DATA_15 AS HAND_OVER_LOC, ISNULL(REPORT_DATA_16,'') AS ITEM_ID, REPORT_DATA_17 AS QTY, REPORT_DATA_29 AS RECEIVE_USERID, ");
                        // REPORT_DATA_1, 
                        _sbSql.Append("A.HAND_OVER_DATE AS HAND_OVER_DATE, A.USER_ID AS USER_ID, REPORT_DATA_12 AS RECEIPT_DATE, ");
                        _sbSql.Append("REPORT_DATA_19 AS MFG_ITEM_ID, REPORT_DATA_20 AS UOM, REPORT_DATA_9 AS VENDOR, SIGNATURE_ID, A.UPDATE_DATE, REPORT_DATA_11 AS RECEIVER_NAME, REPORT_DATA_41 AS REDELIVER, ");
                        _sbSql.Append("(SELECT NOTES FROM MT_ATPAR_NOTES WHERE KEY_11= A.TRANSACTION_ID AND CODE='TRACKING NUMBER') AS ITEM_NOTES, REPORT_DATA_30  ");
                        _sbSql.Append("FROM MT_ATPAR_DETAIL_TRANSACTION A LEFT OUTER JOIN ");
                        _sbSql.Append(" (SELECT TRANSACTION_ID,EVENT_ID,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP_MISC_EVENT WHERE EVENT_ID IN (20,30,40,50,100)  UNION ");
                        _sbSql.Append(" SELECT TRANSACTION_ID,EVENT_ID,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP WHERE EVENT_ID IN (20,30,40,50,100) ) ");
                        _sbSql.Append(" DTTRANSITEMS  ON DTTRANSITEMS.TRANSACTION_ID=A.TRANSACTION_ID ");
                        _sbSql.Append(" WHERE  APP_ID = " + (int)AtParWebEnums.EnumApps.Deliver);

                        if (!string.IsNullOrEmpty(currentStatus))
                        {
                            _sbSql.Append(" AND A.STATUS  = " + currentStatus);
                        }
                        else if (!string.IsNullOrEmpty(selectedStatus))
                        {
                            if ((selectedStatus == "1" | selectedStatus == "0" | selectedStatus == "13"))
                            {
                                _sbSql.Append(" AND A.STATUS  = " + selectedStatus);
                            }
                            else
                            {
                                _sbSql.Append(" AND DTTRANSITEMS.EVENT_ID  = " + selectedStatus);
                            }
                        }

                        if (!string.IsNullOrEmpty(trackNo))
                        {
                            _sbSql.Append(" AND (REPORT_DATA_3 like '%" + trackNo + "%' OR REPORT_DATA_31 like '%" + trackNo + "%'");
                            _sbSql.Append(" OR EXISTS (SELECT NOTES FROM MT_ATPAR_NOTES WHERE KEY_11=A.TRANSACTION_ID AND NOTES like '%" + trackNo + "%'))");
                        }

                        if (!string.IsNullOrEmpty(deptID))
                        {
                            _sbSql.Append(" AND (REPORT_DATA_7 like '%" + deptID + "%' OR REPORT_DATA_5 like '" + deptID + "%')");
                        }

                        if (!string.IsNullOrEmpty(poId))
                        {
                            if (poId.Contains(","))
                            {
                                // string[] _array = Strings.Split(poId, ",");
                                string[] _array = poId.Split(',');
                                poId = string.Empty;
                                for (int i = 0; i <= _array.Length - 1; i++)
                                {
                                    poId += "'" + _array[i] + "',";
                                }
                                poId = poId.TrimEnd(',');
                                _sbSql.Append(" AND (REPORT_DATA_1 IN (" + poId + ") OR KEY_1 IN (" + poId + "))");
                            }
                            else
                            {
                                _sbSql.Append(" AND (REPORT_DATA_1 like '%" + poId + "%'" + " OR KEY_1 like '" + poId + "%')");
                            }
                        }

                        if (!string.IsNullOrEmpty(vendorName))
                        {
                            _sbSql.Append(" AND REPORT_DATA_9 like '%" + vendorName.substituteString() + "%'");
                        }

                        if (!string.IsNullOrEmpty(itemDesc))
                        {
                            _sbSql.Append(" AND REPORT_DATA_8 like '%" + itemDesc.CleanString().substituteString() + "%'");
                        }

                        if (!string.IsNullOrEmpty(itemID))
                        {
                            _sbSql.Append(" AND REPORT_DATA_16 like '%" + itemID + "%'");
                        }

                        if (!string.IsNullOrEmpty(carrierID))
                        {
                            _sbSql.Append(" AND REPORT_DATA_6 like '%" + carrierID + "%'");
                        }

                        if (!string.IsNullOrEmpty(deliveryLoc))
                        {
                            _sbSql.Append(" AND REPORT_DATA_5 like '%" + deliveryLoc + "%'");
                        }

                        if (!string.IsNullOrEmpty(locDescr))
                        {
                            _sbSql.Append(" AND REPORT_DATA_26 like '%" + locDescr.substituteString() + "%'");
                        }

                        if (!string.IsNullOrEmpty(requestor))
                        {
                            _sbSql.Append(" AND REPORT_DATA_4 like '%" + requestor.substituteString() + "%'");
                        }

                        if (!string.IsNullOrEmpty(receiver))
                        {
                            _sbSql.Append(" AND (REPORT_DATA_4 like '%" + receiver.substituteString() + "%' OR REPORT_DATA_11 like '%" + receiver.substituteString() + "%')");
                        }


                        if (!string.IsNullOrEmpty(fromDate) & !string.IsNullOrEmpty(toDate))
                        {
                            //If LocalDBType = DATABASE_TYPES.SQLSERVER.ToString Then

                            _sbSql.Append(" ) AS A WHERE ( REPORT_DATA_30 BETWEEN CONVERT(DATETIME,'" + fromDate + "',101) AND DATEADD(DAY,1,CONVERT(DATETIME,'" + toDate + "',101)) AND ( STATUS = 1 OR STATUS = 13 ))  ");
                            _sbSql.Append(" OR  ( RECEIPT_DATE BETWEEN CONVERT(DATETIME,'" + fromDate + "',101) AND DATEADD(DAY,1,CONVERT(DATETIME,'" + toDate + "',101)) AND STATUS = 0 ) ");
                            _sbSql.Append(" OR ( UPDATE_DATE BETWEEN CONVERT(DATETIME,'" + fromDate + " ',101) AND DATEADD(DAY,1,CONVERT(DATETIME,'" + toDate + "',101))) ");

                            //ElseIf LocalDBType = gstatAccessDB Then
                            //    _strSql = _strSql & " AND A.UPDATE_DATE <= #" & fromDate & "# AND A.UPDATE_DATE >= #" & toDate & "#+1"
                            //End If
                        }

                        if (_log.IsInfoEnabled)
                            _log.Info(methodBaseName + "Executing the following SQL : " + _sbSql.ToString());

                        try
                        {
                            var list1 = objContext.Database.SqlQuery<VM_MT_ATPAR_NOTES>(_sbSql.ToString()).ToList();
                            _dsTransactions = list1.ToDataSet();
                            if (_dsTransactions.Tables.Count > 0)
                            {
                                if (_dsTransactions.Tables[0].Rows.Count == 0)
                                {
                                    _StatusCode = AtparStatusCodes.E_NORECORDFOUND;
                                    if (_log.IsWarnEnabled)
                                        _log.Warn(methodBaseName + "AtparStatusCodes.E_NORECORDFOUND");

                                    return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                                }
                            }
                            else
                            {
                                _StatusCode = AtparStatusCodes.E_NORECORDFOUND;
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + "AtparStatusCodes.E_NORECORDFOUND");

                                return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                            }

                            //'For ReDeliver Scenarios

                            _dsTrans = _dsTransactions.Copy();

                            DataRow[] _dr = null;
                            _dr = _dsTransactions.Tables[0].Select("REDELIVER ='N'");
                            for (int i = 0; i <= _dr.Count() - 1; i++)
                            {
                                _dsTransactions.Tables[0].Rows.Remove(_dr[i]);
                            }
                            _dsTransactions.AcceptChanges();

                        }
                        catch (Exception ex)
                        {
                            _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "AtparStatusCodes.E_SERVERERROR : with Statuscode : " + _StatusCode + " : " + ex.ToString());

                            return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                        }
                        _strSql = null;
                        _strSql = new StringBuilder();

                        dtTransactions.TableName = "TRANSACTIONS";
                        string[] strTransFields = {
            "TRANSACTION_ID",
            "STATUS",
            "STATUS_MESSAGE",
            "PO_ID",
            "LINE",
            "INTTRACKING",
            "EXTTRACKING",
            "RECEPIENT",
            "LOCATION",
            "CARRIER_ID",
            "DEPT_ID",
            "REPORT_DATA_11",
            "ITEM_DESC",
            "REPORT_DATA_10",
            "KEY_1",
            "ITEM_ID",
            "QTY",
            "RECEIVE_USERID",
            "HAND_OVER_DATE",
            "USER_ID",
            "RECEIPT_DATE",
            "MFG_ITEM_ID",
            "UOM",
            "VENDOR",
            "SIGNATURE_ID",
            "UPDATE_DATE",
            "RECEIVER_NAME",
            "REDELIVER",
            "ITEM_NOTES"
        };
                        _StatusCode = BuildTable(dtTransactions, strTransFields);
                        if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                            functionReturnValue = _StatusCode;
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "ATPAR_E_LOCALDBSELECTFAIL :");

                            return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                        }

                        dtEventDetails.TableName = "EVENTDETAILS";
                        string[] strEventFields = {
            "TRANSACTION_ID",
            "EVENT_STATUS",
            "EVENT_STATUS_MESSAGE",
            "EVENT_DATE",
            "EVENT_USER",
            "SIGNATURE",
            "TRANS_ID",
            "DELIVERY_LOCATION"
        };
                        _StatusCode = BuildTable(dtEventDetails, strEventFields);

                        if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                            functionReturnValue = _StatusCode;
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL :");
                            return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                        }

                        dtAttempts.TableName = "ATTEMPTS";
                        string[] strAttemptFields = {
            "TRANSACTION_ID",
            "ATTEMPT_DATE",
            "COMMENT"
        };
                        _StatusCode = BuildTable(dtAttempts, strAttemptFields);
                        if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                            functionReturnValue = _StatusCode;
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL :");
                            return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                        }

                        for (int i = 0; i <= _dsTransactions.Tables[0].Rows.Count - 1; i++)
                        {
                            // binding the transaction datatable                
                            DataRow dr1 = default(DataRow);
                            dr1 = dtTransactions.NewRow();
                            dr1["TRANSACTION_ID"] = _dsTransactions.Tables[0].Rows[i]["TRANSACTION_ID"].ToString();
                            dr1["STATUS"] = _dsTransactions.Tables[0].Rows[i]["STATUS"].ToString();
                            dr1["STATUS_MESSAGE"] = string.Empty;
                            long a = Convert.ToInt64(_dsTransactions.Tables[0].Rows[i]["STATUS"]);
                            switch (a)
                            {
                                case (int)AtParWebEnums.STATUS.CANCELED:
                                    dr1["STATUS_MESSAGE"] = "Cancelled";
                                    break;
                                case (int)AtParWebEnums.STATUS.DELIVERED:
                                    dr1["STATUS_MESSAGE"] = "Delivered";
                                    break;
                                case (int)AtParWebEnums.STATUS.DOWNLOAD:
                                    dr1["STATUS_MESSAGE"] = "Download";
                                    break;
                                case (int)AtParWebEnums.STATUS.HANDOVER:
                                    dr1["STATUS_MESSAGE"] = "Handover";
                                    break;
                                case (int)AtParWebEnums.STATUS.LOAD:
                                    dr1["STATUS_MESSAGE"] = "Load";
                                    break;
                                case (int)AtParWebEnums.STATUS.PICKUP:
                                    dr1["STATUS_MESSAGE"] = "Pickup";
                                    break;
                                case (int)AtParWebEnums.STATUS.RECEIVE:
                                    dr1["STATUS_MESSAGE"] = "Receive";
                                    break;
                                case (int)AtParWebEnums.STATUS.UNLOAD:
                                    dr1["STATUS_MESSAGE"] = "Unload";
                                    break;
                            }
                            dr1["PO_ID"] = _dsTransactions.Tables[0].Rows[i]["PO_ID"].ToString();
                            dr1["LINE"] = _dsTransactions.Tables[0].Rows[i]["LINE"].ToString();
                            dr1["INTTRACKING"] = _dsTransactions.Tables[0].Rows[i]["INTTRACKING"].ToString();
                            dr1["EXTTRACKING"] = _dsTransactions.Tables[0].Rows[i]["EXTTRACKING"].ToString();
                            dr1["RECEPIENT"] = _dsTransactions.Tables[0].Rows[i]["RECEPIENT"].ToString();
                            dr1["LOCATION"] = _dsTransactions.Tables[0].Rows[i]["LOCATION"].ToString();
                            dr1["CARRIER_ID"] = _dsTransactions.Tables[0].Rows[i]["CARRIER_ID"].ToString();
                            dr1["DEPT_ID"] = _dsTransactions.Tables[0].Rows[i]["DEPT_ID"].ToString();
                            dr1["REPORT_DATA_11"] = _dsTransactions.Tables[0].Rows[i]["REPORT_DATA_11"].ToString();
                            dr1["ITEM_DESC"] = _dsTransactions.Tables[0].Rows[i]["ITEM_DESC"].ToString();
                            dr1["REPORT_DATA_10"] = _dsTransactions.Tables[0].Rows[i]["REPORT_DATA_10"].ToString();
                            dr1["KEY_1"] = _dsTransactions.Tables[0].Rows[i]["KEY_1"].ToString();
                            dr1["ITEM_ID"] = _dsTransactions.Tables[0].Rows[i]["ITEM_ID"].ToString();
                            dr1["QTY"] = _dsTransactions.Tables[0].Rows[i]["QTY"].ToString();
                            dr1["RECEIVE_USERID"] = _dsTransactions.Tables[0].Rows[i]["RECEIVE_USERID"].ToString();
                            dr1["HAND_OVER_DATE"] = _dsTransactions.Tables[0].Rows[i]["HAND_OVER_DATE"].ToString();
                            if (_dsTransactions.Tables[0].Rows[i]["USER_ID"].ToString() == string.Empty)
                            {
                                if (_dsTransactions.Tables[0].Rows[i]["HAND_OVER_DATE"].ToString() != string.Empty)
                                {
                                    if (_dsTransactions.Tables[0].Rows[i]["HAND_OVER_LOC"].ToString() != string.Empty)
                                    {
                                        dr1["USER_ID"] = _dsTransactions.Tables[0].Rows[i]["HAND_OVER_LOC"].ToString();
                                    }
                                }
                            }
                            else
                            {
                                dr1["USER_ID"] = _dsTransactions.Tables[0].Rows[i]["USER_ID"].ToString();
                            }
                            dr1["RECEIPT_DATE"] = _dsTransactions.Tables[0].Rows[i]["RECEIPT_DATE"].ToString();
                            dr1["MFG_ITEM_ID"] = _dsTransactions.Tables[0].Rows[i]["MFG_ITEM_ID"].ToString();
                            dr1["UOM"] = _dsTransactions.Tables[0].Rows[i]["UOM"].ToString();
                            dr1["VENDOR"] = _dsTransactions.Tables[0].Rows[i]["VENDOR"].ToString();
                            dr1["SIGNATURE_ID"] = _dsTransactions.Tables[0].Rows[i]["SIGNATURE_ID"].ToString();
                            if (int.Parse(_dsTransactions.Tables[0].Rows[i]["STATUS"]) == (int)AtParWebEnums.STATUS.CANCELED)
                            {
                                dr1["UPDATE_DATE"] = _dsTransactions.Tables[0].Rows[i]["UPDATE_DATE"].ToString();
                            }
                            else
                            {
                                dr1["UPDATE_DATE"] = _dsTransactions.Tables[0].Rows[i]["RECEIPT_DATE"].ToString();
                            }
                            dr1["REDELIVER"] = ((_dsTransactions.Tables[0].Rows[i]["REDELIVER"] == DBNull.Value) ? string.Empty : _dsTransactions.Tables[0].Rows[i]["REDELIVER"].ToString());
                            _strNotes = ((_dsTransactions.Tables[0].Rows[i]["ITEM_NOTES"] == DBNull.Value) ? string.Empty : _dsTransactions.Tables[0].Rows[i]["ITEM_NOTES"].ToString());
                            _strNotes = _strNotes.Replace("TRACKING NUMBER-", "");
                            dr1["ITEM_NOTES"] = _strNotes.ToString();

                            DataSet dsBadgeDetails = new DataSet();

                            try
                            {
                                var badgeResultList = _deliveryRepo.GetBadgeDetails(_dsTransactions.Tables[0].Rows[i]["RECEIVER_NAME"].ToString());
                                if (badgeResultList.Count > 0)
                                {
                                    dsBadgeDetails = badgeResultList.ToDataSet();
                                }

                                if (_StatusCode == AtparStatusCodes.ATPAR_OK)
                                {
                                    if (dsBadgeDetails.Tables.Count > 0)
                                    {
                                        if (dsBadgeDetails.Tables[0].Rows.Count > 0)
                                        {
                                            _dsTransactions.Tables[0].Rows[i]["RECEIVER_NAME"] = dsBadgeDetails.Tables[0].Rows[0]["RECIEPENTNAME"];
                                            dr1["RECEIVER_NAME"] = _dsTransactions.Tables[0].Rows[i]["RECEIVER_NAME"];
                                        }
                                        else
                                        {
                                            dr1["RECEIVER_NAME"] = _dsTransactions.Tables[0].Rows[i]["RECEIVER_NAME"];
                                        }

                                    }
                                    else
                                    {
                                        if ((_dsTransactions.Tables[0].Rows[i]["RECEIVER_NAME"] != null))
                                        //if ( ! string.IsNullOrEmpty(_dsTransactions.Tables[0].Rows[i]["RECEIVER_NAME"]))
                                        {
                                            dr1["RECEIVER_NAME"] = _dsTransactions.Tables[0].Rows[i]["RECEIVER_NAME"];
                                        }
                                        else
                                        {
                                            dr1["RECEIVER_NAME"] = string.Empty;
                                        }

                                    }
                                }
                                else
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to get badge details ");
                                    return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                                }

                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed to get the badge details  " + ex.ToString());

                                return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, AtparStatusCodes.E_SERVERERROR);
                            }
                            finally
                            {
                                dsBadgeDetails = null;
                            }
                            // end of binding the transaction datatable

                            //Finding related trasaction Ids for ReDeliver PO's
                            DataRow[] _drTrans = null;
                            StringBuilder _strSelect = new StringBuilder();
                            string _strTransIds = string.Empty;

                            _strSelect.Append("PO_ID =");
                            _strSelect.Append("'" + _dsTransactions.Tables[0].Rows[i]["PO_ID"] + "'");
                            _strSelect.Append(" AND LINE =");
                            _strSelect.Append("'" + _dsTransactions.Tables[0].Rows[i]["LINE"] + "'");
                            _strSelect.Append(" AND SCH_LINE_NO =");
                            _strSelect.Append("'" + _dsTransactions.Tables[0].Rows[i]["SCH_LINE_NO"] + "'");
                            _strSelect.Append(" AND INTTRACKING =");
                            _strSelect.Append("'" + _dsTransactions.Tables[0].Rows[i]["INTTRACKING"] + "'");
                            _strSelect.Append(" AND OLD_LOCATION =");
                            _strSelect.Append("'" + _dsTransactions.Tables[0].Rows[i]["OLD_LOCATION"] + "'");
                            _strSelect.Append(" AND RECEIPT_DATE =");
                            _strSelect.Append("'" + _dsTransactions.Tables[0].Rows[i]["RECEIPT_DATE"] + "'");
                            _strSelect.Append(" AND ITEM_ID =");
                            _strSelect.Append("'" + _dsTransactions.Tables[0].Rows[i]["ITEM_ID"] + "'");

                            _drTrans = _dsTrans.Tables[0].Select(_strSelect.ToString());

                            for (int _intCnt = 0; _intCnt <= _drTrans.Count() - 1; _intCnt++)
                            {
                                if (_strTransIds != string.Empty)
                                {
                                    _strTransIds = _strTransIds + "," + _drTrans[_intCnt]["TRANSACTION_ID"];
                                }
                                else
                                {
                                    _strTransIds = _drTrans[_intCnt]["TRANSACTION_ID"].ToString();
                                }

                                if ((_drTrans[_intCnt]["ITEM_NOTES"] != DBNull.Value))
                                {
                                    if (!string.IsNullOrEmpty(_drTrans[_intCnt]["ITEM_NOTES"].ToString()))
                                    {
                                        dr1["ITEM_NOTES"] = _drTrans[_intCnt]["ITEM_NOTES"].ToString().Replace("TRACKING NUMBER-", "");
                                    }
                                }
                            }

                            // getting events
                            _strSql.Append(" SELECT EVENT_ID,UPDATE_DATE,USER_ID, TRANSACTION_ID FROM MT_DELV_ITEM_TRIP_MISC_EVENT WHERE TRANSACTION_ID IN (" + _strTransIds + ") UNION SELECT  EVENT_ID,UPDATE_DATE,USER_ID, TRANSACTION_ID  FROM MT_DELV_ITEM_TRIP WHERE " + " TRANSACTION_ID IN (" + _strTransIds + ") ORDER BY  UPDATE_DATE, TRANSACTION_ID, EVENT_ID");


                            if (_log.IsInfoEnabled)
                                _log.Info(methodBaseName + " GetTransactionDetails : executing the following SQL to get the events : " + _strSql);
                            try
                            {

                                var list2 = objContext.Database.SqlQuery<MT_DELV_ITEM_TRIP>(_strSql.ToString()).ToList();
                                _dsEvent = new DataSet();
                                _dsEvent = list2.ToDataSet();
                            }
                            catch (Exception ex)
                            {
                                _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "AtparStatusCodes.E_SERVERERROR : with Statuscode : " + _StatusCode + " : " + ex.ToString());

                                return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                            }
                            finally
                            {
                                _strTransIds = string.Empty;
                                _drTrans = null;
                                _strSelect = null;
                            }
                            _strSql = null;
                            _strSql = new StringBuilder();


                            _strUserID = _dsTransactions.Tables[0].Rows[i]["USER_ID"].ToString();

                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " User ID: " + _strUserID);

                            _strSql.Append("SELECT PARAMETER_VALUE FROM MT_ATPAR_ORG_GROUP_PARAMETERS A, " + "MT_ATPAR_USER_ORG_GROUPS B WHERE A.ORG_GROUP_ID =B.ORG_GROUP_ID " + "AND B.USER_ID ='" + _strUserID + "' " + "AND A.APP_ID =6 AND A.PARAMETER_ID='SHOW_SIGN_IN_TRACKREPORT'");

                            if (_log.IsInfoEnabled)
                                _log.Info(methodBaseName + "SHOW_SIGN_IN_TRACKREPORT SQL : " + _strSql);

                            try
                            {

                                _strOrgParam = objContext.Database.SqlQuery<string>(_strSql.ToString()).FirstOrDefault().ToString();
                                //if (list3.Count>0)
                                //{ 
                                //_dsOrgParam = list3.ToDataSet();
                                //}
                                //if (_dsOrgParam != null)
                                //{
                                //    if (_dsOrgParam.Tables.Count > 0)
                                //    {
                                //        if (_dsOrgParam.Tables[0].Rows.Count > 0)
                                //        {
                                //            _strOrgParam = _dsOrgParam.Tables[0].Rows[0]["PARAMETER_VALUE"].ToString();
                                //        }
                                //    }
                                //}
                            }
                            catch (Exception ex)
                            {
                                _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "AtparStatusCodes.E_SERVERERROR : with Statuscode : " + _StatusCode + " : " + ex.ToString());
                                return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                            }
                          

                            // binding the events datatable
                            if (_dsEvent != null)
                            {
                                _strSql = null;
                                _strSql = new StringBuilder();

                                if (_dsEvent.Tables.Count > 0)
                                {
                                    if (_dsEvent.Tables[0].Rows.Count > 0)
                                    {
                                        for (int j = 0; j <= _dsEvent.Tables[0].Rows.Count - 1; j++)
                                        {
                                            _strSql = null;
                                            _strSql = new StringBuilder();
                                            _strEventStatus = string.Empty;
                                            DataRow dr = default(DataRow);
                                            dr = dtEventDetails.NewRow();
                                            //dr("TRANSACTION_ID") = _dsEvent.Tables[0].Rows[j]("TRANSACTION_ID"].ToString()
                                            dr["TRANSACTION_ID"] = _dsTransactions.Tables[0].Rows[i]["TRANSACTION_ID"].ToString();
                                            dr["TRANS_ID"] = _dsEvent.Tables[0].Rows[j]["TRANSACTION_ID"].ToString();
                                            dr["EVENT_STATUS"] = _dsEvent.Tables[0].Rows[j]["EVENT_ID"].ToString();
                                            dr["EVENT_STATUS_MESSAGE"] = string.Empty;
                                            dr["SIGNATURE"] = string.Empty;
                                            dr["DELIVERY_LOCATION"] = string.Empty;
                                            long b = Convert.ToInt64(_dsEvent.Tables[0].Rows[j]["EVENT_ID"].ToString());
                                            switch (b)
                                            {
                                                case (int)AtParWebEnums.STATUS.CANCELED:
                                                    dr["EVENT_STATUS_MESSAGE"] = "Cancelled";
                                                    break;
                                                case (int)AtParWebEnums.STATUS.DELIVERED:
                                                    if (j == _dsEvent.Tables[0].Rows.Count - 1)
                                                    {
                                                        if (((_dsTransactions.Tables[0].Rows[i]["REDELIVER"] == DBNull.Value) ? string.Empty : _dsTransactions.Tables[0].Rows[i]["REDELIVER"].ToString()) == "Y")
                                                        {
                                                            dr["EVENT_STATUS_MESSAGE"] = "ReDelivered";
                                                        }
                                                        else
                                                        {
                                                            dr["EVENT_STATUS_MESSAGE"] = "Delivered";
                                                        }
                                                    }
                                                    else
                                                    {
                                                        dr["EVENT_STATUS_MESSAGE"] = "Delivered";
                                                    }

                                                    // getting the signature based on the org param value
                                                    if (_strOrgParam == "Y")
                                                    {
                                                        DataRow[] drSignRows = null;
                                                        string strSign = string.Empty;

                                                        drSignRows = _dsTrans.Tables[0].Select("TRANSACTION_ID='" + _dsEvent.Tables[0].Rows[j]["TRANSACTION_ID"].ToString() + "'");

                                                        if (drSignRows.Length > 0)
                                                        {
                                                            strSign = drSignRows[0]["SIGNATURE_ID"].ToString();
                                                        }

                                                        if (!string.IsNullOrEmpty(strSign))
                                                        {
                                                            _strSql.Append("SELECT SIGNATURE FROM MT_DELV_RECV_SIGNATURE WHERE SIGNATURE_ID =" + strSign);

                                                            if (_log.IsInfoEnabled)
                                                                _log.Info(methodBaseName + "Select Signature : " + _strSql);

                                                            try
                                                            {
                                                                _strSignature = objContext.Database.SqlQuery<string>(_strSql.ToString()).FirstOrDefault();
                                                            }
                                                            catch (Exception ex)
                                                            {
                                                                _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                                                if (_log.IsFatalEnabled)
                                                                    _log.Fatal(methodBaseName + "AtparStatusCodes.E_SERVERERROR : with Statuscode : " + _StatusCode + " : " + ex.ToString());
                                                                return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                                                                //Exit Function
                                                            }
                                                        }
                                                    }
                                                    else
                                                    {
                                                        _strSignature = string.Empty;
                                                    }
                                                    // end of signature org param checking


                                                    if (!string.IsNullOrEmpty(_strSignature))
                                                        dr["SIGNATURE"] = _strSignature;

                                                    string path = AppDomain.CurrentDomain.BaseDirectory[0].ToString() + ":\\AtPar\\AtParWebApi\\Uploaded\\";

                                                    _log.Debug(path + " Signature Path");

                                                    if (!Directory.Exists(path)) //Check if directory exist
                                                    {
                                                        Directory.CreateDirectory(path); //Create directory if it doesn't exist
                                                    }
                                                    string strPath = path + dr["TRANSACTION_ID"].ToString() + ".jpg";


                                                   // string strPath = AppDomain.CurrentDomain.BaseDirectory + "\\ImageStorage\\" + dr["TRANSACTION_ID"].ToString() + ".jpg";
                                                    dr["SIGNATURE"] = ObjVButil.Signature(strPath, _strSignature);
                                                    break;
                                                case (int)AtParWebEnums.STATUS.DOWNLOAD:
                                                    dr["EVENT_STATUS_MESSAGE"] = "Download";
                                                    break;
                                                case (int)AtParWebEnums.STATUS.HANDOVER:
                                                    dr["EVENT_STATUS_MESSAGE"] = "Handover";
                                                    break;
                                                case (int)AtParWebEnums.STATUS.LOAD:
                                                    dr["EVENT_STATUS_MESSAGE"] = "Load";
                                                    break;
                                                case (int)AtParWebEnums.STATUS.PICKUP:
                                                    dr["EVENT_STATUS_MESSAGE"] = "Pickup";
                                                    break;
                                                case (int)AtParWebEnums.STATUS.RECEIVE:
                                                    dr["EVENT_STATUS_MESSAGE"] = "Receive";
                                                    break;
                                                case (int)AtParWebEnums.STATUS.UNLOAD:
                                                    dr["EVENT_STATUS_MESSAGE"] = "Unload";
                                                    break;
                                            }
                                            dr["EVENT_DATE"] = _dsEvent.Tables[0].Rows[j]["UPDATE_DATE"].ToString();
                                            dr["EVENT_USER"] = _dsEvent.Tables[0].Rows[j]["USER_ID"].ToString();
                                            if (int.Parse(_dsTransactions.Tables[0].Rows[i]["STATUS"]) != (int)AtParWebEnums.STATUS.CANCELED)
                                            {
                                                dr1["UPDATE_DATE"] = _dsEvent.Tables[0].Rows[j]["UPDATE_DATE"].ToString();
                                            }
                                            _strSql = null;
                                            _strSql = new StringBuilder();
                                            //getting Delivery Location
                                            DataRow[] drDeliveryLocation = null;
                                            string strDeliveryLocation = string.Empty;

                                            drDeliveryLocation = _dsTrans.Tables[0].Select("TRANSACTION_ID='" + _dsEvent.Tables[0].Rows[j]["TRANSACTION_ID"].ToString() + "'");

                                            if (drDeliveryLocation.Length > 0)
                                            {
                                                strDeliveryLocation = drDeliveryLocation[0]["TRANSACTION_ID"].ToString();
                                            }

                                            if (!string.IsNullOrEmpty(strDeliveryLocation))
                                            {
                                                _strSql.Append("SELECT REPORT_DATA_32 FROM MT_ATPAR_DETAIL_TRANSACTION WHERE TRANSACTION_ID =" + strDeliveryLocation);

                                                if (_log.IsInfoEnabled)
                                                    _log.Info(methodBaseName + "Select DeliveryLocation : " + _strSql);

                                                try
                                                {
                                                    //if (Information.IsDBNull(m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSql))))
                                                    //{
                                                    //    _strDeliveryLocation = "";
                                                    //}
                                                    //else
                                                    //{

                                                    _strDeliveryLocation = objContext.Database.SqlQuery<string>(_strSql.ToString()).FirstOrDefault();
                                                    //}
                                                }
                                                catch (Exception ex)
                                                {
                                                    _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                                    if (_log.IsFatalEnabled)
                                                        _log.Fatal(methodBaseName + "AtparStatusCodes.E_SERVERERROR : with Statuscode : " + _StatusCode + " : " + ex.ToString());
                                                    return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                                                    //Exit Function
                                                }
                                                if (!string.IsNullOrEmpty(_strDeliveryLocation))
                                                    dr["DELIVERY_LOCATION"] = _strDeliveryLocation;
                                            }
                                            //End Delivery Location
                                            _strEventStatus = dr["EVENT_STATUS_MESSAGE"].ToString();

                                            dtEventDetails.Rows.Add(dr);
                                        }
                                    }
                                }
                            }
                            // end of binding the events datatable

                            if (dr1["STATUS_MESSAGE"].ToString() == "Receive" | dr1["STATUS_MESSAGE"].ToString() == "Cancelled")
                            {
                                DataRow dr = default(DataRow);
                                dr = dtEventDetails.NewRow();
                                dr["TRANSACTION_ID"] = _dsTransactions.Tables[0].Rows[i]["TRANSACTION_ID"].ToString();
                                dr["EVENT_STATUS"] = _dsTransactions.Tables[0].Rows[i]["STATUS"].ToString();
                                dr["EVENT_STATUS_MESSAGE"] = dr1["STATUS_MESSAGE"];
                                dr["SIGNATURE"] = string.Empty;
                                if (dr1["STATUS_MESSAGE"].ToString() == "Cancelled")
                                {
                                    dr["EVENT_DATE"] = _dsTransactions.Tables[0].Rows[i]["UPDATE_DATE"].ToString();
                                }
                                else
                                {
                                    dr["EVENT_DATE"] = _dsTransactions.Tables[0].Rows[i]["RECEIPT_DATE"].ToString();
                                }
                                dr["EVENT_USER"] = _dsTransactions.Tables[0].Rows[i]["USER_ID"].ToString();
                                _strEventStatus = dr["EVENT_STATUS_MESSAGE"].ToString();
                                dtEventDetails.Rows.Add(dr);
                            }

                            dtTransactions.Rows.Add(dr1);

                            if (!string.IsNullOrEmpty(_strEventStatus))
                            {
                                dr1["STATUS_MESSAGE"] = _strEventStatus;
                            }

                            _strSql = null;
                            _strSql = new StringBuilder();
                            // getting attempts
                            _strSql.Append("SELECT ATTEMPT_DATE,COMMENT FROM MT_DELV_DLVR_ATTEMPT WHERE TRANSACTION_ID=" + _dsTransactions.Tables[0].Rows[i]["TRANSACTION_ID"] + " ORDER BY TRANSACTION_ID");
                            if (_log.IsInfoEnabled)
                                _log.Info(methodBaseName + " GetTransactionDetails : executing the following SQL to get the individual Attempts : " + _strSql);

                            try
                            {
                                var fields = new[] { "ATTEMPT_DATE", "COMMENT" };
                                //_dsAttempt = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_strSql));
                                var list3 = objContext.Database.DifferedExecuteQuery<MT_DELV_DLVR_ATTEMPT>(fields, _strSql.ToString()).ToList();
                                _dsAttempt = list3.ToDataSet();

                            }
                            catch (Exception ex)
                            {
                                _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "AtparStatusCodes.E_SERVERERROR : with Statuscode : " + _StatusCode + " : " + ex.ToString());
                                return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, _StatusCode);
                            }
                            _strSql = null;
                            _strSql = new StringBuilder();

                            // binding the attempt datatable
                            if (_dsAttempt != null)
                            {
                                if (_dsAttempt.Tables.Count > 0)
                                {
                                    if (_dsAttempt.Tables[0].Rows.Count > 0)
                                    {
                                        for (int k = 0; k <= _dsAttempt.Tables[0].Rows.Count - 1; k++)
                                        {
                                            DataRow dr = default(DataRow);
                                            dr = dtAttempts.NewRow();
                                            dr["TRANSACTION_ID"] = _dsTransactions.Tables[0].Rows[i]["TRANSACTION_ID"].ToString();
                                            dr["ATTEMPT_DATE"] = _dsAttempt.Tables[0].Rows[k]["ATTEMPT_DATE"].ToString();
                                            dr["COMMENT"] = _dsAttempt.Tables[0].Rows[k]["COMMENT"].ToString();
                                            dtAttempts.Rows.Add(dr);
                                        }
                                    }
                                }
                            }
                            // end of binding the attempt datatable
                            pDetailsFlag = true;
                        }

                        DataColumn dcDate = new DataColumn("EVENT_DATE");
                        dcDate.DataType = Type.GetType("System.String");

                        dtTransactions.Columns.Add(dcDate);

                        for (int i = 0; i <= dtTransactions.Rows.Count - 1; i++)
                        {
                            for (int j = 0; j <= dtEventDetails.Rows.Count - 1; j++)
                            {
                                if (dtTransactions.Rows[i]["TRANSACTION_ID"] == dtEventDetails.Rows[j]["TRANSACTION_ID"])
                                {
                                    dtTransactions.Rows[i]["EVENT_DATE"] = dtEventDetails.Rows[j]["EVENT_DATE"];
                                }
                            }
                        }


                        //To fill the Dataset with two different data tables namely Deliver Report and Deliver Details
                        dtTransactions.TableName = "HEADERS";
                        dtEventDetails.TableName = "DETAILS";
                        dtAttempts.TableName = "ATTEMPTS";
                        pDsDetails.Tables.Add(dtTransactions);
                        pDsDetails.Tables.Add(dtEventDetails);
                        pDsDataArrayAttempt.Tables.Add(dtAttempts);
                        //_dsEvent.Dispose();
                        //_dsAttempt.Dispose();
                        //_dsTransactions.Dispose();


                        return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, AtparStatusCodes.ATPAR_OK);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + "AtparStatusCodes.E_SERVERERROR :" + ex.ToString());
                    }
                    return new Tuple<DataSet, bool, DataSet, long>(pDsDetails, pDetailsFlag, pDsDataArrayAttempt, AtparStatusCodes.ATPAR_OK);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ex.ToString());
                }
                return new Tuple<DataSet, bool, DataSet, long>(null, false, null, AtparStatusCodes.E_SERVERERROR);
            }
        }

        public long ValidateSystemID(string systemID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();


            try
            {
                using (ATPAR_MASTER_Context objContext = new ATPAR_MASTER_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    SqlParameter[] sqlParms = new SqlParameter[1];
                    sqlParms[0] = new SqlParameter("@SystemId", SqlDbType.NVarChar);
                    sqlParms[0].Value = systemID;



                    //object[] parameters = { _sql_param_systemid };

                    sbSql.Append("EXEC ATPAR_SP_VALIDATESYSTEM ").Append("'").Append(sqlParms[0].Value.ToString()).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    System.Int32 stat = objContext.Database.SqlQuery<System.Int32>(sbSql.ToString()).FirstOrDefault();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Status Returned" + stat); }

                    if (stat == 0)
                    {
                        return AtparStatusCodes.ATPAR_E_SYSTEMMISMATCH;
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

        private long BuildTable(DataTable dt, string[] strFields)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                for (int i = 0; i <= strFields.Length - 1; i++)
                {
                    dt.Columns.Add(new DataColumn(strFields[i].ToString()));
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "AtparStatusCodes.E_SERVERERROR : Failed to create the datatable" + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        public class VM_MT_ATPAR_NOTES
        {
            public int TRANSACTION_ID { get; set; }
            public int? STATUS { get; set; }
            public string PO_ID { get; set; }
            public int? LINE { get; set; }
            public string INTTRACKING { get; set; }
            public string EXTTRACKING { get; set; }
            public string RECEPIENT { get; set; }
            public string LOCATION { get; set; }
            public string OLD_LOCATION { get; set; }
            public string CARRIER_ID { get; set; }
            public string DEPT_ID { get; set; }
            public string REPORT_DATA_11 { get; set; }
            public string ITEM_DESC { get; set; }
            public string REPORT_DATA_10 { get; set; }
            public string KEY_1 { get; set; }
            public int? SCH_LINE_NO { get; set; }
            public string HAND_OVER_LOC { get; set; }
            public string ITEM_ID { get; set; }
            public Nullable<double> QTY { get; set; }
            public string RECEIVE_USERID { get; set; }
            public Nullable<DateTime> HAND_OVER_DATE { get; set; }
            public string USER_ID { get; set; }
            public Nullable<DateTime> RECEIPT_DATE { get; set; }
            public string MFG_ITEM_ID { get; set; }
            public string UOM { get; set; }
            public string VENDOR { get; set; }
            public int? SIGNATURE_ID { get; set; }
            public Nullable<DateTime> UPDATE_DATE { get; set; }
            public string RECEIVER_NAME { get; set; }
            public string REDELIVER { get; set; }
            public string ITEM_NOTES { get; set; }
            public Nullable<DateTime> REPORT_DATA_30 { get; set; }
        }
    }
}

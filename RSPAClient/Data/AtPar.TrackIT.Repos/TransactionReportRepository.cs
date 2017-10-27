using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace AtPar.TrackIT.Repos
{
    public class TransactionReportRepository : ITransactionReportRepository
    {
        private ILog _log;
        public TransactionReportRepository(ILog log)
        {
            _log = log;
        }
        public long GetTransRep(string pItemId, string pFrmdate, string pTodate, ref DataSet pDsTransRep, string pItemDescr, string pSerial, string pDeptID, string[] pDeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            DataSet _dsRep = null;
            DataSet _dsEvents = null;
            DataSet _dsReqst = null;
            DataSet _dsMove = null;
            DataTable _retTbl = null;
            DataRow _retRow = null;
            DataSet _dsTemp = null;
            Boolean _blnCreatOnly = false;
            StringBuilder _sbSQL = new StringBuilder();
            Boolean _blnFirstCond = true;
            string _strCreateDate = string.Empty;
            string _strCheckInDate = string.Empty;
            long _lngTransID = -1;
            long _statusCode = -1;
            int _intOrderNo=0;
            DateTime datetVar;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (_sbSQL.Length > 0)
                    {
                        _sbSQL.Remove(0, _sbSQL.Length);
                    }

                    _retTbl = new DataTable("TRANSACTION");
                    _retTbl.Columns.Add("Trans_Date", Type.GetType("System.String"));
                    _retTbl.Columns.Add("Trans_Type", Type.GetType("System.String"));
                    _retTbl.Columns.Add("ItemID", Type.GetType("System.String"));
                    _retTbl.Columns.Add("Serial", Type.GetType("System.String"));
                    _retTbl.Columns.Add("Item Description", Type.GetType("System.String"));
                    _retTbl.Columns.Add("Location", Type.GetType("System.String"));
                    _retTbl.Columns.Add("Qty", Type.GetType("System.String"));
                    _retTbl.Columns.Add("UserID", Type.GetType("System.String"));
                    _retTbl.Columns.Add("DeptID", Type.GetType("System.String"));

                    _sbSQL.Append("SELECT C.ITEM_ID, C.ITEM_DESCR, C.ITEM_QTY, C.SERIAL_NO, D.KEY_2 ");
                    _sbSQL.Append(", ORDER_NO = CASE ISNULL(D.KEY_3, 0) WHEN 'NULL' THEN 0 ELSE D.KEY_3 END ");
                    _sbSQL.Append(", C.STORAGE_LOCATION, C.CHECKIN_DATE, C.UPDATE_DATE, C.UPDATE_USER_ID, C.DESTRUCTION_DATE, ");
                    _sbSQL.Append("C.ITEM_INACTIVATED, C.CREATE_DATE, C.OWNER, D.TRANSACTION_ID, ");
                    _sbSQL.Append(" (SELECT FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'(' + USER_ID + ')' AS USER_ID ");
                    _sbSQL.Append(" FROM MT_ATPAR_USER WHERE USER_ID= C.CREATE_USERID ) AS CREATE_USERID, ");
                    _sbSQL.Append("D.KEY_6 AS REQUEST_QTY, D.STATUS, D.REPORT_DATA_25 AS DEPT_ID, ");
                    _sbSQL.Append("REPORT_DATA_5 AS DELIVERY_LOCATION FROM ");
                    _sbSQL.Append("(SELECT A.ITEM_ID, A.ITEM_DESCR, B.ITEM_QTY, ISNULL(B.SERIAL_NO, 0) SERIAL_NO, ");
                    _sbSQL.Append("B.STORAGE_LOCATION, B.CHECKIN_DATE, B.UPDATE_DATE, B.UPDATE_USER_ID, A.DESTRUCTION_DATE,");
                    _sbSQL.Append("A.ITEM_INACTIVATED, A.CREATE_DATE, A.CREATE_USERID, B.OWNER ");
                    _sbSQL.Append("FROM TKIT_ITEM_MASTER A LEFT OUTER JOIN TKIT_ITEM_INVENTORY B ON A.ITEM_ID = B.ITEM_ID ");
                    _sbSQL.Append("AND A.ITEM_TYPE= B.ITEM_TYPE WHERE ");
                    _sbSQL.Append(" B.UPDATE_DATE >= CONVERT(DATETIME, '" + pFrmdate + "', 101)");
                    _sbSQL.Append(" AND B.UPDATE_DATE <= DATEADD(day, 1, CONVERT(DATETIME, '" + pTodate + "', 101)) ");
                    if (!string.IsNullOrEmpty(pItemId))
                    {
                        _sbSQL.Append(" AND A.ITEM_ID = '" + pItemId + "'");
                        _blnFirstCond = false;
                    }

                    if (!string.IsNullOrEmpty(pItemDescr))
                    {
                        if (!_blnFirstCond)
                        {
                            _sbSQL.Append(" AND A.ITEM_DESCR LIKE '" + pItemDescr.ToString().Replace("'", "''") + "%'");
                        }
                        else
                        {
                            _sbSQL.Append(" AND A.ITEM_DESCR LIKE '" + pItemDescr.ToString().Replace("'", "''") + "%'");
                            _blnFirstCond = false;
                        }
                    }

                    if (!string.IsNullOrEmpty(pSerial))
                    {
                        if (!_blnFirstCond)
                        {
                            _sbSQL.Append(" AND B.SERIAL_NO LIKE '" + pSerial + "%'");
                        }
                        else
                        {
                            _sbSQL.Append(" AND B.SERIAL_NO LIKE '" + pSerial + "%'");
                        }
                    }

                    _sbSQL.Append(" ) C INNER JOIN ");
                    _sbSQL.Append("MT_ATPAR_DETAIL_TRANSACTION D ON C.ITEM_ID = D.KEY_5 ");
                    _sbSQL.Append("WHERE(D.APP_ID = " + (int)AtParWebEnums.EnumApps.TrackIT + " ");
                    _sbSQL.Append("AND  (C.SERIAL_NO IS NULL OR C.SERIAL_NO = '' OR SERIAL_NO = '0' OR C.SERIAL_NO = D.KEY_2) ");
                    _sbSQL.Append("AND D.STATUS <> " + (int)AtParWebEnums.AppTransactionStatus.Cancel + ")");

                    if (pDeptID != "ALL")
                    {
                        _sbSQL.Append(" AND D.REPORT_DATA_25 = '" + pDeptID + "'");

                    }

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                    }

                    var fields = new[] { "ITEM_ID", "ITEM_DESCR", "ITEM_QTY", "SERIAL_NO", "KEY_2", "ORDER_NO", "STORAGE_LOCATION", "CHECKIN_DATE", "UPDATE_DATE", "UPDATE_USER_ID", "DESTRUCTION_DATE", "ITEM_INACTIVATED", "CREATE_DATE", "OWNER", "TRANSACTION_ID", "CREATE_USERID","REQUEST_QTY","STATUS", "DEPT_ID", "DELIVERY_LOCATION" };
                    var lstrep = objContext.Database.DifferedExecuteQuery<VM_TKIT_TRANSACTION_DETAILS>(fields, _sbSQL.ToString()).ToList();
                    _dsRep = lstrep.ToDataSet();

                    if (_dsRep.Tables[0].Rows.Count == 0)
                    {
                        _blnFirstCond = true;
                        _sbSQL.Remove(0, _sbSQL.Length);
                        _sbSQL.Append("SELECT A.ITEM_ID, A.ITEM_DESCR, B.ITEM_QTY, ISNULL(B.SERIAL_NO,0) SERIAL_NO, ");
                        _sbSQL.Append("B.STORAGE_LOCATION, B.CHECKIN_DATE, B.UPDATE_DATE, B.UPDATE_USER_ID, ");
                        _sbSQL.Append("A.DESTRUCTION_DATE, A.ITEM_INACTIVATED, A.CREATE_DATE, B.OWNER, ");
                        _sbSQL.Append(" (SELECT FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'(' + USER_ID + ')' AS USER_ID ");
                        _sbSQL.Append(" FROM MT_ATPAR_USER WHERE USER_ID= A.CREATE_USERID ) AS CREATE_USERID ");
                        _sbSQL.Append("FROM ");
                        _sbSQL.Append("TKIT_ITEM_MASTER A LEFT OUTER JOIN TKIT_ITEM_INVENTORY B ON ");
                        _sbSQL.Append("A.ITEM_ID = B.ITEM_ID ");
                        _sbSQL.Append("AND A.ITEM_TYPE= B.ITEM_TYPE ");
                        _sbSQL.Append("WHERE B.UPDATE_DATE >= CONVERT(DATETIME, '" + pFrmdate + "', 101)");
                        _sbSQL.Append(" AND B.UPDATE_DATE <= DATEADD(day, 1, CONVERT(DATETIME, '" + pTodate + "', 101)) ");

                        string whereclause = string.Empty;
                        whereclause = " AND 1=1";

                        if (!string.IsNullOrEmpty(pItemId))
                        {
                            whereclause += " AND A.ITEM_ID = '" + pItemId + "'";
                        }
                        if (!string.IsNullOrEmpty(pItemDescr))
                        {
                            whereclause += "AND A.ITEM_DESCR LIKE '" + pItemDescr.ToString().Replace("'", "''") + "%'";
                        }
                        if (!string.IsNullOrEmpty(pSerial))
                        {
                            whereclause += "AND B.SERIAL_NO LIKE '" + pSerial + "%'";
                        }
                        _sbSQL.Append(whereclause);

                        if (pDeptID != "ALL")
                        {
                            _sbSQL.Append(" AND B.OWNER = '" + pDeptID + "'");
                        }

                        _sbSQL.Append(" ORDER BY A.ITEM_ID");

                        if (_log.IsInfoEnabled)
                        {
                            _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                        }

                        var fields1 = new[] { "ITEM_ID", "ITEM_DESCR", "ITEM_QTY", "SERIAL_NO", "STORAGE_LOCATION", "CHECKIN_DATE", "UPDATE_DATE", "UPDATE_USER_ID", "DESTRUCTION_DATE", "ITEM_INACTIVATED", "CREATE_DATE", "OWNER", "CREATE_USERID" };
                        var lstrep1 = objContext.Database.DifferedExecuteQuery<VM_TKIT_TRANSACTION_DETAILS>(fields1, _sbSQL.ToString()).ToList();
                        _dsRep = lstrep1.ToDataSet();

                        if (_dsRep.Tables[0].Rows.Count == 0)
                        {
                            return AtparStatusCodes.E_NORECORDFOUND;
                        }
                        else
                        {
                            _blnCreatOnly = true;
                        }
                    }

                    if (_dsRep.Tables[0].Rows[0]["CREATE_DATE"] != DBNull.Value)
                    {
                        datetVar = Convert.ToDateTime(_dsRep.Tables[0].Rows[0]["CREATE_DATE"]);
                        _strCreateDate = datetVar.ToString("MM/dd/yyyy");
                        if (_dsRep.Tables[0].Columns.Contains("CHECKIN_DATE"))
                        {
                            if (_dsRep.Tables[0].Rows[0]["CHECKIN_DATE"] != DBNull.Value)
                            {
                                datetVar = Convert.ToDateTime(_dsRep.Tables[0].Rows[0]["CHECKIN_DATE"]);
                                datetVar.ToString("MM/dd/yyyy");
                            }
                        }

                        _retRow = _retTbl.NewRow();
                        datetVar = Convert.ToDateTime(_dsRep.Tables[0].Rows[0]["CREATE_DATE"]);
                        //_retRow["Trans_Date"] = Format(datetVar, "MM/dd hh:mm tt");
                        _retRow["Trans_Date"] = datetVar.ToString("MM/dd hh:mm tt");
                        _retRow["Trans_Type"] = AtParWebEnums.Tkit_TransType_Enum.Create.ToString();
                        _retRow["ItemID"] = _dsRep.Tables[0].Rows[0]["ITEM_ID"].ToString();
                        _retRow["Serial"] = String.Empty;
                        _retRow["Item Description"] = _dsRep.Tables[0].Rows[0]["ITEM_DESCR"].ToString();
                        _retRow["Location"] = _dsRep.Tables[0].Rows[0]["STORAGE_LOCATION"].ToString();
                        _retRow["Qty"] = _dsRep.Tables[0].Rows[0]["ITEM_QTY"].ToString();
                        _retRow["UserID"] = _dsRep.Tables[0].Rows[0]["CREATE_USERID"].ToString();
                        _retRow["DeptID"] = _dsRep.Tables[0].Rows[0]["OWNER"].ToString();
                        _retTbl.Rows.Add(_retRow);

                        _retRow = _retTbl.NewRow();
                        if (_dsRep.Tables[0].Columns.Contains("CHECKIN_DATE"))
                        {
                            if (_dsRep.Tables[0].Rows[0]["CHECKIN_DATE"] != DBNull.Value)
                            {
                                datetVar = Convert.ToDateTime(_dsRep.Tables[0].Rows[0]["CHECKIN_DATE"]);
                            }
                        }
                        _retRow["Trans_Type"] = AtParWebEnums.Tkit_TransType_Enum.CheckIn.ToString();
                        _retRow["ItemID"] = _dsRep.Tables[0].Rows[0]["ITEM_ID"].ToString();
                        _retRow["Serial"] = String.Empty;
                        _retRow["Item Description"] = _dsRep.Tables[0].Rows[0]["ITEM_DESCR"].ToString();
                        _retRow["Location"] = _dsRep.Tables[0].Rows[0]["STORAGE_LOCATION"].ToString();
                        _retRow["Qty"] = _dsRep.Tables[0].Rows[0]["ITEM_QTY"].ToString();
                        _retTbl.Rows.Add(_retRow);
                    }
                    if (_blnCreatOnly)
                    {
                        _dsTemp.Tables.Add(_retTbl);
                        pDsTransRep = _dsTemp.Copy();
                    }
                    if (_dsRep.Tables[0].Rows.Count > 0 && !_blnCreatOnly)
                    {
                        for (int i = 0; i <= _dsRep.Tables[0].Rows.Count - 1; i++)
                        {
                            _lngTransID = Convert.ToInt64(_dsRep.Tables[0].Rows[i]["TRANSACTION_ID"]);
                            try
                            {
                                _statusCode = Events(_lngTransID, pFrmdate, pTodate, ref _dsEvents);
                                if (_statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsInfoEnabled) { _log.Info(methodBaseName + " : Failed to get Events details with Statuscode : " + _statusCode); }
                                    return AtparStatusCodes.E_SERVERERROR;
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " : Failed to get the departments:" + " Exception is : " + ex.ToString());
                                return AtparStatusCodes.E_SERVERERROR;
                            }

                            if (_dsEvents.Tables[0].Rows.Count > 0)
                            {
                                for (int j = 0; j <= _dsEvents.Tables[0].Rows.Count - 1; j++)
                                {
                                    _retRow = _retTbl.NewRow();
                                    datetVar = Convert.ToDateTime(_dsEvents.Tables[0].Rows[j]["UPDATE_DATE"]);
                                    _retRow["Trans_Date"] = datetVar.ToString("MM/dd hh:mm tt");
                                    _retRow["ItemID"] = _dsRep.Tables[0].Rows[i]["ITEM_ID"].ToString();
                                    _retRow["Serial"] = _dsRep.Tables[0].Rows[i]["SERIAL_NO"].ToString();
                                    _retRow["Item Description"] = _dsRep.Tables[0].Rows[i]["ITEM_DESCR"].ToString();
                                    _retRow["Qty"] = _dsRep.Tables[0].Rows[i]["REQUEST_QTY"].ToString();
                                    _retRow["UserID"] = _dsEvents.Tables[0].Rows[j]["USER_ID"].ToString();

                                    if (_dsEvents.Tables[0].Rows[j]["EVENT_ID"].ToString() == AtParWebEnums.EventStatus_Enum.Pick.ToString())
                                    {
                                        _retRow["Trans_Type"] = AtParWebEnums.EventStatus_Enum.Pick.ToString();
                                        _retRow["Location"] = _dsRep.Tables[0].Rows[i]["DELIVERY_LOCATION"].ToString();
                                        _retRow["DeptID"] = _dsRep.Tables[0].Rows[i]["DEPT_ID"].ToString();
                                    }
                                    else if (_dsEvents.Tables[0].Rows[j]["EVENT_ID"].ToString() == AtParWebEnums.EventStatus_Enum.Load.ToString())
                                    {
                                        _retRow["Trans_Type"] = AtParWebEnums.EventStatus_Enum.Load.ToString();
                                        _retRow["Location"] = _dsRep.Tables[0].Rows[i]["DELIVERY_LOCATION"].ToString();
                                        _retRow["DeptID"] = _dsRep.Tables[0].Rows[i]["DEPT_ID"].ToString();
                                    }
                                    else if (_dsEvents.Tables[0].Rows[j]["EVENT_ID"].ToString() == AtParWebEnums.EventStatus_Enum.UnLoad.ToString())
                                    {
                                        _retRow["Trans_Type"] = AtParWebEnums.EventStatus_Enum.UnLoad.ToString();
                                        _retRow["Location"] = _dsRep.Tables[0].Rows[i]["DELIVERY_LOCATION"].ToString();
                                        _retRow["DeptID"] = _dsRep.Tables[0].Rows[i]["DEPT_ID"].ToString();
                                    }
                                    else if (_dsEvents.Tables[0].Rows[j]["EVENT_ID"].ToString() == AtParWebEnums.EventStatus_Enum.Deliver.ToString())
                                    {
                                        _retRow["Trans_Type"] = AtParWebEnums.EventStatus_Enum.Deliver.ToString();
                                        _retRow["Location"] = _dsRep.Tables[0].Rows[i]["DELIVERY_LOCATION"].ToString();
                                        _retRow["DeptID"] = _dsRep.Tables[0].Rows[i]["DEPT_ID"].ToString();
                                    }
                                    else if (_dsEvents.Tables[0].Rows[j]["EVENT_ID"].ToString() == AtParWebEnums.EventStatus_Enum.Take.ToString())
                                    {
                                        _retRow["Trans_Type"] = AtParWebEnums.EventStatus_Enum.Take.ToString();
                                        _retRow["Location"] = _dsRep.Tables[0].Rows[i]["DELIVERY_LOCATION"].ToString();
                                        _retRow["DeptID"] = _dsRep.Tables[0].Rows[i]["OWNER"].ToString();
                                    }
                                    else if (_dsEvents.Tables[0].Rows[j]["EVENT_ID"].ToString() == AtParWebEnums.EventStatus_Enum.Returns.ToString())
                                    {
                                        _retRow["Trans_Type"] = AtParWebEnums.EventStatus_Enum.Returns.ToString();
                                        _retRow["Location"] = _dsRep.Tables[0].Rows[i]["DELIVERY_LOCATION"].ToString();
                                        _retRow["DeptID"] = _dsRep.Tables[0].Rows[i]["OWNER"].ToString();
                                    }

                                    _retTbl.Rows.Add(_retRow);
                                }
                            }
                        }

                        int _dblTotReqQty = 0;
                        for (int intRCnt = 0; intRCnt <= _dsRep.Tables[0].Rows.Count - 1; intRCnt++)
                        {
                            if (_dsRep.Tables[0].Rows[intRCnt]["ORDER_NO"] != DBNull.Value)
                            {
                                if (_intOrderNo != Convert.ToInt32(_dsRep.Tables[0].Rows[intRCnt]["ORDER_NO"]))
                                {
                                    _intOrderNo = Convert.ToInt32(_dsRep.Tables[0].Rows[intRCnt]["ORDER_NO"]);

                                    try
                                    {
                                        _statusCode = Requests(_intOrderNo, _dsRep.Tables[0].Rows[intRCnt]["ITEM_ID"].ToString(), pFrmdate, pTodate, ref _dsReqst);
                                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            if (_log.IsInfoEnabled) { _log.Info(methodBaseName + " : Failed to get Request details with Statuscode : " + _statusCode); }
                                            return AtparStatusCodes.E_SERVERERROR;
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + " : Failed to get Request details :" + " Exception is : " + ex.ToString());
                                        return AtparStatusCodes.E_SERVERERROR;
                                    }

                                    if (_dsReqst.Tables[0].Rows.Count > 0)
                                    {
                                        _retRow = _retTbl.NewRow();
                                        for (int intRCount = 0; intRCount <= _dsReqst.Tables[0].Rows.Count - 1; intRCount++)
                                        {
                                            if (intRCount == 0)
                                            {
                                                datetVar = Convert.ToDateTime(_dsReqst.Tables[0].Rows[intRCount]["ORDER_DATE"]);
                                                _retRow["Trans_Date"] = datetVar.ToString("MM/dd hh:mm tt");
                                                _retRow["UserID"] = _dsReqst.Tables[0].Rows[intRCount]["USER_ID"].ToString();
                                            }
                                            _dblTotReqQty += Convert.ToInt32((_dsReqst.Tables[0].Rows[intRCount]["REQUEST_QTY"]));
                                        }

                                        _retRow["Trans_Type"] = AtParWebEnums.Tkit_TransType_Enum.Request.ToString();
                                        _retRow["ItemID"] = _dsRep.Tables[0].Rows[intRCnt]["ITEM_ID"].ToString();
                                        _retRow["Serial"] = String.Empty;
                                        _retRow["Item Description"] = _dsRep.Tables[0].Rows[intRCnt]["ITEM_DESCR"].ToString();
                                        _retRow["Location"] = _dsRep.Tables[0].Rows[intRCnt]["STORAGE_LOCATION"].ToString();
                                        _retRow["Qty"] = _dblTotReqQty;
                                        _retRow["DeptID"] = _dsRep.Tables[0].Rows[intRCnt]["DEPT_ID"].ToString();
                                        _retTbl.Rows.Add(_retRow);
                                    }
                                }
                                try
                                {
                                    _statusCode = GetItemMoveData(_dsRep.Tables[0].Rows[intRCnt]["SERIAL_NO"].ToString(), pFrmdate, pTodate, ref _dsMove);
                                    if (_statusCode != AtparStatusCodes.ATPAR_OK)
                                    {
                                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + " : Failed to get moved Item Data with Statuscode : " + _statusCode); }
                                        return AtparStatusCodes.E_SERVERERROR;
                                    }
                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " : Failed to get moved Item Data:" + " Exception is : " + ex.ToString());
                                    return AtparStatusCodes.E_SERVERERROR;
                                }
                                if (_dsMove.Tables[0].Rows.Count > 0)
                                {
                                    for (int intCnt = 0; intCnt <= _dsMove.Tables[0].Rows.Count - 1; intCnt++)
                                    {
                                        _retRow = _retTbl.NewRow();
                                        datetVar = Convert.ToDateTime(_dsMove.Tables[0].Rows[intCnt]["SCAN_DATETIME"]);
                                        _retRow["Trans_Date"] = datetVar.ToString("MM/dd hh:mm tt");
                                        _retRow["Trans_Type"] = AtParWebEnums.Tkit_TransType_Enum.Move.ToString();
                                        _retRow["ItemID"] = _dsRep.Tables[0].Rows[intRCnt]["ITEM_ID"].ToString();
                                        _retRow["Serial"] = _dsRep.Tables[0].Rows[intRCnt]["SERIAL_NO"].ToString();
                                        _retRow["Item Description"] = _dsRep.Tables[0].Rows[intRCnt]["ITEM_DESCR"].ToString();
                                        _retRow["Location"] = _dsMove.Tables[0].Rows[intCnt]["STORAGE_LOCATION"].ToString();
                                        _retRow["Qty"] = _dsRep.Tables[0].Rows[intRCnt]["REQUEST_QTY"].ToString();
                                        _retRow["UserID"] = _dsMove.Tables[0].Rows[intCnt]["SCAN_USER"].ToString();
                                        _retTbl.Rows.Add(_retRow);
                                    }

                                }
                            }
                        }
                        _dsTemp = new DataSet();
                        _dsTemp.Tables.Add(_retTbl);
                        pDsTransRep = _dsTemp.Copy();
                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (SqlException sqlEx)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get Item Details:" + " Exception is : " + sqlEx.ToString());
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get Item Details:" + " Exception is : " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSQL = null;
            }
        }
        private long Events(long pTransID, string pFrmdate, string pTodate, ref DataSet pDsEvents)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (_sbSQL.Length > 0)
                    {
                        _sbSQL.Remove(0, _sbSQL.Length);
                    }
                    _sbSQL.Append("SELECT UPDATE_DATE, EVENT_ID, ");
                    _sbSQL.Append("FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'(' + A.USER_ID + ')' AS USER_ID ");
                    _sbSQL.Append("FROM MT_DELV_ITEM_TRIP A, MT_ATPAR_USER B WHERE ");
                    _sbSQL.Append("A.USER_ID = B.USER_ID ");
                    _sbSQL.Append("AND TRANSACTION_ID = " + pTransID);
                    _sbSQL.Append(" AND (UPDATE_DATE >= CONVERT(DATETIME, '" + pFrmdate + "', 101) ");
                    _sbSQL.Append("AND UPDATE_DATE <= DATEADD(DAY, 1, CONVERT(DATETIME, '" + pTodate + "', 101))) ");
                    _sbSQL.Append("ORDER BY EVENT_ID");

                    if (_log.IsInfoEnabled) { _log.Info(methodBaseName + " : Getting the Event Details with the " + "following SQL...." + _sbSQL.ToString()); }
                    var fields = new[] { "UPDATE_DATE", "EVENT_ID", "USER_ID" };
                    var lstevents = objContext.Database.DifferedExecuteQuery<VM_TKIT_TRANSACTION_DETAILS>(fields, _sbSQL.ToString()).ToList();
                    pDsEvents = lstevents.ToDataSet();
                }
            }
            catch (SqlException sqlEx)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get Event details:" + " Exception is : " + sqlEx.ToString());
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get Event details:" + " Exception is : " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSQL = null;
            }
            return AtparStatusCodes.ATPAR_OK;
        }

        private long Requests(int pOrderNo, string pItemID, string pFrmdate, string pTodate, ref DataSet pDsReqst)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (_sbSQL.Length > 0)
                    {
                        _sbSQL.Remove(0, _sbSQL.Length);
                    }
                    _sbSQL.Append("SELECT A.ORDER_NUMBER, A.ORDER_DATE, ");
                    _sbSQL.Append("FIRST_NAME+' '+MIDDLE_INIT+' '+LAST_NAME+'('+A.REQUESTOR_ID+')' AS USER_ID, ");
                    _sbSQL.Append("B.ITEM_ID, B.REQUEST_QTY ");
                    _sbSQL.Append("FROM TKIT_ORDER_HEADER A, TKIT_ORDER_DETAILS B, TKIT_REQUESTOR C ");
                    _sbSQL.Append("WHERE A.REQUESTOR_ID = C.REQUESTOR_ID ");
                    _sbSQL.Append("AND (A.ORDER_NUMBER = B.ORDER_NUMBER ");
                    _sbSQL.Append("AND ITEM_ID = '" + pItemID + "' ");
                    _sbSQL.Append("AND (ORDER_DATE >= CONVERT(DATETIME,'" + pFrmdate + "', 101) ");
                    _sbSQL.Append("AND ORDER_DATE <= DATEADD(DAY, 1, CONVERT(DATETIME, '" + pTodate + "', 101))))");

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + " : Getting the Request Details with the " + "following SQL...." + _sbSQL.ToString());
                    }
                    var fields = new[] { "ORDER_NUMBER", "ORDER_DATE", "USER_ID", "ITEM_ID", "REQUEST_QTY" };
                    var lstrequest = objContext.Database.DifferedExecuteQuery<VM_TKIT_TRANSACTION_DETAILS>(fields, _sbSQL.ToString()).ToList();
                    pDsReqst = lstrequest.ToDataSet();
                }
            }
            catch (SqlException sqlEx)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get Request details:" + " Exception is : " + sqlEx.ToString());
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get Request details:" + " Exception is : " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSQL = null;
            }
            return AtparStatusCodes.ATPAR_OK;
        }

        private long GetItemMoveData(string pSerial, string pFrmdate, string pTodate, ref DataSet pDsItemData)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    _sbSQL.Append("SELECT SCAN_DATETIME, STORAGE_LOCATION, ");
                    _sbSQL.Append("B.FIRST_NAME+' '+B.MIDDLE_INITIAL+' '+B.LAST_NAME+'('+A.SCAN_USER+')' AS SCAN_USER ");
                    _sbSQL.Append("FROM TKIT_EQ_LOCATION A, MT_ATPAR_USER B ");
                    _sbSQL.Append("WHERE A.SCAN_USER = B.USER_ID ");
                    _sbSQL.Append("AND A.SERIAL_NO = '" + pSerial + "'");
                    _sbSQL.Append("AND (SCAN_DATETIME >= CONVERT(DATETIME, '" + pFrmdate + "', 101) AND SCAN_DATETIME <= DATEADD(DAY, 1, CONVERT(DATETIME, '" + pTodate + "', 101)))");

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                    }
                    var fields = new[] { "SCAN_DATETIME", "STORAGE_LOCATION", "SCAN_USER" };
                    var lstitemdata = objContext.Database.DifferedExecuteQuery<VM_TKIT_TRANSACTION_DETAILS>(fields, _sbSQL.ToString()).ToList();
                    pDsItemData = lstitemdata.ToDataSet();
                }
            }
            catch (SqlException sqlEx)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get moved Item data:" + " Exception is : " + sqlEx.ToString());
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get moved Item data:" + " Exception is : " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSQL = null;
            }
            return AtparStatusCodes.ATPAR_OK;
        }
    }
}



using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.TrackIT;
using log4net;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using AtParVbUtilities;
using System.IO;

namespace AtPar.TrackIT.Repos
{
    public class DeliveryReportRepository : IDeliveryReportRepository
    {
        private ILog _log;
        public DeliveryReportRepository(ILog log)
        {
            _log = log;
        }


        public long GetTkITDeliverReport(string pFromDate, string pToDate, string pRequest, string pRecipient, string pUserId, string pDepartmentId, string pItemId, string pVendorName, string pDescr, string pLocation,
        string pReqId, string pStatus, ref DataSet pDsDeliverRep, string[] pDeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long functionReturnValue = 0;

            AtParVbUtilities.VbUtilities ObjUtil = new VbUtilities();
            StringBuilder _sbSQL = new StringBuilder();
            StringBuilder _sbTKITReportSQL = new StringBuilder();
            DataSet _TKITReportDS = null;
            StringBuilder _sbTKITDeliverReportSQL = new StringBuilder();
            DataSet _TKITDeliverReportDS = null;
            DataSet _TKITDeliverReportEventDS = null;
            DataSet _TKITDeliverReportAttemptDS = null;
            DataSet _TKITDeliverAccDS = null;
            DataTable _retTbl = null;
            DataRow _retRow = default(DataRow);
            DataTable dtEventDetails = new DataTable();
            long _StatusCode = -1;
            string _strSignature = string.Empty;
            string _strSql = string.Empty;
            DataRow dr = default(DataRow);
            DataSet dsDeliverReportData = new DataSet();
            string strPath = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (_sbSQL.Length > 0)
                    {
                        _sbSQL.Remove(0, _sbSQL.Length);
                    }
                  
                    _sbSQL.Append(" SELECT A.ORDER_NUMBER AS ORDER_NO, B.ORDER_LINE_NUMBER AS LINE_NO, ");
                    _sbSQL.Append(" SPACE(30) AS CARRIER_ID,SPACE(30) AS DEPT_ID, ");
                    _sbSQL.Append(" FIRST_NAME+' '+MIDDLE_INIT+' '+LAST_NAME+'('+A.REQUESTOR_ID+')' AS DELIVERED_TO, ");
                    _sbSQL.Append(" 0000000000 AS STATUS,0000000000 AS TRANS_ID, ");
                    _sbSQL.Append(" SPACE(30) AS SIGNATURE_ID,SPACE(30) AS RECEIVER_NAME,B.ITEM_DESCR AS REPORT_DATA_8, ");
                    _sbSQL.Append(" SPACE(30) AS REPORT_DATA_10,B.ORDER_LINE_NUMBER AS KEY_4,SPACE(30) AS VENDOR_NAME, ");
                    _sbSQL.Append(" B.LOCATION_ID AS LOCATION,SPACE(30) AS DELIVERED_BY,B.ITEM_ID AS ITEM_ID, ");
                    _sbSQL.Append(" C.DEPARTMENT_ID AS REPORT_DATA_25 ");
                    _sbSQL.Append(" FROM ");
                    _sbSQL.Append(" TKIT_ORDER_HEADER A,TKIT_ORDER_DETAILS B,RM_SHIP_TO_LOCACTION C,TKIT_REQUESTOR D WHERE ");
                    _sbSQL.Append(" A.REQUESTOR_ID=D.REQUESTOR_ID AND A.ORDER_NUMBER = B.ORDER_NUMBER ");
                    _sbSQL.Append(" AND B.LOCATION_ID = C.LOCATION_ID AND (B.DELIVER_ITEM_STATUS ='OPEN' OR ");
                    _sbSQL.Append(" B.DELIVER_ITEM_STATUS='CANCELLED' OR B.DELIVER_ITEM_STATUS='DELV') ");


                    if (!string.IsNullOrEmpty(pRequest))
                    {
                        _sbSQL.Append(" AND A.ORDER_NUMBER LIKE '" ).Append( pRequest ).Append( "%' ");
                    }

                    if (!string.IsNullOrEmpty(pDescr))
                    {
                        _sbSQL.Append(" AND B.ITEM_DESCR LIKE '" ).Append( pDescr.Replace("'", "''") ).Append( "%' ");
                    }

                    if (!string.IsNullOrEmpty(pItemId))
                    {
                        _sbSQL.Append(" AND B.ITEM_ID LIKE '" ).Append( pItemId ).Append( "%' ");
                    }

                    if (!string.IsNullOrEmpty(pLocation))
                    {
                        _sbSQL.Append(" AND B.LOCATION_ID LIKE '" ).Append( pLocation ).Append( "%' ");
                    }

                    //TO DO: Need to get the RequestorId ans filter
                    if (!string.IsNullOrEmpty(pReqId))
                    {
                        _sbSQL.Append(" AND A.REQUESTOR_ID = '" ).Append( pReqId ).Append( "' ");
                    }


                    if (pDepartmentId.Length > 0 && pDepartmentId != "ALL")
                    {
                        _sbSQL.Append(" AND C.DEPARTMENT_ID = '" ).Append( pDepartmentId ).Append( "' ");
                    }

                    if (!string.IsNullOrEmpty(pStatus))
                    {
                        if (pStatus == "20")
                        {
                            _sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = 'Pick' ");
                        }
                        else if (pStatus == "30")
                        {
                            _sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = 'Load' ");
                        }
                        else if (pStatus == "40")
                        {
                            _sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = 'Unload' ");
                        }
                        else if (pStatus == "50")
                        {
                            _sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = 'Deliver' ");
                        }
                        else if (pStatus == "55")
                        {
                            _sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = 'Take' ");
                        }
                        else if (pStatus == "60")
                        {
                            _sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = 'Return' ");
                        }
                        else if (pStatus == "0")
                        {
                            _sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = 'OPEN' ");
                        }
                        else if (pStatus == "13")
                        {
                            _sbSQL.Append(" AND B.DELIVER_ITEM_STATUS = 'CANCELLED' ");
                        }

                    }

                    _sbSQL.Append(" UNION ");

                    _sbSQL.Append(" SELECT A.KEY_3 AS ORDER_NO,A.KEY_4 AS LINE_NO, ");
                    _sbSQL.Append(" A.REPORT_DATA_6 AS CARRIER_ID,A.REPORT_DATA_7 AS DEPT_ID, ");
                    _sbSQL.Append(" FIRST_NAME+' '+MIDDLE_INIT+' '+LAST_NAME+'('+A.REPORT_DATA_4+')' AS DELIVERED_TO, ");
                    _sbSQL.Append(" A.STATUS,A.TRANSACTION_ID AS TRANS_ID, ");
                    _sbSQL.Append(" A.SIGNATURE_ID, FIRST_NAME+' '+MIDDLE_INIT+' '+LAST_NAME+'('+A.REPORT_DATA_11+')' AS RECEIVER_NAME,A.REPORT_DATA_8, ");
                    _sbSQL.Append(" A.REPORT_DATA_10,A.KEY_4,A.REPORT_DATA_9 AS VENDOR_NAME,A.REPORT_DATA_5 AS ");
                    _sbSQL.Append(" LOCATION,A.USER_ID AS DELIVERED_BY, A.KEY_5 AS ITEM_ID, ");
                    _sbSQL.Append(" A.REPORT_DATA_25 FROM MT_ATPAR_DETAIL_TRANSACTION A,MT_DELV_ITEM_TRIP B, ");
                    _sbSQL.Append(" TKIT_REQUESTOR C WHERE A.REPORT_DATA_4=C.REQUESTOR_ID AND A.TRANSACTION_ID = B.TRANSACTION_ID AND A.STATUS = B.EVENT_ID ");
                    _sbSQL.Append(" AND A.APP_ID = " + (int)AtParWebEnums.EnumApps.TrackIT + " AND ");
                    _sbSQL.Append(" B.UPDATE_DATE >= CONVERT(DATETIME, '" + pFromDate + "', 101)");
                    _sbSQL.Append(" AND B.UPDATE_DATE <= DATEADD(day, 1, CONVERT(DATETIME, '" + pToDate + "', 101)) ");

                    if (pDepartmentId.Length > 0 & pDepartmentId != "ALL")
                    {
                        _sbSQL.Append(" AND A.REPORT_DATA_25 = '" ).Append( pDepartmentId ).Append( "'");
                    }

                    if (!string.IsNullOrEmpty(pRequest))
                    {
                        _sbSQL.Append(" AND (KEY_3 like '" ).Append( pRequest ).Append( "%')");
                    }

                    if (!string.IsNullOrEmpty(pVendorName))
                    {
                        _sbSQL.Append(" AND REPORT_DATA_9 like '" ).Append( pVendorName ).Append( "%'");
                    }

                    if (!string.IsNullOrEmpty(pDescr))
                    {
                        _sbSQL.Append(" AND REPORT_DATA_8 like '" ).Append( pDescr.Replace("'", "''")) .Append( "%'");
                    }

                    if (!string.IsNullOrEmpty(pItemId))
                    {
                        _sbSQL.Append(" AND A.KEY_5 LIKE '%" ).Append( pItemId ).Append( "%'");
                    }

                    if (!string.IsNullOrEmpty(pLocation))
                    {
                        _sbSQL.Append(" AND REPORT_DATA_5 like '" ).Append( pLocation ).Append( "%'");
                    }

                    if (!string.IsNullOrEmpty(pUserId))
                    {
                        _sbSQL.Append(" AND A.USER_ID like '" ).Append( pUserId ).Append( "%'");
                    }

                    //TO DO: Need to get the RequestorId ans filter
                    if (!string.IsNullOrEmpty(pRecipient))
                    {
                        _sbSQL.Append(" AND (REPORT_DATA_4 like '" ).Append( pRecipient ).Append( "%' OR  REPORT_DATA_11 like '" ).Append( pRecipient ).Append( "%')");
                    }

                    if (!string.IsNullOrEmpty(pStatus) && pStatus!= "ALL")
                    {
                        _sbSQL.Append(" AND A.STATUS = '" ).Append( pStatus ).Append( "' ");
                    }

                    //TO DO: Need to get the RequestorId ans filter
                    if (!string.IsNullOrEmpty(pReqId))
                    {
                        _sbSQL.Append(" AND REPORT_DATA_4 = '" ).Append( pReqId ).Append( "' ");
                    }

                    _sbSQL.Append(" ORDER BY ORDER_NO,ITEM_ID,TRANS_ID  ");

                    try
                    {
                        if (_log.IsInfoEnabled)
                            _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                       // dsDeliverReportData = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString));

                       var lstResult= objContext.Database.SqlQuery<VM_ATPAR_DETAIL_TRANSACTION>(_sbSQL.ToString()).ToList();
                        dsDeliverReportData= lstResult.ToDataSet();
                        pDsDeliverRep = dsDeliverReportData.Clone();

                        dtEventDetails.TableName = "EVENTDETAILS";
                        string[] strEventFields = {
            "TRANSACTION_ID",
            "EVENT_ID",
            "EVENT_STATUS_MESSAGE",
            "UPDATE_DATE",
            "DELIVERED_TO",
            "EVENT_DATE",
            "ORDER_NO",
            "EVENT_USER",
            "USERNAME",
            "SIGNATURE_ID"
        };
                        _StatusCode = BuildTable(dtEventDetails, strEventFields);
                        if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                            functionReturnValue = _StatusCode;
                            if (_log.IsFatalEnabled)
                                _log.Fatal("ATPAR_E_LOCALDBSELECTFAIL :");
                            return functionReturnValue;
                        }

                        _retTbl = new DataTable("ITEMS_TABLE");

                        var _with2 = _retTbl.Columns;
                        _with2.Add("ORDER_DATE", Type.GetType("System.String"));
                        //1
                        _with2.Add("CANCEL_DATE", Type.GetType("System.String"));
                        _with2.Add("ORDER_NO", Type.GetType("System.String"));
                        //4 Order No
                        _with2.Add("LINE_NO", Type.GetType("System.String"));
                        //8 Line Nbr
                        _with2.Add("REPORT_DATA_8", Type.GetType("System.String"));
                        //9 Item Desc
                        _with2.Add("DELIVERED_TO", Type.GetType("System.String"));
                        //13 Requestor
                        _with2.Add("DELIVERED_BY", Type.GetType("System.String"));
                        _with2.Add("LOCATION", Type.GetType("System.String"));
                        //14
                        _with2.Add("ITEM_ID", Type.GetType("System.String"));
                        //17 Item ID
                        _with2.Add("REPORT_DATA_25", Type.GetType("System.String"));
                        //18 DeptID
                        _with2.Add("STATUS", Type.GetType("System.String"));
                        //18 DeptID
                        _with2.Add("SIGNATURE_ID", Type.GetType("System.String"));
                        //18 DeptID

                        //5 - transid


                        //dsDeliverReportData.WriteXml("D:\DS_XMLs_AtPar_New\dsDeliverReportDataToday.xml")
                        if (dsDeliverReportData.Tables[0].Rows.Count > 0)
                        {
                            for (int intCount = 0; intCount <= dsDeliverReportData.Tables[0].Rows.Count - 1; intCount++)
                            {
                                string strdelrep = null;
                                if ((dsDeliverReportData.Tables[0].Rows[intCount]["ORDER_NO"] != DBNull.Value))
                                {
                                    strdelrep = dsDeliverReportData.Tables[0].Rows[intCount]["ORDER_NO"].ToString();

                                    if (_log.IsInfoEnabled)
                                        _log.Info(methodBaseName + " : strdelrep_ordernum:::" + strdelrep.ToString());

                                    if (dsDeliverReportData.Tables[0].Rows[intCount]["ORDER_NO"].ToString() != "0")
                                    {
                                        string strdelrep1 = dsDeliverReportData.Tables[0].Rows[intCount]["ORDER_NO"].ToString();
                                        
                                        if ((dsDeliverReportData.Tables[0].Rows[intCount]["TRANS_ID"] != DBNull.Value))
                                        {
                                            long _lngTransID = Convert.ToInt64(dsDeliverReportData.Tables[0].Rows[intCount]["TRANS_ID"]);
                                            if (_log.IsDebugEnabled)
                                                _log.Debug(methodBaseName + " : _lngTransID..." + _lngTransID);
                                            if (_lngTransID == 0)
                                            {
                                                bool isItemExistsInTransTable = false;
                                                isItemExistsInTransTable = false;
                                                long _lngStatus = Convert.ToInt64(dsDeliverReportData.Tables[0].Rows[intCount]["STATUS"]);
                                                if (_log.IsDebugEnabled)
                                                    _log.Debug(methodBaseName + " : _lngStatus..." + _lngStatus);
                                                if (_lngStatus == 0)
                                                {
                                                    if (_sbSQL.Length > 0)
                                                    {
                                                        _sbSQL.Remove(0, _sbSQL.Length);
                                                    }

                                                    _sbSQL.Append(" SELECT STATUS FROM MT_ATPAR_DETAIL_TRANSACTION WHERE APP_ID=9 ");
                                                    _sbSQL.Append(" AND KEY_3= '" + dsDeliverReportData.Tables[0].Rows[intCount]["ORDER_NO"] + "' ");
                                                    _sbSQL.Append(" AND KEY_4='" + dsDeliverReportData.Tables[0].Rows[intCount]["LINE_NO"] + "' ");
                                                    _sbSQL.Append(" AND KEY_5 = '" + dsDeliverReportData.Tables[0].Rows[intCount]["ITEM_ID"] + "' ");
                                                    _sbSQL.Append(" AND STATUS > '" + (int)AtParWebEnums.AppTransactionStatus.Downloaded + "' AND STATUS <> 13");
                                                    //AppTransactionStatus.Downloaded (1)

                                                    if (_log.IsInfoEnabled)
                                                        _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                                                    //_TKITReportDS = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()));
                                                   var lstReportDs= objContext.Database.SqlQuery<int>(_sbSQL.ToString()).ToList();
                                                    _TKITReportDS= lstReportDs.ToDataSet();

                                                    if (_TKITReportDS.Tables[0].Rows.Count > 0)
                                                    {
                                                        isItemExistsInTransTable = true;
                                                    }

                                                }
                                                //_lngStatus = 0

                                                if (isItemExistsInTransTable == false)
                                                {
                                                    if (_sbSQL.Length > 0)
                                                    {
                                                        _sbSQL.Remove(0, _sbSQL.Length);
                                                    }

                                                    var _with4 = _sbSQL;
                                                    _with4.Append(" SELECT DISTINCT B.DELIVER_ITEM_STATUS, A.ORDER_DATE, B.CANCEL_DATE FROM ");
                                                    _with4.Append(" TKIT_ORDER_HEADER A, TKIT_ORDER_DETAILS B WHERE ");
                                                    _with4.Append(" A.ORDER_NUMBER = " ).Append( dsDeliverReportData.Tables[0].Rows[intCount]["ORDER_NO"] ).Append( " ");
                                                    _with4.Append(" AND A.ORDER_NUMBER = B.ORDER_NUMBER ");
                                                    _with4.Append(" AND B.ITEM_ID = '" ).Append (dsDeliverReportData.Tables[0].Rows[intCount]["ITEM_ID"] ).Append( "'  ");
                                                    _with4.Append(" AND B.ORDER_LINE_NUMBER = '" ).Append( dsDeliverReportData.Tables[0].Rows[intCount]["LINE_NO"] ).Append( "' ");


                                                    if (_log.IsInfoEnabled)
                                                        _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                                                   // _TKITDeliverReportDS = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()));
                                                 var lstDeliverReport=   objContext.Database.SqlQuery<VM_TKIT_ORDER_HEADER_DETAILS>(_sbSQL.ToString()).ToList();
                                                    _TKITDeliverReportDS= lstDeliverReport.ToDataSet();
                                                    if (_TKITDeliverReportDS.Tables[0].Rows[0]["DELIVER_ITEM_STATUS"].ToString() == "OPEN" | _TKITDeliverReportDS.Tables[0].Rows[0]["DELIVER_ITEM_STATUS"].ToString() == AtParWebEnums.EventStatus_Enum.Deliver.ToString())
                                                    {
                                                        //dsDeliverReportData

                                                        _retRow = _retTbl.NewRow();
                                                        var _with5 = dsDeliverReportData.Tables[0].Rows[intCount];
                                                        //_retRow["Trans_Date") = ["CREATE_DATE").ToString("MM/dd hh:mm tt")
                                                        _retRow["STATUS"] = "Open";
                                                        _retRow["ORDER_DATE"] = _TKITDeliverReportDS.Tables[0].Rows[0]["ORDER_DATE"].ToString();
                                                        _retRow["ORDER_NO"] = _with5["ORDER_NO"].ToString();
                                                        _retRow["LINE_NO"] = _with5["LINE_NO"].ToString();
                                                        _retRow["REPORT_DATA_8"] = _with5["REPORT_DATA_8"].ToString();
                                                        _retRow["DELIVERED_TO"] = _with5["DELIVERED_TO"].ToString();
                                                        _retRow["DELIVERED_BY"] = _with5["DELIVERED_BY"].ToString();
                                                        _retRow["LOCATION"] = _with5["LOCATION"].ToString();
                                                        _retRow["ITEM_ID"] = _with5["ITEM_ID"].ToString();
                                                        _retRow["REPORT_DATA_25"] = _with5["REPORT_DATA_25"].ToString();
                                                        _retRow["SIGNATURE_ID"] = _with5["SIGNATURE_ID"].ToString();

                                                        dr = dtEventDetails.NewRow();
                                                        dr["TRANSACTION_ID"] = _with5["TRANS_ID"];
                                                        dr["EVENT_STATUS_MESSAGE"] = "Open";
                                                        dr["UPDATE_DATE"] = _TKITDeliverReportDS.Tables[0].Rows[0]["ORDER_DATE"].ToString();
                                                        dr["USERNAME"] = "";
                                                        //_TKITDeliverReportEventDS.Tables[0].Rows[j]("USERNAME").ToString()
                                                        dr["ORDER_NO"] = _with5["ORDER_NO"].ToString();
                                                        dr["DELIVERED_TO"] = _with5["DELIVERED_TO"].ToString();
                                                        dr["SIGNATURE_ID"] = string.Empty;
                                                        dtEventDetails.Rows.Add(dr);


                                                        _retTbl.Rows.Add(_retRow);
                                                        _retTbl.AcceptChanges();


                                                    }
                                                    else if (_TKITDeliverReportDS.Tables[0].Rows[0]["DELIVER_ITEM_STATUS"].ToString() == "CANCELLED")
                                                    {
                                                        _retRow = _retTbl.NewRow();
                                                        var _with6 = dsDeliverReportData.Tables[0].Rows[intCount];
                                                        //_retRow["Trans_Date") = ["CREATE_DATE").ToString("MM/dd hh:mm tt")
                                                        _retRow["STATUS"] = "Cancelled";
                                                        _retRow["CANCEL_DATE"] = _TKITDeliverReportDS.Tables[0].Rows[0]["CANCEL_DATE"].ToString();
                                                        _retRow["ORDER_NO"] = _with6["ORDER_NO"].ToString();
                                                        _retRow["LINE_NO"] = _with6["LINE_NO"].ToString();
                                                        _retRow["REPORT_DATA_8"] = _with6["REPORT_DATA_8"].ToString();
                                                        _retRow["DELIVERED_TO"] = _with6["DELIVERED_TO"].ToString();
                                                        _retRow["DELIVERED_BY"] = _with6["DELIVERED_BY"].ToString();
                                                        _retRow["LOCATION"] = _with6["LOCATION"].ToString();
                                                        _retRow["ITEM_ID"] = _with6["ITEM_ID"].ToString();
                                                        _retRow["REPORT_DATA_25"] = _with6["REPORT_DATA_25"].ToString();

                                                        _retTbl.Rows.Add(_retRow);
                                                        _retTbl.AcceptChanges();


                                                    }
                                                    //If _TKITDeliverReportDS.Tables[0].Rows[intCount]["DELIVER_ITEM_STATUS")

                                                    pDsDeliverRep.Tables[0].ImportRow(dsDeliverReportData.Tables[0].Rows[intCount]);
                                                    pDsDeliverRep.AcceptChanges();

                                                }
                                                // If isItemExistsInTransTable = False

                                            }
                                            else
                                            {
                                                if (_sbSQL.Length > 0)
                                                {
                                                    _sbSQL.Remove(0, _sbSQL.Length);
                                                }

                                              
                                                _sbSQL.Append(" SELECT DISTINCT B.DELIVER_ITEM_STATUS, A.ORDER_DATE, B.CANCEL_DATE FROM ");
                                                _sbSQL.Append(" TKIT_ORDER_HEADER A, TKIT_ORDER_DETAILS B WHERE ");
                                                _sbSQL.Append(" A.ORDER_NUMBER = '" ).Append( dsDeliverReportData.Tables[0].Rows[intCount]["ORDER_NO"] ).Append( "' ");
                                                _sbSQL.Append(" AND A.ORDER_NUMBER = B.ORDER_NUMBER AND ");
                                                _sbSQL.Append(" B.ITEM_ID = '" ).Append (dsDeliverReportData.Tables[0].Rows[intCount]["ITEM_ID"] ).Append( "' ");
                                                _sbSQL.Append(" AND B.ORDER_LINE_NUMBER = '" ).Append (dsDeliverReportData.Tables[0].Rows[intCount]["LINE_NO"] ).Append( "' ");

                                                if (_log.IsInfoEnabled)
                                                    _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                                               // _TKITDeliverReportDS = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString));
                                                var lstDeliverReport1 = objContext.Database.SqlQuery<VM_TKIT_ORDER_HEADER_DETAILS>(_sbSQL.ToString()).ToList();
                                                _TKITDeliverReportDS = lstDeliverReport1.ToDataSet();
                                                //End If

                                                if (_TKITDeliverReportDS.Tables[0].Rows[0]["DELIVER_ITEM_STATUS"].ToString() == "OPEN" | _TKITDeliverReportDS.Tables[0].Rows[0]["DELIVER_ITEM_STATUS"].ToString() == AtParWebEnums.EventStatus_Enum.Deliver.ToString() | _TKITDeliverReportDS.Tables[0].Rows[0]["DELIVER_ITEM_STATUS"].ToString() == "DELV")
                                                {
                                                    _retRow = _retTbl.NewRow();
                                                    var _with8 = dsDeliverReportData.Tables[0].Rows[intCount];
                                                    //_retRow["Trans_Date") = ["CREATE_DATE").ToString("MM/dd hh:mm tt")
                                                    _retRow["STATUS"] = "Open";
                                                    _retRow["ORDER_DATE"] = _TKITDeliverReportDS.Tables[0].Rows[0]["ORDER_DATE"].ToString();
                                                    _retRow["ORDER_NO"] = _with8["ORDER_NO"].ToString();
                                                    _retRow["LINE_NO"] = _with8["LINE_NO"].ToString();
                                                    _retRow["REPORT_DATA_8"] = _with8["REPORT_DATA_8"].ToString();
                                                    _retRow["DELIVERED_TO"] = _with8["DELIVERED_TO"].ToString();
                                                    _retRow["DELIVERED_BY"] = _with8["DELIVERED_BY"].ToString();
                                                    _retRow["LOCATION"] = _with8["LOCATION"].ToString();
                                                    _retRow["ITEM_ID"] = _with8["ITEM_ID"].ToString();
                                                    _retRow["REPORT_DATA_25"] = _with8["REPORT_DATA_25"].ToString();

                                                    //Added to display the open status record in event list
                                                    dr = dtEventDetails.NewRow();
                                                    dr["TRANSACTION_ID"] = _with8["TRANS_ID"];
                                                    dr["EVENT_STATUS_MESSAGE"] = "Open";
                                                    dr["UPDATE_DATE"] = _TKITDeliverReportDS.Tables[0].Rows[0]["ORDER_DATE"].ToString();
                                                    dr["USERNAME"] = "";
                                                    //_TKITDeliverReportEventDS.Tables[0].Rows[j]("USERNAME").ToString()
                                                    dr["ORDER_NO"] = _with8["ORDER_NO"].ToString();
                                                    dr["DELIVERED_TO"] = _with8["DELIVERED_TO"].ToString();
                                                    dr["SIGNATURE_ID"] = string.Empty;
                                                    dtEventDetails.Rows.Add(dr);


                                                    _retTbl.Rows.Add(_retRow);
                                                    _retTbl.AcceptChanges();
                                                }
                                                if (_sbSQL.Length > 0)
                                                {
                                                    _sbSQL.Remove(0, _sbSQL.Length);
                                                }
                                                
                                                //string _strTranId = null;
                                               
                                                _sbSQL.Append("SELECT TRANSACTION_ID, EVENT_ID,UPDATE_DATE,FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'('+A.USER_ID+')' AS USERNAME ");
                                                _sbSQL.Append("FROM MT_DELV_ITEM_TRIP A,MT_ATPAR_USER B WHERE A.USER_ID=B.USER_ID AND ");
                                                _sbSQL.Append("TRANSACTION_ID='" + dsDeliverReportData.Tables[0].Rows[intCount]["TRANS_ID"] + "' ");
                                                _sbSQL.Append(" ORDER BY TRANSACTION_ID, EVENT_ID");
                                                if (_log.IsInfoEnabled)
                                                    _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                                                var fields = new[] { "TRANSACTION_ID", "EVENT_ID", "UPDATE_DATE", "USERNAME" };
                                               // _TKITDeliverReportEventDS = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString));
                                               var lstResult1= objContext.Database.DifferedExecuteQuery<MT_DELV_ITEM_TRIP>(fields, _sbSQL.ToString()).ToList();
                                                _TKITDeliverReportEventDS= lstResult1.ToDataSet();
                                                if (_sbSQL.Length > 0)
                                                {
                                                    _sbSQL.Remove(0, _sbSQL.Length);
                                                }
                                               
                                                
                                                _sbSQL.Append("SELECT ATTEMPT_DATE,COMMENT FROM MT_DELV_DLVR_ATTEMPT WHERE ");
                                                _sbSQL.Append(" TRANSACTION_ID=" ).Append( dsDeliverReportData.Tables[0].Rows[intCount]["TRANS_ID"] ).Append( " ORDER BY TRANSACTION_ID");
                                                if (_log.IsInfoEnabled)
                                                    _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                                              //  _TKITDeliverReportAttemptDS = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString));
                                                var fields1 = new[] { "ATTEMPT_DATE", "COMMENT" };
                                             var lstResult2=   objContext.Database.DifferedExecuteQuery<MT_DELV_DLVR_ATTEMPT>(fields1, _sbSQL.ToString()).ToList();
                                                _TKITDeliverReportAttemptDS= lstResult2.ToDataSet();
                                                string strCaseVar = _TKITDeliverReportEventDS.Tables[0].Rows[0]["EVENT_ID"].ToString();
                                                // string StrStatus = null;

                                                //binding the events datatable
                                                if (_TKITDeliverReportEventDS != null)
                                                {
                                                    if (_TKITDeliverReportEventDS.Tables.Count > 0)
                                                    {
                                                        if (_TKITDeliverReportEventDS.Tables[0].Rows.Count > 0)
                                                        {
                                                            for (int j = 0; j <= _TKITDeliverReportEventDS.Tables[0].Rows.Count - 1; j++)
                                                            {
                                                                //Dim dr As DataRow
                                                                dr = dtEventDetails.NewRow();
                                                                dr["TRANSACTION_ID"] = _TKITDeliverReportEventDS.Tables[0].Rows[j]["TRANSACTION_ID"];
                                                                dr["EVENT_ID"] = _TKITDeliverReportEventDS.Tables[0].Rows[j]["EVENT_ID"].ToString();

                                                                dr["UPDATE_DATE"] = _TKITDeliverReportEventDS.Tables[0].Rows[j]["UPDATE_DATE"].ToString();
                                                                dr["USERNAME"] = _TKITDeliverReportEventDS.Tables[0].Rows[j]["USERNAME"].ToString();
                                                                dr["ORDER_NO"] = dsDeliverReportData.Tables[0].Rows[intCount]["ORDER_NO"].ToString();
                                                                dr["DELIVERED_TO"] = dsDeliverReportData.Tables[0].Rows[intCount]["DELIVERED_TO"].ToString();
                                                                //dr("EVENT_STATUS_MESSAGE") = String.Empty
                                                                dr["SIGNATURE_ID"] = string.Empty;
                                                                _strSignature = string.Empty;
                                                                switch (_TKITDeliverReportEventDS.Tables[0].Rows[j]["EVENT_ID"].ToString())
                                                                {
                                                                    case "20":
                                                                        dr["EVENT_STATUS_MESSAGE"] = "Pick";
                                                                        break;
                                                                    case "30":// EventStatus_Enum.Load:
                                                                        dr["EVENT_STATUS_MESSAGE"] = "Load";
                                                                        break;
                                                                    case "40":// EventStatus_Enum.UnLoad:
                                                                        dr["EVENT_STATUS_MESSAGE"] = "UnLoad";
                                                                        break;
                                                                    case "55":// EventStatus_Enum.Take:
                                                                        dr["EVENT_STATUS_MESSAGE"] = "Take";
                                                                        break;
                                                                    case "60":// EventStatus_Enum.Returns:
                                                                        dr["EVENT_STATUS_MESSAGE"] = "Returns";
                                                                        break;
                                                                    case "50":// EventStatus_Enum.Deliver:
                                                                        dr["EVENT_STATUS_MESSAGE"] = "Deliver";
                                                                        if (Convert.ToInt32(dsDeliverReportData.Tables[0].Rows[intCount]["SIGNATURE_ID"]) > 0)
                                                                        {
                                                                            if (_sbSQL.Length > 0)
                                                                            {
                                                                                _sbSQL.Remove(0, _sbSQL.Length);
                                                                            }
                                                                            var _sbSQL1 = _sbSQL;
                                                                            
                                                                            _sbSQL1.Append("SELECT SIGNATURE FROM MT_DELV_RECV_SIGNATURE WHERE SIGNATURE_ID =" ).Append (dsDeliverReportData.Tables[0].Rows[intCount]["SIGNATURE_ID"] ).Append( " ");
                                                                            if (_log.IsInfoEnabled)
                                                                                _log.Info(methodBaseName + " : Getting the moved Item data with the " + "following SQL...." + _sbSQL.ToString());
                                                                           // _TKITDeliverAccDS = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString));
                                                                           var lstDeliverAccDS= objContext.Database.SqlQuery<string>(_sbSQL.ToString()).ToList();
                                                                            //_TKITDeliverAccDS= lstDeliverAccDS.ToDataSet();

                                                                            if (lstDeliverAccDS.Count > 0)
                                                                            {
                                                                                _strSignature = lstDeliverAccDS[0].ToString();
                                                                            }
                                                                        }

                                                                        if (!string.IsNullOrEmpty(_strSignature))
                                                                        {
                                                                            strPath = AppDomain.CurrentDomain.BaseDirectory[0].ToString() + ":\\AtPar\\AtParWebApi\\Uploaded\\";

                                                                            if (!Directory.Exists(strPath)) //Check if directory exist
                                                                            {
                                                                                Directory.CreateDirectory(strPath); //Create directory if it doesn't exist
                                                                            }

                                                                            strPath += dr["TRANSACTION_ID"].ToString() + ".jpg";


                                                                            dr["SIGNATURE_ID"] = ObjUtil.Signature(strPath, _strSignature);
                                                                            //If _log.IsDebugEnabled Then _log.Debug(methodBaseName & "Signature Value : " & _strSignature)
                                                                        }

                                                                        break;
                                                                }

                                                                dtEventDetails.Rows.Add(dr);
                                                            }
                                                        }
                                                    }
                                                }
                                                // end of binding the events datatable
                                                pDsDeliverRep.Tables[0].ImportRow(dsDeliverReportData.Tables[0].Rows[intCount]);
                                                pDsDeliverRep.AcceptChanges();
                                            }
                                            //If_lngTransID = 0
                                        }
                                    }
                                }
                            }
                            pDsDeliverRep.Tables.Add(dtEventDetails);
                            pDsDeliverRep.Tables[0].TableName = "EVENTHEADER";
                            dsDeliverReportData.Tables.Add(_retTbl);

                            if (pDsDeliverRep.Tables[0].Rows.Count == 0)
                            {
                                return AtparStatusCodes.E_NORECORDFOUND;
                            }

                        }
                        else
                        {
                            return AtparStatusCodes.E_NORECORDFOUND;
                        }
                        //dsDeliverReportData.Tables[0].Rows.Count > 0
                    }
                    catch (SqlException sqlEx)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " : Failed to get moved Item data : " + "Exception is : " + sqlEx.ToString());
                        return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " : Failed to get TKIT Deliver Report : " + "Exception is : " + ex.ToString());
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                    finally
                    {
                        _sbSQL = null;
                    }

                    return AtparStatusCodes.ATPAR_OK;
                    // return functionReturnValue;


                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        public class VM_ATPAR_DETAIL_TRANSACTION
        {
            public int? ORDER_NO { get; set; }
            public int? LINE_NO { get; set; }
            public string CARRIER_ID { get; set; }
            public string DEPT_ID { get; set; }
            public string DELIVERED_TO { get; set; }
            public int? STATUS { get; set; }
            public int TRANS_ID { get; set; }
            public int? SIGNATURE_ID { get; set; }
            public string RECEIVER_NAME { get; set; }
            public string REPORT_DATA_10 { get; set; }
            public int? KEY_4 { get; set; }
            public string VENDOR_NAME { get; set; }
            public string LOCATION { get; set; }
            public string DELIVERED_BY { get; set; }
            public string ITEM_ID { get; set; }
            public string REPORT_DATA_25 { get; set; }
            public string REPORT_DATA_8 { get; set; }
        }

        public class VM_TKIT_ORDER_HEADER_DETAILS
        {
            public string DELIVER_ITEM_STATUS { get; set; }
            public DateTime? ORDER_DATE { get; set; }
            public DateTime? CANCEL_DATE { get; set; }
        }

        private long BuildTable(DataTable dt, string[] strFields)
        {
            try
            {
                for (int i = 0; i <= strFields.Length - 1; i++)
                {
                    dt.Columns.Add(new DataColumn(strFields[i].ToString()));
                }
                return AtparStatusCodes. ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal("E_SERVERERROR : Failed to create the datatable" + ex.ToString());
                return AtparStatusCodes. E_SERVERERROR;
            }
        }



        public long GetRequestors(bool pInactiveStatusChk, ref DataSet pDsTkitRequestors, string[] pDeviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = null;
            bool _blnWhere = false;



            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    _sbSQL = new StringBuilder();

                    var _with1 = _sbSQL;
                    _with1.Append(" SELECT ORG_GROUP_ID, REQUESTOR_ID, FIRST_NAME, LAST_NAME");
                    _with1.Append(" FROM TKIT_REQUESTOR");

                    if (pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                    {
                        //.Append(" WHERE ORG_GROUP_ID ='" & pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID) & "'")
                        _with1.Append(" WHERE ORG_GROUP_ID IN ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ");
                        _with1.Append(" BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                        _with1.Append(" WHERE ORG_GROUP_ID = '" + pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + " '))");
                        _blnWhere = true;
                    }

                    if (pInactiveStatusChk)
                    {
                        if (_blnWhere)
                        {
                            _with1.Append(" AND STATUS = '" + AtParWebEnums.enum_Requestor_Status.A.ToString() + "'");
                        }
                        else
                        {
                            _with1.Append(" WHERE STATUS = '" + AtParWebEnums.enum_Requestor_Status.A.ToString() + "'");
                        }
                    }
                    _with1.Append(" ORDER BY REQUESTOR_ID");

                    if (_log.IsInfoEnabled)
                        _log.Info(methodBaseName + ": Getting the TKIT requestors" + " with the following SQL...." + _sbSQL.ToString());

                    var fields = new[] { "ORG_GROUP_ID", "REQUESTOR_ID", "FIRST_NAME", "LAST_NAME" };

                    //pDsTkitRequestors = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString));
                 var lstTKitRequestors=   objContext.Database.DifferedExecuteQuery<TKIT_REQUESTOR>(fields, _sbSQL.ToString()).ToList();
                    pDsTkitRequestors= lstTKitRequestors.ToDataSet();
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to get the trackit" + " requestors list: Exception is : " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSQL = null;
            }

            return AtparStatusCodes. ATPAR_OK;

        }

        public long GetTKITDepts(string pStrDeptID, string pStatus, ref DataSet pDsDepts, string[] pDeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbTKITDepts = new StringBuilder();
            bool _blnWhere = false;


            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    var _with1 = _sbTKITDepts;
                    _with1.Append(" SELECT DEPT_ID, DESCRIPTION ,UPDATE_DATE,");
                    _with1.Append(" UPDATE_USER_ID, STATUS, ORG_GROUP_ID");
                    _with1.Append(" FROM TKIT_DEPT");

                    if (!string.IsNullOrEmpty(pStrDeptID))
                    {
                        _with1.Append(" WHERE DEPT_ID LIKE '%" ).Append( pStrDeptID ).Append( "%' ");
                        _blnWhere = true;
                    }

                    if (!string.IsNullOrEmpty(pStatus))
                    {
                        if (_blnWhere)
                        {
                            _with1.Append(" AND STATUS = '" ).Append( pStatus ).Append( "'");
                        }
                        else
                        {
                            _with1.Append(" WHERE STATUS = '" ).Append( pStatus ).Append( "'");
                            _blnWhere = true;
                        }
                    }

                    if (pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                    {
                        if (_blnWhere)
                        {
                            //.Append(" AND ORG_GROUP_ID = '" & pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID) & "'")
                            _with1.Append(" AND ORG_GROUP_ID IN ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ");
                            _with1.Append(" BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                            _with1.Append(" WHERE ORG_GROUP_ID = '" ).Append( pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] ).Append( " '))");
                        }
                        else
                        {
                            //.Append(" WHERE ORG_GROUP_ID = '" & pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID) & "'")
                            _with1.Append(" WHERE ORG_GROUP_ID IN ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ");
                            _with1.Append(" BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                            _with1.Append(" WHERE ORG_GROUP_ID = '" ).Append( pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] ).Append( " '))");
                            _blnWhere = true;
                        }
                    }
                    _with1.Append(" ORDER BY DEPT_ID ");


                    try
                    {
                        if (_log.IsInfoEnabled)
                            _log.Info(methodBaseName + " : Getting the departments with" + " the following SQL...." + _sbTKITDepts.ToString());
                        //pDsDepts = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbTKITDepts.ToString));
                        var fields = new[] { "DEPT_ID", "DESCRIPTION", "UPDATE_DATE", "UPDATE_USER_ID", "STATUS", "ORG_GROUP_ID" };
                       var lstResult= objContext.Database.DifferedExecuteQuery<TKIT_DEPT>(fields, _sbTKITDepts.ToString()).ToList();
                        pDsDepts= lstResult.ToDataSet();
                        //Code to implemtnt the functionality for UserDept exist. 
                       // DataTable _dtTempDept = default(DataTable);
                        string pStrRetVal = string.Empty;
                       // _dtTempDept = pDsDepts.Tables[0].Copy();

                        //DataColumn dcUserDeptExist = new DataColumn("USER_DEPT_EXISTS", System.Type.GetType("System.String"));
                        //_dtTempDept.Columns.Add(dcUserDeptExist);
                       // pDsDepts = new DataSet();
                       // pDsDepts.Tables.Add(_dtTempDept);

                        //Code to insert User Dept Exists
                        for (int i = 0; i <= pDsDepts.Tables[0].Rows.Count - 1; i++)
                        {
                            _sbTKITDepts = new StringBuilder();

                            var _with2 = _sbTKITDepts;
                            _with2.Append(" SELECT DEPT_ID");
                            _with2.Append(" FROM TKIT_REQUESTOR_DEPT");
                            _with2.Append(" WHERE DEPT_ID = '" + pDsDepts.Tables[0].Rows[i]["DEPT_ID"]).Append( "'");

                            if (pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                            {
                                _with2.Append(" AND ORG_GROUP_ID = '" ).Append( pDsDepts.Tables[0].Rows[i]["ORG_GROUP_ID"] ).Append( "'");
                            }

                            if (_log.IsInfoEnabled)
                                _log.Info(methodBaseName + " : Getting the departments with" + " the following SQL...." + _sbTKITDepts.ToString());
                            try
                            {
                               // pStrRetVal = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_sbTKITDepts.ToString));
                                pStrRetVal =  objContext.Database.SqlQuery<string>(_sbTKITDepts.ToString()).FirstOrDefault();
                               
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " : Failed to get the User departments:" + " Exception is : " + ex.ToString());
                            }
                            if (_log.IsInfoEnabled)
                                _log.Info(methodBaseName + ": pStrRetVal..." + pStrRetVal);

                            if (!string.IsNullOrEmpty(pStrRetVal))
                            {
                                pDsDepts.Tables[0].Rows[i]["USER_DEPT_EXISTS"] = "YES";
                            }
                            else
                            {
                                pDsDepts.Tables[0].Rows[i]["USER_DEPT_EXISTS"] = "NO";
                            }
                            pDsDepts.AcceptChanges();
                        }

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " : Failed to get the departments:" + " Exception is : " + ex.ToString());
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get the departments:" + " Exception is : " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbTKITDepts = null;
            }

            return AtparStatusCodes. ATPAR_OK;

        }


    }
}
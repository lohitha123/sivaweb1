using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Deliver;
using AtPar.Service.Interfaces.Deliver;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;
using System.Drawing;
using System.IO;
using AtParVbUtilities;

namespace AtPar.Deliver.Service
{
    public class DeliveryReportService : IDeliveryReportService
    {
        IDeliveryReportRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        AtParVbUtilities.VbUtilities ObjVButil = new VbUtilities();

        public DeliveryReportService(ILog log, ICommonRepository commonRepository, IDeliveryReportRepository repo)
        {
            _log = log;
            _commonRepo = commonRepository;
            _Repo = repo;
            _log.SetLoggerType(typeof(DeliveryReportService));
        }


        public AtParWebApiResponse<bool> GetDeliveryReportData(string OrgGroupID, string fromDate, string ToDate,
           string srvrUserID,string PoId, string DeliverTo, string TrackingNo, string DeliverdBy,
           string DeptId, string VendorName, string ItmDesc, string Loc, string ItemId,
           string Carrier, string Requestor, string BlnTflag, string DeliveryLoc, string Status, string CurrStatus, 
           string LocDescr, string PakageType,string Pallet)
        {


            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            List<VM_DELV_DELIVERY_REPORT> lstDeliveryReportData = null;
           
            var response = new AtParWebApiResponse<bool>();

            try
            {

                lstDeliveryReportData = _Repo.GetDeliveryReportData(OrgGroupID, fromDate, ToDate,
          srvrUserID, PoId, DeliverTo, TrackingNo, DeliverdBy,
          DeptId, VendorName, ItmDesc, Loc, ItemId,
          Carrier, Requestor, BlnTflag, DeliveryLoc, Status, CurrStatus,
          LocDescr, PakageType, Pallet);
                if (lstDeliveryReportData.Count > 0)
                {

                    foreach (var Itm in lstDeliveryReportData.Where(w => w.PICKUP_USER != "" && w.PICKUP_USER != null))
                    {
                        foreach (var UItem in lstDeliveryReportData.Where(K => K.TRANSACTION_ID == Itm.TRANSACTION_ID))
                        {
                            UItem.PICKUP_USER = Itm.PICKUP_USER;
                        }
                    }

                    DataSet DsDeliveryDetails = new DataSet();
                    DsDeliveryDetails.Tables.Add(lstDeliveryReportData.ToDataTable());

                    DsDeliveryDetails.Tables[0].Columns.Add("SIGNATURE");
                    DsDeliveryDetails.Tables[0].Columns.Add("STATUS_MESSAGE");
                    DsDeliveryDetails.Tables[0].Columns.Add("STATUS_TIME");
                    DsDeliveryDetails.Tables[0].Columns.Add("STATUS_USER");
                    DsDeliveryDetails.Tables[0].Columns.Add("RECEPIENT");
                    DsDeliveryDetails.Tables[0].Columns.Add("HANDOVER");



                    DataTable dtDelDetTable = new DataTable();
                    long _StatusCode = BuildDelvDetailsTable(srvrUserID, OrgGroupID, ref dtDelDetTable, DsDeliveryDetails);
                    if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                       // response.AtParException(_StatusCode, _commonRepo, _log);
                        //return response;
                    }



                    //
                    // Need to send to UI
                    DataSet pDSTransRep = new DataSet();

                    DsDeliveryDetails.Tables.Clear();
                    DsDeliveryDetails.Tables.Add(dtDelDetTable);
                    pDSTransRep = DsDeliveryDetails.Copy();
                    int currtrans = 0;
                    int deleteCount = 0;
                    List<MT_DELV_DLVR_ATTEMPT> lstDelvAttempts = new List<MT_DELV_DLVR_ATTEMPT>();
                    List<MT_DELV_DLVR_ATTEMPT> lstDelvAttemptsTemp = new List<MT_DELV_DLVR_ATTEMPT>();

                    //To build a dataset that contains only Delivery Report headers
                    for (int cnt = 0; cnt <= DsDeliveryDetails.Tables[0].Rows.Count - 1; cnt++)
                    {
                        var _with1 = DsDeliveryDetails.Tables[0].Rows[cnt];
                        if (currtrans == Convert.ToInt32(DsDeliveryDetails.Tables[0].Rows[cnt]["TRANSACTION_ID"]))
                        {
                            pDSTransRep.Tables[0].Rows.RemoveAt(cnt - 1 - deleteCount);
                            deleteCount = deleteCount + 1;
                        }
                        else
                        {
                            currtrans = Convert.ToInt32(DsDeliveryDetails.Tables[0].Rows[cnt]["TRANSACTION_ID"]);
                        }
                        if (DsDeliveryDetails.Tables[0].Rows[cnt]["DELIVERED_BY"] != DBNull.Value)
                        {
                            string strDeliveredBy = string.Empty;
                            // Uday Comenting Need to check again'
                            //  _StatusCode = _Repo.GetUserFullName(DsDeliveryDetails.Tables[0].Rows[cnt]["DELIVERED_BY"].ToString(), ref strDeliveredBy);
                            //DsDeliveryDetails.Tables[0].Rows[cnt]["DELIVERED_BY"] = strDeliveredBy;
                        }

                      

                       

                    }
                    //To fill the Dataset with two different data tables namely Deliver Report and Deliver Details
                    DataSet _ds = new DataSet();
                    DataTable tableRep = default(DataTable);
                    tableRep = new DataTable("DELIVERYREPORT");
                    pDSTransRep.Tables[0].TableName = "DELIVERYREPORT";

                    tableRep = pDSTransRep.Tables[0].Copy();
                    _ds.Tables.Add(tableRep);
                    DataTable tblDet = new DataTable("DELIVERDETAILS");
                    DsDeliveryDetails.Tables[0].TableName = "DELIVERDETAILS";
                    tblDet = DsDeliveryDetails.Tables[0].Copy();
                    _ds.Tables.Add(tblDet);
                    DsDeliveryDetails.Clear();
                    DsDeliveryDetails = _ds.Copy();

                    //For ReDeliver Data  logic
                    DataTable _dtDeliveryReport = new DataTable();
                    DataTable _dtDeliveryDetails = new DataTable();

                    _dtDeliveryReport = DsDeliveryDetails.Tables["DELIVERYREPORT"];
                    _dtDeliveryDetails = DsDeliveryDetails.Tables["DELIVERDETAILS"];

                    DataRow[] _drHdr = null;                   
                    DataRow[] _drDetails = null;
                    StringBuilder _sbSelect = new StringBuilder();
                    _drHdr = _dtDeliveryReport.Select("REDELIVER ='N'");
                    for (int _intHCnt = 0; _intHCnt <= _drHdr.Count() - 1; _intHCnt++)
                    {
                        _dtDeliveryReport.Rows.Remove(_drHdr[_intHCnt]);
                    }
                    _dtDeliveryReport.AcceptChanges();



                    for (int _intHdrCnt = 0; _intHdrCnt <= _dtDeliveryReport.Rows.Count - 1; _intHdrCnt++)
                    {
                        _sbSelect.Remove(0, _sbSelect.Length);

                        _sbSelect.Append("PO_ID =");
                        _sbSelect.Append("'" + _dtDeliveryReport.Rows[_intHdrCnt]["PO_ID"] + "'");
                        _sbSelect.Append(" AND LINE_NO =");
                        _sbSelect.Append("'" + _dtDeliveryReport.Rows[_intHdrCnt]["LINE_NO"] + "'");
                        _sbSelect.Append(" AND SCH_LINE_NO =");
                        _sbSelect.Append("'" + _dtDeliveryReport.Rows[_intHdrCnt]["SCH_LINE_NO"] + "'");
                        _sbSelect.Append(" AND REPORT_DATA_3 =");
                        _sbSelect.Append("'" + _dtDeliveryReport.Rows[_intHdrCnt]["REPORT_DATA_3"] + "'");
                        _sbSelect.Append(" AND OLD_LOCATION =");
                        _sbSelect.Append("'" + _dtDeliveryReport.Rows[_intHdrCnt]["OLD_LOCATION"] + "'");
                        _sbSelect.Append(" AND RECEIPT_DATE =");
                        _sbSelect.Append("'" + _dtDeliveryReport.Rows[_intHdrCnt]["RECEIPT_DATE"] + "'");
                        if (_dtDeliveryReport.Rows[_intHdrCnt]["ITEM_ID"] != DBNull.Value)
                        {
                            _sbSelect.Append(" AND ITEM_ID =");
                            _sbSelect.Append("'" + _dtDeliveryReport.Rows[_intHdrCnt]["ITEM_ID"] + "'");
                        }
                        _drDetails = _dtDeliveryDetails.Select(_sbSelect.ToString());

                        for (int _intDetailCnt = 0; _intDetailCnt <= _drDetails.Count() - 1; _intDetailCnt++)
                        {
                            _drDetails[_intDetailCnt]["TRANSACTION_ID"] = _dtDeliveryReport.Rows[_intHdrCnt]["TRANSACTION_ID"];
                            //_drDetails(_intDetailCnt)[TRANS_ID") = _dtDeliveryReport.Rows[_intHdrCnt]["TRANS_ID")
                            if (_drDetails[_intDetailCnt]["STATUS_MESSAGE"].ToString() == "Delivered" & _drDetails[_intDetailCnt]["REDELIVER"].ToString() == "Y")
                            {
                                _drDetails[_intDetailCnt]["STATUS_MESSAGE"] = "Re-Delivered";
                                _dtDeliveryReport.Rows[_intHdrCnt]["STATUS_MESSAGE"] = "Re-Delivered";
                            }

                            if (_drDetails[_intDetailCnt]["ITEM_NOTES"] != DBNull.Value)
                            {
                                if (!string.IsNullOrEmpty(_drDetails[_intDetailCnt]["ITEM_NOTES"].ToString()))
                                {
                                    _dtDeliveryReport.Rows[_intHdrCnt]["ITEM_NOTES"] = _drDetails[_intDetailCnt]["ITEM_NOTES"].ToString().Replace("TRACKING NUMBER-", "");
                                }
                            }

                            if (_intDetailCnt > 1)
                            {
                                if (_drDetails[_intDetailCnt]["STATUS_MESSAGE"].ToString() == "Parcel Receipt")
                                {
                                    _dtDeliveryDetails.Rows.Remove(_drDetails[_intDetailCnt]);
                                    continue;
                                }
                                if (_drDetails[_intDetailCnt]["STATUS_MESSAGE"].ToString() == "MMIS Receipt")
                                {
                                    _dtDeliveryDetails.Rows.Remove(_drDetails[_intDetailCnt]);
                                }
                            }

                        }
                        _dtDeliveryDetails.AcceptChanges();

                        lstDelvAttemptsTemp = _Repo.GetDeliveryAttempts(Convert.ToInt32(_dtDeliveryReport.Rows[_intHdrCnt]["TRANSACTION_ID"]));

                        if (lstDelvAttemptsTemp.Count > 0)
                        {
                            lstDelvAttempts.AddRange(lstDelvAttemptsTemp);
                        }
                    }

                    DsDeliveryDetails.Tables.Clear();
                    DsDeliveryDetails.Tables.Add(_dtDeliveryReport);
                    DsDeliveryDetails.Tables.Add(_dtDeliveryDetails);

                    //

                    _dtDeliveryReport.DefaultView.Sort = "PO_ID" + " " + "DESC";
                    _dtDeliveryReport = _dtDeliveryReport.DefaultView.ToTable();

                    Dictionary<string, object> obj = new Dictionary<string, object> { { "deliverHeaders", _dtDeliveryReport }, { "deliverDetails", _dtDeliveryDetails }, { "deliverAttempts", lstDelvAttempts } };
                    response.DataDictionary = obj;
                    response.AtParSuccess();


                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                }

                return response;
            }
            catch(Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }


        }

        public long BuildDelvDetailsTable(string psrvrUserID, string OrgGroupID, ref DataTable pDTDelvDetails, DataSet pDsDelVDet)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataRow _row = default(DataRow);
            //Dim _dttempTable As New DataTable
            int intCurrTransID = 0;
            string strDownLoadUsr = string.Empty;
            string strDownLoadDtTm = string.Empty;
            string strRecvUsr = string.Empty;
            string strRecvDtTm = string.Empty;
            long _StatusCode = 0;
            string strBadgeTrackNo = string.Empty;
            string _strSQL = string.Empty;
            string strRecvUserName = string.Empty;
            string strDownLoadUserName = string.Empty;
            string strUserName = string.Empty;
            string strRecvUser = string.Empty;
            string strDwnUser = string.Empty;
            string strUser = string.Empty;
            string strUsrName = string.Empty;
            string strDelvBy = string.Empty;
            string strPickUser = string.Empty;
            string strDeliveredBy = string.Empty;
            DataSet pDSParcelCntDetails = new DataSet();
            string strExtTrackingNo = string.Empty;
            string strParcelCountDtTm = string.Empty;
            string strParcelCountUsrId = string.Empty;
            string strReDeliver = string.Empty;
            List<VM_DELV_PARCELCOUNT_DETAILS> lstParcelCount = new List<VM_DELV_PARCELCOUNT_DETAILS>();
            try
            {
                string _strBadgeTrackNo = string.Empty;

                _strBadgeTrackNo = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.BADGE_TRACK_INFO.ToString(), (int)AtParWebEnums.EnumApps.Deliver, OrgGroupID);

                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    return _StatusCode;
                }

                var lstParcelDetails = _Repo.ParcelCountDetails();//.ToDataSet(); // pDSParcelCntDetails
                //pDTDelvDetails.Columns.Add("")
                pDSParcelCntDetails=lstParcelDetails.ToDataSet();


                pDTDelvDetails.Columns.Add("TRANSACTION_ID");
                pDTDelvDetails.Columns.Add("PO_ID");
                pDTDelvDetails.Columns.Add("LINE_NO");
                pDTDelvDetails.Columns.Add("REPORT_DATA_3");
                pDTDelvDetails.Columns.Add("REPORT_DATA_31");
                pDTDelvDetails.Columns.Add("CARRIER_ID");
                pDTDelvDetails.Columns.Add("DEPT_ID");
                pDTDelvDetails.Columns.Add("DELIVERED_TO");
                pDTDelvDetails.Columns.Add("STATUS");
                pDTDelvDetails.Columns.Add("TRANS_ID");
                pDTDelvDetails.Columns.Add("SIGNATURE_ID");
                pDTDelvDetails.Columns.Add("RECEIVER_NAME");
                pDTDelvDetails.Columns.Add("REPORT_DATA_8");
                pDTDelvDetails.Columns.Add("REPORT_DATA_10");
                pDTDelvDetails.Columns.Add("KEY_4");
                pDTDelvDetails.Columns.Add("UPDATE_DT_TIME");
                pDTDelvDetails.Columns.Add("VENDOR_NAME");
                pDTDelvDetails.Columns.Add("RECEIPT_DATE");
                pDTDelvDetails.Columns.Add("LOCATION");
                pDTDelvDetails.Columns.Add("OLD_LOCATION");
                pDTDelvDetails.Columns.Add("DELIVERED_BY");
                pDTDelvDetails.Columns.Add("ITEM_ID");
                pDTDelvDetails.Columns.Add("QTY", Type.GetType("System.Double"));
                pDTDelvDetails.Columns.Add("DELIVERY_LOCATION");
                pDTDelvDetails.Columns.Add("DOWNLOAD_USER_ID");
                pDTDelvDetails.Columns.Add("RECEIVE_USERID");
                pDTDelvDetails.Columns.Add("DOWNLOAD_DT_TIME");
                pDTDelvDetails.Columns.Add("EVENT_ID");
                pDTDelvDetails.Columns.Add("UPDATE_DATE");
                pDTDelvDetails.Columns.Add("SIGNATURE");
                pDTDelvDetails.Columns.Add("STATUS_MESSAGE");
                pDTDelvDetails.Columns.Add("STATUS_TIME");
                pDTDelvDetails.Columns.Add("STATUS_USER");
                pDTDelvDetails.Columns.Add("RECEPIENT");
                pDTDelvDetails.Columns.Add("HANDOVERUSER");
                pDTDelvDetails.Columns.Add("INTTRACKING");
                pDTDelvDetails.Columns.Add("EXTTRACKING");
                pDTDelvDetails.Columns.Add("MFGITEMID");
                pDTDelvDetails.Columns.Add("UOM");
                pDTDelvDetails.Columns.Add("PICKUP_USER");
                pDTDelvDetails.Columns.Add("CURRENT_STATUS_USER");
                pDTDelvDetails.Columns.Add("HANDOVER");
                pDTDelvDetails.Columns.Add("COMMENTS");
                pDTDelvDetails.Columns.Add("HDR_COMMENTS");
                pDTDelvDetails.Columns.Add("REDELIVER");
                pDTDelvDetails.Columns.Add("SCH_LINE_NO");
                pDTDelvDetails.Columns.Add("ITEM_NOTES");
                pDTDelvDetails.Columns.Add("PALLET");




                foreach (DataRow row in pDsDelVDet.Tables[0].Rows)
                {
                    strDownLoadUsr = string.Empty;
                    strDownLoadDtTm = string.Empty;
                    strRecvUsr = string.Empty;
                    strRecvDtTm = string.Empty;
                    strParcelCountUsrId = string.Empty;

                    if (row["DELIVERED_BY"] != DBNull.Value)
                    {
                        strDeliveredBy = string.Empty;


                        _StatusCode = _Repo.GetUserFullName(row["DELIVERED_BY"].ToString(), ref strDeliveredBy);
                        if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                        {

                            return _StatusCode;
                        }
                    }

                    row["DELIVERED_BY"] = strDeliveredBy;

                    if (row["REDELIVER"] == DBNull.Value)
                    {
                        row["REDELIVER"] = string.Empty;
                    }


                    if (intCurrTransID != Convert.ToInt32((row["TRANSACTION_ID"])))
                    {
                        intCurrTransID = Convert.ToInt32((row["TRANSACTION_ID"]));
                        if ((string.IsNullOrEmpty(strDownLoadUsr) && string.IsNullOrEmpty(strDownLoadDtTm)))
                        {
                            if (row["EVENT_ID"] == DBNull.Value)
                            {
                                if (row["DOWNLOAD_USER_ID"] != DBNull.Value)
                                {
                                    strDownLoadUsr = row["DOWNLOAD_USER_ID"].ToString();
                                }
                            }
                            else
                            {
                                if (row["EVENT_USER_ID"] != DBNull.Value)
                                {
                                    strDownLoadUsr = row["EVENT_USER_ID"].ToString();
                                }
                            }

                            if (row["DOWNLOAD_DT_TIME"] != DBNull.Value)
                            {
                                strDownLoadDtTm = row["DOWNLOAD_DT_TIME"].ToString();
                            }
                        }

                        if ((string.IsNullOrEmpty(strRecvUsr) && string.IsNullOrEmpty(strRecvDtTm)))
                        {
                            if (row["RECEIVE_USERID"] != DBNull.Value)
                            {
                                strRecvUsr = row["RECEIVE_USERID"].ToString();
                            }
                            if (row["RECEIPT_DATE"] != DBNull.Value)
                            {
                                strRecvDtTm = row["RECEIPT_DATE"].ToString();
                            }
                        }

                        //When EVENT_ID is Null then need to display only MMIS Receipt and should exit for

                        if (row["EVENT_ID"] == DBNull.Value)
                        {
                            //To dispaly Parcel Receipt datetime when Tracking# scanned at the time of Parcel Count matches with the Tracking# scanned at the time of receiving
                            if (pDSParcelCntDetails.Tables.Count > 0)
                            {
                                if (row["REPORT_DATA_31"] != DBNull.Value)
                                {
                                    strExtTrackingNo = row["REPORT_DATA_31"].ToString();
                                    DataRow[] _drParcelCntRow = null;
                                    _drParcelCntRow = pDSParcelCntDetails.Tables[0].Select(" TRACKING_NO ='" + strExtTrackingNo + "' ");
                                    if (_drParcelCntRow.Length > 0)
                                    {
                                        foreach (DataRow _dr in _drParcelCntRow)
                                        {
                                            strParcelCountDtTm = _dr["SCAN_DATE"].ToString();
                                            strParcelCountUsrId = _dr["USER_ID"].ToString();
                                            if (strParcelCountUsrId != string.Empty & !string.IsNullOrEmpty(strParcelCountDtTm) & Convert.ToDouble(row["DELIVER_NON_PO"]) != 1)
                                            {
                                                strRecvUserName = string.Empty;
                                                _row = pDTDelvDetails.NewRow();
                                                _row["STATUS_MESSAGE"] = "Parcel Receipt";
                                                _row["STATUS_TIME"] = strParcelCountDtTm;
                                                _StatusCode = _Repo.GetUserFullName(strParcelCountUsrId, ref strRecvUserName);
                                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                                {

                                                    return _StatusCode;
                                                }
                                                _row["STATUS_USER"] = strRecvUserName;
                                                BuildNewRow(psrvrUserID, ref _row, row);
                                                pDTDelvDetails.Rows.Add(_row);
                                            }
                                        }
                                    }
                                }
                            }
                            if (strRecvUsr != string.Empty & !string.IsNullOrEmpty(strRecvDtTm) & Convert.ToDouble(row["DELIVER_NON_PO"]) != 1)
                            {
                                strRecvUserName = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "MMIS Receipt";
                                _row["STATUS_TIME"] = strRecvDtTm;
                                _StatusCode = _Repo.GetUserFullName(strRecvUsr, ref strRecvUserName);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strRecvUserName;
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                            continue;
                        }

                        if (row["STATUS"] == DBNull.Value)
                        {
                            row["STATUS"] = -1;
                        }

                        if (row["DELIVER_NON_PO"] == DBNull.Value)
                        {
                            row["DELIVER_NON_PO"] = -1;
                        }

                        if ((Convert.ToDouble(row["STATUS"]) != (int)AtParWebEnums.STATUS.RECEIVE & Convert.ToDouble(row["DELIVER_NON_PO"]) != 1))
                        {
                            //To dispaly Parcel Receipt datetime when Tracking# scanned at the time of Parcel Count matches with the Tracking# scanned at the time of receiving
                            if (pDSParcelCntDetails.Tables.Count > 0)
                            {
                                if (row["REPORT_DATA_31"] == DBNull.Value)
                                {
                                    strExtTrackingNo = row["REPORT_DATA_31"].ToString();
                                    DataRow[] _drParcelCntRow = null;
                                    _drParcelCntRow = pDSParcelCntDetails.Tables[0].Select(" TRACKING_NO ='" + strExtTrackingNo + "' ");
                                    if (_drParcelCntRow.Length > 0)
                                    {
                                        foreach (DataRow _dr in _drParcelCntRow)
                                        {
                                            strParcelCountDtTm = _dr["SCAN_DATE"].ToString();
                                            strParcelCountUsrId = _dr["USER_ID"].ToString();
                                            if (strParcelCountUsrId != string.Empty & !string.IsNullOrEmpty(strParcelCountDtTm))
                                            {
                                                strRecvUserName = string.Empty;
                                                _row = pDTDelvDetails.NewRow();
                                                _row["STATUS_MESSAGE"] = "Parcel Receipt";
                                                _row["STATUS_TIME"] = strParcelCountDtTm;
                                                _StatusCode = _Repo.GetUserFullName(strParcelCountUsrId, ref strRecvUserName);
                                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                                {

                                                    return _StatusCode;
                                                }
                                                _row["STATUS_USER"] = strRecvUserName;
                                                BuildNewRow(psrvrUserID, ref _row, row);
                                                pDTDelvDetails.Rows.Add(_row);
                                            }
                                        }
                                    }
                                }
                            }

                            if (strRecvUsr != string.Empty & !string.IsNullOrEmpty(strRecvDtTm) & Convert.ToDouble(row["DELIVER_NON_PO"]) != 1)
                            {
                                strRecvUserName = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "MMIS Receipt";
                                _row["STATUS_TIME"] = strRecvDtTm;
                                _StatusCode = _Repo.GetUserFullName(strRecvUsr, ref strRecvUserName);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strRecvUserName;
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                        }
                        if (Convert.ToDouble(row["EVENT_ID"]) != (int)AtParWebEnums.STATUS.DOWNLOAD & Convert.ToDouble(row["STATUS"]) != (int)AtParWebEnums.STATUS.RECEIVE & Convert.ToDouble(row["EVENT_ID"]) != (int)AtParWebEnums.STATUS.CANCELED & Convert.ToDouble(row["DELIVER_NON_PO"]) != 1)
                        {
                            DataSet dsEventdownloaddate = new DataSet();
                            if (strDownLoadUsr != string.Empty & strDownLoadDtTm != string.Empty)
                            {
                                strDownLoadUserName = string.Empty;
                                string Updatedate = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Download";
                                ///'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                if (!string.IsNullOrEmpty(Convert.ToString(row["UPDATE_DATE"])) & intCurrTransID > 0)
                                {
                                    //_strSQL = "SELECT MAX(UPDATE_DATE)UPDATE_DATE  FROM MT_DELV_ITEM_TRIP_MISC_EVENT  WHERE TRANSACTION_ID=" + intCurrTransID + "    AND UPDATE_DATE <='" + row["UPDATE_DATE") +"' and EVENT_ID=1";

                                    //if (log.IsInfoEnabled)
                                    //    log.Info(methodBaseName + ": Executing  Event Download Date SQL " + _strSQL);

                                    //try
                                    //{
                                    //    dsEventdownloaddate = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_strSQL));
                                    //}
                                    //catch (Exception ex)
                                    //{
                                    //    return functionReturnValue;
                                    //}

                                    Updatedate = _Repo.GetDeliveryTripUpdateDate(intCurrTransID, row["UPDATE_DATE"].ToString());

                                }
                                if (!string.IsNullOrEmpty(Updatedate))
                                {
                                    _row["STATUS_TIME"] = Updatedate;
                                }
                                else
                                {
                                    _row["STATUS_TIME"] = strDownLoadDtTm;

                                }

                                ///'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                                //_row[STATUS_TIME") = strDownLoadDtTm
                                _StatusCode = _Repo.GetUserFullName(row["EVENT_USER_ID"].ToString(), ref strDownLoadUserName);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strDownLoadUserName;
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                        }


                        if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.DOWNLOAD | Convert.ToDouble(row["STATUS"]) == (int)AtParWebEnums.STATUS.RECEIVE)
                        {
                            if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.DOWNLOAD)
                            {
                                strUserName = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Download";
                                _StatusCode = _Repo.GetUserFullName(row["EVENT_USER_ID"].ToString(), ref strUsrName);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strUsrName;
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _row["DELIVERED_BY"] = row["EVENT_USER_ID"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                            else if (Convert.ToDouble(row["STATUS"]) == (int)AtParWebEnums.STATUS.RECEIVE & Convert.ToDouble(row["DELIVER_NON_PO"]) != 1)
                            {
                                //To dispaly Parcel Receipt datetime when Tracking# scanned at the time of Parcel Count matches with the Tracking# scanned at the time of receiving
                                if (pDSParcelCntDetails.Tables.Count > 0)
                                {
                                    if (row["REPORT_DATA_31"] != DBNull.Value)
                                    {
                                        strExtTrackingNo = row["REPORT_DATA_31"].ToString();
                                        DataRow[] _drParcelCntRow = null;
                                        _drParcelCntRow = pDSParcelCntDetails.Tables[0].Select(" TRACKING_NO ='" + strExtTrackingNo + "' ");
                                        if (_drParcelCntRow.Length > 0)
                                        {
                                            foreach (DataRow _dr in _drParcelCntRow)
                                            {
                                                strParcelCountDtTm = _dr["SCAN_DATE"].ToString();
                                                strParcelCountUsrId = _dr["USER_ID"].ToString();
                                                strRecvUser = string.Empty;
                                                _row = pDTDelvDetails.NewRow();
                                                _row["STATUS_MESSAGE"] = "Parcel Receipt";
                                                _StatusCode = _Repo.GetUserFullName(strParcelCountUsrId,ref strRecvUser);
                                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                                {

                                                    return _StatusCode;
                                                }
                                                _row["STATUS_USER"] = strRecvUser;
                                                _row["STATUS_TIME"] = strParcelCountDtTm;
                                                _row["DELIVERED_BY"] = ((row["RECEIVE_USERID"] == DBNull.Value) ? string.Empty : row["RECEIVE_USERID"]);
                                                BuildNewRow(psrvrUserID, ref _row, row);
                                                pDTDelvDetails.Rows.Add(_row);
                                            }
                                        }
                                    }
                                }

                                strRecvUser = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "MMIS Receipt";
                                _StatusCode = _Repo.GetUserFullName((row["RECEIVE_USERID"] == DBNull.Value) ? string.Empty : row["RECEIVE_USERID"].ToString(), ref strRecvUser);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strRecvUser;
                                _row["STATUS_TIME"] = row["RECEIPT_DATE"];
                                _row["DELIVERED_BY"] = ((row["RECEIVE_USERID"] == DBNull.Value) ? string.Empty : row["RECEIVE_USERID"]);
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);

                            }


                        }
                        else
                        {
                            if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.PICKUP)
                            {
                                strPickUser = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Pickup";
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _StatusCode = _Repo.GetUserFullName((row["RECEIVE_USERID"] == DBNull.Value) ? row["DOWNLOAD_USER_ID"].ToString() : row["RECEIVE_USERID"].ToString(), ref strPickUser);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = row["DELIVERED_BY"];
                                _row["DELIVERED_BY"] = row["DELIVERED_BY"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                            else if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.LOAD)
                            {
                                strUser = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Load";
                                _StatusCode = _Repo.GetUserFullName((row["RECEIVE_USERID"] == DBNull.Value) ? row["DOWNLOAD_USER_ID"].ToString() : row["RECEIVE_USERID"].ToString(), ref strUser);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = row["DELIVERED_BY"];
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _row["DELIVERED_BY"] = row["DELIVERED_BY"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                            else if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.UNLOAD)
                            {
                                strUserName = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Unload";
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _StatusCode = _Repo.GetUserFullName(((row["RECEIVE_USERID"] == DBNull.Value) ? row["DOWNLOAD_USER_ID"].ToString() : row["RECEIVE_USERID"].ToString()), ref strUserName);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = row["DELIVERED_BY"];
                                _row["DELIVERED_BY"] = row["DELIVERED_BY"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);

                            }
                            else if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.HANDOVER)
                            {
                                strUserName = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "HandOver";

                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _StatusCode = _Repo.GetUserFullName(row["EVENT_USER_ID"].ToString(), ref strUserName);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strUserName;
                                _row["DELIVERED_BY"] = row["EVENT_USER_ID"];
                                _row["HANDOVER"] = row["CURRENT_STATUS_USER"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                            else if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.DELIVERED)
                            {
                                strDelvBy = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Delivered";
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _row["STATUS_USER"] = row["DELIVERED_BY"];
                                _row["DELIVERED_BY"] = row["DELIVERED_BY"];
                                DataSet dsBadgeDetails = new DataSet();
                                List<RM_USER_LOCATIONS> lstBadgeDetails = _Repo.GetBadgeDetails(row["RECEIVER_NAME"].ToString());

                                if (lstBadgeDetails.Count > 0)
                                {

                                    row["RECEIVER_NAME"] = lstBadgeDetails[0].RECIEPENTNAME;
                                    _row["RECEPIENT"] = row["RECEIVER_NAME"];


                                }
                                else
                                {
                                    if (row["RECEIVER_NAME"] != DBNull.Value)
                                    {
                                        _row["RECEPIENT"] = row["RECEIVER_NAME"];
                                    }
                                    else
                                    {
                                        _row["RECEPIENT"] = string.Empty;
                                    }

                                }
                                if ((row["SIGNATURE_ID"] != DBNull.Value))
                                {

                                    row["SIGNATURE"] = _Repo.GetSignature(row["SIGNATURE_ID"].ToString());

                                }
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                        }
                    }

                    else
                    {
                        if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.DOWNLOAD | Convert.ToDouble(row["STATUS"]) == (int)AtParWebEnums.STATUS.RECEIVE)
                        {
                            if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.DOWNLOAD)
                            {
                                strDwnUser = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Download";
                                _StatusCode = _Repo.GetUserFullName(row["EVENT_USER_ID"].ToString(), ref strDwnUser);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strDwnUser;
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _row["DELIVERED_BY"] = row["EVENT_USER_ID"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);

                            }
                            else if (Convert.ToDouble(row["STATUS"]) == (int)AtParWebEnums.STATUS.RECEIVE & Convert.ToDouble(row["DELIVER_NON_PO"]) != 1)
                            {
                                //To dispaly Parcel Receipt datetime when Tracking# scanned at the time of Parcel Count matches with the Tracking# scanned at the time of receiving
                                if (pDSParcelCntDetails.Tables.Count > 0)
                                {
                                    if (row["REPORT_DATA_31"] != DBNull.Value)
                                    {
                                        strExtTrackingNo = row["REPORT_DATA_31"].ToString();
                                        DataRow[] _drParcelCntRow = null;
                                        _drParcelCntRow = pDSParcelCntDetails.Tables[0].Select(" TRACKING_NO ='" + strExtTrackingNo + "' ");
                                        if (_drParcelCntRow.Length > 0)
                                        {
                                            foreach (DataRow _dr in _drParcelCntRow)
                                            {
                                                strParcelCountDtTm = _dr["SCAN_DATE"].ToString();
                                                strParcelCountUsrId = _dr["USER_ID"].ToString();
                                                strRecvUser = string.Empty;
                                                _row = pDTDelvDetails.NewRow();
                                                _row["STATUS_MESSAGE"] = "Parcel Receipt";
                                                _StatusCode = _Repo.GetUserFullName(strParcelCountUsrId, ref strRecvUser);
                                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                                {

                                                    return _StatusCode;
                                                }
                                                _row["STATUS_USER"] = strRecvUser;
                                                _row["STATUS_TIME"] = strParcelCountDtTm;
                                                _row["DELIVERED_BY"] = ((row["RECEIVE_USERID"] == DBNull.Value) ? string.Empty : row["RECEIVE_USERID"]);
                                                BuildNewRow(psrvrUserID, ref _row, row);
                                                pDTDelvDetails.Rows.Add(_row);
                                            }
                                        }
                                    }
                                }

                                strRecvUser = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "MMIS Receipt";
                                _StatusCode = _Repo.GetUserFullName(row["RECEIVE_USERID"].ToString(), ref strRecvUser);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strRecvUser;
                                _row["STATUS_TIME"] = row["RECEIPT_DATE"];
                                _row["DELIVERED_BY"] = row["RECEIVE_USERID"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);


                            }

                        }
                        else
                        {
                            if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.PICKUP)
                            {
                                strPickUser = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Pickup";
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _StatusCode = _Repo.GetUserFullName((row["RECEIVE_USERID"] == DBNull.Value) ? row["DOWNLOAD_USER_ID"].ToString() : row["RECEIVE_USERID"].ToString(), ref strPickUser);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = row["DELIVERED_BY"];
                                _row["DELIVERED_BY"] = row["DELIVERED_BY"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                            else if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.LOAD)
                            {
                                strUser = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Load";
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _StatusCode = _Repo.GetUserFullName(((row["RECEIVE_USERID"] == DBNull.Value) ? row["DOWNLOAD_USER_ID"].ToString() : row["RECEIVE_USERID"].ToString()), ref strUser);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = row["DELIVERED_BY"];
                                _row["DELIVERED_BY"] = row["DELIVERED_BY"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                            else if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.DOWNLOAD)
                            {
                                strUserName = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Download";

                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _StatusCode = _Repo.GetUserFullName(row["EVENT_USER_ID"].ToString(), ref strUserName);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strUserName;
                                _row["DELIVERED_BY"] = row["EVENT_USER_ID"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);

                            }
                            else if (Convert.ToDouble(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.HANDOVER)
                            {
                                strUserName = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "HandOver";

                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _StatusCode = _Repo.GetUserFullName(row["EVENT_USER_ID"].ToString(), ref strUserName);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = strUserName;
                                _row["DELIVERED_BY"] = row["EVENT_USER_ID"];
                                _row["HANDOVER"] = row["CURRENT_STATUS_USER"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                            else if (Convert.ToInt32(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.UNLOAD)
                            {
                                strUserName = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Unload";
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _StatusCode = _Repo.GetUserFullName(((row["RECEIVE_USERID"] == DBNull.Value) ? row["DOWNLOAD_USER_ID"].ToString() : row["RECEIVE_USERID"].ToString()), ref strUserName);
                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {

                                    return _StatusCode;
                                }
                                _row["STATUS_USER"] = row["DELIVERED_BY"];
                                _row["DELIVERED_BY"] = row["DELIVERED_BY"];
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                            else if (Convert.ToInt32(row["EVENT_ID"]) == (int)AtParWebEnums.STATUS.DELIVERED)
                            {
                                strDelvBy = string.Empty;
                                _row = pDTDelvDetails.NewRow();
                                _row["STATUS_MESSAGE"] = "Delivered";
                                _row["STATUS_TIME"] = row["UPDATE_DATE"];
                                _row["STATUS_USER"] = row["DELIVERED_BY"];
                                _row["DELIVERED_BY"] = row["DELIVERED_BY"];
                                DataSet dsBadgeDetails = new DataSet();
                                List<RM_USER_LOCATIONS> lstBadgeDetails = _Repo.GetBadgeDetails(row["RECEIVER_NAME"].ToString());

                                if (lstBadgeDetails.Count > 0)
                                {

                                    row["RECEIVER_NAME"] = lstBadgeDetails[0].RECIEPENTNAME;
                                    _row["RECEPIENT"] = row["RECEIVER_NAME"];


                                }
                                else
                                {
                                    if (row["RECEIVER_NAME"] != DBNull.Value)
                                    {
                                        _row["RECEPIENT"] = row["RECEIVER_NAME"];
                                    }
                                    else
                                    {
                                        _row["RECEPIENT"] = string.Empty;
                                    }

                                }

                                if (row["SIGNATURE_ID"] != DBNull.Value)
                                {
                                    DataSet dsSignatures = new DataSet();

                                    if (!string.IsNullOrEmpty(Convert.ToString(row["SIGNATURE_ID"])))
                                    {
                                        row["SIGNATURE"] = _Repo.GetSignature(row["SIGNATURE_ID"].ToString());

                                    }

                                }
                                BuildNewRow(psrvrUserID, ref _row, row);
                                pDTDelvDetails.Rows.Add(_row);
                            }
                        }
                    }

                    strDownLoadUsr = string.Empty;
                    strDownLoadDtTm = string.Empty;
                    strRecvUsr = string.Empty;
                    strRecvDtTm = string.Empty;
                    strParcelCountUsrId = string.Empty;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;

            }
            return AtparStatusCodes.ATPAR_OK;

        }

        private long BuildNewRow(string psrvrUserID, ref DataRow pNewRow, DataRow pDrOrigRow)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                string _strNotes = string.Empty;
                var _detRow = pNewRow;
                _detRow["TRANSACTION_ID"] = pDrOrigRow["TRANSACTION_ID"];
                _detRow["PO_ID"] = pDrOrigRow["PO_ID"];
                _detRow["LINE_NO"] = pDrOrigRow["LINE_NO"];
                _detRow["REPORT_DATA_3"] = pDrOrigRow["REPORT_DATA_3"];
                _detRow["REPORT_DATA_31"] = pDrOrigRow["REPORT_DATA_31"];
                _detRow["CARRIER_ID"] = pDrOrigRow["CARRIER_ID"];
                _detRow["DEPT_ID"] = pDrOrigRow["DEPT_ID"];
                _detRow["DELIVERED_TO"] = pDrOrigRow["DELIVERED_TO"];
                _detRow["STATUS"] = pDrOrigRow["STATUS"];
                _detRow["TRANS_ID"] = pDrOrigRow["TRANS_ID"];
                _detRow["SIGNATURE_ID"] = pDrOrigRow["SIGNATURE_ID"];
                _detRow["RECEIVER_NAME"] = pDrOrigRow["RECEIVER_NAME"];
                _detRow["REPORT_DATA_8"] = pDrOrigRow["REPORT_DATA_8"];
                _detRow["REPORT_DATA_10"] = pDrOrigRow["REPORT_DATA_10"];
                _detRow["KEY_4"] = pDrOrigRow["KEY_4"];
                _detRow["UPDATE_DT_TIME"] = pDrOrigRow["UPDATE_DT_TIME"];
                _detRow["VENDOR_NAME"] = pDrOrigRow["VENDOR_NAME"];
                _detRow["RECEIPT_DATE"] = pDrOrigRow["RECEIPT_DATE"];
                _detRow["LOCATION"] = pDrOrigRow["LOCATION"];
                _detRow["OLD_LOCATION"] = pDrOrigRow["OLD_LOCATION"];
                _detRow["DELIVERED_BY"] = pDrOrigRow["DELIVERED_BY"];
                _detRow["ITEM_ID"] = pDrOrigRow["ITEM_ID"];
                _detRow["QTY"] = pDrOrigRow["QTY"];
                _detRow["DELIVERY_LOCATION"] = pDrOrigRow["DELIVERY_LOCATION"];
                _detRow["DOWNLOAD_USER_ID"] = pDrOrigRow["DOWNLOAD_USER_ID"];
                _detRow["RECEIVE_USERID"] = pDrOrigRow["RECEIVE_USERID"];
                _detRow["DOWNLOAD_DT_TIME"] = pDrOrigRow["DOWNLOAD_DT_TIME"];
                _detRow["EVENT_ID"] = pDrOrigRow["EVENT_ID"];
                _detRow["UPDATE_DATE"] = pDrOrigRow["UPDATE_DATE"];
                _detRow["SIGNATURE"] = pDrOrigRow["SIGNATURE"];
                if ((pDrOrigRow["HAND_OVER_DATE"] != DBNull.Value))
                {
                    _detRow["HANDOVERUSER"] = pDrOrigRow["HANDOVERUSER"];
                }
                _detRow["INTTRACKING"] = pDrOrigRow["REPORT_DATA_3"];
                _detRow["EXTTRACKING"] = pDrOrigRow["REPORT_DATA_31"];
                _detRow["MFGITEMID"] = pDrOrigRow["REPORT_DATA_19"];
                _detRow["UOM"] = pDrOrigRow["REPORT_DATA_20"];
                _detRow["PICKUP_USER"] = pDrOrigRow["PICKUP_USER"];
                _detRow["CURRENT_STATUS_USER"] = pDrOrigRow["CURRENT_STATUS_USER"];
                _detRow["COMMENTS"] = pDrOrigRow["COMMENTS"];
                _detRow["HDR_COMMENTS"] = pDrOrigRow["HDR_COMMENTS"];
                _detRow["REDELIVER"] = pDrOrigRow["REDELIVER"];
                _detRow["SCH_LINE_NO"] = pDrOrigRow["SCH_LINE_NO"];
                _strNotes = ((pDrOrigRow["ITEM_NOTES"] == DBNull.Value) ? string.Empty : pDrOrigRow["ITEM_NOTES"].ToString());
                _strNotes = _strNotes.Replace("TRACKING NUMBER-", "");
                _detRow["ITEM_NOTES"] = _strNotes.ToString();
                _detRow["PALLET"] = pDrOrigRow["PALLET"];

                if (! string.IsNullOrEmpty(pDrOrigRow["SIGNATURE"].ToString()))
                {
                    // string strPath = AppDomain.CurrentDomain.BaseDirectory + "\\AtPar\\AtParWebApi\\Uploaded\\" + pDrOrigRow["TRANSACTION_ID"].ToString() +".jpg";
                    string path = AppDomain.CurrentDomain.BaseDirectory[0].ToString() + ":\\AtPar\\AtParWebApi\\Uploaded\\";

                    _log.Debug(path + " Signature Path");

                    if (!Directory.Exists(path)) //Check if directory exist
                    {
                        Directory.CreateDirectory(path); //Create directory if it doesn't exist
                    }
                    string strPath = path + pDrOrigRow["TRANSACTION_ID"].ToString() + ".jpg";


                    _detRow["SIGNATURE"] = ObjVButil.Signature(strPath,pDrOrigRow["SIGNATURE"].ToString());
                }

               

                //If Not String.IsNullOrEmpty(nonStockStoreValue) Then
                //    If nonStockStoreValue = "Y" Then
                //        ["TRACKING#"] = pDrOrigRow["REPORT_DATA_31"]
                //    Else
                //        ["TRACKING#"] = pDrOrigRow["REPORT_DATA_3"]
                //    End If
                //End If

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.E_SERVERERROR;
               
            }

        }
               
    }
}


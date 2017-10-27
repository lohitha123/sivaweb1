using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Service
{
    public class LotSerialTrackingReportService : ILotSerialTrackingReportService
    {
        private ILog _log;
        private ILotSerialTrackingReportRepository _repo;
        private ICommonRepository _commonRepo;
        private ICommonPOUService _pouService;
        private ICommonPOURepository _pouRepo;
        private ICommonService _commonService;

        public LotSerialTrackingReportService(ILog log, ILotSerialTrackingReportRepository repo,
            ICommonRepository commonRepo, ICommonPOUService pouService,
            ICommonService commonService, ICommonPOURepository pouRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
            _pouService = pouService;
            _commonService = commonService;

            _pouRepo = pouRepo;
            _log.SetLoggerType(typeof(LotSerialTrackingReportService));
        }

        public AtParWebApiResponse<long> GetLotSerialTrackReport(string startDate, string endDate, string lotNumber, string srNo, string patientID, string examID, string accountID, string itemId, string strOrgGrpID,
          string deptID, int appID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            var response = new AtParWebApiResponse<long>();
            long _statusCode = -1;
            string _strBUnit = string.Empty;
            string _strCartID = string.Empty;
            string _strLocType = string.Empty;
            string ItemId = null;
            string _strItemDescr = null;
            string _strCompartment = null;

            DataSet _itemDS = new DataSet();
            DataTable _itemTbl = default(DataTable);
            DataRow _itemDR = default(DataRow);
            DataTable _itemInvTbl = default(DataTable);
            DataRow _itemInvDR = default(DataRow);

            DataSet _dsCartDetails = default(DataSet);
            DataSet _dsNonCartDetails = default(DataSet);
            DataSet pChargeReportDS = new DataSet();

            try
            {


                var resp = _repo.GetLotSerialTrackReport(startDate, endDate, lotNumber, srNo, patientID, examID, accountID, itemId, strOrgGrpID,
             deptID, appID, deviceTokenEntry);
                if (resp.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(resp.Item1, _commonRepo, _log);
                    return response;
                }
                pChargeReportDS = resp.Item2;
                _itemTbl = new DataTable();
                _itemTbl.Columns.Add("DateTime", Type.GetType("System.String"));
                _itemTbl.Columns.Add("ItemID_Descr", Type.GetType("System.String"));
                _itemTbl.Columns.Add("LotID", Type.GetType("System.String"));
                _itemTbl.Columns.Add("SerialID", Type.GetType("System.String"));
                _itemTbl.Columns.Add("Patient", Type.GetType("System.String"));

                _itemInvTbl = new DataTable();
                _itemInvTbl.Columns.Add("ItemID_Descr", Type.GetType("System.String"));
                _itemInvTbl.Columns.Add("LotID", Type.GetType("System.String"));
                _itemInvTbl.Columns.Add("SerialID", Type.GetType("System.String"));
                _itemInvTbl.Columns.Add("Location", Type.GetType("System.String"));



                for (int intCount = 0; intCount <= pChargeReportDS.Tables[0].Rows.Count - 1; intCount++)
                {
                    _itemDR = _itemTbl.NewRow();
                    _itemDR["DateTime"] = pChargeReportDS.Tables[0].Rows[intCount]["CAPTURE_DATE_TIME"];

                    if (!string.IsNullOrEmpty(pChargeReportDS.Tables[0].Rows[intCount]["ITEM_DESCRIPTION"].ToString()))
                    {
                        _itemDR["ItemID_Descr"] = pChargeReportDS.Tables[0].Rows[intCount]["ITEM_ID"] + " - "
                            + pChargeReportDS.Tables[0].Rows[intCount]["ITEM_DESCRIPTION"];
                        //strItemDescr - which read from ERP
                    }
                    else
                    {
                        _itemDR["ItemID_Descr"] = pChargeReportDS.Tables[0].Rows[intCount]["ITEM_ID"];
                    }

                    _itemDR["LotID"] = pChargeReportDS.Tables[0].Rows[intCount]["ITEM_LOTNUMBER"];
                    _itemDR["SerialID"] = pChargeReportDS.Tables[0].Rows[intCount]["ITEM_SRNUMBER"];
                    _itemDR["Patient"] = pChargeReportDS.Tables[0].Rows[intCount]["PATIENT"];
                    _itemTbl.Rows.Add(_itemDR);

                }
                for (int intCount = 0; intCount <= pChargeReportDS.Tables[1].Rows.Count - 1; intCount++)
                {

                    if (pChargeReportDS.Tables[1].Rows[intCount]["BUSINESS_UNIT"].ToString() == string.Empty &&
                        pChargeReportDS.Tables[1].Rows[intCount]["CART_ID"].ToString() == string.Empty)
                    {

                    }
                    else
                    {
                        if (pChargeReportDS.Tables[1].Rows[intCount]["BUSINESS_UNIT"].ToString() != _strBUnit | pChargeReportDS.Tables[1].Rows[intCount]["CART_ID"].ToString() != _strCartID)
                        {
                            _strBUnit = pChargeReportDS.Tables[1].Rows[intCount]["BUSINESS_UNIT"].ToString();
                            _strCartID = pChargeReportDS.Tables[1].Rows[intCount]["CART_ID"].ToString();

                            _strLocType = _commonRepo.GetLocationType(_strBUnit, _strCartID);

                            _dsCartDetails = null;
                            var tupleResult = _pouService.GetCartDetails(_strCartID, _strBUnit, _dsCartDetails, strOrgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], "", _strLocType, null, "", appID);
                            _statusCode = tupleResult.Item1;
                            _dsCartDetails = tupleResult.Item2;
                            if (_statusCode == AtparStatusCodes.E_NORECORDFOUND)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + ": No Records found for the cart: " + _strCartID + "\n");
                                response.AtParNotOK(_statusCode, _commonRepo, _log);
                                return response;
                            }
                            else if (_statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " Failed to get the item details " + "from ERP : status code is : " + _statusCode + "\n");
                                response.AtParNotOK(_statusCode, _commonRepo, _log);
                                return response;
                            }


                            _dsNonCartDetails = null;
                            try
                            {
                                _dsNonCartDetails = _pouRepo.GetNonCartItems(_strBUnit, _strCartID).ToDataSet();
                            }
                            catch (Exception ex)
                            {
                                response.AtParException(ex, _commonRepo, _log);
                                return response;
                            }

                        }
                        _itemInvDR = _itemInvTbl.NewRow();
                        _dsCartDetails.Tables[1].TableName = "Details";
                        ItemId = pChargeReportDS.Tables[1].Rows[intCount]["ITEM_ID"].ToString();
                        _strCompartment = pChargeReportDS.Tables[1].Rows[intCount]["COMPARTMENT"].ToString();


                        if (_dsCartDetails.Tables["Details"].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() != System.Type.GetType("System.String").ToString())
                        {
                            _statusCode = _commonService.ConvertColumnType(ref _dsCartDetails);

                            if (_statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " Failed to convert column's data type: " + "Status Code is " + _statusCode + "\n");
                                response.AtParNotOK(_statusCode, _commonRepo, _log);
                                return response;
                            }

                        }


                        DataRow[] _drItems = null;
                        _drItems = _dsCartDetails.Tables["Details"].Select("[" + (int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID/*need to check by siva */ + "] = '" + ItemId + "' AND [" + (int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT + "] = '" + _strCompartment + "'");
                        if (_drItems.Length > 0)
                        {
                            _strItemDescr = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();
                        }
                        else
                        {
                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + ": Details not found in Cart Items, looking in Non Cart Items.  Items ID:" + ItemId);
                            _drItems = _dsNonCartDetails.Tables[0].Select("ITEM_ID = '" + ItemId + "' ");
                            if (_drItems.Length > 0)//need to check as logic is different
                            {
                                _strItemDescr = _drItems[0]["ITEM_DESCRIPTION"].ToString();
                            }
                            else
                            {
                                _strCompartment = string.Empty;
                                _strItemDescr = string.Empty;
                            }
                        }
                        if (!string.IsNullOrEmpty(_strItemDescr.ToString()))
                        {
                            _itemInvDR["ItemID_Descr"] = pChargeReportDS.Tables[1].Rows[intCount]["ITEM_ID"] + " - " + _strItemDescr;
                            //strItemDescr - which read from ERP
                        }
                        else
                        {
                            _itemInvDR["ItemID_Descr"] = pChargeReportDS.Tables[1].Rows[intCount]["ITEM_ID"];
                        }
                        _itemInvDR["LotID"] = pChargeReportDS.Tables[1].Rows[intCount]["LOT_NUMBER"];
                        _itemInvDR["SerialID"] = pChargeReportDS.Tables[1].Rows[intCount]["SERIAL_NUMBER"];
                        _itemInvDR["Location"] = pChargeReportDS.Tables[1].Rows[intCount]["CART_ID"] + " / " + _strCompartment + " / " + pChargeReportDS.Tables[1].Rows[intCount]["CNT"];
                        //strCompartment - which read from ERP 
                    }
                    _itemInvTbl.Rows.Add(_itemInvDR);
                }

                _itemDS.Tables.Add(_itemTbl);
                _itemDS.Tables.Add(_itemInvTbl);

                pChargeReportDS = _itemDS;
                Dictionary<string, object> result = new Dictionary<string, object> { { "ChargeReportDS", pChargeReportDS } };
                response.DataDictionary = result;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to get the charge capture report data" + " : Exception is : " + ex.ToString() + "\n");
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }



        }
    }
}

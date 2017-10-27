using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace AtPar.POU.Service
{
    public  class QuantityOnHandReportService : IQuantityOnHandReportService
    {
        private ILog _log;
        private IQuantityOnHandReportRepository _repo;
        private ICommonPOURepository _commonPOURepo;
        private ICommonPOUService _commonPOUService;
        private ICommonRepository _commonRepo;
        public QuantityOnHandReportService(ILog log, IQuantityOnHandReportRepository repo, 
            ICommonPOURepository commonPOURepo, ICommonPOUService commonPOUService, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonPOURepo = commonPOURepo;
            _commonPOUService = commonPOUService;
            _commonRepo = commonRepo;
        }

        public AtParWebApiResponse<long> GetQtyOnHandReportData(string businessUnit, string cartID,
            string itemID, string vendID, string userID,
            string serialNumber, bool negativeStatus, 
            string lotNumber,
            string orgGrpID, int appID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet _dsBillOnlyItems = new DataSet();
            var response = new AtParWebApiResponse<long>();
            DataSet pQtyOnHandReportDS = new DataSet();
            if (businessUnit == null) businessUnit = string.Empty;
            if (cartID == null) cartID = string.Empty;
            if (itemID == null) itemID =string.Empty;
            if (vendID == null) vendID =string.Empty;
            if (serialNumber == null) serialNumber = "";
            if (lotNumber == null) lotNumber = string.Empty;


            try
            {
                DataSet _QtyOnHandDataDS = new DataSet();
                //output
                StringBuilder _sbSQL = new StringBuilder();
                DataTable _dtQtyOnHandHeader = null;
                DataRow _drQtyOnHandHeader = null;
                DataRow _drQtyOnHandDetails = null;
                DataTable _dtQtyOnHandDetails = null;
                string _strItemId = null;
                string _strBUnit = null;
                string _strCartId = null;
                string _strItemDescr = null;
                double _dblPrice = 0;
                string _strUOM = null;
                string _strVendID = null;
                double _dblParQty = 0;
                double _dblQOH = 0;
                double _dblActualQOH = 0;
                // string _strLotNo = null;
                double _dblItemCount = 0;
                string _strTempCartID = string.Empty;
                DataSet _dsCartItems = new DataSet();
                DataSet _dsChargeCaptureForCart = new DataSet();
                DataSet _dsNonCartItemDetails = new DataSet();
                double _dblUsage = 0;
                long _statusCode = 0;
                StringBuilder _sbSearch = new StringBuilder();
                double _dblTotQOH = 0;
                double _dblTotActualQOH = 0;
                DataSet _dsVendorDetails = new DataSet();
                string _strLocType = null;
                string _strSrCntrld = "N";
                string _strLotCntrld = "N";
                bool blnSrCtrlColumnExists = false;
                bool blnLotCtrlColumnExists = false;
                string _strMainItemId = null;
                string _strPrevMainItemId = string.Empty;
                string _strHdrItemId = string.Empty;
                string _strHdrCartId = string.Empty;
                string _strHdrBusinessUnit = string.Empty;
                string _strCompartmentId = string.Empty;
                string _strPrevCompartmentId = string.Empty;
                string _strHdrCompartmentId = string.Empty;
                string _strReportKey = string.Empty;
                string _strPrevReportKey = string.Empty;
                string _strHdrReportKey = string.Empty;
                double _dblConvRtParUom = 0;
                double _dblConvRTProc = 0;
                double _dblNoOfBXsInCase = 0;
                string _strIssueUom = null;


                double _dblItemQOH = 0;
                double _dblItemActualQty = 0;
                double _dblTotUsage = 0;
                

                try
                {
                    // _QtyOnHandDataDS = m_LocalDB.ExecuteDataSet(_Cmd);
                    _repo.GetQtyOnHandItems(businessUnit, cartID, itemID, serialNumber, lotNumber, orgGrpID, negativeStatus, appID, ref _QtyOnHandDataDS);

                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to get the following SQL....  Exception is : " + sqlEx.ToString() + Environment.NewLine);
                    }
                    
                    response.AtParException(sqlEx, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                    return response;
                    
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to get the following SQL.... Exception is : " + ex.ToString() + Environment.NewLine);
                    }
                    
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }

                _dtQtyOnHandHeader = new DataTable("ITEMS_HEADER");
                _dtQtyOnHandHeader.Columns.Add("REPORT_KEY", Type.GetType("System.String"));
                _dtQtyOnHandHeader.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                _dtQtyOnHandHeader.Columns.Add("CART_ID", Type.GetType("System.String"));
                _dtQtyOnHandHeader.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                _dtQtyOnHandHeader.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
                _dtQtyOnHandHeader.Columns.Add("ITEM_DESCRIPTION", Type.GetType("System.String"));
                _dtQtyOnHandHeader.Columns.Add("ITEM_PRICE", Type.GetType("System.Double"));
                _dtQtyOnHandHeader.Columns.Add("ITEM_QUANTITY_PAR", Type.GetType("System.Double"));
                _dtQtyOnHandHeader.Columns.Add("PAR_VALUE", Type.GetType("System.Double"));
                _dtQtyOnHandHeader.Columns.Add("ITEM_QUANTITY_ON_HAND", Type.GetType("System.Double"));
                _dtQtyOnHandHeader.Columns.Add("ACTUAL_QUANTITY", Type.GetType("System.Double"));
                _dtQtyOnHandHeader.Columns.Add("ON_HAND_VALUE", Type.GetType("System.Double"));
                _dtQtyOnHandHeader.Columns.Add("TODAY_USAGE", Type.GetType("System.Double"));
                _dtQtyOnHandHeader.Columns.Add("TODAY_USAGE1", Type.GetType("System.String"));
                _dtQtyOnHandHeader.Columns.Add("UOM", Type.GetType("System.String"));
                _dtQtyOnHandHeader.Columns.Add("VENDOR_ID", Type.GetType("System.String"));


                _dtQtyOnHandDetails = new DataTable("ITEMS_DETAILS");
                _dtQtyOnHandDetails.Columns.Add("REPORT_KEY", Type.GetType("System.String"));
                _dtQtyOnHandDetails.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                _dtQtyOnHandDetails.Columns.Add("CART_ID", Type.GetType("System.String"));
                _dtQtyOnHandDetails.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                _dtQtyOnHandDetails.Columns.Add("SUBSTITUTE_ITEM_ID", Type.GetType("System.String"));
                _dtQtyOnHandDetails.Columns.Add("ITEM_LOTNUMBER", Type.GetType("System.String"));
                _dtQtyOnHandDetails.Columns.Add("ITEM_SRNUMBER", Type.GetType("System.String"));
                _dtQtyOnHandDetails.Columns.Add("ITEM_QUANTITY_ON_HAND", Type.GetType("System.Double"));
                _dtQtyOnHandDetails.Columns.Add("ACTUAL_QUANTITY", Type.GetType("System.Double"));
                _dtQtyOnHandDetails.Columns.Add("ITEM_COUNT", Type.GetType("System.Double"));
                //VD-IT0001143
                _dtQtyOnHandDetails.Columns.Add("EXP_DATE", Type.GetType("System.String"));
                _dtQtyOnHandDetails.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
                //// Get BillOnly Items  //'
                try
                {
                    _statusCode = _repo.GetBillOnlyItems(string.Empty,ref  _dsBillOnlyItems, deviceTokenEntry);

                    if (_statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " : Failed to get BillOnly Items. StatusCode is : " + _statusCode + Environment.NewLine);
                        }
                       
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        return response;
                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " : Failed to get get BillOnly Items. Exception is : " + ex.ToString() + Environment.NewLine);
                    }
                    
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }


                if (_QtyOnHandDataDS.Tables.Count > 0)
                {
                    //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of _QtyOnHandDataDS.Tables[0].Rows.Count for every iteration:
                    int tempVar = _QtyOnHandDataDS.Tables[0].Rows.Count;
                    for (int intRecCnt = 0; intRecCnt < tempVar; intRecCnt++)
                    {

                        var tempVar2 = _QtyOnHandDataDS.Tables[0].Rows[intRecCnt];
                        _strItemId = tempVar2["ITEM_ID"].ToString();
                        _strBUnit = tempVar2["BUSINESS_UNIT"].ToString();
                        _strCartId = tempVar2["CART_ID"].ToString();
                        _strMainItemId = tempVar2["MAIN_ITEM_ID"].ToString();
                        _strCompartmentId = tempVar2["COMPARTMENT"].ToString();

                        _strReportKey = _strMainItemId + _strCompartmentId;




                        if (intRecCnt == 0)
                        {
                            _strPrevMainItemId = tempVar2["MAIN_ITEM_ID"].ToString();
                            _strPrevCompartmentId = tempVar2["COMPARTMENT"].ToString();

                        }

                        if (!string.IsNullOrEmpty(tempVar2["ITEM_QUANTITY_ON_HAND"].ToString()))
                        {
                            _dblItemQOH = Convert.ToDouble(tempVar2["ITEM_QUANTITY_ON_HAND"]);

                        }
                        else
                        {
                            _dblItemQOH = 0;


                        }
                        if (!string.IsNullOrEmpty(tempVar2["ACTUAL_QUANTITY"].ToString()))
                        {
                            _dblItemActualQty = Convert.ToDouble(tempVar2["ACTUAL_QUANTITY"]);

                        }
                        else
                        {
                            _dblItemActualQty = 0;
                        }





                        if ((_strPrevMainItemId != _strMainItemId) || (_strPrevCompartmentId != _strCompartmentId))
                        {


                            _drQtyOnHandHeader = _dtQtyOnHandHeader.NewRow();

                            _drQtyOnHandHeader["REPORT_KEY"] = _strHdrReportKey;
                            _drQtyOnHandHeader["BUSINESS_UNIT"] = _strHdrBusinessUnit;
                            _drQtyOnHandHeader["CART_ID"] = _strHdrCartId;
                            _drQtyOnHandHeader["ITEM_ID"] = _strHdrItemId;
                            _drQtyOnHandHeader["COMPARTMENT"] = _strHdrCompartmentId;
                            _drQtyOnHandHeader["ITEM_DESCRIPTION"] = _strItemDescr;
                            _drQtyOnHandHeader["ITEM_PRICE"] = _dblPrice;
                            _drQtyOnHandHeader["ITEM_QUANTITY_PAR"] = _dblParQty;
                            _drQtyOnHandHeader["PAR_VALUE"] = _dblParQty * _dblPrice;
                            _drQtyOnHandHeader["ITEM_QUANTITY_ON_HAND"] = _dblTotQOH;
                            _drQtyOnHandHeader["ACTUAL_QUANTITY"] = _dblTotActualQOH;
                            _drQtyOnHandHeader["ON_HAND_VALUE"] = _dblTotActualQOH * _dblPrice;
                            _drQtyOnHandHeader["TODAY_USAGE"] = _dblTotUsage;
                            _drQtyOnHandHeader["TODAY_USAGE1"] = _dblTotUsage + " " + _strIssueUom;
                            _drQtyOnHandHeader["UOM"] = _strUOM;
                            _drQtyOnHandHeader["VENDOR_ID"] = _strVendID;

                            _dtQtyOnHandHeader.Rows.Add(_drQtyOnHandHeader);

                            _dblTotQOH = 0;
                            _dblTotActualQOH = 0;
                            _dblTotUsage = 0;

                            _strItemDescr = string.Empty;
                            _strUOM = string.Empty;
                            _dblPrice = 0;
                            _dblParQty = 0;
                            _dblUsage = 0;
                            _strVendID = string.Empty;
                            _dblNoOfBXsInCase = 0;
                            _dblConvRTProc = 0;
                            _dblConvRtParUom = 0;
                            _strPrevCompartmentId = _strCompartmentId;
                            _strPrevMainItemId = _strMainItemId;



                        }

                        _dblTotQOH = _dblTotQOH + _dblItemQOH;
                        _dblTotActualQOH = _dblTotActualQOH + _dblItemActualQty;


                        //Handling Location Type 
                        //_statusCode = GetLocationType(_strBUnit, _strCartId, _strLocType);

                        _strLocType = _commonPOURepo.GetLocationType(_strBUnit, _strCartId);
                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                           

                            response.AtParNotOK(_statusCode, _commonRepo, _log);
                            return response;
                        }

                        _dblUsage = 0;

                        if (_strCartId != _strTempCartID)
                        {

                            try
                            {
                               
                                var tupleResult = _commonPOUService.GetCartDetails(_strCartId, _strBUnit, _dsCartItems, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), string.Empty, _strLocType, null, "", appID);
                                _dsCartItems = tupleResult.Item2;
                                _statusCode = tupleResult.Item1;


                                if (_statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                                                      
                                    if (_statusCode == AtparStatusCodes.E_NORECORDFOUND)
                                    {
                                        _statusCode = 0;                                        
                                    }
                                    else {
                                        if (_log.IsFatalEnabled)
                                        {
                                            _log.Fatal(methodBaseName + " Failed to get the details for" + " the cart : StatusCode is : " + _statusCode + Environment.NewLine);
                                        }
                                        response.AtParNotOK(_statusCode, _commonRepo, _log);
                                        return response;
                                    }
                                    
                                   

                                }

                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + " Failed to get the details for" + " the cart : Exception is : " + ex.ToString() + Environment.NewLine);
                                }
                                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                                return response;
                            }


                            try
                            {
                                _statusCode = _repo.GetChargeCaptureDetailsForCart(_strBUnit, _strCartId,ref _dsChargeCaptureForCart);

                                if (_statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal(methodBaseName + " Failed to get the charge capture" + " details for the cart :" + " StatusCode is : " + _statusCode + Environment.NewLine);
                                    }
                                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                    return response;
                                }

                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + " Failed to get the charge capture" + " details for the cart :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                                }
                                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                                return response;
                            }

                            try
                            {                               

                               var lstNonCartItems = _commonPOURepo.GetNonCartItems(_strBUnit, _strCartId);
                                _dsNonCartItemDetails = lstNonCartItems.ToDataSet();
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + " Failed to get the non cart item" + " details for the cart :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                                }
                                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                                return response;
                            }

                            _strTempCartID = _strCartId;

                        }

                        DataRow[] _dr = null;

                        try
                        {

                            if (_dsCartItems.Tables["Details"].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() != Type.GetType("System.String").ToString())
                            {

                                _statusCode = ConvertColumnType( ref _dsCartItems);

                                if (_statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsWarnEnabled)
                                    {
                                        _log.Warn(methodBaseName + " Failed to convert column's data type: " + "Status Code is " + _statusCode + Environment.NewLine);
                                    }
                                    response.AtParNotOK(_statusCode, _commonRepo, _log);
                                    return response;
                                }

                            }

                            _strCompartmentId = _strCompartmentId.Replace("'", "''");
                            _sbSearch.Append("[" + (int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID + "] = '" + _strItemId + "'");
                            if (!string.IsNullOrEmpty(_strCompartmentId) && _strCompartmentId != "")
                            {
                                _sbSearch.Append(" AND [" + (int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT + "]='" + _strCompartmentId + "' ");
                            }

                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug(methodBaseName + " Searching the item details in the ERP" + " with the following search string " + _sbSearch.ToString() + Environment.NewLine);
                            }

                            _dr = _dsCartItems.Tables["Details"].Select(_sbSearch.ToString());
                            if (_dr.Length == 0)
                            {
                                DataRow[] _drnoncart = null;

                                if (_dsNonCartItemDetails != null && _dsNonCartItemDetails.Tables.Count > 0)
                                {
                                    _sbSearch.Remove(0, _sbSearch.Length);
                                    _sbSearch.Append("ITEM_ID ='" + _strItemId + "' AND COMPARTMENT='" + _strCompartmentId + "' ");

                                    _drnoncart = _dsNonCartItemDetails.Tables[0].Select(_sbSearch.ToString());
                                    if (_drnoncart.Length > 0)
                                    {

                                        if (!Convert.IsDBNull(_drnoncart[0]["SERIALIZED"]) && !string.IsNullOrEmpty(_drnoncart[0]["SERIALIZED"].ToString()))
                                        {
                                            _strSrCntrld = _drnoncart[0]["SERIALIZED"].ToString();
                                        }
                                        else
                                        {
                                            _strSrCntrld = AtParWebEnums.YesNo_Enum.N.ToString();
                                        }

                                        if (!Convert.IsDBNull(_drnoncart[0]["LOT_CONTROLLED"]) && !string.IsNullOrEmpty(_drnoncart[0]["LOT_CONTROLLED"].ToString()))
                                        {
                                            _strLotCntrld = _drnoncart[0]["LOT_CONTROLLED"].ToString();
                                        }
                                        else
                                        {
                                            _strLotCntrld = AtParWebEnums.YesNo_Enum.N.ToString();
                                        }

                                    }
                                }

                                _sbSearch.Remove(0, _sbSearch.Length);
                                _sbSearch.Append("[" + AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID + "] = '" + _strItemId + "' AND [" + AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT + "]='" + _strCompartmentId + "' ");

                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                            {
                                _log.Fatal(methodBaseName + " Failed to search the item in the ERP" + " with the following search string " + _sbSearch.ToString() + " Exception is " + ex.ToString() + Environment.NewLine);
                            }
                           

                            response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                            return response;
                        }
                        finally
                        {
                            _sbSearch.Remove(0, _sbSearch.Length);
                        }

                        //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of _dsCartItems.Tables("Details").Columns.Count for every iteration:
                        int tempVar1 = _dsCartItems.Tables["Details"].Columns.Count;
                        for (int intCnt = 0; intCnt < tempVar1; intCnt++)
                        {

                            //INSTANT C# NOTE: The following VB 'Select Case' included either a non-ordinal switch expression or non-ordinal, range-type, or non-constant 'Case' expressions and was converted to C# 'if-else' _logic:
                            //						Select Case _dsCartItems.Tables("Details").Columns(intCnt).ColumnName
                            //ORIGINAL LINE: Case Get_Cart_Detail_Enum.LOT_CONTROLLED
                            if ((Convert.ToInt32(_dsCartItems.Tables["Details"].Columns[intCnt].ColumnName)) ==(int) AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED)
                            {
                                blnLotCtrlColumnExists = true;
                            }
                            //ORIGINAL LINE: Case Get_Cart_Detail_Enum.SERIAL_CONTROLLED
                            else if (((Convert.ToInt32(_dsCartItems.Tables["Details"].Columns[intCnt].ColumnName)) ==(int) AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED))
                            {
                                blnSrCtrlColumnExists = true;
                            }
                        }
                        if (_dr.Length > 0)
                        {
                            if (blnLotCtrlColumnExists)
                            {
                                if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED].ToString()))
                                {
                                    _strLotCntrld = _dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED].ToString();
                                }
                            }

                            if (blnSrCtrlColumnExists)
                            {
                                if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED].ToString()))
                                {
                                    _strSrCntrld = _dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED].ToString();
                                }
                            }
                        }

                        DataRow[] _drItemSrLotDetails = null;
                        try
                        {

                            _sbSearch.Append("BUSINESS_UNIT = '" + _strBUnit + "' ");
                            _sbSearch.Append("AND CART_ID = '" + _strCartId + "' ");
                            _sbSearch.Append("AND ITEM_ID = '" + _strItemId + "' ");
                            _sbSearch.Append("AND COMPARTMENT = '" + _strCompartmentId + "' ");

                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug(methodBaseName + " Searching the serial/lot details for" + " the item with the following search" + " string " + _sbSearch.ToString() + Environment.NewLine);
                            }
                            _drItemSrLotDetails = _QtyOnHandDataDS.Tables[1].Select(_sbSearch.ToString());
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                            {
                                _log.Fatal(methodBaseName + " Failed to search the item " + _strItemId + " for serial/lot" + " details : Exception is : " + ex.ToString() + Environment.NewLine);
                            }
                            response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                            return response;
                        }
                        finally
                        {
                            _sbSearch.Remove(0, _sbSearch.Length);
                        }


                        foreach (DataRow _drSrLotDetail in _drItemSrLotDetails)
                        {

                            DataRow[] _drItemCount = null;

                            _dblItemCount = 0;

                            _drQtyOnHandDetails = _dtQtyOnHandDetails.NewRow();

                            _drQtyOnHandDetails["REPORT_KEY"] = _strReportKey;
                            _drQtyOnHandDetails["BUSINESS_UNIT"] = _strBUnit;
                            _drQtyOnHandDetails["CART_ID"] = _strCartId;
                            _drQtyOnHandDetails["ITEM_ID"] = _strMainItemId;
                            _drQtyOnHandDetails["SUBSTITUTE_ITEM_ID"] = _strItemId;
                            _drQtyOnHandDetails["ITEM_LOTNUMBER"] = _drSrLotDetail["LOT_NUMBER"];
                            _drQtyOnHandDetails["ITEM_SRNUMBER"] = _drSrLotDetail["SERIAL_NUMBER"];
                            _drQtyOnHandDetails["COMPARTMENT"] = _drSrLotDetail["COMPARTMENT"].ToString();


                            if (!string.IsNullOrEmpty(_drSrLotDetail["ITEM_QUANTITY_ON_HAND"].ToString()))
                            {
                                _dblQOH = Convert.ToDouble(_drSrLotDetail["ITEM_QUANTITY_ON_HAND"]);
                            }
                            else
                            {
                                _dblQOH = 0;
                            }



                            _drQtyOnHandDetails["ITEM_QUANTITY_ON_HAND"] = _dblQOH;

                            if (!string.IsNullOrEmpty(_drSrLotDetail["ACTUAL_QUANTITY"].ToString()))
                            {
                                _dblActualQOH = Convert.ToDouble(_drSrLotDetail["ACTUAL_QUANTITY"]);
                            }
                            else
                            {
                                _dblActualQOH = 0;
                            }

                            _drQtyOnHandDetails["ACTUAL_QUANTITY"] = _dblActualQOH;


                            try
                            {
                                _sbSearch.Append("ITEM_ID = '" + _strItemId + "'");
                                if (_strSrCntrld != "N")
                                {
                                    _sbSearch.Append(" AND ITEM_SRNUMBER = '" + _drSrLotDetail["SERIAL_NUMBER"].ToString() + "'");
                                }
                                if (_strLotCntrld != "N")
                                {
                                    _sbSearch.Append(" AND ITEM_LOTNUMBER = '" + _drSrLotDetail["LOT_NUMBER"].ToString() + "' ");
                                }
                                _sbSearch.Append(" AND COMPARTMENT = '" + ((_drSrLotDetail["COMPARTMENT"].ToString().substituteString())).ReplaceString() + "' ");

                                if (_log.IsDebugEnabled)
                                {
                                    _log.Debug(methodBaseName + " Searching the following item for charge capture details " + " with the following search string " + _sbSearch.ToString() + Environment.NewLine);
                                }
                                _drItemCount = _dsChargeCaptureForCart.Tables[0].Select(_sbSearch.ToString());
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + " Failed to search the item " + _strItemId + " for charge capture" + " details : Exception is : " + ex.ToString() + Environment.NewLine);
                                }
                                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                                return response;
                            }
                            finally
                            {
                                _sbSearch.Remove(0, _sbSearch.Length);
                            }

                            if (_drItemCount.Length > 0)
                            {

                                foreach (DataRow _drCount in _drItemCount)
                                {
                                    _dblItemCount = _dblItemCount + Convert.ToDouble(_drCount["ITEM_COUNT"]);

                                }

                            }
                            else
                            {
                                _dblItemCount = 0;

                            }

                            _drQtyOnHandDetails["ITEM_COUNT"] = _dblItemCount;
                            _drQtyOnHandDetails["EXP_DATE"] = _drSrLotDetail["EXPIRY_DATE"];
                            _dtQtyOnHandDetails.Rows.Add(_drQtyOnHandDetails);

                            _dblUsage = _dblUsage + _dblItemCount;

                        }

                        _dblTotUsage = _dblTotUsage + _dblUsage;


                        if (_strItemId == _strMainItemId)
                        {


                            _strHdrItemId = _strItemId;
                            _strHdrBusinessUnit = _strBUnit;
                            _strHdrCartId = _strCartId;
                            _strHdrReportKey = _strReportKey;
                            _strHdrCompartmentId = _strCompartmentId.Replace("''", "'");


                            if (_dr.Length > 0)
                            {
                              
                                if (_dsCartItems.Tables["Details"].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR).ToString()))
                                {
                                    if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString()))
                                    {
                                        _strItemDescr = _dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();
                                    }
                                }
                              
                                if (_dsCartItems.Tables["Details"].Columns.Contains((((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM).ToString())))
                                {
                                    if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString()))
                                    {
                                        _strUOM = _dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString();
                                    }
                                }

                                if (_strLocType == AtParWebEnums.LocationType.A.ToString())
                                {
                                    if (_dsCartItems.Tables["Details"].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM).ToString()))
                                    {
                                        if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString()))
                                        {
                                            _strIssueUom = _dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString();
                                        }
                                    }
                                }
                                else
                                {
                                    if (_dsCartItems.Tables["Details"].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.ISSUE_UOM).ToString()))
                                    {
                                        if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ISSUE_UOM].ToString()))
                                        {
                                            _strIssueUom = _dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ISSUE_UOM].ToString();
                                        }
                                        else
                                        {
                                            _strIssueUom = _dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString();
                                        }
                                    }
                                }

                                if (_dsCartItems.Tables["Details"].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE).ToString()))
                                {
                                    if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString()))
                                    {
                                        _dblPrice = Convert.ToDouble(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE]);
                                    }
                                }

                                if (_dsCartItems.Tables["Details"].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR).ToString()))
                                {
                                    if (!Convert.IsDBNull(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR]) && !string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR].ToString()))
                                    {
                                        _dblConvRTProc = Convert.ToDouble(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR]);
                                    }
                                }

                                if (_dsCartItems.Tables["Details"].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM).ToString()))
                                {
                                    if (!Convert.IsDBNull(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM]) && !string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM].ToString()))
                                    {
                                        _dblConvRtParUom = Convert.ToDouble(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM]);
                                    }
                                }

                                if (_dsCartItems.Tables["Details"].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM).ToString()))
                                {
                                    if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM].ToString()))
                                    {
                                        _strUOM = _dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM].ToString();
                                    }
                                }
                                try
                                {
                                    if (!string.IsNullOrEmpty(_strLocType) && _strLocType == AtParWebEnums.LocationType.A.ToString())
                                    {
                                        if (string.IsNullOrEmpty(_dblConvRtParUom.ToString()) || _dblConvRtParUom == 0)
                                        {
                                            _dblNoOfBXsInCase = _dblConvRTProc;
                                        }
                                        else
                                        {
                                            _dblNoOfBXsInCase = _dblConvRTProc / _dblConvRtParUom;
                                        }
                                        //Finding box cost
                                        if (!string.IsNullOrEmpty(_dblNoOfBXsInCase.ToString()) && _dblNoOfBXsInCase != 0)
                                        {
                                            _dblPrice = _dblPrice / _dblNoOfBXsInCase;
                                        }

                                    }

                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal(methodBaseName + "Exception is : " + ex.ToString() + Environment.NewLine);
                                    }
                                }

                                if (_dsCartItems.Tables["Details"].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY).ToString()))
                                {
                                    if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ToString()))
                                    {
                                        _dblParQty = Convert.ToDouble(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ToString());
                                    }
                                }

                                if (_dsCartItems.Tables["Details"].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ID).ToString()))
                                {
                                    if (!string.IsNullOrEmpty(_dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ID].ToString()))
                                    {
                                        _strVendID = _dr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ID].ToString();
                                    }
                                }
                            }
                            else
                            {

                                DataRow[] _drNonCartItems = null;

                                try
                                {
                                    _sbSearch.Append("ITEM_ID = '" + _strItemId + "' ");
                                    if (_log.IsDebugEnabled)
                                    {
                                        _log.Debug(methodBaseName + " Searching if the item is a non" + " cart item with the following" + " search string " + _sbSearch.ToString() + Environment.NewLine);
                                    }
                                    //Check if item is a non cart item
                                    _drNonCartItems = _dsNonCartItemDetails.Tables[0].Select(_sbSearch.ToString());

                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal(methodBaseName + " Failed to check if the item " + _strItemId + " is non cart item :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                                    }
                                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                                    return response;
                                }
                                finally
                                {
                                    _sbSearch.Remove(0, _sbSearch.Length);
                                }

                                if (_drNonCartItems.Length > 0)
                                {

                                    if (!string.IsNullOrEmpty(_drNonCartItems[0]["ITEM_DESCRIPTION"].ToString()))
                                    {
                                        _strItemDescr = _drNonCartItems[0]["ITEM_DESCRIPTION"].ToString();
                                    }

                                    if (!string.IsNullOrEmpty(_drNonCartItems[0]["UOM"].ToString()))
                                    {
                                        _strUOM = _drNonCartItems[0]["UOM"].ToString();
                                    }

                                    if (!string.IsNullOrEmpty(_drNonCartItems[0]["ISSUE_UOM"].ToString()))
                                    {
                                        _strIssueUom = _drNonCartItems[0]["ISSUE_UOM"].ToString();
                                    }

                                    if (!string.IsNullOrEmpty(_drNonCartItems[0]["ITEM_PRICE"].ToString()))
                                    {
                                        _dblPrice = Convert.ToDouble(_drNonCartItems[0]["ITEM_PRICE"]);
                                    }

                                    if (!string.IsNullOrEmpty(_drNonCartItems[0]["OPTIMUM_QTY"].ToString()))
                                    {
                                        _dblParQty = Convert.ToDouble(_drNonCartItems[0]["OPTIMUM_QTY"].ToString());
                                    }

                                    if (!string.IsNullOrEmpty(_drNonCartItems[0]["VENDOR_ID"].ToString()))
                                    {
                                        _strVendID = _drNonCartItems[0]["VENDOR_ID"].ToString();
                                    }
                                }
                                else
                                {

                                    if (_dsBillOnlyItems.Tables[0].Rows.Count > 0)
                                    {
                                        DataRow[] _drBillOnlyItems = null;

                                        try
                                        {
                                            _sbSearch.Append("ITEM_ID = '" + _strItemId + "' ");
                                            if (_log.IsDebugEnabled)
                                            {
                                                _log.Debug(methodBaseName + " : Searching if the item is BillOnly Item" + " with the following" + " search string " + _sbSearch.ToString() + Environment.NewLine);
                                            }
                                            //Check if item is BillONly Item
                                            _drBillOnlyItems = _dsBillOnlyItems.Tables[0].Select(_sbSearch.ToString());

                                        }
                                        catch (Exception ex)
                                        {
                                            if (_log.IsFatalEnabled)
                                            {
                                                _log.Fatal(methodBaseName + " : Failed to check if the item " + _strItemId + " is BillOnly Item :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                                            }
                                            response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                                            return response;
                                        }
                                        finally
                                        {
                                            _sbSearch.Remove(0, _sbSearch.Length);
                                        }
                                        if (_drBillOnlyItems.Length > 0)
                                        {
                                            if (!string.IsNullOrEmpty(_drBillOnlyItems[0]["DESCRIPTION"].ToString()))
                                            {
                                                _strItemDescr = _drBillOnlyItems[0]["DESCRIPTION"].ToString();
                                            }

                                            if (!string.IsNullOrEmpty(_drBillOnlyItems[0]["VENDOR_ID"].ToString()))
                                            {
                                                _strVendID = _drBillOnlyItems[0]["VENDOR_ID"].ToString();
                                            }
                                        }
                                    }

                                }

                            }
                        }

                        //If Double.IsNaN(_dblPrice) Or Double.IsInfinity(_dblPrice) Then
                        //    _dblPrice = 0
                        //End If


                        if (intRecCnt == _QtyOnHandDataDS.Tables[0].Rows.Count - 1)
                        {


                            _drQtyOnHandHeader = _dtQtyOnHandHeader.NewRow();
                            _drQtyOnHandHeader["REPORT_KEY"] = _strHdrReportKey;
                            _drQtyOnHandHeader["BUSINESS_UNIT"] = _strHdrBusinessUnit;
                            _drQtyOnHandHeader["CART_ID"] = _strHdrCartId;
                            _drQtyOnHandHeader["ITEM_ID"] = _strHdrItemId;
                            _drQtyOnHandHeader["COMPARTMENT"] = _strHdrCompartmentId;
                            _drQtyOnHandHeader["ITEM_DESCRIPTION"] = _strItemDescr;
                            _drQtyOnHandHeader["ITEM_PRICE"] = _dblPrice;
                            _drQtyOnHandHeader["ITEM_QUANTITY_PAR"] = _dblParQty;
                            _drQtyOnHandHeader["PAR_VALUE"] = _dblParQty * _dblPrice;
                            _drQtyOnHandHeader["ITEM_QUANTITY_ON_HAND"] = _dblTotQOH;
                            _drQtyOnHandHeader["ACTUAL_QUANTITY"] = _dblTotActualQOH;
                            _drQtyOnHandHeader["ON_HAND_VALUE"] = _dblTotActualQOH * _dblPrice;
                            _drQtyOnHandHeader["TODAY_USAGE"] = _dblTotUsage;
                            _drQtyOnHandHeader["TODAY_USAGE1"] = _dblTotUsage.ToString() + " " + _strIssueUom;
                            _drQtyOnHandHeader["UOM"] = _strUOM;
                            _drQtyOnHandHeader["VENDOR_ID"] = _strVendID;


                            _dtQtyOnHandHeader.Rows.Add(_drQtyOnHandHeader);

                            _dblTotQOH = 0;
                            _dblTotActualQOH = 0;
                            _dblTotUsage = 0;
                            _dblNoOfBXsInCase = 0;
                            _dblConvRTProc = 0;
                            _dblConvRtParUom = 0;
                            _dblPrice = 0;


                        }

                    }



                    DataView _dv = new DataView();
                    DataRow[] _drSearch = null;
                    try
                    {
                        if (vendID != "")
                        {

                            _drSearch = _dtQtyOnHandHeader.Select("VENDOR_ID='" + vendID + "'");

                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug(methodBaseName + " Filtered Row Count " + _drSearch.Length);
                            }

                            if (_drSearch.Length == 0)
                            {
                               

                                response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                                return response;
                            }
                            else
                            {
                                _dv = _dtQtyOnHandHeader.DefaultView;
                                _dv.RowFilter = "VENDOR_ID='" + vendID + "'";
                                _dtQtyOnHandHeader = new DataTable();
                                _dtQtyOnHandHeader = _dv.ToTable().Copy();
                            }
                        }
                        else if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID] == "VENDOR")
                        {

                            try
                            {
                              //  _dsVendorDetails = m_LocalDB.ExecuteDataSet(m_LocalDB.GetSqlStringCommand(_sbSQL.ToString()));

                              var tupleResult=  _repo.GetManagementVendor(AtParWebEnums.TokenEntry_Enum.UserID.ToString());
                                _dsVendorDetails= tupleResult.Item1;
                            }
                            catch (SqlException sqlEx)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + ":Failed to execute the following" + " SQL...." + _sbSQL.ToString() + Environment.NewLine + " Exception is : " + sqlEx.ToString() + Environment.NewLine);
                                }
                                
                                response.AtParException(sqlEx, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                                return response;
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + ":Failed to execute the following" + " SQL...." + _sbSQL.ToString() + Environment.NewLine + " Exception is : " + ex.ToString() + Environment.NewLine);
                                }
                                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                                return response;
                            }
                            finally
                            {
                                _sbSQL.Remove(0, _sbSQL.Length);
                            }

                            StringBuilder _sbVendorDetails = new StringBuilder();

                            try
                            {
                                if (_dsVendorDetails.Tables[0].Rows.Count > 0)
                                {
                                    //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of _dsVendorDetails.Tables[0].Rows.Count for every iteration:
                                    tempVar = _dsVendorDetails.Tables[0].Rows.Count;
                                    for (int intCnt = 0; intCnt < tempVar; intCnt++)
                                    {
                                        _sbVendorDetails.Append("'");
                                        _sbVendorDetails.Append(_dsVendorDetails.Tables[0].Rows[intCnt]["VENDOR_ID"].ToString());
                                        _sbVendorDetails.Append("', ");
                                    }
                                    _sbVendorDetails.Remove(_sbVendorDetails.Length - 2, 1);
                                    if (_log.IsInfoEnabled)
                                    {
                                        _log.Info(methodBaseName + ":Filtering the QtyOnHand Dataset with " + "the following Vendor's :" + _sbVendorDetails.ToString());
                                    }

                                    _drSearch = _dtQtyOnHandHeader.Select("VENDOR_ID IN(" + _sbVendorDetails.ToString() + ")");

                                    if (_log.IsDebugEnabled)
                                    {
                                        _log.Debug(methodBaseName + ":Filtered Row Count " + _drSearch.Length);
                                    }

                                    if (_drSearch.Length == 0)
                                    {
                                       
                                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                                        return response;
                                    }
                                    else
                                    {
                                        _dv = _dtQtyOnHandHeader.DefaultView;
                                        _dv.RowFilter = "VENDOR_ID IN(" + _sbVendorDetails.ToString() + ")";
                                        _dtQtyOnHandHeader = new DataTable();
                                        _dtQtyOnHandHeader = _dv.ToTable().Copy();
                                    }

                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + ":Failed to search the VendorIDs" + _sbVendorDetails.ToString() + ": Exception is : " + ex.ToString() + Environment.NewLine);
                                }
                                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                                return response;
                            }
                            finally
                            {
                                _sbVendorDetails = null;
                            }

                        }

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + ":Failed to search the vendor_id" + _strVendID + ": Exception is : " + ex.ToString() + Environment.NewLine);
                        }
                        response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                        return response;
                    }

                    pQtyOnHandReportDS.Tables.Add(_dtQtyOnHandHeader);
                    pQtyOnHandReportDS.Tables.Add(_dtQtyOnHandDetails);

                    

                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to get the quantity on hand report" + " data: Exception is : " + ex.ToString() + Environment.NewLine);
                }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
            finally
            {

                _dsBillOnlyItems = null;
            }
            var dictionaryResult = new Dictionary<string, object> { { "pQtyOnHandReportDS", pQtyOnHandReportDS } };
            response.DataDictionary = dictionaryResult;
            response.AtParSuccess();
            return response;
        }

        private long ConvertColumnType(ref DataSet ds)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            if (_log.IsDebugEnabled)
            {
                _log.Debug(methodBaseName);
            }

            if (_log.IsDebugEnabled)
            {
                _log.Debug(methodBaseName + " Converting Inv Item ID column Data Type to String data type");
            }

            DataTable _dtTemp = null;
            try
            {
                _dtTemp = new DataTable();

                _dtTemp = ds.Tables["Details"].Clone(); //Cloning Details table
                _dtTemp.Columns[AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID.ToString()].DataType = Type.GetType("System.String");

                foreach (DataRow dr in ds.Tables["Details"].Rows)
                {
                    _dtTemp.ImportRow(dr);
                }
                ds.Tables.Remove("Details");
                ds.Tables.Add(_dtTemp);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to convert Inv Item ID column data type: " + "Exception is: " + ex.ToString() + Environment.NewLine);
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _dtTemp.Dispose();
            }
            return AtparStatusCodes.ATPAR_OK;
        }

        public AtParWebApiResponse<long> GetUserdepartmentsitems(string userID, string orgGrpID, 
            bool synchInvCarts, int appID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();
            var dictionaryResult1 = new Dictionary<string, object> { { "pUserDeptItemsDS", null } };
            List<string> lstUserDepts = new List<string>();
            try
            {
                //Get all the allocated carts to the department
                System.Text.StringBuilder sbSQL = new System.Text.StringBuilder();
                System.Text.StringBuilder sbSearch = new System.Text.StringBuilder();
                DataSet userDeptsDS = new DataSet();
                DataSet _AllocCartsDS = null;
                DataRow[] selRows = null;
               
                DataTable selCartsTbl = null;
                DataSet _AllocDS = null;
                long _statusCode = -1;

                DataSet pUserDeptItemsDS = new DataSet(); //output

                try
                {
                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + " Getting departments allocated to the user" + " with the following SQL...." + sbSQL.ToString() + Environment.NewLine);
                    }
                   
                   var tupleResult= _repo.GetDepartmentID(userID);
                     lstUserDepts=tupleResult.Item1;
                  //var dt=  Utils.ToDataTable(a);
                   // userDeptsDS= tupleResult.Item1.ToDataSet();
                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + sbSQL.ToString() + Environment.NewLine + " Exception is : " + sqlEx.ToString() + Environment.NewLine);
                    }
                    
                    response.AtParException(sqlEx, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                    return response;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + sbSQL.ToString() + Environment.NewLine + " Exception is : " + ex.ToString() + Environment.NewLine);
                    }
                    
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }

                if (lstUserDepts.Count > 0)
                {
                    //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of userDeptsDS.Tables(0).Rows.Count for every iteration:
                    int tempVar = lstUserDepts.Count;                    

                    foreach (var item in lstUserDepts)
                    {
                        sbSearch.Append("DEPARTMENT_ID = '" + item + "' OR ");
                    }
                    if (sbSearch.Length != 0)
                    {
                        sbSearch.Remove(sbSearch.Length - 3, 3);
                    }
                }
                else
                {
                    sbSearch.Append("DEPARTMENT_ID =''");
                }

               

              var  allocatedCarts = _commonPOURepo.GetAllocatedCarts("", "", (int)AtParWebEnums.EnumApps.PointOfUse);
                _AllocCartsDS= allocatedCarts.ToDataSet();               

                selRows = _AllocCartsDS.Tables[0].Select(sbSearch.ToString());

                _AllocDS = new DataSet();
                selCartsTbl = (DataTable)_AllocCartsDS.Tables[0].Clone();

                foreach (DataRow row in selRows)
                {
                    selCartsTbl.ImportRow(row);
                }
                selCartsTbl.AcceptChanges();
                _AllocDS.Tables.Add(selCartsTbl);

                int total_Allocations = _AllocDS.Tables[0].Rows.Count;
                // temporary dataset and table to be returned
                DataSet _retDS = new DataSet();
                DataTable _retTbl = null;
                DataRow _retRow = null;

                _retTbl = new DataTable("DEPARTMENT_CART_ITEMS");
                _retTbl.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                _retTbl.Columns.Add("ITEM_DESCRIPTION", Type.GetType("System.String"));
                _retTbl.Columns.Add("CART_ID", Type.GetType("System.String"));

                DataTable deptCartsTbl = null;
                DataRow deptCartRow = null;
                deptCartsTbl = new DataTable("DEPARTMENT_CARTS");
                deptCartsTbl.Columns.Add("CART_ID", Type.GetType("System.String"));

                DataTable deptBusinessUnitTbl = null;
                DataRow deptBURow = null;

                deptBusinessUnitTbl = new DataTable("DEPARTMENT_BUSINESSUNIT");
                deptBusinessUnitTbl.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));

                // if there are any allocations
                if (total_Allocations > 0)
                {

                    int cartCntr = 0;
                    int itemCntr = 0;
                    string _CartName = null;
                    string _BusinessUnit = null;
                    string _LocationType = null;
                    bool isSameCart = false;
                    bool isSameBU = false;

                    isSameCart = false;
                    isSameBU = false;
                    // load up the carts from the cache 
                    //INSTANT C# NOTE: There is no C# equivalent to VB's implicit 'once only' variable initialization within loops, so the following variable declaration has been placed prior to the loop:
                    DataSet _detDS = null;
                    for (cartCntr = 0; cartCntr < total_Allocations; cartCntr++)
                    {

                        if (_CartName == Convert.ToString(_AllocDS.Tables[0].Rows[cartCntr]["CART_ID"]))
                        {
                            isSameCart = true;
                            _CartName = Convert.ToString(_AllocDS.Tables[0].Rows[cartCntr]["CART_ID"]);
                        }
                        else
                        {
                            isSameCart = false;
                            _CartName = Convert.ToString(_AllocDS.Tables[0].Rows[cartCntr]["CART_ID"]);
                        }

                        if (_BusinessUnit == Convert.ToString(_AllocDS.Tables[0].Rows[cartCntr]["BUSINESS_UNIT"]))
                        {
                            isSameBU = true;
                            _BusinessUnit = Convert.ToString(_AllocDS.Tables[0].Rows[cartCntr]["BUSINESS_UNIT"]);
                        }
                        else
                        {
                            isSameBU = false;
                            _BusinessUnit = Convert.ToString(_AllocDS.Tables[0].Rows[cartCntr]["BUSINESS_UNIT"]);
                        }
                        _LocationType = Convert.ToString(_AllocDS.Tables[0].Rows[cartCntr]["LOCATION_TYPE"]);
                        if (isSameCart == false)
                        {
                            //Adding Cart Row to DataTable
                            //Add only unique Carts
                            deptCartRow = deptCartsTbl.NewRow();
                            deptCartRow["CART_ID"] = _CartName;
                            deptCartsTbl.Rows.Add(deptCartRow);
                            deptCartsTbl.AcceptChanges();
                        }

                        if (isSameBU == false)
                        {
                            //Add Business to DataTable
                            //Add only unique bU
                            //Check before adding
                            deptBURow = deptBusinessUnitTbl.NewRow();
                            deptBURow["BUSINESS_UNIT"] = _BusinessUnit;
                            deptBusinessUnitTbl.Rows.Add(deptBURow);
                            deptBusinessUnitTbl.AcceptChanges();
                        }

                        if (!synchInvCarts && _LocationType == AtParWebEnums. LocationType.I.ToString())
                        {
                            //Skipping the synching of Inventory cart items
                            continue;
                        }
                       

                        try
                        {
                            

                            var tupleResult = _commonPOUService.GetCartDetails(_CartName, _BusinessUnit,
                                _detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), string.Empty, _LocationType, null, "", appID);
                            _detDS = tupleResult.Item2;
                            _statusCode = tupleResult.Item1;

                            if (_statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_statusCode == AtparStatusCodes.E_NORECORDFOUND)
                                {
                                    _statusCode = 0;
                                  
                                }
                                else
                                {
                                    response.AtParNotOK(_statusCode, _commonRepo, _log);
                                    return response;
                                }                               
                            }
                         
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                            {
                                _log.Fatal(methodBaseName + " Failed to get the cart details" + " : Exception is : " + ex.ToString() + Environment.NewLine);
                            }
                            response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                            return response;
                        }

                        if (_detDS.Tables.Count > 0)
                        {
                            //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of _detDS.Tables(1).Rows.Count for every iteration:
                            int tempVar2 = _detDS.Tables[1].Rows.Count;
                            for (itemCntr = 0; itemCntr < tempVar2; itemCntr++)
                            {


                                if (_log.IsDebugEnabled)
                                {
                                    _log.Debug(methodBaseName + "Substitute Item Flag:" + _detDS.Tables[1].Rows[itemCntr][(int)AtParWebEnums.Get_Cart_Detail_Enum.SUBSTITUTE_ITEM_FLG]);
                                }

                                // If appID = EnumApps.Pharmacy Then


                                if (_detDS.Tables[1].Columns.Contains((AtParWebEnums.Get_Cart_Detail_Enum.SUBSTITUTE_ITEM_FLG.ToString()).ToString()))
                                {

                                    if (_detDS.Tables[1].Rows[itemCntr][(int)AtParWebEnums.Get_Cart_Detail_Enum.SUBSTITUTE_ITEM_FLG].ToString() == AtParWebEnums.YesNo_Enum.N.ToString())
                                    {
                                        _retRow = _retTbl.NewRow();
                                        _retRow["ITEM_ID"] = _detDS.Tables[1].Rows[itemCntr][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
                                        _retRow["ITEM_DESCRIPTION"] = _detDS.Tables[1].Rows[itemCntr][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR];
                                        _retRow["CART_ID"] = _detDS.Tables[0].Rows[0][(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.CART_ID];
                                        _retTbl.Rows.Add(_retRow);


                                    }
                                }
                                else
                                {

                                    _retRow = _retTbl.NewRow();
                                    _retRow["ITEM_ID"] = _detDS.Tables[1].Rows[itemCntr][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
                                    _retRow["ITEM_DESCRIPTION"] = _detDS.Tables[1].Rows[itemCntr][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR];
                                    _retRow["CART_ID"] = _detDS.Tables[0].Rows[0][(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.CART_ID];
                                    _retTbl.Rows.Add(_retRow);

                                }
                                


                            }
                        }

                        //Get the non Cart Items and add it
                        DataSet nonCartItemsDS = new DataSet();
                       
                        var lstNonCartItems = _commonPOURepo.GetNonCartItems(_BusinessUnit, _CartName);                        
                        nonCartItemsDS = lstNonCartItems.ToDataSet();
                        if (_statusCode != AtparStatusCodes. ATPAR_OK)
                        {
                            
                            response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, _commonRepo, _log);
                            return response;
                        }

                        //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of nonCartItemsDS.Tables(0).Rows.Count for every iteration:
                        int tempVar3 = nonCartItemsDS.Tables[0].Rows.Count;
                        for (itemCntr = 0; itemCntr < tempVar3; itemCntr++)
                        {
                            _retRow = _retTbl.NewRow();
                            _retRow["ITEM_ID"] = nonCartItemsDS.Tables[0].Rows[itemCntr]["ITEM_ID"];
                            _retRow["ITEM_DESCRIPTION"] = nonCartItemsDS.Tables[0].Rows[itemCntr]["ITEM_DESCRIPTION"];
                            _retRow["CART_ID"] = nonCartItemsDS.Tables[0].Rows[itemCntr]["CART_ID"];
                            _retTbl.Rows.Add(_retRow);
                        }

                    }
                   
                }
                else
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(methodBaseName + " No Carts allocated to this Department " + Environment.NewLine);
                    }
                    
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;

                }
                // put the table back into the dataset
                _retDS.Tables.Add(_retTbl);
                _retDS.Tables.Add(deptCartsTbl);
                _retDS.Tables.Add(deptBusinessUnitTbl);
                pUserDeptItemsDS = _retDS;

                var dictionaryResult = new Dictionary<string, object> { { "pUserDeptItemsDS", pUserDeptItemsDS } };
                response.DataDictionary = dictionaryResult;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to get the items for the department:" + " Exception is : " + ex.ToString() + Environment.NewLine);
                }
                
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }

            //INSTANT C# NOTE: Inserted the following 'return' since all code paths must return a value in C#:
            
        }

    }
}

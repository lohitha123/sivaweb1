using log4net;
using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using AtPar.Repository.Interfaces.POU;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.ViewModel;

namespace AtPar.POU.Service
{
    public class ExpirationTrackingReportService : IExpirationTrackingReportService
    {
        private ILog _log;
        private IExpirationTrackingReportRepository _repo;
        private ICommonPOURepository _commonPOURepo;
        private ICommonRepository _commonRepo;
        private ICommonPOUService _commonPOUService;
        public ExpirationTrackingReportService(ILog log, IExpirationTrackingReportRepository repo,
           ICommonPOURepository commonPOURepo ,
          ICommonRepository commonRepo,
           ICommonPOUService commonPOUService) {
            _log = log;

            _commonRepo = commonRepo;
            _commonPOUService = commonPOUService;
            _commonPOURepo = commonPOURepo;
            _repo = repo;
        }

        public AtParWebApiResponse<long> GetExpirationTrackingReport( string orgGrpID, string[] deviceTokenEntry,
            int duration, string fromDate, string toDate, 
            string deptID, int appID, string cartID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();
            try
            {

                DataSet dsInvItems = null;
                DataSet _detDS = null;
                DataTable dDetTbl = null;
                DataTable tblExpiredItems = null;
                DataTable tblExpiringItems = null;
                DataRow[] __selRows = null;
                StringBuilder sbSearch = null;
                string strItemId = null;
                string strCartId = null;
                string strBUnit = null;
                string strLocType = null;
                string strQoH = null;
                DataRow itemsRow = null;
                string strExpDate = null;
                string strItemDescr = null;
                string strCompartment = null;
                string strItemPrice = "0";
               DataSet pReturnDS = new DataSet();  //output
                long _statusCode = -1;
                string strLotNo = null;
                string strSrNO = null;
                double strConvRTProc = 0;
                double strConvRTPar = 0;
                double strNoOfBXsInCase = 0; //no. of boxes in a case
                double strBXCost = 0; //each box cost
                List<MT_POU_NONCART_ITEMS> lstNonCartItems = new List<MT_POU_NONCART_ITEMS>();
                if (deptID == null)
                {
                    deptID = string.Empty;
                }
                if (cartID == null)
                {
                    cartID = string.Empty;
                }
                try
                {

                    try
                    {
                        // dsInvItems = m_LocalDB.ExecuteDataSet(_Cmd);
                        var tupleResult = _repo.GetExpireTrackRep(duration, fromDate, toDate, deptID, cartID, orgGrpID, appID);
                        dsInvItems = tupleResult.Item1;
                    }
                    catch (SqlException sqlEx)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL.... Exception is : " + sqlEx.ToString() + Environment.NewLine);
                        }
                        response.AtParException(sqlEx, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                        return response;
                    }


                    tblExpiredItems = new DataTable("EXPIRED_ITEMS");
                    tblExpiredItems.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("CART_ID", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("LOT_NO", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("SR_NO", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("EXPIRY_DATE", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("UNIT_COST", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("QUANTITY_ON_HAND", Type.GetType("System.String"));
                    tblExpiredItems.Columns.Add("TOTAL_COST", Type.GetType("System.Double"));

                    tblExpiringItems = new DataTable("EXPIRING_ITEMS");
                    tblExpiringItems.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("CART_ID", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("LOT_NO", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("SR_NO", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("EXPIRY_DATE", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("UNIT_COST", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("QUANTITY_ON_HAND", Type.GetType("System.String"));
                    tblExpiringItems.Columns.Add("TOTAL_COST", Type.GetType("System.Double"));
                    int tempVar = dsInvItems.Tables[0].Rows.Count;
                    for (int i = 0; i < tempVar; i++)
                    {

                        strItemId = dsInvItems.Tables[0].Rows[i]["ITEM_ID"].ToString();
                        strCartId = dsInvItems.Tables[0].Rows[i]["CART_ID"].ToString();
                        strBUnit = dsInvItems.Tables[0].Rows[i]["BUSINESS_UNIT"].ToString();
                        strExpDate = dsInvItems.Tables[0].Rows[i]["EXPIRY_DATE"].ToString();
                        strLotNo = dsInvItems.Tables[0].Rows[i]["LOT_NUMBER"].ToString();
                        strSrNO = dsInvItems.Tables[0].Rows[i]["SERIAL_NUMBER"].ToString();
                        strLocType = dsInvItems.Tables[0].Rows[i]["LOCATION_TYPE"].ToString();
                        strCompartment = dsInvItems.Tables[0].Rows[i]["COMPARTMENT"].ToString().substituteString();

                        if (string.IsNullOrEmpty(dsInvItems.Tables[0].Rows[i]["ITEM_QUANTITY_ON_HAND"].ToString()))
                        {
                            strQoH = "0";
                        }
                        else
                        {
                            strQoH = dsInvItems.Tables[0].Rows[i]["ITEM_QUANTITY_ON_HAND"].ToString();
                        }

                       // _statusCode = _GetCartDetails(strCartId, strBUnit, _detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId],, strLocType,,, appID);

                        var tupleResult = _commonPOUService.GetCartDetails(strCartId, strBUnit, _detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), string.Empty, strLocType,null,"", appID);
                        _detDS= tupleResult.Item2;
                        _statusCode= tupleResult.Item1;

                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(_statusCode, _commonRepo, _log);
                            return response;
                        }

                        _detDS.Tables[1].TableName = "Details";

                        if (_detDS.Tables["Details"].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() != Type.GetType("System.String").ToString())
                        {

                            _statusCode = ConvertColumnType(ref _detDS);

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

                        dDetTbl = new DataTable();
                        dDetTbl = _detDS.Tables["Details"];

                        sbSearch = new StringBuilder();

                        if (strItemId.Length != 0)
                        {
                            sbSearch.Append("[" + dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName + "] = '" + strItemId + "'");
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug(methodBaseName + " ERP Search string is : " + sbSearch.ToString() + Environment.NewLine);
                            }
                        }

                        __selRows = dDetTbl.Select(sbSearch.ToString());

                        strItemDescr = string.Empty;
                        strItemPrice = "0";
                        strConvRTProc = 0; //conversion rate proc value
                        strConvRTPar = 0; //conversion rate par uom value
                        strNoOfBXsInCase = 0;
                        strBXCost = 0;

                        if (__selRows.Length > 0)
                        {

                            if (!Convert.IsDBNull(__selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR]) && !string.IsNullOrEmpty(__selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString()))
                            {

                                strItemDescr = __selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();
                            }
                            else
                            {
                                strItemDescr = string.Empty;
                            }

                            if (!Convert.IsDBNull(__selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE]) && !string.IsNullOrEmpty(__selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString()))
                            {

                                strItemPrice = __selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString();
                            }
                            else
                            {
                                strItemPrice = "0";
                            }
                            if (!string.IsNullOrEmpty(strLocType) && strLocType == AtParWebEnums.LocationType.A.ToString())
                            {
                                if (!string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR)].ToString()))
                                {
                                    strConvRTProc = double.Parse(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR)].ToString());
                                }
                                else
                                {
                                    strConvRTProc = 1;
                                }

                                if (!string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM)].ToString()))
                                {
                                    strConvRTPar = double.Parse(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM)].ToString());
                                }
                                else
                                {
                                    strConvRTPar = 1;
                                }
                                try
                                {
                                    if (strConvRTPar == 0)
                                    {
                                        strNoOfBXsInCase = strConvRTProc;
                                    }
                                    else
                                    {
                                        strNoOfBXsInCase = strConvRTProc / strConvRTPar;
                                    }
                                    //Finding case box cost
                                    strBXCost = Convert.ToDouble(strItemPrice) / strNoOfBXsInCase;
                                    strItemPrice = strBXCost.ToString();
                                    //strItemPrice = (Convert.ToInt32(strConvRTProc) / Convert.ToInt32(strItemPrice)).ToString()  'calc for each cost
                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal(methodBaseName + "Exception is : " + ex.ToString() + Environment.NewLine);
                                    }
                                }
                            }
                        }
                        else
                        {

                            DataSet _dsNonCartItems = new DataSet();
                            DataRow[] _drNonCartItems = null;


                            // _statusCode = GetNonCartItems(strBUnit, strCartId, _dsNonCartItems);


                            try
                            {
                                lstNonCartItems = _commonPOURepo.GetNonCartItems(strBUnit, strCartId);
                                _dsNonCartItems = lstNonCartItems.ToDataSet();
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                                response.AtParException(ex, _commonRepo, _log);
                                return response;
                            }


                            finally
                            {
                                sbSearch.Remove(0, sbSearch.Length);
                            }

                            try 
                            {

                                sbSearch.Append("ITEM_ID = '" + strItemId + "' ");

                                if (_log.IsDebugEnabled)
                                {
                                    _log.Debug(methodBaseName + " Searching in non cart items with string : " + sbSearch.ToString() + Environment.NewLine);
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + " Failed to check if the item is" + " a non cart item: Exception is : " + ex.ToString() + Environment.NewLine);
                                }
                                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                                return response;
                            }

                            _drNonCartItems = _dsNonCartItems.Tables[0].Select(sbSearch.ToString());

                            if (_drNonCartItems.Length > 0)
                            {

                                if (!string.IsNullOrEmpty(_drNonCartItems[0]["ITEM_DESCRIPTION"].ToString()))
                                {
                                    strItemDescr = _drNonCartItems[0]["ITEM_DESCRIPTION"].ToString();
                                }
                                else
                                {
                                    strItemDescr = string.Empty;
                                }

                                if (!string.IsNullOrEmpty(_drNonCartItems[0]["COMPARTMENT"].ToString()))
                                {
                                    strCompartment = (_drNonCartItems[0]["COMPARTMENT"].ToString().substituteString());
                                }
                                else
                                {
                                    strCompartment = string.Empty;
                                }

                                if (!string.IsNullOrEmpty(_drNonCartItems[0]["ITEM_PRICE"].ToString()))
                                {
                                    strItemPrice = _drNonCartItems[0]["ITEM_PRICE"].ToString();
                                }
                                else
                                {
                                    strItemPrice = "0";
                                }

                            }

                        }
                        itemsRow = tblExpiredItems.NewRow();
                        itemsRow["BUSINESS_UNIT"] = strBUnit;
                        itemsRow["CART_ID"] = strCartId;
                        itemsRow["ITEM_ID"] = strItemId;
                        itemsRow["DESCRIPTION"] = strItemDescr;
                        itemsRow["LOT_NO"] = strLotNo;
                        itemsRow["SR_NO"] = strSrNO;
                        itemsRow["COMPARTMENT"] = strCompartment;
                        itemsRow["EXPIRY_DATE"] = strExpDate;
                        itemsRow["UNIT_COST"] = strItemPrice;
                        itemsRow["QUANTITY_ON_HAND"] = FormatAtParNumber(Convert.ToDouble(strQoH), 2);
                        itemsRow["TOTAL_COST"] = FormatAtParNumber(Convert.ToDouble(strItemPrice) * Convert.ToDouble(strQoH), 2);
                        tblExpiredItems.Rows.Add(itemsRow);

                    }

                    pReturnDS.Tables.Add(tblExpiredItems);

                    //To Get Expiring Items
                    //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of dsInvItems.Tables[1].Rows.Count for every iteration:
                    int tempVar1 = dsInvItems.Tables[1].Rows.Count;

                    for (int i = 0; i < tempVar1; i++)
                    {

                        strItemId = dsInvItems.Tables[1].Rows[i]["ITEM_ID"].ToString();
                        strCartId = dsInvItems.Tables[1].Rows[i]["CART_ID"].ToString();
                        strBUnit = dsInvItems.Tables[1].Rows[i]["BUSINESS_UNIT"].ToString();
                        strExpDate = dsInvItems.Tables[1].Rows[i]["EXPIRY_DATE"].ToString();
                        strLotNo = dsInvItems.Tables[1].Rows[i]["LOT_NUMBER"].ToString();
                        strSrNO = dsInvItems.Tables[1].Rows[i]["SERIAL_NUMBER"].ToString();
                        strLocType = dsInvItems.Tables[1].Rows[i]["LOCATION_TYPE"].ToString();
                        strCompartment = (dsInvItems.Tables[1].Rows[i]["COMPARTMENT"].ToString().substituteString());
                        if (string.IsNullOrEmpty(dsInvItems.Tables[1].Rows[i]["ITEM_QUANTITY_ON_HAND"].ToString()))
                        {
                            strQoH = "0";
                        }
                        else
                        {
                            strQoH = dsInvItems.Tables[1].Rows[i]["ITEM_QUANTITY_ON_HAND"].ToString();
                        }
                       // _statusCode = _GetCartDetails(strCartId, strBUnit, _detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId],, strLocType,,, appID);
                        var tupleResult = _commonPOUService.GetCartDetails(strCartId, strBUnit, _detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), string.Empty, strLocType, null, "", appID);
                        _detDS = tupleResult.Item2;
                        _statusCode = tupleResult.Item1;
                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(_statusCode, _commonRepo, _log);
                            return response;
                        }

                        _detDS.Tables[1].TableName = "Details";
                        if (_detDS.Tables["Details"].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() != Type.GetType("System.String").ToString())
                        {

                            _statusCode = ConvertColumnType(ref _detDS);

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
                        dDetTbl = new DataTable();
                        dDetTbl = _detDS.Tables["Details"];
                       

                        sbSearch = new System.Text.StringBuilder();

                        if (strItemId.Length != 0)
                        {
                            sbSearch.Append("[" + dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName + "] = '" + strItemId + "'");
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug(methodBaseName + " Search string is : " + sbSearch.ToString() + Environment.NewLine);
                            }
                        }

                        __selRows = dDetTbl.Select(sbSearch.ToString());

                        if (__selRows.Length > 0)
                        {
                            if (Convert.IsDBNull(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR)]))
                            {
                                strItemDescr = string.Empty;
                            }
                            else if ((__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR)] == null | string.IsNullOrEmpty(__selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString())))
                            {
                                strItemDescr = string.Empty;
                            }
                            else
                            {
                                strItemDescr = __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR)].ToString();
                            }

                            if ((__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE)].ToString() == null | string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE)].ToString())))
                            {
                                strItemPrice = "0";
                            }
                            else
                            {
                                strItemPrice = __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE)].ToString();
                            }

                            if (!string.IsNullOrEmpty(strLocType) && strLocType == AtParWebEnums.LocationType.A.ToString())
                            {
                                if (!string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR)].ToString()))
                                {
                                    strConvRTProc = double.Parse(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR)].ToString());
                                }
                                else
                                {
                                    strConvRTProc = 1;
                                }

                                if (!string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM)].ToString()))
                                {
                                    _log.Info(methodBaseName + " test PAR UOM is " + __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM)].ToString());
                                    strConvRTPar = double.Parse(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM)].ToString());
                                }
                                else
                                {
                                    strConvRTPar = 1;
                                }
                                try
                                {
                                    if (strConvRTPar == 0)
                                    {
                                        strNoOfBXsInCase = strConvRTProc;
                                    }
                                    else
                                    {
                                        strNoOfBXsInCase = strConvRTProc / strConvRTPar;
                                    }
                                    //Finding case box cost
                                    strBXCost = Convert.ToDouble(strItemPrice) / strNoOfBXsInCase;
                                    strItemPrice = strBXCost.ToString();
                                    //strItemPrice = (Convert.ToInt32(strConvRTProc) / Convert.ToInt32(strItemPrice)).ToString()  'calc for each cost
                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal(methodBaseName + "Exception is : " + ex.ToString() + Environment.NewLine);
                                    }
                                }

                            }

                        }
                        else
                        {
                            strItemDescr = string.Empty;
                            strCompartment = string.Empty;
                            strItemPrice = "0";

                            DataSet _dsNonCartItems = new DataSet();
                            DataRow[] _drNonCartItems = null;
                            try
                            {
                                // _statusCode = GetNonCartItems(strBUnit, strCartId, _dsNonCartItems);
                                try
                                {
                                    lstNonCartItems = _commonPOURepo.GetNonCartItems(strBUnit, strCartId);
                                    _dsNonCartItems = lstNonCartItems.ToDataSet();
                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                                    response.AtParException(ex, _commonRepo, _log);
                                    return response;
                                }
                                if (_statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal(methodBaseName + " Failed to get the non cart" + " items : Status Code is : " + _statusCode + Environment.NewLine);
                                    }
                                   
                                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                    return response;
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + " Failed to get the non cart" + " items : Exception is : " + ex.ToString() + Environment.NewLine);
                                }
                                
                                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                return response;

                            }
                            finally
                            {
                                sbSearch.Remove(0, sbSearch.Length);
                            }

                            try
                            {

                                sbSearch.Append("ITEM_ID = '" + strItemId + "' ");

                                if (_log.IsDebugEnabled)
                                {
                                    _log.Debug(methodBaseName + " Searching in non cart items with string : " + sbSearch.ToString() + Environment.NewLine);
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + " Failed to check if the item is" + " a non cart item: Exception is : " + ex.ToString() + Environment.NewLine);
                                }
                                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                return response;

                            }

                            _drNonCartItems = _dsNonCartItems.Tables[0].Select(sbSearch.ToString());

                            if (_drNonCartItems.Length > 0)
                            {

                                if (!string.IsNullOrEmpty(_drNonCartItems[0]["ITEM_DESCRIPTION"].ToString()))
                                {
                                    strItemDescr = _drNonCartItems[0]["ITEM_DESCRIPTION"].ToString();
                                }
                                else
                                {
                                    strItemDescr = string.Empty;
                                }

                                if (!string.IsNullOrEmpty(_drNonCartItems[0]["COMPARTMENT"].ToString()))
                                {
                                    strCompartment = (_drNonCartItems[0]["COMPARTMENT"].ToString().substituteString());
                                }
                                else
                                {
                                    strCompartment = string.Empty;
                                }

                                if (!string.IsNullOrEmpty(_drNonCartItems[0]["ITEM_PRICE"].ToString()))
                                {
                                    strItemPrice = _drNonCartItems[0]["ITEM_PRICE"].ToString();
                                }
                                else
                                {
                                    strItemPrice = "0";
                                }

                            }

                        }

                        itemsRow = tblExpiringItems.NewRow();
                        itemsRow["BUSINESS_UNIT"] = strBUnit;
                        itemsRow["CART_ID"] = strCartId;
                        itemsRow["ITEM_ID"] = strItemId;
                        itemsRow["DESCRIPTION"] = strItemDescr;
                        itemsRow["LOT_NO"] = strLotNo;
                        itemsRow["SR_NO"] = strSrNO;
                        itemsRow["COMPARTMENT"] = strCompartment;
                        itemsRow["EXPIRY_DATE"] = strExpDate;
                        itemsRow["UNIT_COST"] = strItemPrice;
                        itemsRow["QUANTITY_ON_HAND"] = FormatAtParNumber(Convert.ToDouble(strQoH), 2);
                        itemsRow["TOTAL_COST"] = FormatAtParNumber(Convert.ToDouble(strItemPrice) * Convert.ToDouble(strQoH), 2);
                        tblExpiringItems.Rows.Add(itemsRow);

                    }

                    pReturnDS.Tables.Add(tblExpiringItems);
                    
                    var dictionaryResult = new Dictionary<string, object> { { "pReturnDS", pReturnDS } };
                    response.DataDictionary = dictionaryResult;
                    response.AtParSuccess();
                    return response;

                }



                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to get the Expiration Tracking Report :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                    }
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to get the Expiration Tracking Report :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                }
                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                return response;
            }
        }



        //need to check this method
        public string FormatAtParNumber(double strIP, int len)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                string _strPad = string.Empty;
                return string.Format((Math.Truncate(Convert.ToSingle(strIP) * Math.Pow(10, len)) / Math.Pow(10, len)).ToString(), "0." + _strPad.PadRight(len, '0'));
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ":Failed to format the number: " + strIP + Environment.NewLine + " :Exception is:" + ex.Message.ToString() + Environment.NewLine);
                }
                return strIP.ToString(); //Returning the string as it is
            }
        }

        public long ConvertColumnType(ref DataSet ds)
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

        public AtParWebApiResponse<long> GetExpItemCnt(string orgGrpID, string userID,
            int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

           
            var response = new AtParWebApiResponse<long>();
            int duration = 0;
            int pIntExpiredCnt = 0;
            int pIntExpiringCnt = 0;
            try
            {
                var result = _repo.GetExpItemCnt( orgGrpID,  userID,
             appID,  deviceTokenEntry, ref  duration,
            ref  pIntExpiredCnt, ref  pIntExpiringCnt);


                var dictionaryResult = new Dictionary<string, object> { { "duration", duration }, { "pIntExpiredCnt", pIntExpiredCnt }, { "pIntExpiringCnt", pIntExpiringCnt } };

               
                if (!result.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(result, _commonRepo, _log);
                    return response;
                }

                response.DataDictionary = dictionaryResult;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<VM_GetDeptCartAllocations> GetDeptCartAllocations(string businessUnit, string deptID, int appID, string locType, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_GetDeptCartAllocations>();
            try
            {
                var result = _repo.GetDeptCartAllocations( businessUnit,  deptID,  appID,  locType);

                if (result.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.DataList = result;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
    }
}

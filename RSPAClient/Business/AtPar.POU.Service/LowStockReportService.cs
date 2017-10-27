using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Service
{
    public class LowStockReportService : ILowStockReportService
    {
        private ILog _log;
        private ICommonRepository _commonRepo;
        ICommonPOURepository _commonPOURepo;
        ICommonPOUService _commonPOUService;
        ILowStockReportRepository _repo;
        public LowStockReportService(ILog log, ICommonRepository commonRepo, ICommonPOURepository commonPOURepo, ICommonPOUService commonPOUService, ILowStockReportRepository repo)
        {
            _log = log;
            _commonRepo = commonRepo;
            _commonPOURepo = commonPOURepo;
            _commonPOUService = commonPOUService;
            _repo = repo;
        }

        public AtParWebApiResponse<long> GetLowStockRep(string orgGrpID, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();
            try
            {
                DataSet pReturnDS = new DataSet();
                DataSet dsInvItems = new DataSet();
                DataSet _detDS = new DataSet();
                // string strSQL = null;
                DataTable tblItems = new DataTable();
                DataTable tblCriticalItems = new DataTable();
                DataTable tblAllItemsBelowPar = new DataTable();
                DataTable tblAllStockOutItems = new DataTable();
                DataTable tblAllItems = new DataTable();
                DataTable dDetTbl = new DataTable();
                DataRow[] __selRows = null;
                StringBuilder sbSearch = null;
                string strItemId = null;
                string strCartId = null;
                string strBUnit = null;
                string strQoH = null;
                string strPQty = null;
                string strCrFlg = null;
                DataRow itemsRow = null;
                string strItemDescr = null;
                string strUOM = null;
                string strLocType = null;
                pReturnDS = new DataSet();
                long _statusCode = -1;
                
                string strCompartment = null;

                // Atpar_Application_Parameters _atparParameters = null;
                int _intPerOptQty = 0;

                try
                {
                    //_atparParameters = Atpar_Application_Parameters.CreateInstance(deviceTokenEntry[TokenEntry_Enum.SystemId]);
                    //_atparParameters.OrgGroupId = orgGrpID;
                    //_atparParameters.ApplicationId = appID;
                    //_atparParameters.ParameterId = AppParameters_Enum.PERCENTAGE_OPTIMUM_QTY.ToString();

                    //_statusCode = _atparParameters.GetOrgGroupParamValue(_intPerOptQty);


                    _intPerOptQty = Convert.ToInt32(_commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.PERCENTAGE_OPTIMUM_QTY.ToString(), appID, orgGrpID));

                    //if (_statusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //    {
                    //        _log.Fatal(methodBaseName + " : Failed in GetOrgGroupParamValue method with statuscode : " + _statusCode);
                    //    }
                    //    return _statusCode;
                    //}

                }
                catch (Exception ex)
                {
                    
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                    response.AtParException(ex, _commonRepo, _log);
                    return response;
                }


                try
                {
                    // dsInvItems = m_LocalDB.ExecuteDataSet(_Cmd);
                    var tupleResult1 = _repo.GetLowStockRep(appID, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID]);
                    dsInvItems = tupleResult1.Item1;
                }
                catch (SqlException sqlEx)
                {
                    
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, sqlEx.ToString())); }
                    response.AtParException(sqlEx, _commonRepo, _log, StatusCode: AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                    return response;

                }





                tblItems = new DataTable("ITEMS_BELOW_PAR");
                tblItems.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                tblItems.Columns.Add("CART_ID", Type.GetType("System.String"));
                tblItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                tblItems.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
                tblItems.Columns.Add("PAR_QUANTITY", Type.GetType("System.String"));
                tblItems.Columns.Add("ITEM_QUANTITY_ON_HAND", Type.GetType("System.String"));
                tblItems.Columns.Add("UOM", Type.GetType("System.String"));
                tblItems.Columns.Add("COMPARTMENT", Type.GetType("System.String"));

                tblCriticalItems = new DataTable("CRITICAL_ITEMS");
                tblCriticalItems.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                tblCriticalItems.Columns.Add("CART_ID", Type.GetType("System.String"));
                tblCriticalItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                tblCriticalItems.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
                tblCriticalItems.Columns.Add("PAR_QUANTITY", Type.GetType("System.String"));
                tblCriticalItems.Columns.Add("ITEM_QUANTITY_ON_HAND", Type.GetType("System.String"));
                tblCriticalItems.Columns.Add("UOM", Type.GetType("System.String"));
                tblCriticalItems.Columns.Add("COMPARTMENT", Type.GetType("System.String"));

                tblAllItemsBelowPar = new DataTable("ALL_ITEMS_BELOW_PAR");
                tblAllItemsBelowPar.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                tblAllItemsBelowPar.Columns.Add("CART_ID", Type.GetType("System.String"));
                tblAllItemsBelowPar.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                tblAllItemsBelowPar.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
                tblAllItemsBelowPar.Columns.Add("PAR_QUANTITY", Type.GetType("System.String"));
                tblAllItemsBelowPar.Columns.Add("ITEM_QUANTITY_ON_HAND", Type.GetType("System.String"));
                tblAllItemsBelowPar.Columns.Add("UOM", Type.GetType("System.String"));
                tblAllItemsBelowPar.Columns.Add("COMPARTMENT", Type.GetType("System.String"));

                tblAllStockOutItems = new DataTable("ALL_STOCKOUT_ITEMS");
                tblAllStockOutItems.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                tblAllStockOutItems.Columns.Add("CART_ID", Type.GetType("System.String"));
                tblAllStockOutItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                tblAllStockOutItems.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
                tblAllStockOutItems.Columns.Add("PAR_QUANTITY", Type.GetType("System.String"));
                tblAllStockOutItems.Columns.Add("ITEM_QUANTITY_ON_HAND", Type.GetType("System.String"));
                tblAllStockOutItems.Columns.Add("UOM", Type.GetType("System.String"));
                tblAllStockOutItems.Columns.Add("COMPARTMENT", Type.GetType("System.String"));


                tblAllItems = new DataTable("ALL_ITEMS");
                tblAllItems.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                tblAllItems.Columns.Add("CART_ID", Type.GetType("System.String"));
                tblAllItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                tblAllItems.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
                tblAllItems.Columns.Add("PAR_QUANTITY", Type.GetType("System.String"));
                tblAllItems.Columns.Add("ITEM_QUANTITY_ON_HAND", Type.GetType("System.String"));
                tblAllItems.Columns.Add("UOM", Type.GetType("System.String"));
                tblAllItems.Columns.Add("COMPARTMENT", Type.GetType("System.String"));


                int tempVar = dsInvItems.Tables[0].Rows.Count;
                for (int i = 0; i < tempVar; i++)
                {

                    if (strCartId != Convert.ToString(dsInvItems.Tables[0].Rows[i]["CART_ID"]) || strBUnit != Convert.ToString(dsInvItems.Tables[0].Rows[i]["BUSINESS_UNIT"]))
                    {

                        strCartId = Convert.ToString(dsInvItems.Tables[0].Rows[i]["CART_ID"]);
                        strBUnit = Convert.ToString(dsInvItems.Tables[0].Rows[i]["BUSINESS_UNIT"]);
                        //Getting location type.
                        try
                        {
                            // _statusCode = GetLocationType(strBUnit, strCartId, strLocType);
                            strLocType = _commonPOURepo.GetLocationType(strBUnit, strCartId);
                           
                        }
                        catch (Exception ex)
                        {
                            // return new Tuple<DataSet, long>(pReturnDS, AtparStatusCodes.E_SERVERERROR);
                            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                            response.AtParException(ex, _commonRepo, _log);
                            return response;

                        }
                        // _statusCode = _GetCartDetails(strCartId, strBUnit, _detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId],, strLocType,,, appID);

                        var tupleResult = _commonPOUService.GetCartDetails(strCartId, strBUnit, _detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], "", strLocType, null, "", appID, "");

                        _statusCode = tupleResult.Item1;

                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_statusCode != AtparStatusCodes.E_NORECORDFOUND)
                            {

                                // return new Tuple<DataSet, long>(pReturnDS, _statusCode);
                                response.AtParNotOK(_statusCode, _commonRepo, _log);
                                return response;
                                
                            }
                        }
                        if (_statusCode == AtparStatusCodes.E_NORECORDFOUND)
                        {
                            response.AtParNotOK(_statusCode, _commonRepo, _log);
                            return response;
                        }
                        _detDS = tupleResult.Item2;
                        _detDS.Tables[1].TableName = "Details";

                        dDetTbl = new DataTable();
                        dDetTbl = _detDS.Tables["Details"];
                    }

                    strItemId = Convert.ToString(dsInvItems.Tables[0].Rows[i]["ITEM_ID"]);
                    strCartId = Convert.ToString(dsInvItems.Tables[0].Rows[i]["CART_ID"]);
                    strBUnit = Convert.ToString(dsInvItems.Tables[0].Rows[i]["BUSINESS_UNIT"]);
                    strQoH = Convert.ToString(dsInvItems.Tables[0].Rows[i]["ITEM_QUANTITY_ON_HAND"]);
                    strCompartment = Convert.ToString(dsInvItems.Tables[0].Rows[i]["COMPARTMENT"]);

                    sbSearch = new System.Text.StringBuilder();


                    if (strItemId.Length != 0)
                    {
                        if (dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() == "System.String")
                        {
                            sbSearch.Append("[" + dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName + "] = '" + strItemId + "'");
                            sbSearch.Append(" AND [" + dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ColumnName + "] = '" + strCompartment + "'");
                        }
                        else
                        {
                            int myInt;
                            bool isNumerical = int.TryParse(strItemId, out myInt);
                            if (isNumerical)
                            {
                                sbSearch.Append("[" + dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName + "] = " + strItemId + "");
                                sbSearch.Append(" AND [" + dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ColumnName + "] = '" + strCompartment + "'");
                            }
                            else
                            {
                                sbSearch.Append("0=-1");
                            }
                        }
                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(methodBaseName + " Getting data for the item : " + sbSearch.ToString() + Environment.NewLine);
                        }
                    }





                    __selRows = dDetTbl.Select(sbSearch.ToString());

                    if (__selRows.Length > 0)
                    {

                        if (!Convert.IsDBNull(__selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.COUNT_REQD]))
                        {
                            if (__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.COUNT_REQD)] == null | string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.COUNT_REQD)].ToString()))
                            {
                                strCrFlg = string.Empty;
                            }
                            else
                            {
                                strCrFlg = __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.COUNT_REQD)].ToString();
                            }
                        }
                        else
                        {
                            strCrFlg = string.Empty;
                        }

                        if (!Convert.IsDBNull(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY)]))
                        {
                            if (__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY)] == null | string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY)].ToString()))
                            {
                                strPQty = "0";
                            }
                            else
                            {
                                strPQty = __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY)].ToString();
                            }
                        }
                        else
                        {
                            strPQty = "0";
                        }

                        if (!Convert.IsDBNull(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR)]))
                        {
                            if (__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR)] == null | string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR)].ToString()))
                            {
                                strItemDescr = string.Empty;
                            }
                            else
                            {
                                strItemDescr = __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR)].ToString();
                            }
                        }
                        else
                        {
                            strItemDescr = string.Empty;
                        }

                        if (strLocType == AtParWebEnums.LocationType.A.ToString())
                        {
                            if (!Convert.IsDBNull(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM)]))
                            {
                                if (__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM)] == null | string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM)].ToString()))
                                {
                                    strUOM = __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM)].ToString();
                                }
                                else
                                {
                                    strUOM = __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM)].ToString();
                                }
                            }
                            else
                            {
                                strUOM = __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM)].ToString();
                            }
                        }
                        else
                        {
                            if (!Convert.IsDBNull(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM)]))
                            {
                                if (__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM)] == null | string.IsNullOrEmpty(__selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM)].ToString()))
                                {
                                    strUOM = string.Empty;
                                }
                                else
                                {
                                    strUOM = __selRows[0][((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM)].ToString();
                                }
                            }
                            else
                            {
                                strUOM = string.Empty;
                            }
                        }

                        if (strCrFlg.ToUpper() == "Y")
                        {
                            itemsRow = tblCriticalItems.NewRow();
                            itemsRow["BUSINESS_UNIT"] = strBUnit;
                            itemsRow["CART_ID"] = strCartId;
                            itemsRow["ITEM_ID"] = strItemId;
                            itemsRow["DESCRIPTION"] = strItemDescr;
                            itemsRow["PAR_QUANTITY"] = strPQty;
                            itemsRow["ITEM_QUANTITY_ON_HAND"] = strQoH;
                            itemsRow["UOM"] = strUOM;
                            itemsRow["COMPARTMENT"] = strCompartment;
                            tblCriticalItems.Rows.Add(itemsRow);
                        }

                        if (strCrFlg.ToUpper() == "Y" && Convert.ToDouble(strQoH) <= (Math.Floor((Convert.ToDouble(strPQty) * _intPerOptQty) / 100)))
                        {
                            itemsRow = tblItems.NewRow();
                            itemsRow["BUSINESS_UNIT"] = strBUnit;
                            itemsRow["CART_ID"] = strCartId;
                            itemsRow["ITEM_ID"] = strItemId;
                            itemsRow["DESCRIPTION"] = strItemDescr;
                            itemsRow["PAR_QUANTITY"] = strPQty;
                            itemsRow["ITEM_QUANTITY_ON_HAND"] = strQoH;
                            itemsRow["UOM"] = strUOM;
                            itemsRow["COMPARTMENT"] = strCompartment;
                            tblItems.Rows.Add(itemsRow);
                        }

                        if (Convert.ToDouble(strQoH) <= (Math.Floor((Convert.ToDouble(strPQty) * _intPerOptQty) / 100)))
                        {
                            itemsRow = tblAllItemsBelowPar.NewRow();
                            itemsRow["BUSINESS_UNIT"] = strBUnit;
                            itemsRow["CART_ID"] = strCartId;
                            itemsRow["ITEM_ID"] = strItemId;
                            itemsRow["DESCRIPTION"] = strItemDescr;
                            itemsRow["PAR_QUANTITY"] = strPQty;
                            itemsRow["ITEM_QUANTITY_ON_HAND"] = strQoH;
                            itemsRow["UOM"] = strUOM;
                            itemsRow["COMPARTMENT"] = strCompartment;
                            tblAllItemsBelowPar.Rows.Add(itemsRow);
                        }

                        if (Convert.ToDouble(strQoH) == 0)
                        {
                            itemsRow = tblAllStockOutItems.NewRow();
                            itemsRow["BUSINESS_UNIT"] = strBUnit;
                            itemsRow["CART_ID"] = strCartId;
                            itemsRow["ITEM_ID"] = strItemId;
                            itemsRow["DESCRIPTION"] = strItemDescr;
                            itemsRow["PAR_QUANTITY"] = strPQty;
                            itemsRow["ITEM_QUANTITY_ON_HAND"] = strQoH;
                            itemsRow["UOM"] = strUOM;
                            itemsRow["COMPARTMENT"] = strCompartment;
                            tblAllStockOutItems.Rows.Add(itemsRow);
                        }

                        itemsRow = tblAllItems.NewRow();
                        itemsRow["BUSINESS_UNIT"] = strBUnit;
                        itemsRow["CART_ID"] = strCartId;
                        itemsRow["ITEM_ID"] = strItemId;
                        itemsRow["DESCRIPTION"] = strItemDescr;
                        itemsRow["PAR_QUANTITY"] = strPQty;
                        itemsRow["ITEM_QUANTITY_ON_HAND"] = strQoH;
                        itemsRow["UOM"] = strUOM;
                        itemsRow["COMPARTMENT"] = strCompartment;
                        tblAllItems.Rows.Add(itemsRow);

                    }
                    // Next;
                   
                    // GetLowStockRep = ATPAR_OK;

                }
                pReturnDS.Tables.Add(tblCriticalItems);
                pReturnDS.Tables.Add(tblItems);
                pReturnDS.Tables.Add(tblAllItemsBelowPar);
                pReturnDS.Tables.Add(tblAllItems);
                pReturnDS.Tables.Add(tblAllStockOutItems);
                //return new Tuple<DataSet, long>(pReturnDS, AtparStatusCodes.ATPAR_OK);
                var ds = new Dictionary<string, object> { { "pReturnDS", pReturnDS } };
                response.AtParSuccess();
                response.DataDictionary = ds;
                return response;
            }

            catch (Exception ex)
            {
              
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }


        }


    }
}

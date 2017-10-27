using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using AtPar.Service.Interfaces.POU;
using System.Xml.Linq;

namespace AtPar.POU.Service
{

    public class SetupItemAttributesService : ISetupItemAttributesService
    {
        private ILog _log;
        private ICommonRepository _commonRepo;
        private ISetupItemAttributesRepository _repo;
        private ICommonPOUService _commonPOUService;
        public SetupItemAttributesService(ILog log, ICommonRepository commonRepo, ISetupItemAttributesRepository repo,ICommonPOUService commonPOUService)
        {
            _log = log;
            _commonRepo = commonRepo;
            _repo = repo;
            _commonPOUService = commonPOUService;
            this._log.SetLoggerType(typeof(SetupItemAttributesService));
        }

        #region SaveDeptItemAttributes
        public AtParWebApiResponse<string> SaveDeptItemAttributes(List<VM_MT_POU_ITEM_ATTRIBUTES> lstItemAtributes, string deptID, string bUnit, string locationType, string itemID, string orgGrpID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                var resultTuple = _repo.SaveDeptItemAttributes(lstItemAtributes, deptID, bUnit, locationType, itemID, orgGrpID, userID);
                response.StatusCode = resultTuple.Item1;
                response.DataList = resultTuple.Item2;

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion



        #region GetItemAttributesDetails
     
        public AtParWebApiResponse<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT> GetItemAttributesDetails(string deptID, string bUnit, int display, string cartID,
            string locationType, string itemID, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
            DataSet dsCarts = new DataSet();
            DataSet dsItemDetailsFinal = new DataSet();
            DataSet dsCartInventoryDetails = new DataSet();
            DataSet itemAttributesDS = new DataSet();
            DataTable dsItmAttrFiltrDs = new DataTable();

            try
            {
                var tupleResult = GetDeptCartAllocationDetails(bUnit, cartID, display, locationType, dsCarts,
                    deviceTokenEntry);
                dsCarts = tupleResult.Item2;
                var statusCode = tupleResult.Item1;

                if (statusCode == AtparStatusCodes.ATPAR_OK)
                {
                    try
                    {
                        List<MT_POU_CART_INVENTORY> lstCartInventory = _repo.GetCartInventory(bUnit);
                        DataTable dtCartInventoryDetails = lstCartInventory.ToDataTable();
                        dsCartInventoryDetails.Tables.Add(dtCartInventoryDetails);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                        return response;
                    }

                    try
                    {
                        List<MT_ATPAR_ITEM_ATTRIBUTES> lstItemAttributes =
                            _repo.GetItemAttributes(bUnit, cartID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID], itemID);
                        DataTable itemAttributesDt = lstItemAttributes.ToDataTable();
                        itemAttributesDS.Tables.Add(itemAttributesDt);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                        return response;
                    }

                    foreach (DataRow drItem in dsCarts.Tables[0].Rows)
                    {
                        if (drItem["LOCATION_TYPE"].ToString() == "A")
                        {
                            continue;
                        }

                        var cartItemsResult = GetCartItems(drItem["LOCATION"].ToString(), drItem["BUSINESS_UNIT"].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID], deviceTokenEntry);
                        var dsItemDetails = cartItemsResult.Item2;
                        statusCode = cartItemsResult.Item1;

                        if (statusCode == AtparStatusCodes.ATPAR_OK)
                        {
                            if ((dsItemDetails != null))
                            {
                                if (dsItemDetails.Tables.Count > 0)
                                {
                                    if (!dsItemDetails.Tables[0].Columns.Contains("BUSINESS_UNIT"))
                                    {
                                        dsItemDetails.Tables[0].Columns.Add("BUSINESS_UNIT");
                                        dsItemDetails.Tables[0].Columns.Add("LOCATION");
                                        dsItemDetails.Tables[0].Columns.Add("LOCATION_DESCR");
                                        dsItemDetails.Tables[0].Columns.Add("DEPT_ID");
                                        dsItemDetails.Tables[0].Columns.Add("ASSIGN_CART");
                                        dsItemDetails.Tables[0].Columns.Add("ACT_ASSIGN_CART");
                                        dsItemDetails.Tables[0].Columns.Add("LOCATION_TYPE");
                                        dsItemDetails.Tables[0].Columns.Add("LOT");
                                        dsItemDetails.Tables[0].Columns.Add("SERIAL");
                                        dsItemDetails.Tables[0].Columns.Add("ISSUE_UOM");
                                        dsItemDetails.Tables[0].Columns.Add("CONVERSION_FACTOR");
                                        dsItemDetails.Tables[0].Columns.Add("PAR_UOM");
                                        dsItemDetails.Tables[0].Columns.Add("CONV_RATE_PAR_TO_ISSUE_CF");
                                        dsItemDetails.Tables[0].Columns.Add("LOT_SERIAL_DISABLE");
                                        dsItemDetails.Tables[0].Columns.Add("CART_INVENTORY_ITEM");
                                    }
                                    for (int rowIndex = 0; rowIndex <= dsItemDetails.Tables[0].Rows.Count - 1; rowIndex++)
                                    {
                                        dsItemDetails.Tables[0].Rows[rowIndex]["BUSINESS_UNIT"] = drItem["BUSINESS_UNIT"].ToString();
                                        dsItemDetails.Tables[0].Rows[rowIndex]["LOCATION"] = drItem["LOCATION"].ToString();
                                        dsItemDetails.Tables[0].Rows[rowIndex]["LOCATION_DESCR"] = drItem["LOCATION_DESCR"].ToString();
                                        dsItemDetails.Tables[0].Rows[rowIndex]["DEPT_ID"] = drItem["DEPT_ID"].ToString();
                                        dsItemDetails.Tables[0].Rows[rowIndex]["ASSIGN_CART"] = "Y";
                                        dsItemDetails.Tables[0].Rows[rowIndex]["CART_INVENTORY_ITEM"] = "N";
                                        dsItemDetails.Tables[0].Rows[rowIndex]["ACT_ASSIGN_CART"] = drItem["ACT_ASSIGN_CART"].ToString();
                                        dsItemDetails.Tables[0].Rows[rowIndex]["LOCATION_TYPE"] = drItem["LOCATION_TYPE"].ToString();
                                        dsItemDetails.Tables[0].Rows[rowIndex]["ISSUE_UOM"] = string.Empty;
                                        dsItemDetails.Tables[0].Rows[rowIndex]["CONVERSION_FACTOR"] = string.Empty;
                                        dsItemDetails.Tables[0].Rows[rowIndex]["PAR_UOM"] =
                                            dsItemDetails.Tables[0].Rows[rowIndex]["UOM"].ToString();
                                        dsItemDetails.Tables[0].Rows[rowIndex]["CONV_RATE_PAR_TO_ISSUE_CF"] =
                                            string.Empty;
                                        dsItemDetails.Tables[0].Rows[rowIndex]["LOT_SERIAL_DISABLE"] = "N";
                                        dsItemDetails.Tables[0].Rows[rowIndex]["CART_INVENTORY_ITEM"] = "N";

                                        if ((dsItemDetails.Tables[0].Rows[rowIndex]["LOT_CONTROLLED"]).ToString() == "Y" | (dsItemDetails.Tables[0].Rows[rowIndex]["SERIAL_CONTROLLED"]).ToString() == "Y")
                                        {
                                            dsItemDetails.Tables[0].Rows[rowIndex]["LOT_SERIAL_DISABLE"] = "Y";
                                        }
                                        if (itemAttributesDS.Tables.Count > 0)
                                        {
                                            var drLotSerial = itemAttributesDS.Tables[0].Select("ITEM_ID = '" + dsItemDetails.Tables[0].Rows[rowIndex]["ITEM_ID"] + "' AND BUSINESS_UNIT = '" + dsItemDetails.Tables[0].Rows[rowIndex]["BUSINESS_UNIT"] + "' AND CART_ID = '" + dsItemDetails.Tables[0].Rows[rowIndex]["LOCATION"] + "'");

                                            if (drLotSerial.Length > 0)
                                            {
                                                dsItemDetails.Tables[0].Rows[rowIndex]["LOT"] = drLotSerial[0]["LOT_CONTROLLED"].Equals("Y") ? "TRUE" : "FALSE";
                                                dsItemDetails.Tables[0].Rows[rowIndex]["SERIAL"] = drLotSerial[0]["SERIAL_CONTROLLED"].Equals("Y") ? "TRUE" : "FALSE";
                                                dsItemDetails.Tables[0].Rows[rowIndex]["SERIAL_CONTROLLED"] = "N";
                                                dsItemDetails.Tables[0].Rows[rowIndex]["LOT_CONTROLLED"] = "N";
                                                dsItemDetails.Tables[0].Rows[rowIndex]["LOT_SERIAL_DISABLE"] = "N";
                                                dsItemDetails.Tables[0].Rows[rowIndex]["ISSUE_UOM"] = drLotSerial[0]["ISSUE_UOM"].ToString();
                                                if (Convert.ToInt32(drLotSerial[0]["CONVERSION_FACTOR"]) > 0)
                                                {
                                                    dsItemDetails.Tables[0].Rows[rowIndex]["CONVERSION_FACTOR"] = drLotSerial[0]["CONVERSION_FACTOR"].ToString();
                                                }
                                                else
                                                {
                                                    dsItemDetails.Tables[0].Rows[rowIndex]["CONVERSION_FACTOR"] = string.Empty;
                                                }
                                                dsItemDetails.Tables[0].Rows[rowIndex]["PAR_UOM"] =
                                                    drLotSerial[0]["PAR_UOM"].ToString();

                                                if (!string.IsNullOrEmpty(drLotSerial[0]["CONV_RATE_PAR_TO_ISSUE_CF"]
                                                        .ToString()) &&
                                                    Convert.ToInt32(drLotSerial[0]["CONV_RATE_PAR_TO_ISSUE_CF"]
                                                        .ToString()) > 0)
                                                {
                                                    dsItemDetails.Tables[0]
                                                            .Rows[rowIndex]["CONV_RATE_PAR_TO_ISSUE_CF"] =
                                                        drLotSerial[0]["CONV_RATE_PAR_TO_ISSUE_CF"].ToString();
                                                }
                                                else
                                                {
                                                    dsItemDetails.Tables[0].Rows[rowIndex]["CONV_RATE_PAR_TO_ISSUE_CF"] = string.Empty;
                                                }

                                            }
                                            else
                                            {
                                                dsItemDetails.Tables[0].Rows[rowIndex]["LOT"] = "False";
                                                dsItemDetails.Tables[0].Rows[rowIndex]["SERIAL"] = "False";
                                            }
                                        }
                                        else
                                        {
                                            dsItemDetails.Tables[0].Rows[rowIndex]["LOT"] = "False";
                                            dsItemDetails.Tables[0].Rows[rowIndex]["SERIAL"] = "False";
                                        }
                                        if (dsCartInventoryDetails != null)
                                        {
                                            var drDummyLotSerial = dsCartInventoryDetails.Tables[0].Select("ITEM_ID = '" + dsItemDetails.Tables[0].Rows[rowIndex]["ITEM_ID"] + "' AND BUSINESS_UNIT = '" + dsItemDetails.Tables[0].Rows[rowIndex]["BUSINESS_UNIT"] + "' AND CART_ID = '" + dsItemDetails.Tables[0].Rows[rowIndex]["LOCATION"] + "'");

                                            if (drDummyLotSerial.Length > 0)
                                            {
                                                foreach (DataRow _dr in drDummyLotSerial)
                                                {
                                                    if (!string.IsNullOrEmpty(_dr["LOT_NUMBER"].ToString()))
                                                    {
                                                        dsItemDetails.Tables[0].Rows[rowIndex]["LOT_SERIAL_DISABLE"] = "Y";
                                                        dsItemDetails.Tables[0].Rows[rowIndex]["CART_INVENTORY_ITEM"] = "CI";
                                                        //'Exit For
                                                    }
                                                    if (!string.IsNullOrEmpty(_dr["SERIAL_NUMBER"].ToString()))
                                                    {
                                                        dsItemDetails.Tables[0].Rows[rowIndex]["LOT_SERIAL_DISABLE"] = "Y";
                                                        dsItemDetails.Tables[0].Rows[rowIndex]["CART_INVENTORY_ITEM"] = "CI";
                                                        break;
                                                    }
                                                }
                                            }
                                        }

                                        if (dsItemDetails.Tables[0].Rows[rowIndex]["LOT_CONTROLLED"].ToString() == "Y")
                                        {
                                            dsItemDetails.Tables[0].Rows[rowIndex]["LOT"] = "TRUE";
                                        }
                                        if (dsItemDetails.Tables[0].Rows[rowIndex]["SERIAL_CONTROLLED"].ToString() == "Y")
                                        {
                                            dsItemDetails.Tables[0].Rows[rowIndex]["SERIAL"] = "TRUE";
                                        }
                                        if ((dsItemDetails.Tables[0].Rows[rowIndex]["SERIAL_CONTROLLED"]).ToString() == "Y" | (dsItemDetails.Tables[0].Rows[rowIndex]["LOT_CONTROLLED"]).ToString() == "Y")
                                        {
                                            dsItemDetails.Tables[0].Rows[rowIndex]["SERIAL_CONTROLLED"] = "Y";
                                            dsItemDetails.Tables[0].Rows[rowIndex]["LOT_CONTROLLED"] = "Y";
                                            dsItemDetails.Tables[0].Rows[rowIndex]["LOT_SERIAL_DISABLE"] = "Y";
                                        }
                                    }
                                    dsItemDetailsFinal.Merge(dsItemDetails);
                                }
                            }
                        }
                    }
                }

                try
                {
                    if (!string.IsNullOrEmpty(itemID) & dsItemDetailsFinal.Tables.Count > 0)
                    {
                        int iCount = 0;
                        while (iCount < dsItemDetailsFinal.Tables[0].Rows.Count)
                        {
                            if (dsItemDetailsFinal.Tables[0].Rows[iCount]["ITEM_ID"].ToString() == itemID)
                            {
                                iCount += 1;
                            }
                            else
                            {
                                dsItemDetailsFinal.Tables[0].Rows.RemoveAt(iCount);
                            }
                        }
                        dsItemDetailsFinal.AcceptChanges();
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }
                itemAttributesDS = dsItemDetailsFinal.Copy();

                if (itemAttributesDS.Tables.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                if (itemAttributesDS != null && itemAttributesDS.Tables.Count > 0)
                {
                    itemAttributesDS.Tables[0].DefaultView.RowFilter = "DEPT_ID= '" + deptID + "'";
                    dsItmAttrFiltrDs = itemAttributesDS.Tables[0].DefaultView.ToTable();

                    itemAttributesDS.Clear();

                    foreach (DataRow dr in dsItmAttrFiltrDs.Rows)
                    {
                        itemAttributesDS.Tables[0].Rows.Add(dr.ItemArray);
                    }
                }
                

                response.DataList = (from DataRow dr in itemAttributesDS.Tables[0].Rows
                                     select new VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT()
                                     {
                                         INDEX = dr["INDEX"].ToString(),
                                         ITEM_ID = dr["ITEM_ID"].ToString(),
                                         ITEM_DESCRIPTION = dr["ITEM_DESCRIPTION"].ToString(),
                                         PAR_VALUE = dr["PAR_VALUE"].ToString(),
                                         ITEM_TYPE = dr["ITEM_TYPE"].ToString(),
                                         ITEM_PRICE = dr["ITEM_PRICE"].ToString(),
                                         CRITICAL_ITEM = dr["CRITICAL_ITEM"].ToString(),
                                         LOT_CONTROLLED = dr["LOT_CONTROLLED"].ToString(),
                                         SERIAL_CONTROLLED = dr["SERIAL_CONTROLLED"].ToString(),
                                         UOM = dr["UOM"].ToString(),
                                         BUSINESS_UNIT = dr["BUSINESS_UNIT"].ToString(),
                                         LOCATION = dr["LOCATION"].ToString(),
                                         LOCATION_DESCR = dr["LOCATION_DESCR"].ToString(),
                                         DEPT_ID = dr["DEPT_ID"].ToString(),                                      
                                         ASSIGN_CART = dr["ASSIGN_CART"].ToString(),
                                         ACT_ASSIGN_CART = dr["ACT_ASSIGN_CART"].ToString(),
                                         LOCATION_TYPE = dr["LOCATION_TYPE"].ToString(),
                                         LOT = bool.Parse(dr["LOT"].ToString()),
                                         SERIAL = bool.Parse(dr["SERIAL"].ToString()),
                                         ISSUE_UOM = dr["ISSUE_UOM"].ToString(),
                                         CONVERSION_FACTOR = dr["CONVERSION_FACTOR"].ToString(),
                                         PAR_UOM = dr["PAR_UOM"].ToString(),
                                         CONV_RATE_PAR_TO_ISSUE_CF = dr["CONV_RATE_PAR_TO_ISSUE_CF"].ToString(),
                                         LOT_SERIAL_DISABLE = dr["LOT_SERIAL_DISABLE"].ToString(),
                                         CART_INVENTORY_ITEM = dr["CART_INVENTORY_ITEM"].ToString()
                                     }).ToList();

                if (response.DataList != null && response.DataList.Count > 0)
                {

                    var hold = (from x in response.DataList
                                orderby x.LOT descending, x.SERIAL descending
                                select x).ToList();

                    response.DataList = hold;
                    response.AtParSuccess();
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }

        private Tuple<long, DataSet> GetDeptCartAllocationDetails(string businessUnit, string cartID, int display, string locationType, DataSet cartHeadersDS, string[] deviceTokenEntry)
        {
            StringBuilder sbSearch = new StringBuilder();
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var dtRet = new DataTable();
            dtRet.Columns.Add("ASSIGN_CART", Type.GetType("System.String"));
            dtRet.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION_DESCR", Type.GetType("System.String"));
            dtRet.Columns.Add("DEPT_ID", Type.GetType("System.String"));
            dtRet.Columns.Add("ACT_ASSIGN_CART", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION_TYPE", Type.GetType("System.String"));

            var with1 = sbSearch;
            try
            {
                // cartID = cartID.Replace("'", "''");
                DataSet dsCartHeader;
                try
                {
                    var tupleResult = _commonPOUService.GetCart_Headers(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID], deviceTokenEntry, locationType);

                    dsCartHeader = tupleResult.Item2;
                    var statusCode = tupleResult.Item1;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

                with1.Remove(0, sbSearch.Length);

                if (!string.IsNullOrEmpty(businessUnit))
                {
                    with1.Append("[" + dsCartHeader.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ColumnName + "] = '" + businessUnit + "' ");
                }
                if (!string.IsNullOrEmpty(cartID))
                {
                    if (with1.Length > 0)
                    {
                        with1.Append(" AND ");
                    }
                    with1.Append("[" + dsCartHeader.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ColumnName + "] = '" + cartID + "' ");
                }

                var dvCartHeader = dsCartHeader.Tables[0].DefaultView;

                if (sbSearch.Length > 0)
                {
                    dvCartHeader.RowFilter = sbSearch.ToString();
                    sbSearch.Remove(0, sbSearch.Length);
                }

                if (dvCartHeader.ToTable().Rows.Count == 0)
                {
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null);
                }

                DataSet dsAllocatedCarts = new DataSet();

                try
                {

                    List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartAllocations =
                        _repo.GetDeptCartAllocations(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                    DataTable dtAllocatedCarts = lstDeptCartAllocations.ToDataTable();
                    dsAllocatedCarts.Tables.Add(dtAllocatedCarts);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                }

                for (int intCnt = 0; intCnt <= dvCartHeader.ToTable().Rows.Count - 1; intCnt++)
                {
                    var retRow = dtRet.NewRow();

                    var strBu = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ToString();
                    var strLocation = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ToString();
                    var strLocType = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE].ToString();

                    retRow["BUSINESS_UNIT"] = strBu;
                    retRow["LOCATION"] = strLocation;
                    retRow["LOCATION_DESCR"] = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR].ToString();
                    retRow["LOCATION_TYPE"] = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE].ToString();

                    var rows = dsAllocatedCarts.Tables[0].Select("BUSINESS_UNIT = '" + strBu + "' AND CART_ID = '" + strLocation + "' AND LOCATION_TYPE = '" + strLocType + "'");


                    if (rows.Length > 0)
                    {
                        retRow["ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.Y.ToString();
                        retRow["ACT_ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.Y.ToString();
                        retRow["DEPT_ID"] = rows[0]["DEPARTMENT_ID"];

                    }
                    else
                    {
                        retRow["ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.N.ToString();
                        retRow["ACT_ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.N.ToString();
                        retRow["DEPT_ID"] = "";

                    }
                    dtRet.Rows.Add(retRow);
                }

                var dvDisplay = dtRet.DefaultView;


                if (display == (int)AtparStatusCodes.DisplayType.ALLOCATED)
                {
                    dvDisplay.RowFilter = "ASSIGN_CART = '" + AtParWebEnums.YesNo_Enum.Y + "'";
                }
                else if (display == (int)AtparStatusCodes.DisplayType.UNALLOCATED)
                {
                    dvDisplay.RowFilter = "ASSIGN_CART = '" + AtParWebEnums.YesNo_Enum.N + "'";
                }

                dvDisplay.Table.TableName = "CartHeaders";
                dsAllocatedCarts.Tables[0].TableName = "AllocatedCarts";


                cartHeadersDS = new DataSet();
                cartHeadersDS.Tables.Add(dvDisplay.ToTable().Copy());
                cartHeadersDS.Tables.Add(dsAllocatedCarts.Tables["AllocatedCarts"].Copy());

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, cartHeadersDS);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
        }

        private Tuple<long, string> ERPGetLocationDetails(string erpObjName, string sbInputXml, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                //GetConfigData();
                string className = null;
                object reflectObject = null;
                string outXml = string.Empty;

                className = "GetInventoryItems";
                var methodName = "GetInventoryItems";

                var MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { sbInputXml, outXml, deviceTokenEntry };

                var statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ERPGetLocationDetails getting failed from ERP")); }
                    return new Tuple<long, string>(statusCode, string.Empty);
                }
                outXml = args[1].ToString();

                return new Tuple<long, string>(statusCode, outXml);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }

                return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
            }
        }

        //private void GetConfigData()
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
        //        throw ex;
        //    }

        //}

        private Tuple<long, DataSet> GetCartItems(string cartID, string bUnit, string orgGrpID, string[] deviceTokenEntry)
        {

            DataSet detDs = new DataSet();
            DataSet dsItems = new DataSet();
            DataRow retRow;
            bool itmPriceColumnExists = false;
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                var retTbl = new DataTable("CART_ITEMS");
                retTbl.Columns.Add("INDEX", Type.GetType("System.String"));
                retTbl.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                retTbl.Columns.Add("ITEM_DESCRIPTION", Type.GetType("System.String"));
                retTbl.Columns.Add("PAR_VALUE", Type.GetType("System.String"));
                retTbl.Columns.Add("ITEM_TYPE", Type.GetType("System.String"));
                retTbl.Columns.Add("ITEM_PRICE", Type.GetType("System.Double"));
                retTbl.Columns.Add("CRITICAL_ITEM", Type.GetType("System.String"));
                retTbl.Columns.Add("LOT_CONTROLLED", Type.GetType("System.String"));
                retTbl.Columns.Add("SERIAL_CONTROLLED", Type.GetType("System.String"));
                retTbl.Columns.Add("UOM", Type.GetType("System.String"));

                var tupleResult = _commonPOUService.GetCartDetails(cartID, bUnit, detDs, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId]);

                var statusCode = tupleResult.Item1;
                detDs = tupleResult.Item2;

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (statusCode != AtparStatusCodes.E_NORECORDFOUND)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }
                }

                //Checking the columns existence
                for (int colCnt = 0; colCnt <= detDs.Tables[1].Columns.Count - 1; colCnt++)
                {
                    switch (detDs.Tables[1].Columns[colCnt].ColumnName.ToString())
                    {
                        case "ITEM_PRICE":
                            itmPriceColumnExists = true;
                            break;
                    }
                }

                try
                {
                    List<MT_POU_CRITICAL_ITEMS> lstItems = _repo.GetCriticalItems(cartID, bUnit);
                    DataTable dtItems = lstItems.ToDataTable();
                    dsItems.Tables.Add(dtItems);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                }

                if (detDs.Tables.Count > 0)
                {

                    for (int intCnt = 0; intCnt <= detDs.Tables[1].Rows.Count - 1; intCnt++)
                    {
                        retRow = retTbl.NewRow();
                        var itemID =
                            detDs.Tables[1].Rows[intCnt][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];

                        retRow["INDEX"] = intCnt;
                        retRow["ITEM_ID"] = itemID;
                        retRow["ITEM_DESCRIPTION"] =
                            detDs.Tables[1].Rows[intCnt][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR];
                        retRow["PAR_VALUE"] =
                            detDs.Tables[1].Rows[intCnt][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY] +
                            "-" + detDs.Tables[1].Rows[intCnt][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM];
                        retRow["ITEM_TYPE"] =
                            detDs.Tables[1].Rows[intCnt][(int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_CTRL];
                        retRow["LOT_CONTROLLED"] =
                            detDs.Tables[1].Rows[intCnt][(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED];
                        retRow["SERIAL_CONTROLLED"] =
                            detDs.Tables[1].Rows[intCnt][(int)
                                AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED];
                        retRow["UOM"] = detDs.Tables[1].Rows[intCnt][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM];

                        if (itmPriceColumnExists)
                        {
                            retRow["ITEM_PRICE"] =
                                detDs.Tables[1].Rows[intCnt][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE];
                        }
                        else
                        {
                            retRow["ITEM_PRICE"] = "0";
                        }


                        var selRows = dsItems.Tables[0].Select("ITEM_ID = '" + itemID + "'");

                        if (selRows.Length > 0)
                        {
                            retRow["CRITICAL_ITEM"] = AtParWebEnums.YesNo_Enum.Y.ToString();
                        }
                        else
                        {
                            retRow["CRITICAL_ITEM"] = AtParWebEnums.YesNo_Enum.N.ToString();
                        }

                        retTbl.Rows.Add(retRow);
                    }
                }

                if (retTbl.Rows.Count == 0)
                {
                    //return new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null);
                }

                var itemsDs = new DataSet();
                itemsDs.Tables.Add(retTbl);

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, itemsDs);

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
        }

        public string ElementValueOrNull(XElement element)
        {
            if (element != null)
            {

                return element.Value;
            }

            return "";
        }

        public Dictionary<string, string> GetCaptionsForDataSet(XElement xmlData, string groupType)
        {

            XNamespace xs = "http://www.w3.org/2001/XMLSchema";
            XNamespace msData = "urn:schemas-microsoft-com:xml-msdata";

            //Create Dictionary with Names and codes
            Dictionary<string, string> dictNameCaption = (from item in xmlData.Descendants(xs + "element")
                                                          where item.Attributes("name").FirstOrDefault().Value == groupType
                                                          select (
                                                                  from detail in item.Descendants(xs + "element")
                                                                  select detail.Attributes(msData + "Caption").FirstOrDefault().Value + "," +
                                                                  detail.Attributes("name").FirstOrDefault().Value
                                                                 )
                                                         ).SelectMany(x => x).ToDictionary(x => x.Split(',')[0], y => y.Split(',')[1]);

            return dictNameCaption;
        }
        #endregion
    }
}

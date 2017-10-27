using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using AtParEncryptionServices;
//using AtPar.Service.Interfaces.CartCount;

namespace AtPar.POU.Service
{
    public class CreateOrdersService : ICreateOrdersService
    {
        #region Private Variable

        ICreateOrdersRepository _createOrderRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;
        AtPar.Service.Interfaces.CartCount.IGetDetailsService _getDetailsService;
        #endregion

        #region Constructor
        public CreateOrdersService(ICreateOrdersRepository repository, ILog log, ICommonRepository commonRepository, ICommonService commonService, AtPar.Service.Interfaces.CartCount.IGetDetailsService getDetailsService)
        {
            _createOrderRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _getDetailsService = getDetailsService;
            _log.SetLoggerType(typeof(CreateOrdersService));

        }

        #endregion

        #region Public Methods

        #region GetBUnits_Carts
        public AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, string locationType = "", string cartType = "", params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS>();

            try
            {

                response.DataList = _createOrderRepo.GetBUnits_Carts(userID, appID, deviceTokenEntry, locationType, cartType);


                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }

            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion

        #region GetCartItemCounts
        public AtParWebApiResponse<VM_POU_CART_DETAILS> GetCartItemCounts(string bUnit, string cartID, string userID, string itemID, string orgGrpID, int appID, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_CART_DETAILS>();
            List<VM_POU_CART_DETAILS> lstCartDetails = null;
            string strRoundingOpt = string.Empty;
            string strLocationType = string.Empty;


            try
            {
                //null handling
                itemID = itemID.ReplaceNullwithEmpty();

                itemID = itemID.substituteString();

                SortedList<string, string> orgParams = new SortedList<string, string>();

                orgParams[AtParWebEnums.AppParameters_Enum.QTY_ROUND_TYPE.ToString()] = string.Empty;

                _commonRepo.GetOrgGroupParamValues(orgParams, appID, orgGrpID);

                strRoundingOpt = orgParams[AtParWebEnums.AppParameters_Enum.QTY_ROUND_TYPE.ToString()];

                strLocationType = _commonRepo.GetLocationType(bUnit, cartID);

                DataSet detDs = new DataSet();
                StringBuilder sb = new StringBuilder();

                var tupleResult = _GetCartDetails(cartID, bUnit, detDs, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], deviceTokenEntry, "", strLocationType, sb, "");

                response.StatusCode = tupleResult.Item1;
                detDs = tupleResult.Item2;

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (response.StatusCode != AtparStatusCodes.E_NORECORDFOUND)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }
                }

                List<VM_POU_CART_ITEM_SUBSTITUTE> lstItemSubstitute = _createOrderRepo.GetItemQOH(bUnit, cartID, itemID);

                //if (lstItemSubstitute.Count == 0)
                //{
                //    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                //    return response;
                //}


                DataTable dtCartItems = new DataTable();
                dtCartItems.Columns.Add("SEQNO", Type.GetType("System.Double"));
                dtCartItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                dtCartItems.Columns.Add("COMPARTMENT_ID", Type.GetType("System.String"));
                dtCartItems.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
                dtCartItems.Columns.Add("ITEM_PRICE", Type.GetType("System.Double"));
                dtCartItems.Columns.Add("ITEM_TYPE", Type.GetType("System.String"));
                dtCartItems.Columns.Add("PAR_VALUE", Type.GetType("System.Double"));
                dtCartItems.Columns.Add("UOM", Type.GetType("System.String"));
                dtCartItems.Columns.Add("ORDER_TYPE", Type.GetType("System.String"));
                dtCartItems.Columns.Add("ORDER_QTY", Type.GetType("System.Double"));
                dtCartItems.Columns.Add("QOH", Type.GetType("System.Double"));
                dtCartItems.Columns.Add("INVENTORY_ITEM", Type.GetType("System.String"));
                dtCartItems.Columns.Add("FOQ", Type.GetType("System.Double"));
                dtCartItems.Columns.Add("MAX_QTY", Type.GetType("System.Double"));
                dtCartItems.Columns.Add("CUST_ITEM_NO", Type.GetType("System.String"));
                dtCartItems.Columns.Add("VENDOR_ID", Type.GetType("System.String"));
                dtCartItems.Columns.Add("SUBSTITUTE_ITEM_FLG", Type.GetType("System.String"));

                DataRow[] drErpItems = null;
                string strSearch = string.Empty;
                double dblReqQty = 0;
                double dblQOH = 0;
                double dblSubItemsQOH = 0;
                string strCompartment = string.Empty;

                if (string.IsNullOrEmpty(itemID))
                {
                    drErpItems = new DataRow[detDs.Tables[1].Rows.Count];
                    //drErpItems[detDs.Tables[1].Rows.Count - 1];
                    //Array.Resize(ref drErpItems, 0);
                    detDs.Tables[1].Rows.CopyTo(drErpItems, 0);
                }
                else
                {
                    strSearch = "[" + (int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID + "] = '" + itemID + "' ";

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " Search string to filter ERP data : " + strSearch + System.Environment.NewLine);

                    drErpItems = detDs.Tables[1].Select(strSearch);
                }

                DataRow drItem = null;
                bool blnConvFactExists = false;
                bool blnProcUOM = false;
                double dblConvFact = 0;

                foreach (DataRow dr in drErpItems)
                {
                    strSearch = String.Empty;
                    dblReqQty = 0;
                    dblQOH = 0;
                    dblSubItemsQOH = 0;
                    strCompartment = String.Empty;
                    drItem = dtCartItems.NewRow();
                    drItem["ITEM_ID"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString();
                    drItem["COMPARTMENT_ID"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ToString();
                    drItem["DESCRIPTION"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();
                    strCompartment = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ToString().substituteString().Replace("'","");

                    if (dr.Table.Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE).ToString()))
                    {
                        if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString()))
                        {
                            drItem["ITEM_PRICE"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString();
                        }
                        else
                        {
                            drItem["ITEM_PRICE"] = 0;
                        }
                    }
                    else
                    {
                        drItem["ITEM_PRICE"] = 0;
                    }

                    switch (dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_OPT].ToString())
                    {
                        case "1":
                        case "01":
                            drItem["ITEM_TYPE"] = "Stock";
                            break;
                        case "2":
                        case "02":
                            drItem["ITEM_TYPE"] = "Non Stock";
                            break;
                        case "3":
                        case "03":
                            drItem["ITEM_TYPE"] = "Stockless";
                            break;
                        case "4":
                        case "04":
                            drItem["ITEM_TYPE"] = "Consignment";
                            break;
                        case "5":
                        case "05":
                            drItem["ITEM_TYPE"] = "Not Replenished";
                            break;
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " Search string to filter ERP data : " + dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ToString() + System.Environment.NewLine);

                    drItem["PAR_VALUE"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ToString() == string.Empty ? "0" : Convert.ToDouble(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY]).ToString();

                    drItem["UOM"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString();

                    if (dr.Table.Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR).ToString()))
                    {
                        blnConvFactExists = true;
                    }

                    if (dr.Table.Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC).ToString()))
                    {
                        blnProcUOM = true;
                    }


                    if (blnConvFactExists)
                    {

                        if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR].ToString()))
                        {
                            dblConvFact = Convert.ToDouble(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR]);


                            if (dblConvFact > 1)
                            {
                                if (blnProcUOM)
                                {
                                    if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC].ToString()))
                                    {
                                        drItem["UOM"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC].ToString();
                                    }
                                }
                            }
                            else
                            {
                                dblConvFact = 1;
                            }
                        }
                        else
                        {
                            dblConvFact = 1;
                        }
                    }
                    else
                    {
                        dblConvFact = 1;
                    }

                    strSearch = "ITEM_ID = '" + dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString() + "' AND COMPARTMENT = '" + strCompartment + "' ";

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " Search string to filter QOH for the item : " + strSearch + System.Environment.NewLine);

                    if (appID == (int)AtParWebEnums.EnumApps.Pharmacy)
                    {
                        // Logic for fectching the Substitute Items Quanitity

                        dblSubItemsQOH = _createOrderRepo.GettingSubItemsQOH(bUnit, cartID, dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString(), strCompartment);

                    }

                    DataRow[] drItemQOH = null;


                    DataSet dsItemQOH = new DataSet();
                    DataTable dtitemAtt = lstItemSubstitute.ToDataTable();//Utils.ToDataTable(lstItemSubstitute);
                    dsItemQOH.Tables.Add(dtitemAtt);

                    drItemQOH = dsItemQOH.Tables[0].Select(strSearch);

                    if (drItemQOH.Length > 0)
                    {
                        dblQOH = Convert.ToDouble(drItemQOH[0]["QOH"]);
                    }
                    if (dblSubItemsQOH != null)
                    {
                        dblQOH = dblQOH + dblSubItemsQOH;
                    }

                    switch (dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_CTRL].ToString())
                    {
                        case "01":
                            drItem["ORDER_TYPE"] = "Par";
                            dblReqQty = Convert.ToDouble(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY]) - dblQOH;
                            break;
                        case "02":
                            drItem["ORDER_TYPE"] = "FOQ";
                            dblReqQty = Convert.ToDouble(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.FOQ]);
                            break;
                        case "03":
                            drItem["ORDER_TYPE"] = "Min/Max";
                            dblReqQty = Convert.ToDouble(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.MAX_QTY]) - dblQOH;
                            break;
                        case "04":
                            drItem["ORDER_TYPE"] = "Issue";
                            dblReqQty = 0;
                            break;
                        default:
                            drItem["ORDER_TYPE"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_CTRL].ToString();
                            dblReqQty = 0;
                            break;
                    }

                    //Qty Opt 02 indicates request type cart
                    if (detDs.Tables[0].Rows[0][(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.QTY_OPTION].ToString() == "02")
                    {
                        dblReqQty = 0;
                    }

                    if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ToString()))
                    {
                        if (dblQOH > Convert.ToDouble(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY]))
                        {
                            dblReqQty = 0;
                        }
                    }
                    else
                    {
                        dblReqQty = 0;
                    }

                    if (strRoundingOpt == AtParWebEnums.QTY_ROUND_TYPE.Ceil.ToString())
                    {
                        drItem["ORDER_QTY"] = Math.Ceiling(dblReqQty / dblConvFact);
                    }
                    else if (strRoundingOpt == AtParWebEnums.QTY_ROUND_TYPE.Floor.ToString())
                    {
                        drItem["ORDER_QTY"] = Math.Floor(dblReqQty / dblConvFact);
                    }

                    drItem["QOH"] = dblQOH;
                    drItem["INVENTORY_ITEM"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM].ToString();

                    if (dr.Table.Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.FOQ).ToString()))
                    {
                        if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.FOQ].ToString()))
                        {
                            drItem["FOQ"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.FOQ].ToString();
                        }
                    }

                    if (dr.Table.Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.FOQ).ToString()))
                    {
                        if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.MAX_QTY].ToString()))
                        {
                            drItem["MAX_QTY"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.MAX_QTY].ToString();
                        }
                    }

                    drItem["CUST_ITEM_NO"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ToString();

                    if (dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_OPT].ToString() == "01")
                    {
                        drItem["VENDOR_ID"] = bUnit;

                    }
                    else
                    {
                        drItem["VENDOR_ID"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ID].ToString();
                    }

                    if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.SUBSTITUTE_ITEM_FLG].ToString()))
                    {
                        drItem["SUBSTITUTE_ITEM_FLG"] = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.SUBSTITUTE_ITEM_FLG].ToString();
                    }

                    dtCartItems.Rows.Add(drItem);

                }

                DataSet dsCartItems = new DataSet();
                dsCartItems.Tables.Add(dtCartItems);

                //converting DataSet to List
                lstCartDetails = (from rw in dsCartItems.Tables[0].AsEnumerable()
                                  select new VM_POU_CART_DETAILS()
                                  {
                                      SEQNO = rw["SEQNO"] == DBNull.Value ? 0 : Convert.ToDouble(rw["SEQNO"]),
                                      INV_ITEM_ID = rw["ITEM_ID"] == null ? string.Empty : rw["ITEM_ID"].ToString(),
                                      COMPARTMENT = rw["COMPARTMENT_ID"] == null ? string.Empty : rw["COMPARTMENT_ID"].ToString(),
                                      ITEM_DESCR = rw["DESCRIPTION"] == null ? string.Empty : rw["DESCRIPTION"].ToString(),
                                      ITEM_PRICE = rw["ITEM_PRICE"] == DBNull.Value ? 0 : Convert.ToDouble(rw["ITEM_PRICE"]),
                                      ITEM_TYPE = rw["ITEM_TYPE"] == null ? string.Empty : rw["ITEM_TYPE"].ToString(),
                                      PAR_VALUE = rw["PAR_VALUE"] == DBNull.Value ? 0 : Convert.ToDouble(rw["PAR_VALUE"]),
                                      UOM = rw["UOM"] == null ? string.Empty : rw["UOM"].ToString(),
                                      ORDER_TYPE = rw["ORDER_TYPE"] == null ? string.Empty : rw["ORDER_TYPE"].ToString(),
                                      ORDER_QTY = rw["ORDER_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(rw["ORDER_QTY"]),
                                      QOH = rw["QOH"] == DBNull.Value ? 0 : Convert.ToDouble(rw["QOH"]),
                                      INVENTORY_ITEM = rw["INVENTORY_ITEM"] == null ? string.Empty : rw["INVENTORY_ITEM"].ToString(),
                                      FOQ = rw["FOQ"] == DBNull.Value ? 0 : Convert.ToDouble(rw["FOQ"]),
                                      MAX_QTY = rw["MAX_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(rw["MAX_QTY"]),
                                      CUST_ITEM_NO = rw["CUST_ITEM_NO"] == null ? string.Empty : rw["CUST_ITEM_NO"].ToString(),
                                      VENDOR_ID = rw["VENDOR_ID"] == null ? string.Empty : rw["VENDOR_ID"].ToString(),
                                      SUBSTITUTE_ITEM_FLG = rw["SUBSTITUTE_ITEM_FLG"] == null ? string.Empty : rw["SUBSTITUTE_ITEM_FLG"].ToString(),
                                      
                                  }).ToList();

                response.DataList = lstCartDetails;

                if (response.DataList.Count == 0)
                {
                    response.DataList = lstCartDetails;
                    response.AtParSuccess();
                    //response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }


                response.AtParSuccess();
                return response;
            }

            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        private Tuple<long, DataSet> _GetCartDetails(string cartID, string bUnit, DataSet cartDetailsDS, string orgGrpID, string systemID, string[] deviceTokenEntry, string profileID, string locationType, StringBuilder syncData = null, string syncFlag = "", int appID = 15, string deptID = "")
        {

            try
            {

                string itemDescrType = null;
                string defaultMfgItemID = null;
                string itemPriceType = null;
                DataSet inputParameters = new DataSet();
                //cartDetailsDS = new DataSet();
                string erpObjName = null;

                long statusCode = 0;
                char cartManagedAtpar = '\0';

                string ndcType = string.Empty;
                string upnType = string.Empty;


                SortedList<string, string> orgParams = new SortedList<string, string>();
                SortedList<string, string> userParams = new SortedList<string, string>();
                SortedList<string, string> profParams = new SortedList<string, string>();


                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.SYNC_MULTIPLE_LOC_INFO.ToString()] = string.Empty;

                _commonRepo.GetOrgGroupParamValues(orgParams, appID, orgGrpID);



                itemDescrType = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                defaultMfgItemID = orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                itemPriceType = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];

                if (orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()].ToString() != string.Empty)
                {
                    cartManagedAtpar = Convert.ToChar(orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()]);
                }

                userParams[AtParWebEnums.AppParameters_Enum.DEFAULT_COMPANY.ToString()] = string.Empty;



                //Not getting profile parameter values when there is no ProfileID
                if (profileID != "" & profileID != string.Empty)
                {
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()] = string.Empty;
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()] = string.Empty;

                    _commonRepo.GetProfileParamValues(profParams, appID, profileID);

                    upnType = profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                    ndcType = profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];


                }

                if (string.IsNullOrEmpty(locationType))
                {
                    locationType = _commonRepo.GetLocationType(bUnit, cartID);
                }


                var dtHdrData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Detail_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                var dtPreReq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_PreReqData_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                var dtListView = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_Detail_ListView_RequiredParams, AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString());


                var dtOutPutHdr = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_DetailOutput_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                var dtOutPutDtl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_DetailOutput_Details_Defns, AtParWebEnums.DataSet_Type.DETAILS.ToString());

                cartDetailsDS.Tables.Add(dtOutPutHdr);
                cartDetailsDS.Tables.Add(dtOutPutDtl);

                if (locationType == AtParWebEnums.LocationType.I.ToString())
                {
                    var dtOutPutLotSerial = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_DetailOutput_LotSerial_Defns, AtParWebEnums.DataSet_Type.LOTSERIAL_INFO.ToString());
                    cartDetailsDS.Tables.Add(dtOutPutLotSerial);
                }

                var drHdr = dtHdrData.NewRow();

                drHdr[(int)AtParWebEnums.Get_Detail_Defns_Enum.USER_ID] = string.Empty;
                drHdr[(int)AtParWebEnums.Get_Detail_Defns_Enum.BUSINESS_UNIT] = bUnit;
                drHdr[(int)AtParWebEnums.Get_Detail_Defns_Enum.CART_ID] = cartID;
                dtHdrData.Rows.Add(drHdr);

                var drPreReq = dtPreReq.NewRow();

                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_PRICE] = itemPriceType;
                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_DESCR] = itemDescrType;
                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.DEFAULT_MFG_ITEM_ID] = defaultMfgItemID;
                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_UPN_TYPE_CODE] = upnType;
                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_NDC_TYPE_CODE] = ndcType;



                List<string> lstParameters = new List<string>
                    {
                        AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString(),
                        AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString()
                    };

                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var remoteSchema = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;

                var remoteDbType = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDbType;

                dtPreReq.Rows.Add(drPreReq);


                var drListView = dtListView.NewRow();
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_CTRL] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_OPT] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COMPARTMENT] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CONS_NON_STOCK] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_QTY] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_REQUIRED] = false;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CUST_ITEM_NO] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.DESCR] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.FOQ] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.GTIN] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.INVENTORY_ITEM] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_COUNT_ORDER] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_ID] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.MAXIMUM_QTY] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.OPTIMAL_QTY] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PRICE] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PRINT_LATER_FLAG] = false;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.UOM] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.UPC_ID] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.VNDR_ITEM_ID] = true;

                dtListView.Rows.Add(drListView);

                inputParameters.Tables.Add(dtHdrData);
                inputParameters.Tables.Add(dtPreReq);
                inputParameters.Tables.Add(dtListView);


                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DateTime] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] = orgGrpID;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.AccessToken] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.LdapUser] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType] = AtParWebEnums.ClientType.WEB.ToString();
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId] = systemID;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeptID] = deptID;

                if (locationType == AtParWebEnums.LocationType.P.ToString())
                {

                    lstParameters =
                          new List<string> { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };

                    var lstConfigSectionDtls1 = _commonRepo.GetConfigData(lstParameters).ToList();

                    erpObjName = AtParWebEnums.EnumApps.CartCount + "_" + lstConfigSectionDtls1.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    var tupleCartDetails = _getDetailsService.GetCartDetails(erpObjName, inputParameters, cartDetailsDS, deviceTokenEntry);
                    cartDetailsDS = tupleCartDetails.Item2;

                    if (cartDetailsDS != null)
                    {
                        var resultTuple = UpdateLotSerFlags(bUnit, cartID, cartDetailsDS, AtParWebEnums.YesNo_Enum.Y.ToString());

                        cartDetailsDS = resultTuple.Item2;
                        statusCode = resultTuple.Item1;


                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            return new Tuple<long, DataSet>(statusCode, null);
                        }
                    }

                }
                else if (locationType == AtParWebEnums.LocationType.A.ToString())
                {

                    erpObjName = AtParWebEnums.Erp_Obj_Name.CartCount_Atpar.ToString();

                    var tupleCartDetails = _getDetailsService.GetCartDetails(erpObjName, inputParameters, cartDetailsDS, deviceTokenEntry);
                    cartDetailsDS = tupleCartDetails.Item2;

                    var resultTuple = UpdateLotSerFlags(bUnit, cartID, cartDetailsDS, AtParWebEnums.YesNo_Enum.Y.ToString());

                    cartDetailsDS = resultTuple.Item2;
                    statusCode = resultTuple.Item1;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }


                }
                else if (locationType == AtParWebEnums.LocationType.I.ToString())
                {
                    var resultTuple = GetLocationDetails(bUnit, cartID, orgParams, profParams, cartDetailsDS, deviceTokenEntry, syncData, syncFlag);
                    statusCode = resultTuple.Item1;
                    cartDetailsDS = resultTuple.Item2;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }

                    var result = UpdateLotSerFlags(bUnit, cartID, cartDetailsDS, AtParWebEnums.YesNo_Enum.Y.ToString());
                    cartDetailsDS = result.Item2;
                    statusCode = result.Item1;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }

                }
                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, cartDetailsDS);
            }
            catch (Exception ex)
            {
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
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
        private Tuple<long, DataSet> UpdateLotSerFlags(string bUnit, string cartID, DataSet locDetails, string cartItemFlag)
        {
            try
            {


                List<MT_ATPAR_ITEM_ATTRIBUTES> lstItemAttributes = _createOrderRepo.GetItemAttributes(bUnit, cartID);

                //List to DataSet Conversion

                DataSet dsitemAtt = new DataSet();
                DataTable dtitemAtt = lstItemAttributes.ToDataTable();//Utils.ToDataTable(lstItemAttributes);

                dsitemAtt.Tables.Add(dtitemAtt);


                foreach (DataRow AttItems in dsitemAtt.Tables[0].Rows)
                {
                    if (locDetails != null && locDetails.Tables.Count > 0)
                    {
                        if (cartItemFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                        {
                            dynamic UpdateLotSerFlagItems = from look in locDetails.Tables[1].AsEnumerable()
                                                            where look.Field<string>((int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID) ==
                                                            AttItems["ITEM_ID"].ToString()
                                                            select look;

                            foreach (var item in UpdateLotSerFlagItems)
                            {
                                item[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED] =
                                    AttItems["LOT_CONTROLLED"].ToString();
                                item[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED] =
                                    AttItems["SERIAL_CONTROLLED"].ToString();

                            }
                        }
                        else
                        {
                            dynamic UpdateLotSerFlagItems = (from look in locDetails.Tables[0].AsEnumerable()
                                                             where look.Field<string>("ITEM_ID") == AttItems["ITEM_ID"].ToString()
                                                             select look);
                            foreach (var item in UpdateLotSerFlagItems)
                            {

                                item["LOT_CONTROLLED"] = AttItems["LOT_CONTROLLED"].ToString();
                                item["SERIALIZED"] = AttItems["SERIAL_CONTROLLED"].ToString();
                            }
                        }
                    }
                }
                locDetails.AcceptChanges();
                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, locDetails);
            }
            catch (Exception ex)
            {
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, locDetails);
            }
        }
        private Tuple<long, DataSet> GetLocationDetails(string bunit, string cartID, SortedList<string, string> orgParm, SortedList<string, string> profileParam, DataSet dsLocDetails, string[] deviceTokenEntry, StringBuilder syncData = null, string syncFlag = "")
        {
            StringBuilder sbInputXml = new StringBuilder();
            string outXml = string.Empty;

            XmlDocument xmlDoc = new XmlDocument();
            long statusCode = -1;
            string parLocStatus = string.Empty;
            dynamic info2 = string.Empty;
            dynamic info3 = string.Empty;
            dynamic packingString = string.Empty;

            string itemPriceType = string.Empty;
            string itemDescrType = string.Empty;
            string defaultMfgItemID = string.Empty;
            string syncFrmMultiLoc = string.Empty;
            try
            {

                itemPriceType = orgParm[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];
                itemDescrType = orgParm[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                defaultMfgItemID = orgParm[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                syncFrmMultiLoc = orgParm[AtParWebEnums.AppParameters_Enum.SYNC_MULTIPLE_LOC_INFO.ToString()];

                var upnType = profileParam[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                var ndcType = profileParam[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];
                var deptID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeptID] = null ?? string.Empty;
                //deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeptID];

                string storageArea = string.Empty;

                if (!string.IsNullOrEmpty(deptID))
                {
                    storageArea = _createOrderRepo.GetStorageArea(deptID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                    }
                }
                else
                {
                    storageArea = string.Empty;
                }

                sbInputXml.Append("<ROOT><BUNIT><RECORD>");
                sbInputXml.Append(cartID);
                sbInputXml.Append("</RECORD>");
                sbInputXml.Append("<BUNIT_COUNT_FLAG>");
                sbInputXml.Append(cartID);
                sbInputXml.Append(",");
                sbInputXml.Append("0");
                sbInputXml.Append("</BUNIT_COUNT_FLAG>");
                sbInputXml.Append("</BUNIT><ITEM_PRICE_TYPE>");
                sbInputXml.Append(itemPriceType);
                sbInputXml.Append("</ITEM_PRICE_TYPE><USER_ID>");
                sbInputXml.Append(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID]);
                sbInputXml.Append("</USER_ID>");
                sbInputXml.Append("<MFG_ITEM_REQD>");
                sbInputXml.Append("True");
                sbInputXml.Append("</MFG_ITEM_REQD>");
                sbInputXml.Append("<VENDOR_ITEM_REQD>");
                sbInputXml.Append("True");
                sbInputXml.Append("</VENDOR_ITEM_REQD>");
                sbInputXml.Append("<PRICE_REQD>");
                sbInputXml.Append("True");
                sbInputXml.Append("</PRICE_REQD>");
                sbInputXml.Append("<ITEM_DESCR>");
                sbInputXml.Append(itemDescrType);
                sbInputXml.Append("</ITEM_DESCR>");
                sbInputXml.Append("<DEFAULT_MFG_ITEM_ID>");
                sbInputXml.Append(defaultMfgItemID);
                sbInputXml.Append("</DEFAULT_MFG_ITEM_ID>");
                sbInputXml.Append("<ITEM_UPN_TYPE_CODE>");
                sbInputXml.Append(upnType);
                sbInputXml.Append("</ITEM_UPN_TYPE_CODE>");
                sbInputXml.Append("<ITEM_NDC_TYPE_CODE>");
                sbInputXml.Append(ndcType);
                sbInputXml.Append("</ITEM_NDC_TYPE_CODE>");
                sbInputXml.Append("<BIN_TO_BIN_ACCESS>");
                sbInputXml.Append("False");
                sbInputXml.Append("</BIN_TO_BIN_ACCESS>");
                sbInputXml.Append("<ALLOW_NEGATIVE_INVENTORY>");
                sbInputXml.Append("N");
                sbInputXml.Append("</ALLOW_NEGATIVE_INVENTORY>");
                sbInputXml.Append("<SYNC_MULTIPLE_LOC_INFO>");
                sbInputXml.Append(syncFrmMultiLoc);
                sbInputXml.Append("</SYNC_MULTIPLE_LOC_INFO>");
                sbInputXml.Append("<DEFAULT_COMPANY>");
                sbInputXml.Append(bunit);
                sbInputXml.Append("</DEFAULT_COMPANY>");
                sbInputXml.Append("<STORAGE_AREA>");
                sbInputXml.Append(storageArea);
                sbInputXml.Append("</STORAGE_AREA>");
                sbInputXml.Append("</ROOT>");

                List<string> lstParameters = new List<string> { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };

                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var erpObjName = AtParWebEnums.EnumApps.StockIssue + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                var erpResult = ERPGetLocationDetails(erpObjName, sbInputXml.ToString(), outXml, deviceTokenEntry);


                if (erpResult.Item2 != null)
                {
                    xmlDoc.LoadXml(erpResult.Item2);
                }

                if (!string.IsNullOrEmpty(syncFlag) && syncFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    syncData.Append(outXml);
                }
                else
                {
                    var nodeList = xmlDoc.SelectNodes("ROOT/ITEM");

                    var drLocHeaderRow = dsLocDetails.Tables[(int)AtParWebEnums.DataSet_Type.HEADERS].NewRow();

                    drLocHeaderRow[(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.BUSINESS_UNIT] = bunit;
                    drLocHeaderRow[(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.CART_ID] = cartID;

                    dsLocDetails.Tables[(int)AtParWebEnums.DataSet_Type.HEADERS].Rows.Add(drLocHeaderRow);

                    string itemID;

                    if (nodeList != null)

                        foreach (XmlNode node in nodeList)
                        {
                            itemID = string.Empty;
                            var descr = string.Empty;
                            double price = 0;
                            var serFlg = string.Empty;
                            var lotFlg = string.Empty;
                            var mfgItemId = string.Empty;
                            var srVndItemId = string.Empty;
                            var upcID = string.Empty;
                            var gtin = string.Empty;
                            var custItemId = string.Empty;
                            var chargeCode = string.Empty;
                            var implantFlag = string.Empty;
                            var itemMaster = string.Empty;
                            var billonlyItms = string.Empty;
                            var nonCartItms = string.Empty;
                            var itemType = 0;
                            dynamic itemMasterStatus = string.Empty;
                            dynamic itemBuStatus = string.Empty;

                            if ((node.SelectSingleNode("B") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("B");
                                if (selectSingleNode != null)
                                    itemID = selectSingleNode.InnerText;
                            }
                            if ((node.SelectSingleNode("J") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("J");
                                if (selectSingleNode != null)
                                    descr = selectSingleNode.InnerText;
                            }

                            price = 0;
                            if ((node.SelectSingleNode("K") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("K");
                                var singleNode = node.SelectSingleNode("K");
                                if (singleNode != null)
                                    price = (selectSingleNode != null &&
                                             string.IsNullOrEmpty(selectSingleNode.InnerText)
                                        ? 0
                                        : Convert.ToInt32(singleNode.InnerText));
                            }

                            if ((node.SelectSingleNode("IT") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("IT");
                                if (selectSingleNode != null)
                                    itemType = Convert.ToInt32(selectSingleNode.InnerText);
                            }

                            if ((node.SelectSingleNode("H") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("H");
                                if (selectSingleNode != null)
                                    serFlg = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("I") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("I");
                                if (selectSingleNode != null)
                                    lotFlg = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("C") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("C");
                                if (selectSingleNode != null)
                                    mfgItemId = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("G") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("G");
                                if (selectSingleNode != null)
                                    custItemId = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("E") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("E");
                                if (selectSingleNode != null)
                                    srVndItemId = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("F") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("F");
                                if (selectSingleNode != null)
                                    upcID = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("D") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("D");
                                if (selectSingleNode != null) gtin = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("AX") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("AX");
                                if (selectSingleNode != null)
                                    chargeCode = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("AY") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("AY");
                                if (selectSingleNode != null)
                                    parLocStatus = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("AZ") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("AZ");
                                if (selectSingleNode != null)
                                    itemMaster = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("BA") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("BA");
                                if (selectSingleNode != null)
                                    nonCartItms = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("BB") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("BB");
                                if (selectSingleNode != null)
                                    billonlyItms = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("BC") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("BC");
                                if (selectSingleNode != null)
                                    implantFlag = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("P") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("P");
                                if (selectSingleNode != null)
                                    itemMasterStatus = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("Q") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("Q");
                                if (selectSingleNode != null)
                                    itemBuStatus = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("M") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("M");
                                if (selectSingleNode != null)
                                    info2 = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("N") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("N");
                                if (selectSingleNode != null)
                                    info3 = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("O") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("O");
                                if (selectSingleNode != null)
                                    packingString = selectSingleNode.InnerText;
                            }


                            var drLocDetail = dsLocDetails.Tables[(int)AtParWebEnums.DataSet_Type.DETAILS].NewRow();

                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] = itemID;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT] = string.Empty;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR] = descr;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE] = price;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM] = string.Empty;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED] = lotFlg;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED] = serFlg;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID] = mfgItemId;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ITEM_ID] = srVndItemId;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.UPN_ID] = upcID;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY] = 0;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_NDC] = gtin;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID] = custItemId;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_TYPE] = itemType;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.CHARGE_CODE] = chargeCode;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.IMPLANT_FLAG] = implantFlag;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_LOC_STATUS] = parLocStatus;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_ITEM_STATUS] =
                                itemMaster;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.BILL_ITEM_STATUS] = billonlyItms;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.NON_CART_ITEM_STATUS] =
                                nonCartItms;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_STATUS] =
                                itemMasterStatus;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_BU_STATUS] = itemBuStatus;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.INFO_2] = info2;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.INFO_3] = info3;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.PACKAGING_STRING] = packingString;

                            dsLocDetails.Tables[(int)AtParWebEnums.DataSet_Type.DETAILS].Rows.Add(drLocDetail);
                        }

                    var stkNodeList = xmlDoc.SelectNodes("ROOT/STOCK");

                    if (stkNodeList != null)
                        foreach (XmlNode stkNode in stkNodeList)
                        {
                            itemID = string.Empty;
                            var strLoc = string.Empty;
                            var area = string.Empty;
                            var level1 = string.Empty;
                            var level2 = string.Empty;
                            var level3 = string.Empty;
                            var level4 = string.Empty;
                            var serNo = string.Empty;
                            var lotNo = string.Empty;
                            var sysQty = string.Empty;
                            dynamic stdPackUom = string.Empty;
                            dynamic stdUom = string.Empty;

                            if (stkNode.SelectSingleNode("B") != null)
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("B");
                                if (selectSingleNode != null)
                                    itemID = selectSingleNode.InnerText;//ITEM_ID

                            }
                            if ((stkNode.SelectSingleNode("V") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("V");
                                if (selectSingleNode != null)
                                    strLoc = selectSingleNode.InnerText; //STORAGE_LOCATION
                            }
                            if ((stkNode.SelectSingleNode("U") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("U");
                                if (selectSingleNode != null)
                                    area = selectSingleNode.InnerText;  //STORAGE_AREA
                            }

                            if ((stkNode.SelectSingleNode("AC") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AC");
                                if (selectSingleNode != null)
                                    level1 = selectSingleNode.InnerText;//STOR_LEVEL_1
                            }
                            if ((stkNode.SelectSingleNode("AD") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AD");
                                if (selectSingleNode != null)
                                    level2 = selectSingleNode.InnerText;  //STOR_LEVEL_2
                            }
                            if ((stkNode.SelectSingleNode("AE") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AE");
                                if (selectSingleNode != null)
                                    level3 = selectSingleNode.InnerText;   //STOR_LEVEL_3
                            }
                            if ((stkNode.SelectSingleNode("AF") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AF");
                                if (selectSingleNode != null)
                                    level4 = selectSingleNode.InnerText; //STOR_LEVEL_4
                            }
                            if ((stkNode.SelectSingleNode("T") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("T");
                                if (selectSingleNode != null)
                                    serNo = selectSingleNode.InnerText; //SERIAL_ID
                            }

                            if ((stkNode.SelectSingleNode("S") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("S");
                                if (selectSingleNode != null)
                                    lotNo = selectSingleNode.InnerText;  //LOT_ID
                            }

                            if ((stkNode.SelectSingleNode("Z") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("Z");
                                if (selectSingleNode != null)
                                    sysQty = selectSingleNode.InnerText;  //SYSTEM_QTY
                            }

                            if ((stkNode.SelectSingleNode("X") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("X");
                                if (selectSingleNode != null)
                                    stdUom = selectSingleNode.InnerText;  //STDUOM
                            }

                            if ((stkNode.SelectSingleNode("AI") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AI");
                                if (selectSingleNode != null)
                                    stdPackUom = selectSingleNode.InnerText; //STD_PACK_UOM
                            }

                            var drLotSerial = dsLocDetails.Tables[(int)AtParWebEnums.DataSet_Type.LOTSERIAL_INFO]
                                .NewRow();

                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.BUSINESS_UNIT] = bunit;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CART_ID] = cartID;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION] = strLoc;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_AREA] = area;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_1] = level1;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_2] = level2;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_3] = level3;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_4] = level4;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.ITEM_ID] = itemID;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.LOT_NUMBER] = lotNo;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.SERIAL_NUMBER] = serNo;

                            //STAGED_DATE
                            if ((stkNode.SelectSingleNode("R") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("R");
                                if (selectSingleNode != null)
                                    drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STAGED_DATE] =
                                        selectSingleNode.InnerText;
                            }
                            else
                            {
                                drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STAGED_DATE] =
                                    string.Empty;
                            }

                            //CONTAINER_ID
                            if ((stkNode.SelectSingleNode("Y") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("Y");
                                if (selectSingleNode != null)
                                    drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CONTAINER_ID] =
                                        selectSingleNode.InnerText;
                            }
                            else
                            {
                                drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CONTAINER_ID] =
                                    string.Empty;
                            }
                            //ITEM_UOM
                            if ((stkNode.SelectSingleNode("W") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("W");
                                if (selectSingleNode != null)
                                    drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.UOM] =
                                        selectSingleNode.InnerText;
                            }
                            else
                            {
                                drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.UOM] = string.Empty;
                            }
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.SYSTEM_QTY] = sysQty;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STDUOM] = stdUom;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STD_PACK_UOM] = stdPackUom;

                            dsLocDetails.Tables[(int)AtParWebEnums.DataSet_Type.LOTSERIAL_INFO]
                                .Rows.Add(drLotSerial);
                        }
                }


                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, dsLocDetails);
            }
            catch (Exception ex)
            {
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, dsLocDetails);
            }
        }
        private Tuple<long, string> ERPGetLocationDetails(string erpObjName, string sbInputXml, string outXml, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                //GetConfigData();
                string className = null;
                object reflectObject = null;

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


        #endregion

        #region GetItemsForSelectedLocation
        public AtParWebApiResponse<VM_POU_CART_DETAILS> GetItemsForSelectedLocation(string cartID, string bUnit, string userID, string orgGrpID, int appID, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_CART_DETAILS>();
            List<VM_POU_CART_DETAILS> lstCartDetails = null;



            try
            {
                DataTable retTbl = new DataTable("DEPARTMENT_CART_ITEMS");
                retTbl.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                retTbl.Columns.Add("ITEM_DESCRIPTION", Type.GetType("System.String"));

                DataSet detDs = new DataSet();
                StringBuilder sb = new StringBuilder();

                var tupleResult = _GetCartDetails(cartID, bUnit, detDs, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], deviceTokenEntry, "", "", sb, "", appID);

                response.StatusCode = tupleResult.Item1;
                detDs = tupleResult.Item2;

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (response.StatusCode != AtparStatusCodes.E_NORECORDFOUND)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }
                }

                DataRow retRow = null;
                if (detDs.Tables.Count > 0)
                {
                    for (int i = 0; i <= detDs.Tables[1].Rows.Count - 1; i++)
                    {
                        retRow = retTbl.NewRow();
                        retRow["ITEM_ID"] = detDs.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
                        retRow["ITEM_DESCRIPTION"] = detDs.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR];
                        retTbl.Rows.Add(retRow);
                    }
                }



                DataSet dsCartDetails = new DataSet();
                dsCartDetails.Tables.Add(retTbl);

                //converting DataSet to List
                lstCartDetails = (from rw in dsCartDetails.Tables[0].AsEnumerable()
                                  select new VM_POU_CART_DETAILS()
                                  {
                                      INV_ITEM_ID = rw["ITEM_ID"] == null ? string.Empty : rw["ITEM_ID"].ToString(),
                                      ITEM_DESCR = rw["ITEM_DESCRIPTION"] == null ? string.Empty : rw["ITEM_DESCRIPTION"].ToString(),

                                      //INV_ITEM_ID = rw[0].ToString(),
                                      //COMPARTMENT = rw[1].ToString(),
                                      //ITEM_DESCR = rw[2].ToString(),
                                      //MFG_ITEM_ID = rw[3].ToString(),
                                      //VENDOR_ITEM_ID = rw[4].ToString(),
                                      //UPN_ID = rw[5].ToString(),
                                      //ITEM_NDC = rw[6].ToString(),
                                      //ITEM_GTIN = rw[7].ToString(),
                                      //ITEM_PRICE = rw[8] == null ? 0 : Convert.ToDouble(rw[8]),
                                      //COUNT_ORDER = rw[9].ToString(),
                                      //OPTIMAL_QTY = rw[10].ToString(),
                                      //FOQ = rw[11] == null ? 0 : Convert.ToDouble(rw[11]),
                                      //COUNT_REQD = rw[12].ToString(),
                                      //CART_REPLEN_CTRL = rw[13].ToString(),
                                      //CART_REPLEN_OPT = rw[14].ToString(),
                                      //CONS_NON_STOCK = rw[15].ToString(),
                                      //INVENTORY_ITEM = rw[16].ToString(),
                                      //ORDER_QTY = rw[17] == null ? 0 : Convert.ToDouble(rw[17]),
                                      //UOM = rw[18].ToString(),
                                      //MAX_QTY = rw[19] == null ? 0 : Convert.ToDouble(rw[19]),
                                      //FILLKILL = rw[20].ToString(),
                                      //CUST_ITEM_ID = rw[21].ToString(),
                                      //LOT_CONTROLLED = rw[22].ToString(),
                                      //SERIAL_CONTROLLED = rw[23].ToString(),
                                      //CONV_FACTOR = rw[24].ToString(),
                                      //CHARGE_CODE = rw[25].ToString(),
                                      //VENDOR_NAME = rw[26].ToString(),
                                      //VENDOR_ID = rw[27].ToString(),
                                      //UOM_PROC = rw[28].ToString(),
                                      //QTY_OPTION = rw[29].ToString(),
                                      //LAST_ORDER_DATE = rw[30].ToString(),
                                      //STATUS = rw[31].ToString(),
                                      //PACKAGING_STRING = rw[32].ToString(),
                                      //MFG_ID = rw[33].ToString(),
                                      //CONSIGNMENT_ITEM = rw[34].ToString(),
                                      //REPORT_FIELD_1 = rw[35].ToString(),
                                      //REPORT_FIELD_2 = rw[36].ToString(),
                                      //REPORT_FIELD_3 = rw[37].ToString(),
                                      //REPORT_FIELD_4 = rw[38].ToString(),
                                      //ITEM_TYPE = rw[39].ToString(),
                                      //SUBSTITUTE_ITEM_FLG = rw[40].ToString(),
                                      //USER_FIELD_2 = rw[41].ToString(),
                                      //IMPLANT_FLAG = rw[42].ToString(),
                                      //ITEM_MASTER_ITEM_STATUS = rw[43].ToString(),
                                      //NON_CART_ITEM_STATUS = rw[44].ToString(),
                                      //BILL_ITEM_STATUS = rw[45].ToString(),
                                      //PAR_LOC_STATUS = rw[46].ToString(),
                                      //ITEM_MASTER_STATUS = rw[47].ToString(),
                                      //ITEM_BU_STATUS = rw[48].ToString(),
                                      //INFO_2 = rw[49].ToString(),
                                      //INFO_3 = rw[50].ToString(),
                                      //ISSUE_UOM = rw[51].ToString(),
                                      //CONV_RATE_PAR_UOM = rw[52].ToString(),
                                  }).ToList();

                response.DataList = lstCartDetails;

                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }


                response.AtParSuccess();
                return response;
            }

            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion

        #region CreateOrder
        public AtParWebApiResponse<long> CreateOrder(Dictionary<string, dynamic> dicDataItems, int appID, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            DataSet outputParameters = new DataSet();
            DataTable cart_out_dt = new DataTable();
            int lineNo = 0;
            string strLocType = string.Empty;
            string strOrderIds = string.Empty;
            long remStatus = -1;
            DataTable dt_cart_hdr = new DataTable();
            DataTable dt_cart_dtl = new DataTable();
            DataTable dt_cart_preq = new DataTable();

            List<VM_CART_HEADER> lstCartHeader = new List<VM_CART_HEADER>();
            List<VM_CART_DETAILS> lstCartDetails = new List<VM_CART_DETAILS>();
            try
            {

                DataSet inputParameter = new DataSet();

                dt_cart_hdr = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_Header_Defns,
                 AtParWebEnums.DataSet_Type.HEADERS.ToString());
                dt_cart_dtl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_Details_Defns,
                    AtParWebEnums.DataSet_Type.DETAILS.ToString());
                dt_cart_preq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_BusinessRules_Defns,
                    AtParWebEnums.DataSet_Type.PREREQDATA.ToString());


                foreach (var keyValuePair in dicDataItems)
                {
                    switch (keyValuePair.Key)
                    {
                        case "HEADER":

                            foreach (var item in keyValuePair.Value)
                            {

                                DataRow _drHed = dt_cart_hdr.NewRow();
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID] = item.CART_ID;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT] = item.BUSINESS_UNIT;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.USER_ID] = item.USER_ID;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.START_DATETIME] = item.START_DATETIME;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.END_DATETIME] = item.END_DATETIME;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.QUANTITY_OPTION] = item.QUANTITY_OPTION;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID] = item.TRANSACTION_ID;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.CMTS] = item.CMTS;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.NO_OF_SCANS] = item.NO_OF_SCANS;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.TOTAL_RECORDS] = item.TOTAL_RECORDS;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.NO_OF_ORDERED_ITEMS] = item.NO_OF_ORDERED_ITEMS;

                                dt_cart_hdr.Rows.Add(_drHed);
                            }
                            break;

                        case "DETAILS":

                            foreach (var item in keyValuePair.Value)
                            {
                                DataRow _drDet = dt_cart_dtl.NewRow();
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID] = item.ITEM_ID;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT] = item.COMPARTMENT;

                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_QUANTITY] =  string.IsNullOrEmpty(Convert.ToString((item.COUNT_QUANTITY).Value)) ? 0 : Convert.ToDouble((item.COUNT_QUANTITY).Value);  
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY] = item.OPTIMAL_QUANTITY == null ? Convert.ToDouble(0) : Convert.ToDouble(item.OPTIMAL_QUANTITY);
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.LNCMTS] = item.LNCMTS;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.UOM] = item.UOM;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.PRICE] = item.PRICE == null ? Convert.ToDouble(0) : Convert.ToDouble(item.PRICE);
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_REQUIRED] = item.COUNT_REQUIRED;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.INVENTORY_ITEM] = item.INVENTORY_ITEM;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_DESCR] = item.ITEM_DESCR;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.ACT_QOH] = item.ACT_QOH == null ? Convert.ToDouble(0) : Convert.ToDouble(item.ACT_QOH);
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_CTRL] = item.CART_REPLEN_CTRL;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_OPT] = item.CART_REPLEN_OPT;

                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.MAX_QTY] = item.MAX_QTY;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.FOQ] = item.FOQ;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.CUST_ITEM_NO] = item.CUST_ITEM_NO;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.VENDOR_ID] = item.VENDOR_ID;
                                dt_cart_dtl.Rows.Add(_drDet);
                            }
                            break;
                    }
                }




                inputParameter.Tables.Add(dt_cart_hdr);
                inputParameter.Tables.Add(dt_cart_dtl);
                inputParameter.Tables.Add(dt_cart_preq);

                DataView dvItems = new DataView();
                dvItems = inputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].DefaultView;
                dvItems.Sort = "[" + (int)AtParWebEnums.Send_Cart_Details_Enum.VENDOR_ID + "]";
                inputParameter.Tables.Remove(AtParWebEnums.DataSet_Type.DETAILS.ToString());
                inputParameter.Tables.Add(dvItems.ToTable());

                DataTable tblHeader = new DataTable("ORDER_HEADER");
                tblHeader.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                tblHeader.Columns.Add("CART_ID", Type.GetType("System.String"));
                tblHeader.Columns.Add("VENDOR_ID", Type.GetType("System.String"));
                tblHeader.Columns.Add("ORDER_NO", Type.GetType("System.Int32"));

                DataTable tblItems = new DataTable("ORDER_ITEMS");
                tblItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                tblItems.Columns.Add("REQ_QUANTITY", Type.GetType("System.Int32"));
                tblItems.Columns.Add("VENDOR_ID", Type.GetType("System.String"));
                tblItems.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
                tblItems.Columns.Add("ORDER_NO", Type.GetType("System.Int32"));


                cart_out_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_Output_Defns,
                    AtParWebEnums.DataSet_Type.OUTPUT.ToString());

                outputParameters.Tables.Add(cart_out_dt);


                DataRow drDet = outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();
                drDet[AtParWebEnums.Send_Cart_Output_Enum.STATUS_CODE.ToString()] = AtparStatusCodes.E_SERVERERROR;
                outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(drDet);

                ////Converting list to dataset
                //DataSet inputParameter = new DataSet();
                //DataTable dt = new DataTable();
                //dt = lstCartDetails.ToDataTable();
                //inputParameter.Tables.Add(dt);




                response.StatusCode = Populate_CreateOrders_Prerequisites(inputParameter, deviceTokenEntry, appID);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {

                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;

                }

                if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                {
                    DataRow dr = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];

                   strLocType = _commonRepo.GetLocationType(dr[(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT].ToString(), dr[(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString());
                }

                string strBunit = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT].ToString();
                string strcartID = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString();

                string replinish = string.Empty;

                int cnt = _createOrderRepo.GetParLocations(strcartID, strBunit);

                if (cnt > 0)
                {
                    replinish = _createOrderRepo.GetReplinish(strBunit, strcartID);
                }

                DataRow drHeader = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];

                string _strBunit = drHeader[(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT].ToString();
                string _strCartID = drHeader[(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString();

                bool blnPerpectualMMIS = _createOrderRepo.CheckPerpectual(strBunit, strcartID);

                string strReplType = String.Empty;
                string strInventoryOrderFlg = string.Empty;
                string strVendorID = string.Empty;
                string strItemID = string.Empty;
                string strComprtID = string.Empty;
                double dblCountQty = 0;
                string strPrevVendorId = string.Empty;
                double dblQOH = 0;
                string strUOM = string.Empty;

                long orderNo = -1;


                for (int i = 0; i <= inputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count - 1; i++)
                {
                    DataRow dr = inputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[i];

                    strVendorID = dr[(int)AtParWebEnums.Send_Cart_Details_Enum.VENDOR_ID].ToString();
                    strItemID = dr[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID].ToString();
                    strComprtID = dr[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT].ToString();
                    dblCountQty = Convert.ToDouble(dr[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_QUANTITY]);
                    strUOM = dr[(int)AtParWebEnums.Send_Cart_Details_Enum.UOM].ToString();
                    strReplType = dr[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_OPT].ToString();
                    dblQOH = Convert.ToDouble(dr[(int)AtParWebEnums.Send_Cart_Details_Enum.ACT_QOH]);

                    if (!blnPerpectualMMIS)
                    {
                        if (dblCountQty == null || dblCountQty <= 0)
                        {
                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " Order cannot be generated for " + " quantity " + dblCountQty + System.Environment.NewLine);
                            continue;
                        }
                    }


                    if (strPrevVendorId != strVendorID || i == 0)
                    {
                        lineNo = 1;

                        orderNo = _commonRepo.GetAtparLatestValues((int)AtParWebEnums.EnumApps.CartCount, "ORDER_NO");

                        //if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                        //{
                        //    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                        //    return response;

                        //}

                        if (strReplType == "01")
                        {
                            strInventoryOrderFlg = AtParWebEnums.YesNo_Enum.Y.ToString();
                        }
                        else
                        {
                            strInventoryOrderFlg = AtParWebEnums.YesNo_Enum.N.ToString();
                        }


                        response.StatusCode = _createOrderRepo.InsertOrderHeaders(orderNo, _strBunit, _strCartID, strVendorID, appID, strInventoryOrderFlg);



                        if (string.IsNullOrEmpty(strOrderIds))
                        {
                            strOrderIds = orderNo.ToString();
                        }
                        else
                        {
                            strOrderIds = strOrderIds + "," + orderNo.ToString();
                        }

                        if (strInventoryOrderFlg == "N" && (strReplType == "04" || strReplType == "02"))
                        {
                            DataRow drhdr = tblHeader.NewRow();
                            drhdr["BUSINESS_UNIT"] = _strBunit;
                            drhdr["CART_ID"] = _strCartID;
                            drhdr["VENDOR_ID"] = strVendorID;
                            drhdr["ORDER_NO"] = orderNo;
                            tblHeader.Rows.Add(drhdr);

                        }
                    }

                    if (dblCountQty > 0 || blnPerpectualMMIS)
                    {
                        response.StatusCode = _createOrderRepo.InsertOrderDetails(blnPerpectualMMIS, orderNo, lineNo, strItemID, strComprtID, dblCountQty,
                             strUOM, dblQOH);
                    }

                    strPrevVendorId = dr[(int)AtParWebEnums.Send_Cart_Details_Enum.VENDOR_ID].ToString();
                    lineNo = lineNo + 1;

                    if (strInventoryOrderFlg == "N" && (strReplType == "04" || strReplType == "02"))
                    {
                        DataRow dritm = tblItems.NewRow();
                        dritm["ITEM_ID"] = strItemID;
                        dritm["REQ_QUANTITY"] = dblCountQty;
                        dritm["VENDOR_ID"] = strVendorID;
                        dritm["COMPARTMENT"] = strComprtID;
                        dritm["ORDER_NO"] = orderNo;
                        tblItems.Rows.Add(dritm);

                    }
                }


                DataSet dsInputParams = new DataSet();
                dsInputParams.Tables.Add(tblHeader);
                dsInputParams.Tables.Add(tblItems);


                response.StatusCode = ProcessVendorEmail(appID, dsInputParams, deviceTokenEntry);
                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed in ProcessVendorEmail " + response.StatusCode + System.Environment.NewLine);
                }

                if (blnPerpectualMMIS)
                {
                    DataTable dtPerpectual = new DataTable();
                    dtPerpectual.TableName = "PERPECTUALINMMIS";
                    dtPerpectual.Columns.Add("PERPECTUAL_IN_MMIS", Type.GetType("System.Boolean"));
                    DataRow drPerpectual = dtPerpectual.NewRow();
                    drPerpectual["PERPECTUAL_IN_MMIS"] = blnPerpectualMMIS;
                    dtPerpectual.Rows.Add(drPerpectual);
                    dsInputParams.Tables.Add(dtPerpectual);
                }

                if (replinish != AtParWebEnums.REPENISH_FROM.PAR.ToString() || cnt == 0)
                {
                    remStatus = GetERPCarts(inputParameter, strLocType, strOrderIds, deviceTokenEntry);

                    if (remStatus != AtparStatusCodes.ATPAR_OK)
                    {

                        response.AtParNotOK(remStatus, _commonRepo, _log);
                        return response;

                    }
                }
                if (replinish != AtParWebEnums.REPENISH_FROM.PAR.ToString())
                {
                    //GetERPCarts(inputParameter, strLocType, strOrderIds, deviceTokenEntry);

                    response.StatusCode = _createOrderRepo.UpdateOrderDetails(remStatus, strOrderIds);

                    if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                    {

                        response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                        return response;

                    }
                }


                response.AtParSuccess();
                return response;
            }

            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private long Populate_CreateOrders_Prerequisites(DataSet inputParameter, string[] deviceTokenEntry, int appID = 15)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string userID = string.Empty;
            string OrgGroupId = string.Empty;
            string profileId = string.Empty;
            SortedList<string, string> orgParams;
            SortedList<string, string> userParams;
            string remoteSchema = "";
            string remoteDBType = "";
            string erpDetails = "";
            string erpVersion = "";


            try
            {


                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()] = string.Empty;

                OrgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();

                _commonRepo.GetOrgGroupParamValues(orgParams, appID, OrgGroupId);


                userParams = new SortedList<string, string>();
                userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()] = string.Empty;
                userParams[AtParWebEnums.AppParameters_Enum.REQUESTOR_ID.ToString()] = string.Empty;

                profileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();
                userID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                _commonRepo.GetUserParamValues(userParams, appID, userID);

                DataRow dr = inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                remoteDBType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                erpDetails = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                          x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                erpVersion = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                          x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR] = orgParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REMOTE_SCHEMA] = remoteSchema;
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME] = erpDetails;
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ENTERPRISE_VERSION] = erpVersion;
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REMOTE_DB_TYPE] = remoteDBType;
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ERP_USER_ID] = userParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.ERP_USER_ID.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.POU_CART] = AtParWebEnums.YesNo_Enum.Y.ToString();
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REQUESTOR_ID] = userParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.REQUESTOR_ID.ToString()];


                inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);


                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Error occured in Getting PRERequisites : " + ex.ToString());

                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private long GetERPCarts(DataSet inputParameters, string location, string orderIds, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            DataSet outputParameters = new DataSet();

            try
            {
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //Initializing 
                //GetConfigData();


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() && x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if ((inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString()) || (location == AtParWebEnums.LocationType.A.ToString()))
                {

                    erpObjName = AtParWebEnums.Erp_Obj_Name.CartCount_Atpar.ToString();
                    inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ORDIDS] = orderIds;


                }
                else
                {
                    erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() && x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                    erpObjName = AtParWebEnums.EnumApps.CartCount.ToString() + "_" + erpObjName;
                }

                className = "SendCart";
                methodName = "SendCart";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }

                    return StatusCode;
                }


                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        public long ProcessVendorEmail(int appID, DataSet inputParameters, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strVendorEmail = string.Empty;
            string strDeptID = string.Empty;
            string strDeptName = string.Empty;
            string strVendorID = string.Empty;
            string strBUnit = string.Empty;
            string strCartID = string.Empty;
            string strCartName = string.Empty;
            string strAddress1 = string.Empty;
            string strAddress2 = string.Empty;
            string strCostCenter = string.Empty;
            string strBUserFName = string.Empty;
            string strBUserLName = string.Empty;
            string strBUserEmail = string.Empty;
            string strBUserPhone = string.Empty;
            string strBUserFax = string.Empty;
            DataSet dsDeptInfo = new DataSet();
            DataSet dsParlocInfo = new DataSet();
            int intAcountNum = 0;
            StringBuilder sbItemInfo = new StringBuilder();
            StringBuilder sbHtmlString = new StringBuilder();
            StringBuilder sbHeaderInfo = new StringBuilder();
            StringBuilder sbFooterInfo = new StringBuilder();
            long StatusCode = -1;
            int intOrderNo = 0;
            double dblTotalPrice = 0;


            try
            {
                DataView dvItemInfo = new DataView();
                dvItemInfo = inputParameters.Tables[0].DefaultView;
                DataTable dtVendors = dvItemInfo.ToTable(true, "VENDOR_ID", "ORDER_NO");


                for (int i = 0; i < dtVendors.Rows.Count; i++)
                {
                    sbFooterInfo.Remove(0, sbFooterInfo.Length);
                    sbHeaderInfo.Remove(0, sbHeaderInfo.Length);
                    sbItemInfo.Remove(0, sbItemInfo.Length);
                    sbHtmlString.Remove(0, sbHtmlString.Length);


                    strVendorID = dtVendors.Rows[i]["VENDOR_ID"].ToString();
                    intOrderNo = Convert.ToInt32(dtVendors.Rows[i]["ORDER_NO"]);

                    strVendorEmail = _createOrderRepo.GetVendorEmail(strVendorID, deviceTokenEntry);


                    //if (StatusCode != AtparStatusCodes. ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Failed to get the Vendor Email for the Vendor" + strVendorID + " : StatusCode is : " + StatusCode + System.Environment.NewLine);
                    //    continue;
                    //}


                    if (!string.IsNullOrEmpty(strVendorEmail))
                    {
                        dblTotalPrice = 0;

                        DataRow[] drCartInfo = null;
                        drCartInfo = inputParameters.Tables["ORDER_HEADER"].Select("VENDOR_ID = '" + strVendorID + "' AND ORDER_NO = " + intOrderNo + " ");


                        if (drCartInfo.Length > 0)
                        {
                            strBUnit = drCartInfo[0]["BUSINESS_UNIT"].ToString();
                            strCartID = drCartInfo[0]["CART_ID"].ToString();

                            List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptInfo = _createOrderRepo.GetDeptInfo(strBUnit, strCartID, appID);


                            //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                            //{
                            //    if (_log.IsFatalEnabled)
                            //        _log.Fatal(methodBaseName + " Failed to get the Department information " + " : StatusCode is : " + StatusCode + System.Environment.NewLine);
                            //    continue;
                            //}

                            if (lstDeptInfo != null && lstDeptInfo.Count > 0)
                            {
                                strDeptID = lstDeptInfo[0].DEPARTMENT_ID;
                                strDeptName = lstDeptInfo[0].DEPT_NAME;
                            }

                            List<PAR_MNGT_PAR_LOC_HEADER> lstparLoc = _createOrderRepo.GetParLocDetails(strBUnit, strCartID, appID);



                            //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                            //{
                            //    if (_log.IsFatalEnabled)
                            //        _log.Fatal(methodBaseName + " Failed to get the Par Location information " + " : StatusCode is : " + StatusCode + System.Environment.NewLine);
                            //    continue;
                            //}


                            if (lstparLoc != null && lstparLoc.Count > 0)
                            {
                                strCostCenter = lstparLoc[0].COST_CENTER_CODE;
                                strCartName = lstparLoc[0].LOCATION_NAME;
                                strAddress1 = lstparLoc[0].DELV_LOC_ADDRESS_1;
                                strAddress2 = lstparLoc[0].DELV_LOC_ADDRESS_2;
                            }

                        }

                        // Getting the Batch User Information
                        List<MT_ATPAR_USER> lstBatchUsers = _createOrderRepo.GetBatchUserInfo();


                        //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        //{
                        //    if (_log.IsFatalEnabled)
                        //        _log.Fatal(methodBaseName + " Failed to get the Batch User information " + " : StatusCode is : " + StatusCode + System.Environment.NewLine);
                        //    continue;
                        //}

                        if (lstBatchUsers != null && lstBatchUsers.Count > 0)
                        {
                            strBUserFName = lstBatchUsers[0].FIRST_NAME;
                            strBUserLName = lstBatchUsers[0].LAST_NAME;
                            strBUserEmail = lstBatchUsers[0].EMAIL_ID;
                            strBUserPhone = lstBatchUsers[0].PHONE1;
                            strBUserFax = lstBatchUsers[0].FAX;
                        }

                        sbHtmlString.Append("<table align=left width=100%>");
                        sbHtmlString.Append("<tr><td>");

                        // Building the Header

                        sbHeaderInfo.Append("<table align=left width=100%>");
                        sbHeaderInfo.Append("<tr>");
                        sbHeaderInfo.Append("<td align=left><span class=c2>Requisition Number: " + intOrderNo + "</span></td></tr>");
                        sbHeaderInfo.Append("<tr>");
                        sbHeaderInfo.Append("<td align=left><span class=c2>Deliver To(building and room): ");
                        sbHeaderInfo.Append("" + strCartID + "");

                        if (!string.IsNullOrEmpty(strCartName))
                        {
                            sbHeaderInfo.Append(", " + strCartName + "");
                        }
                        if (!string.IsNullOrEmpty(strAddress1))
                        {
                            sbHeaderInfo.Append(", " + strAddress1 + "");
                        }
                        if (!string.IsNullOrEmpty(strAddress2))
                        {
                            sbHeaderInfo.Append(", " + strAddress2 + "");
                        }
                        sbHeaderInfo.Append("</span></td></tr>");
                        sbHeaderInfo.Append("<tr> ");
                        sbHeaderInfo.Append("<td align=left><span class=c2>Department: ");
                        sbHeaderInfo.Append("" + strDeptID + "");

                        if (!string.IsNullOrEmpty(strDeptName))
                        {
                            sbHeaderInfo.Append(", " + strDeptName + "");
                        }
                        sbHeaderInfo.Append("</span></td></tr>");
                        sbHeaderInfo.Append("<tr>");
                        sbHeaderInfo.Append("<td align=left nowrap><span class=c2>Vendor ID: " + strVendorID + "</span></td></tr>");
                        sbHeaderInfo.Append("</table>");
                        sbHeaderInfo.Append("</td></tr>");



                        sbItemInfo.Append("<tr><td>");
                        sbItemInfo.Append("<table align=left width=100% style=" + (char)34 + "BORDER-COLLAPSE:collapse" + (char)34 + " border=1 bordercolor=black>");
                        sbItemInfo.Append("<tr><td align=left nowrap  colspan=2><span class=c2>Entity</span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Cost Center</span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Acct#</span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Digimax ID</span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Qty</span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Unit Of Measure </span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Catalog#</span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Description</span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Unit Price ($) </span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Extended Price ($) </span></td>");
                        sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>Comments /Serial#/ Lot# </span></td></tr>");



                        DataRow[] drItems = inputParameters.Tables["ORDER_ITEMS"].Select("VENDOR_ID = '" + strVendorID + "' AND ORDER_NO = " + intOrderNo + "");

                        DataSet dsItemInfo = new DataSet();

                        if (drItems.Length > 0)
                        {

                            for (int j = 0; j < drItems.Length; j++)
                            {
                                intAcountNum = _createOrderRepo.GetAccountNum(drItems[j]["ITEM_ID"].ToString(), deviceTokenEntry);


                                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                //{
                                //    if (_log.IsFatalEnabled)
                                //        _log.Fatal(methodBaseName + " Failed to get the Account Number for the item" + drItems[j]["ITEM_ID"].ToString() + " : StatusCode is : " + StatusCode + System.Environment.NewLine);
                                //    continue;
                                //}

                                List<PAR_MNGT_ITEM> lstItemInfo = _createOrderRepo.GetItemDetails(drItems[j]["ITEM_ID"].ToString(), deviceTokenEntry);


                                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                //{
                                //    if (_log.IsFatalEnabled)
                                //        _log.Fatal(methodBaseName + " Failed to get the details for the item" + drItems[j]["ITEM_ID"].ToString() + " : StatusCode is : " + StatusCode + System.Environment.NewLine);
                                //    continue;
                                //}



                                sbItemInfo.Append("<tr>");
                                sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2> 310 </span></td>");
                                sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>" + strCostCenter + "</span></td>");

                                if (intAcountNum > 0)
                                {
                                    sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2>" + intAcountNum + "</span></td>");
                                }
                                else
                                {
                                    sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2>" + string.Empty + "</span></td>");
                                }
                                sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>" + drItems[j]["ITEM_ID"] + "</span></td>");
                                sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2>" + drItems[j]["REQ_QUANTITY"] + "</span></td>");



                                if (dsItemInfo.Tables.Count > 0 && dsItemInfo.Tables[0].Rows.Count > 0)
                                {
                                    var item = dsItemInfo.Tables[0].Rows[0];
                                    sbItemInfo.Append("<td align=left nowrap   colspan=2><span class=c2>" + item["UNIT_OF_PROCUREMENT"] + "</span></td>");
                                    sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>" + item["VEND_ITEM_ID"] + "</span></td>");
                                    sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>" + item["LONG_DESCR"] + "</span></td>");
                                    sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2>" + FormatAtParNumber(item["ITEM_PRICE"].ToString(), 2) + "</span></td>");
                                    sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2>" + FormatAtParNumber((Convert.ToDouble(item["ITEM_PRICE"]) * Convert.ToDouble(drItems[j]["REQ_QUANTITY"])).ToString(), 2) + "</span></td>");
                                    sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>" + string.Empty + "</span></td>");
                                    dblTotalPrice = dblTotalPrice + Convert.ToDouble(Convert.ToDouble(item["ITEM_PRICE"]) * Convert.ToDouble(drItems[j]["REQ_QUANTITY"]));


                                }
                                else
                                {


                                    sbItemInfo.Append("<td align=left nowrap   colspan=2><span class=c2>" + string.Empty + "</span></td>");
                                    sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2>" + string.Empty + "</span></td>");
                                    sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2>" + string.Empty + "</span></td>");
                                    sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2> 0 </span></td>");
                                    sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2> 0 </span></td>");
                                    sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2>" + string.Empty + "</span></td>");


                                }
                                sbItemInfo.Append("</tr>");
                            }



                            sbItemInfo.Append("<tr>");
                            sbItemInfo.Append("<td align=right nowrap  colspan=19><span class=c2>Total</span></td>");
                            sbItemInfo.Append("<td align=right nowrap ><span class=c2>" + FormatAtParNumber(dblTotalPrice.ToString(), 2) + "</span></td>");
                            sbItemInfo.Append("<td colspan=2></td></tr>");

                            sbItemInfo.Append("</table>");
                            sbItemInfo.Append("</td></tr>");
                        }



                        sbFooterInfo.Append("<tr><td>");
                        sbFooterInfo.Append("<table align=left width=100%>");
                        sbFooterInfo.Append("<tr>");
                        sbFooterInfo.Append("<td align=left><span class=c2>Additional Comments: _______________________________________________________________________</span></td></tr>");
                        sbFooterInfo.Append("<tr>");
                        sbFooterInfo.Append("</tr>");
                        sbFooterInfo.Append("<tr>");
                        sbFooterInfo.Append("<td align=left><span class=c2>");
                        sbFooterInfo.Append("This requisition was created on " + DateTime.Now.ToString("MM/dd/yyyy") + " by BATCH - " + strBUserFName + " ^ " + strBUserLName + ".</span></td></tr>");
                        sbFooterInfo.Append("<tr>");
                        sbFooterInfo.Append("<td align=left><span class=c2>");
                        sbFooterInfo.Append("This requisition is sent and approved on " + DateTime.Now.ToString("MM/dd/yyyy") + " by BATCH - " + strBUserFName + " ^ " + strBUserLName + ".</span></td></tr>");

                        if ((!string.IsNullOrEmpty(strBUserPhone)) | (!string.IsNullOrEmpty(strBUserFax)) | (!string.IsNullOrEmpty(strBUserEmail)))
                        {
                            sbFooterInfo.Append("<tr>");
                            sbFooterInfo.Append("<td align=left><span class=c2>");
                            sbFooterInfo.Append("" + strBUserFName + " ^ " + strBUserLName + " can be reached at ");

                            if (!string.IsNullOrEmpty(strBUserPhone))
                            {
                                sbFooterInfo.Append("" + strBUserPhone + ",");
                            }
                            if (!string.IsNullOrEmpty(strBUserFax))
                            {
                                sbFooterInfo.Append("" + strBUserFax + ",");
                            }
                            if (!string.IsNullOrEmpty(strBUserEmail))
                            {
                                sbFooterInfo.Append("" + strBUserEmail + "");
                            }
                            sbFooterInfo.Append("</span></td></tr>");
                        }
                        sbFooterInfo.Append("</table></td></tr>");


                        sbHtmlString.Append(sbHeaderInfo);
                        var _with9 = sbHtmlString;
                        _with9.Append("<tr><td><br /></td></tr>");
                        sbHtmlString.Append(sbItemInfo);
                        var _with10 = sbHtmlString;
                        _with10.Append("<tr><td><br /></td></tr>");
                        sbHtmlString.Append(sbFooterInfo);
                        sbHtmlString.Append("</table>");

                        StatusCode = SendEmail(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], "AtPar - Vendor Email",
                            sbHtmlString.ToString(), strVendorEmail, MailPriority.High);

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + ":Failed in sendEmail:" + "StatusCode is :" + StatusCode + System.Environment.NewLine);

                        }



                    }
                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(string.Format(":{0}:Failed to Process Vendor Email and Exception is:{1} ", methodBaseName, ex.ToString()));
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private string FormatAtParNumber(string IP, int Length)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                string strPad = string.Empty;
                return string.Format((Math.Truncate(Convert.ToDouble(IP) * Math.Pow(10, Length)) / Math.Pow(10, Length)).ToString(), "0." + strPad.PadRight(Length, '0'));
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":Failed to format the number: " + IP + System.Environment.NewLine + " :Exception is:" + ex.Message.ToString() + System.Environment.NewLine);
                return IP;
            }
        }

        public long SendEmail(string systemID, string subject, string bodyText, string toAddress, MailPriority mailPriority = MailPriority.Normal, string attachment = "")
        {
            //long functionReturnValue = 0;

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strFromAddress = "";
            string strSmtpHost = string.Empty;
            string strSmtpPort = string.Empty;
            string strSmtpUserName = string.Empty;
            string strSmtpPwd = string.Empty;
            string strSmtpAccountName = string.Empty;
            string strSmtpSSLEnabled = string.Empty;
            MailMessage objMail = new MailMessage();
            SmtpClient SmtpMail = new SmtpClient();

            try
            {


                //Initializing 
                //GetConfigData();


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_USER_NAME.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_PASSWORD.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_USE_SSL.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                strFromAddress = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                strSmtpHost = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                strSmtpPort = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString())
                                                   .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                strSmtpUserName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_USER_NAME.ToString())
                                                 .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                Encryption encrypt = new Encryption();

                strSmtpPwd = encrypt.Decrypt(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_PASSWORD.ToString())
                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault());


                strSmtpAccountName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString())
                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                strSmtpSSLEnabled = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_USE_SSL.ToString())
                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                // checks whether the To Address is entered
                if (string.IsNullOrEmpty(toAddress))
                {
                    return AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS;
                }
                objMail.To.Add(toAddress);


                // checks whether the SMTP HOST(Server) is configured
                if (string.IsNullOrEmpty(strSmtpHost))
                {
                    return AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING;
                }

                SmtpMail.Host = strSmtpHost;

                // checks whether the Port is configured
                if (string.IsNullOrEmpty(strSmtpPort))
                {
                    return AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING;
                }
                SmtpMail.Port = Convert.ToInt32(strSmtpPort);

                // checks whether the From Address is being configured

                if (string.IsNullOrEmpty(strFromAddress))
                {

                    return AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS;
                }

                objMail.From = new MailAddress(strFromAddress);



                // checks whether the Subject is entered
                if (string.IsNullOrEmpty(subject))
                {
                    return AtparStatusCodes.EMAIL_ENTER_SUBJECT;
                }
                objMail.Subject = subject;

                // checks whether the Body is entered
                if (string.IsNullOrEmpty(bodyText))
                {
                    return AtparStatusCodes.EMAIL_ENTER_BODY;
                }
                objMail.Body = bodyText;

                // checks whether the Mail Format is configured, if no then setting it to HTML as default
                objMail.IsBodyHtml = true;

                // checks whether there are any attahments
                if (!string.IsNullOrEmpty(attachment))
                {
                    Attachment attachement = new Attachment(attachment);
                    objMail.Attachments.Add(attachement);
                }

                // setting the mail priority - default it is normal
                objMail.Priority = mailPriority;

                // checks whether the Username and password is configured else uses the default credentials to send the email
                System.Net.NetworkCredential SmtpCredentials = new System.Net.NetworkCredential();

                if (string.IsNullOrEmpty(strSmtpUserName) | string.IsNullOrEmpty(strSmtpPwd))
                {
                    SmtpMail.UseDefaultCredentials = true;
                }
                else
                {
                    // checks whether the Account Name (domain) is configured
                    if (string.IsNullOrEmpty(strSmtpAccountName))
                    {
                        SmtpCredentials = new System.Net.NetworkCredential(strSmtpUserName, strSmtpPwd);
                    }
                    SmtpCredentials = new System.Net.NetworkCredential(strSmtpUserName, strSmtpPwd, strSmtpAccountName);
                    SmtpMail.UseDefaultCredentials = false;
                    SmtpMail.Credentials = SmtpCredentials;
                }

                // checks whether the SSL is configured
                if (string.IsNullOrEmpty(strSmtpSSLEnabled) | strSmtpSSLEnabled.ToLower() == "no")
                {
                    SmtpMail.EnableSsl = false;
                }
                else if (strSmtpSSLEnabled.ToLower() == "yes")
                {
                    SmtpMail.EnableSsl = true;
                }



                SmtpMail.Send(objMail);
                return AtparStatusCodes.ATPAR_OK;



            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                    _log.Fatal("AtparUtils: SendEmail: Failed to get config data : " + ex.ToString());
                return AtparStatusCodes.EMAIL_SEND_FAILED;
            }


        }



        #endregion

        #endregion
    }
}

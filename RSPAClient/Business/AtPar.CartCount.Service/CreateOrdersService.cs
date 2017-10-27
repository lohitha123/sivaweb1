using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.CartCount;
using AtPar.Service.Interfaces.Common;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CartCount.Service
{
    public class CreateOrdersService : ICreateOrdersService
    {
        #region Private Variable

        ICreateOrdersRepository _createOrderRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;
        IGetHeaderService _getHeaderService;

        //Global DataTable for Cartcount
        List<VM_CART_ITEMINFO_DETAILS> actualeValuedList = new List<VM_CART_ITEMINFO_DETAILS>();
        List<VM_CART_ITEMINFO_DETAILS> duplicateValuedList = new List<VM_CART_ITEMINFO_DETAILS>();

        #endregion

        #region Constructor
        public CreateOrdersService(ICreateOrdersRepository repository, ILog log, ICommonRepository commonRepository, ICommonService commonService, IGetHeaderService cartcountCommonService)
        {
            _createOrderRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _getHeaderService = cartcountCommonService;
            _log.SetLoggerType(typeof(CreateOrdersService));

        }

        #endregion

        #region Public Methods

        #region GetCartsForBunit

        public AtParWebApiResponse<VM_CRCT_USER_ALLOCATION> GetCartsForBunit(string serverUser, string businessUnit,
                                         string orgGroupID, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_CRCT_USER_ALLOCATION>();
            List<VM_CRCT_USER_ALLOCATION> lstUserAllocation = new List<VM_CRCT_USER_ALLOCATION>();
            string cartsMngdInAtPar = string.Empty;
            try
            {
                DataTable cart_header_dt = new DataTable();
                DataTable cart_BusinessUnits = new DataTable();
                DataTable cartPreReqData = new DataTable();

                string fldOrdby = "BUSINESS_UNIT";

                cart_header_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                cart_BusinessUnits = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_BusinessUnits_Defns, AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());

                cartPreReqData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Params_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                DataRow drPreReq = cartPreReqData.NewRow();

                if (!string.IsNullOrEmpty(orgGroupID))
                {
                    SortedList<string, string> orgParams = new SortedList<string, string>();

                    orgParams[AtParWebEnums.AppParameters_Enum.CART_ALLOCATION.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()] = string.Empty;

                    _commonRepo.GetOrgGroupParamValues(orgParams, (int)AtParWebEnums.EnumApps.CartCount, orgGroupID);


                    drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.CART_ALLOCATION] = orgParams[AtParWebEnums.AppParameters_Enum.CART_ALLOCATION.ToString()];
                    drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.CARTS_MNGD_ATPAR] = orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()];
                }

                cartPreReqData.Rows.Add(drPreReq);
                DataRow drBunit = cart_BusinessUnits.NewRow();
                drBunit[(int)AtParWebEnums.Get_Cart_Header_BusinessUnits_Enum.BUSINESS_UNIT] = businessUnit;

                cart_BusinessUnits.Rows.Add(drBunit);


                if (cartPreReqData.Columns.Contains(AtParWebEnums.Get_Cart_PreReqData_Enum.CARTS_MNGD_ATPAR.ToString()))
                {
                    cartsMngdInAtPar = cartPreReqData.Rows[0][AtParWebEnums.Get_Cart_PreReqData_Enum.CARTS_MNGD_ATPAR.ToString()].ToString();
                }


                Tuple<long, DataSet> tupleResult = _getHeaderService.GetHeader(string.Empty, businessUnit, string.Empty, fldOrdby, string.Empty, deviceTokenEntry);


                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    response.AtParNotOK(tupleResult.Item1, _commonRepo, _log);
                    return response;

                }

                DataSet crtUserAllocation = tupleResult.Item2;

                // DataSet to List Conversion
                lstUserAllocation = (from rw in crtUserAllocation.Tables[0].AsEnumerable()
                                     select new VM_CRCT_USER_ALLOCATION()
                                     {
                                         CART_ID = rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID)] == null ? string.Empty : rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID)].ToString(),
                                         BUSINESS_UNIT = rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT)] == null ? string.Empty : rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT)].ToString(),
                                         DESCR = rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR)] == null ? string.Empty : rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR)].ToString(),
                                         SHADOW_FLAG = rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.SHADOW_FLAG)] == null ? string.Empty : rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.SHADOW_FLAG)].ToString(),
                                         CART_COUNT_ORDER = Convert.ToInt32(string.IsNullOrEmpty(rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_COUNT_ORDER)].ToString()) == true ? 0.ToString() : rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_COUNT_ORDER)].ToString()),
                                         TWO_BIN_ALLOCATION = rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.TWO_BIN_ALLOCATION)] == null ? string.Empty : rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.TWO_BIN_ALLOCATION)].ToString(),
                                         DEF_PERCENTAGE_VALUE = rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.DEF_PERCENTAGE_VALUE)] == null ? string.Empty : rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.DEF_PERCENTAGE_VALUE)].ToString(),
                                         LOCATION_TYPE = rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE)] == null ? string.Empty : rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE)].ToString()
                                     }).ToList();

                response.DataList = lstUserAllocation;
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

        #region GetCartPrevCounts
        public AtParWebApiResponse<long> GetCartPrevCounts(string orgGroupID, string businessUnit, string ID, string serverUser,
                                                          string profileID, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            var responseCartInfo = new AtParWebApiResponse<long>();

            List<VM_CART_ITEMINFO_HEADER> lstCartHdr = new List<VM_CART_ITEMINFO_HEADER>();
            List<VM_CART_ITEMINFO_DETAILS> lstCartDtls = new List<VM_CART_ITEMINFO_DETAILS>();

            string strEnterPriseSystem = string.Empty;
            string strDay = string.Empty;
            string strMonth = string.Empty;
            string strYear = string.Empty;

            //ref
            long transId = -1;
            string parLocType = string.Empty;
            string reqNo = string.Empty;
            string allDateString = string.Empty;
            DateTime creationdate = new DateTime();


            try
            {

                responseCartInfo = _commonService.GetCartItemsInfo(orgGroupID, businessUnit, ID, serverUser, deviceTokenEntry);


                if (responseCartInfo.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(responseCartInfo.StatusCode, _commonRepo, _log);
                    return response;
                }

                if (responseCartInfo.DataDictionary.Count > 0)
                {

                    Dictionary<string, dynamic> CartItemsInfo = responseCartInfo.DataDictionary;

                    foreach (var keyValuePair in CartItemsInfo)
                    {
                        switch (keyValuePair.Key)
                        {
                            case "listHeaders":
                                foreach (var item in keyValuePair.Value)
                                {
                                    var cartHdr = new VM_CART_ITEMINFO_HEADER
                                    {

                                        USER_ID = item.USER_ID,
                                        BUSINESS_UNIT = item.BUSINESS_UNIT,
                                        DESCR = item.DESCR,
                                        SHADOW_FLAG = item.SHADOW_FLAG,
                                        QTY_OPTION = item.QTY_OPTION,
                                        DEPT_ID = item.DEPT_ID,
                                        TRANS_ID = item.TRANS_ID,
                                        CART_ID = item.CART_ID,
                                        ORG_ID = item.ORG_ID,
                                        INV_BUSINESS_UNIT = item.INV_BUSINESS_UNIT,
                                        YEAR = item.YEAR,
                                        MONTH = item.MONTH,
                                        DAY = item.DAY,
                                        REQ_NO = item.REQ_NO
                                    };

                                    lstCartHdr.Add(cartHdr);

                                }
                                break;

                            case "listDetails":
                                foreach (var item in keyValuePair.Value)
                                {
                                    var cartDtls = new VM_CART_ITEMINFO_DETAILS
                                    {
                                        INV_ITEM_ID = item.INV_ITEM_ID,
                                        COMPARTMENT = item.COMPARTMENT,
                                        ITEM_DESCR = item.ITEM_DESCR,
                                        MFG_ITEM_ID = item.MFG_ITEM_ID,
                                        VENDOR_ITEM_ID = item.VENDOR_ITEM_ID,
                                        UPN_ID = item.UPN_ID,
                                        ITEM_NDC = item.ITEM_NDC,
                                        ITEM_GTIN = item.ITEM_GTIN,
                                        ITEM_PRICE = item.ITEM_PRICE,
                                        COUNT_ORDER = item.COUNT_ORDER,
                                        OPTIMAL_QTY = item.OPTIMAL_QTY,
                                        FOQ = item.FOQ,
                                        COUNT_REQD = item.COUNT_REQD,
                                        CART_REPLEN_CTRL = item.CART_REPLEN_CTRL,
                                        CART_REPLEN_OPT = item.CART_REPLEN_OPT,
                                        CONS_NON_STOCK = item.CONS_NON_STOCK,
                                        INVENTORY_ITEM = item.INVENTORY_ITEM,
                                        ORDER_QTY = item.ORDER_QTY,
                                        UOM = item.UOM,
                                        MAX_QTY = item.MAX_QTY,
                                        FILLKILL = item.FILLKILL,
                                        CUST_ITEM_ID = item.CUST_ITEM_ID,
                                        LOT_CONTROLLED = item.LOT_CONTROLLED,
                                        SERIAL_CONTROLLED = item.SERIAL_CONTROLLED,
                                        CONV_FACTOR = item.CONV_FACTOR,
                                        CHARGE_CODE = item.CHARGE_CODE,
                                        VENDOR_NAME = item.VENDOR_NAME,
                                        UOM_PROC = item.UOM_PROC,
                                        QTY_OPTION = item.QTY_OPTION,
                                        LAST_ORDER_DATE = item.LAST_ORDER_DATE,
                                        STATUS = item.STATUS,
                                        PACKAGING_STRING = item.PACKAGING_STRING,
                                        MFG_ID = item.MFG_ID,
                                        CONSIGNMENT_ITEM = item.CONSIGNMENT_ITEM,
                                        REPORT_FIELD_1 = item.REPORT_FIELD_1,
                                        REPORT_FIELD_2 = item.REPORT_FIELD_2,
                                        REPORT_FIELD_3 = item.REPORT_FIELD_3,
                                        REPORT_FIELD_4 = item.REPORT_FIELD_4,
                                        ITEM_TYPE = item.ITEM_TYPE,
                                        SUBSTITUTE_ITEM_FLG = item.SUBSTITUTE_ITEM_FLG,
                                        USER_FIELD_2 = item.USER_FIELD_2,
                                        IMPLANT_FLAG = item.IMPLANT_FLAG,
                                        ITEM_MASTER_ITEM_STATUS = item.ITEM_MASTER_ITEM_STATUS,
                                        NON_CART_ITEM_STATUS = item.NON_CART_ITEM_STATUS,
                                        BILL_ITEM_STATUS = item.BILL_ITEM_STATUS,
                                        PAR_LOC_STATUS = item.PAR_LOC_STATUS,
                                        ITEM_MASTER_STATUS = item.ITEM_MASTER_STATUS,
                                        ITEM_BU_STATUS = item.ITEM_BU_STATUS,
                                        INFO_2 = item.INFO_2,
                                        INFO_3 = item.INFO_3,
                                        ChkValue = item.ChkValue,
                                        ChkField = item.ChkField,
                                        DATE_1 = item.DATE_1,
                                        DATE_2 = item.DATE_2,
                                        DATE_3 = item.DATE_3,
                                        DATE_4 = item.DATE_4,
                                        DATE_5 = item.DATE_5,
                                        ROWINDEX = 0,
                                        COUNTQTY = string.Empty
                                    };
                                    lstCartDtls.Add(cartDtls);

                                }
                                break;
                        }
                    }


                    if (lstCartHdr.Count > 0)
                    {
                        parLocType = lstCartHdr[0].QTY_OPTION;

                        _getHeaderService.GetConfigData();

                        List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                        List<string> lstParameters = new List<string>();
                        lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                        lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                        strEnterPriseSystem = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                          x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString())
                          .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                        if (strEnterPriseSystem.ToUpper() == AtParWebEnums.Enterprise_Enum.IMMS.ToString().ToUpper() ||
                            strEnterPriseSystem.ToUpper() == AtParWebEnums.Enterprise_Enum.Meditech_ASCII.ToString().ToUpper())
                        {

                            if (lstCartHdr[0].REQ_NO != null)
                            {
                                if (!string.IsNullOrEmpty(lstCartHdr[0].REQ_NO))
                                {
                                    reqNo = lstCartHdr[0].REQ_NO;

                                    if (_log.IsDebugEnabled)
                                    {
                                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ": Requisition number is : " + reqNo + ":"); }

                                    }
                                }
                            }


                            if (lstCartHdr[0].DAY != null)
                            {
                                if (!string.IsNullOrEmpty(lstCartHdr[0].DAY))
                                {
                                    strDay = lstCartHdr[0].DAY;

                                }
                            }


                            if (lstCartHdr[0].MONTH != null)
                            {
                                if (!string.IsNullOrEmpty(lstCartHdr[0].MONTH))
                                {
                                    strMonth = lstCartHdr[0].MONTH;

                                }
                            }



                            if (lstCartHdr[0].YEAR != null)
                            {
                                if (!string.IsNullOrEmpty(lstCartHdr[0].YEAR))
                                {
                                    strYear = lstCartHdr[0].YEAR;

                                }
                            }



                            if (!string.IsNullOrEmpty(strDay) && !string.IsNullOrEmpty(strMonth) && !string.IsNullOrEmpty(strYear))
                            {
                                creationdate = Convert.ToDateTime(strYear + "/" + strMonth + "/" + strDay);

                                if (_log.IsDebugEnabled)
                                {
                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ": Date from input ds is :" + creationdate); }

                                }
                            }
                        }
                    }


                    if (lstCartDtls.Count > 0)
                    {
                        foreach (var item in lstCartDtls)
                        {
                            switch (item.CART_REPLEN_OPT)
                            {
                                case "01":
                                case "1":
                                    item.INVENTORY_ITEM = AtParWebEnums.Cart_File_Type.STOCK.ToString();
                                    break;

                                case "02":
                                case "2":
                                    item.INVENTORY_ITEM = AtParWebEnums.Cart_File_Type.NONSTOCK.ToString();
                                    break;
                                case "03":
                                case "3":
                                    item.INVENTORY_ITEM = AtParWebEnums.Cart_File_Type.STOCKLESS.ToString();
                                    break;
                                case "04":
                                case "4":
                                    item.INVENTORY_ITEM = AtParWebEnums.Cart_File_Type.CONSIGN.ToString();
                                    break;
                                case "05":
                                case "5":
                                    item.INVENTORY_ITEM = AtParWebEnums.Cart_File_Type.STOCKTRANSFER.ToString();
                                    break;
                            }
                        }
                    }
                }

                actualeValuedList = lstCartDtls;
                duplicateValuedList = lstCartDtls;

                List<MT_ATPAR_TRANSACTION> lstTranscations = _createOrderRepo.GetTransactionRecords(orgGroupID, businessUnit, ID);

                string strDateValue1 = string.Empty;
                string strDateValue2 = string.Empty;
                string strDateValue3 = string.Empty;
                string strDateValue4 = string.Empty;
                string strDateValue5 = string.Empty;
                string strDateValue6 = string.Empty;
                string strDateValue7 = string.Empty;
                string strDateValue8 = string.Empty;
                string strDateValue9 = string.Empty;
                string strDateValue10 = string.Empty;


                if (lstCartDtls != null && lstCartDtls.Count > 0)
                {
                    if (lstTranscations != null && lstTranscations.Count > 0)
                    {

                        switch (lstTranscations.Count)
                        {
                            case 5:
                                strDateValue1 = lstTranscations[0].DATESTRING;
                                strDateValue2 = lstTranscations[1].DATESTRING;
                                strDateValue3 = lstTranscations[2].DATESTRING;
                                strDateValue4 = lstTranscations[3].DATESTRING;
                                strDateValue5 = lstTranscations[4].DATESTRING;
                                strDateValue6 = lstTranscations[0].DATESTRING + " " + lstTranscations[0].UPDATE_DAY;
                                strDateValue7 = lstTranscations[1].DATESTRING + " " + lstTranscations[1].UPDATE_DAY;
                                strDateValue8 = lstTranscations[2].DATESTRING + " " + lstTranscations[2].UPDATE_DAY;
                                strDateValue9 = lstTranscations[3].DATESTRING + " " + lstTranscations[3].UPDATE_DAY;
                                strDateValue10 = lstTranscations[4].DATESTRING + " " + lstTranscations[4].UPDATE_DAY;
                                allDateString = DateTime.Parse(strDateValue6).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[0].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue7).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[1].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue8).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[2].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue9).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[3].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue10).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[4].UPDATE_DAY;

                                break;
                            case 4:
                                strDateValue1 = lstTranscations[0].DATESTRING;
                                strDateValue2 = lstTranscations[1].DATESTRING;
                                strDateValue3 = lstTranscations[2].DATESTRING;
                                strDateValue4 = lstTranscations[3].DATESTRING;
                                strDateValue6 = lstTranscations[0].DATESTRING + " " + lstTranscations[0].UPDATE_DAY;
                                strDateValue7 = lstTranscations[1].DATESTRING + " " + lstTranscations[1].UPDATE_DAY;
                                strDateValue8 = lstTranscations[2].DATESTRING + " " + lstTranscations[2].UPDATE_DAY;
                                strDateValue9 = lstTranscations[3].DATESTRING + " " + lstTranscations[3].UPDATE_DAY;
                                strDateValue10 = "1/1/1900 00:00:00 PM ";
                                allDateString = DateTime.Parse(strDateValue6).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[0].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue7).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[1].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue8).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[2].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue9).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[3].UPDATE_DAY;

                                break;
                            case 3:
                                strDateValue1 = lstTranscations[0].DATESTRING;
                                strDateValue2 = lstTranscations[1].DATESTRING;
                                strDateValue3 = lstTranscations[2].DATESTRING;
                                strDateValue6 = lstTranscations[0].DATESTRING + " " + lstTranscations[0].UPDATE_DAY;
                                strDateValue7 = lstTranscations[1].DATESTRING + " " + lstTranscations[1].UPDATE_DAY;
                                strDateValue8 = lstTranscations[2].DATESTRING + " " + lstTranscations[2].UPDATE_DAY;
                                strDateValue9 = "1/1/1900 00:00:01 PM ";
                                strDateValue10 = "1/1/1900 00:00:00 PM ";
                                allDateString = DateTime.Parse(strDateValue6).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[0].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue7).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[1].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue8).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[2].UPDATE_DAY;
                                break;
                            case 2:
                                strDateValue1 = lstTranscations[0].DATESTRING;
                                strDateValue2 = lstTranscations[1].DATESTRING;
                                strDateValue6 = lstTranscations[0].DATESTRING + " " + lstTranscations[0].UPDATE_DAY;
                                strDateValue7 = lstTranscations[1].DATESTRING + " " + lstTranscations[1].UPDATE_DAY;
                                strDateValue8 = "1/1/1900 00:00:02 PM ";
                                strDateValue9 = "1/1/1900 00:00:01 PM ";
                                strDateValue10 = "1/1/1900 00:00:00 PM ";
                                allDateString = DateTime.Parse(strDateValue6).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[0].UPDATE_DAY + "," +
                                                DateTime.Parse(strDateValue7).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[1].UPDATE_DAY;

                                break;
                            case 1:
                                strDateValue1 = lstTranscations[0].DATESTRING;
                                strDateValue6 = lstTranscations[0].DATESTRING + " " + lstTranscations[0].UPDATE_DAY;
                                strDateValue7 = "1/1/1900 00:00:03 PM ";
                                strDateValue8 = "1/1/1900 00:00:02 PM ";
                                strDateValue9 = "1/1/1900 00:00:01 PM ";
                                strDateValue10 = "1/1/1900 00:00:00 PM ";
                                allDateString = DateTime.Parse(strDateValue6).ToString("MM/dd/yyyy HH:mm:ss",
                                                CultureInfo.InvariantCulture) + " " + lstTranscations[0].UPDATE_DAY;
                                break;
                            case 0:
                                strDateValue6 = "1/1/1900 00:00:04 PM ";
                                strDateValue7 = "1/1/1900 00:00:03 PM ";
                                strDateValue8 = "1/1/1900 00:00:02 PM ";
                                strDateValue9 = "1/1/1900 00:00:01 PM ";
                                strDateValue10 = "1/1/1900 00:00:00 PM ";
                                allDateString = string.Empty;

                                break;

                        }
                    }
                }
                else
                {
                    strDateValue6 = "1/1/1900 00:00:04 PM ";
                    strDateValue7 = "1/1/1900 00:00:03 PM ";
                    strDateValue8 = "1/1/1900 00:00:02 PM ";
                    strDateValue9 = "1/1/1900 00:00:01 PM ";
                    strDateValue10 = "1/1/1900 00:00:00 PM ";
                }


                string strIds = string.Empty;

                foreach (var item in lstCartDtls)
                {
                    if (item.INV_ITEM_ID != null)
                    {
                        if ((strIds != string.Empty || strIds != string.Empty))
                        {
                            strIds = strIds + "," + item.INV_ITEM_ID;
                        }
                        else
                        {
                            strIds = strIds + item.INV_ITEM_ID;
                        }
                    }
                }

                if (_log.IsDebugEnabled)
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":total item Ids are  : " + strIds); }

                }

                Tuple<List<string>, List<string>> tupleItemIds;
                tupleItemIds = _createOrderRepo.GetItemIds(strIds);

                if (tupleItemIds != null && tupleItemIds.Item1.Count > 0)
                {
                    if (_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The Actual ids count is   : " + tupleItemIds.Item1.Count); }

                    }

                }

                if (tupleItemIds != null && tupleItemIds.Item2.Count > 1)
                {
                    if (_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The repeated ids count is : " + tupleItemIds.Item2.Count); }

                    }

                }
                string itemIdValues = string.Empty;

                if (tupleItemIds != null && tupleItemIds.Item1.Count > 0)
                {
                    for (int i = 0; i < tupleItemIds.Item1.Count; i++)
                    {
                        if (itemIdValues != string.Empty)
                        {
                            itemIdValues = itemIdValues + "," + tupleItemIds.Item1[i];
                        }
                        else
                        {
                            itemIdValues = itemIdValues + tupleItemIds.Item1[i];
                        }


                    }
                }

                if (_log.IsDebugEnabled)
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The non repeated ids are  : " + itemIdValues); }

                }
                // To get the repeated ids with their compartment ids
                string strRepeatedItemIds = string.Empty;

                if (tupleItemIds != null && tupleItemIds.Item2.Count > 0)
                {
                    for (int i = 0; i < tupleItemIds.Item2.Count; i++)
                    {
                        foreach (var details in lstCartDtls)
                        {
                            if (tupleItemIds.Item2[i] == details.INV_ITEM_ID)
                            {
                                if (strRepeatedItemIds != string.Empty)
                                {
                                    strRepeatedItemIds = strRepeatedItemIds + "," + details.INV_ITEM_ID + "&" + details.COMPARTMENT;
                                }
                                else
                                {
                                    strRepeatedItemIds = strRepeatedItemIds + details.INV_ITEM_ID + "&" + details.COMPARTMENT;
                                }
                            }
                        }
                    }

                }


                if (_log.IsDebugEnabled)
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The repeated ids are : " + strRepeatedItemIds); }

                }

                if (_log.IsDebugEnabled)
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The total no of rows : " + lstCartDtls.Count); }

                }

                // Getting the data values in to the original table
                VM_CART_ITEMINFO_DETAILS newRow = null;
                List<VM_CART_ITEMINFO_DETAILS> lstactualeValuedList = new List<VM_CART_ITEMINFO_DETAILS>();


                int nor = 0;
                if (tupleItemIds != null && tupleItemIds.Item1.Count > 0)
                {
                    nor = lstCartDtls.Count;

                    foreach (var item in tupleItemIds.Item1)
                    {
                        for (int i = 0; i < nor; i++)
                        {
                            if (item.ToString() == lstCartDtls[i].INV_ITEM_ID)
                            {
                                newRow = BuildNewRow_CreateOrders(lstCartDtls[i], serverUser);
                                lstactualeValuedList.Add(newRow);
                            }
                        }

                    }
                }


                if (lstactualeValuedList != null && lstactualeValuedList.Count > 0)
                {
                    if (_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The total no of non repeated records count is : " + lstactualeValuedList.Count); }
                    }
                }

                VM_CART_ITEMINFO_DETAILS row = null;
                List<VM_CART_ITEMINFO_DETAILS> lstduplicateValuedList = new List<VM_CART_ITEMINFO_DETAILS>();
                int noOfRec = 0;
                if (tupleItemIds != null && tupleItemIds.Item2.Count > 0)
                {
                    noOfRec = lstCartDtls.Count;

                    foreach (var item in tupleItemIds.Item2)
                    {
                        for (int i = 0; i < noOfRec; i++)
                        {
                            if (item.ToString() == lstCartDtls[i].INV_ITEM_ID)
                            {
                                row = BuildNewRow_CreateOrders(lstCartDtls[i], serverUser);
                                lstduplicateValuedList.Add(row);
                            }
                        }

                    }
                }



                if (lstduplicateValuedList != null && lstduplicateValuedList.Count > 0)
                {
                    if (_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The total no of repeated records count is : " + lstduplicateValuedList.Count); }
                    }
                }


                List<VM_ATPAR_CART_PREV_COUNTS> lstItemDetails = null;
                if (itemIdValues != string.Empty)
                {
                    itemIdValues = "," + itemIdValues + ",";

                    lstItemDetails = _createOrderRepo.GetItemIdDetails(itemIdValues, strDateValue1, strDateValue2, strDateValue3, strDateValue4, strDateValue5);


                    if (lstItemDetails != null && lstItemDetails.Count > 0)
                    {
                        if (_log.IsDebugEnabled)
                        {
                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The total non repeated values are   : " + lstItemDetails.Count); }
                        }
                    }
                }



                List<VM_ATPAR_CART_PREV_COUNTS> lstRepeatedIds = null;
                if (strRepeatedItemIds != string.Empty)
                {
                    strRepeatedItemIds = "," + strRepeatedItemIds + ",";

                    lstRepeatedIds = _createOrderRepo.GetDetailsForRepeatedIds(ID, strDateValue1, strDateValue2, strDateValue3, strDateValue4, strDateValue5);
                }
                if (lstRepeatedIds != null && lstRepeatedIds.Count > 0)
                {
                    if (_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The total repeated values are   : " + lstRepeatedIds.Count); }
                    }
                }



                int noOfIds = 0;
                if (lstItemDetails != null && lstItemDetails.Count > 0)
                {
                    noOfIds = lstItemDetails.Count / 5;

                    if (_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The total no of rows are : " + noOfIds); }
                    }

                    for (int i = 0; i < noOfIds; i++)
                    {
                        lstactualeValuedList[i].DATE_1 = (lstItemDetails[(i * 5) + 0]).QTY > -1 ? lstItemDetails[(i * 5) + 0].QTY.ToString() : "NC";
                        lstactualeValuedList[i].DATE_2 = (lstItemDetails[(i * 5) + 1]).QTY > -1 ? lstItemDetails[(i * 5) + 1].QTY.ToString() : "NC";
                        lstactualeValuedList[i].DATE_3 = (lstItemDetails[(i * 5) + 2]).QTY > -1 ? lstItemDetails[(i * 5) + 2].QTY.ToString() : "NC";
                        lstactualeValuedList[i].DATE_4 = (lstItemDetails[(i * 5) + 3]).QTY > -1 ? lstItemDetails[(i * 5) + 3].QTY.ToString() : "NC";
                        lstactualeValuedList[i].DATE_5 = (lstItemDetails[(i * 5) + 4]).QTY > -1 ? lstItemDetails[(i * 5) + 4].QTY.ToString() : "NC";
                    }
                }

                int noOfRepeatedIds = 0;
                if (lstRepeatedIds != null && lstRepeatedIds.Count > 0)
                {
                    noOfRepeatedIds = lstRepeatedIds.Count / 5;

                    if (_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":The total no of repeated rows are : " + noOfRepeatedIds); }
                    }

                    for (int i = 0; i < noOfRepeatedIds - 1; i++)
                    {
                        lstduplicateValuedList[i].DATE_1 = (lstRepeatedIds[(i * 5) + 0]).QTY > -1 ? lstRepeatedIds[(i * 5) + 0].QTY.ToString() : "NC";
                        lstduplicateValuedList[i].DATE_2 = (lstRepeatedIds[(i * 5) + 1]).QTY > -1 ? lstRepeatedIds[(i * 5) + 1].QTY.ToString() : "NC";
                        lstduplicateValuedList[i].DATE_3 = (lstRepeatedIds[(i * 5) + 2]).QTY > -1 ? lstRepeatedIds[(i * 5) + 2].QTY.ToString() : "NC";
                        lstduplicateValuedList[i].DATE_3 = (lstRepeatedIds[(i * 5) + 3]).QTY > -1 ? lstRepeatedIds[(i * 5) + 3].QTY.ToString() : "NC";
                        lstduplicateValuedList[i].DATE_5 = (lstRepeatedIds[(i * 5) + 4]).QTY > -1 ? lstRepeatedIds[(i * 5) + 4].QTY.ToString() : "NC";

                    }
                }

                int idx = 0;
                foreach (VM_CART_ITEMINFO_DETAILS item in lstactualeValuedList)
                {
                    item.ROWINDEX = idx;
                    item.COUNTQTY = item.DATE_1;
                    idx++;
                }

                //Sort by COUNT_ORDER
                lstactualeValuedList = lstactualeValuedList.OrderBy(x => x.COUNT_ORDER).ToList();

                lstactualeValuedList = lstactualeValuedList.OrderBy(x => x.INV_ITEM_ID).ToList();

                transId = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.CartCount);

                response.DataDictionary = new Dictionary<string, object> { { "lstPrevCnts", lstactualeValuedList }, { "allDateString", allDateString }, { "transID", transId }, { "parLocType", parLocType }, { "reqNo", reqNo }, { "creationdate", creationdate }, { "lstCartHdr", lstCartHdr } };
                response.AtParSuccess();
                return response;
            }

            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private VM_CART_ITEMINFO_DETAILS BuildNewRow_CreateOrders(VM_CART_ITEMINFO_DETAILS origRow, string serverUser)
        {
            VM_CART_ITEMINFO_DETAILS newRow = new VM_CART_ITEMINFO_DETAILS();
            try
            {

                newRow.INV_ITEM_ID = origRow.INV_ITEM_ID;
                newRow.ITEM_DESCR = origRow.ITEM_DESCR;
                newRow.ITEM_PRICE = origRow.ITEM_PRICE;
                newRow.UOM = origRow.UOM;
                newRow.COMPARTMENT = origRow.COMPARTMENT;
                newRow.INVENTORY_ITEM = origRow.INVENTORY_ITEM;
                newRow.OPTIMAL_QTY = origRow.OPTIMAL_QTY;
                newRow.QTY_OPTION = origRow.QTY_OPTION;
                newRow.CART_REPLEN_CTRL = origRow.CART_REPLEN_CTRL;
                newRow.CART_REPLEN_OPT = origRow.CART_REPLEN_OPT;
                newRow.COUNT_ORDER = origRow.COUNT_ORDER;
                newRow.MAX_QTY = origRow.MAX_QTY;
                newRow.FOQ = origRow.FOQ;
                newRow.CUST_ITEM_ID = origRow.CUST_ITEM_ID;
                newRow.ChkValue = origRow.ChkValue;
                newRow.DATE_1 = origRow.DATE_1;
                newRow.DATE_2 = origRow.DATE_2;
                newRow.DATE_3 = origRow.DATE_3;
                newRow.DATE_4 = origRow.DATE_4;
                newRow.DATE_5 = origRow.DATE_5;

                return newRow;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        #endregion

        #region SendCartCounts
        public AtParWebApiResponse<MT_CRCT_USER_ALLOCATION> SendCartCounts(Dictionary<string, dynamic> dicDataItems, string serverUser, string businessUnit, string ID, string profileID, string orgGroupID, int transID, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>();

            DataSet dsDataItems = new DataSet();
            DataSet outputParameters = new DataSet();
            DataTable dt_cart_preq = new DataTable();
            DataTable dtCartHeader = new DataTable();
            DataTable dtCartDetails = new DataTable();
            List<VM_CART_HEADER> lstCartHeader = new List<VM_CART_HEADER>();
            List<VM_CART_DETAILS> lstCartDetails = new List<VM_CART_DETAILS>();

            string strCostCenter = string.Empty;
            long StatusCode = -1;
            Tuple<long, DataSet> tupleOutput;

            try
            {

                dtCartHeader = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_Header_Defns,
                        AtParWebEnums.DataSet_Type.HEADERS.ToString());

                dtCartDetails = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_Details_Defns,
                         AtParWebEnums.DataSet_Type.DETAILS.ToString());

                foreach (var keyValuePair in dicDataItems)
                {
                    switch (keyValuePair.Key)
                    {
                        case "HEADER":

                            var hdrColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {

                                DataRow _drHed = dtCartHeader.NewRow();
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID] = item.TRANSACTION_ID;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT] = item.BUSINESS_UNIT;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID] = item.CART_ID;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.START_DATETIME] = item.START_DATETIME;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.END_DATETIME] = item.END_DATETIME;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.USER_ID] = item.USER_ID;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.TOTAL_RECORDS] = item.TOTAL_RECORDS;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.NO_OF_SCANS] = item.NO_OF_SCANS;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.NO_OF_ORDERED_ITEMS] = item.NO_OF_ORDERED_ITEMS;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.QUANTITY_OPTION] = item.QUANTITY_OPTION;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.CARTFLAG] = item.CARTFLAG;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.CMTS] = item.CMTS;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.ALLOCATED_USER] = item.ALLOCATED_USER;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.CREATION_DT] = item.CREATION_DT;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.REQ_NO] = item.REQ_NO;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.DESCR] = item.DESCR;

                                dtCartHeader.Rows.Add(_drHed);
                            }

                            break;

                        case "DETAILS":
                            var detailColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {
                                DataRow _drDet = dtCartDetails.NewRow();
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID] = item.ITEM_ID;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_DESCR] = item.ITEM_DESCR;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT] = item.COMPARTMENT;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_QUANTITY] = item.COUNT_QUANTITY;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY] = item.OPTIMAL_QUANTITY;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_REQUIRED] = item.COUNT_REQUIRED;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.PRICE] = item.PRICE == null ? Convert.ToDouble(0) : Convert.ToDouble(item.PRICE);
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.CRITICAL_ITEM] = item.CRITICAL_ITEM + "";
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.INVENTORY_ITEM] = item.INVENTORY_ITEM;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.UOM] = item.UOM;

                                if (item.NEW_OPTIMAL_QUANTITY == null)
                                {
                                    _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY] = item.OPTIMAL_QUANTITY;
                                }
                                else
                                {
                                    _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY] = item.NEW_OPTIMAL_QUANTITY;
                                }

                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.FILL_KILL_FLAG] = item.FILL_KILL_FLAG;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.LNCMTS] = item.LNCMTS;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_CTRL] = item.CART_REPLEN_CTRL;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.MAX_QTY] = item.MAX_QTY;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.FOQ] = item.FOQ;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.CUST_ITEM_NO] = item.CUST_ITEM_NO;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.VENDOR_ID] = item.VENDOR_ID;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.CONV_FACTOR] = item.CONV_FACTOR;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_OPT] = item.CART_REPLEN_OPT;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.LOC_TYPE] = item.LOC_TYPE;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.ACT_QOH] = item.ACT_QOH + "" == "" ? Convert.ToDouble(0) : Convert.ToDouble(item.ACT_QOH);
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_COUNT_ORDER] = item.ITEM_COUNT_ORDER;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.ORDER_QUANTITY] = item.ORDER_QUANTITY + "" == "" ? Convert.ToDouble(0) : Convert.ToDouble(item.ORDER_QUANTITY);

                                dtCartDetails.Rows.Add(_drDet);
                            }

                            break;
                    }
                }

                dsDataItems.Tables.Add(dtCartHeader);
                dsDataItems.Tables.Add(dtCartDetails);


                dt_cart_preq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_BusinessRules_Defns,
                          AtParWebEnums.DataSet_Type.PREREQDATA.ToString());
                dsDataItems.Tables.Add(dt_cart_preq);



                StatusCode = Populate_SendDetails_Prerequisites(ref dsDataItems, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                StatusCode = Populate_SendDetails_OutputParameters(outputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                if (dsDataItems.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    strCostCenter = _createOrderRepo.GetCostCenter(dsDataItems);
                }

                POCOEntities.AtPar_Transaction_Entity transactionDetails = new POCOEntities.AtPar_Transaction_Entity();

                transactionDetails.TransactionId = (int)transID;
                transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CartCount;
                transactionDetails.ID = dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString();
                transactionDetails.BusinessUnit = dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT].ToString();
                transactionDetails.Status = (int)AtParWebEnums.AppTransactionStatus.Downloaded;
                transactionDetails.TotalRecordDownloaded = (dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TOTAL_RECORDS]).ToString() == "" ? 0 : Convert.ToInt32(dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TOTAL_RECORDS]);
                transactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                transactionDetails.DeviceId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].ToString();
                transactionDetails.DownloadUserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                transactionDetails.ReportData4 = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                transactionDetails.StartDateTime = DateTime.Now;
                transactionDetails.EndDateTime = DateTime.Now;
                transactionDetails.ReportData2 = orgGroupID;
                transactionDetails.EndDateTime = DateTime.Now;
                transactionDetails.ReportData3 = dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.QUANTITY_OPTION].ToString();
                transactionDetails.ReportData5 = strCostCenter;
                transactionDetails.ReportData13 = dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.REQ_NO].ToString();
                transactionDetails.Description= dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.DESCR].ToString();

                Nullable<DateTime> ReportData6 = null;
                if (dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CREATION_DT + ""] == string.Empty)
                {
                    transactionDetails.ReportData6 = Convert.ToDateTime(ReportData6);
                }
                else
                {
                    transactionDetails.ReportData6 = Convert.ToDateTime(dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CREATION_DT + ""].ToString());
                }
                //transactionDetails.ReportData6= (dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CREATION_DT + ""] == DBNull.Value) ? (DateTime?)null : ((DateTime)dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CREATION_DT + ""]);


                StatusCode = _commonRepo.InsertTransaction(transactionDetails);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    dsDataItems.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString();

                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                tupleOutput = GetERPCarts(ref dsDataItems, deviceTokenEntry);

                StatusCode = tupleOutput.Item1;

                transactionDetails.TransactionId = transID;
                transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CartCount;

                //need to do

                if (tupleOutput.Item1 == AtparStatusCodes.ATPAR_OK)
                {
                    transactionDetails.Status = (int)AtParWebEnums.AppTransactionStatus.RemoteSucess;
                }
                else if (tupleOutput.Item1 == AtparStatusCodes.CRCT_E_COUNTEXISTS ||
                    tupleOutput.Item1 == AtparStatusCodes.E_NORECORDFOUND ||
                    tupleOutput.Item1 == AtparStatusCodes.CRCT_E_ERRORCOUNTEXISTS ||
                    tupleOutput.Item1 == AtparStatusCodes.CRCT_E_CARTDOESNOTEXIST ||
                    tupleOutput.Item1 == AtparStatusCodes.ATPAR_E_CUSTOMSTR)
                {
                    transactionDetails.Status = (int)AtParWebEnums.AppTransactionStatus.Error;
                }
                else
                {
                    transactionDetails.Status = (int)AtParWebEnums.AppTransactionStatus.Error;
                }

                transactionDetails.TransactionId = transID;
                transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CartCount;


                transactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                transactionDetails.StatusCode = Convert.ToInt32(StatusCode);

                long _StatusCode = _commonRepo.UpdateTransaction(transactionDetails);

                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }


                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (StatusCode == AtparStatusCodes.ATPAR_E_CUSTOMSTR)
                    {
                        dsDataItems = new DataSet();
                        dsDataItems.AcceptChanges();
                    }
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                _StatusCode = Execute_SendDetails_PostProcess(dsDataItems, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {

                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;

                }

                _StatusCode = Execute_SendDetails_ProcessOutput(dsDataItems, deviceTokenEntry);

                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
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

        private Tuple<long, DataSet> GetERPCarts(ref DataSet inputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<long, DataSet> tupleOutput = null;

            DataSet outputParameters = new DataSet();

            try
            {
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //Initializing 
                _getHeaderService.GetConfigData();


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() && x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                {

                    erpObjName = AtParWebEnums.Erp_Obj_Name.CartCount_Atpar.ToString();
                }
                else
                {
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
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                    return tupleOutput;
                }

                outputParameters = (DataSet)args[0];

                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, outputParameters);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }
        }

        private long Execute_SendDetails_PostProcess(DataSet inputParameters, string[] deviceTokenEntry)
        {
            long StatusCode = -1;
            string strCountBefore = string.Empty;

            try
            {
                foreach (DataRow dr in inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows)
                {
                    StatusCode = InsertCartItemDeviation(inputParameters, deviceTokenEntry, dr);

                    StatusCode = _createOrderRepo.InsertPreviousCounts(inputParameters, dr);

                    if (dr[(int)AtParWebEnums.Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY].ToString() != null)
                    {
                        StatusCode = _createOrderRepo.InsertParAudit(inputParameters, dr);
                    }
                    strCountBefore = _createOrderRepo.GetCountBefore(inputParameters);

                    POCOEntities.AtPar_Transaction_Entity transactionDetails = new POCOEntities.AtPar_Transaction_Entity();

                    transactionDetails.TransactionId = Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID].ToString());
                    transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CartCount;
                    transactionDetails.Status = (int)AtParWebEnums.AppTransactionStatus.Sent;
                    transactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                    transactionDetails.StartDateTime = DateTime.Now;
                    transactionDetails.EndDateTime = DateTime.Now;
                    transactionDetails.TotalRecordSent =
                     (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.NO_OF_ORDERED_ITEMS]).ToString() == "" ? 0 : Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.NO_OF_ORDERED_ITEMS]);

                    transactionDetails.StatusCode = Convert.ToInt32(AtparStatusCodes.ATPAR_OK);
                    transactionDetails.ScansCount = (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.NO_OF_SCANS]).ToString() == "" ? 0 : Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.NO_OF_SCANS]);
                    transactionDetails.ReportData8 = strCountBefore;
                    transactionDetails.ReportData9 = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.NO_OF_ORDERED_ITEMS].ToString();

                    StatusCode = _commonRepo.UpdateTransaction(transactionDetails);

                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private long InsertCartItemDeviation(DataSet inputParameters, string[] deviceTokenEntry, DataRow detailRow)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string cart_id = string.Empty;
            string business_unit = string.Empty;
            string strQtyOption = string.Empty;
            string cartPutaway = string.Empty;
            string qty_round = string.Empty;
            string calc_req_qty = string.Empty;
            DataSet outputParameters = new DataSet();

            try
            {

                Double countQty = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_QUANTITY] == null ? 0 : Convert.ToDouble(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_QUANTITY]);
                Double optQty = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY] == null ? 0 : Convert.ToDouble(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY]);

                cart_id = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString();
                business_unit = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT].ToString();
                strQtyOption = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.QUANTITY_OPTION].ToString();
                cartPutaway = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.PUTAWAY_CART_ITEMS].ToString();

                if (!string.IsNullOrEmpty(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.QTY_ROUND_TYPE].ToString()))
                {
                    qty_round = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.QTY_ROUND_TYPE].ToString();
                }
                else
                {
                    qty_round = string.Empty;
                }


                if (!string.IsNullOrEmpty(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CALCULATE_REQ_QTY].ToString()))
                {
                    calc_req_qty = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CALCULATE_REQ_QTY].ToString();
                }
                else
                {
                    calc_req_qty = string.Empty;
                }

                int requestQty = GetRequestQty(detailRow, strQtyOption, calc_req_qty, business_unit, cartPutaway, cart_id);

                if (requestQty <= 0)
                {
                    if (_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ": Item ID: " + detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID] + ": Compartment:" + detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT] + ":ReqQty:" + requestQty + ": Not ordered:"); }

                    }
                    else
                    {
                        if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.WIN32).ToString())
                        {
                            if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.MAX_QTY].ToString() != "0")
                            {
                                requestQty = Convert.ToInt32(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.MAX_QTY]) - Convert.ToInt32(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY]);
                            }
                            else if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.FOQ].ToString() != "0")
                            {
                                requestQty = Convert.ToInt32(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.FOQ]);
                            }
                            else
                            {
                                requestQty = Convert.ToInt32(Math.Round((Convert.ToSingle(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY]) / 2)));

                            }
                        }
                        Double itemCountPerCent = (requestQty / optQty) * 100;

                        if ((itemCountPerCent <= Convert.ToDouble(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ITEM_COUNT_LOW_PCT])) ||
                           (itemCountPerCent > Convert.ToDouble(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ITEM_COUNT_HIGH_PCT])) ||
                           (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.PUTAWAY_CART_ITEMS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString()))
                        {

                            POCOEntities.AtPar_Deviation_Entity deviationDetails = new POCOEntities.AtPar_Deviation_Entity();

                            deviationDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CartCount;
                            deviationDetails.BusinessUnit = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT].ToString();
                            deviationDetails.Key1 = 0;
                            deviationDetails.Key2 = 0;
                            deviationDetails.Key3 = 0;
                            deviationDetails.Key4 = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString();
                            deviationDetails.Key5 = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT].ToString();
                            deviationDetails.Key6 = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID].ToString();
                            deviationDetails.ReportData1 = optQty;
                            deviationDetails.ReportData2 = countQty;

                            if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.PRICE] != null)
                            {
                                deviationDetails.ReportData3 = Convert.ToDouble(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.PRICE]);

                            }
                            deviationDetails.ReportData4 = Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TRANSACTION_ID].ToString());
                            deviationDetails.ReportData6 = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.UOM].ToString();
                            deviationDetails.ReportData7 = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_REQUIRED].ToString();

                            if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_OPT] != null)
                            {
                                deviationDetails.ReportData9 = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_OPT].ToString();

                            }
                            deviationDetails.ReportData11 = DateTime.Now.ToString();

                            deviationDetails.UserId = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.USER_ID].ToString();
                            deviationDetails.UpdateDate = DateTime.Now.ToString();
                            deviationDetails.ReportData12 = requestQty.ToString();
                            deviationDetails.ReportData13 = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_DESCR].ToString();

                            if (outputParameters != null)
                            {
                                if (outputParameters.Tables.Count > 0)
                                {
                                    if (outputParameters.Tables["OUTPUT"].Columns.Contains(AtParWebEnums.Send_Cart_Output_Enum.REQUISITION_NUMBER.ToString()))
                                    {
                                        deviationDetails.ReportData14 = AtParWebEnums.Send_Cart_Output_Enum.REQUISITION_NUMBER.ToString() == null ? string.Empty : outputParameters.Tables["OUTPUT"].Rows[0][(int)AtParWebEnums.Send_Cart_Output_Enum.REQUISITION_NUMBER].ToString();
                                    }
                                }
                            }


                            if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.CUST_ITEM_NO] != null)
                            {
                                deviationDetails.ReportData15 = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.CUST_ITEM_NO].ToString();
                            }
                            _createOrderRepo.InsertDeviation(deviationDetails);

                        }

                    }

                }


                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private int GetRequestQty(DataRow detailRow, string qtyOption, string calc_req_qty, string bUnit,
            string cartPutaway, string cartID)
        {
            string strFillKillFlag = string.Empty;
            string strItemID = string.Empty;
            string strCmpMnt = string.Empty;
            string strOrderingType = string.Empty;
            long lngCntQty = 0;
            long lngOptQty = 0;
            long lngFoqQty = 0;
            long lngMaxQty = 0;
            int intSumOrderQty = 0;
            int requestQty = 0;
            try
            {

                if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.FILL_KILL_FLAG] != null)
                {
                    if (!string.IsNullOrEmpty(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.FILL_KILL_FLAG].ToString()))
                    {
                        strFillKillFlag = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.FILL_KILL_FLAG].ToString();
                    }
                }


                if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID] != null)
                {
                    if (!string.IsNullOrEmpty(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID].ToString()))
                    {
                        strItemID = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID].ToString();
                    }
                }


                if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_QUANTITY] != null)
                {
                    if (!string.IsNullOrEmpty(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_QUANTITY].ToString()))
                    {
                        lngCntQty = Convert.ToInt64(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COUNT_QUANTITY]);
                    }
                }


                if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY] != null)
                {
                    if (!string.IsNullOrEmpty(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY].ToString()))
                    {
                        lngOptQty = Convert.ToInt64(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY]);
                    }
                }


                if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT] != null)
                {
                    if (!string.IsNullOrEmpty(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT].ToString()))
                    {
                        strCmpMnt = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT].ToString();
                    }
                }


                if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_CTRL] != null)
                {
                    if (!string.IsNullOrEmpty(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_CTRL].ToString()))
                    {
                        strOrderingType = detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.CART_REPLEN_CTRL].ToString();
                    }
                }



                if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.FOQ] != null)
                {
                    if (!string.IsNullOrEmpty(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.FOQ].ToString()))
                    {
                        lngFoqQty = Convert.ToInt64(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.FOQ].ToString());
                    }
                }



                if (detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.MAX_QTY] != null)
                {
                    if (!string.IsNullOrEmpty(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.MAX_QTY].ToString()))
                    {
                        lngMaxQty = Convert.ToInt64(detailRow[(int)AtParWebEnums.Send_Cart_Details_Enum.MAX_QTY].ToString());
                    }
                }


                if (qtyOption.ToUpper() == AtParDefns.REQUEST_QTY)
                {
                    if (lngCntQty != 0)
                    {
                        requestQty = Convert.ToInt32(lngCntQty);
                    }
                }
                else
                {
                    if (!string.IsNullOrEmpty(strFillKillFlag))
                    {
                        if (calc_req_qty == AtParWebEnums.YesNo_Enum.Y.ToString() &&
                            strFillKillFlag == AtParWebEnums.FILL_KILL.F.ToString())
                        {
                            Tuple<Double, string> tupleOrderQty = _createOrderRepo.GetOrderQty(bUnit, cartPutaway, cartID, strCmpMnt, strItemID);

                            lngCntQty = lngCntQty + intSumOrderQty;

                        }
                    }
                }

                if (lngCntQty != lngOptQty)
                {
                    switch (strOrderingType)
                    {
                        case "01":
                            requestQty = Convert.ToInt32(lngOptQty - lngCntQty);
                            break;

                        case "02":
                            requestQty = Convert.ToInt32(lngFoqQty);
                            break;
                        case "03":
                            requestQty = Convert.ToInt32(lngMaxQty - lngCntQty);
                            break;
                    }

                }
                else
                {
                    requestQty = 0;
                }


                return requestQty;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        private long Execute_SendDetails_ProcessOutput(DataSet inputParameters, string[] deviceTokenEntry)
        {
            long newTransaction_id = 0;

            try
            {
                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.DEL_ITEMS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                {

                    long transactionID = _commonRepo.GetTransactionID((int)AtParWebEnums.EnumApps.CartCount, newTransaction_id);
                }


                POCOEntities.AtPar_Transaction_Entity transactionDetails = new POCOEntities.AtPar_Transaction_Entity();

                transactionDetails.TransactionId = Convert.ToInt32(newTransaction_id);
                transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CartCount;
                transactionDetails.ID = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString();
                transactionDetails.BusinessUnit = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT].ToString();
                transactionDetails.Status = (int)AtParWebEnums.AppTransactionStatus.Downloaded;
                transactionDetails.TotalRecordDownloaded = (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TOTAL_RECORDS]).ToString() == "" ? 0 : Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.TOTAL_RECORDS]);

                transactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                transactionDetails.DeviceId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].ToString();
                transactionDetails.DownloadUserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                transactionDetails.ReportData4 = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                transactionDetails.Description= inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.DESCR].ToString();

                _commonRepo.InsertTransaction(transactionDetails);

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private long Populate_SendDetails_Prerequisites(ref DataSet inputParameters, string[] deviceTokenEntry)
        {


            SortedList<string, string> orgParams;
            SortedList<string, string> userParams;
            SortedList<string, string> profParams;

            string orgGroupID = string.Empty;
            string remoteSchema = "";
            string remoteDBType = "";
            string erpDetails = "";
            string erpVersion = "";


            string strBunit = string.Empty;
            string strCartID = string.Empty;
            string strUserID = string.Empty;

            try
            {

                strBunit = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT].ToString();
                strCartID = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString();
                strUserID = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.USER_ID].ToString();


                // Get Org Parameters 
                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.REQ_ZIP_RELEASE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.STOP_REL_NON_STOCK_REQ.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.CART_ALLOCATION.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.QTY_ROUND_TYPE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.CALCULATE_REQ_QTY.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.INCLUDE_ZERO_ORDERED_ITEMS.ToString()] = string.Empty;


                if ((deviceTokenEntry != null))
                {
                    orgGroupID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();
                }

                _commonRepo.GetOrgGroupParamValues(orgParams, (int)AtParWebEnums.EnumApps.CartCount, orgGroupID);

                // Get User Parameters 
                userParams = new SortedList<string, string>();

                userParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.REQUESTOR_ID.ToString()] = string.Empty;
                userParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.ERP_USER_ID.ToString()] = string.Empty;

                _commonRepo.GetUserParamValues(userParams, (int)AtParWebEnums.EnumApps.CartCount, orgGroupID);

                // Get Profile Parameters 
                profParams = new SortedList<string, string>();
                profParams[AtParWebEnums.AppParameters_Enum.CART_DEF_CHANGE.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.DEL_ITEMS.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_COUNT_LOW_PCT.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_COUNT_HIGH_PCT.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.PUTAWAY_CART_ITEMS.ToString()] = string.Empty;
                profParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.IGNORE_REQ_REL_ERR.ToString()] = string.Empty;
                profParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.QTY_OPTION.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.SUPER_USER.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.ALLOW_USERS.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.STATUS_OF_REQUISITION.ToString()] = string.Empty;


                _commonRepo.GetProfileParamValues(profParams, (int)AtParWebEnums.EnumApps.CartCount,
                                       deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString());


                //// End of Geting Profile Parameters 

                DataRow dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();

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

                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CART_DEFN_CHANGE] = profParams[AtParWebEnums.AppParameters_Enum.CART_DEF_CHANGE.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.DEL_ITEMS] = profParams[AtParWebEnums.AppParameters_Enum.DEL_ITEMS.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ITEM_COUNT_LOW_PCT] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_COUNT_LOW_PCT.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ITEM_COUNT_HIGH_PCT] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_COUNT_HIGH_PCT.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.PUTAWAY_CART_ITEMS] = profParams[AtParWebEnums.AppParameters_Enum.PUTAWAY_CART_ITEMS.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REMOTE_SCHEMA] = remoteSchema;
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REMOTE_DB_TYPE] = remoteDBType;
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.IGNORE_REQ_REL_ERR] = profParams[AtParWebEnums.AppParameters_Enum.IGNORE_REQ_REL_ERR.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REQ_ZIP_RELEASE] = orgParams[AtParWebEnums.AppParameters_Enum.REQ_ZIP_RELEASE.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.STOP_REL_NON_STOCK_REQ] = orgParams[AtParWebEnums.AppParameters_Enum.STOP_REL_NON_STOCK_REQ.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.QTY_OPTION] = profParams[AtParWebEnums.AppParameters_Enum.QTY_OPTION.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REQUESTOR_ID] = userParams[AtParWebEnums.AppParameters_Enum.REQUESTOR_ID.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR] = orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.QTY_ROUND_TYPE] = orgParams[AtParWebEnums.AppParameters_Enum.QTY_ROUND_TYPE.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CALCULATE_REQ_QTY] = orgParams[AtParWebEnums.AppParameters_Enum.CALCULATE_REQ_QTY.ToString()];

                if (!String.IsNullOrEmpty(userParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.ERP_USER_ID.ToString()]))
                {
                    dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ERP_USER_ID] = userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()];
                }
                else
                {
                    dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ERP_USER_ID] = orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()];
                }

                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.STATUS_OF_REQUISITION] = profParams[AtParWebEnums.AppParameters_Enum.STATUS_OF_REQUISITION.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME] = erpDetails;
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.ENTERPRISE_VERSION] = erpVersion;
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.INCLUDE_ZERO_ORDERED_ITEMS] = orgParams[AtParWebEnums.AppParameters_Enum.INCLUDE_ZERO_ORDERED_ITEMS.ToString()] == null ? string.Empty : orgParams[AtParWebEnums.AppParameters_Enum.INCLUDE_ZERO_ORDERED_ITEMS.ToString()];



                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);
                // End of Adding Profile Parameters and Org Parameters to PreReqData Table 


                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private long Populate_SendDetails_OutputParameters(DataSet outputParameters, string[] deviceTokenEntry)
        {

            DataTable cart_out_dt = new DataTable();
            DataRow drDet;

            try
            {

                cart_out_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_Output_Defns,
                                                                AtParWebEnums.DataSet_Type.OUTPUT.ToString());


                outputParameters.Tables.Add(cart_out_dt);

                drDet = outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();
                drDet[AtParWebEnums.Send_Cart_Output_Enum.STATUS_CODE.ToString()] = AtparStatusCodes.E_SERVERERROR;

                outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(drDet);


                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        #endregion

        #endregion
    }
}

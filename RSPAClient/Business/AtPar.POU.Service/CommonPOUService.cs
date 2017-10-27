using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.CartCount;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AtPar.POU.Service
{
    public class CommonPOUService : ICommonPOUService
    {
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonPOURepository _commonPOURepo;
        ICommonService _commonService;
        IGetDetailsService _getDetailsService;

        string strImplantFlag = string.Empty;
        string strItemMstItemStatus = string.Empty;
        string strNonCartItemStatus = string.Empty;
        string strBillItemStatus = string.Empty;
        string strParLocStatus = string.Empty;
        #region Constructor
        public CommonPOUService(ILog log, ICommonRepository commonRepository, ICommonService commonService, ICommonPOURepository commonPOURepo, IGetDetailsService getDetailsService)

        {
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _commonPOURepo = commonPOURepo;
            _getDetailsService = getDetailsService;
            _log.SetLoggerType(typeof(CommonPOUService));

            GetConfigData();
        }

        #endregion


        public Tuple<long, DataSet> GetCartDetails(string cartID, string bUnit, DataSet cartDetailsDS, string orgGrpID, string systemID, string profileID = "", string locationType = "", StringBuilder syncData = null, string syncFlag = "", int appID = 15, string deptID = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                Atpar_Application_Parameters atparParameters = default(Atpar_Application_Parameters);
                string itemDescrType = null;
                string defaultMfgItemID = null;
                string itemPriceType = null;
                DataSet inputParameters = new DataSet();
                cartDetailsDS = new DataSet();
                string erpObjName = null;
                string[] deviceTokenEntry = new string[10];
                long statusCode = 0;
                string cartManagedAtpar = string.Empty;
                //char chrCartManagedAtpar = '\0';
                string ndcType = string.Empty;
                string upnType = string.Empty;

                SortedList userParams = default(SortedList);
                //SortedList<string, string> orgParams1 = new SortedList<string, string>();
                SortedList<string, string> orgParams = new SortedList<string, string>();
                //SortedList<string, string> profParams1 = new SortedList<string, string>();
                SortedList<string, string> profParams = new SortedList<string, string>();


                try
                {
                    orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.AppParameters_Enum.SYNC_MULTIPLE_LOC_INFO.ToString()] = string.Empty;
                    atparParameters = Atpar_Application_Parameters.CreateInstance(systemID);
                    atparParameters.OrgGroupId = orgGrpID;
                    atparParameters.ApplicationId = appID;

                    _commonRepo.GetOrgGroupParamValues(orgParams, appID, orgGrpID);

                    itemDescrType = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                    defaultMfgItemID = orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                    itemPriceType = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];
                    cartManagedAtpar = orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()];
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }


                try
                {
                    userParams = new SortedList();
                    userParams[AtParWebEnums.AppParameters_Enum.DEFAULT_COMPANY.ToString()] = string.Empty;
                    atparParameters.ApplicationId = Convert.ToInt32(AtParWebEnums.EnumApps.PointOfUse);
                    atparParameters.ProfileId = profileID;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null); //status code need to be checked
                }

                //Not getting profile parameter values when there is no ProfileID
                if (profileID != "" & profileID != string.Empty)
                {
                    try
                    {
                        profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()] = string.Empty;
                        profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()] = string.Empty;

                        atparParameters.ApplicationId = appID;
                        atparParameters.ProfileId = profileID;



                        _commonRepo.GetProfileParamValues(profParams, appID, profileID);

                        upnType = profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                        ndcType = profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];

                    }
                    catch (Exception ex)
                    {
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            return new Tuple<long, DataSet>(statusCode, null);
                        }
                    }
                }

                //Handling Location Type 
                if (string.IsNullOrEmpty(locationType))
                {
                    try
                    {
                        locationType = _commonPOURepo.GetLocationType(bUnit, cartID);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                    }
                }

                try
                {
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
                    //TODO:  Need to confirm this
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
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

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
                    try
                    {
                        List<string> lstParameters =
                            new List<string> { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };

                        var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                        erpObjName = AtParWebEnums.EnumApps.CartCount + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                        //GetConfigData();
                        var tupleCartDetails = GetCartDetails(erpObjName, inputParameters, cartDetailsDS, deviceTokenEntry);
                        cartDetailsDS = tupleCartDetails.Item2;
                        statusCode = tupleCartDetails.Item1;
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            return new Tuple<long, DataSet>(statusCode, null);
                        }



                        var resultTuple = UpdateLotSerFlags(bUnit, cartID, cartDetailsDS, AtParWebEnums.YesNo_Enum.Y.ToString());
                        cartDetailsDS = resultTuple.Item2;
                        // statusCode = resultTuple.Item1;

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
                }
                else if (locationType == AtParWebEnums.LocationType.A.ToString())
                {

                    try
                    {
                        erpObjName = AtParWebEnums.Erp_Obj_Name.CartCount_Atpar.ToString();
                        //GetConfigData();
                        var tupleCartDetails = GetCartDetails(erpObjName, inputParameters, cartDetailsDS, deviceTokenEntry);

                        statusCode = tupleCartDetails.Item1;
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            return new Tuple<long, DataSet>(statusCode, cartDetailsDS);
                        }


                        cartDetailsDS = tupleCartDetails.Item2;

                        var resultTuple = UpdateLotSerFlags(bUnit, cartID, cartDetailsDS, AtParWebEnums.YesNo_Enum.Y.ToString());
                        cartDetailsDS = resultTuple.Item2;


                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
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
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }

        }


        private Tuple<long, DataSet> UpdateLotSerFlags(string bUnit, string cartID, DataSet locDetails, string cartItemFlag)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                DataSet _dsitemAtt = new DataSet();
                try
                {

                    List<MT_ATPAR_ITEM_ATTRIBUTES> lstItemAttributes = _commonPOURepo.GetItnAttr(bUnit, cartID);
                    DataTable _dtitemAtt = lstItemAttributes.ToDataTable(); //Utils.ToDataTable(lstItemAttributes);

                    _dsitemAtt.Tables.Add(_dtitemAtt);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

                foreach (DataRow AttItems in _dsitemAtt.Tables[0].Rows)
                {
                    if (locDetails.Tables.Count > 0)
                    {
                        if (cartItemFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                        {
                            dynamic UpdateLotSerFlagItems = from look in locDetails.Tables[1].AsEnumerable()
                                                            where look.Field<string>((int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID) ==
                                                                  AttItems["ITEM_ID"].ToString()
                                                            select look;

                            foreach (var row_loopVariable in UpdateLotSerFlagItems)
                            {
                                row_loopVariable[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED] =
                                    AttItems["LOT_CONTROLLED"].ToString();
                                row_loopVariable[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED] =
                                    AttItems["SERIAL_CONTROLLED"].ToString();
                                row_loopVariable[(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR] =
                                    AttItems["CONV_RATE_PAR_TO_ISSUE_CF"].ToString();
                                row_loopVariable[(int)AtParWebEnums.Get_Cart_Detail_Enum.ISSUE_UOM] =
                                    AttItems["ISSUE_UOM"].ToString();
                            }
                        }
                        else
                        {
                            dynamic UpdateLotSerFlagItems = (from look in locDetails.Tables[0].AsEnumerable()
                                                             where look.Field<string>("ITEM_ID") == AttItems["ITEM_ID"].ToString()
                                                             select look);
                            foreach (var row_loopVariable in UpdateLotSerFlagItems)
                            {
                                // row = row_loopVariable;
                                row_loopVariable["LOT_CONTROLLED"] = AttItems["LOT_CONTROLLED"].ToString();
                                row_loopVariable["SERIALIZED"] = AttItems["SERIAL_CONTROLLED"].ToString();
                            }
                        }
                    }
                }
                locDetails.AcceptChanges();
                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, locDetails);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, locDetails);

            }
        }

        private Tuple<long, DataSet> GetLocationDetails(string bunit, string cartID, SortedList<string, string> orgParm, SortedList<string, string> profileParam, DataSet dsLocDetails, string[] deviceTokenEntry, StringBuilder syncData = null, string syncFlag = "")
        {
            StringBuilder sbInputXml = new StringBuilder();
            string outXml = string.Empty;

            XDocument xDoc = new XDocument();
            long statusCode = -1;
            string parLocStatus = string.Empty;
            dynamic info2 = string.Empty;
            dynamic info3 = string.Empty;
            dynamic packingString = string.Empty;

            string itemPriceType = string.Empty;
            string itemDescrType = string.Empty;
            string defaultMfgItemID = string.Empty;
            string syncFrmMultiLoc = string.Empty;
            string upnType = string.Empty;
            string ndcType = string.Empty;

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {

                itemPriceType = orgParm[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];
                itemDescrType = orgParm[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                defaultMfgItemID = orgParm[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                syncFrmMultiLoc = orgParm[AtParWebEnums.AppParameters_Enum.SYNC_MULTIPLE_LOC_INFO.ToString()];
                ///// Reading the Profile Param Info   ///'

                if (profileParam != null && profileParam.Count > 0)
                {
                    upnType = profileParam[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                    ndcType = profileParam[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];
                }

                var deptID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeptID];
                string storageArea;

                if (!string.IsNullOrEmpty(deptID) && deptID != null && deptID != "null")
                {
                    storageArea = _commonPOURepo.GetStorageArea(deptID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);


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

                var erpResult = ERPGetLocationDetails(erpObjName, sbInputXml.ToString(), deviceTokenEntry);

                try
                {
                    try
                    {
                        if (erpResult.Item2 != null)
                        {
                            // xDoc.LoadXml(erpResult.Item2);
                            // = XDocument.Load(erpResult.Item2);
                            xDoc = XDocument.Parse(erpResult.Item2.ToString());
                        }

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                    }

                    if (!string.IsNullOrEmpty(syncFlag) && syncFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        syncData.Append(erpResult.Item2);
                    }
                    else
                    {
                        // var nodeList = xmlDoc.SelectNodes("ROOT/ITEM");
                        // inputXmlData.Descendants("NewDataSet").Descendants("Table")
                        var nodeList = xDoc.Descendants("ROOT").Descendants("ITEM");

                        var drLocHeaderRow = dsLocDetails.Tables[(int)AtParWebEnums.DataSet_Type.HEADERS].NewRow();

                        drLocHeaderRow[(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.BUSINESS_UNIT] = bunit;
                        drLocHeaderRow[(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.CART_ID] = cartID;

                        dsLocDetails.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(drLocHeaderRow);

                        //Dictionary<string, string> dictNameCaption = GetCaptionsForDataSet(inputXmlData, "OUTPUT");


                        if (nodeList != null)

                        {


                            foreach (var item in nodeList.ToList())
                            {
                                var drLocDetail = dsLocDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].NewRow();

                                //(string)(ElementValueOrNull(x.Element(dictNameCaption["ITEMID"])))
                                //    float.Parse(ElementValueOrNull(x.Element(dictNameCaption["ITEM_PRICE"])) == "" ? "0" : ElementValueOrNull(x.Element(dictNameCaption["ITEM_PRICE"])))

                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] = (string)(ElementValueOrNull(item.Element("B")));


                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR] = (string)(ElementValueOrNull(item.Element("J")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE] = (string)(ElementValueOrNull(item.Element("K")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_TYPE] = (string)(ElementValueOrNull(item.Element("IT"))) == "" ? 0 : Convert.ToUInt32(item.Element("IT"));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED] = (string)(ElementValueOrNull(item.Element("H")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED] = (string)(ElementValueOrNull(item.Element("I")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID] = (string)(ElementValueOrNull(item.Element("C")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID] = (string)(ElementValueOrNull(item.Element("G")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ITEM_ID] = (string)(ElementValueOrNull(item.Element("E")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.UPN_ID] = (string)(ElementValueOrNull(item.Element("F")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_NDC] = (string)(ElementValueOrNull(item.Element("D")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.CHARGE_CODE] = (string)(ElementValueOrNull(item.Element("AX")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_LOC_STATUS] = (string)(ElementValueOrNull(item.Element("AY")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_ITEM_STATUS] = (string)(ElementValueOrNull(item.Element("AZ")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.NON_CART_ITEM_STATUS] = (string)(ElementValueOrNull(item.Element("BA")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.BILL_ITEM_STATUS] = (string)(ElementValueOrNull(item.Element("BB")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.IMPLANT_FLAG] = (string)(ElementValueOrNull(item.Element("BC")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_STATUS] = (string)(ElementValueOrNull(item.Element("P")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_BU_STATUS] = (string)(ElementValueOrNull(item.Element("Q")));
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.INFO_2] = (string)(ElementValueOrNull(item.Element("M"))); ;
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.INFO_3] = (string)(ElementValueOrNull(item.Element("N"))); ;
                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.PACKAGING_STRING] = (string)(ElementValueOrNull(item.Element("O"))); ;

                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT] = string.Empty;

                                drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM] = string.Empty;



                                dsLocDetails.Tables[(int)AtParWebEnums.DataSet_Type.DETAILS].Rows.Add(drLocDetail);



                            }
                        }






                        // var stkNodeList = xDoc.Descendants("ROOT/ITEM");

                        var stkNodeList = xDoc.Descendants("ROOT").Descendants("STOCK");

                        if (stkNodeList != null)
                        {



                            foreach (var item in stkNodeList.ToList())
                            {
                                var drLotSerial = dsLocDetails.Tables[AtParWebEnums.DataSet_Type.LOTSERIAL_INFO.ToString()].NewRow();

                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.ITEM_ID.ToString()] = (string)(ElementValueOrNull(item.Element("B")));
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.BUSINESS_UNIT.ToString()] = bunit;
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CART_ID.ToString()] = cartID;
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION.ToString()] = (string)(ElementValueOrNull(item.Element("V"))); ;
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_AREA.ToString()] = (string)(ElementValueOrNull(item.Element("U"))); ;
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_1.ToString()] = (string)(ElementValueOrNull(item.Element("AC")));
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_2.ToString()] = (string)(ElementValueOrNull(item.Element("AD")));
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_3.ToString()] = (string)(ElementValueOrNull(item.Element("AE")));
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_4.ToString()] = (string)(ElementValueOrNull(item.Element("AF")));

                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.LOT_NUMBER.ToString()] = (string)(ElementValueOrNull(item.Element("S"))); ;
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.SERIAL_NUMBER.ToString()] = (string)(ElementValueOrNull(item.Element("T"))); ;

                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.SYSTEM_QTY.ToString()] = (string)(ElementValueOrNull(item.Element("Z"))); ;
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STDUOM.ToString()] = (string)(ElementValueOrNull(item.Element("X"))); ; ;
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STD_PACK_UOM.ToString()] = (string)(ElementValueOrNull(item.Element("AI"))); ; ;

                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STAGED_DATE.ToString()] = (string)(ElementValueOrNull(item.Element("R")));
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CONTAINER_ID.ToString()] = (string)(ElementValueOrNull(item.Element("Y")));
                                drLotSerial[AtParWebEnums.Get_Cart_LotSerial_Info_Enum.UOM.ToString()] = (string)(ElementValueOrNull(item.Element("W")));

                                dsLocDetails.Tables[AtParWebEnums.DataSet_Type.LOTSERIAL_INFO.ToString()].Rows.Add(drLotSerial);



                            }

                        }

                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, dsLocDetails);
                }

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, dsLocDetails);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, dsLocDetails);
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


        private void GetConfigData()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                var objCls = new Utilities();
                objCls.InitializeAtParSystem();


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
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



        #region GetHeaders


        public Tuple<long, DataSet> GetCart_Headers(string orgGrpID, string[] deviceTokenEntry, string locationType = "", int appID = 15)
        {
            DataSet dsAtparCartHeader = default(DataSet);
            DataSet pCartHeadersDs = new DataSet();
            //string[] deviceTokenEntry = new string[10];
            string cartManagedAtpar = string.Empty;

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                DataSet pInputParameters = new DataSet();

                try
                {
                    var dtPreReqData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Params_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                    var dtHdrData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                    var dtBUnits = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_BusinessUnits_Defns, AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());

                    var dtOutput = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Header_Output_Header, AtParWebEnums.DataSet_Type.OUTPUT.ToString());

                    pInputParameters.Tables.Add(dtPreReqData);
                    pInputParameters.Tables.Add(dtHdrData);
                    pInputParameters.Tables.Add(dtBUnits);
                    pCartHeadersDs.Tables.Add(dtOutput);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

                List<string> lstBUnits;

                try
                {
                    lstBUnits = _commonPOURepo.GetBUnits(orgGrpID);

                    if (lstBUnits.Count == 0)
                    {
                        return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, null);
                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, null);
                }


                string erpObjName;

                if (locationType == AtParWebEnums.LocationType.I.ToString())
                {
                    StringBuilder sbInputXml = new StringBuilder();
                    StringBuilder sbAssignBunits = new StringBuilder();
                    DataSet dsErpBunits = default(DataSet);

                    foreach (var item in lstBUnits)
                    {
                        sbAssignBunits.Append("<RECORD>");
                        sbAssignBunits.Append(item);
                        sbAssignBunits.Append("</RECORD>");
                    }

                    sbInputXml.Append("<ROOT>");
                    sbInputXml.Append("<BUSINESS_UNIT>");
                    sbInputXml.Append(sbAssignBunits.ToString());
                    sbInputXml.Append("</BUSINESS_UNIT>");
                    sbInputXml.Append("<FLD_ORDER_BY></FLD_ORDER_BY><ORDER_BY_ORDER></ORDER_BY_ORDER>");
                    sbInputXml.Append("</ROOT>");

                    List<string> lstParameters =
                        new List<string> { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };


                    var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                    erpObjName = AtParWebEnums.EnumApps.StockIssue.ToString() + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    var tupleResult = ERPGetCart_Headers(erpObjName, sbInputXml.ToString(), dsErpBunits, deviceTokenEntry);


                    if (tupleResult.Item2 != null)
                    {
                        for (int iCnt = 0; iCnt <= tupleResult.Item2.Tables[0].Rows.Count - 1; iCnt++)
                        {
                            DataRow drOutputRow = pCartHeadersDs.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();

                            drOutputRow[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR] = tupleResult.Item2.Tables[0].Rows[iCnt]["DESCR"].ToString();

                            drOutputRow[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID] = tupleResult.Item2.Tables[0].Rows[iCnt]["BUSINESS_UNIT"].ToString();

                            drOutputRow[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT] = tupleResult.Item2.Tables[0].Rows[iCnt]["INV_LOC_BUSINESS_UNIT"].ToString();

                            drOutputRow[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.SHADOW_FLAG] = AtParWebEnums.YesNo_Enum.N.ToString();
                            drOutputRow[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE] = AtParWebEnums.LocationType.I.ToString();

                            pCartHeadersDs.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(drOutputRow);
                        }
                    }

                }
                else
                {

                    try
                    {
                        cartManagedAtpar = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString(), appID, orgGrpID);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                    }

                    DataRow drPreReq = pInputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();

                    List<string> lstParameters = new List<string>
                    {
                        AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString(),
                        AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString(),
                        AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString()
                    };


                    var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                    var remoteSchema = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;

                    var remoteDbType = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDbType;

                    var objName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    string strErpObjName = objName;

                    if (string.IsNullOrEmpty(strErpObjName))
                    {
                        return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                    }
                    erpObjName = AtParWebEnums.EnumApps.CartCount + "_" + strErpObjName;


                    if (cartManagedAtpar == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        erpObjName = AtParWebEnums.Erp_Obj_Name.CartCount_Atpar.ToString();
                    }

                    DataRow drHdr = pInputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();
                    drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.CART_ID] = string.Empty;
                    drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.FLD_ORDER_BY] = string.Empty;


                    if (erpObjName.ToLower().Equals(AtParWebEnums.EnumApps.CartCount.ToString().ToLower() + "_" + AtParWebEnums.Enterprise_Enum.Peoplesoft.ToString().ToLower()) | erpObjName.ToLower().Equals(AtParWebEnums.EnumApps.CartCount.ToString().ToLower() + "_" + AtParWebEnums.Enterprise_Enum.PMM.ToString().ToLower()) | erpObjName.ToLower().Equals(AtParWebEnums.EnumApps.CartCount.ToString().ToLower() + "_" + AtParWebEnums.Enterprise_Enum.Lawson.ToString().ToLower()))
                    {
                        drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.ORDER_BY_ORDER] = "BUSINESS_UNIT";

                    }
                    else
                    {
                        drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.ORDER_BY_ORDER] = "ORG_ID";
                    }

                    if (appID == (int)AtParWebEnums.EnumApps.PointOfUse)
                    {
                        drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.POU_CART] = AtParWebEnums.YesNo_Enum.Y.ToString();
                    }
                    else
                    {
                        drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.POU_CART] = AtParWebEnums.Toggle_Enum.P.ToString();
                    }

                    pInputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(drPreReq);
                    pInputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(drHdr);

                    foreach (var item in lstBUnits)
                    {
                        DataRow drBunit = default(DataRow);

                        drBunit = pInputParameters.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].NewRow();
                        drBunit[0] = item;
                        pInputParameters.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Add(drBunit);
                    }

                    try
                    {

                        var resultTuple = ERPGetHeaders(erpObjName, pInputParameters, pCartHeadersDs, deviceTokenEntry);

                        pCartHeadersDs = resultTuple.Item2;

                        if (pCartHeadersDs != null)
                        {
                            pCartHeadersDs.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Columns.Remove(((int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE).ToString());   //to be checked and uncomment this

                            DataColumn dcLocType =
                                new DataColumn
                                {
                                    ColumnName = AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE.ToString()
                                };


                            if (cartManagedAtpar == AtParWebEnums.YesNo_Enum.Y.ToString())
                            {
                                dcLocType.DefaultValue = AtParWebEnums.LocationType.A.ToString();

                            }
                            else
                            {
                                dcLocType.DefaultValue = AtParWebEnums.LocationType.P.ToString();
                            }



                            pCartHeadersDs.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Columns.Add(dcLocType);

                        }





                        if (resultTuple.Item1 != AtparStatusCodes.ATPAR_OK)
                        {
                            if (resultTuple.Item1 == AtparStatusCodes.E_REMOTEERROR)
                            {
                                return new Tuple<long, DataSet>(AtparStatusCodes.E_REMOTEERROR, null);
                            }
                            //return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                        }

                        if (strErpObjName == AtParWebEnums.Enterprise_Enum.PMM.ToString())
                        {
                            var dtTemp = pCartHeadersDs.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Clone();
                            //Cloning Details table
                            dtTemp.Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].DataType = Type.GetType("System.String");

                            foreach (DataRow dr in pCartHeadersDs.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows)
                            {
                                dtTemp.ImportRow(dr);
                            }
                            pCartHeadersDs.Tables.Remove(AtParWebEnums.DataSet_Type.OUTPUT.ToString());
                            pCartHeadersDs.Tables.Add(dtTemp);
                        }

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                    }

                    try
                    {

                        //if(!string.IsNullOrEmpty(cartManagedAtpar))
                        //{
                        if (cartManagedAtpar != AtParWebEnums.YesNo_Enum.Y.ToString())
                        {
                            var resultCartHeader = GetAtparCart_Headers(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID], deviceTokenEntry, appID);

                            dsAtparCartHeader = resultCartHeader.Item2;


                            if (resultCartHeader.Item1 != AtparStatusCodes.ATPAR_OK)
                            {
                                return new Tuple<long, DataSet>(resultCartHeader.Item1, null);
                            }

                            if (dsAtparCartHeader != null)
                            {


                                if (dsAtparCartHeader.Tables[0].Rows.Count != 0)
                                {
                                    dsAtparCartHeader.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Columns.Remove((AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE.ToString()));

                                    //  dsAtparCartHeader.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Columns.Remove(AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE.ToString());

                                    DataColumn dcLocType = new DataColumn();
                                    dcLocType.ColumnName = AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE.ToString();
                                    dcLocType.DefaultValue = AtParWebEnums.LocationType.A.ToString();

                                    dsAtparCartHeader.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Columns.Add(dcLocType);

                                    if (pCartHeadersDs == null)
                                    {
                                        pCartHeadersDs = new DataSet();
                                        pCartHeadersDs = dsAtparCartHeader.Copy();
                                    }
                                    else
                                    {



                                        pCartHeadersDs.Merge(dsAtparCartHeader, false, MissingSchemaAction.Ignore);
                                    }
                                }
                                else
                                {
                                    pCartHeadersDs = dsAtparCartHeader.Copy();

                                }
                            }
                        }


                        if (pCartHeadersDs.Tables[0].Rows.Count == 0)
                        {
                            return new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null);
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                    }
                }

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, pCartHeadersDs);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, pCartHeadersDs);
            }
        }

        private Tuple<long, DataSet> ERPGetCart_Headers(string erpObjName, string sbInputXml, DataSet dsErpBunits, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                //GetConfigData();
                string methodName = string.Empty;
                object reflectObject = null;

                var className = "GetBUnits";
                methodName = "GetBUnits";

                var MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { sbInputXml, dsErpBunits, deviceTokenEntry };

                var statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ERPGetLocationDetails getting failed from ERP")); }
                    return new Tuple<long, DataSet>(statusCode, null);
                }
                dsErpBunits = (DataSet)args[1];

                return new Tuple<long, DataSet>(statusCode, dsErpBunits);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }

                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
        }

        private Tuple<long, DataSet> ERPGetHeaders(string erpObjName, DataSet inputParameters, DataSet cartHeadersDS, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                GetConfigData();
                MethodInfo MethodName = null;
                object reflectObject = null;

                var className = "GetHeader";
                var methodName = "GetHeader";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, cartHeadersDS, deviceTokenEntry };

                var statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ERPGetHeaders getting failed from ERP")); }
                    return new Tuple<long, DataSet>(statusCode, null);
                }
                cartHeadersDS = (DataSet)args[1];

                return new Tuple<long, DataSet>(statusCode, cartHeadersDS);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }

                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
        }

        private Tuple<long, DataSet> GetAtparCart_Headers(string orgGrpID, string[] deviceTokenEntry, int appID = 15)
        {
            DataSet pAtparCartHeadersDs = new DataSet();

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                DataSet pInputParameters = new DataSet();

                //' Table to add Parameters
                try
                {
                    var dtPreReqData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Params_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                    var dtHdrData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                    var dtBUnits = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_BusinessUnits_Defns, AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());

                    var dtOutput = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Header_Output_Header, AtParWebEnums.DataSet_Type.OUTPUT.ToString());

                    pInputParameters.Tables.Add(dtPreReqData);
                    pInputParameters.Tables.Add(dtHdrData);
                    pInputParameters.Tables.Add(dtBUnits);
                    pAtparCartHeadersDs.Tables.Add(dtOutput);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

                DataRow drPreReq = pInputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();

                string erpObjName;
                try
                {
                    List<string> lstParameters = new List<string>
                    {
                        AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString(),
                        AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString(),
                        AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString()
                    };

                    var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                    var remoteSchema = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;

                    var remoteDbType = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDbType;

                    erpObjName = AtParWebEnums.Erp_Obj_Name.CartCount_Atpar.ToString();

                    DataRow drHdr = pInputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();

                    drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.CART_ID] = string.Empty;
                    drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.FLD_ORDER_BY] = string.Empty;
                    drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.ORDER_BY_ORDER] = "ORG_ID";

                    if (appID == (int)AtParWebEnums.EnumApps.PointOfUse)
                    {
                        drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.POU_CART] = AtParWebEnums.YesNo_Enum.Y.ToString();
                    }
                    else
                    {
                        drHdr[(int)AtParWebEnums.Get_Cart_Header_Enum.POU_CART] = AtParWebEnums.Toggle_Enum.P.ToString();
                    }
                    pInputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(drPreReq);
                    pInputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(drHdr);

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

                try
                {
                    List<string> lstBUnits = _commonPOURepo.GetBUnits(orgGrpID);

                    if (lstBUnits.Count == 0)
                    {
                        return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, null);
                    }

                    foreach (var item in lstBUnits)
                    {
                        DataRow drBunit = default(DataRow);

                        drBunit = pInputParameters.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].NewRow();
                        drBunit[0] = item;

                        pInputParameters.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Add(drBunit);
                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }


                try
                {
                    var resultTuple = ERPGetHeaders(erpObjName, pInputParameters, pAtparCartHeadersDs, deviceTokenEntry);
                    pAtparCartHeadersDs = resultTuple.Item2;
                    var statusCode = resultTuple.Item1;

                    ///' Assigning Location type as A



                    if (pAtparCartHeadersDs != null)
                    {
                        pAtparCartHeadersDs.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Columns.Remove(((int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE).ToString());
                        DataColumn dcLocType = new DataColumn();
                        dcLocType.ColumnName = AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE.ToString();
                        dcLocType.DefaultValue = AtParWebEnums.LocationType.A.ToString();
                        pAtparCartHeadersDs.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Columns.Add(dcLocType);

                    }



                    if (statusCode == AtparStatusCodes.E_NORECORDFOUND)
                    {
                        if (_log.IsWarnEnabled) { _log.Fatal(methodBaseName + "No records found " + "from ERP : status code is : " + statusCode.ToString()); }

                    }
                    else if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {

                        if (_log.IsWarnEnabled) { _log.Fatal(methodBaseName + " Failed in the remote call: StatusCode" + " is : " + statusCode.ToString()); }



                        if (statusCode == AtparStatusCodes.E_REMOTEERROR)
                        {
                            return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, pAtparCartHeadersDs);

                        }
                        else
                        {
                            return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, pAtparCartHeadersDs);
                        }
                    }




                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
            return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, pAtparCartHeadersDs);
        }

        #endregion

        public AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefID, string procID = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC>();

            try
            {
                response.DataList = _commonPOURepo.GetPrefListDetails(prefID, procID);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }


        public AtParWebApiResponse<VM_DEPARTMENT_CART_ITEMS> GetDepartmentItems(string deptID, string orgGrpID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_DEPARTMENT_CART_ITEMS>();

            try
            {
                DataSet deptItemDS = new DataSet();
                DataTable deptItemTbl = default(DataTable);
                DataRow deptItemRow = default(DataRow);
                DataTable deptCartsTbl = default(DataTable);
                DataRow deptCartRow = default(DataRow);
                DataTable deptBusinessUnitTbl = default(DataTable);
                DataRow deptBURow = default(DataRow);
                string cartName = string.Empty;
                string businessUnit = string.Empty;
                bool isSameCart = false;
                bool isSameBU = false;
                string strLocType = string.Empty;


                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Getting the allocated carts for the" + " department : " + deptID);
                List<VM_MT_POU_DEPT_CARTS> allocatedCarts = new List<VM_MT_POU_DEPT_CARTS>();
                try
                {
                    allocatedCarts = _commonPOURepo.GetAllocatedCarts("", deptID, (int)AtParWebEnums.EnumApps.PointOfUse);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                    response.AtParException(ex, _commonRepo, _log);
                    return response;
                }


                // temporary dataset and table to be returned
                deptItemTbl = new DataTable("DEPARTMENT_CART_ITEMS");
                deptItemTbl.Columns.Add("ITEM_ID", typeof(string));
                deptItemTbl.Columns.Add("ITEM_DESCRIPTION", typeof(string));
                deptItemTbl.Columns.Add("CUST_ITEM_NO", typeof(string));
                deptItemTbl.Columns.Add("SERIAL_CONTROLLED", typeof(string));
                deptItemTbl.Columns.Add("LOT_CONTROLLED", typeof(string));
                deptItemTbl.Columns.Add("CHARGE_CODE", typeof(string));

                deptCartsTbl = new DataTable("DEPARTMENT_CARTS");
                deptCartsTbl.Columns.Add("CART_ID", typeof(string));

                deptBusinessUnitTbl = new DataTable("DEPARTMENT_BUSINESSUNIT");
                deptBusinessUnitTbl.Columns.Add("BUSINESS_UNIT", typeof(string));

                // if there are any allocations
                if (allocatedCarts.Count > 0)
                {
                    isSameCart = false;
                    isSameBU = false;
                    // load up the carts from the cache
                    foreach (var item in allocatedCarts)
                    {
                        if (cartName == item.CART_ID.ToString())
                        {
                            isSameCart = true;
                            cartName = item.CART_ID.ToString();
                        }
                        else
                        {
                            isSameCart = false;
                            cartName = item.CART_ID.ToString();
                        }

                        if (businessUnit == item.BUSINESS_UNIT.ToString())
                        {
                            isSameBU = true;
                            businessUnit = item.BUSINESS_UNIT.ToString();
                        }
                        else
                        {
                            isSameBU = false;
                            businessUnit = item.BUSINESS_UNIT.ToString();
                        }
                        if (!isSameCart)
                        {
                            //Adding Cart Row to DataTable
                            //Add only unique Carts
                            deptCartRow = deptCartsTbl.NewRow();
                            deptCartRow["CART_ID"] = cartName;
                            deptCartsTbl.Rows.Add(deptCartRow);
                            deptCartsTbl.AcceptChanges();
                        }
                        if (!isSameBU)
                        {
                            //Add Business to DataTable 
                            //Add only unique bU
                            //Check before adding
                            deptBURow = deptBusinessUnitTbl.NewRow();
                            deptBURow["BUSINESS_UNIT"] = businessUnit;
                            deptBusinessUnitTbl.Rows.Add(deptBURow);
                            deptBusinessUnitTbl.AcceptChanges();
                        }

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + "Looking for " + cartName + " of " + businessUnit + " Business Unit in cache");

                        DataSet detDS = default(DataSet);
                        strLocType = item.LOCATION_TYPE;
                        Tuple<long, DataSet> cartDetails;
                        try
                        {
                            cartDetails = GetCartDetails(cartName, businessUnit, detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), string.Empty, strLocType);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                            response.AtParException(ex, _commonRepo, _log);
                            return response;
                        }

                        detDS = cartDetails.Item2;
                        var statusCode = cartDetails.Item1;
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (statusCode != AtparStatusCodes.E_NORECORDFOUND)
                            {
                                response.AtParNotOK(statusCode, _commonRepo, _log);
                                return response;
                            }
                        }
                        if (detDS != null && detDS.Tables.Count > 0)
                        {
                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " Detail Table rows count " + detDS.Tables[1].Rows.Count);

                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " Adding items of " + cartName + " of " + businessUnit + " to list ");
                            foreach (DataRow datarow in detDS.Tables[1].Rows)
                            {
                                deptItemRow = deptItemTbl.NewRow();
                                deptItemRow["ITEM_ID"] = datarow[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
                                deptItemRow["ITEM_DESCRIPTION"] = datarow[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR];
                                deptItemRow["CUST_ITEM_NO"] = datarow[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID];
                                deptItemRow["SERIAL_CONTROLLED"] = datarow[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED];
                                deptItemRow["LOT_CONTROLLED"] = datarow[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED];
                                deptItemRow["CHARGE_CODE"] = datarow[(int)AtParWebEnums.Get_Cart_Detail_Enum.CHARGE_CODE];
                                deptItemTbl.Rows.Add(deptItemRow);
                            }

                        }
                        //Get the non Cart Items and add it
                        List<MT_POU_NONCART_ITEMS> lstNonCartItems = new List<MT_POU_NONCART_ITEMS>();
                        try
                        {
                            lstNonCartItems = _commonPOURepo.GetNonCartItems(businessUnit, cartName);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                            response.AtParException(ex, _commonRepo, _log);
                            return response;
                        }


                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + " Found " + lstNonCartItems.Count() + " non Cart Items ");

                        if (lstNonCartItems.Count > 0)
                        {
                            foreach (var nonCartItem in lstNonCartItems)
                            {
                                deptItemRow = deptItemTbl.NewRow();
                                deptItemRow["ITEM_ID"] = nonCartItem.ITEM_ID;
                                deptItemRow["ITEM_DESCRIPTION"] = nonCartItem.ITEM_DESCRIPTION;
                                deptItemRow["CUST_ITEM_NO"] = nonCartItem.CUST_ITEM_ID;
                                deptItemRow["CHARGE_CODE"] = nonCartItem.CHARGE_CODE;
                                deptItemRow["SERIAL_CONTROLLED"] = nonCartItem.SERIALIZED;
                                deptItemRow["LOT_CONTROLLED"] = nonCartItem.LOT_CONTROLLED;
                                deptItemTbl.Rows.Add(deptItemRow);

                            }
                        }
                    }

                }
                else
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + " No Carts allocated to " + deptID + " department ");

                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;

                }
                // put the table back into the dataset
                deptItemDS.Tables.Add(deptItemTbl);
                deptItemDS.Tables.Add(deptCartsTbl);
                deptItemDS.Tables.Add(deptBusinessUnitTbl);
                DataSet deptItemsDS = deptItemDS;
                if (deptItemsDS.Tables[0].Rows.Count == 0)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + " No items found in the list ");
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                var deptItems = deptItemsDS.Tables[0].AsEnumerable().Select(dataRow => new VM_DEPARTMENT_CART_ITEMS
                {
                    ITEM_ID = dataRow.Field<string>("ITEM_ID"),
                    ITEM_DESCRIPTION = dataRow.Field<string>("ITEM_DESCRIPTION"),
                    CUST_ITEM_NO = dataRow.Field<string>("CUST_ITEM_NO"),
                    SERIAL_CONTROLLED = dataRow.Field<string>("SERIAL_CONTROLLED"),
                    LOT_CONTROLLED = dataRow.Field<string>("LOT_CONTROLLED"),
                    CHARGE_CODE = dataRow.Field<string>("CHARGE_CODE")
                }).ToList();

                //tupleOutput = new Tuple<long, List<VM_DEPARTMENT_CART_ITEMS>>(AtparStatusCodes.ATPAR_OK, deptItems);
                response.DataList = deptItems;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_POU_DEPT>();

            try
            {
                response.DataList = _commonPOURepo.GetUserDepartments(userID, orgGroupID);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }





        #region GetCartWorkstations 

        public AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS> GetCartWorkstations(string departmentID, string cartId, string orgGrpID, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS>();

            try
            {
                response.DataList = _commonPOURepo.GetCartWorkstations(departmentID, cartId, orgGrpID, appID);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion

        #region SearchInERPItemMaster
        public AtParWebApiResponse<VM_SEARCHITEM_DETAILS> SearchInERPItemMaster(string strItemID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            string erpObjName = null;
            DataSet inputParams = new DataSet();
            DataSet outputParams = new DataSet();
            var response = new AtParWebApiResponse<VM_SEARCHITEM_DETAILS>();
            try
            {
                var searchItemPrereqResult = Populate_SearchItem_Prerequisites(strItemID, deviceTokenEntry);
                statusCode = searchItemPrereqResult.Item1;
                inputParams = searchItemPrereqResult.Item2;
                outputParams = searchItemPrereqResult.Item3;
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in Populate_SearchItem_Prerequisites :" + "StatusCode is :" + statusCode); }
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                List<string> lstParameters = new List<string>
                { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };

                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                erpObjName = AtParWebEnums.EnumApps.CartCount.ToString() + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                try
                {
                    var erpObjResult = CreateERPObject(erpObjName, inputParams, outputParams, deviceTokenEntry, "SearchItem", "SearchItem");
                    statusCode = erpObjResult.Item1;
                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {

                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                    outputParams = erpObjResult.Item2;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed to Create ERP Object .... " + Globals.EXCEPTION + ex.ToString()); }
                    response.AtParException(ex, _commonRepo, _log);
                    return response;
                }
                if (outputParams.Tables[0].Rows.Count > 0)
                {
                    var searchItems = outputParams.Tables[0].AsEnumerable().Select(dataRow => new VM_SEARCHITEM_DETAILS
                    {

                        ITEMID = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.ITEMID].ToString(),
                        ITEM_DESCR = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_DESCR].ToString(),
                        MFG_ITEM_ID = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.MFG_ITEM_ID].ToString(),
                        VENDOR_ITEM_ID = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.VENDOR_ITEM_ID].ToString(),
                        MANUFACTURER = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.MANUFACTURER].ToString(),
                        UPCID = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.UPCID].ToString(),
                        ITEM_PRICE = Convert.ToDouble(dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_PRICE]),
                        UOM = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.UOM].ToString(),
                        LOT_CONTROLLED = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.LOT_CONTROLLED].ToString(),
                        SERIAL_CONTROLLED = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.SERIAL_CONTROLLED].ToString(),
                        VENDOR_ID = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.VENDOR_ID].ToString(),
                        CUST_ITEM_ID = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.CUST_ITEM_NO].ToString(),
                        ITEM_TYPE = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_TYPE].ToString(),
                        GTIN = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.GTIN].ToString(),
                        IMPLANT_FLAG = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.IMPLANT_FLAG].ToString(),
                        ITEM_MASTER_ITEM_STATUS = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_MASTER_ITEM_STATUS].ToString(),
                        NON_CART_ITEM_STATUS = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.NON_CART_ITEM_STATUS].ToString(),
                        BILL_ITEM_STATUS = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.BILL_ITEM_STATUS].ToString(),
                        PAR_LOC_STATUS = dataRow[(int)AtParWebEnums.Search_POU_Item_Enum.PAR_LOC_STATUS].ToString(),


                    }).ToList();

                    response.DataList = searchItems;
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.INVAILD_ITEM, _commonRepo, _log);
                    return response;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in SearchInERPItemMaster :" + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public Tuple<long, DataSet, DataSet> Populate_SearchItem_Prerequisites(string strItemID, string[] deviceTokenEntry, int appID = 15, string strManufacuturer = "", string strDescription = "", bool blnScanFlag = false)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                Atpar_Application_Parameters atparParameters = default(Atpar_Application_Parameters);
                SortedList<string, string> profParams = new SortedList<string, string>();
                SortedList<string, string> orgParams = new SortedList<string, string>();
                DataTable searchItemHeader = default(DataTable);
                DataTable searchItemPreReq = default(DataTable);
                DataTable searchItemOutput = default(DataTable);
                DataSet inputParams = new DataSet();
                DataSet outputParams = new DataSet();
                try
                {
                    searchItemHeader = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Search_POU_Item_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed to create HEADER table :" + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }

                try
                {
                    searchItemPreReq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Search_POU_Item_PreReq_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed to create PREREQDATA table :" + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }
                inputParams.Tables.Add(searchItemHeader);
                inputParams.Tables.Add(searchItemPreReq);
                try
                {
                    searchItemOutput = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Search_POU_Item_Output_Defns, AtParWebEnums.DataSet_Type.OUTPUT.ToString());
                    outputParams.Tables.Add(searchItemOutput);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed to create OUTPUT table :" + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }
                try
                {
                    atparParameters = Atpar_Application_Parameters.CreateInstance(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString());
                    //To Get Org Parameters                    
                    orgParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_DESCR.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_PRICE.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = string.Empty;

                    atparParameters.ApplicationId = appID;
                    if (!string.IsNullOrEmpty(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString()))
                    {
                        atparParameters.OrgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();
                    }
                    else
                    {
                        atparParameters.OrgGroupId = string.Empty;
                    }
                    try
                    {
                        _commonRepo.GetOrgGroupParamValues(orgParams, appID, atparParameters.OrgGroupId);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                    }
                    //To Get Profile Parameters
                    profParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_NDC_TYPE_CODE.ToString()] = string.Empty;
                    profParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_UPN_TYPE_CODE.ToString()] = string.Empty;

                    atparParameters.ApplicationId = appID;
                    atparParameters.ProfileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();
                    try
                    {
                        _commonRepo.GetProfileParamValues(orgParams, appID, atparParameters.ProfileId);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                    }

                    DataRow preReqDataRow = inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();

                    preReqDataRow[(int)AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_NDC_TYPE_CODE] = profParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_NDC_TYPE_CODE.ToString()];
                    preReqDataRow[(int)AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_UPN_TYPE_CODE] = profParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                    preReqDataRow[(int)AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_DESCR] = orgParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_DESCR.ToString()];
                    preReqDataRow[(int)AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_PRICE] = orgParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.ITEM_PRICE.ToString()];
                    preReqDataRow[(int)AtParWebEnums.Search_POU_Item_PreReqData_Enum.DEFAULT_MFG_ITEM_ID] = orgParams[AtParWebEnums.Search_POU_Item_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString()];

                    List<string> lstParameters = new List<string>
                    {
                        AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString(),
                        AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString()
                    };
                    var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
                    var remoteSchema = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                    var remoteDataBase = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    preReqDataRow[(int)AtParWebEnums.Search_POU_Item_PreReqData_Enum.REMOTE_DATABASE] = remoteDataBase;
                    preReqDataRow[(int)AtParWebEnums.Search_POU_Item_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;
                    //Add parameter values to the PREREQDATA table
                    inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(preReqDataRow);

                    DataRow headersRow = inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();

                    headersRow[(int)AtParWebEnums.Search_POU_Item_Header_Enum.ITEMID] = strItemID;
                    headersRow[(int)AtParWebEnums.Search_POU_Item_Header_Enum.ITEM_DESCR] = strDescription;
                    headersRow[(int)AtParWebEnums.Search_POU_Item_Header_Enum.MANUFACTURER] = strManufacuturer;
                    headersRow[(int)AtParWebEnums.Search_POU_Item_Header_Enum.SCANFLAG] = blnScanFlag;
                    //Add parameter values to the HEADER table
                    inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(headersRow);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed to populate Prerequisites :" + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }

                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.ATPAR_OK, inputParams, outputParams);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in PopulateInputParams :" + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
            }
        }

        #endregion

        #region RFID

        /// <summary>
        /// SearchItem
        /// </summary>
        /// <param name="strItemID"></param>
        /// <param name="appID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="blnScanFlag"></param>
        /// <param name="strFileType"></param>
        /// <param name="blnLocSelection"></param>
        /// <param name="dsInputParams"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_SEARCHITEM_DETAILS> SearchItem(string strItemID, int appID, string[] deviceTokenEntry, bool blnScanFlag = false, string strFileType = "", bool blnLocSelection = false, DataSet dsInputParams = null)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long statusCode = -1;
            string strDescription = string.Empty;
            string strManufacturer = string.Empty;
            string erpObjName = null;
            DataSet _dsInputParams = new DataSet();
            DataSet outputParams = new DataSet();
            var response = new AtParWebApiResponse<VM_SEARCHITEM_DETAILS>();
            try
            {

                var searchItemPrereqResult = Populate_SearchItem_Prerequisites(strItemID, deviceTokenEntry);
                statusCode = searchItemPrereqResult.Item1;
                _dsInputParams = searchItemPrereqResult.Item2;
                outputParams = searchItemPrereqResult.Item3;

                if (statusCode != (int)AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in Populate_SearchItem_Prerequisites :" + "StatusCode is :" + statusCode); }
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                List<string> lstParameters = new List<string>
                { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };

                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                if (statusCode != (int)AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + ":Failed in Populate_SearchItem_Prerequisites :" + " StatusCode is : " + statusCode);
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                ///// SearchInItemMaster ///'
                if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == AtParWebEnums.ClientType.WINSERVICE.ToString())
                {
                    Tuple<long, List<VM_SEARCHITEM_DETAILS>> result = SearchInItemMaster(_dsInputParams, outputParams, strItemID, deviceTokenEntry, appID, strFileType, blnScanFlag, blnLocSelection, strManufacturer, strDescription);
                    statusCode = result.Item1;
                    response.DataList = result.Item2;
                }
                else
                {
                    var result = SearchInItemMaster(_dsInputParams, outputParams, strItemID, deviceTokenEntry, appID, strFileType, blnScanFlag, blnLocSelection, strManufacturer, strDescription);

                    statusCode = result.Item1;
                    response.DataList = result.Item2;
                }



                if (statusCode == (int)AtparStatusCodes.S_FOUNDIN_ATPAR_ITEMMASTER || statusCode == (int)AtparStatusCodes.S_FOUNDIN_ERP_ITEMMASTER || statusCode == (int)AtparStatusCodes.S_FOUNDIN_ALLOCATEDCART)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":No of items returned is: " + response.DataList.Count() + "StatusCode is :" + statusCode); }
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;

                }
                else if (statusCode == (int)AtparStatusCodes.E_NORECORDFOUND)
                {
                    ///// SearchIn RefDB ///'
                    //statusCode = SearchInRefDB(strItemID, deviceTokenEntry, strManufacturer);

                    if (statusCode == (int)AtparStatusCodes.S_FOUNDIN_REFDB || statusCode == (int)AtparStatusCodes.E_NORECORDFOUND)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Failed in " + methodBaseName + " StatusCode is : " + statusCode);
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + ":Failed in SearchItem :" + " StatusCode is : " + statusCode);
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in SearchItem :" + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        /// <summary>
        /// SearchInItemMaster
        /// </summary>
        /// <param name="inputParams"></param>
        /// <param name="strItemId"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="appID"></param>
        /// <param name="strFileType"></param>
        /// <param name="blnScanFlag"></param>
        /// <param name="blnLocSelection"></param>
        /// <param name="strManufacturer"></param>
        /// <param name="strDescription"></param>
        /// <returns></returns>
        public Tuple<long, List<VM_SEARCHITEM_DETAILS>> SearchInItemMaster(DataSet inputParams, DataSet outputParams, string strItemId, string[] deviceTokenEntry, int appID = 15, string strFileType = "", bool blnScanFlag = false, bool blnLocSelection = true, string strManufacturer = "", string strDescription = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long StatusCode = -1;
            List<VM_SEARCHITEM_DETAILS> lstOutputParams = new List<VM_SEARCHITEM_DETAILS>();
            try
            {

                SortedList<string, string> profParams = new SortedList<string, string>();
                SortedList<string, string> orgParams = new SortedList<string, string>();
                string erpObjName = null;
                string strSystemId = string.Empty;
                string strResult = string.Empty;
                string strItemIds = string.Empty;
                
                VM_SEARCHITEM_DETAILS objItem = null;


                List<string> lstParameters =
                           new List<string> { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };

                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                //need to check again
                erpObjName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (erpObjName.ToUpper() == AtParWebEnums.Enterprise_Enum.Peoplesoft.ToString().ToUpper() ||
                    erpObjName.ToUpper() == AtParWebEnums.Enterprise_Enum.PMM.ToString().ToUpper() ||
                    erpObjName.ToUpper() == AtParWebEnums.Enterprise_Enum.Lawson.ToString().ToUpper())
                {
                    erpObjName = AtParWebEnums.EnumApps.CartCount + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                    if (!string.IsNullOrEmpty(strItemId) || !string.IsNullOrEmpty(strManufacturer) || !string.IsNullOrEmpty(strDescription))
                    {
                        string className = null;
                        string methodName = string.Empty;
                        MethodInfo MethodName = null;
                        object reflectObject = null;

                        className = "SearchItem";
                        methodName = "SearchItem";
                        // drDet = outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();
                        //outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(drDet);

                        MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                        object[] args = { inputParams, outputParams, deviceTokenEntry };

                        StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                        if (StatusCode == (int)AtparStatusCodes.ATPAR_OK)
                        {

                            outputParams = (DataSet)args[1];
                            foreach (DataRow dr in outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows)
                            {
                                if (erpObjName == AtParWebEnums.Enterprise_Enum.Lawson.ToString())
                                {
                                    dr[(int)AtParWebEnums.Search_POU_Item_Enum.NON_CART_ITEM_STATUS] = string.Empty;
                                    dr[(int)AtParWebEnums.Search_POU_Item_Enum.BILL_ITEM_STATUS] = string.Empty;
                                    dr[(int)AtParWebEnums.Search_POU_Item_Enum.PAR_LOC_STATUS] = string.Empty;
                                }
                                else
                                {

                                    dr[(int)AtParWebEnums.Search_POU_Item_Enum.IMPLANT_FLAG] = AtParWebEnums.YesNo_Enum.N.ToString();
                                    dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_MASTER_ITEM_STATUS] = AtParWebEnums.YesNo_Enum.Y.ToString();
                                    dr[(int)AtParWebEnums.Search_POU_Item_Enum.NON_CART_ITEM_STATUS] = string.Empty;
                                    dr[(int)AtParWebEnums.Search_POU_Item_Enum.BILL_ITEM_STATUS] = string.Empty;
                                    dr[(int)AtParWebEnums.Search_POU_Item_Enum.PAR_LOC_STATUS] = string.Empty;
                                }

                                objItem = CreateSearchItemInstance(dr);

                                lstOutputParams.Add(objItem);

                            }



                            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_FOUNDIN_ERP_ITEMMASTER, lstOutputParams);
                        }
                        else if (StatusCode == (int)AtparStatusCodes.E_NORECORDFOUND)
                        {

                            var lstSearchItems = _commonPOURepo.GetCartDetails(strItemId, strManufacturer, strDescription, blnScanFlag, deviceTokenEntry);

                            if (lstSearchItems.Count > 0)
                            {

                                var lstInActive = lstSearchItems.Where(x => (x.ITEM_MASTER_ITEM_STATUS != "1"));

                                if (lstInActive != null && lstInActive.Count() > 0)
                                {
                                    //List<string> lstItemId = new List<string>();
                                    foreach (var item in lstInActive)
                                    {
                                        if (string.IsNullOrEmpty(strItemIds))
                                        {
                                            strItemIds = item.ITEMID;
                                        }
                                        else
                                        {
                                            strItemIds += "," + item.ITEMID;
                                        }
                                        //lstItemId.Add(item.ITEMID);
                                    }

                                    strResult = RemoveDuplicates(strItemIds);

                                    if (strResult == string.Empty)
                                    {
                                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed to remove duplicate values "); }

                                        return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_SERVERERROR, null);
                                    }
                                    strResult = strResult.Replace("'", "");



                                    foreach (var item in lstInActive)
                                    {
                                        DataRow _dr = outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();

                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEMID] = item.ITEMID;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_DESCR] = item.ITEM_DESCR;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.MFG_ITEM_ID] = item.MFG_ITEM_ID;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.VENDOR_ITEM_ID] = item.VENDOR_ITEM_ID;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.UPCID] = item.UPCID;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.GTIN] = item.GTIN;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.UOM] = item.UOM;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_PRICE] = item.ITEM_PRICE;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.LOT_CONTROLLED] = item.LOT_CONTROLLED;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.SERIAL_CONTROLLED] = item.SERIAL_CONTROLLED;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.VENDOR_ID] = item.VENDOR_ID;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.CUST_ITEM_NO] = item.CUST_ITEM_ID;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.MANUFACTURER] = item.MANUFACTURER;

                                        //Logic to Update output dataset with item properties
                                        StatusCode = GetItemProperties(strResult, item.ITEMID);

                                        if (StatusCode != (int)AtparStatusCodes.ATPAR_OK)
                                        {
                                            if (_log.IsFatalEnabled)
                                            {
                                                _log.Fatal(methodBaseName + ":Failed to Update output dataset with item properties");
                                            }
                                            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_SERVERERROR, null);
                                        }


                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.IMPLANT_FLAG] = strImplantFlag;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_MASTER_ITEM_STATUS] = strItemMstItemStatus;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.NON_CART_ITEM_STATUS] = strNonCartItemStatus;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.BILL_ITEM_STATUS] = strBillItemStatus;
                                        _dr[(int)AtParWebEnums.Search_POU_Item_Enum.PAR_LOC_STATUS] = strParLocStatus;

                                        outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(_dr);

                                    }
                                    if (blnLocSelection)
                                    {
                                        var lstGetCompDetails = _commonPOURepo.SearchItemInAllocatedCarts(lstSearchItems.FirstOrDefault().ITEMID, deviceTokenEntry);

                                        if (lstGetCompDetails.Count > 0)
                                        {
                                            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_FOUNDIN_ALLOCATEDCART, lstGetCompDetails);
                                        }
                                        else
                                        {
                                            foreach (DataRow dr in outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows)
                                            {
                                                objItem = CreateSearchItemInstance(dr);
                                                if (objItem != null)
                                                    lstOutputParams.Add(objItem);
                                            }
                                            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_FOUNDIN_ATPAR_ITEMMASTER, lstOutputParams);
                                        }
                                    }
                                }
                                else
                                {
                                    var list = lstSearchItems.Where(x => (x.STATUS == 1 && (x.ITEMID == strItemId || x.MFG_ITEM_ID == strItemId || x.VENDOR_ITEM_ID == strItemId || x.GTIN == strItemId || x.UPCID == strItemId || x.CUST_ITEM_ID == strItemId))).ToList();

                                    if (list != null && list.Count() > 0)
                                    {
                                        return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_POU_INACTIVEITEM, null);
                                    }
                                    else
                                    {
                                        var result = SearchInNonCart(inputParams, deviceTokenEntry, strFileType, blnScanFlag, strManufacturer, strDescription);

                                        StatusCode = result.Item1;
                                        lstOutputParams = result.Item2;

                                    }
                                }


                            }
                            else
                            {
                                var result = SearchInNonCart(inputParams, deviceTokenEntry, strFileType, blnScanFlag, strManufacturer, strDescription);
                                StatusCode = result.Item1;
                                lstOutputParams = result.Item2;
                            }
                        }
                    }
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.CartCount + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    var lstSearchItems = _commonPOURepo.GetCartDetails(strItemId, strManufacturer, strDescription, blnScanFlag, deviceTokenEntry, false);
                    if (lstSearchItems.Count > 0)
                    {
                        var lstInActive = lstSearchItems.Where(x => (x.STATUS != 1));

                        if (lstInActive != null && lstInActive.Count() > 0)
                        {
                            //List<string> lstItemId = new List<string>();
                            foreach (var item in lstInActive)
                            {
                                if (string.IsNullOrEmpty(strItemIds))
                                {
                                    strItemIds = item.ITEMID;
                                }
                                else
                                {
                                    strItemIds += "," + item.ITEMID;
                                }
                                //lstItemId.Add(item.ITEMID);
                            }

                            strResult = RemoveDuplicates(strItemIds);

                            if (strResult == string.Empty)
                            {
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed to remove duplicate values "); }

                                return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_SERVERERROR, null);
                            }
                            strResult = strResult.Replace("'", "");



                            foreach (var item in lstInActive)
                            {
                                DataRow _dr = outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();

                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEMID] = item.ITEMID;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_DESCR] = item.ITEM_DESCR;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.MFG_ITEM_ID] = item.MFG_ITEM_ID;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.VENDOR_ITEM_ID] = item.VENDOR_ITEM_ID;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.UPCID] = item.UPCID;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.GTIN] = item.GTIN;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.UOM] = item.UOM;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_PRICE] = item.ITEM_PRICE;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.LOT_CONTROLLED] = item.LOT_CONTROLLED;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.SERIAL_CONTROLLED] = item.SERIAL_CONTROLLED;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.VENDOR_ID] = item.VENDOR_ID;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.CUST_ITEM_NO] = item.CUST_ITEM_ID;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.MANUFACTURER] = item.MANUFACTURER;

                                //Logic to Update output dataset with item properties
                                StatusCode = GetItemProperties(strResult, item.ITEMID);

                                if (StatusCode != (int)AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal(methodBaseName + ":Failed to Update output dataset with item properties");
                                    }
                                    return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_SERVERERROR, null);
                                }


                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.IMPLANT_FLAG] = strImplantFlag;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_MASTER_ITEM_STATUS] = strItemMstItemStatus;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.NON_CART_ITEM_STATUS] = strNonCartItemStatus;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.BILL_ITEM_STATUS] = strBillItemStatus;
                                _dr[(int)AtParWebEnums.Search_POU_Item_Enum.PAR_LOC_STATUS] = strParLocStatus;

                                outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(_dr);
                                StatusCode = AtparStatusCodes.ATPAR_OK;

                            }
                            if (blnLocSelection)
                            {
                                var lstGetCompDetails = _commonPOURepo.SearchItemInAllocatedCarts(lstSearchItems.FirstOrDefault().ITEMID, deviceTokenEntry);

                                if (lstGetCompDetails.Count > 0)
                                {
                                    return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_FOUNDIN_ALLOCATEDCART, lstGetCompDetails);
                                }
                                else
                                {
                                    foreach (DataRow dr in outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows)
                                    {
                                        objItem = CreateSearchItemInstance(dr);
                                        lstOutputParams.Add(objItem);
                                    }

                                    return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_FOUNDIN_ATPAR_ITEMMASTER, lstOutputParams);
                                }


                            }
                        }
                        else
                        {
                            var list = lstSearchItems.Where(x => (x.STATUS == 1 && (x.ITEMID == strItemId || x.MFG_ITEM_ID == strItemId || x.VENDOR_ITEM_ID == strItemId || x.GTIN == strItemId || x.UPCID == strItemId || x.CUST_ITEM_ID == strItemId))).ToList();

                            if (list != null && list.Count() > 0)
                            {
                                return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_POU_INACTIVEITEM, null);
                            }
                            else
                            {
                                var result = SearchInNonCart(inputParams, deviceTokenEntry, strFileType, blnScanFlag, strManufacturer, strDescription);

                                StatusCode = result.Item1;
                                lstOutputParams = result.Item2;

                            }
                        }


                    }
                    else
                    {
                        var result = SearchInNonCart(inputParams, deviceTokenEntry, strFileType, blnScanFlag, strManufacturer, strDescription);

                        StatusCode = result.Item1;
                        lstOutputParams = result.Item2;
                    }

                    //Checking the statuscode of "SearchInNonCart" function
                    if (StatusCode == (int)AtparStatusCodes.E_NORECORDFOUND &&
                        (erpObjName == AtParWebEnums.Enterprise_Enum.Peoplesoft.ToString() ||
                         erpObjName == AtParWebEnums.Enterprise_Enum.PMM.ToString() ||
                         erpObjName == AtParWebEnums.Enterprise_Enum.Lawson.ToString()))
                    {
                        //Scan flag is handling only for peoplesoft (with scan:full search) 

                        DataTable dtScanFlag = new DataTable();
                        DataRow drScanFlag;// = new DataRow();
                        dtScanFlag.TableName = "DT_SCAN_FLAG";
                        dtScanFlag.Columns.Add("SCAN_FLAG");

                        drScanFlag = dtScanFlag.NewRow();
                        drScanFlag["SCAN_FLAG"] = blnScanFlag;
                        dtScanFlag.Rows.Add(drScanFlag);
                        inputParams.Tables.Add(dtScanFlag);
                        inputParams.AcceptChanges();

                        string className = null;
                        string methodName = string.Empty;
                        MethodInfo MethodName = null;
                        object reflectObject = null;

                        className = "SearchItem";
                        methodName = "SearchItem";


                        MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                        object[] args = { inputParams, outputParams, deviceTokenEntry };

                        StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                        if (StatusCode == (int)AtparStatusCodes.ATPAR_OK)
                        {
                            outputParams = (DataSet)args[1];
                            foreach (DataRow dr in outputParams.Tables[0].Rows)
                            {
                                objItem = CreateSearchItemInstance(dr);
                                lstOutputParams.Add(objItem);
                            }

                            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_FOUNDIN_ERP_ITEMMASTER, lstOutputParams);
                        }
                        else
                        {
                            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(StatusCode, null);
                        }

                    }
                    else if (StatusCode == (int)AtparStatusCodes.ATPAR_OK)
                    {

                        foreach (DataRow dr in outputParams.Tables[0].Rows)
                        {

                            objItem = CreateSearchItemInstance(dr);
                            lstOutputParams.Add(objItem);
                        }

                        return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_FOUNDIN_ERP_ITEMMASTER, lstOutputParams);
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in SearchInItemMaster :" + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_SERVERERROR, null);
            }
            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(StatusCode, lstOutputParams);
        }

        /// <summary>
        /// SearchInRefDB
        /// </summary>
        /// <param name="strItemID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="strManufacturer"></param>
        /// <returns></returns>
        public Tuple<long, List<VM_SEARCHITEM_DETAILS>> SearchInRefDB(string strItemID, string[] deviceTokenEntry, string strManufacturer)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_SERVERERROR, null);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in SearchInRefDB :" + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        /// <summary>
        /// RemoveDuplicates
        /// </summary>
        /// <param name="pstr"></param>
        /// <returns></returns>
        public string RemoveDuplicates(string pstr)
        {
            try
            {
                string pRtnVals = string.Empty;
                List<string> _strArray = null;
                if (!string.IsNullOrEmpty(pstr))
                {
                    pstr = "'" + pstr + "'";
                    _strArray = pstr.Split(',').ToList();
                    List<string> arlst = new List<string>();
                    foreach (string str in _strArray)
                    {
                        if (!arlst.Contains(str.ToUpper()))
                        {
                            arlst.Add(str.ToUpper());
                            if (pRtnVals == string.Empty)
                            {
                                pRtnVals = str.ToString();
                            }
                            else
                            {
                                pRtnVals = pRtnVals + "," + str.ToString();
                            }
                        }
                    }

                    return pRtnVals;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return string.Empty;
        }

        /// <summary>
        /// GetItemProperties
        /// </summary>
        /// <param name="strResult"></param>
        /// <param name="strItemId"></param>
        /// <returns></returns>
        public long GetItemProperties(string strResult, string strItemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            List<string> lstResult = new List<string>();
            DataRow drItemProps;

            try
            {
                Tuple<long, DataSet> dsCaseItemsProps;

                dsCaseItemsProps = _commonPOURepo.GetCaseItemsProperties(strResult);
                //caseItemProps.item1
                if (dsCaseItemsProps.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    return AtparStatusCodes.E_SERVERERROR;

                }
                if (dsCaseItemsProps.Item2.Tables[0] != null && dsCaseItemsProps.Item2.Tables[0].Rows.Count > 0)
                {
                    //item master and par location check
                    drItemProps = dsCaseItemsProps.Item2.Tables[0].Select("ITEMID= '" + strItemId + "' AND PAR_LOC_STATUS <> '' ").FirstOrDefault();

                    if (drItemProps != null)
                    {
                        strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                        strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                        strParLocStatus = drItemProps["PAR_LOC_STATUS"].ToString();
                        StatusCode = AtparStatusCodes.ATPAR_OK;
                    }
                    else
                    {
                        //non cart and item master check
                        if (dsCaseItemsProps.Item2.Tables[1] != null && dsCaseItemsProps.Item2.Tables[1].Rows.Count > 0)
                        {
                            drItemProps = dsCaseItemsProps.Item2.Tables[1].Select("ITEMID= '" + strItemId + "'").FirstOrDefault();

                            if (drItemProps != null)
                            {
                                strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                                strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                                strNonCartItemStatus = drItemProps["NON_CART_ITEM_STATUS"].ToString();
                                StatusCode = AtparStatusCodes.ATPAR_OK;
                            }
                            else
                            {
                                //bill only and item master check
                                if (dsCaseItemsProps.Item2.Tables[2] != null && dsCaseItemsProps.Item2.Tables[2].Rows.Count > 0)
                                {
                                    drItemProps = dsCaseItemsProps.Item2.Tables[2].Select("ITEMID= '" + strItemId + "'").FirstOrDefault();
                                    if (drItemProps != null)
                                    {
                                        strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                                        strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                                        strBillItemStatus = drItemProps["BILL_ITEM_STATUS"].ToString();
                                        StatusCode = AtparStatusCodes.ATPAR_OK;
                                    }
                                    else
                                    {
                                        drItemProps = dsCaseItemsProps.Item2.Tables[0].Select("ITEMID= '" + strItemId + "'").FirstOrDefault();
                                        if (drItemProps != null)
                                        {
                                            strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                                            strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                                            StatusCode = AtparStatusCodes.ATPAR_OK;
                                        }
                                    }
                                }
                                else
                                {
                                    drItemProps = dsCaseItemsProps.Item2.Tables[0].Select("ITEMID= '" + strItemId + "'").FirstOrDefault();
                                    if (drItemProps != null)
                                    {
                                        strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                                        strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                                        StatusCode = AtparStatusCodes.ATPAR_OK;
                                    }
                                }

                            }
                        }
                        else if (dsCaseItemsProps.Item2.Tables[2] != null && dsCaseItemsProps.Item2.Tables[2].Rows.Count > 0)
                        {
                            //bill only and item master check
                            drItemProps = dsCaseItemsProps.Item2.Tables[2].Select("ITEMID= '" + strItemId + "'").FirstOrDefault();
                            if (drItemProps != null)
                            {
                                strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                                strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                                strBillItemStatus = drItemProps["BILL_ITEM_STATUS"].ToString();
                                StatusCode = AtparStatusCodes.ATPAR_OK;
                            }
                        }
                        else
                        {
                            drItemProps = dsCaseItemsProps.Item2.Tables[0].Select("ITEMID= '" + strItemId + "'").FirstOrDefault();
                            if (drItemProps != null)
                            {
                                strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                                strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                                StatusCode = AtparStatusCodes.ATPAR_OK;
                            }
                        }
                    }
                }
                else if (dsCaseItemsProps.Item2.Tables[1] != null && dsCaseItemsProps.Item2.Tables[1].Rows.Count > 0)
                {
                    drItemProps = dsCaseItemsProps.Item2.Tables[1].Select("ITEMID= '" + strItemId + "'").FirstOrDefault();
                    //non cart and item master check
                    if (drItemProps != null)
                    {
                        strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                        strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                        strNonCartItemStatus = drItemProps["NON_CART_ITEM_STATUS"].ToString();
                        StatusCode = AtparStatusCodes.ATPAR_OK;
                    }
                    else
                    {
                        if (dsCaseItemsProps.Item2.Tables[2] != null && dsCaseItemsProps.Item2.Tables[2].Rows.Count > 0)
                        {
                            //bill only and item master check
                            drItemProps = dsCaseItemsProps.Item2.Tables[2].Select("ITEMID= '" + strItemId + "'").FirstOrDefault();
                            if (drItemProps != null)
                            {
                                strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                                strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                                strBillItemStatus = drItemProps["BILL_ITEM_STATUS"].ToString();
                                StatusCode = AtparStatusCodes.ATPAR_OK;
                            }
                        }
                        else
                        {
                            StatusCode = AtparStatusCodes.ATPAR_OK;
                        }
                    }

                }
                else if (dsCaseItemsProps.Item2.Tables[2] != null && dsCaseItemsProps.Item2.Tables[2].Rows.Count > 0)
                {
                    //bill only and item master check
                    drItemProps = dsCaseItemsProps.Item2.Tables[2].Select("ITEMID= '" + strItemId + "'").FirstOrDefault();
                    if (drItemProps != null)
                    {
                        strImplantFlag = drItemProps["IMPLANT_FLAG"].ToString();
                        strItemMstItemStatus = drItemProps["ITEM_MASTER_ITEM_STATUS"].ToString();
                        strBillItemStatus = drItemProps["BILL_ITEM_STATUS"].ToString();
                        StatusCode = AtparStatusCodes.ATPAR_OK;
                    }
                }

                return StatusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in SearchInRefDB : GetItemProperties" + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;

            }
        }

        /// <summary>
        /// SearchInNonCart
        /// </summary>
        /// <param name="inputParams"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="strFileType"></param>
        /// <param name="blnScanFlag"></param>
        /// <param name="strManufacturer"></param>
        /// <param name="strDescription"></param>
        /// <returns></returns>
        public Tuple<long, List<VM_SEARCHITEM_DETAILS>> SearchInNonCart(DataSet inputParams, string[] deviceTokenEntry, string strFileType = "", bool blnScanFlag = false, string strManufacturer = "", string strDescription = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<VM_SEARCHITEM_DETAILS> lstNonCartItemDetails = new List<VM_SEARCHITEM_DETAILS>();
            string strResult = string.Empty;
            string strSearch = string.Empty;
            try
            {
                strSearch = inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Search_POU_Item_Header_Enum.ITEMID].ToString();

                lstNonCartItemDetails = _commonPOURepo.SearchItemInNonCart(strSearch, strManufacturer, strDescription, blnScanFlag, deviceTokenEntry);

                if (lstNonCartItemDetails != null && lstNonCartItemDetails.Count > 0)
                {

                    // 0-Active
                    // 1-Inactive
                    // 2-Pending
                    var lstActiveItems = lstNonCartItemDetails.Where(x => (x.NON_CART_ITEM_STATUS != AtParWebEnums.YesNo_Enum.N.ToString())).ToList();
                    if (lstActiveItems != null && lstActiveItems.Count() > 0)
                    {
                        //List<string> lstItemId = new List<string>();
                        string strItems = string.Empty;

                        foreach (var item in lstActiveItems)
                        {
                            if (string.IsNullOrEmpty(strItems))
                            {
                                strItems = item.ITEMID;
                            }
                            else
                            {
                                strItems += "," + item.ITEMID;
                            }
                            //lstItemId.Add(item.ITEMID);
                        }

                        strResult = RemoveDuplicates(strItems);

                        if (strResult == string.Empty)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed to remove duplicate values "); }

                            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_SERVERERROR, null);
                        }
                        strResult = strResult.Replace("'", "");

                        foreach (var item in lstNonCartItemDetails)
                        {


                            var StatusCode = GetItemProperties(strResult, item.ITEMID);

                            if (StatusCode != (int)AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + ":Failed to Update output dataset with item properties");
                                }
                                return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_SERVERERROR, null);
                            }

                            item.IMPLANT_FLAG = strImplantFlag;
                            item.ITEM_MASTER_ITEM_STATUS = strItemMstItemStatus;
                            item.NON_CART_ITEM_STATUS = strNonCartItemStatus;
                            item.BILL_ITEM_STATUS = strBillItemStatus;
                            item.PAR_LOC_STATUS = strParLocStatus;

                            //lstNonCartItemDetails.Add(objCartItem);

                        }

                    }
                    else
                    {
                        var list = lstNonCartItemDetails.Where(x => (x.STATUS == 1 && (x.ITEMID == strSearch || x.MFG_ITEM_ID == strSearch || x.VENDOR_ITEM_ID == strSearch || x.GTIN == strSearch || x.UPCID == strSearch || x.CUST_ITEM_ID == strSearch))).ToList();

                        if (list != null && list.Count() > 0)
                        {
                            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.S_POU_INACTIVEITEM, null);
                        }
                        else
                        {
                            return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_NORECORDFOUND, null);
                        }
                    }
                }
                else
                {
                    return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.E_NORECORDFOUND, null);
                }
                return new Tuple<long, List<VM_SEARCHITEM_DETAILS>>(AtparStatusCodes.ATPAR_OK, lstNonCartItemDetails);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in SearchInNonCart :" + Globals.EXCEPTION + ex.ToString()); }
                throw ex;

            }
        }

        /// <summary>
        /// CreateSearchItemInstance
        /// </summary>
        /// <param name="dr"></param>
        /// <returns></returns>
        public VM_SEARCHITEM_DETAILS CreateSearchItemInstance(DataRow dr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            VM_SEARCHITEM_DETAILS objItem = new VM_SEARCHITEM_DETAILS();
            try
            {


                objItem.ITEMID = dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEMID].ToString();
                objItem.ITEM_MASTER_ITEM_STATUS = dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_MASTER_ITEM_STATUS].ToString();
                objItem.CUST_ITEM_ID = dr[(int)AtParWebEnums.Search_POU_Item_Enum.CUST_ITEM_NO].ToString();
                objItem.ITEM_DESCR = dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_DESCR].ToString();
                objItem.MFG_ITEM_ID = dr[(int)AtParWebEnums.Search_POU_Item_Enum.MFG_ITEM_ID].ToString();
                objItem.VENDOR_ITEM_ID = dr[(int)AtParWebEnums.Search_POU_Item_Enum.VENDOR_ITEM_ID].ToString();
                objItem.UPCID = dr[(int)AtParWebEnums.Search_POU_Item_Enum.UPCID].ToString();
                objItem.UOM = dr[(int)AtParWebEnums.Search_POU_Item_Enum.UOM].ToString();
                objItem.ITEM_PRICE = Convert.ToDouble(dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_PRICE].ToString());
                objItem.LOT_CONTROLLED = dr[(int)AtParWebEnums.Search_POU_Item_Enum.LOT_CONTROLLED].ToString();
                objItem.SERIAL_CONTROLLED = dr[(int)AtParWebEnums.Search_POU_Item_Enum.SERIAL_CONTROLLED].ToString();
                objItem.VENDOR_ID = dr[(int)AtParWebEnums.Search_POU_Item_Enum.VENDOR_ID].ToString();
                objItem.GTIN = dr[(int)AtParWebEnums.Search_POU_Item_Enum.GTIN].ToString();
                objItem.MANUFACTURER = dr[(int)AtParWebEnums.Search_POU_Item_Enum.MANUFACTURER].ToString();
                objItem.PAR_LOC_STATUS = dr[(int)AtParWebEnums.Search_POU_Item_Enum.PAR_LOC_STATUS].ToString();
                objItem.ITEM_TYPE = dr[(int)AtParWebEnums.Search_POU_Item_Enum.ITEM_TYPE].ToString();
                objItem.NON_CART_ITEM_STATUS = dr[(int)AtParWebEnums.Search_POU_Item_Enum.NON_CART_ITEM_STATUS].ToString();

                objItem.BILL_ITEM_STATUS = dr[(int)AtParWebEnums.Search_POU_Item_Enum.BILL_ITEM_STATUS].ToString();
                //if ((dr[(int)AtParWebEnums.Search_POU_Item_Enum.SERIAL_NUMBER].ToString())!=null)
                //{
                //    objItem.SERIAL_NUMBER = dr[(int)AtParWebEnums.Search_POU_Item_Enum.SERIAL_NUMBER].ToString();
                //}
                //if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Search_POU_Item_Enum.LOT_NUMBER].ToString()))
                //{
                //    objItem.LOT_NUMBER = dr[(int)AtParWebEnums.Search_POU_Item_Enum.LOT_NUMBER].ToString();
                //}



                //if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Search_POU_Item_Enum.BUSINESS_UNIT].ToString()))
                //{
                //    objItem.BUSINESS_UNIT = dr[(int)AtParWebEnums.Search_POU_Item_Enum.BUSINESS_UNIT].ToString();
                //}


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":Failed in SearchInItemMaster : CreateSearchItemInstance" + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            return objItem;
        }

        #endregion

        /// <summary>
        /// CreateERPObject
        /// </summary>
        /// <param name="erpObjName"></param>
        /// <param name="inputParams"></param>
        /// <param name="outputParams"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="className"></param>
        /// <param name="methodName"></param>
        /// <returns></returns>
        private Tuple<long, DataSet> CreateERPObject(string erpObjName, DataSet inputParams, DataSet outputParams, string[] deviceTokenEntry, string className = "", string methodName = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                //GetConfigData();

                object reflectObject = null;
                var MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);
                object[] args = { inputParams, outputParams, deviceTokenEntry };

                var statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "CreateERPObject getting failed from ERP")); }
                    return new Tuple<long, DataSet>(statusCode, null);
                }
                outputParams = (DataSet)args[1];

                return new Tuple<long, DataSet>(statusCode, outputParams);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
        }

        /// <summary>
        /// GetCartDetails
        /// </summary>
        /// <param name="erpObjName"></param>
        /// <param name="inputParameters"></param>
        /// <param name="outputParameters"></param>
        /// <param name="objToken"></param>
        /// <returns></returns>
        public Tuple<long, DataSet> GetCartDetails(string erpObjName, DataSet inputParameters, DataSet outputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            Tuple<long, DataSet> tupleOutput = null;

            try
            {
                //Initializing
                //GetConfigData();

                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                className = "GetDetails";
                methodName = "GetDetails";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));
                if (StatusCode == (int)AtparStatusCodes.E_NORECORDFOUND)
                {
                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + ": No Records found for the Cart :"); }
                }
                else if (StatusCode != (int)AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                    return tupleOutput;
                }

                outputParameters = (DataSet)args[1];


                tupleOutput = new Tuple<long, DataSet>(StatusCode, outputParameters);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }
        }

        /// <summary>
        /// PrepareInputDataset
        /// </summary>
        /// <param name="InputputParameters"></param>
        /// <param name="OutParameters"></param>
        /// <returns></returns>
        public long PrepareInputDataset(ref DataSet InputputParameters, ref DataSet OutParameters)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataTable pouIssueheaderTbl = default(DataTable);
            DataTable pouIssuedetailsTbl = default(DataTable);
            DataTable pouIssuePreReqTbl = default(DataTable);
            DataTable pouIssueOutPutTbl = default(DataTable);
            try
            {
                InputputParameters = new DataSet("POU_Send_DS");
                try
                {
                    pouIssueheaderTbl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_StockIssue_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} :", " Failed to create the input parameters header :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                    return AtparStatusCodes.E_SERVERERROR;
                }
                try
                {
                    pouIssuedetailsTbl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_StockIssue_Details_Defns, AtParWebEnums.DataSet_Type.DETAILS.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} :", " Failed to create the input parameters details :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                    return AtparStatusCodes.E_SERVERERROR;
                }
                try
                {
                    pouIssuePreReqTbl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_StockIssue_BusinessRules_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} :", " Failed to create the input parameters PreReq table :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                try
                {
                    if (OutParameters.Tables.Count > 0)
                    {
                        OutParameters.Tables.Clear();
                        OutParameters.AcceptChanges();
                    }
                    pouIssueOutPutTbl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_StockIssue_Output_Defns, AtParWebEnums.DataSet_Type.OUTPUT.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} :", " Failed to create the input parameters Output table :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                    return AtparStatusCodes.E_SERVERERROR;
                }
                InputputParameters.Tables.Add(pouIssueheaderTbl);
                InputputParameters.Tables.Add(pouIssuedetailsTbl);
                InputputParameters.Tables.Add(pouIssuePreReqTbl);
                OutParameters.Tables.Add(pouIssueOutPutTbl);

                DataRow _drDet = OutParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();
                _drDet[(Int16)AtParWebEnums.Send_POU_Issue_Output_Enum.STATUS_CODE] = AtparStatusCodes.E_SERVERERROR;

                OutParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(_drDet);
                OutParameters.AcceptChanges();
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            return AtparStatusCodes.ATPAR_OK;
        }


    }
}

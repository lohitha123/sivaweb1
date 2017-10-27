using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.Repository.Interfaces.Common;
using log4net;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Common;
using AtPar.ViewModel;
using System.Xml.Linq;
using System.Reflection;
using AtPar_BusinessRules;
using System.Data;
using AtPar.Common;
using AtPar.Service.Interfaces.CartCount;

namespace AtPar.CartCount.Service
{
    public class GetDetailsService: IGetDetailsService
    {
        ICommonRepository _commonRepo;
        private ILog _log;
        public GetDetailsService(ICommonRepository commonRepository, ILog log)
        {
            _commonRepo = commonRepository;
            this._log = log;
        }

        public Tuple<long, DataSet> GetDetails(string orgGroupID, string businessUnit, string cartID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<long, DataSet> tupleOutput;
            DataTable cart_header_dt = new DataTable();
            DataSet inputParameters = new DataSet();
            DataSet outputParameters = new DataSet();
            DataRow drHeader;

            long StatusCode = -1;
            List<MT_CRCT_CRITICAL_ITEMS> lstCriticalItems = new List<MT_CRCT_CRITICAL_ITEMS>();

            try
            {

                cart_header_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Detail_Defns,
                                                                 AtParWebEnums.DataSet_Type.HEADERS.ToString());
                inputParameters.Tables.Add(cart_header_dt);


                drHeader = inputParameters.Tables[0].NewRow();
                drHeader[(int)AtParWebEnums.Get_Detail_Defns_Enum.BUSINESS_UNIT] = businessUnit;
                drHeader[(int)AtParWebEnums.Get_Detail_Defns_Enum.CART_ID] = cartID;
                inputParameters.Tables[0].Rows.Add(drHeader);

                StatusCode = Check_GetDetails_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                    return tupleOutput;
                }

                StatusCode = Execute_GetDetails_PreProcessTasks(inputParameters, outputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                    return tupleOutput;
                }

                StatusCode = Execute_GetDetails_ProcessTasks(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                    return tupleOutput;
                }

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


               var erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Cart_PreReqData_Enum.CARTS_MNGD_ATPAR].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                {

                    erpObjName = AtParWebEnums.Erp_Obj_Name.CartCount_Atpar.ToString();
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.CartCount.ToString() + "_" + erpObjName;
                }

                tupleOutput = GetCartDetails(erpObjName,inputParameters, outputParameters, deviceTokenEntry);

                if (tupleOutput.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<long, DataSet>(tupleOutput.Item1, null);
                    return tupleOutput;
                }

                return tupleOutput;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }

        }

        private long Check_GetDetails_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                if (_log.IsDebugEnabled)
                {
                    // comented by uday nant build not working
                    // inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                    // check if the right number of tables are in there

                    if (inputParameters.Tables.Count != 1)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Incorrect InputParameters DataTable Count " + inputParameters.Tables.Count);
                        return AtparStatusCodes.E_INVALIDPARAMETER;
                    }

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " row count is ... :" + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count.ToString() +
                                    ": for Cart :" + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID] + ":");

                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(" Exception thrown in " + methodBaseName + " is... " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }

        }

        private long Execute_GetDetails_PreProcessTasks(DataSet inputParameters, DataSet outputParameters,
                                                                           string[] deviceTokenEntry)
        {
            bool _blnCartReplenCtrl = false;
            bool _blnCartReplenOpt = false;
            bool _blnCompartment = false;
            bool _blnConsNonStock = false;
            bool _blnCountQty = false;
            bool _blnCountRequired = false;
            bool _blnCustItemNo = false;
            bool _blnDescr = false;
            bool _blnFoq = false;
            bool _blnGtin = false;
            bool _blnInventoryItem = false;
            bool _blnItemCountOrder = false;
            bool _blnItemID = false;
            bool _blnMaximumQty = false;
            bool _blnMfgItemID = false;
            bool _blnOptimalQty = false;
            bool _blnPrice = false;
            bool _blnPrintLaterFlag = false;
            bool _blnUom = false;
            bool _blnUpcID = false;
            bool _blnVndrItemID = false;
            bool _blnConsignmentItem = false;
            bool _blnReportField1 = false;
            bool _blnReportField2 = false;
            bool _blnReportField3 = false;
            bool _blnReportField4 = false;
            bool _blnPackagingString = false;

            SortedList<string, string> orgParams;
            SortedList<string, string> profParams;

            DataTable cart_br_dt = new DataTable();
            DataTable m_dtListViewReqFields = new DataTable();
            DataTable dtCartOutputHeader = new DataTable();
            DataTable dtCartOutputDetail = new DataTable();

            string OrgGroupId = string.Empty;
            string remoteSchema = "";
            string remoteDBType = "";

            try
            {
                // Add a new datatable to the input parameters 
                cart_br_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_PreReqData_Defns,
                                                       AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                inputParameters.Tables.Add(cart_br_dt);

                m_dtListViewReqFields = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_Detail_ListView_RequiredParams,
                                  AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString());

                inputParameters.Tables.Add(m_dtListViewReqFields);
                // End of Adding a new datatable to the input parameters 



                //Add a new datatable to the output parameters 

                dtCartOutputHeader = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_DetailOutput_Header_Defns,
                                                                              AtParWebEnums.DataSet_Type.HEADERS.ToString());
                outputParameters.Tables.Add(dtCartOutputHeader);



                dtCartOutputDetail = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_DetailOutput_Details_Defns,
                                                                                      AtParWebEnums.DataSet_Type.DETAILS.ToString());
                outputParameters.Tables.Add(dtCartOutputDetail);

                // End of adding a new datatable to the output parameters 


                // Get Org Parameters 
                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.CART_ALLOCATION.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.PACKAGING_STRING_FOR_LABELS.ToString()] = string.Empty;

                if ((deviceTokenEntry != null))
                {
                    OrgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();
                }

                _commonRepo.GetOrgGroupParamValues(orgParams, (int)AtParWebEnums.EnumApps.CartCount, OrgGroupId);

                //End of Getting Org Parameters 


                // Get Profile Parameters 
                profParams = new SortedList<string, string>();
                profParams[AtParWebEnums.AppParameters_Enum.PUTAWAY_CART_ITEMS.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.QTY_OPTION.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()] = string.Empty;


                _commonRepo.GetProfileParamValues(profParams, (int)AtParWebEnums.EnumApps.CartCount,
                                       deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString());


                List<string> _reqdParams = _commonRepo.GetListViewDetails(((int)AtParWebEnums.EnumApps.CartCount).ToString(),
                   "ITEM COUNTS", deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString());

                if ((_reqdParams != null))
                {
                    if (!(_reqdParams.Count > 0))
                    {
                        //if (_log.IsWarnEnabled)
                        //    _log.Warn(methodBaseName + " Screen Display Setup did not return any rows for screen name: ITEM COUNTS" + " for Profile ID :" + pDeviceTokenEntry(TokenEntry_Enum.ProfileID) + ":");
                    }
                    else
                    {
                        foreach (var item in _reqdParams)
                        {
                            switch ((AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum)Enum.Parse(typeof(AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum), item))
                            {
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_CTRL:
                                    _blnCartReplenCtrl = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_OPT:
                                    _blnCartReplenOpt = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COMPARTMENT:
                                    _blnCompartment = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CONS_NON_STOCK:
                                    _blnConsNonStock = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_QTY:
                                    _blnCountQty = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_REQUIRED:
                                    _blnCountRequired = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CUST_ITEM_NO:
                                    _blnCustItemNo = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.DESCR:
                                    _blnDescr = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.FOQ:
                                    _blnFoq = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.GTIN:
                                    _blnGtin = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.INVENTORY_ITEM:
                                    _blnInventoryItem = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_COUNT_ORDER:
                                    _blnItemCountOrder = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_ID:
                                    _blnItemID = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.MAXIMUM_QTY:
                                    _blnMaximumQty = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID:
                                    _blnMfgItemID = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.OPTIMAL_QTY:
                                    _blnOptimalQty = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PRICE:
                                    _blnPrice = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PRINT_LATER_FLAG:
                                    _blnPrintLaterFlag = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.UOM:
                                    _blnUom = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.UPC_ID:
                                    _blnUpcID = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.VNDR_ITEM_ID:
                                    _blnVndrItemID = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CONSIGNMENT_ITEM:
                                    _blnConsignmentItem = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_1:
                                    _blnReportField1 = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_2:
                                    _blnReportField2 = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_3:
                                    _blnReportField3 = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_4:
                                    _blnReportField4 = true;
                                    break;
                                case AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PACKAGING_STRING:
                                    _blnPackagingString = true;
                                    break;
                            }
                        }


                    }
                }

                // Add Profile Parameters and Org Parameters to PreReqData Table 
                DataRow dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
                DataRow drListViewReqFields = m_dtListViewReqFields.NewRow();

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                remoteDBType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.CART_ALLOCATION] = orgParams[AtParWebEnums.AppParameters_Enum.CART_ALLOCATION.ToString()];
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_PRICE] = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_DESCR] = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.DEFAULT_MFG_ITEM_ID] = orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.PUTAWAY_CART_ITEMS] = profParams[AtParWebEnums.AppParameters_Enum.PUTAWAY_CART_ITEMS.ToString()];
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.QTY_OPTION] = profParams[AtParWebEnums.AppParameters_Enum.QTY_OPTION.ToString()];
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_UPN_TYPE_CODE] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_NDC_TYPE_CODE] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDBType;
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.CARTS_MNGD_ATPAR] = orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()];
                dr[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS] = orgParams[AtParWebEnums.AppParameters_Enum.PACKAGING_STRING_FOR_LABELS.ToString()];

                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);
                // End of Adding Profile Parameters and Org Parameters to PreReqData Table 


                // Add ListView Parameters and Org Parameters to ListViewReqFields Table 
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_CTRL] = _blnCartReplenCtrl;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_OPT] = _blnCartReplenOpt;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COMPARTMENT] = _blnCompartment;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CONS_NON_STOCK] = _blnConsNonStock;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_QTY] = _blnCountQty;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_REQUIRED] = _blnCountRequired;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CUST_ITEM_NO] = _blnCustItemNo;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.DESCR] = _blnDescr;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.FOQ] = _blnFoq;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.GTIN] = _blnGtin;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.INVENTORY_ITEM] = _blnInventoryItem;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_COUNT_ORDER] = _blnItemCountOrder;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_ID] = _blnItemID;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.MAXIMUM_QTY] = _blnMaximumQty;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID] = _blnMfgItemID;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.OPTIMAL_QTY] = _blnOptimalQty;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PRICE] = _blnPrice;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PRINT_LATER_FLAG] = _blnPrintLaterFlag;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.UOM] = _blnUom;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.UPC_ID] = _blnUpcID;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.VNDR_ITEM_ID] = _blnVndrItemID;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CONSIGNMENT_ITEM] = _blnConsignmentItem;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_1] = _blnReportField1;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_2] = _blnReportField2;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_3] = _blnReportField3;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_4] = _blnReportField4;
                drListViewReqFields[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PACKAGING_STRING] = _blnPackagingString;

                // Specify Required Fields to retrive from Erp.
                m_dtListViewReqFields.Rows.Add(drListViewReqFields);
                // End of Adding ListView Parameters and Org Parameters to ListViewReqFields Table 

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                //if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }

                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private long Execute_GetDetails_ProcessTasks(DataSet inputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long Statuscode = -1;

            try
            {

                // get most frequently used data into local variables
                string strBusinessUnit = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Detail_Defns_Enum.BUSINESS_UNIT].ToString();
                string strCartId = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Detail_Defns_Enum.CART_ID].ToString();
                string strUserId = string.Empty;
                long lngTansId = 0;


                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Detail_Defns_Enum.USER_ID] != null)
                {
                    strUserId = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Detail_Defns_Enum.USER_ID].ToString();
                }


                if (!(strUserId == string.Empty))
                {
                    if ((inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Count > 0))
                    {
                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Cart_PreReqData_Enum.CART_ALLOCATION].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                        {

                            Statuscode = _commonRepo.Check_CartAllocation(strUserId, strBusinessUnit, strCartId, System.DateTime.Now);

                            if (Statuscode != AtparStatusCodes.ATPAR_OK)
                            {
                                return Statuscode;
                            }
                        }
                    }
                }


                try
                {
                    if (!string.IsNullOrEmpty((inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Detail_Defns_Enum.TRANSACTION_ID]).ToString()))
                    {
                        lngTansId = Convert.ToInt64(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Detail_Defns_Enum.TRANSACTION_ID]);
                    }

                    if (lngTansId != 0)
                    {
                        POCOEntities.AtPar_Transaction_Entity pTransactionDetails = new POCOEntities.AtPar_Transaction_Entity();

                        pTransactionDetails.TransactionId = (int)lngTansId;
                        pTransactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CartCount;
                        pTransactionDetails.Status = AtParDefns.statCancel;

                        if ((deviceTokenEntry != null))
                        {
                            pTransactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                        }

                        Statuscode = _commonRepo.UpdateTransaction(pTransactionDetails);

                        if (Statuscode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal("Update Transaction Failed for Cart ID :" + strCartId + ": Business Unit :" +
                                        "" + strBusinessUnit + ": Transaction ID :" + lngTansId + ": StatusCode :" + Statuscode + ":");
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + "Update Transaction Failed with exception ... " + ex.ToString());
                    return AtparStatusCodes.E_SERVERERROR;
                }


                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

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

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, outputParameters);
                    return tupleOutput;
                }

                outputParameters = (DataSet)args[1];


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
    }
}


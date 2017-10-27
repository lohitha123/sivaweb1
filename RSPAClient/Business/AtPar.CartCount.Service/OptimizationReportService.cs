using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Data;
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
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;



namespace AtPar.CartCount.Service
{
    public class OptimizationReportService : IOptimizationReportService
    {
        #region Private Variable

        IOptimizationReportRepository _optReportRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;
        IGetHeaderService _getHeaderService;

        #endregion

        #region Constructor
        public OptimizationReportService(IOptimizationReportRepository repository, ILog log,
                                    ICommonRepository commonRepository, ICommonService commonService,
                                    IGetHeaderService cartcountCommonService)
        {
            _optReportRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _getHeaderService = cartcountCommonService;
            _log.SetLoggerType(typeof(OptimizationReportService));
        }

        #endregion

        public AtParWebApiResponse<object> GetCartOptimizationRep(string bUnit, string deptID, string cartID, DateTime fDate, DateTime tDate, string pOrgGrpID, string pProfileID, int pIntCntFreq, string pUserID, params string[] pDeviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<object>();

            List<MT_ATPAR_TRANSACTION> lstDeptIds = null;
            string cartIDs = string.Empty;
            List<MT_ATPAR_DEVIATION> lstOptimRep = null;
            Boolean cntFlag = false;
            long statusCode = -1;
            List<VM_CART_ITEMINFO_HEADER> lstCartHdr = new List<VM_CART_ITEMINFO_HEADER>();
            List<VM_CART_ITEMINFO_DETAILS> lstCartDtls = new List<VM_CART_ITEMINFO_DETAILS>();
            DataSet dsTemp = new DataSet();
            DataSet dsOptimRep = new DataSet();

            try
            {
                if (deptID != string.Empty)
                {
                    lstDeptIds = _optReportRepo.GetDeptIDs(deptID, cartID);

                    if (lstDeptIds.Count == 0)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }
                    else
                    {
                        for (int i = 0; i < lstDeptIds.Count - 1; i++)
                        {
                            if ((cartIDs.Length > 0))
                            {
                                cartIDs = cartIDs + ",'" + lstDeptIds[i].ID.ToString() + "'";
                            }
                            else
                            {
                                cartIDs = "'" + lstDeptIds[i].ID.ToString() + "'";
                            }
                        }
                    }

                }



                lstOptimRep = _optReportRepo.GetOptimRep(tDate, fDate, bUnit, cartIDs, cartID);

                List<object> lstDeviation = null;   
                DataSet dsDeviation = new DataSet();

                for (int i = 0; i <= lstOptimRep.Count - 1; i++)
                {
                    lstDeviation = null;
                    dsDeviation.Tables.Clear();

                    //string key6 = string.Empty;
                    //string key4 = string.Empty;
                    //string key5 = string.Empty;

                   
                    Tuple<long, DataSet> tupleDeviation = GetOptRep(lstOptimRep[i].KEY_6.HandleNull(), fDate, tDate, bUnit,
                        deptID, lstOptimRep[i].KEY_4.HandleNull(), pIntCntFreq, pUserID,
                        lstOptimRep[i].KEY_5.HandleNull(), pOrgGrpID, pDeviceTokenEntry);

                    dsDeviation = tupleDeviation.Item2;

                    if (dsDeviation.Tables.Count > 0)
                    {
                        cntFlag = true;
                        //need to merge dataset
                        dsTemp.Merge(dsDeviation);
                    }

                }

                if (cntFlag == false)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }


                int intRecCnt = 0;
                int intIsRecExist = 0;

                var responseCartInfo = _commonService.GetCartItemsInfo(pOrgGrpID, bUnit, cartID,
                                                             pUserID, pDeviceTokenEntry);

                if (responseCartInfo.DataDictionary.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

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
                }



                DataTable dtHeaders = new DataTable();
                dtHeaders = lstCartHdr.ToDataTable();

                DataTable dtDetails = new DataTable();
                dtDetails = lstCartDtls.ToDataTable();

                DataSet dsERPCarts = new DataSet();
                dsERPCarts.Tables.Add(dtHeaders);
                dsERPCarts.Tables.Add(dtDetails);


                Tuple<long, DataSet> tupleOrphanItems = GetOrphanItems(pUserID, cartID, bUnit, dsERPCarts);

                statusCode = tupleOrphanItems.Item1;
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                dsERPCarts = tupleOrphanItems.Item2;

                if (((dsERPCarts.Tables.Count > 0) && (dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count > 0)))
                {
                    for (int intCount = 0; (intCount <= (dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count - 1)); intCount++)
                    {

                        int intRecordCnt = 0;
                        for (intRecordCnt = 0; (intRecordCnt <= (dsTemp.Tables[0].Rows.Count - 1)); intRecordCnt++)
                        {
                            if (((dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString().Trim() == dsTemp.Tables[0].Rows[intRecordCnt]["ITEM_ID"].ToString().Trim())
                                        && (dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ToString().Trim() == dsTemp.Tables[0].Rows[intRecordCnt]["COMPARTMENT"].ToString().Trim())))
                            {
                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Entered in to this loop for the item matched case:" + dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID]); }

                                intIsRecExist = (intIsRecExist + 1);
                                break;
                            }
                                                        
                        }

                        if ((intIsRecExist == 0))
                        {
                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Entered in to this loop for add the item:" + dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID]); }

                            DataRow datarow = dsTemp.Tables[0].NewRow();
                            datarow["ITEM_ID"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
                            datarow["CUST_ITEM_ID"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID.ToString()];
                            datarow["COMPARTMENT"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT.ToString()];
                            datarow["DESCR"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR.ToString()];
                            datarow["PRICE"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE.ToString()];
                            datarow["UOM"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][AtParWebEnums.Get_Cart_Detail_Enum.UOM.ToString()];
                            datarow["UPDATE_DATE"] = DateTime.Now;
                            // To Do need to be changed
                            datarow["BUSINESS_UNIT"] = dsTemp.Tables[0].Rows[0]["BUSINESS_UNIT"];
                            datarow["PAR_QTY"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY.ToString()];
                            datarow["COUNT_QTY"] = 0;
                            datarow["USAGE"] = 0;
                            datarow["CART_ID"] = dsTemp.Tables[0].Rows[0]["CART_ID"];
                            datarow["AVG_USAGE"] = 0;
                            datarow["MIN_USAGE"] = 0;
                            datarow["MAX_USAGE"] = 0;
                            datarow["RECOMMENDED_PAR"] = 0;
                            datarow["TOTAL_USAGE"] = 0;
                            datarow["OrderQty"] = 0;
                            datarow["ORPHANITEM"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount]["ORPHANITEM"];
                            dsTemp.Tables[0].Rows.Add(datarow);
                            dsTemp.AcceptChanges();
                        }
                        else if ((intIsRecExist > 0))
                        {
                            intIsRecExist = 0;
                            dsTemp.Tables[0].Rows[intRecordCnt]["PAR_QTY"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount][AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY.ToString()];
                            dsTemp.Tables[0].Rows[intRecordCnt]["ORPHANITEM"] = dsERPCarts.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCount]["ORPHANITEM"];
                            dsTemp.AcceptChanges();
                        }


                    }

                    // dsTemp.Merge(dsERPCarts)
                    dsOptimRep = dsTemp;
                    DataSet _dsCartBunit = new DataSet();
                    cartIDs = String.Empty;

                    if ((deptID != ""))
                    {

                        var lstDepts = _optReportRepo.GetCartBunits(deptID, cartID, bUnit);

                        _dsCartBunit = lstDepts.ToDataSet();

                        for (int i = 0; (i <= (_dsCartBunit.Tables[0].Rows.Count - 1)); i++)
                        {
                            if ((cartIDs.Length > 0))
                            {
                                cartIDs = (cartIDs + (",\'"
                                            + (_dsCartBunit.Tables[0].Rows[i]["CART_ID"] + "\'")));
                            }
                            else
                            {
                                cartIDs = ("\'"
                                            + (_dsCartBunit.Tables[0].Rows[i]["CART_ID"] + "\'"));
                            }

                        }


                    }

                    var lstOpt = _optReportRepo.GetOpt(tDate, fDate, bUnit, cartIDs, cartID);

                    DataTable dtOpt = new DataTable();
                    dtOpt = lstOpt.ToDataTable();
                    dtOpt.TableName = "Carts";
                    dsOptimRep.Tables.Add(dtOpt);

                    dsOptimRep.Tables[0].TableName = "CartDetails";


                    DataColumn[] parentArray = new DataColumn[2];
                    parentArray[0] = dsOptimRep.Tables["Carts"].Columns["BUSINESS_UNIT"];
                    parentArray[1] = dsOptimRep.Tables["Carts"].Columns["CART_ID"];
                    DataColumn[] childArray = new DataColumn[2];
                    childArray[0] = dsOptimRep.Tables["CartDetails"].Columns["BUSINESS_UNIT"];
                    childArray[1] = dsOptimRep.Tables["CartDetails"].Columns["CART_ID"];
                    DataRelation BunitCartRelation = new DataRelation("BunitCartRelation", parentArray, childArray, false);
                    dsOptimRep.Relations.Add(BunitCartRelation);




                }
                    

                List<MT_CRCT_USER_ALLOCATION> lstCarts = new List<MT_CRCT_USER_ALLOCATION>();

                lstCarts = (from rw in dsOptimRep.Tables["Carts"].AsEnumerable()
                            select new MT_CRCT_USER_ALLOCATION()
                            {                            
                                CART_ID = rw["CART_ID"] == null ? string.Empty : rw["CART_ID"].ToString(),
                                BUSINESS_UNIT=rw["BUSINESS_UNIT"]==null?string.Empty:rw["BUSINESS_UNIT"].ToString(),
                                DESCR = rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR)] == null ? string.Empty : rw[((int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR)].ToString()
                            }).ToList();

                List<VM_CART_OPTIMIZATION_DETAILS> lstCartDetails = new List<VM_CART_OPTIMIZATION_DETAILS>();

                lstCartDetails = (from rw in dsOptimRep.Tables["CartDetails"].AsEnumerable()
                                  select new VM_CART_OPTIMIZATION_DETAILS()
                                  {
                                      CUST_ITEM_ID = rw["CUST_ITEM_ID"] == null ? string.Empty : rw["CUST_ITEM_ID"].ToString(),
                                      UPDATE_DATE = rw["UPDATE_DATE"] == null ? string.Empty : rw["UPDATE_DATE"].ToString(),
                                      BUSINESS_UNIT = rw["BUSINESS_UNIT"] == null ? string.Empty : rw["BUSINESS_UNIT"].ToString(),
                                      PAR_QTY = Convert.ToDouble(rw["PAR_QTY"]),
                                      COUNT_QTY = Convert.ToDouble(rw["COUNT_QTY"]),
                                      USAGE = Convert.ToDouble(rw["USAGE"]),
                                      PRICE = Convert.ToDouble(rw["PRICE"]),
                                      CART_ID = rw["CART_ID"] == null ? string.Empty : rw["CART_ID"].ToString(),
                                      COMPARTMENT = rw["COMPARTMENT"] == null ? string.Empty : rw["COMPARTMENT"].ToString(),
                                      ITEM_ID = rw["ITEM_ID"] == null ? string.Empty : rw["ITEM_ID"].ToString(),
                                      UOM = rw["UOM"] == null ? string.Empty : rw["UOM"].ToString(),
                                      DESCR = rw["DESCR"] == null ? string.Empty : rw["DESCR"].ToString(),
                                      AVG_USAGE = Convert.ToDouble(rw["AVG_USAGE"]),
                                      MIN_USAGE = Convert.ToDouble(rw["MIN_USAGE"]),
                                      MAX_USAGE = Convert.ToDouble(rw["MAX_USAGE"]),
                                      RECOMMENDED_PAR = Convert.ToInt32(rw["RECOMMENDED_PAR"]),
                                      TOTAL_USAGE = Convert.ToDouble(rw["TOTAL_USAGE"]),
                                      OrderQty = Convert.ToDouble(rw["OrderQty"]),
                                      ORPHANITEM = rw["ORPHANITEM"] == null ? string.Empty : rw["ORPHANITEM"].ToString()
                                  }).ToList();

                response.DataDictionary = new Dictionary<string, object> { { "Carts", lstCarts }, { "CartDetails", lstCartDetails } };
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {

                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        private Tuple<long, DataSet> GetOptRep(string itemID, DateTime fDate, DateTime tDate, string bUnit,
                                      string deptID, string cartID, int pIntCntFreq,
                                      string pUserID, string pComp, string pOrgGrpID, string[] pDeviceTokenEntry)
        {

            DataSet dsDeviation = new DataSet();

            try
            {
                string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

                Tuple<long, DataSet> tupleOptRep = null;

                DataSet _dsDev = new DataSet();
                string _startDate;
                string _endDate;
                string dtTempTodate;
                int i = 0;
                double avgTotalUsage = 0;
                double avgUsagePerday = 0;
                double dblOrderQty = 0;
                dtTempTodate = tDate.ToString();
                double factorOfSafety = 0;

                DataSet dsTemp = new DataSet();

                _startDate = _optReportRepo.GetStartDate(itemID, fDate, pComp, bUnit, cartID);

                _endDate = _optReportRepo.GetEndDate(itemID, tDate, pComp, bUnit, cartID);


                var lstDev = _optReportRepo.GetDev(itemID, pComp, bUnit, cartID, _startDate, fDate, _endDate, tDate);

                _dsDev.Tables.Add(lstDev.ToDataTable());

                if (_dsDev.Tables[0].Rows.Count == 0)
                {
                    tupleOptRep = new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, dsTemp);                   
                    return tupleOptRep;
                }

                double minUsagePerDay;
                minUsagePerDay = 0;
                double maxUsagePerDay;
                maxUsagePerDay = 0;
                double tempUsage = 0;
                double recommendedPar = 0;

                dsTemp = _dsDev.Copy();
                System.Data.DataColumn newColumn = new System.Data.DataColumn("DFLAG", typeof(System.String));
                newColumn.DefaultValue = "N";
                dsTemp.Tables[0].Columns.Add(newColumn);
                DateTime prevUpdate = default(DateTime);
                DateTime updateDate = default(DateTime);
                DateTime nextUpdate = default(DateTime);
                int iCnt = 0;
                double usageQty = 0;
                bool flag;
                int tmpcnt = 0;
                flag = false;
                string strPrvComp = String.Empty;
                string strPrvItemID = String.Empty;

                if (_dsDev.Tables[0].Rows.Count > 1)
                {
                    if (string.IsNullOrEmpty(_startDate))
                    {
                        tmpcnt = (_dsDev.Tables[0].Rows.Count - 1);
                    }
                    else
                    {
                        tmpcnt = (_dsDev.Tables[0].Rows.Count - 2);
                    }

                    for (i = 0; (i <= tmpcnt); i++)
                    {

                        if (i != 0 && (DateDiff(DateInterval.Day,nextUpdate.Date, updateDate.Date) == 0)) // need to do datediff
                        {
                           

                            if (!string.IsNullOrEmpty(_dsDev.Tables[0].Rows[i - 1]["USAGE"].ToString().Trim()))
                            {
                                usageQty = (usageQty + Convert.ToDouble(_dsDev.Tables[0].Rows[(i - 1)]["USAGE"]));
                            }
                          
                            dsTemp.Tables[0].Rows[(i - 1)]["DFLAG"] = "T";                         

                            if ((flag == true))
                            {
                                dsTemp.Tables[0].Rows[(iCnt - 1)]["USAGE"] = usageQty;
                            }
                        }
                        else
                        {
                            iCnt = i;
                            if ((i != 0))
                            {
                                if (!string.IsNullOrEmpty(_dsDev.Tables[0].Rows[(i - 1)]["USAGE"].ToString()))
                                {
                                    if (!string.IsNullOrEmpty(_dsDev.Tables[0].Rows[(i - 1)]["USAGE"].ToString().Trim()))
                                    {
                                        usageQty = Convert.ToDouble(_dsDev.Tables[0].Rows[(i - 1)]["USAGE"]);
                                    }

                                }

                                flag = true;
                            }
                        }

                        if (((i + 1) <= tmpcnt))
                        {
                            nextUpdate = Convert.ToDateTime(_dsDev.Tables[0].Rows[(i + 1)]["UPDATE_DATE"]);
                        }
                        else
                        {
                            nextUpdate = Convert.ToDateTime(_dsDev.Tables[0].Rows[i]["UPDATE_DATE"]);
                        }

                        updateDate = Convert.ToDateTime(_dsDev.Tables[0].Rows[i]["UPDATE_DATE"]);

                    }
                }

                int TotRowsCnt = 0;
                for (int k = 0; k <= dsTemp.Tables[0].Rows.Count; k++)
                {
                 if (dsTemp.Tables[0].Rows.Count==TotRowsCnt)
                {
                    break;
                }
                     

                    if (dsTemp.Tables[0].Rows[k]["DFLAG"].ToString() == "T")
                    {
                        dsTemp.Tables[0].Rows[k].Delete();


                        k = k - 1;

                    }
                    else
                    {
                        TotRowsCnt = TotRowsCnt + 1;
                    }
                }

                dsTemp.AcceptChanges();
                // BugID#1535 -  Rajini - 12/07/06
                if (string.IsNullOrEmpty(_endDate))
                {
                    tDate = Convert.ToDateTime(dsTemp.Tables[0].Rows[0]["UPDATE_DATE"]);
                }

                // for min and max calculation, for loop is incremented till rowcount - 2 
                // as we are considering nextUpdate as lastrecord when i = rowcount - 2

                for (i = 0; (i <= (dsTemp.Tables[0].Rows.Count - 2)); i++)
                {
                    if (!string.IsNullOrEmpty(dsTemp.Tables[0].Rows[i]["USAGE"].ToString().Trim()))
                    {
                        tempUsage = Convert.ToDouble(dsTemp.Tables[0].Rows[i]["USAGE"]);
                    }

                    nextUpdate = Convert.ToDateTime(dsTemp.Tables[0].Rows[(i + 1)]["UPDATE_DATE"]);
                    updateDate = Convert.ToDateTime(dsTemp.Tables[0].Rows[i]["UPDATE_DATE"]);

                    if (DateDiff(DateInterval.Day, nextUpdate.Date, updateDate.Date) != 0)  //need to do datediff
                    {
                        tempUsage = (tempUsage / DateDiff(DateInterval.Day, nextUpdate.Date, updateDate.Date)); // need to do datediff
                        if (((minUsagePerDay == 0) || (minUsagePerDay > tempUsage)))
                        {
                            minUsagePerDay = tempUsage;
                        }

                        if (((maxUsagePerDay == 0) || (maxUsagePerDay < tempUsage)))
                        {
                            maxUsagePerDay = tempUsage;
                        }

                    }
                }
                _dsDev = dsTemp.Copy();

                //Avg Logic 

                if ((string.IsNullOrEmpty(_startDate) && string.IsNullOrEmpty(_endDate)))
                {
                    for (i = 0; (i <= (_dsDev.Tables[0].Rows.Count - 1)); i++)
                    {
                        if (!string.IsNullOrEmpty(_dsDev.Tables[0].Rows[i]["USAGE"].ToString().Trim()))
                        {
                            avgTotalUsage = (avgTotalUsage + Convert.ToDouble(_dsDev.Tables[0].Rows[i]["USAGE"]));
                        }

                    }

                    avgUsagePerday = avgTotalUsage / (DateDiff(DateInterval.Day, fDate.Date, tDate.Date) + 1); // need to do datediff
                }
                else
                {
                    int totalRowcount = 0;
                    totalRowcount = (_dsDev.Tables[0].Rows.Count - 1);
                    double firstUsage = 0;
                    double dateDifference = 0;
                    double usagePerDayFirst = 0;
                    double totalUsageUptoFromdate = 0;
                    double usagePerDayLast = 0;
                    double lastUsage = 0;
                    double totalUsageUptoTodate = 0;
                    updateDate = Convert.ToDateTime(_dsDev.Tables[0].Rows[totalRowcount]["UPDATE_DATE"]);

                    if (DateTime.Compare(updateDate.Date, fDate.Date) < 0 && totalRowcount > 0)
                    {
                        if (!string.IsNullOrEmpty(_dsDev.Tables[0].Rows[(totalRowcount - 1)]["USAGE"].ToString().Trim()))
                        {
                            firstUsage = Convert.ToDouble(_dsDev.Tables[0].Rows[(totalRowcount - 1)]["USAGE"]);
                        }

                        prevUpdate = Convert.ToDateTime(_dsDev.Tables[0].Rows[(totalRowcount - 1)]["UPDATE_DATE"]);
                        if (DateDiff(DateInterval.Day, updateDate.Date, prevUpdate.Date) != 0) //need to do datediff
                        {
                            usagePerDayFirst = (firstUsage / DateDiff(DateInterval.Day, updateDate.Date, prevUpdate.Date)); //need to do datediff
                        }
                        else
                        {
                            usagePerDayFirst = firstUsage;
                        }

                        dateDifference = DateDiff(DateInterval.Day, updateDate.Date, fDate.Date); // need to do DateDiff(DateInterval.Day, updateDate.Date, fDate.Date);
                        totalUsageUptoFromdate = (usagePerDayFirst * dateDifference);

                    }

                    updateDate = Convert.ToDateTime(_dsDev.Tables[0].Rows[0]["UPDATE_DATE"]);

                    if (DateTime.Compare(updateDate.Date, tDate.Date) > 0)
                    {
                        if (!string.IsNullOrEmpty(_dsDev.Tables[0].Rows[0]["USAGE"].ToString().Trim()))
                        {
                            lastUsage = Convert.ToDouble(_dsDev.Tables[0].Rows[0]["USAGE"]);
                        }

                        nextUpdate = Convert.ToDateTime(_dsDev.Tables[0].Rows[1]["UPDATE_DATE"]);

                        if (DateDiff(DateInterval.Day, nextUpdate.Date, updateDate.Date) != 0) //need to do (DateDiff(DateInterval.Day, nextUpdate.Date, updateDate.Date)
                        {
                            usagePerDayLast = (lastUsage / DateDiff(DateInterval.Day, nextUpdate.Date, updateDate.Date)); // need to do DateDiff(DateInterval.Day, nextUpdate.Date, updateDate.Date)
                        }
                        else
                        {
                            usagePerDayLast = lastUsage;
                        }

                        dateDifference = DateDiff(DateInterval.Day, tDate.Date, updateDate.Date) - 1; //need to do DateDiff(DateInterval.Day, tDate.Date, updateDate.Date)
                        totalUsageUptoTodate = usagePerDayLast * dateDifference;

                    }

                    
                    if (string.IsNullOrEmpty(_startDate))
                    {
                        for (i = 0; (i
                                    <= (_dsDev.Tables[0].Rows.Count - 1)); i++)
                        {
                            if (!string.IsNullOrEmpty(_dsDev.Tables[0].Rows[i]["USAGE"].ToString().Trim()))
                            {
                                avgTotalUsage = (avgTotalUsage + Convert.ToDouble(_dsDev.Tables[0].Rows[i]["USAGE"]));
                            }
                        }

                    }
                    else
                    {
                        for (i = 0; (i <= (_dsDev.Tables[0].Rows.Count - 2)); i++)
                        {
                            if (!string.IsNullOrEmpty(_dsDev.Tables[0].Rows[i]["USAGE"].ToString().Trim()))
                            {
                                avgTotalUsage = (avgTotalUsage + Convert.ToDouble(_dsDev.Tables[0].Rows[i]["USAGE"]));
                            }

                        }

                    }

                    if ((avgTotalUsage == 0))
                    {

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "TOTAL USAGE IS 0"); }

                        // TODO: Exit Function: Warning!!! Need to return the value
                        var tupleOutput1 = new Tuple<long, DataSet>(0, null);
                        return tupleOutput1;
                    }

                    avgTotalUsage = (avgTotalUsage - (totalUsageUptoTodate + totalUsageUptoFromdate));
                    double intFromToDateRange = DateDiff(DateInterval.Day, fDate.Date, tDate.Date); //need to do DateDiff(DateInterval.Day, fDate.Date, tDate.Date);
                    if ((intFromToDateRange > 0))
                    {
                        avgUsagePerday = (avgTotalUsage / (intFromToDateRange + 1));
                    }
                }

                // If only one record is exiting for given search conditions
                // VD-IT0001282
                if ((avgUsagePerday < 0))
                {
                    avgUsagePerday = 0;
                }

                if ((minUsagePerDay < 0))
                {
                    minUsagePerDay = 0;
                }

                if ((maxUsagePerDay < 0))
                {
                    maxUsagePerDay = 0;
                }

                if ((minUsagePerDay == 0))
                {
                    minUsagePerDay = avgUsagePerday;
                }

                if ((maxUsagePerDay == 0))
                {
                    maxUsagePerDay = avgUsagePerday;
                }

                string _strFactorOfSafety = string.Empty;

                _strFactorOfSafety = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString(), (int)AtParWebEnums.EnumApps.CartCount, pOrgGrpID);

                if (!string.IsNullOrEmpty(_strFactorOfSafety))
                {
                    factorOfSafety =Convert.ToDouble(_strFactorOfSafety);
                }


                if (((avgUsagePerday * (1 + (factorOfSafety / 100))) > maxUsagePerDay))
                {
                    recommendedPar = (avgUsagePerday * (1 + (factorOfSafety / 100))) * pIntCntFreq;
                }
                else
                {
                    recommendedPar = (maxUsagePerDay * pIntCntFreq);
                }

                dsDeviation = _dsDev.Clone();

                dsDeviation.Tables[0].Columns.Add("AVG_USAGE").DataType = System.Type.GetType("System.Double");
                dsDeviation.Tables[0].Columns.Add("MIN_USAGE").DataType = System.Type.GetType("System.Double");
                dsDeviation.Tables[0].Columns.Add("MAX_USAGE").DataType = System.Type.GetType("System.Double");
                dsDeviation.Tables[0].Columns.Add("RECOMMENDED_PAR").DataType = System.Type.GetType("System.Double");
                dsDeviation.Tables[0].Columns.Add("DEPT_ID");
                dsDeviation.Tables[0].Columns.Add("TOTAL_USAGE").DataType = System.Type.GetType("System.Double");
                dsDeviation.Tables[0].Columns.Add("OrderQty").DataType = System.Type.GetType("System.Double");
                dsDeviation.Tables[0].Columns.Add("ORPHANITEM").DataType = System.Type.GetType("System.String");
                strPrvItemID = String.Empty;
                strPrvComp = String.Empty;

                for (i = 0; (i <= (_dsDev.Tables[0].Rows.Count - 1)); i++)
                {
                    DataRow dev_frontendRow;
                    dev_frontendRow = dsDeviation.Tables[0].NewRow();

                    dblOrderQty = _optReportRepo.GetOrderQty(_dsDev.Tables[0].Rows[i]["ITEM_ID"].ToString().Trim(),
                                                            _dsDev.Tables[0].Rows[i]["BUSINESS_UNIT"].ToString().Trim(),
                                                            _dsDev.Tables[0].Rows[i]["CART_ID"].ToString().Trim(),
                                                            _dsDev.Tables[0].Rows[i]["COMPARTMENT"].ToString().Trim(), fDate, dtTempTodate);



                    if (((strPrvItemID != _dsDev.Tables[0].Rows[i]["ITEM_ID"].ToString().Trim())
                                    || (strPrvComp != _dsDev.Tables[0].Rows[i]["COMPARTMENT"].ToString().Trim())))
                    {
                        dev_frontendRow["UPDATE_DATE"] = _dsDev.Tables[0].Rows[i]["UPDATE_DATE"];
                        dev_frontendRow["ITEM_ID"] = _dsDev.Tables[0].Rows[i]["ITEM_ID"];
                        dev_frontendRow["BUSINESS_UNIT"] = _dsDev.Tables[0].Rows[i]["BUSINESS_UNIT"];
                        dev_frontendRow["CART_ID"] = _dsDev.Tables[0].Rows[i]["CART_ID"];
                        dev_frontendRow["CUST_ITEM_ID"] = _dsDev.Tables[0].Rows[i]["CUST_ITEM_ID"];
                        dev_frontendRow["COMPARTMENT"] = _dsDev.Tables[0].Rows[i]["COMPARTMENT"];
                        dev_frontendRow["PRICE"] = _dsDev.Tables[0].Rows[i]["PRICE"];
                        dev_frontendRow["USAGE"] = _dsDev.Tables[0].Rows[i]["USAGE"];
                        dev_frontendRow["PAR_QTY"] = _dsDev.Tables[0].Rows[i]["PAR_QTY"];
                        dev_frontendRow["COUNT_QTY"] = _dsDev.Tables[0].Rows[i]["COUNT_QTY"];
                        dev_frontendRow["AVG_USAGE"] = Math.Round(avgUsagePerday, 2);
                        dev_frontendRow["MIN_USAGE"] = Math.Round(minUsagePerDay, 2);
                        dev_frontendRow["MAX_USAGE"] = Math.Round(maxUsagePerDay, 2);
                        dev_frontendRow["RECOMMENDED_PAR"] = Math.Ceiling(recommendedPar);
                        dev_frontendRow["UOM"] = _dsDev.Tables[0].Rows[i]["UOM"];
                        dev_frontendRow["OrderQty"] = dblOrderQty;
                        dev_frontendRow["TOTAL_USAGE"] = Math.Round(avgTotalUsage, 2);
                        dev_frontendRow["DESCR"] = _dsDev.Tables[0].Rows[i]["DESCR"];
                        if ((deptID != ""))
                        {
                            dev_frontendRow["DEPT_ID"] = deptID;
                        }

                        dsDeviation.Tables[0].Rows.Add(dev_frontendRow);
                    }

                    strPrvComp = _dsDev.Tables[0].Rows[i]["COMPARTMENT"].ToString().Trim();
                    strPrvItemID = _dsDev.Tables[0].Rows[i]["ITEM_ID"].ToString().Trim();


                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

            var tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, dsDeviation);
            return tupleOutput;
        }

        private Tuple<long, DataSet> GetOrphanItems(string userID, string cartID, string bUnit, DataSet dsERPCarts)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            Tuple<long, DataSet> tupleERPcarts = null;
            try
            {
                string _strSQL = String.Empty;
                string strCartID = String.Empty;
                string strBUnit = String.Empty;
                object strDescr;
                string strItem = String.Empty;

                DataSet _dsOrphanItems = new DataSet();
                DataColumn _dcOrphanItem = new DataColumn();
                _dcOrphanItem = new DataColumn();
                _dcOrphanItem.ColumnName = "ORPHANITEM";
                _dcOrphanItem.DefaultValue = AtParWebEnums.YesNo_Enum.N.ToString();

                dsERPCarts.Tables[1].Columns.Add(_dcOrphanItem);
                dsERPCarts.Tables[1].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID.ToString();

                if (dsERPCarts.Tables[1].Columns.Contains((AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID.ToString())))
                {
                    // dsERPCarts.Tables[1].Columns["21"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID.ToString();

                    dsERPCarts.Tables[1].Columns["CUST_ITEM_ID"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID.ToString();
                }
                else
                {
                    dsERPCarts.Tables[1].Columns.Add(AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID.ToString(), Type.GetType("System.String")).DefaultValue = String.Empty;
                }

                if (dsERPCarts.Tables[1].Columns.Contains(AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT.ToString()))
                {
                    // dsERPCarts.Tables[1].Columns["1"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT.ToString();
                    dsERPCarts.Tables[1].Columns["COMPARTMENT"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT.ToString();
                }
                else
                {
                    dsERPCarts.Tables[1].Columns.Add(AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT.ToString(), Type.GetType("System.String")).DefaultValue = String.Empty;
                }

                if (dsERPCarts.Tables[1].Columns.Contains(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR.ToString()))
                {
                    //dsERPCarts.Tables[1].Columns["2"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR.ToString();
                    dsERPCarts.Tables[1].Columns["ITEM_DESCR"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR.ToString();
                }
                else
                {
                    dsERPCarts.Tables[1].Columns.Add(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR.ToString(), Type.GetType("System.String")).DefaultValue = String.Empty;
                }

                if (dsERPCarts.Tables[1].Columns.Contains(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE.ToString()))
                {
                    //dsERPCarts.Tables[1].Columns["8"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE.ToString();
                    dsERPCarts.Tables[1].Columns["ITEM_PRICE"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE.ToString();
                }
                else
                {
                    dsERPCarts.Tables[1].Columns.Add(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE.ToString(), Type.GetType("System.Double")).DefaultValue = 0;
                }

                if (dsERPCarts.Tables[1].Columns.Contains(AtParWebEnums.Get_Cart_Detail_Enum.UOM.ToString()))
                {
                    // dsERPCarts.Tables[1].Columns["18"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.UOM.ToString();
                    dsERPCarts.Tables[1].Columns["UOM"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.UOM.ToString();
                }
                else
                {
                    dsERPCarts.Tables[1].Columns.Add(AtParWebEnums.Get_Cart_Detail_Enum.UOM.ToString(), Type.GetType("System.String")).DefaultValue = String.Empty;
                }

                if (dsERPCarts.Tables[1].Columns.Contains(AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY.ToString()))
                {
                    //dsERPCarts.Tables[1].Columns["10"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY.ToString();
                    dsERPCarts.Tables[1].Columns["OPTIMAL_QTY"].ColumnName = AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY.ToString();
                }
                else
                {
                    dsERPCarts.Tables[1].Columns.Add(AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY.ToString(), Type.GetType("System.Double")).DefaultValue = 0;
                }

                var lstOrphanItems = _optReportRepo.GetOrphanItems((int)AtParWebEnums.EnumApps.CartCount, bUnit, cartID);

                _dsOrphanItems.Tables.Add(lstOrphanItems.ToDataTable());

                if ((_dsOrphanItems.Tables.Count > 0))
                {
                    if ((_dsOrphanItems.Tables[0].Rows.Count > 0))
                    {
                        for (int intRecnt = 0; (intRecnt
                                    <= (_dsOrphanItems.Tables[0].Rows.Count - 1)); intRecnt++)
                        {
                            int _intCount = 0;
                            string _strSelect = String.Empty;
                            strItem = _dsOrphanItems.Tables[0].Rows[intRecnt]["KEY_6"].ToString();
                            _strSelect = (AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID.ToString() + ("=\'"
                                        + (strItem + "\'")));
                            _intCount = dsERPCarts.Tables[1].Select(_strSelect).Length;

                            if ((_intCount == 0))
                            {
                                DataRow _drItem;
                                _drItem = dsERPCarts.Tables[1].NewRow();
                                _drItem[AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID.ToString()] = strItem;
                                _drItem[AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID.ToString()] = _dsOrphanItems.Tables[0].Rows[intRecnt]["REPORT_DATA_15"].ToString();
                                _drItem[AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT.ToString()] = _dsOrphanItems.Tables[0].Rows[intRecnt]["KEY_5"].ToString();
                                _drItem[AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR.ToString()] = _dsOrphanItems.Tables[0].Rows[intRecnt]["REPORT_DATA_13"].ToString();
                                _drItem[AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE.ToString()] = _dsOrphanItems.Tables[0].Rows[intRecnt]["REPORT_DATA_3"].ToString();
                                _drItem[AtParWebEnums.Get_Cart_Detail_Enum.UOM.ToString()] = _dsOrphanItems.Tables[0].Rows[intRecnt]["REPORT_DATA_6"].ToString();
                                _drItem[AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY.ToString()] = _dsOrphanItems.Tables[0].Rows[intRecnt]["REPORT_DATA_1"].ToString();
                                _drItem["ORPHANITEM"] = AtParWebEnums.YesNo_Enum.Y.ToString();

                                dsERPCarts.Tables[1].Rows.Add(_drItem);
                            }

                        }

                    }

                    dsERPCarts.Tables[1].TableName = AtParWebEnums.DataSet_Type.DETAILS.ToString();
                    tupleERPcarts = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, dsERPCarts);


                }
            }
            catch (Exception ex)
            {
                tupleERPcarts = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleERPcarts;
            }
            return tupleERPcarts;
        }


        public AtParWebApiResponse<long> UpdateCartParAuditRep(Dictionary<string, dynamic> dicDataItems, string userID, string orgGrpID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            DataSet dsCartDetails = new DataSet();
            DataSet outputParameters = new DataSet();
            DataTable dtCartPreReqData = new DataTable();
            DataTable dtCartHeader = new DataTable();
            DataTable dtCartDetails = new DataTable();
            List<VM_CART_HEADER> lstCartHeader = new List<VM_CART_HEADER>();
            List<VM_CART_DETAILS> lstCartDetails = new List<VM_CART_DETAILS>();
            List<VM_CART_PREREQDATA> lstCartPreData = new List<VM_CART_PREREQDATA>();

            long statusCode = -1;
            string remoteSchema;
            string remote_database = string.Empty;
            string cartsManagedInAtPar = string.Empty;
            string erpObjName = string.Empty;
            string remoteCartObj = string.Empty;
            string className = null;
            string methodName = string.Empty;
            MethodInfo MethodName = null;
            object reflectObject = null;
            try
            {

                dtCartHeader = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_Header_Defns,
                        AtParWebEnums.DataSet_Type.HEADERS.ToString());

                dtCartDetails = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_Details_Defns,
                         AtParWebEnums.DataSet_Type.DETAILS.ToString());

                dtCartPreReqData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Cart_BusinessRules_Defns,
                          AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                foreach (var keyValuePair in dicDataItems)
                {
                    switch (keyValuePair.Key)
                    {
                        case "HEADER":

                            var hdrColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {

                                DataRow _drHed = dtCartHeader.NewRow();
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT] = item.BUSINESS_UNIT;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID] = item.CART_ID;
                                _drHed[(int)AtParWebEnums.Send_Cart_Header_Enum.USER_ID] = item.USER_ID;

                                dtCartHeader.Rows.Add(_drHed);
                            }

                            break;

                        case "DETAILS":
                            var detailColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {
                                DataRow _drDet = dtCartDetails.NewRow();
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID] = item.ITEM_ID;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT] = item.COMPARTMENT;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY] = item.NEW_OPTIMAL_QUANTITY;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY] = item.OPTIMAL_QUANTITY;
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.UOM] = item.UOM;

                                dtCartDetails.Rows.Add(_drDet);
                            }

                            break;

                        case "PREREQDATA":
                            var predataColumnNames = dicDataItems[keyValuePair.Key];


                            foreach (var item in keyValuePair.Value)
                            {

                               
                                DataRow _drPre = dtCartPreReqData.NewRow();
                                _drPre[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REMOTE_SCHEMA] =  (item==null)?" ":item;                           
                                dtCartPreReqData.Rows.Add(_drPre);
                            }

                            break;

                    }
                }

                dsCartDetails.Tables.Add(dtCartHeader);
                dsCartDetails.Tables.Add(dtCartDetails);
                dsCartDetails.Tables.Add(dtCartPreReqData);

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                remote_database = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                                x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                                .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                dsCartDetails.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REMOTE_SCHEMA] = remoteSchema;
                dsCartDetails.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REMOTE_DB_TYPE] = remote_database;

                cartsManagedInAtPar = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString(), (int)AtParWebEnums.EnumApps.CartCount, orgGrpID);

                _getHeaderService.GetConfigData();

                if (cartsManagedInAtPar == AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    erpObjName = "ParMngt_BusinessRules";
                    className = "SetupParMngt";
                    methodName = "UpdateCartParQty";
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.CartCount.ToString() + "_" + erpObjName;
                    className =  "SendCart";
                    methodName = "UpdateCartParQty";

                }
                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);
                object[] args = { dsCartDetails, deviceTokenEntry };
                statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_REMOTEDBUPDATEFAIL, _commonRepo, _log);
                    return response;
                }
                else
                {
                    statusCode = InsertParAuditReport(dsCartDetails, userID, deviceTokenEntry);
                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_REMOTESUCCESSLOCALFAIL, _commonRepo, _log);
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

        public long InsertParAuditReport(DataSet cartDetails, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string bUnit = string.Empty;
            string cartID = string.Empty;
            string strUserID = string.Empty;
            int transID = 0;
            string itemDesc = string.Empty;
            long statusCode = -1;

            try
            {
                strUserID = cartDetails.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.USER_ID].ToString();
                bUnit = cartDetails.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.BUSINESS_UNIT].ToString();
                cartID = cartDetails.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID].ToString();


                for (int intCnt = 0; intCnt <= cartDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count - 1; intCnt++)
                {
                    if (cartDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt][(int)AtParWebEnums.Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY] != null)
                    {

                        if (cartDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt][(int)AtParWebEnums.Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY].ToString() != string.Empty)
                        {
                            statusCode = _optReportRepo.InsertParAuditReportData(bUnit, cartID, cartDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt][(int)AtParWebEnums.Send_Cart_Details_Enum.COMPARTMENT].ToString(),
                                cartDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt][(int)AtParWebEnums.Send_Cart_Details_Enum.ITEM_ID].ToString(),
                                Convert.ToDouble(cartDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt][(int)AtParWebEnums.Send_Cart_Details_Enum.OPTIMAL_QUANTITY]),
                                Convert.ToDouble(cartDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt][(int)AtParWebEnums.Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY]),
                                transID, strUserID, cartDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt][(int)AtParWebEnums.Send_Cart_Details_Enum.UOM].ToString(), itemDesc);
                            if (statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                return statusCode;
                            }
                        }
                    }
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
        }

        public enum DateInterval
        {
            Year,
            Month,
            Weekday,
            Day,
            Hour,
            Minute,
            Second
        }

      
            public static long DateDiff(DateInterval interval, DateTime date1, DateTime date2)
            {

                TimeSpan ts = date2 - date1;

                switch (interval)
                {
                    case DateInterval.Year:
                        return date2.Year - date1.Year;
                    case DateInterval.Month:
                        return (date2.Month - date1.Month) + (12 * (date2.Year - date1.Year));
                    case DateInterval.Weekday:
                        return Fix(ts.TotalDays) / 7;
                    case DateInterval.Day:
                        return Fix(ts.TotalDays);
                    case DateInterval.Hour:
                        return Fix(ts.TotalHours);
                    case DateInterval.Minute:
                        return Fix(ts.TotalMinutes);
                    default:
                        return Fix(ts.TotalSeconds);
                }
            }

            private static long Fix(double Number)
            {
                if (Number >= 0)
                {
                    return (long)Math.Floor(Number);
                }
                return (long)Math.Ceiling(Number);
            }
        

        //private double DateDiff(DateTime date1, DateTime date2)
        //{
        //    // int days = (date1 - date2).Days;
        //    double days = date2.Subtract(date1).TotalDays;



        //    return days;
        //}

    }
}

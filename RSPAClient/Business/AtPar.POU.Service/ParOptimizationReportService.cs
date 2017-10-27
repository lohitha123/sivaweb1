using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.Common;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System.Data;
using AtPar.Service.Interfaces.CartCount;
using AtPar.POU.Service;
using System.Xml;
using AtPar_BusinessRules;
using System.IO;
using System.Reflection;

namespace AtPar.POU.Service
{
  public  class ParOptimizationReportService:IParOptimizationReportService
    {
        #region Private Variable

        IParOptimizationReportRepository _paroptReportRepo;

        ILog _log;
        ICommonRepository _commonRepo;
        IGetHeaderService _getHeaderService;
        IGetDetailsService _getDetailsService;


        #endregion

        #region Constructor
        public ParOptimizationReportService(IParOptimizationReportRepository repository, ILog log,
                                    ICommonRepository commonRepository,
                                    IGetHeaderService cartcountCommonService, IGetDetailsService getDetailsService)
        {
            _paroptReportRepo = repository;
            _log = log;
            _commonRepo = commonRepository;           
            _getHeaderService = cartcountCommonService;
            _getDetailsService = getDetailsService;

            _log.SetLoggerType(typeof(ParOptimizationReportService));
        }

        #endregion


        public AtParWebApiResponse<VM_PAR_OPTIMIZATION_DETAILS> GetOptimizationReport(string bUnit, string deptID, string cartID, DateTime fDate, DateTime tDate, string orgGrpID, int appId,params string[] pDeviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<object>();
            var responseData = new AtParWebApiResponse<VM_PAR_OPTIMIZATION_DETAILS>();

            List<VM_PAR_OPTIMIZATION_DETAILS> lstParOptDetails = new List<VM_PAR_OPTIMIZATION_DETAILS>();
            string cartIDs = string.Empty;
            List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstCartIds = null;
           
            string strLocType = "";
            long statusCode = -1;                          
            DataSet dsParOptRepDetails = new DataSet();


            try
            {
                long intDateInterval = 0;
                double factorOfSafety = 0;

                DataSet retDS = new DataSet();
                DataTable OptRepTbl = new DataTable();
                
                OptRepTbl = new DataTable();
                OptRepTbl.Columns.Add("CART_ID", typeof(string));
                OptRepTbl.Columns.Add("ITEM_ID", typeof(string));
                OptRepTbl.Columns.Add("DESCR", typeof(string));
                OptRepTbl.Columns.Add("COMPARTMENT", typeof(string));
                OptRepTbl.Columns.Add("PRICE", typeof(double));
                OptRepTbl.Columns.Add("PAR_VALUE", typeof(double));
                OptRepTbl.Columns.Add("UOM", typeof(string));
                OptRepTbl.Columns.Add("MAX_USAGE", typeof(double));
                OptRepTbl.Columns.Add("MIN_USAGE", typeof(double));
                OptRepTbl.Columns.Add("AVG_USAGE", typeof(double));
                OptRepTbl.Columns.Add("TOTAL_USAGE", typeof(double));
                OptRepTbl.Columns.Add("ORDER_QTY", typeof(string));
                OptRepTbl.Columns.Add("RECOMMENDED_PAR", typeof(double));
                OptRepTbl.Columns.Add("PAR_VARIATION", typeof(double));
                OptRepTbl.Columns.Add("LOCATION_TYPE", typeof(string));

                string _strFactorOfSafety = string.Empty;

                intDateInterval= DateDiff(DateInterval.Day, fDate.Date, tDate.Date)-1;

                _strFactorOfSafety = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString(), (int)AtParWebEnums.EnumApps.PointOfUse, orgGrpID);

                if (!string.IsNullOrEmpty(_strFactorOfSafety))
                {
                    factorOfSafety = Convert.ToDouble(_strFactorOfSafety);
                }


                lstCartIds = _paroptReportRepo.GetCartIds(bUnit, deptID,cartID,orgGrpID,appId);
                if(lstCartIds.Count==0)
                {

                    responseData.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return responseData;
                }

                          
                for (int i = 0; i <= lstCartIds.Count - 1; i++)
                {
                  strLocType=  lstCartIds[i].LOCATION_TYPE;
                   cartID= lstCartIds[i].CART_ID;


                    Tuple<long, DataSet> tupleOptRepCartData = GetOptRepCartData(bUnit, cartID, OptRepTbl,intDateInterval, fDate, tDate,orgGrpID,
                        factorOfSafety,strLocType,appId, pDeviceTokenEntry);

                   if(tupleOptRepCartData.Item1!=AtparStatusCodes.ATPAR_OK)
                    {

                        responseData.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return responseData;

                    }                  
                                                 
                }
                dsParOptRepDetails.Tables.Add(OptRepTbl);

               
                lstParOptDetails = (from rw in dsParOptRepDetails.Tables[0].AsEnumerable()
                                    select new VM_PAR_OPTIMIZATION_DETAILS()
                                    {
                                        CART_ID = rw["CART_ID"] == DBNull.Value ? string.Empty : rw["CART_ID"].ToString(),
                                        ITEM_ID = rw["ITEM_ID"] == DBNull.Value ? string.Empty : rw["ITEM_ID"].ToString(),
                                        DESCR = rw["DESCR"] == DBNull.Value ? string.Empty : rw["DESCR"].ToString(),
                                        COMPARTMENT = rw["COMPARTMENT"] == DBNull.Value ? string.Empty : rw["COMPARTMENT"].ToString(),
                                        PAR_VALUE = rw["PAR_VALUE"] == DBNull.Value ? (double?)null:Convert.ToDouble(rw["PAR_VALUE"]),
                                        MAXUSAGE = rw["MAX_USAGE"]==DBNull.Value?(double?)null: Convert.ToDouble(rw["MAX_USAGE"]),
                                        PRICE = rw["PRICE"]==DBNull.Value?(double?)null: Convert.ToDouble(rw["PRICE"]),                                        
                                        UOM = rw["UOM"] == DBNull.Value ? string.Empty : rw["UOM"].ToString(),
                                        AVGUSAGE = rw["AVG_USAGE"]==DBNull.Value?(double?)null: Convert.ToDouble(rw["AVG_USAGE"]),
                                        MINUSAGE = rw["MIN_USAGE"]==DBNull.Value?(double?)null: Convert.ToDouble(rw["MIN_USAGE"]),
                                        RECOMMENDED_PAR = rw["RECOMMENDED_PAR"]==DBNull.Value?(double?)null: Convert.ToDouble(rw["RECOMMENDED_PAR"]),
                                        TOTUSAGE = rw["TOTAL_USAGE"]==DBNull.Value?(double?)null: Convert.ToDouble(rw["TOTAL_USAGE"]),
                                        ORDER_QTY = rw["ORDER_QTY"]==DBNull.Value?(double?)null: Convert.ToDouble(rw["ORDER_QTY"]),
                                        PAR_VARIATION = rw["PAR_VARIATION"]==DBNull.Value?(double?)null: Convert.ToDouble(rw["PAR_VARIATION"]),
                                        LOCATION_TYPE = rw["LOCATION_TYPE"] == DBNull.Value ? string.Empty : rw["LOCATION_TYPE"].ToString(),                                      
                                    }).ToList();
                

                responseData.DataList = lstParOptDetails;
                responseData.AtParSuccess();
                return responseData;
            }
            catch (Exception ex)
            {

               responseData.AtParException(ex, _commonRepo, _log);
                return responseData;
            }

        }


        private Tuple<long, DataSet> GetOptRepCartData(string bUnit, string cartID,DataTable pOptRepData, long intDateInterval, DateTime fDate, DateTime tDate, string orgGrpID,
                                      double factorOfSafety, string strLocType, int appId,
                                      string[] pDeviceTokenEntry)
        {            
            List<VM_PAR_OPTIMIZATION_DETAILS> lstParOptUsageData = null;
            List<VM_PAR_OPTIMIZATION_DETAILS> lstParOptOrdData = null;
            List<VM_PAR_OPTIMIZATION_DETAILS> lstItemsAvgLeadTime = null;            
            double avgLeadTime = 0;
            DataSet dsCartDetails = new DataSet();
            string profileID = string.Empty;
            string TokenorgGrpID = string.Empty;
            string systemID = string.Empty;
            Tuple<long, DataSet> tupl = null;
            Tuple<long, DataSet> tupleOutput = null;
            long Statuscode = -1;
            DataRow retRow = null;

            try
            {
                string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
                             
                string strDefaultLeadTime = "";
                profileID = pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID];
                TokenorgGrpID = pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID];
                systemID = pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId];


                strDefaultLeadTime = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.DEFAULT_LEAD_TIME.ToString(), (int)AtParWebEnums.EnumApps.PointOfUse, orgGrpID);
                lstParOptUsageData = _paroptReportRepo.GetOptUsageData(bUnit, cartID, fDate, tDate);

                lstParOptOrdData = _paroptReportRepo.GetOptOrdData(bUnit, cartID, fDate, tDate);
                

                lstItemsAvgLeadTime = _paroptReportRepo.GetItemsAvgLeadTime(bUnit, cartID, fDate);
                if ((lstParOptUsageData != null) && (lstParOptOrdData != null ) && (lstItemsAvgLeadTime != null ))
                {
                    var tupleResult = _GetCartDetails(cartID, bUnit, dsCartDetails, TokenorgGrpID, systemID, pDeviceTokenEntry, profileID
                                                         , strLocType, null, "", appId);


                    Statuscode = tupleResult.Item1;

                    if (Statuscode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (Statuscode == AtparStatusCodes.E_NORECORDFOUND)
                        {
                            dsCartDetails = tupleResult.Item2;
                            tupl = new Tuple<long, DataSet>(Statuscode, dsCartDetails);
                            return tupl;

                        }
                        else
                        {
                            tupl = new Tuple<long, DataSet>(Statuscode, null);
                            return tupl;
                        }

                    }
                    dsCartDetails = tupleResult.Item2;


                    string strItemID = "";
                    string strCompartment = "";
                    double? minUsage;
                    double? maxUsage;
                    double? avgUsage;
                    double? totalUsage;
                    double? totOrdQty;
                    double? totalUsagePerDay;
                    double? maxUsagePerDay;
                    string strOrdUOM;
                    double? recommendedPar;
                    double ParVal;
                    double dblConvRtParUom;
                    double dblConvRTProc;
                    double dblNoOfBXsInCase;
                    double? dblPrice;
                    double? PercParVariation;
                    dsCartDetails = tupleResult.Item2;

                    if (dsCartDetails.Tables.Count > 0)
                    {
                        for (int z = 0; z <= dsCartDetails.Tables[1].Rows.Count - 1; z++)
                        {
                            retRow = pOptRepData.NewRow();
                            dblConvRtParUom = 0;
                            dblConvRTProc = 0;
                           strItemID= dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString();
                          
                          if(dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT]==DBNull.Value)
                            {
                                strCompartment = string.Empty;
                            }
                            else
                            {
                                strCompartment = dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ToString();
                            }
                            retRow["CART_ID"] = cartID;
                            retRow["ITEM_ID"]= strItemID;
                                                                                                                               
                            if (dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR] != null && dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString()!="")
                            {
                                retRow["DESCR"] = dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString().Trim();
                            }
                            else
                            {
                                retRow["DESCR"] = string.Empty;
                            }


                            retRow["COMPARTMENT"] =dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ToString();


                            if (dsCartDetails.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR).ToString()))
                            {


                                if (dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR].ToString()!="" &&dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR] != DBNull.Value && dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR] != null)

                                {
                                    dblConvRTProc = Convert.ToDouble(dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR]);

                                }


                            }

                            if (dsCartDetails.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM).ToString()))
                            {
                                
                                if(dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM].ToString()!= "" && dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM] != null&& dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM] != DBNull.Value)
                                    {
                                        dblConvRtParUom = Convert.ToDouble(dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM]);
                                    }
                            }


                            if (dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE]==DBNull.Value|| dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE] == null || dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString()=="")
                            {                               
                                    dblPrice = 0;
                            }
                            else
                            {
                                    dblPrice = Convert.ToDouble(dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE]);
                            }

                            if (!string.IsNullOrEmpty(strLocType) && strLocType == AtParWebEnums.LocationType.A.ToString())
                            {
                                if ((!string.IsNullOrEmpty(dblConvRtParUom.ToString())) || (dblConvRtParUom == 0))
                                {
                                    dblNoOfBXsInCase = dblConvRTProc;
                                }
                                else
                                {
                                    dblNoOfBXsInCase = dblConvRTProc / dblConvRtParUom;
                                }
                                //Finding box cost
                                if (!string.IsNullOrEmpty(dblNoOfBXsInCase.ToString()) && dblNoOfBXsInCase != 0)
                                {
                                    dblPrice = dblPrice / dblNoOfBXsInCase;
                                }


                                retRow["PRICE"] = dblPrice;
                            }
                            else
                            {
                                retRow["PRICE"] = dblPrice;

                            }

                            if (dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY] == null|| dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY]==DBNull.Value || dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ToString()=="")
                            {                                
                                    retRow["PAR_VALUE"] = 0;
                            }
                            else
                            {
                                    retRow["PAR_VALUE"] = dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY];
                            }

                            if (dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY]==DBNull.Value || dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY] == null || dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ToString()=="")

                            {
                                ParVal = 0;
                            }
                            else
                            {
                                ParVal = Convert.ToDouble(dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY]);
                            }

                            if ( dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM]==DBNull.Value|| dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM] ==null || dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM].ToString()=="")
                            {
                                
                                retRow["UOM"] = dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM];
                            }
                            else
                            {
                                retRow["UOM"] = dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM];
                            }

                            retRow["LOCATION_TYPE"] = strLocType;
                            VM_PAR_OPTIMIZATION_DETAILS OptUsage = null;
                            VM_PAR_OPTIMIZATION_DETAILS OptOrdData = null;
                          
                            

                            OptUsage = lstParOptUsageData.Where(x => x.ITEM_ID == strItemID && x.COMPARTMENT == strCompartment).FirstOrDefault();

                            if (OptUsage!=null)
                            {
                                maxUsage = OptUsage.MAXUSAGE ==(double?)null ? 0 : OptUsage.MAXUSAGE;
                                minUsage = OptUsage.MINUSAGE ==(double?)null ? 0 : OptUsage.MINUSAGE;
                                avgUsage = OptUsage.AVGUSAGE ==(double?)null ? 0 : OptUsage.AVGUSAGE;
                                totalUsage = OptUsage.TOTUSAGE ==(double?)null ? 0 : OptUsage.TOTUSAGE;
                            }
                            else
                            {
                                maxUsage = 0;
                                minUsage = 0;
                                avgUsage = 0;
                                totalUsage = 0;
                            }

                            retRow["MAX_USAGE"] = maxUsage;
                            retRow["MIN_USAGE"] = minUsage;
                            retRow["AVG_USAGE"] = avgUsage;
                            retRow["TOTAL_USAGE"] = totalUsage;

                            OptOrdData = lstParOptOrdData.Where(x => x.ITEM_ID == strItemID && x.COMPARTMENT == strCompartment).FirstOrDefault();

                            if (OptOrdData!=null)
                            {                                
                                totOrdQty = OptOrdData.ORDQTY ==(double?)null ? 0 : OptOrdData.ORDQTY;
                            }
                            else
                            {
                                totOrdQty = 0;
                            }

                            if (dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC]!=null && dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC]!=DBNull.Value && dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC].ToString()!="")
                            {
                                strOrdUOM = dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC].ToString();
                            }
                            else
                            {
                                strOrdUOM = dsCartDetails.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString();
                            }
                            if (totOrdQty == 0)
                            {
                                retRow["ORDER_QTY"] = totOrdQty;
                            }
                            else
                            {

                                retRow["ORDER_QTY"] = totOrdQty + "-" + strOrdUOM;
                            }
                            VM_PAR_OPTIMIZATION_DETAILS ItemsAvgLeadTime = null;
                            ItemsAvgLeadTime = lstItemsAvgLeadTime.Where(x => x.ITEM_ID == strItemID && x.COMPARTMENT == strCompartment).FirstOrDefault();
                            if (ItemsAvgLeadTime!=null)
                            {
                                if (!string.IsNullOrEmpty(ItemsAvgLeadTime.AVGTIME.ToString()))
                                {
                                    avgLeadTime = Convert.ToDouble(ItemsAvgLeadTime.AVGTIME);                                   
                                }
                            }

                            //Default Lead time value from the Org Parameters
                            else
                            {
                                if (!string.IsNullOrEmpty(strDefaultLeadTime))
                                {
                                    avgLeadTime = Convert.ToDouble(strDefaultLeadTime);
                                }
                            }
                            // Recommended par
                            if (intDateInterval == 0)
                            {
                                intDateInterval = 1;
                            }
                            totalUsagePerDay = totalUsage / intDateInterval;
                            maxUsagePerDay = maxUsage / intDateInterval;
                            if (_log.IsDebugEnabled) { _log.Info("Item Id : " +strItemID + " :: Date Interval::" + intDateInterval + ""); }
                            if (_log.IsDebugEnabled) { _log.Info("Item Id : " + strItemID + " ::Toal Usage::" + totalUsage + ""); }
                            if (_log.IsDebugEnabled) { _log.Info("Item Id : " + strItemID + " :: Max Usage::" + maxUsage + ""); }
                            if (_log.IsDebugEnabled) { _log.Info("Item Id : " + strItemID + " :: Total Usage perday::" + totalUsagePerDay + ""); }
                            if (_log.IsDebugEnabled) { _log.Info("Item Id : " + strItemID + " :: max Usage Perday::" + maxUsagePerDay + ""); }
                            if (_log.IsDebugEnabled) { _log.Info("Item Id : " + strItemID + " ::Factory Of safety::" + factorOfSafety + ""); }


                            if (avgLeadTime * (totalUsagePerDay + (totalUsagePerDay * (factorOfSafety / 100))) > maxUsagePerDay)
                            {
                                recommendedPar = avgLeadTime * (totalUsagePerDay + (totalUsagePerDay * (factorOfSafety / 100)));
                            }
                            else
                            {
                                recommendedPar = maxUsagePerDay;
                            }


                            retRow["RECOMMENDED_PAR"] = Math.Ceiling(Convert.ToDecimal(recommendedPar));
                            PercParVariation = ParVal == 0 ? 0 :(ParVal - recommendedPar) / ParVal * 100;
                            retRow["PAR_VARIATION"] = Math.Ceiling(Convert.ToDecimal(PercParVariation));

                            pOptRepData.Rows.Add(retRow);
                        }

                    }

                }
                            

            }
            catch (Exception ex)
            {

                throw ex;
            }

             tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, null);
            return tupleOutput;
        }


        public AtParWebApiResponse<long> UpdateParQty(Dictionary<string, dynamic> dicDataItems, int appId, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            DataSet dsCartDetails = new DataSet();
            
            DataTable dtCartPreReqData = new DataTable();
            DataTable dtCartHeader = new DataTable();
            DataTable dtCartDetails = new DataTable();                   

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
                                _drDet[(int)AtParWebEnums.Send_Cart_Details_Enum.LOC_TYPE] = item.LOCATION_TYPE;


                                dtCartDetails.Rows.Add(_drDet);
                            }

                            break;

                        case "PREREQDATA":
                            var predataColumnNames = dicDataItems[keyValuePair.Key];


                            foreach (var item in keyValuePair.Value)
                            {


                                DataRow _drPre = dtCartPreReqData.NewRow();
                                _drPre[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.REMOTE_SCHEMA] = (item == null) ? " " : item;
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

                cartsManagedInAtPar = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString(),appId, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                _getHeaderService.GetConfigData();
                DataRow[] drItems;
                drItems = dsCartDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Select("["+(int)AtParWebEnums. Send_Cart_Details_Enum.LOC_TYPE+"] ='" +AtParWebEnums. LocationType.A.ToString()+"' ");
                if (cartsManagedInAtPar == AtParWebEnums.YesNo_Enum.Y.ToString()|| drItems.Length>0)
                {               

                    erpObjName = "ParMngt_BusinessRules";
                    className = "SetupParMngt";
                    methodName = "UpdateCartParQty";
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.CartCount.ToString() + "_" + erpObjName;
                    className = "SendCart";
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
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
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

        #region common
        private Tuple<long, DataSet> _GetCartDetails(string cartID, string bUnit, DataSet cartDetailsDS, string orgGrpID, string systemID, string[] deviceTokenEntry, string profileID, string locationType, StringBuilder syncData = null, string syncFlag = "", int appID = 15, string deptID = "")
        {

            try
            {

                string itemDescrType = null;
                string defaultMfgItemID = null;
                string itemPriceType = null;
                DataSet inputParameters = new DataSet();
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

                cartDetailsDS.Tables.Clear();
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
        #endregion

        private Tuple<long, DataSet> UpdateLotSerFlags(string bUnit, string cartID, DataSet locDetails, string cartItemFlag)
        {
            try
            {


                List<MT_ATPAR_ITEM_ATTRIBUTES> lstItemAttributes = _commonRepo.GetItemAttributes(bUnit, cartID);

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
                                                            where look.Field<string>(AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID.ToString()) ==
                                                            AttItems["ITEM_ID"].ToString()
                                                            select look;

                            foreach (var item in UpdateLotSerFlagItems)
                            {
                                item[AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED.ToString()] =
                                    AttItems["LOT_CONTROLLED"].ToString();
                                item[AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED.ToString()] =
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
            string upnType = string.Empty;
            try
            {

                itemPriceType = orgParm[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];
                itemDescrType = orgParm[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                defaultMfgItemID = orgParm[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                syncFrmMultiLoc = orgParm[AtParWebEnums.AppParameters_Enum.SYNC_MULTIPLE_LOC_INFO.ToString()];

                upnType = profileParam[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                var ndcType = profileParam[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];
                var deptID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeptID] = null ?? string.Empty;


                string storageArea = string.Empty;

                if (!string.IsNullOrEmpty(deptID))
                {
                    storageArea =_paroptReportRepo.GetStorageArea(deptID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

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

                if (!string.IsNullOrEmpty(erpResult.Item2))
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

                    var drLocHeaderRow = dsLocDetails.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();

                    drLocHeaderRow[(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.BUSINESS_UNIT] = bunit;
                    drLocHeaderRow[(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.CART_ID] = cartID;

                    dsLocDetails.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(drLocHeaderRow);

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

                            price = 0.0;
                            if ((node.SelectSingleNode("K") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("K");
                                var singleNode = node.SelectSingleNode("K");
                                if (singleNode != null)
                                    price = (selectSingleNode != null &&
                                             string.IsNullOrEmpty(selectSingleNode.InnerText)
                                        ? 0.0
                                        : Convert.ToDouble(singleNode.InnerText));
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


                            var drLocDetail = dsLocDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].NewRow();

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

                            dsLocDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Add(drLocDetail);
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

                            var drLotSerial = dsLocDetails.Tables[AtParWebEnums.DataSet_Type.LOTSERIAL_INFO.ToString()]
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

                            dsLocDetails.Tables[AtParWebEnums.DataSet_Type.LOTSERIAL_INFO.ToString()]
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

        //private void GetConfigData()
        //{

        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}
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
    }



}

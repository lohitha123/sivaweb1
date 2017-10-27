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
using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace AtPar.CartCount.Service
{
    public class CriticalItemsService : ICriticalItemsService
    {
        #region Private Variable

        ICriticalItemsRepository _criticalRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        IGetHeaderService _getHeaderService;
        IGetDetailsService _getDetailsService;
        //ICommonErpService _commonErpService;

        #endregion

        #region Constructor
        public CriticalItemsService(ICriticalItemsRepository repository, ILog log,
                                    ICommonRepository commonRepository, IGetHeaderService cartcountCommonService,
                                    IGetDetailsService getDetailsService)
        {
            _criticalRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _getHeaderService = cartcountCommonService;
            _getDetailsService = getDetailsService;
            _log.SetLoggerType(typeof(CriticalItemsService));
            //To do Need to remove
            // GetConfigData();
        }

        #endregion

        #region GetCartBunitsInfo
        public AtParWebApiResponse<MT_CRCT_USER_ALLOCATION> GetCartBunitsInfo(string orgGroupID, string serverUser,
                                                          string bUnit, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>();

            int result = 0;
            char cartAllocation = '\0';
            string fldOrdby = "BUSINESS_UNIT";

            //Tuple<long, SortedList> tupleRes = null;
            SortedList<string, string> orgParams;
            string order = string.Empty;
            DataSet outputParameters = new DataSet();

            try
            {

                // Fetching GetOrgGroupParamValues CARTS_MNGD_ATPAR & CART_ALLOCATION
                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.CART_ALLOCATION.ToString()] = string.Empty;
                _commonRepo.GetOrgGroupParamValues(orgParams, (int)AtParWebEnums.EnumApps.CartCount, orgGroupID);

                if (orgParams[AtParWebEnums.AppParameters_Enum.CART_ALLOCATION.ToString()].ToString() != string.Empty)
                {
                    cartAllocation = Convert.ToChar(orgParams[AtParWebEnums.AppParameters_Enum.CART_ALLOCATION.ToString()]);
                }
                // If Allocation of Carts Required Parameter un checked
                if (cartAllocation != Convert.ToChar(AtParWebEnums.YesNo_Enum.Y.ToString()))
                {
                  
                    Tuple<long, DataSet> tupleResult = _getHeaderService.GetHeader(string.Empty,bUnit, string.Empty, fldOrdby, order, deviceTokenEntry);
                    if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                        response.AtParNotOK(tupleResult.Item1, _commonRepo, _log);
                        return response;
                    }

                    outputParameters = tupleResult.Item2;
                    if (outputParameters.Tables[0].Rows.Count > 0)
                    {

                        response.DataList = (from DataRow dr in outputParameters.Tables[0].Rows
                                             select new MT_CRCT_USER_ALLOCATION()
                                             {
                                                 CART_ID = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ToString(),
                                                 BUSINESS_UNIT = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ToString(),
                                                 DESCR = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR].ToString(),
                                                 SHADOW_FLAG = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.SHADOW_FLAG].ToString()

                                             }).ToList();
                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }

                }
                else
                {
                    result = _criticalRepo.GetUserGroupsCount((int)AtParWebEnums.EnumApps.CartCount, serverUser);

                    if (result > 0)
                    {
                        response.DataList = _criticalRepo.GetUserAllocatedCarts(((int)AtParWebEnums.EnumApps.CartCount).ToString(),
                                                                                    serverUser, bUnit);
                        if (response.DataList.Count == 0)
                        {
                            response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                            return response;
                        }
                    }
                    else
                    {
                        response.DataList = _criticalRepo.GetBUnitAllocatedCarts(bUnit, orgGroupID);
                        var data = response.DataList;
                        var data2 = (from dr in data
                                     select new MT_CRCT_USER_ALLOCATION()
                                     {
                                         CART_ID = dr.CRTID,
                                         DESCR = dr.CART_ID,
                                         BUSINESS_UNIT = dr.BUSINESS_UNIT,
                                         SHADOW_FLAG = dr.SHADOW_FLAG
                                     }).ToList();

                        response.DataList = data2;
                        if (response.DataList.Count == 0)
                        {
                            response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                            return response;
                        }
                    }
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Return Users List : " + response.DataList + ":"); }

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.StatType = AtParWebEnums.StatusType.Error;
                response.ExceptionMessage = ex.ToString();
                return response;
            }
        }

        #endregion

        #region AllocateCartItemInfo
        public AtParWebApiResponse<MT_CRCT_CRITICAL_ITEMS> AllocateCartItemInfo(List<MT_CRCT_CRITICAL_ITEMS> lstCriticalItems, string BUnit, string cartID, string serverUser, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_CRCT_CRITICAL_ITEMS>();
            string strPrevItemID = string.Empty;
            long StatusCode = -1;

            try
            {

                StatusCode = _criticalRepo.DeleteCriticalItems(BUnit, cartID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                if (lstCriticalItems != null && lstCriticalItems.Count() > 0)
                {
                    lstCriticalItems = lstCriticalItems.OrderBy(x => x.INV_ITEM_ID ==
                                            (AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID).ToString()).ToList();

                    foreach (var item in lstCriticalItems)
                    {
                        if (item.ChkValue == AtParWebEnums.YesNo_Enum.Y.ToString())
                        {
                            if (strPrevItemID != item.INV_ITEM_ID)
                            {
                                StatusCode = _criticalRepo.CreateCriticalItem(BUnit, cartID, item.INV_ITEM_ID);

                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                                    return response;
                                }

                                strPrevItemID = item.INV_ITEM_ID;
                            }

                        }
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
        #endregion        

        #region Common Functions

        private DataSet CreateInputParametersDataset(string[,] tableDefn, string tableType)
        {
            DataTable _dt;
            DataSet pInputParameters = new DataSet();
            try
            {
                _dt = AtPar.Common.ApplicationDataSetDefns.CreateAtParTableDefn(tableDefn, tableType);

                pInputParameters.Tables.Add(_dt);
                return pInputParameters;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        #endregion

        #region GetCartItemsInfo
        public AtParWebApiResponse<VM_MT_CRCT_CRITICAL_ITEMS> GetCartItemsInfo(string orgGroupID, string businessUnit, string cartID, string serverUser, string profileID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_CRCT_CRITICAL_ITEMS>();
            response.DataList = new List<VM_MT_CRCT_CRITICAL_ITEMS>();

            try
            {
                var lstCriticalItems = new List<MT_CRCT_CRITICAL_ITEMS>();

                bool tmpFlag = false;
                Tuple<long, DataSet> tupleOutpt;

                tupleOutpt = _getDetailsService.GetDetails(orgGroupID, businessUnit, cartID, deviceTokenEntry);

                if (tupleOutpt.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleOutpt.Item1, _commonRepo, _log);
                    return response;
                }

                DataSet CartItems = tupleOutpt.Item2;

                // Fetching Critical Items from AtPar Middle tier
                lstCriticalItems = _criticalRepo.GetCriticalItems(businessUnit, cartID);

                if (lstCriticalItems != null && lstCriticalItems.Count() > 0)
                {
                    tmpFlag = true;
                }

                // Loop through Cart Items fetched from ERP and if already allocated mark the item 
                for (int i = 0; i < CartItems.Tables[1].Rows.Count - 1; i++)
                {
                    var objCriticalItem = new VM_MT_CRCT_CRITICAL_ITEMS();

                    objCriticalItem.INV_ITEM_ID =
                            CartItems.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString();

                    objCriticalItem.ITEM_DESCR =
                            CartItems.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();

                    objCriticalItem.ITEM_PRICE =
                            CartItems.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString();

                    objCriticalItem.OPTIMAL_QTY =
                            CartItems.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ToString();

                    objCriticalItem.CART_REPLEN_CTRL =
                            CartItems.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_CTRL].ToString();

                    objCriticalItem.CART_REPLEN_OPT =
                            CartItems.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_OPT].ToString();

                    objCriticalItem.CUST_ITEM_ID =
                            CartItems.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ToString();
                    
                        objCriticalItem.COMPARTMENT =
                            CartItems.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ToString();

                    if (tmpFlag)
                    {
                        if (lstCriticalItems.Any(c => c.ITEM_ID == CartItems.Tables[1].Rows[i][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString()))
                        {
                            objCriticalItem.ChkValue = AtParWebEnums.YesNo_Enum.Y.ToString();
                        }
                        else
                        {
                            objCriticalItem.ChkValue = AtParWebEnums.YesNo_Enum.N.ToString();
                        }

                        objCriticalItem.ChkField = "CB" + i + 1 + "0";
                    }

                    response.DataList.Add(objCriticalItem);
                }
                response.DataList.OrderBy(x => x.ChkValue == "Y");
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
    }
}

using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.CartCount;
using AtPar.Service.Interfaces.Common;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;

namespace AtPar.CartCount.Service
{
    public class ProcessParametersService : IProcessParametersService
    {
        #region Private Variable

        IProcessParametersRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;
        IGetHeaderService _getHeaderService;
        #endregion

        #region Constructor

        public ProcessParametersService(IProcessParametersRepository repository, ILog log, ICommonRepository commonRepository, ICommonService commonService, IGetHeaderService cartcountCommonService)
        {
            _repo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _getHeaderService = cartcountCommonService;
            _log.SetLoggerType(typeof(ProcessParametersService));
            _getHeaderService.GetConfigData();
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the Cart Schedules
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="cartID"></param>
        /// <param name="bUnit"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> GetCartSchedules(string orgGroupID, string cartID, string bUnit)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>();

            try
            {
                response.DataList = _repo.GetCartSchedules(orgGroupID, cartID, bUnit);
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        /// <summary>
        /// Get the Schedule IDs
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SCHEDULE_HEADER>();

            try
            {
                response.DataList = _repo.GetSheduleIDs(orgGroupID);
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        /// <summary>
        /// Allocates Cart Schedules
        /// </summary>
        /// <param name="lstCartSchedules"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="bUnit"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> AssignScheduleToCarts(List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> lstCartSchedules, string orgGroupID, string bUnit)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {

                long StatusCode = _repo.AssignScheduleToCarts(lstCartSchedules, orgGroupID, bUnit);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    response.AtParSuccess();
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        /// <summary>
        /// Gets the Process Parameter Carts
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="bUnit"></param>
        /// <param name="cartID"></param>
        /// <param name="userID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_CART_SCHEDULES> GetProcessParametersCarts(string orgGroupID, string bUnit, string cartID,
                                                                                string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_CART_SCHEDULES>();

            List<VM_CART_SCHEDULES> lstCartSchedules = new List<VM_CART_SCHEDULES>();

            try
            {

                if (string.IsNullOrEmpty(cartID))
                {
                    cartID = string.Empty;
                }
                if (!(string.IsNullOrEmpty(orgGroupID)))
                {
                    string cartsAllocationRequired = string.Empty;
                    cartsAllocationRequired = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.CART_ALLOCATION.ToString(),
                                                      (int)AtParWebEnums.EnumApps.CartCount, orgGroupID);

                    if (cartsAllocationRequired == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        List<MT_CRCT_USER_ALLOCATION> lstUserCarts = _repo.GetUserCarts(bUnit, cartID, userID);

                        if (lstUserCarts.Count > 0)
                        {
                            foreach (var item in lstUserCarts)
                            {
                                lstCartSchedules.Add(new VM_CART_SCHEDULES() { BUSINESS_UNIT = item.BUSINESS_UNIT, CART_ID = item.CART_ID });
                            }
                        }
                    }
                    else
                    {
                        // erp calling
                        DataSet erpCarts = GetErpCartDetails(userID, bUnit, cartID, orgGroupID, deviceTokenEntry);


                        if (erpCarts.Tables.Count > 0)
                        {
                            foreach (DataRow item in erpCarts.Tables[0].Rows)
                            {
                                lstCartSchedules.Add(new VM_CART_SCHEDULES()
                                {
                                    BUSINESS_UNIT = item[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ToString(),
                                    CART_ID = item[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ToString()
                                });
                            }
                        }

                    }

                    BuildCartSchedules(lstCartSchedules, orgGroupID, bUnit, cartID);

                }
                if (lstCartSchedules != null && lstCartSchedules.Count > 0)
                {
                    response.DataList = lstCartSchedules;
                    response.AtParSuccess();
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                }

                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        #endregion

        #region Private Methods

        /// <summary>
        /// Gets the Carts based on carts Managed in AtPar
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="bUnit"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        private DataSet GetErpCartDetails(string userId, string bUnit, string cartID, string orgGroupId, string[] deviceTokenEntry)
        {
            DataTable cartHeader, cartBUnits, cartPreReqData;
            DataTable cartOutPutDetails = new DataTable();
            string fldOrdby = "BUSINESS_UNIT, INV_CART_ID";
            string erpObjName = string.Empty;

            cartHeader = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());
            cartBUnits = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_BusinessUnits_Defns, AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());
            cartPreReqData = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Params_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());
            cartOutPutDetails = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Header_Output_Header, AtParWebEnums.DataSet_Type.OUTPUT.ToString());

            string cartManagedInAtPar = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString(),
                                              (int)AtParWebEnums.EnumApps.CartCount, orgGroupId);

            PrePareCartBUnits(userId, bUnit, orgGroupId, cartBUnits);
            Tuple<long, DataSet> tupleResult = _getHeaderService.GetHeader(userId, bUnit, cartID, fldOrdby, string.Empty, deviceTokenEntry);
            return tupleResult.Item2;
        }

        /// <summary>
        /// Builds the Cart Bunits
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="bUnit"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="cartBunits"></param>
        private void PrePareCartBUnits(string userId, string bUnit, string orgGroupId, DataTable cartBunits)
        {
            DataRow drBusinessUnit;
            if (string.IsNullOrWhiteSpace(bUnit).Equals(false))
            {
                drBusinessUnit = cartBunits.NewRow();
                drBusinessUnit[0] = bUnit;
                cartBunits.Rows.Add(drBusinessUnit);
            }
            else
            {
                var response = new AtParWebApiResponse<string>();
                response = _commonService.GetOrgGroupBUnits(userId, orgGroupId, AtParWebEnums.BusinessType.Inventory.ToString());

                foreach (var item in response.DataList)
                {
                    drBusinessUnit = cartBunits.NewRow();
                    drBusinessUnit[0] = item;
                    cartBunits.Rows.Add(drBusinessUnit);
                }

            }

        }
        /// <summary>
        /// Builds the Process Parameters Carts Results
        /// </summary>
        /// <param name="lstCartSchedules"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="bUnit"></param>
        /// <param name="cartID"></param>
        private void BuildCartSchedules(List<VM_CART_SCHEDULES> lstCartSchedules, string orgGroupID, string bUnit, string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> lstAlloctedSchCarts = _repo.GetAllocatedScheduleCarts(bUnit, orgGroupID, cartID);
                foreach (var item in lstCartSchedules)
                {
                    var result = lstAlloctedSchCarts.Where(x => x.ORG_ID == item.BUSINESS_UNIT && x.PAR_LOC_ID == item.CART_ID).FirstOrDefault();

                    if (result != null)
                    {
                        item.ASSIGN_CART = AtParWebEnums.YesNo_Enum.Y.ToString();
                        item.SCHEDULER = result.SCHEDULE_ID;
                    }
                    else
                    {
                        item.ASSIGN_CART = AtParWebEnums.YesNo_Enum.N.ToString();
                        item.SCHEDULER = String.Empty;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        #endregion

    }
}

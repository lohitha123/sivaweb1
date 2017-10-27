using AtPar.Common;
using AtPar.POCOEntities;
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
    public class GetHeaderService : IGetHeaderService
    {
        #region Private Variable

        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;

        #endregion

        #region Constructor
        public GetHeaderService(ILog log, ICommonRepository commonRepository, ICommonService commonService)

        {
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _log.SetLoggerType(typeof(AllocateCartsService));
        }

        #endregion

        #region GetHeaders

        private DataSet Populate_GetHeader_InputParameters()
        {
            DataTable cartHeaders = new DataTable();
            DataTable cartBUnits = new DataTable();
            DataTable cartPreReqData = new DataTable();
            DataSet inputParams = new DataSet();

            cartHeaders = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Header_Defns,
                                      AtParWebEnums.DataSet_Type.HEADERS.ToString());

            cartPreReqData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Params_Defns,
                                AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

            cartBUnits = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_BusinessUnits_Defns,
                                AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());


            inputParams.Tables.Add(cartHeaders);
            inputParams.Tables.Add(cartPreReqData);
            inputParams.Tables.Add(cartBUnits);

            return inputParams;

        }

        private DataSet Populate_GetHeader_OutputParameters()
        {
            DataTable cartOutputData = new DataTable();
            DataSet outputParameters = new DataSet();
            cartOutputData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Header_Output_Header, AtParWebEnums.DataSet_Type.OUTPUT.ToString());
            outputParameters.Tables.Add(cartOutputData);
            return outputParameters;
        }
        private DataSet Populate_GetHeader_Prerequisites(DataSet inputParams,string userID, string bUnit, string cartID, string fldOrdBy, string order)
        {

            string remoteSchema = string.Empty;
            string remoteDBType = string.Empty;

            // Preparing Header Table Data
            DataRow drHeader = inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();
            drHeader[(int)AtParWebEnums.Get_Cart_Header_Enum.FLD_ORDER_BY] = fldOrdBy;
            drHeader[(int)AtParWebEnums.Get_Cart_Header_Enum.CART_ID] = string.Empty;
            drHeader[(int)AtParWebEnums.Get_Cart_Header_Enum.ORDER_BY_ORDER] = order;
            inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(drHeader);

            // Preparing Prereq Table Data
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            List<string> lstParameters = new List<string>();

            lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
            lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
            lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
            lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

            remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                     x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                     .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

            remoteDBType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                    x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                                    .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


            DataRow drPreReq = inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
            drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;
            drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDBType;
            inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(drPreReq);

            // Preparing BUnits Table Data
            DataRow drBUnits = null;
            if (!string.IsNullOrEmpty(bUnit))
            {
                drBUnits = inputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].NewRow();
                drBUnits[(int)AtParWebEnums.Get_Cart_Header_BusinessUnits_Enum.BUSINESS_UNIT] = bUnit;
                inputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Add(drBUnits);
            }
            else
            {
                List<string> lstBUnits = null;
                AtParWebApiResponse<string> responseBUnits = null;
                responseBUnits = _commonService.GetBusinessUnits(userID, AtParWebEnums.BusinessType.Inventory.ToString());
                lstBUnits = responseBUnits.DataList.ToList();
                foreach(var itemBUnit in lstBUnits)
                {
                    drBUnits = inputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].NewRow();
                    drBUnits[(int)AtParWebEnums.Get_Cart_Header_BusinessUnits_Enum.BUSINESS_UNIT] = itemBUnit;
                    inputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Add(drBUnits);

                }
            }
           
            return inputParams;

        }

        private Tuple<long, DataSet> Execute_GetHeader_ProcessTasks(DataSet inputParams, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet outPutParams = null;
            string erpObjName = string.Empty;
            string className = null;
            string methodName = string.Empty;
            string cartsMngdInAtPar = string.Empty;
            MethodInfo MethodName = null;
            object reflectObject = null;
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            List<string> lstParameters = new List<string>();
            SortedList<string, string> orgParams;
            orgParams = new SortedList<string, string>();
            orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()] = string.Empty;
            long StatusCode = -1;

            _commonRepo.GetOrgGroupParamValues(orgParams, (int)AtParWebEnums.EnumApps.CartCount, objToken[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

            GetConfigData();

            outPutParams = Populate_GetHeader_OutputParameters();

            lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
            lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

            cartsMngdInAtPar = orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()];
            

            erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                            x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                            .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

            if (cartsMngdInAtPar == AtParWebEnums.YesNo_Enum.Y.ToString())
            {
                erpObjName = AtParWebEnums.Erp_Obj_Name.CartCount_Atpar.ToString();
            }
            else
            {
                erpObjName = AtParWebEnums.EnumApps.CartCount.ToString() + "_" + erpObjName;
            }

            className = "GetHeader";
            methodName = "GetHeader";

            MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

            object[] args = { inputParams, outPutParams, objToken };

            StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

            if (StatusCode != AtparStatusCodes.ATPAR_OK)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                var tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                return tupleOutput;
            }

            outPutParams = (DataSet)args[1];

            if (outPutParams.Tables[0].Rows.Count > 0)
            {
                //List<VM_CRCT_USER_ALLOCATION> lstCarts = new List<VM_CRCT_USER_ALLOCATION>();
                //lstCarts = (from DataRow dr in outPutParams.Tables[0].Rows
                //            select new VM_CRCT_USER_ALLOCATION()
                //            {
                //                CART_ID = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ToString(),
                //                BUSINESS_UNIT = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ToString(),
                //                DESCR = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR].ToString(),
                //                SHADOW_FLAG = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.SHADOW_FLAG].ToString(),
                //                CART_COUNT_ORDER = Convert.ToInt32(dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_COUNT_ORDER]),
                //                TWO_BIN_ALLOCATION = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.TWO_BIN_ALLOCATION].ToString(),
                //                DEF_PERCENTAGE_VALUE = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DEF_PERCENTAGE_VALUE].ToString(),
                //                LOCATION_TYPE = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE].ToString()
                //            }).ToList();

                var tupleOutput = new Tuple<long, DataSet>(StatusCode, outPutParams);
                return tupleOutput;
            }
            else
            {
                var tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null);
                return tupleOutput;
            }

        }
        public Tuple<long, DataSet> GetHeader(string userID,string bUnit, string cartID, string fldOrdBy,
                                                                    string order, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                DataSet inputParameters = Populate_GetHeader_InputParameters();

                inputParameters = Populate_GetHeader_Prerequisites(inputParameters, userID, bUnit, cartID, fldOrdBy, order);

                return Execute_GetHeader_ProcessTasks(inputParameters, objToken);
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                var tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }            
        }

        #endregion

        #region GetConfigData
        public void GetConfigData()
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                var objCls = new Utilities();
                objCls.InitializeAtParSystem();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion 
    }
}

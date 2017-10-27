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
    public class CommonCartCountService : ICommonCartCountService
    {
        #region Private Variable

        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;

        #endregion

        #region Constructor
        public CommonCartCountService(ILog log, ICommonRepository commonRepository, ICommonService commonService)

        {
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _log.SetLoggerType(typeof(AllocateCartsService));
        }

        #endregion

        #region GetCartHeaders
        public Tuple<long, DataSet> GetCartHeaders(DataTable cartHeaderData, DataTable cartPreReqData,
                                                   DataTable cartBusinessUnit, string fldOrdBy, string order,
                                                   string bUnit, string[] objToken, string orgGroupID,
                                                   string cartsMngdInAtPar)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<long, DataSet> tupleOutput = null;

            try
            {
                DataSet inputParameters = new DataSet();
                DataSet outputParameters = new DataSet();
                DataTable cart_output = new DataTable();

                string remoteSchema = string.Empty;
                string remoteDBType = string.Empty;

                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

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

                DataRow drHeader = cartHeaderData.NewRow();

                drHeader[(int)AtParWebEnums.Get_Cart_Header_Enum.FLD_ORDER_BY] = fldOrdBy;
                drHeader[(int)AtParWebEnums.Get_Cart_Header_Enum.CART_ID] = string.Empty;
                drHeader[(int)AtParWebEnums.Get_Cart_Header_Enum.ORDER_BY_ORDER] = order;
                cartHeaderData.Rows.Add(drHeader);
                inputParameters.Tables.Add(cartHeaderData);


                if (cartPreReqData.Rows.Count > 0)
                {
                    cartPreReqData.Rows[0][(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;
                    cartPreReqData.Rows[0][(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDBType;
                    cartPreReqData.AcceptChanges();
                    inputParameters.Tables.Add(cartPreReqData);
                }
                else
                {
                    DataRow drPreReq = cartPreReqData.NewRow();
                    drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;
                    drPreReq[(int)AtParWebEnums.Get_Cart_Header_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDBType;
                    cartPreReqData.Rows.Add(drPreReq);
                    inputParameters.Tables.Add(cartPreReqData);
                }

                if(cartBusinessUnit.Rows.Count > 0)
                {
                    inputParameters.Tables.Add(cartBusinessUnit);
                }
                else
                {
                    DataRow drBunit = cartBusinessUnit.NewRow();
                    drBunit[(int)AtParWebEnums.Get_Cart_Header_BusinessUnits_Enum.BUSINESS_UNIT] = bUnit;
                    cartBusinessUnit.Rows.Add(drBunit);
                    inputParameters.Tables.Add(cartBusinessUnit);
                }
                

                //Table to add Output Data
                cart_output = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Header_Output_Header, AtParWebEnums.DataSet_Type.OUTPUT.ToString());
                outputParameters.Tables.Add(cart_output);

                GetConfigData();

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

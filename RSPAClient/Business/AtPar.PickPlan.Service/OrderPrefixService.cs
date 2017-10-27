using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.PickPlan;
using AtPar.Service.Interfaces.PickPlan;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Linq;
using AtPar_BusinessRules;

namespace AtPar.PickPlan.Service
{
    public class OrderPrefixService : IOrderPrefixService
    {
        IOrderPrefixRepository _orderPrefixRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public OrderPrefixService(IOrderPrefixRepository objrepository, ILog log, ICommonRepository commonRepository)
        {
            _orderPrefixRepo = objrepository;
            _log = log;
            _commonRepo = commonRepository;

        }

        #region GetOrderPrefixSetUp
        public AtParWebApiResponse<VM_PKPL_ORDER_PREFIX> GetOrderPrefixSetUp(params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_PKPL_ORDER_PREFIX>();
            List<VM_PKPL_ORDER_PREFIX> lstERPOrders = new List<VM_PKPL_ORDER_PREFIX>();

            try
            {
              
                lstERPOrders = GetERPList(deviceTokenEntry);

                if(lstERPOrders == null)
                {
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }


                List<MT_PKPL_ORDER_PREFIX> lstSQLOrders=  _orderPrefixRepo.GetOrderPrefixSetUp();

                if (lstSQLOrders != null && lstSQLOrders.Count == 0)
                {
                    lstERPOrders.ForEach(x =>
                    {
                        x.CHK_VALUE = 0;                      
                    });

                }
                 else if (lstSQLOrders != null && lstSQLOrders.Count > 0)
                {
                    foreach (var item in lstSQLOrders)
                    {
                     
                        var isExists = lstERPOrders.Where(x => x.BEG_SEQ == item.ORDER_PREFIX).FirstOrDefault(); 

                        if (isExists!= null)
                        {
                            isExists.CHK_VALUE = 1;
                        }

                    }

                }

                response.DataList = lstERPOrders.OrderByDescending(x => x.CHK_VALUE == 1).ToList();
                response.AtParSuccess();

                return response;

            }
            catch(Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

       

        private List<VM_PKPL_ORDER_PREFIX> GetERPList(string[] objToken)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

            DataSet pOutputParameters = new DataSet();

            try
            {
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;

                object reflectObject = null;                    
                long StatusCode;

                //GetConfigData();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
                erpObjName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                

                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }

                    return null;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.PickPlan.ToString() + "_" + erpObjName;
                }

                className = "GetOPSetup";
                methodName = "GetOPSetup";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);


                object[] args = { pOutputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                }


                pOutputParameters = (DataSet)args[0];
                IEnumerable<VM_PKPL_ORDER_PREFIX> objOut = ParseListViewElement(pOutputParameters.Tables[0]);

                return objOut.ToList();

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
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

        /// <summary>
        /// ParseListViewElement
        /// </summary>
        /// <param name="outputData"></param>
        /// <returns></returns>
        public IEnumerable<VM_PKPL_ORDER_PREFIX> ParseListViewElement(DataTable outputData)
        {
            try
            {
                IEnumerable<VM_PKPL_ORDER_PREFIX> result =
                from x in outputData.AsEnumerable()
                select new VM_PKPL_ORDER_PREFIX
                {
                    BEG_SEQ = x.Field<string>("BEG_SEQ") ?? string.Empty,
                    CHK_VALUE = 0
                };
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region SaveOrderPrefixSetUp

        public AtParWebApiResponse<MT_PKPL_ORDER_PREFIX> SaveOrderPrefixSetUp(List<MT_PKPL_ORDER_PREFIX> orderPrefix)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_PKPL_ORDER_PREFIX>();

            try
            {               
                long StatusCode = _orderPrefixRepo.SaveOrderPrefixSetUp(orderPrefix);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
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
    }
}

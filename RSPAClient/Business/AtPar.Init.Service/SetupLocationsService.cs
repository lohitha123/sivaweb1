using System;
using System.Collections.Generic;
using System.Linq;
using AtPar.Repository.Interfaces.Common;
using log4net;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Reflection;
using AtPar_BusinessRules;
using System.Data;
using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Service.Interfaces.Init;

namespace AtPar.Init.Service
{
    public class SetupLocationsService : ISetupLocationsService
    {
        ICommonRepository _commonRepo;
        private ILog _log;
        string CONST_ATPAR = "Atpar";
        public SetupLocationsService(ICommonRepository commonRepository, ILog log)
        {
            _commonRepo = commonRepository;
            this._log = log;
            this._log.SetLoggerType(typeof(SetupLocationsService));
        }

        #region InsertUpdateLocIDs
        /// <summary>
        /// Inserting And Updating Location IDs
        /// </summary>
        /// <param name="locIDs"></param>
        /// <param name="mode"></param>
        /// <param name="newOrgID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> InsertUpdateLocIDs(List<VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS> locIDs, string mode, string newOrgID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var remoteAtparObj = CONST_ATPAR + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (remoteAtparObj.ToUpper() == "ATPAR_PEOPLESOFT")
                {
                    remoteAtparObj = "Atpar_FileInterface";
                }

                DataTable dtLocIDS = locIDs.ToDataTable();//Utils.ToDataTable(locIDs);
                DataSet dsLocIds = new DataSet();
                dsLocIds.Tables.Add(dtLocIDS);

                response.StatusCode = ErpInsertUpdateLocIDs(remoteAtparObj, dsLocIds, mode, newOrgID, deviceTokenEntry);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1}:", methodBaseName, "ErpInsertUpdateLocIDs getting failed from ERP")); }

                    if (response.StatusCode == AtparStatusCodes.E_REMOTEERROR)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        return response;
                    }
                    else if (response.StatusCode == AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION)
                    {
                        response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALREADYEXISTS, _commonRepo, _log, locIDs.FirstOrDefault().LOCATION_ID);
                        return response;
                    }
                    else
                    {
                        response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                        return response;
                    }
                }

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

        private long ErpInsertUpdateLocIDs(string remoteAtparObj, DataSet dsLocIds, string mode, string newOrgID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;

            try
            {
                //GetConfigData();
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                className = "SetUpLocations";
                methodName = "InsertUpdateLocIDs";

                MethodName = Utils.CreateERPObjectInstance(remoteAtparObj, className, methodName, out reflectObject);

                object[] args = { dsLocIds, mode, newOrgID, deviceTokenEntry };

                statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ErpInsertUpdateLocIDs getting failed from ERP")); }

                    return statusCode;
                }

                return statusCode;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }

                return AtparStatusCodes.E_SERVERERROR;
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
        #endregion
    }
}

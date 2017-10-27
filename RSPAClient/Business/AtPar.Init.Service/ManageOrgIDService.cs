using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using log4net;
using AtPar.POCOEntities;
using AtPar.Common;
using System.Data;
using System.Reflection;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar_BusinessRules;

namespace AtPar.Init.Service
{
    public class ManageOrgIDService : IManageOrgIDService
    {
        #region Private Variable

        IConfigData _configDataRepo = null;
        ICommonRepository _commonRepo = null;
        IManageOrgIDRepository _manageOrgIdRepo = null;
        ILog _log;
        string CONST_ATPAR = "Atpar";
        string SETUP_ORG_UNIT_CLASS = "SetUpOrgUnits";

        #endregion

        #region Constructor

        public ManageOrgIDService(ILog log, IConfigData objConfigData, ICommonRepository objCommonRepo, IManageOrgIDRepository objManageRepo)
        {
            _log = log;
            _configDataRepo = objConfigData;
            _commonRepo = objCommonRepo;
            _manageOrgIdRepo = objManageRepo;
            _log.SetLoggerType(typeof(ManageOrgIDService));
            //GetConfigData();
        }

        #endregion

        #region Public Methods
        /// <summary>
        /// Gets the Org Units
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="orgId"></param>
        /// <param name="orgType"></param>
        /// <param name="orgName"></param>
        /// <param name="status"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<RM_ORG_UNITS> GetOrgUnits(string userId, string orgId,
                                                             string orgType, string orgName,
                                                             string status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<RM_ORG_UNITS>();
            if (!string.IsNullOrEmpty(orgName))
            {
                orgName = orgName.ReplaceString();
            }
            else {
                orgName = "";
            }
            try
            {
                response.DataList = GetOrgsERPCall(orgId, orgType, orgName, status, deviceTokenEntry);
                
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Return Org Units : " + response.DataList + ":"); }
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
        /// Updates the OrgID status
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgID"></param>
        /// <param name="orgType"></param>
        /// <param name="status"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateOrgIDStatus(string userID, string orgID, string orgType, bool status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

            var response = new AtParWebApiResponse<long>();
            try
            {
                string erpObjName = string.Empty;
                string methodName = "UpdateOrgIDStatus";
                MethodInfo MethodName = null;

                object reflectObject = null;
                long StatusCode;

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
                erpObjName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString()
                                        && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                erpObjName = string.Concat(CONST_ATPAR, "_", erpObjName);

                MethodName = Utils.CreateERPObjectInstance(erpObjName, SETUP_ORG_UNIT_CLASS, methodName, out reflectObject);

                object[] args = { orgID, orgType, status, deviceTokenEntry };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

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

        /// <summary>
        /// Update or Insert the OrgIds
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="lstOrgUnits"></param>
        /// <param name="mode"></param>
        /// <param name="newType"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> InsertUpdateOrgUnits(string userID, List<RM_ORG_UNITS> lstOrgUnits,
                                                              string mode, string newType, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

            var response = new AtParWebApiResponse<long>();
            try
            {
                string erpObjName = string.Empty;
                string methodName = "InsertUpdateOrgUnits";
                MethodInfo MethodName = null;

                object reflectObject = null;
                long StatusCode;

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
                erpObjName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                erpObjName = string.Concat(CONST_ATPAR, "_", erpObjName);

                MethodName = Utils.CreateERPObjectInstance(erpObjName, SETUP_ORG_UNIT_CLASS, methodName, out reflectObject);

                DataSet inpuDS = lstOrgUnits.ToDataSet(); //calling extension method

                object[] args = { inpuDS, mode, newType, deviceTokenEntry };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

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

        /// <summary>
        /// Gets the Org GroupIds
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="name"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetOrgGrpIDs(string userID, string orgGrpID,
                                                                     string name, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>();

            try
            {
                if (string.IsNullOrEmpty(userID))
                {
                    userID = string.Empty;
                }

                if (string.IsNullOrEmpty(orgGrpID))
                {
                    orgGrpID = string.Empty;
                }

                if (string.IsNullOrEmpty(name))
                {
                    name = string.Empty;
                }
                response.DataList = _manageOrgIdRepo.GetOrgGrpIDs(userID, orgGrpID, name);
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

        #region Private Methods

        /// <summary>
        /// To Initialize AtPar System
        /// </summary>
        //private void GetConfigData()
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
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

        /// <summary>
        /// Gets the Org Units from ERP
        /// </summary>
        /// <param name="orgId"></param>
        /// <param name="orgType"></param>
        /// <param name="orgName"></param>
        /// <param name="status"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        private IList<RM_ORG_UNITS> GetOrgsERPCall(string orgId, string orgType, string orgName,
                                                   string status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                DataSet outputParameters = new DataSet();
                string _erpObjName = string.Empty;
                string _methodName = "GetOrgUnits";
                object _reflectObject = null;
                MethodInfo _methodInfo = null;
                object _statusCode;
               
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                _erpObjName = string.Concat(CONST_ATPAR, "_", lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString()
                                                     && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault());

                _methodInfo = Utils.CreateERPObjectInstance(_erpObjName, SETUP_ORG_UNIT_CLASS, _methodName, out _reflectObject);
                object[] args = { outputParameters, orgId, orgType, orgName, status, deviceTokenEntry };

                _statusCode = _methodInfo.Invoke(_reflectObject, args);
                outputParameters = (DataSet)args[0];

                IEnumerable<RM_ORG_UNITS> objOut = ParseListViewElement(outputParameters.Tables[0]);
                return objOut.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Converts DataTable object to IEnumerable list
        /// </summary>
        /// <param name="outputData"></param>
        /// <returns></returns>
        private IEnumerable<RM_ORG_UNITS> ParseListViewElement(DataTable outputData)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                IEnumerable<RM_ORG_UNITS> result = from x in outputData.AsEnumerable()
                                                   select new RM_ORG_UNITS
                                                   {
                                                       ORG_ID = x.Field<string>("ORG_ID") ?? string.Empty,
                                                       ORG_NAME = x.Field<string>("ORG_NAME") ?? string.Empty,
                                                       ORG_TYPE = x.Field<string>("ORG_TYPE") ?? string.Empty,
                                                       ADDRESS_1 = x.Field<string>("ADDRESS_1") ?? string.Empty,
                                                       ADDRESS_2 = x.Field<string>("ADDRESS_2") ?? string.Empty,
                                                       CITY = x.Field<string>("CITY") ?? string.Empty,
                                                       STATE = x.Field<string>("STATE") ?? string.Empty,
                                                       ZIP = x.Field<string>("ZIP") ?? string.Empty,
                                                       PHONE_NO = x.Field<string>("PHONE_NO") ?? string.Empty,
                                                       STATUS = x.Field<string>("STATUS") == "InActive" ? false : true,
                                                       MASTER_GROUP_ID = x.Field<string>("MASTER_GROUP_ID") ?? string.Empty

                                                   };
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}


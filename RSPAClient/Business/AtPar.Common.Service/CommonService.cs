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
using System.IO;
using System.DirectoryServices;
using System.Collections;
using AtParEncryptionServices;
using System.Net;
using AtPar.Service.Interfaces.CartCount;
using System.Net.Sockets;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using AtPar.Common;
using System.Net.Mail;
using System.Net.Mime;
using System.Web;

namespace AtPar.Common.Service
{
    public class CommonService : ICommonService
    {
        ICommonRepository _commonRepo;
        private ILog _log;
        string CONST_ATPAR = "Atpar";
        string CONST_ATPAR_FILEINTERFACE = "Atpar_FileInterface";
        // ICommonErpService _commonErpService;
        IGetDetailsService _getDetailsService;

        public CommonService(ICommonRepository commonRepository, ILog log, IGetDetailsService getDetailsService)
        {
            _commonRepo = commonRepository;
            this._log = log;
            _log.SetLoggerType(typeof(CommonService));
            // _commonErpService = commonErpService;
            _getDetailsService = getDetailsService;
        }

        #region GetSystemIDs


        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DB> GetSystemIDs(string systemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            if (string.IsNullOrEmpty(systemID))
            {
                systemID = string.Empty;
            }

            List<MT_ATPAR_SYSTEM_DB> lstSystems = new List<MT_ATPAR_SYSTEM_DB>();

            var response = new AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>();

            try
            {
                lstSystems = _commonRepo.GetSystemIDs(systemID);

                if (lstSystems != null && lstSystems.Count > 0)
                {
                    response.DataList = lstSystems;
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

        #region GetSecurityParams

        public AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS> GetSecurityParams()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            MT_ATPAR_SECURITY_PARAMS securityParams = null;
            var response = new AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>();

            try
            {

                securityParams = _commonRepo.GetSecurityParams();

                if (securityParams != null)
                {
                    response.Data = securityParams;
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
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion

        #region InsertAuditData
        /// <summary>
        /// Inserting data into MT_ATPAR_SECURITY_AUDIT table
        /// </summary>
        /// <param name="audit"></param>
        /// <param name="user"></param>
        /// <param name="function"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT> InsertAuditData(List<MT_ATPAR_SECURITY_AUDIT> audit, string user, string function, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>();

            try
            {
                long StatusCode = _commonRepo.InsertAuditData(audit, user, function);

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

        #region GetAuditAllowed
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="appId"></param>
        /// <param name="menuCode"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> GetAuditAllowed(string userID, int appId, string menuCode, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

            List<string> lstParameters = new List<string>();

            lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

            lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

            var enterprise = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

            var response = new AtParWebApiResponse<string>();
            try
            {
                response.Data = _commonRepo.GetAuditAllowed(userID, appId, menuCode, enterprise);
                if (response.Data == null)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetUsersList
        /// <summary>
        /// Getting users list from MT_ATPAR_USER,MT_ATPAR_USER_GROUPS and MT_ATPAR_USER_ACL tables
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        /// <param name="orgGrpId"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_USER> GetUsersList(string userID, string appID, string orgGrpID, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_USER>();
            int cnt = -1;

            try
            {
                cnt = _commonRepo.GetUserscount(userID, appID);

                if (cnt == 0)
                {
                    response.DataList = _commonRepo.GetOrgsList(appID, orgGrpID);
                }
                else
                {
                    response.DataList = _commonRepo.GetUsersList(appID, userID);
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

        #region GetUserOrgGroups
        /// <summary>
        /// Getting UserOrgGroups from MT_ATPAR_USER_ORG_GROUPS
        /// </summary>
        /// <param name="user"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetUserOrgGroups(string user, string orgGrpID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>();

            try
            {
                if (orgGrpID == "All")
                {
                    response.DataList = _commonRepo.GetAllUserOrgGroups();
                }
                else
                {
                    response.DataList = _commonRepo.GetUserOrgGroups(user, orgGrpID);
                }

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetMyPreferences
        /// <summary>
        /// Getting preferences from MT_ATPAR_USER_ACL
        /// </summary>
        /// <param name="pStrPreference"></param>
        /// <param name="pStrUID"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> GetMyPreferences(string preference, string uId, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataVariable = _commonRepo.GetMyPreferences(preference, uId);

                if (response.DataVariable == null)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetApps
        /// <summary>
        /// Gettings APP_ID and APP_NAME from MT_ATPAR_APP
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_APP> GetApps(string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_APP>();

            try
            {
                response.DataList = _commonRepo.GetApps(userID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetOrgGrpIDs
        /// <summary>
        /// Getting OrgGroupIds
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="name"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetOrgGrpIDs(string userID, string orgGrpID, string name)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>();

            try
            {
                if (string.IsNullOrEmpty(orgGrpID))
                {
                    orgGrpID = string.Empty;
                }
                if (string.IsNullOrEmpty(name))
                {
                    name = string.Empty;
                }

                response.DataList = _commonRepo.GetOrgGrpIDs(userID, orgGrpID, name);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetProfiles
        /// <summary>
        /// Getting  PROFILE_ID and PROFILE_DESCRIPTION from MT_ATPAR_PROFILE table
        /// </summary>
        /// <param name="pUserID"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_PROFILE> GetProfiles(string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_PROFILE>();
            try
            {
                response.DataList = _commonRepo.GetProfiles(userID);
                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetServerAccessCnt
        /// <summary>
        /// Getting Server Access Count from MT_ATPAR_PROFILE_APP_ACL
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<int> GetServerAccessCnt(string userID, string profileID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<int>();

            try
            {
                var intCount = _commonRepo.GetServerAccessCnt(userID, profileID);

                response.DataVariable = intCount;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetClientAccessCnt
        /// <summary>
        /// Getting Client Access Count from MT_ATPAR_PROFILE_APP_ACL
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<int> GetClientAccessCnt(string userID, string profileID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<int>();

            try
            {
                var intCount = _commonRepo.GetClientAccessCnt(userID, profileID);

                response.DataVariable = intCount;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetPrintersData
        /// <summary>
        /// Getting Printers Data From Stored Procedure GetPrinterData
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="printerName"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES> GetPrintersData(string appID, string printerName, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES>();
            try
            {
                response.DataList = _commonRepo.GetPrintersData(appID, printerName);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetAppParameters
        /// <summary>
        /// Getting AppParameters from SP_GetProductParameters
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="appID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_MT_ATPAR_ORG_GROUP_PARAMETERS> GetAppParameters(string userID, string orgGrpID, string appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_ATPAR_ORG_GROUP_PARAMETERS>();

            try
            {
                response.DataList = _commonRepo.GetAppParameters(userID, orgGrpID, appID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region CheckRecall
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<bool> CheckRecall()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<bool>();

            try
            {
                response.DataVariable = _commonRepo.CheckRecall();
                //if (Convert.ToBoolean(response.DataVariable))
                //{
                //    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                //    return response;
                //}
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }
        #endregion

        #region SaveAppParameters
        /// <summary>
        /// Saving AppParameters to MT_ATPAR_ORG_GROUP_PARAMETERS
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <param name="appID"></param>
        /// <param name="user"></param>
        /// <param name="lstAppParams"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUP_PARAMETERS> SaveAppParameters(string orgGrpID, string appID, string user, List<MT_ATPAR_ORG_GROUP_PARAMETERS> lstAppParams, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUP_PARAMETERS>();
            List<MT_ATPAR_ORG_GROUP_PARAMETERS> listAppParams = new List<MT_ATPAR_ORG_GROUP_PARAMETERS>();
            long StatusCode = -1;
            try
            {
                StatusCode = _commonRepo.SaveAppParameters(orgGrpID, appID, user, lstAppParams);

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }
        #endregion

        #region AllocateBUnits

        #region GetBUnits
        public AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits(string[] businessUnitsArray, string appId, string userID, string bUnit,
                                                       string description, string serverUserID, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION>();

            IEnumerable<VM_ATPAR_IBU_ALLOCATION> lstERPBUnits = new List<VM_ATPAR_IBU_ALLOCATION>();

            try
            {
                if (businessUnitsArray.Length == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                string prepareXml = PrepareXmlForFetchingBunits(businessUnitsArray, bUnit, description);

                string outPutXml = GetERPBUnits(prepareXml, deviceTokenEntry);

                XElement ERPBUnitsData = XElement.Parse(outPutXml);

                lstERPBUnits = from x in ERPBUnitsData.Descendants("Table")
                               select new VM_ATPAR_IBU_ALLOCATION
                               {
                                   INV_LOC_BUSINESS_UNIT = x.Element("INV_LOC_BUSINESS_UNIT") != null ? Convert.ToString(x.Element("INV_LOC_BUSINESS_UNIT").Value) : string.Empty,
                                   BUSINESS_UNIT = Convert.ToString(x.Element("BUSINESS_UNIT").Value) ?? string.Empty,
                                   DESCR = Convert.ToString(x.Element("DESCR").Value) ?? string.Empty,
                                   CHK_VALUE = 0,
                                   USER_ID = string.Empty,
                                   ROWINDEX = 0,
                                   CHK_ALLOCATED = 0
                               };


                List<MT_ATPAR_IBU_ALLOCATION> lstSQLBUnits = _commonRepo.GetBUnits(appId);



                if (lstSQLBUnits != null && lstSQLBUnits.Count() == 0)
                {
                    lstERPBUnits.ToList().ForEach(x =>
                    {
                        x.CHK_VALUE = 0;
                        x.CHK_ALLOCATED = 0;
                    });

                }
                else if (lstSQLBUnits != null && lstSQLBUnits.Count() > 0)
                {
                    foreach (var item in lstSQLBUnits)
                    {
                        var isExists = lstERPBUnits.Where(c => c.BUSINESS_UNIT == item.BUSINESS_UNIT).FirstOrDefault();

                        if (isExists != null)
                        {
                            isExists.USER_ID += string.IsNullOrEmpty(isExists.USER_ID) ? item.USERNAME : "," + item.USERNAME;

                            if ((item.USER_ID) == userID)
                            {
                                isExists.CHK_VALUE = 1;
                                isExists.CHK_ALLOCATED = 1;
                            }

                        }
                    }

                }

                lstERPBUnits.ToList().Select((x, idx) => { x.ROWINDEX = idx; return x; });

                response.DataList = lstERPBUnits.ToList();
                response.AtParSuccess();

                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }


        }
        private string PrepareXmlForFetchingBunits(string[] bArray, string bUnit, string description)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string strXML = string.Empty;

            try
            {

                sbSql.Append("<ROOT>");

                for (int i = 0; i <= bArray.Count() - 1; i++)
                {
                    strXML = strXML + "<RECORD>" + bArray[i] + "</RECORD>";
                }

                sbSql.Append("<BUSINESS_UNIT>" + strXML + "</BUSINESS_UNIT>");

                if (!string.IsNullOrEmpty(bUnit))
                {
                    sbSql.Append("<BUSINESSUNIT>" + bUnit + "</BUSINESSUNIT>");
                }

                if (!string.IsNullOrEmpty(description))
                {
                    sbSql.Append("<DESCR>" + description + "</DESCR>");
                }

                sbSql.Append("<FLD_ORDER_BY></FLD_ORDER_BY><ORDER_BY_ORDER></ORDER_BY_ORDER>");
                sbSql.Append("</ROOT>");

                return sbSql.ToString();

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }

        }
        private string GetERPBUnits(string inputXml, string[] objToken)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                string strXmlOutputStr = string.Empty;
                string strXml = string.Empty;

                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;
                long StatusCode;

                //Initializing 
                // GetConfigData();


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }

                    return AtparStatusCodes.E_SERVERERROR.ToString();
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }

                className = "GetBUnits";
                methodName = "GetBUnits";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);


                object[] args = { inputXml, strXmlOutputStr, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                }

                strXml = args[1].ToString();

                return strXml;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
        }

        private void GetConfigData()
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                var objCls = new Utilities();
                objCls.InitializeAtParSystem();

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
        }

        #endregion

        #region AllocateBUnits
        public AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION> AllocateBUnits(string appId, string userId, string serverUserId,
               List<VM_ATPAR_IBU_ALLOCATION> lstbunitsAllocation, bool searched, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            var response = new AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION>();

            try
            {

                if (searched)
                {
                    StatusCode = _commonRepo.ProcessBUnits(lstbunitsAllocation, userId, appId, serverUserId);

                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                }
                else if (!searched)
                {
                    StatusCode = _commonRepo.ProcessSelectedBUnits(lstbunitsAllocation, userId, appId, serverUserId);

                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
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
        #endregion

        #endregion

        #region GetSSLConfigDetails
        /// <summary>
        /// Load the Xml File and to get the details(portno,servername,moniker)
        /// </summary>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns>ATPAR_OK on Success, else Error Code</returns>
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> GetSSLConfigDetails()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            SSL_CONFIG_DETAILS obj = new SSL_CONFIG_DETAILS();
            try
            {

                var xmlData = System.Web.Hosting.HostingEnvironment.MapPath("~/webpages.xml");
                XDocument webpages = XDocument.Load(xmlData);
                var webpagesElement = webpages.Descendants("atpar_webservices");
                if (webpagesElement != null)
                {
                    SSL_CONFIG_DETAILS result =
                        (from x in webpagesElement
                         select new SSL_CONFIG_DETAILS
                         {
                             PORT_NO = Convert.ToString(x.Attribute("portno").Value) ?? string.Empty,
                             SERVER_NAME = Convert.ToString(x.Attribute("servername").Value) ?? string.Empty,
                             PROTOCOL = Convert.ToString(x.Attribute("moniker").Value) ?? string.Empty
                         }).FirstOrDefault();
                    response.Data = result;
                }
                if (response.Data != null)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_CONFFILEOPENFALIURE, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_CONFFILEOPENFALIURE);
                return response;
            }
        }
        #endregion

        #region DoAuditData
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="pUserID"></param>
        /// <param name="pAppId"></param>
        /// <param name="pStrFunctionName"></param>
        /// <param name="pListAuditData"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> DoAuditData(string userId, short appId, string functionName, List<VM_MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstAuditData)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            List<MT_ATPAR_AUDIT_SCREEN_CONTROLS> listAuditFields = new List<MT_ATPAR_AUDIT_SCREEN_CONTROLS>();
            string strSearch = string.Empty;
            string strSQL = string.Empty;
            string strOldvalue = string.Empty;
            string strNewvalue = string.Empty;
            string strMode = string.Empty;
            long statusCode = -1;
            List<object> obj = new List<object>();
            Encryption atparEncriptService = new Encryption();

            try
            {
                listAuditFields = _commonRepo.GetAuditFields(appId, functionName);
                string CONST_MENU_CODE = "mt_atpar_configure_system_from_db.aspx";
                if (functionName == CONST_MENU_CODE && listAuditFields.Count > 0)
                {
                    foreach (var listAudititem in listAuditFields)
                    {
                        strSearch = string.Empty;
                        strSearch = "PARAMETER_ID = '" + listAudititem.FIELD_NAME + "'" + " AND TAB_ID = '" + listAudititem.SUBFUNCTION_NAME + "'";

                        if (lstAuditData != null && lstAuditData.Count > 0)
                        {
                            var auditData = lstAuditData.Where(x => x.PARAMETER_ID == listAudititem.FIELD_NAME && x.TAB_ID == listAudititem.SUBFUNCTION_NAME).ToList();

                            if (auditData.Count() == 1)
                            {
                                if (auditData[0].TYPE != null && auditData[0].TYPE == AtParWebEnums.REMOTEDBCONNECTION.PASSWORD.ToString())
                                {
                                    if (!string.IsNullOrEmpty(auditData[0].PARAMETER_VALUE))
                                    {
                                        auditData[0].PARAMETER_VALUE = auditData[0].PARAMETER_VALUE.Replace(' ', '+');
                                        auditData[0].PARAMETER_VALUE = AESEncryptDecryptService.DecryptStringAES(auditData[0].PARAMETER_VALUE);
                                        auditData[0].PARAMETER_VALUE = atparEncriptService.Encrypt(auditData[0].PARAMETER_VALUE);
                                    }
                                }
                                strOldvalue = string.Empty;
                                strNewvalue = string.Empty;
                                strOldvalue = listAudititem.PARAMETER_VALUE;

                                if (auditData[0].PARAMETER_VALUE != null)
                                {
                                    strNewvalue = auditData[0].PARAMETER_VALUE;
                                }

                                if (listAudititem.PARAMETER_VALUE != null)
                                {
                                    strOldvalue = listAudititem.PARAMETER_VALUE;
                                }

                                if (!string.IsNullOrEmpty(strOldvalue) || !string.IsNullOrEmpty(strNewvalue))
                                {
                                    if (strOldvalue != strNewvalue)
                                    {
                                        statusCode = InsertAuditInfo(appId, functionName, listAudititem.SUBFUNCTION_NAME, strSearch, userId, listAudititem.FIELD_NAME, strOldvalue, strNewvalue);

                                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            response.AtParNotOK(statusCode, _commonRepo, _log);
                                            return response;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else
                {
                    if (listAuditFields != null && listAuditFields.Count > 0)
                    {
                        string strSelQuery = string.Empty;
                        string strtablename = string.Empty;
                        string strKeyColumns = string.Empty;
                        string strkeyfield = string.Empty;
                        string strkeyValue = string.Empty;
                        string strAuditField = string.Empty;
                        string strPrevTblName = string.Empty;
                        List<MT_ATPAR_AUDIT_SCREEN_CONTROLS> listKeyFields = new List<MT_ATPAR_AUDIT_SCREEN_CONTROLS>();
                        string[] strKeys;
                        listKeyFields = listAuditFields.Where(x => x.KEY_FLAG == AtParWebEnums.YesNo_Enum.Y.ToString()).ToList();
                        strkeyfield = string.Empty;
                        foreach (var lstKeys in listKeyFields)
                        {
                            if (!string.IsNullOrEmpty(strkeyfield))
                            {
                                strkeyfield = strkeyfield + ("," + lstKeys.FIELD_NAME);
                            }
                            else
                            {
                                strkeyfield = lstKeys.FIELD_NAME;
                            }
                        }
                        if (lstAuditData != null && lstAuditData.Count > 0)
                        {
                            foreach (var auditItem in lstAuditData)
                            {
                                strMode = string.Empty;

                                if (auditItem.RECORD_MODE != null)
                                {
                                    strMode = auditItem.RECORD_MODE;
                                }

                                strKeyColumns = string.Empty;

                                if (strkeyfield.Contains(","))
                                {
                                    strKeys = null;
                                    strKeys = strkeyfield.Split(',');

                                    foreach (string strRowfield in strKeys)
                                    {
                                        strkeyValue = string.Empty;
                                        if (strRowfield == AtParWebEnums.Get_Detail_Defns_Enum.USER_ID.ToString())
                                        {
                                            strkeyValue = userId;
                                        }
                                        else
                                        {
                                            strkeyValue = auditItem.GetType().GetProperty(strRowfield).GetValue(auditItem, null).ToString();
                                        }
                                        if (!string.IsNullOrEmpty(strKeyColumns))
                                        {
                                            strKeyColumns = strKeyColumns + " AND " + strRowfield + "=" + "'" + strkeyValue + "'";
                                        }
                                        else
                                        {
                                            strKeyColumns = strRowfield + "=" + "'" + strkeyValue + "'";
                                        }
                                    }
                                }
                                else
                                {
                                    if (strkeyfield == AtParWebEnums.Get_Detail_Defns_Enum.USER_ID.ToString())
                                    {
                                        strkeyValue = userId;
                                    }
                                    else
                                    {
                                        strkeyValue = auditItem.GetType().GetProperty(strkeyfield).GetValue(auditItem, null).ToString();
                                    }
                                    strKeyColumns = strkeyfield + "=" + "'" + strkeyValue + "'";
                                }
                                List<MT_ATPAR_AUDIT_SCREEN_CONTROLS> listoldValue = listAuditFields.Where(x => x.KEY_FLAG == AtParWebEnums.YesNo_Enum.N.ToString()).ToList();

                                if (listoldValue != null && listoldValue.Count > 0)
                                {
                                    strPrevTblName = String.Empty;
                                    foreach (var olditem in listoldValue)
                                    {
                                        strAuditField = string.Empty;
                                        strNewvalue = string.Empty;
                                        strOldvalue = string.Empty;
                                        strtablename = string.Empty;
                                        strSelQuery = string.Empty;
                                        strAuditField = olditem.FIELD_NAME;
                                        strtablename = olditem.TABLE_NAME;

                                        if (strPrevTblName != strtablename)
                                        {
                                            obj = _commonRepo.GetTableDataDynamic(strtablename, strKeyColumns);
                                        }
                                        if (obj.Count > 0)
                                        {
                                            foreach (var audititem in obj)
                                            {
                                                if (audititem.GetType().GetProperty(strAuditField).ToString() != null)
                                                {
                                                    strOldvalue = audititem.GetType().GetProperty(strAuditField).GetValue(audititem).ToString();
                                                }
                                            }

                                        }
                                        else
                                        {
                                            strOldvalue = string.Empty;
                                        }
                                        if (string.IsNullOrEmpty(strMode))
                                        {
                                            if (strAuditField == "PASSHASH")
                                            {
                                                if (auditItem.GetType().GetProperty(strAuditField) != null)
                                                {
                                                    strNewvalue = auditItem.GetType().GetProperty(strAuditField).GetValue(auditItem).ToString();
                                                }
                                                else
                                                {
                                                    strNewvalue = strOldvalue;
                                                }
                                            }
                                            else if (auditItem.GetType().GetProperty(strAuditField) != null)
                                            {
                                                strNewvalue = (auditItem.GetType().GetProperty(strAuditField).GetValue(auditItem) == null) ? "" : auditItem.GetType().GetProperty(strAuditField).GetValue(auditItem).ToString();
                                            }
                                            else
                                            {
                                                strNewvalue = string.Empty;
                                            }
                                        }
                                        else
                                        {
                                            strNewvalue = string.Empty;
                                        }

                                        if (!string.IsNullOrEmpty(strOldvalue)
                                                        || !string.IsNullOrEmpty(strNewvalue))
                                        {
                                            if (strOldvalue != strNewvalue)
                                            {
                                                statusCode = InsertAuditInfo(appId, functionName, " ", strKeyColumns, userId, strAuditField, strOldvalue, strNewvalue);

                                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                                {
                                                    response.AtParNotOK(statusCode, _commonRepo, _log);
                                                    return response;
                                                }
                                            }
                                        }
                                        strPrevTblName = strtablename;
                                    }
                                }


                            }
                        }
                    }
                    response.AtParSuccess();
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
            return response;
        }

        public long InsertAuditInfo(short appId, string functionName, string subFunctionName, string strkeys, string updateUserId, string fieldName, string oldValue, string newValue)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                _commonRepo.InsertAuditInfo(appId, functionName, subFunctionName, strkeys, updateUserId, fieldName, oldValue, newValue);

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
        }
        #endregion       

        #region GetOrgGroupIDS
        /// <summary>
        /// Getting OrgGroupIds from  MT_ATPAR_ORG_GROUPS
        /// </summary>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetOrgGroupIDS(string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>();

            try
            {
                response.DataList = _commonRepo.GetOrgGroupIDS();
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetOrgBusinessUnits
        public AtParWebApiResponse<string> GetOrgBusinessUnits(string OrgGrpId, int BusinessUnitType, params string[] DeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataList = _commonRepo.GetOrgBusinessUnits(OrgGrpId, BusinessUnitType);

                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, _commonRepo, _log);
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

        public AtParWebApiResponse<string> GetOrgGroupBUnits(string userId, string orgGrpId, string businessUnitType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                if (string.IsNullOrEmpty(orgGrpId))
                    orgGrpId = _commonRepo.GetUserOrgGroupId(userId);

                if (orgGrpId == "All")
                {
                    response.DataList = _commonRepo.GetOrgGroupBUnitsAll(orgGrpId, businessUnitType);
                }
                else
                {
                    List<string> orgGrpIds = _commonRepo.GetUserOrgGroupList(orgGrpId);
                    response.DataList = _commonRepo.GetOrgGroupBUnitsSelected(orgGrpIds, businessUnitType);
                }
                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, _commonRepo, _log);
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

        #region GetOrgBUnits
        /// <summary>
        /// Getting OrgBUnits from MT_ATPAR_ORG_GROUP_BUNITS
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS> GetOrgBUnits(string userID, string orgGrpID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            List<MT_ATPAR_ORG_GROUP_BUNITS> dataList = null;
            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>();

            try
            {
                dataList = _commonRepo.GetOrgBUnits(userID, orgGrpID);

                var lstCarriers = GetOrgBUnitsERPCall(deviceTokenEntry, dataList);
                response.DataList = lstCarriers.Item2;
                response.StatusCode = lstCarriers.Item1;

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Failed in  GetOrgBUnits method: " + response.StatusCode.ToString() + ":"); }

                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Return Org Units : " + response.DataList + ":"); }

                    response.AtParSuccess();
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.StatType = AtParWebEnums.StatusType.Error;
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                response.ExceptionMessage = ex.ToString();
                return response;
            }
        }

        private Tuple<long, dynamic> GetOrgBUnitsERPCall(string[] deviceTokenEntry, List<MT_ATPAR_ORG_GROUP_BUNITS> lstBUnits)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                string _erpObjName = string.Empty;
                string _className = string.Empty;
                string _methodName = string.Empty;
                object _reflectObject = null;
                string _remoteDBType = string.Empty;
                MethodInfo _methodInfo = null;
                object _statusCode;
                string _strInXml = "<ROOT></ROOT>";
                string strOutXml = string.Empty;
                bool _blnErpFlag = false;
                List<MT_ATPAR_ORG_GROUP_BUNITS> lstErpBunits = null;

                GetConfigData();

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                _erpObjName = CONST_ATPAR + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString()
                                                                              && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _remoteDBType = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString())
                                                          .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (_erpObjName != AtParWebEnums.Erp_Obj_Name.Atpar_FileInterface.ToString() && _erpObjName != AtParWebEnums.Erp_Obj_Name.Atpar_XML.ToString() && _erpObjName != AtParWebEnums.Erp_Obj_Name.Atpar_ASCII.ToString() && _erpObjName != AtParWebEnums.Erp_Obj_Name.Atpar_IMMS.ToString())
                {
                    _blnErpFlag = true;

                    if (_remoteDBType == "NONE" || string.IsNullOrEmpty(_remoteDBType))
                    {
                        return new Tuple<long, dynamic>(AtparStatusCodes.E_REMOTEERROR, null);
                    }
                }
                _className = "GetBUnits";
                _methodName = "GetBUnits";

                _methodInfo = Utils.CreateERPObjectInstance(_erpObjName, _className, _methodName, out _reflectObject);

                if (!_blnErpFlag)
                {
                    object[] args = { _strInXml, strOutXml, deviceTokenEntry };
                    _statusCode = _methodInfo.Invoke(_reflectObject, args);
                    strOutXml = args[1].ToString();
                }
                else
                {
                    object[] args = { strOutXml, deviceTokenEntry };
                    _statusCode = _methodInfo.Invoke(_reflectObject, args);
                    strOutXml = args[0].ToString();
                }

                if (!string.IsNullOrEmpty(strOutXml))
                {
                    lstErpBunits = XmlDataRead(strOutXml, lstBUnits, _blnErpFlag);
                    return new Tuple<long, dynamic>(Convert.ToInt32(_statusCode), lstErpBunits);
                }
                else
                {
                    return new Tuple<long, dynamic>(Convert.ToInt32(_statusCode), null);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, dynamic>(AtparStatusCodes.E_XMLSTRINGNOTLOADED, null);
            }
        }


        private List<MT_ATPAR_ORG_GROUP_BUNITS> XmlDataRead(string outXml, List<MT_ATPAR_ORG_GROUP_BUNITS> lstOrgBUnits, bool _blnErpFlag)
        {
            outXml = outXml.Replace("&", "amp;");

            List<MT_ATPAR_ORG_GROUP_BUNITS> lstBUnits = new List<MT_ATPAR_ORG_GROUP_BUNITS>();
            var doc = XDocument.Parse(outXml);
            IEnumerable<XElement> xMembers;

            if (_blnErpFlag == false)
            {
                // xMembers = from members in XElement.Load(doc.ToString()).Elements("/ROOT/HEADER") select members;
                XDocument xmldoc1 = XDocument.Parse(doc.ToString());
                xMembers = xmldoc1.Descendants("HEADER").ToList();
            }
            else
            {
                //xMembers = from members in XElement.Load(doc.ToString()).Elements("~/ROOT/BUSINESS_UNIT/RECORD") select members;
                XDocument xmldoc1 = XDocument.Parse(doc.ToString());
                xMembers = xmldoc1.Descendants("RECORD").ToList();
            }

            foreach (XElement x in xMembers)
            {
                MT_ATPAR_ORG_GROUP_BUNITS item = new MT_ATPAR_ORG_GROUP_BUNITS();
                string formattedString = string.Empty;
                item.BUSINESS_UNIT = ((System.Xml.Linq.XElement)x.FirstNode).Value;
                // item.BUSINESS_UNIT = x.Element("BUNIT").ToString();// a.ToString();//x.Elements().Value.ToString();//x.Element("BUNIT").Value.ToString();
                // item.BU_TYPE = x.Element("BUTYPE").ToString();
                item.BU_TYPE = ((System.Xml.Linq.XElement)x.LastNode).Value;
                item.CHK_VALUE = "0";
                formattedString = ((System.Xml.Linq.XElement)x.FirstNode.NextNode).Value.Replace("amp;", "&");
                // formattedString = x.Element("DESCR").ToString().Replace("amp;", "&");
                item.Description = formattedString;
                lstBUnits.Add(item);
            }

            if (lstOrgBUnits.Count == 0)
            {
                foreach (var data in lstBUnits)
                {
                    data.CHK_VALUE = "0";
                }

            }
            else if (lstOrgBUnits.Count > 0)
            {
                foreach (var xmldata in lstBUnits)
                {
                    foreach (var OrgData in lstOrgBUnits)
                    {
                        if (xmldata.BUSINESS_UNIT == OrgData.BUSINESS_UNIT)
                        {
                            if (xmldata.BU_TYPE == OrgData.BU_TYPE)
                            {
                                xmldata.CHK_VALUE = "1";
                            }
                        }
                    }
                }
            }
            return lstBUnits;
        }
        #endregion

        #region GetAtParVesrions

        List<string> ICommonService.GetAtParVesrions(string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new List<string>();

            try
            {
                response = _commonRepo.GetAtParVersions(deviceTokenEntry);
                //response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                //response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetOrgDetails
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetOrgDetails(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>();

            try
            {
                response.DataList = _commonRepo.GetOrgDetails(userID);

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

        #region GetUserOrgGrpID
        /// <summary>
        /// To get an userOrgGrpID
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_USER_ORG_GROUPS> GetUserOrgGrpID(string userID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string pOrgGroupId = string.Empty;
            var response = new AtParWebApiResponse<MT_ATPAR_USER_ORG_GROUPS>();
            try
            {
                response.DataVariable = _commonRepo.GetUserOrgGrpID(userID);
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

        #region GetAtparLatestValues

        /// <summary>
        /// To Get Atpar Latest Values
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="fieldName"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetAtparLatestValues(int appID, string fieldName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string pOrgGroupId = string.Empty;
            var response = new AtParWebApiResponse<long>();
            try
            {
                response.DataVariable = _commonRepo.GetAtparLatestValues(appID, fieldName);
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

        #region GetLocations
        /// <summary>
        /// Getting Locations
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <param name="status"></param>
        /// <param name="locID"></param>
        /// <param name="locName"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_MT_ATPAR_LOCATIONS> GetLocations(string orgGrpID, string status, string locID, string locName, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_ATPAR_LOCATIONS>();
            long statusCode = -1;
            List<VM_MT_ATPAR_LOCATIONS> lstAtparLocations = new List<VM_MT_ATPAR_LOCATIONS>();
            if (string.IsNullOrEmpty(locName))
            {
                locName = string.Empty;
            }
            else
            {
                locName = AtParExtensions.ReplaceString(locName);
            }
            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var remoteAtparObj = CONST_ATPAR + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (remoteAtparObj.ToUpper() == "ATPAR_PEOPLESOFT")
                {
                    remoteAtparObj = CONST_ATPAR_FILEINTERFACE;
                }

                DataSet inputParameters = new DataSet();
                //DataSet dsLoc = new DataSet();
                DataTable pickHeaderDt = new DataTable();

                pickHeaderDt = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Pick_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                DataRow drHeader = pickHeaderDt.NewRow();

                drHeader[(int)AtParWebEnums.Get_Pick_Header_Enum.BUSINESS_UNIT] = orgGrpID;
                drHeader[(int)AtParWebEnums.Get_Pick_Header_Enum.STATUS] = status;
                drHeader[(int)AtParWebEnums.Get_Pick_Header_Enum.LOCATION] = locID;
                drHeader[(int)AtParWebEnums.Get_Pick_Header_Enum.LOCATIONNAME] = locName;

                pickHeaderDt.Rows.Add(drHeader);
                inputParameters.Tables.Add(pickHeaderDt);

                Tuple<long, DataSet> tupleResult = GetLocationsFromERP(inputParameters, remoteAtparObj, deviceTokenEntry);
                statusCode = tupleResult.Item1;
                DataSet locations = tupleResult.Item2;
                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1}:", methodBaseName, "GetERPBUnits getting failed from ERP")); }

                    if (statusCode == AtparStatusCodes.E_REMOTEERROR)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        return response;
                    }
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Return Locations List : " + response.DataList + ":"); }

                if (locations.Tables[0].Rows.Count > 0)
                {
                    lstAtparLocations =
                    (from dr in locations.Tables[0].AsEnumerable()
                     select new VM_MT_ATPAR_LOCATIONS()
                     {
                         ADDRESS1 = dr["ADDRESS1"].ToString(),
                         ADDRESS_2 = dr["ADDRESS_2"].ToString(),
                         ATTENTION_TO = dr["ATTENTION_TO"].ToString(),
                         CITY = dr["CITY"].ToString(),
                         COMMENTS = dr["COMMENTS"].ToString(),
                         DEPARTMENT_ID = dr["DEPARTMENT_ID"].ToString(),
                         DESCR = dr["DESCR"].ToString(),
                         EMAIL = dr["EMAIL"].ToString(),
                         LOCATION = dr["LOCATION"].ToString(),
                         PHONE_NO = dr["PHONE_NO"].ToString(),
                         SETCNTRLVALUE = dr["SETCNTRLVALUE"].ToString(),
                         STATE = dr["STATE"].ToString(),
                         STATUS = dr["STATUS"].ToString(),
                         STATUS_ACTION = dr["STATUS_ACTION"].ToString(),
                         TYPE = dr["TYPE"].ToString(),
                         ZIP = dr["ZIP"].ToString()
                     }).ToList();
                    response.DataList = lstAtparLocations;
                    response.AtParSuccess();
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                }
                return response;
            }
            /*Utils.ToList<VM_MT_ATPAR_LOCATIONS>(tupleResult.Item2.Tables[0]);*/
            catch (Exception ex)
            {
                response.StatType = AtParWebEnums.StatusType.Error;
                response.ExceptionMessage = ex.ToString();
                return response;
            }
        }

        /// <summary>
        /// ERP Call For GetLocations Method
        /// </summary>
        /// <param name="inputParameters"></param>
        /// <param name="dsLoc"></param>
        /// <param name="remoteAtparObj"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        private Tuple<long, DataSet> GetLocationsFromERP(DataSet inputParameters, string remoteAtparObj, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            DataSet dsLoc = new DataSet();
            Tuple<long, DataSet> tupleOutput = null;

            try
            {
                //GetConfigData();
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                className = "GetLocations";
                methodName = "GetLocations";

                MethodName = Utils.CreateERPObjectInstance(remoteAtparObj, className, methodName, out reflectObject);

                object[] args = { inputParameters, dsLoc, deviceTokenEntry };

                statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ErpGetLocations getting failed from ERP")); }
                    tupleOutput = new Tuple<long, DataSet>(statusCode, null);
                    return tupleOutput;
                }

                dsLoc = (DataSet)args[1];

                //List<VM_MT_ATPAR_LOCATIONS> resultList = Utils.ToList<VM_MT_ATPAR_LOCATIONS>(dsLoc.Tables[0]);

                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, dsLoc);
                return tupleOutput;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }
        }
        #endregion

        #region UpdateLocIDStatus
        /// <summary>
        /// Updating Location ID Status
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <param name="status"></param>
        /// <param name="locID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateLocIDStatus(string orgGrpID, bool status, string locID, string[] deviceTokenEntry)
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

                response.StatusCode = ErpUpdateLocIDStatus(remoteAtparObj, locID, orgGrpID, status, deviceTokenEntry);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1}:", methodBaseName, "GetERPBUnits getting failed from ERP")); }

                    if (response.StatusCode == AtparStatusCodes.E_REMOTEERROR)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        return response;
                    }
                    else
                    {
                        if (response.StatusCode == AtparStatusCodes.CRCT_S_CANNOTINACTIVATE)
                        {
                            response.AtParNotOK(AtparStatusCodes.ATPAR_LOC_CANNOTINACTIVATE, _commonRepo, _log, locID);
                        }
                        else
                        {
                            response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                        }
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

        private long ErpUpdateLocIDStatus(string remoteAtparObj, string locID, string orgGrpID, bool status, string[] deviceTokenEntry)
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
                methodName = "UpdateLocIDStatus";

                MethodName = Utils.CreateERPObjectInstance(remoteAtparObj, className, methodName, out reflectObject);

                object[] args = { locID, orgGrpID, status, deviceTokenEntry };

                statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ErpUpdateLocIDStatus getting failed from ERP")); }

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
        #endregion

        #region GetOrgGroupName
        /// <summary>
        /// Getting Org Group Name 
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> GetOrgGroupName(string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.Data = _commonRepo.GetOrgGroupName(orgGrpID);
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetCartItemsInfo
        public AtParWebApiResponse<long> GetCartItemsInfo(string orgGroupID, string businessUnit, string cartID, string serverUser, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            List<VM_CART_ITEMINFO_HEADER> lstCartHdr = new List<VM_CART_ITEMINFO_HEADER>();
            List<VM_CART_ITEMINFO_DETAILS> lstCartDtls = new List<VM_CART_ITEMINFO_DETAILS>();

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

                lstCartHdr = (from rw in CartItems.Tables[0].AsEnumerable()
                              select new VM_CART_ITEMINFO_HEADER()
                              {
                                  USER_ID = rw[0].ToString(),
                                  BUSINESS_UNIT = rw[1].ToString(),
                                  DESCR = rw[2].ToString(),
                                  SHADOW_FLAG = rw[3].ToString(),
                                  QTY_OPTION = rw[4].ToString(),
                                  DEPT_ID = rw[5].ToString(),
                                  TRANS_ID = rw[6].ToString(),
                                  CART_ID = rw[7].ToString(),
                                  ORG_ID = rw[8].ToString(),
                                  INV_BUSINESS_UNIT = rw[9].ToString(),
                                  YEAR = rw[10].ToString(),
                                  MONTH = rw[11].ToString(),
                                  DAY = rw[12].ToString(),
                                  REQ_NO = rw[13].ToString(),
                              }).ToList();

                lstCartDtls = (from rw in CartItems.Tables[1].AsEnumerable()
                               select new VM_CART_ITEMINFO_DETAILS()
                               {
                                   INV_ITEM_ID = rw[0].ToString(),
                                   COMPARTMENT = rw[1].ToString(),
                                   ITEM_DESCR = rw[2].ToString(),
                                   MFG_ITEM_ID = rw[3].ToString(),
                                   VENDOR_ITEM_ID = rw[4].ToString(),
                                   UPN_ID = rw[5].ToString(),
                                   ITEM_NDC = rw[6].ToString(),
                                   ITEM_GTIN = rw[7].ToString(),
                                   ITEM_PRICE = rw[8].ToString(),
                                   COUNT_ORDER = rw[9].ToString(),
                                   OPTIMAL_QTY = rw[10].ToString(),
                                   FOQ = rw[11].ToString(),
                                   COUNT_REQD = rw[12].ToString(),
                                   CART_REPLEN_CTRL = rw[13].ToString(),
                                   CART_REPLEN_OPT = rw[14].ToString(),
                                   CONS_NON_STOCK = rw[15].ToString(),
                                   INVENTORY_ITEM = rw[16].ToString(),
                                   ORDER_QTY = rw[17].ToString(),
                                   UOM = rw[18].ToString(),
                                   MAX_QTY = rw[19].ToString(),
                                   FILLKILL = rw[20].ToString(),
                                   CUST_ITEM_ID = rw[21].ToString(),
                                   LOT_CONTROLLED = rw[22].ToString(),
                                   SERIAL_CONTROLLED = rw[23].ToString(),
                                   CONV_FACTOR = rw[24].ToString(),
                                   CHARGE_CODE = rw[25].ToString(),
                                   VENDOR_NAME = rw[26].ToString(),
                                   UOM_PROC = rw[27].ToString(),
                                   QTY_OPTION = rw[28].ToString(),
                                   LAST_ORDER_DATE = rw[29].ToString(),
                                   STATUS = rw[30].ToString(),
                                   PACKAGING_STRING = rw[31].ToString(),
                                   MFG_ID = rw[32].ToString(),
                                   CONSIGNMENT_ITEM = rw[33].ToString(),
                                   REPORT_FIELD_1 = rw[34].ToString(),
                                   REPORT_FIELD_2 = rw[35].ToString(),
                                   REPORT_FIELD_3 = rw[36].ToString(),
                                   REPORT_FIELD_4 = rw[37].ToString(),
                                   ITEM_TYPE = rw[38].ToString(),
                                   SUBSTITUTE_ITEM_FLG = rw[39].ToString(),
                                   USER_FIELD_2 = rw[40].ToString(),
                                   IMPLANT_FLAG = rw[41].ToString(),
                                   ITEM_MASTER_ITEM_STATUS = rw[42].ToString(),
                                   NON_CART_ITEM_STATUS = rw[43].ToString(),
                                   BILL_ITEM_STATUS = rw[44].ToString(),
                                   PAR_LOC_STATUS = rw[45].ToString(),
                                   ITEM_MASTER_STATUS = rw[46].ToString(),
                                   ITEM_BU_STATUS = rw[47].ToString(),
                                   INFO_2 = rw[48].ToString(),
                                   INFO_3 = rw[49].ToString(),
                                   ChkValue = AtParWebEnums.YesNo_Enum.N.ToString(),
                                   ChkField = "0",

                               }).ToList();


                // Fetching Critical Items from AtPar Middle tier
                lstCriticalItems = _commonRepo.GetCriticalItems(businessUnit, cartID);

                if (lstCriticalItems != null && lstCriticalItems.Count() > 0)
                {
                    tmpFlag = true;
                }

                int i = 0;
                foreach (var item in lstCartDtls)
                {
                    if (tmpFlag == true)
                    {
                        if (lstCriticalItems.Any(c => c.ITEM_ID == item.INV_ITEM_ID) == true)
                        {
                            item.ChkValue = AtParWebEnums.YesNo_Enum.Y.ToString();
                        }
                        else
                        {
                            item.ChkValue = AtParWebEnums.YesNo_Enum.N.ToString();
                        }
                        i++;
                        item.ChkField = "CB" + i.ToString() + "0";
                    }

                }


                response.DataDictionary = new Dictionary<string, object> { { "listHeaders", lstCartHdr }, { "listDetails", lstCartDtls.OrderBy(x => x.ChkValue).OrderBy(y => y.INV_ITEM_ID) } };
                if (lstCartDtls.Count == 0 || lstCartDtls == null)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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
        #endregion

        #region GetOrgGroupParamValue

        public AtParWebApiResponse<string> GetOrgGroupParamValue(string orgParamName, int appID, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string pOrgGroupId = string.Empty;
            var response = new AtParWebApiResponse<string>();
            try
            {

                if (string.IsNullOrEmpty(appID.ToString()) || string.IsNullOrEmpty(orgParamName) || string.IsNullOrEmpty(orgGroupID))
                {
                    response.AtParNotOK(AtparStatusCodes.E_INVALIDPARAMETER, _commonRepo, _log);
                    return response;
                }

                response.DataVariable = _commonRepo.GetOrgGroupParamValue(orgParamName, appID, orgGroupID);
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

        #region Release Orders

        public AtParWebApiResponse<MT_ATPAR_TRANSACTION> GetReleaseOrders(int appID, string userID, string bUnit,
                string ordNO, string[] deviceTokenEntry, string orgGroupID, string lFlag = "", string transID = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_TRANSACTION>();

            try
            {
                string _OrgGrpID = string.Empty;

                if (string.IsNullOrEmpty(orgGroupID))
                {
                    _OrgGrpID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();
                }
                else
                {
                    _OrgGrpID = orgGroupID;
                }

                if (lFlag == "Y")
                {
                    var StatusCode = _commonRepo.UpdateTransactionStatus(appID, userID, transID);

                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
                }

                Tuple<List<MT_ATPAR_TRANSACTION>, string> tuplereleaseorders = null;
                tuplereleaseorders = _commonRepo.GetReleaseOrdersSP(appID,
                    deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), bUnit, ordNO, _OrgGrpID);

                response.DataList = tuplereleaseorders.Item1;

                if (Convert.ToInt64(tuplereleaseorders.Item2) != AtparStatusCodes.ATPAR_OK)
                {
                    response.StatusCode = AtparStatusCodes.E_SERVERERROR;
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
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

        #region GetEnterpriseSystem
        /// <summary>
        /// To get an enterprise system
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<string> GetEnterpriseSystem()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string strEnterpriseSystem = string.Empty;
            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            var response = new AtParWebApiResponse<string>();
            try
            {

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                strEnterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                response.Data = strEnterpriseSystem;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.StatType = AtParWebEnums.StatusType.Error;
                response.StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                response.ExceptionMessage = ex.ToString();
                return response;
            }

        }

        #endregion

        #region GetBusinessUnits
        /// <summary>
        /// To get Business Units
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="businessUnitType"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> GetBusinessUnits(string userID, string businessUnitType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();
            List<string> orgGroupIDs = new List<string>();
            List<string> lstBusinessUnits = new List<string>();
            string orgValue = string.Empty;
            int count = 0;

            try
            {
                var orgID = _commonRepo.GetOrgGroupId(userID);
                if (orgID != "All")
                {
                    if (!string.IsNullOrEmpty(orgID))
                    {
                        orgGroupIDs = _commonRepo.GetUserOrgGroupList(orgID);
                        if (orgGroupIDs != null && orgGroupIDs.Count > 0)
                        {
                            foreach (var orgGrp in orgGroupIDs)
                            {
                                if (count == 0)
                                {
                                    orgValue = "'" + orgGrp + "'";
                                    count++;
                                }
                                else
                                {
                                    orgValue = orgValue + ",'" + orgGrp + "'";
                                }

                            }
                        }
                    }
                }
                lstBusinessUnits = _commonRepo.GetBusinessUnits(orgID, orgValue, businessUnitType);
                response.DataList = lstBusinessUnits;
                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                throw ex;
            }

        }
        #endregion

        #region CheckUser

        public AtParWebApiResponse<MT_ATPAR_USER> CheckUser(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int cnt = -1;

            var response = new AtParWebApiResponse<MT_ATPAR_USER>();

            try
            {
                cnt = _commonRepo.CheckUser(userID);

                if (cnt > 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_USERALREADYEXISTS, _commonRepo, _log);
                }
                else
                {
                    response.AtParSuccess();
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

        #region GetLdapUsers

        public AtParWebApiResponse<MT_ATPAR_USER> GetLdapUsers(string userID, string strSearchFilter, string strEntryLimit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DirectorySearcher oSearcher = new DirectorySearcher();
            SearchResultCollection oResults = null;
            int mCount;
            string searchFilterValue = string.Empty;

            string protocol = string.Empty;
            string serverName = string.Empty;
            string searchFilter = string.Empty;
            string ldapUserID = string.Empty;
            string ldapUserDN = string.Empty;
            string ldapFirstName = string.Empty;
            string ldapLastName = string.Empty;
            string ldapMInitial = string.Empty;
            string ldapEmailID = string.Empty;
            string ldapMobile = string.Empty;
            string ldapFax = string.Empty;
            string entryLimit = string.Empty;
            string authType = string.Empty;
            string searchScope = string.Empty;
            string baseDn = string.Empty;
            string userName = string.Empty;
            string password = string.Empty;

            if (string.IsNullOrEmpty(strSearchFilter))
            {
                strSearchFilter = string.Empty;
            }

            if (string.IsNullOrEmpty(strEntryLimit))
            {
                strEntryLimit = string.Empty;
            }


            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            var response = new AtParWebApiResponse<MT_ATPAR_USER>();

            try
            {
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.USERID.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.LASTNAME.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.MIDDLEINITIAL.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.EMAILID.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.PHONE.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.FAX.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.ENTRYLIMIT.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.AUTHTYPE.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SEARCHSCOPE.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.BASEDN.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.USERNAME.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.PASSWORD.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                protocol = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                serverName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                searchFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ldapUserID = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.USERID.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ldapFirstName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ldapLastName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.LASTNAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ldapMInitial = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.MIDDLEINITIAL.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ldapEmailID = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.EMAILID.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ldapMobile = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.PHONE.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ldapFax = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.FAX.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                entryLimit = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.ENTRYLIMIT.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                authType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.AUTHTYPE.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                searchScope = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SEARCHSCOPE.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                baseDn = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.BASEDN.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                userName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.USERNAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                password = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.PASSWORD.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (!string.IsNullOrEmpty(password))
                {
                    AtParEncryptionServices.Encryption decryService = new AtParEncryptionServices.Encryption();
                    password = decryService.Decrypt(password);

                }
                if ((protocol == "LDAP") | (protocol == "LDAPS"))
                {
                    protocol = "LDAP";
                }
                if (string.IsNullOrEmpty(protocol) | string.IsNullOrEmpty(serverName) | string.IsNullOrEmpty(searchFilter))
                {
                    response.AtParNotOK(AtparStatusCodes.E_REMOTEERROR, _commonRepo, _log);

                }
                int nEntryLimit = 0;

                if (!string.IsNullOrEmpty(entryLimit))
                {
                    nEntryLimit = Convert.ToInt32(entryLimit);
                }
                else
                {
                    nEntryLimit = Convert.ToInt32(entryLimit);
                }

                int nAuthType = 0;

                switch (authType.ToUpper())
                {
                    case "NONE":
                        nAuthType = Convert.ToInt32(AuthenticationTypes.None);
                        break;

                    case "ANONYMOUS":
                        nAuthType = Convert.ToInt32(AuthenticationTypes.Anonymous);
                        break;

                    case "SECURE":
                        nAuthType = Convert.ToInt32(AuthenticationTypes.Secure);
                        break;

                    case "SECURESOCKETSLAYER":
                        nAuthType = Convert.ToInt32(AuthenticationTypes.SecureSocketsLayer);
                        break;

                    default:

                        nAuthType = Convert.ToInt32(AuthenticationTypes.Anonymous);
                        break;
                }

                int nSearchScope = 0;


                switch (searchScope.ToUpper())
                {
                    case "BASE":
                        nSearchScope = Convert.ToInt32(SearchScope.Base);
                        break;

                    case "ONELEVEL":
                        nSearchScope = Convert.ToInt32(SearchScope.OneLevel);
                        break;

                    case "SUBTREE":
                        nSearchScope = Convert.ToInt32(SearchScope.Subtree);
                        break;

                    default:
                        nSearchScope = Convert.ToInt32(SearchScope.Base);
                        break;
                }
                ArrayList resultFields = new ArrayList();


                if (!string.IsNullOrEmpty(ldapUserID))
                {
                    resultFields.Add(ldapUserID);
                }
                if (!string.IsNullOrEmpty(ldapUserDN))
                {
                    resultFields.Add(ldapUserDN);
                }
                if (!string.IsNullOrEmpty(ldapFirstName))
                {
                    resultFields.Add(ldapFirstName);//NEED to implement CleanString extension
                }
                if (!string.IsNullOrEmpty(ldapLastName))
                {
                    resultFields.Add(ldapLastName);
                }
                if (!string.IsNullOrEmpty(ldapMInitial))
                {
                    resultFields.Add(ldapMInitial);
                }
                if (!string.IsNullOrEmpty(ldapEmailID))
                {
                    resultFields.Add(ldapEmailID);
                }
                if (!string.IsNullOrEmpty(ldapMobile))
                {
                    resultFields.Add(ldapMobile);
                }
                if (!string.IsNullOrEmpty(ldapFax))
                {
                    resultFields.Add(ldapFax);
                }

                string[] strResultsFields = new string[resultFields.ToArray().Length];

                resultFields.CopyTo(strResultsFields, 0);

                string ldapConnectString = protocol + "://" + serverName + (baseDn.Length > 0 ? "/" : "") + baseDn;


                if (!string.IsNullOrEmpty(strSearchFilter))
                {
                    if (strSearchFilter.Contains(","))
                    {
                        strSearchFilter = strSearchFilter.Replace(",", ")(");
                        searchFilterValue = "(&(" + strSearchFilter + ")(" + searchFilter + "))";
                    }
                    else
                    {
                        searchFilterValue = "(&(" + strSearchFilter + ")(" + searchFilter + "))";
                    }
                }
                else
                {
                    searchFilterValue = searchFilter;
                }
                string _str = "URL: " + ldapConnectString + "?(" + searchFilterValue + ")" + " UserDN:" + userName + "Search Scope: " + searchScope + " AuthType: " + authType;

                try
                {

                    oSearcher.SearchRoot = new DirectoryEntry(ldapConnectString, userName, password, (AuthenticationTypes)nAuthType);
                    oSearcher.SizeLimit = nEntryLimit;
                    oSearcher.PropertiesToLoad.AddRange(strResultsFields);
                    oSearcher.Filter = searchFilterValue;
                    oSearcher.SearchScope = (SearchScope)nSearchScope;
                    oResults = oSearcher.FindAll();

                }
                catch (Exception ex)
                {
                    response.AtParException(ex, _commonRepo, _log);
                    return response;
                }

                mCount = oResults.Count;
                string _serverPath = protocol + "://" + serverName + "/";
                MT_ATPAR_USER objUser = null;
                List<MT_ATPAR_USER> lstUsers = new List<MT_ATPAR_USER>();
                if (mCount > 0)
                {
                    foreach (SearchResult oResult in oResults)
                    {
                        objUser = new MT_ATPAR_USER();
                        DirectoryEntry currentEntry = oResult.GetDirectoryEntry();
                        if (currentEntry.Properties[ldapUserID].Value == null)
                        {
                            objUser.USER_ID = string.Empty;
                        }
                        else
                        {
                            objUser.USER_ID = currentEntry.Properties[ldapUserID].Value.ToString();
                        }
                        if (currentEntry.Properties[ldapFirstName].Value == null)
                        {
                            objUser.FIRST_NAME = string.Empty;
                        }
                        else
                        {
                            objUser.FIRST_NAME = currentEntry.Properties[ldapFirstName].Value.ToString();
                        }
                        if (currentEntry.Properties[ldapLastName].Value == null)
                        {
                            objUser.LAST_NAME = string.Empty;
                        }
                        else
                        {
                            objUser.LAST_NAME = currentEntry.Properties[ldapLastName].Value.ToString();
                        }
                        if (currentEntry.Properties[ldapMInitial].Value == null)
                        {
                            objUser.MIDDLE_INITIAL = string.Empty;
                        }
                        else
                        {
                            objUser.MIDDLE_INITIAL = currentEntry.Properties[ldapMInitial].Value.ToString();
                        }
                        if (currentEntry.Properties[ldapEmailID].Value == null)
                        {
                            objUser.EMAIL_ID = string.Empty;
                        }
                        else
                        {
                            objUser.EMAIL_ID = currentEntry.Properties[ldapEmailID].Value.ToString();
                        }
                        if (currentEntry.Properties[ldapMobile].Value == null)
                        {
                            objUser.PHONE1 = string.Empty;
                        }
                        else
                        {
                            objUser.PHONE1 = currentEntry.Properties[ldapMobile].Value.ToString();
                        }
                        if (currentEntry.Properties[ldapFax].Value == null)
                        {
                            objUser.FAX = string.Empty;
                        }
                        else
                        {
                            objUser.FAX = currentEntry.Properties[ldapFax].Value.ToString();
                        }
                        objUser.USERDN = currentEntry.Path.Substring(_serverPath.Length);
                        lstUsers.Add(objUser);

                    }

                }
                if (lstUsers.Count > 0)
                {
                    response.DataList = _commonRepo.GetLdapUsers(lstUsers);
                    if (response.DataList != null && response.DataList.Count > 0)
                    {
                        response.AtParSuccess();
                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.ATPAR_E_USERALREADYEXISTS, _commonRepo, _log);
                    }

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

        #region GetProfileParamValue

        public AtParWebApiResponse<string> GetProfileParamValue(string profileID, int appID, string parameterID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string pOrgGroupId = string.Empty;
            var response = new AtParWebApiResponse<string>();
            try
            {
                response.DataVariable = _commonRepo.GetProfileParamValue(profileID, appID, parameterID);
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

        #region AddUser        
        public AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> AddUser(VM_MT_ATPAR_USER_ADD user)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            AtParWebApiResponse<string> resEnterpriseSystem = GetEnterpriseSystem();
            string strEnterpriseSystem = resEnterpriseSystem.Data;

            var response = new AtParWebApiResponse<VM_MT_ATPAR_USER_ADD>();

            try
            {
                long StatusCode = _commonRepo.AddUser(user, strEnterpriseSystem);

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

        #region GetProfileInfo
        public AtParWebApiResponse<long> GetProfileInfo(string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var enterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                List<MT_ATPAR_APP> lstProfiles = _commonRepo.GetProfile(profileID);

                List<VM_MT_ATPAR_PROFILE_APP_MENUS> lstMenus = _commonRepo.GetProfileAppMenus(profileID, enterpriseSystem);

                List<VM_MT_ATPAR_PROFILE_APP_PARAMETERS> lstParams = _commonRepo.GetProfileAppParameters(profileID, enterpriseSystem);

                List<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY> lstScreenDisplay = _commonRepo.GetProfileScreenDisplay(profileID, enterpriseSystem);

                int clientUserCount = _commonRepo.GetClientUserCount(profileID);

                int serverUserCount = _commonRepo.GetServerUserCount(profileID);

                int profileIDCount = _commonRepo.GetProfileIdCount(profileID);

                response.DataDictionary = new Dictionary<string, object> { { "listProfiles", lstProfiles }, { "listMenus", lstMenus }, { "listParams", lstParams }, { "listScreenDisplay", lstScreenDisplay }, { "clientUserCount", clientUserCount }, { "serverUserCount", serverUserCount }, { "profileIDCount", profileIDCount } };

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_NORECORDFOUND);
                return response;
            }
        }

        #endregion

        public AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS> GetOrgGroupBusinessUnits(string orgGroupID = "", string inventoryType = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>();
            try
            {
                response.DataList = _commonRepo.GetBusinessUnits();
                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }



        #region GetLocByOrgId
        public AtParWebApiResponse<PAR_MNGT_PAR_LOC_HEADER> GetLocByOrgId(string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<PAR_MNGT_PAR_LOC_HEADER>();

            try
            {
                response.DataList = _commonRepo.GetLocByOrgId(orgID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region GetOrgIds
        public AtParWebApiResponse<string> GetOrgIds(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataList = _commonRepo.GetOrgIds(userID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetDepartment
        /// <summary>
        /// GetDepartment
        /// </summary>
        /// <param name="departmentID"></param>
        /// <param name="deptDescr"></param>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>

        public AtParWebApiResponse<MT_POU_DEPT> GetDepartment(string departmentID, string deptDescr, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            if (departmentID == null)
            {
                departmentID = string.Empty;
            }
            if (deptDescr == null)
            {
                deptDescr = string.Empty;
            }
            if (orgGrpID == null)
            {
                orgGrpID = string.Empty;
            }
            var response = new AtParWebApiResponse<MT_POU_DEPT>();
            try
            {
                response.DataList = _commonRepo.GetDepartment(departmentID, deptDescr, orgGrpID);
                if (response.DataList.Count > 0)
                {
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




        #region GetUserDepartments
        public AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS> GetUserDepartments(string userID, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS>();

            try
            {
                response.DataList = _commonRepo.GetUserDepartments(userID, orgGrpID);

                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetPhysiciansByPrefOrProc

        public AtParWebApiResponse<VM_POU_PHYSICIANS_BY_PREF_OR_PROC> GetPhysiciansByPrefOrProc(int flag)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_POU_PHYSICIANS_BY_PREF_OR_PROC>();
            try
            {
                response.DataList = _commonRepo.GetPhysiciansByPrefOrProc(flag);
                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }
        #endregion

        #region GetServerIP
        /// <summary>
        /// this method is for getting current server IP Address
        /// </summary>
        /// <returns>server IP Address</returns>
        public AtParWebApiResponse<string> GetServerIP()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<string>();

            try
            {
                string strLocalHost = null;
                strLocalHost = Dns.GetHostName();
                System.Net.IPAddress strIPAddress = default(System.Net.IPAddress);
                var _with1 = System.Net.Dns.GetHostByName(strLocalHost);
                strIPAddress = new System.Net.IPAddress(_with1.AddressList[0].Address);
                response.DataVariable = strIPAddress.ToString();
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetNiceLabelsPrintersData
        public AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES> GetNiceLabelsPrintersData(int appID, string status, string printerType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES>();
            try
            {
                Tuple<List<MT_ATPAR_SETUP_PRO_PRINTERES>, long> tpleResult = _commonRepo.GetNiceLabelsPrintersData(appID, status, printerType);

                response.DataList = tpleResult.Item1;

                if (tpleResult.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    response.StatusCode = AtparStatusCodes.E_SERVERERROR;
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
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

        #region GetPhysicians
        public AtParWebApiResponse<MT_POU_PHYSICIAN> GetPhysicians()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_PHYSICIAN>();

            try
            {
                response.DataList = _commonRepo.GetPhysicians();
                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetPrefList
        public AtParWebApiResponse<MT_POU_PREF_LIST_HEADER> GetPrefList(string id, string descr, string deptID, string procCode, string physicians, int statusFlag = 0)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_PREF_LIST_HEADER>();
            try
            {
                id = id.ReplaceNullwithEmpty();
                descr = descr.ReplaceNullwithEmpty();
                deptID = deptID.ReplaceNullwithEmpty();
                procCode = procCode.ReplaceNullwithEmpty();
                physicians = physicians.ReplaceNullwithEmpty();

                response.DataList = _commonRepo.GetPrefList(id, descr, deptID, procCode, physicians, statusFlag);
                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetCodes
        public AtParWebApiResponse<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES> GetCodes(string codeType, string code, string descr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES>();
            try
            {
                codeType = codeType.ReplaceNullwithEmpty();
                code = code.ReplaceNullwithEmpty();
                descr = descr.ReplaceNullwithEmpty();
                code = code.substituteString();
                descr = descr.substituteString();
                response.DataList = _commonRepo.GetCodes(codeType, code, descr);

                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region UpdateOrderDetails
        public AtParWebApiResponse<long> UpdateOrderDetails(List<VM_POU_ORDER_DETAILS> lstOrderDetails, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _commonRepo.UpdateOrderDetails(lstOrderDetails);

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

        #region GetItems

        /// <summary>
        /// To Get items
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgId"></param>
        /// <param name="AppID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItems(string ItemID, string OrgId, string AppID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM>();

            try
            {
                response.DataList = _commonRepo.GetItems(ItemID, OrgId, AppID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        #region GetCostCenterOrgIds

        public AtParWebApiResponse<string> GetCostCenterOrgIds(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataList = _commonRepo.GetCostCenterOrgIds(userID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        #region GetAtparVendors
        public AtParWebApiResponse<PAR_MNGT_VENDOR> GetAtparVendors(string strOrgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_VENDOR>();

            try
            {

                response.DataList = _commonRepo.GetAtparVendors(strOrgGrpID);

                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region UpdateDepts
        public AtParWebApiResponse<long> InsertPouDept(List<MT_POU_DEPT> lstDept)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            try
            {
                response.StatusCode = _commonRepo.InsertPouDept(lstDept);

                //  if(response.StatusCode== AtparStatusCodes.ATPAR_E_ALREADY_EXISTS)
                //{
                //    response.AtParNotOK(AtparStatusCodes.ATPAR_E_ALREADY_EXISTS, _commonRepo, _log);
                //    return response;
                //}
                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }

        public AtParWebApiResponse<long> UpdatePouDept(List<MT_POU_DEPT> lstDept, int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            try
            {
                response.StatusCode = _commonRepo.UpdatePouDept(lstDept, appID);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }
        #endregion

        #region ProcessBillingData
        public DataTable ProcessBillingData(DataSet billingDS, string systemID, string orgGroupID = "")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataTable functionReturnValue = null;

            long statusCode = 0;
            string strHL7MsgOrFile = string.Empty;
            string strFHS = string.Empty;
            string strBHS = string.Empty;
            string strMSH = string.Empty;
            string strEVN = string.Empty;
            string strPID = string.Empty;
            string strFT1 = string.Empty;
            int ir = 0;
            string strBilling = string.Empty;
            string strZFTSegment = string.Empty;
            bool isSameTransaction = false;
            DataRow[] selRows = null;
            DataRow[] selDtlsRows = null;
            string strSearch = string.Empty;
            string transactionId = string.Empty;
            AtPar_BusinessRules.AtPar_Billing_SocketManagement objAtparBr = new AtPar_BusinessRules.AtPar_Billing_SocketManagement();
            string strFT = string.Empty;
            int irFT1 = 0;
            string str_CARTS_MNGD_ATPAR = string.Empty;
            string strPath = string.Empty;
            DataRow row = null;
            IOrderedEnumerable<XmlNode> xmlNodeList;
            IOrderedEnumerable<XmlNode> xmlNodeListforZFT = null;
            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            StringBuilder sbbillmessage = new StringBuilder();
            string strBillingMsg = string.Empty;

            string strBillingMsgForMultiple = string.Empty;
            string strBillingSendAddress = string.Empty;
            string strBillingThrsdValue = string.Empty;
            string strMsgRecvApplication = string.Empty;
            string strMsgRecvFacility = string.Empty;
            string strMessageSendingFacility = string.Empty;
            string strMessageDate = string.Empty;
            int irBillingPort = 0;
            Tuple<StringBuilder, long> tupleInput = null;
            Socket m_mainSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

            //  string strBillingUploadPath = GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.ERP_SYS_DETAILS), ERP_SYS_DETAILS.UPLOADFILEPATH.ToString);
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            List<string> lstParameters = new List<string>();
            lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADFILEPATH.ToString());
            lstParameters.Add(AtParWebEnums.HL7.BILLING_MSG_BY_TRANSACTION.ToString());

            lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


            string strBillingUploadPath = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                          x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADFILEPATH.ToString())
                                                          .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
            string str_HL7_BILLING_MESG = billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.HL7_BILLING_MESG].ToString();
            //  string _str_BILLING_MSG_BY_TRANSACTION = GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.HL7), HL7.BILLING_MSG_BY_TRANSACTION.ToString);
            string str_BILLING_MSG_BY_TRANSACTION = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.HL7.ToString() &&
                                                          x.PARAMETER_ID == AtParWebEnums.HL7.BILLING_MSG_BY_TRANSACTION.ToString())
                                                          .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

            if (billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR] != null)
            {
                str_CARTS_MNGD_ATPAR = billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR].ToString();
            }

            if (billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS] != null)
            {
                if (!string.IsNullOrEmpty(billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS].ToString()))
                {
                    strBillingSendAddress = billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS].ToString();
                }
            }

            if (billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT] != null)
            {
                if (!string.IsNullOrEmpty(billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT].ToString()))
                {
                    irBillingPort = Convert.ToInt32(billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT].ToString());
                }
            }


            if (billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE] != null)
            {
                if (!string.IsNullOrEmpty(billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE].ToString()))
                {
                    strBillingThrsdValue = billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE].ToString();
                }
            }

            if (billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION] != null)
            {
                if (!string.IsNullOrEmpty(billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION].ToString()))
                {
                    strMsgRecvApplication = billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION].ToString();
                }
            }

            if (billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY] != null)
            {
                if (!string.IsNullOrEmpty(billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY].ToString()))
                {
                    strMsgRecvFacility = billingDS.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY].ToString();
                }
            }

            DataTable dtItems = new DataTable();
            dtItems = new DataTable("SENT_ITEMS");
            dtItems.Columns.Add("TRANSACTION_ID");
            dtItems.Columns.Add("LINE_NO");
            dtItems.Columns.Add("ITEM_ID");
            dtItems.Columns.Add("BILL_QTY");
            dtItems.Columns.Add("SENT_STATUS");
            dtItems.Columns.Add("DEPARTMENT_ID");
            dtItems.Columns.Add("E_MAIL");

            Tuple<long, XmlDocument> inputTuple = LoadBillingMessageRulesFile();
            xmlDoc = inputTuple.Item2;
            statusCode = inputTuple.Item1;
            if (statusCode != AtparStatusCodes.ATPAR_OK)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to Load BillingMessage Rules file :" + statusCode + ": Invalid BillingMessage outbound Rules File");
                return functionReturnValue;

            }

            if (billingDS.Tables.Count > 0)
            {
                if (billingDS.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                {
                    if (billingDS.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.ORG_ID] != null)
                    {
                        strMessageSendingFacility = billingDS.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.ORG_ID].ToString();
                    }
                    if (billingDS.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.SERVICE_DATE] != null)
                    {
                        strMessageDate = billingDS.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.SERVICE_DATE].ToString();
                    }
                }
            }
            ///''''''''  As of Now FHS,BHS segments are not using so removed the code   

            try
            {

                if (str_HL7_BILLING_MESG == "Y")
                {

                    try
                    {
                        m_mainSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                        if (!string.IsNullOrEmpty(orgGroupID) & !string.IsNullOrEmpty(strBillingSendAddress) & !string.IsNullOrEmpty(irBillingPort.ToString()) & !string.IsNullOrEmpty(strBillingThrsdValue))
                        {
                            statusCode = objAtparBr.SocketAddress_Connection(m_mainSocket, systemID, strBillingSendAddress, irBillingPort, strBillingThrsdValue);
                        }
                        else
                        {
                            statusCode = objAtparBr.SocketAddress_Connection(m_mainSocket, systemID);
                        }

                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + ":Failed to begin the connection : " + statusCode);
                            return dtItems;
                        }
                    }
                    catch (Exception ex)
                    {
                        return dtItems;
                    }
                }

                isSameTransaction = false;

                for (ir = 0; ir <= billingDS.Tables[0].Rows.Count - 1; ir++)
                {
                    if (transactionId == billingDS.Tables[0].Rows[ir][(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.TRANSACTION_ID].ToString())
                    {
                        isSameTransaction = true;
                        transactionId = billingDS.Tables[0].Rows[ir][(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.TRANSACTION_ID].ToString();
                    }
                    else
                    {
                        transactionId = billingDS.Tables[0].Rows[ir][(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.TRANSACTION_ID].ToString();
                        isSameTransaction = false;
                    }

                    if (isSameTransaction == false)
                    {
                        selRows = billingDS.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Select("[" + (int)AtParWebEnums.Send_Charge_Capture_Header_Enum.TRANSACTION_ID + "] = '" + transactionId + "'");

                        if (selRows.Length > 0)
                        {
                            strBilling = string.Empty;
                            string _strBuildFT1 = string.Empty;
                            strZFTSegment = string.Empty;
                            strBillingMsg = string.Empty;

                            if (_log.IsDebugEnabled)
                                _log.Debug(":Search row count :" + selRows.Length);

                            //Building MSH Segment
                            try
                            {
                                sbbillmessage = new StringBuilder();
                                xmlNodeList = xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='MSH']").Cast<XmlNode>().OrderBy(node => Convert.ToInt32(node.Attributes["field_no"].Value));

                                tupleInput = BuildSegmantFormatForBilling(xmlNodeList, selRows, row, systemID);
                                sbbillmessage = tupleInput.Item1;
                                statusCode = tupleInput.Item2;
                                strBilling = strBilling + sbbillmessage.ToString() + (char)13;

                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + ":Failed in Build MSH Segment with  StatusCode :" + statusCode);
                                    return dtItems;
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "Failed to build MSH Segment" + ex.ToString());
                                return dtItems;
                            }

                            //Building EventType
                            try
                            {
                                sbbillmessage = new StringBuilder();
                                xmlNodeList = xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='EVN']").Cast<XmlNode>().OrderBy(node => Convert.ToInt32(node.Attributes["field_no"].Value));
                                tupleInput = BuildSegmantFormatForBilling(xmlNodeList, selRows, row, systemID);
                                sbbillmessage = tupleInput.Item1;
                                statusCode = tupleInput.Item2;
                                strBilling = strBilling + sbbillmessage.ToString() + (char)13;

                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + ":Failed in Build EVN Segment with  StatusCode :" + statusCode);
                                    return dtItems;
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "Failed to build Event Segment" + ex.ToString());
                                return dtItems;
                            }
                            //Buiilding PID Segment

                            try
                            {
                                sbbillmessage = new StringBuilder();
                                xmlNodeList = xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='PID']").Cast<XmlNode>().OrderBy(node => Convert.ToInt32(node.Attributes["field_no"].Value));
                                tupleInput = BuildSegmantFormatForBilling(xmlNodeList, selRows, row, systemID);
                                sbbillmessage = tupleInput.Item1;
                                statusCode = tupleInput.Item2;
                                strBilling = strBilling + sbbillmessage.ToString() + (char)13;

                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + ":Failed in Build PID Segment with  StatusCode :" + statusCode);
                                    return dtItems;
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "Failed to build PID Segment" + ex.ToString());
                                return dtItems;
                            }


                            irFT1 = 1;
                            xmlNodeList = xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='FT1']").Cast<XmlNode>().OrderBy(node => Convert.ToInt32(node.Attributes["field_no"].Value));
                            xmlNodeListforZFT = xmlDoc.DocumentElement.SelectNodes("//BILLING_MESSAGE_DATA/field[@segment='ZFT']").Cast<XmlNode>().OrderBy(node => Convert.ToInt32(node.Attributes["field_no"].Value));
                            selDtlsRows = billingDS.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Select("[" + (int)AtParWebEnums.Send_Charge_Capture_Details_Enum.CHARGE_CAPTURE_ID + "] = '" + transactionId + "'");
                            strBillingMsgForMultiple = string.Empty;
                            string _strSentstatus = string.Empty;
                            for (int intcnt = 0; intcnt <= selDtlsRows.Length - 1; intcnt++)
                            {
                                //Buiilding FT1 Segment and ZFT segment(Additional items of financial transactions)  for each row and sending to clinical system
                                try
                                {
                                    sbbillmessage = new StringBuilder();
                                    _strBuildFT1 = string.Empty;

                                    tupleInput = BuildSegmantFormatForBilling(xmlNodeList, selRows, selDtlsRows[intcnt], systemID, intcnt + 1);
                                    sbbillmessage = tupleInput.Item1;
                                    statusCode = tupleInput.Item2;
                                    _strBuildFT1 = sbbillmessage.ToString();

                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal("Exception Thrown in " + methodBaseName + " is.. " + ex.ToString());
                                    return dtItems;
                                }

                                if (xmlNodeListforZFT.Count() > 0)
                                {
                                    //Buiilding ZFT Segment
                                    try
                                    {
                                        strZFTSegment = string.Empty;
                                        sbbillmessage = new StringBuilder();
                                        tupleInput = BuildSegmantFormatForBilling(xmlNodeListforZFT, selRows, selDtlsRows[intcnt], systemID);
                                        sbbillmessage = tupleInput.Item1;
                                        statusCode = tupleInput.Item2;
                                        strZFTSegment = sbbillmessage.ToString();

                                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + ":Failed in Build ZFT Segment with  StatusCode :" + statusCode);
                                            return dtItems;
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + "Failed to build ZFT Segment" + ex.ToString());
                                        return dtItems;
                                    }
                                }


                                try
                                {
                                    if (str_HL7_BILLING_MESG == AtParWebEnums.YesNo_Enum.Y.ToString())
                                    {
                                        if (Convert.ToBoolean(str_BILLING_MSG_BY_TRANSACTION))
                                        {
                                            if (intcnt == 0)
                                            {
                                                strBillingMsg = (char)11 + strBilling + _strBuildFT1;

                                            }
                                            else
                                            {
                                                strBillingMsg = strBillingMsg + (char)13 + _strBuildFT1;
                                            }

                                            if (intcnt == selDtlsRows.Length - 1)
                                            {
                                                if (!string.IsNullOrEmpty(strZFTSegment))
                                                {
                                                    strBillingMsg = strBillingMsg + (char)13 + strZFTSegment;
                                                }
                                                if (_log.IsDebugEnabled)
                                                    _log.Debug(methodBaseName + " Final Billing Message sending to clinical system by TransID : " + strBillingMsg);
                                                //_StatusCode = objAtparBr.BillingMessage(selDtlsRows(intcnt), _strBillingMsg, _strSentstatus, strBillingUploadPath, transactionId, intcnt, m_mainSocket)
                                                _strSentstatus = BillingMessage(strBillingMsg + (char)13 + (char)28 + (char)13, m_mainSocket);
                                                for (int intcnt1 = 0; intcnt1 <= selDtlsRows.Length - 1; intcnt1++)
                                                {
                                                    DataRow _drow = selDtlsRows[intcnt1];

                                                    if (selDtlsRows.Length > 0)
                                                    {
                                                        dtItems = GenerateBillingMessageFile(_drow, _strSentstatus, irFT1, billingDS, strBillingMsg + (char)13 + (char)28 + (char)13, transactionId, strBillingUploadPath, str_BILLING_MSG_BY_TRANSACTION, dtItems);
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            strBillingMsg = string.Empty;
                                            strBillingMsg = (char)11 + strBilling + _strBuildFT1;
                                            //& Chr(13) & strZFTSegment & Chr(13) & Chr(28) & Chr(13)
                                            if (!string.IsNullOrEmpty(strZFTSegment))
                                            {
                                                strBillingMsg = strBillingMsg + (char)13 + strZFTSegment;
                                            }

                                            if (_log.IsDebugEnabled)
                                                _log.Debug(methodBaseName + " Final Billing Message sending to clinical system : " + strBillingMsg);
                                            //_StatusCode = objAtparBr.BillingMessage(selDtlsRows(intcnt), _strBillingMsg, _strSentstatus, strBillingUploadPath, transactionId, intcnt, m_mainSocket)
                                            _strSentstatus = BillingMessage(strBillingMsg + (char)13 + (char)28 + (char)13, m_mainSocket);
                                            dtItems = GenerateBillingMessageFile(selDtlsRows[intcnt], _strSentstatus, intcnt, billingDS, strBillingMsg + (char)13 + (char)28 + (char)13, transactionId, strBillingUploadPath, str_BILLING_MSG_BY_TRANSACTION, dtItems);
                                        }
                                        //_strBillingMsg = String.Empty
                                        //_strBillingMsg = Chr(11) & strBilling & _strBuildFT1 & Chr(13) & strZFTSegment & Chr(13) & Chr(28) & Chr(13)

                                        //If log.IsDebugEnabled Then log.Debug(methodBaseName & " Final Billing Message sending to clinical system : " & _strBillingMsg)

                                        //'_StatusCode = objAtparBr.BillingMessage(selDtlsRows(intcnt), _strBillingMsg, _dtItems, strBillingUploadPath, transactionId, intcnt, m_mainSocket)
                                        //_StatusCode = objAtparBr.BillingMessage(_strBillingMsg, _strSentstatus, m_mainSocket)
                                        //If _str_HL7_BILLING_MESG = YesNo_Enum.Y.ToString Then
                                    }
                                    else
                                    {

                                        string _strFilePrimaryName = string.Empty;
                                        strPath = AtParWebEnums.Billing_Files_Folder.Billing.ToString() + "\\";
                                        _strFilePrimaryName = strBillingUploadPath + strPath + transactionId;

                                        if (intcnt == 0)
                                        {
                                            //_strBuildFT1 = _strBuildFT1 & Chr(13) & strZFTSegment & Chr(13) & _sbbillmessage.ToString
                                            strBillingMsg = (char)11 + strBilling + _strBuildFT1;
                                            //& Chr(13) & strZFTSegment
                                            if (!string.IsNullOrEmpty(strZFTSegment))
                                            {
                                                strBillingMsg = strBillingMsg + (char)13 + strZFTSegment;
                                            }

                                        }
                                        else
                                        {
                                            strBillingMsg = strBillingMsg + (char)13 + _strBuildFT1;
                                            //& Chr(13) & strZFTSegment
                                            if (!string.IsNullOrEmpty(strZFTSegment))
                                            {
                                                strBillingMsg = strBillingMsg + (char)13 + strZFTSegment;
                                            }
                                        }

                                        if (_log.IsDebugEnabled)
                                            _log.Debug(methodBaseName + "Billing message writing to a file" + strBillingMsg);

                                        try
                                        {
                                            statusCode = FileStreamWriter(_strFilePrimaryName, irFT1, strBillingMsg + (char)13 + (char)28 + (char)13);
                                        }
                                        catch (Exception ex)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + ":Failed to stream line the billing data" + ex.ToString());
                                        }

                                        DataRow drow = selDtlsRows[intcnt];

                                        if (selDtlsRows.Length > 0)
                                        {
                                            DataRow dtRow = dtItems.NewRow();

                                            dtRow["TRANSACTION_ID"] = drow[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_ID];
                                            dtRow["ITEM_ID"] = drow[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_ID];

                                            if (billingDS.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.LINE_NO] != null)
                                            {
                                                dtRow["LINE_NO"] = drow[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.LINE_NO];
                                            }

                                            if (statusCode != AtparStatusCodes.ATPAR_OK)
                                            {
                                                dtRow["SENT_STATUS"] = "N";
                                                dtRow["BILL_QTY"] = 0;
                                            }
                                            else if (statusCode == AtparStatusCodes.ATPAR_OK)
                                            {
                                                dtRow["SENT_STATUS"] = "Y";
                                                dtRow["BILL_QTY"] = drow[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_COUNT];
                                            }

                                            if (billingDS.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Send_Charge_Capture_Details_Enum.DEPARTMENT_ID.ToString()))
                                            {
                                                dtRow["DEPARTMENT_ID"] = drow[AtParWebEnums.Send_Charge_Capture_Details_Enum.DEPARTMENT_ID.ToString()];
                                            }

                                            if (billingDS.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Send_Charge_Capture_Details_Enum.E_MAIL.ToString()))
                                            {
                                                dtRow["E_MAIL"] = drow[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.E_MAIL];
                                            }

                                            dtItems.Rows.Add(dtRow);
                                        }
                                    }
                                    //If _str_HL7_BILLING_MESG = YesNo_Enum.Y.ToString Then

                                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                                    {
                                        if (_log.IsWarnEnabled)
                                            _log.Warn(methodBaseName + ":Failed to fetch the data with the status code : " + statusCode);
                                        return dtItems;
                                    }

                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal("Exception Thrown in " + methodBaseName + " is.. " + ex.ToString());
                                    return dtItems;
                                }
                            }

                        }
                    }
                }
                DataSet DS = new DataSet();
                DS = new DataSet();
                DS.Tables.Add(dtItems);
                return dtItems;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed to process billing data" + ex.ToString());
            }
            finally
            {
                if ((objAtparBr != null))
                {
                    objAtparBr = null;
                }
                if ((m_mainSocket != null))
                {
                    m_mainSocket.Close();
                }
            }

            return dtItems;
        }

        private Tuple<long, XmlDocument> LoadBillingMessageRulesFile()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strXmlFilePath = string.Empty;
            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            XmlNodeList _xmlNodeList;
            Tuple<long, XmlDocument> output = null;
            try
            {
                //_strXmlFilePath = AppDomain.CurrentDomain.BaseDirectory + "BillingMessage_Outbound_Rules.xml";
                _strXmlFilePath = "C:\\AtPar\\bin\\BillingMessage_Outbound_Rules.xml";
                // checks whether the Outbound rules xml file exists
                if (!System.IO.File.Exists(_strXmlFilePath))
                {
                    output = new Tuple<long, XmlDocument>(AtparStatusCodes.E_SERVERERROR, null);
                    return output;
                }
                else
                {
                    xmlDoc.Load(_strXmlFilePath);

                }
                // gets the nodes list
                _xmlNodeList = xmlDoc.SelectNodes("//BILLING_MESSAGE_DATA/field");

                if (!(_xmlNodeList.Count > 0))
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + " Malformed XML <BILLING_MESSAGE_DATA/field> node does not exist in" + " the Rules file");
                    output = new Tuple<long, XmlDocument>(AtparStatusCodes.E_SERVERERROR, null);
                    return output;
                }
                output = new Tuple<long, XmlDocument>(AtparStatusCodes.ATPAR_OK, xmlDoc);
                return output;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to load the Family Rules XML with the exception : " + ex.ToString());
                output = new Tuple<long, XmlDocument>(AtparStatusCodes.E_SERVERERROR, null);
                return output;
            }

        }

        public Tuple<StringBuilder, long> BuildSegmantFormatForBilling(IOrderedEnumerable<XmlNode> xmlNodelist, DataRow[] headerRows, DataRow detailsRow, string systemID = "none", int counter = 0)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strXmlValueType = string.Empty;
            string strXmlValue = string.Empty;
            string strResultValue = string.Empty;
            string strXmldatatype = string.Empty;
            string strXmlFieldName = string.Empty;
            string strXmldateformat = string.Empty;
            string strXmlSegmentValue = string.Empty;
            string strXmlField_Number = string.Empty;
            string strMsgEncodingChars = string.Empty;
            string strMsgFieldSeperator = string.Empty;
            string strDefValue = string.Empty;
            string strBillingSendAddress = string.Empty;
            string strMsgRecvFacility = string.Empty;
            string strMsgRecvApplication = string.Empty;
            string strBillingThrsdValue = string.Empty;
            int irBillingPort = 0;
            strMsgFieldSeperator = "|";
            strMsgEncodingChars = "^~\\&";
            Tuple<StringBuilder, long> tupleOutput = null;
            StringBuilder sbformat = new StringBuilder();

            try
            {
                if (xmlNodelist.Count() > 0)
                {
                    for (int intNodeCnt = 0; intNodeCnt < xmlNodelist.Count(); intNodeCnt++)
                    {
                        XmlNode xmlnode = xmlNodelist.ElementAt(intNodeCnt);

                        if (xmlnode.Attributes.Count > 0)
                        {
                            strResultValue = string.Empty;
                            if (intNodeCnt == 0)
                            {
                                XmlNode xmlnode1 = xmlNodelist.ElementAt(0);
                                if (xmlnode1.Attributes["segment"].Value == "MSH" | xmlnode1.Attributes["segment"].Value == "FHS" | xmlnode1.Attributes["segment"].Value == "BHS")
                                {
                                    sbformat.Append(xmlnode1.Attributes["segment"].Value);
                                }
                                else
                                {
                                    sbformat.Append(xmlnode1.Attributes["segment"].Value);
                                    sbformat.Append(strMsgFieldSeperator);
                                }

                            }
                            strXmlSegmentValue = xmlnode.Attributes["segment"].Value;

                            strXmlValueType = xmlnode.Attributes["value_type"].Value;

                            strXmlValue = xmlnode.Attributes["value"].Value;

                            strXmlField_Number = xmlnode.Attributes["field_no"].Value;

                            strXmldatatype = xmlnode.Attributes["data_type"].Value;

                            strXmlFieldName = xmlnode.Attributes["name"].Value;

                            if (string.IsNullOrEmpty(strXmlValueType) | string.IsNullOrEmpty(strXmldatatype) | string.IsNullOrEmpty(strXmlFieldName))
                            {
                                tupleOutput = new Tuple<StringBuilder, long>(null, AtparStatusCodes.E_SERVERERROR);
                                return tupleOutput;
                            }
                            try
                            {
                                strDefValue = xmlnode.Attributes["default_value"].Value;
                            }
                            catch (Exception ex)
                            {
                                strDefValue = string.Empty;
                                // TODO need to see if there is a better way to avoid exceptions if the default_value attribute is not present
                            }

                            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                            List<string> lstParameters = new List<string>();
                            lstParameters.Add(AtParWebEnums.CONFIGFILE.HL7.ToString());
                            switch (strXmlValueType)
                            {
                                // case AtParWebEnums.VALUETYPES.ATPAR_CONDITION.ToString():
                                case "ATPAR_CONDITION":
                                    switch (strXmlFieldName)
                                    {
                                        case "SENDING_APPLICATION":
                                            //pSbformat.Append(GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.HL7), HL7.SENDING_APPLICATION.ToString));
                                            sbformat.Append(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.HL7.ToString() &&
                                                x.PARAMETER_ID == AtParWebEnums.HL7.SENDING_APPLICATION.ToString())
                                                .Select(x => x.PARAMETER_VALUE).FirstOrDefault());
                                            break;
                                        case "SENDING_FACILITY":
                                            // pSbformat.Append(GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.HL7), HL7.SENDING_FACILITY.ToString));
                                            sbformat.Append(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.HL7.ToString() &&
                                               x.PARAMETER_ID == AtParWebEnums.HL7.SENDING_FACILITY.ToString())
                                               .Select(x => x.PARAMETER_VALUE).FirstOrDefault());
                                            break;
                                        case "RECEIVING_APPLICATION":
                                            if (!string.IsNullOrEmpty(strBillingSendAddress) & !string.IsNullOrEmpty(irBillingPort.ToString()) & !string.IsNullOrEmpty(strBillingThrsdValue) & !string.IsNullOrEmpty(strMsgRecvApplication))
                                            {
                                                sbformat.Append(strMsgRecvApplication.ToString());
                                            }
                                            else
                                            {
                                                // pSbformat.Append(GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.HL7), HL7.RECEIVING_APPLICATION.ToString));
                                                sbformat.Append(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.HL7.ToString() &&
                                               x.PARAMETER_ID == AtParWebEnums.HL7.RECEIVING_APPLICATION.ToString())
                                               .Select(x => x.PARAMETER_VALUE).FirstOrDefault());

                                            }
                                            break;
                                        case "RECEIVING_FACILITY":
                                            if (!string.IsNullOrEmpty(strBillingSendAddress) & !string.IsNullOrEmpty(irBillingPort.ToString()) & !string.IsNullOrEmpty(strBillingThrsdValue) & !string.IsNullOrEmpty(strMsgRecvFacility))
                                            {
                                                sbformat.Append(strMsgRecvFacility.ToString());
                                            }
                                            else
                                            {
                                                //pSbformat.Append(GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.HL7), HL7.RECEIVING_FACILITY.ToString));
                                                sbformat.Append(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.HL7.ToString() &&
                                               x.PARAMETER_ID == AtParWebEnums.HL7.RECEIVING_FACILITY.ToString())
                                               .Select(x => x.PARAMETER_VALUE).FirstOrDefault());
                                            }
                                            break;
                                        case "VERSION_ID":
                                            // pSbformat.Append(GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.HL7), HL7.ADT_VERSION.ToString));
                                            sbformat.Append(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.HL7.ToString() &&
                                               x.PARAMETER_ID == AtParWebEnums.HL7.ADT_VERSION.ToString())
                                               .Select(x => x.PARAMETER_VALUE).FirstOrDefault());
                                            break;
                                        case "ENCODING_CHARACTERS":
                                            sbformat.Append(strMsgEncodingChars);
                                            break;
                                        case "BATCH_ENCODING_CHARACTERS":
                                            sbformat.Append(strMsgEncodingChars);
                                            break;
                                        case "FILE_ENCODING_CHARACTERS":
                                            sbformat.Append(strMsgEncodingChars);
                                            break;
                                        case "SET_ID_FINANCIAL_TRANSACTION":
                                            if (strXmlValue != null && !string.IsNullOrEmpty(strXmlValue))
                                            {
                                                if (strXmlValue == "COUNTER")
                                                {
                                                    sbformat.Append(counter);
                                                }
                                            }
                                            break;
                                        case "PROCEDURE_CODE":

                                            sbformat.Append(detailsRow[Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Details_Enum), strXmlValue))]).Append(strDefValue);
                                            break;
                                    }
                                    break;
                                case "ATPAR_HEADER":
                                    if ((headerRows[0][Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Header_Enum), strXmlValue))]) != null && !string.IsNullOrEmpty(headerRows[0][Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Header_Enum), strXmlValue))].ToString()))
                                    {
                                        sbformat.Append(headerRows[0][Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Header_Enum), strXmlValue))]);
                                    }
                                    else
                                    {
                                        sbformat.Append(string.Empty);
                                    }
                                    break;
                                case "ATPAR_DETAILS":


                                    if (strXmldatatype != AtParWebEnums.DATATYPES.DATETIME.ToString())
                                    {
                                        if (detailsRow[Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Details_Enum), strXmlValue))] != null && !string.IsNullOrEmpty(detailsRow[Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Details_Enum), strXmlValue))].ToString()))
                                        {
                                            sbformat.Append(detailsRow[Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Details_Enum), strXmlValue))]);
                                        }
                                        else
                                        {
                                            sbformat.Append(strDefValue);
                                        }
                                    }
                                    else
                                    {

                                        strXmldateformat = xmlnode.Attributes["format"].Value;
                                        string strDate = string.Empty;

                                        if ((detailsRow[Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Details_Enum), strXmlValue))]) != null && !string.IsNullOrEmpty(detailsRow[Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Details_Enum), strXmlValue))].ToString()))
                                        {
                                            strDate = detailsRow[Convert.ToInt32(Enum.Parse(typeof(AtParWebEnums.Send_Charge_Capture_Details_Enum), strXmlValue))].ToString();

                                            sbformat.Append(Convert.ToDateTime(strDate).ToString(strXmldateformat.ToString()));
                                        }
                                        else
                                        {
                                            sbformat.Append(string.Empty);
                                        }


                                    }

                                    break;
                                case "DEFAULT":
                                    sbformat.Append(strXmlValue).ToString();
                                    break;
                            }
                            switch (strXmldatatype)
                            {

                                case "DATETIME":

                                    if (strXmlValueType == AtParWebEnums.VALUETYPES.DEFAULT.ToString())
                                    {
                                        strXmldateformat = xmlnode.Attributes["format"].Value;
                                        sbformat.Append((Convert.ToDateTime(DateTime.Now).ToString(strXmldateformat.ToString())));

                                    }

                                    break;
                            }

                            //appending pipe symbol for each field
                            sbformat.Append(strMsgFieldSeperator);
                        }
                    }

                }
                else
                {

                }
                sbformat = sbformat.Remove(sbformat.ToString().LastIndexOf("|"), 1);

                tupleOutput = new Tuple<StringBuilder, long>(sbformat, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                tupleOutput = new Tuple<StringBuilder, long>(sbformat, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;
            }

        }

        public DataTable GenerateBillingMessageFile(DataRow drow, string strSentStatus,
                        int intCnt, DataSet billingDS, string strBillingMsg, string transactionId,
                        string strBillingUploadPath, string strBILLING_MSG_BY_TRANSACTION, DataTable dtItems)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;
            DataRow dtRow = dtItems.NewRow();
            string strPath = string.Empty;
            dtRow["TRANSACTION_ID"] = drow[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_ID];
            dtRow["ITEM_ID"] = drow[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_ID];

            if (billingDS.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Send_Charge_Capture_Details_Enum.LINE_NO.ToString()))
            {
                dtRow["LINE_NO"] = drow[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.LINE_NO];
            }

            if (strSentStatus != AtParWebEnums.HL7_MESSAGE_SENT_STATUS.SUCESS.ToString())
            {
                dtRow["SENT_STATUS"] = "N";
                dtRow["BILL_QTY"] = 0;
            }
            else if (strSentStatus == AtParWebEnums.HL7_MESSAGE_SENT_STATUS.SUCESS.ToString())
            {
                dtRow["SENT_STATUS"] = "Y";
                dtRow["BILL_QTY"] = drow[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_COUNT];
            }

            if (billingDS.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Send_Charge_Capture_Details_Enum.DEPARTMENT_ID.ToString()))
            {
                dtRow["DEPARTMENT_ID"] = drow[AtParWebEnums.Send_Charge_Capture_Details_Enum.DEPARTMENT_ID.ToString()];
            }

            if (billingDS.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Send_Charge_Capture_Details_Enum.E_MAIL.ToString()))
            {
                dtRow["E_MAIL"] = drow[AtParWebEnums.Send_Charge_Capture_Details_Enum.E_MAIL.ToString()];
            }

            dtItems.Rows.Add(dtRow);
            try
            {
                if (strSentStatus != AtParWebEnums.HL7_MESSAGE_SENT_STATUS.SUCESS.ToString())
                {
                    strPath = AtParWebEnums.Billing_Files_Folder.Billing.ToString() + "\\" + "Error\\";
                }
                else if (strSentStatus == AtParWebEnums.HL7_MESSAGE_SENT_STATUS.SUCESS.ToString())
                {
                    strPath = AtParWebEnums.Billing_Files_Folder.Billing.ToString() + "\\" + "Processed\\";
                }

                statusCode = FileStreamWriter(strBillingUploadPath + strPath + transactionId, intCnt, strBillingMsg);

                return dtItems;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                throw ex;
            }
        }
        public long FileStreamWriter(string pFilePrimaryName, int pFileSequenceNo, string strFT)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            //Writing the msg into file
            try
            {
                StreamWriter sw = new StreamWriter(pFilePrimaryName + "_" + pFileSequenceNo + "_" + DateTime.Now.ToString("yyyyMMddHHmmssms") + ".txt");
                sw.WriteLine(strFT);
                sw.Close();
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
        }
        public string BillingMessage(string strBilling, Socket m_mainSocket)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strSentstatus = string.Empty;
            string strPath = null;
            System.Timers.Timer m_timer = new System.Timers.Timer();
            short ReceiveSucess = 0;

            try
            {
                strPath = string.Empty;
                byte[] bytCommand = new byte[] { };

                bytCommand = Encoding.ASCII.GetBytes(strBilling);
                //Start the timer
                m_timer.Interval = new TimeSpan(0, 0, 0, 1, 0).TotalMilliseconds;
                m_timer.Start();
                m_timer.Elapsed += timerloop;

                //Begin send data

                m_mainSocket.BeginSend(bytCommand, 0, bytCommand.Length, SocketFlags.None, new AsyncCallback(SendData), m_mainSocket);

                while (ReceiveSucess != (int)AtParWebEnums.Receive_Status.RECEIVE_SUCESS)
                {
                    Thread.Sleep(1000);
                    //To hold the control on process
                    if (ReceiveSucess == (int)AtParWebEnums.Receive_Status.RECIEVE_FAIL | ReceiveSucess == (int)AtParWebEnums.Receive_Status.RECEIVE_ABORT)
                    {
                        break; // TODO: might not be correct. Was : Exit While
                    }
                }

                if (ReceiveSucess == (int)AtParWebEnums.Receive_Status.RECEIVE_SUCESS)
                {
                    //Success:
                    strSentstatus = AtParWebEnums.HL7_MESSAGE_SENT_STATUS.SUCESS.ToString();
                }
                else
                {
                    //Failed:
                    strSentstatus = AtParWebEnums.HL7_MESSAGE_SENT_STATUS.FAILED.ToString();
                }
                return strSentstatus;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                throw ex;
            }

        }
        private void timerloop(System.Object sender, System.Timers.ElapsedEventArgs e)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int intTValue = 0;
            string _strBillingThrsdValue = string.Empty;
            string m_thresholdValue = "3";
            short ReceiveSucess;
            System.Timers.Timer m_timer = new System.Timers.Timer();
            try
            {
                intTValue += 1;
                if (!string.IsNullOrEmpty(_strBillingThrsdValue))
                {
                    m_thresholdValue = _strBillingThrsdValue;
                }
                //If value is greater than threshold value, Abort the send
                if (intTValue > Convert.ToInt32(m_thresholdValue))
                {
                    ReceiveSucess = Convert.ToInt16(AtParWebEnums.Receive_Status.RECEIVE_ABORT);
                    m_timer.Stop();
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                throw ex;
            }
        }

        private void SendData(IAsyncResult iar)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            byte[] data = new byte[1500];
            try
            {
                Socket remote;
                remote = (Socket)iar.AsyncState;


                int sent = remote.EndSend(iar);
                remote.BeginReceive(data, 0, data.Length - 1, SocketFlags.None, new AsyncCallback(ReceiveData), remote);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void ReceiveData(IAsyncResult iar)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            byte[] data = new byte[1500];
            short ReceiveSucess = 0;
            System.Timers.Timer m_timer = new System.Timers.Timer();
            try
            {
                Socket remote;

                remote = (Socket)iar.AsyncState;

                int recv = remote.EndReceive(iar);
                string stringData = Encoding.ASCII.GetString(data, 0, recv - 1);

                if (stringData.Length > 0)
                {
                    if (ValidateACK(stringData))
                    {
                        ReceiveSucess = Convert.ToInt16(AtParWebEnums.Receive_Status.RECEIVE_SUCESS);
                        m_timer.Stop();
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                throw ex;
            }
        }

        private bool ValidateACK(string pstrACK)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            System.Xml.XmlDocument xmlBillingCodes = new System.Xml.XmlDocument();
            string strFilePath = string.Empty;
            System.Xml.XmlNodeList xmlBillingCodesNodeList;
            string strBillingCodeData = null;
            string[] _strSuccessCodes = null;
            bool blnBillingSucessCodes = false;


            try
            {
                strFilePath = AppDomain.CurrentDomain.BaseDirectory + "BillingMessage_Outbound_Rules.xml";

                xmlBillingCodes.Load(strFilePath);

                xmlBillingCodesNodeList = xmlBillingCodes.SelectNodes("//BILLING_SUCCESS_CODES/field");

                if (xmlBillingCodesNodeList.Count > 0)
                {
                    strBillingCodeData = xmlBillingCodesNodeList[0].Attributes["value"].Value;
                    _strSuccessCodes = strBillingCodeData.Split(',');
                }

                if (!(xmlBillingCodesNodeList.Count > 0))
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + " Malformed XML <BILLING_SUCCESS_CODES/field> node does not exist in" + " the Rules file");
                }

                string[] strACK = null;
                strACK = pstrACK.Split('|');
                for (int intACK = 0; intACK <= strACK.Length - 1; intACK++)
                {
                    blnBillingSucessCodes = _strSuccessCodes.Contains(strACK[intACK].ToString());
                    if (blnBillingSucessCodes == true)
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                throw ex;
            }
        }

        public long SocketAddress_Connection(Socket m_mainSocket, string systemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            IPAddress GLOIP = null;
            int GLOINTPORT = 0;
            string m_thresholdValue = "3";

            //Commented below GetConfigData call because Obsolute function GetConfigData(With 2 parameters)is removed from AtPar_Application_Base class.
            //TODO: Need to Pass SystemID for GetConfigData 
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            List<string> lstParameters = new List<string>();
            lstParameters.Add(AtParWebEnums.HL7.ADT_BILLING_SEND_ADDRESS.ToString());
            lstParameters.Add(AtParWebEnums.HL7.ADT_BILLING_SEND_PORT.ToString());
            lstParameters.Add(AtParWebEnums.HL7.ADT_BILLING_THRESHOLD_VALUE.ToString());

            lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


            string strAddress = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.HL7.ToString() &&
                                                          x.PARAMETER_ID == AtParWebEnums.HL7.ADT_BILLING_SEND_ADDRESS.ToString())
                                                          .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
            // GLOIP = IPAddress.Parse(GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.HL7), HL7.ADT_BILLING_SEND_ADDRESS.ToString));
            GLOIP = IPAddress.Parse(strAddress);
            //GLOINTPORT = GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.HL7), HL7.ADT_BILLING_SEND_PORT.ToString);
            GLOINTPORT = Convert.ToInt32(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.HL7.ToString() &&
                                                            x.PARAMETER_ID == AtParWebEnums.HL7.ADT_BILLING_SEND_PORT.ToString())
                                                          .Select(x => x.PARAMETER_VALUE).FirstOrDefault());
            // m_thresholdValue = GetConfigData(pSystemID, EName<CONFIGFILE>(CONFIGFILE.HL7), HL7.ADT_BILLING_THRESHOLD_VALUE.ToString);
            m_thresholdValue = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.HL7.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.HL7.ADT_BILLING_THRESHOLD_VALUE.ToString())
                                                          .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
            if ((m_thresholdValue != null) || string.IsNullOrEmpty(m_thresholdValue))
            {
                m_thresholdValue = "3";
            }
            IPEndPoint ipLocal = null;

            ipLocal = new IPEndPoint(GLOIP, GLOINTPORT);
            //m_mainSocket = New Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
            m_mainSocket.Blocking = true;
            try
            {
                m_mainSocket.BeginConnect(ipLocal, new AsyncCallback(Connected), m_mainSocket);
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }

        }
        public long SocketAddress_Connection(Socket m_mainSocket, string systemID, string billingSendAddress, int billingPort, string billingThrsdValue)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            IPEndPoint ipLocal;
            IPAddress GIPAddress;
            GIPAddress = IPAddress.Parse(billingSendAddress);
            ipLocal = new IPEndPoint(GIPAddress, billingPort);
            //m_mainSocket = New Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
            m_mainSocket.Blocking = true;
            try
            {
                m_mainSocket.BeginConnect(ipLocal, new AsyncCallback(Connected), m_mainSocket);
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
        }

        private void Connected(IAsyncResult iar)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Socket client;
            try
            {
                client = (Socket)iar.AsyncState;
                client.EndConnect(iar);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
        }

        #endregion
        #region GetBUs

        public AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUs(string userID, string[] bArray, string appID, string selectedUserID, string[] deviceTokenEntry, string bUnit = "", string descr = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION>();

            string _strSQL = string.Empty;
            string className = string.Empty;
            object reflectObject = null;
            string methodName = string.Empty;
            long statusCode = 0;
            string erpObjName = string.Empty;
            DataSet dsLocalDataset = new DataSet();
            List<MT_ATPAR_IBU_ALLOCATION> lstAllocatedBUs = null;
            DataSet pDsPSBUnits = default(DataSet);
            // Middle Tire Dataset
            int i = 0;
            int j = 0;
            //SM-0005890 Use Reflection to call ERP Components instead of direct reference

            try
            {
                //GetConfigData();


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, ": Not a valid ErpObjectName ")); }
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.PutAway.ToString() + "_" + erpObjName;
                }

                className = "GetBUs";
                methodName = "GetBUs";

                var MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);
                var buArray = bArray.Concat(new[] { "" });
                object[] args = { buArray.ToArray<string>(), bUnit, descr, pDsPSBUnits, deviceTokenEntry };
                statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));
                pDsPSBUnits = (DataSet)args[3];

                if (_log.IsDebugEnabled)
                    _log.Debug("After Calling Remote Object" + statusCode);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + " : " + statusCode);
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal("Remote Object Create failed " + ex.ToString());
                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                return response;
            }

            try
            {
                lstAllocatedBUs = _commonRepo.GetBUs(appID);
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
            var lstBUnits = (from dr in pDsPSBUnits.Tables[0].AsEnumerable()
                             select new VM_ATPAR_IBU_ALLOCATION()
                             {
                                 INV_LOC_BUSINESS_UNIT = dr["INV_LOC_BUSINESS_UNIT"].ToString(),
                                 BUSINESS_UNIT = dr["BUSINESS_UNIT"].ToString(),
                                 DESCR = dr["DESCR"].ToString()

                             }).ToList();
            try
            {
                // Checking whether  Middle Tier DataBase is NULL or not
                if (lstAllocatedBUs.Count == 0)
                {
                    foreach (var bUnits in lstBUnits)
                    {
                        bUnits.CHK_VALUE = 0;
                        bUnits.CHK_ALLOCATED = 0;
                    }

                    //Comparing  both PeopleSoft and Middle Tier BUnits and User Id Columns.
                }
                else if (lstAllocatedBUs.Count > 0)
                {
                    foreach (var bUnits in lstBUnits)
                    {
                        foreach (var allocBUnits in lstAllocatedBUs)
                        {
                            if (bUnits.BUSINESS_UNIT == allocBUnits.BUSINESS_UNIT)
                            {
                                //SW-3031 01/31/2008
                                bUnits.USER_ID += (bUnits.USER_ID) == null ? allocBUnits.USERNAME : ", " + allocBUnits.USERNAME;

                                //Checking whether Middle Tier DB UserId Column is same as Selected User Id in the Webpages or not.
                                if (allocBUnits.USER_ID == selectedUserID)
                                {
                                    bUnits.CHK_VALUE = 1;
                                    //DK - 0004050
                                    bUnits.CHK_ALLOCATED = 1;
                                }
                            }
                        }
                        //for i = 0 To dsLocalDataset.Tables(0).Rows.Count - 1
                    }
                    //for j = 0 To pDsPSBunits.Tables(0).Rows.Count - 1
                }

                for (i = 0; i <= lstBUnits.Count - 1; i++)
                {
                    lstBUnits[i].ROWINDEX = i;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal("Local Call failed " + ex.ToString());
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
            response.DataList = lstBUnits.OrderByDescending(a => a.CHK_VALUE == 1).ToList(); ;
            response.AtParSuccess();
            return response;

        }

        #endregion

        #region SendEmbeddedEmail
        public AtParWebApiResponse<long> SendEmbeddedEmail(string systemID, string subject, string bodyText, string toAddress, string imageName, string deliverSign, string mailPriority, string attachment)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);


            mailPriority = mailPriority.ReplaceNullwithEmpty();
            imageName = imageName.ReplaceNullwithEmpty();
            attachment = attachment.ReplaceNullwithEmpty();

            if (mailPriority == "")
            {
                mailPriority = "0";
            }

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            string _strSQL = string.Empty;
            long _StatusCode = 0;

            string _strFromAddress = string.Empty;
            string _strSmtpHost = string.Empty;
            // smtp server
            string _strSmtpPort = string.Empty;
            string _strSmtpUserName = string.Empty;
            string _strSmtpPwd = string.Empty;
            string _strSmtpAccountName = string.Empty;
            string _strSmtpSSLEnabled = string.Empty;
            MailMessage objMail = new MailMessage();
            SmtpClient SmtpMail = new SmtpClient();
            AlternateView view = default(AlternateView);
            LinkedResource resChartImage = default(LinkedResource);
            LinkedResource resLogo = default(LinkedResource);
            LinkedResource resTopbg = default(LinkedResource);

            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

            try
            {
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_USER_NAME.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_PASSWORD.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_USE_SSL.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                Encryption atparEncriptService = new Encryption();

                _strFromAddress = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpHost = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpPort = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpUserName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_USER_NAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpPwd = atparEncriptService.Decrypt(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_PASSWORD.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault());
                _strSmtpAccountName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpSSLEnabled = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_USE_SSL.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                // checks whether the To Address is entered
                if (string.IsNullOrEmpty(toAddress))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS, _commonRepo, _log);
                    return response;
                }
                objMail.To.Add(toAddress);

                // checks whether the SMTP HOST(Server) is configured
                if (string.IsNullOrEmpty(_strSmtpHost))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING, _commonRepo, _log);
                    return response;
                }
                SmtpMail.Host = _strSmtpHost;

                // checks whether the Port is configured
                if (string.IsNullOrEmpty(_strSmtpPort))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING, _commonRepo, _log);
                    return response;
                }
                SmtpMail.Port = Convert.ToInt32(_strSmtpPort);

                // checks whether the From Address is being configured
                if (string.IsNullOrEmpty(_strFromAddress))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS, _commonRepo, _log);
                    return response;

                }
                objMail.From = new MailAddress(_strFromAddress);

                // checks whether the Subject is entered
                if (string.IsNullOrEmpty(subject))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_ENTER_SUBJECT, _commonRepo, _log);
                    return response;
                }
                objMail.Subject = subject;

                // checks whether the Body is entered
                if (string.IsNullOrEmpty(bodyText))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_ENTER_BODY, _commonRepo, _log);
                    return response;
                }
                objMail.Body = bodyText;

                // checks whether the Mail Format is configured, if no then setting it to HTML as default
                objMail.IsBodyHtml = true;

                string _appPath = null;
                _appPath = AppDomain.CurrentDomain.BaseDirectory[0] + @":\AtPar\Web\images";

                view = AlternateView.CreateAlternateViewFromString(bodyText, null, MediaTypeNames.Text.Html);

                resLogo = new LinkedResource(_appPath + "\\logo.jpg");
                resTopbg = new LinkedResource(_appPath + "\\topbg.jpg");
                resLogo.ContentId = "logo";
                resTopbg.ContentId = "topbg";
                view.LinkedResources.Add(resLogo);
                view.LinkedResources.Add(resTopbg);

                if (imageName.Length > 0)
                {
                    string strImageNames = imageName;
                    ArrayList lstList = new ArrayList();

                    lstList.AddRange(strImageNames.Split('&'));
                    foreach (var ImageName in lstList)
                    {
                        if (Convert.ToBoolean(deliverSign))
                        {
                            resChartImage = new LinkedResource(_appPath + "\\delvRepSigns\\" + ImageName.ToString());
                            resChartImage.ContentId = ImageName.ToString();
                            view.LinkedResources.Add(resChartImage);
                        }
                        else
                        {
                            var filePath = HttpContext.Current.Server.MapPath(@"~/Uploaded/");
                            if (!Directory.Exists(filePath))
                            {
                                Directory.CreateDirectory(filePath);
                            }
                            //resChartImage = new LinkedResource(_appPath + "\\" + ImageName.ToString());
                            resChartImage = new LinkedResource(filePath + ImageName.ToString());
                            resChartImage.ContentId = ImageName.ToString();
                            view.LinkedResources.Add(resChartImage);
                        }
                    }

                }

                objMail.AlternateViews.Add(view);


                // checks whether there are any attahments
                if (!string.IsNullOrEmpty(attachment))
                {
                    Attachment attachement = new Attachment(attachment);
                    objMail.Attachments.Add(attachement);
                }

                // setting the mail priority - default it is normal
                objMail.Priority = (MailPriority)Convert.ToInt32(mailPriority);

                // checking whether the SMTP configuration is set in the DB

                try
                {
                    // checks whether the Username and password is configured else uses the default credentials to send the email
                    System.Net.NetworkCredential SmtpCredentials = new System.Net.NetworkCredential();
                    if (string.IsNullOrEmpty(_strSmtpUserName) | string.IsNullOrEmpty(_strSmtpPwd))
                    {
                        SmtpMail.UseDefaultCredentials = true;
                    }
                    else
                    {
                        // checks whether the Account Name (domain) is configured
                        if (string.IsNullOrEmpty(_strSmtpAccountName))
                        {
                            SmtpCredentials = new System.Net.NetworkCredential(_strSmtpUserName, _strSmtpPwd);
                        }
                        SmtpCredentials = new System.Net.NetworkCredential(_strSmtpUserName, _strSmtpPwd, _strSmtpAccountName);
                        SmtpMail.UseDefaultCredentials = false;
                        SmtpMail.Credentials = SmtpCredentials;
                    }

                    // checks whether the SSL is configured
                    if (string.IsNullOrEmpty(_strSmtpSSLEnabled) | _strSmtpSSLEnabled.ToLower() == "no")
                    {
                        SmtpMail.EnableSsl = false;
                    }
                    else if (_strSmtpSSLEnabled.ToLower() == "yes")
                    {
                        SmtpMail.EnableSsl = true;
                    }

                    SmtpMail.Send(objMail);
                }
                catch (Exception ex)
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_SEND_FAILED, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }
        #endregion

        #region SendEmail
        public AtParWebApiResponse<long> SendEmail(string systemID, string subject, string body, string toAddress, string mailPriority, string attachment)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            string _strSQL = string.Empty;
            var response = new AtParWebApiResponse<long>();
            string _strFromAddress = string.Empty;
            string _strSmtpHost = string.Empty;
            string _strSmtpPort = string.Empty;
            string _strSmtpUserName = string.Empty;
            string _strSmtpPwd = string.Empty;
            string _strSmtpAccountName = string.Empty;
            string _strSmtpSSLEnabled = string.Empty;
            MailMessage objMail = new MailMessage();
            SmtpClient SmtpMail = new SmtpClient();
            string _strSmtpAuthenticate = string.Empty;
            string _strSendUsing = string.Empty;
            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            try
            {
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_USER_NAME.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_PASSWORD.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_USE_SSL.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                Encryption atparEncriptService = new Encryption();

                _strFromAddress = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpHost = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpPort = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpUserName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_USER_NAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpPwd = atparEncriptService.Decrypt(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_PASSWORD.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault());
                _strSmtpAccountName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                _strSmtpSSLEnabled = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_USE_SSL.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                // checks whether the To Address is entered
                if (string.IsNullOrEmpty(toAddress))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS, _commonRepo, _log);
                    return response;
                }
                objMail.To.Add(toAddress);

                // checks whether the SMTP HOST(Server) is configured
                if (string.IsNullOrEmpty(_strSmtpHost))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING, _commonRepo, _log);
                    return response;
                }
                SmtpMail.Host = _strSmtpHost;

                // checks whether the Port is configured
                if (string.IsNullOrEmpty(_strSmtpPort))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING, _commonRepo, _log);
                    return response;
                }
                SmtpMail.Port = Convert.ToInt32(_strSmtpPort);

                // checks whether the From Address is being configured
                if (string.IsNullOrEmpty(_strFromAddress))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS, _commonRepo, _log);
                    return response;

                }
                objMail.From = new MailAddress(_strFromAddress);

                // checks whether the Subject is entered
                if (string.IsNullOrEmpty(subject))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_ENTER_SUBJECT, _commonRepo, _log);
                    return response;
                }
                objMail.Subject = subject;

                // checks whether the Body is entered
                if (string.IsNullOrEmpty(body))
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_ENTER_BODY, _commonRepo, _log);
                    return response;
                }
                objMail.Body = body;

                // checks whether the Mail Format is configured, if no then setting it to HTML as default
                objMail.IsBodyHtml = true;


                // checks whether there are any attahments
                if (!string.IsNullOrEmpty(attachment))
                {
                    Attachment attachement = new Attachment(attachment);
                    objMail.Attachments.Add(attachement);
                }

                // setting the mail priority - default it is normal
                objMail.Priority = (MailPriority)Convert.ToInt32(mailPriority);

                // checking whether the SMTP configuration is set in the DB

                try
                {
                    // checks whether the Username and password is configured else uses the default credentials to send the email
                    NetworkCredential SmtpCredentials = new NetworkCredential();
                    if (string.IsNullOrEmpty(_strSmtpUserName) | string.IsNullOrEmpty(_strSmtpPwd))
                    {
                        SmtpMail.UseDefaultCredentials = true;
                    }
                    else
                    {
                        // checks whether the Account Name (domain) is configured
                        if (string.IsNullOrEmpty(_strSmtpAccountName))
                        {
                            SmtpCredentials = new NetworkCredential(_strSmtpUserName, _strSmtpPwd);
                        }
                        SmtpCredentials = new NetworkCredential(_strSmtpUserName, _strSmtpPwd, _strSmtpAccountName);
                        SmtpMail.UseDefaultCredentials = false;
                        SmtpMail.Credentials = SmtpCredentials;
                    }

                    // checks whether the SSL is configured
                    if (string.IsNullOrEmpty(_strSmtpSSLEnabled) | _strSmtpSSLEnabled.ToLower() == "no")
                    {
                        SmtpMail.EnableSsl = false;
                    }
                    else if (_strSmtpSSLEnabled.ToLower() == "yes")
                    {
                        SmtpMail.EnableSsl = true;
                    }

                    SmtpMail.Send(objMail);
                }
                catch (Exception ex)
                {
                    response.AtParNotOK(AtparStatusCodes.EMAIL_SEND_FAILED, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }
        #endregion

        #region GetEventIds

        public AtParWebApiResponse<MT_CYCT_EVENT_HDR> GetEventIds(string bunit, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_CYCT_EVENT_HDR>();

            try
            {
                var eventIDs = _commonRepo.GetEventIds(bunit, userID, deviceTokenEntry);
                if (string.IsNullOrEmpty(bunit))
                {
                    if (eventIDs.Count > 0)
                    {
                        response.DataList = eventIDs;
                    }
                    else if (eventIDs.Count == 0)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }
                }
                response.DataList = eventIDs;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }

        }

        #endregion

        #region ConvertColumnType
        public long ConvertColumnType(ref DataSet ds)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            if (_log.IsDebugEnabled)
            {
                _log.Debug(methodBaseName);
            }

            if (_log.IsDebugEnabled)
            {
                _log.Debug(methodBaseName + " Converting Inv Item ID column Data Type to String data type");
            }

            DataTable _dtTemp = null;
            try
            {
                _dtTemp = new DataTable();

                _dtTemp = ds.Tables["Details"].Clone(); //Cloning Details table
                _dtTemp.Columns[AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID.ToString()].DataType = Type.GetType("System.String");

                foreach (DataRow dr in ds.Tables["Details"].Rows)
                {
                    _dtTemp.ImportRow(dr);
                }
                ds.Tables.Remove("Details");
                ds.Tables.Add(_dtTemp);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to convert Inv Item ID column data type: " + "Exception is: " + ex.ToString() + Environment.NewLine);
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _dtTemp.Dispose();
            }
            return AtparStatusCodes.ATPAR_OK;
        }
        #endregion;

        #region GetUserFullName
        public AtParWebApiResponse<string> GetUserFullName(string userID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<string>();

            try
            {
                var fullName = _commonRepo.GetUserFullName(userID);
                response.DataVariable = fullName;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }

        }
        #endregion

        #region GetHeirarchyUsersList
        public AtParWebApiResponse<long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();


            try
            {
                var result = _commonRepo.GetHeirarchyUsersList(orgGrpID, appID, userID);

                var pDSUserList = result.Item1;
                statusCode = result.Item2;

                var dictionaryResult = new Dictionary<string, object> { { "pDSUserList", pDSUserList } };

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                response.DataDictionary = dictionaryResult;
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
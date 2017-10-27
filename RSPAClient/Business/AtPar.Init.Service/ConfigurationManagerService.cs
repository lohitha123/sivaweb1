
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Common;
using log4net;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using System.Xml.Linq;
using System.Data;
using AtPar.Service.Interfaces.Init;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.IO;
using AtParEncryptionServices;
using System.DirectoryServices;
using System.Xml;
using AtPar_BusinessRules;
using System.Collections;
using System.Net;
using System.Net.NetworkInformation;

namespace AtPar.Init.Service
{
    public class ConfigurationManagerService : IConfigurationManagerService
    {
        IConfigurationManagerRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ConfigurationManagerService(IConfigurationManagerRepository configurationmanagerRepo, ILog log, ICommonRepository commonRepository)
        {
            _repo = configurationmanagerRepo;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ConfigurationManagerService));
        }

        #region GetConfigurationDetails
        /// <summary>
        /// To get Configuration Details
        /// </summary>
        /// <param name="pSystemId"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns>ATPAR_OK on Success, else Error Code</returns>
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> GetConfigurationDetails(string systemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDetails = _repo.GetConfigSectionDtls();
                List<MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS> lstEnterpriseSystemDetails = _repo.GetConfigErpDtls();

                Encryption atparEncriptService = new Encryption();
                UpdateMTConfigDetailsFromMaster(lstConfigSectionDetails, systemId);
                UpdateRptConfigDetailsFromMaster(lstConfigSectionDetails);
                lstConfigSectionDetails.ForEach(x =>
                {
                    if (x.TYPE != null && x.TYPE == AtParWebEnums.REMOTEDBCONNECTION.PASSWORD.ToString())
                    {
                        if (!string.IsNullOrEmpty(x.PARAMETER_VALUE))
                        {
                            x.PARAMETER_VALUE = atparEncriptService.Decrypt(x.PARAMETER_VALUE);
                            x.PARAMETER_VALUE = AESEncryptDecryptService.EncryptStringAES(x.PARAMETER_VALUE);
                        }
                    }
                });
                response.DataDictionary = new Dictionary<string, object> { { "configSectionList", lstConfigSectionDetails }, { "enterpriseList", lstEnterpriseSystemDetails } };

                if (response.DataDictionary.Count.Equals(0))
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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        private void UpdateMTConfigDetailsFromMaster(List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigDetails, string systemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string strFilter = String.Empty;
            try
            {
                List<MT_ATPAR_SYSTEM_DB> listMiddleTierDetails = new List<MT_ATPAR_SYSTEM_DB>();

                listMiddleTierDetails = _commonRepo.GetSystemIDs(systemId);

                if (listMiddleTierDetails.Count > 0)
                {
                    strFilter = AtParWebEnums.ConfigurationManager_Tabs.SYSTEMDBCONNECTION.ToString();
                    lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATASOURCE.ToString()).FirstOrDefault().PARAMETER_VALUE = listMiddleTierDetails[0].DATASOURCE.ToString();
                    lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.USERID.ToString()).FirstOrDefault().PARAMETER_VALUE = listMiddleTierDetails[0].USERID.ToString();
                    lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.PASSWORD.ToString()).FirstOrDefault().PARAMETER_VALUE = listMiddleTierDetails[0].PASSWORD.ToString();
                    lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SERVER.ToString()).FirstOrDefault().PARAMETER_VALUE = listMiddleTierDetails[0].SERVER.ToString();
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        private void UpdateRptConfigDetailsFromMaster(List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigDetails)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string strFilter = String.Empty;
            try
            {
                List<MT_ATPAR_SYSTEM_DB> listRptDbDetails = new List<MT_ATPAR_SYSTEM_DB>();

                listRptDbDetails = _commonRepo.GetRptSystemIDs();

                if (listRptDbDetails.Count > 0)
                {

                    foreach (var item in listRptDbDetails)
                    {
                        if (item.SYSTEM_ID == AtParWebEnums.Reporting_System_Ids_Enum.ReportingConf.ToString())
                        {
                            strFilter = AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.DATASOURCE.ToString()).FirstOrDefault().PARAMETER_VALUE = item.DATASOURCE.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.USERID.ToString()).FirstOrDefault().PARAMETER_VALUE = item.USERID.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.PASSWORD.ToString()).FirstOrDefault().PARAMETER_VALUE = item.PASSWORD.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.SERVER.ToString()).FirstOrDefault().PARAMETER_VALUE = item.SERVER.ToString();
                        }
                        else if (item.SYSTEM_ID == AtParWebEnums.Reporting_System_Ids_Enum.RepStarter.ToString())
                        {
                            strFilter = AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.STARTER_API_DATASOURCE.ToString()).FirstOrDefault().PARAMETER_VALUE = item.DATASOURCE.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.STARTER_API_USERID.ToString()).FirstOrDefault().PARAMETER_VALUE = item.USERID.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.STARTER_API_PASSWORD.ToString()).FirstOrDefault().PARAMETER_VALUE = item.PASSWORD.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.STARTER_API_SERVER.ToString()).FirstOrDefault().PARAMETER_VALUE = item.SERVER.ToString();
                        }

                        else if (item.SYSTEM_ID == AtParWebEnums.Reporting_System_Ids_Enum.ReportingMT.ToString())
                        {
                            strFilter = AtParWebEnums.ConfigurationManager_Tabs.REPORTSDBCONNECTION.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSDBCONNECTION.DATASOURCE.ToString()).FirstOrDefault().PARAMETER_VALUE = item.DATASOURCE.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSDBCONNECTION.USERID.ToString()).FirstOrDefault().PARAMETER_VALUE = item.USERID.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSDBCONNECTION.PASSWORD.ToString()).FirstOrDefault().PARAMETER_VALUE = item.PASSWORD.ToString();
                            lstConfigDetails.Where(x => x.TAB_ID == strFilter && x.PARAMETER_ID == AtParWebEnums.REPORTSDBCONNECTION.SERVER.ToString()).FirstOrDefault().PARAMETER_VALUE = item.SERVER.ToString();
                        }
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

        #region SaveSSLConfigDetails
        /// <summary>
        ///  Load the Xml File and to assign the values(portno,servername,moniker) and save the xml file
        /// </summary>
        /// <param name="pStrProtocalValue"></param>
        /// <param name="pStrServerNameValue"></param>
        /// <param name="pStrPortNoValue"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns>ATPAR_OK on Success, else Error Code</returns>
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> SaveSSLConfigDetails(string protocalValue, string serverNameValue, string portNoValue)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            try
            {
                if (string.IsNullOrEmpty(portNoValue))
                {
                    portNoValue = string.Empty;
                }
                if (string.IsNullOrEmpty(protocalValue))
                {
                    protocalValue = string.Empty;
                }
                if (string.IsNullOrEmpty(serverNameValue))
                {
                    serverNameValue = string.Empty;
                }

                protocalValue = protocalValue.ToLower();
                serverNameValue = serverNameValue.ToLower();
                var xmlData = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\AtParWebApi\webpages.xml";

                //var xmlData = System.Web.Hosting.HostingEnvironment.MapPath("~/webpages.xml");
                //var WebConfigXml = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\AtParWebApi\Web.config";

                //for redirection//AtPar\AtParWeb
                var WebUserInterfaceXml = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\AtParWeb\Web.config"; 
                var WebConfigXml = System.Web.Hosting.HostingEnvironment.MapPath("~/Web.config");
                var  WCFServiceConfig= AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\WcfServices\Web.config";
                XDocument xmldoc = new XDocument();
                XDocument webconfig = XDocument.Load(WebConfigXml);
                XDocument webInterfaceConfig = XDocument.Load(WebUserInterfaceXml);
                XDocument WcfConfig = XDocument.Load(WCFServiceConfig);
                var webconfigUserInterfaceElement = webInterfaceConfig.Descendants("rule").ToList();
                var webconfigElement = webconfig.Descendants("rule").ToList();


                if (webconfigElement != null && protocalValue == "https")
                {
                    foreach (var item in webconfigElement)
                    {
                        if (item.Attribute("name").Value == "HTTPSRedirect")
                        {
                            item.Attribute("enabled").Value = "true";

                            //item.Attribute("url").Value = "https://{HTTP_HOST}{REQUEST_URI}";
                            webconfig.Save(WebConfigXml);
                        }
                    }
                }
                else if (webconfigElement != null && protocalValue == "http")
                {
                    foreach (var item in webconfigElement)
                    {
                        if (item.Attribute("name").Value == "HTTPSRedirect")
                        {
                            item.Attribute("enabled").Value = "false";
                            // item.Attribute("url").Value = "http://{HTTP_HOST}{REQUEST_URI}";
                            webconfig.Save(WebConfigXml);
                        }
                    }
                }

                if (webconfigUserInterfaceElement != null && protocalValue == "https")
                {
                    foreach (var item in webconfigUserInterfaceElement)
                    {
                        if (item.Attribute("name").Value == "HTTPSRedirect")
                        {
                            item.Attribute("enabled").Value = "true";

                            //item.Attribute("url").Value = "https://{HTTP_HOST}{REQUEST_URI}";
                            webconfig.Save(WebUserInterfaceXml);
                        }
                    }
                }
                else if (webconfigUserInterfaceElement != null && protocalValue == "http")
                {
                    foreach (var item in webconfigUserInterfaceElement)
                    {
                        if (item.Attribute("name").Value == "HTTPSRedirect")
                        {
                            item.Attribute("enabled").Value = "false";
                            // item.Attribute("url").Value = "http://{HTTP_HOST}{REQUEST_URI}";
                            webconfig.Save(WebUserInterfaceXml);
                        }
                    }
                }
                //end redirection


                //Updating in IzendaSystemSettings table.
                _repo.UpdateHostName(protocalValue,serverNameValue);
                



                //WCF service updation

                var wcfElement = WcfConfig.Descendants("security");

                if (wcfElement != null)
                {
                    var data = wcfElement.SingleOrDefault();
                    if (protocalValue == "https")
                    {
                        data.Attribute("mode").Value = "Transport";
                    }
                    else
                    {
                        data.Attribute("mode").Value = "None";
                    }
                    WcfConfig.Save(WCFServiceConfig);

                }

                // End WCF service updation


                if (_log.IsDebugEnabled) { _log.Debug("xmlData" + xmlData); }
                //XDocument xmldoc1 = new XDocument();
                XDocument webpages = XDocument.Load(xmlData);
                var webpagesElement = webpages.Descendants("atpar_webservices");

                if (webpagesElement != null)
                {
                    var data = webpagesElement.SingleOrDefault();
                    data.Attribute("moniker").Value = protocalValue;
                    data.Attribute("servername").Value = serverNameValue;
                    data.Attribute("portno").Value = portNoValue;
                    webpages.Save(xmlData);
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

        #region GetSSLConfigDetails
        /// <summary>
        ///  Load the Xml File and to assign the values(portno,servername,moniker) and save the xml file
        /// </summary>
        /// <param name="pStrProtocalValue"></param>
        /// <param name="pStrServerNameValue"></param>
        /// <param name="pStrPortNoValue"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns>ATPAR_OK on Success, else Error Code</returns>
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> GetSSLConfigDetails()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            try
            {
                SSL_CONFIG_DETAILS sslConfigDetails = new SSL_CONFIG_DETAILS();
                var xmlData = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\AtParWebApi\webpages.xml";

               // var xmlData = System.Web.Hosting.HostingEnvironment.MapPath("~/webpages.xml");
                if (_log.IsDebugEnabled) { _log.Debug("webpages xmlData" + xmlData); }
                XDocument xmldoc = new XDocument();
                XDocument webpages = XDocument.Load(xmlData);

                if (webpages != null)
                {
                    var webpagesElement = webpages.Descendants("atpar_webservices");
                    if (webpagesElement != null)
                    {
                        var data = webpagesElement.SingleOrDefault();
                        sslConfigDetails.PROTOCOL = data.Attribute("moniker").Value;
                        sslConfigDetails.SERVER_NAME = data.Attribute("servername").Value;
                        sslConfigDetails.PORT_NO = data.Attribute("portno").Value;
                        response.Data = sslConfigDetails;
                        response.AtParSuccess();
                        return response;
                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.ATPAR_E_CONFFILEOPENFALIURE, _commonRepo, _log);
                        return response;
                    }

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

        #region SetEntrpServiceConfDtls   
        /// <summary>
        /// To set Enterprise Service Conf details
        /// </summary>
        /// <param name="pUserID"></param>
        /// <param name="pConfXml"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns>ATPAR_OK on Success, else Error Code</returns>



        public AtParWebApiResponse<SSL_CONFIG_DETAILS> SetEntrpServiceConfDtls(string userId, string confXml)

        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            try
            {
                var strEnterPriseServiceExePath = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\AtParWebApi\Log4Net.config";
                // var strEnterPriseServiceExePath = System.Web.Hosting.HostingEnvironment.MapPath("~/Log4Net.config");
                XDocument xmldoc1 = XDocument.Load(strEnterPriseServiceExePath);
                if (xmldoc1 != null)
                {
                    var element = xmldoc1.Elements("log4net").FirstOrDefault();

                    var xmldoc = (XDocument.Parse(confXml)).Root;
                    element = xmldoc;
                    string level = xmldoc.Document.Descendants("log4net").Descendants("appender").Descendants("threshold").FirstOrDefault().FirstAttribute.Value;

                    element.Save(strEnterPriseServiceExePath);
                    UpdateExeConfigDetails(level);
                    UpdateWebConfigDetails(level);
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


        private AtParWebApiResponse<SSL_CONFIG_DETAILS> UpdateWebConfigDetails(string level)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            try
            {
                var strEnterPriseServiceExePath = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\Atpar\WebServices\webservices.xml";

                XDocument webservicexmldoc = XDocument.Load(strEnterPriseServiceExePath);
                if (webservicexmldoc != null)
                {
                    foreach (var item in webservicexmldoc.Descendants("log4net").Descendants("root"))
                    {
                        item.Element("level").SetAttributeValue("value", level);
                    }
                    webservicexmldoc.Save(strEnterPriseServiceExePath);
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

        private AtParWebApiResponse<SSL_CONFIG_DETAILS> UpdateExeConfigDetails(string level)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            try
            {
                var strEnterPriseServiceExePath = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\Atpar\bin\AtPar_WindowsService.exe";
                System.Configuration.Configuration myConfiguration = System.Configuration.ConfigurationManager.OpenExeConfiguration(strEnterPriseServiceExePath);
                System.Configuration.ConfigurationSection Config = myConfiguration.GetSection("log4net");
                System.Configuration.SectionInformation configSelectin = Config.SectionInformation;
                string selectionXml = configSelectin.GetRawXml();
                XDocument webservicexmldoc = XDocument.Parse(selectionXml);
                if (webservicexmldoc != null)
                {
                    foreach (var item in webservicexmldoc.Descendants("root"))
                    {
                        item.Element("level").SetAttributeValue("value", level);
                    }
                    var result = webservicexmldoc.ToString();

                    configSelectin.SetRawXml(result);
                    myConfiguration.Save();
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

        #region GetEntrpServiceConffile  
        /// <summary>
        ///  To get Enterprise Service Conf file details
        /// </summary>
        /// <param name="pUserID"></param>
        /// <param name="pBoolRequestType"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns>ATPAR_OK on Success, else Error Code</returns>

        public AtParWebApiResponse<SSL_CONFIG_DETAILS> GetEntrpServiceConffile(string userId, bool requestType)

        {


            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            string pConfXml;
            try
            {
                var strEnterPriseServiceExePath = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\AtParWebApi\Log4Net.config";

                // var strEnterPriseServiceExePath = System.Web.Hosting.HostingEnvironment.MapPath("~/Log4Net.config");
                if (requestType == false)
                {
                    // XDocument docSave = XDocument.Load(strEnterPriseServiceExePath);
                    string fileName = "ConfigBackUp.xml";
                    string backUpPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, fileName);
                    File.Copy(backUpPath, strEnterPriseServiceExePath, true);
                    // docSave.Save(path);
                    // string fileName = "ConfigBackUp.xml";
                    // string backUpPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, fileName);
                    //docSave.Save(path);
                    //  File.Copy(backUpPath, strEnterPriseServiceExePath, true);
                }
                XDocument xmldoc = XDocument.Load(strEnterPriseServiceExePath);
                pConfXml = xmldoc.ToString();
                response.DataVariable = pConfXml;
                if (response.DataVariable != null)
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

        #region SaveConfigurationDetails
        /// <summary>
        /// To Save Configuration Details
        /// </summary>
        /// <param name="pSystemId"></param>
        /// <param name="pUserId"></param>
        /// <param name="pLstSavedConfigurationDetails"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns>ATPAR_OK on Success, else Error Code</returns>
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> SaveConfigurationDetails(string systemId, string userId, List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstSavedConfigurationDetails)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<SSL_CONFIG_DETAILS>();
            StringBuilder _sbSQL = new StringBuilder();
            long statusCode = -1;
            try
            {
                if (lstSavedConfigurationDetails.Count > 0)
                {
                    Encryption atparEncriptService = new Encryption();

                    lstSavedConfigurationDetails.ForEach(x =>
                    {
                        if (x.TYPE != null && x.TYPE == AtParWebEnums.REMOTEDBCONNECTION.PASSWORD.ToString())
                        {
                            if (!string.IsNullOrEmpty(x.PARAMETER_VALUE))
                            {
                                x.PARAMETER_VALUE = x.PARAMETER_VALUE.Replace(' ', '+');
                                x.PARAMETER_VALUE = AESEncryptDecryptService.DecryptStringAES(x.PARAMETER_VALUE);
                                x.PARAMETER_VALUE = atparEncriptService.Encrypt(x.PARAMETER_VALUE);
                            }
                        }
                    });
                    statusCode = _repo.SaveConfigurationDetails(lstSavedConfigurationDetails, systemId, userId);

                    if (statusCode == AtparStatusCodes.ATPAR_OK)
                    {
                        statusCode = UpdateReportsConfigDetails(systemId, lstSavedConfigurationDetails);
                    }
                    AtParConfigFileReader objAtparBr = new AtParConfigFileReader();
                    long confStatus = objAtparBr.GetSystemConfigurationData(systemId, true);
                   
                    GetConfigData();

                    if (confStatus != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(confStatus, _commonRepo, _log);
                        return response;
                    }
                    var obj = new AtPar_BusinessRules.Utilities();
                    obj.InitializeAtParSystem();
                    GetConfigData();

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                   
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL);
                return response;
            }
        }
        #endregion
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
        #region GetConnection
        public AtParWebApiResponse<string> GetOracleConnection(string dbString)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<string>();
            try
            {

                GenericDatabase objConnString = null;
                objConnString = new GenericDatabase(dbString, System.Data.OracleClient.OracleClientFactory.Instance);
                objConnString.CreateConnection();
                objConnString.CreateConnection().Open();
                objConnString.CreateConnection().Close();
                objConnString.CreateConnection().Dispose();
                // response.DataVariable = "Connection Opened Successfully";
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<string> GetSqlServerConnection(string dbString)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<string>();
            try
            {
                GenericDatabase objConnString = null;
                objConnString = new GenericDatabase(dbString, System.Data.SqlClient.SqlClientFactory.Instance);
                objConnString.CreateConnection();
                objConnString.CreateConnection().Open();
                objConnString.CreateConnection().Close();
                objConnString.CreateConnection().Dispose();
                // response.DataVariable = "Connection Opened Successfully";
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

        public AtParWebApiResponse<string> TestLDAPConnection(string ldapConnectString, string userName, string password, int authType,
            int entryLimit, string[] resultsFields, string searchFilterValue, int searchScope, string strserverName, string strProtocol)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();
            DirectorySearcher oSearcher = new DirectorySearcher();
            SearchResultCollection oResults = null;
            StringBuilder sbTestOutput = new StringBuilder();
            try
            {
                try
                {
                    oSearcher.SearchRoot = new DirectoryEntry(ldapConnectString, userName, password, (AuthenticationTypes)authType);
                    oSearcher.SizeLimit = entryLimit;
                    oSearcher.PropertiesToLoad.AddRange(resultsFields);
                    oSearcher.Filter = searchFilterValue;
                    oSearcher.SearchScope = (SearchScope)searchScope;
                    oResults = oSearcher.FindAll();
                }
                catch (Exception ex)
                {
                    sbTestOutput.AppendLine("Error Binding, the error thrown was : " + ex.ToString());
                    response.AtParSuccess();
                    response.DataVariable = sbTestOutput.ToString();
                    oSearcher.Dispose();
                    return response;
                }
                var mCount = oResults.Count;
                if (mCount > 0)
                {
                    sbTestOutput.AppendLine("Found " + mCount + "entries");

                    var nResultFieldCnt = 0;
                    foreach (var item in oResults.PropertiesLoaded)
                    {
                        sbTestOutput.Append(item.ToString().PadLeft(25) + " | ");
                        nResultFieldCnt = nResultFieldCnt + 1;
                    }


                    sbTestOutput.AppendLine("-".PadLeft(nResultFieldCnt * 28, '-'));
                    string serverPath = strProtocol + "://" + strserverName + "/";
                    foreach (SearchResult oResult in oResults)
                    {
                        // oResult = oResult_loopVariable;
                        DirectoryEntry currentEntry = oResult.GetDirectoryEntry();
                        sbTestOutput.AppendLine();
                        sbTestOutput.Append("UserDN :" + currentEntry.Path.Substring(serverPath.Length));
                        sbTestOutput.AppendLine();
                        foreach (string strField in resultsFields)
                        {
                            if ((currentEntry.Properties[strField] != null))
                            {
                                string _str = string.Empty;
                                if ((currentEntry.Properties[strField].Value != null))
                                {
                                    _str = currentEntry.Properties[strField].Value.ToString();
                                }
                                if (!string.IsNullOrEmpty(_str))
                                    sbTestOutput.Append(_str.PadLeft(25) + " | ");
                            }
                        }
                        sbTestOutput.AppendLine();
                    }
                }
                else
                {
                    sbTestOutput.AppendLine();
                    sbTestOutput.AppendLine("****** No entries found for given search criteria ******");
                }
                response.AtParSuccess();
                response.DataVariable = sbTestOutput.ToString();
            }
            catch (Exception ex)
            {
                response.AtParSuccess();
                sbTestOutput.AppendLine("Error Enumerating data, the error thrown was :" + ex.ToString());
                response.DataVariable = sbTestOutput.ToString();
                oSearcher.Dispose();
                
            }

            return response;


        }


        private long UpdateReportsConfigDetails(string systemId, List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstSavedConfigurationDetails)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string schema = string.Empty;
            string configUserId = string.Empty;
            string configPwd = string.Empty;
            string configServer = string.Empty;
            string configDatasource = string.Empty;
            string strtUserId = string.Empty;
            string strtPwd = string.Empty;
            string strtServer = string.Empty;
            string strtDatasource = string.Empty;
            Encryption atparEncriptService = new Encryption();
            long status = -1;
            try
            {
                if (!_repo.GetUsersImportStatus())
                {
                   
                    try
                    {

                        configUserId = lstSavedConfigurationDetails.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString() &&
                                             x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.USERID.ToString()).FirstOrDefault().PARAMETER_VALUE;
                        configPwd = lstSavedConfigurationDetails.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString() &&
                                              x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.PASSWORD.ToString()).FirstOrDefault().PARAMETER_VALUE;
                        configServer = lstSavedConfigurationDetails.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString() &&
                                              x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.SERVER.ToString()).FirstOrDefault().PARAMETER_VALUE;
                        configDatasource = lstSavedConfigurationDetails.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString() &&
                                              x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.DATASOURCE.ToString()).FirstOrDefault().PARAMETER_VALUE;
                        configPwd = atparEncriptService.Decrypt(configPwd);
                        status = UpdateRepConfigxml(configUserId, configPwd, configDatasource, configServer);



                        if (status == AtparStatusCodes.ATPAR_OK)
                        {
                            strtUserId = lstSavedConfigurationDetails.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString() &&
                              x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.STARTER_API_USERID.ToString()).FirstOrDefault().PARAMETER_VALUE;
                            strtPwd = lstSavedConfigurationDetails.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString() &&
                              x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.STARTER_API_PASSWORD.ToString()).FirstOrDefault().PARAMETER_VALUE;
                            strtServer = lstSavedConfigurationDetails.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString() &&
                                x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.STARTER_API_SERVER.ToString()).FirstOrDefault().PARAMETER_VALUE;
                            strtDatasource = lstSavedConfigurationDetails.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString() &&
                               x.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.STARTER_API_DATASOURCE.ToString()).FirstOrDefault().PARAMETER_VALUE;
                            strtPwd = atparEncriptService.Decrypt(strtPwd);

                            status = UpdateStarterApixml(strtUserId, strtPwd, strtDatasource, strtServer);

                        }

                        if (status == AtparStatusCodes.ATPAR_OK)
                        {
                            status = UpdateReportsSchema();
                        }

                        if (status == AtparStatusCodes.ATPAR_OK)
                        {
                            status = _repo.UpdateUsersImportStatus();
                        }
                        return status;

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }
                else {
                    return AtparStatusCodes.ATPAR_OK;
                }
                


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            

            
        }

        private long UpdateReportsSchema()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string schema = string.Empty;
            long status = -1;

            try
            {
                schema = _repo.GetAtParSchema();

                if (!string.IsNullOrEmpty(schema))
                {
                    status = _repo.UpdateSchema(schema);
                }

                return status;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private long UpdateRepConfigxml(string userId, string pwd, string dataSource, string server)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sb = new StringBuilder();

            try
            {

                string path = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\ReportingApi\izendadb.config";
                _sb.Append("{\"ServerTypeId\":\"572bd576-8c92-4901-ab2a-b16e38144813\",\"ServerTypeName\":\"[MSSQL] SQLServer\", \"ConnectionString\":\"Server=");
                _sb.Append(server);
                _sb.Append(";Database=");
                _sb.Append(dataSource);
                _sb.Append(";User Id=");
                _sb.Append(userId);
                _sb.Append(";Password=");
                _sb.Append(pwd);
                _sb.Append(";\", \"ConnectionId\":\"00000000-0000-0000-0000-000000000000\"}");


                TextWriter objSW = new StreamWriter(path);
                objSW.Write(_sb.ToString());
                objSW.Flush();
                objSW.Close();
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private long UpdateStarterApixml(string userId, string pwd, string dataSource, string server)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sb = new StringBuilder();
            String Name = "DefaultConnection";

            try
            {

                string path = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\ReportingStarterApi\Web.config";

                _sb.Append("server=");
                _sb.Append(server);

                _sb.Append(";Database=");
                _sb.Append(dataSource);

                _sb.Append(";User Id=");
                _sb.Append(userId);

                _sb.Append(";Password=");
                _sb.Append(pwd);
                _sb.Append(";");

                XmlDocument doc = new XmlDocument();
                doc.Load(path);
                XmlNodeList list = doc.DocumentElement.SelectNodes(string.Format("connectionStrings/add[@name='{0}']", Name));
                XmlNode node = default(XmlNode);
                node = list[0];
                node.Attributes["connectionString"].Value = _sb.ToString();
                doc.Save(path);

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        public AtParWebApiResponse<string> UpdateQrySrcVisibility()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long status = -1;
            var response = new AtParWebApiResponse<string>();
            List<MT_ATPAR_REPORTING_TABLES_LIST> rptTablesLst = new List<MT_ATPAR_REPORTING_TABLES_LIST>();
            try
            {
                rptTablesLst = _repo.GetQuerySourcesList();

                if (rptTablesLst.Count > 0)
                {
                    status = _repo.UpdateQuerySource(rptTablesLst);
                }

                if (status == AtparStatusCodes.ATPAR_OK)
                {
                    status = UpdateLookUps();
                }
                

                if (status == AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParSuccess();
                }
                else
                {
                    response.AtParNotOK(status, _commonRepo, _log);
                }
                
                return response;

            }
            catch (Exception ex)
            {

                response.AtParException(ex, _commonRepo, _log);
            }
            return response;
        }

        private long UpdateLookUps()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long status = -1;
            string schema = string.Empty;

            try
            {
                schema = _repo.GetAtParSchema();

                if (!string.IsNullOrEmpty(schema))
                {
                    status = _repo.UpdateLookUps(schema);
                }

                return status;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }


        }
    }
}

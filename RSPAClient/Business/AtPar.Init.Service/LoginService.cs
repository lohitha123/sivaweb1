using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Net;
using AtParEncryptionServices;
using System.DirectoryServices.Protocols;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using System.Xml.Linq;
using System.Web;
using System.Xml;
using AtPar_BusinessRules;

namespace AtPar.Init.Service
{
    public class LoginService : ILoginService
    {

        ILoginRepository _loginRep;
        ICommonRepository _commonRepo;
        private ILog _log;

        public LoginService(ILoginRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _loginRep = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(LoginService));
        }


        #region IsValidUser
        /// <summary>
        /// To check the user is valid or not
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_USER> IsValidUser(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int cnt = -1;

            var response = new AtParWebApiResponse<MT_ATPAR_USER>();

            try
            {

                cnt = _loginRep.IsValidUser(userID);

                if (cnt == 0)
                {
                    response.DataVariable = false;

                }
                else
                {
                    response.DataVariable = true;

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

        #region GetAccessToken
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="password"></param>
        /// <param name="loginType"></param>
        /// <param name="dateTime"></param>
        /// <param name="deviceID"></param>
        /// <param name="accessToken"></param>
        /// <param name="pSSOByPass"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL> GetAccessToken(string userID,
                                                                  string password, int loginType,
                                                                  string dateTime, string deviceID,
                                                                  string accessToken, bool SSOByPass,
                                                                  string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long statusCode = -1;
            string ldapUser = AtParWebEnums.YesNo_Enum.N.ToString();
            password = password.Replace(" ", "+");

            if (string.IsNullOrEmpty(accessToken))
            {
                accessToken = string.Empty;
            }
            MT_ATPAR_USER_PROFILE_APP_ACL_ORG chkUserLogin = new MT_ATPAR_USER_PROFILE_APP_ACL_ORG();

            var response = new AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL>();

            try
            {
                if (loginType == (int)AtParWebEnums.ClientType.HHT | loginType == (int)AtParWebEnums.ClientType.AHHT | loginType == (int)AtParWebEnums.ClientType.IHHT | loginType == (int)AtParWebEnums.ClientType.WHHT)
                {
                    SSOByPass = false;

                    long status = ValidateSystemAndDevice(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID]);

                    if (status != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(status, _commonRepo, _log);
                        return response;
                    }
                }

                //required data checks

                if (userID.Length == 0 | dateTime.Length == 0 | deviceID.Length == 0)
                {
                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + " Required parameters missing, aborting token generation"); }

                    response.AtParNotOK(AtparStatusCodes.E_INVALIDPARAMETER, _commonRepo, _log);
                    return response;
                }


                AtParEncryptionServices.AtParEncryptionServices encServices = new AtParEncryptionServices.AtParEncryptionServices();


                string decryptedPassword = string.Empty;

                if (!string.IsNullOrEmpty(password))
                {
                    //decryptedPassword = encServices.DecryptString(pPassword, (short)AtParEncryptionServices.AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase);
                    decryptedPassword = AESEncryptDecryptService.DecryptStringAES(password);
                }

                //string passHash = "a96173fa8a3437fda9b907e32cf3ada868d57a194869d3d5e3b3f2bb64f8ed04";

                string passHash = CSHA256.ComputeHash(decryptedPassword + userID);

                chkUserLogin = _loginRep.CheckUserLogin(userID, passHash.ToString(), loginType,
                       dateTime, deviceID, accessToken, SSOByPass);

                statusCode = chkUserLogin.SERVER_STATUS_CODE;

             

                switch (statusCode)
                {
                    case AtparStatusCodes.AUTHENTICATE_AGAINST_LDAP:
                        ldapUser = AtParWebEnums.YesNo_Enum.Y.ToString();

                        statusCode = AuthenticateAgainstLDAP(userID, chkUserLogin.USERDN, decryptedPassword, deviceTokenEntry);

                        if (statusCode == AtparStatusCodes.ATPAR_OK)
                        {
                            break; // TODO: might not be correct. Was : Exit Select
                        }
                        else
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + " Failed to Authenticate against LDAP");

                            _loginRep.SaveLoginAttempts(userID, deviceID, accessToken, statusCode.ToString(), string.Empty);

                            response.AtParNotOK(AtparStatusCodes.ATPAR_E_NOSUCHUSER, _commonRepo, _log);
                            return response;
                        }
                    case AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL:

                        response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, _commonRepo, _log);
                        return response;

                    case AtparStatusCodes.ATPAR_OK:
                        break; // TODO: might not be correct. Was : Exit Select

                    default:
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + " CheckUserLogin Failed (" + statusCode + "), aborting token generation");

                        _loginRep.SaveLoginAttempts(userID, deviceID, accessToken, statusCode.ToString(), string.Empty);

                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                }

                // AtParEncryptionServices _encServices = new AtParEncryptionServices();

                string currentAccessToken = encServices.HashString(userID + passHash + dateTime, (short)AtParEncryptionServices.AtParEncryptionServices.SaltTypes.TokenPasswordHash);

                DateTime expiryDT = System.DateTime.UtcNow.AddMinutes((double)chkUserLogin.TOKEN_EXPIRY_PERIOD);

                DateTime requestDT = System.DateTime.UtcNow;


                StringBuilder accessTokenXML = new StringBuilder();

                accessTokenXML = GenerateAccessToken(currentAccessToken, userID, passHash.ToString(), chkUserLogin.ORG_GROUP_ID, deviceID, expiryDT, requestDT, chkUserLogin.PROFILE_ID, ldapUser, (int)chkUserLogin.IDLE_TIME, accessToken, loginType);


                if (accessTokenXML.ToString().Length == 0)
                {
                    _loginRep.SaveLoginAttempts(userID, deviceID, accessToken, statusCode.ToString(), string.Empty);

                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_TOKENSAVEFAIL, _commonRepo, _log);
                }

                _loginRep.SaveLoginAttempts(userID, deviceID, accessToken, statusCode.ToString(), string.Empty);

                response.DataVariable = accessTokenXML.ToString();

                response.AtParSuccess();

                GetConfigData();

                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
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

        private long ValidateSystemAndDevice(string systemID, string deviceID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                int cntValidateSystem = 0;
                int cntAllowRegDevices = 0;
                int cntValidateDevice = 0;
                cntValidateSystem = _loginRep.ValidateSystem(systemID);

                if (cntValidateSystem == 0)
                {
                    return AtparStatusCodes.ATPAR_E_SYSTEMMISMATCH;
                }

                cntAllowRegDevices = _loginRep.AllowRegDevices();

                if (cntAllowRegDevices == 0)
                {
                    return AtparStatusCodes.ATPAR_OK;
                }

                cntValidateDevice = _loginRep.ValidateDevice(systemID, deviceID);

                if (cntValidateDevice == 0)
                {
                    return AtparStatusCodes.E_INVALIDDEVICE;
                }


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

            return AtparStatusCodes.ATPAR_OK;
        }


        private StringBuilder GenerateAccessToken(string currentAccessToken,
                                           string userName, string passHash,
                                           string orgGroupID, string deviceID,
                                           DateTime expiryDateTime, DateTime requestDateTime,
                                           string profileID, string ldapUser, int idleTime,
                                           string oldAccessToken, int loginType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<int> lstAppIDs = null;

            lstAppIDs = _loginRep.GetProfileApps(profileID, loginType);

            string strAppXML = string.Empty;
            try
            {
                if ((lstAppIDs != null))
                {
                    if (lstAppIDs.Count > 0)
                    {
                        //20 is hard coded need to changed when new apps are added
                        for (int intAppCnt = 2; intAppCnt <= 20; intAppCnt++)
                        {
                            strAppXML = strAppXML + "<APP" + intAppCnt + ">";
                            foreach (int appID in lstAppIDs)
                            {
                                if (intAppCnt == Convert.ToInt32(appID))
                                {
                                    strAppXML = strAppXML + "1";
                                }
                            }
                            strAppXML = strAppXML + "</APP" + intAppCnt + ">";
                        }
                    }
                }

                StringBuilder accessTokenXML = new StringBuilder();

                accessTokenXML.Append("<ROOT><ACCESSTOKEN>" + currentAccessToken);
                accessTokenXML.Append("</ACCESSTOKEN> <TOKENEXPIRYTIME>" + expiryDateTime);
                accessTokenXML.Append("</TOKENEXPIRYTIME> <PASSHASH>" + passHash);
                accessTokenXML.Append("</PASSHASH><IDLETIME>" + idleTime);
                accessTokenXML.Append("</IDLETIME><PROFILE_ID>" + profileID);
                accessTokenXML.Append("</PROFILE_ID><ORG_GRP_ID>" + orgGroupID);
                accessTokenXML.Append("</ORG_GRP_ID><LDAP_USER>" + ldapUser);
                accessTokenXML.Append("</LDAP_USER>" + strAppXML + "</ROOT>");

                _loginRep.SaveAccessToken(currentAccessToken, userName, passHash, orgGroupID, deviceID, expiryDateTime, requestDateTime, ldapUser, idleTime, oldAccessToken, profileID);

                return accessTokenXML;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        private long AuthenticateAgainstLDAP(string userName,
                                             string userdn, string passHash,
                                             string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strAuthType = string.Empty;
            string strAcntStatusRuleSet = string.Empty;
            string strProtocol = string.Empty;
            string strServerName = string.Empty;
            string strBaseDn = string.Empty;
            string strLdapUserID = string.Empty;
            string accountStatusAttrib = string.Empty;
            string accountStatusAttribValue = string.Empty;
            string strLdapConnectString = string.Empty;
            string ldapSearchFilter = string.Empty;
            long statusCode = 0;

            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

            LdapConnection LC;
            LdapDirectoryIdentifier DI;
            NetworkCredential NC;

            try
            {
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.AUTHTYPE.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.ACNTSTATRULE.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.BASEDN.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.USERID.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                strAuthType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.AUTHTYPE.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                strAcntStatusRuleSet = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.ACNTSTATRULE.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (strAcntStatusRuleSet.Length > 0)
                {
                    int EQPos = strAcntStatusRuleSet.IndexOf("=", 0);
                    accountStatusAttrib = strAcntStatusRuleSet.Substring(0, EQPos - 1);
                    accountStatusAttribValue = strAcntStatusRuleSet.Substring(EQPos);
                }

                strProtocol = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                strServerName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                strBaseDn = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.BASEDN.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                strLdapUserID = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.USERID.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (strProtocol == "LDAP" | strProtocol == "LDAPS")
                {
                    strProtocol = "LDAP";
                }

                strLdapConnectString = strProtocol + "://" + strServerName + (strBaseDn.Length > 0 ? "/" : "") + strBaseDn;

                ldapSearchFilter = strLdapUserID + "=" + userName;

                //Here we didn't write switch functionality because it doesn't any where

                DI = new LdapDirectoryIdentifier(strServerName);
                NC = new NetworkCredential(userdn, passHash);
                LC = new LdapConnection(DI, NC, AuthType.Basic);
                LC.SessionOptions.ProtocolVersion = 3;

                LC.Bind();

                if (accountStatusAttrib.Length != 0)
                {
                    SearchRequest searchreq = new SearchRequest(strBaseDn, ldapSearchFilter, SearchScope.Subtree);
                    SearchResponse searchresp;
                    SearchResultEntryCollection searchcoll;
                    SearchResultEntry searchentry;

                    searchresp = (SearchResponse)LC.SendRequest(searchreq);

                    if(searchresp != null)
                    {
                        if (searchresp.Entries.Count > 0)
                        {
                            searchcoll = searchresp.Entries;

                            foreach (var item in searchcoll)
                            {
                                searchentry = (SearchResultEntry)item;

                                if (searchentry.Attributes.Contains(accountStatusAttrib))
                                {
                                    DirectoryAttribute attr = searchentry.Attributes[accountStatusAttrib];

                                    if (attr[0].ToString() != accountStatusAttribValue)
                                    {
                                        statusCode = AtparStatusCodes.E_ACCOUNTDISABLED;
                                    }
                                    else
                                    {
                                        statusCode = AtparStatusCodes.ATPAR_OK;
                                    }

                                }
                            }
                        }
                        else
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + " No Attributes were returned for this user "); }
                            return AtparStatusCodes.E_LOGIN_FAILED;
                        }
                    }
                    
                }



            }
            catch (DirectoryOperationException dex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + dex.ToString()); }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_LOGIN_FAILED;
            }

            return statusCode;
        }

        #endregion

        #region GetIpAddress
        public AtParWebApiResponse<string> GetIpAddress()
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            var response = new AtParWebApiResponse<string>();
            try
            {
                // var ipAddress = Dns.GetHostEntry(Dns.GetHostName());
                //  var ip = ipAddress.AddressList[1];
                //  response.DataVariable = ip.ToString();
                response.DataVariable = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
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

        #region IsSSOEnabled

        public AtParWebApiResponse<Dictionary<string,string>> IsSSOEnabled()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string ssoEnabled = string.Empty;
            string ssoVariable = string.Empty;
            string ssoCookie = string.Empty;
            string ssoRedirect = string.Empty;
            bool isEnabled;
            AtParWebApiResponse<Dictionary<string, string>> response = new AtParWebApiResponse<Dictionary<string, string>>();
            Dictionary<string, object> dicOutput = new Dictionary<string, object>();

            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            List<string> lstParameters = new List<string>();

            lstParameters.Add(AtParWebEnums.SSO.SSO_ENABLED.ToString());
            lstParameters.Add(AtParWebEnums.SSO.SSO_VARIABLE.ToString());
            lstParameters.Add(AtParWebEnums.SSO.SSO_COOKIE_NAME.ToString());
            lstParameters.Add(AtParWebEnums.SSO.SSO_LOGOUT_PAGE.ToString());

            lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
            try
            {

                ssoEnabled = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.SSO.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.SSO.SSO_ENABLED.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ssoVariable = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.SSO.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.SSO.SSO_VARIABLE.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ssoCookie = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.SSO.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.SSO.SSO_COOKIE_NAME.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ssoRedirect = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.SSO.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.SSO.SSO_LOGOUT_PAGE.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();



                if (ssoEnabled == "True")
                {
                    isEnabled = true;
                    dicOutput.Add("isEnabled", isEnabled);
                    dicOutput.Add("SSOVariable", ssoVariable);
                    dicOutput.Add("SSOCookie", ssoCookie);
                    dicOutput.Add("SSORedirect", ssoRedirect);
                    response.DataDictionary = dicOutput;

                }
                else
                {
                    isEnabled = false;
                    dicOutput.Add("isEnabled", isEnabled);
                    dicOutput.Add("SSOVariable", string.Empty);
                    response.DataDictionary = dicOutput;
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

        public AtParWebApiResponse<string> ValidateSamlResponse(string SSOUserIdVariable)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Encoding defaultEncoding = System.Text.Encoding.UTF8;
            bool isEncrypted = false;
            string strSSOUser = string.Empty;
            string notOnorBefore = string.Empty;
            AtParWebApiResponse<string> response = new AtParWebApiResponse<string>();

            try
            {
                XmlDocument doc = GetDecodedSamlResponse(defaultEncoding);
                XmlElement assertion = GetAssertion(doc.DocumentElement, ref isEncrypted);
                string status = GetStatusElement(doc);


                if (!status.Contains(AtParDefns.Success))
                {
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    response.StatusMessage = string.Format(" Unable to validate SAML message!");
                    return response;
                }


                XmlNodeList SubjectList = assertion.GetElementsByTagName("SubjectConfirmationData", AtParDefns.ASSERTION);
                if (SubjectList != null)
                {
                    foreach (XmlNode curr in SubjectList)
                    {
                        XmlElement Attributelst = (XmlElement)curr;
                        foreach (var attribute in Attributelst.Attributes)
                        {
                            if (((System.Xml.XmlAttribute)attribute).Name == "NotOnOrAfter")
                            {
                                notOnorBefore = ((System.Xml.XmlAttribute)attribute).Value;
                            }
                        }
                    }
                }


                if (!string.IsNullOrEmpty(notOnorBefore))
                {
                    if (DateTime.Now.ToUniversalTime() > DateTime.Parse(notOnorBefore).ToUniversalTime())
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        response.StatusMessage = string.Format(" SAML Assertion is no longer valid.");
                        return response;
                    }
                }


                //Dim Issuer As String = GetIssuer(assertion)

                XmlNodeList list = assertion.GetElementsByTagName("Attribute", AtParDefns.ASSERTION);
                if (list != null)
                {
                    foreach (XmlNode curr in list)
                    {
                        XmlElement Attributelst = (XmlElement)curr;
                        foreach (var attribute in Attributelst.Attributes)
                        {
                            if (((System.Xml.XmlAttribute)attribute).Value == SSOUserIdVariable)
                            {
                                strSSOUser = curr.InnerText.Trim();
                                response.DataVariable = strSSOUser;
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
        private XmlDocument GetDecodedSamlResponse(Encoding encoding)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            XmlDocument doc = new XmlDocument();
            try
            {
                string base64 = HttpContext.Current.Request.Params["SAMLResponse"];
                // If log.IsDebugEnabled Then log.Debug("SAMLResponse" & base64)
                doc.PreserveWhitespace = true;
                string samlResponse = encoding.GetString(Convert.FromBase64String(base64));
                doc.LoadXml(samlResponse);
                return doc;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        private string GetAssertionValue(XmlElement assertion, string PAssertionName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string result = string.Empty;

            try
            {
                XmlNodeList list = assertion.GetElementsByTagName(PAssertionName, AtParDefns.ASSERTION);
                if (list.Count > 0)
                {
                    XmlElement issuer = (XmlElement)list[0];
                    result = issuer.InnerText;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }
        private XmlElement GetAssertion(XmlElement el, ref bool isEncrypted)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                XmlNodeList assertionList = el.GetElementsByTagName("Assertion", AtParDefns.ASSERTION);

                if (assertionList.Count == 1)
                {
                    isEncrypted = false;
                    return (XmlElement)assertionList[0];
                }

                isEncrypted = false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return null;
        }

        private string GetIssuer(XmlElement assertion)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string result = string.Empty;

            try
            {
                XmlNodeList list = assertion.GetElementsByTagName("Issuer", AtParDefns.ASSERTION);
                if (list.Count > 0)
                {
                    XmlElement issuer = (XmlElement)list[0];
                    result = issuer.InnerText;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        private string GetStatusElement(XmlDocument doc)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string result = string.Empty;
            try
            {
                XmlNodeList list = doc.GetElementsByTagName("Status", AtParDefns.PROTOCOL);

                if (list.Count > 0)
                {
                    XmlElement issuer = (XmlElement)list[0];
                    result = issuer.InnerXml;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        #endregion

        #region GetSAMLResponse
        public AtParWebApiResponse<Dictionary<string, object>> GetSAMLResponse(string SSOVariable)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            AtParWebApiResponse<Dictionary<string, object>> response = new AtParWebApiResponse<Dictionary<string, object>>();
            Dictionary<string, object> dicOutput = new Dictionary<string, object>();

            try
            {
                string samplResponse = HttpContext.Current.Request.Params["SAMLResponse"];
                long inputLenth = HttpContext.Current.Request.InputStream.Length;
                string strSSOUser = HttpContext.Current.Request.ServerVariables[SSOVariable];
                dicOutput.Add("samplResponse", samplResponse);
                dicOutput.Add("strSSOUser", strSSOUser);
                dicOutput.Add("inputLenth", inputLenth);
                response.DataDictionary = dicOutput;
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

        public AtParWebApiResponse<string> UpdateHosting(string hostName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<string>();
            long statusCode = -1;

            try
            {
                statusCode = _loginRep.UpdateHostName(hostName);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
               else if (statusCode==AtparStatusCodes.ATPAR_OK)
                {
                    statusCode= _loginRep.UpdateCustomFunction();
                    
                }

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                else if (statusCode == AtparStatusCodes.ATPAR_OK)
                {
                    statusCode = _loginRep.UpdateHostStatus();
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public AtParWebApiResponse<string> InsertIzendaUser(string UserId, string SystemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<string>();
            long statusCode = -1;

            try
            {
                if (_loginRep.IsServerUser(UserId))
                {
                    if (UserId.ToUpper() != "ADMIN")
                    {
                        statusCode = _loginRep.InsertingReportingUser(SystemId, UserId);
                    }

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                    else
                    {
                        response.AtParSuccess();
                        return response;
                    }

                }
                else
                {
                    response.AtParSuccess();
                    return response;
                }
                
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

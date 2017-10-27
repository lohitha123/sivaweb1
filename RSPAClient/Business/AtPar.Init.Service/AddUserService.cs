using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Service
{
    public class AddUserService : IAddUserService
    {
        IAddUserRepository _userRep;
        ICommonRepository _commonRepo;
        private ILog _log;

        public AddUserService(IAddUserRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _userRep = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(AddUserService));
        }

        #region CheckUser
        /// <summary>
        /// To check user
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_USER> CheckUser(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int cnt = -1;

            var response = new AtParWebApiResponse<MT_ATPAR_USER>();

            try
            {
                cnt = _userRep.CheckUser(userID);
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

        #region CheckProfileAppACL
        /// <summary>
        /// To check profileAppACL
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <param name="accessType"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_PROFILE_APP_ACL> CheckProfileAppACL(string userID, string profileID, int accessType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int cnt = -1;

            var response = new AtParWebApiResponse<MT_ATPAR_PROFILE_APP_ACL>();

            try
            {
                cnt = _userRep.CheckProfileAppACL(userID, profileID, accessType);
                if (cnt > 0)
                {
                    response.DataVariable = true;
                }
                else
                {
                    response.DataVariable = false;
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

        #region AddUser
        /// <summary>
        /// To add user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> AddUser(VM_MT_ATPAR_USER_ADD user)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string strEnterpriseSystem = GetEnterpriseSystem();
            var response = new AtParWebApiResponse<VM_MT_ATPAR_USER_ADD>();
          
            try
            {
                long StatusCode = _userRep.AddUser(user, strEnterpriseSystem);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                if (_userRep.IsServerProfile(user.PROFILE_ID))
                {
                    StatusCode = _userRep.InsertRegReportUser(user);
                }

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

        #region SaveLdapUsers
        /// <summary>
        /// To save ldapUsers
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="sessionTime"></param>
        /// <param name="idleTime"></param>
        /// <param name="orgGrpId"></param>
        /// <param name="profileID"></param>
        /// <param name="lstLdapUsers"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_MT_ATPAR_USER_ACL_ADD> SaveLdapUsers(string userID, string sessionTime, string idleTime, string orgGrpId, string profileID, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            string strEnterpriseSystem = GetEnterpriseSystem();
            var response = new AtParWebApiResponse<VM_MT_ATPAR_USER_ACL_ADD>();

            try
            {
                long StatusCode = _userRep.SaveLdapUsers(userID, sessionTime, idleTime, orgGrpId, profileID, lstLdapUsers, strEnterpriseSystem);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                if (_userRep.IsServerProfile(profileID))
                {
                    StatusCode = _userRep.InsertLadapReportUser(lstLdapUsers, orgGrpId);
                }

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

        #region GetEnterpriseSystem
        /// <summary>
        /// To get an enterprise system
        /// </summary>
        /// <returns></returns>
        private string GetEnterpriseSystem()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string strEnterpriseSystem = string.Empty;
            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            try
            {

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                strEnterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                return strEnterpriseSystem;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        #endregion

        #region PopulateConfigData
        public AtParWebApiResponse<AtParKeyValuePair> PopulateConfigData()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string Protocol = string.Empty;
            string ServerName = string.Empty;
            string SearchFilter = string.Empty;
            string UserIDFilter = string.Empty;
            string FirstNameFilter = string.Empty;
            string LastNameFilter = string.Empty;
            string ErrorPath = string.Empty;
            Dictionary<string, object> ConfigData = new Dictionary<string, object>();

            var response = new AtParWebApiResponse<AtParKeyValuePair>();
            List<string> lstParameters = new List<string>();
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            try
            {
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.USERID.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.LASTNAME.ToString());
                lstParameters.Add(AtParWebEnums.SYSTEMPARAMETERS.ERRORLOGPATH.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                Protocol = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ServerName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                SearchFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                UserIDFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.USERID.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                FirstNameFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                LastNameFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.LASTNAME.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                ErrorPath = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.SYSTEMPARAMETERS.ERRORLOGPATH.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                ConfigData.Add("strProtocol", Protocol);
                ConfigData.Add("strServerName", ServerName);
                ConfigData.Add("strSearchFilter", SearchFilter);
                ConfigData.Add("strUserIDFilter", UserIDFilter);
                ConfigData.Add("strFirstNameFilter", FirstNameFilter);
                ConfigData.Add("strLastNameFilter", LastNameFilter);
                ConfigData.Add("strErrorPath", ErrorPath);

                response.DataDictionary = ConfigData;
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

        #region GetLdapUsers
        /// <summary>
        /// To get Ldap users
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="strSearchFilter"></param>
        /// <param name="strEntryLimit"></param>
        /// <returns></returns>
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
                if ((protocol == "LDAP") || (protocol == "LDAPS"))
                {
                    protocol = "LDAP";
                }
                if (string.IsNullOrEmpty(protocol) ||string.IsNullOrEmpty(serverName) || string.IsNullOrEmpty(searchFilter))
                {
                    response.AtParNotOK(AtparStatusCodes.E_REMOTEERROR, _commonRepo, _log);
                    return response;

                }
                int nEntryLimit = 0;

                if (!string.IsNullOrEmpty(strEntryLimit))
                {
                    nEntryLimit = Convert.ToInt32(strEntryLimit);
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
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_REMOTEERROR);
                    return response;
                }

                if(oResults == null)
                {
                    mCount = 0;
                }
                else
                {
                    mCount = oResults.Count;
                }
               
                string _serverPath = protocol + "://" + serverName + "/";
                MT_ATPAR_USER objUser = null ;
                List<MT_ATPAR_USER> lstUsers = new List<MT_ATPAR_USER>();
                if (mCount > 0)
                {
                    foreach (SearchResult oResult in oResults)
                    {
                        objUser = new MT_ATPAR_USER();

                        DirectoryEntry currentEntry = oResult.GetDirectoryEntry();

                        objUser.USER_ID = currentEntry.Properties[ldapUserID].Value == null ? string.Empty : currentEntry.Properties[ldapUserID].Value.ToString();
                                                                      
                        objUser.FIRST_NAME = currentEntry.Properties[ldapFirstName].Value == null ? string.Empty : currentEntry.Properties[ldapFirstName].Value.ToString();

                        objUser.LAST_NAME = currentEntry.Properties[ldapLastName].Value == null ? string.Empty : currentEntry.Properties[ldapLastName].Value.ToString();

                        objUser.MIDDLE_INITIAL = currentEntry.Properties[ldapMInitial].Value == null ? string.Empty : currentEntry.Properties[ldapMInitial].Value.ToString();

                        objUser.EMAIL_ID = currentEntry.Properties[ldapEmailID].Value == null ? string.Empty : currentEntry.Properties[ldapEmailID].Value.ToString();

                        objUser.PHONE1 = currentEntry.Properties[ldapMobile].Value == null ? string.Empty : currentEntry.Properties[ldapMobile].Value.ToString();

                        objUser.FAX = currentEntry.Properties[ldapFax].Value == null ? string.Empty : currentEntry.Properties[ldapFax].Value.ToString();
                                               
                        objUser.USERDN = currentEntry.Path.Substring(_serverPath.Length);

                        lstUsers.Add(objUser);
                        
                    }
                    
                }
               
                //System.Diagnostics.Stopwatch stopwatch2 = new System.Diagnostics.Stopwatch();
                //stopwatch2.Start();

                if (lstUsers.Count > 0)
                {
                    response.DataList = _userRep.GetLdapUsers(lstUsers);
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
                //stopwatch2.Stop();

                //var tmr2 = stopwatch2.Elapsed;

                return response;

            }
            catch (ArgumentException auex)
            {
                response.AtParException(auex, _commonRepo, _log, AtparStatusCodes.E_SEARCH_INVALID);
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

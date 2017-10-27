using System;
using AtPar.Common;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Init;
using AtPar.POCOEntities;
using System.Text;
using System.Data;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using System.Collections.Generic;
using System.Linq;
using System.DirectoryServices;
using System.Collections;
using AtParEncryptionServices;

namespace AtPar.Init.Service
{
    public class ManageUsersService : IManageUsersService
    {
        IManageUsersRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ManageUsersService(IManageUsersRepository manageUserRepo, ILog log, ICommonRepository commonRepository)
        {
            _repo = manageUserRepo;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ManageUsersService));
        }

        public AtParWebApiResponse<MT_ATPAR_PROFILE_MENU> IsMenuAssigned(string userID, string profileID, string chkMenuName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_PROFILE_MENU>();

            try
            {
                response.DataVariable = _repo.IsMenuAssigned(userID, profileID, chkMenuName);

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }


        public AtParWebApiResponse<VM_MT_ATPAR_USER> GetManageUsers(string userID, string orgId, string profileId, string searchId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_ATPAR_USER>();

            try
            {
                response.DataList = _repo.GetManageUsers(userID, orgId, profileId, searchId);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);

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

        public AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL_ORG> GetUsers(string userID, string orgId, string profileId, string searchId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL_ORG>();

            try
            {
                response.DataList = _repo.GetUsers(userID, orgId, profileId, searchId);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        public AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> UpdateUser(VM_MT_ATPAR_USER_ADD user)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            //  string strEnterpriseSystem = GetEnterpriseSystem();
            var response = new AtParWebApiResponse<VM_MT_ATPAR_USER_ADD>();

            try
            {
                string enterpriseSystem = string.Empty;
                List<string> lstParameters = new List<string>();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                enterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                long StatusCode = _repo.UpdateUser(user, enterpriseSystem);

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

        public AtParWebApiResponse<VM_MT_ATPAR_USER> GetUserDetails(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_MT_ATPAR_USER>();

            try
            {

                long StatusCode = _repo.GetUserDetails(userID);

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

        public AtParWebApiResponse<MT_ATPAR_USER> RefreshUserDN(string userId, string userFname, string userLname)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_USER>();

            try
            {
                string ldapServerName = string.Empty;
                string ldapProtocol = string.Empty;
                string ldapAuthType = string.Empty;
                string ldapBaseDn = string.Empty;
                string ldapUserName = string.Empty;
                string ldapPassword = string.Empty;
                string ldapSearchScope = string.Empty;
                string ldapEntryLimit = string.Empty;
                string ldapSearchFilter = string.Empty;


                string ldapUserID = string.Empty;
                string ldapUserDn = string.Empty;
                string ldapFirstName = string.Empty;
                string ldapLastName = string.Empty;
                string ldapMinitial = string.Empty;
                string ldapEmailID = string.Empty;
                string ldapMobile = string.Empty;
                string ldapFax = string.Empty;
                string entryLimit = string.Empty;


                List<string> lstParameters = new List<string>();

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.AUTHTYPE.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.BASEDN.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.USERNAME.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.PASSWORD.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SEARCHSCOPE.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.ENTRYLIMIT.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString());


                lstParameters.Add(AtParWebEnums.LDAPCONFIG.USERID.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.LASTNAME.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.MIDDLEINITIAL.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.EMAILID.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.PHONE.ToString());

                lstParameters.Add(AtParWebEnums.LDAPCONFIG.FAX.ToString());


                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                ldapServerName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToUpper();

                ldapProtocol = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToUpper();

                ldapAuthType = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.AUTHTYPE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToUpper();

                ldapBaseDn = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.BASEDN.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToUpper();

                ldapUserName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.USERNAME.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToUpper();

                ldapPassword = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.PASSWORD.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToUpper();

                ldapSearchScope = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SEARCHSCOPE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToUpper();

                ldapEntryLimit = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.ENTRYLIMIT.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToUpper();

                ldapSearchFilter = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToUpper();

                ldapUserID = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.USERID.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                ldapFirstName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                ldapLastName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.LASTNAME.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                ldapMinitial = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.MIDDLEINITIAL.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                ldapEmailID = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.EMAILID.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                ldapMobile = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.PHONE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                ldapFax = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.FAX.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                int mCount = 0;

                var authType = AuthenticationTypes.None;

                switch (ldapAuthType)
                {
                    case "NONE":
                        authType = AuthenticationTypes.None;
                        break; // TODO: might not be correct. Was : Exit Select

                    case "ANONYMOUS":
                        authType = AuthenticationTypes.Anonymous;
                        break; // TODO: might not be correct. Was : Exit Select

                    case "SECURE":
                        authType = AuthenticationTypes.Secure;
                        break; // TODO: might not be correct. Was : Exit Select

                    case "SECURESOCKETSLAYER":
                        authType = AuthenticationTypes.SecureSocketsLayer;
                        break; // TODO: might not be correct. Was : Exit Select

                    default:
                        //default
                        authType = AuthenticationTypes.Anonymous;
                        break;
                }

                var searchScope = SearchScope.Base;
                switch (ldapSearchScope)
                {
                    case "BASE":
                        searchScope = SearchScope.Base;
                        break; // TODO: might not be correct. Was : Exit Select

                    case "ONELEVEL":
                        searchScope = SearchScope.OneLevel;
                        break; // TODO: might not be correct. Was : Exit Select

                    case "SUBTREE":
                        searchScope = SearchScope.Subtree;
                        break; // TODO: might not be correct. Was : Exit Select

                    default:
                        //default
                        searchScope = SearchScope.Base;
                        break;
                }

                string ldapConnectString = ldapProtocol + "://" + ldapServerName + (ldapBaseDn.Length > 0 ? "/" : string.Empty) + ldapBaseDn;

                DirectorySearcher searcher = new DirectorySearcher();
                SearchResultCollection results = default(SearchResultCollection);
                StringBuilder sb = new StringBuilder();
                ArrayList arrLst = new ArrayList();
                string pStrSearchFilter = string.Empty;
                string strSearchFilter = string.Empty;

                if (!((userId).Trim() == string.Empty))
                {
                    arrLst.Add(ldapUserID + "=" + userId);
                }

                switch (arrLst.Count)
                {
                    case 1:
                        sb.Append(arrLst[0]);
                        break;
                    case 2:
                        sb.Append(arrLst[0] + "," + arrLst[0]);
                        break;
                    case 3:
                        sb.Append(arrLst[0] + "," + arrLst[0] + "," + arrLst[0]);
                        break;
                }

                pStrSearchFilter = sb.ToString();

                if (!string.IsNullOrEmpty(pStrSearchFilter))
                {
                    if (pStrSearchFilter.Contains(","))
                    {
                        pStrSearchFilter = pStrSearchFilter.Replace(",", ")(");
                        strSearchFilter = "(&(" + pStrSearchFilter + ")(" + ldapSearchFilter + "))";
                    }
                    else
                    {
                        strSearchFilter = "(&(" + pStrSearchFilter + ")(" + ldapSearchFilter + "))";
                    }
                }
                else
                {
                    strSearchFilter = ldapSearchFilter;
                }

                // ArrayList resultFields = new ArrayList();
                List<string> resultFields = new List<string>();

                if (!string.IsNullOrEmpty(ldapUserID))
                    resultFields.Add(ldapUserID);
                if (!string.IsNullOrEmpty(ldapUserDn))
                    resultFields.Add(ldapUserDn);
                if (!string.IsNullOrEmpty(ldapFirstName))
                    resultFields.Add(AtParExtensions.CleanString(ldapFirstName));
                if (!string.IsNullOrEmpty(ldapLastName))
                    resultFields.Add(AtParExtensions.CleanString(ldapLastName));
                if (!string.IsNullOrEmpty(ldapMinitial))
                    resultFields.Add(ldapMinitial);
                if (!string.IsNullOrEmpty(ldapEmailID))
                    resultFields.Add(ldapEmailID);
                if (!string.IsNullOrEmpty(ldapMobile))
                    resultFields.Add(ldapMobile);
                if (!string.IsNullOrEmpty(ldapFax))
                    resultFields.Add(ldapFax);

                string[] strResultsFields = new string[resultFields.ToArray().Length];

                resultFields.CopyTo(strResultsFields, 0);


                var _with1 = searcher;
                string strHashVal = CSHA256.ComputeHash(ldapPassword);
                Encryption enc = new Encryption();
                _with1.SearchRoot = new DirectoryEntry(ldapConnectString, ldapUserName, enc.Decrypt(ldapPassword), authType);
                _with1.SizeLimit = Convert.ToInt32(ldapEntryLimit);
                _with1.SearchScope = searchScope;
                _with1.PropertiesToLoad.AddRange(strResultsFields);
                _with1.Filter = strSearchFilter;
                results = _with1.FindAll();

                mCount = results.Count;
                if (mCount > 0)
                {

                    string _serverPath = ldapProtocol + "://" + ldapServerName + "/";
                    DirectoryEntry currentEntry = results[0].GetDirectoryEntry(); //results.Item[0].GetDirectoryEntry;
                    string pStrUserDn = currentEntry.Path.Substring(_serverPath.Length);
                    List<MT_ATPAR_USER> listUser = new List<MT_ATPAR_USER>();
                    foreach (var oResult in results)
                    {
                        MT_ATPAR_USER user = new MT_ATPAR_USER();
                        user.USER_ID = currentEntry.Properties[ldapUserID].Value.ToString();
                        user.FIRST_NAME = currentEntry.Properties[AtParExtensions.CleanString(ldapFirstName)].Value.ToString();
                        user.LAST_NAME = currentEntry.Properties[AtParExtensions.CleanString(ldapLastName)].Value.ToString();
                        if (currentEntry.Properties[ldapMinitial].Value != null)
                        {
                            user.MIDDLE_INITIAL = currentEntry.Properties[ldapMinitial].Value.ToString();
                        }
                        else
                        {
                            user.MIDDLE_INITIAL = string.Empty;
                        }
                        if (currentEntry.Properties[ldapEmailID].Value != null)
                        {
                            user.EMAIL_ID = currentEntry.Properties[ldapEmailID].Value.ToString();
                        }
                        else
                        {
                            user.EMAIL_ID = string.Empty;
                        }
                        if (currentEntry.Properties[ldapMobile].Value != null)
                        {
                            user.PHONE1 = currentEntry.Properties[ldapMobile].Value.ToString();
                        }
                        else
                        {
                            user.PHONE1 = string.Empty;
                        }
                        if (currentEntry.Properties[ldapFax].Value != null)
                        {
                            user.FAX = currentEntry.Properties[ldapFax].Value.ToString();
                        }
                        else
                        {
                            user.FAX = string.Empty;
                        }
                        if (currentEntry.Path.Substring(AtParExtensions.CleanString(_serverPath).Length) != null)
                        {
                            user.USERDN = currentEntry.Path.Substring(AtParExtensions.CleanString(_serverPath).Length);
                        }
                        else
                        {
                            user.USERDN = string.Empty;
                        }
                        listUser.Add(user);

                    }
                    response.DataList = listUser;
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
    }
}

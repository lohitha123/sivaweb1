using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    [RoutePrefix("api/ConfigurationManager")]
    public class ConfigurationManagerController : ApiController
    {
        #region Private Variable

        private IConfigurationManagerService _cnfgmgrService;
        private ILog _log;

        #endregion

        #region Constructor

        public ConfigurationManagerController(IConfigurationManagerService cnfgmgrService, ILog log)
        {
            _cnfgmgrService = cnfgmgrService;
            _log = log;
            _log.SetLoggerType(typeof(ConfigurationManagerController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        [Route("GetConfigurationDetails")]
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> GetConfigurationDetails(string pSystemId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _cnfgmgrService.GetConfigurationDetails(pSystemId);
            return result;
        }

        [HttpPost]
        [Route("SaveSSLConfigDetails")]
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> SaveSSLConfigDetails(string pStrProtocalValue, string pStrServerNameValue, string pStrPortNoValue, [FromUri] string[] deviceTokenEntry)
        {
            var result = _cnfgmgrService.SaveSSLConfigDetails(pStrProtocalValue, pStrServerNameValue, pStrPortNoValue);
            return result;
        }

        [HttpGet]
        [Route("GetSSLConfigDetails")]
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> GetSSLConfigDetails([FromUri] string[] deviceTokenEntry)
        {
            var result = _cnfgmgrService.GetSSLConfigDetails();
            return result;
        }
        [HttpPut]
        [Route("SetEntrpServiceConfDtls")]
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> SetEntrpServiceConfDtls(string userID, string confXml, [FromUri] string[] deviceTokenEntry)
        {
            var result = _cnfgmgrService.SetEntrpServiceConfDtls(userID, confXml);
            return result;

        }

        [HttpGet]
        [Route("GetEntrpServiceConffile")]
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> GetEntrpServiceConffile(string userID, bool boolRequestType, [FromUri] string[] deviceTokenEntry)
        {
            var result = _cnfgmgrService.GetEntrpServiceConffile(userID, boolRequestType);
            return result;
        }

        [HttpPut]
        [Route("SaveConfigurationDetails")]
        public AtParWebApiResponse<SSL_CONFIG_DETAILS> SaveConfigurationDetails(string systemId, string userId, [FromBody] List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> pLstSavedConfigurationDetails, [FromUri] string[] deviceTokenEntry)
        {
            var result = _cnfgmgrService.SaveConfigurationDetails(systemId, userId, pLstSavedConfigurationDetails);
            return result;
        }

        [HttpGet]
        [Route("GetOracleConnection")]
        public AtParWebApiResponse<string> GetOracleConnection(string server, string userId, string pwd, [FromUri] string[] deviceTokenEntry)
        {
            pwd = pwd.Replace(' ', '+');
            pwd = AESEncryptDecryptService.DecryptStringAES(pwd);

            string pDbString = "Server=" + server + ";User ID=" + userId + ";Password=" + pwd;
            var result = _cnfgmgrService.GetOracleConnection(pDbString);
            return result;

        }

        [HttpGet]
        [Route("GetSqlServerConnection")]
        public AtParWebApiResponse<string> GetSqlServerConnection(string server, string userId, string pwd, string dataSource, [FromUri] string[] deviceTokenEntry)
        {
            pwd = pwd.Replace(' ', '+');
            pwd = AESEncryptDecryptService.DecryptStringAES(pwd);
            string pDbString = "Server=" + server + ";Database=" + dataSource + ";User ID=" + userId + ";Password=" + pwd + ";Trusted_Connection=False";

            // string pDbString = "Server=" + server + ";User ID=" + userId + ";Password=" + pwd;
            var result = _cnfgmgrService.GetSqlServerConnection(pDbString);
            return result;
        }

        [HttpGet]
        [Route("TestLDAPConnection")]
        public AtParWebApiResponse<string> TestLDAPConnection(string ldapConnectString,
            string userName, string pwd, int authType, int entryLimit, [FromUri] string[] resultsFields,
            string searchFilterValue, int searchScope, string strserverName, string strProtocol, [FromUri] string[] deviceTokenEntry)
        {
            pwd = pwd.Replace(' ', '+');
            pwd = AESEncryptDecryptService.DecryptStringAES(pwd);

            var result = _cnfgmgrService.TestLDAPConnection(ldapConnectString, userName, pwd, authType,
                entryLimit, resultsFields, searchFilterValue, searchScope, strserverName, strProtocol);

            return result;
        }

        [HttpPut]
        [Route("UpdateQuerySource")]
        public AtParWebApiResponse<string> UpdateQuerySource([FromUri] string[] deviceTokenEntry)
        {
            var result = _cnfgmgrService.UpdateQrySrcVisibility();
            return result;
        }

        #endregion
    }
}

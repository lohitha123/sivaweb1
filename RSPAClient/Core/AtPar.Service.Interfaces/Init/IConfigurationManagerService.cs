using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Init
{
    public interface IConfigurationManagerService
    {
        AtParWebApiResponse<SSL_CONFIG_DETAILS> GetConfigurationDetails(string systemId);
        AtParWebApiResponse<SSL_CONFIG_DETAILS> SaveSSLConfigDetails(string protocalValue, string serverNameValue, string portNoValue);
        AtParWebApiResponse<SSL_CONFIG_DETAILS> SetEntrpServiceConfDtls(string userId, string confXml);
        AtParWebApiResponse<SSL_CONFIG_DETAILS> GetEntrpServiceConffile(string userID, bool requestType);
        AtParWebApiResponse<SSL_CONFIG_DETAILS> SaveConfigurationDetails(string systemId, string userId, List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstSavedConfigurationDetails);
        AtParWebApiResponse<string> GetOracleConnection(string dbString);
        AtParWebApiResponse<string> GetSqlServerConnection(string dbString);
        AtParWebApiResponse<SSL_CONFIG_DETAILS> GetSSLConfigDetails();
        AtParWebApiResponse<string> TestLDAPConnection(string ldapConnectString, string userName, string password, int authType, int entryLimit, string[] resultsFields, string searchFilterValue, int searchScope, string strserverName, string strProtocol);
        AtParWebApiResponse<string> UpdateQrySrcVisibility();
        

    }
}

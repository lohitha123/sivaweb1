using AtPar.POCOEntities;
using System.Collections.Generic;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IConfigurationManagerRepository
    {
        List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> GetConfigSectionDtls();
        List<MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS> GetConfigErpDtls();
        long SaveConfigurationDetails(List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls, string systemId,string userId);
      
        long SaveMTConfigurationDetailsToSystemDB(MT_ATPAR_SYSTEM_DB systemDb);
       
        IEnumerable<MT_ATPAR_CONFIGURATION_SECTION_DTLS> GetConfigTabNames();
        IEnumerable<MT_ATPAR_CONFIGURATION_SECTION_DTLS> GetConfigurationDetails();
        long UpDateConfigurationDetails(MT_ATPAR_CONFIGURATION_SECTION_DTLS objConfgData);

        string GetAtParSchema();

        long UpdateSchema(string Schema);

        List<MT_ATPAR_REPORTING_TABLES_LIST> GetQuerySourcesList();

        long UpdateQuerySource(List<MT_ATPAR_REPORTING_TABLES_LIST> lstRptTbl);
        long UpdateLookUps(string schemaName);
        bool GetUsersImportStatus();
        long UpdateUsersImportStatus();
        long UpdateHostName(string protocol, string serverName);

    }
}

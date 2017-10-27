using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.RFID
{
    public interface IRFIDConfigRepository
    {
        List<RF_READER_CONFIGURATION_DETAILS> GetReaderConfigList();
        long UpdateReaderConfiguration(RF_READER_CONFIGURATION_DETAILS config);
        long AddReaderConfig(RF_READER_CONFIGURATION_DETAILS ObjConfig);
        long DeleteReaderConfig(long configId);
        long SetDefaultConfig(int ID);
    }
}

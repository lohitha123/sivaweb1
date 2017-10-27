using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.RFID
{
    public interface IRFIDConfigService
    {
        AtParWebApiResponse<long> UpdateReaderConfiguration(RF_READER_CONFIGURATION_DETAILS config, string[] deviceTokenEntry);
        AtParWebApiResponse<RF_READER_CONFIGURATION_DETAILS> GetReaderConfigList(string[] deviceTokenEntry);

        AtParWebApiResponse<long> AddReaderConfig(RF_READER_CONFIGURATION_DETAILS ObjConfig, string[] deviceTokenEntry);

        AtParWebApiResponse<long> DeleteReaderConfig(long configId, string[] deviceTokenEntry);

        AtParWebApiResponse<long> SetDefaultConfig(int ConfigID);

        AtParWebApiResponse<string> TestReaderConnection(string readerIp, string portNo);

        AtParWebApiResponse<string> TestPrint();


    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.RFID;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.RFID.WebApi
{
    [RoutePrefix("api/RFIDConfig")]
    public class RFIDConfigController : ApiController
    {
        private IRFIDConfigService _rfidConfigService;
        private ILog _log;

        public RFIDConfigController(ILog log, IRFIDConfigService rfidConfigService)
        {
            _rfidConfigService = rfidConfigService;
            _log = log;
            
        }

        [HttpGet]
        public AtParWebApiResponse<RF_READER_CONFIGURATION_DETAILS> GetReaderConfigList([FromUri]string[] devicetokenentry)
        {

            var result = _rfidConfigService.GetReaderConfigList(devicetokenentry);
            return result;

        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateReaderConfiguration(RF_READER_CONFIGURATION_DETAILS config, [FromUri]string[] devicetokenentry)
        {
            var result = _rfidConfigService.UpdateReaderConfiguration(config, devicetokenentry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> AddReaderConfig(List<RF_READER_CONFIGURATION_DETAILS> lstConfig, [FromUri]string[] devicetokenentry)
        {
            var result = _rfidConfigService.AddReaderConfig(lstConfig.FirstOrDefault(), devicetokenentry);
            return result;

        }

        [HttpDelete]
        public AtParWebApiResponse<long> DeleteReaderConfig(int configID, [FromUri]string[] devicetokenentry)
        {
            var result = _rfidConfigService.DeleteReaderConfig(configID, devicetokenentry);
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<string> TestReaderConnection(string readerIp,string portNo,[FromUri]string[] devicetokenentry)
        {
            var result = _rfidConfigService.TestReaderConnection(readerIp,portNo);
            return result;

        }
        [HttpGet]
        public AtParWebApiResponse<string> TestPrint()
        {
            var result = _rfidConfigService.TestPrint();
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> SetConfigAsDefault(int configID, [FromUri]string[] devicetokenentry)
        {
            var result = _rfidConfigService.SetDefaultConfig(configID);
            return result;
        }
    }
}

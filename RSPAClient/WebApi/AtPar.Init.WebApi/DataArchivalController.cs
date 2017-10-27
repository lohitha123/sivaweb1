using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class DataArchivalController : ApiController
    {
        #region Private Variable

        ILog _log;
        IDataArchivalService _dataArchivalService;

        #endregion

        #region Constructor

        public DataArchivalController(ILog log, IDataArchivalService dataArchivalService)
        {
            _log = log;
            _dataArchivalService = dataArchivalService;
            _log.SetLoggerType(typeof(CarrierInformationController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_APP> GetPurgeAppIDs([FromUri] string[] deviceTokenEntry)
        {
            var result = _dataArchivalService.GetPurgeAppIDs(deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_CONFIGURATION_SECTION_DTLS> DoArchivalData(string appID, string archiveDate, [FromUri] string[] deviceTokenEntry)
        {
            var result = _dataArchivalService.DoArchivalData(appID, archiveDate, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

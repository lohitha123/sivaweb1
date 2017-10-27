using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class SetupReasonCodesController : ApiController
    {
        #region Private Variable

        private ISetupReasonCodesService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public SetupReasonCodesController(ISetupReasonCodesService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(SetupReasonCodesController));
        }

        #endregion

        #region Public Methods


        [HttpGet]
        public AtParWebApiResponse<TKIT_REASON_CODES> GetReasonCodes(string reasonCode, string desc, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetReasonCodes(reasonCode, desc, deviceTokenEntry);
            return result;
        }
      
        [HttpPost]
        public AtParWebApiResponse<long> UpdateReasonCodes(string reasonCode, string desc, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.UpdateReasonCodes(reasonCode, desc, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> DeleteReasonCode(string reasonCode, bool status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.DeleteReasonCode(reasonCode, status, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> CreateReasonCodes(string reasonCode, string desc, string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.CreateReasonCodes(reasonCode, desc, orgGrpID, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

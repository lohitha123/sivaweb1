using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class ReasonCodesController : ApiController
    {
        #region Private Variable

        private IReasonCodeService _reasonCodesService;
        private ILog _log;

        #endregion

        #region Constructor

        public ReasonCodesController(IReasonCodeService reasonCodesService, ILog log)
        {
            _reasonCodesService = reasonCodesService;
            _log = log;
            _log.SetLoggerType(typeof(ReasonCodesController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_POU_REASON_CODE> GetCodes(string codeType, string code , string descr, [FromUri] string[] deviceTokenEntry)
        {
               var result = _reasonCodesService.GetCodes(codeType, code, descr);
               return result;           
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_REASON_CODE> GetCodes(string reasonCodeOrDescription)
        {
            var result = _reasonCodesService.GetCodes(reasonCodeOrDescription);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_POU_REASON_CODE> AddCodes(string codeType, string userId, string code, string descr, string specCode, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _reasonCodesService.AddCodes(codeType, userId, code, descr, specCode);                
                return result;          
        }
        [HttpPost]
        public AtParWebApiResponse<MT_POU_REASON_CODE> AddCodes(string codeType, string userId, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _reasonCodesService.AddCodes(codeType, userId);               
                return result;           
        }
        [HttpPut]
        public AtParWebApiResponse<MT_POU_REASON_CODE> UpdateCodes(string codeType, string code, string descr, string specCode, [FromUri] string[] deviceTokenEntry)
        {
                var result = _reasonCodesService.UpdateCodes(codeType, code, descr, specCode);              
                return result;            
        }
        [HttpPut]
        public AtParWebApiResponse<MT_POU_REASON_CODE> UpdateCodes(string codeType, [FromUri] string[] deviceTokenEntry)
        {
                var result = _reasonCodesService.UpdateCodes(codeType);                
                return result;            
        }
        [HttpPost]
        public AtParWebApiResponse<MT_POU_REASON_CODE> DeleteCodes(string codeType, string code, string descr, [FromUri] string[] deviceTokenEntry)
        {
                var result = _reasonCodesService.DeleteCodes(codeType, code, descr);                
                return result;            
        }
        [HttpPost]
        public AtParWebApiResponse<MT_POU_REASON_CODE> DeleteCodes(string codeType, [FromUri] string[] deviceTokenEntry)
        {           
                var result = _reasonCodesService.DeleteCodes(codeType);                
                return result;            
        }

        #endregion
    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class ProcedureCodesController : ApiController
    {
        #region Private Variable

        private IProcedureCodeService _procedureCodesService;
        private ILog _log;

        #endregion

        #region Constructor

        public ProcedureCodesController(IProcedureCodeService procedureService, ILog log)
        {
            _procedureCodesService = procedureService;
            _log = log;
            _log.SetLoggerType(typeof(ProcedureCodesController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string codeType, string code, string descr, [FromUri] string[] deviceTokenEntry)
        {         
                var result = _procedureCodesService.GetSpecialtyCodes(codeType, code, descr);               
                return result;            
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string codeType, string code, string descr, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _procedureCodesService.GetProcedureCodes(codeType, code, descr);                
                return result;           
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string procedureCodeOrDescr)
        {
            var result = _procedureCodesService.GetProcedureCodes(procedureCodeOrDescr);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> AddCodes(string codeType, string userId, string code, string descr, string specCode, [FromUri] string[] deviceTokenEntry)
        {           
                var result = _procedureCodesService.AddCodes(codeType, userId, code, descr, specCode);                
                return result;                      
        }

        [HttpPost]
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> AddCodes(string codeType, string userId, [FromUri] string[] deviceTokenEntry)
        {         
                var result = _procedureCodesService.AddCodes(codeType, userId);                
                return result;            
        }

        [HttpPut]
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> UpdateCodes(string codeType, string code, string descr, string specCode, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _procedureCodesService.UpdateCodes(codeType, code, descr, specCode);               
                return result;           
        }

        [HttpPut]
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> UpdateCodes(string codeType, [FromUri] string[] deviceTokenEntry)
        {
               var result = _procedureCodesService.UpdateCodes(codeType);                
               return result;        
        }

        [HttpPost]
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> DeleteCodes(string codeType, string code, string descr, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _procedureCodesService.DeleteCodes(codeType, code, descr);                
                return result;           
        }

        [HttpDelete]
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> DeleteCodes(string codeType, [FromUri] string[] deviceTokenEntry)
        {
                var result = _procedureCodesService.DeleteCodes(codeType);
            return result;       
        }

        #endregion
    }
}

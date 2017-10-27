using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class SpecialtyCodesController : ApiController
    {
        #region Private Variable

        private ISpecialtyCodeService _specialtyCodesService;
        private ILog _log;

        #endregion

        #region Constructor

        public SpecialtyCodesController(ISpecialtyCodeService specialtyCodesService, ILog log)
        {
            _specialtyCodesService = specialtyCodesService;
            _log = log;
            _log.SetLoggerType(typeof(SpecialtyCodesController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string codeType, string code, string descr, [FromUri]string[] deviceTokenEntry)
        {
            var result = _specialtyCodesService.GetSpecialtyCodes(codeType, code, descr);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string specialityServiceCodeOrDesc)
        {
            var result = _specialtyCodesService.GetSpecialtyCodes(specialityServiceCodeOrDesc);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string codeType, string code, string descr, [FromUri]string[] deviceTokenEntry)
        {
            var result = _specialtyCodesService.GetProcedureCodes(codeType, code, descr);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> AddCodes(string codeType, string userId, string code, string descr, string specCode, [FromUri]string[] deviceTokenEntry)
        {
            var result = _specialtyCodesService.AddCodes(codeType, userId, code, descr, specCode);
            return result;
        }
        [HttpPost]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> AddCodes(string codeType, string userId, [FromUri]string[] deviceTokenEntry)
        {
            var result = _specialtyCodesService.AddCodes(codeType, userId);
            return result;
        }
        [HttpPut]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> UpdateCodes(string codeType, string code, string descr, string specCode, [FromUri]string[] deviceTokenEntry)
        {
            var result = _specialtyCodesService.UpdateCodes(codeType, code, descr, specCode);
            return result;
        }
        [HttpPut]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> UpdateCodes(string codeType, [FromUri]string[] deviceTokenEntry)
        {
            var result = _specialtyCodesService.UpdateCodes(codeType);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> DeleteCodes(string codeType, string code, string descr, [FromUri]string[] deviceTokenEntry)
        {
            var result = _specialtyCodesService.DeleteCodes(codeType, code, descr);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> DeleteCodes(string codeType, [FromUri]string[] deviceTokenEntry)
        {
            var result = _specialtyCodesService.DeleteCodes(codeType);
            return result;
        }

        #endregion
    }
}

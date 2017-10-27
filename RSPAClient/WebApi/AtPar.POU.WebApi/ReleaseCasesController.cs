using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class ReleaseCasesController : ApiController
    {
        #region Private Variable

        private IReleaseCasesService _releaseCasesService;
        private ILog _log;

        #endregion

        #region Constructor

        public ReleaseCasesController(IReleaseCasesService releaseCasesService, ILog log)
        {
            _releaseCasesService = releaseCasesService;
            _log = log;
            _log.SetLoggerType(typeof(ReleaseCasesController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments([FromUri] string[] deviceTokenEntry)
        {
            var result = _releaseCasesService.GetDepartments();
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> GetDownloadCases([FromUri] string[] deviceTokenEntry)
        {
            var result = _releaseCasesService.GetDownloadCases();
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_TRANSACTION> ProcessReleaseCases(bool pIsUpdate, int pTransID, string pDeptID, string pCaseID, [FromUri] string[] deviceTokenEntry, [FromUri] int[] tranIDs = null)
        {
            var result = _releaseCasesService.ProcessReleaseCases(pIsUpdate, pTransID, pDeptID, pCaseID, tranIDs);
            return result;
        }

        #endregion
    }
}

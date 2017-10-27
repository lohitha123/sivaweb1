using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class CaseReviewReportController:ApiController
    {
        #region Private Variable

        private ICaseReviewReportService _caseReviewReportService;
        private ILog _log;

        #endregion

        #region Constructor

        public CaseReviewReportController(ICaseReviewReportService caseReviewReportService, ILog log)
        {
            _caseReviewReportService = caseReviewReportService;
            _log = log;
            _log.SetLoggerType(typeof(CaseReviewReportController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get the Case Status for the Case Review Report
        /// </summary>
        /// <param name="depID"></param>
        /// <returns></returns>

        [HttpGet]
        public AtParWebApiResponse<VM_POU_GET_CASES_INFORMATION> GetCasesInformation(string depID, [FromUri] string[] deviceTokenEntry)
        {
           var result= _caseReviewReportService.GetCasesInformation(depID);
           return result;
        }


        /// <summary>
        /// Used to get the Case Data for the Case Review Report
        /// </summary>
        /// <param name="caseID"></param>
        /// <returns></returns>

        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, object>> GetCaseReview(string caseID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _caseReviewReportService.GetCaseReview(caseID);
            return result;
        }
        #endregion
    }
}

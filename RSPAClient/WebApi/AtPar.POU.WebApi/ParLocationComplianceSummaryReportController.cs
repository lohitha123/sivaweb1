using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class ParLocationComplianceSummaryReportController : ApiController
    {

        #region Private Variable

        private IParLocationComplianceSummaryReportService _parLocationComplianceSummaryReportService;
        private ILog _log;

        #endregion

        #region Constructor

        public ParLocationComplianceSummaryReportController(IParLocationComplianceSummaryReportService parLocationComplianceSummaryReportService, ILog log)
        {
            _parLocationComplianceSummaryReportService = parLocationComplianceSummaryReportService;
            _log = log;
            _log.SetLoggerType(typeof(ParLocationComplianceSummaryReportController));
        }

        #endregion


        /// <summary>
        /// GetComplianceSummary
        /// </summary>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <param name="pStrDeptID"></param>
        /// <param name="pStrCartID"></param>
        /// <param name="pStrOrgGrpID"></param>
        /// <param name="pAppID"></param>
        /// <returns></returns>
        [HttpGet]

        public AtParWebApiResponse<long> GetComplianceSummary(string pStrFromDate, string pStrToDate, string pStrDeptID, string pStrCartID, string pStrOrgGrpID, int pAppID)
        {
            var result = _parLocationComplianceSummaryReportService.GetComplianceSummary(pStrFromDate, pStrToDate, pStrDeptID, pStrCartID, pStrOrgGrpID, pAppID);
            return result;
        }

    }
}

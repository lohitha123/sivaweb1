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
    public class ParLocationComplianceDetailsReportController: ApiController
    {
        #region Private Variable

        private ILog _log;
        private IParLocationComplianceDetailsReportService _parLocationComplianceDetailsReportService;

        #endregion

        #region Constructor

        public ParLocationComplianceDetailsReportController(ILog log, IParLocationComplianceDetailsReportService parLocationComplianceDetailsReportService)
        {
            _log = log;
            _parLocationComplianceDetailsReportService = parLocationComplianceDetailsReportService;
            _log.SetLoggerType(typeof(ParLocationComplianceDetailsReportController));
        }
        #endregion

        /// <summary>
        /// GetComplianceDetails
        /// </summary>
        /// <param name="pStrDept"></param>
        /// <param name="pStrLoc"></param>
        /// <param name="pStrUserId"></param>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <param name="pStrOrgGrpID"></param>
        /// <param name="pAppID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<long> GetComplianceDetails(string pStrDept, string pStrLoc, string pStrUserId, string pStrFromDate, string pStrToDate, string pStrOrgGrpID, int pAppID, [FromUri]string[] deviceTokenEntry)
        {
            var result = _parLocationComplianceDetailsReportService.GetComplianceDetails(pStrDept, pStrLoc, pStrUserId, pStrFromDate, pStrToDate, pStrOrgGrpID,pAppID, deviceTokenEntry);
            return result;

        }
        /// <summary>
        /// GetDeptCartAllocations
        /// </summary>
        /// <param name="pBusinessUnit"></param>
        /// <param name="pDeptId"></param>
        /// <param name="pAppID"></param>
        /// <param name="pLocationType"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_COMPLIANCE_DETAILS_DEPT_HEADER_INFO> GetDeptCartAllocations(string pBusinessUnit, string pDeptId, int pAppID, string pLocationType = "")
        {
            var result = _parLocationComplianceDetailsReportService.GetDeptCartAllocations(pBusinessUnit, pDeptId, pAppID, pLocationType);
            return result;
        }
    }
}

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
    public class PhysicianUsageReportController:ApiController
    {
        #region Private Variable

        private IPhysicianUsageReportService _physicianUsageReportService;
        private ILog _log;

        #endregion

        #region Constructor

        public PhysicianUsageReportController(IPhysicianUsageReportService physicianUsageReportService, ILog log)
        {
            _physicianUsageReportService = physicianUsageReportService;
            _log = log;
            _log.SetLoggerType(typeof(PhysicianUsageReportController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get the physician Usage Header list
        /// </summary>
        /// <param name="pStrPhysicianID"></param>
        /// <param name="pStrProcedure"></param>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_HEADER> GetPhysicianUsage(string pStrPhysicianID, string pStrProcedure, string pStrFromDate, string pStrToDate, string OrgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _physicianUsageReportService.GetPhysicianUsage(pStrPhysicianID, pStrProcedure, pStrFromDate, pStrToDate, OrgGrpID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_DETAILS> GetPhysicianCompareDetails(List<VM_POU_PHYSICIAN_USAGE_HEADER> lstPhysicianUsageHeader, [FromUri] string[] deviceTokenEntry)
        {
            var result = _physicianUsageReportService.GetPhysicianCompareDetails (lstPhysicianUsageHeader);
            return result;
        }
        #endregion
    }
}

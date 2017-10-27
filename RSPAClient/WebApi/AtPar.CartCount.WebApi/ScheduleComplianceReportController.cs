using AtPar.Common;
using AtPar.Service.Interfaces.CartCount;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.CartCount.WebApi
{
    public class ScheduleComplianceReportController : ApiController
    {
        private ILog _log;
        private IScheduleComplianceReportService _service;
        public ScheduleComplianceReportController(ILog log, IScheduleComplianceReportService service)
        {
            _log = log;
            _service = service;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetCartSchedComplianceRep(string SvrUser, string userID, DateTime date, string orgGrpID)
        {
            var result = _service.GetCartSchedComplianceRep( SvrUser,  userID, date,  orgGrpID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetHeirarchyUsersList(orgGrpID, appID, userID);
            return result;
        }
    }
}

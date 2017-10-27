using AtPar.Common;
using AtPar.Service.Interfaces.StockIssue;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.StockIssue.WebApi
{
    public class IssueReportController : ApiController
    {
        private ILog _log;
        private IIssueReportService _service;
        public IssueReportController(ILog log, IIssueReportService service)
        {
            _log = log;
            _service = service;
            _log.SetLoggerType(typeof(IssueReportController));
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID,[FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetHeirarchyUsersList(orgGrpID, appID, userID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetOrgGroupAllocInvBUnits(int appID, string userID,
            string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetOrgGroupAllocInvBUnits(appID, userID,
             orgGroupID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> GetIssueReport(string bUnit, string userID,
            string deptID, string patientID, string issueToUser,
            string itemID, string itemDesc, string price, DateTime fromDt,
            DateTime toDt, string status, string serverUserID,
            string issueToLocation, List<VM_STOCKISSUE_USERDETAILS> userList, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetIssueReport(bUnit, userID, deptID, patientID, issueToUser, itemID, itemDesc, price, fromDt, toDt, status, serverUserID,issueToLocation, userList, deviceTokenEntry);
            return result;
        }
    }
}

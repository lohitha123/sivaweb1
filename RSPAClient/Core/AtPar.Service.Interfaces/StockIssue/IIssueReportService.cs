using AtPar.Common;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.StockIssue
{
    public interface IIssueReportService
    {
        AtParWebApiResponse<long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID);
        AtParWebApiResponse<string> GetOrgGroupAllocInvBUnits(int appID, string userID,
            string orgGroupID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> GetIssueReport(string bUnit, string userID,
            string deptID, string patientID, string issueToUser,
            string itemID, string itemDesc, string price, DateTime fromDt,
            DateTime toDt, string status, string serverUserID,
            string issueToLocation, List<VM_STOCKISSUE_USERDETAILS> userList, string[] deviceTokenEntry);
    }
}

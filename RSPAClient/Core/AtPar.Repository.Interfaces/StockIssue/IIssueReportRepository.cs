using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.StockIssue
{
    public interface IIssueReportRepository
    {
        Tuple<DataSet, long> GetIssueReport(string bUnit, string userID,
            string deptID, string patientID, string issueToUser,
            string itemID, string itemDesc, string price, DateTime fromDt,
            DateTime toDt, string status, string serverUserID,
            string issueToLocation, DataSet dsUserList, string[] deviceTokenEntry);
        Tuple<List<string>, long> GetDistinctBunits(string appID, string userList);
        Tuple<DataSet, long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID);
        Tuple<DataSet, long> GetUsersList(string pUserId, string pAppId, string pOrgGrpId);
    }
}

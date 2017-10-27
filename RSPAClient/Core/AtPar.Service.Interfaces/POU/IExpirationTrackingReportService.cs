using AtPar.Common;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.POU
{
    public interface IExpirationTrackingReportService
    {
        AtParWebApiResponse<long> GetExpirationTrackingReport(string orgGrpID, string[] deviceTokenEntry,
            int duration, string fromDate, string toDate,
            string deptID, int appID, string cartID);

        AtParWebApiResponse<long> GetExpItemCnt(string orgGrpID, string userID,
             int appID, string[] deviceTokenEntry);

        AtParWebApiResponse<VM_GetDeptCartAllocations> GetDeptCartAllocations(string businessUnit, string deptID, int appID, string locType, string[] deviceTokenEntry);
    }
}

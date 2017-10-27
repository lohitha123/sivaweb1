using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface IDeliveryReportService
    {
        //AtParWebApiResponse<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string OrgGrpID);
        //AtParWebApiResponse<TKIT_DEPT> SaveDeptData(string deptID, string deptDescr, string status, string mode, string orgGrpID, string userID);

        AtParWebApiResponse<long> GetTkITDeliverReport(string fromDate, string toDate, string request, string recipient, string userId, string departmentId, string itemId, string vendorName, string descr, string location,
        string reqId, string status, string[] deviceTokenEntry);
        AtParWebApiResponse<long> GetRequestors(bool inactiveStatusChk, string[] deviceTokenEntry);
        AtParWebApiResponse<long> GetTKITDepts(string deptID, string status, string[] deviceTokenEntry);


    }
}
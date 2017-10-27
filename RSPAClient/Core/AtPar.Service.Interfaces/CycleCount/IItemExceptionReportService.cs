using AtPar.Common;

namespace AtPar.Service.Interfaces.CycleCount
{
    public interface IItemExceptionReportService
    {
        AtParWebApiResponse<long> GetCycleExceptionReport(string bUnit, string eventID,
            string itemID, string fromDate, string toDate,  string orgGrpId);
    }
}

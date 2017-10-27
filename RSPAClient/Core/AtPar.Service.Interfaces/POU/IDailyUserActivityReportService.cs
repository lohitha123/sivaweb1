using AtPar.Common;

namespace AtPar.Service.Interfaces.POU
{
    public interface IDailyUserActivityReportService
    {
        AtParWebApiResponse<long> GetDailyUserActivityRep(string userID, string transType, string date, int appID, string[] deviceTokenEntry);
    }
}

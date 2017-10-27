using System.Data;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IDailyUserActivityReportRepository
    {
        long GetDailyUserActivityRep(string userID, string transType, string date, int appID, ref DataSet returnDS, string[] deviceTokenEntry);
    }
}

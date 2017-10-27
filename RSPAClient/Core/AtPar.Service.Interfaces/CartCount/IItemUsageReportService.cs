using AtPar.Common;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IItemUsageReportService
    {
        AtParWebApiResponse<long> GetItemUsageDetails(string itemID, string fDate, string toDate, string bUnit, string cartId, string srvrUserID, string[] deviceTokenEntry);
    }
}

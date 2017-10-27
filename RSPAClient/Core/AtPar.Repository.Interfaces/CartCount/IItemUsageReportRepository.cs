using System;
using System.Data;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface IItemUsageReportRepository
    {
        Tuple<DataSet, long> GetItemUsageDetails(string itemID, string fDate, string toDate, string bUnit, string cartId, string srvrUserID, string[] deviceTokenEntry);
    }
}

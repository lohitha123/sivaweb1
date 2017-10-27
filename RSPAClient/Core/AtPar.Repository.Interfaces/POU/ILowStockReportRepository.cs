using System;
using System.Data;

namespace AtPar.Repository.Interfaces.POU
{
    public interface ILowStockReportRepository
    {
        Tuple<DataSet, long> GetLowStockRep(int appID, string orgGroupID, string userID);
    }
}

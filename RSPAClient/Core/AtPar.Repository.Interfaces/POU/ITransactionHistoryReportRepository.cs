using AtPar.POCOEntities;
using System;
using System.Data;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.POU
{
    public interface ITransactionHistoryReportRepository
    {
        Tuple<DataSet, long> GetProductivityReport(string startDate, string endDate,
            string bUnit, string parLoc, string itemID, string orgID, bool negInventory);       
    }
}

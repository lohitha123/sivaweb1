using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IItemUsageReportRepository
    {
         long GetItemUsageReport(string businessUnit, string cartID,
            string itemID, string fromDate, string toDate, int appID, ref DataSet pItemUsageDS);
    }
}

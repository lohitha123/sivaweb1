using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IItemUsageReportService
    {
        AtParWebApiResponse<long> GetItemUsageReport(string businessUnit, string cartID,
            string itemID, string fromDate, string toDate, int appID);
    }
}

using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IErrorReportService
    {
        AtParWebApiResponse<long> GetErrorReport(string userID, string fromDate, string toDate, string[] deviceTokenEntry);
        AtParWebApiResponse<long> PopulateConfigData(string[] deviceTokenEntry);
    }
}

using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Data;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IOrderHistoryReportService
    {
        AtParWebApiResponse<string> GetOrderHistoryRep(string svrUser, string bUnit, string parLoc, string orgGroup, string profileID, string[] deviceTokenEntry);
    }
}

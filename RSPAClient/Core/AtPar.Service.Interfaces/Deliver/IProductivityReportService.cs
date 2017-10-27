using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Deliver
{
    public interface IProductivityReportService
    {
        AtParWebApiResponse<long> GetCycleTimeReport(string orgGroupID, string fromDate, string toDate,
            string userID, string startEvent, string endEvent,
            string[] deviceTokenEntry);
        AtParWebApiResponse<long> GetProductivityReport(string orgGroupID, string fromDate,
            string todate, string userID, int interval, string fTime, string toTime);
    }
}

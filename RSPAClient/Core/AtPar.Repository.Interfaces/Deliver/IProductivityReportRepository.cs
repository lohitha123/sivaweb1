using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Deliver
{
    public interface IProductivityReportRepository
    {
        Tuple<DataSet, long> GetCycleTimeReportRepo(string orgGroupID, string fromDate, string toDate,
            string userID, string startEvent, string endEvent,
            string[] deviceTokenEntry);
        Tuple<string, long> GetUserFullName(string userID);
        Tuple<DataSet, long> GetProductivityReport(string orgGroupID, string fromDate,
            string todate, string userID, int interval, string fTime, string toTime);
     }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
   public interface IErrorReportRepository
    {
        Tuple<DataSet, long> GetErrorReport(string userID, string fromDate, string toDate, string[] deviceTokenEntry);
    }
}

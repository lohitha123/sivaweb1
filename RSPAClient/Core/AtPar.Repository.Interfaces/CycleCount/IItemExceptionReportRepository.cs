using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CycleCount
{
    public interface IItemExceptionReportRepository
    {
        long GetCycleExceptionReport(string bUnit, string eventID,
            string itemID, string fromDate, string toDate,  string orgGrpId, ref DataSet dsExpRep);
    }
}

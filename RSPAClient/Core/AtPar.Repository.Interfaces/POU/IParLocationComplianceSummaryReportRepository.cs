using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IParLocationComplianceSummaryReportRepository
    {
        Tuple<DataSet, long> GetComplianceSummary(string pStrFromDate, string pStrToDate, string pStrDeptID, string pStrCartID, string pStrOrgGrpID, int pAppID);
    }
}

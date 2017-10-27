using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IParLocationComplianceSummaryReportService
    {
        AtParWebApiResponse<long> GetComplianceSummary(string pStrFromDate, string pStrToDate, string pStrDeptID, string pStrCartID, string pStrOrgGrpID, int pAppID);
    }
}

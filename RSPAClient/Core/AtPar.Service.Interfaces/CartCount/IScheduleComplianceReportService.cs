using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IScheduleComplianceReportService
    {
        AtParWebApiResponse<long> GetCartSchedComplianceRep(string SvrUser, string userID, DateTime dt, string orgGrpID);
        AtParWebApiResponse<long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID);
    }
}

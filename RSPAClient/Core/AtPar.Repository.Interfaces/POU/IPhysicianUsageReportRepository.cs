using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IPhysicianUsageReportRepository
    {
        List<VM_POU_PHYSICIAN_USAGE_HEADER> GetPhysicianUsage(string pStrPhysicianID, string pStrProcedure, string pStrFromDate, string pStrToDate, string OrgGrpID);
        List<VM_POU_PHYSICIAN_USAGE_DETAILS> GetPhysicianCompareDetails(List<VM_POU_PHYSICIAN_USAGE_HEADER> lstPhysicianUsageHeader);
    }
}

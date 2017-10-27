using AtPar.Common;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IParLocationComplianceDetailsReportService
    {
       AtParWebApiResponse<long>  GetComplianceDetails(string pStrDept, string pStrLoc, string pStrUserId, string pStrFromDate, string pStrToDate, string pStrOrgGrpID, int pAppID, string[] deviceTokenEntry);

        AtParWebApiResponse<VM_COMPLIANCE_DETAILS_DEPT_HEADER_INFO> GetDeptCartAllocations(string pBusinessUnit, string pDeptId, int pAppID, string pLocationType = "");
    }
}

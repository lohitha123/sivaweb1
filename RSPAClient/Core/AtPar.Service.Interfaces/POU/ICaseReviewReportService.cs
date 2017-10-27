using AtPar.Common;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public  interface ICaseReviewReportService
    {
        AtParWebApiResponse<VM_POU_GET_CASES_INFORMATION> GetCasesInformation(string pstrDeptId);
        AtParWebApiResponse<Dictionary<string, object>> GetCaseReview(string pStrCaseID);
    }
}

using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
   public interface ICaseReviewReportRepository
    {
        List<VM_POU_GET_CASES_INFORMATION> GetCasesInformation(string pstrDeptId);
        Dictionary<string, object> GetCaseReview(string pStrCaseID);
    }
}

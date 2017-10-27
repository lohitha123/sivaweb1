using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IPostPickQAService
    {
        AtParWebApiResponse<VM_MT_POU_CASE_CART_HEADER> GetCasesforQA(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry);

        AtParWebApiResponse<long> BuildReportPrint(string appID, string objectID, string section, List<VM_MT_POU_CASE_CART_DETAILS> lstPrint, string[] deviceTokenEntry);

        AtParWebApiResponse<long> GetPostPickQAItems(string caseID, int appID, string[] deviceTokenEntry);
    }
}

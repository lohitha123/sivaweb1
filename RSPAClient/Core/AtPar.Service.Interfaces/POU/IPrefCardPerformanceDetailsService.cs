using AtPar.Common;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IPrefCardPerformanceDetailsService
    {
        AtParWebApiResponse<VM_POU_PREF_CARD_PERFORMANCE_DETAILS> GetPrefCarDPerformanceDtls(string pFromDate, string pToDate, string pProcId, string pPhyId = "");
    }
}

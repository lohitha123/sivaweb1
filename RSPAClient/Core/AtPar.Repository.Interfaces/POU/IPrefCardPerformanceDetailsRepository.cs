using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IPrefCardPerformanceDetailsRepository
    {
        List<VM_POU_PREF_CARD_PERFORMANCE_DETAILS> GetPrefCarDPerformanceDtls(string pFromDate, string pToDate, string pProcId, string pPhyId = "");
    }
}

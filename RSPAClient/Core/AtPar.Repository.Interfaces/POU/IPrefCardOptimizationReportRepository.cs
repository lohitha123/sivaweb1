using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IPrefCardOptimizationReportRepository
    {
        Tuple<int,List<VM_POU_PREF_CARD_OPTIMIZATION>> GetPrefCardOptimizationRpt(string pFromDate, string pToDate, string pProcId,string pPhyId = "");
    }
}

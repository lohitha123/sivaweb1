using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IPrefCardOptimizationReportService
    {
        AtParWebApiResponse<Dictionary<string, object>> GetPrefCardOptimizationRpt(string pFromDate, string pToDate, string pProcId,string pPhyId="");
    }
}

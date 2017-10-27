using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.POU
{
    public interface IParOptimizationReportService
    {
      AtParWebApiResponse<VM_PAR_OPTIMIZATION_DETAILS> GetOptimizationReport(string bUnit, string deptID, string cartID,
                                                           DateTime fDate, DateTime tDate, string pOrgGrpID,
                                                           int appId,string[] pDeviceTokenEntry);

        AtParWebApiResponse<long> UpdateParQty(Dictionary<string, dynamic> dicDataItems,int appId,
                                                           string[] pDeviceTokenEntry);

    }
}

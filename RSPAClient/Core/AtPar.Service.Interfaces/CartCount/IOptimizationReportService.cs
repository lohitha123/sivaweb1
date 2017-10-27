using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IOptimizationReportService
    {
        AtParWebApiResponse<object> GetCartOptimizationRep(string bUnit, string deptID, string cartID, 
                                                           DateTime fDate, DateTime tDate, string pOrgGrpID, 
                                                           string pProfileID, int pIntCntFreq, string pUserID,
                                                           string[] pDeviceTokenEntry);

        AtParWebApiResponse<long> UpdateCartParAuditRep(Dictionary<string, dynamic> dicDataItems, string pUserID,
                                                          string pOrgGrpID, string[] pDeviceTokenEntry);

    }
}

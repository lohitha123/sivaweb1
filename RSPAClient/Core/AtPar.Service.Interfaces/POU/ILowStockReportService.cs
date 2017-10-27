using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
   
        public interface ILowStockReportService
        {
         AtParWebApiResponse<long> GetLowStockRep(string orgGrpID, int appID, string[] deviceTokenEntry);

        }
    
}

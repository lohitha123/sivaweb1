using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface ITransactionReportService
    {
        AtParWebApiResponse<long> GetTransRep(string pItemId, string pFrmdate, string pTodate, string pItemDescr, string pSerial, string pDeptID, string[] pDeviceTokenEntry);

    }
}

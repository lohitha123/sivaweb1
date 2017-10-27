using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface ITransactionReportRepository
    {
        long GetTransRep(string pItemId, string pFrmdate, string pTodate, ref DataSet pDsTransRep, string pItemDescr, string pSerial, string pDeptID, string[] pDeviceTokenEntry);
    }
}

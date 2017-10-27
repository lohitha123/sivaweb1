using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IActivityReportService
    {
        AtParWebApiResponse<VM_MT_ATPAR_TRANSACTION> GetActivityReportData(DateTime fDate, DateTime tDate, int appId, int fltr,
                                                             string[] deviceTokenEntry, string orgGroupID);
    }
}

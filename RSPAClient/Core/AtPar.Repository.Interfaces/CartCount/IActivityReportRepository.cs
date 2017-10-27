using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface IActivityReportRepository
    {
        Tuple<long,List<VM_MT_ATPAR_TRANSACTION>> GetActivityReportData(DateTime fDate, DateTime tDate, int appId, int fltr,
                                                                            string[] deviceTokenEntry, string orgGroupID);
    }
}

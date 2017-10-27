using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.Receiving
{
    public interface IParcelCountReportRepository
    {
        Tuple<long, Dictionary<string, object>> GetParcelCountReport(DateTime fDate, DateTime tDate, string carrierID,
                                                                string trackingNo, string[] deviceTokenEntry);
    }
}

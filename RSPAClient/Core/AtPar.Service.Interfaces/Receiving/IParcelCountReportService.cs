using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.Receiving
{
    public interface IParcelCountReportService
    {
        AtParWebApiResponse<Dictionary<string, object>> GetParcelCountReport(DateTime fDate, DateTime tDate, string carrierID, 
                                                                        string trackingNo, string[] deviceTokenEntry);
    }
}

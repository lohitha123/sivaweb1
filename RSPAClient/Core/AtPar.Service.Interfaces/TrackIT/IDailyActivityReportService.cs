using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface IDailyActivityReportService
    {
       AtParWebApiResponse<long> GetTKITDailyUserActivityRep(string pToDate, string[] pDeviceTokenEntry);
    }
}

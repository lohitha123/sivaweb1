using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using System.Data;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface IDailyActivityreportRepository
    {
        Tuple<long,DataSet> GetTKITDailyUserActivityRep(string pToDate, string[] pDeviceTokenEntry);
    }
}

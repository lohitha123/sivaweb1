using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IProcessSchedulerService
    {
        AtParWebApiResponse<object> GetSheduleDetails(string schedID);
        AtParWebApiResponse<long> CreateNewSchedule(List<VM_MT_ATPAR_PROCESS_SCHEDULER> scheduleDetails,
            string orgGroupID, string schedID, string schedDescr, string userID, int schedType, DateTime startTime, DateTime endTime, int interval, string mode);
    }
}

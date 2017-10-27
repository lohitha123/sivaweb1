using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IProcessSchedulerRepository
    {
        List<MT_ATPAR_SCHEDULE_HEADER> GetScheduleType(string schedID);
        List<MT_ATPAR_SCHEDULE_DETAIL> GetScheduleDetails(string schedID);
        List<MT_ATPAR_SCHEDULE_DETAIL> GetScheduleTimes(string schedID);
        long CreateOrUpdateSchedule(string orgGroupID, string schedID, string schedDescr, string userID,
            int schedType, DateTime startTime, DateTime endTime, int interval, string mode);
        long InsertScheduleDetails(List<VM_MT_ATPAR_PROCESS_SCHEDULER> scheduleDetails, string orgGroupID, string schedID);
    }
}

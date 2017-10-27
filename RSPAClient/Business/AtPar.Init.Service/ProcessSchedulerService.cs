using AtPar.Service.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;

namespace AtPar.Init.Service
{
    public class ProcessSchedulerService : IProcessSchedulerService
    {
        #region Private Variable

        IProcessSchedulerRepository _processRepo;
        ILog _log;
        ICommonRepository _commonRepo;


        #endregion

        #region Constructor
        public ProcessSchedulerService(IProcessSchedulerRepository repository, ILog log,
                                    ICommonRepository commonRepository)
        {
            _processRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ProcessSchedulerService));
        }

        #endregion

        #region GetSheduleDetails
        public AtParWebApiResponse<object> GetSheduleDetails(string schedID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<object>();
            List<MT_ATPAR_SCHEDULE_HEADER> lstSchedTypeDet = null;
            List<MT_ATPAR_SCHEDULE_DETAIL> lstScheduleDetails = null;
            List<MT_ATPAR_SCHEDULE_DETAIL> lstScheduleTimes = null;
            List<MT_ATPAR_SCHEDULE_DETAIL> lstSchedules = null;
            List<VM_MT_ATPAR_PROCESS_SCHEDULER> lstScheDetails = new List<VM_MT_ATPAR_PROCESS_SCHEDULER>();
            int schedType;
           // DateTime startTime =new DateTime();
           // DateTime endTime = new DateTime();
            string startTime = string.Empty;
            string endTime = string.Empty;
            string orgGrpID = string.Empty;
            int interval = 0;
            Tuple<List<VM_MT_ATPAR_PROCESS_SCHEDULER>, string, string, int, int, string> tupleOuput = null;

            try
            {
                lstSchedTypeDet = _processRepo.GetScheduleType(schedID);
                schedType = Convert.ToInt32(lstSchedTypeDet[0].SCHEDULE_TYPE);
                if (schedType == Convert.ToInt32(AtParWebEnums.ScheduleType_Enum.Days))
                {
                    lstScheduleDetails = _processRepo.GetScheduleDetails(schedID);
                    lstScheduleTimes = _processRepo.GetScheduleTimes(schedID);
                    if (lstScheduleDetails.Count > 0)
                    {
                        for (int i = 0; i <= lstScheduleTimes.Count - 1; i++)
                        {
                            lstSchedules = lstScheduleDetails.Where(x => x.SCHEDULE_TIME == lstScheduleTimes[i].SCHEDULE_TIME).ToList();
                            if (lstSchedules != null)
                            {
                                VM_MT_ATPAR_PROCESS_SCHEDULER objProcessSched = new VM_MT_ATPAR_PROCESS_SCHEDULER();
                                objProcessSched.CHK_MON = false;
                                objProcessSched.CHK_TUE = false;
                                objProcessSched.CHK_WED = false;
                                objProcessSched.CHK_THR = false;
                                objProcessSched.CHK_FRI = false;
                                objProcessSched.CHK_SAT = false;
                                objProcessSched.CHK_SUN = false;
                                foreach (var objScheduleDetails in lstSchedules)
                                {
                                    if (objScheduleDetails.SCHEDULE_DAY == 1)
                                    {
                                        objProcessSched.CHK_MON = true;
                                    }
                                    if (objScheduleDetails.SCHEDULE_DAY == 2)
                                    {
                                        objProcessSched.CHK_TUE = true;
                                    }
                                    if (objScheduleDetails.SCHEDULE_DAY == 3)
                                    {
                                        objProcessSched.CHK_WED = true;
                                    }
                                    if (objScheduleDetails.SCHEDULE_DAY == 4)
                                    {
                                        objProcessSched.CHK_THR = true;
                                    }
                                    if (objScheduleDetails.SCHEDULE_DAY == 5)
                                    {
                                        objProcessSched.CHK_FRI = true;
                                    }
                                    if (objScheduleDetails.SCHEDULE_DAY == 6)
                                    {
                                        objProcessSched.CHK_SAT = true;
                                    }
                                    if (objScheduleDetails.SCHEDULE_DAY == 7)
                                    {
                                        objProcessSched.CHK_SUN = true;
                                    }
                                    objProcessSched.SCHEDULE_TIME = Convert.ToDateTime(objScheduleDetails.SCHEDULE_TIME).ToShortTimeString();
                                  

                                }
                                lstScheDetails.Add(objProcessSched);
                            }
                           

                        }
                    }
                }
                else if (schedType == Convert.ToInt32(AtParWebEnums.ScheduleType_Enum.Intervals))
                {
                    startTime = Convert.ToDateTime(lstSchedTypeDet[0].START_TIME).ToShortTimeString();
                    endTime = Convert.ToDateTime(lstSchedTypeDet[0].END_TIME).ToShortTimeString();
                    interval = Convert.ToInt32(lstSchedTypeDet[0].INTERVAL);
                }
                orgGrpID = lstSchedTypeDet[0].ORG_GROUP_ID;
                tupleOuput = new Tuple<List<VM_MT_ATPAR_PROCESS_SCHEDULER>, string, string, int, int, string>(lstScheDetails,
                    startTime, endTime, interval, schedType, orgGrpID);
                response.DataVariable = tupleOuput;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion

        #region CreateNewSchedule
        public AtParWebApiResponse<long> CreateNewSchedule( List<VM_MT_ATPAR_PROCESS_SCHEDULER> scheduleDetails, string orgGroupID, string schedID, string schedDescr, string userID, int schedType, DateTime startTime, DateTime endTime, int interval, string mode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = -1;

            try
            {

                StatusCode = _processRepo.CreateOrUpdateSchedule(orgGroupID, schedID, schedDescr, userID, schedType, startTime, endTime, interval, mode);

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                StatusCode = _processRepo.InsertScheduleDetails(scheduleDetails, orgGroupID, schedID);

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion

    }
}

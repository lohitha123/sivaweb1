using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class ProcessSchedulerController : ApiController
    {
        #region Private Variable

        private IProcessSchedulerService _service;
        private ILog _log;

        #endregion

        #region Constructor
        public ProcessSchedulerController(IProcessSchedulerService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(ProcessSchedulerController));

        }

        #endregion

        #region Public Methods

        [HttpPost]
        public AtParWebApiResponse<long> CreateNewSchedule([FromBody] List<VM_MT_ATPAR_PROCESS_SCHEDULER> scheduleDetails,
                                                           string orgGroupID, string schedID, string schedDescr,
                                                           string userID, int schedType, DateTime startTime,
                                                          DateTime endTime, int interval, string mode,
                                                           [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CreateNewSchedule(scheduleDetails, orgGroupID, schedID, schedDescr, userID, schedType,
                startTime, endTime, interval, mode);
            return result;

        }
        [HttpGet]
        public AtParWebApiResponse<object> GetSheduleDetails(string schedID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetSheduleDetails(schedID);
            return result;

        }
        #endregion

    }
}

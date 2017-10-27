using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.Common;

namespace AtPar.TrackIT.WebApi
{
    public class DailyActivityReportController: ApiController
    {
        #region Private Variable

        private IDailyActivityReportService _dailyactivityreportService;
        private ILog _log;

        #endregion
        #region Constructor

        public DailyActivityReportController(IDailyActivityReportService dailyactivityreportService, ILog log)
        {
            _dailyactivityreportService = dailyactivityreportService;
            _log = log;
            _log.SetLoggerType(typeof(IDailyActivityReportService));
        }

        #endregion

        #region Public Methods



        [HttpGet]
        public AtParWebApiResponse<long> GetTKITDailyUserActivityRep(string pToDate,[FromUri] string[] deviceTokenEntry)
        {
            var result = _dailyactivityreportService.GetTKITDailyUserActivityRep(pToDate, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}
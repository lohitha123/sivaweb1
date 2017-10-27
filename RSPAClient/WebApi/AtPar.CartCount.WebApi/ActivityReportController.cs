using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.Service.Interfaces.CartCount;
using log4net;
using AtPar.Common;
using AtPar.ViewModel;

namespace AtPar.CartCount.WebApi
{
    public class ActivityReportController : ApiController
    {

        #region Private Variables

        private IActivityReportService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public ActivityReportController(IActivityReportService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(ActivityReportController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_MT_ATPAR_TRANSACTION> GetActivityReportData(DateTime fDate, DateTime tDate, int appId, int fltr,
                                                                string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetActivityReportData(fDate, tDate, appId, fltr, deviceTokenEntry, orgGroupID.HandleNull());
            return result;
        }
        #endregion
    }
}

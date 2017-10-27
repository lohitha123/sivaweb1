using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
   public class PrefCardPerformanceSummaryController: ApiController
    {
        #region Private Variable

        private IPrefCardPerformanceSummaryService _prefCardPerformanceSummaryService;
        private ILog _log;

        #endregion

        #region Constructor

        public PrefCardPerformanceSummaryController(IPrefCardPerformanceSummaryService prefCardPerformanceSummaryService, ILog log)
        {
            _prefCardPerformanceSummaryService = prefCardPerformanceSummaryService;
            _log = log;
            _log.SetLoggerType(typeof(PrefCardPerformanceSummaryController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get the PrefPerformanceSummaryRpt Data list
        /// </summary>
        /// <param name="fromDate"></param>
        /// <param name="toDate"></param>
        /// <param name="procId"></param>
        /// <param name="phyId"></param>
        /// <returns></returns>

        [HttpGet]
        public AtParWebApiResponse<VM_POU_PREF_CARD_PERFORMANCE_SUMMARY> GetPrefPerformanceRpt(string fromDate, string toDate, string procId, string phyId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _prefCardPerformanceSummaryService.GetPrefPerformanceRpt(fromDate, toDate, procId, phyId);
            return result;
        }
        #endregion
    }
}

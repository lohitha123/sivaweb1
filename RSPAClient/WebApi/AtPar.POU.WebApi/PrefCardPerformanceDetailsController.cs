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
    public class PrefCardPerformanceDetailsController:ApiController
    {
        #region Private Variable

        private IPrefCardPerformanceDetailsService _prefCardPerformanceDetailsService;
        private ILog _log;

        #endregion

        #region Constructor

        public PrefCardPerformanceDetailsController(IPrefCardPerformanceDetailsService prefCardPerformanceDetailsService, ILog log)
        {
            _prefCardPerformanceDetailsService = prefCardPerformanceDetailsService;
            _log = log;
            _log.SetLoggerType(typeof(PrefCardPerformanceDetailsController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get the PrefCarDPerformanceDtls Data list
        /// </summary>
        /// <param name="pFromDate"></param>
        /// <param name="pToDate"></param>
        /// <param name="pProcId"></param>
        /// <param name="pPhyId"></param>
        /// <returns></returns>

        [HttpGet]
        public AtParWebApiResponse<VM_POU_PREF_CARD_PERFORMANCE_DETAILS> GetPrefCarDPerformanceDtls(string pFromDate, string pToDate, string pProcId, string pPhyId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _prefCardPerformanceDetailsService.GetPrefCarDPerformanceDtls(pFromDate, pToDate, pProcId, pPhyId);
            return result;
        }
        #endregion
    }
}

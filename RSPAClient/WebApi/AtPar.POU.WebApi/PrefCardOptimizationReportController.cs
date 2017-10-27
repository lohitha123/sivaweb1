using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class PrefCardOptimizationReportController : ApiController
    {
        #region Private Variable

        private IPrefCardOptimizationReportService _prefCardOptimizationReportService;
        private ILog _log;

        #endregion

        #region Constructor

        public PrefCardOptimizationReportController(IPrefCardOptimizationReportService prefCardOptimizationReportService, ILog log)
        {
            _prefCardOptimizationReportService = prefCardOptimizationReportService;
            _log = log;
            _log.SetLoggerType(typeof(PrefCardOptimizationReportController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get the PrefCardOptimizationRpt Data list
        /// </summary>
        /// <param name="pFromDate"></param>
        /// <param name="pToDate"></param>
        /// <param name="pProcId"></param>
        /// <param name="pPhyId"></param>
        /// <returns></returns>

        [HttpGet]
       public AtParWebApiResponse<Dictionary<string, object>> GetPrefCardOptimizationRpt(string pFromDate, string pToDate, string pProcId, string pPhyId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _prefCardOptimizationReportService.GetPrefCardOptimizationRpt(pFromDate, pToDate, pProcId, pPhyId);
            return result;
        }
        #endregion
    }
}

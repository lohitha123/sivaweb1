using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;


namespace AtPar.CartCount.WebApi
{
    public class OptimizationReportController : ApiController
    {

        #region Private Variable

        private IOptimizationReportService _service;
        private ILog _log;


        #endregion

        #region Constructor

        public OptimizationReportController(IOptimizationReportService service, ILog log)
        {
            _service = service;
            _log = log;
            //Utils.SetProductLog(AtParWebEnums.EnumApps.CartCount);
            _log.SetLoggerType(typeof(OptimizationReportController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<object> GetCartOptimizationRep(string bUnit, string deptID, string cartID,
                                                           DateTime fDate, DateTime tDate, string orgGrpID,
                                                           string profileID, int intCntFreq, string userID,
                                                           [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetCartOptimizationRep(bUnit.HandleNull(), deptID.HandleNull(), cartID.HandleNull(), fDate, tDate, orgGrpID.HandleNull(), profileID.HandleNull(), intCntFreq, userID.HandleNull(), deviceTokenEntry);
            return result;
        }



        [HttpPost]
        public AtParWebApiResponse<long> UpdateCartParAuditRep([FromBody] Dictionary<string, dynamic> dicDataItems, string userID,
                                                          string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateCartParAuditRep(dicDataItems, userID, orgGrpID, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.Service.Interfaces.POU;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using log4net;

namespace AtPar.POU.WebApi
{
    public class ParOptimizationReportController : ApiController
    {

        #region Private Variable

        private IParOptimizationReportService _service;
        private ILog _log;


        #endregion

        #region Constructor

        public ParOptimizationReportController(IParOptimizationReportService service, ILog log)
        {
            _service = service;
            _log = log;
            //Utils.SetProductLog(AtParWebEnums.EnumApps.CartCount);
            _log.SetLoggerType(typeof(ParOptimizationReportController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_PAR_OPTIMIZATION_DETAILS> GetOptimizationReport(string bUnit, string deptID, string cartID,
                                                           DateTime fDate, DateTime tDate, string orgGrpID,
                                                           int appId,
                                                           [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetOptimizationReport(bUnit.HandleNull(), deptID.HandleNull(), cartID.HandleNull(), fDate, tDate, orgGrpID.HandleNull(), appId, deviceTokenEntry);
            return result;
        }



        [HttpPost]
        public AtParWebApiResponse<long> UpdateParQty([FromBody] Dictionary<string, dynamic> dicDataItems,int appId,
                                                           [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateParQty(dicDataItems,appId, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

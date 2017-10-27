using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    [RoutePrefix("api/StationaryPrintDesign")]
    public class StationaryPrintDesignController : ApiController
    {
        #region Private Variable

        private IStationaryPrintDesignService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public StationaryPrintDesignController(IStationaryPrintDesignService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(StationaryPrintDesignController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Saving Dynamic Print Report
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="objectID"></param>
        /// <param name="printType"></param>
        /// <param name="objectDesc"></param>
        /// <param name="lstReportDtls"></param>
        /// <returns></returns>
        [Route("SaveDynamicPrintReport")]
        [HttpPost]
        public AtParWebApiResponse<long> SaveDynamicPrintReport(string appID, string objectID, string printType, string objectDesc, [FromBody] List<VM_MT_ATPAR_REPORT_DETAILS> lstReportDtls, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.SaveDynamicPrintReport(appID, objectID, printType, objectDesc, lstReportDtls);
            return result;
        }

        /// <summary>
        /// Getting Dynamic Report
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="objectID"></param>
        /// <returns></returns>
        [Route("GetDynamicReport")]
        [HttpGet]
        public AtParWebApiResponse<long> GetDynamicReport(string appID, string objectID, [FromUri] string[] deviceTokenEntry)
        {
            var response = new AtParWebApiResponse<long>();
            response = _service.GetDynamicReport(appID, objectID);
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appID"></param>
        /// <returns></returns>
        [Route("GetDynamicPrintReportTypes")]
        [HttpGet]
        public AtParWebApiResponse<string> GetDynamicPrintReportTypes(int appID, [FromUri] string[] deviceTokenEntry)
        {
            var response = new AtParWebApiResponse<string>();
            response = _service.GetDynamicPrintReportTypes(appID);
            return response;
        }

        /// <summary>
        /// Getting Dynamic Print Products
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        [Route("GetDynamicPrintProducts")]
        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_PROFILE_APP_ACL> GetDynamicPrintProducts(string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetDynamicPrintProducts(userID);
            return result;
        }

        public AtParWebApiResponse<string> GetFonts([FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetFonts();
            return result;
        }

        #endregion
    }
}

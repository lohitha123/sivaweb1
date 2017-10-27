using AtPar.Common;
using AtPar.POCOEntities;
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
    public class BackOrderReportController: ApiController
    {
        #region Private Variable
        IBackOrderReportService _backOrderReportService;
        ILog _log;
        #endregion

        #region Constructor
        public BackOrderReportController(ILog log, IBackOrderReportService backOrderReportService)
        {
            _backOrderReportService = backOrderReportService;
            _log = log;
            _log.SetLoggerType(typeof(BackOrderReportController));
        }
        #endregion
        /// <summary>
        /// GetBackOrderReportData
        /// </summary>
        /// <param name="pStrBusinessUnit"></param>
        /// <param name="pStrCartId"></param>
        /// <param name="pStrUserId"></param>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <param name="pOrgGrpID"></param>
        /// <param name="pAppID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>

        [HttpGet]
        public AtParWebApiResponse<long> GetBackOrderReportData(string pStrBusinessUnit, string pStrCartId, string pStrUserId, string pStrFromDate, string pStrToDate, string pOrgGrpID, int pAppID, [FromUri]string[] deviceTokenEntry)
        {
            var result = _backOrderReportService.GetBackOrderReportData(pStrBusinessUnit, pStrCartId, pStrUserId, pStrFromDate, pStrToDate, pOrgGrpID, pAppID, deviceTokenEntry);
            return result;

        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, [FromUri]string[] deviceTokenEntry, string locationType = "", string cartType = "")
        {
            var result = _backOrderReportService.GetBUnits_Carts(userID, appID, locationType, cartType, deviceTokenEntry);
            return result;

        }
    }
}

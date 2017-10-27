using System.Collections.Generic;
using System.Web.Http;
using AtPar.Service.Interfaces.Init;
using AtPar.POCOEntities;
using AtPar.Common;
using log4net;
using System;

namespace AtPar.Init.WebApi
{
    public class ReleaseOrdersController : ApiController
    {
        #region Private Variable

        private IReleaseOrdersService _Service;
        private ILog _log;
        #endregion

        #region Constructor

        public ReleaseOrdersController(IReleaseOrdersService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(ReleaseOrdersController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_TRANSACTION> GetReleaseOrders(int appID, string userID, string bUnit, string ordNo,
                                                                            string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            if (string.IsNullOrEmpty(ordNo))
            {
                ordNo = string.Empty;
            }

            if (String.IsNullOrEmpty(bUnit))
            {
                bUnit = String.Empty;
            }
            var result = _Service.GetReleaseOrders(appID, userID, bUnit, ordNo, orgGrpID, false, string.Empty, deviceTokenEntry);
            return result;

        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_TRANSACTION> GetReleaseOrders(int appID, string userID, string bUnit, string ordNo,
                                                        string orgGrpID, bool updateRequired, [FromUri] string[] deviceTokenEntry)
        {
            if (string.IsNullOrEmpty(ordNo))
            {
                ordNo = string.Empty;
            }

            if (String.IsNullOrEmpty(bUnit))
            {
                bUnit = String.Empty;
            }
            var result = _Service.GetReleaseOrders(appID, userID, bUnit, ordNo, orgGrpID, updateRequired, string.Empty, deviceTokenEntry);
            return result;

        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_TRANSACTION> GetReleaseOrders(int appID, string userID, string bUnit, string ordNo,
                                    string orgGrpID, bool updateRequired, string transID, [FromUri] string[] deviceTokenEntry)
        {
            if (string.IsNullOrEmpty(ordNo))
            {
                ordNo = string.Empty;
            }

            if (String.IsNullOrEmpty(bUnit))
            {
                bUnit = String.Empty;
            }

            var result = _Service.GetReleaseOrders(appID, userID, bUnit, ordNo, orgGrpID, updateRequired, transID, deviceTokenEntry);
            return result;

        }

        #endregion
    }
}

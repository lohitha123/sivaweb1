using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtPar.Deliver.WebApi
{

    public class DeliverAllocBUController : ApiController
    {
        #region Private Variable

        private IDeliverAllocBUService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public DeliverAllocBUController(IDeliverAllocBUService bUnitService, ILog log)
        {
            _Service = bUnitService;
            _log = log;
            _log.SetLoggerType(typeof(DeliverAllocBUController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_DELV_BU_ALLOCATION> GetBUnits([FromUri] string[] bArray, string userID, string bUnit,
                                                string description, string serverUserID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetBUnits(bArray, userID, bUnit, description, serverUserID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_DELV_BU_ALLOCATION> AllocateBUnits(string userID, string serverUserID,
                                                           List<MT_DELV_BU_ALLOCATION> lstBUnitsAllocation, bool searched, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.AllocateBUnits(userID, serverUserID, lstBUnitsAllocation, searched, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

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
    
    public class DeliverShiptoIDsController : ApiController
    {
        #region Private Variable

        private IDeliverShiptoIDsService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public DeliverShiptoIDsController(IDeliverShiptoIDsService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(DeliverShiptoIDsController));

        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION> GetOrgGrpShiptoIDs(string orgGroupID, string serverUserID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetOrgGrpShiptoIDs(orgGroupID, serverUserID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION> AllocateShiptoIDs(string serverUserID, List<MT_DELV_SHIPTO_ID_ALLOCATION> lstShiptoIDs, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.AllocateShiptoIDs(serverUserID, lstShiptoIDs); 
            return result;
        }

        #endregion
    }
}

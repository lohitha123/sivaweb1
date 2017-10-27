using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Deliver.WebApi
{
    public class DropOffLocsController : ApiController
    {
        #region Private Variable

        private IDropOffLocsService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public DropOffLocsController(IDropOffLocsService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(DropOffLocsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_DELV_LOC_DETAILS> GetDropOffLocs(string locID, string locDesc, string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetDropOffLocs(locID, locDesc, orgGroupID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_DELV_LOC_DETAILS> InsertDropOffLocs(MT_DELV_LOC_DETAILS location, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.InsertDropOffLocs(location);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateDropOffLocs(int status, string orgGroupID, string locID, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.UpdateDropOffLocs(status, orgGroupID, locID, userID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_DELV_LOC_DETAILS> EditUpdateDropOffLocs(string drpLocID, string locDesc, string orgGroupID, string userID, string prevLocID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.EditUpdateDropOffLocs(drpLocID, locDesc, orgGroupID, userID, prevLocID);
            return result;
        }

        #endregion
    }
}

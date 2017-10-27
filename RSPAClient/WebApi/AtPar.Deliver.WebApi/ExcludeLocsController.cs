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
    public class ExcludeLocsController : ApiController
    {
        #region Private Variable

        private IExcludeLocsService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public ExcludeLocsController(IExcludeLocsService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(ExcludeLocsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_DELV_EXCLUDE_LOC> GetAllLocations(string setID, string location, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetAllLocations(setID, location, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_DELV_EXCLUDE_LOC> ExcludeLocs(List<MT_DELV_EXCLUDE_LOC> lstLocs, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.ExcludeLocs(lstLocs, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

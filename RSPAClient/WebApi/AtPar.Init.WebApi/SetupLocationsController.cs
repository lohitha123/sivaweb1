using AtPar.Common;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    [RoutePrefix("api/SetupLocations")]
    public class SetupLocationsController : ApiController
    {

        #region Private Variable

        private ISetupLocationsService _setupLocationsService;
        private ILog _log;

        #endregion

        #region Constructor

        public SetupLocationsController(ISetupLocationsService setupLocationsService, ILog log)
        {
            _setupLocationsService = setupLocationsService;
            _log = log;
            _log.SetLoggerType(typeof(SetupLocationsController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Inserting And Updating Location IDs
        /// </summary>
        /// <param name="locIDS"></param>
        /// <param name="mode"></param>
        /// <param name="newOrgID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [Route("InsertUpdateLocIDs")]
        [HttpPost]
        public AtParWebApiResponse<long> InsertUpdateLocIDs([FromBody] List<VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS> locIDS, string mode, string newOrgID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupLocationsService.InsertUpdateLocIDs(locIDS, mode, newOrgID, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

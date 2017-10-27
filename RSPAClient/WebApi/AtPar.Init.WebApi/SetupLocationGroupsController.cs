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
    public class SetupLocationGroupsController : ApiController
    {
        #region Private Variable

        private ISetupLocationGroupsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public SetupLocationGroupsController(ISetupLocationGroupsService service, ILog log)
        {
            _log = log;
            _service = service;
            _log.SetLoggerType(typeof(SetupLocationGroupsController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Inserting Location Groups
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="groupID"></param>
        /// <param name="groupDescr"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> InsertLocationGroups(string orgID, string groupID, string groupDescr, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.InsertLocationGroups(orgID, groupID, groupDescr, userID);
            return result;

        }

        /// <summary>
        /// Updating Location Groups
        /// </summary>
        /// <param name="status"></param>
        /// <param name="locGrpID"></param>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        [HttpPut]
        public AtParWebApiResponse<long> UpdateLocationGroups(int status, string locGrpID, string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateLocationGroups(status, locGrpID, orgGrpID);
            return result;

        }

        /// <summary>
        /// Getting Location Groups
        /// </summary>
        /// <param name="locGrpID"></param>
        /// <param name="locGrpDescr"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_LOC_GROUPS> GetLocationGroups(string locGrpID, string locGrpDescr, string orgID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetLocationGroups(locGrpID, locGrpDescr, orgID);
            return result;

        }

        /// <summary>
        /// inserting Location Details
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="locGroupID"></param>
        /// <param name="clientIP"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="userID"></param>
        /// <param name="lstLocGroups"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> InsertLocationDetails(string orgID, string locGroupID, string clientIP, string orgGroupID, string userID, [FromBody] List<VM_MT_ATPAR_SETUP_LOCATIONGROUPS> lstLocGroups, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.InsertLocationDetails(orgID, locGroupID, clientIP, orgGroupID, userID, lstLocGroups);
            return result;

        }

        /// <summary>
        /// Getting Excluded Locations
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_DELV_EXCLUDE_LOC> GetExcludedLocations([FromUri]string[] deviceTokenEntry)
        {
            var result = _service.GetExcludedLocations();
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_MT_ATPAR_LOCATION_DETAILS> GetLocationDetails(string bUnit, string locID, int appID, string userID, string orgGroupID, string locGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetLocationDetails(bUnit, locID, appID, userID, orgGroupID, locGroupID, deviceTokenEntry);
            return result;

        }

        #endregion
    }
}

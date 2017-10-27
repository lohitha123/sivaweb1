using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    [RoutePrefix("api/ManageOrgGroups")]
    public class ManageOrgGroupsController : ApiController
    {
        #region Private Variable

        private IManageOrgGroupsService _manageOrgGroupService;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageOrgGroupsController(IManageOrgGroupsService manageOrgGroupService, ILog log)
        {
            _manageOrgGroupService = manageOrgGroupService;
            _log = log;
            _log.SetLoggerType(typeof(ManageOrgGroupsController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Saving Org Group Info To MT_ATPAR_ORG_GROUPS
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <param name="orgGrpName"></param>
        /// <param name="prvOrgID"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveOrgGroupsInfo")]
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> SaveOrgGroupsInfo(string orgGrpID, string orgGrpName, string prvOrgID, string user, [FromUri] string[] deviceTokenEntry)
        {
            var result = _manageOrgGroupService.SaveOrgGroupsInfo(orgGrpID, orgGrpName, prvOrgID, user);
            return result;

        }

        /// <summary>
        /// Updating Org Groups To MT_ATPAR_ORG_GROUPS
        /// </summary>
        /// <param name="orgGrpName"></param>
        /// <param name="prvOrgID"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("UpdateOrgGroupsInfo")]
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> UpdateOrgGroupsInfo(string orgGrpName, string prvOrgID, string user, [FromUri] string[] deviceTokenEntry)
        {
            var result = _manageOrgGroupService.UpdateOrgGroupsInfo(orgGrpName, prvOrgID, user);
            return result;

        }

        /// <summary>
        /// Saving Org Groups BUnits to MT_ATPAR_ORG_GROUP_BUNITS
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="lstOrgGrpParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveOrgGroupsBUnits")]
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS> SaveOrgGroupsBUnits(string userID, string orgGrpID, [FromBody] List<MT_ATPAR_ORG_GROUP_BUNITS> lstOrgGrpParams, [FromUri] string[] deviceTokenEntry)
        {
            var result = _manageOrgGroupService.SaveOrgGroupsBUnits(userID, orgGrpID, lstOrgGrpParams);
            return result;
        }

        #endregion
    }
}

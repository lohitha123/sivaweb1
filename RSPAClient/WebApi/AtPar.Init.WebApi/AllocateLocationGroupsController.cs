using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class AllocateLocationGroupsController : ApiController
    {
        #region Private Variable

        private IAllocateLocationGroupsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public AllocateLocationGroupsController(IAllocateLocationGroupsService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(AllocateLocationGroupsController));           
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_LOC_GROUPS> GetLocationGroups(string orgGroupID, string userId, string locationGroupId,
                                                                         string displayMode, short appId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetLocationGroups(orgGroupID, userId, locationGroupId, displayMode, appId);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> InsertLocationGroups(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string orgGroupID, string locationGroupId,
                                         string assignedUserId, string userId, string clientIP, short appId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.InsertLocationGroups(lstLocationGroups, orgGroupID, locationGroupId, assignedUserId, userId, clientIP, appId);
            return result;

        }

        [HttpPut]
        public AtParWebApiResponse<long> DeleteLocationDetails(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroupDetails, string orgGroupID,
                                                               string locationGroupId, string userId, short appId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.DeleteLocationDetails(lstLocationGroupDetails, orgGroupID, locationGroupId, userId, appId);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> MoveLocationDetails(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string fromUserId, string toUserId,
                                                             string orgGroupID, string locationGroupId, string userId, string clientIP, short appId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.MoveLocationDetails(lstLocationGroups, fromUserId, toUserId, orgGroupID, locationGroupId, userId, clientIP, appId);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> CopyLocationDetails(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string copyToUserId, string userId,
                                                             string orgGroupID, string locationGroupId, string clientIP, short appId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CopyLocationDetails(lstLocationGroups, copyToUserId, userId, orgGroupID, locationGroupId, clientIP, appId);
            return result;

        }

        #endregion
    }
}

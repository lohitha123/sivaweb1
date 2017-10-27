using System.Collections.Generic;
using System.Web.Http;
using AtPar.Service.Interfaces.Init;
using AtPar.POCOEntities;
using AtPar.Common;
using log4net;
using System;

namespace AtPar.Init.WebApi
{
    public class ManageOrgIDController : ApiController
    {
        #region Private Variable

        private IManageOrgIDService _manageOrgIDService;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageOrgIDController(IManageOrgIDService manageOrgIDService, ILog log)
        {
            _manageOrgIDService = manageOrgIDService;
            _log = log;
            _log.SetLoggerType(typeof(ManageOrgIDController));
        }

        #endregion

        #region Public Methods
        [HttpGet]
        public AtParWebApiResponse<RM_ORG_UNITS> GetOrgUnits(string userId, string orgId,
                                                             string orgType, string orgName,
                                                             string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _manageOrgIDService.GetOrgUnits(userId, orgId, orgType, orgName, status, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateOrgIDStatus(string userID, string orgID,
                                                           string orgType, bool status,
                                                           [FromUri] string[] deviceTokenEntry)
        {
            var result = _manageOrgIDService.UpdateOrgIDStatus(userID, orgID, orgType, status, deviceTokenEntry);
            return result;
        }


        [HttpPost]
        public AtParWebApiResponse<long> InsertUpdateOrgUnits(string userID, [FromBody] List<RM_ORG_UNITS> lstOrgUnits,
                                                    string mode, string newType, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _manageOrgIDService.InsertUpdateOrgUnits(userID, lstOrgUnits, mode, newType, deviceTokenEntry);
            return result;

        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> GetOrgGrpIDs(string userID, string orgGrpID,
                                                                     string name, [FromUri] string[] deviceTokenEntry)
        {

            var result = _manageOrgIDService.GetOrgGrpIDs(userID, orgGrpID, name, deviceTokenEntry);
            return result;

        }

        #endregion
    }
}

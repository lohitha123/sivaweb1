using AtPar.Common;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    [RoutePrefix("api/ManageProfiles")]
    public class ManageProfilesController : ApiController
    {
        #region Private Variable

        private ILog _log;
        private IManageProfilesService _manageProfileService;

        #endregion

        #region Constructor

        public ManageProfilesController(ILog log, IManageProfilesService manageProfileService)
        {
            _log = log;
            _manageProfileService = manageProfileService;
            _log.SetLoggerType(typeof(ManageProfilesController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Adding Profile Info
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="pstrAlterProfileCtoS"></param>
        /// <param name="userID"></param>
        /// <param name="profileDescr"></param>
        /// <param name="dsProfile"></param>
        /// <param name="clientAddr"></param>
        /// <param name="appID"></param>
        /// <returns></returns>
        [Route("AddProfileInfo")]
        [HttpPost]
        public AtParWebApiResponse<long> AddProfileInfo([FromUri]string profileID, [FromUri] bool pstrAlterProfileCtoS, [FromUri] string userID, [FromUri]string profileDescr, [FromBody] Dictionary<string, dynamic> dsProfile, [FromUri] string clientAddr, [FromUri] int appID, [FromUri] string[] deviceTokenEntry)
        {
            var response = _manageProfileService.AddProfileInfo(profileID, pstrAlterProfileCtoS, userID, profileDescr, dsProfile, clientAddr, appID);

            if (response.StatusCode == 1112331)
            {
                response.StatusMessage = "profile " + profileID + " already exists";
            }
            return response;

        }

        /// <summary>
        /// Updating Profile Info
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="pstrAlterProfileCtoS"></param>
        /// <param name="userID"></param>
        /// <param name="profileDescr"></param>
        /// <param name="dsProfile"></param>
        /// <param name="clientAddr"></param>
        /// <param name="appID"></param>
        /// <returns></returns>
        [Route("UpdateProfileInfo")]
        [HttpPut]
        public AtParWebApiResponse<long> UpdateProfileInfo([FromUri]string profileID, [FromUri] bool pstrAlterProfileCtoS, [FromUri] string userID, [FromUri]string profileDescr, [FromBody] Dictionary<string, dynamic> dsProfile, [FromUri] string clientAddr, [FromUri] int appID, [FromUri] string[] deviceTokenEntry)
        {
            var response = _manageProfileService.UpdateProfileInfo(profileID, pstrAlterProfileCtoS, userID, profileDescr, dsProfile, clientAddr, appID);
            return response;

        }

        /// <summary>
        /// Getting Profile Info
        /// </summary>
        /// <param name="profileID"></param>
        /// <returns></returns>
        [Route("GetProfileInfo")]
        [HttpGet]
        public AtParWebApiResponse<long> GetProfileInfo(string profileID, [FromUri] string[] deviceTokenEntry)
        {
            var response = new AtParWebApiResponse<long>();
            if (string.IsNullOrEmpty(profileID))
            {
                profileID = string.Empty;
            }
            response = _manageProfileService.GetProfileInfo(profileID);
            return response;

        }

        #endregion
    }
}

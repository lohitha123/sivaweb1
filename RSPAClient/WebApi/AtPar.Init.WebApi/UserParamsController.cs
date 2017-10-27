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
    [RoutePrefix("api/UserParams")]
    public class UserParamsController : ApiController
    {
        #region Private Variable

        private IUserParamsService _userParams;
        private ILog _log;

        #endregion

        #region Constructor

        public UserParamsController(IUserParamsService userParams, ILog log)
        {
            _userParams = userParams;
            _log = log;
            _log.SetLoggerType(typeof(UserParamsController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Getting User Parameters
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="userID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        //pSvruserID from token, pappID from query string and  puserID from UI dropdown
        [Route("GetUserParams")]
        [HttpGet]
        public AtParWebApiResponse<VM_MT_ATPAR_USER_PARAMS> GetUserParams(string appID, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userParams.GetUserParams(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), appID, userID, deviceTokenEntry);
            return result;
        }

        /// <summary>
        /// Updating User Parameters
        /// </summary>
        /// <param name="userParams"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [Route("SetUserParams")]
        [HttpPut]
        public AtParWebApiResponse<long> SetUserParams([FromBody] List<MT_ATPAR_USER_APP_PARAMETERS> userParams, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userParams.SetUserParams(userParams, deviceTokenEntry);
            return result;
        }

        /// <summary>
        /// Getting Parameter Values
        /// </summary>
        /// <param name="parameterID"></param>
        /// <param name="fieldName"></param>
        /// <param name="tableName"></param>
        /// <param name="whereCondition"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        [Route("GetParameterValues")]
        [HttpGet]
        public AtParWebApiResponse<string> GetParameterValues(string parameterID, string fieldName, string tableName, string whereCondition, string userID,[FromUri] string[] deviceTokenEntry)
        {
            var result = _userParams.GetParameterValues(userID, parameterID, fieldName, tableName, whereCondition);
            return result;
        }

        #endregion
    }
}

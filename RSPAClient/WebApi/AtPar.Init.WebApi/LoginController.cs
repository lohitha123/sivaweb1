using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class LoginController : ApiController
    {
        #region Private Variable

        private ILoginService _loginService;
        private ILog _log;

        #endregion

        #region Constructor

        public LoginController(ILoginService loginService, ILog log)
        {
            _loginService = loginService;
            _log = log;
            _log.SetLoggerType(typeof(LoginController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL> GetAccessToken(string userID,
                                                                 string pPassword, int loginType,
                                                                 string dateTime, string deviceID,
                                                                 string accessToken, bool SSOByPass,
                                                                 [FromUri] string[] deviceTokenEntry)
        {
            var result = _loginService.GetAccessToken(userID, pPassword, loginType, dateTime, deviceID, accessToken, SSOByPass, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_USER> IsValidUser(string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _loginService.IsValidUser(userID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetIpAddress([FromUri] string[] deviceTokenEntry)
        {
            var response = new AtParWebApiResponse<string>();
            response = _loginService.GetIpAddress();
            return response;
        }
        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, string>> IsSSOEnabled([FromUri] string[] deviceTokenEntry)
        {
            var response = _loginService.IsSSOEnabled();
            return response;
        }
        [HttpGet]
        public AtParWebApiResponse<string> ValidateSamlResponse(string SSOUserIDVariable, [FromUri] string[] deviceTokenEntry)
        {
            var response = _loginService.ValidateSamlResponse(SSOUserIDVariable);
            return response;
        }
        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, object>> GetSAMLResponse(string SSOVariable, [FromUri] string[] deviceTokenEntry)
        {
            var response = _loginService.GetSAMLResponse(SSOVariable);
            return response;
        }

        [HttpPut]
        public AtParWebApiResponse<string> UpdateHosting(string HostName, [FromUri] string[] deviceTokenEntry)
        {
            var response = _loginService.UpdateHosting(HostName);
            return response;
        }

        [HttpPut]
        public AtParWebApiResponse<string> CreateIzendaUser(string UserId, string SystemId, [FromUri] string[] deviceTokenEntry)
        {
            var response = _loginService.InsertIzendaUser(UserId, SystemId);
            return response;
        }

        #endregion
    }
}

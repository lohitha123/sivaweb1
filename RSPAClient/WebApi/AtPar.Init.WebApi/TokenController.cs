using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.ParManagement.WebApi
{
    public class TokenController : ApiController
    {

        #region Private Variable

        private ITokenService _tokenService;
        private ILog _log;

        #endregion

        #region Constructor

        /// <summary>
        /// Token controller constructor method
        /// </summary>
        /// <param name="tokenService"></param>
        /// <param name="log"></param>
        public TokenController(ITokenService tokenService, ILog log)
        {
            _tokenService = tokenService;
            _log = log;
            _log.SetLoggerType(typeof(TokenController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get all live tokens
        /// </summary>
        /// <param name="pChkValue"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_TOKENS> GetLiveTokens(int pChkValue, [FromUri] string[] deviceTokenEntry)
        {
            var result = _tokenService.GetLiveTokens(pChkValue);
            return result;
        }
        /// <summary>
        /// Used to delete the token by access token
        /// </summary>
        /// <param name="strAccessToken"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_TOKENS> DeleteTokenEntry(string strAccessToken, [FromUri] string[] deviceTokenEntry)
        {
            var result = _tokenService.DeleteTokenEntry(strAccessToken);
            return result;
        }
        /// <summary>
        /// Used to delete all expired tokens at time
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_TOKENS> RunTokenGC([FromUri] string[] deviceTokenEntry)
        {
            var result = _tokenService.RunTokenGC();
            return result;
        }

        #endregion

    }
}

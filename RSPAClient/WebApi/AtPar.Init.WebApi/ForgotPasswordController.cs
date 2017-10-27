using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AtPar.Service.Interfaces.Init;
using AtPar.POCOEntities;
using AtPar.Common;
using log4net;

namespace AtPar.Init.WebApi
{

    public class ForgotPasswordController : ApiController
    {
        #region Private Variable

        ILog _log;
        IForgotPasswordService _forgotPasswordService;

        #endregion

        #region Constructor

        public ForgotPasswordController(IForgotPasswordService forgotPasswordService, ILog log)
        {
            _log = log;
            _forgotPasswordService = forgotPasswordService;
            _log.SetLoggerType(typeof(ForgotPasswordController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_APP> GetForgotHashPassword([FromUri]string[] deviceTokenEntry, string userID, string hintQ = " ", string hintA = " ", string pPassword = " ")
        {
            var result = _forgotPasswordService.ForgotHashPassword(deviceTokenEntry, userID, hintQ, hintA, pPassword);
            return result;
        }

        #endregion
    }
}

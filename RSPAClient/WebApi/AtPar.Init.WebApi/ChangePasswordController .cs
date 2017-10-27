using AtPar.Common;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class ChangePasswordController : ApiController
    {
        #region Private Variable

        ILog _log;
        IChangePasswordService _service;

        #endregion

        #region Constructor

        public ChangePasswordController(IChangePasswordService service, ILog log)
        {
            _log = log;
            _service = service;
            _log.SetLoggerType(typeof(ChangePasswordController));
        }

        #endregion

        #region Public Methods

        [HttpPut]
        public AtParWebApiResponse<long> HashUpdatePassword(string uName, string oldPwd, string pPassword, string hintQ, string hintA, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdatePassword(deviceTokenEntry, uName, pPassword, hintQ, oldPwd, hintA);
            return result;

        }

        #endregion
    }
}
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class TrackITLoginController:ApiController
    {
        #region Private Variable

        private ITrackITLoginService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public TrackITLoginController(ITrackITLoginService service, ILog log)
        {
            _Service = service;
            _log = log;
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<TKIT_REQUESTOR> CheckLogin(string userID, string pPassword, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.CheckLogin(userID, pPassword);
            return result;
        }

        #endregion
    }
}

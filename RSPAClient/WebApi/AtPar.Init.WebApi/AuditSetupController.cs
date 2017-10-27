using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class AuditSetupController : ApiController
    {
        #region Private Variable

        private IAuditSetupService _auditSetupService;
        private ILog _log;

        #endregion

        #region Constructor

        public AuditSetupController(IAuditSetupService auditSetupService, ILog log)
        {
            _auditSetupService = auditSetupService;
            _log = log;
            _log.SetLoggerType(typeof(AuditSetupController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Getting App Menus From MT_ATPAR_APP and MT_ATPAR_MENUS
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="appID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_MENUS> GetAppMenus(string userID, int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _auditSetupService.GetAppMenus(appID);
            return result;
        }

        /// <summary>
        /// Saving Audit Setup Info to MT_ATPAR_MENUS
        /// </summary>
        /// <param name="lstMenu"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> SaveAuditSetUpInfo([FromBody]List<MT_ATPAR_MENUS> lstMenu, string user, [FromUri] string[] deviceTokenEntry)
        {
            var result = _auditSetupService.SaveAuditSetUpInfo(lstMenu, user);
            return result;
        }

        #endregion
    }
}

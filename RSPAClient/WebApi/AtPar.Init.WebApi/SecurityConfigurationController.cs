using AtPar.Common;
using AtPar.POCOEntities;
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
    public class SecurityConfigurationController : ApiController
    {
        #region Private Variable

        private ISecurityConfigurationService _securityConfigurationService;
        private ILog _log;

        #endregion

        #region Constructor

        public SecurityConfigurationController(ISecurityConfigurationService securityConfigurationService, ILog log)
        {
            _securityConfigurationService = securityConfigurationService;
            _log = log;
            _log.SetLoggerType(typeof(SecurityConfigurationController));
        }

        #endregion

        #region Public Methods

        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS> UpdateSecurityParams(MT_ATPAR_SECURITY_PARAMS securityParams, [FromUri] string[] deviceTokenEntry)
        {
            var result = _securityConfigurationService.UpdateSecurityParams(securityParams);
            return result;
        }

        #endregion

    }
}

using AtPar.Common;
using AtPar.Init.WebApi;
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
    public class ReportsAdHocExtensionController: ApiController
    {
        private IReportsAdHocExtensionService _service;
        private ILog _log;

        public ReportsAdHocExtensionController(IReportsAdHocExtensionService service, ILog log)
        {
            _service = service;
            _log = log;
            Utils.SetProductLog(AtParWebEnums.EnumApps.Init);
            _log.SetLoggerType(typeof(SecurityConfigurationController));
        }
        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, object>> GetOrgGroupsProductUsers(string userID, Guid? reportID)
        {
            var result = _service.GetOrgGroupsProductUsers(userID,reportID);

            return result;

        }
    }
}
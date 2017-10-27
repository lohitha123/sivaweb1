using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Deliver;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Deliver.WebApi
{
   public class ReleasePackagesController : ApiController
    {

        private IReleasePackagesService _Service;
        private ILog _log;

        public ReleasePackagesController(IReleasePackagesService service, ILog log)
        {
            _Service = service;
            _log = log;
            Utils.SetProductLog(AtParWebEnums.EnumApps.Init);
            _log.SetLoggerType(typeof(ExcludeLocsController));
        }

        [HttpGet]
        public AtParWebApiResponse<VM_RELEASEPACKAGES> GetReleasePackages(int appId, string userId, string orgGroupId, string bunit,
           string trckNoOrPoIdOrLoc,[FromUri] string[] deviceTokenEntry, string flag = "", string transId = "")
        {
            var result = _Service.GetReleasePackages(appId, userId, orgGroupId, bunit, trckNoOrPoIdOrLoc, deviceTokenEntry, flag, transId);
            return result;
        }

    }
}

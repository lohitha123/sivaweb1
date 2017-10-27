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
    public class ManageOrgParmsController : ApiController
    {
        private IManageOrgParmsService _manageorgparamsService;
        private ILog _log;

        public ManageOrgParmsController(IManageOrgParmsService manageorgparamsService, ILog log)
        {
            _manageorgparamsService = manageorgparamsService;
            _log = log;
            _log.SetLoggerType(typeof(ManageOrgParmsController));
        }
        

    }
}

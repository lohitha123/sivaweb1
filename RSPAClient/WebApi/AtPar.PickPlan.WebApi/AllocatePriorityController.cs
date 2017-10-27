using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.PickPlan;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.PickPlan.WebApi
{
    public class AllocatePriorityController : ApiController
    {
        #region Private Variable

        private IAllocatePriorityService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public AllocatePriorityController(IAllocatePriorityService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(AllocatePriorityController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_PKPL_PRIORITY> GetLocationPriorities(string bUnit, string location, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetLocationPriorities(bUnit, location, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_PKPL_PRIORITY> SaveLocationPriorities(string priority, List<MT_PKPL_PRIORITY> priorities, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.SaveLocationPriorities(priority, priorities);
            return result;
        }

        #endregion
    }
}

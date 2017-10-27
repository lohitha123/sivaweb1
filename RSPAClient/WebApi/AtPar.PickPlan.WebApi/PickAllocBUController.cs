using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.PickPlan;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtPar.PickPlan.WebApi
{
     
    public class PickAllocBUController : ApiController
    {
        #region Private Variable

        private IPickAllocBUService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public PickAllocBUController(IPickAllocBUService inventorybusinessunitService, ILog log)
        {
            _Service = inventorybusinessunitService;
            _log = log;
            _log.SetLoggerType(typeof(PickAllocBUController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits([FromUri] string[] bArray, string appID, string userID, string bUnit, string description, string serverUserID, [FromUri] string[] deviceTokenEntry)
        {                         
                var result = _Service.GetBUnits(bArray, appID, userID, bUnit, description, serverUserID, deviceTokenEntry);
               
                return result;                   
        }
        
        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION> AllocateBUnits(string appID, string userID, string serverUserID,
             List<VM_ATPAR_IBU_ALLOCATION> lstBUnitsAllocation, bool searched, [FromUri] string[] deviceTokenEntry)
        {           
                var result = _Service.AllocateBUnits(appID, userID, serverUserID, lstBUnitsAllocation, searched, deviceTokenEntry);

                return result;                   
        }

        #endregion

    }
}

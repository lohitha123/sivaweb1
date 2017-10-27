using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.CartCount.WebApi
{
    public class ProcessParametersController : ApiController
    {
        #region Private Variable

        private IProcessParametersService _service;
        private ILog _log;        

        #endregion

        #region Constructor

        public ProcessParametersController(IProcessParametersService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(ProcessParametersController));
            
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> GetCartSchedules(string orgGroupID, string cartID, string bUnit, [FromUri] string[] deviceTokenEntry)
        {          
                var result = _service.GetCartSchedules(orgGroupID, cartID, bUnit);              
                return result;           
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {          
                var result = _service.GetSheduleIDs(orgGroupID);             
                return result;           
        }

        [HttpPut]
        public AtParWebApiResponse<long> AssignScheduleToCarts(List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> lstCartSchedules, string orgGroupID, string bUnit, [FromUri] string[] deviceTokenEntry)
        {         
                var result = _service.AssignScheduleToCarts(lstCartSchedules, orgGroupID, bUnit);               
                return result;           
        }

        [HttpGet]
        public AtParWebApiResponse<VM_CART_SCHEDULES> GetProcessParametersCarts(string orgGroupID, string bUnit, string cartID, 
                                                                                string userID, [FromUri] string[] deviceTokenEntry)
        {           
                var result = _service.GetProcessParametersCarts(orgGroupID, bUnit, cartID, userID, deviceTokenEntry);              
                return result;          
        }

        #endregion

    }
}

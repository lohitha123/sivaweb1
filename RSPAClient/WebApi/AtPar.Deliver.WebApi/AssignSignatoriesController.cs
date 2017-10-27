using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.Deliver.WebApi
{
    public class AssignSignatoriesController : ApiController
    {
        #region Private Variable

        private IAssignSignatoriesService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public AssignSignatoriesController(IAssignSignatoriesService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(AssignSignatoriesController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON> GetCodes(string code, [FromUri] string[] deviceTokenEntry)
        {
                var result = _service.GetCodes(code);              
                return result;        
        }

        [HttpGet]
        public AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON> GetAuthSign(string code, [FromUri] string[] deviceTokenEntry)
        {         
                var result = _service.GetAuthSign(code);            
                return result;          
        }

        [HttpPut]
        public AtParWebApiResponse<long> AddAuthSign(string costCenterCode, string userId, string firstName,
                                                     string lastName, string middleName, [FromUri] string[] deviceTokenEntry)
        {           
                var result = _service.AddAuthSign(costCenterCode, userId, firstName, lastName, middleName);              
                return result;          
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateAuthSign(string newCostCenterCode, string oldCostCenterCode, [FromUri] string[] deviceTokenEntry)
        {
           
                var result = _service.UpdateAuthSign(newCostCenterCode, oldCostCenterCode);              
                return result;         
        }

        [HttpPut]
        public AtParWebApiResponse<long> DeleteAuthSign(string costCenterCode, string userId, [FromUri] string[] deviceTokenEntry)
        {        
                var result = _service.DeleteAuthSign(costCenterCode, userId);             
                return result;         
        }
        #endregion

    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.AssetManagement;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.AssetManagement.WebApi
{
    public class AccessPermissionsController : ApiController
    {
        #region Private Variable

        private IAccessPermissionsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public AccessPermissionsController(IAccessPermissionsService service, ILog log)
        {
            _service = service;
            _log = log;           
            _log.SetLoggerType(typeof(AccessPermissionsController));            
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_UI_FIELDS> GetAccessFields(string appId, string orgGroupId, string userId, string screenName, [FromUri] string[] deviceTokenEntry)
        {           
                var result = _service.GetAccessFields(appId, orgGroupId, userId, screenName);                
                return result;          
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateAccessFields(List<MT_ATPAR_UI_SETUP> lstAccessFieldDetails, string orgGroupId, string userId, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _service.UpdateAccessFields(lstAccessFieldDetails, orgGroupId, userId);             
                return result;
        }            
        #endregion
    }
}

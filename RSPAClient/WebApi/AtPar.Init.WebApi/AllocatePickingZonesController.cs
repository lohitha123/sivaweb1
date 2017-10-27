using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using log4net;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class AllocatePickingZonesController : ApiController
    {

        #region Private Variable

        private IAllocatePickingZonesService _service;
        private ILog _log;        

        #endregion

        #region Constructor

        public AllocatePickingZonesController(IAllocatePickingZonesService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(AllocateLocationGroupsController));
            
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE> GetUserStorageZones(string orgGroupId, string storageZoneId, string userId, short appId)
        {
            var result = _service.GetUserStorageZones(orgGroupId, storageZoneId, userId, appId);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> InsertUserStorageZones(List<MT_ATPAR_STORAGE_ZONE> lstAllocatedStorageZones, string orgGroupId,
                                                              string storageZoneId, string assignedUserId, string userId, short appId)
        {
            var result = _service.InsertUserStorageZones(lstAllocatedStorageZones, orgGroupId, storageZoneId, assignedUserId, userId, appId);
            return result;

        }

        #endregion
    }
}

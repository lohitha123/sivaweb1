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
    [RoutePrefix("api/SetupStorageLocationGroups")]
    public class SetupStorageLocationGroupsController : ApiController
    {
        #region Private Variable

        private ISetupStorageLocationGroupsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public SetupStorageLocationGroupsController(ISetupStorageLocationGroupsService setupStorageLocationGroupsService, ILog log)
        {
            _service = setupStorageLocationGroupsService;
            _log = log;
            _log.SetLoggerType(typeof(SetupStorageLocationGroupsController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Getting Zone Storage Level Details
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="zoneGroupID"></param>
        /// <param name="bUnit"></param>
        /// <param name="area"></param>
        /// <param name="userID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetZoneStorageLevelDetails")]
        public AtParWebApiResponse<MT_ATPAR_ZONE_STORAGE_LEVELS> GetZoneStorageLevelDetails(string orgGroupID, string zoneGroupID, string bUnit, string area, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetZoneStorageLevelDetails(orgGroupID, zoneGroupID, bUnit, area, userID, deviceTokenEntry);
            return result;

        }

        /// <summary>
        /// Inserting Storage Zone Groups
        /// </summary>
        /// <param name="zoneID"></param>
        /// <param name="zoneDescr"></param>
        /// <param name="userID"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> InsertStorageZoneGroups(string zoneID, string zoneDescr, string userID, string orgID, [FromUri] string[] deviceTokenEntry)
        {

            var result = _service.InsertStorageZoneGroups(zoneID, zoneDescr, userID, orgID);
            return result;
        }

        /// <summary>
        /// Getting Storage Zone Groups
        /// </summary>
        /// <param name="zoneGrpID"></param>
        /// <param name="zoneGrpDescr"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE> GetStorageZoneGroups(string zoneGrpID, string zoneGrpDescr, string orgID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetStorageZoneGroups(zoneGrpID, zoneGrpDescr, orgID);
            return result;
        }

        /// <summary>
        /// Updating Zones
        /// </summary>
        /// <param name="zoneID"></param>
        /// <param name="zoneDescr"></param>
        /// <param name="status"></param>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        [HttpPut]
        public AtParWebApiResponse<long> UpdateZones(string zoneID, string zoneDescr, int status, string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateZones(zoneID, zoneDescr, status, orgGrpID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> InsertzoneStorageLevels(string userID, string orgGroupID, string zoneGroupID, [FromBody] List<MT_ATPAR_ZONE_STORAGE_LEVELS> lstZoneStorageLevels, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.InsertzoneStorageLevels(userID, orgGroupID, zoneGroupID, lstZoneStorageLevels);
            return result;
        }

        #endregion
    }
}

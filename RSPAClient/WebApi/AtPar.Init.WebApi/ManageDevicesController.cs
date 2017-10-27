using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.Common;
using AtPar.Service.Interfaces.Init;
using AtPar.POCOEntities;
using log4net;

namespace AtPar.Init.WebApi
{

    public class ManageDevicesController : ApiController
    {
        #region Private Variable

        IManageDevicesService _manageDevicesService;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageDevicesController(IManageDevicesService manageDevicesService, ILog log)
        {
            _manageDevicesService = manageDevicesService;
            _log = log;
            Utils.SetProductLog(AtParWebEnums.EnumApps.Init);
            _log.SetLoggerType(typeof(ManageDevicesController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> GetDevices(string userID,string deviceSearch, [FromUri] string[] deviceTokenEntry)
        {
            var request = _manageDevicesService.GetDevIDs(userID, deviceSearch, deviceTokenEntry);
            return request;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> SaveDevice(string userID, string devID, string desc, string macAddr, [FromUri] string[] deviceTokenEntry)
        {
            var result = _manageDevicesService.SaveDevIDs(userID, devID, desc, macAddr, deviceTokenEntry);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> UpdateDevice(string userID, string devID, string desc, string oldMacAddr, string newMacAddr, [FromUri] string[] deviceTokenEntry)
        {
            var result = _manageDevicesService.UpdateDevIDs(userID, devID, desc, oldMacAddr, newMacAddr, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> DeleteDevice(string userID, string devID, string desc, string macAddr, [FromUri] string[] deviceTokenEntry)
        {
            var result = _manageDevicesService.DisableDevIDs(userID, devID, desc, macAddr, deviceTokenEntry);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> UpdateDeviceStatus(string userID, string devID, string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _manageDevicesService.UpdateDevStatus(userID, devID, status, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

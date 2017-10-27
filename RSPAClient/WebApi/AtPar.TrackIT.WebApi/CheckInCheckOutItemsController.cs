using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System.Web.Http;
using System.Collections.Generic;

namespace AtPar.TrackIT.WebApi
{
    public class CheckInCheckOutItemsController : ApiController
    {
        #region Private Variable

        private ILog _log;
        private ICheckInCheckOutItemsService _service;

        #endregion

        #region Constructor

        public CheckInCheckOutItemsController(ILog log, ICheckInCheckOutItemsService service)
        {
            _log = log;
            _service = service;
            _log.SetLoggerType(typeof(CheckInCheckOutItemsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<string> GetTypeIndicator(string itemId)
        {
            var result = _service.GetTypeIndicator(itemId);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> CheckEqItemAvailability(string itemId, string requestor)
        {
            var result = _service.CheckEqItemAvailability(itemId, requestor);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<string> CheckItemAvailability(string itemId, string requestor, string itemTypeIndicator)
        {
            var result = _service.CheckItemAvailability(itemId, requestor, itemTypeIndicator);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<string> CheckSerialId(string itemId, string serialId)
        {
            var result = _service.CheckSerialId(itemId, serialId);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_TKIT_ITEM_DETAILS> GetItemDetails(string itemId, string requestor, string itemTypeIndicator, string serialId)
        {
            var result = _service.GetItemDetails(itemId, requestor, itemTypeIndicator, serialId);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_REQUESTOR> GetRequestors(bool inActiveCheck, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetRequestors(inActiveCheck, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString());
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> CheckInOutItems(List<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> lstCheckInOutItemDetails, string requestedUserId,
                                                         string checkInOutMode, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CheckInOutItems(lstCheckInOutItemDetails, requestedUserId, checkInOutMode, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<RM_SHIP_TO_LOCACTION> GetLocations(string orgGrpId)
        {
            var result = _service.GetLocations(orgGrpId);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_REQUESTOR_DEPT> GetUserDepts([FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetUserDepts(deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_DEPT> GetTKITDepts(string deptID, string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetTKITDepts(deptID, status,deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> GetItems(string itemID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetItems(itemID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_ITEM_INVENTORY> GetSerialIDs(string itemID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetSerialIDs(itemID);
            return result;
        }
        #endregion

    }
}

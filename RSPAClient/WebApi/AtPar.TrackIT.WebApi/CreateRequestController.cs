using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class CreateRequestController : ApiController
    {
        #region Private Variable

        private ICreateRequestService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public CreateRequestController(ICreateRequestService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(CreateRequestController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_TKIT_EQPITEMS> GetEquipmentItems(string eqpType, string itemDescr, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetEquipmentItems(eqpType, itemDescr, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_ITEM_TYPE> GetEquipmentType(string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetEquipmentType(userID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_TKIT_EQPITEMS> GetSearchItems(string itemID, string itemDescr, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetSearchItems(itemID, itemDescr, userID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE> GetPatientList([FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetPatientList();
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE> GetPatientList(string itemID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetPatientList(itemID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_ITEM_MASTER> GetItemsForAutoSearch(string eqType, string eqpInidcator, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetItemsForAutoSearch(eqType, eqpInidcator, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

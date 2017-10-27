using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class ManageEquipmentTypeController : ApiController
    {
        #region Private Variable

        private IManageEquipmentTypeService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageEquipmentTypeController(IManageEquipmentTypeService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(ManageEquipmentTypeController));
        }

        #endregion

        #region Public Methods

        [HttpPost]
        public AtParWebApiResponse<long> UpdateEqTypeData(TKIT_ITEM_TYPE itemType, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.UpdateEqTypeData(itemType);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> SaveEqTypeData(TKIT_ITEM_TYPE itemType, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.SaveEqTypeData(itemType);
            return result;
        }

        #endregion
    }
}

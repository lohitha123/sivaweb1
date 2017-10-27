using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.ParManagement;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.ParManagement.WebApi
{
    public class ManageParLocationsController : ApiController
    {
        #region Private Variables

        private IManageParLocationsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageParLocationsController(IManageParLocationsService parLocService, ILog log)
        {
            _service = parLocService;
            _log = log;
            _log.SetLoggerType(typeof(SetupParLocationsController));

        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS> GetMultipleLocations(string orgID, string locID, string locName,
                                                                string orgGroupID, string depID, string depName,
                                                                string itemID, string itemName, string priceFrom,
                                                                string priceTo, int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetMultipleLocations(orgID, locID, locName, orgGroupID, depID, depName, itemID, itemName,
                                                                 priceFrom, priceTo, appID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_PAR_MNGT_PAR_LOCATION> GetItemsToAddMulParLocReqTypeU(string itemID, string orgGroupID, string orgID, string parLocIDs, string appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetItemsToAddMulParLocReqTypeU(itemID, orgGroupID, orgID, parLocIDs, appID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_PAR_MNGT_PAR_HEADER> GetItemsToAddMulParLoc(string itemID, string orgGroupID, string orgID, string parLocIDs, string appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetItemsToAddMulParLoc(itemID, orgGroupID, orgID, parLocIDs, appID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateMultipleParItems(List<PAR_MNGT_PAR_LOC_DETAILS> lstItems, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateMultipleParItems(lstItems, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

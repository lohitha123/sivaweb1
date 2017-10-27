using AtPar.Common;
using AtPar.ParManagement.Service;
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
    public class SetupInventoryController : ApiController
    {
        #region Private Variable

        private ISetupInventoryService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public SetupInventoryController(ISetupInventoryService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(SetupInventoryController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDetails(string orgID, string orgGroupID, string itemID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetItemDetails(orgID, orgGroupID, itemID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDetailsForAutoComplete(string orgID, string orgGroupID, string itemID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetItemDetailsForAutoComplete(orgID, orgGroupID, itemID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> InsertInventoryItems(MT_ATPAR_PHYSICAL_INVENTORY inventory, string altStorLoc1, string altStorLoc2,
                                                              string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.InsertInventoryItems(inventory, altStorLoc1, altStorLoc2, orgGroupID);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateOrgItemStatus(string orgID, string itemID, string uom, string dfltStorLoc,
                                                             string altStorloc1, string altStorLoc2, string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.UpdateOrgItemStatus(orgID, itemID, uom, dfltStorLoc, altStorloc1, altStorLoc2, status);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_INVENTORY_ITEM_DETAILS> GetExistingItemDetails(string orgID, string orgGroupID, string itemID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetExistingItemDetails(orgID, orgGroupID, itemID);
            return result;

        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateInventoryItems([FromBody] MT_ATPAR_PHYSICAL_INVENTORY inventory, string oldUOM, string oldDfltStorLoc,
                                            string altStorLoc1, string oldAltStorLoc1, string altStorLoc2, string oldAltStorLoc2, string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.UpdateInventoryItems(inventory, oldUOM, oldDfltStorLoc, altStorLoc1, oldAltStorLoc1,
                                                            altStorLoc2, oldAltStorLoc2, orgGroupID);
            return result;
        }

        #endregion
    }
}

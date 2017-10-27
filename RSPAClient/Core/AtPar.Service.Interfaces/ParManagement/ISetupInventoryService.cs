using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.ParManagement
{
    public interface ISetupInventoryService
    {
        AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDetails(string orgID, string orgGroupID, string itemID);
        AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDetailsForAutoComplete(string orgID, string orgGroupID, string itemID);        
        AtParWebApiResponse<long> InsertInventoryItems(MT_ATPAR_PHYSICAL_INVENTORY inventory, string altStorLoc1, string altStorLoc2, string orgGroupID);
        AtParWebApiResponse<long> UpdateInventoryItems(MT_ATPAR_PHYSICAL_INVENTORY inventory, string oldUOM, string oldDfltStorLoc, string altStorLoc1, string oldAltStorLoc1, string altStorLoc2, string oldAltStorLoc2, string orgGroupID);
        AtParWebApiResponse<long> UpdateOrgItemStatus(string orgID, string itemID, string uom, string dfltStorLoc, string altStorloc1, string altStorLoc2, string status);
        AtParWebApiResponse<VM_INVENTORY_ITEM_DETAILS> GetExistingItemDetails(string orgID, string orgGroupID, string itemID);
    }
}
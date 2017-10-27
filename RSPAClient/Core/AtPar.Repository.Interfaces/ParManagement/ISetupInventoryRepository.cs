using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.ParManagement
{
    public interface ISetupInventoryRepository
    {
        long ChangeStatus(string orgID, string itemID, string uom, string dfltStorLoc, string status);
        int CheckItemExistence(string orgID, string itemID, string uom, string dfltStorLoc, string altStorLoc1, string altStorLoc2);
        long CheckItemHasLocationsOrNot(string orgID, string itemID);
        long DelStorLocDtls(MT_ATPAR_PHYSICAL_INVENTORY inventory, string oldStorLoc, string oldUom);
        List<VM_INVENTORY_ITEM_DETAILS> GetExistingItemDetails(string orgID, string orgGroupID, string itemID);
        List<PAR_MNGT_ITEM> GetItemDetails(string orgGroupID, string itemID);
        List<PAR_MNGT_ITEM> GetItemDetailsForAutoComplete(string orgGroupID, string itemID);        
        string GetMasterOrgGroupID(string orgID);
        long InsertStorLocDtls(MT_ATPAR_PHYSICAL_INVENTORY inventory, string storLoc, string dfltStorLocFlg);
        long UpdateInvItmData(MT_ATPAR_PHYSICAL_INVENTORY inventory, string oldStorLoc, string oldUOM, string oldAltStorLoc1, string oldAltStorLoc2);
        long UpdateStorLocDtls(MT_ATPAR_PHYSICAL_INVENTORY inventory, string oldStorLoc, string newStorLoc, string oldUOM);
        int IsItemExistInItemMaster(string itemID);
        int IsItemExistInItemMasterForOrgGroup(string itemID, string orgGroupID);
    }
}

using System;
using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface IManageEquipmentItemsRepository
    {
        List<VM_TKIT_ITEM_DEPT> GetItemDepartments(string itemId, string orgGrpId);
        Tuple<string, List<VM_TKIT_ITEM_MASTER>> GetItemsForSelectedEqType(string equipmentType, string itemId);
        List<TKIT_ITEM_MASTER> GetMasterItems();
        List<TKIT_ITEM_MASTER> GetMasterItems(string itemID,string description);
        long CheckIfItemIsOrdered(string itemId);
        List<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId);
        string GetItemTypeIndicator(string itemType);
        List<VM_TKIT_ITEM_DETAILS> GetBoxItemDetails(string itemType, string itemId);
        List<VM_TKIT_ITEM_DETAILS> GetEquipmentItemDetails(string itemType, string itemId);
        List<VM_TKIT_ITEM_DETAILS> GetFurnitureItemDetails(string itemType, string itemId);
        List<TKIT_ITEM_DEPT> GetDepartments();
        List<TKIT_ITEM_INVENTORY> GetLotSerialDetails(string itemId);
        long UpdateBoxItemInfo(List<VM_TKIT_ITEM_DETAILS> lstItemDetails);
        long UpdateEquipmentItemInfo(List<VM_TKIT_ITEM_DETAILS> lstItemDetails);
        long UpdateFurnitureItemInfo(List<VM_TKIT_ITEM_DETAILS> lstItemDetails);
        long CreateItem(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, List<TKIT_ITEM_INVENTORY> lstItemInvDetails, string itemTypeIndicator);
        long UpdateItem(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, List<TKIT_ITEM_INVENTORY> lstItemInvDetails, string itemTypeIndicator);
    }
}

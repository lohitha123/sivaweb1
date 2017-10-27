using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface ICheckInCheckOutItemsRepository
    {
        List<TKIT_ITEM_INVENTORY> CheckEqItemAvailability(string itemId, string requestor);
        List<TKIT_ITEM_INVENTORY> CheckItemAvailability(string itemId);
        List<TKIT_ITEM_INVENTORY> CheckSerialId(string itemId, string serialId);
        List<VM_TKIT_ITEM_DETAILS> GetItemDetails(string itemId, string requestor, string itemTypeIndicator, string serialId);
        List<TKIT_ITEM_INVENTORY> GetItemQty(string itemId, string requestor, string itemTypeIndicator);
        List<TKIT_ITEM_MASTER> GetItemStatus(string itemId);
        string GetItemTypeIndicator(string itemId);
        List<TKIT_REQUESTOR> GetRequestors(bool inActiveCheck, string orgGroupId);
        long CheckInOutItems(List<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> lstCheckInOutItemDetails, string requestedUserId,
                                    string checkInOutMode, string[] deviceTokenEntry);

        List<RM_SHIP_TO_LOCACTION> GetLocations(string pOrgGrpID);
        List<TKIT_REQUESTOR_DEPT> GetUserDepts(string[] deviceTokenEntry);
        List<TKIT_DEPT> GetTKITDepts(string deptID, string status, string[] deviceTokenEntry);
        string GetDeptID(string deptID, string orgGrpID, string[] deviceTokenEntry);

        List<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> GetItems(string itemID);
        List<TKIT_ITEM_INVENTORY> GetSerialIDs(string itemID);
    }
}
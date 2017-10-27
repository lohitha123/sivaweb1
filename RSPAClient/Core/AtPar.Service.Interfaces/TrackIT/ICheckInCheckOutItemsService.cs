using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface ICheckInCheckOutItemsService
    {
        AtParWebApiResponse<long> CheckEqItemAvailability(string itemId, string requestor);
        AtParWebApiResponse<string> CheckItemAvailability(string itemId, string requestor, string itemTypeIndicator);
        AtParWebApiResponse<string> CheckSerialId(string itemId, string serialId);
        AtParWebApiResponse<VM_TKIT_ITEM_DETAILS> GetItemDetails(string itemId, string requestor, string itemTypeIndicator, string serialId);
        AtParWebApiResponse<TKIT_REQUESTOR> GetRequestors(bool inActiveCheck, string orgGroupId);
        AtParWebApiResponse<string> GetTypeIndicator(string itemId);
        AtParWebApiResponse<long> CheckInOutItems(List<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> lstCheckInOutItemDetails, string requestedUserId,
                                                  string checkInOutMode, string[] deviceTokenEntry);

        AtParWebApiResponse<RM_SHIP_TO_LOCACTION> GetLocations(string pOrgGrpID);
        AtParWebApiResponse<TKIT_REQUESTOR_DEPT> GetUserDepts(string[] deviceTokenEntry);
        AtParWebApiResponse<TKIT_DEPT> GetTKITDepts(string deptID, string status, string[] deviceTokenEntry);
        AtParWebApiResponse<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> GetItems(string itemID);
        AtParWebApiResponse<TKIT_ITEM_INVENTORY> GetSerialIDs(string itemID);


    }
}
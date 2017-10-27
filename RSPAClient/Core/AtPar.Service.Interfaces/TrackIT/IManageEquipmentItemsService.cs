using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface IManageEquipmentItemsService
    {
        AtParWebApiResponse<VM_TKIT_ITEM_DEPT> GetItemDepartments(string itemId, string orgGrpId);
        AtParWebApiResponse<object> GetItemsForSelectedEqType(string equipmentType, string itemId);
        AtParWebApiResponse<TKIT_ITEM_MASTER> GetMasterItems();
        AtParWebApiResponse<TKIT_ITEM_MASTER> GetMasterItems(string itemID,string description);
        AtParWebApiResponse<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId);
        AtParWebApiResponse<bool> IsItemOrdered(string itemId);
        AtParWebApiResponse<object> GetTypeItems(string itemType, string itemId);
        AtParWebApiResponse<long> UpdateItems(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, string itemTypeIndicator);
        AtParWebApiResponse<long> SaveItemDetails(Dictionary<string, dynamic> dicitemdetails,
                                                  string itemTypeIndicator, string mode, string profileId);
    }
}
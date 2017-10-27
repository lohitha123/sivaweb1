using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface ICommonTrackITService
    {
        AtParWebApiResponse<string> GetRequestorDefLoc(string[] deviceTokenEntry);
        AtParWebApiResponse<TKIT_EQ_INDICATOR> GetEqIndicators();
        AtParWebApiResponse<RM_SHIP_TO_LOCACTION> GetLocations(string[] deviceTokenEntry);
        AtParWebApiResponse<long> AddToCart(string eqIndicator, TKIT_CART_MANAGER cartManager, List<TKIT_CART_MANAGER> lstDelItems, string[] deviceTokenEntry);
        AtParWebApiResponse<long> GetLatestValue(int appId, string fieldName);
        AtParWebApiResponse<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId, string searchEqTypeOrDesc);
        AtParWebApiResponse<TKIT_REQUESTOR> GetUserDetails(string requestorID);
        AtParWebApiResponse<long> UpdateUserDetails(TKIT_REQUESTOR requestor, string password, string newPassword);
        AtParWebApiResponse<string> GetTKITMyPreferences(string preference, string requestorID);
        AtParWebApiResponse<PAR_MNGT_VENDOR> GetVendorDetails(string vendorID, string orgGroupID, string search);
        AtParWebApiResponse<TKIT_ITEM_MASTER> GetMasterItemsForTheSelectedEqType(string eqType);
        AtParWebApiResponse<VM_VIEW_CART> GetCartItems(string[] deviceTokenEntry);
    }
}
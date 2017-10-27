using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface ICommonTrackITRepository
    {
        List<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId, string searchEqTypeOrDesc);
        List<RM_SHIP_TO_LOCACTION> GetLocations(string[] deviceTokenEntry);
        string GetRequestorDefLoc(string[] deviceTokenEntry);
        List<TKIT_EQ_INDICATOR> GetEqIndicators();
        long AddToCart(string eqIndicator, TKIT_CART_MANAGER cartManager, List<TKIT_CART_MANAGER> lstDelItems, string[] deviceTokenEntry);
        TKIT_REQUESTOR GetUserDetails(string requestorID);
        long UpdateUserDetails(TKIT_REQUESTOR requestor);
        string GetTKITMyPreferences(string preference, string requestorID);
        List<PAR_MNGT_VENDOR> GetVendorDetails(string vendorID, string orgGroupID, string search);
        List<TKIT_ITEM_MASTER> GetMasterItemsForTheSelectedEqType(string eqType);
        string GetAtparLatestValues(int appID, string fieldName);
        List<VM_VIEW_CART> GetCartItems(string[] deviceTokenEntry);
    }
}
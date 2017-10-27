using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface IViewCartRepository
    {
        long ClearCart(string[] deviceTokenEntry);
        Tuple<long, string> PlaceOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails, string comments, string requrestID, string[] deviceTokenEntry);
        long DeleteCartItem(int id);
        long GetRequestedItemsCount(string[] deviceTokenEntry);
        string GetVendorEmail(string vendorID, string[] deviceTokenEntry);
        List<TKIT_REQUESTOR_DEPT> GetRequestorDepts(string requestorID, string OrgGrpID);
        string GetRequestorOrgGroup(string OrgGrpID);
    }
}

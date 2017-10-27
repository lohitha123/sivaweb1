using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface IViewCartService
    {
        AtParWebApiResponse<long> ClearCart(string[] deviceTokenEntry);        
        AtParWebApiResponse<long> PlaceOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails, string comments,string requestor, string requrestID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> DeleteCartItem(int id);
        AtParWebApiResponse<long> GetRequestedItemsCount(string[] deviceTokenEntry);
    }
}

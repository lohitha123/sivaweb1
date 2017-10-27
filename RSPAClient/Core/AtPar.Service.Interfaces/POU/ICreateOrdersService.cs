using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface ICreateOrdersService
    {
        AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, string locationType = "", string cartType = "", params string[] deviceTokenEntry);
        AtParWebApiResponse<VM_POU_CART_DETAILS> GetCartItemCounts(string bUnit, string cartID, string userID, string itemID,
            string orgGrpID, int appID, params string[] deviceTokenEntry);
        AtParWebApiResponse<VM_POU_CART_DETAILS> GetItemsForSelectedLocation(string cartID, string bUnit, string userID,
        string orgGrpID, int appID, params string[] deviceTokenEntry);
        AtParWebApiResponse<long> CreateOrder(Dictionary<string, dynamic> dicDataItems,int appID, params string[] deviceTokenEntry);

    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IAllocateCartsService
    {
        AtParWebApiResponse<long> DeleteCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID);
        AtParWebApiResponse<long> MoveCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID,
                                            string seletedUserID, string bUnit, string cartID);
        AtParWebApiResponse<long> AllocateCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID,
                                                string seletedUserID, string bUnit, string cartID);
        AtParWebApiResponse<long> CopyCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID, string seletedUserID,
                                            string bUnit, string cartID);
        AtParWebApiResponse<object> GetCarts(string orgGroupID, string userID, string bUnit,
                                                  string cartID, string order, string[] deviceTokenEntry);
    }
}

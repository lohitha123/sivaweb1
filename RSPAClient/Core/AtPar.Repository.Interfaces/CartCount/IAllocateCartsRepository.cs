using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface IAllocateCartsRepository
    {
        List<MT_CRCT_USER_ALLOCATION> GetOrphanCarts(string userID, string cartID, string bUnit);
        List<VM_MT_CRCT_USER_ALLOCATION> GetCartDetails(string cartID, string bUnit);
        List<short> GetSchedule(string userID, string cartID, string bUnit);
        long MoveCarts(string userID, string seletedUserID, string cartID, string bUnit, string Desc,
                       int cartCountOrder, string shadowFlag, string countBefore, string selectedDay, bool all);
        long DeleteCarts(string userID, string cartID, string bUnit);
        long AllocateCarts(string userID, string seletedUserID, string cartID, string bUnit, string Desc,
                           int cartCountOrder, string shadowFlag, string countBefore, string selectedDay, string all);
        long CopyCarts(string seletedUserID, string cartID, string bUnit, string Desc,
                              int cartCountOrder, string shadowFlag, string countBefore, string selectedDay, bool all);
    }
}

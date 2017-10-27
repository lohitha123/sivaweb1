using AtPar.POCOEntities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface ICriticalItemsRepository
    {
        long DeleteCriticalItems(string BUnit, string CartId);
        long CreateCriticalItem(string BUnit, string CartId, string ItemID);


        List<MT_CRCT_CRITICAL_ITEMS> GetCriticalItems(string BUnit, string CartId);
        long Check_CartAllocation(string userID, string bUnit, string cartID, DateTime currentDay);
        long UpdateTransaction(AtPar_Transaction_Entity transactionDetails);

        int GetUserGroupsCount(int AppId, string ServerUser);
        List<MT_CRCT_USER_ALLOCATION> GetUserAllocatedCarts(string AppId, string ServerUser, string BUnit);
        List<MT_CRCT_USER_ALLOCATION> GetBUnitAllocatedCarts(string BUnit, string OrgGroupId);


    }
}

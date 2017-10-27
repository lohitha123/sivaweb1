using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface ICriticalItemsService
    {
        AtParWebApiResponse<MT_CRCT_USER_ALLOCATION> GetCartBunitsInfo(string orgGroupId, string serverUser,
                                                          string bunit, params string[] deviceTokenEntry);

        AtParWebApiResponse<MT_CRCT_CRITICAL_ITEMS> AllocateCartItemInfo(List<MT_CRCT_CRITICAL_ITEMS> lstCriticalItems, string BUnit,
                                                           string CartId, string ServerUser, params string[] DeviceTokenEntry);

        AtParWebApiResponse<VM_MT_CRCT_CRITICAL_ITEMS> GetCartItemsInfo(string orgGroupID, string businessUnit,
                                                                        string cartID, string serverUser, string profileID,
                                                                        string[] deviceTokenEntry);
    }
}

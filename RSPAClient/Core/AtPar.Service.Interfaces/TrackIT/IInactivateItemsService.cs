using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface IInactivateItemsService
    {
        AtParWebApiResponse<VM_INACTIVE_ITEMS> GetItemsToInActivate(string typeIndicator, string destDate);
        AtParWebApiResponse<long> InactivateItems(List<TKIT_ITEM_MASTER> lstItemMaster);
    }
}

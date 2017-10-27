using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface IInactivateItemsRepository
    {
        List<VM_INACTIVE_ITEMS> GetItemsToInActivate(string typeIndicator, string destDate);
        long InactivateItems(List<TKIT_ITEM_MASTER> lstItemMaster);
    }
}

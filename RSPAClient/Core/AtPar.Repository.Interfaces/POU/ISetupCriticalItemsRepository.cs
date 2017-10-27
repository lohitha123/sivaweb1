using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface ISetupCriticalItemsRepository
    {
        
        long ProcessCriticalItems(string bUnit, string cartID, List<MT_POU_CRITICAL_ITEMS> lstItems);

    }
}

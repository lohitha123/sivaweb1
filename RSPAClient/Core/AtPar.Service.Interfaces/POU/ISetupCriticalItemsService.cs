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
    public interface ISetupCriticalItemsService
    {

        AtParWebApiResponse<long> SaveCriticalItems(string bUnit, string parLocation, List<MT_POU_CRITICAL_ITEMS> lstItems, params string[] deviceTokenEntry);

    }
}

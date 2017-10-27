
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IRouteService
    {
       List<MT_ATPAR_MENUS> GetRoutes();
    }
}

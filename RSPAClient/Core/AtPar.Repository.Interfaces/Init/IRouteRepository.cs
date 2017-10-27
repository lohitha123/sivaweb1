
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace AtPar.Repository.Interfaces.Init
{

    public interface IRouteRepository
    {
       List<MT_ATPAR_MENUS> GetRoutes();
    }
}

using AtPar.Service.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Repository.Interfaces.Init;
using log4net;
using AtPar.POCOEntities;

namespace AtPar.Init.Service
{
    public class RouteService : IRouteService
    {
        IRouteRepository _repository;
        private ILog log;

        public RouteService(IRouteRepository repository, ILog log)
        {
            _repository = repository;
            this.log = log;
        }

        public List<MT_ATPAR_MENUS> GetRoutes()
        {
             return _repository.GetRoutes();
        }
    }
}

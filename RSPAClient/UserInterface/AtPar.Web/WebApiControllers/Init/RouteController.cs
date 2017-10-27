using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AtPar.POCOModels;
using AtPar.Service.Interfaces.Init;

namespace AtPar.Web.WebApiControllers.Init
{
    [RoutePrefix("api/Route")]
    public class RouteController : ApiController
    {
        private IRouteService _service;

        public RouteController(IRouteService Service)
        {
            _service = Service;
        }

        [Route("GetRoutes")]
        [HttpGet]
        public List<MT_ATPAR_ROUTES_Model> GetRoutes()
        {
            return _service.GetRoutes();
        }


    }
}

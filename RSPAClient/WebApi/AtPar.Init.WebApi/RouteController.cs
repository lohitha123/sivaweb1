using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AtPar.Service.Interfaces.Init;
using AtPar.POCOEntities;

namespace AtPar.WebApi.Controllers.Init
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
        public List<MT_ATPAR_MENUS> GetRoutes()

        {
            return _service.GetRoutes();
        }


    }
}
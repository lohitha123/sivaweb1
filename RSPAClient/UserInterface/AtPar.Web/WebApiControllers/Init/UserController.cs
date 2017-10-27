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
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        } 

        [Route("CreateUser")]
        [HttpPost]
        public HttpResponseMessage CreateUser(MT_ATPAR_USER_Model User)
        {
            var objUser = new MT_ATPAR_USER_Model();
            objUser.USER_ID = "ohUser";
            _userService.CreateUser(objUser);

            return null;
        }

        [Route("GetAllUsers")]
        [HttpGet]
        public List<MT_ATPAR_USER_Model> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        [Route("Login")]
        [HttpGet]
        public bool Login(string Uname)
        {
            return _userService.GetAllUsers();
        }



    }
}

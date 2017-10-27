using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class TestController : ApiController
    {        
        public IHttpActionResult GetAllUsers()
        {
            var result = "test Value";

            if (result != string.Empty)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }

        }
    }
}

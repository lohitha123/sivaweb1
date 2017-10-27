using AtPar.Common;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
     public class SettingsController: ApiController
    {
        [HttpGet]
        public AtParWebApiResponse<string> TestConnection()
        {
            var response = new AtParWebApiResponse<string>();
            response.StatType = AtParWebEnums.StatusType.Success;
            response.StatusCode = AtparStatusCodes.ATPAR_OK;
            return response;
        }
    }
}

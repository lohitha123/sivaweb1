using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface ILoginService
    {
        AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL> GetAccessToken(string userID,
                                      string passHash, int loginType, string dateTime,
                                      string deviceID, string accessToken,
                                      bool SSOByPass, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_USER> IsValidUser(string userID);
        AtParWebApiResponse<string> GetIpAddress();
        AtParWebApiResponse<Dictionary<string, string>> IsSSOEnabled();
        AtParWebApiResponse<string> ValidateSamlResponse(string SSOUserIdVariable);
        AtParWebApiResponse<Dictionary<string, object>> GetSAMLResponse(string SSOVariable);
        AtParWebApiResponse<string> UpdateHosting(string HostName);
        AtParWebApiResponse<string> InsertIzendaUser(string UserId, string SystemId);

    }
}

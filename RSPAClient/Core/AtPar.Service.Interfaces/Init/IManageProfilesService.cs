using System.Collections.Generic;
using AtPar.Common;

namespace AtPar.Service.Interfaces.Init
{
    public interface IManageProfilesService
    {
        AtParWebApiResponse<long> AddProfileInfo(string profileID, bool alterProfileCtoS, string userID, string profileDescr, Dictionary<string, dynamic> dictProfile, string clientAddr, int appID);
        AtParWebApiResponse<long> GetProfileInfo(string profileID);
        AtParWebApiResponse<long> UpdateProfileInfo(string profileID, bool alterProfileCtoS, string userID, string profileDescr, Dictionary<string, dynamic> dictProfile, string clientAddr, int appID);
    }
}
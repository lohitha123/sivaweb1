using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface ILoginRepository
    {
        int ValidateSystem(string pSystemID);

        int AllowRegDevices();

        int ValidateDevice(string pSystemID, string pDeviceID);

        MT_ATPAR_USER_PROFILE_APP_ACL_ORG CheckUserLogin(string UserName, string Passhash, int LoginType, string AtParDateTime, string DeviceID, string AccessToken, bool SSOByPass);

        void SaveLoginAttempts(string userId, string deviceId, string deviceToken, string reasonCode, string lastClientAddress);

        List<int> GetProfileApps(string ProfileID, int LoginType);

        void SaveAccessToken(string CurrentAccessToken, string UserName, string PassHash, string OrgGroupID, string DeviceID, DateTime ExpiryDateTime, DateTime RequestDateTime, string LdapUser, int IdleTime, string oldAccessToken, string ProfileID);

        int IsValidUser(string pUserId);

        long UpdateHostName(string hostName);
        long UpdateHostStatus();
        long UpdateCustomFunction();
        long InsertingReportingUser( string SystemId, string userID);
        bool IsServerUser(string UserId);


    }
}

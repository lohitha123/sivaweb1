using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class ManageUsersController : ApiController
    {
        #region Private Variable

        private IManageUsersService _manageUsersService;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageUsersController(IManageUsersService manageUsersService, ILog log)
        {
            _manageUsersService = manageUsersService;
            _log = log;
            _log.SetLoggerType(typeof(ManageUsersController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_PROFILE_MENU> IsMenuAssigned(string chkMenuName, [FromUri] string[] deviceTokenEntry)
        {
            var response = _manageUsersService.IsMenuAssigned(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString(), chkMenuName);
            return response;
        }


        [HttpGet]
        public AtParWebApiResponse<VM_MT_ATPAR_USER> GetManageUsers([FromUri] string[] deviceTokenEntry)
        {
            var response = _manageUsersService.GetManageUsers(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString(), string.Empty);
            return response;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL_ORG> GetUsers(string searchID, [FromUri] string[] deviceTokenEntry)
        {
            var response = _manageUsersService.GetUsers(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString(), searchID);
            return response;
        }

        [HttpPost]
        public AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> UpdateUser(VM_MT_ATPAR_USER_ADD users, [FromUri] string[] deviceTokenEntry)
        {
            var response = _manageUsersService.UpdateUser(users);
            return response;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_MT_ATPAR_USER> GetUserDetails(string userID, [FromUri] string[] deviceTokenEntry)
        {
            var response = _manageUsersService.GetUserDetails(userID);
            return response;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_USER> RefreshUserDN(string user, string userFname, string userLname, [FromUri] string[] deviceTokenEntry)
        {
            var response = _manageUsersService.RefreshUserDN(user, userFname, userLname);
            return response;
        }

        #endregion

    }
}

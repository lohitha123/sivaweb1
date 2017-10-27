using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;

namespace AtPar.Init.Service
{
    public class UserService : IUserService
    {
        #region Private Variables

        IUserRepository _userRep;
        ICommonRepository _commonRepo;
        ILog log;

        #endregion

        #region Constructor
        public UserService(IUserRepository repository, ILog log, ICommonRepository commonRepo)
        {
            _commonRepo = commonRepo;
            _userRep = repository;
            this.log = log;
            this.log.SetLoggerType(typeof(UserService));
        }

        #endregion

        #region GetAppRoleIDs
        /// <summary>
        /// To get app role IDs
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL> GetAppRoleIDs(string UserId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (log.IsDebugEnabled) { log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL>();

            try
            {
                response.DataList = _userRep.GetAppRoleIDs(UserId);
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, log);
                return response;
            }

        }

        #endregion

        #region GetGroupMenusList
        /// <summary>
        /// To get group menus list
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetGroupMenusList(string profileID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (log.IsDebugEnabled) { log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            List<MT_ATPAR_APP> lstApps = new List<MT_ATPAR_APP>();
            List<MT_ATPAR_APP_GROUP> lstAppGroups = new List<MT_ATPAR_APP_GROUP>();
            List<VM_GROUP_MENUS_LIST> lstMenus = new List<VM_GROUP_MENUS_LIST>();
            List<VM_REPORTS_MENUS_LIST> lstReportMenus = new List<VM_REPORTS_MENUS_LIST>();
            MT_ATPAR_APP reportsApp = new MT_ATPAR_APP();

            List<string> lstParameters = new List<string>();

            lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

            lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
            string orgGroupID = _commonRepo.GetUserOrgGroupId(userID);

            var enterPriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

            try
            {
                lstApps = _userRep.GetApps(userID);
                lstAppGroups = _userRep.GetAppGroups();
                lstMenus = _userRep.GetGroupMenusList(enterPriseSystem, profileID, userID);
                lstReportMenus = _userRep.GetReportsMenusList(enterPriseSystem, orgGroupID, userID);
                reportsApp = _userRep.GetReportsApp();
                response.DataDictionary = new Dictionary<string, object> { { "lstAppGroups", lstAppGroups }, { "lstApps", lstApps }, { "lstMenus", lstMenus }, { "lstReportMenus", lstReportMenus }, { "reportsApp", reportsApp } };
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, log);
                return response;
            }
        }

        #endregion

        #region GetUser
        /// <summary>
        /// To get user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_MT_ATPAR_USER_PROFILE> GetUser(string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (log.IsDebugEnabled) { log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_ATPAR_USER_PROFILE>();

            try
            {
                response.Data = _userRep.GetUser(userId);

                if (response.Data != null)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, log);
                return response;
            }
        }

        #endregion

        #region GetAllUsers
        public AtParWebApiResponse<MT_ATPAR_USER> GetAllUsers()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (log.IsDebugEnabled) { log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_USER>();

            try
            {
                response.DataList = _userRep.GetAllUsers();
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, log);
                return response;
            }

        }

        #endregion

        #region SaveUserDetails
        public AtParWebApiResponse<long> SaveUserDetails(VM_MT_ATPAR_USER_PROFILE user)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (log.IsDebugEnabled) { log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _userRep.SaveUserDetails(user);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, log);
                return response;
            }
        }

        #endregion

        #region User Status Report

        public AtParWebApiResponse<VM_USER_STATUS> GetUserStatus(string serverUserID, string userID, string firstName, string lastName,
                                                  string status, string orgGroupID, string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (log.IsDebugEnabled) { log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_USER_STATUS>();

            try
            {
                response.DataList = _userRep.GetUserStatus(serverUserID, userID, firstName, lastName,
                                                            status, orgGroupID, profileID);
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, log);
                return response;
            }


        }

        public AtParWebApiResponse<long> UpdateUserStatus(string serverUserID, string userID, string status)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (log.IsDebugEnabled) { log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {

                var StatusCode = _userRep.UpdateUserStatus(serverUserID, userID, status);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, log);
                    return response;
                }

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, log);
                return response;
            }

        }


        #endregion

    }
}

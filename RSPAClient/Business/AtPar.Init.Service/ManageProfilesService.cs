using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AtPar.Init.Service
{
    public class ManageProfilesService : IManageProfilesService
    {
        private ILog _log;
        private ICommonRepository _commonRepo;
        private IManageProfilesRepository _repo;
        public ManageProfilesService(ILog log, ICommonRepository commonRepo, IManageProfilesRepository manageProfilesrepository)
        {
            _repo = manageProfilesrepository;
            _log = log;
            _commonRepo = commonRepo;
            _log.SetLoggerType(typeof(ManageProfilesService));
        }

        /// <summary>
        /// Getting Profile Info
        /// </summary>
        /// <param name="profileID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetProfileInfo(string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var enterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                List<MT_ATPAR_APP> lstProfiles = _repo.GetProfiles(profileID);

                List<VM_MT_ATPAR_PROFILE_APP_MENUS> lstMenus = _repo.GetProfileAppMenus(profileID, enterpriseSystem);

                List<VM_MT_ATPAR_PROFILE_APP_PARAMETERS> lstParams = _repo.GetProfileAppParameters(profileID, enterpriseSystem);

                List<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY> lstScreenDisplay = _repo.GetProfileScreenDisplay(profileID, enterpriseSystem);

                int clientUserCount = _repo.GetClientUserCount(profileID);

                int serverUserCount = _repo.GetServerUserCount(profileID);

                int profileIDCount = _repo.GetProfileIdCount(profileID);
                //for(int p=0;p<= lstScreenDisplay.Count-1; p++)
                //{
                //    lstScreenDisplay[p].DEFAULT_COLUMN_HEADER = lstScreenDisplay[p].DEFAULT_COLUMN_HEADER.Trim();
                //}
                response.DataDictionary = new Dictionary<string, object> { { "listProfiles", lstProfiles }, { "listMenus", lstMenus.OrderBy(x => x.MENU_NAME) }, { "listParams", lstParams }, { "listScreenDisplay", lstScreenDisplay.OrderBy(x => x.DEFAULT_COLUMN_HEADER.Trim()).OrderBy(y=>y.SCREEN_NAME) }, { "clientUserCount", clientUserCount }, { "serverUserCount", serverUserCount }, { "profileIDCount", profileIDCount } };

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_NORECORDFOUND);
                return response;
            }
        }

        /// <summary>
        /// Adding Profile Info
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="alterProfileCtoS"></param>
        /// <param name="userID"></param>
        /// <param name="profileDescr"></param>
        /// <param name="dictProfile"></param>
        /// <param name="clientAddr"></param>
        /// <param name="appID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> AddProfileInfo(string profileID, bool alterProfileCtoS, string userID, string profileDescr, Dictionary<string, dynamic> dictProfile, string clientAddr, int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var enterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                long statusCode = _repo.AddProfileInfo(profileID, profileDescr, dictProfile, userID, clientAddr, enterpriseSystem, alterProfileCtoS);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        /// <summary>
        /// Updating Profile Info
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="alterProfileCtoS"></param>
        /// <param name="userID"></param>
        /// <param name="profileDescr"></param>
        /// <param name="dictProfile"></param>
        /// <param name="clientAddr"></param>
        /// <param name="appID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateProfileInfo(string profileID, bool alterProfileCtoS, string userID, string profileDescr, Dictionary<string, dynamic> dictProfile, string clientAddr, int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var enterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                long statusCode = _repo.UpdateProfileInfo(profileID, profileDescr, dictProfile, appID, userID, clientAddr, enterpriseSystem, alterProfileCtoS);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                statusCode = updateReportsUserRole(profileID, dictProfile);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private long updateReportsUserRole(string profileID, Dictionary<string, dynamic> dictProfile)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            bool blnProfile = false;
            bool blnReportsDesign = false;
            bool blnDashboardDesign = false;
            string strUserId = string.Empty;

            try
            {
                blnProfile = _repo.GetProfileType(profileID);
                if (blnProfile)
                {
                    List<VM_MT_ATPAR_USER_ADD> usrslist = new List<VM_MT_ATPAR_USER_ADD>();
                    usrslist = _repo.GetUsersList(profileID);
                    if (usrslist.Count > 0)
                    {
                        foreach (var keyValuePair in dictProfile)
                        {
                            if (keyValuePair.Key == "MENUS")
                            {
                                foreach (var item in keyValuePair.Value)
                                {
                                    var itemPocoMenus = new MT_ATPAR_PROFILE_MENU
                                    {
                                        APP_ID = item.APP_ID,
                                        LAST_CLIENT_ADDRESS = item.LAST_CLIENT_ADDRESS,
                                        PROFILE_ID = item.PROFILE_ID,
                                        LAST_UPDATE_USER = item.LAST_UPDATE_USER,
                                        LAST_UPDATE_DATE = item.LAST_UPDATE_DATE,
                                        MENU_CODE = item.MENU_CODE,
                                        MENU_SEQ_NO = item.MENU_SEQ_NO,
                                        CHKSTATUS = item.CHKSTATUS == 'N' ? false : true
                                    };

                                    if (itemPocoMenus.APP_ID == 100)
                                    {
                                        if (itemPocoMenus.MENU_CODE == "mt_NewReport.aspx")
                                        {
                                            blnReportsDesign = itemPocoMenus.CHKSTATUS;
                                        }
                                        if (itemPocoMenus.MENU_CODE == "mt_DashboardDesigner.aspx")
                                        {
                                            blnDashboardDesign = itemPocoMenus.CHKSTATUS;
                                        }
                                    }
                                }
                            }
                        }


                        if (usrslist.Count > 0)
                        {
                            strUserId = "'" + string.Join("'", usrslist.Select(x => x.USER_ID + "',"));
                            strUserId = strUserId.Substring(0, strUserId.Trim().Length - 1);
                        }
                        //for (int i = 0; i <= usrslist.Count-1; i++)
                        //{
                        //    lstuserId[i] = usrslist[i].USER_ID.ToString();
                        //}
                        _repo.updateReportsUserRole(strUserId, blnReportsDesign, blnDashboardDesign);
                    }

                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }
    }
}


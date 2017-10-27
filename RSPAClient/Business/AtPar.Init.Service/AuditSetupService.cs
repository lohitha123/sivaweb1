using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AtPar.Init.Service
{
    public class AuditSetupService : IAuditSetupService
    {
        IAuditSetupRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;
        public AuditSetupService(IAuditSetupRepository auditSetupRepos, ILog log, ICommonRepository commonRepository)
        {
            _repo = auditSetupRepos;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(AuditSetupService));
        }

        #region GetAppMenus
        /// <summary>
        /// Getting App Menus From MT_ATPAR_APP and MT_ATPAR_MENUS
        /// </summary>
        /// <param name="appID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_MENUS> GetAppMenus( int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_MENUS>();
            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

               var enterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                response.DataList = _repo.GetAppMenus( appID, enterpriseSystem);

                if (response.DataList != null && response.DataList.Count>=0)
                {
                   var sortedlst =  (from x in response.DataList
                                                    orderby x.MENU_NAME ascending
                                                    select x).ToList();

                    response.DataList = sortedlst;

                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }

        }
        #endregion

        #region SaveAuditSetUpInfo
        /// <summary>
        /// Saving Audit Setup Info to MT_ATPAR_MENUS
        /// </summary>
        /// <param name="lstMenu"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> SaveAuditSetUpInfo(List<MT_ATPAR_MENUS> lstMenu, string user)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long statusCode = -1;
            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

               var enterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                statusCode = _repo.SaveAuditSetUpInfo(lstMenu, user, enterpriseSystem);

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDUPDATED, _commonRepo, _log);
                    return response;
                }                
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL);
                return response;
            }
        }
        #endregion
    }
}

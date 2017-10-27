using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AtPar.Init.Service
{
    public class ManageOrgGroupsService : IManageOrgGroupsService
    {
        IManageOrgGroupsRepository _manageOrgGroupsRepos;
        ILog _log;
        ICommonRepository _commonRepo;
        public ManageOrgGroupsService(IManageOrgGroupsRepository manageOrgGroupsRepos, ILog log, ICommonRepository commonRepository)
        {
            _manageOrgGroupsRepos = manageOrgGroupsRepos;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ManageOrgGroupsService));
        }

        #region SaveOrgGroupsInfo
        /// <summary>
        /// Saving Org Group Info To MT_ATPAR_ORG_GROUPS
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <param name="orgGrpName"></param>
        /// <param name="prvOrgID"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> SaveOrgGroupsInfo(string orgGrpID, string orgGrpName, string prvOrgID, string user)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>();
            List<MT_ATPAR_PARAM_MASTER> listParamSystem = new List<MT_ATPAR_PARAM_MASTER>();
            orgGrpName = orgGrpName.Replace("\'", "\'\'");
            long StatusCode = -1;

            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                string enterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                StatusCode = _manageOrgGroupsRepos.SaveOrgGroupsInfo(orgGrpID, orgGrpName, user, enterpriseSystem);

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL);
                return response;
            }
        }

        /// <summary>
        /// Updating Org Groups To MT_ATPAR_ORG_GROUPS
        /// </summary>
        /// <param name="orgGrpName"></param>
        /// <param name="prvOrgID"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUPS> UpdateOrgGroupsInfo(string orgGrpName, string prvOrgID, string user)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>();
            List<MT_ATPAR_PARAM_MASTER> listParamSystem = new List<MT_ATPAR_PARAM_MASTER>();
            orgGrpName = orgGrpName.Replace("\'", "\'\'");
            long StatusCode = -1;

            try
            {
                StatusCode = _manageOrgGroupsRepos.UpdateOrgGroupsInfo(orgGrpName, prvOrgID, user);
                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
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

        #region SaveOrgGroupsBUnits
        /// <summary>
        /// Saving Org Groups BUnits to MT_ATPAR_ORG_GROUP_BUNITS
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="lstOrgGrpParams"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS> SaveOrgGroupsBUnits(string userID, string orgGrpID, List<MT_ATPAR_ORG_GROUP_BUNITS> lstOrgGrpParams)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>();
            try
            {
                var StatusCode = _manageOrgGroupsRepos.SaveOrgGroupsBUnits(userID, orgGrpID, lstOrgGrpParams);
                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL);
                return response;
            }
        }
        #endregion
    }
}

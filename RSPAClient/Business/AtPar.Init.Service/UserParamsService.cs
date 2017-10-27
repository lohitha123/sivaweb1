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
    public class UserParamsService : IUserParamsService
    {
        IUserParamsRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public UserParamsService(IUserParamsRepository userParamsRepo, ILog log, ICommonRepository commonRepository)
        {
            _repo = userParamsRepo;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(UserParamsService));
        }

        #region GetUserParams
        /// <summary>
        /// Getting User Parameters
        /// </summary>
        /// <param name="svrUserID"></param>
        /// <param name="appID"></param>
        /// <param name="userID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_MT_ATPAR_USER_PARAMS> GetUserParams(string svrUserID, string appID, string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_ATPAR_USER_PARAMS>();

            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var enterprise = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                response.DataList = _repo.GetUserParams(appID, userID, enterprise);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region SetUserParams
        /// <summary>
        /// Updating User Parameters
        /// </summary>
        /// <param name="userParams"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> SetUserParams(List<MT_ATPAR_USER_APP_PARAMETERS> userParams, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _repo.SetUserParams(userParams);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
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
        #endregion

        #region GetParameterValues
        /// <summary>
        /// Getting Parameter Values
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="parameterID"></param>
        /// <param name="fieldName"></param>
        /// <param name="strTableName"></param>
        /// <param name="whereCondition"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> GetParameterValues(string userID, string parameterID, string fieldName,
           string strTableName, string whereCondition)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                if (parameterID.ToLower() == AtParWebEnums.AppParameters_Enum.DEFAULT_DISTRIB_TYPE.ToString().ToLower())
                {
                    response.DataList = _repo.GetDistinctParamValues(fieldName, strTableName, whereCondition);
                }
                else
                {
                    response.DataList = _repo.GetParamValue(fieldName, strTableName, whereCondition);
                }

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion
    }
}

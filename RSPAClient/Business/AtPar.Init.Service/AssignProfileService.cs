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
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Service
{
    public class AssignProfileService : IAssignProfileService
    {
        IAssignProfileRepository _assignProfileRepos;
        ILog _log;
        ICommonRepository _commonRepo;
        public AssignProfileService(IAssignProfileRepository assignProfileRepos, ILog log, ICommonRepository commonRepository)
        {
            _assignProfileRepos = assignProfileRepos;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(AssignProfileService));
        }

        #region GetSecurityParamVal
        public AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS> GetSecurityParamVal(string userId, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>();

            try
            {
                response.DataVariable = _assignProfileRepos.GetSecurityParamVal(userId);
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

        #region GetProfileUsersInfo
        public AtParWebApiResponse<VM_MT_ATPAR_PROF_USER> GetProfileUsersInfo(string userID, string uID, string lDap, string fName, string lOrg, string profileID, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_ATPAR_PROF_USER>();

            try
            {
                response.DataList = _assignProfileRepos.GetProfileUsersInfo(userID, uID, lDap, fName, lOrg, profileID, orgGrpID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                else
                {
                    response.AtParSuccess();
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

        #region SaveProfileUsersInfo
        public AtParWebApiResponse<MT_ATPAR_USER> SaveProfileUsersInfo(List<VM_MT_ATPAR_USER> lstProfUserInfo, string profile, string orgGrp, string uId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_USER>();
            long StatusCode = -1;

            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var enterpriseSystem = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                StatusCode = _assignProfileRepos.SaveProfileUsersInfo(lstProfUserInfo, profile, orgGrp, uId, enterpriseSystem);

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBCOMMITFAIL);
                return response;
            }
        }
        #endregion
    }
}

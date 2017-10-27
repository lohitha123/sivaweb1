using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Service
{
    public class SecurityConfigurationService: ISecurityConfigurationService
    {
        #region Private Variables

        private ILog _log;
        private ISecurityConfigurationRepository _repo;
        private ICommonRepository _commonRepo;     
        #endregion

        #region Constructor 
        public SecurityConfigurationService(ILog log, ISecurityConfigurationRepository repo, ICommonRepository commonRepo)
        {           
            _commonRepo = commonRepo;
            _repo = repo;
            _log = log;
            _log.SetLoggerType(typeof(SecurityConfigurationService));
        }
        #endregion


        public AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS> UpdateSecurityParams(MT_ATPAR_SECURITY_PARAMS securityParams)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS> response = new AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>();
            try
            {
                var status = _repo.UpdateSecurityParams(securityParams);

                if (status != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(status, _commonRepo, _log);
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
    }
}

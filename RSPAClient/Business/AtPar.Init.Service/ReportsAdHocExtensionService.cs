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
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;

namespace AtPar.Init.Service
{
    class ReportsAdHocExtensionService : IReportsAdHocExtensionService
    {
        #region Private Variables

        private ILog _log;
        private IReportsAdHocExtensionRepository _repo;
        private ICommonRepository _commonRepo;
        #endregion

        #region Constructor 
        public ReportsAdHocExtensionService(ILog log, IReportsAdHocExtensionRepository repo, ICommonRepository commonRepo)
        {
            _commonRepo = commonRepo;
            _repo = repo;
            _log = log;
            _log.SetLoggerType(typeof(ReportsAdHocExtensionService));
        }
        #endregion

        public AtParWebApiResponse<Dictionary<string, object>> GetOrgGroupsProductUsers(string userID,Guid? reportID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<Dictionary<string, object>>();
            try
            {
                List<VM_MT_USER_DETAILS> lstOutput = _repo.GetOrgGroupsProductUsers(userID, reportID);
                response.DataDictionary = new Dictionary<string, object> { { "listOrg", lstOutput } };
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

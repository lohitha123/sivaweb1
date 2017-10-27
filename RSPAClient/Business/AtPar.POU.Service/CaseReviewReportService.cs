using AtPar.Service.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;

namespace AtPar.POU.Service
{
    public class CaseReviewReportService : ICaseReviewReportService
    {

        ICaseReviewReportRepository _prefCardParameterRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        private ICommonPOUService _commonPOUService;
        public CaseReviewReportService(ICaseReviewReportRepository repository, ILog log, ICommonPOUService commonPOUService,
            ICommonRepository commonRepository)
        {
            _prefCardParameterRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOUService = commonPOUService;
            _log.SetLoggerType(typeof(CaseReviewReportService));
        }
        public AtParWebApiResponse<VM_POU_GET_CASES_INFORMATION> GetCasesInformation(string pstrDeptId)
        {
           string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
           if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_GET_CASES_INFORMATION>();

            try
            {
                
                response.DataList = _prefCardParameterRepo.GetCasesInformation(pstrDeptId);
                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    //return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    
                }
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<Dictionary<string, object>> GetCaseReview(string pStrCaseID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<Dictionary<string,object>>();

            try
            {
               
                Dictionary<string,object> result = _prefCardParameterRepo.GetCaseReview(pStrCaseID);
                if (result != null)
                {
                    response.DataDictionary = result;
                    response.AtParSuccess();
                    return response;
                }
                else { throw new NullReferenceException(); }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
            
        }
    }
}

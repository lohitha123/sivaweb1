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
    public class PrefCardPerformanceSummaryService : IPrefCardPerformanceSummaryService
    {

        IPrefCardPerformanceSummaryRepository _prefCardParameterRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        private ICommonPOUService _commonPOUService;
        public PrefCardPerformanceSummaryService(IPrefCardPerformanceSummaryRepository repository, ILog log, ICommonPOUService commonPOUService,
            ICommonRepository commonRepository)
        {
            _prefCardParameterRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOUService = commonPOUService;
            _log.SetLoggerType(typeof(PrefCardOptimizationReportService));
        }
        public AtParWebApiResponse<VM_POU_PREF_CARD_PERFORMANCE_SUMMARY> GetPrefPerformanceRpt(string pFromDate, string pToDate, string pProcId, string pPhyId = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }



            var response = new AtParWebApiResponse<VM_POU_PREF_CARD_PERFORMANCE_SUMMARY>();

            try
            {
               
                response.DataList= _prefCardParameterRepo.GetPrefPerformanceRpt(pFromDate, pToDate, pProcId, pPhyId);
                if (response.DataList.Count > 0)
                {
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
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

            
        }
    }
}

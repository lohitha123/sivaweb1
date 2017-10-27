using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Service
{
    public class PrefCardPerformanceDetailsService: IPrefCardPerformanceDetailsService
    {
        IPrefCardPerformanceDetailsRepository _prefCardParameterRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        private ICommonPOUService _commonPOUService;
        public PrefCardPerformanceDetailsService(IPrefCardPerformanceDetailsRepository repository, ILog log, ICommonPOUService commonPOUService,
            ICommonRepository commonRepository)
        {
            _prefCardParameterRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOUService = commonPOUService;
            _log.SetLoggerType(typeof(PrefCardOptimizationReportService));
        }
        public AtParWebApiResponse<VM_POU_PREF_CARD_PERFORMANCE_DETAILS> GetPrefCarDPerformanceDtls(string pFromDate, string pToDate, string pProcId, string pPhyId = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }



            var response = new AtParWebApiResponse<VM_POU_PREF_CARD_PERFORMANCE_DETAILS>();

            try
            {

                response.DataList = _prefCardParameterRepo.GetPrefCarDPerformanceDtls(pFromDate, pToDate, pProcId, pPhyId);
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

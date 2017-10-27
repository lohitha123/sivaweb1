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
  public  class PrefCardOptimizationReportService: IPrefCardOptimizationReportService
    {

        IPrefCardOptimizationReportRepository _prefCardParameterRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        private ICommonPOUService _commonPOUService;
        public PrefCardOptimizationReportService(IPrefCardOptimizationReportRepository repository, ILog log, ICommonPOUService commonPOUService,
            ICommonRepository commonRepository)
        {
            _prefCardParameterRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOUService = commonPOUService;
            _log.SetLoggerType(typeof(PrefCardOptimizationReportService));
        }

     public   AtParWebApiResponse<Dictionary<string, object>> GetPrefCardOptimizationRpt(string pFromDate, string pToDate, string pProcId, string pPhyId = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            

            var response = new AtParWebApiResponse<Dictionary<string, object>>();

            try
            {
                var tupleOutput = _prefCardParameterRepo.GetPrefCardOptimizationRpt(pFromDate, pToDate, pProcId,pPhyId);

                response.DataDictionary = new Dictionary<string, object> { { "Count", tupleOutput.Item1 }, { "listPrefCardOptimization", tupleOutput.Item2 } };
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

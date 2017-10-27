using System;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.Service.Interfaces.POU;
using System.Collections.Generic;

namespace AtPar.POU.Service
{
    public class SetupCriticalItemsService : ISetupCriticalItemsService
    {

        ISetupCriticalItemsRepository _setupCriticalItemsRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public SetupCriticalItemsService(ISetupCriticalItemsRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _setupCriticalItemsRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
        }

        public AtParWebApiResponse<long> SaveCriticalItems(string bUnit, string parLocation, List<MT_POU_CRITICAL_ITEMS> lstItems, params string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            long statusCode = -1;
            try
            {

                statusCode = _setupCriticalItemsRepo.ProcessCriticalItems(bUnit, parLocation, lstItems);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
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

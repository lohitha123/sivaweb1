using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Service
{
   public class ItemUsageReportService : IItemUsageReportService
    {
        private ILog _log;
        private IItemUsageReportRepository _repo;
        private ICommonRepository _commonRepo;
        public ItemUsageReportService(ILog log, IItemUsageReportRepository repo, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
        }

        public AtParWebApiResponse<long> GetItemUsageReport(string businessUnit, string cartID,
            string itemID, string fromDate, string toDate, int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            DataSet pItemUsageDS = new DataSet();
            if (cartID == null) cartID = string.Empty;
            try
            {
                var result = _repo.GetItemUsageReport( businessUnit,  cartID,
             itemID,  fromDate,  toDate,  appID, ref  pItemUsageDS);

               

                var dictionaryResult = new Dictionary<string, object> { { "pItemUsageDS", pItemUsageDS } };

                if (!result.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                response.DataDictionary = dictionaryResult;
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

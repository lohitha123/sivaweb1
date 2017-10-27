using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.CartCount;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CartCount.Service
{
    public class ItemUsageReportService : IItemUsageReportService
    {
        IItemUsageReportRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;
        public ItemUsageReportService(ILog log, IItemUsageReportRepository repo, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
        }
        public AtParWebApiResponse<long> GetItemUsageDetails(string itemID, string fDate, string toDate, string bUnit, string cartId, string srvrUserID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            if (bUnit == null) bUnit = "";
            if (cartId == null) cartId = "";
            if (srvrUserID == null) srvrUserID = "s";

            try
            {
                var result = _repo.GetItemUsageDetails(itemID, fDate, toDate, bUnit, cartId, srvrUserID, deviceTokenEntry);

                var pdsCartDetails = result.Item1;
                statusCode = result.Item2;

                var dictionaryResult = new Dictionary<string, object> { { "pdsCartDetails", pdsCartDetails } };

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
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

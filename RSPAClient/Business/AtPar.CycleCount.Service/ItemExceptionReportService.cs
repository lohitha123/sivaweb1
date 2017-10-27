using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.Service.Interfaces.CycleCount;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;

namespace AtPar.CycleCount.Service
{
    public class ItemExceptionReportService : IItemExceptionReportService
    {
        private ILog _log;
        private IItemExceptionReportRepository _repo;
        private ICommonRepository _commonRepo;
        public ItemExceptionReportService(ILog log , IItemExceptionReportRepository repo, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
        }

        public AtParWebApiResponse< long> GetCycleExceptionReport(string bUnit, string eventID,
            string itemID, string fromDate, string toDate, string orgGrpId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            DataSet dsExpRep = new DataSet();
            if (itemID == null) itemID = string.Empty;
            if (eventID == null) eventID = string.Empty;
            itemID.ReplaceString();
            eventID.ReplaceString();
            try
            {
                var result = _repo.GetCycleExceptionReport( bUnit,  eventID,
             itemID,  fromDate,  toDate,    orgGrpId,  ref dsExpRep);



                var dictionaryResult = new Dictionary<string, object> { { "dsExpRep", dsExpRep } };

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

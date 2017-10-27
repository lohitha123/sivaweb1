using AtPar.Service.Interfaces.TrackIT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using log4net;
using AtPar.Repository.Interfaces.TrackIT;
using System.Data;

namespace AtPar.TrackIT.Service
{
    public class DailyActivityReportService: IDailyActivityReportService
    {
        #region Private Variable

        private ILog _log;
        private IDailyActivityreportRepository _repo;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public DailyActivityReportService(ILog log, IDailyActivityreportRepository repo, ICommonRepository commonRepository)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepository;
        }

        #endregion

        public AtParWebApiResponse<long> GetTKITDailyUserActivityRep(string pToDate, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet pDsDailyActRep = new DataSet();
            long statusCode = -1;
             Tuple<long, DataSet> response1=null;
            var response = new AtParWebApiResponse<long>();


            try
            {
                response1 = _repo.GetTKITDailyUserActivityRep(pToDate,pDeviceTokenEntry);
                statusCode = response1.Item1;
                pDsDailyActRep = response1.Item2;
                var dictionaryResult = new Dictionary<string, object> { { "pDsDailyActRep", pDsDailyActRep} };
                response.DataDictionary = dictionaryResult;

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
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

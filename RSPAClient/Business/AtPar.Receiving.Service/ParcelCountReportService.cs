using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Service.Interfaces.Receiving;
using AtPar.Repository.Interfaces.Receiving;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.Common.Service;

namespace AtPar.Receiving.Service
{
    public class ParcelCountReportService : IParcelCountReportService
    {
        #region Private Variables

        IParcelCountReportRepository _parcelCountReportRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion region

        #region Constructor

        public ParcelCountReportService(IParcelCountReportRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _parcelCountReportRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
        }

        #endregion

        #region GetParcelCountReportData

        /// <summary>
        /// To get ParcelCountRepData
        /// </summary>
        /// <param name="fDate"></param>
        /// <param name="tDate"></param>
        /// <param name="carrierID"></param>
        /// <param name="trackingNo"></param>        
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>

        public AtParWebApiResponse<Dictionary<string, object>> GetParcelCountReport(DateTime fDate, DateTime tDate, string carrierID,
                                                                            string trackingNo, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<Dictionary<string, object>>();            
            Tuple<long, Dictionary<string, object>> tupleResult = null;
            long statusCode = -1;

            try
            {
                tupleResult = _parcelCountReportRepo.GetParcelCountReport(fDate, tDate, carrierID, trackingNo, deviceTokenEntry);
                statusCode = tupleResult.Item1;

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                
                response.DataDictionary = tupleResult.Item2;
                response.AtParSuccess();
                return response;
                                
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        #endregion
    }
}

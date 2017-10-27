using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.TrackIT.Service
{
    public class TransactionReportService: ITransactionReportService
    {
        #region Private Variable

        private ILog _log;
        private ITransactionReportRepository _repo;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public TransactionReportService(ILog log, ITransactionReportRepository repo, ICommonRepository commonRepository)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepository;
        }

        #endregion

        public AtParWebApiResponse<long> GetTransRep(string pItemId, string pFrmdate, string pTodate, string pItemDescr, string pSerial, string pDeptID, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long statusCode = -1;
            DataSet pDsTransRep = null;
            var response = new AtParWebApiResponse<long>();
            try
            {
                statusCode = _repo.GetTransRep(pItemId, pFrmdate, pTodate,ref pDsTransRep, pItemDescr, pSerial, pDeptID,pDeviceTokenEntry);
                var dictionaryResult = new Dictionary<string, object> { { "pDsTransRep", pDsTransRep } };
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

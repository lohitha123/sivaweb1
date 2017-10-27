using AtPar.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.Service.Interfaces.TrackIT;
using System.Data;

namespace AtPar.TrackIT.WebApi
{
    public class TransactionReportController:ApiController
    {
        #region Private Variable

        private ITransactionReportService _transactionReportService;
        private ILog _log;

        #endregion
        #region Constructor

        public TransactionReportController(ITransactionReportService transactionReportService, ILog log)
        {
            _transactionReportService = transactionReportService;
            _log = log;
            _log.SetLoggerType(typeof(ITransactionReportService));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<long> GetTransRep(string pItemId, string pFrmdate, string pTodate, string pItemDescr, string pSerial, string pDeptID, [FromUri] string[] pDeviceTokenEntry)
        {
            var result = _transactionReportService.GetTransRep(pItemId, pFrmdate, pTodate, pItemDescr, pSerial, pDeptID, pDeviceTokenEntry);
            return result;
        }

        #endregion
    }
}

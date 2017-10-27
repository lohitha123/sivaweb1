using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.Service.Interfaces.Receiving;
using log4net;
using AtPar.Common;
using AtPar.ViewModel;

namespace AtPar.Receiving.WebApi
{
    public class ParcelCountReportController : ApiController
    {
        #region Private Variables

        private IParcelCountReportService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public ParcelCountReportController(IParcelCountReportService service, ILog log) {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(ParcelCountReportController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, object>> GetParcelCountReport(DateTime fDate, DateTime tDate, string carrierID,
                                                                            string trackingNo, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetParcelCountReport(fDate, tDate, carrierID.HandleNull(), trackingNo.HandleNull(), deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

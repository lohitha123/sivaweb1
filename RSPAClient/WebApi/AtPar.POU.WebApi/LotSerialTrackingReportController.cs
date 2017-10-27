using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class LotSerialTrackingReportController : ApiController
    {
        ILotSerialTrackingReportService _service;
        ILog _log;

        public LotSerialTrackingReportController(ILog log, ILotSerialTrackingReportService service)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(LotSerialTrackingReportController));
        }
        [HttpGet]
        public AtParWebApiResponse<long> GetLotSerialTrackReport(string startDate, string endDate, string lotNumber, string srNo, string patientID, string examID, string accountID, string itemId, string orgGrpID,
        string deptID, int appID,[FromUri] string[] deviceTokenEntry)
        {
            try
            {
                var response = _service.GetLotSerialTrackReport(startDate, endDate, lotNumber, srNo, patientID, examID, accountID, itemId, orgGrpID,
        deptID, appID, deviceTokenEntry);
                return response;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}

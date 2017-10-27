using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
   public interface ILotSerialTrackingReportService
    {
        AtParWebApiResponse<long> GetLotSerialTrackReport(string startDate, string endDate, string lotNumber, string srNo, string patientID, string examID, string accountID, string itemId, string strOrgGrpID,
          string deptID, int appID, string[] deviceTokenEntry);
    }
}

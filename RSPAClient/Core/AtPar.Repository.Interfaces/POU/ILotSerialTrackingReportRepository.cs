using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
   public interface ILotSerialTrackingReportRepository
    {
        Tuple<long,System.Data.DataSet> GetLotSerialTrackReport(string startDate, string endDate, string lotNumber, string srNo, string patientID, string examID, string accountID, string itemId, string strOrgGrpID,
          string deptID, int appID, string[] deviceTokenEntry);
    }
}

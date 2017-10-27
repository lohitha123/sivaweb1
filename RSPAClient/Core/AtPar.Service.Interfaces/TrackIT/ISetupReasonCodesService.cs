using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface ISetupReasonCodesService
    {
        AtParWebApiResponse<long> CreateReasonCodes(string reasonCode, string desc, string orgGrpID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> DeleteReasonCode(string reasonCode, bool status, string[] deviceTokenEntry);
        AtParWebApiResponse<TKIT_REASON_CODES> GetReasonCodes(string reasonCode, string desc, string[] deviceTokenEntry);
        AtParWebApiResponse<long> UpdateReasonCodes(string reasonCode, string desc, string[] deviceTokenEntry);
    }
}

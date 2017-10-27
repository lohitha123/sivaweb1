using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface ISetupReasonCodesRepository
    {
        long CreateReasonCodes(string reasonCode, string desc, string orgGrpID, string[] deviceTokenEntry);
        long DeleteReasonCode(string reasonCode, bool status, string[] deviceTokenEntry);
        List<TKIT_REASON_CODES> GetReasonCodes(string reasonCode, string desc, string[] deviceTokenEntry);
        long UpdateReasonCodes(string reasonCode, string desc, string[] deviceTokenEntry);
    }
}

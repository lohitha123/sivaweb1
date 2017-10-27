using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface ITwoBinAlloService
    {
        AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION> GetTwoBinCartsAllocation(string bUnit, string cartID, params string[] deviceTokenEntry);
        AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION> TwoBinSaving(List<MT_CRCT_TWO_BIN_ALLOCATION> lstBins, string bUnit);
    }
}
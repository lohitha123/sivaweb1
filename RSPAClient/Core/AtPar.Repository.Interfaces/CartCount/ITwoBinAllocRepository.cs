using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface ITwoBinAllocRepository
    {
        List<MT_CRCT_TWO_BIN_ALLOCATION> GetTwoBinCartsAllocation(string bUnit, string cartID);
        long TwoBinSaving(List<MT_CRCT_TWO_BIN_ALLOCATION> lstBins, string bUnit);
    }
}
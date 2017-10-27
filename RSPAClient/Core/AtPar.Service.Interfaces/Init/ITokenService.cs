using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface ITokenService
    {       
        AtParWebApiResponse<MT_ATPAR_TOKENS> GetLiveTokens(int pChkValue);
        AtParWebApiResponse<MT_ATPAR_TOKENS> DeleteTokenEntry(string strAccessToken);
        AtParWebApiResponse<MT_ATPAR_TOKENS> RunTokenGC();
    }
}

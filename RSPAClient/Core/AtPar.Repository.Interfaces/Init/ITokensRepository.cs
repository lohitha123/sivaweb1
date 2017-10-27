using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.Init
{
    public interface ITokensRepository
    {
        
        List<MT_ATPAR_TOKENS> GetLiveTokens(int pChkValue);
        long DeleteTokenEntry(string strAccessToken);
        long RunTokenGC();
        

    }
}

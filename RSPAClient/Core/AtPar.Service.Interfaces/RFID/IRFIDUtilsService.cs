using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.RFID
{
    public interface IRFIDUtilsService
    {
        AtParWebApiResponse<bool> CheckTokenValidity(string[] deviceTokenEntry);
        
    }
}

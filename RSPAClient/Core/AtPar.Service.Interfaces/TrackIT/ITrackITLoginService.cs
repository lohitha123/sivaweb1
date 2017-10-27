using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface ITrackITLoginService
    {
        AtParWebApiResponse<TKIT_REQUESTOR> CheckLogin(string userID, string password);
    }
}

using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface ITrackITLoginRepository
    {
        Tuple<long, TKIT_REQUESTOR> CheckLogin(string userID, string password);
    }
}

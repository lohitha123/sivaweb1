using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Receiving
{
    public interface IManageCarriersRepository
    {
        List<MT_RECV_MANAGE_CARRIERS> GetCarriersData(string search);
        long UpdateCarriers(string mode, string searchString, string startPosition, string carrier, int status, string[] deviceTokenEntry);
    }
}

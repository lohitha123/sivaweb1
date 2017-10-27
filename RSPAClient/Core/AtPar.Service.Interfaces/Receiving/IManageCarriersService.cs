using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Receiving
{
    public interface IManageCarriersService
    {
        AtParWebApiResponse<MT_RECV_MANAGE_CARRIERS> GetCarriersData(string search);

        AtParWebApiResponse<long> UpdateCarriers(string mode, string searchString, string startPosition, string carrier, int status, string[] deviceTokenEntry);
    }
}

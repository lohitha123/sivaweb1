using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CycleCount
{
   public interface IGetHeaderService
    {
        AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER> GetHeader(DataSet inputParameters, string[] deviceTokenEntry);
    }
}

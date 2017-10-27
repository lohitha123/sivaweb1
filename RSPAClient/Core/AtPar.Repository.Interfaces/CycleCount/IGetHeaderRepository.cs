using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CycleCount
{
   public interface IGetHeaderRepository
    {
        List<MT_CYCT_EVENT_ALLOCATION> EVENT_ALLOCATION_Y_From_Execute_GetHeader_ProcessTasks(DataSet inputParams, string[] deviceTokenEntry);

        List<MT_CYCT_EVENT_HDR_MASTER> EVENT_ALLOCATION_N_From_Execute_GetHeader_ProcessTasks(DataSet inputParams, string[] deviceTokenEntry);

        List<MT_CYCT_EVENT_ALLOCATION> GetManualEventHeader(DataSet inputParams,string[] deviceTokenEntry);

        DataSet Execute_GetHeader_PostProcessTasks(DataSet outputParameters, string[] deviceTokenEntry);
    }
}

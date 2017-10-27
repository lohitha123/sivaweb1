using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CycleCount
{
  public  interface IGetDetailsService
    {
        long Check_GetDetails_InputParameters(DataSet inputParameters, string[] deviceTokenEntry);
        long Execute_GetDetails_PreProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry, string OrgGroupId);
        long Execute_GetDetails_ProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry);
        long Execute_GetDetails_PostProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry);

    }
}

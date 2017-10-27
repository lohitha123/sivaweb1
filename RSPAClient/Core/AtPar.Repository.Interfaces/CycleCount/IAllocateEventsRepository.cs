using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CycleCount
{
    public interface IAllocateEventsRepository
    {
        Tuple<DataSet, long> Get_SplitEvents(DataSet inputParameter, DataSet outputParameter);
        Tuple<DataSet, long> GetEventDetails(DataSet inputParameter);
        Tuple<DataSet, long> GetUserEventDetails(DataSet inputParameter);
        Tuple<string, long> AllocateEvents(List<VM_CYCT_EVENT_HEADER_OUTPUT> inputParam);

    }
}

using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.CycleCount
{
    public interface IAllocateEventsService
    {
        AtParWebApiResponse<VM_CYCT_EVENT_HEADER_OUTPUT> GetAllocateEvents(string userID, string bUnit,
                                                                string orgGroupID, string[] deviceTokenEntry);
        AtParWebApiResponse<object> AllocateEvents(List<VM_CYCT_EVENT_HEADER_OUTPUT> lstEventDetails, 
                                                string[] deviceTokenEntry);
    }
}

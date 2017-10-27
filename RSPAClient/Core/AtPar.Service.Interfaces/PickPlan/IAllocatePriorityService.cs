using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.PickPlan
{
    public interface IAllocatePriorityService
    {
        AtParWebApiResponse<MT_PKPL_PRIORITY> GetLocationPriorities(string bUnit, string location, params string[] deviceTokenEntry);
        AtParWebApiResponse<MT_PKPL_PRIORITY> SaveLocationPriorities(string priority, List<MT_PKPL_PRIORITY> priorities, params string[] deviceTokenEntry);
    }
}
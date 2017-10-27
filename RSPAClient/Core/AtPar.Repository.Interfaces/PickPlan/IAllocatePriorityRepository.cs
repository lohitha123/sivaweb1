using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.PickPlan
{
    public interface IAllocatePriorityRepository
    {
        List<MT_PKPL_PRIORITY> GetLocationPriorities(string bUnit, string location);
        long ProcessLocationPriorities(string priority, List<MT_PKPL_PRIORITY> lstPriorities);
    }
}
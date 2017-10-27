using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IDepartmentLocationAllocationRepository
    {
        List<MT_POU_DEPT_CART_ALLOCATIONS> GetDeptCartAllocations(string orgGrpID);
        List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetLocationsAllocatedToWorkStation(string deptId, string orgGrpID, int appId);
        long DeleteDeptCartAllocations(string deptId, string orgGrpID, int appId);
        long InsertDeptCartsAllocation(List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartAllocations, string deptId, string orgGroupId, int appId);
    }
}

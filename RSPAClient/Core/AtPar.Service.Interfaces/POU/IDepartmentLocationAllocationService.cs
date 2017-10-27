using AtPar.Common;
using AtPar.POCOEntities;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.POU
{
    public interface IDepartmentLocationAllocationService
    {
        AtParWebApiResponse<object> GetDeptCartAllocationDetails(string businessUnit, string cartId, int display, string locationType, string[] deviceTokenEntry);
        AtParWebApiResponse<long> SaveDeptCartAlloc(List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartAllocations, string deptId, string orgGroupId, int appId);
    }
}

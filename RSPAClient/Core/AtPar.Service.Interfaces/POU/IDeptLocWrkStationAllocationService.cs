using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IDeptLocWrkStationAllocationService
    {
        // AtParWebApiResponse<MT_POU_BILLONLY_ITEMS> GetDeptAllocCarts();
        AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS> GetDeptAllocCarts(string businessUnit, string cartId, int display, string locationType, int appId, string deptID,string orgGrpID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> SaveDeptCartAllocations(List<MT_POU_DEPT_WORKSTATIONS> lstDeptCartWrkAlloc, string deptID, int appid, string[] deviceTokenEntry);
    }
        
}

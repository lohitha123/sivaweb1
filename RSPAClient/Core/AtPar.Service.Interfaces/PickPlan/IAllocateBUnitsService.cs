using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.PickPlan
{
    public interface IAllocateBUnitsService
    {
        AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION> AllocateBUnits(string AppId, string UserId, string ServerUserId, List<VM_ATPAR_IBU_ALLOCATION> lstbunitsAllocation, bool Searched, params string[] DeviceTokenEntry);
        AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits(string[] BArray, string AppId, string UserID, string BUnit, string Description, string ServerUserID, params string[] DeviceTokenEntry);

    }
}

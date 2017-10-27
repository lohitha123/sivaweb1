using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IProcessParameterService
    {
        AtParWebApiResponse<long> AssignAlertSchedules(List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> lstCartSchedules, int appID, string[] deviceTokenEntry);

        //List<MT_POU_REPLEN_SOURCE_LOCATION> lstReplanLocation
        AtParWebApiResponse<long> AssignScheduleToCarts(Dictionary<string, dynamic> dsAssignSchedule, string strBunit,
                                                        string strUserId, int appID, string[] deviceTokenEntry);

        AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetAllocDepartment(string departmentID, string bUnit, int appID, string[] deviceTokenEntry);

        AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetDeptAllocatedCarts(string departmentID, string strUserId, string strBunit,
                                                                                            string strCartID, int appID, string[] deviceTokenEntry);

        AtParWebApiResponse<MT_POU_PAR_LOC_PROCESS_SCHEDULE> GetCartSchedules(string strBunit, string strCartID, string strUserId,
                                                                              string procType, int appID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string userId, string strOrgGroupID, string[] deviceTokenEntry);

        AtParWebApiResponse<VM_MT_POU_ASSIGN_LOCATIONS> GetAssignedLocationDetails(string pBUnit, string pLocId, string pLocationOrgId,
                                                                                   string pLocGroupId, string pOrgGrpId, string[] deviceTokenEntry);
        
    }
}

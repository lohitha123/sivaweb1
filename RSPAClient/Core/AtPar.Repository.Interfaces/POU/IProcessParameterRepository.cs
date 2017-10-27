using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IProcessParameterRepository
    {
        long AssignAlertSchedules(List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> lstCartSchedules, int appID, string[] deviceTokenEntry);

        // List<MT_POU_PAR_LOC_PROCESS_SCHEDULE>, List<MT_POU_REPLEN_SOURCE_LOCATION>
        //List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> lstReplanLocation
        long AssignScheduleToCarts(Dictionary<string, dynamic> dsAssignSchedule, string strBunit, string strUserId, int appID,
                                   string[] deviceTokenEntry);

        Tuple<List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>, long> GetAllocDepartment(string departmentID, string bUnit, int appID,
                                                                    string[] deviceTokenEntry);

        Tuple<List<MT_POU_PAR_LOC_PROCESS_SCHEDULE>, List<MT_POU_REPLEN_SOURCE_LOCATION>, long> GetCartSchedules(string strBunit, string strCartID,
                                            string strUserId, string procType, int appID, string[] deviceTokenEntry);
       
        Tuple<List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>, List<MT_POU_REPLEN_SOURCE_LOCATION>, long> GetDeptAllocatedCarts(string departmentID,
              string strUserId, string strBunit, string strCartID, int appID, string[] deviceTokenEntry);

        List<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string userId, string strOrgGroupID, string[] deviceTokenEntry);

        List<MT_POU_REPLEN_SOURCE_LOCATION> GetAssignedLocationDetails(string pLocGroupId, string pBUnit, string pOrgGrpID, string pLocationOrgId);


    }
}

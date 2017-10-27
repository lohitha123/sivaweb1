using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.POU
{
    public  interface IDepartmentUserAllocationService
    {       
        AtParWebApiResponse<MT_POU_DEPT> GetDepartments(string departmentID, string deptDescr, string orgGroupID);
        AtParWebApiResponse<MT_POU_DEPT> GetDepartments(string departmentIdOrDescr, string orgGroupId);
        AtParWebApiResponse<VM_ATPAR_DEPT_USER> GetDepartmentUsers(string departmentID, string orgGroupID);
        AtParWebApiResponse<long> AllocateUserToDepartment(string departmentId, string userId, string orgGroupID, bool isHomeDepartment, string mode);
        AtParWebApiResponse<long> DeallocateUserToDepartment(string departmentId, string userId);
    }
}

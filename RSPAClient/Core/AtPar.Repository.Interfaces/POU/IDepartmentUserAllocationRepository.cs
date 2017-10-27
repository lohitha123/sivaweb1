using AtPar.POCOEntities;
using System.Collections.Generic;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.POU
{
   public interface IDepartmentUserAllocationRepository
    {
        List<MT_POU_DEPT> GetDepartments(string departmentID, string deptDescr, string orgGroupID);
        List<MT_POU_DEPT> GetDepartments(string departmentIdOrDescr, string orgGroupId);
        List<VM_ATPAR_DEPT_USER> GetDepartmentUsersofSingleDept(string departmentID, string orgGroupID);
        List<VM_ATPAR_DEPT_USER> GetDepartmentUsersofMultipleDepts(string departmentID, string orgGroupID);
        VM_ATPAR_DEPT_USER GetHomeDepartment(string userId, string orgGroupID);
        long AllocateUserToDepartmentUpdate(string departmentId, string userId, string orgGroupID, bool isHomeDepartment);
        long AllocateUserToDepartmentInsert(string departmentId, string userId, string orgGroupID, bool isHomeDepartment);
        long DeallocateUserToDepartment(string departmentId, string userId);
    }
}

using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IDepartmentRepository
    {
        List<MT_POU_DEPT> GetDeptDetails(string strDeptId, string strOrgGroupID, string search);       
        long UpdateDeptStatus(string strDeptID, int intStatus, string strOrgGroupID, int appID);
    }
}
using AtPar.Common;
using AtPar.POCOEntities;


namespace AtPar.Service.Interfaces.POU
{
    public interface IDepartmentService
    {
        AtParWebApiResponse<MT_POU_DEPT> GetDeptDetails(string strDeptId, string strOrgGroupID, string search);
        AtParWebApiResponse<MT_POU_DEPT> UpdateDeptStatus(string strDeptID, int intStatus, string strOrgGroupID, int appID);
    }
}
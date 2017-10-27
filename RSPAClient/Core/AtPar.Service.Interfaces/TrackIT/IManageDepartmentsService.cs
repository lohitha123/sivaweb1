using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface IManageDepartmentsService
    {
        AtParWebApiResponse<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string OrgGrpID);
        AtParWebApiResponse<TKIT_DEPT> SaveDeptData(string deptID, string deptDescr, string status, string mode, string orgGrpID, string userID);
    }
}
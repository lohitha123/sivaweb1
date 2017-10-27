using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface IManageDepartmentsRepository
    {
        List<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string OrgGrpID);
        long SaveDeptData(string deptID, string deptDescr, string status, string mode, string orgGrpID, string userID);
    }
}
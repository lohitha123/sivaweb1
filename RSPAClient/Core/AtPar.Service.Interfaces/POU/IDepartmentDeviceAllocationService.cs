using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IDepartmentDeviceAllocationService
    {
        AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS> GetDeptWorkstations(string departmentID, string orgGrpID);
        AtParWebApiResponse<long>UpdateHospGroupWorkstations(string departmentID, string workStationID, string workStationDescr, string workStationMacAddr);
        AtParWebApiResponse<long>  DeleteHospgroupWorkstation(string departmentID, string workStationID);
        AtParWebApiResponse<long> AddHospGroupWorkstations(string departmentID, string workStationID, string workStationDescr, string workStationMacAddr,string orgGrpID);
    }
}

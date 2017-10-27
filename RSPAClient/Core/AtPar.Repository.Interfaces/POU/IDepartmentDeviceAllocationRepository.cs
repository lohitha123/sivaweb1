using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IDepartmentDeviceAllocationRepository
    {

        List<MT_POU_DEPT_WORKSTATIONS> GetDeptWorkstations(string departmentID, string orgGrpID);
        long UpdateHospGroupWorkstations(string departmentID, string workStationID, string workStationDescr, string workStationMacAddr);
        long DeleteHospgroupWorkstation(string departmentID, string workStationID);
        long AddHospGroupWorkstations(string departmentID, string workStationID, string workStationDescr, string workStationMacAddr,string orgGrpID);
    }
}

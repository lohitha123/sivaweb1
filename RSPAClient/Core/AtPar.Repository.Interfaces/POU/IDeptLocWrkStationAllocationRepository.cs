using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IDeptLocWrkStationAllocationRepository
    {
        List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetDeptCartWrkAllocations(string orgGrpId, int appId);
        List<MT_POU_DEPT_CART_ALLOCATIONS> GetDeptCartAllocations(string orgGrpId);
        List<MT_POU_DEPT_WORKSTATIONS> GetDeptWrkStations(string orgGrpId);

        long DeleteDeptCartWrkAlloc(List<MT_POU_DEPT_WORKSTATIONS> lstDeptCartWrkAlloc, string deptID, int appid, string orgGrpID);
        long InsertDeptCartWrkAlloc(List<MT_POU_DEPT_WORKSTATIONS> lstDeptCartWrkAlloc, string deptID, int appid, string orgGrpID, string userID);


    }
}

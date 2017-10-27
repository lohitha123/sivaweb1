using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.ParManagement
{
    public interface ICostcenterRepository
    {

        long CanCostCenterInActivate(string costCenterCode);
        List<VM_COST_CENTER_CODES> GetCodes(string costCenterCode, string pOrgGroupId, string pDeptId);
        List<VM_COST_CENTER_CODES> GetCostCenters(string orgGroupID, string search);
        List<string> GetCostCenterOrgIds(string userID);
        List<MT_POU_DEPT> GetDepartments();
        long InsertCostCenter(PAR_MNGT_COST_CENTER costCenter);
        long IsCostCenterExistOrNot(string costCenterCode, string orgGroupID, string deptID);
        long UpdateCostCenter(PAR_MNGT_COST_CENTER costCenter);
        long UpdateCostCenterStatus(int status, string orgID, string costCenterCode, string deptID);
    }
}

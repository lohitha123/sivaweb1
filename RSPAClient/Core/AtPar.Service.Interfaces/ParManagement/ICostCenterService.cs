using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.ParManagement
{
  public interface ICostCenterService
    {
        AtParWebApiResponse<VM_COST_CENTER_CODES> GetCodes(string costCenterCode, string orgGroupID, string deptID);
        AtParWebApiResponse<VM_COST_CENTER_CODES> GetCostCenters(string orgGroupID, string search);
        AtParWebApiResponse<string> GetCostCenterOrgIds(string userID);
        AtParWebApiResponse<MT_POU_DEPT> GetDepartments();
        AtParWebApiResponse<PAR_MNGT_COST_CENTER> InsertCostCenter(PAR_MNGT_COST_CENTER costCenter);
        AtParWebApiResponse<PAR_MNGT_COST_CENTER> UpdateCostCenter(PAR_MNGT_COST_CENTER costCenter);
        AtParWebApiResponse<long> UpdateCostCenterStatus(int status, string orgID, string costCenterCode, string deptID);
    }
}

using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IParOptimizationReportRepository
    {

        #region GetParOptimizationRep
        List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetCartIds(string bunit,string departmentID, string cartID, string orgGrpID, int appID);

        List<VM_PAR_OPTIMIZATION_DETAILS> GetOptUsageData(string bUnit, string cartID, DateTime fDate, DateTime tDate);

        string GetStorageArea(string deptID, string orgGrpID);

        List<VM_PAR_OPTIMIZATION_DETAILS> GetOptOrdData(string bUnit, string cartID, DateTime fDate, DateTime tDate);

        List<VM_PAR_OPTIMIZATION_DETAILS> GetItemsAvgLeadTime(string bUnit, string cartID, DateTime fDate);
        #endregion

    }
}

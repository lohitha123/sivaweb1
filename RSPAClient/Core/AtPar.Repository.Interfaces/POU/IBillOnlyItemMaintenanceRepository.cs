using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IBillOnlyItemMaintenanceRepository
    {
        List<MT_POU_BILLONLY_ITEMS> GetAllBillOnlyItems();
        List<MT_POU_BILLONLY_ITEMS> GetBillonlyItemsDtls(string ItemID, string OrgGrpID, string DeptID, string descr);
        long UpdateBillonlyItemsDtls(List<MT_POU_BILLONLY_ITEMS> lstBillOnlyItems);
        List<VM_ATPAR_POU_LOCATIONS> GetLocations(int AppID, string OrgID, string UserID, string DeptID);
        List<string> GetInventoryBUnits(string userID);
        List<string> GetCostCenterOrgIds(string userID);
        long ConvertBillonlyItem(List<VM_MT_POU_BILLONLY_ITEMS> lstBillOnlyItems);

    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.POU
{
   public interface IBillOnlyItemMaintenanceService
    {
        AtParWebApiResponse<MT_POU_BILLONLY_ITEMS> GetAllBillOnlyItems();
        AtParWebApiResponse<MT_POU_BILLONLY_ITEMS> GetBillonlyItemsDtls(string itemID, string orgGrpID, string deptID, string descr);
        AtParWebApiResponse<long> UpdateBillonlyItemsDtls(List<MT_POU_BILLONLY_ITEMS> lstBillOnlyItem);
        AtParWebApiResponse<VM_ATPAR_POU_LOCATIONS> GetLocations(int appID, string orgID, string userID, string deptID);
        AtParWebApiResponse<string> GetInventoryBUnits(string userID);
        AtParWebApiResponse<string> GetCostCenterOrgIds(string userID);
        AtParWebApiResponse<long> ConvertBillonlyItem(List<VM_MT_POU_BILLONLY_ITEMS> lstBillOnlyItems);

    }
}

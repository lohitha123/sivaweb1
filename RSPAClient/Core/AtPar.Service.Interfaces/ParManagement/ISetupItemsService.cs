using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.ParManagement
{
    public interface ISetupItemsService
    {
        AtParWebApiResponse<PAR_MNGT_ITEM> GetItems(string ItemID, string OrgId, string AppID);
        AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDetails(string ItemID, string Descr, string Vendor, string UPCcode, string Manf, string ItemPriceFrom, string ItemPriceTo, string CustItemID, string VendItemID, string ManfItemID, string Lot, string Serial, string Mode, bool status, string OrgGrpID, bool SubItems);
        AtParWebApiResponse<PAR_MNGT_ITEM> GetItemUOM(string ItemID, string OrgGrpID, string AppID);
        AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDataToAddOrUpdate(string ItemID, string OrgGrpID);
        AtParWebApiResponse<PAR_MNGT_ITEM_SUBSTITUTE> GetSubstituteItemDetails(string ItemID, string OrgGrpID);
        AtParWebApiResponse<PAR_MNGT_PAR_LOC_DETAILS> GetPharmacyItemLocations(string ItemID);
        AtParWebApiResponse<PAR_MNGT_ITEM> UpdateItem(PAR_MNGT_ITEM Item);
        AtParWebApiResponse<PAR_MNGT_ITEM> InsertItem(PAR_MNGT_ITEM Item);
        AtParWebApiResponse<long> InsertSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, string Priority, string ItemDescr, int Status, bool blnPharmItemAllocated, List<PAR_MNGT_PAR_LOC_DETAILS> PharmItemLocations);
        AtParWebApiResponse<long> UpdateSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, int Status, bool blnPharmItemAllocated);
        AtParWebApiResponse<long> GetLatestItemId(int appID);
        AtParWebApiResponse<long> UpdateItemStaus(string itemID, int status);
    }
}

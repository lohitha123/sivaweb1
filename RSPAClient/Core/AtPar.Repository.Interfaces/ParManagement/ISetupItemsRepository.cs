using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.ParManagement
{
    public interface ISetupItemsRepository
    {
        List<PAR_MNGT_ITEM> GetItems(string ItemID, string OrgId, string AppID);
        List<PAR_MNGT_ITEM> GetItemDetails(string ItemID, string Descr, string Vendor, string UPCcode, string Manf, string ItemPriceFrom, string ItemPriceTo, string CustItemID, string VendItemID, string ManfItemID, string Lot, string Serial, string Mode, bool status, string OrgGrpID, bool SubItems);
        List<PAR_MNGT_ITEM> GetItemUOM(string ItemID, string OrgGrpID, string AppID);
        List<PAR_MNGT_ITEM> GetItemDataToAddOrUpdate(string ItemID, string OrgGrpID);
        List<PAR_MNGT_ITEM_SUBSTITUTE> GetSubstituteItemDetails(string ItemID, string OrgGrpID);
        List<PAR_MNGT_PAR_LOC_DETAILS> GetPharmacyItemLocations(string ItemID);
        long UpdateItem(PAR_MNGT_ITEM Item);
        long InsertItem(PAR_MNGT_ITEM Item);
        long InsertSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, string Priority, string ItemDescr, int Status, bool blnPharmItemAllocated, List<PAR_MNGT_PAR_LOC_DETAILS> PharmItemLocations);
        long UpdateSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, int Status, bool blnPharmItemAllocated);
        long IsItemExistOrNot(string ItemID, string OrgGrpID);
        long IsSubstituteItemExistOrNot(string ItemID, string SubItemID, string OrgGrpID);
        //long GetLatestItemId(int appID);
        long UpdateItemStaus(string itemID, int status);
    }
}

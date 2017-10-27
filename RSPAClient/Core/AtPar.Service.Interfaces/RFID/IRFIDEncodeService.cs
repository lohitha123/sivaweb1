using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.RFID
{
    public interface IRFIDEncodeService
    {
        AtParWebApiResponse<long> WriteBinTags(List<RF_BIN_MAPPING> lstTags);
        AtParWebApiResponse<long> WriteItemTags(List<RF_ITEM_MAPPING> lstTags);
        AtParWebApiResponse<VM_SEARCHITEM_DETAILS> SearchItem(string strItemID, string[] deviceTokenEntry, bool blnScanFlag = false, string strFileType = "", bool blnLocSelection = false);
        AtParWebApiResponse<VM_SEARCHITEM_DETAILS> GetItemDetailsData(string Bunit, string CartId, string UserId, string OrgGroupId, string[] deviceTokenEntry);
    }
}

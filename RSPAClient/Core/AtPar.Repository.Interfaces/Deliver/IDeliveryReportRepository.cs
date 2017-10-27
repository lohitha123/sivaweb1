using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.Deliver
{
    public interface IDeliveryReportRepository
    {

        List<VM_DELV_DELIVERY_REPORT> GetDeliveryReportData(string OrgGroupID, string fromDate, string ToDate,
           string srvrUserID, string PoId, string DeliverTo, string TrackingNo, string DeliverdBy,
           string DeptId, string VendorName, string ItmDesc, string Loc, string ItemId,
           string Carrier, string Requestor, string BlnTflag, string DeliveryLoc, string Status, string CurrStatus,
           string LocDescr, string PakageType, string Pallet);
        long GetUserFullName(string UserId,ref string UserFullName);
        List<RM_USER_LOCATIONS> GetBadgeDetails(string badgeId);
        string GetSignature(string sigID);
        string GetDeliveryTripUpdateDate(int transactionID, string updateDt);
       List< MT_DELV_DLVR_ATTEMPT> GetDeliveryAttempts(int transactionID);
        List<VM_DELV_PARCELCOUNT_DETAILS> ParcelCountDetails();
    }
}

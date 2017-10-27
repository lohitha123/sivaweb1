using AtPar.Common;

namespace AtPar.Service.Interfaces.Deliver
{
    public interface IDeliverTrackService
    {
        AtParWebApiResponse<long> GetDeliveryTrackingReportData(string trackNo, string poId, string deptID, string fromDate, string toDate, string pVendorName, string itemDesc, string itemID, string carrierID, string deliveryLoc, string requestor, string receiver, string selectedStatus, string currentStatus, string systemID, string locDescr);
        AtParWebApiResponse<long> ValidateSystemID(string systemID);
    }
}

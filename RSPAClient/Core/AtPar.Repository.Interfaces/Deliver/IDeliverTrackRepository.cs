using System;
using System.Data;

namespace AtPar.Repository.Interfaces.Deliver
{
    public interface IDeliverTrackRepository
    {
        Tuple<DataSet, bool, DataSet, long> GetDeliveryTrackingReportData(string trackNo, string poId, string deptID, string fromDate, string toDate, string vendorName, string itemDesc, string itemID,
string carrierID, string deliveryLoc, string requestor, string receiver, string selectedStatus, string currentStatus, string systemID, string locDescr);
        long ValidateSystemID(string systemID);
    }
}

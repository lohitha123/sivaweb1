using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Data;

namespace AtPar.Service.Interfaces.Deliver
{
    
    public interface IDeliveryReportService
    {
        AtParWebApiResponse<bool> GetDeliveryReportData(string OrgGroupID, string fromDate, string ToDate,
       string srvrUserID, string PoId, string DeliverTo, string TrackingNo, string DeliverdBy,
       string DeptId, string VendorName, string ItmDesc, string Loc, string ItemId,
       string Carrier, string Requestor, string BlnTflag, string DeliveryLoc, string Status, string CurrStatus,
       string LocDescr, string PakageType,
       string Pallet);
        long BuildDelvDetailsTable(string psrvrUserID, string OrgGroupID, ref DataTable pDTDelvDetails, DataSet pDsDelVDet);



    }
}

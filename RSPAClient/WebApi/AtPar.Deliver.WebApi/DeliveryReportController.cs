//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace AtPar.Deliver.WebApi
//{
//    class DeliveryReportController
//    {
//    }
//}
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Deliver;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Deliver.WebApi
{
    public class DeliveryReportController : ApiController
    {

        private IDeliveryReportService _Service;
        private ILog _log;

        public DeliveryReportController(IDeliveryReportService service, ILog log)
        {
            _Service = service;
            _log = log;
            Utils.SetProductLog(AtParWebEnums.EnumApps.Init);
            _log.SetLoggerType(typeof(ExcludeLocsController));
        }

        [HttpGet]
        public AtParWebApiResponse<bool> GetDeliveryReportData(string OrgGroupID, string fromDate, string ToDate,
           string srvrUserID, string PoId, string DeliverTo, string TrackingNo, string DeliverdBy,
           string DeptId, string VendorName, string ItmDesc, string Loc, string ItemId,
           string Carrier, string Requestor, string BlnTflag, string DeliveryLoc, string Status, string CurrStatus,
           string LocDescr, string PakageType, string Pallet)
        {
            var result = _Service.GetDeliveryReportData(OrgGroupID, fromDate, ToDate,
            srvrUserID, PoId, DeliverTo, TrackingNo, DeliverdBy,
            DeptId, VendorName, ItmDesc, Loc, ItemId,
            Carrier, Requestor, BlnTflag, DeliveryLoc, Status, CurrStatus,
            LocDescr, PakageType, Pallet);
            return result;
        }

    }
}

using System.Web.Http;
using log4net;
using AtPar.Service.Interfaces.POU;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;
using System;

namespace AtPar.POU.WebApi
{
    public class BillonlyAndConsignedItemsController : ApiController
    {
        private ILog _log;
        IBillonlyAndConsignedItemsService _billonlyandconsignedService;

         ICommonPOUService _commonPOUService;
        public BillonlyAndConsignedItemsController(ILog log,IBillonlyAndConsignedItemsService billonlyandconsignedService,ICommonPOUService commonPOUService)
        {
            _log = log;
            _billonlyandconsignedService = billonlyandconsignedService;
            _log.SetLoggerType(typeof(BillonlyAndConsignedItemsController));
            _commonPOUService = commonPOUService;
        }

        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_VENDOR> GetVendorsInfo(string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _billonlyandconsignedService.GetVendorsInfo(orgGrpID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, object>> GetConsignmentItemOrderReports(string ItemID, string vendorID, string departmentID, string businessUnit, string cartID, string startDate, string endDate, string poNumber, [FromUri] string[] deviceTokenEntry)
        {
            var result = _billonlyandconsignedService.GetConsignmentItemOrderReports(ItemID, vendorID, departmentID, businessUnit, cartID, startDate, endDate, poNumber, deviceTokenEntry);
            return result;
        }
        [HttpPut]
        public AtParWebApiResponse<long> UpdateNonCatalogItemDtls([FromBody] VM_SEARCHITEM_DETAILS billOnlyItems, [FromUri] string[] deviceTokenEntry)
        {
            var result = _billonlyandconsignedService.UpdateNonCatalogItemDtls(billOnlyItems, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateItemStatus(int transID, string itemID, string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _billonlyandconsignedService.UpdateItemStatus(transID, itemID, status);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetERPName([FromUri] string[] deviceTokenEntry)
        {
            var result = _billonlyandconsignedService.GetERPName();
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateConsignmentItemOrderReports(string transID, string itemID, bool vendorResponse, bool approverResponse, bool reviewerResponse, decimal itemPrice, string workflowInstanceID, string responseFrom, string uom, string deptID, string lotID, string serialID, int lineNo, string comments, [FromUri] string[] deviceTokenEntry)

        {
            
            var result = _billonlyandconsignedService.UpdateConsignmentItemOrderReports(transID, itemID, vendorResponse, approverResponse, reviewerResponse, itemPrice, workflowInstanceID, responseFrom, uom, deptID, lotID, serialID, lineNo, comments,deviceTokenEntry);
            return result;
        }
        

        [HttpGet]
        public AtParWebApiResponse<VM_SEARCHITEM_DETAILS> SearchInERPItemMaster(string strItemID, [FromUri]string[] deviceTokenEntry)
        {
            var result = _commonPOUService.SearchInERPItemMaster(strItemID, deviceTokenEntry);
            return result;
        }

    }
}

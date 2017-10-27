using AtPar.Common;
using AtPar.Service.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.CartCount.WebApi
{
   public class ManageOrdersCartCountController : ApiController
    {
        private ILog _log;
        private IManageOrdersService _service;
        public ManageOrdersCartCountController(ILog log, IManageOrdersService service)
        {
            _log = log;
            _service = service;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetOrderDetails(int orderID, string orderStatus, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetOrderDetails( orderID,  orderStatus, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetOrders(string fromDate, string toDate, string compID, string locID, string deptID, string vendorID, string ordStatus, string reqNo, string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetOrders( fromDate,  toDate,  compID,  locID,  deptID,  vendorID,  ordStatus,  reqNo,  orgGroupID,deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateOrderDetails([FromBody] List<VM_CARTCOUNT_ORDER_DETAILS> lstPouOrderDetails, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateOrderDetails(lstPouOrderDetails, deviceTokenEntry);
            return result;
        }
    }
}

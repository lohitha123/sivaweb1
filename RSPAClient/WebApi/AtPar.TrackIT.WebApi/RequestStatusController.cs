using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class RequestStatusController : ApiController
    {
        #region Private Variable      

        private IRequestStatusService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public RequestStatusController(IRequestStatusService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(RequestStatusController));
        }

        #endregion

        #region Public Methods       

        [HttpGet]
        public AtParWebApiResponse<VM_TKIT_ORDER_DETAILS> GetOrderDetails(string requestID, string status, string deptID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetOrderDetails(requestID, status, deptID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_TKIT_ORDER_DETAILS> GetOrderIDs(string fromDate, string toDate, string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetOrderIDs(fromDate, toDate, status, deviceTokenEntry);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails, string userID, string serverUserID, [FromUri] string[] deviceTokenEntry)
        {
            List<TKIT_ORDER_DETAILS> updateOrderDetails = null;
            if (lstOrderDetails!=null)
            {
                updateOrderDetails = lstOrderDetails;
            }
            var result = _Service.UpdateOrder(lstOrderDetails, updateOrderDetails, userID, serverUserID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_ORDER_HEADER> GetOrdersForDashboard([FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetOrdersForDashboard(deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_ORDER_DETAILS> GetOrderDetailsForDashboard(int orderNumber, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetOrderDetailsForDashboard(orderNumber);
            return result;
        }

        #endregion
    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    [RoutePrefix("api/ManageOrders")]
    public class ManageOrdersController : ApiController
    {
        #region Private Variable

        private IManageOrdersService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageOrdersController(IManageOrdersService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(ManageOrdersController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Getting order details
        /// </summary>
        /// <param name="ordNo"></param>
        /// <param name="ordStatus"></param>
        /// <param name="cartID"></param>
        /// <param name="bUnit"></param>
        /// <param name="itemID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="appID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetOrderDetails_ManageOrders")]
        public AtParWebApiResponse<PAR_MNGT_ORDER_DETAILS> GetOrderDetails_ManageOrders(string ordNo, string ordStatus, string cartID, string bUnit, string itemID, string orgGrpID, int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetOrderDetails_ManageOrders(ordNo,ordStatus, cartID, bUnit, itemID, orgGrpID, appID, deviceTokenEntry);
            return result;
        }

        /// <summary>
        /// Getting order headers
        /// </summary>
        /// <param name="fromDate"></param>
        /// <param name="toDate"></param>
        /// <param name="compID"></param>
        /// <param name="locID"></param>
        /// <param name="deptID"></param>
        /// <param name="vendorID"></param>
        /// <param name="ordStatus"></param>
        /// <param name="reqNo"></param>
        /// <param name="itemID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="appID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetOrderHeaders")]
        public AtParWebApiResponse<VM_POU_MNGT_ORDER_DETAILS> GetOrderHeaders(string fromDate, string toDate, string compID, string locID, string deptID, string vendorID, string ordStatus, string reqNo, string itemID,
string orgGrpID, int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetOrderHeaders(fromDate, toDate, compID, locID, deptID, vendorID, ordStatus, reqNo, itemID, orgGrpID, appID, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

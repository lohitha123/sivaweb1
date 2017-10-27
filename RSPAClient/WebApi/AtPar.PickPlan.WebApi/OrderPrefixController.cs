using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.PickPlan;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.PickPlan.WebApi
{

    public class OrderPrefixController : ApiController
    {
        #region Private Variable

        private IOrderPrefixService _orderPrefixService;
        private ILog _log;

        #endregion

        #region Constructor

        public OrderPrefixController(IOrderPrefixService vendorService, ILog log)
        {
            _orderPrefixService = vendorService;
            _log = log;
            _log.SetLoggerType(typeof(OrderPrefixController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_PKPL_ORDER_PREFIX> GetOrderPrefixSetUp([FromUri] string[] deviceTokenEntry)
        {
            var result = _orderPrefixService.GetOrderPrefixSetUp(deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_PKPL_ORDER_PREFIX> SaveOrderPrefixSetUp([FromBody] List<MT_PKPL_ORDER_PREFIX> orderPrefix, [FromUri] string[] deviceTokenEntry)
        {
            var result = _orderPrefixService.SaveOrderPrefixSetUp(orderPrefix);
            return result;
        }

        #endregion
    }
}

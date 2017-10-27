using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class ViewCartController : ApiController
    {
        #region Private Variable

        private IViewCartService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public ViewCartController(IViewCartService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(ViewCartController));
        }

        #endregion

        #region Public Methods

        [HttpPost]
        public AtParWebApiResponse<long> ClearCart([FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.ClearCart(deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> DeleteCartItem(int id, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.DeleteCartItem(id);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> PlaceOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails, string comments, string requestor,string requrestID, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _Service.PlaceOrder(lstOrderDetails, comments, requestor, requrestID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetRequestedItemsCount([FromUri]  string[] deviceTokenEntry)
        {
            var result = _Service.GetRequestedItemsCount(deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

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
    public class POUCreateOrdersController : ApiController
    {
        #region Private Variable

        private ICreateOrdersService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public POUCreateOrdersController(ICreateOrdersService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(POUCreateOrdersController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, [FromUri] string[] deviceTokenEntry, string locationType = "", string cartType = "")
        {
                var result = _service.GetBUnits_Carts(userID, appID, locationType, cartType, deviceTokenEntry);               
                return result;                      
        }


        [HttpGet]
        public AtParWebApiResponse<VM_POU_CART_DETAILS> GetCartItemCounts(string bUnit, string cartID, string userID, string itemID,string orgGrpID, int appID, [FromUri] string[] deviceTokenEntry)
        {
             var result = _service.GetCartItemCounts(bUnit, cartID, userID, itemID, orgGrpID, appID, deviceTokenEntry);                
             return result;            
        }

        [HttpGet]
        public AtParWebApiResponse<VM_POU_CART_DETAILS> GetItemsForSelectedLocation(string cartID, string bUnit, string userID, string orgGrpID, int appID, [FromUri] string[] deviceTokenEntry)
        {
                var result = _service.GetItemsForSelectedLocation(cartID, bUnit, userID, orgGrpID, appID, deviceTokenEntry);               
                return result;                        
        }

        [HttpPost]
        public AtParWebApiResponse<long> CreateOrder([FromBody]Dictionary<string, object> dicDataItems, int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.CreateOrder(dicDataItems,  appID, deviceTokenEntry);
            return result;
        }        

        #endregion
    }
}

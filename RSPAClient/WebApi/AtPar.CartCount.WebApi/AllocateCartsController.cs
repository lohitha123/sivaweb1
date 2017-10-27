using AtPar.Common;
using AtPar.POCOEntities;
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
    public class AllocateCartsController : ApiController
    {

        #region Private Variable

        private IAllocateCartsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public AllocateCartsController(IAllocateCartsService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(AllocateCartsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<object> GetCarts(string orgGroupID, string userID, string bUnit,
                                                  string cartID, string order, [FromUri] string[] deviceTokenEntry)
        {         
                var result = _service.GetCarts(orgGroupID.HandleNull(), userID.HandleNull(), bUnit.HandleNull(), cartID.HandleNull(), order, deviceTokenEntry);             
                return result;         
        }

        [HttpPost]
        public AtParWebApiResponse<long> DeleteCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts,string userID, [FromUri] string[] deviceTokenEntry)
        {          
                var result = _service.DeleteCarts(lstSelectedCarts, userID);              
                return result;          
        }

        [HttpPut]
        public AtParWebApiResponse<long> MoveCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts,string userID,
                                                   string seletedUserID, string bUnit, string cartID, [FromUri] string[] deviceTokenEntry)
        {         
                var result = _service.MoveCarts(lstSelectedCarts, userID, seletedUserID, bUnit, cartID);              
                return result;
          
        }

        [HttpPost]
        public AtParWebApiResponse<long> AllocateCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID,
                                                string seletedUserID, string bUnit, string cartID, [FromUri] string[] deviceTokenEntry)
        {          
                var result = _service.AllocateCarts(lstSelectedCarts, userID, seletedUserID, bUnit, cartID);                
                return result;          
        }

        [HttpPost]
        public AtParWebApiResponse<long> CopyCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID, string seletedUserID,
                                            string bUnit, string cartID, [FromUri] string[] deviceTokenEntry)
        {       
                var result = _service.CopyCarts(lstSelectedCarts, userID, seletedUserID, bUnit, cartID);             
                return result;          
        }

        #endregion
    }
}

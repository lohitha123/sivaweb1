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
    public class CriticalItemsController : ApiController
    {

        #region Private Variable

        private ICriticalItemsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public CriticalItemsController(ICriticalItemsService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(CriticalItemsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_CRCT_USER_ALLOCATION> GetCartBunitsInfo(string orgGroupID, string serverUser,
                                                          string bUnit, [FromUri] string[] deviceTokenEntry)
        {          
                var result = _service.GetCartBunitsInfo(orgGroupID, serverUser, bUnit, deviceTokenEntry);              
                return result;         
        }

        [HttpPost]
        public AtParWebApiResponse<MT_CRCT_CRITICAL_ITEMS> AllocateCartItemInfo([FromBody] List<MT_CRCT_CRITICAL_ITEMS> lstCriticalItems, string bUnit,
                                                           string cartID, string serverUser, [FromUri] string[] deviceTokenEntry)
        {          
                var result = _service.AllocateCartItemInfo(lstCriticalItems, bUnit, cartID, serverUser, deviceTokenEntry);           
                return result;           
        }

        [HttpGet]
        public AtParWebApiResponse<VM_MT_CRCT_CRITICAL_ITEMS> GetCartItemInfo(string orgGroupID, string businessUnit,
                                                                        string cartID, string serverUser, string profileID,
                                                                       [FromUri] string[] deviceTokenEntry)
        {
                var result = _service.GetCartItemsInfo(orgGroupID, businessUnit, cartID, serverUser, profileID, deviceTokenEntry);
                result.DataList.OrderBy(x => x.ChkValue == "Y");               
                return result;           
        }

        #endregion
    }
}

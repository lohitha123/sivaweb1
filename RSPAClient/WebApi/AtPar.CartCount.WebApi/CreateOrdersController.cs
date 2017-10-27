using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml;

namespace AtPar.CartCount.WebApi
{
    public class CreateOrdersController : ApiController
    {
        #region Private Variable

        private ICreateOrdersService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public CreateOrdersController(ICreateOrdersService service, ILog log)
        {
            _service = service;
            _log = log;
            _log.SetLoggerType(typeof(CreateOrdersController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_CRCT_USER_ALLOCATION> GetCartsForBunit(string serverUser, string businessUnit,string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {          
                var result = _service.GetCartsForBunit(serverUser, businessUnit, orgGroupID, deviceTokenEntry);              
                return result;          
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetCartPrevCounts(string orgGroupID, string businessUnit,
                                                        string ID, string serverUser, string profileID,
                                                           [FromUri] string[] deviceTokenEntry)
        {         
                var result = _service.GetCartPrevCounts(orgGroupID, businessUnit, ID, serverUser, profileID, deviceTokenEntry);             
                return result;          
        }

        [HttpPost]
        public AtParWebApiResponse<MT_CRCT_USER_ALLOCATION> SendCartCounts([FromBody]Dictionary<string, dynamic> dicDataItems, string serverUser, string businessUnit, string ID, string profileID, string orgGroupID, int transID, [FromUri] string[] deviceTokenEntry)
        {                       
                var result = _service.SendCartCounts(dicDataItems, serverUser, businessUnit, ID, profileID, orgGroupID, transID, deviceTokenEntry);              
                return result;          
        }


        #endregion
    }
}

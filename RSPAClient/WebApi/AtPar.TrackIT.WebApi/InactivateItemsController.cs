using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class InactivateItemsController : ApiController
    {
        #region Private Variable

        private IInactivateItemsService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public InactivateItemsController(IInactivateItemsService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(InactivateItemsController));
        }

        #endregion

        #region Public Methods    
                
        [HttpPost]
        public AtParWebApiResponse<long> InactivateItem([FromBody] List<TKIT_ITEM_MASTER> lstItemMaster, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.InactivateItems(lstItemMaster);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_INACTIVE_ITEMS> GetItemsToInActivate(string typeIndicator, string destDate, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetItemsToInActivate(typeIndicator, destDate);
            return result;
        }

        #endregion
    }
}

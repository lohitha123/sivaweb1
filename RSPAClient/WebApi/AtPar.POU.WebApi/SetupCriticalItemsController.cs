using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class SetupCriticalItemsController : ApiController
    {
        #region Private Variable

        private ISetupCriticalItemsService _setupCriticalItemsService;
        private ILog _log;

        #endregion

        #region Constructor

        public SetupCriticalItemsController(ISetupCriticalItemsService setupCriticalItemsService, ILog log)
        {
            _setupCriticalItemsService = setupCriticalItemsService;
            _log = log;
            _log.SetLoggerType(typeof(SetupCriticalItemsController));
        }

        #endregion


        #region Public Methods

        [HttpPost]
        public AtParWebApiResponse<long> SaveCriticalItems(string bUnit, string parLocation, List<MT_POU_CRITICAL_ITEMS> lstItems, params string[] deviceTokenEntry)
        {
            var result = _setupCriticalItemsService.SaveCriticalItems(bUnit, parLocation, lstItems, deviceTokenEntry);
            return result;
        }

        #endregion

    }
}

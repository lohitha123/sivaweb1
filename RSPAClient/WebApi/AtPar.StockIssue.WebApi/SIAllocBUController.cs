using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.StockIssue;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtPar.StockIssue.WebApi
{
    public class SIAllocBUController : ApiController
    {
        #region Private Variable

        private ISIAllocBUService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public SIAllocBUController(ISIAllocBUService allocateBUnitsService, ILog log)
        {
            _Service = allocateBUnitsService;
            _log = log;
            _log.SetLoggerType(typeof(SIAllocBUController));

        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits([FromUri] string[] bArray, string appID, string userID, string bUnit, string description, string serverUserID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetBUnits(bArray, appID, userID, bUnit, description, serverUserID, deviceTokenEntry);

            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION> AllocateBUnits(string appID, string userID, string serverUserID,
                  List<VM_ATPAR_IBU_ALLOCATION> lstBUnitsAllocation, bool searched, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.AllocateBUnits(appID, userID, serverUserID, lstBUnitsAllocation, searched, deviceTokenEntry);

            return result;
        }

        #endregion

    }
}

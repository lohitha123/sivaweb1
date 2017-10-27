using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Receiving;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtPar.Receiving.WebApi
{
    public class RcvAllocBUController : ApiController
    {
        #region Private Variable

        private IRcvAllocBUService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public RcvAllocBUController(IRcvAllocBUService inventorybusinessunitService, ILog log)
        {
            _Service = inventorybusinessunitService;
            _log = log;
            _log.SetLoggerType(typeof(RcvAllocBUController));

        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits([FromUri] string[] bArray, string appId, string userID, string bUnit, string description, string serverUserID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetBUnits(bArray, appId, userID, bUnit, description, serverUserID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION> AllocateBUnits(string appId, string userId, string serverUserId,
                 List<VM_ATPAR_IBU_ALLOCATION> lstbunitsAllocation, bool searched, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.AllocateBUnits(appId, userId, serverUserId, lstbunitsAllocation, searched, deviceTokenEntry);
            return result;
        }

        #endregion

    }



}


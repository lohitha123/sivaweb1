using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Putaway;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtPar.Putaway.WebApi
{
    public class PAAllocBUController : ApiController
    {
        #region Private Variable

        private IPAAllocBUService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public PAAllocBUController(IPAAllocBUService bUnitService, ILog log)
        {
            _Service = bUnitService;
            _log = log;
            _log.SetLoggerType(typeof(PAAllocBUController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits([FromUri] string[] bArray, string userID, string bUnit,
                                                string description, string serverUserID, [FromUri] string[] deviceTokenEntry)
        {
                var result = _Service.GetBUnits(bArray, userID, bUnit, description, serverUserID, deviceTokenEntry);             
                return result;           
        }

        [HttpPost]
        public AtParWebApiResponse<MT_PTWY_BU_ALLOCATION> AllocateBUnits(string userID, string serverUserID, [FromBody] List<MT_PTWY_BU_ALLOCATION> lstBUnitsAllocation, bool searched, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.AllocateBUnits(userID, serverUserID, lstBUnitsAllocation, searched, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

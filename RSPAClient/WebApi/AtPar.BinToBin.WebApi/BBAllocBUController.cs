using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.BinToBin;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.BinToBin.WebApi
{
    public class BBAllocBUController : ApiController
    {
        private IBBAllocBUService _Service;
        private ILog _log;

        public BBAllocBUController(IBBAllocBUService inventorybusinessunitService, ILog log)
        {
            _Service = inventorybusinessunitService;
            _log = log;
            _log.SetLoggerType(typeof(BBAllocBUController));
        }

        [HttpGet]
        public AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits([FromUri] string[] bArray,
            string appID, string userID, string bUnit, string description, string serverUserID, [FromUri] string[] deviceTokenEntry)
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
    }

}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.StockIssue;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.StockIssue.WebApi
{
    public class AllocateDestinationLocationsController : ApiController
    {
        #region Private Variable

        private ILog _log;
        private IAllocateDestinationLocationsService _Service;

        #endregion

        #region Constructor

        public AllocateDestinationLocationsController(ILog log, IAllocateDestinationLocationsService service)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(AllocateDestinationLocationsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION> GetDestinationLocations([FromUri] string[] bArray, string location, string userID,
                                               string orgGroupID, string serverUserID, [FromUri] string[] deviceTokenEntry)
        {

                var result = _Service.GetDestinationLocations(bArray, location, userID, orgGroupID, serverUserID, deviceTokenEntry);              
                return result;
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetAllocInvBUnits(int appID, string userID,string orgGrpId,[FromUri] string[] deviceTokenEntry)
        {              
                var result = _Service.GetAllocInvBUnits(appID,userID, orgGrpId, deviceTokenEntry);              
                return result;       
        }

        [HttpPost]
        public AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION> AllocatedDestLocations(string userID, string selectedUserID, 
            List<MT_STIS_DEST_LOC_ALLOCATION> lstLocations, bool searched, string bUnit, [FromUri] string[] deviceTokenEntry)
        {                
                var result = _Service.AllocatedDestLocations(userID, selectedUserID, lstLocations, searched, bUnit, deviceTokenEntry);                
                return result;
        }

        #endregion
    }
}

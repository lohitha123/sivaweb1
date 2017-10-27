using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Receiving;
using AtPar.Service.Interfaces.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.ViewModel;

namespace AtPar.Receiving.WebApi
{
    public class ShipToIDsController : ApiController
    {
        #region Private Variable

        private IShipToIDsService _shipToIDsService;
        private ICommonService _commonService;
        private ILog _log;

        #endregion

        #region Constructor

        public ShipToIDsController(IShipToIDsService shipToIDsService, ICommonService commonService, ILog log)
        {
            _shipToIDsService = shipToIDsService;
            _log = log;
            _commonService = commonService;
            _log.SetLoggerType(typeof(ShipToIDsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> GetShipToIDs(string userID, string setID, string shipToID, string shipToName,
            string status, [FromUri] string[] bArray, string serverUserID, [FromUri] string[] deviceTokenEntry)
        {
            shipToID = shipToID.ReplaceNullwithEmpty();
            shipToName = shipToName.ReplaceNullwithEmpty();
            status = status.ReplaceNullwithEmpty();

            var result = _shipToIDsService.GetShipToIDs(userID.HandleNull(), setID.HandleNull(), shipToID.HandleNull(), shipToName.HandleNull(), status, bArray, serverUserID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> AllocateShipTOIDs(string userID, string serverUserID, bool searched, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstShiptoIDs, [FromUri] string[] deviceTokenEntry)
        {
                var result = _shipToIDsService.AllocateShipTOIDs(userID, serverUserID, searched, lstShiptoIDs);
                return result;
         }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateShiptoIDStatus(string userID, string orgID, string shipToID, Boolean status, [FromUri] string[] deviceTokenEntry)
        {
    
                var result = _shipToIDsService.UpdateShiptoIDStatus(userID, orgID, shipToID, status, deviceTokenEntry);               
                return result;
 
        }

        [HttpPost]
        public AtParWebApiResponse<long> InsertShiptoIDs([FromBody] List<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> lstShiptoids, string userID, [FromUri] string[] deviceTokenEntry)
        {
                var result = _shipToIDsService.InsertShiptoIDs(userID, lstShiptoids, deviceTokenEntry);               
                return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateShiptoIDs(string userID, [FromBody] List<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> lstShiptoids, string NewOrgId, [FromUri] string[] deviceTokenEntry)
        {
   
                var result = _shipToIDsService.UpdateShiptoIDs(userID, lstShiptoids, NewOrgId, deviceTokenEntry);                
                return result;
 
        }

        #endregion
    }
}

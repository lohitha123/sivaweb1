using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.RFID;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.RFID.WebApi
{
    public class RFIDEncodeController:ApiController
    {
        private IRFIDEncodeService _rfidEncodeService;
        private ILog _log;

        public RFIDEncodeController(ILog log, IRFIDEncodeService rfidEncodeService)
        {
            _rfidEncodeService = rfidEncodeService;
            _log = log;

        }

        [HttpPost]
        public AtParWebApiResponse<long> WriteBinTags(List<RF_BIN_MAPPING> lstTags, [FromUri]string[] devicetokenentry)
        {
            var result = _rfidEncodeService.WriteBinTags(lstTags);
            return result;

        }

        [HttpPost]
        public AtParWebApiResponse<long> WriteItemTags(List<RF_ITEM_MAPPING> lstTags, [FromUri]string[] devicetokenentry)
        {
            var result = _rfidEncodeService.WriteItemTags(lstTags);
            return result;

        }

        [HttpGet]
        public AtParWebApiResponse<VM_SEARCHITEM_DETAILS> SearchItem(string strItemID, [FromUri]string[] devicetokenentry, bool blnScanFlag = false, string strFileType = "", bool blnLocSelection = false)
        {
            var result = _rfidEncodeService.SearchItem(strItemID, devicetokenentry, blnScanFlag,strFileType, blnLocSelection);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_SEARCHITEM_DETAILS> GetItemDetailsData(string strBUnit, string strCartId, string strUserId, string strOrgGroupId, [FromUri]string[] devicetokenentry)
        {
            var result = _rfidEncodeService.GetItemDetailsData(strBUnit,strCartId,strUserId,strOrgGroupId,devicetokenentry);
            return result;
        }
    }
}

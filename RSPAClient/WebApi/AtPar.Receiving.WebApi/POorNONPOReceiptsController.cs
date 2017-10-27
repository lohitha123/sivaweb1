using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Receiving;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Receiving.WebApi
{
    public class POorNONPOReceiptsController : ApiController
    {
        #region Private Variable

        private IPOorNONPOReceiptsService _service;
        private ILog _log;

        #endregion

        #region Constructor

        public POorNONPOReceiptsController(IPOorNONPOReceiptsService poOrNonpoReceiptsService, ILog log)
        {
            _service = poOrNonpoReceiptsService;
            _log = log;
            _log.SetLoggerType(typeof(POorNONPOReceiptsController));

        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<Object> GetReceivePrerequisites([FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.GetReceivePrerequisites(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString(),
                                                          deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(),
                                                          deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString(),
                                                          deviceTokenEntry);
            return result;

        }

        [HttpPost]
        public AtParWebApiResponse<Dictionary<string, object>> GetHeader([FromBody] List<VM_RECV_POHEADER> lstPoHeader, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.GetHeader(lstPoHeader, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<VM_PTWY_HEADER> GetIUTDetails([FromBody] List<VM_IUT_HEADER> lstIUTHeader, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.GetIUTDetails(lstIUTHeader, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<VM_RECV_SEARCHHEADER> SearchHeader(List<VM_RECV_SEARCHPOHEADER> lstRecvPOHeader, [FromUri]  string[] deviceTokenEntry)
        {

            var result = _service.SearchHeader(lstRecvPOHeader, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<VM_IUT_SEARCHHEADER> SearchIUTHeader(List<VM_IUT_SENDHEADER> lstIUTHeader, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.SearchIUTHeader(lstIUTHeader, deviceTokenEntry);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> PrintNiceLabel(string printerAddressOrName, string printerPort, string printerTye, string niceLabelName, string noOfPrints, string errMsg, [FromBody] List<VM_PRINTLABEL_RECEIVE_HEADER> lstprintDetails, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.PrintNiceLabel(printerAddressOrName, printerPort, printerTye, niceLabelName, noOfPrints, errMsg, lstprintDetails, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> DeleteHeader(List<VM_RECV_POHEADER> lstDeleteHeader, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.DeleteHeader(lstDeleteHeader, deviceTokenEntry);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> SendDetails(Dictionary<string, dynamic> dicDataItems, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.SendDetails(dicDataItems, deviceTokenEntry);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> SendIUTDetails(Dictionary<string, dynamic> dicDataItems, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.SendIUTDetails(dicDataItems, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> DeleteIUTHeader(Dictionary<string, dynamic> dicDataItems, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.DeleteIUTHeader(dicDataItems, deviceTokenEntry);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> PrintStaionaryReport(Dictionary<string, dynamic> dicDataItems, int noOfCopies, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.PrintStaionaryReport(dicDataItems, noOfCopies, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<RM_USER_LOCATIONS> GetBadgeDetails(string recpName, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.GetBadgeDetails(recpName);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> SendNonPos(List<VM_RECV_SENDNONPOHEADER> lstSendHeader, [FromUri]  string[] deviceTokenEntry)
        {
            var result = _service.SendNonPos(lstSendHeader, deviceTokenEntry);
            return result;
        }


        [HttpGet]
        public string GenerateTrackingNo([FromUri]  string[] deviceTokenEntry)
        {
            var result = DateTime.Now.ToString("MM") + DateTime.Now.ToString("dd") + DateTime.Now.ToString("yyyy") + (((DateTime.Now.Month - 1) / 3) + 1) + DateTime.Now.ToString("HH") + DateTime.Now.ToString("mm") + DateTime.Now.ToString("ss") + (Environment.TickCount.ToString().Substring(Environment.TickCount.ToString().Length - 4));
            //var result = DateTime.Now.ToString("MM") + DateTime.Now.ToString("dd") + DateTime.Now.ToString("yyyy") + (DateTime.Now.Month + 3) / 3 + DateTime.Now.ToString("HH") + DateTime.Now.ToString("mm") + DateTime.Now.ToString("ss") + Environment.TickCount+Environment.TickCount.ToString().Substring(Environment.TickCount.ToString().Length - 3);//s Strings.Mid(Environment.TickCount, Environment.TickCount.ToString().Length - 3);
            return result;
        }
        #endregion
    }
}

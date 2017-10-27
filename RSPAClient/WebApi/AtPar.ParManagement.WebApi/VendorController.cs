using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.ParManagement;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.ViewModel;

namespace AtPar.ParManagement.WebApi
{

    public class VendorController : ApiController
    {
        #region Private Variable

        private IVendorService _vendorService;
        private ILog _log;

        #endregion

        #region Constructor

        public VendorController(IVendorService vendorService, ILog log)
        {
            _vendorService = vendorService;
            _log = log;
            _log.SetLoggerType(typeof(VendorController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_VENDOR> GetVendorDetails(string orgGroupID, [FromUri] string[] deviceTokenEntry,string vendorID = "", string search = "")
        {
            var result = _vendorService.GetVendorDetails(vendorID, orgGroupID, search);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<PAR_MNGT_VENDOR> UpdateVendor(PAR_MNGT_VENDOR vendor, [FromUri] string[] deviceTokenEntry)
        {
            var result = _vendorService.UpdateVendor(vendor);
            return result;
        }


        [HttpPost]
        public AtParWebApiResponse<PAR_MNGT_VENDOR> CreateVendor(PAR_MNGT_VENDOR vendor, [FromUri] string[] deviceTokenEntry)
        {
            var result = _vendorService.CreateVendor(vendor);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<PAR_MNGT_VENDOR> UpdateVendorStatus(int status, string vendorID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _vendorService.UpdateVendorStatus(status, vendorID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<AtParKeyValuePair> GetVendorUsers(string vendorID, string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {

            if (string.IsNullOrEmpty(vendorID))
            {
                vendorID = string.Empty;
            }
            var result = _vendorService.GetVendorUsers(vendorID, orgGroupID);
            return result;

        }

        #endregion
    }
}

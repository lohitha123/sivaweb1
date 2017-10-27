using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.ParManagement;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.ParManagement.WebApi
{
    public class SetupParLocationsController : ApiController
    {
        #region Private Variables

        private ISetupParLocationsService _service;
        private ILog _log;

        #endregion

        #region Constructor
        public SetupParLocationsController(ISetupParLocationsService parLocService, ILog log)
        {
            _service = parLocService;
            _log = log;
            _log.SetLoggerType(typeof(SetupParLocationsController));

        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_PAR_LOC_HEADER> GetLocationHeader(string locID, string orgID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetLocationHeader(locID, orgID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateLoc(PAR_MNGT_PAR_LOC_HEADER objHeader, string mode, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateLoc(objHeader, mode);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS> GetLocations(string orgID, string locID,
                                                                             string locName, string appID,
                                                                             string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetLocations(orgID, locID, locName, appID, orgGroupID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<RM_SHIPTO_IDS> GetShipToIds(string orgID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetShipToIds(orgID);
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<string> GetOrgIdName(string orgID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetOrgIdName(orgID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> AddItems(string locID, string companyID, string comp, string itemID,
                                double optQty, string cntReq, int cntOrder, int replnshType,
                                string flag, string orderingType, string foqQty, string maxQty,
                                string lotCntrld, string srCntrld, string userID, string unitOfIssue,
                                string converstionRate, string costCentercode, string userField1, string status,
                                string invBusinessUnit, string requestionType, string UOMProc, string parUom,
                                string convRtParUom, string chargeCode, [FromUri] string[] deviceTokenEntry)
        {

            if (string.IsNullOrEmpty(flag))
            {
                flag = string.Empty;
            }
            if (string.IsNullOrEmpty(chargeCode))
            {
                chargeCode = string.Empty;
            }
            if (string.IsNullOrEmpty(userField1))
            {
                userField1 = string.Empty;
            }
            if (string.IsNullOrEmpty(status))
            {
                status = string.Empty;
            }
            if (string.IsNullOrEmpty(parUom))
            {
                parUom = string.Empty;
            }

            var result = _service.AddItems(locID, companyID, comp, itemID,
                            optQty, cntReq, cntOrder, replnshType,
                            flag, orderingType, foqQty, maxQty,
                            lotCntrld, srCntrld, userID, unitOfIssue,
                             converstionRate, costCentercode, userField1, status,
                             invBusinessUnit, requestionType, UOMProc, parUom, convRtParUom,
                             chargeCode, deviceTokenEntry);

            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateLocationItems(string locID, string companyID, string compartment, string oldcomprmnt,
                            string itemID, double optQty, string cntReq, int cntOrder, int replnshType, string flag,
                            string orderingType, string foqQty, string maxQty, string lotCntrld, string srCntrld,
                            string costCenterCode, string unitOfIssue, string converstionRate, string userField1,
                            string userID, string status, string invBusinessUnit, string requisitionType, string UOMProc,
                            string parUom, string convRtParUom,[FromBody] List<VM_SETUP_PAR_AUDIT> lstInsertParAudit,
                            string chargeCode, [FromUri] string[] deviceTokenEntry)
        {

            var result = _service.UpdateLocationItems(locID, companyID, compartment, oldcomprmnt,
                                             itemID, optQty, cntReq, cntOrder, replnshType, flag,
                                             orderingType, foqQty, maxQty, lotCntrld, srCntrld,
                                             costCenterCode, unitOfIssue, converstionRate, userField1,
                                             userID, status, invBusinessUnit, requisitionType, UOMProc,
                                             parUom, convRtParUom, lstInsertParAudit, chargeCode, deviceTokenEntry);
            return result;
        }

        public AtParWebApiResponse<VM_PAR_SETUP_PAR_LOCATIONS> GetLocDetails(string locID, string companyID, string itemID, string deptID, [FromUri] string[] deviceTokenEntry)
        {

            var result = _service.GetLocDetails(locID, companyID, itemID, deptID, deviceTokenEntry);
            return result;
        }
        #endregion
    }
}

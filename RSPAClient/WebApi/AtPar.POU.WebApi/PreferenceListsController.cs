using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class PreferenceListsController : ApiController
    {
        #region Private Variable

        private IPreferenceListService _preferenceListService;
        private ICommonPOUService _commonPOUService;
        private ILog _log;

        #endregion

        #region Constructor

        public PreferenceListsController(IPreferenceListService preferenceListService, ILog log, ICommonPOUService commonPOUService)
        {
            _preferenceListService = preferenceListService;
            _commonPOUService = commonPOUService;
            _log = log;
            _log.SetLoggerType(typeof(PreferenceListsController));
        }

        #endregion

        #region Public Methods

        [HttpPost]
        [ActionName("AddPreferenceListHeader")]
        public AtParWebApiResponse<long> AddPreferenceListHeader(string prefListID, string prefListDesc, string deptID, string userID, string procedureID, string physicianID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _preferenceListService.AddPreferenceListHeader(prefListID, prefListDesc, deptID, userID, procedureID, physicianID);
            return result;
        }

        [HttpDelete]
        [ActionName("DeletePreferenceList")]
        public AtParWebApiResponse<long> DeletePreferenceList(string prefListID, string procedureID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _preferenceListService.DeletePreferenceList(prefListID, procedureID);
            return result;
        }

        [HttpPut]
        [ActionName("DisablePrefList")]
        public AtParWebApiResponse<long> DisablePrefList(string prefListID, string procedureID, string status, [FromUri]string[] deviceTokenEntry)
        {
            var result = _preferenceListService.DisablePrefList(prefListID, procedureID, status, deviceTokenEntry);
            return result;
        }

        [HttpPut]
        [ActionName("UpdatePreferenceListItem")]
        public AtParWebApiResponse<long> UpdatePreferenceListItem(string prefListID, string procedureID, string itemID, string itemQty, string holdQty, [FromUri] string[] deviceTokenEntry)
        {
            var result = _preferenceListService.UpdatePreferenceListItem(prefListID, procedureID, itemID, itemQty, holdQty, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        [ActionName("AddPreferenceListItem")]
        public AtParWebApiResponse<long> AddPreferenceListItem(string prefListID, string procedureID, string itemID, string itemDesc, string itemQty, string holdQty, string userID, string custItemNo, [FromUri] string[] deviceTokenEntry)
        {
            var result = _preferenceListService.AddPreferenceListItem(prefListID, procedureID, itemID, itemDesc, itemQty, holdQty, userID, custItemNo);
            return result;
        }

        [HttpPost]
        [ActionName("DeletePreferenceListItem")]
        public AtParWebApiResponse<long> DeletePreferenceListItem(string prefListID, string procedureID, string itemID, [FromUri]string[] deviceTokenEntry)
        {
            var result = _preferenceListService.DeletePreferenceListItem(prefListID, procedureID, itemID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        [ActionName("GetPrefListDetails")]
        public AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefListID, [FromUri] string[] deviceTokenEntry, string procID = "")
        {
            var result = _commonPOUService.GetPrefListDetails(prefListID, procID);
            return result;
        }

        [HttpGet]
        [ActionName("GetDepartmentItems")]
        public AtParWebApiResponse<VM_DEPARTMENT_CART_ITEMS> GetDepartmentItems(string deptID, string orgGrpID, [FromUri]string[] deviceTokenEntry)
        {
            var result = _commonPOUService.GetDepartmentItems(deptID, orgGrpID, deviceTokenEntry);
            return result;
        }

        #endregion

    }
}

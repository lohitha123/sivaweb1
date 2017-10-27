using AtPar.Common;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class SetupItemAttributesController : ApiController
    {
        #region Private Variable

        private ISetupItemAttributesService _service;
        private ILog _log;

        #endregion

        #region Constructor
        public SetupItemAttributesController(ILog log, ISetupItemAttributesService service)
        {
            _log = log;
            _service = service;
            _log.SetLoggerType(typeof(SetupItemAttributesController));
        }

        #endregion

        #region Public Methods

        [HttpPost]
        public AtParWebApiResponse<string> SaveDeptItemAttributes([FromBody] List<VM_MT_POU_ITEM_ATTRIBUTES> lstItemAtributes, string deptID, string bUnit, string locationType, string itemID, [FromUri]string[] deviceTokenEntry)
        {
            var response = _service.SaveDeptItemAttributes(lstItemAtributes, deptID, bUnit, locationType, itemID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID], deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID]);
            return response;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT> GetItemAttributesDetails(string deptID, string bUnit, int display, string cartID,
            string locationType, string itemID, [FromUri] string[] deviceTokenEntry)
        {
            var response = _service.GetItemAttributesDetails(deptID, bUnit, display, cartID, locationType, itemID, deviceTokenEntry);
            return response;
        }

        #endregion
    }
}

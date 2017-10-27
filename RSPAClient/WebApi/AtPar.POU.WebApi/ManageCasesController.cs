using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
   public class ManageCasesController: ApiController
    {
        #region Private Variable

        private IManageCasesService _service;
        private ILog _log;

        #endregion

        #region Constructor
        public ManageCasesController(IManageCasesService manageCasesService, ILog log)
        {
            _service = manageCasesService;
            _log = log;
            _log.SetLoggerType(typeof(ManageCasesController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments()
        {
            var result = _service.GetDepartments();
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_COST_CENTER> GetDeptCostCenters()
        {
            var result = _service.GetDeptCostCenters();
            return result;
        }
        
        [HttpGet]
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetServiceCodes()
        {
            var result = _service.GetServiceCodes();
            return result;
        }
        
        [HttpGet]
        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> GetCases()
        {
            var result = _service.GetCases();
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> ProcessCases([FromBody]List<VM_MT_POU_CASE_CART_HEADER_TB> lstCaseInfo,
             [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.ProcessCases(lstCaseInfo, deviceTokenEntry);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> SaveReviewCaseItems([FromBody]List<MT_POU_CASE_CART_DETAILS> cartDetails,
             [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.SaveReviewCaseItems(cartDetails);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, object>> GetCaseItems(string caseID, int previewType,
            [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetCaseItems(caseID,previewType,deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> ReplacePrefCard([FromBody]List<VM_MT_POU_CASE_INFO> lstCaseInfo,
            [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.ReplacePrefCard(lstCaseInfo, deviceTokenEntry);
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, object>> SearchItem([FromUri] string[] deviceTokenEntry)
        {
            var result = _service.SearchItem(deviceTokenEntry);
            return result;
        }
        #endregion
    }
}

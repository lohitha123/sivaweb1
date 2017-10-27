using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class PostPickQAController : ApiController
    {
        #region Private Variables
        private IPostPickQAService _postPickQAService;
        ISetupItemAttributesService _setupItem;
        private ILog _log;
        #endregion

        #region Constructor
        public PostPickQAController(IPostPickQAService postPickQAService, ILog log, ISetupItemAttributesService setupItem)
        {
            _setupItem = setupItem;
            _postPickQAService = postPickQAService;
            _log = log;
            _log.SetLoggerType(typeof(PostPickQAController));
        }
        #endregion

        #region Public Methods
        [HttpGet]
        public AtParWebApiResponse<VM_MT_POU_CASE_CART_HEADER> GetCasesforQA(string startDate, string endDate, int reviewType, string deptID, string serviceCode, string CaseID, [FromUri]string[] deviceTokenEntry)
        {
            var result = _postPickQAService.GetCasesforQA(startDate, endDate, reviewType, deptID, serviceCode, CaseID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> BuildReportPrint(string appID, string objectID, string section, [FromBody]List<VM_MT_POU_CASE_CART_DETAILS> lstPrint, [FromUri]string[] deviceTokenEntry)
        {
            var result = _postPickQAService.BuildReportPrint(appID, objectID, section, lstPrint, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetPostPickQAItems(string caseID, int appID, [FromUri]string[] deviceTokenEntry)
        {
            var result = _postPickQAService.GetPostPickQAItems(caseID, appID, deviceTokenEntry);
            return result;
        }
        #endregion
    }
}

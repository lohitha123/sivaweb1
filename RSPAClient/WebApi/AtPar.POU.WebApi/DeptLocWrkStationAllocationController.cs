using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class DeptLocWrkStationAllocationController : ApiController
    {
        #region Private Variable

        private IDeptLocWrkStationAllocationService _service;
        private ILog _log;
        private ICommonPOUService _commonPouService;

        #endregion

        #region Constructor

        public DeptLocWrkStationAllocationController(ILog log, IDeptLocWrkStationAllocationService service, ICommonPOUService commonPouService)
        {
            _log = log;
            _service = service;
            _commonPouService = commonPouService;
            _log.SetLoggerType(typeof(DeptLocWrkStationAllocationController));
        }

        #endregion

        #region Public Methods

        [HttpPost]
        public AtParWebApiResponse<long> SaveDeptCartAllocations([FromBody] List<MT_POU_DEPT_WORKSTATIONS> lstWrkStationAllocDetails, string deptID, int appID, [FromUri]string[] deviceTokenEntry)
        {
            var response = _service.SaveDeptCartAllocations(lstWrkStationAllocDetails, deptID,appID,deviceTokenEntry);
            return response;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS> GetDeptAllocCarts(string businessUnit, string cartId, int display, string locationType, int appId, string deptID, string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var response = _service.GetDeptAllocCarts(businessUnit, cartId, display,  locationType, appId, deptID, orgGrpID,deviceTokenEntry);
            return response;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS> GetCartWorkstations(string departmentID, string cartId, string orgGrpID, int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _commonPouService.GetCartWorkstations(departmentID, cartId, orgGrpID, appID, deviceTokenEntry);
            return result;
        }

        #endregion
    }
}

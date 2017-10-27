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
    public class DepartmentLocationAllocationController : ApiController
    {
        #region Private Variable

        private ILog _log;
        private IDepartmentLocationAllocationService _deptAllocLocationService;
        private ICommonPOUService _commonPOUService;

        //List<MT_POU_DEPT_CART_ALLOCATIONS> lstCarts = new List<MT_POU_DEPT_CART_ALLOCATIONS>();
       
        #endregion

        #region Constructor

        public DepartmentLocationAllocationController(ILog log, IDepartmentLocationAllocationService deptwrkStationAllocationService, ICommonPOUService commonPOUService)
        {
            _log = log;
            _deptAllocLocationService = deptwrkStationAllocationService;
            _commonPOUService = commonPOUService;
            _log.SetLoggerType(typeof(DepartmentLocationAllocationController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _commonPOUService.GetUserDepartments(userID, orgGroupID);               
                return result;            
        }

        [HttpGet]
        public AtParWebApiResponse<object> GetDeptCartAllocationDetails(string businessUnit, string cartId, int display, string locationType,
                                                                        [FromUri] string[] deviceTokenEntry)
        {            
                var result = _deptAllocLocationService.GetDeptCartAllocationDetails(businessUnit, cartId, display, locationType, deviceTokenEntry);                
                return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> SaveDeptCartAlloc(List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartAllocations, string deptId, string orgGroupId, int appId)
        {
            var result = _deptAllocLocationService.SaveDeptCartAlloc(lstDeptCartAllocations, deptId, orgGroupId, appId);
            return result;
        }

        #endregion
    }
}

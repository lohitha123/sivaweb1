using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Web.Http;
using AtPar.ViewModel;

namespace AtPar.POU.WebApi
{

    public class DepartmentUserAllocationController : ApiController
    {
        #region Private Variable

        private IDepartmentUserAllocationService _deptUserAllocService;
        private ILog _log;

        #endregion

        #region Constructor

        public DepartmentUserAllocationController(IDepartmentUserAllocationService deptUserAllocService, ILog log)
        {
            _deptUserAllocService = deptUserAllocService;
            _log = log;
            _log.SetLoggerType(typeof(DepartmentUserAllocationController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments(string departmentID, string deptDescr, string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
                var result = _deptUserAllocService.GetDepartments(departmentID, deptDescr, orgGroupID);               
                return result;          
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments(string departmentIdOrDescr, string orgGroupId)
        {
            var result = _deptUserAllocService.GetDepartments(departmentIdOrDescr, orgGroupId);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_ATPAR_DEPT_USER> GetDepartmentUsers(string departmentID, string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _deptUserAllocService.GetDepartmentUsers(departmentID, orgGroupID);                
                return result;           
        }

        [HttpPost]
        public AtParWebApiResponse<long> AllocateUserToDepartment(string departmentId, string userId, string orgGroupID, bool isHomeDepartment, string mode, [FromUri] string[] deviceTokenEntry)
        {            
               var result = _deptUserAllocService.AllocateUserToDepartment(departmentId, userId, orgGroupID, isHomeDepartment, mode);            
               return result;           
        }

        [HttpPost]
        public AtParWebApiResponse<long> DeallocateUserToDepartment(string departmentId, string userId, [FromUri] string[] deviceTokenEntry)
        {
                var result = _deptUserAllocService.DeallocateUserToDepartment(departmentId, userId);                
                return result;         
        }

        #endregion
    }
}
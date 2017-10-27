using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class ProcessParameterController : ApiController
    {
        #region Private Variable

        private IProcessParameterService _processParameterService;
        private ILog _log;

        #endregion

        #region Constructor

        public ProcessParameterController(IProcessParameterService procedureService, ILog log)
        {
            _processParameterService = procedureService;
            _log = log;
            _log.SetLoggerType(typeof(ProcessParameterController));
        }

        #endregion

        #region Public Methods

        [HttpPost]
        public AtParWebApiResponse<long> AssignAlertSchedules([FromBody] List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> lstCartSchedules, int appID,
                                                              [FromUri] string[] deviceTokenEntry)
        {
            var result = _processParameterService.AssignAlertSchedules(lstCartSchedules, appID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> AssignScheduleToCarts([FromBody] Dictionary<string, dynamic> dsAssignSchedule, string strBunit,
                                                               string strUserId, int appID, [FromUri] string[] deviceTokenEntry)
        {
            if (string.IsNullOrEmpty(strBunit))
            {
                strBunit = string.Empty;
            }
            if (string.IsNullOrEmpty(strUserId))
            {
                strUserId = string.Empty;
            }
            var result = _processParameterService.AssignScheduleToCarts(dsAssignSchedule, strBunit, strUserId, appID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetAllocDepartment(string departmentID, string bUnit, int appID,
                                                                                                [FromUri] string[] deviceTokenEntry)
        {
            if (string.IsNullOrEmpty(departmentID))
            {
                departmentID = string.Empty;
            }
            if (string.IsNullOrEmpty(bUnit))
            {
                bUnit = string.Empty;
            }
            var result = _processParameterService.GetAllocDepartment(departmentID, bUnit, appID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetDeptAllocatedCarts(string departmentID, string strUserId, string strBunit,
                                                                             string strCartID, int appID, [FromUri] string[] deviceTokenEntry)
        {
            if (string.IsNullOrEmpty(departmentID))
            {
                departmentID = string.Empty;
            }
            if (string.IsNullOrEmpty(strUserId))
            {
                strUserId = string.Empty;
            }
            if (string.IsNullOrEmpty(strBunit))
            {
                strBunit = string.Empty;
            }
            if (string.IsNullOrEmpty(strCartID))
            {
                strCartID = string.Empty;
            }
            var result = _processParameterService.GetDeptAllocatedCarts(departmentID, strUserId, strBunit, strCartID, appID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_PAR_LOC_PROCESS_SCHEDULE> GetCartSchedules(string strBunit, string strCartID, string strUserId,
                                                                    string procType, int appID, [FromUri] string[] deviceTokenEntry)
        {
            if (string.IsNullOrEmpty(strBunit))
            {
                strBunit = "";
            }
            if (string.IsNullOrEmpty(strCartID))
            {
                strCartID = "";
            }
            if (string.IsNullOrEmpty(strUserId))
            {
                strUserId = "";
            }
            if (string.IsNullOrEmpty(procType))
            {
                procType = "";
            }
            var result = _processParameterService.GetCartSchedules(strBunit, strCartID, strUserId, procType, appID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string userId, string strOrgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            if (string.IsNullOrEmpty(userId))
            {
                userId = "";
            }
            if (string.IsNullOrEmpty(strOrgGroupID))
            {
                strOrgGroupID = "";
            }
            var result = _processParameterService.GetSheduleIDs(userId, strOrgGroupID, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_MT_POU_ASSIGN_LOCATIONS> GetAssignedLocationDetails(string bUnit, string locId, string locationOrgId,
                                                                                  string locGroupId, string orgGrpId, [FromUri] string[] deviceTokenEntry)
        {
            if (string.IsNullOrEmpty(locGroupId))
            {
                locGroupId = "";
            }
            if (string.IsNullOrEmpty(bUnit))
            {
                bUnit = "";
            }
            if (string.IsNullOrEmpty(orgGrpId))
            {
                orgGrpId = "";
            }
            if (string.IsNullOrEmpty(locationOrgId))
            {
                locationOrgId = "";
            }
            if (string.IsNullOrEmpty(locId))
            {
                locId = "";
            }

            var result = _processParameterService.GetAssignedLocationDetails(bUnit, locId, locationOrgId, locGroupId, orgGrpId, deviceTokenEntry);

            return result;

        }

        #endregion

    }
}

using AtPar.Common;
using AtPar.ParManagement.Service;
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
    public class CostCenterController : ApiController
    {
        #region Private Variable

        private ICostCenterService _costCenterService;
        private ILog _log;

        #endregion

        #region Constructor

        public CostCenterController(ICostCenterService costCenterService, ILog log)
        {
            _costCenterService = costCenterService;
            _log = log;
            _log.SetLoggerType(typeof(CostCenterController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<VM_COST_CENTER_CODES> GetCodes(string costCenterCode, string orgGroupID, string deptID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _costCenterService.GetCodes(costCenterCode, orgGroupID, deptID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_COST_CENTER_CODES> GetCostCenters(string orgGroupID, string search, [FromUri] string[] deviceTokenEntry)
        {
            var result = _costCenterService.GetCostCenters(orgGroupID, search);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_COST_CENTER_CODES> GetCostCenters(string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _costCenterService.GetCostCenters(orgGroupID, string.Empty);
            return result;

        }

        [HttpGet]
        public AtParWebApiResponse<string> GetCostCenterOrgIds(string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _costCenterService.GetCostCenterOrgIds(userID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments([FromUri] string[] deviceTokenEntry)
        {
            var result = _costCenterService.GetDepartments();
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<PAR_MNGT_COST_CENTER> UpdateCostCenter(PAR_MNGT_COST_CENTER costCenter, [FromUri] string[] deviceTokenEntry)
        {
            var result = _costCenterService.UpdateCostCenter(costCenter);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateCostCenterStatus(int status, string orgID, string costCenterCode, string deptID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _costCenterService.UpdateCostCenterStatus(status, orgID, costCenterCode, deptID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<PAR_MNGT_COST_CENTER> InsertCostCenter(PAR_MNGT_COST_CENTER costCenter, [FromUri] string[] deviceTokenEntry)
        {
            var result = _costCenterService.InsertCostCenter(costCenter);
            return result;
        }

        #endregion
    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    
    public class DepartmentController : ApiController
    {
        #region Private Variable

        private IDepartmentService _departmentService;
        private ILog _log;

        #endregion

        #region Constructor

        public DepartmentController(IDepartmentService departmentService, ILog log)
        {
            _departmentService = departmentService;
            _log = log;
            _log.SetLoggerType(typeof(DepartmentController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to et the department details
        /// </summary>
        /// <param name="strDeptId"></param>
        /// <param name="strOrgGroupID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT> GetDeptDetails(string strDeptId, string strOrgGroupID,string search,[FromUri] string[] deviceTokenEntry)
        {
            var result = _departmentService.GetDeptDetails(strDeptId, strOrgGroupID,search);
            return result;    
        }
        /// <summary>
        /// Used to get MyPreferences
        /// </summary>
        /// <param name="strPreference"></param>
        /// <param name="strUID"></param>
        /// <returns></returns>
        [HttpGet]
      
        /// <summary>
        /// Used to update the department status
        /// </summary>
        /// <param name="strDeptID"></param>
        /// <param name="intStatus"></param>
        /// <param name="strOrgGroupID"></param>
        /// <param name="appID"></param>
        /// <returns></returns>
        [HttpPut]
        public AtParWebApiResponse<MT_POU_DEPT> UpdateDeptStatus(string strDeptID, int intStatus, string strOrgGroupID, int appID, [FromUri] string[] deviceTokenEntry)
        {           
              var result = _departmentService.UpdateDeptStatus(strDeptID, intStatus, strOrgGroupID, appID);
              return result;           
        }

        #endregion

    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class AssignProfileController : ApiController
    {
        #region Private Variable

        private IAssignProfileService _assignProfileService;
        private ILog _log;

        #endregion

        #region Constructor

        public AssignProfileController(IAssignProfileService assignProfileService, ILog log)
        {
            _assignProfileService = assignProfileService;
            _log = log;
            _log.SetLoggerType(typeof(AssignProfileController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pUserID"></param>
        /// <param name="pdeviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS> GetSecurityParamVal(string userId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _assignProfileService.GetSecurityParamVal(userId, deviceTokenEntry);
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pUserID"></param>
        /// <param name="pUID"></param>
        /// <param name="pLdap"></param>
        /// <param name="pFName"></param>
        /// <param name="pLOrg"></param>
        /// <param name="pProfileID"></param>
        /// <param name="pOrgGrpId"></param>
        /// <param name="pdeviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_MT_ATPAR_PROF_USER> GetProfileUsersInfo(string userID, string uID, string lDap, string fName, string lOrg, string profileID, string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _assignProfileService.GetProfileUsersInfo(userID, uID, lDap, fName, lOrg, profileID, orgGrpID);
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pListProfUserInfo"></param>
        /// <param name="pProfile"></param>
        /// <param name="pOrgGrp"></param>
        /// <param name="pUID"></param>
        /// <param name="pdeviceTokenEntry"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_USER> SaveProfileUsersInfo([FromBody]List<VM_MT_ATPAR_USER> lstProfUserInfo, string profile, string orgGrp, string uId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _assignProfileService.SaveProfileUsersInfo(lstProfUserInfo, profile, orgGrp, uId);
            return result;
        }

        #endregion
    }
}

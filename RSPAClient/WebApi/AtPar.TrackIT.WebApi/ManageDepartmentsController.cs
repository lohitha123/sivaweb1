using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class ManageDepartmentsController : ApiController
    {
        #region Private Variable

        private IManageDepartmentsService _mngdptsService;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageDepartmentsController(IManageDepartmentsService mngdptsService, ILog log)
        {
            _mngdptsService = mngdptsService;
            _log = log;
            _log.SetLoggerType(typeof(ManageDepartmentsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string OrgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _mngdptsService.GetTKITAllDepts(deptID, status, OrgGrpID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<TKIT_DEPT> SaveDeptData(string deptID, string deptDescr, string status, string mode,
                                                                             string orgGrpID, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _mngdptsService.SaveDeptData(deptID, deptDescr, status, mode, orgGrpID, userID);
            return result;
        }

        #endregion
    }
}

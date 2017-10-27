using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class SetupCaseController : ApiController
    {
        #region Private Variable

        private ISetupCaseService _setupCaseService;
        private ILog _log;

        #endregion

        #region Constructor

        public SetupCaseController(ISetupCaseService setupCaseService, ILog log)
        {
            _setupCaseService = setupCaseService;
            _log = log;
            _log.SetLoggerType(typeof(SetupCaseController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get case info
        /// </summary>
        /// <param name="strPhysician"></param>
        /// <param name="strProcedureCode"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> GetCaseInfo(string strPhysician, string strProcedureCode, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupCaseService.GetCaseInfo(strPhysician, strProcedureCode);
            return result;
        }

        /// <summary>
        /// Used to get preference List IDs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_POU_PREF_LIST_HEADER> GetPreferenceListIDs([FromUri] string[] deviceTokenEntry)
        {
            var result = _setupCaseService.GetPreferenceListIDs();
            return result;
        }

        /// <summary>
        /// Usd o add case info
        /// </summary>
        /// <param name="caseID"></param>
        /// <param name="caseDesc"></param>
        /// <param name="physID"></param>
        /// <param name="patient"></param>
        /// <param name="prefID"></param>
        /// <param name="procID"></param>
        /// <param name="date"></param>
        /// <param name="userID"></param>
        /// <param name="roomNo"></param>
        /// <param name="status"></param>
        /// <param name="emergCase"></param>
        /// <param name="deptId"></param>
        /// <param name="serviceCode"></param>
        /// <param name="costCenter"></param>
        /// <returns></returns>
 
        //[HttpPost]
        //public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> AddCaseInfo(string caseID, string caseDesc, string physID, string patient, string prefID, string procID, string date, string userID, string roomNo, string status, [FromUri] string[] deviceTokenEntry,string emergCase = "N", string deptId = "", string serviceCode = "", string costCenter = "")
        //{
        //        var result = _setupCaseService.AddCaseInfo(caseID, caseDesc, physID, patient, prefID, procID, date, userID, roomNo, status, emergCase, deptId, serviceCode, costCenter);
        //        return result;           
        //}
 
        //[HttpPost]
        //public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> AddCaseInfo(string caseID, string caseDesc, string physID, string patient, string prefID, string procID, string date, string userID, string roomNo, string status, [FromUri] string[] deviceTokenEntry,string emergCase = "N", string deptId = "", string serviceCode = "", string costCenter = "")
        //{
        //        var result = _setupCaseService.AddCaseInfo(caseID, caseDesc, physID, patient, prefID, procID, date, userID, roomNo, status, emergCase, deptId, serviceCode, costCenter);
        //        return result;           
        //}
 
        [HttpPost]
        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> AddCaseInfo(string caseID, string caseDesc, string physID, string patient, string prefID, string procID, string date, string userID, string roomNo, string status, [FromUri] string[] deviceTokenEntry, string emergCase = "N", string deptId = "", string serviceCode = "", string costCenter = "")
        {
            var result = _setupCaseService.AddCaseInfo(caseID, caseDesc, physID, patient, prefID, procID, date, userID, roomNo, status, emergCase, deptId, serviceCode, costCenter);
            return result;
        }
 

        /// <summary>
        /// Used to add case info
        /// </summary>
        /// <param name="caseID"></param>
        /// <param name="caseDesc"></param>
        /// <param name="physID"></param>
        /// <param name="patient"></param>
        /// <param name="prefID"></param>
        /// <param name="procID"></param>
        /// <param name="date"></param>
        /// <param name="userID"></param>
        /// <param name="roomNo"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        //[HttpPost]
        //public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> AddCaseInfo(string caseID, string caseDesc, string physID, string patient, string prefID, string procID, string date, string userID, string roomNo, string status, [FromUri] string[] deviceTokenEntry)
        //{
        //    var result = _setupCaseService.AddCaseInfo(caseID, caseDesc, physID, patient, prefID, procID, date, userID, roomNo, status);
        //    return result;
        //}

        /// <summary>
        /// Used to delete the Case byID
        /// </summary>
        /// <param name="caseID"></param>
        /// <param name="prefID"></param>
        /// <param name="procID"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> DeleteCaseID(string caseID, string prefID, string procID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupCaseService.DeleteCaseID(caseID, prefID, procID);
            return result;
        }

        #endregion
    }
}

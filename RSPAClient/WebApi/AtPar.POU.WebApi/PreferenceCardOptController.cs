using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.Service.Interfaces.POU;
using log4net;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.POCOEntities;
using System.Data;
using System.Data.SqlClient;

namespace AtPar.POU.WebApi
{
    public class PreferenceCardOptController : ApiController
    {
        #region Private Variable

        private IPreferenceCardOptService _preferenceCardOptService;
        private ILog _log;

        #endregion

        #region Constructor

        public PreferenceCardOptController(IPreferenceCardOptService preferenceCardOptService, ILog log)
        {
            _preferenceCardOptService = preferenceCardOptService;
            _log = log;
            _log.SetLoggerType(typeof(PreferenceCardOptController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get Pref opt by speciality
        /// </summary>
        /// <param name="strYear"></param>
        /// <param name="strHalfYear"></param>
        /// <param name="strQuarter"></param>
        /// <param name="strMonth"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_PREF_OPT_BY_SPECIALTY> GetPrefOptBySpeciality(string strYear, string strHalfYear, string strQuarter, string strMonth, [FromUri] string[] deviceTokenEntry)
        //public AtParWebApiResponse<VM_POU_PREF_OPT_BY_SPECIALTY> GetPrefOptBySpeciality(string strYear, string strHalfYear, string strQuarter, string strMonth)
        {
            var result = _preferenceCardOptService.GetPrefOptBySpeciality(strYear, strHalfYear, strQuarter, strMonth);
            return result;
        }

        /// <summary>
        /// Used to get Pref opt by procedure
        /// </summary>
        /// <param name="pstrSpecialityCode"></param>
        /// <param name="strYear"></param>
        /// <param name="strHalfYear"></param>
        /// <param name="strQuarter"></param>
        /// <param name="strMonth"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_PREF_OPT_BY_PROCEDURE> GetPrefOptByProcedure(string pstrSpecialityCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth, [FromUri] string[] deviceTokenEntry)
        {
            var result = _preferenceCardOptService.GetPrefOptByProcedure(pstrSpecialityCode, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
            return result;
        }

        /// <summary>
        /// Used to get Pref opt by physician
        /// </summary>
        /// <param name="pstrSpecialityCode"></param>
        /// <param name="pstrProcedureCode"></param>
        /// <param name="strYear"></param>
        /// <param name="strHalfYear"></param>
        /// <param name="strQuarter"></param>
        /// <param name="strMonth"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_PREF_OPT_BY_PHYSICIAN> GetPrefOptByPhysician(string pstrSpecialityCode, string pstrProcedureCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth, [FromUri] string[] deviceTokenEntry)
        {
            var result = _preferenceCardOptService.GetPrefOptByPhysician(pstrSpecialityCode, pstrProcedureCode, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
            return result;
        }

        /// <summary>
        /// Used to get Pref opt by preference
        /// </summary>
        /// <param name="pstrSpecialityCode"></param>
        /// <param name="pstrProcedureCode"></param>
        /// <param name="pstrPhysicianId"></param>
        /// <param name="pstrPrefListId"></param>
        /// <param name="strYear"></param>
        /// <param name="strHalfYear"></param>
        /// <param name="strQuarter"></param>
        /// <param name="strMonth"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_PREF_OPT_BY_PREFERENCE> GetPrefOptByPreference(string pstrSpecialityCode, string pstrProcedureCode, string pstrPhysicianId, string pstrPrefListId, string pstrRemove,
            string pstrAddToHoldStart, string pstrAddToHoldEnd, string pstrAddToOpen, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth, [FromUri] string[] deviceTokenEntry)
        {
            var result = _preferenceCardOptService.GetPrefOptByPreference(pstrSpecialityCode, pstrProcedureCode, pstrPhysicianId, pstrPrefListId, pstrRemove, pstrAddToHoldStart, pstrAddToHoldEnd, pstrAddToOpen, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
            return result;
        }

        /// <summary>
        /// Used to get Pref opt header data
        /// </summary>
        /// <param name="pstrSpecialityCode"></param>
        /// <param name="pstrProcedureCode"></param>
        /// <param name="pstrPhysicianId"></param>
        /// <param name="pstrPrefListId"></param>
        /// <param name="strYear"></param>
        /// <param name="strHalfYear"></param>
        /// <param name="strQuarter"></param>
        /// <param name="strMonth"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_PREF_OPT_HEADER_DATA> GetPrefOptHeaderData(string pstrSpecialityCode, string pstrProcedureCode, string pstrPhysicianId, string pstrPrefListId, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth, [FromUri] string[] deviceTokenEntry)
        {
            var result = _preferenceCardOptService.GetPrefOptHeaderData(pstrSpecialityCode, pstrProcedureCode, pstrPhysicianId, pstrPrefListId, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
            return result;
        }

        /// <summary>
        /// Used to get Cost Variance Analysis Supply Details
        /// </summary>
        /// <param name="pstrItemGroup"></param>
        /// <param name="pstrPhysicianId"></param>
        /// <param name="pstrSpecialityCode"></param>
        /// <param name="pstrCodeText"></param>
        /// <param name="strYear"></param>
        /// <param name="strHalfYear"></param>
        /// <param name="strQuarter"></param>
        /// <param name="strMonth"></param>
        /// <returns></returns>
        [HttpGet]
        public int GetCostVarianceAnalysisSupplyDetails(ref System.Data.DataSet pdsResult, string pstrItemGroup, string pstrPhysicianId, string pstrSpecialityCode, string pstrCodeText, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth, [FromUri] string[] deviceTokenEntry)
        {
            int result = _preferenceCardOptService.GetCostVarianceAnalysisSupplyDetails(ref pdsResult, pstrItemGroup, pstrPhysicianId, pstrSpecialityCode, pstrCodeText, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
            return result;
        }

        #endregion
    }
}

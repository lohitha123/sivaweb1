using System.Web.Http;
using AtPar.Service.Interfaces.POU;
using log4net;
using AtPar.Common;
using AtPar.ViewModel;

namespace AtPar.POU.WebApi
{
    public class PhysicianBenchMarkController:ApiController
    {
        #region Private Variable

        private IPhysicianBenchMarkService _phyBenchMarkService;
        private ILog _log;

        #endregion

        #region Constructor

        public PhysicianBenchMarkController(IPhysicianBenchMarkService physicianBenchMarkService, ILog log)
        {
            _phyBenchMarkService = physicianBenchMarkService;
            _log = log;
            _log.SetLoggerType(typeof(PhysicianBenchMarkController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// To Get Physician Summary By Speciality
        /// </summary>
        /// <param name="pstrYear"></param>
        /// <param name="pstrHalfYear"></param>
        /// <param name="pstrQuarter"></param>
        /// <param name="pstrMonth"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_PHY_SUMMARY_BY_SPECIALTY> GetPhysicianSummaryBySpeciality(string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth, [FromUri] string[] deviceTokenEntry)        
        {
            var result = _phyBenchMarkService.GetPhysicianSummaryBySpeciality(pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
            return result;
        }

        /// <summary>
        /// To Get Physician Rank Data
        /// </summary>
        /// <param name="pstrSpecialityCode"></param>
        /// <param name="pstrYear"></param>
        /// <param name="pstrHalfYear"></param>
        /// <param name="pstrQuarter"></param>
        /// <param name="pstrMonth"></param>       
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_PHY_RANK_DATA> GetPhysicianRankData(string pstrSpecialityCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth, [FromUri] string[] deviceTokenEntry)
        {
            var result = _phyBenchMarkService.GetPhysicianRankData(pstrSpecialityCode,pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
            return result;
        }

        /// <summary>
        /// To Get Physician Score Card Data
        /// </summary>
        /// <param name="pstrSpecialityCode"></param>
        /// <param name="pstrPhysicianId"></param>
        /// <param name="pstrYear"></param>
        /// <param name="pstrHalfYear"></param>
        /// <param name="pstrQuarter"></param>
        /// <param name="pstrMonth"></param>       
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_PHY_SCORE_CARD_DATA> GetPhysicianScoreCardData(string pstrSpecialityCode, string pstrPhysicianId, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth, [FromUri] string[] deviceTokenEntry)
        {
            var result = _phyBenchMarkService.GetPhysicianScoreCardData(pstrSpecialityCode, pstrPhysicianId, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
            return result;
        }

        #endregion


    }
}

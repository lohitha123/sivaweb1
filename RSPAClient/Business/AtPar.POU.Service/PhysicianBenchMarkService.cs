using AtPar.Service.Interfaces.POU;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.Common.Service;
using System;

namespace AtPar.POU.Service
{
    public class PhysicianBenchMarkService: IPhysicianBenchMarkService
    {
        #region Private Variables

        IPhysicianBenchMarkRepository _phyBenchMarkRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public PhysicianBenchMarkService(IPhysicianBenchMarkRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _phyBenchMarkRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
        }

        #endregion

        #region GetPhysicianSummaryBySpeciality
        public AtParWebApiResponse<VM_POU_PHY_SUMMARY_BY_SPECIALTY> GetPhysicianSummaryBySpeciality(string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            pstrYear = pstrYear.ReplaceNullwithEmpty().ReplaceString();
            pstrHalfYear = pstrHalfYear.ReplaceNullwithEmpty().ReplaceString();
            pstrQuarter = pstrQuarter.ReplaceNullwithEmpty().ReplaceString();
            pstrMonth = pstrMonth.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<VM_POU_PHY_SUMMARY_BY_SPECIALTY>();

            try
            {
                response.DataList = _phyBenchMarkRepo.GetPhysicianSummaryBySpeciality(pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion

        #region GetPhysicianRankData

        public AtParWebApiResponse<VM_POU_PHY_RANK_DATA> GetPhysicianRankData(string pstrSpecialityCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            pstrYear = pstrYear.ReplaceNullwithEmpty().ReplaceString();
            pstrHalfYear = pstrHalfYear.ReplaceNullwithEmpty().ReplaceString();
            pstrQuarter = pstrQuarter.ReplaceNullwithEmpty().ReplaceString();
            pstrMonth = pstrMonth.ReplaceNullwithEmpty().ReplaceString();
            pstrSpecialityCode = pstrSpecialityCode.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<VM_POU_PHY_RANK_DATA>();

            try
            {
                response.DataList = _phyBenchMarkRepo.GetPhysicianRankData(pstrSpecialityCode,pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion

        #region GetPhysicianScoreCardData

        public AtParWebApiResponse<VM_POU_PHY_SCORE_CARD_DATA> GetPhysicianScoreCardData(string pstrSpecialityCode, string pstrPhysicianId, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            pstrYear = pstrYear.ReplaceNullwithEmpty().ReplaceString();
            pstrHalfYear = pstrHalfYear.ReplaceNullwithEmpty().ReplaceString();
            pstrQuarter = pstrQuarter.ReplaceNullwithEmpty().ReplaceString();
            pstrMonth = pstrMonth.ReplaceNullwithEmpty().ReplaceString();
            pstrSpecialityCode = pstrSpecialityCode.ReplaceNullwithEmpty().ReplaceString();
            pstrPhysicianId = pstrPhysicianId.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<VM_POU_PHY_SCORE_CARD_DATA>();

            try
            {
                response.DataList = _phyBenchMarkRepo.GetPhysicianScoreCardData(pstrSpecialityCode, pstrPhysicianId, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion
    }
}

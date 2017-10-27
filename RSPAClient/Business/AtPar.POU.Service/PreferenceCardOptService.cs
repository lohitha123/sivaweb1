using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Service.Interfaces.POU;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.Common.Service;
using AtPar.POCOEntities;

namespace AtPar.POU.Service
{
    public class PreferenceCardOptService : IPreferenceCardOptService
    {
        #region Private Variables

        IPreferenceCardOptRepository _prefCardOptRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public PreferenceCardOptService(IPreferenceCardOptRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _prefCardOptRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
        }

        #endregion

        #region GetPrefOptBySpeciality
        public AtParWebApiResponse<VM_POU_PREF_OPT_BY_SPECIALTY> GetPrefOptBySpeciality(string strYear, string strHalfYear, string strQuarter, string strMonth)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            strYear = strYear.ReplaceNullwithEmpty().ReplaceString();
            strHalfYear = strHalfYear.ReplaceNullwithEmpty().ReplaceString();
            strQuarter = strQuarter.ReplaceNullwithEmpty().ReplaceString();
            strMonth = strMonth.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<VM_POU_PREF_OPT_BY_SPECIALTY>();

            try
            {
                response.DataList = _prefCardOptRepo.GetPrefOptBySpeciality(strYear, strHalfYear, strQuarter, strMonth);

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

        #region GetPrefOptByProcedure

        public AtParWebApiResponse<VM_POU_PREF_OPT_BY_PROCEDURE> GetPrefOptByProcedure(string pstrSpecialityCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            pstrYear = pstrYear.ReplaceNullwithEmpty().ReplaceString();
            pstrHalfYear = pstrHalfYear.ReplaceNullwithEmpty().ReplaceString();
            pstrQuarter = pstrQuarter.ReplaceNullwithEmpty().ReplaceString();
            pstrMonth = pstrMonth.ReplaceNullwithEmpty().ReplaceString();
            pstrSpecialityCode = pstrSpecialityCode.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<VM_POU_PREF_OPT_BY_PROCEDURE>();

            try
            {
                response.DataList = _prefCardOptRepo.GetPrefOptByProcedure(pstrSpecialityCode, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
                
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

        #region GetPrefOptByPhysician

        public AtParWebApiResponse<VM_POU_PREF_OPT_BY_PHYSICIAN> GetPrefOptByPhysician(string pstrSpecialityCode, string pstrProcedureCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            pstrYear = pstrYear.ReplaceNullwithEmpty().ReplaceString();
            pstrHalfYear = pstrHalfYear.ReplaceNullwithEmpty().ReplaceString();
            pstrQuarter = pstrQuarter.ReplaceNullwithEmpty().ReplaceString();
            pstrMonth = pstrMonth.ReplaceNullwithEmpty().ReplaceString();
            pstrSpecialityCode = pstrSpecialityCode.ReplaceNullwithEmpty().ReplaceString();
            pstrProcedureCode = pstrProcedureCode.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<VM_POU_PREF_OPT_BY_PHYSICIAN>();

            try
            {
                response.DataList = _prefCardOptRepo.GetPrefOptByPhysician(pstrSpecialityCode, pstrProcedureCode, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);

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

        #region GetPrefOptByPreference

        public AtParWebApiResponse<VM_POU_PREF_OPT_BY_PREFERENCE> GetPrefOptByPreference(string pstrSpecialityCode, string pstrProcedureCode, string pstrPhysicianId, string pstrPrefListId, string pstrRemove,
            string pstrAddToHoldStart, string pstrAddToHoldEnd, string pstrAddToOpen, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            pstrYear = pstrYear.ReplaceNullwithEmpty().ReplaceString();
            pstrHalfYear = pstrHalfYear.ReplaceNullwithEmpty().ReplaceString();
            pstrQuarter = pstrQuarter.ReplaceNullwithEmpty().ReplaceString();
            pstrMonth = pstrMonth.ReplaceNullwithEmpty().ReplaceString();
            pstrSpecialityCode = pstrSpecialityCode.ReplaceNullwithEmpty().ReplaceString();
            pstrProcedureCode = pstrProcedureCode.ReplaceNullwithEmpty().ReplaceString();
            pstrPhysicianId = pstrPhysicianId.ReplaceNullwithEmpty().ReplaceString();
            pstrPrefListId = pstrPrefListId.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<VM_POU_PREF_OPT_BY_PREFERENCE>();

            try
            {
                response.DataList = _prefCardOptRepo.GetPrefOptByPreference(pstrSpecialityCode, pstrProcedureCode, pstrPhysicianId, pstrPrefListId, pstrRemove, pstrAddToHoldStart, pstrAddToHoldEnd, pstrAddToOpen, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);

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

        #region GetPrefOptHeaderData

        public AtParWebApiResponse<VM_POU_PREF_OPT_HEADER_DATA> GetPrefOptHeaderData(string pstrSpecialityCode, string pstrProcedureCode, string pstrPhysicianId, string pstrPrefListId, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            pstrYear = pstrYear.ReplaceNullwithEmpty().ReplaceString();
            pstrHalfYear = pstrHalfYear.ReplaceNullwithEmpty().ReplaceString();
            pstrQuarter = pstrQuarter.ReplaceNullwithEmpty().ReplaceString();
            pstrMonth = pstrMonth.ReplaceNullwithEmpty().ReplaceString();
            pstrSpecialityCode = pstrSpecialityCode.ReplaceNullwithEmpty().ReplaceString();
            pstrProcedureCode = pstrProcedureCode.ReplaceNullwithEmpty().ReplaceString();
            pstrPhysicianId = pstrPhysicianId.ReplaceNullwithEmpty().ReplaceString();
            pstrPrefListId = pstrPrefListId.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<VM_POU_PREF_OPT_HEADER_DATA>();

            try
            {
                response.DataList = _prefCardOptRepo.GetPrefOptHeaderData(pstrSpecialityCode, pstrProcedureCode, pstrPhysicianId, pstrPrefListId, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);

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

        #region GetCost

        public int GetCostVarianceAnalysisSupplyDetails(ref System.Data.DataSet pdsResult,string pstrItemGroup, string pstrPhysicianId, string pstrSpecialityCode, string pstrCodeText, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            pstrYear = pstrYear.ReplaceNullwithEmpty().ReplaceString();
            pstrHalfYear = pstrHalfYear.ReplaceNullwithEmpty().ReplaceString();
            pstrQuarter = pstrQuarter.ReplaceNullwithEmpty().ReplaceString();
            pstrMonth = pstrMonth.ReplaceNullwithEmpty().ReplaceString();
            pstrSpecialityCode = pstrSpecialityCode.ReplaceNullwithEmpty().ReplaceString();
            pstrCodeText = pstrCodeText.ReplaceNullwithEmpty().ReplaceString();
            pstrPhysicianId = pstrPhysicianId.ReplaceNullwithEmpty().ReplaceString();
            pstrItemGroup = pstrItemGroup.ReplaceNullwithEmpty().ReplaceString();

            //var response = new AtParWebApiResponse<string>();

            try
            {
                int result = _prefCardOptRepo.GetCostVarianceAnalysisSupplyDetails(ref pdsResult,pstrItemGroup, pstrPhysicianId, pstrSpecialityCode, pstrCodeText, pstrYear, pstrHalfYear, pstrQuarter, pstrMonth);
                return result;                
            }
            catch (Exception ex)
            {
                //response.AtParException(ex, _commonRepo, _log);
                return 0;
            }
        }

        #endregion
    }
}

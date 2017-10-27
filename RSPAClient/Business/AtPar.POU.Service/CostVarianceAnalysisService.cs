using AtPar.Common;
using AtPar.Common.Service;
using AtPar.ViewModel;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using System.Net;
using AtPar.Service.Interfaces.Common;

namespace AtPar.POU.Service
{
    [System.Runtime.InteropServices.Guid("76F1BD5F-1517-49CC-9FDA-75F43B08DB93")]
    public class CostVarianceAnalysisService : ICostVarianceAnalysisService
    {
        #region Private Variables

        ICostVarianceAnalysisRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;
        #endregion

        #region Constructor
        public CostVarianceAnalysisService(ICostVarianceAnalysisRepository CostVarianceAnalysisRepos, ILog log, ICommonRepository commonRepository, ICommonService commonService)
        {
            _Repo = CostVarianceAnalysisRepos;
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _log.SetLoggerType(typeof(CostVarianceAnalysisService));
        }

        #endregion

        #region Getcostvarianceanalysisspecialitydata
        /// <summary>
        /// Getcostvarianceanalysisspecialitydata
        /// </summary>
        /// <returns></returns>Getcostvarianceanalysisspecialitydata(selectedVarianceType
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SPECIALTY> Getcostvarianceanalysisspecialitydata(string pselectedVarianceType, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SPECIALTY>();

            try
            {
                response.DataList = _Repo.Getcostvarianceanalysisspecialitydata(pselectedVarianceType,pYear, pHalfYear , pQuater, pMonthly);

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

        #region GetCostVarianceByDiagnosiscode
        /// <summary>
        /// GetCostVarianceByDiagnosiscode
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE> GetCostVarianceByDiagnosiscode(string pSpecialityCode, string pCodetext, string pDescrtext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE>();

            try
            {
                response.DataList = _Repo.GetCostVarianceByDiagnosiscode( pSpecialityCode,  pCodetext,  pDescrtext,  pYear,  pHalfYear, pQuater, pMonthly);

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

        #region GetCostVarianceBySurgeon
        /// <summary>
        /// GetCostVarianceBySurgeon
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SURGEON> GetCostVarianceBySurgeon(string pselectedVarianceType, string pSpecialityCode, string pReimbursementCode, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SURGEON>();

            try
            {
                response.DataList = _Repo.GetCostVarianceBySurgeon(pselectedVarianceType, pSpecialityCode, pReimbursementCode, pYear, pHalfYear, pQuater, pMonthly);

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

        #region GetCostVarianceItemGroups
        /// <summary>
        /// GetCostVarianceItemGroups
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUPS> GetCostVarianceItemGroups(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUPS>();

            try
            {
                response.DataList = _Repo.GetCostVarianceItemGroups(pDiagnosisCode,pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);

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

        #region GetCostvarianceSurgeonItemgroupDetails
        /// <summary>
        /// GetCostvarianceSurgeonItemgroupDetails
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pPhysicianId"></param>
        /// <param name="pPhysicianName"></param>
        /// <param name="pItemGroup"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public AtParWebApiResponse<Dictionary<string, object>> GetCostvarianceSurgeonItemgroupDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<Dictionary<string, object>>();

            try
            {
                response.DataDictionary = _Repo.GetCostvarianceSurgeonItemgroupDetails(pDiagnosisCode,pSpecialityCode, pCodetext,pPhysicianId, pYear, pHalfYear, pQuater, pMonthly);

                if (response.DataDictionary.Count > 0)
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

        #region GetCostvarianceItemHdrDetails
        /// <summary>
        /// GetCostvarianceItemHdrDetails
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS> GetCostvarianceItemHdrDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS>();

            try
            {
                response.DataList = _Repo.GetCostvarianceItemHdrDetails(pDiagnosisCode,pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);

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

        #region GetCostvarianceSurgeonHdrData
        /// <summary>
        /// GetCostvarianceSurgeonHdrData
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_SURGEON_HDR_DATA> GetCostvarianceSurgeonHdrData(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_COSTVARIANCE_SURGEON_HDR_DATA>();

            try
            {
                response.DataList = _Repo.GetCostvarianceSurgeonHdrData(pDiagnosisCode,pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);

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

        #region GetCostvarianceSupplyItemDetails
        /// <summary>
        /// GetCostvarianceSupplyItemDetails
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUPS> GetCostvarianceSupplyItemDetails(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUPS>();

            try
            {
                response.DataList = _Repo.GetCostvarianceSupplyItemDetails(pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);

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

        #region GetCostvarianceSupplyHdrData
        /// <summary>
        /// GetCostvarianceSupplyHdrData
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_SUPPLY_HDR_DATA> GetCostvarianceSupplyHdrData(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_COSTVARIANCE_SUPPLY_HDR_DATA>();

            try
            {
                response.DataList = _Repo.GetCostvarianceSupplyHdrData(pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);

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

        #region GetCostvarianceSupplyItemData
        /// <summary>
        /// GetCostvarianceSupplyItemData
        /// </summary>
        /// <param name="pItemGroup"></param>
        /// <param name="pDiagnosisCode"></param>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pPhysicianId"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <returns></returns>
        public AtParWebApiResponse<Dictionary<string, object>> GetCostvarianceSupplyItemData(string pItemGroup,string pDiagnosisCode, string pSpecialityCode, string pCodetext, string pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<Dictionary<string, object>>();

            try
            {
                response.DataDictionary = _Repo.GetCostvarianceSupplyItemData(pItemGroup,pDiagnosisCode, pSpecialityCode, pCodetext, pPhysicianId, pYear, pHalfYear, pQuater, pMonthly);

                if (response.DataDictionary.Count > 0)
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

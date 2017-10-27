using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Web.Http;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.POU.WebApi
{
    public class CostVarianceAnalysisController : ApiController
    {
        #region Private Variable

        private ICostVarianceAnalysisService _CostVarianceAnalysisService;
        private ILog _log;

        #endregion

        #region Constructor

        public CostVarianceAnalysisController(ICostVarianceAnalysisService CostVarianceAnalysisService, ILog log)
        {
            _CostVarianceAnalysisService = CostVarianceAnalysisService;
            _log = log;
            _log.SetLoggerType(typeof(CostVarianceAnalysisController));
        }

        #endregion

        #region Public Methods
       
        # region Cost variance analysis report
        /// <summary>
        /// Getcostvarianceanalysisspecialitydata
        /// </summary>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SPECIALTY> Getcostvarianceanalysisspecialitydata(string pselectedVarianceType,string pYear, string pHalfYear, string pQuater, string pMonthly,[FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.Getcostvarianceanalysisspecialitydata(pselectedVarianceType,pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }

        /// <summary>
        /// GetCostVarianceByDiagnosiscode
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pDescrtext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE> GetCostVarianceByDiagnosiscode(string pSpecialityCode, string pCodetext, string pDescrtext, string pYear, string pHalfYear, string pQuater, string pMonthly, [FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.GetCostVarianceByDiagnosiscode(pSpecialityCode, pCodetext, pDescrtext,pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }

        /// <summary>
        /// GetCostVarianceBySurgeon
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pProcCode"></param>
        /// <param name="pReimbursementCode"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SURGEON> GetCostVarianceBySurgeon(string pselectedVarianceType,string pSpecialityCode, string pReimbursementCode, string pYear, string pHalfYear, string pQuater, string pMonthly, [FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.GetCostVarianceBySurgeon(pselectedVarianceType, pSpecialityCode, pReimbursementCode, pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }
       

        #region Spend by item tab
        /// <summary>
        /// GetCostVarianceItemGroups
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUPS> GetCostVarianceItemGroups(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly, [FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.GetCostVarianceItemGroups(pDiagnosisCode,pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }

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
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, object>> GetCostvarianceSurgeonItemgroupDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly, [FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.GetCostvarianceSurgeonItemgroupDetails(pDiagnosisCode,pSpecialityCode, pCodetext, pPhysicianId, pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }

        /// <summary>
        /// GetCostvarianceItemHdrDetails
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
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS> GetCostvarianceItemHdrDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly, [FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.GetCostvarianceItemHdrDetails(pDiagnosisCode,pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }

        /// <summary>
        /// GetCostvarianceSurgeonHdrData
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_SURGEON_HDR_DATA> GetCostvarianceSurgeonHdrData(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly, [FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.GetCostvarianceSurgeonHdrData(pDiagnosisCode,pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }

        #endregion

        #region Supply details tab
        /// <summary>
        /// GetCostvarianceSupplyItemDetails
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUPS> GetCostvarianceSupplyItemDetails(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly, [FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.GetCostvarianceSupplyItemDetails(pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }

        /// <summary>
        /// GetCostvarianceSupplyHdrData
        /// </summary>
        /// <param name="pSpecialityCode"></param>
        /// <param name="pCodetext"></param>
        /// <param name="pYear"></param>
        /// <param name="pHalfYear"></param>
        /// <param name="pQuater"></param>
        /// <param name="pMonthly"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_POU_COSTVARIANCE_SUPPLY_HDR_DATA> GetCostvarianceSupplyHdrData(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly, [FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.GetCostvarianceSupplyHdrData(pSpecialityCode, pCodetext, pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }

        #endregion


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
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<Dictionary<string, object>> GetCostvarianceSupplyItemData(string pItemGroup,string pDiagnosisCode, string pSpecialityCode, string pCodetext, string pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly, [FromUri] string[] deviceTokenEntry)
        {
            var result = _CostVarianceAnalysisService.GetCostvarianceSupplyItemData(pItemGroup,pDiagnosisCode, pSpecialityCode, pCodetext, pPhysicianId, pYear, pHalfYear, pQuater, pMonthly);
            return result;
        }


        #endregion

        #endregion

    }
}

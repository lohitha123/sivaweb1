using AtPar.Common;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.POU
{
    public interface ICostVarianceAnalysisService
    {
      AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SPECIALTY> Getcostvarianceanalysisspecialitydata(string pselectedVarianceType,string pYear, string pHalfYear, string pQuater, string pMonthly);
      AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE> GetCostVarianceByDiagnosiscode(string pSpecialityCode, string pCodetext, string pDescrtext, string pYear, string pHalfYear, string pQuater, string pMonthly);
      AtParWebApiResponse<VM_POU_COSTVARIANCE_BY_SURGEON> GetCostVarianceBySurgeon(string pselectedVarianceType, string pSpecialityCode, string pReimbursementCode, string pYear, string pHalfYear, string pQuater, string pMonthly);
      AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUPS > GetCostVarianceItemGroups(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
      AtParWebApiResponse<Dictionary<string, object>> GetCostvarianceSurgeonItemgroupDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly);
      AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS> GetCostvarianceItemHdrDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
      AtParWebApiResponse<VM_POU_COSTVARIANCE_SURGEON_HDR_DATA> GetCostvarianceSurgeonHdrData(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
      AtParWebApiResponse<VM_POU_COSTVARIANCE_ITEMGROUPS> GetCostvarianceSupplyItemDetails(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
      AtParWebApiResponse<VM_POU_COSTVARIANCE_SUPPLY_HDR_DATA> GetCostvarianceSupplyHdrData(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
      AtParWebApiResponse< Dictionary<string, object>> GetCostvarianceSupplyItemData(string pItemGroup, string pDiagnosisCode, string pSpecialityCode, string pCodetext, string pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly);
    }
}

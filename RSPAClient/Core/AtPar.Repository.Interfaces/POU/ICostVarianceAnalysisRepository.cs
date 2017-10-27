using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
   public interface ICostVarianceAnalysisRepository
    {
        List<VM_POU_COSTVARIANCE_BY_SPECIALTY> Getcostvarianceanalysisspecialitydata(string pselectedVarianceType,string pYear, string pHalfYear, string pQuater, string pMonthly);
        List<VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE> GetCostVarianceByDiagnosiscode(string pstrSpecialityCode, string pstrCodetext, string pstrDescrtext, string pstrYear, string pstrHalfYear, string pstrQuater, string pstrMonthly);
        List<VM_POU_COSTVARIANCE_BY_SURGEON> GetCostVarianceBySurgeon(string pselectedVarianceType, string pSpecialityCode, string pReimbursementCode, string pYear, string pHalfYear, string pQuater, string pMonthly);
        List<VM_POU_COSTVARIANCE_ITEMGROUPS> GetCostVarianceItemGroups(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
        Dictionary<string, object> GetCostvarianceSurgeonItemgroupDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext,string  pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly);
        List<VM_POU_COSTVARIANCE_ITEMGROUP_HDR_DETAILS> GetCostvarianceItemHdrDetails(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
        List<VM_POU_COSTVARIANCE_SURGEON_HDR_DATA > GetCostvarianceSurgeonHdrData(string pDiagnosisCode,string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
        List<VM_POU_COSTVARIANCE_ITEMGROUPS> GetCostvarianceSupplyItemDetails(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
        List<VM_POU_COSTVARIANCE_SUPPLY_HDR_DATA> GetCostvarianceSupplyHdrData(string pSpecialityCode, string pCodetext, string pYear, string pHalfYear, string pQuater, string pMonthly);
        Dictionary<string, object> GetCostvarianceSupplyItemData(string pItemGroup, string pDiagnosisCode, string pSpecialityCode, string pCodetext, string pPhysicianId, string pYear, string pHalfYear, string pQuater, string pMonthly);
    }
}

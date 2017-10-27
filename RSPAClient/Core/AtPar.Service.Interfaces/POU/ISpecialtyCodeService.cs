using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.POU
{
    public interface ISpecialtyCodeService
    {        
        AtParWebApiResponse<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string pCodeType, string pCode, string pDescr);        
        AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string pCodeType, string pCode, string pDescr);
        AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string specialityServiceCodeOrDesc);
        AtParWebApiResponse<MT_POU_SPECIALTY_CODE> DeleteCodes(string pCodeType, string pCode = "", string pDescr = "");
        AtParWebApiResponse<MT_POU_SPECIALTY_CODE> AddCodes(string pCodeType, string pUserId, string pCode = "", string pDescr = "", string pSpecCode = "");
        AtParWebApiResponse<MT_POU_SPECIALTY_CODE> UpdateCodes(string pCodeType, string pCode = "", string pDescr = "", string pSpecCode = "");
    }
}
using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.POU
{
    public interface IProcedureCodeService
    {
        AtParWebApiResponse<MT_POU_PROCEDURE_CODE> AddCodes(string pCodeType, string pUserId, string pCode = "", string pDescr = "", string pSpecCode = "");
        AtParWebApiResponse<MT_POU_PROCEDURE_CODE> DeleteCodes(string pCodeType, string pCode = "", string pDescr = "");
        AtParWebApiResponse<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string codeType, string code, string descr);
        AtParWebApiResponse<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string procedureCodeOrDescr);
        AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string codeType, string code, string descr);
        AtParWebApiResponse<MT_POU_PROCEDURE_CODE> UpdateCodes(string pCodeType, string pCode = "", string pDescr = "", string pSpecCode = "");
    }
}
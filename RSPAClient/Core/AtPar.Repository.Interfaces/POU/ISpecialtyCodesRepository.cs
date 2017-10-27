using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.POU
{
    public interface ISpecialtyCodesRepository
    {
        List<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string codeType, string code, string descr);
        List<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string specialityServiceCodeOrDesc);
        List<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string codeType, string code, string descr);
        long AddCodes(string codeType, string pUserId, string code = "", string descr = "", string specCode = "");
        long DeleteCodes(string codeType, string code = "", string descr = "");
        long UpdateCodes(string codeType, string code = "", string descr = "", string specCode = "");
    }
}   
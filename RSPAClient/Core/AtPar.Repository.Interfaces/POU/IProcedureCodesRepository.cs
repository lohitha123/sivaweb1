using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IProcedureCodesRepository
    {
        long AddCodes(string codeType, string userId, string code = "", string descr = "", string specCode = "");
        long DeleteCodes(string codeType, string code = "", string descr = "");
        List<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string codeType, string code, string descr);
        List<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string codeType, string code, string descr);
        List<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string procedureCodeOrDescr);
        long UpdateCodes(string codeType, string code = "", string descr = "", string specCode = "");
    }
}
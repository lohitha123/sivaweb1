using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IReasonCodesRepository
    {
        List<MT_POU_REASON_CODE> GetPOUCodes(string codeType, string code, string descr);
        List<MT_POU_REASON_CODE> GetPOUCodes(string reasonCodeOrDescription);
        long AddCodes(string codeType, string pUserId, string code = "", string descr = "", string specCode = "");
        long DeleteCodes(string codeType, string code = "", string descr = "");       
        long UpdateCodes(string codeType, string code = "", string descr = "", string specCode = "");
    }
}   
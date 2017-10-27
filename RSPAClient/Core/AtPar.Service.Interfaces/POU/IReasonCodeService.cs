using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.POU
{
    public interface IReasonCodeService
    {
        AtParWebApiResponse<MT_POU_REASON_CODE> AddCodes(string codeType, string userId,string code = "", string descr = "", string specCode = "");
        AtParWebApiResponse<MT_POU_REASON_CODE> DeleteCodes(string codeType, string code = "", string descr = "");
        AtParWebApiResponse<MT_POU_REASON_CODE> GetCodes(string codeType, string code, string descr);
        AtParWebApiResponse<MT_POU_REASON_CODE> GetCodes(string reasonCodeOrDescription);
        AtParWebApiResponse<MT_POU_REASON_CODE> UpdateCodes(string codeType, string code = "", string descr = "", string specCode = "");
    }
}
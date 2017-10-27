using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.POU
{
    public interface ISetupCaseService
    {
        AtParWebApiResponse<MT_POU_CASE_CART_HEADER> AddCaseInfo(string caseID, string caseDesc, string physID, string patient, string prefID, string procID, string date, string userID, string roomNo, string status, string emergCase = "N", string deptId = "", string serviceCode = "", string costCenter = "");
        AtParWebApiResponse<MT_POU_CASE_CART_HEADER> DeleteCaseID(string caseID, string prefID, string procID);
        AtParWebApiResponse<MT_POU_CASE_CART_HEADER> GetCaseInfo(string strPhysician, string strProcedureCode);
        AtParWebApiResponse<MT_POU_PREF_LIST_HEADER> GetPreferenceListIDs();
    }
}
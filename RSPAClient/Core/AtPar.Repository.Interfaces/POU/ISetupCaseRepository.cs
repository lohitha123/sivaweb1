using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.POU
{
    public interface ISetupCaseRepository
    {
        long AddCaseInfo(string caseID, string caseDesc, string physID, string patient, string prefID, string procID, string date, string userID, string roomNo, string status, string emergCase = "N", string deptId = "", string serviceCode = "", string costCenter = "");
        long DeleteCaseID(string caseID, string prefID, string procID);
        List<MT_POU_CASE_CART_HEADER> GetCaseInfo(string strPhysician, string strProcedureCode);
        List<MT_POU_PREF_LIST_HEADER> GetPreferenceListIDs();
    }
}
using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IReleaseCasesRepository
    {
        List<MT_POU_DEPT> GetDepartments();
        List<MT_POU_CASE_CART_HEADER> GetDownloadCases();
        List<MT_ATPAR_TRANSACTION> ProcessReleaseCases(bool pIsUpdate, int pTransID, string pDeptID, string pCaseID,int[] tranIDs);
    }
}
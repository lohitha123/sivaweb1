using AtPar.Common;
using AtPar.POCOEntities;
using System.Collections.Generic;
namespace AtPar.Service.Interfaces.POU
{
    public interface IReleaseCasesService
    {
        AtParWebApiResponse<MT_POU_DEPT> GetDepartments();
        AtParWebApiResponse<MT_POU_CASE_CART_HEADER> GetDownloadCases();
        AtParWebApiResponse<MT_ATPAR_TRANSACTION> ProcessReleaseCases(bool pIsUpdate, int pTransID, string pDeptID, string pCaseID,int[] tranIDs);
    }
}
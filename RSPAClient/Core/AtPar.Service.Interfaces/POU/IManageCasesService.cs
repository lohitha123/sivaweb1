#region Usings
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;

#endregion

namespace AtPar.Service.Interfaces.POU
{
    public interface IManageCasesService
    {
        AtParWebApiResponse<MT_POU_DEPT> GetDepartments();
        AtParWebApiResponse<PAR_MNGT_COST_CENTER> GetDeptCostCenters();
        AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetServiceCodes();
        AtParWebApiResponse<MT_POU_CASE_CART_HEADER> GetCases();
        AtParWebApiResponse<long> ProcessCases(List<VM_MT_POU_CASE_CART_HEADER_TB> lstCaseInfo,
                string[] deviceTokenEntry);
        AtParWebApiResponse<long> SaveReviewCaseItems(List<MT_POU_CASE_CART_DETAILS> cartDetails);
        AtParWebApiResponse<Dictionary<string, object>> GetCaseItems(string caseID, int previewType, string[] deviceTokenEntry);
        AtParWebApiResponse<long> ReplacePrefCard(List<VM_MT_POU_CASE_INFO> lstCaseInfo, string[] deviceTokenEntry);
        AtParWebApiResponse<Dictionary<string, object>> SearchItem(string[] deviceTokenEntry);
        Tuple<long, DataSet> GetUserDepartmentsItemsData(string userID, string[] deviceTokenEntry, int appID = 15);
    }
}

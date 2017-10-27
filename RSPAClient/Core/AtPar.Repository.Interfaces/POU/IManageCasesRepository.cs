using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IManageCasesRepository
    {
        List<MT_POU_DEPT> GetDepartments();
        List<PAR_MNGT_COST_CENTER> GetDeptCostCenters();
        List<MT_POU_SPECIALTY_CODE> GetServiceCodes();
        List<MT_POU_CASE_CART_HEADER> GetCases();
        long VerifyReviewerdata(List<VM_MT_POU_CASE_INFO> lstCaseInfo, bool replacePref = false);
        Tuple<long, List<VM_POU_CHECK_CART_ALLOCATION>, List<MT_POU_CHARGECAPTURE_DETAILS>> BuildCancelCases(string caseID, string procCode, string prefID, string orgGrpId);
        int GetCaseStatus(string caseID, string prefID, string procCode);
        List<VM_POU_CASE_CART_HEADER_AND_DEPT> GetCaseCartItemDetails(string caseID, string prefID, string procCode);
        Tuple<long, List<MT_POU_CART_INVENTORY>> GetItemQuantityOnHand(string businessUnit, string cartId);
        Tuple<long, List<MT_POU_NONCART_ITEMS>> GetNonCartItems(string pStrBUnit, string pStrCartId);
        Tuple<double, string> GetItemAttributesCnvFact(string cartID, string bUnit, string itemID, string parUOM);
        long UpdatecartInventory(int CaseStatus, string resvrQtyOption, DataRow drSearch, double DblConverFact, string lotCntrld,
            string srlCntrld);
        long SaveTransactionHistory(DataRow detailRow, DataTable dtLookup, string replacePrefCard = "");
        int ReplacePrefCardSP(string caseID, string procCode, string prefID, string newPrefListID,
            string newProcedureCode, string isUpdateAllDtls);
        int DoCancelCaseProcessSP(string caseID, string procCode, string prefID, string bUnit);
        string GetStorageArea(string deptID, string orgGrpID);
        int GetCaseIdCount(string caseId, string procCode, string prefList, int status);
        long UpdateTransaction(DataRow detailRow);
        long Do_ReplaceCaseSP(DataRow[] drTrans, string[] deviceTokenEntry);
        long UpdateCaseCartHeader(string caseID, string procCode, string prefID, string caseStatus);
        int GetCaseIssueStatus(string caseID, string prefID, string procCode);
        int IsNewCaseExistInCaseCardHeader(string replaceCaseID, string caseID);
        List<MT_POU_CASE_CART_HEADER> GetDataForSelectedCase(string replaceCase);
        long InsertCaseTrackHistory(string caseID, string prefID, string procID, string orgGroupID, string deptID,
               int caseStatus, string userID, bool isManageCase);
        List<MT_POU_DEPT_USER_ALLOCATIONS> GetDepartmentID(string userID);
        long SaveReviewCaseItems(List<MT_POU_CASE_CART_DETAILS> cartDetails);

        Dictionary<string, object> GetCaseItems(string caseID, int previewType);
        long ReplacePrefCard(List<VM_MT_POU_CASE_INFO> lstCaseInfo);
    }
}

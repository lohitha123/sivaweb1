
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
    public interface IPostPickQARepository
    {
        List<MT_ATPAR_PRINT_LABEL_DETAILS> BuildReportPrint(string appID, string objectID, string section, string[] deviceTokenEntry);
        VM_MT_POU_DEPT_CART_ALLOCATIONS GetPostPickQAItems(string caseID, int appID, string[] deviceTokenEntry);
        //List<VM_MT_POU_CHARGECAPTURE_DETAILS> GetPickedAndPartially(string caseID);
        //List<MT_POU_CASE_CART_DETAILS> GetNonPickedItems(string caseID);
        //List<VM_MT_POU_PHYSICIAN> GetPhysicians(string caseID);
        //List<VM_MT_ATPAR_SERIAL> GetLotSerials(string caseID);
        Tuple<long, List<MT_POU_NONCART_ITEMS>> GetNonCartItems(string pStrBUnit, string pStrCartId);
        Tuple<long, List<MT_POU_CART_INVENTORY>> GetItemQuantityOnHand(string businessUnit, string cartId);
        VM_MT_POU_CASE_CART_HEADER GetCasesforQA(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry);
        //List<MT_POU_CASE_CART_HEADER> GetCasesforQA1(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry);
        //List<MT_POU_CASE_CART_HEADER> GetEmgDistCasesCartHeader(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry);
        //List<MT_POU_CASE_CART_HEADER> GetDistCasesCartHeader(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry);
        //List<MT_POU_CASE_CART_HEADER> GetCasesCartHeader(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry);
       
    }
}

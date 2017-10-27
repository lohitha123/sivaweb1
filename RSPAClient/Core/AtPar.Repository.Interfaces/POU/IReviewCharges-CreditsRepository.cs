using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IReviewCharges_CreditsRepository
    {
        long SetReviewed(int reviewChecked, string transID);
        long InsertPouChargeCaptureDetails(string transactionID, string itemID, string itemDescription,
                                           string itemLotNumber, string itemSerialnumber, string itemChargeCode,
                                           string itemPrice, string lineNo, decimal pQty);
        long UpdateCreditHeader(long transID, VM_POU_CREDIT_HEADER objCreateHeader);
        long UpdateCreditDetails(long transID, List<VM_POU_CREDIT_DETAILS> lstCreateDeatils);
        long UpdateChargeCaptureDetails(string transType, List<VM_POU_CREDIT_DETAILS> lstCreateDeatils, bool isCreditsChanged);
        List<VM_POU_CREDIT_INFO> GetCreditsInfo(long transID, string transType, string chargecodeFilter);
        long InsertCreditValues(long transID, long newTransID);
        long DeletePatientInfo(long transID);
        long UpdateChargesHeader(List<VM_POU_CREDIT_HEADER> lstCreateHeaders);
        long UpdateChargesDetails(long transID, List<VM_POU_CREDIT_DETAILS> lstCreateDeatils);
        Dictionary<string, object> GetCredits(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments,
                               bool reviewed);
        Dictionary<string, object> GetCharges(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments, int status,
                               int appID);
    }
}

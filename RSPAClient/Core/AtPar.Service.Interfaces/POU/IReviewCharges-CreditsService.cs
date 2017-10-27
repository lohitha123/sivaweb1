using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IReviewCharges_CreditsService
    {
        AtParWebApiResponse<long> SetReviewed(List<MT_POU_CHARGECAPTURE_HEADER> lstReviewed);
        AtParWebApiResponse<long> InsertPouChargeCaptureDetails(string transactionID, string itemID, string itemDescription,
                                           string itemLotNumber, string itemSerialnumber, string itemChargeCode,
                                           string itemPrice, string lineNo, decimal pQty);
        AtParWebApiResponse<long> UpdateCharges(long transID, Dictionary<string, dynamic> dicDataItems);
        AtParWebApiResponse<object> GetCharges(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments, int status,
                               int appID);
        AtParWebApiResponse<object> GetCredits(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments,
                               bool reviewed);
        AtParWebApiResponse<long> UpdateCredits(Dictionary<string, dynamic> dicDataItems, string[] deviceTokenEntry);
    }
}

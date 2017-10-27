using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Receiving
{
  public interface IPOorNONPOReceiptsService
    {
        AtParWebApiResponse<long> PrintNiceLabel(string printerAddressOrName, string printerPort, 
            string printerTye, string niceLabelName, string noOfPrints, string errMsg, List<VM_PRINTLABEL_RECEIVE_HEADER> lstprintDetails, string[] deviceTokenEntry);
        AtParWebApiResponse<Object> GetReceivePrerequisites(string appID, string userID, string profileID, string[] deviceTokenEntry);
        AtParWebApiResponse<VM_PTWY_HEADER> GetIUTDetails(List<VM_IUT_HEADER> lstIUTHeader, string[] deviceTokenEntry);
        AtParWebApiResponse<Dictionary<string, object>> GetHeader(List<VM_RECV_POHEADER> lstPoHeader,  string[] deviceTokenEntry);
        AtParWebApiResponse<long> DeleteHeader(List<VM_RECV_POHEADER> lstDeleteHeader, string[] deviceTokenEntry);
        AtParWebApiResponse<long> SendDetails(Dictionary<string, dynamic> dicDataItems, string[] deviceTokenEntry);
        AtParWebApiResponse<long> SendIUTDetails(Dictionary<string, dynamic> dicDataItems, string[] deviceTokenEntry);
        AtParWebApiResponse<long> DeleteIUTHeader(Dictionary<string, dynamic> dicDataItems, string[] deviceTokenEntry);
        AtParWebApiResponse<long> PrintStaionaryReport(Dictionary<string,dynamic> dicDataItems, int noOfCopies, params string[] deviceTokenEntry);
        AtParWebApiResponse<VM_RECV_SEARCHHEADER> SearchHeader(List<VM_RECV_SEARCHPOHEADER> lstRecvPOHeader, string[] deviceTokenEntry);
        AtParWebApiResponse<VM_IUT_SEARCHHEADER> SearchIUTHeader(List<VM_IUT_SENDHEADER> lstIUTHeader, string[] deviceTokenEntry);
        AtParWebApiResponse<RM_USER_LOCATIONS> GetBadgeDetails(string recpName);
        AtParWebApiResponse<long> SendNonPos(List<VM_RECV_SENDNONPOHEADER> lstSendHeader, string[] deviceTokenEntry);




    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IMaintainPrintersService
    {
        AtParWebApiResponse<long> UpdatePrinterStatus(int appID, string friendlyName, int functionality, int status);
        AtParWebApiResponse<MT_ATPAR_LBL_PRINTERS> GetPrinterModels();
        AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES> GetPrinterData(int appID,
                                                                         string friendlyName,
                                                                         string functionality);
        AtParWebApiResponse<MT_ATPAR_APP_LABELS> GetFunctionalities(int appID);
        AtParWebApiResponse<string> GetModels(int appID, int functionality, string printerCode);
        AtParWebApiResponse<MT_ATPAR_LABELS_DATA> GetModelImage(int appID, string model, int functionality, string printerModelType);
        AtParWebApiResponse<MT_ATPAR_APP_LINKED_LABELS> GetLinkedFunctionalities(int appID, int labelType);
        AtParWebApiResponse<long> InsertModel(int appID, string fileName, byte[] PNLData,
                                                               string LVXData, byte[] image, string model,
                                                               double width, double height, string userID,
                                                               int functionality, int linkFunctionality,
                                                               string printerCode);
        AtParWebApiResponse<long> SavePrinterDetails(List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData);

        AtParWebApiResponse<long> UpdatePrinterDetails(string oldFriendlyName, bool blnPrinterExists, 
                                                       List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData);
    }
}

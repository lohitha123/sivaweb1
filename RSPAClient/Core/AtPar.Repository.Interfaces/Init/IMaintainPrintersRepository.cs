using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IMaintainPrintersRepository
    {
        long UpdatePrinterStatus(int appID, string friendlyName, int functionality, int status);
        List<MT_ATPAR_LBL_PRINTERS> GetPrinterModels();
        List<MT_ATPAR_SETUP_PRO_PRINTERES> GetPrinterData(int appID, string friendlyName,
                                                                 string functionality);
        List<MT_ATPAR_APP_LABELS> GetFunctionalities(int appID);
        List<string> GetModels(int appID, int functionality, string printerCode);
        List<MT_ATPAR_LABELS_DATA> GetModelImage(int appID, string model, int functionality, string printerModelType);
        List<MT_ATPAR_APP_LINKED_LABELS> GetLinkedFunctionalities(int appID, int labelType);
        long InsertModel(int appID, string fileName, byte[] PNLData, string LVXData, byte[] image, string model,
                          double width, double height, string userID, int functionality, int linkFunctionality,
                          string printerCode);
        long SavePrinterDetails(List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData);
        long UpdatePrinterDetails(string oldFriendlyName, bool blnPrinterExists, List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData);


    }
}

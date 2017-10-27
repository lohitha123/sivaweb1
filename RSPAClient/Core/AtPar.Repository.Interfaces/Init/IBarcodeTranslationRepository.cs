using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
namespace AtPar.Repository.Interfaces.Init
{
   public interface IBarcodeTranslationRepository
    {
        List<MT_ATPAR_BARCODE_SYMBOLOGY> GetBarcodeTranslationValues(string pUserID, string[] pDeviceTokenEntry);
     
        long AddBarcodeTranslation(string[] pDeviceTokenEntry,MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology);

        long UpdateBarcodeTranslation(string[] pDeviceTokenEntry,MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology);

        long DeleteBarcodeTranslation(string[] pDeviceTokenEntry,MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology);

        long CheckForExistingBarCodeTranslation(string[] pDeviceTokenEntry,MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology);

       

    }
}

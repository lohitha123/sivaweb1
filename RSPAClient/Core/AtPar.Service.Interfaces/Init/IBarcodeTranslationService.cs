using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using AtPar.Common;

namespace AtPar.Service.Interfaces.Init
{
    public interface IBarcodeTranslationService
    {
        AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> AddBarcodeTranslation(string[] pDeviceTokenEntry,MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology);

        AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> UpdateBarcodeTranslation(string[] pDeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology);

        AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> DeleteBarcodeTranslation(string[] pDeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology);

        AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> GetBarcodeTranslationValues(string pUserID, string[] pDeviceTokenEntry);
    }
}

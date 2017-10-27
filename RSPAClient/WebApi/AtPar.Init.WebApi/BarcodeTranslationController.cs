using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class BarcodeTranslationController : ApiController
    {
        #region Private Variable

        private IBarcodeTranslationService _barcodeTranslationService;
        private ILog _log;

        #endregion

        #region Constructor

        public BarcodeTranslationController(IBarcodeTranslationService barcodeTranslationService, ILog log)
        {
            _barcodeTranslationService = barcodeTranslationService;
            _log = log;
            _log.SetLoggerType(typeof(BarcodeTranslationController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> GetBarcode(string userId, string[] deviceTokenEntry)
        {
            var response = _barcodeTranslationService.GetBarcodeTranslationValues(userId, deviceTokenEntry);
            return response;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> AddBarcode([FromUri]string[] deviceTokenEntry, [FromBody] MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            var response = _barcodeTranslationService.AddBarcodeTranslation(deviceTokenEntry, barcodeSymbology);
            return response;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> UpdateBarcode([FromUri]string[] deviceTokenEntry, [FromBody] MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            var response = _barcodeTranslationService.UpdateBarcodeTranslation(deviceTokenEntry, barcodeSymbology);
            return response;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> DeleteBarcode([FromUri]string[] deviceTokenEntry, [FromBody] MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            var response = _barcodeTranslationService.DeleteBarcodeTranslation(deviceTokenEntry, barcodeSymbology);
            return response;
        }

        #endregion
    }
}

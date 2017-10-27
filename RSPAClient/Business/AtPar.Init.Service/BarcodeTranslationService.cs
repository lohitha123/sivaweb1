#region Imports
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using AtPar.Repository.Interfaces.Init;
using AtPar.Repository.Interfaces.Common;
using log4net;
using AtPar.Common.Service;
#endregion
namespace AtPar.Init.Service
{
    class BarcodeTranslationService : IBarcodeTranslationService
    {
        #region Private Variable

        private IBarcodeTranslationRepository _barcodeTranslation;
        private ILog _log;
        private ICommonRepository _commonRepo;
        #endregion

        #region Constructor
        public BarcodeTranslationService(IBarcodeTranslationRepository barcodeTranslation, ILog log, ICommonRepository commonRepo)
        {
            _barcodeTranslation = barcodeTranslation;
            _commonRepo = commonRepo;
            _log = log;
            _log.SetLoggerType(typeof(BarcodeTranslationService));

        }
        #endregion

        #region Methods

        public AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> AddBarcodeTranslation(string[] DeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY>();
            try
            {
                var isBarcodeExistsOrNot = _barcodeTranslation.CheckForExistingBarCodeTranslation(DeviceTokenEntry, barcodeSymbology);

                if (isBarcodeExistsOrNot != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(isBarcodeExistsOrNot, _commonRepo, _log);
                    return response;
                }

                long StatusCode = _barcodeTranslation.AddBarcodeTranslation(DeviceTokenEntry, barcodeSymbology);
                if (StatusCode!=AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;

            }
            catch (Exception exception)
            {
                response.AtParException(exception, _commonRepo, _log);
                return response;
            }
        }

        //public AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> CheckForExistingBarCodeTranslation(string[] DeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

        //    var response = new AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY>();
        //    try
        //    {
        //        var isintSymbologyExists = _barcodeTranslation.CheckForExistingBarCodeTranslation(DeviceTokenEntry, barcodeSymbology);
        //        if (isintSymbologyExists > 0)
        //        {
        //            response.StatusCode = AtparStatusCodes.S_ITEMEXISTS;
        //            response.StatusMessage = "Symbology Type Already Exists";
        //            return response;
        //        }
        //        response.StatusCode = AtparStatusCodes.ATPAR_OK;
        //        return response;
        //    }
        //    catch (Exception exception)
        //    {

        //        response.StatType = AtParWebEnums.StatusType.Error;
        //        response.ExceptionMessage = exception.ToString();
        //        return response;
        //    }
        //}

        public AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> DeleteBarcodeTranslation(string[] DeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY>();
            try
            {
                var deleteStatus = _barcodeTranslation.DeleteBarcodeTranslation(DeviceTokenEntry, barcodeSymbology);
                if (deleteStatus != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(deleteStatus, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;

            }
            catch (Exception exception)
            {
                response.AtParException(exception, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> GetBarcodeTranslationValues(string pUserID, string[] DeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            var response = new AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY>();

            try
            {
                //var getAudit = _commonRepo.GetAuditAllowed(DeviceTokenEntry[0], 0, "mt_atpar_barcode_translation.aspx", DeviceTokenEntry[0]);
                var result = _barcodeTranslation.GetBarcodeTranslationValues(pUserID, DeviceTokenEntry);
                if (result.Count > 0)
                {
                    response.DataList = result;
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY> UpdateBarcodeTranslation(string[] DeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_BARCODE_SYMBOLOGY>();
            try
            {
                var updateStatus = _barcodeTranslation.UpdateBarcodeTranslation(DeviceTokenEntry, barcodeSymbology);

                if (updateStatus != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(updateStatus, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception exception)
            {
                response.AtParException(exception, _commonRepo, _log);
                return response;
            }

        }

        #endregion
    }
}

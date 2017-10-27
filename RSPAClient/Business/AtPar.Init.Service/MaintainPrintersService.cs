using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Service
{
    public class MaintainPrintersService : IMaintainPrintersService
    {
        #region Private Variables

        IMaintainPrintersRepository _maintainPrintersRepos;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor
        public MaintainPrintersService(IMaintainPrintersRepository maintainPrintersRepos, ILog log, ICommonRepository commonRepository)
        {
            _maintainPrintersRepos = maintainPrintersRepos;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(MaintainPrintersService));
        }

        #endregion

        #region UpdatePrinterStatus
        /// <summary>
        /// To update printer status
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="friendlyName"></param>
        /// <param name="functionality"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdatePrinterStatus(int appID, string friendlyName, int functionality, int status)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long statusCode = -1;
            try
            {
                statusCode = _maintainPrintersRepos.UpdatePrinterStatus(appID, friendlyName.ReplaceString(), functionality, status);

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDUPDATED, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL);
                return response;
            }
        }
        #endregion

        #region GetPrinterModels
        /// <summary>
        /// To get Printer Models
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_LBL_PRINTERS> GetPrinterModels()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_LBL_PRINTERS>();

            try
            {
                response.DataList = _maintainPrintersRepos.GetPrinterModels();

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion

        #region GetPrinterData
        /// <summary>
        /// To get Printer Data
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="friendlyName"></param>
        /// <param name="functionality"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES> GetPrinterData(int appID, 
                                                                                string friendlyName,
                                                                                string functionality)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES>();

            try
            {
                response.DataList = _maintainPrintersRepos.GetPrinterData(appID,friendlyName,functionality);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion

        #region GetFunctionalities
       /// <summary>
       /// To get functionalities
       /// </summary>
       /// <param name="appID"></param>
       /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_APP_LABELS> GetFunctionalities(int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_APP_LABELS>();

            try
            {
                response.DataList = _maintainPrintersRepos.GetFunctionalities(appID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion

        #region GetModels
        /// <summary>
        /// To get Printer Models
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="functionality"></param>
        /// <param name="printerCode"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> GetModels(int appID, int functionality, string printerCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataList = _maintainPrintersRepos.GetModels(appID, functionality, printerCode);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion

        #region GetModelImage
        /// <summary>
        /// To get model image
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="model"></param>
        /// <param name="functionality"></param>
        /// <param name="printerModelType"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_LABELS_DATA> GetModelImage(int appID, string model, int functionality, string printerModelType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_LABELS_DATA>();

            try
            {
                response.DataList = _maintainPrintersRepos.GetModelImage(appID,model,functionality,printerModelType);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion

        #region GetLinkedFunctionalities
        /// <summary>
        /// To get linked functionalities
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="labelType"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_APP_LINKED_LABELS> GetLinkedFunctionalities(int appID, int labelType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_APP_LINKED_LABELS>();

            try
            {
                response.DataList = _maintainPrintersRepos.GetLinkedFunctionalities(appID, labelType);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion

        #region InsertModel
        /// <summary>
        /// Used to insert model
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="fileName"></param>
        /// <param name="PNLData"></param>
        /// <param name="LVXData"></param>
        /// <param name="image"></param>
        /// <param name="model"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="userID"></param>
        /// <param name="functionality"></param>
        /// <param name="linkFunctionality"></param>
        /// <param name="printerCode"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> InsertModel(int appID, string fileName, byte[] PNLData, 
                                                                      string LVXData, byte[] image, string model,
                                                                      double width, double height, string userID, 
                                                                      int functionality, int linkFunctionality,
                                                                      string printerCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _maintainPrintersRepos.InsertModel(appID,fileName,PNLData, LVXData,
                                                        image,model,width, height,userID,functionality,     
                                                        linkFunctionality, printerCode);


                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        #endregion

        #region SavePrinterDetails
        /// <summary>
        /// To save printer details
        /// </summary>
        /// <param name="lstPrintData"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> SavePrinterDetails(List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _maintainPrintersRepos.SavePrinterDetails(lstPrintData);

                

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    string friendlyName = lstPrintData[0].FRIENDLY_NAME.ToString();
                    response.AtParNotOK(StatusCode, _commonRepo, _log, friendlyName);
                    return response;
                }

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }
        #endregion

        #region UpdatePrinterDetails
        /// <summary>
        /// To update printer details
        /// </summary>
        /// <param name="oldFriendlyName"></param>
        /// <param name="blnPrinterExists"></param>
        /// <param name="lstPrintData"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdatePrinterDetails(string oldFriendlyName, bool blnPrinterExists,
                                                       List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _maintainPrintersRepos.UpdatePrinterDetails(oldFriendlyName, blnPrinterExists,lstPrintData);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }
        #endregion
    }
}

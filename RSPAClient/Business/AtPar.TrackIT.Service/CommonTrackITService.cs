using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace AtPar.TrackIT.Service
{
    public class CommonTrackITService : ICommonTrackITService
    {
        #region Private Variable

        ILog _log;
        ICommonRepository _commonRepo;
        ICommonTrackITRepository _commonTrackITRepo;

        #endregion

        #region Constructor
        public CommonTrackITService(ILog log, ICommonRepository commonRepository, ICommonTrackITRepository commonTrackITRepo)

        {
            _log = log;
            _commonRepo = commonRepository;
            _commonTrackITRepo = commonTrackITRepo;
            _log.SetLoggerType(typeof(CommonTrackITService));
        }

        #endregion

        #region Public Methods


        public AtParWebApiResponse<PAR_MNGT_VENDOR> GetVendorDetails(string vendorID, string orgGroupID, string search)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_VENDOR>();

            try
            {
                response.DataList = _commonTrackITRepo.GetVendorDetails(vendorID, orgGroupID, search);

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

        public AtParWebApiResponse<string> GetRequestorDefLoc(string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataVariable = _commonTrackITRepo.GetRequestorDefLoc(deviceTokenEntry);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<TKIT_EQ_INDICATOR> GetEqIndicators()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_EQ_INDICATOR>();

            try
            {
                response.DataList = _commonTrackITRepo.GetEqIndicators();

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

        public AtParWebApiResponse<RM_SHIP_TO_LOCACTION> GetLocations(string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<RM_SHIP_TO_LOCACTION>();

            try
            {
                response.DataList = _commonTrackITRepo.GetLocations(deviceTokenEntry);

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

        public AtParWebApiResponse<long> AddToCart(string eqIndicator, TKIT_CART_MANAGER cartManager, List<TKIT_CART_MANAGER> lstDelItems,
                                                                                                     string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.StatusCode = _commonTrackITRepo.AddToCart(eqIndicator, cartManager, lstDelItems, deviceTokenEntry);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
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

        /// <summary>
        /// Gets the ATPAR Latest Values for the specified Field Name
        /// </summary>
        /// <param name="appId"></param>
        /// <param name="fieldName"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetLatestValue(int appId, string fieldName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.DataVariable = _commonTrackITRepo.GetAtparLatestValues(appId, fieldName);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        /// <summary>
        /// Gets the Equipment Types
        /// </summary>
        /// <param name="itemIndicator"></param>
        /// <param name="orgGrpId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId, string searchEqTypeOrDesc)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ITEM_TYPE>();

            try
            {
                response.DataList = _commonTrackITRepo.GetEquipmentTypes(itemIndicator, orgGrpId, searchEqTypeOrDesc);

                if (response.DataList.Count > 0)
                {
                    List<TKIT_EQ_INDICATOR> lstIndicators = _commonTrackITRepo.GetEqIndicators();

                    if (response.DataList.Count.Equals(0))
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }

                    foreach (var item in response.DataList)
                    {
                        var indicatorDesc = lstIndicators.Where(c => c.EQ_INDICATOR == item.ITEM_TYPE_INDICATOR).FirstOrDefault().EQ_DESC;
                        item.ITEM_TYPE_INDICATOR_DESC = item.ITEM_TYPE_INDICATOR + " (" + indicatorDesc + ")";
                    }
                }
                else
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

        public AtParWebApiResponse<TKIT_REQUESTOR> GetUserDetails(string requestorID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            AtParEncryptionServices.AtParEncryptionServices encServices = new AtParEncryptionServices.AtParEncryptionServices();
            var response = new AtParWebApiResponse<TKIT_REQUESTOR>();

            try
            {
                response.Data = _commonTrackITRepo.GetUserDetails(requestorID);

                if (response.Data.Equals(null))
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



        public AtParWebApiResponse<long> UpdateUserDetails(TKIT_REQUESTOR requestor, string password, string newPassword)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                AtParEncryptionServices.AtParEncryptionServices encServices = new AtParEncryptionServices.AtParEncryptionServices();

                string decryptedPassword = string.Empty;
                string decryptedNewPassword = string.Empty;

                if (!string.IsNullOrEmpty(password))
                {
                    password = password.Replace(" ", "+");
                    decryptedPassword = AESEncryptDecryptService.DecryptStringAES(password);
                }
                if (!string.IsNullOrEmpty(newPassword))
                {
                    newPassword = newPassword.Replace(" ", "+");
                    decryptedNewPassword = AESEncryptDecryptService.DecryptStringAES(newPassword);
                }

                string decryptedPassHash = encServices.EncryptString(decryptedPassword, Convert.ToInt16(AtParEncryptionServices.AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase));

                string decryptedNewPassHash = encServices.EncryptString(decryptedNewPassword, Convert.ToInt16(AtParEncryptionServices.AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase));

                if (!string.IsNullOrEmpty(requestor.PASSWORD))
                {
                    requestor.PASSWORD = decryptedPassHash;
                }
                if (!string.IsNullOrEmpty(requestor.NEWPASSWORD))
                {
                    requestor.NEWPASSWORD = decryptedNewPassHash;
                }
                response.StatusCode = _commonTrackITRepo.UpdateUserDetails(requestor);

                if (response.Data.Equals(null))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                if (response.StatusCode == AtparStatusCodes.ATPAR_E_OLDPASSWORDNOTMATCHED)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_OLDPASSWORDNOTMATCHED, _commonRepo, _log);
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

        public AtParWebApiResponse<TKIT_ITEM_MASTER> GetMasterItemsForTheSelectedEqType(string eqType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ITEM_MASTER>();

            try
            {
                response.DataList = _commonTrackITRepo.GetMasterItemsForTheSelectedEqType(eqType);

                if (response.DataList.Equals(null))
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

        public AtParWebApiResponse<string> GetTKITMyPreferences(string preference, string requestorID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataVariable = _commonTrackITRepo.GetTKITMyPreferences(preference, requestorID);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<VM_VIEW_CART> GetCartItems(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_VIEW_CART>();

            try
            {
                response.DataList = _commonTrackITRepo.GetCartItems(deviceTokenEntry);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
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

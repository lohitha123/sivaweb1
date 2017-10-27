using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AtPar.TrackIT.Service
{
    public class ManageRequestorService : IManageRequestorService
    {
        #region Private Variable

        IManageRequestorRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;
        AtParEncryptionServices.AtParEncryptionServices encServices = new AtParEncryptionServices.AtParEncryptionServices();
        string decryptedPassword = string.Empty;
        string passHash = string.Empty;

        #endregion

        #region Constructor

        public ManageRequestorService(IManageRequestorRepository repo, ILog log, ICommonRepository commonRepository)
        {
            _Repo = repo;
            _log = log;
            _commonRepo = commonRepository;
        }

        #endregion

        #region Public Methods

        public AtParWebApiResponse<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_DEPT>();

            try
            {
                response.DataList = _Repo.GetTKITAllDepts(deptID, status, deviceTokenEntry);

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

        public AtParWebApiResponse<TKIT_REQUESTOR> GetAllRequestors(string search, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_REQUESTOR>();

            try
            {
                response.DataList = _Repo.GetAllRequestors(search, deviceTokenEntry);

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

        public AtParWebApiResponse<long> GetRequestorDetails(string requestorID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            

            List<TKIT_REQUESTOR> lstRequestorsData12 = null;
            

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.DataDictionary = _Repo.GetRequestorDetails(requestorID);


                if (response.DataDictionary != null)
                {
                    if (response.DataDictionary.Count.Equals(0))
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }
                    else {
                        if (response.DataDictionary!=null) {
                            lstRequestorsData12 = response.DataDictionary["Requestors"] as List<TKIT_REQUESTOR>;


                            foreach (var item in lstRequestorsData12)
                            {
                                if (!string.IsNullOrEmpty(item.PASSWORD)) {
                                    item.PASSWORD = encServices.DecryptString(item.PASSWORD, (short)AtParEncryptionServices.AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase);
                                }
                            }
                        }
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

        public AtParWebApiResponse<long> SaveRequestorDetails(Dictionary<string, dynamic> requestorDetails, string Password)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            var response = new AtParWebApiResponse<long>();
           
            TKIT_REQUESTOR requestor = null;

            List<TKIT_REQUESTOR_DEPT> lstRequestorDepts = new List<TKIT_REQUESTOR_DEPT>();
            if (requestorDetails!=null ) {
               
            }

            try
            {
                foreach (var keyValuePair in requestorDetails)
                {
                    switch (keyValuePair.Key)
                    {
                        case "lstRequestorDepts":
                            foreach (var item in keyValuePair.Value)
                            {
                                var dept = new TKIT_REQUESTOR_DEPT
                                {
                                    
                                    DEPT_ID = item.Value
                                };
                                lstRequestorDepts.Add(dept);
                            }
                            break;
                        case "requestor":

                            requestor = new TKIT_REQUESTOR
                            {
                                ORG_GROUP_ID = keyValuePair.Value["ORG_GROUP_ID"],
                                REQUESTOR_ID = keyValuePair.Value["REQUESTOR_ID"],
                                PASSWORD = keyValuePair.Value["PASSWORD"],
                                NEWPASSWORD = keyValuePair.Value["NEWPASSWORD"],
                                FIRST_NAME = keyValuePair.Value["FIRST_NAME"],
                                MIDDLE_INIT = keyValuePair.Value["MIDDLE_INIT"],
                                LAST_NAME = keyValuePair.Value["LAST_NAME"],
                                PHONE = keyValuePair.Value["PHONE"],
                                EMAIL = keyValuePair.Value["EMAIL"],
                                FAX = keyValuePair.Value["FAX"],
                                PAGER = keyValuePair.Value["PAGER"],
                                LOCATION_ID = keyValuePair.Value["LOCATION_ID"],
                                STATUS = keyValuePair.Value["STATUS"],
                                RECORDS_PER_PAGE = keyValuePair.Value["RECORDS_PER_PAGE"],
                                DEFAULT_REPORT_DURATION = keyValuePair.Value["DEFAULT_REPORT_DURATION"],
                                NO_OF_REQUESTS_FOR_SAME_EQ_ITM = keyValuePair.Value["NO_OF_REQUESTS_FOR_SAME_EQ_ITM"],
                                USERNAME = keyValuePair.Value["USERNAME"]
                            };

                            break;

                    }
                }
                foreach (var dept in lstRequestorDepts)
                {
                    dept.ORG_GROUP_ID = requestor.ORG_GROUP_ID;
                    dept.REQUESTOR_ID = requestor.REQUESTOR_ID;
                }
            }            
            catch (Exception ex)
            {

            }

            try
            {
                if (!string.IsNullOrEmpty(Password))
                {
                    Password = Password.Replace(" ", "+");
                    decryptedPassword = AESEncryptDecryptService.DecryptStringAES(Password);
                }

                if (!string.IsNullOrEmpty(Password))
                {
                     passHash = encServices.EncryptString(decryptedPassword, Convert.ToInt16(AtParEncryptionServices.AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase));
                }

                requestor.PASSWORD = passHash;
                StatusCode = _Repo.SaveRequestorDetails(requestor, lstRequestorDepts);

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
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

        public AtParWebApiResponse<long> UpdateRequestorDetails( Dictionary<string, dynamic> requestorDetails, string Password)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long StatusCode = -1;
            var response = new AtParWebApiResponse<long>();

            TKIT_REQUESTOR requestor = null; 
           
            List<TKIT_REQUESTOR_DEPT> lstRequestorDepts = new List<TKIT_REQUESTOR_DEPT>();
            
            try {
                foreach (var keyValuePair in requestorDetails)
                {
                    switch (keyValuePair.Key)
                    {
                        case "lstRequestorDepts":
                            foreach (var item in keyValuePair.Value)
                            {
                                var dept = new TKIT_REQUESTOR_DEPT
                                {

                                    DEPT_ID = item.Value
                                };
                                lstRequestorDepts.Add(dept);
                            }
                            break;
                        case "requestor":

                            requestor = new TKIT_REQUESTOR
                            {
                                ORG_GROUP_ID = keyValuePair.Value["ORG_GROUP_ID"],
                                REQUESTOR_ID = keyValuePair.Value["REQUESTOR_ID"],
                                PASSWORD = keyValuePair.Value["PASSWORD"],
                                NEWPASSWORD = keyValuePair.Value["NEWPASSWORD"],
                                FIRST_NAME = keyValuePair.Value["FIRST_NAME"],
                                MIDDLE_INIT = keyValuePair.Value["MIDDLE_INIT"],
                                LAST_NAME = keyValuePair.Value["LAST_NAME"],
                                PHONE = keyValuePair.Value["PHONE"],
                                EMAIL = keyValuePair.Value["EMAIL"],
                                FAX = keyValuePair.Value["FAX"],
                                PAGER = keyValuePair.Value["PAGER"],
                                LOCATION_ID = keyValuePair.Value["LOCATION_ID"],
                                STATUS = keyValuePair.Value["STATUS"],
                                RECORDS_PER_PAGE = keyValuePair.Value["RECORDS_PER_PAGE"],
                                DEFAULT_REPORT_DURATION = keyValuePair.Value["DEFAULT_REPORT_DURATION"],
                                NO_OF_REQUESTS_FOR_SAME_EQ_ITM = keyValuePair.Value["NO_OF_REQUESTS_FOR_SAME_EQ_ITM"],
                                USERNAME = keyValuePair.Value["USERNAME"]
                            };
                            
                            break;

                    }
                }
                foreach (var dept in lstRequestorDepts)
                {
                    dept.ORG_GROUP_ID = requestor.ORG_GROUP_ID;
                    dept.REQUESTOR_ID = requestor.REQUESTOR_ID;
                }
            } catch (Exception ex) {
                
            }
            

            try
            {
                if (!string.IsNullOrEmpty(Password))
                {
                    Password = Password.Replace(" ", "+");
                    decryptedPassword = AESEncryptDecryptService.DecryptStringAES(Password);
                }

                if (!string.IsNullOrEmpty(Password))
                {
                    passHash = encServices.EncryptString(decryptedPassword, Convert.ToInt16(AtParEncryptionServices.AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase));
                }

                requestor.PASSWORD = passHash;

                StatusCode = _Repo.UpdateRequestorDetails(requestor, lstRequestorDepts);

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
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

        public AtParWebApiResponse<long> UpdateRequestorStatus(string requestorID, string status)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.StatusCode = _Repo.UpdateRequestorStatus(requestorID, status);

                if (response.StatusCode.Equals(AtparStatusCodes.ATPAR_OK) == false)
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

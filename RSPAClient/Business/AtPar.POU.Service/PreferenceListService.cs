using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;

namespace AtPar.POU.Service
{
    public class PreferenceListService : IPreferenceListService
    {
        IPreferenceListsRepository _preferenceListRepository;
        ILog _log;
        ICommonRepository _commonRepo;

        public PreferenceListService(IPreferenceListsRepository preferenceListRepository, ILog log, ICommonRepository commonRepository)
        {
            _preferenceListRepository = preferenceListRepository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(PreferenceListService));
        }

        public AtParWebApiResponse<long> AddPreferenceListHeader(string prefListID, string prefListDesc, string deptID, string userID, string procedureID, string physicianID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.StatusCode = _preferenceListRepository.AddPreferenceListHeader(prefListID, prefListDesc, deptID, userID, procedureID, physicianID);

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

        public AtParWebApiResponse<long> DeletePreferenceList(string prefListID, string procedureID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            try
            {
                response.StatusCode = _preferenceListRepository.DeletePreferenceList(prefListID, procedureID);

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

        public AtParWebApiResponse<long> DisablePrefList(string prefListID, string procedureID, string status,string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            try
            {
                response.StatusCode = _preferenceListRepository.DisablePrefList(prefListID, procedureID, status, deviceTokenEntry);

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

        public AtParWebApiResponse<long> UpdatePreferenceListItem(string prefListID, string procedureID, string itemID, string itemQty, string holdQty, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            try
            {
                if (holdQty == null) holdQty = "0";
                response.StatusCode = _preferenceListRepository.UpdatePreferenceListItem(prefListID, procedureID, itemID, itemQty, holdQty,deviceTokenEntry);

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

        public AtParWebApiResponse<long> AddPreferenceListItem(string prefListID, string procedureID, string itemID, string itemDesc, string itemQty, string holdQty, string userID, string custItemNo)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            try
            {
                if (holdQty == null) holdQty = "0";
                response.StatusCode = _preferenceListRepository.AddPreferenceListItem(prefListID, procedureID, itemID, itemDesc, itemQty, holdQty, userID, custItemNo);

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

        public AtParWebApiResponse<long> DeletePreferenceListItem(string prefListID, string procedureID, string itemID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            try
            {
                response.StatusCode = _preferenceListRepository.DeletePreferenceListItem(prefListID, procedureID, itemID, deviceTokenEntry);

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
    }
}

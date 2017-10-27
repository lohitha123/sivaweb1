using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Text;

namespace AtPar.Init.Service
{
    public class StationaryPrintDesignService : IStationaryPrintDesignService
    {
        private ILog _log;
        private IStationaryPrintDesignRepository _repo;
        ICommonRepository _commonRepo;
        public StationaryPrintDesignService(ILog log, IStationaryPrintDesignRepository repo, ICommonRepository commonRepository)
        {
            _repo = repo;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(StationaryPrintDesignService));
        }

        /// <summary>
        /// Saving Dynamic Print Report
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="objectID"></param>
        /// <param name="printType"></param>
        /// <param name="objectDesc"></param>
        /// <param name="lstReportDtls"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> SaveDynamicPrintReport(string appID, string objectID, string printType, string objectDesc, List<VM_MT_ATPAR_REPORT_DETAILS> lstReportDtls)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _repo.SaveDynamicPrintReport(appID, objectID, printType, objectDesc, lstReportDtls);

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL);
                return response;
            }
        }

        /// <summary>
        /// Getting Dynamic Report
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="objectID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetDynamicReport(string appID, string objectID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.DataDictionary = _repo.GetDynamicReport(appID, objectID);
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        /// <summary>
        /// Getting Dynamic Print Report Types
        /// </summary>
        /// <param name="appID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> GetDynamicPrintReportTypes(int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataList = _repo.GetDynamicPrintReportTypes(appID);

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        /// <summary>
        /// Getting Dynamic Print Products
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_PROFILE_APP_ACL> GetDynamicPrintProducts(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_PROFILE_APP_ACL>();

            try
            {
                response.DataList = _repo.GetDynamicPrintProducts(userID);
                // response.DataList = _repo.GetDynamicPrintProducts("All");

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        public AtParWebApiResponse<string> GetFonts()
        {
            AtParWebApiResponse<string> respone = new AtParWebApiResponse<string>();
            List<string> st = new List<string>();

            foreach (FontFamily font in System.Drawing.FontFamily.Families)
            {
                st.Add(font.Name);
                respone.DataList=st;
            }
             
            return respone;

        }

    }
}

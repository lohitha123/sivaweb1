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
using System.Data;
namespace AtPar.TrackIT.Service
{
  public  class DeliveryReportService: IDeliveryReportService
    {
        private ILog _log;
        private IDeliveryReportRepository _repo;
        ICommonRepository _commonRepo;
        public DeliveryReportService(ILog log , IDeliveryReportRepository repo, ICommonRepository commonRepository)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepository;
        }

        public AtParWebApiResponse<long> GetTkITDeliverReport(string pFromDate, string pToDate, string pRequest, string pRecipient, string pUserId, string pDepartmentId, string pItemId, string pVendorName, string pDescr, string pLocation,
        string pReqId, string pStatus,string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet pDsDeliverRep = new DataSet();
            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            

            try
            {
                 statusCode = _repo.GetTkITDeliverReport( pFromDate,  pToDate,  pRequest,  pRecipient,  pUserId,  pDepartmentId,  pItemId,  pVendorName,  pDescr,  pLocation,
         pReqId,  pStatus, ref  pDsDeliverRep,  pDeviceTokenEntry);

               

                var dictionaryResult = new Dictionary<string, object> { { "pDsDeliverRep", pDsDeliverRep } };
                response.DataDictionary = dictionaryResult;
                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
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

        public AtParWebApiResponse<long> GetRequestors(bool pInactiveStatusChk, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            DataSet pDsTkitRequestors = new DataSet();

            try
            {
                 statusCode = _repo.GetRequestors( pInactiveStatusChk, ref  pDsTkitRequestors,  pDeviceTokenEntry);



                var dictionaryResult = new Dictionary<string, object> { { "pDsTkitRequestors", pDsTkitRequestors } };

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                response.DataDictionary = dictionaryResult;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> GetTKITDepts(string pStrDeptID, string pStatus, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            DataSet pDsDepts = new DataSet();

            try
            {
                 statusCode = _repo.GetTKITDepts( pStrDeptID,  pStatus,ref pDsDepts,  pDeviceTokenEntry);



                var dictionaryResult = new Dictionary<string, object> { {"pDsTkitDepts", pDsDepts } };

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                response.DataDictionary = dictionaryResult;
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

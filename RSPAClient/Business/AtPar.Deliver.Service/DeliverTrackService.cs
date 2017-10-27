using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Deliver;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Deliver.Service
{
    public class DeliverTrackService : IDeliverTrackService
    {
        private ILog _log;
        private IDeliverTrackRepository _repo;
        ICommonRepository _commonRepo;
        public DeliverTrackService(ILog log, IDeliverTrackRepository repo, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
        }
        public AtParWebApiResponse<long> GetDeliveryTrackingReportData(string trackNo, string poId, string deptID, string fromDate, string toDate, string pVendorName, string itemDesc, string itemID, string carrierID, string deliveryLoc, string requestor, string receiver, string selectedStatus, string currentStatus, string systemID, string locDescr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            long statusCode = -1;

            try
            {
                var result = _repo.GetDeliveryTrackingReportData(trackNo, poId, deptID, fromDate, toDate, pVendorName, itemDesc, itemID, carrierID, deliveryLoc, requestor, receiver, selectedStatus, currentStatus, systemID, locDescr);

                var pDsDetails = result.Item1;
                var pDetailsFlag = result.Item2;
                var pDsDataArrayAttempt = result.Item3;
                statusCode = result.Item4;

                var dictionaryResult = new Dictionary<string, object> { { "pDsDetails", pDsDetails }, { "pDetailsFlag", pDetailsFlag } , { "pDsDataArrayAttempt", pDsDataArrayAttempt } };

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

        public AtParWebApiResponse<long> ValidateSystemID(string systemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            long statusCode = -1;

            try
            {
                var result = _repo.ValidateSystemID(systemID);

                response.StatusCode = result;

                if (!result.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                response.DataVariable = result;
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

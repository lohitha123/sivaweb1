using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.CartCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;

namespace AtPar.CartCount.Service
{
    public class ManageOrdersService : IManageOrdersService
    {
       private IManageOrdersRepository _repo;
       private ILog _log;
       private ICommonRepository _commonRepo;
        public ManageOrdersService(ILog log, IManageOrdersRepository repo, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
        }

        public AtParWebApiResponse<long> GetOrderDetails(int orderID, string orderStatus, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            if (string.IsNullOrEmpty(orderStatus)) orderStatus = "";
            try
            {
                var result = _repo.GetOrderDetails( orderID,  orderStatus, deviceTokenEntry);

                var dsOrderDetails = result.Item1;
                statusCode = result.Item2;

                var dictionaryResult = new Dictionary<string, object> { { "dsOrderDetails", dsOrderDetails } };

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

        public AtParWebApiResponse<long> GetOrders(string fromDate, string toDate, string compID, string locID, string deptID, string vendorID, string ordStatus, string reqNo, string orgGroupID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            if (compID == null) compID = "";
            if (locID == null) locID = "";
            if (deptID == null) deptID = "";
            if (vendorID == null) vendorID = "";
            if (ordStatus == null) ordStatus = "";
            if (reqNo == null) reqNo = "";
            if (orgGroupID == null) orgGroupID = "";

            try
            {
                var result = _repo.GetOrders( fromDate,  toDate,  compID,  locID,  deptID,  vendorID,  ordStatus,  reqNo,  orgGroupID,deviceTokenEntry);

                var dsOrders = result.Item1;
                statusCode = result.Item2;

                var dictionaryResult = new Dictionary<string, object> { { "dsOrders", dsOrders } };

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

        public AtParWebApiResponse<long> UpdateOrderDetails(List<VM_CARTCOUNT_ORDER_DETAILS> lstOrderDetails, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

           
            var response = new AtParWebApiResponse<long>();
            try
            {
                var dsOrderDetails= lstOrderDetails.ToDataSet();
                var result = _repo.UpdateOrderDetails(dsOrderDetails, deviceTokenEntry);
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

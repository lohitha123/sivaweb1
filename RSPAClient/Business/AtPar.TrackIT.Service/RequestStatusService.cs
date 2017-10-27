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

namespace AtPar.TrackIT.Service
{
    public class RequestStatusService : IRequestStatusService
    {
        IRequestStatusRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public RequestStatusService(IRequestStatusRepository repo, ILog log, ICommonRepository commonRepository)
        {
            _Repo = repo;
            _log = log;
            _commonRepo = commonRepository;
        }

        public AtParWebApiResponse<VM_TKIT_ORDER_DETAILS> GetOrderDetails(string requestID, string status, string deptID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_TKIT_ORDER_DETAILS>();

            if (status == AtParWebEnums.enum_TKIT_OrderStatus.Delivered.ToString())
            {
                status = "DELV";
            }

            try
            {
                response.DataList = _Repo.GetOrderDetails(requestID, status, deptID);

                foreach (var item in response.DataList)
                {
                    if (item.DELIVER_ITEM_STATUS == AtParWebEnums.enum_TKIT_OrderStatus.Open.ToString().ToUpper())
                    {
                        if (status.ToUpper() != AtParWebEnums.enum_TKIT_OrderStatus.Open.ToString().ToUpper())
                        {

                            if (item.DELIVER_ITEM_STATUS == AtParWebEnums.enum_TKIT_OrderStatus.Open.ToString().ToUpper())
                            {
                                var statusFromTransaction = _Repo.GetStatusFromDetailTransaction(item.ORDER_NUMBER, item.ORDER_LINE_NUMBER);

                                switch (statusFromTransaction)
                                {
                                    case (int)AtParWebEnums.EventStatus_Enum.Pick:
                                        item.DELIVER_ITEM_STATUS = "PickedUp";
                                        break;
                                    case (int)AtParWebEnums.EventStatus_Enum.Load:
                                        item.DELIVER_ITEM_STATUS = "Loaded";
                                        break;
                                    case (int)AtParWebEnums.EventStatus_Enum.UnLoad:
                                        item.DELIVER_ITEM_STATUS = "Unloaded";
                                        break;
                                    case (int)AtParWebEnums.EventStatus_Enum.Deliver:
                                        item.DELIVER_ITEM_STATUS = "Delivered";
                                        break;
                                }
                            }
                        }     
                    }
                }

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


        public AtParWebApiResponse<VM_TKIT_ORDER_DETAILS> GetOrderIDs(string fromDate, string toDate, string status, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_TKIT_ORDER_DETAILS>();
            //List<VM_TKIT_ORDER_DETAILS> 
            try
            {
                response.DataList = _Repo.GetOrderIDs(fromDate, toDate, status, deviceTokenEntry);

                if (response.DataList.Count == 0)
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

        public AtParWebApiResponse<long> UpdateOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails, List<TKIT_ORDER_DETAILS> updateOrderDetails, string userID, string serverUserID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.StatusCode = _Repo.UpdateOrder(lstOrderDetails, updateOrderDetails, userID, serverUserID);

                if (response.StatusCode.Equals(AtparStatusCodes.ATPAR_OK) == false)
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

        #region Dash Board

        public AtParWebApiResponse<TKIT_ORDER_HEADER> GetOrdersForDashboard(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ORDER_HEADER>();

            try
            {
                response.DataList = _Repo.GetOrdersForDashboard(deviceTokenEntry);

                if (response.DataList.Count == 0)
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

        public AtParWebApiResponse<TKIT_ORDER_DETAILS> GetOrderDetailsForDashboard(int orderNumber)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ORDER_DETAILS>();

            try
            {
                response.DataList = _Repo.GetOrderDetailsForDashboard(orderNumber);

                if (response.DataList.Count == 0)
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

    }
}

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
    public class CheckInCheckOutItemsService : ICheckInCheckOutItemsService
    {
        #region Private Variable

        ILog _log;
        ICheckInCheckOutItemsRepository _repo;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public CheckInCheckOutItemsService(ICheckInCheckOutItemsRepository repo, ILog log, ICommonRepository commonRepository)
        {
            _repo = repo;
            _log = log;
            _commonRepo = commonRepository;
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the Item Type Indicator
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> GetTypeIndicator(string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                List<TKIT_ITEM_MASTER> lstItemDetails = _repo.GetItemStatus(itemId);

                if (lstItemDetails.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                else if (lstItemDetails[0].ITEM_INACTIVATED == true)
                {
                    response.AtParNotOK(AtparStatusCodes.TKIT_E_ITEMINACTIVATED, _commonRepo, _log);
                    return response;
                }

                response.DataVariable = _repo.GetItemTypeIndicator(lstItemDetails[0].ITEM_ID);
                response.Data = lstItemDetails[0].ITEM_ID;
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
        /// Checks the EQ Item Availability
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="requestor"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> CheckEqItemAvailability(string itemId, string requestor)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                List<TKIT_ITEM_INVENTORY> lstItemInvDetails = _repo.CheckEqItemAvailability(itemId, requestor);

                if (lstItemInvDetails.Count.Equals(0))
                {
                    if (string.IsNullOrEmpty(requestor).Equals(false))
                    {
                        response.AtParNotOK(AtparStatusCodes.TKIT_E_ITEMNOTALLOWED, _commonRepo, _log);
                        return response;
                    }
                }

                response.DataVariable = (from item in lstItemInvDetails
                                         where item.ITEM_QTY != 0
                                         select item.ITEM_QTY).FirstOrDefault();

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
        /// Checks the Item Availability
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="requestor"></param>
        /// <param name="itemTypeIndicator"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> CheckItemAvailability(string itemId, string requestor, string itemTypeIndicator)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                if(itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()).Equals(false))
                {
                    if (_repo.CheckItemAvailability(itemId).Count.Equals(0))
                    {
                        response.AtParNotOK(AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE, _commonRepo, _log);
                        return response;
                    }
                }
                List<TKIT_ITEM_INVENTORY> lstItemInvDetails = _repo.GetItemQty(itemId, requestor, itemTypeIndicator);

                if (lstItemInvDetails.Count.Equals(0))
                {
                    if (string.IsNullOrEmpty(requestor).Equals(false))
                    {
                        response.AtParNotOK(AtparStatusCodes.TKIT_E_ITEMNOTALLOWED, _commonRepo, _log);
                        return response;
                    }
                }

                response.DataVariable = lstItemInvDetails[0].ITEM_QTY;
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
        /// CHecks the Existence of Serial ID
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="serialId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<string> CheckSerialId(string itemId, string serialId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                List<TKIT_ITEM_INVENTORY> lstItemInvDetails = _repo.CheckSerialId(itemId, serialId);

                if (lstItemInvDetails.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.TKIT_E_SERIALNOTEXISTS, _commonRepo, _log);
                    return response;
                }
                else if(lstItemInvDetails[0].STATUS.Equals(true)) 
                {
                    response.AtParNotOK(AtparStatusCodes.TKIT_E_SERIALINACTIVATED, _commonRepo, _log);
                    return response;
                }

                response.DataVariable = Convert.ToInt16(lstItemInvDetails[0].AVAILABILITY);
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
        /// Gets the Item Details
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="requestor"></param>
        /// <param name="itemTypeIndicator"></param>
        /// <param name="serialId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_TKIT_ITEM_DETAILS> GetItemDetails(string itemId, string requestor, string itemTypeIndicator, string serialId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_TKIT_ITEM_DETAILS>();
            List<VM_TKIT_ITEM_DETAILS> lstItems = null;

            try
            {
                lstItems= _repo.GetItemDetails(itemId, requestor, itemTypeIndicator, serialId);
                if (lstItems.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.TKIT_E_ITEMNOTALLOWED, _commonRepo, _log);
                    return response;
                }
                else
                {
                    response.DataVariable = lstItems;
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
        /// Gets the Requester Details
        /// </summary>
        /// <param name="inActiveCheck"></param>
        /// <param name="orgGroupId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<TKIT_REQUESTOR> GetRequestors(Boolean inActiveCheck, string orgGroupId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_REQUESTOR>();

            try
            {
                response.DataList = _repo.GetRequestors(inActiveCheck, orgGroupId);
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
        /// Saves the Item Details based on CheckIn/CheckOut action
        /// </summary>
        /// <param name="lstCheckInOutItemDetails"></param>
        /// <param name="requestedUserId"></param>
        /// <param name="checkInOutMode"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> CheckInOutItems(List<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> lstCheckInOutItemDetails, string requestedUserId,
                                                         string checkInOutMode, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long statusCode = _repo.CheckInOutItems(lstCheckInOutItemDetails, requestedUserId, checkInOutMode, deviceTokenEntry);

                if (statusCode != 0)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                }
                else
                {
                    response.AtParSuccess();
                }

                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<RM_SHIP_TO_LOCACTION> GetLocations(string orgGrpId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<RM_SHIP_TO_LOCACTION>();

            try
            {
                response.DataList = _repo.GetLocations(orgGrpId);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<TKIT_REQUESTOR_DEPT> GetUserDepts(string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_REQUESTOR_DEPT>();

            try
            {
                response.DataList = _repo.GetUserDepts(deviceTokenEntry);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<TKIT_DEPT> GetTKITDepts(string deptID, string status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_DEPT>();
            List<TKIT_DEPT> lstDepts = new List<TKIT_DEPT>();

            try
            {
                lstDepts = _repo.GetTKITDepts(deptID,status,deviceTokenEntry);
                foreach (var item in lstDepts)
                {
                    string dept = _repo.GetDeptID(deptID, item.ORG_GROUP_ID, deviceTokenEntry);
                    if (!string.IsNullOrEmpty(dept))
                    {
                        item.USER_DEPT_EXISTS = true;
                    }
                    else
                    {
                        item.USER_DEPT_EXISTS = false;
                    }
                }
                response.DataList = lstDepts;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> GetItems(string itemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS>();

            try
            {
                response.DataList = _repo.GetItems(itemID);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<TKIT_ITEM_INVENTORY> GetSerialIDs(string itemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ITEM_INVENTORY>();

            try
            {
                response.DataList = _repo.GetSerialIDs(itemID);
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

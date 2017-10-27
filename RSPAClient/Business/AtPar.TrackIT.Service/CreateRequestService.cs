using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System;
using System.Linq;
using System.Collections.Generic;

namespace AtPar.TrackIT.Service
{
    public class CreateRequestService : ICreateRequestService
    {
        ICreateRequestRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonTrackITRepository _commonTkitRepo;

        public CreateRequestService(ICreateRequestRepository repo, ILog log, ICommonRepository commonRepository, ICommonTrackITRepository commonTkitRepo)
        {
            _Repo = repo;
            _log = log;
            _commonRepo = commonRepository;
            _commonTkitRepo = commonTkitRepo;
        }

        public AtParWebApiResponse<VM_TKIT_EQPITEMS> GetEquipmentItems(string eqpType, string itemDescr, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_TKIT_EQPITEMS>();

            try
            {
                var tupleResult = _Repo.GetEquipmentItems(eqpType, itemDescr, deviceTokenEntry);
                response.DataVariable = tupleResult.Item1;
                response.DataList = tupleResult.Item2;

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                //var existingCartItems = _commonTkitRepo.GetCartItems(deviceTokenEntry);

                //if (existingCartItems.Count > 0)
                //{
                //    foreach (var item in existingCartItems)
                //    {
                //        if (item.ITEM_TYPE_INDICATOR.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                //        {
                //            var isItemExists = response.DataList.Where(c => c.ITEM_ID == item.ITEM_ID && c.SERIAL_NO == Convert.ToInt32(item.SERIAL_NO)).FirstOrDefault();

                //            if (isItemExists != null)
                //            {
                //                isItemExists.CHK_VALUE = 1;

                //                if (!string.IsNullOrEmpty(item.PATIENT_LAST_NAME))
                //                {
                //                    isItemExists.PATIENT_LAST_NAME = item.PATIENT_LAST_NAME;
                //                }

                //                if (!string.IsNullOrEmpty(item.PATIENT_ID))
                //                {
                //                    isItemExists.PATIENT_ID = item.PATIENT_ID;
                //                }
                //            }

                //        }
                //        else
                //        {
                //            var isItemExists = response.DataList.Where(c => c.ITEM_ID == item.ITEM_ID).FirstOrDefault();

                //            if (isItemExists != null)
                //            {
                //                isItemExists.CHK_VALUE = 1;

                //                if (!string.IsNullOrEmpty(item.PATIENT_LAST_NAME))
                //                {
                //                    isItemExists.PATIENT_LAST_NAME = item.PATIENT_LAST_NAME;
                //                }

                //                if (!string.IsNullOrEmpty(item.PATIENT_ID))
                //                {
                //                    isItemExists.PATIENT_ID = item.PATIENT_ID;
                //                }
                //            }

                //        }

                //    }

                //}

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<TKIT_ITEM_TYPE> GetEquipmentType(string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ITEM_TYPE>();

            try
            {
                response.DataList = _Repo.GetEquipmentType(userID, deviceTokenEntry);

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

        public AtParWebApiResponse<VM_TKIT_EQPITEMS> GetSearchItems(string itemID, string itemDescr, string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_TKIT_EQPITEMS>();

            try
            {
                response.DataList = _Repo.GetSearchItems(itemID, itemDescr, userID, deviceTokenEntry);

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

        public AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE> GetPatientList()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE>();

            try
            {
                response.DataList = _Repo.GetPatientList();

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


        public AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE> GetPatientList(string itemID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE>();

            try
            {
                response.DataList = _Repo.GetPatientList(itemID, deviceTokenEntry);

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

        public AtParWebApiResponse<TKIT_ITEM_MASTER> GetItemsForAutoSearch(string eqType, string eqpInidcator, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ITEM_MASTER>();

            try
            {
                response.DataList = _Repo.GetItemsForAutoSearch(eqType, eqpInidcator, deviceTokenEntry);                

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
    }
}

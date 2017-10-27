using System;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.Service.Interfaces.POU;
using System.Collections.Generic;
using AtPar.ViewModel;

namespace AtPar.POU.Service
{


    public class BillonlyItemMaintenanceService : IBillOnlyItemMaintenanceService
    {
        IBillOnlyItemMaintenanceRepository _billOnlyItemRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        public BillonlyItemMaintenanceService(IBillOnlyItemMaintenanceRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _billOnlyItemRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
        }

        public AtParWebApiResponse<MT_POU_BILLONLY_ITEMS> GetAllBillOnlyItems()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_BILLONLY_ITEMS>();

            try
            {
                response.DataList = _billOnlyItemRepo.GetAllBillOnlyItems();

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<MT_POU_BILLONLY_ITEMS> GetBillonlyItemsDtls(string itemID, string orgGrpID, string deptID, string descr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_BILLONLY_ITEMS>();

            try
            {
                response.DataList = _billOnlyItemRepo.GetBillonlyItemsDtls(itemID, orgGrpID, deptID, descr);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> UpdateBillonlyItemsDtls(List<MT_POU_BILLONLY_ITEMS> lstBillOnlyItem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _billOnlyItemRepo.UpdateBillonlyItemsDtls(lstBillOnlyItem);

                if (StatusCode == AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<VM_ATPAR_POU_LOCATIONS> GetLocations(int appID, string orgID, string userID, string deptID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_ATPAR_POU_LOCATIONS>();

            try
            {
                response.DataList = _billOnlyItemRepo.GetLocations(appID, orgID, userID, deptID);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<string> GetInventoryBUnits(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataList = _billOnlyItemRepo.GetInventoryBUnits(userID);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<string> GetCostCenterOrgIds(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                response.DataList = _billOnlyItemRepo.GetCostCenterOrgIds(userID);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> ConvertBillonlyItem(List<VM_MT_POU_BILLONLY_ITEMS> lstBillOnlyItem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _billOnlyItemRepo.ConvertBillonlyItem(lstBillOnlyItem);

                if (StatusCode == AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

    }
}

using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.ParManagement;
using AtPar.Service.Interfaces.ParManagement;
using log4net;
using System;
using AtPar.Common.Service;
using AtPar.ViewModel;

namespace AtPar.ParManagement.Service
{
    public class CostcentersService : ICostCenterService
    {
        ICostcenterRepository _costCenterRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public CostcentersService(ICostcenterRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _costCenterRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(CostcentersService));
        }

        public AtParWebApiResponse<PAR_MNGT_COST_CENTER> InsertCostCenter(PAR_MNGT_COST_CENTER costCenter)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_COST_CENTER>();

            try
            {
                long StatusCode = _costCenterRepo.IsCostCenterExistOrNot(costCenter.COST_CENTER_CODE, costCenter.ORG_ID, costCenter.DEPT_ID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    costCenter.ReplaceProperty(c => c.DESCRIPTION);

                    StatusCode = _costCenterRepo.InsertCostCenter(costCenter);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                    response.AtParSuccess();
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<PAR_MNGT_COST_CENTER> UpdateCostCenter(PAR_MNGT_COST_CENTER costCenter)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_COST_CENTER>();

            try
            {
                costCenter.ReplaceProperty(c => c.DESCRIPTION);
                long StatusCode = _costCenterRepo.UpdateCostCenter(costCenter);

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
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<long> UpdateCostCenterStatus(int status, string orgID, string costCenterCode, string deptID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {

                long StatusCode = _costCenterRepo.CanCostCenterInActivate(costCenterCode);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    StatusCode = _costCenterRepo.UpdateCostCenterStatus(status, orgID, costCenterCode, deptID);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                    response.AtParSuccess();
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
                response.DataList = _costCenterRepo.GetCostCenterOrgIds(userID);

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

        public AtParWebApiResponse<VM_COST_CENTER_CODES> GetCodes(string costCenterCode, string orgGroupID, string deptID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_COST_CENTER_CODES>();
            if (string.IsNullOrEmpty(costCenterCode))
            {
                costCenterCode = string.Empty;
            }
            try
            {
                response.DataList = _costCenterRepo.GetCodes(costCenterCode, orgGroupID, deptID);

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

        public AtParWebApiResponse<VM_COST_CENTER_CODES> GetCostCenters(string orgGroupID, string search)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_COST_CENTER_CODES>();

            try
            {
                response.DataList = _costCenterRepo.GetCostCenters(orgGroupID, search);

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


        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_DEPT>();

            try
            {
                response.DataList = _costCenterRepo.GetDepartments();

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

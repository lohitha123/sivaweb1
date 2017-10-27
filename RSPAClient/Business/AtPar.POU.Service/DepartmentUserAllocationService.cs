using AtPar.Service.Interfaces.POU;
using System;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.ViewModel;

namespace AtPar.POU.Service
{
    public class DepartmentUserAllocationService : IDepartmentUserAllocationService
    {
        IDepartmentUserAllocationRepository _deptUserAllocRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public DepartmentUserAllocationService(IDepartmentUserAllocationRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _deptUserAllocRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(DepartmentUserAllocationService));
        }

        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments(string departmentID, string deptDescr, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            departmentID = departmentID.ReplaceNullwithEmpty();
            deptDescr = deptDescr.ReplaceNullwithEmpty();
            orgGroupID = orgGroupID.ReplaceNullwithEmpty();

            var response = new AtParWebApiResponse<MT_POU_DEPT>();

            try
            {
                response.DataList = _deptUserAllocRepo.GetDepartments(departmentID, deptDescr, orgGroupID);

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

        /// <summary>
        /// Gets the Departments based on DepartmentId/Description search criteria
        /// </summary>
        /// <param name="departmentIdOrDescr"></param>
        /// <param name="orgGroupId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments(string departmentIdOrDescr, string orgGroupId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_DEPT>();

            try
            {
                response.DataList = _deptUserAllocRepo.GetDepartments(departmentIdOrDescr.ReplaceNullwithEmpty(), orgGroupId.ReplaceNullwithEmpty());

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

        public AtParWebApiResponse<VM_ATPAR_DEPT_USER> GetDepartmentUsers(string departmentID, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            departmentID = departmentID.ReplaceNullwithEmpty();
            orgGroupID = orgGroupID.ReplaceNullwithEmpty();

            var response = new AtParWebApiResponse<VM_ATPAR_DEPT_USER>();

            try
            {
                if (!departmentID.Contains("'"))
                {
                    response.DataList = _deptUserAllocRepo.GetDepartmentUsersofSingleDept(departmentID, orgGroupID);
                }
                else
                {
                    response.DataList = _deptUserAllocRepo.GetDepartmentUsersofMultipleDepts(departmentID, orgGroupID);
                }

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

        public AtParWebApiResponse<long> AllocateUserToDepartment(string departmentId, string userId, string orgGroupID, bool isHomeDepartment, string mode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = AtparStatusCodes.ATPAR_OK;

            try
            {
                VM_ATPAR_DEPT_USER homeDeptUser = null;

                if (isHomeDepartment)
                {
                    homeDeptUser = _deptUserAllocRepo.GetHomeDepartment(userId, orgGroupID);
                }

                if (homeDeptUser != null && !string.IsNullOrEmpty(homeDeptUser.CURRENT_HOME_DEPT))
                {
                    
                    StatusCode = AtparStatusCodes.E_NORECORDFOUND;
                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        response.StatType = AtParWebEnums.StatusType.Warn;
                        response.StatusMessage = string.Format("Department " + homeDeptUser.CURRENT_HOME_DEPT + "  is already set as Home Department for this User " + userId);
                        //response.StatusMessage = string.Format("Department " + homeDeptUser.CURRENT_HOME_DEPT + "  is already set as Home Department for this User " + homeDeptUser.USER_FULLNAME + "-" + userId);
                        return response;
                    }
                    return response;
                }
                else
                {
                    if (mode == "I")
                    {
                        StatusCode = _deptUserAllocRepo.AllocateUserToDepartmentInsert(departmentId, userId, orgGroupID, isHomeDepartment);
                    }
                    else
                    {
                        StatusCode = _deptUserAllocRepo.AllocateUserToDepartmentUpdate(departmentId, userId, orgGroupID, isHomeDepartment);
                    }

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

        public AtParWebApiResponse<long> DeallocateUserToDepartment(string departmentId, string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _deptUserAllocRepo.DeallocateUserToDepartment(departmentId, userId);

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
    }
}
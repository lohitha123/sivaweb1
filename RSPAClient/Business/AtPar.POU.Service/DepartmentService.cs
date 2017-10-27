using System;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.Service.Interfaces.POU;

namespace AtPar.POU.Service
{
    public class DepartmentService : IDepartmentService
    {
        IDepartmentRepository _departmentRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public DepartmentService(IDepartmentRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _departmentRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
        }

        public AtParWebApiResponse<MT_POU_DEPT> GetDeptDetails(string strDeptId, string strOrgGroupID,string search)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            strDeptId = strDeptId.ReplaceNullwithEmpty().ReplaceString();
            strOrgGroupID = strOrgGroupID.ReplaceNullwithEmpty().ReplaceString();
            var response = new AtParWebApiResponse<MT_POU_DEPT>();

            try
            {
                response.DataList = _departmentRepo.GetDeptDetails(strDeptId, strOrgGroupID,search);

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
        public AtParWebApiResponse<MT_POU_DEPT> UpdateDeptStatus(string strDeptID, int intStatus, string strOrgGroupID, int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_DEPT>();
            strDeptID = strDeptID.ReplaceNullwithEmpty().ReplaceString();
            strOrgGroupID = strOrgGroupID.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _departmentRepo.UpdateDeptStatus(strDeptID, intStatus, strOrgGroupID, appID);
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

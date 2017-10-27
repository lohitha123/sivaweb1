using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System;

namespace AtPar.TrackIT.Service
{
    public class ManageDepartmentsService : IManageDepartmentsService
    {
        #region Private Variable

        IManageDepartmentsRepository _mangDeptsRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public ManageDepartmentsService(IManageDepartmentsRepository mangDptsRepo, ILog log, ICommonRepository commonRepository)
        {
            _mangDeptsRepo = mangDptsRepo;
            _log = log;
            _commonRepo = commonRepository;
        }

        #endregion


        #region Public Methods

        public AtParWebApiResponse<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string OrgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_DEPT>();

            try
            {
                response.DataList = _mangDeptsRepo.GetTKITAllDepts(deptID, status, OrgGrpID);

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


        public AtParWebApiResponse<TKIT_DEPT> SaveDeptData(string deptID, string deptDescr, string status, string mode, string orgGrpID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_DEPT>();

            try
            {
                deptDescr = deptDescr.ReplaceString();
                response.StatusCode = _mangDeptsRepo.SaveDeptData(deptID, deptDescr, status, mode, orgGrpID, userID);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (response.StatusCode.Equals(AtparStatusCodes.S_DEPT_EXIST))
                    {
                        response.AtParNotOK(response.StatusCode, _commonRepo, _log, deptID);
                        return response;
                    }
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
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

        #endregion

    }
}

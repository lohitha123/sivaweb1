
using AtPar.Repository.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Service.Interfaces.POU;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;

namespace AtPar.POU.Service
{
    public class DepartmentDeviceAllocationService : IDepartmentDeviceAllocationService
    {
        IDepartmentDeviceAllocationRepository _deptWrkStationRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public DepartmentDeviceAllocationService(IDepartmentDeviceAllocationRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _deptWrkStationRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(DepartmentDeviceAllocationService));
        }



        public AtParWebApiResponse<long> DeleteHospgroupWorkstation(string departmentID, string workStationID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _deptWrkStationRepo.DeleteHospgroupWorkstation(departmentID,workStationID);

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

        public AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS> GetDeptWorkstations(string departmentID, string orgGrpID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            departmentID = departmentID.ReplaceNullwithEmpty();

            orgGrpID = orgGrpID.ReplaceNullwithEmpty();

            var response = new AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS>();

            try
            {
                response.DataList = _deptWrkStationRepo.GetDeptWorkstations(departmentID, orgGrpID);

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

        public AtParWebApiResponse<long> UpdateHospGroupWorkstations(string departmentID, string workStationID, string workStationDescr, string workStationMacAddr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _deptWrkStationRepo.UpdateHospGroupWorkstations(departmentID, workStationID,workStationDescr,workStationMacAddr);

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

        public AtParWebApiResponse<long> AddHospGroupWorkstations(string departmentID, string workStationID, string workStationDescr, string workStationMacAddr, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _deptWrkStationRepo.AddHospGroupWorkstations(departmentID, workStationID, workStationDescr, workStationMacAddr, orgGrpID);

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

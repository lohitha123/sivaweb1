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
    public class SetupCaseService : ISetupCaseService
    {
        ISetupCaseRepository _setupCaseRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public SetupCaseService(ISetupCaseRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _setupCaseRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
        }

        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> AddCaseInfo(string caseID, string caseDesc, string physID, string patient, string prefID, string procID, string date, string userID, string roomNo, string status, string emergCase = "N", string deptId = "", string serviceCode = "", string costCenter = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            caseID = caseID.ReplaceNullwithEmpty().ReplaceString();
            caseDesc = caseDesc.ReplaceNullwithEmpty().ReplaceString();
            physID = physID.ReplaceNullwithEmpty().ReplaceString();
            patient = patient.ReplaceNullwithEmpty().ReplaceString();
            prefID = prefID.ReplaceNullwithEmpty().ReplaceString();
            procID = procID.ReplaceNullwithEmpty().ReplaceString();
            date = date.ReplaceNullwithEmpty().ReplaceString();
            userID = userID.ReplaceNullwithEmpty().ReplaceString();
            roomNo = roomNo.ReplaceNullwithEmpty().ReplaceString();
            status = status.ReplaceNullwithEmpty().ReplaceString();
            emergCase = emergCase.ReplaceNullwithEmpty().ReplaceString();
            deptId = deptId.ReplaceNullwithEmpty().ReplaceString();
            serviceCode = serviceCode.ReplaceNullwithEmpty().ReplaceString();
            costCenter = costCenter.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<MT_POU_CASE_CART_HEADER>();

            try
            {

                long StatusCode = _setupCaseRepo.AddCaseInfo(caseID, caseDesc, physID, patient, prefID, procID, date, userID, roomNo, status, emergCase, deptId, serviceCode, costCenter);
                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (StatusCode == AtparStatusCodes.E_ATPARSERVICESTOPPED)
                    {
                        response.AtParNotOK(AtparStatusCodes.S_POU_CASE_ALREADY_EXISTS, _commonRepo, _log);
                        return response;
                    }
                    else
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
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


        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> DeleteCaseID(string caseID, string prefID, string procID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            caseID = caseID.ReplaceNullwithEmpty().ReplaceString();
            prefID = prefID.ReplaceNullwithEmpty().ReplaceString();
            procID = procID.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<MT_POU_CASE_CART_HEADER>();

            try
            {

                long StatusCode = _setupCaseRepo.DeleteCaseID(caseID, prefID, procID);
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

        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> GetCaseInfo(string strPhysician, string strProcedureCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            strPhysician = strPhysician.ReplaceNullwithEmpty().ReplaceString();
            strProcedureCode = strProcedureCode.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<MT_POU_CASE_CART_HEADER>();

            try
            {
                response.DataList = _setupCaseRepo.GetCaseInfo(strPhysician, strProcedureCode);

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

        public AtParWebApiResponse<MT_POU_PREF_LIST_HEADER> GetPreferenceListIDs()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            
            var response = new AtParWebApiResponse<MT_POU_PREF_LIST_HEADER>();

            try
            {
                response.DataList = _setupCaseRepo.GetPreferenceListIDs();

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


    }
}

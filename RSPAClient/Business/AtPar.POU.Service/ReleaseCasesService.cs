using System;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.Service.Interfaces.POU;
using System.Collections.Generic;

namespace AtPar.POU.Service
{
    public class ReleaseCasesService : IReleaseCasesService
    {
        IReleaseCasesRepository _releaseCasessRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ReleaseCasesService(IReleaseCasesRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _releaseCasessRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ReleaseCasesService));
        }
        /// <summary>
        /// Used to get the departments
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_DEPT>();

            try
            {
                response.DataList = _releaseCasessRepo.GetDepartments();

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
        /// Used to get the cases
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> GetDownloadCases()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_CASE_CART_HEADER>();
            try
            {
                response.DataList = _releaseCasessRepo.GetDownloadCases();

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
        /// Used to process the release cases
        /// </summary>
        /// <param name="pIsUpdate"></param>
        /// <param name="pTransID"></param>
        /// <param name="pDeptID"></param>
        /// <param name="pCaseID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_TRANSACTION> ProcessReleaseCases(bool pIsUpdate, int pTransID, string pDeptID, string pCaseID, int[] tranIDs)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            pDeptID = pDeptID.ReplaceNullwithEmpty();
            pCaseID = pCaseID.ReplaceNullwithEmpty();
            var response = new AtParWebApiResponse<MT_ATPAR_TRANSACTION>();

            try
            {
                response.DataList = _releaseCasessRepo.ProcessReleaseCases(pIsUpdate, pTransID, pDeptID, pCaseID, tranIDs);

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

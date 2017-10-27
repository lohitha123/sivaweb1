using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Deliver;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using System;

namespace AtPar.Deliver.Service
{
    public class AssignSignatoriesService : IAssignSignatoriesService
    {
        #region Private Variable

        IAssignSignatoriesRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public AssignSignatoriesService(IAssignSignatoriesRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _repo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(AssignSignatoriesService));
           
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the distinct Cost Center Codes
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON> GetCodes(string code)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON>();

            try
            {
                response.DataList = _repo.GetCodes(code);
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
        /// Gets the Cost Center Auth Person Details
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON> GetAuthSign(string code)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON>();

            try
            {
                response.DataList = _repo.GetAuthSign(code);
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
        /// Adds the Cost Center Auth Person Details
        /// </summary>
        /// <param name="costCenterCode"></param>
        /// <param name="userId"></param>
        /// <param name="firstName"></param>
        /// <param name="lastName"></param>
        /// <param name="middleName"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> AddAuthSign(string costCenterCode, string userId, string firstName,
                                                     string lastName, string middleName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _repo.AddAuthSign(costCenterCode, userId, firstName, lastName, middleName);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
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

        /// <summary>
        /// Updates the Cost Center Code
        /// </summary>
        /// <param name="newCostCenterCode"></param>
        /// <param name="oldCostCenterCode"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateAuthSign(string newCostCenterCode, string oldCostCenterCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _repo.UpdateAuthSign(newCostCenterCode, oldCostCenterCode);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
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

        /// <summary>
        /// Deletes the Cost Center
        /// </summary>
        /// <param name="costCenterCode"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> DeleteAuthSign(string costCenterCode, string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _repo.DeleteAuthSign(costCenterCode, userId);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
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
        #endregion

    }
}

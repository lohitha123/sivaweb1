#region Usings
using AtPar.Service.Interfaces.Receiving;
using System;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Receiving;
using log4net;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common; 
#endregion

namespace AtPar.Receiving.Service
{
    public class ManageCarriersService : IManageCarriersService
    {
        IManageCarriersRepository _manageCarriersRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ManageCarriersService(IManageCarriersRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _manageCarriersRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ManageCarriersService));
        }

        /// <summary>
        /// To Get the Carriers Data
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<MT_RECV_MANAGE_CARRIERS> GetCarriersData(string search)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_RECV_MANAGE_CARRIERS>();

            try
            {
                if (string.IsNullOrEmpty(search))
                {
                    search = string.Empty;
                }
                response.DataList = _manageCarriersRepo.GetCarriersData(search);

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

        /// <summary>
        /// To Insert or Update the Carriers Data
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="searchString"></param>
        /// <param name="startPosition"></param>
        /// <param name="carrier"></param>
        /// <param name="status"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateCarriers(string mode, string searchString, string startPosition, string carrier, int status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _manageCarriersRepo.UpdateCarriers(mode, searchString, startPosition, carrier, status, deviceTokenEntry);

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

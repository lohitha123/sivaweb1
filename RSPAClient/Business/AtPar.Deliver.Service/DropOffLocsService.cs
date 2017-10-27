using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Deliver;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using System;
using AtPar.Common.Service;

namespace AtPar.Deliver.Service
{
    public class DropOffLocsService : IDropOffLocsService
    {
        IDropOffLocsRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public DropOffLocsService(IDropOffLocsRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _Repo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(DropOffLocsService));
        }

        public AtParWebApiResponse<MT_DELV_LOC_DETAILS> GetDropOffLocs(string locID, string locDesc, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_DELV_LOC_DETAILS>();

            try
            {
                response.DataList = _Repo.GetDropOffLocs(locID, locDesc, orgGroupID);

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

        public AtParWebApiResponse<MT_DELV_LOC_DETAILS> InsertDropOffLocs(MT_DELV_LOC_DETAILS location)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_DELV_LOC_DETAILS>();

            try
            {
                long StatusCode = _Repo.IsDropOffLocExistOrNot(location.DROP_OFF_LOCATION_ID, location.ORG_GROUP_ID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    location.ReplaceProperty(c => c.LOCATION_DESC);

                    StatusCode = _Repo.InsertDropOffLocs(location);

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

        public AtParWebApiResponse<long> UpdateDropOffLocs(int status, string orgGroupID, string locID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {

                var StatusCode = _Repo.UpdateDropOffLocs(status, orgGroupID, locID, userID);

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

        public AtParWebApiResponse<MT_DELV_LOC_DETAILS> EditUpdateDropOffLocs(string drpLocID, string locDesc, string orgGroupID, string userID, string prevLocID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_DELV_LOC_DETAILS>();
            long StatusCode = -1;

            try
            {


                if (!string.Equals(prevLocID, drpLocID))
                {
                    StatusCode = _Repo.IsDropOffLocExistOrNot(drpLocID, orgGroupID);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
                }
                if (locDesc != null)
                {
                    locDesc.ReplaceString();
                }

                StatusCode = _Repo.EditUpdateDropOffLocs(drpLocID, locDesc, orgGroupID, userID, prevLocID);

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

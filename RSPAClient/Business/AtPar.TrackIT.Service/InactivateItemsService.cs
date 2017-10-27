using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;

namespace AtPar.TrackIT.Service
{
    public class InactivateItemsService : IInactivateItemsService
    {
        IInactivateItemsRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public InactivateItemsService(IInactivateItemsRepository repo, ILog log, ICommonRepository commonRepository)
        {
            _Repo = repo;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(InactivateItemsService));
        }                

        public AtParWebApiResponse<long> InactivateItems(List<TKIT_ITEM_MASTER> lstItemMaster)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                var StatusCode = _Repo.InactivateItems(lstItemMaster);

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
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

        public AtParWebApiResponse<VM_INACTIVE_ITEMS> GetItemsToInActivate(string typeIndicator, string destDate)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_INACTIVE_ITEMS>();

            try
            {
                response.DataList = _Repo.GetItemsToInActivate(typeIndicator, destDate);

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

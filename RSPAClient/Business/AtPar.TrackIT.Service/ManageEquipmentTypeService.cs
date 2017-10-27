using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;

namespace AtPar.TrackIT.Service
{
    public class ManageEquipmentTypeService : IManageEquipmentTypeService
    {
        IManageEquipmentTypeRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ManageEquipmentTypeService(IManageEquipmentTypeRepository repo, ILog log, ICommonRepository commonRepository)
        {
            _Repo = repo;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ManageEquipmentTypeService));
        }

        public AtParWebApiResponse<long> UpdateEqTypeData(TKIT_ITEM_TYPE itemType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                itemType.ReplaceProperty(c => c.ITEM_TYPE_DESCR);
                long StatusCode = _Repo.UpdateEqTypeData(itemType);

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

        public AtParWebApiResponse<long> SaveEqTypeData(TKIT_ITEM_TYPE itemType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                var isEqTypeExists = _Repo.IsItemTypeExistOrNot(itemType.ITEM_TYPE);

                if (isEqTypeExists)
                {
                    response.AtParNotOK(AtparStatusCodes.TKIT_E_EQTYPEALREADYEXISTS, _commonRepo, _log, itemType.ITEM_TYPE);
                    return response;
                }

                itemType.ReplaceProperty(c => c.ITEM_TYPE_DESCR);

                long StatusCode = _Repo.SaveEqTypeData(itemType);

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

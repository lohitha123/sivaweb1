using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.AssetManagement;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.AssetManagement;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AtPar.AssetManagement.Service
{
    public class AccessPermissionsService : IAccessPermissionsService
    {

        #region Private Variable

        IAccessPermissionsRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public AccessPermissionsService(IAccessPermissionsRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _repo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(AccessPermissionsService));

        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the Access Fields
        /// </summary>
        /// <param name="appId"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="userId"></param>
        /// <param name="screenName"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_UI_FIELDS> GetAccessFields(string appId, string orgGroupId, string userId, string screenName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_UI_FIELDS>();

            try
            {
                List<MT_ATPAR_UI_FIELDS> lstAccessFieldDetails = _repo.GetAccessFieldDetails();
                List<MT_ATPAR_UI_SETUP> lstAllocatedAccessFieldDetails = _repo.GetAllocatedAccessFieldDetails(appId, orgGroupId, userId, screenName);

                if (lstAllocatedAccessFieldDetails.Count > 0)
                {
                    foreach (var allocAccessField in lstAccessFieldDetails)
                    {
                        var result = lstAllocatedAccessFieldDetails.Where(x => x.FIELD_NAME == allocAccessField.FIELD_NAME).FirstOrDefault();

                        if (result != null)
                        {
                            allocAccessField.DISPLAY_FLAG = result.DISPLAY_FLAG;
                            allocAccessField.EDIT_FLAG = result.EDIT_FLAG;
                            allocAccessField.USER_ID = result.USER_ID;
                            allocAccessField.SCAN_ORDER = result.SCAN_ORDER;
                        }
                    }
                }

                int rowIndex = 0;
                foreach (var item in lstAccessFieldDetails)
                {
                    item.ROWINDEX = rowIndex;
                    rowIndex++;
                }
                response.DataList = lstAccessFieldDetails;
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
        /// Updates the Access Fields
        /// </summary>
        /// <param name="lstAccessFieldDetails"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateAccessFields(List<MT_ATPAR_UI_SETUP> lstAccessFieldDetails, string orgGroupId, string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _repo.DeleteAccessFields(userId);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    StatusCode = _repo.InsertAccessFields(lstAccessFieldDetails, orgGroupId, userId);

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

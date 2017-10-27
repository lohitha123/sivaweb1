using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.ParManagement;
using AtPar.Service.Interfaces.ParManagement;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ParManagement.Service
{
    public class ManageParLocationsService: IManageParLocationsService
    {
        #region Private Variables

        IManageParLocationsRepository _Repo;
        private ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor
        public ManageParLocationsService(IManageParLocationsRepository parLocRepo, ILog log, ICommonRepository commonRepository)
        {
            _Repo = parLocRepo;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(SetupParLocationsService));
        }

        #endregion

        #region GetLocationHeader
        public AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS> GetMultipleLocations(string orgID, string locID, string locName,
                                                                string orgGroupID, string depID, string depName,
                                                                string itemID, string itemName, string priceFrom,
                                                                string priceTo, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS>();

            orgID = orgID.ReplaceNullwithEmpty();
            locID = locID.ReplaceNullwithEmpty();
            locName = locName.ReplaceNullwithEmpty();
            orgGroupID = orgGroupID.ReplaceNullwithEmpty();
            depID = depID.ReplaceNullwithEmpty();
            depName = depName.ReplaceNullwithEmpty();
            itemID = itemID.ReplaceNullwithEmpty();
            itemName = itemName.ReplaceNullwithEmpty();
            priceFrom = priceFrom.ReplaceNullwithEmpty();
            priceTo = priceTo.ReplaceNullwithEmpty();

            try
            {
                response.DataList = _Repo.GetMultipleLocations(orgID, locID, locName, orgGroupID, depID, depName, itemID, itemName,
                                                               priceFrom, priceTo, appID, deviceTokenEntry);

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region GetItemsToAddMultipleParLocations
        public AtParWebApiResponse<VM_PAR_MNGT_PAR_LOCATION> GetItemsToAddMulParLocReqTypeU(string itemID, string orgGroupID, string orgID,
                                                                                    string parLocIDs, string appID)

        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_PAR_MNGT_PAR_LOCATION>();

            orgGroupID = orgGroupID.ReplaceNullwithEmpty();
            parLocIDs = parLocIDs.ReplaceNullwithEmpty();

            try
            {
                response.DataList = _Repo.GetItemsToAddMulParLocReqTypeU(itemID, orgGroupID, orgID, parLocIDs, appID);
                
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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        public AtParWebApiResponse<VM_PAR_MNGT_PAR_HEADER> GetItemsToAddMulParLoc(string itemID, string orgGroupID, string orgID, 
                                                                                   string parLocIDs, string appID)

        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_PAR_MNGT_PAR_HEADER>();

            orgGroupID = orgGroupID.ReplaceNullwithEmpty();
            parLocIDs = parLocIDs.ReplaceNullwithEmpty();

            try
            {
                response.DataList = _Repo.GetItemsToAddMulParLoc(itemID, orgGroupID, orgID, parLocIDs, appID);

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region UpdateMultipleParItems
        public AtParWebApiResponse<long> UpdateMultipleParItems(List<PAR_MNGT_PAR_LOC_DETAILS> lstItems, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();
            long statusCode = -1;
            try
            {
                statusCode = _Repo.UpdateMultipleParItems(lstItems, deviceTokenEntry);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion
    }
}

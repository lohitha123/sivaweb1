using AtPar.Service.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.POCOEntities;
using log4net;
using AtPar.Repository.Interfaces.Init;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;

namespace AtPar.Init.Service
{
    public class ManageDevicesService : IManageDevicesService
    {
        #region Private Variables

        private ILog _log;

        private IManageDevicesRepository _repo;

        private ICommonRepository _commonRepo;

        #endregion

        #region Constructor 

        public ManageDevicesService(ILog log, IManageDevicesRepository repo, ICommonRepository commonRepo)
        {
            _repo = repo;
            _commonRepo = commonRepo;
            _log = log;
            _log.SetLoggerType(typeof(ManageDevicesService));
        }

        #endregion

        private long CheckIsDevIDExistOrNot(string userID, string devID, string macAddr, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }        

            try
            {
                var deviceCount = _repo.CheckIsDevIDExistOrNot(userID, devID, macAddr, deviceTokenEntry);
                if (deviceCount > 0)
                {
                    return AtparStatusCodes.E_ITEMEXISTS;                   
                }
                return AtparStatusCodes.ATPAR_OK;              
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }              
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
        }

        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> DisableDevIDs(string userID, string devID, string desc, string macAddr, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES>();

            try
            {

                var inactive =_repo.UpdateDevStatus_Inactive(userID, devID, deviceTokenEntry);
                if (inactive != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(inactive, _commonRepo, _log);              
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.ExceptionMessage = ex.ToString();
                response.StatType = AtParWebEnums.StatusType.Error;
                return response;
            }
        }

        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> GetDevIDs(string userID, string search, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES>();

            try
            {
               var deviceList= _repo.GetDevIDs(userID,search,deviceTokenEntry);

                if(deviceList.Count>0)
                {
                    response.DataList = deviceList;
                    response.AtParSuccess();
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                }
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> SaveDevIDs(string userID, string devID, string desc, string macAddr, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES>();

            try
            {
                var deviceCount = _repo.CheckIsDevIDExistOrNot(userID, devID, macAddr, deviceTokenEntry);
                if (deviceCount > 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION, _commonRepo, _log);
                    return response;
                }   
                var saveIDStatus = _repo.SaveDevIDs(userID, devID, desc, macAddr, deviceTokenEntry);
                if (saveIDStatus != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(saveIDStatus, _commonRepo, _log);
                    return response;
                }

                response.StatusCode = saveIDStatus;
                response.StatType = AtParWebEnums.StatusType.Success;
                return response;
               
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> UpdateDevIDs(string userID, string devID, string desc,string oldMacAddr, string newMacAddr, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES>();

            try
            {
              
                var devUpdateStatus = _repo.UpdateDevIDs(userID, devID, desc, oldMacAddr, newMacAddr, deviceTokenEntry);

                if (devUpdateStatus != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(devUpdateStatus, _commonRepo, _log);
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

        public AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> UpdateDevStatus(string userID, string strDevID, string Status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES>();

            try
            {
                if (Status.ToUpper() == "ACTIVE")
                {
                    var statusInactive =_repo.UpdateDevStatus_Inactive(userID, strDevID, deviceTokenEntry);
                    if (statusInactive != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusInactive, _commonRepo, _log);  
                        return response;
                    }                    
                }
                else
                {
                    var statusActive =_repo.UpdateDevStatus_Active(userID, strDevID, deviceTokenEntry);
                    if (statusActive != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusActive, _commonRepo,_log);
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

    }
}

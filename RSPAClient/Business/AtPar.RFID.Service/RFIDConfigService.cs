using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.RFID;
using AtPar.Service.Interfaces.RFID;
using log4net;
using System;
using System.Collections.Generic;
using Symbol.RFID3;

namespace AtPar.RFID.Service
{
    public class RFIDConfigService: IRFIDConfigService
    {
        IRFIDConfigRepository _rfidConfigRepo;
        ILog _log;
        ICommonRepository _commonRepo;
       
        public RFIDConfigService(ILog log, IRFIDConfigRepository rfidConfigRepo, ICommonRepository commonRepo)
        {
            _rfidConfigRepo = rfidConfigRepo;
            _log = log;
            _commonRepo = commonRepo;
            _log.SetLoggerType(typeof(IRFIDConfigRepository));
        }

        public AtParWebApiResponse<RF_READER_CONFIGURATION_DETAILS> GetReaderConfigList(string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            var response = new AtParWebApiResponse<RF_READER_CONFIGURATION_DETAILS>();
            try
            {
                response.DataList = _rfidConfigRepo.GetReaderConfigList();

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

        public AtParWebApiResponse<long> UpdateReaderConfiguration(RF_READER_CONFIGURATION_DETAILS config, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            //StringBuilder _sbSQL = new StringBuilder();
            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _rfidConfigRepo.UpdateReaderConfiguration(config);

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

        public AtParWebApiResponse<long> AddReaderConfig(RF_READER_CONFIGURATION_DETAILS objConfig, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _rfidConfigRepo.AddReaderConfig(objConfig);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    string friendlyName = objConfig.CONFIG_ID.ToString();
                    response.AtParNotOK(StatusCode, _commonRepo, _log, friendlyName);
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

        public AtParWebApiResponse<long> SetDefaultConfig(int ConfigID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _rfidConfigRepo.SetDefaultConfig(ConfigID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    string friendlyName = ConfigID.ToString();
                    response.AtParNotOK(StatusCode, _commonRepo, _log, friendlyName);
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

        public AtParWebApiResponse<long> DeleteReaderConfig(long configId, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                 long StatusCode = _rfidConfigRepo.DeleteReaderConfig(configId);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log, configId.ToString());
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
        public AtParWebApiResponse<string> TestReaderConnection(string strIp, string intPort)
        {
            var response = new AtParWebApiResponse<string>();
            RFIDReader m_ReaderAPI = null;
            try
            {

                m_ReaderAPI = new RFIDReader(strIp, Convert.ToUInt32(intPort), (uint)0);
                m_ReaderAPI.Connect();
                if (m_ReaderAPI.IsConnected)
                {
                    response.StatType = AtParWebEnums.StatusType.Success;
                    response.StatusCode = AtparStatusCodes.ATPAR_OK;
                }
                else
                {
                    response.StatType = AtParWebEnums.StatusType.Warn;
                    response.StatusMessage = "Connection Failed";
                }

                return response;
            }
            catch (Exception ex)
            {

                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
            finally
            {
                m_ReaderAPI.Disconnect();
                m_ReaderAPI = null;
            }

        }


        public AtParWebApiResponse<string> TestPrint()
        {
            var response = new AtParWebApiResponse<string>();
            try
            {

                response.StatType = AtParWebEnums.StatusType.Success;
                response.StatusCode = AtparStatusCodes.ATPAR_OK;
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

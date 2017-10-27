using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using log4net;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Service
{
  public  class DataArchivalService: IDataArchivalService
    {
        IDataArchivalRepository _dataArchivalRepo;
        ICommonRepository _repo;
        ILog _log;
        public DataArchivalService(ILog log, IDataArchivalRepository dataArchivalRepo,ICommonRepository repo)
        {
            _dataArchivalRepo = dataArchivalRepo;
            _log = log;
            _repo = repo;
        }
        public AtParWebApiResponse<MT_ATPAR_CONFIGURATION_SECTION_DTLS> DoArchivalData(string appID, string archiveDate, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string archiveServer = string.Empty;
            string archiveDataSource = string.Empty;
            string archiveUserID = string.Empty;
            string archivePwd = string.Empty;
            string dbConnectionString = string.Empty;
            long retMsg;
            AtParWebApiResponse<MT_ATPAR_CONFIGURATION_SECTION_DTLS> response = new AtParWebApiResponse<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            try
            {
                var archiveDetails = _dataArchivalRepo.DoArchivalData(appID, archiveDate, deviceTokenEntry);

                if (archiveDetails.Count > 0)
                {
                    archiveServer = archiveDetails.Where(a => a.PARAMETER_ID ==AtParWebEnums.SYSTEMDBCONNECTION.ARCHIVE_SERVER.ToString()).Select(a => a.PARAMETER_VALUE).FirstOrDefault();

                    archiveDataSource = archiveDetails.Where(a => a.PARAMETER_ID == AtParWebEnums.SYSTEMDBCONNECTION.ARCHIVE_DATASOURCE.ToString()).Select(a => a.PARAMETER_VALUE).FirstOrDefault();

                    archiveUserID = archiveDetails.Where(a => a.PARAMETER_ID == AtParWebEnums.SYSTEMDBCONNECTION.ARCHIVE_USERID.ToString()).Select(a => a.PARAMETER_VALUE).FirstOrDefault();

                    archivePwd = archiveDetails.Where(a => a.PARAMETER_ID == AtParWebEnums.SYSTEMDBCONNECTION.ARCHIVE_PASSWORD.ToString()).Select(a => a.PARAMETER_VALUE).FirstOrDefault();
                }
                
                AtParEncryptionServices.Encryption encryption = new AtParEncryptionServices.Encryption();


                if (!string.IsNullOrEmpty(archiveDataSource) && !string.IsNullOrEmpty(archiveUserID)
                    && !string.IsNullOrEmpty(archiveServer) && !string.IsNullOrEmpty(archivePwd))
                {
                    dbConnectionString = "Server=" + archiveServer + ";Database=" + archiveDataSource + ";User ID=" +archiveUserID + ";Password="
                        + encryption.Decrypt(archivePwd) + ";Trusted_Connection=False";

                    retMsg = GetArchiveDataBaseConnection(dbConnectionString);

                    if (retMsg != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_INVALID_ARCHIVE_DATABASE,_repo,_log);                        
                        return response;
                    }
                    var result = _dataArchivalRepo.DoArchivalData_DataArchiving(appID, archiveDate, archiveDataSource, archiveUserID, deviceTokenEntry);
                    if (result != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(result, _repo, _log);
                        return response;
                    }
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NO_ARCHIVE_DATABASE, _repo, _log);                   
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {                
                response.AtParException(ex, _repo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<MT_ATPAR_APP> GetPurgeAppIDs(string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            AtParWebApiResponse<MT_ATPAR_APP> response = new AtParWebApiResponse<MT_ATPAR_APP>();
            try
            {
                var apps = _dataArchivalRepo.GetPurgeAppIDs(deviceTokenEntry);

                if (apps.Count > 0)
                {
                    response.DataList = apps;
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _repo, _log);                    
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _repo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);                
                return response;
            }
        }

        private long GetArchiveDataBaseConnection(string pdbConnectionString)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            GenericDatabase _db = null;           
            try
            {
                _db = new GenericDatabase(pdbConnectionString, System.Data.SqlClient.SqlClientFactory.Instance);
                _db.CreateConnection();
                _db.CreateConnection().Open();
                _db.CreateConnection().Close();
                _db.CreateConnection().Dispose();
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }
    }
}

using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace AtPar.Init.Service
{
    public class ErrorReportService : IErrorReportService
    {
        private ILog _log;
        private IErrorReportRepository _repo;
        private ICommonRepository _commonRepo;
        public ErrorReportService(ILog log, IErrorReportRepository repo, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
        }

        public AtParWebApiResponse<long> GetErrorReport(string userID, string fromDate, string toDate, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            DataSet pdsErrorData = new DataSet();

            try
            {
                var result = _repo.GetErrorReport(userID, fromDate, toDate, deviceTokenEntry);

                 pdsErrorData = result.Item1;
                statusCode = result.Item2;

                var dictionaryResult = new Dictionary<string, object> { { "pdsErrorData", pdsErrorData } };

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                response.DataDictionary = dictionaryResult;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> PopulateConfigData(string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strProtocol = null;
            string _strServerName = null;
            string _strSearchFilter = null;
            string _strUserIDFilter = null;
            string _strFirstNameFilter = null;
            string _strLastNameFilter = null;
            string _strErrorPath = null;
            DataTable _dtTbl = null;
            DataRow _dtRow = null;
            DataSet pDSConfigData = new DataSet();
            var response = new AtParWebApiResponse<long>();
            try
            {
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString().ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.USERID.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString());
                lstParameters.Add(AtParWebEnums.LDAPCONFIG.LASTNAME.ToString());
                lstParameters.Add(AtParWebEnums.SYSTEMPARAMETERS.ERRORLOGPATH.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                _strProtocol= lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _strServerName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _strSearchFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _strUserIDFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.USERID.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _strFirstNameFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString())
                                                            .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _strLastNameFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.LASTNAME.ToString())
                                                            .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _strErrorPath = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.SYSTEMPARAMETERS.ToString() && x.PARAMETER_ID == AtParWebEnums.SYSTEMPARAMETERS.ERRORLOGPATH.ToString())
                                                           .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _dtTbl = new DataTable();
                _dtTbl.Columns.Add(AtParWebEnums. LDAPCONFIG.PROTOCOL.ToString(), Type.GetType("System.String"));
                _dtTbl.Columns.Add(AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString(), Type.GetType("System.String"));
                _dtTbl.Columns.Add(AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString(), Type.GetType("System.String"));
                _dtTbl.Columns.Add(AtParWebEnums.LDAPCONFIG.USERID.ToString(), Type.GetType("System.String"));
                _dtTbl.Columns.Add(AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString(), Type.GetType("System.String"));
                _dtTbl.Columns.Add(AtParWebEnums.LDAPCONFIG.LASTNAME.ToString(), Type.GetType("System.String"));
                _dtTbl.Columns.Add(AtParWebEnums.SYSTEMPARAMETERS.ERRORLOGPATH.ToString(), Type.GetType("System.String"));

                _dtRow = _dtTbl.NewRow();
                _dtRow[AtParWebEnums.LDAPCONFIG.PROTOCOL.ToString()] = _strProtocol;
                _dtRow[AtParWebEnums.LDAPCONFIG.SERVERNAME.ToString()] = _strServerName;
                _dtRow[AtParWebEnums.LDAPCONFIG.SEARCHFILTER.ToString()] = _strSearchFilter;
                _dtRow[AtParWebEnums.LDAPCONFIG.USERID.ToString()] = _strUserIDFilter;
                _dtRow[AtParWebEnums.LDAPCONFIG.FIRSTNAME.ToString()] = _strFirstNameFilter;
                _dtRow[AtParWebEnums.LDAPCONFIG.LASTNAME.ToString()] = _strLastNameFilter;
                _dtRow[AtParWebEnums.SYSTEMPARAMETERS.ERRORLOGPATH.ToString()] = _strErrorPath;

                _dtTbl.Rows.Add(_dtRow);
                pDSConfigData.Tables.Add(_dtTbl);
                var dictionaryresult = new Dictionary<string, object> { { "pDSConfigData", pDSConfigData } };
                response.DataDictionary = dictionaryresult;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ": Failed to get the data  " + ex.ToString() + ":" + Environment.NewLine);
                }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }
    }
}

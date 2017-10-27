using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.CartCount;
using log4net;
using System;
using System.Collections.Generic;

namespace AtPar.CartCount.Service
{
    public class ScheduleComplianceReportService : IScheduleComplianceReportService
    {
        private ILog _log;
        private IScheduleComplianceReportRepository _repo;
        private ICommonRepository _commonRepo;
        public ScheduleComplianceReportService(ILog log, IScheduleComplianceReportRepository repo, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
        }

        public AtParWebApiResponse<long> GetCartSchedComplianceRep(string SvrUser, string userID, DateTime dt, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
           
            try
            {
                var result = _repo.GetCartSchedComplianceRep( SvrUser,  userID,  dt,  orgGrpID);

                var dsCompRep = result.Item1;
                statusCode = result.Item2;

                var dictionaryResult = new Dictionary<string, object> { { "dsCompRep", dsCompRep } };

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

        public AtParWebApiResponse<long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();


            try
            {
                var result = _repo.GetHeirarchyUsersList(orgGrpID, appID, userID);

                var pDSUserList = result.Item1;
                statusCode = result.Item2;

                var dictionaryResult = new Dictionary<string, object> { { "pDSUserList", pDSUserList } };

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
    }
}

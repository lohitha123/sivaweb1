using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.Repository.Interfaces.POU;
using AtPar.Repository.Interfaces.Common;
using log4net;
using AtPar.Service.Interfaces.POU;
using AtPar.Common.Service;

namespace AtPar.POU.Service
{
    public class PhysicianUsageReportService : IPhysicianUsageReportService
    {
        IPhysicianUsageReportRepository _physicianUsageReportRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        private ICommonPOUService _commonPOUService;
        public PhysicianUsageReportService(IPhysicianUsageReportRepository physicianUsageReportRepo, ILog log, ICommonPOUService commonPOUService,
            ICommonRepository commonRepository)
        {
            _physicianUsageReportRepo = physicianUsageReportRepo;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOUService = commonPOUService;
            _log.SetLoggerType(typeof(PhysicianUsageReportService));
        }
        public AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_HEADER> GetPhysicianUsage(string pStrPhysicianID, string pStrProcedure, string pStrFromDate, string pStrToDate, string OrgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }



            var response = new AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_HEADER>();

            try
            {

                response.DataList = _physicianUsageReportRepo.GetPhysicianUsage(pStrPhysicianID, pStrProcedure, pStrFromDate, pStrToDate, OrgGrpID);
                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
           
        }

        public AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_DETAILS> GetPhysicianCompareDetails(List<VM_POU_PHYSICIAN_USAGE_HEADER> lstPhysicianUsageHeader)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_DETAILS>();

            try
            {

                response.DataList = _physicianUsageReportRepo.GetPhysicianCompareDetails(lstPhysicianUsageHeader);
                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
    }
}

using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Deliver;
using AtPar.Service.Interfaces.Deliver;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;

namespace AtPar.Deliver.Service
{
    public class ReleasePackagesService : IReleasePackagesService
    {
        IReleasePackagesRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ReleasePackagesService(ILog log, ICommonRepository commonRepository, IReleasePackagesRepository repo)
        {
            _log = log;
            _commonRepo = commonRepository;
            _Repo = repo;
            _log.SetLoggerType(typeof(ReleasePackagesService));
        }


       public  AtParWebApiResponse<VM_RELEASEPACKAGES> GetReleasePackages(int appId, string userId, string orgGroupId, string bunit, 
           string trckNoOrPoIdOrLoc, string[] deviceTokenEntry, string flag = "", string transId = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            userId = userId.ReplaceNullwithEmpty().ReplaceString();
            orgGroupId = orgGroupId.ReplaceNullwithEmpty().ReplaceString();
            bunit = bunit.ReplaceNullwithEmpty().ReplaceString();
            trckNoOrPoIdOrLoc = trckNoOrPoIdOrLoc.ReplaceNullwithEmpty().ReplaceString();
            
            var response = new AtParWebApiResponse<VM_RELEASEPACKAGES>();

            try
            {
                response.DataList = _Repo.GetReleasePackages(appId, userId, orgGroupId, bunit, trckNoOrPoIdOrLoc, deviceTokenEntry, flag, transId);

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

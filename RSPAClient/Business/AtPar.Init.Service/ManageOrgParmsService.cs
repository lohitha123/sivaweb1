using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Service
{
    public class ManageOrgParmsService : IManageOrgParmsService
    {
        IManageOrgParmsRepository _manageorgparamsRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ManageOrgParmsService(IManageOrgParmsRepository manageorgparamsRepo, ILog log, ICommonRepository commonRepository)
        {
            _manageorgparamsRepo = manageorgparamsRepo;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ManageOrgParmsService));
        }    

        
    }
}

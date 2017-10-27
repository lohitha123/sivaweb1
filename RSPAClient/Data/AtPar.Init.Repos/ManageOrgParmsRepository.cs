using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Repos
{
    public class ManageOrgParmsRepository : IManageOrgParmsRepository
    {
        private ILog _log;
        ICommonRepository _commonRepo;
        public ManageOrgParmsRepository(ILog log, ICommonRepository commonRepo)
        {
            _log = log;
            _commonRepo = commonRepo;
            _log.SetLoggerType(typeof(ManageOrgParmsRepository));
        }
        
        
        
    }
}

using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface ISecurityConfigurationRepository
    {
        long UpdateSecurityParams(MT_ATPAR_SECURITY_PARAMS securityParams);
    }
}

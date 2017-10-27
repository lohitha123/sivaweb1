using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
   public interface ISecurityConfigurationService
    {     
        AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS> UpdateSecurityParams(MT_ATPAR_SECURITY_PARAMS securityParams);
    }
}

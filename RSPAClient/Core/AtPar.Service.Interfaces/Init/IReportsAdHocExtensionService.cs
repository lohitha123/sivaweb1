using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IReportsAdHocExtensionService
    {
        AtParWebApiResponse<Dictionary<string, object>> GetOrgGroupsProductUsers(string userID, Guid? reportID);
    }
}

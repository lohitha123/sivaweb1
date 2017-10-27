using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.StockIssue
{
    public interface IDistributionTypesService
    {
        AtParWebApiResponse<MT_STIS_DISTRIB_TYPE> GetDistributionTypes(string distributionType, string userID, string orgGroupID, string[] deviceTokenEntry);

        AtParWebApiResponse<MT_STIS_DISTRIB_TYPE> AllocateDistributionTypes(string loginUserID, string selectedUserID,
                                   List<MT_STIS_DISTRIB_TYPE> lstDistAllocation, bool searched, params string[] deviceTokenEntry);
    }
}

using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.StockIssue
{
    public interface IDistributionTypesRepository
    {
        List<MT_STIS_DISTRIB_TYPE> GetDistributionTypes(string distributionType);
        long ProcessDistributionTypes(string loginUserID, string selectedUserID, List<MT_STIS_DISTRIB_TYPE> lstDistTypes);
        long ProcessSelectedDistributionTypes(string loginUserID, string selectedUserID, List<MT_STIS_DISTRIB_TYPE> lstDistTypes);
    }
}

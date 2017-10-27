using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.AssetManagement
{
    public interface IAccessPermissionsService
    {
        AtParWebApiResponse<MT_ATPAR_UI_FIELDS> GetAccessFields(string appId, string orgGroupId, string userId, string screenName);
        AtParWebApiResponse<long> UpdateAccessFields(List<MT_ATPAR_UI_SETUP> lstAccessFieldDetails, string orgGroupId, string userId);
    }
}
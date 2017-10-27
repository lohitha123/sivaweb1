using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.AssetManagement
{
    public interface IAccessPermissionsRepository
    {
        long DeleteAccessFields(string userId);
        List<MT_ATPAR_UI_FIELDS> GetAccessFieldDetails();
        List<MT_ATPAR_UI_SETUP> GetAllocatedAccessFieldDetails(string appId, string orgGroupId, string userId, string screenName);
        long InsertAccessFields(List<MT_ATPAR_UI_SETUP> lstAccessFieldDetails, string orgGroupId, string userId);
    }
}
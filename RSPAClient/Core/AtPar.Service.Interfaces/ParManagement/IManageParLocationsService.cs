using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.ParManagement
{
    public interface IManageParLocationsService
    {
        AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS> GetMultipleLocations(string orgID, string locID, string locName,
                                                                string orgGroupID, string depID, string depName,
                                                                string itemID, string itemName, string priceFrom,
                                                                string priceTo, int appID, string[] deviceTokenEntry);
        AtParWebApiResponse<VM_PAR_MNGT_PAR_LOCATION> GetItemsToAddMulParLocReqTypeU(string itemID, string orgGroupID, string orgID,
                                                                                    string parLocIDs, string appID);
        AtParWebApiResponse<VM_PAR_MNGT_PAR_HEADER> GetItemsToAddMulParLoc(string itemID, string orgGroupID, string orgID,
                                                                                   string parLocIDs, string appID);
        AtParWebApiResponse<long> UpdateMultipleParItems(List<PAR_MNGT_PAR_LOC_DETAILS> lstItems, string[] deviceTokenEntry);
    }
}

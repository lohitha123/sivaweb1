using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.ParManagement
{
    public interface IManageParLocationsRepository
    {
        List<VM_PAR_MNGT_SETUP_LOCATIONS> GetMultipleLocations(string orgID, string locID, string locName,
                                                          string orgGroupID, string depID, string depName,
                                                          string itemID, string itemName, string priceFrom,
                                                          string priceTo, int appID, string[] deviceTokenEntry);
        List<VM_PAR_MNGT_PAR_LOCATION> GetItemsToAddMulParLocReqTypeU(string itemID, string orgGroupID, string orgID,
                                             string parLocations, string appID);
        List<VM_PAR_MNGT_PAR_HEADER> GetItemsToAddMulParLoc(string itemID, string orgGroupID, string orgID,
                                              string parLocations, string appID);
        long UpdateMultipleParItems(List<PAR_MNGT_PAR_LOC_DETAILS> objParItems, string[] deviceTokenEntry);

    }
}

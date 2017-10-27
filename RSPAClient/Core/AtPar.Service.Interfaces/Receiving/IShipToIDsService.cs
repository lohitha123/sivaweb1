using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Receiving
{
    public interface IShipToIDsService
    {
        AtParWebApiResponse<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> GetShipToIDs(string userID, string orgGroupID, string setID, string shipToID, string shipToName,
            string[] businessUnits, string serverUserID, string[] deviceTokenEntry);

        AtParWebApiResponse<long> AllocateShipTOIDs(string userID, string serverUserID, bool searched, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstShipToIDs);
        AtParWebApiResponse<long> UpdateShiptoIDStatus(string userID, string orgID, string shipToID, bool status, string[] objToken);
        AtParWebApiResponse<long> InsertShiptoIDs(string userID, List<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> lstShiptoids, string[] objToken);
        AtParWebApiResponse<long> UpdateShiptoIDs(string userID, List<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> lstShiptoids, string NewOrgId, string[] objToken);
    }
}

using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.Receiving
{
    public interface IShipToIDsRepository
    {
        List<MT_RECV_SHIPTO_ID_ALLOCATION> GetLocalDbShipToIds();        
        long AllocateShipTOIDsSelected(string userID, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstLocalShipToIDs);
        long AllocateShipTOIDsAll(string userID, string serverUserID, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstLocalShipToIDs);
        int IsDefaultShiptoIDUnAllocated(string userID, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstShipToIds);
    }
}

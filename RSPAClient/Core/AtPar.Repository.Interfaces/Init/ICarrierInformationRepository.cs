#region Usings
using AtPar.POCOEntities;
using System.Collections.Generic;

#endregion

namespace AtPar.Repository.Interfaces.Init
{
    public interface ICarrierInformationRepository
    {
        long UpdateCarrierStaus();
        List<MT_RECV_CARRIER> GetCarrierInformation(string carrierID);
        long UpdateCarrierInformation(MT_RECV_CARRIER localDbcarriers, string carrierID, string descr, string userID);
        long InsertCarrierInformation(string carrierID, string descr, string userID);
        long UpdateCarrierStaus(string userID);
        List<MT_RECV_CARRIER> GetCarriersData();
        long AddCarrier(string carrierID, string descr, string userID);
        long DeleteCarrier(string carrierID, string userID);
    }
}

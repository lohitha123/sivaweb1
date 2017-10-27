#region Usings
using AtPar.Common;
using AtPar.POCOEntities;

#endregion

namespace AtPar.Service.Interfaces.Init
{
    public interface ICarrierInformationService
    {
        AtParWebApiResponse<long> GetCarriers(string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_RECV_CARRIER> GetCarriersData();
        AtParWebApiResponse<long> AddCarrier(string carrierID, string descr, string userID);
        AtParWebApiResponse<long> DeleteCarrier(string carrierID, string userID);
    }
}

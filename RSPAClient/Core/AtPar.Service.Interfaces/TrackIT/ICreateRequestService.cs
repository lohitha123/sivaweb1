using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface ICreateRequestService
    {
        AtParWebApiResponse<VM_TKIT_EQPITEMS> GetEquipmentItems(string eqpType, string itemDescr, string[] deviceTokenEntry);
        AtParWebApiResponse<TKIT_ITEM_TYPE> GetEquipmentType(string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<VM_TKIT_EQPITEMS> GetSearchItems(string itemID, string itemDescr, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE> GetPatientList();
        AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE> GetPatientList(string itemID, string[] deviceTokenEntry);
        AtParWebApiResponse<TKIT_ITEM_MASTER> GetItemsForAutoSearch(string eqType, string eqpInidcator, string[] deviceTokenEntry);
    }
}

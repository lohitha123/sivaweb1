using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface ICreateRequestRepository
    {
        Tuple<string, List<VM_TKIT_EQPITEMS>> GetEquipmentItems(string eqpType, string itemDescr, string[] deviceTokenEntry);
        List<TKIT_ITEM_TYPE> GetEquipmentType(string userID, string[] deviceTokenEntry);
        List<VM_TKIT_EQPITEMS> GetSearchItems(string itemID, string itemDescr, string userID, string[] deviceTokenEntry);
        List<MT_ATPAR_PATIENT_CACHE> GetPatientList();
        List<MT_ATPAR_PATIENT_CACHE> GetPatientList(string itemID, string[] deviceTokenEntry);
        List<TKIT_ITEM_MASTER> GetItemsForAutoSearch(string eqType, string eqpInidcator, string[] deviceTokenEntry);
    }
}

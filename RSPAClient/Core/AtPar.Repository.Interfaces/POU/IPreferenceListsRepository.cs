using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IPreferenceListsRepository
    {          
        long AddPreferenceListHeader(string prefListID, string prefListDesc, string deptID, string userID, string procedureID, string physicianID);
        long DeletePreferenceList(string prefListID, string procedureID);
        long DisablePrefList(string prefListID, string procedureID, string status,string[] deviceTokenEntry);
        long UpdatePreferenceListItem(string prefListID, string procedureID, string itemID, string itemQty, string holdQty, string[] deviceTokenEntry);
        long AddPreferenceListItem(string prefListID, string procedureID, string itemID, string itemDesc, string itemQty, string holdQty, string userID, string custItemNo);
        long DeletePreferenceListItem(string prefListID, string procedureID, string itemID, string[] deviceTokenEntry);
    }
}

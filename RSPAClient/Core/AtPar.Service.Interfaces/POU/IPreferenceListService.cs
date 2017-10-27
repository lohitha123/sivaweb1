using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IPreferenceListService
    {      
        AtParWebApiResponse<long> AddPreferenceListHeader(string prefListID, string prefListDesc, string deptID, string userID, string procedureID, string physicianID);
        AtParWebApiResponse<long> DeletePreferenceList(string prefListID, string procedureID);
        AtParWebApiResponse<long> DisablePrefList(string prefListID, string procedureID, string status,string[] deviceTokenEntry);
        AtParWebApiResponse<long> UpdatePreferenceListItem(string prefListID, string procedureID, string itemID, string itemQty, string holdQty, string[] deviceTokenEntry);
        AtParWebApiResponse<long> AddPreferenceListItem(string prefListID, string procedureID, string itemID, string itemDesc, string itemQty, string holdQty, string userID, string custItemNo);
        AtParWebApiResponse<long> DeletePreferenceListItem(string prefListID, string procedureID, string itemID, string[] deviceTokenEntry);
    }
}

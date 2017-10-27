using AtPar.Common;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace AtPar.Service.Interfaces.POU
{
    public interface ISetupItemAttributesService
    {
        AtParWebApiResponse<string> SaveDeptItemAttributes(List<VM_MT_POU_ITEM_ATTRIBUTES> lstItemAtributes, string deptID, string bUnit, string locationType, string itemID, string orgGrpID, string userID);
      

        AtParWebApiResponse<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT> GetItemAttributesDetails(string deptID, string bUnit,
            int display, string cartID,
            string locationType, string itemID, string[] deviceTokenEntry);

         
    }
}

using System;
using System.Collections.Generic;
using System.Data;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IQuantityOnHandReportRepository
    {
        long GetQtyOnHandItems(string businessUnit, string cartID,
            string itemID, string serialNumber, string lotNumber, string orgGrpID,
            bool negativeStatus, int appID, ref DataSet qtyOnHandDataDS);

        long GetChargeCaptureDetailsForCart(string bUnit, string cartID,
             ref DataSet dsChargeCaptureDetails);

        Tuple<DataSet, long> GetManagementVendor(string userID);

        long GetBillOnlyItems(string deptID, ref DataSet dsBillOnlyItems, string[] deviceTokenEntry);

        Tuple<List<string>, long> GetDepartmentID(string userID);
    }
}

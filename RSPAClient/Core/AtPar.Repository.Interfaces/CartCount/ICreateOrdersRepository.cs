using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface ICreateOrdersRepository
    {
  
        List<MT_ATPAR_TRANSACTION> GetTransactionRecords(string orgGroupID, string BusinessUnit, string ID);
        Tuple<List<string>, List<string>> GetItemIds(string IDs);
        List<VM_ATPAR_CART_PREV_COUNTS> GetItemIdDetails(string IDs, string dateValue1, string dateValue2, string dateValue3, string dateValue4, string dateValue5);
        List<VM_ATPAR_CART_PREV_COUNTS> GetDetailsForRepeatedIds(string IDs, string dateValue1, string dateValue2, string dateValue3, string dateValue4, string dateValue5);

        string GetCostCenter(DataSet dsDataItems);
        long InsertPreviousCounts(DataSet inputParameter, DataRow dataRow);
        long InsertParAudit(DataSet inputParameter, DataRow dataRow);
        string GetCountBefore(DataSet inputParameter);
        long InsertDeviation(AtPar_Deviation_Entity deviationDetails);
        Tuple<Double, string> GetOrderQty(string businessUnit, string cartPutaway, string cartId, string compartment, string itemId);
    }
}

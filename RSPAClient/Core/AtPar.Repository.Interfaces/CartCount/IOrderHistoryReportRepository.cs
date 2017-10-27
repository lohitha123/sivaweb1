using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface IOrderHistoryReportRepository
    {
        Tuple<DataSet, long> GetRequisitionNo(string ids, string user);
        Tuple<DataSet, long> selectTransaction(string bUnit, string parLoc);
        Tuple<DataSet, long> getCriticalItems(string bUnit, string cartID);
    }
}

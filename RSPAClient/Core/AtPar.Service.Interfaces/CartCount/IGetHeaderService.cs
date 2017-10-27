using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IGetHeaderService
    {
        Tuple<long, DataSet> GetHeader(string userID,string bUnit, string cartID, string fldOrdBy, string order, string[] objToken);
        void GetConfigData();
    }
}

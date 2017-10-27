using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface ICommonCartCountService
    {
        Tuple<long, DataSet> GetCartHeaders(DataTable cartHeaderData, DataTable cartPreReqData, 
                                            DataTable cartBusinessUnit, string fldOrdBy, string order, 
                                            string bUnit, string[] objToken, string orgGroupID, 
                                            string cartsMngdInAtPar);
        void GetConfigData();
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IGetDetailsService
    {
        Tuple<long, DataSet> GetDetails(string orgGroupID, string businessUnit, string cartID, string[] deviceTokenEntry);
        Tuple<long, DataSet> GetCartDetails(string erpObjName, DataSet inputParameters, DataSet outputParameters, string[] objToken);
    }
}

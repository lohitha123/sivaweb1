using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CartCount
{
   public interface ICreateOrdersService
    {
        AtParWebApiResponse<VM_CRCT_USER_ALLOCATION> GetCartsForBunit(string serverUser, string businessUnit,
                                                                     string orgGroupID, params string[] deviceTokenEntry);    
        AtParWebApiResponse<long> GetCartPrevCounts(string orgGroupID, string businessUnit, string ID, string serverUser,
                                                          string profileID, params string[] deviceTokenEntry);
        AtParWebApiResponse<MT_CRCT_USER_ALLOCATION> SendCartCounts(Dictionary<string, dynamic> dicDataItems, string serverUser, string businessUnit, string ID, string profileID, string orgGroupID, int transID, params string[] deviceTokenEntry);


    }
}

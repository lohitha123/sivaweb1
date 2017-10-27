using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.ParManagement
{
    public interface IVendorService
    {
        AtParWebApiResponse<PAR_MNGT_VENDOR> CreateVendor(PAR_MNGT_VENDOR vendor);
        AtParWebApiResponse<PAR_MNGT_VENDOR> GetVendorDetails(string vendorID, string orgGroupID, string search);
        AtParWebApiResponse<PAR_MNGT_VENDOR> UpdateVendor(PAR_MNGT_VENDOR vendor);
        AtParWebApiResponse<PAR_MNGT_VENDOR> UpdateVendorStatus(int status, string vendorID);
        AtParWebApiResponse<AtParKeyValuePair> GetVendorUsers(string vendorID, string orgGroupID);

    }
}

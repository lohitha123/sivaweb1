using System.Collections.Generic;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.ParManagement
{
    public interface IVendorRepository
    {
        long CheckVendorExistOrNot(string vendorID);
        long CreateVendor(PAR_MNGT_VENDOR vendor);
        List<PAR_MNGT_VENDOR> GetVendorDetails(string vendorID, string orgGroupID, string search);
        List<AtParKeyValuePair> GetVendorUsers(string vendorID, string orgGroupID);
        long IsVendorHasItems(string vendorID);
        long UpdateVendor(PAR_MNGT_VENDOR vendor);
        long UpdateVendorStatus(int status, string vendorID);
    }
}
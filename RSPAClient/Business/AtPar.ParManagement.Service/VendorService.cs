using AtPar.Service.Interfaces.ParManagement;
using System;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.ParManagement;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.ViewModel;

namespace AtPar.ParManagement.Service
{
    public class VendorService : IVendorService
    {
        IVendorRepository _vendorRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public VendorService(IVendorRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _vendorRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(VendorService));
        }

        public AtParWebApiResponse<PAR_MNGT_VENDOR> CreateVendor(PAR_MNGT_VENDOR vendor)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_VENDOR>();

            try
            {
                long StatusCode = _vendorRepo.CheckVendorExistOrNot(vendor.VENDOR_ID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log, vendor.VENDOR_ID);
                    return response;
                }
                else
                {
                    vendor.ReplaceProperty(c => c.VENDOR_NAME);

                    StatusCode = _vendorRepo.CreateVendor(vendor);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                    response.AtParSuccess();
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<PAR_MNGT_VENDOR> GetVendorDetails(string vendorID, string orgGroupID, string search)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_VENDOR>();

            try
            {
                response.DataList = _vendorRepo.GetVendorDetails(vendorID, orgGroupID, search);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<PAR_MNGT_VENDOR> UpdateVendor(PAR_MNGT_VENDOR vendor)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_VENDOR>();

            try
            {
                vendor.ReplaceProperty(c => c.VENDOR_NAME);
                long StatusCode = _vendorRepo.UpdateVendor(vendor);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        //public AtParWebApiResponse<PAR_MNGT_VENDOR> UpdateVendorStatus(int status, string vendorID)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    var response = new AtParWebApiResponse<PAR_MNGT_VENDOR>();

        //    try
        //    {

        //        long StatusCode = _vendorRepo.IsVendorHasItems(vendorID);

        //        if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //        {
        //            response.AtParNotOK(StatusCode, _commonRepo, _log);
        //            return response;
        //        }
        //        else
        //        {
        //            StatusCode = _vendorRepo.UpdateVendorStatus(status, vendorID);

        //            if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //            {
        //                response.AtParNotOK(StatusCode, _commonRepo, _log);
        //                return response;
        //            }

        //            response.AtParSuccess();
        //            return response;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        response.AtParException(ex, _commonRepo, _log);
        //        return response;
        //    }

        //}

        public AtParWebApiResponse<PAR_MNGT_VENDOR> UpdateVendorStatus(int status, string vendorID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_VENDOR>();

            long StatusCode = -1;

            try
            {
                if (status == 1)
                {
                    StatusCode = _vendorRepo.IsVendorHasItems(vendorID);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                }

                StatusCode = _vendorRepo.UpdateVendorStatus(status, vendorID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;

               
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<AtParKeyValuePair> GetVendorUsers(string vendorID, string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<AtParKeyValuePair>();

            try
            {

                if (vendorID == "undefined" || vendorID == "null")
                {
                    vendorID = string.Empty;
                }

                response.DataList = _vendorRepo.GetVendorUsers(vendorID, orgGroupID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
    }
}

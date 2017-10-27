using System;
using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using log4net;
using AtPar.Repository.Interfaces.POU;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.Service.Interfaces.POU;
using AtPar_BusinessRules;
using System.Linq;
using POU_BillOnlyWorkflow;


namespace AtPar.POU.Service
{
    public class BillonlyAndConsignedItemsService : IBillonlyAndConsignedItemsService
    {
        ILog _log;
        IBillonlyAndConsignedItemsRepository _billOnlyItemRepo;
        ICommonRepository _commonRepo;
        public BillonlyAndConsignedItemsService(IBillonlyAndConsignedItemsRepository billonlyrepos, ILog log, ICommonRepository commonRepository)
        {
            _log = log;
            _billOnlyItemRepo = billonlyrepos;
            _commonRepo = commonRepository;
        }

        public AtParWebApiResponse<PAR_MNGT_VENDOR> GetVendorsInfo(string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_VENDOR>();

            try
            {
                response.DataList = _billOnlyItemRepo.GetVendorsInfo(orgGrpID);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<Dictionary<string, object>> GetConsignmentItemOrderReports(string ItemID, string vendorID, string departmentID, string businessUnit, string cartID, string startDate, string endDate, string poNumber, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<Dictionary<string, object>>();

            try
            {
                response.DataDictionary = _billOnlyItemRepo.GetConsignmentItemOrderReports(ItemID, vendorID, departmentID, businessUnit, cartID, startDate, endDate, poNumber, deviceTokenEntry);

                if (response.DataDictionary.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> UpdateNonCatalogItemDtls(VM_SEARCHITEM_DETAILS itemDetails, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long statusCode = _billOnlyItemRepo.UpdateNonCatalogItemDtls(itemDetails, userID);

                if (statusCode == AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParSuccess();
                    return response;
                }
                else if (statusCode == AtparStatusCodes.E_POU_ITEMEXIST)
                {
                    response.AtParNotOK(AtparStatusCodes.E_POU_ITEMEXIST, _commonRepo, _log);
                    return response;
                }
                else {
                    response.AtParNotOK(AtparStatusCodes.UPDATEFAIL_NONCATALOGITEMS, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> UpdateItemStatus(int transID, string itemID, string status)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long statusCode = _billOnlyItemRepo.UpdateItemStatus(transID, itemID, status);

                if (statusCode == AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<string> GetERPName()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<string>();

            try
            {
                //GetConfigData();
                List<string> lstParameters = new List<string> { AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() };
                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
                string erpName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                response.DataVariable = erpName;

                if (response.DataVariable == null)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;

                }
                else
                {
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

        //private void GetConfigData()
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
        //        throw ex;
        //    }

        //}

        public AtParWebApiResponse<long> UpdateConsignmentItemOrderReports(string transID, string itemID, bool vendorResponse, bool approverResponse, bool reviewerResponse, decimal itemPrice, string workflowInstanceID, string responseFrom, string uom, string deptID, string lotID, string serialID, int lineNo, string comments, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long _statusCode = -1;
            var response = new AtParWebApiResponse<long>();
            string _strReviewType = string.Empty;
            POU_BillOnlyWorkflowRemoteService obj = new POU_BillOnlyWorkflowRemoteService();
            try
            {
                if (!string.IsNullOrEmpty(comments))
                {
                    comments = comments.Replace("%20", " ");
                }
                

                switch (responseFrom)
                {
                    case "VENDOR_REVIEW_STATUS":
                        _strReviewType = "Vendor Review";
                        _statusCode = obj.ResumeWFOnVendorResponse(workflowInstanceID, itemPrice, vendorResponse, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), uom, itemID);
                        break;
                    case "DEPT_REVIEW_STATUS":
                        _strReviewType = "Department Review";
                        _statusCode = obj.ResumeWFOnDeptApproverResponse(workflowInstanceID, itemPrice, vendorResponse, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), uom, deptID, itemID,false);

                        break;
                    case "EXCEPTION_REVIEW_STATUS":
                        _strReviewType = "Exception Review";
                        _statusCode = obj.ResumeWFOnExceptionApproverResponse(workflowInstanceID, itemPrice, vendorResponse, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), uom, deptID, itemID);

                        break;
                }


                //deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString()
                _statusCode = _billOnlyItemRepo.UpdateConsignmentItemOrderReports(transID, itemID, vendorResponse, approverResponse, reviewerResponse, itemPrice, workflowInstanceID, responseFrom, uom, deptID, lotID, serialID, lineNo, comments, _strReviewType, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                if (_statusCode == AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
            finally
            {
              
            }

        }



    }
}

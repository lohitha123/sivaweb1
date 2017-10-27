using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.ParManagement;
using AtPar.Service.Interfaces.ParManagement;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ParManagement.Service
{
    public class SetupParLocationsService : ISetupParLocationsService
    {
        #region Private Variables

        ISetupParLocationsRepository _Repo;
        private ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor
        public SetupParLocationsService(ISetupParLocationsRepository parLocRepo, ILog log, ICommonRepository commonRepository)
        {
            _Repo = parLocRepo;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(SetupParLocationsService));
        }

        #endregion

        #region GetLocationHeader
        public AtParWebApiResponse<PAR_MNGT_PAR_LOC_HEADER> GetLocationHeader(string locID, string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<PAR_MNGT_PAR_LOC_HEADER>();

            try
            {
                response.DataList = _Repo.GetLocationHeader(locID, orgID);

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region UpdateLoc
        public AtParWebApiResponse<long> UpdateLoc(PAR_MNGT_PAR_LOC_HEADER objHeader, string mode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();
            int orgIdCnt;
            long statusCode;

            try
            {
                orgIdCnt = _Repo.GetCountOrgID(objHeader);
                if (objHeader.LOCATION_NAME != null)
                {
                    objHeader.LOCATION_NAME = AtParExtensions.ReplaceString(objHeader.LOCATION_NAME);
                }
                if (orgIdCnt > 0 && mode == "Add")
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_PARLOCALREADYEXISTS, _commonRepo, _log, objHeader.PAR_LOC_ID);
                    return response;
                }
                if (mode == "Add")
                {
                    statusCode = _Repo.InsertParLoc(objHeader);
                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                }
                else if (mode == "Edit")
                {
                    statusCode = _Repo.UpdateParLoc(objHeader);
                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region GetLocations
        public AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS> GetLocations(string orgID, string locID,
                                                                             string locName, string appID,
                                                                             string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS>();
            if (string.IsNullOrEmpty(orgID))
            {
                orgID = string.Empty;
            }
            if (string.IsNullOrEmpty(locID))
            {
                locID = string.Empty;
            }
            if (string.IsNullOrEmpty(locName))
            {
                locName = string.Empty;
            }
            else {
                locName = AtParExtensions.ReplaceString(locName);
            }
            try
            {
                response.DataList = _Repo.GetLocations(orgID, locID, locName, appID, orgGroupID);

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region GetShipToIds
        public AtParWebApiResponse<RM_SHIPTO_IDS> GetShipToIds(string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<RM_SHIPTO_IDS>();

            if (string.IsNullOrEmpty(orgID))
            {
                orgID = string.Empty;
            }

            try
            {
                response.DataList = _Repo.GetShipToIds(orgID);

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region GetOrgIdName
        public AtParWebApiResponse<string> GetOrgIdName(string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<string>();

            if (string.IsNullOrEmpty(orgID))
            {
                orgID = string.Empty;
            }

            try
            {
                response.DataVariable = _Repo.GetOrgIdName(orgID);
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region AddItems
        public AtParWebApiResponse<long> AddItems(string locID, string companyID, string comp, string itemID,
                                double optQty, string cntReq, int cntOrder, int replnshType,
                                string flag, string orderingType, string foqQty, string maxQty,
                                string lotCntrld, string srCntrld, string userID, string unitOfIssue,
                                string converstionRate, string costCentercode, string userField1, string status,
                                string invBusinessUnit, string requestionType, string UOMProc, string parUom, string convRtParUom,
                                string chargeCode, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();
            List<PAR_MNGT_ITEM> lstItems = null;
            int itemCnt = 0;
            string localchargeCode;
            long statusCode = -1;
            try
            {
                itemCnt = _Repo.GetParItemsCount(itemID);
                if (itemCnt == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.PAR_NO_ITEMEXISTS, _commonRepo, _log);
                    return response;
                }
                itemCnt = _Repo.GetParLocationsCount(locID, comp, itemID, companyID);
                if (itemCnt > 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION, _commonRepo, _log);
                    return response;
                }
                lstItems = _Repo.GetItems(itemID);

                if (lstItems.Count > 0)
                {
                    localchargeCode = (!string.IsNullOrEmpty(lstItems[0].CHARGE_CODE)) ? "" : lstItems[0].CHARGE_CODE;
                }
                else
                {
                    localchargeCode = string.Empty;
                }
                statusCode = _Repo.InsertItems(locID, companyID, comp, itemID,
                                             optQty, cntReq, cntOrder, replnshType,
                                             flag, orderingType, foqQty, maxQty,
                                             lotCntrld, srCntrld, userID, unitOfIssue,
                                             converstionRate, costCentercode, userField1, status,
                                             invBusinessUnit, requestionType, UOMProc, parUom, convRtParUom,
                                             chargeCode, deviceTokenEntry);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region UpdateLocationItems
        public AtParWebApiResponse<long> UpdateLocationItems(string locID, string companyID, string compartment, string oldcomprmnt,
                            string itemID, double optQty, string cntReq, int cntOrder, int replnshType, string flag,
                            string orderingType, string foqQty, string maxQty, string lotCntrld, string srCntrld,
                            string costCenterCode, string unitOfIssue, string converstionRate, string userField1,
                            string userID, string status, string invBusinessUnit, string requisitionType, string UOMProc, string parUom,
                            string convRtParUom, List<VM_SETUP_PAR_AUDIT> lstInsertParAudit, string chargeCode, string[] deviceTokenEntry)

        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();
            int binCnt = 0;
            int itemStatus;
            long statusCode = -1;
            DataSet dsInsertParAudit = new DataSet();
            DataTable itemParAudit = lstInsertParAudit.ToDataTable();
            dsInsertParAudit.Tables.Add(itemParAudit);

            try
            {
                if (compartment != oldcomprmnt)
                {
                    binCnt = _Repo.GetParLocationsBinCount(locID, compartment, itemID, companyID);
                    if (binCnt > 0)
                    {
                        response.AtParNotOK(AtparStatusCodes.S_BIN_ALREADYEXISTS, _commonRepo, _log);
                        return response;
                    }
                }
                itemStatus = _Repo.GetParItemStatus(locID, compartment, itemID, companyID);
                if (string.IsNullOrEmpty(status))
                {
                    status = "\0";
                }
                statusCode = _Repo.UpdatePOUInvItemBin(companyID, locID, itemID, oldcomprmnt, compartment, Convert.ToChar(status));
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                if (itemStatus == 0)
                {
                    statusCode = _Repo.UpdateLocationItems(locID, companyID, compartment, oldcomprmnt,
                                                         itemID, optQty, cntReq, cntOrder, replnshType, flag,
                                                         orderingType, foqQty, maxQty, lotCntrld, srCntrld,
                                                         costCenterCode, unitOfIssue, converstionRate, userField1,
                                                         userID, status, invBusinessUnit, requisitionType, UOMProc, parUom,
                                                         convRtParUom, chargeCode, deviceTokenEntry);

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                }
                else
                {
                    if (status != "Y" || itemStatus == 2)
                    {
                        statusCode = _Repo.UpdateLocationItems(locID, companyID, compartment, oldcomprmnt,
                                                         itemID, optQty, cntReq, cntOrder, replnshType, flag,
                                                         orderingType, foqQty, maxQty, lotCntrld, srCntrld,
                                                         costCenterCode, unitOfIssue, converstionRate, userField1,
                                                         userID, status, invBusinessUnit, requisitionType, UOMProc, parUom,
                                                         convRtParUom, chargeCode, deviceTokenEntry);
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(statusCode, _commonRepo, _log);
                            return response;
                        }
                        if (status == "Y")
                        {
                            statusCode = _Repo.UpdateItemStatus(itemID);
                        }
                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.CRCT_S_CANNOTACTIVATE, _commonRepo, _log, itemID);
                        return response;
                    }
                }
                statusCode = InsertParAuditReport(dsInsertParAudit, deviceTokenEntry);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        private long InsertParAuditReport(DataSet dsInsertParAudit, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {

                DataSet dsHeaders = new DataSet();
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;
                //GetConfigData();
                erpObjName = "CartCount_Atpar";
                className = "SendCart";
                methodName = "InsertParAuditReport";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { dsInsertParAudit, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                return StatusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.E_SERVERERROR;
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
        #endregion

        #region GetLocDetails
        public AtParWebApiResponse<VM_PAR_SETUP_PAR_LOCATIONS> GetLocDetails(string locID, string companyID, string itemID, string deptID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_PAR_SETUP_PAR_LOCATIONS>();
            if (string.IsNullOrEmpty(itemID))
            {
                itemID = string.Empty;
            }
            if (string.IsNullOrEmpty(deptID))
            {
                deptID = string.Empty;
            }
            if (itemID != "")
            {
                itemID = AtParExtensions.ReplaceString(itemID);
            }
            try
            {
                response.DataList = _Repo.GetLocDetails(locID, companyID, itemID, deptID, deviceTokenEntry);

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
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

    }
}
